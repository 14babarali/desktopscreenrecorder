import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecordingCard = ({ recording, onDelete }) => {
    const navigate = useNavigate();

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatFileSize = (bytes) => {
        const gb = bytes / (1024 ** 3);
        const mb = bytes / (1024 ** 2);
        return gb >= 1 ? `${gb.toFixed(2)} GB` : `${mb.toFixed(2)} MB`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-4xl">🎥</span>
            </div>

            <h3 className="font-semibold text-lg mb-2 truncate">{recording.title}</h3>

            <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>Duration: {formatDuration(recording.duration)}</p>
                <p>Size: {formatFileSize(recording.file_size)}</p>
                <p>Resolution: {recording.resolution}</p>
                <p className="text-xs">{formatDate(recording.created_at)}</p>
            </div>

            {recording.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {recording.tags.map((tag, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex gap-2">
                <button
                    onClick={() => navigate(`/player/${recording.id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                    Play
                </button>
                <button
                    onClick={() => onDelete(recording.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default RecordingCard;
