"""
Application configuration
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "Recording API"
    VERSION: str = "1.0.0"
    
    # Database
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "recording_app"
    
    # Storage
    STORAGE_PATH: str = "./recordings"
    MAX_STORAGE_GB: int = 100
    
    # Recording
    DEFAULT_FPS: int = 30
    DEFAULT_RESOLUTION: str = "1080p"
    SUPPORTED_FORMATS: list = ["mp4", "webm", "mkv"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
