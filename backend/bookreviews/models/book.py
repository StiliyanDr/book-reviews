from typing import Optional

from pydantic import BaseModel


class Book(BaseModel):
    id: str
    title: str
    description: Optional[str]
    authors: list[str]
    image_url: Optional[str]
    preview_url: Optional[str]  
    publisher: Optional[str]
    published_date: Optional[str]
    categories: list[str]
    ratings_count: Optional[int]
 