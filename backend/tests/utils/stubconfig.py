from bookreviews.inftrastructure.configuration.configuration import Configuration


def create_stub_config() -> Configuration:
    return Configuration({
        "mongo": {
            "protocol": "mongodb+srv",
            "host": "localhost:27017",
            "options": {
                "retryWrites": "true",
                "w": "majority",
            },
            "db_name": "book_reviews",
            "credentials": {
                "username": "testuser",
                "password": "testpass",
            },
            "secrets_directory": "/secrets",
            "books_limit": 100,
            "port": 8080,
            "landscape": "qa",
        }
    })
