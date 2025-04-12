from typing import Optional

from bookreviews.connections.mongosession import MongoSession
from bookreviews.models.book import Book


class BooksDTL:
    def __init__(self, mongo_session: MongoSession) -> None:
        self._mongo_session = mongo_session

    async def get_all(self, limit: Optional[int] = None) -> list[Book]:
        raw_books = await self._mongo_session.find("books", limit=limit)
        return [self._parse_book(book) for book in raw_books]

    def _parse_book(self, book: dict[str, str | list[str] | None]) -> Book:
        return Book(
            title=book["Title"],
            description=book["description"],
            authors=book["authors"] or [],
            image_url=book["image"],
            preview_url=book["previewLink"],
            publisher=book["publisher"],
            published_date=book["publishedDate"],
            categories=book["categories"] or [],
            ratings_count=book["ratingsCount"],
        )
