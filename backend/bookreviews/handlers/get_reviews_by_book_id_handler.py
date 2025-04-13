from typing import Optional

from bookreviews.controllers.reviews_controller import ReviewsController
from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.review import Review


class GetReviewsByBookIDHandler:
    METHOD = "GET"
    PATH = "/book/{book_id}/reviews"

    def __init__(self, reviews_controller: ReviewsController, config: Configuration) -> None:
        self._reviews_controller = reviews_controller
        self._config = config

    async def __call__(self, book_id: str, limit: Optional[int] = None) -> list[Review]:
        limit = limit or self._config.reviews_limit
        return await self._reviews_controller.get_all_by_book_id(book_id, limit)
