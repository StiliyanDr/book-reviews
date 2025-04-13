from unittest.mock import create_autospec

from fastapi.testclient import TestClient
import pytest

from bookreviews.connections.mongosession import MongoSession
from bookreviews.controllers.reviews_controller import ReviewsController
from bookreviews.dtls.reviews_dtl import ReviewsDTL
from bookreviews.handlers.get_reviews_by_book_id_handler import GetReviewsByBookIDHandler
from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.review import Review

@pytest.fixture
def handler(stub_config: Configuration, raw_review: dict) -> GetReviewsByBookIDHandler:
    mongo_session = create_autospec(MongoSession)
    mongo_session.find.return_value = [raw_review]
    dtl = ReviewsDTL(mongo_session)
    controller = ReviewsController(dtl)

    return GetReviewsByBookIDHandler(controller, stub_config)


def test_get_reviews_by_book_id(client: TestClient, book_id: str, review: Review) -> None:
    review_as_json = review.model_dump()
    review_as_json["time"] = review_as_json["time"].isoformat()

    response = client.get(f"/book/{book_id}/reviews", params={"limit": 99})

    assert response.status_code == 200
    assert response.json() == [review_as_json]
