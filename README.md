# Desktop Meeting & Screen Recording Application

A production-ready desktop application for recording meetings, screen captures, and managing recordings with advanced features.

## 🎉 **LATEST FIXES APPLIED** → [LATEST_FIXES.md](LATEST_FIXES.md)

## 🚀 **QUICK START** → Use `START_DESKTOP_APP.bat` (Windows)

**Important**: The desktop app needs the backend API running! See [BACKEND_CONNECTION_FIX.md](BACKEND_CONNECTION_FIX.md)

## Technology Stack

- **Frontend**: Electron, React, Tailwind CSS
- **Backend**: FastAPI (Python), MongoDB
- **Video Processing**: FFmpeg

## Features

- Screen Recording (Full/Window/Area)
- System Audio & Microphone Capture
- Webcam Overlay
- Meeting Recording
- Video Processing & Encoding
- Recording Library & Management
- Built-in Video Player
- Local Storage Management

## Prerequisites

- Node.js 18+
- Python 3.9+
- MongoDB 5.0+
- FFmpeg

## Setup Instructions

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

**Note**: If you encounter any installation issues, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

Create `.env` file in backend directory:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=recording_app
STORAGE_PATH=./recordings
```

Start backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd ui
npm install
```

Start development:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Project Structure

```
project-root/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── core/     # Configuration
│   │   ├── models/   # Database models
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   ├── api/      # API routes
│   │   └── utils/    # Utilities
│   └── requirements.txt
├── ui/               # Electron app
│   ├── electron/     # Electron main process
│   └── src/          # React frontend
└── docs/             # Documentation
```

## Usage

1. Launch the application
2. Select recording mode (screen/window/area)
3. Configure audio sources
4. Enable webcam overlay (optional)
5. Start recording
6. Access recordings from the library

## License

MIT
