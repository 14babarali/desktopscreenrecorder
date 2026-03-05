import React from 'react';

const SettingsPanel = ({ settings, onChange }) => {
    const handleChange = (key, value) => {
        onChange({ ...settings, [key]: value });
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Recording Settings</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Resolution</label>
                    <select
                        value={settings.resolution}
                        onChange={(e) => handleChange('resolution', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="720p">720p (1280x720)</option>
                        <option value="1080p">1080p (1920x1080)</option>
                        <option value="4k">4K (3840x2160)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Frame Rate</label>
                    <select
                        value={settings.fps}
                        onChange={(e) => handleChange('fps', Number(e.target.value))}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value={15}>15 FPS</option>
                        <option value={30}>30 FPS</option>
                        <option value={60}>60 FPS</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Output Format</label>
                    <select
                        value={settings.format}
                        onChange={(e) => handleChange('format', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="webm">WebM</option>
                        <option value="mp4">MP4</option>
                        <option value="mkv">MKV</option>
                    </select>
                </div>

                <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Audio Enhancement</h4>

                    <label className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={settings.noiseSuppression}
                            onChange={(e) => handleChange('noiseSuppression', e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-sm">Noise Suppression</span>
                    </label>

                    <label className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={settings.echoCancellation}
                            onChange={(e) => handleChange('echoCancellation', e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-sm">Echo Cancellation</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.autoGainControl}
                            onChange={(e) => handleChange('autoGainControl', e.target.checked)}
                            className="mr-2"
                        />
                        <span className="text-sm">Auto Gain Control</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
