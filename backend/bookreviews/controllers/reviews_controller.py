from typing import Optional

from bookreviews.dtls.reviews_dtl import ReviewsDTL
from bookreviews.models.review import Review


class ReviewsController:
    def __init__(self, reviews_dtl: ReviewsDTL) -> None:
        self._reviews_dtl = reviews_dtl

    async def get_all_by_book_id(self,
                                 book_id: str,
                                 limit: Optional[int] = None) -> list[Review]:
        return await self._reviews_dtl.get_all_by_book_id(book_id, limit)
