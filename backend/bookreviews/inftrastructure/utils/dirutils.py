import os


def get_backend_root() -> str:
    return os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "..", "..")
    )
