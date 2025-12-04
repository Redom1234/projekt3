"""Miscellaneous helper functions."""

from typing import Any, Dict


def serialize_document(document: Dict[str, Any]) -> Dict[str, Any]:
    """Convert MongoDB documents into JSON-friendly dictionaries."""
    if not document:
        return {}
    serialized = {**document}
    if "_id" in serialized:
        serialized["_id"] = str(serialized["_id"])
    return serialized

