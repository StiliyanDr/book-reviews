from unittest.mock import create_autospec

import pytest
from bson import ObjectId

from bookreviews.connections.mongosession import MongoSession
from bookreviews.dtls.reviews_dtl import ReviewsDTL
from bookreviews.models.review import Review


class TestGetAllByBookID:
    @pytest.mark.asyncio
    async def test_exceptions_propagate(self) -> None:
        session = create_autospec(MongoSession)
        dtl = ReviewsDTL(session)
        session.find.side_effect = RuntimeError("Error!")
        book_id = "67faa529c0bbeb5c0d143467"

        with pytest.raises(RuntimeError):
            await dtl.get_all_by_book_id(book_id)

        session.find.assert_called_with("reviews", {"bookID": ObjectId(book_id)}, limit=None)

    @pytest.mark.asyncio
    async def test_review_objects_are_returned(self, raw_review: dict, review: Review) -> None:
        session = create_autospec(MongoSession)
        dtl = ReviewsDTL(session)
        session.find.return_value = [raw_review]
        book_id = "67faa529c0bbeb5c0d143467"
        result = await dtl.get_all_by_book_id(book_id)

        assert result == [review]
        session.find.assert_called_with("reviews", {"bookID": ObjectId(book_id)}, limit=None)
