"""
Storage service for managing recording files
"""
import os
import shutil
from typing import Dict
from pathlib import Path

from app.core.config import settings


class StorageService:
    """Service for storage operations"""
    
    def __init__(self):
        self.storage_path = Path(settings.STORAGE_PATH)
        self.storage_path.mkdir(parents=True, exist_ok=True)
    
    def get_storage_info(self) -> Dict:
        """Get storage usage information"""
        total, used, free = shutil.disk_usage(self.storage_path)
        
        recordings_size = sum(
            f.stat().st_size for f in self.storage_path.rglob('*') if f.is_file()
        )
        
        return {
            "total_gb": total / (1024**3),
            "used_gb": used / (1024**3),
            "free_gb": free / (1024**3),
            "recordings_gb": recordings_size / (1024**3),
            "storage_path": str(self.storage_path)
        }
    
    def delete_file(self, file_path: str) -> bool:
        """Delete a recording file"""
        try:
            full_path = self.storage_path / file_path
            if full_path.exists():
                full_path.unlink()
                return True
        except Exception as e:
            print(f"Error deleting file: {e}")
        return False
    
    def get_file_path(self, filename: str) -> str:
        """Get full path for a recording file"""
        return str(self.storage_path / filename)
