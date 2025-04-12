import enum


class SecretNames(enum.StrEnum):
    MONGO = "mongodb"


class HTTPMethods(enum.StrEnum):
    GET = "GET"
    POST = "POST"
    PUT = "PUT"
    DELETE = "DELETE"
    PATCH = "PATCH"


class Landscape(enum.StrEnum):
    DEV = "dev"
    PROD = "prod"
    QA = "qa"
