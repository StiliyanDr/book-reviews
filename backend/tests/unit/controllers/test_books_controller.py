from unittest.mock import create_autospec

import pytest

from bookreviews.controllers.books_controller import BooksController
from bookreviews.dtls.books_dtl import BooksDTL


class TestGetAll:
    @pytest.mark.asyncio
    async def test_exception_propagates(self) -> None:
        dtl = create_autospec(BooksDTL)
        dtl.get_all.side_effect = RuntimeError("Error!")
        controller = BooksController(dtl)

        with pytest.raises(RuntimeError):
            await controller.get_all()

        dtl.get_all.assert_called_with(limit=None)

    @pytest.mark.asyncio
    async def test_book_objects_are_returned(self, book) -> None:
        dtl = create_autospec(BooksDTL)
        dtl.get_all.return_value = [book]
        controller = BooksController(dtl)

        result = await controller.get_all()

        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0] == book
        dtl.get_all.assert_called_with(limit=None)
