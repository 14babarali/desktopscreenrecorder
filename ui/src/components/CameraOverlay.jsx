import React, { useRef, useEffect, useState } from 'react';

const CameraOverlay = ({ enabled, onStreamReady }) => {
    const videoRef = useRef(null);
    const [position, setPosition] = useState({ x: 20, y: 20 });
    const [size, setSize] = useState({ width: 200, height: 150 });
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (enabled) {
            startCamera();
        } else {
            stopCamera();
        }
    }, [enabled]);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            if (onStreamReady) {
                onStreamReady(stream);
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    if (!enabled) return null;

    return (
        <div
            className="absolute bg-black rounded-lg overflow-hidden shadow-lg cursor-move"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default CameraOverlay;
