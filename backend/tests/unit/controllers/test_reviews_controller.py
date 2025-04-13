from unittest.mock import create_autospec

import pytest

from bookreviews.controllers.reviews_controller import ReviewsController
from bookreviews.dtls.reviews_dtl import ReviewsDTL
from bookreviews.models.review import Review


class TestGetAllByBookID:
    @pytest.mark.asyncio
    async def test_exception_propagates(self, book_id: str) -> None:
        dtl = create_autospec(ReviewsDTL)
        dtl.get_all_by_book_id.side_effect = RuntimeError("Error!")
        controller = ReviewsController(dtl)

        with pytest.raises(RuntimeError):
            await controller.get_all_by_book_id(book_id)

        dtl.get_all_by_book_id.assert_called_with(book_id, limit=None)

    @pytest.mark.asyncio
    async def test_review_objects_are_returned(self, book_id: str, review: Review) -> None:
        dtl = create_autospec(ReviewsDTL)
        dtl.get_all_by_book_id.return_value = [review]
        controller = ReviewsController(dtl)

        result = await controller.get_all_by_book_id(book_id)

        assert result == [review]
        dtl.get_all_by_book_id.assert_called_with(book_id, limit=None)
