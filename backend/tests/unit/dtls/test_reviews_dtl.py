from unittest.mock import create_autospec

import pytest
from bson import ObjectId

from bookreviews.connections.mongosession import MongoSession
from bookreviews.dtls.reviews_dtl import ReviewsDTL
from bookreviews.models.review import Review


class TestGetAllByBookID:
    @pytest.mark.asyncio
    async def test_exceptions_propagate(self, book_id: str) -> None:
        session = create_autospec(MongoSession)
        dtl = ReviewsDTL(session)
        session.find.side_effect = RuntimeError("Error!")

        with pytest.raises(RuntimeError):
            await dtl.get_all_by_book_id(book_id)

        session.find.assert_called_with("reviews", {"bookID": ObjectId(book_id)}, limit=None)

    @pytest.mark.asyncio
    async def test_review_objects_are_returned(self, raw_review: dict, review: Review, book_id: str) -> None:
        session = create_autospec(MongoSession)
        dtl = ReviewsDTL(session)
        session.find.return_value = [raw_review]
        result = await dtl.get_all_by_book_id(book_id)

        assert result == [review]
        session.find.assert_called_with("reviews", {"bookID": ObjectId(book_id)}, limit=None)
