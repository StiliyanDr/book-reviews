import pytest

from backend.bookreviews.inftrastructure.configuration.configuration import Configuration
from backend.tests.utils.stubconfig import create_stub_config


@pytest.fixture
def stub_config() -> Configuration:
    return create_stub_config()
