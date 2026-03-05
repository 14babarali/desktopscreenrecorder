import React, { useState, useEffect } from 'react';
import { getAudioDevices } from '../utils/mediaDevices';

const MicSelector = ({ onSelect, enabled }) => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        try {
            const audioDevices = await getAudioDevices();
            setDevices(audioDevices);
            if (audioDevices.length > 0) {
                setSelectedDevice(audioDevices[0].deviceId);
            }
        } catch (error) {
            console.error('Error loading audio devices:', error);
        }
    };

    const handleDeviceChange = (deviceId) => {
        setSelectedDevice(deviceId);
        if (onSelect) {
            onSelect(deviceId);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Microphone</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Select Device</label>
                    <select
                        value={selectedDevice || ''}
                        onChange={(e) => handleDeviceChange(e.target.value)}
                        disabled={!enabled}
                        className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
                    >
                        {devices.map((device) => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
                            </option>
                        ))}
                    </select>
                </div>

                {enabled && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Volume Level</label>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-green-500 h-4 rounded-full transition-all"
                                style={{ width: `${volume}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MicSelector;
