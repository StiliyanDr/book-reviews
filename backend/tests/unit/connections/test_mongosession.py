from unittest.mock import patch, MagicMock, AsyncMock

import pytest

from bookreviews.connections.mongosession import MongoSession


@pytest.fixture
def mongo_session(stub_config) -> MongoSession:
    return MongoSession(stub_config)


class TestMongoSession:
    def test_connection_string(self, mongo_session: MongoSession) -> None:
        assert mongo_session.connection_string == "mongodb+srv://testuser:testpass@localhost:27017/?retryWrites=true&w=majority"

    def test_db_name(self, mongo_session: MongoSession) -> None:
        assert mongo_session.db_name == "book_reviews"

    @pytest.mark.asyncio
    @patch.object(MongoSession, "_get_collection")
    async def test_find_with_all_arguments(self, get_collection_mock: MagicMock, mongo_session: MongoSession) -> None:
        book = {"title": "The Catcher in the Rye", "summary": "..."}
        cursor = MagicMock(to_list=AsyncMock(return_value=[book]))
        collection = MagicMock(find=MagicMock(return_value=cursor))
        get_collection_mock.return_value = collection
        query = {"title": "The Catcher in the Rye"}
        projection = {"title": 1, "author": 0}

        result = await mongo_session.find("books", query, projection)

        collection.find.assert_called_with(query, projection=projection, limit=None)
        assert result == [book]

    @pytest.mark.asyncio
    @patch.object(MongoSession, "_get_collection")
    async def test_find_with_defaults(self, get_collection_mock: MagicMock, mongo_session: MongoSession) -> None:
        book = {"title": "The Catcher in the Rye", "summary": "..."}
        cursor = MagicMock(to_list=AsyncMock(return_value=[book]))
        collection = MagicMock(find=MagicMock(return_value=cursor))
        get_collection_mock.return_value = collection
        result = await mongo_session.find("books")

        collection.find.assert_called_with({}, projection=None, limit=None)
        assert result == [book]
