import React, { useState, useEffect } from 'react';

const ScreenSelector = ({ onSelect }) => {
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadSources();
    }, []);

    const loadSources = async () => {
        try {
            setLoading(true);
            setError(null);

            if (window.electronAPI) {
                const sources = await window.electronAPI.getSources();
                console.log('Loaded sources:', sources);
                setSources(sources);

                // Auto-select first source if available
                if (sources.length > 0 && !selectedSource) {
                    handleSelect(sources[0]);
                }
            } else {
                setError('Electron API not available. Please run in Electron.');
            }
        } catch (err) {
            console.error('Error loading sources:', err);
            setError('Failed to load screens and windows');
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (source) => {
        console.log('Selected source:', source);
        setSelectedSource(source);
        if (onSelect) {
            onSelect(source);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Select Screen or Window</h3>
                <p className="text-gray-500">Loading available screens...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Select Screen or Window</h3>
                <p className="text-red-500">{error}</p>
                <button
                    onClick={loadSources}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (sources.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Select Screen or Window</h3>
                <p className="text-gray-500">No screens or windows available</p>
                <button
                    onClick={loadSources}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Select Screen or Window</h3>
            <div className="grid grid-cols-2 gap-4">
                {sources.map((source) => (
                    <div
                        key={source.id}
                        onClick={() => handleSelect(source)}
                        className={`cursor-pointer border-2 rounded-lg p-4 hover:border-blue-500 transition ${selectedSource?.id === source.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                    >
                        <img
                            src={source.thumbnail}
                            alt={source.name}
                            className="w-full h-32 object-cover rounded mb-2"
                        />
                        <p className="text-sm font-medium truncate">{source.name}</p>
                    </div>
                ))}
            </div>
            {selectedSource && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800">
                        ✓ Selected: {selectedSource.name}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ScreenSelector;
