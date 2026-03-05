"""
Recording database model
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class RecordingModel(BaseModel):
    """Recording metadata model"""
    id: Optional[str] = Field(None, alias="_id")
    title: str
    filename: str
    file_path: str
    file_size: int  # bytes
    duration: float  # seconds
    resolution: str
    fps: int
    format: str
    
    # Recording sources
    has_screen: bool = True
    has_camera: bool = False
    has_system_audio: bool = False
    has_microphone: bool = False
    
    # Metadata
    tags: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Processing status
    is_processed: bool = False
    processing_status: str = "pending"  # pending, processing, completed, failed
    
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "title": "Team Meeting - Jan 15",
                "filename": "recording_20240115_143022.mp4",
                "file_size": 524288000,
                "duration": 3600.5,
                "resolution": "1080p",
                "fps": 30,
                "format": "mp4"
            }
        }
