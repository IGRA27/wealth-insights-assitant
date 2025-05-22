from fastapi import APIRouter, Depends, HTTPException
from app.schemas.query import QueryRequest, QueryResponse
from app.core.logger import logger
from app.api.v1.dependencies import get_agent   

router = APIRouter(prefix="/api/v1", tags=["v1"])


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/query", response_model=QueryResponse)
async def query(req: QueryRequest, agent=Depends(get_agent)):
    try:
        answer = await agent.arun(req.question)
    except Exception as exc:  
        logger.exception("Agent failure")
        raise HTTPException(status_code=500, detail=str(exc))
    return QueryResponse(answer=answer)
