"""
Storage API endpoints
"""
from fastapi import APIRouter, HTTPException

from app.services.storage_service import StorageService

router = APIRouter()
storage_service = StorageService()


@router.get("/info")
async def get_storage_info():
    """Get storage usage information"""
    return storage_service.get_storage_info()


@router.delete("/file/{filename}")
async def delete_file(filename: str):
    """Delete a recording file"""
    success = storage_service.delete_file(filename)
    if not success:
        raise HTTPException(status_code=404, detail="File not found")
    return {"message": "File deleted successfully"}
