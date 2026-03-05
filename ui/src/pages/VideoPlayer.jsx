import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recordingsAPI } from '../services/api';

const VideoPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [recording, setRecording] = useState(null);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        loadRecording();
    }, [id]);

    const loadRecording = async () => {
        try {
            const response = await recordingsAPI.getById(id);
            setRecording(response.data);
        } catch (error) {
            console.error('Error loading recording:', error);
            alert('Recording not found');
            navigate('/library');
        }
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSpeedChange = (speed) => {
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };

    if (!recording) {
        return (
            <div className="p-8">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <button
                onClick={() => navigate('/library')}
                className="mb-4 text-blue-600 hover:text-blue-800"
            >
                ← Back to Library
            </button>

            <h1 className="text-3xl font-bold mb-6">{recording.title}</h1>

            <div className="bg-black rounded-lg overflow-hidden mb-6">
                <video
                    ref={videoRef}
                    className="w-full"
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                >
                    <source src={`http://localhost:8000/recordings/${recording.filename}`} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={handlePlayPause}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Speed:</span>
                        {[0.5, 1, 1.5, 2].map((speed) => (
                            <button
                                key={speed}
                                onClick={() => handleSpeedChange(speed)}
                                className={`px-3 py-1 rounded ${playbackSpeed === speed
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {speed}x
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-600">Duration</p>
                        <p className="font-medium">{Math.floor(recording.duration / 60)} minutes</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Resolution</p>
                        <p className="font-medium">{recording.resolution}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Format</p>
                        <p className="font-medium">{recording.format.toUpperCase()}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">File Size</p>
                        <p className="font-medium">{(recording.file_size / (1024 ** 2)).toFixed(2)} MB</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
