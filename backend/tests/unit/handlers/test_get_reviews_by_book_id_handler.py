from unittest.mock import create_autospec

import pytest

from bookreviews.controllers.reviews_controller import ReviewsController
from bookreviews.handlers.get_reviews_by_book_id_handler import GetReviewsByBookIDHandler
from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.review import Review


class TestGetReviewsByBookIDHandler:
    def test_constants(self) -> None:
        assert GetReviewsByBookIDHandler.METHOD == "GET"
        assert GetReviewsByBookIDHandler.PATH == "/book/{book_id}/reviews"

    @pytest.mark.asyncio
    async def test_exceptions_propagate(self, book_id: str, stub_config: Configuration) -> None:
        controller = create_autospec(ReviewsController)
        handler = GetReviewsByBookIDHandler(controller, stub_config)
        controller.get_all_by_book_id.side_effect = RuntimeError("Error!")

        with pytest.raises(RuntimeError):
            await handler(book_id)

        controller.get_all_by_book_id.assert_called_with(book_id, limit=stub_config.reviews_limit)

    @pytest.mark.asyncio
    async def test_review_objects_are_returned(self, book_id: str, review: Review, stub_config: Configuration) -> None:
        controller = create_autospec(ReviewsController)
        controller.get_all_by_book_id.return_value = [review]
        handler = GetReviewsByBookIDHandler(controller, stub_config)

        result = await handler(book_id)

        assert result == [review]
        controller.get_all_by_book_id.assert_called_with(book_id, limit=stub_config.reviews_limit)
