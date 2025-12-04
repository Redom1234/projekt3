"""FastAPI entry-point for Projekt 3."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .routers import data

settings = get_settings()

app = FastAPI(
    title="Projekt 3 Dashboard API",
    version="1.0.0",
    summary="Simple CRUD API powering the Projekt 3 dashboard.",
    # Dölj "Schemas"-delen i Swagger-UI
    swagger_ui_parameters={"defaultModelsExpandDepth": -1},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data.router, prefix="/api")


@app.get("/health", tags=["meta"])
async def health_check() -> dict:
    """Simple check to verify the service is running."""
    return {"status": "ok"}

