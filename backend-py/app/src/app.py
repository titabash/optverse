"""原則Docstringの記述は必須とする."""

import controller
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root() -> dict[str, str]:
    """Hell, World!"""
    return {"message": "Hello World"}


app.include_router(controller.llm_graphql, prefix="/graphql/llm")
