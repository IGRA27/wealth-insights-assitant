from functools import lru_cache
from pathlib import Path
from pydantic import Field
from pydantic_settings import BaseSettings
from pydantic.functional_validators import field_validator


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
        default_factory=lambda: ["http://localhost:3000"],  # dev por defecto
        env="CORS_ALLOWED_ORIGINS",
    )

    #admite formatos url1, url2 y json, con esto solucione un error:
    @field_validator("cors_allowed_origins", mode="before")
    @classmethod
    def split_origins(cls, v):
        if isinstance(v, str):
            return [o.strip() for o in v.split(",") if o.strip()]
        return v

    #externalapis
    fx_api_base: str = "https://api.exchangerate.host/latest"
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
    


@lru_cache(maxsize=1)
def get_settings() -> Settings:  #
    """Acceso singleton a Settings."""
    return Settings()

settings = get_settings()