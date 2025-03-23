class MongoConfig:
    def __init__(self, content: dict) -> None:
        self.__content = content

    @property
    def protocol(self) -> str:
        return self.__content["protocol"]

    @property
    def credentials(self) -> dict[str, str]:
        return self.__content.get("credentials", {})

    @property
    def host(self) -> str:
        return self.__content["host"]

    @property
    def options(self) -> dict:
        return self.__content["options"]

    @property
    def db_name(self) -> str:
        return self.__content["db_name"]
