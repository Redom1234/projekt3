"""Application configuration helpers."""

from functools import lru_cache
from typing import List

from pydantic import BaseModel, Field
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseModel):
    """Centralised configuration loaded from environment variables."""

    mongo_uri: str = Field(default_factory=lambda: os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
    database_name: str = Field(default_factory=lambda: os.getenv("MONGODB_DB", "projekt3"))
    collection_name: str = Field(default_factory=lambda: os.getenv("MONGODB_COLLECTION", "entries"))
    cors_origins_raw: str = Field(default_factory=lambda: os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:5173"))

    @property
    def cors_origins(self) -> List[str]:
        """Return allowed origins as a cleaned list."""
        return [origin.strip() for origin in self.cors_origins_raw.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings."""
    return Settings()

