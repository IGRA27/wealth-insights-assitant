from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import get_settings
from .api.v1.routers import router as v1_router

settings = get_settings()

app = FastAPI(
    title=settings.project_name,
    version=settings.api_version,
    openapi_url="/openapi.json",
)

#CORS para prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_methods=["POST", "GET"],
    allow_headers=["Authorization", "Content-Type"],
    allow_credentials=False,   #True seria para enviar cookie
)

app.include_router(v1_router)
