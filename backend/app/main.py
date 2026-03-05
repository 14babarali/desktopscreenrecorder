"""
FastAPI main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
from pathlib import Path
import os

from app.core.config import settings
from app.core.database import connect_db, close_db
from app.api import recordings, processing, storage, upload


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Ensure recordings directory exists
    recordings_dir = Path(settings.STORAGE_PATH)
    recordings_dir.mkdir(parents=True, exist_ok=True)
    
    await connect_db()
    yield
    await close_db()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recordings.router, prefix="/api/recordings", tags=["recordings"])
app.include_router(processing.router, prefix="/api/processing", tags=["processing"])
app.include_router(storage.router, prefix="/api/storage", tags=["storage"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])

# Serve video files
@app.get("/recordings/{filename}")
async def serve_recording(filename: str):
    """Serve recording file"""
    file_path = Path(settings.STORAGE_PATH) / filename
    if not file_path.exists():
        return {"error": "File not found"}
    return FileResponse(file_path)


@app.get("/")
async def root():
    return {"message": "Recording API", "version": settings.VERSION}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
