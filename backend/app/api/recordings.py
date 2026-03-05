"""
Recordings API endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query

from app.schemas.recording import (
    RecordingCreate, RecordingUpdate, RecordingResponse, RecordingList
)
from app.services.recording_service import RecordingService

router = APIRouter()
recording_service = RecordingService()


@router.post("/", response_model=RecordingResponse)
async def create_recording(recording: RecordingCreate):
    """Create a new recording"""
    result = await recording_service.create_recording(recording)
    return RecordingResponse(
        id=result.id,
        title=result.title,
        filename=result.filename,
        file_path=result.file_path,
        file_size=result.file_size,
        duration=result.duration,
        resolution=result.resolution,
        fps=result.fps,
        format=result.format,
        has_screen=result.has_screen,
        has_camera=result.has_camera,
        has_system_audio=result.has_system_audio,
        has_microphone=result.has_microphone,
        tags=result.tags,
        created_at=result.created_at,
        updated_at=result.updated_at,
        is_processed=result.is_processed,
        processing_status=result.processing_status
    )


@router.get("/", response_model=RecordingList)
async def get_recordings(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    tags: Optional[str] = Query(None)
):
    """Get all recordings with pagination"""
    tag_list = tags.split(",") if tags else None
    recordings, total = await recording_service.get_recordings(skip, limit, tag_list)
    
    return RecordingList(
        recordings=[
            RecordingResponse(
                id=r.id,
                title=r.title,
                filename=r.filename,
                file_path=r.file_path,
                file_size=r.file_size,
                duration=r.duration,
                resolution=r.resolution,
                fps=r.fps,
                format=r.format,
                has_screen=r.has_screen,
                has_camera=r.has_camera,
                has_system_audio=r.has_system_audio,
                has_microphone=r.has_microphone,
                tags=r.tags,
                created_at=r.created_at,
                updated_at=r.updated_at,
                is_processed=r.is_processed,
                processing_status=r.processing_status
            ) for r in recordings
        ],
        total=total,
        page=skip // limit + 1,
        page_size=limit
    )


@router.get("/{recording_id}", response_model=RecordingResponse)
async def get_recording(recording_id: str):
    """Get recording by ID"""
    recording = await recording_service.get_recording(recording_id)
    if not recording:
        raise HTTPException(status_code=404, detail="Recording not found")
    
    return RecordingResponse(
        id=recording.id,
        title=recording.title,
        filename=recording.filename,
        file_path=recording.file_path,
        file_size=recording.file_size,
        duration=recording.duration,
        resolution=recording.resolution,
        fps=recording.fps,
        format=recording.format,
        has_screen=recording.has_screen,
        has_camera=recording.has_camera,
        has_system_audio=recording.has_system_audio,
        has_microphone=recording.has_microphone,
        tags=recording.tags,
        created_at=recording.created_at,
        updated_at=recording.updated_at,
        is_processed=recording.is_processed,
        processing_status=recording.processing_status
    )


@router.patch("/{recording_id}", response_model=RecordingResponse)
async def update_recording(recording_id: str, update: RecordingUpdate):
    """Update recording"""
    recording = await recording_service.update_recording(recording_id, update)
    if not recording:
        raise HTTPException(status_code=404, detail="Recording not found")
    
    return RecordingResponse(
        id=recording.id,
        title=recording.title,
        filename=recording.filename,
        file_path=recording.file_path,
        file_size=recording.file_size,
        duration=recording.duration,
        resolution=recording.resolution,
        fps=recording.fps,
        format=recording.format,
        has_screen=recording.has_screen,
        has_camera=recording.has_camera,
        has_system_audio=recording.has_system_audio,
        has_microphone=recording.has_microphone,
        tags=recording.tags,
        created_at=recording.created_at,
        updated_at=recording.updated_at,
        is_processed=recording.is_processed,
        processing_status=recording.processing_status
    )


@router.delete("/{recording_id}")
async def delete_recording(recording_id: str):
    """Delete recording"""
    success = await recording_service.delete_recording(recording_id)
    if not success:
        raise HTTPException(status_code=404, detail="Recording not found")
    return {"message": "Recording deleted successfully"}
