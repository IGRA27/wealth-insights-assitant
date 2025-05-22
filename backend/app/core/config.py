from functools import lru_cache
from pathlib import Path
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    #general
    project_name: str = "Wealth Insights Assistant"
    api_version: str = "v1"
    #paths
    data_path: Path = Field(default=Path(__file__).resolve().parent.parent.parent / "data" / "samples")
    index_path: Path = Field(default=Path(__file__).resolve().parent.parent.parent / "data" / "faiss.index")
    #embd-llm
    embedding_model_name: str = "all-MiniLM-L6-v2"
    openai_api_key: str | None = None  
    #cors:
    cors_allowed_origins: list[str] = Field(
        default=["http://localhost:3000"],  # dev por defecto
        env="CORS_ALLOWED_ORIGINS",
    )
    #externalapis
    fx_api_base: str = "https://api.exchangerate.host/latest"
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
    


@lru_cache(maxsize=1)
def get_settings() -> Settings:  #
    """Acceso singleton a Settings."""
    return Settings()
