from typing import Callable

import pytest
from fastapi import APIRouter, FastAPI
from fastapi.testclient import TestClient


@pytest.fixture
def client(handler: Callable, router: APIRouter) -> TestClient:
    router.add_api_route(handler.PATH, handler.__call__, methods=[handler.METHOD])
    app = FastAPI()
    app.include_router(router)

    return TestClient(app)
