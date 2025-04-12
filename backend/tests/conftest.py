import pytest

from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.book import Book
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
