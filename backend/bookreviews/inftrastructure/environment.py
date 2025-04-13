from typing import Callable

from cached_property import cached_property
from fastapi import APIRouter

from bookreviews.controllers.books_controller import BooksController
from bookreviews.connections.mongosession import MongoSession
from bookreviews.controllers.reviews_controller import ReviewsController
from bookreviews.dtls.books_dtl import BooksDTL
from bookreviews.dtls.reviews_dtl import ReviewsDTL
from bookreviews.handlers.get_all_books_handler import GetAllBooksHandler
from bookreviews.handlers.get_reviews_by_book_id_handler import GetReviewsByBookIDHandler
from bookreviews.inftrastructure.configuration.configuration import Configuration


class Environment:
    def create_routes(self) -> APIRouter:
        router = APIRouter()

        for handler in self.handlers:
            router.add_api_route(handler.PATH, handler.__call__, methods=[handler.METHOD])

        return router

    @cached_property
    def handlers(self) -> list[Callable]:
        return [
            self.get_all_books_handler,
            self.get_reviews_by_book_id_handler,
        ]

    @cached_property
    def config(self) -> Configuration:
        return Configuration.load()

    @cached_property
    def mongo_session(self) -> MongoSession:
        return MongoSession(self.config)

    @cached_property
    def books_dtl(self) -> BooksDTL:
        return BooksDTL(self.mongo_session)

    @cached_property
    def books_controller(self) -> BooksController:
        return BooksController(self.books_dtl)

    @cached_property
    def get_all_books_handler(self) -> GetAllBooksHandler:
        return GetAllBooksHandler(self.books_controller, self.config)

    @cached_property
    def reviews_dtl(self) -> ReviewsDTL:
        return ReviewsDTL(self.mongo_session)

    @cached_property
    def reviews_controller(self) -> ReviewsController:
        return ReviewsController(self.reviews_dtl)

    @cached_property
    def get_reviews_by_book_id_handler(self) -> GetReviewsByBookIDHandler:
        return GetReviewsByBookIDHandler(self.reviews_controller, self.config)
