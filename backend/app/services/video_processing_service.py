"""
Video processing service using FFmpeg
"""
import os
import asyncio
import subprocess
from typing import Optional

from app.core.config import settings


class VideoProcessingService:
    """Service for video processing operations"""
    
    async def merge_streams(
        self,
        screen_path: Optional[str] = None,
        camera_path: Optional[str] = None,
        audio_path: Optional[str] = None,
        output_path: str = None,
        resolution: str = "1080p",
        fps: int = 30
    ) -> str:
        """Merge multiple video/audio streams"""
        if not screen_path or not os.path.exists(screen_path):
            raise ValueError("Screen path is required and must exist")
        
        # Build FFmpeg command
        cmd = ['ffmpeg', '-i', screen_path]
        
        if camera_path and os.path.exists(camera_path):
            cmd.extend(['-i', camera_path])
        
        if audio_path and os.path.exists(audio_path):
            cmd.extend(['-i', audio_path])
        
        # Add output options
        resolution_params = self._get_resolution_params(resolution)
        cmd.extend([
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-s', resolution_params['s'],
            '-y',  # Overwrite output
            output_path
        ])
        
        # Run FFmpeg
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        await process.communicate()
        
        if process.returncode != 0:
            raise RuntimeError(f"FFmpeg failed with return code {process.returncode}")
        
        return output_path

    async def compress_video(
        self,
        input_path: str,
        output_path: str,
        target_size_mb: Optional[int] = None
    ) -> str:
        """Compress video file"""
        cmd = ['ffmpeg', '-i', input_path]
        
        if target_size_mb:
            # Calculate bitrate for target size (rough estimate)
            # Get duration first
            probe_cmd = ['ffprobe', '-v', 'error', '-show_entries', 
                        'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', 
                        input_path]
            process = await asyncio.create_subprocess_exec(
                *probe_cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, _ = await process.communicate()
            duration = float(stdout.decode().strip())
            
            # Calculate target bitrate
            target_bitrate = int((target_size_mb * 8192) / duration)
            cmd.extend(['-b:v', f'{target_bitrate}k'])
        else:
            cmd.extend(['-crf', '23'])
        
        cmd.extend(['-c:v', 'libx264', '-c:a', 'aac', '-y', output_path])
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        await process.communicate()
        
        if process.returncode != 0:
            raise RuntimeError(f"FFmpeg compression failed")
        
        return output_path
    
    async def convert_format(self, input_path: str, output_path: str, format: str) -> str:
        """Convert video to different format"""
        cmd = [
            'ffmpeg', '-i', input_path,
            '-f', format,
            '-y', output_path
        ]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        await process.communicate()
        
        if process.returncode != 0:
            raise RuntimeError(f"FFmpeg format conversion failed")
        
        return output_path
    
    def _get_resolution_params(self, resolution: str) -> dict:
        """Get FFmpeg parameters for resolution"""
        resolutions = {
            "720p": {"s": "1280x720"},
            "1080p": {"s": "1920x1080"},
            "4k": {"s": "3840x2160"}
        }
        return resolutions.get(resolution, resolutions["1080p"])
