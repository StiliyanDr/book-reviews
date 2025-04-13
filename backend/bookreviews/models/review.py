import datetime as dt
from typing import Optional

from pydantic import BaseModel


class Review(BaseModel):
    id: str
    book_id: str
    title: str
    profile_name: Optional[str]
    helpfulness: Optional[str]
    score: float
    time: dt.datetime
    summary: str
    text: str
