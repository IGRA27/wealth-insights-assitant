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

#CORS abierta para la demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router)
