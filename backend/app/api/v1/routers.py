from fastapi import APIRouter, Depends, HTTPException
from app.schemas.query import QueryRequest, QueryResponse
from app.core.logger import logger
from openai import RateLimitError 
from openai import OpenAIError 
from fastapi.responses import JSONResponse
from app.api.v1.dependencies import get_agent   

router = APIRouter(prefix="/api/v1", tags=["v1"])


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/query")
async def query(req: QueryRequest, agent=Depends(get_agent)):
    try:
        #pasamo el input en un dict y extraemos output
        result = await agent.ainvoke({"input": req.question})
        answer = result["output"]
        return {"answer": answer}

    except OpenAIError as e:            #rate-limit, auth, etc.
        return JSONResponse(
            status_code=503,
            content={
                "error": (
                    "El LLM ha devuelto un error "
                    f"({e.__class__.__name__}). Intenta más tarde."
                )
            },
        )