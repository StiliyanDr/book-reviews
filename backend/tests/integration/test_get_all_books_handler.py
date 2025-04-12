from unittest.mock import create_autospec

import pytest
from fastapi import APIRouter
from fastapi.testclient import TestClient

from bookreviews.connections.mongosession import MongoSession
from bookreviews.controllers.books_controller import BooksController
from bookreviews.dtls.books_dtl import BooksDTL
from bookreviews.handlers.books.get_all_books_handler import GetAllBooksHandler
from bookreviews.handlers.books.router import router as books_router
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


@pytest.fixture
def router() -> APIRouter:
    return books_router


def test_read_main(client: TestClient, book: Book):
    response = client.get("/books", params={"limit": 99})
    assert response.status_code == 200
    assert response.json() == [book.model_dump()]
