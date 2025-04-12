from unittest.mock import create_autospec

import pytest

from backend.bookreviews.connections.mongosession import MongoSession
from backend.bookreviews.dtls.books_dtl import BooksDTL
from backend.bookreviews.models.book import Book


class TestGetAll:
    @pytest.mark.asyncio
    async def test_exceptions_propagate(self) -> None:
        session = create_autospec(MongoSession)
        dtl = BooksDTL(session)
        session.find.side_effect = RuntimeError("Error!")

        with pytest.raises(RuntimeError):
            await dtl.get_all()

        session.find.assert_called_with("books", limit=None)

    @pytest.mark.asyncio
    async def test_book_objects_are_returned(self, raw_book, book) -> None:
        session = create_autospec(MongoSession)
        dtl = BooksDTL(session)
        session.find.return_value = [raw_book]

        result = await dtl.get_all()

        assert isinstance(result, list)
        assert result == [book]
        session.find.assert_called_with("books", limit=None)
