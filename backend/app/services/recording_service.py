"""
Recording service for managing recording metadata
"""
from datetime import datetime
from typing import List, Optional
from bson import ObjectId

from app.core.database import get_database
from app.models.recording import RecordingModel
from app.schemas.recording import RecordingCreate, RecordingUpdate


class RecordingService:
    """Service for recording operations"""
    
    def __init__(self):
        self.collection_name = "recordings"
    
    async def create_recording(self, recording: RecordingCreate) -> RecordingModel:
        """Create a new recording"""
        db = get_database()
        recording_dict = recording.model_dump()
        recording_dict["created_at"] = datetime.utcnow()
        recording_dict["updated_at"] = datetime.utcnow()
        recording_dict["is_processed"] = False
        recording_dict["processing_status"] = "pending"
        
        result = await db[self.collection_name].insert_one(recording_dict)
        recording_dict["_id"] = str(result.inserted_id)
        return RecordingModel(**recording_dict)
    
    async def get_recording(self, recording_id: str) -> Optional[RecordingModel]:
        """Get recording by ID"""
        db = get_database()
        recording = await db[self.collection_name].find_one({"_id": ObjectId(recording_id)})
        if recording:
            recording["_id"] = str(recording["_id"])
            return RecordingModel(**recording)
        return None

    async def get_recordings(
        self, 
        skip: int = 0, 
        limit: int = 50,
        tags: Optional[List[str]] = None
    ) -> tuple[List[RecordingModel], int]:
        """Get all recordings with pagination"""
        db = get_database()
        query = {}
        if tags:
            query["tags"] = {"$in": tags}
        
        cursor = db[self.collection_name].find(query).sort("created_at", -1).skip(skip).limit(limit)
        recordings = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            recordings.append(RecordingModel(**doc))
        
        total = await db[self.collection_name].count_documents(query)
        return recordings, total
    
    async def update_recording(self, recording_id: str, update: RecordingUpdate) -> Optional[RecordingModel]:
        """Update recording"""
        db = get_database()
        update_dict = {k: v for k, v in update.model_dump().items() if v is not None}
        update_dict["updated_at"] = datetime.utcnow()
        
        result = await db[self.collection_name].update_one(
            {"_id": ObjectId(recording_id)},
            {"$set": update_dict}
        )
        
        if result.modified_count:
            return await self.get_recording(recording_id)
        return None
    
    async def delete_recording(self, recording_id: str) -> bool:
        """Delete recording"""
        db = get_database()
        result = await db[self.collection_name].delete_one({"_id": ObjectId(recording_id)})
        return result.deleted_count > 0
