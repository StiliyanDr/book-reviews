import argparse
import csv
import datetime as dt
import io
import itertools
import logging
import sys
import zipfile
from collections import defaultdict
from typing import Optional

from pymongo import MongoClient
from pymongo.collection import Collection
from tqdm import tqdm

type RecordValue = str | list[str] | None
type DataRecord = dict[str, RecordValue]


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ]
)
log = logging.getLogger(__name__)

LIST_END_CHARS = "[]"
LIST_VALUES_SEPARATOR = ","
LIST_VALUE_ENDS_CHAR = "'"

DB_NAME = "book_reviews"
BOOKS_COLLECTION = "books"
REVIEWS_COLLECTION = "reviews"


def load_data(
    data_path: str,
    max_books: int,
    max_reviews_per_book: int,
) -> tuple[list[DataRecord], dict[str, list[DataRecord]]]:
    with zipfile.ZipFile(data_path, "r") as data_archive:
        books, titles = load_book_data(data_archive, max_books)
        reviews = load_review_data(data_archive, titles, max_reviews_per_book)

        return books, reviews


def load_book_data(data_archive: zipfile.ZipFile,
                   max_records: int) -> tuple[list[DataRecord], set[str]]:
    books = []
    titles = set()

    with data_archive.open("books_data.csv") as binary_file:
        with io.TextIOWrapper(binary_file, encoding="utf-8") as file:
            csv_reader = csv.DictReader(file)
            log.info(f"Loading book data (at most {max_records} records)...")

            for i, raw_record in tqdm(enumerate(csv_reader), total=max_records):
                if i + 1 > max_records:
                    break

                record = parse_record(raw_record, list_fields=["authors", "categories"])
                title = record["Title"]

                if title is not None:        
                   books.append(record)
                   titles.add(title)

        return books, titles



def load_review_data(data_archive: zipfile.ZipFile,
                     book_titles: set[str],
                     max_reviews_per_book: int) -> dict[str, list[DataRecord]]:
    with data_archive.open("Books_rating.csv", "r") as binary_file:
        with io.TextIOWrapper(binary_file, encoding="utf-8") as file:
            reviews = defaultdict(list)
            csv_reader = csv.DictReader(file)
            log.info("Loading book reviews (at most "
                     f"{max_reviews_per_book} reviews per book)...")

            for raw_record in csv_reader:
                record = parse_review(raw_record)
                title = record["Title"]

                if title in book_titles and len(reviews[title]) < max_reviews_per_book:
                    reviews[title].append(record)

            return reviews


def parse_record(raw_record: DataRecord, list_fields: Optional[list[str]] = None) -> DataRecord:
    list_fields = list_fields or []
    raw_record = with_none_for_missing_values(raw_record)
    return with_parsed_list_values(raw_record, list_fields)


def parse_review(raw_record: DataRecord) -> DataRecord:
    record = parse_record(raw_record)

    for field in ["Id", "Price", "User_id"]:
        record.pop(field)

    for field in ["helpfulness", "score", "time", "text", "summary"]:
        record[field] = record.pop(f"review/{field}")

    score = record["score"]
    record["score"] = float(score) if score is not None else None
    time_in_seconds_since_epoch = record["time"]
    record["time"] = (dt.datetime.fromtimestamp(int(time_in_seconds_since_epoch), dt.UTC)
                      if time_in_seconds_since_epoch is not None
                      else None)
    return record


def with_none_for_missing_values(record: DataRecord) -> DataRecord:
    for key, value in record.items():
        if value == "":
            record[key] = None

    return record


def with_parsed_list_values(record: DataRecord, fields: list[str]) -> DataRecord:
    for field in fields:
        record[field] = parse_list_value(record[field])

    return record


def parse_list_value(list_value: str | None) -> list[str] | None:
    if not list_value:
        return None

    stripped_value = list_value.strip(LIST_END_CHARS)
    csv_reader = csv.reader(
        [stripped_value],
        delimiter=LIST_VALUES_SEPARATOR,
        quotechar=LIST_VALUE_ENDS_CHAR,
        quoting=csv.QUOTE_MINIMAL,
    )

    return [item.strip(f' "{LIST_VALUE_ENDS_CHAR}')
            for item in next(csv_reader)]


def init_db_with(books: list[DataRecord],
                 reviews_per_title: dict[str, list[DataRecord]],
                 connection_string: str,
                 connection_timout: int) -> None:
    log.info(f"Initialising database {DB_NAME}...")

    with MongoClient(connection_string,
                     timeoutMS=connection_timout,
                     connectTimeoutMS=connection_timout) as client:
        if DB_NAME in client.list_database_names():
            log.info(f"Database {DB_NAME} already exists. Dropping it...")
            client.drop_database(DB_NAME)

        db = client[DB_NAME]

        books_collection = db[BOOKS_COLLECTION]
        books_collection.insert_many(books)
        insert_reviews(reviews_per_title, db[REVIEWS_COLLECTION], books_collection)


def insert_reviews(reviews_per_title: dict[str, list[DataRecord]],
                   reviews_collection: Collection,
                   books_collection: Collection) -> None:
    for title, reviews in reviews_per_title.items():
        book_id = books_collection.find_one({"Title": title})["_id"]

        for review in reviews:
            review["bookID"] = book_id

    all_reviews = list(itertools.chain.from_iterable(reviews_per_title.values()))
    reviews_collection.insert_many(all_reviews)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Loads book data and inserts it into a MongoDB database.",
    )
    parser.add_argument("--data-path", type=str, help="Path to the data archive.")
    parser.add_argument("--max-books", type=int, default=1000, help="Maximum number of books to load.")
    parser.add_argument("--max-reviews-per-book",
                        type=int,
                        default=100,
                        help="Maximum number of reviews to load per book.")
    parser.add_argument("--connection-string",
                        type=str,
                        default="mongodb://localhost:27017",
                        help="Connection string for the MongoDB database.")
    parser.add_argument("--connection-timeout",
                        type=int,
                        default=90000,
                        help="Connection timout (in milliseconds) for the MongoDB database.")

    args = parser.parse_args()

    books, reviews = load_data(args.data_path, args.max_books, args.max_reviews_per_book)
    init_db_with(books, reviews, args.connection_string, args.connection_timeout)
