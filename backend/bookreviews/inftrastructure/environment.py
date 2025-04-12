from typing import Callable

from cached_property import cached_property
from fastapi import APIRouter

from bookreviews.controllers.books_controller import BooksController
from bookreviews.connections.mongosession import MongoSession
from bookreviews.dtls.books_dtl import BooksDTL
from bookreviews.handlers.get_all_books_handler import GetAllBooksHandler
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
