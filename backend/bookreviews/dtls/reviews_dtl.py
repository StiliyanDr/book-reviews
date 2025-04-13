from typing import Optional

from bson import ObjectId

from bookreviews.connections.mongosession import MongoSession
from bookreviews.models.review import Review


class ReviewsDTL:
    def __init__(self, mongo_session: MongoSession) -> None:
        self._mongo_session = mongo_session

    async def get_all_by_book_id(self,
                                 book_id: str,
                                 limit: Optional[int] = None) -> list[Review]:
        raw_reviews = await self._mongo_session.find("reviews",
                                                     {"bookID": ObjectId(book_id)},
                                                     limit=limit)
        return [self._parse_review(review) for review in raw_reviews]

    def _parse_review(self, review: dict) -> Review:
        return Review(
            id=str(review["_id"]),
            title=review["Title"],
            profile_name=review["profileName"],
            helpfulness=review["helpfulness"],
            score=review["score"],
            time=review["time"],
            summary=review["summary"],
            text=review["text"],
        )
