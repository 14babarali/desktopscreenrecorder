import React, { useState, useEffect } from 'react';
import RecordingCard from '../components/RecordingCard';
import { recordingsAPI } from '../services/api';

const RecordingLibrary = () => {
    const [recordings, setRecordings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecordings();
    }, []);

    const loadRecordings = async () => {
        try {
            setLoading(true);
            const response = await recordingsAPI.getAll();
            setRecordings(response.data.recordings);
        } catch (error) {
            console.error('Error loading recordings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recording?')) {
            try {
                await recordingsAPI.delete(id);
                setRecordings(recordings.filter((r) => r.id !== id));
            } catch (error) {
                console.error('Error deleting recording:', error);
                alert('Failed to delete recording');
            }
        }
    };

    const filteredRecordings = recordings.filter((recording) => {
        const matchesSearch = recording.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = !filterTag || recording.tags.includes(filterTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Recording Library</h1>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search recordings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 border rounded px-4 py-2"
                    />
                    <select
                        value={filterTag}
                        onChange={(e) => setFilterTag(e.target.value)}
                        className="border rounded px-4 py-2"
                    >
                        <option value="">All Tags</option>
                        <option value="meeting">Meeting</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="demo">Demo</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">Loading recordings...</p>
                </div>
            ) : filteredRecordings.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No recordings found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecordings.map((recording) => (
                        <RecordingCard
                            key={recording.id}
                            recording={recording}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecordingLibrary;
