"""Pydantic schemas shared across routes."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class DataCreate(BaseModel):
    """Payload accepted when creating a data point."""

    title: str = Field(..., min_length=2, max_length=120)
    value: float
    category: Optional[str] = Field(default="general", max_length=60)


class DataItem(DataCreate):
    """Representation returned by the API."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: str = Field(alias="_id")
    created_at: datetime

