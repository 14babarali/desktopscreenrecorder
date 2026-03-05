import React from 'react';

const RecorderControls = ({
    isRecording,
    isPaused,
    recordingTime,
    onStart,
    onPause,
    onResume,
    onStop,
    onToggleMic,
    onToggleCamera,
    micEnabled,
    cameraEnabled
}) => {
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {!isRecording ? (
                        <button
                            onClick={onStart}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                        >
                            Start Recording
                        </button>
                    ) : (
                        <>
                            {isPaused ? (
                                <button
                                    onClick={onResume}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Resume
                                </button>
                            ) : (
                                <button
                                    onClick={onPause}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg"
                                >
                                    Pause
                                </button>
                            )}
                            <button
                                onClick={onStop}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                            >
                                Stop
                            </button>
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-2xl font-mono font-bold">
                        {formatTime(recordingTime)}
                    </div>

                    <button
                        onClick={onToggleMic}
                        className={`p-3 rounded-lg ${micEnabled ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        🎤
                    </button>

                    <button
                        onClick={onToggleCamera}
                        className={`p-3 rounded-lg ${cameraEnabled ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        📹
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecorderControls;
