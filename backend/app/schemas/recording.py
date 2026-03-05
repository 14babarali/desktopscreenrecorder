"""
Recording schemas for API requests/responses
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class RecordingCreate(BaseModel):
    """Schema for creating a recording"""
    title: str
    filename: str
    file_path: str
    file_size: int
    duration: float
    resolution: str = "1080p"
    fps: int = 30
    format: str = "mp4"
    has_screen: bool = True
    has_camera: bool = False
    has_system_audio: bool = False
    has_microphone: bool = False
    tags: List[str] = []


class RecordingUpdate(BaseModel):
    """Schema for updating a recording"""
    title: Optional[str] = None
    tags: Optional[List[str]] = None
    processing_status: Optional[str] = None
    is_processed: Optional[bool] = None


class RecordingResponse(BaseModel):
    """Schema for recording response"""
    id: str
    title: str
    filename: str
    file_path: str
    file_size: int
    duration: float
    resolution: str
    fps: int
    format: str
    has_screen: bool
    has_camera: bool
    has_system_audio: bool
    has_microphone: bool
    tags: List[str]
    created_at: datetime
    updated_at: datetime
    is_processed: bool
    processing_status: str


class RecordingList(BaseModel):
    """Schema for recording list response"""
    recordings: List[RecordingResponse]
    total: int
    page: int
    page_size: int


class ProcessingRequest(BaseModel):
    """Schema for video processing request"""
    recording_id: str
    output_format: str = "mp4"
    compress: bool = False
    target_size_mb: Optional[int] = None
