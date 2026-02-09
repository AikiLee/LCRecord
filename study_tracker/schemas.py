from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime


class ProblemBase(BaseModel):
    title: str
    category: Optional[str] = None
    link: Optional[str] = None
    solution: Optional[str] = None
    explanation: Optional[str] = None
    notes: Optional[str] = None


class ProblemCreate(ProblemBase):
    pass


class Problem(ProblemBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class AIReviewRequest(BaseModel):
    date_str: Optional[str] = None
    model_hint: Optional[str] = "mock"
