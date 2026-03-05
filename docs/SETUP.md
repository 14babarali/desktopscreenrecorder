# Setup Guide

## Prerequisites

### Required Software
- Node.js 18+ and npm
- Python 3.9+
- MongoDB 5.0+
- FFmpeg

### Installation

#### Windows
```bash
# Install Node.js from https://nodejs.org/
# Install Python from https://www.python.org/

# Install MongoDB
winget install MongoDB.Server

# Install FFmpeg
winget install FFmpeg
```

#### macOS
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install dependencies
brew install node python mongodb-community ffmpeg
```

#### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt-get install python3 python3-pip python3-venv

# Install MongoDB
sudo apt-get install mongodb

# Install FFmpeg
sudo apt-get install ffmpeg
```

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment
```bash
python -m venv venv
```

### 3. Activate virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Configure environment
```bash
cp .env.example .env
```

Edit `.env` file:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=recording_app
STORAGE_PATH=./recordings
MAX_STORAGE_GB=100
```

### 6. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### 7. Run backend
```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000

## Frontend Setup

### 1. Navigate to ui directory
```bash
cd ui
```

### 2. Install dependencies
```bash
npm install
```

### 3. Development mode

**Option A: Web only**
```bash
npm run dev
```

**Option B: Electron app**
```bash
npm run electron:dev
```

### 4. Build for production
```bash
# Build web assets
npm run build

# Package Electron app
npm run package
```

## Verification

### Test Backend
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

### Test Frontend
Open browser to: http://localhost:5173

### Test Electron
The Electron window should open automatically with `npm run electron:dev`

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URL in .env
- Verify MongoDB port (default: 27017)

### FFmpeg Not Found
- Ensure FFmpeg is in system PATH
- Test: `ffmpeg -version`

### Port Already in Use
- Backend: Change port in uvicorn command
- Frontend: Change port in vite.config.js

### Electron Window Not Opening
- Check console for errors
- Ensure Vite dev server is running
- Try: `npm run dev` first, then `npm run electron`

## Next Steps

1. Create your first recording
2. Explore the recording library
3. Configure settings
4. Review API documentation
