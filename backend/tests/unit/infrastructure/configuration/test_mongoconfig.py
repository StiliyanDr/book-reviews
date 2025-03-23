from backend.bookreviews.inftrastructure.configuration.configuration import Configuration


def test_mongo_config(stub_config: Configuration) -> None:
    mongo_config = stub_config.mongo

    assert mongo_config.protocol == "mongodb+srv"
    assert mongo_config.credentials == {"username": "testuser", "password": "testpass"}
    assert mongo_config.host == "localhost:27017"
    assert mongo_config.options == {"retryWrites": "true", "w": "majority"}
    assert mongo_config.db_name == "book_reviews"
