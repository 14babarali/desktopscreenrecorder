"""
Video processing API endpoints
"""
from fastapi import APIRouter, HTTPException, BackgroundTasks

from app.schemas.recording import ProcessingRequest
from app.services.video_processing_service import VideoProcessingService
from app.services.recording_service import RecordingService

router = APIRouter()
processing_service = VideoProcessingService()
recording_service = RecordingService()


async def process_video_task(recording_id: str, request: ProcessingRequest):
    """Background task for video processing"""
    try:
        recording = await recording_service.get_recording(recording_id)
        if not recording:
            return
        
        output_path = recording.file_path.replace(
            f".{recording.format}", 
            f"_processed.{request.output_format}"
        )
        
        if request.compress and request.target_size_mb:
            await processing_service.compress_video(
                recording.file_path,
                output_path,
                request.target_size_mb
            )
        else:
            await processing_service.convert_format(
                recording.file_path,
                output_path,
                request.output_format
            )
        
        from app.schemas.recording import RecordingUpdate
        await recording_service.update_recording(
            recording_id,
            RecordingUpdate(is_processed=True, processing_status="completed")
        )
    except Exception as e:
        from app.schemas.recording import RecordingUpdate
        await recording_service.update_recording(
            recording_id,
            RecordingUpdate(processing_status=f"failed: {str(e)}")
        )


@router.post("/process")
async def process_video(request: ProcessingRequest, background_tasks: BackgroundTasks):
    """Process video (compress, convert format)"""
    recording = await recording_service.get_recording(request.recording_id)
    if not recording:
        raise HTTPException(status_code=404, detail="Recording not found")
    
    background_tasks.add_task(process_video_task, request.recording_id, request)
    
    from app.schemas.recording import RecordingUpdate
    await recording_service.update_recording(
        request.recording_id,
        RecordingUpdate(processing_status="processing")
    )
    
    return {"message": "Processing started", "recording_id": request.recording_id}
