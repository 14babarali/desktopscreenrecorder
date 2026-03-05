import React, { useState, useRef } from 'react';

const Timeline = ({ duration, currentTime, onSeek }) => {
    const [isDragging, setIsDragging] = useState(false);
    const timelineRef = useRef(null);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleSeek(e);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleSeek = (e) => {
        if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            const newTime = percentage * duration;
            onSeek(Math.max(0, Math.min(newTime, duration)));
        }
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            <div
                ref={timelineRef}
                className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="absolute h-full bg-blue-600 rounded-full"
                    style={{ width: `${progress}%` }}
                />
                <div
                    className="absolute w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2"
                    style={{ left: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default Timeline;
