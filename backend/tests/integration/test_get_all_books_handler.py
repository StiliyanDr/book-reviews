from unittest.mock import create_autospec

import pytest
from fastapi.testclient import TestClient

from bookreviews.connections.mongosession import MongoSession
from bookreviews.controllers.books_controller import BooksController
from bookreviews.dtls.books_dtl import BooksDTL
from bookreviews.handlers.get_all_books_handler import GetAllBooksHandler
from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.models.book import Book
from tests.conftest import RawBook


@pytest.fixture
def handler(stub_config: Configuration, raw_book: RawBook) -> GetAllBooksHandler:
    mongo_session = create_autospec(MongoSession)
    mongo_session.find.return_value = [raw_book]
    dtl = BooksDTL(mongo_session)
    controller = BooksController(dtl)

    return GetAllBooksHandler(controller, stub_config)


def test_get_all_books_handler(client: TestClient, book: Book) -> None:
    response = client.get("/book", params={"limit": 99})
    assert response.status_code == 200
    assert response.json() == [book.model_dump()]
