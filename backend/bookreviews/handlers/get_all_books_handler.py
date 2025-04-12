from typing import Optional

from bookreviews.constants import HTTPMethods
from bookreviews.controllers.books_controller import BooksController
from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.book import Book


class GetAllBooksHandler:
    METHOD = HTTPMethods.GET
    PATH = "/book"

    def __init__(self, books_controller: BooksController, config: Configuration) -> None:
        self._books_controller = books_controller
        self._config = config

    async def __call__(self, limit: Optional[int] = None) -> list[Book]:
        limit = limit or self._config.books_limit
        return await self._books_controller.get_all(limit)
