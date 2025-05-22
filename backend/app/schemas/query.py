from pydantic import BaseModel, Field


class QueryRequest(BaseModel):
    question: str = Field(..., example="¿Cuál es el CET1 del Q2 2024?")


class QueryResponse(BaseModel):
    answer: str
