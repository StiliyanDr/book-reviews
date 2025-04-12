import json
import os
from dataclasses import dataclass
from typing import Optional

from cached_property import cached_property

from bookreviews.constants import SecretNames
from bookreviews.inftrastructure.configuration.mongoconfig import MongoConfig
from bookreviews.inftrastructure.utils.dirutils import get_backend_root


@dataclass
class Credentials:
    username: str
    password: str


class Configuration:
    def __init__(self, content: dict) -> None:
        self.__content = content

    @classmethod
    def load(cls, path: Optional[str] = None) -> "Configuration":
        path = path or cls._get_config_path()

        with open(path, encoding="utf-8") as file:
            return Configuration(json.load(file))

    @staticmethod
    def _get_config_path() -> str:
        default_path = os.path.join(get_backend_root(), "config.json")
        return os.getenv("CONFIG_PATH", default_path)

    @property
    def mongo(self) -> MongoConfig:
        return MongoConfig(self.__content["mongo"])

    @property
    def mongo_credentials(self) -> Optional[Credentials]:
        creds = self._read_secret(SecretNames.MONGO)
        creds = creds or self.mongo.credentials

        return (Credentials(**creds)
                if creds
                else None)

    def _read_secret(self, name: str) -> Optional[str]:
        path = os.path.join(self.secrets_directory, name)

        try:
            with open(path, encoding="utf-8") as file:
                return json.load(file)
        except FileNotFoundError as e:
            return None

    @property
    def secrets_directory(self) -> str:
        return self.__content.get("secrets_directory", "/secrets")

    @property
    def books_limit(self) -> Optional[int]:
        return self.__content.get("books_limit")

    @property
    def port(self) -> int:
        return self.__content["port"]

    @property
    def landscape(self) -> str:
        return self.__content["landscape"]
