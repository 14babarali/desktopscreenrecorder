import React, { useState, useEffect } from 'react';
import { storageAPI } from '../services/api';

const Settings = () => {
    const [storageInfo, setStorageInfo] = useState(null);
    const [settings, setSettings] = useState({
        defaultResolution: '1080p',
        defaultFps: 30,
        defaultFormat: 'mp4',
        autoSave: true,
        storageLimit: 100,
    });

    useEffect(() => {
        loadStorageInfo();
    }, []);

    const loadStorageInfo = async () => {
        try {
            const response = await storageAPI.getInfo();
            setStorageInfo(response.data);
        } catch (error) {
            console.error('Error loading storage info:', error);
        }
    };

    const handleSave = () => {
        localStorage.setItem('recordingSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Video Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Default Resolution</label>
                            <select
                                value={settings.defaultResolution}
                                onChange={(e) => setSettings({ ...settings, defaultResolution: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="720p">720p</option>
                                <option value="1080p">1080p</option>
                                <option value="4k">4K</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Default FPS</label>
                            <select
                                value={settings.defaultFps}
                                onChange={(e) => setSettings({ ...settings, defaultFps: Number(e.target.value) })}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value={15}>15 FPS</option>
                                <option value={30}>30 FPS</option>
                                <option value={60}>60 FPS</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Default Format</label>
                            <select
                                value={settings.defaultFormat}
                                onChange={(e) => setSettings({ ...settings, defaultFormat: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="mp4">MP4</option>
                                <option value="webm">WebM</option>
                                <option value="mkv">MKV</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Storage Settings</h2>

                    {storageInfo && (
                        <div className="mb-4 p-4 bg-gray-50 rounded">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-600">Total Storage</p>
                                    <p className="font-medium">{storageInfo.total_gb.toFixed(2)} GB</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Used</p>
                                    <p className="font-medium">{storageInfo.used_gb.toFixed(2)} GB</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Free</p>
                                    <p className="font-medium">{storageInfo.free_gb.toFixed(2)} GB</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Recordings</p>
                                    <p className="font-medium">{storageInfo.recordings_gb.toFixed(2)} GB</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">Storage Path</label>
                        <input
                            type="text"
                            value={storageInfo?.storage_path || ''}
                            disabled
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Audio Settings</h2>

                    <div className="space-y-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span>Enable Noise Suppression</span>
                        </label>

                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" defaultChecked />
                            <span>Enable Echo Cancellation</span>
                        </label>

                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <span>Auto Gain Control</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    Save Settings
                </button>
            </div>
        </div>
    );
};

export default Settings;
