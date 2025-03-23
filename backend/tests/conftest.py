import pytest

from bookreviews.inftrastructure.configuration.configuration import Configuration
from tests.utils.stubconfig import create_stub_config


@pytest.fixture
def stub_config() -> Configuration:
    return create_stub_config()
