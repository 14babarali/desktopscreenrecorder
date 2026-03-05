import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecorderControls from '../components/RecorderControls';
import CameraOverlay from '../components/CameraOverlay';
import { useRecorder } from '../hooks/useRecorder';
import { recordingsAPI, uploadAPI } from '../services/api';

const RecorderScreen = () => {
    const navigate = useNavigate();
    const [micEnabled, setMicEnabled] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [resolution, setResolution] = useState('1080p');
    const [fps, setFps] = useState(30);

    const {
        isRecording,
        isPaused,
        recordingTime,
        recordedChunks,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
    } = useRecorder();

    useEffect(() => {
        if (recordedChunks.length > 0) {
            saveRecording();
        }
    }, [recordedChunks]);

    const handleStartRecording = async () => {
        try {
            console.log('Starting recording...');

            // Auto-select first screen source
            let selectedSource = null;

            if (window.electronAPI) {
                const sources = await window.electronAPI.getSources();
                // Find first screen (not window)
                selectedSource = sources.find(s => s.id.startsWith('screen:')) || sources[0];
                console.log('Auto-selected source:', selectedSource);
            }

            if (!selectedSource) {
                alert('No screen sources available');
                return;
            }

            // Get screen stream WITH system audio
            const constraints = {
                audio: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: selectedSource.id,
                    },
                },
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: selectedSource.id,
                        minWidth: 1280,
                        maxWidth: 3840,
                        minHeight: 720,
                        maxHeight: 2160,
                    },
                },
            };

            console.log('Requesting screen stream with system audio...');
            const screenStream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log('Screen stream obtained with tracks:', screenStream.getTracks().map(t => `${t.kind}: ${t.label}`));

            // Get microphone stream if enabled and mix with system audio
            if (micEnabled) {
                try {
                    const audioStream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: true,
                        },
                    });

                    // Mix system audio and microphone audio
                    const audioContext = new AudioContext();
                    const systemAudioSource = audioContext.createMediaStreamSource(screenStream);
                    const micAudioSource = audioContext.createMediaStreamSource(audioStream);
                    const destination = audioContext.createMediaStreamDestination();

                    systemAudioSource.connect(destination);
                    micAudioSource.connect(destination);

                    // Replace audio track with mixed audio
                    const systemAudioTrack = screenStream.getAudioTracks()[0];
                    if (systemAudioTrack) {
                        screenStream.removeTrack(systemAudioTrack);
                        systemAudioTrack.stop();
                    }

                    const mixedAudioTrack = destination.stream.getAudioTracks()[0];
                    screenStream.addTrack(mixedAudioTrack);

                    console.log('Mixed system audio + microphone');
                } catch (audioError) {
                    console.warn('Could not get microphone:', audioError);
                }
            }

            await startRecording(screenStream);
            console.log('Recording started successfully');
        } catch (error) {
            console.error('Error starting recording:', error);
            alert(`Failed to start recording: ${error.message}`);
        }
    };

    const saveRecording = async () => {
        console.log('Saving recording...');
        console.log('Recorded chunks:', recordedChunks.length);

        if (recordedChunks.length === 0) {
            console.error('No recorded chunks to save');
            alert('No recording data captured. Please try again.');
            return;
        }

        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        console.log('Blob created:', blob.size, 'bytes');

        if (blob.size === 0) {
            console.error('Blob is empty');
            alert('Recording failed - no data captured');
            return;
        }

        const filename = `recording_${Date.now()}.webm`;

        try {
            // Upload video file to backend
            console.log('Uploading video to backend...');
            const uploadResponse = await uploadAPI.uploadVideo(blob, filename);
            console.log('Upload response:', uploadResponse.data);

            // Save metadata to backend
            const recordingData = {
                title: `Recording ${new Date().toLocaleString()}`,
                filename,
                file_path: uploadResponse.data.file_path,
                file_size: blob.size,
                duration: recordingTime,
                resolution,
                fps,
                format: 'webm',
                has_screen: true,
                has_camera: cameraEnabled,
                has_system_audio: true, // System audio is always captured
                has_microphone: micEnabled,
                tags: [],
            };

            console.log('Saving metadata to backend:', recordingData);
            await recordingsAPI.create(recordingData);
            console.log('Metadata saved successfully');

            alert(`Recording saved successfully!\nFile: ${filename}\nSize: ${(blob.size / 1024 / 1024).toFixed(2)} MB\nDuration: ${recordingTime}s`);
            navigate('/library');
        } catch (error) {
            console.error('Error saving recording:', error);
            alert(`Failed to save recording: ${error.message}`);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Screen Recorder</h1>

            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Recording Settings</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Resolution</label>
                            <select
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                disabled={isRecording}
                            >
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                                <option value="4k">4K</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">FPS</label>
                            <select
                                value={fps}
                                onChange={(e) => setFps(Number(e.target.value))}
                                className="w-full border rounded px-3 py-2"
                                disabled={isRecording}
                            >
                                <option value={15}>15 FPS</option>
                                <option value={30}>30 FPS</option>
                                <option value={60}>60 FPS</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        <div className="p-4 bg-green-50 border border-green-200 rounded">
                            <p className="text-sm text-green-800">
                                ✓ System audio will be captured automatically
                            </p>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm text-blue-800">
                                ℹ️ Enable microphone below to add your voice to the recording
                            </p>
                        </div>
                    </div>
                </div>

                <RecorderControls
                    isRecording={isRecording}
                    isPaused={isPaused}
                    recordingTime={recordingTime}
                    onStart={handleStartRecording}
                    onPause={pauseRecording}
                    onResume={resumeRecording}
                    onStop={stopRecording}
                    onToggleMic={() => setMicEnabled(!micEnabled)}
                    onToggleCamera={() => setCameraEnabled(!cameraEnabled)}
                    micEnabled={micEnabled}
                    cameraEnabled={cameraEnabled}
                />

                <CameraOverlay enabled={cameraEnabled && isRecording} />
            </div>
        </div>
    );
};

export default RecorderScreen;
