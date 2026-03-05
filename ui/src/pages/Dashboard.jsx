import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recordingsAPI, storageAPI } from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [recentRecordings, setRecentRecordings] = useState([]);
    const [storageInfo, setStorageInfo] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [recordingsRes, storageRes] = await Promise.all([
                recordingsAPI.getAll({ limit: 5 }),
                storageAPI.getInfo(),
            ]);
            setRecentRecordings(recordingsRes.data.recordings);
            setStorageInfo(storageRes.data);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-600 text-sm mb-2">Total Recordings</h3>
                    <p className="text-3xl font-bold">{recentRecordings.length}</p>
                </div>

                {storageInfo && (
                    <>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600 text-sm mb-2">Storage Used</h3>
                            <p className="text-3xl font-bold">{storageInfo.recordings_gb.toFixed(2)} GB</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-gray-600 text-sm mb-2">Storage Available</h3>
                            <p className="text-3xl font-bold">{storageInfo.free_gb.toFixed(2)} GB</p>
                        </div>
                    </>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/recorder')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Start New Recording
                    </button>
                    <button
                        onClick={() => navigate('/library')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        View Library
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Recordings</h2>
                {recentRecordings.length === 0 ? (
                    <p className="text-gray-500">No recordings yet. Start your first recording!</p>
                ) : (
                    <div className="space-y-3">
                        {recentRecordings.map((recording) => (
                            <div
                                key={recording.id}
                                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                                onClick={() => navigate(`/player/${recording.id}`)}
                            >
                                <div>
                                    <p className="font-medium">{recording.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(recording.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="text-blue-600">→</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
