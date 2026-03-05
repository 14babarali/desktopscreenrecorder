"""
Validation utilities
"""
from typing import Optional
from app.core.config import settings


def validate_resolution(resolution: str) -> bool:
    """Validate resolution format"""
    valid_resolutions = ["720p", "1080p", "4k"]
    return resolution.lower() in valid_resolutions


def validate_fps(fps: int) -> bool:
    """Validate FPS value"""
    valid_fps = [15, 30, 60]
    return fps in valid_fps


def validate_format(format: str) -> bool:
    """Validate video format"""
    return format.lower() in settings.SUPPORTED_FORMATS


def validate_file_size(size: int, max_size_gb: Optional[int] = None) -> bool:
    """Validate file size"""
    max_size = max_size_gb or settings.MAX_STORAGE_GB
    max_bytes = max_size * 1024 * 1024 * 1024
    return size <= max_bytes
