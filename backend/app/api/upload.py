"""
File upload API endpoints
"""
import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

from app.core.config import settings

router = APIRouter()

# Ensure recordings directory exists
RECORDINGS_DIR = Path(settings.STORAGE_PATH)
RECORDINGS_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/video")
async def upload_video(file: UploadFile = File(...)):
    """Upload a video file"""
    try:
        # Generate filename
        filename = file.filename
        file_path = RECORDINGS_DIR / filename
        
        # Save file
        contents = await file.read()
        with open(file_path, 'wb') as f:
            f.write(contents)
        
        return {
            "success": True,
            "filename": filename,
            "file_path": str(file_path),
            "file_size": len(contents)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/video/{filename}")
async def get_video(filename: str):
    """Get video file path"""
    file_path = RECORDINGS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return {
        "filename": filename,
        "file_path": str(file_path),
        "exists": True
    }
