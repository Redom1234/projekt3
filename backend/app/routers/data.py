"""Endpoints responsible for dashboard data."""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from ..schemas import DataCreate, DataItem
from ..services.data_service import DataService, get_data_service

router = APIRouter(prefix="/data", tags=["data"])


@router.get("/", response_model=List[DataItem])
async def list_data(service: DataService = Depends(get_data_service)) -> List[DataItem]:
    """Return every dashboard entry."""
    return await service.list_data()


@router.post("/", response_model=DataItem, status_code=status.HTTP_201_CREATED)
async def create_data(
    payload: DataCreate,
    service: DataService = Depends(get_data_service),
) -> DataItem:
    """Insert a new dashboard entry."""
    if payload.value is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Value is required")
    return await service.create_data(payload)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_data(
    item_id: str,
    service: DataService = Depends(get_data_service),
) -> None:
    """Delete one dashboard entry by id."""
    deleted = await service.delete_data(item_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")

