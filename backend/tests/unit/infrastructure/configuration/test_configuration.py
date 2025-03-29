from unittest.mock import patch, MagicMock

from bookreviews.inftrastructure.configuration.configuration import Configuration
from bookreviews.inftrastructure.configuration.mongoconfig import MongoConfig


def test_configuration(stub_config: Configuration) -> None:
    assert isinstance(stub_config.mongo, MongoConfig)
    assert stub_config.secrets_directory == "/secrets"


@patch.object(Configuration, "_read_secret", return_value=None)
def test_mongo_credentials_when_the_secret_is_missing(read_secret_mock,
                                                      stub_config: Configuration) -> None:
    creds = stub_config.mongo_credentials
    assert creds.password == "testpass"
    assert creds.username == "testuser"


@patch.object(Configuration, "_read_secret", return_value={
    "username": "secret-user",
    "password": "secret-pass",
})
def test_mongo_credentials_when_the_secret_available(read_secret_mock: MagicMock,
                                                     stub_config: Configuration) -> None:
    creds = stub_config.mongo_credentials
    assert creds.password == "secret-pass"
    assert creds.username == "secret-user"
