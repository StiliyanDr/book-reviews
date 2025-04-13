from unittest.mock import create_autospec

import pytest

from bookreviews.constants import HTTPMethods
from bookreviews.controllers.books_controller import BooksController
from bookreviews.handlers.get_all_books_handler import GetAllBooksHandler
from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.book import Book


class TestGetAllBooksHandler:
    def test_constants(self) -> None:
        assert GetAllBooksHandler.METHOD == HTTPMethods.GET
        assert GetAllBooksHandler.PATH == "/book"

    @pytest.mark.asyncio
    async def test_exceptions_propagate(self, stub_config: Configuration) -> None:
        controller = create_autospec(BooksController)
        controller.get_all.side_effect = RuntimeError("Error!")
        handler = GetAllBooksHandler(controller, stub_config)

        with pytest.raises(RuntimeError):
            await handler()

        controller.get_all.assert_called_with(limit=stub_config.books_limit)

    @pytest.mark.asyncio
    async def test_book_objects_are_returned(self, book: Book, stub_config: Configuration) -> None:
        controller = create_autospec(BooksController)
        controller.get_all.return_value = [book]
        handler = GetAllBooksHandler(controller, stub_config)

        result = await handler()

        assert result == [book]
        controller.get_all.assert_called_with(limit=stub_config.books_limit)
