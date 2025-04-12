import uvicorn
from fastapi import FastAPI

from bookreviews.inftrastructure.environment import Environment


def setup_app(env: Environment) -> FastAPI:
    app = FastAPI()

    for router in env.create_routes():
        app.include_router(router)

    return app

if __name__ == "__main__":
    env = Environment()
    app = setup_app(env)
    uvicorn.run(app, host="0.0.0.0", port=env.config.port)
