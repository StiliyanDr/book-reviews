from typing import Optional

from bookreviews.dtls.books_dtl import BooksDTL
from bookreviews.models.book import Book


class BooksController:
    def __init__(self, books_dtl: BooksDTL) -> None:
        self._books_dtl = books_dtl

    async def get_all(self, limit: Optional[int] = None) -> list[Book]:
        return await self._books_dtl.get_all(limit)
