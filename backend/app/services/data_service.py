"""Business logic for manipulating dashboard data."""

from datetime import datetime
from typing import List

from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorCollection

from ..database import get_collection
from ..schemas import DataCreate, DataItem
from ..utils import serialize_document


class DataService:
    """Orchestrates CRUD operations for dashboard entries."""

    def __init__(self, collection: AsyncIOMotorCollection):
        self._collection = collection

    async def list_data(self) -> List[DataItem]:
        cursor = self._collection.find().sort("created_at", -1)
        results = []
        async for document in cursor:
            results.append(DataItem(**serialize_document(document)))
        return results

    async def create_data(self, payload: DataCreate) -> DataItem:
        document = payload.model_dump()
        document["created_at"] = datetime.utcnow()
        insert_result = await self._collection.insert_one(document)
        created = await self._collection.find_one({"_id": insert_result.inserted_id})
        return DataItem(**serialize_document(created))

    async def delete_data(self, item_id: str) -> bool:
        """Delete a document by its string _id. Returns True if one was removed."""
        try:
            oid = ObjectId(item_id)
        except Exception:
            return False
        result = await self._collection.delete_one({"_id": oid})
        return result.deleted_count == 1


async def get_data_service(collection: AsyncIOMotorCollection = Depends(get_collection)) -> DataService:
    """FastAPI dependency that provides a data service instance."""
    return DataService(collection)

