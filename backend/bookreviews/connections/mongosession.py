from typing import Optional
from urllib.parse import quote

from cached_property import cached_property
from pymongo import AsyncMongoClient
from pymongo.asynchronous.collection import AsyncCollection

from bookreviews.inftrastructure.configuration.configuration import Configuration

type ProjectionType = list[str] | dict[str, bool]


class MongoSession:
    def __init__(self, config: Configuration) -> None:
        self.__config = config

    @cached_property
    def _client(self) -> AsyncMongoClient:
        return AsyncMongoClient(self.connection_string)

    @property
    def connection_string(self) -> str:
        mongo_config = self.__config.mongo
        options_str = "&".join(f"{quote(key)}={quote(value)}"
                               for key, value in mongo_config.options.items())
        options = f"?{options_str}" if options_str else ""
        credentials = self.__config.mongo_credentials

        return f"{mongo_config.protocol}://{credentials.username}:{credentials.password}@{mongo_config.host}/{options}"

    @cached_property
    def db_name(self) -> str:
        return self.__config.mongo.db_name

    async def find(self,
                   collection_name: str,
                   query: Optional[dict] = None,
                   projection: Optional[ProjectionType] = None,
                   limit: Optional[int] = None) -> list[dict]:
        query = query or {}
        limit = limit or 0
        collection = self._get_collection(collection_name)
        return await collection.find(query, projection=projection, limit=limit).to_list()

    def _get_collection(self, name: str) -> AsyncCollection:
        return self._client[self.db_name][name]
