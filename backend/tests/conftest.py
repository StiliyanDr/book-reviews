import datetime as dt

import pytest

from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.book import Book
from bookreviews.models.review import Review
from tests.utils.stubconfig import create_stub_config

type RawBook = dict[str, str | list[str] | None]


@pytest.fixture
def stub_config() -> Configuration:
    return create_stub_config()


@pytest.fixture
def raw_book() -> RawBook:
    return {
        "_id": "67faa59180bbeb5c0d143467",
        "Title": "The Catcher in the Rye",
        "description": "A book about a boy",
        "authors": ["J.D. Salinger"],
        "image": "https://...",
        "previewLink": "https://...",
        "publisher": "Penguin",
        "publishedDate": "1951",
        "categories": ["Fiction"],
        "ratingsCount": None,
    }


@pytest.fixture
def book(raw_book: RawBook) -> Book:
    return Book(id=raw_book["_id"],
                title=raw_book["Title"],
                description=raw_book["description"],
                authors=raw_book["authors"],
                image_url=raw_book["image"],
                preview_url=raw_book["previewLink"],
                publisher=raw_book["publisher"],
                published_date=raw_book["publishedDate"],
                categories=raw_book["categories"],
                ratings_count=0)


@pytest.fixture
def raw_review() -> dict:
    return {
        "_id": "67faa59180bbeb5c0d143467",
        "Title": "The Catcher in the Rye",
        "profileName": "John Doe",
        "helpfulness": "10/10",
        "score": 4.5,
        "time": 1672531213,
        "summary": "A great book",
        "text": "A book about a boy",
    }


@pytest.fixture
def review(raw_review: dict) -> Review:
    return Review(id=raw_review["_id"],
                  title=raw_review["Title"],
                  profile_name=raw_review["profileName"],
                  helpfulness=raw_review["helpfulness"],
                  score=raw_review["score"],
                  time=dt.datetime.fromtimestamp(raw_review["time"], dt.UTC),
                  summary=raw_review["summary"],
                  text=raw_review["text"])
