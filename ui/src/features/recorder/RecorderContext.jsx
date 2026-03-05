import React, { createContext, useContext, useState } from 'react';

const RecorderContext = createContext();

export const useRecorderContext = () => {
    const context = useContext(RecorderContext);
    if (!context) {
        throw new Error('useRecorderContext must be used within RecorderProvider');
    }
    return context;
};

export const RecorderProvider = ({ children }) => {
    const [selectedSource, setSelectedSource] = useState(null);
    const [micEnabled, setMicEnabled] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [systemAudioEnabled, setSystemAudioEnabled] = useState(false);
    const [resolution, setResolution] = useState('1080p');
    const [fps, setFps] = useState(30);
    const [format, setFormat] = useState('webm');

    const value = {
        selectedSource,
        setSelectedSource,
        micEnabled,
        setMicEnabled,
        cameraEnabled,
        setCameraEnabled,
        systemAudioEnabled,
        setSystemAudioEnabled,
        resolution,
        setResolution,
        fps,
        setFps,
        format,
        setFormat,
    };

    return (
        <RecorderContext.Provider value={value}>
            {children}
        </RecorderContext.Provider>
    );
};
