import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RecorderScreen from './pages/RecorderScreen';
import RecordingLibrary from './pages/RecordingLibrary';
import VideoPlayer from './pages/VideoPlayer';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/recorder" element={<RecorderScreen />} />
                    <Route path="/library" element={<RecordingLibrary />} />
                    <Route path="/player/:id" element={<VideoPlayer />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
