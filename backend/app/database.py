"""MongoDB connection utilities."""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection, AsyncIOMotorDatabase

from .config import get_settings

settings = get_settings()

client = AsyncIOMotorClient(settings.mongo_uri)
database: AsyncIOMotorDatabase = client[settings.database_name]


def get_collection() -> AsyncIOMotorCollection:
    """Return the default collection."""
    return database[settings.collection_name]

