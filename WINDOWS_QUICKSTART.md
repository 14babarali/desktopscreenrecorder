# Windows Quick Start Guide

## Prerequisites

### 1. Install Python 3.9+
Download from: https://www.python.org/downloads/
- ✅ Check "Add Python to PATH" during installation

### 2. Install Node.js 18+
Download from: https://nodejs.org/
- Choose LTS version
- ✅ Check "Automatically install necessary tools" during installation

### 3. Install MongoDB
```powershell
winget install MongoDB.Server
```
Or download from: https://www.mongodb.com/try/download/community

### 4. Install FFmpeg
```powershell
winget install Gyan.FFmpeg
```
Or download from: https://ffmpeg.org/download.html

## Verify Installation

Open PowerShell and run:
```powershell
python --version
node --version
npm --version
mongod --version
ffmpeg -version
```

All commands should return version numbers.

## Start MongoDB

```powershell
net start MongoDB
```

Or start MongoDB Compass if you have it installed.

## Option 1: Automated Start (Easiest)

### Step 1: Start Backend
Double-click `start-backend.bat` in the project root folder.

Wait for the message: "Uvicorn running on http://127.0.0.1:8000"

### Step 2: Start Frontend
Double-click `start-frontend.bat` in the project root folder.

The Electron app window will open automatically!

## Option 2: Manual Start

### Terminal 1 - Backend
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Terminal 2 - Frontend
```powershell
cd ui
npm install
npm run electron:dev
```

## Troubleshooting

### "Python is not recognized"
- Reinstall Python and check "Add to PATH"
- Or manually add Python to PATH

### "MongoDB connection failed"
```powershell
# Start MongoDB service
net start MongoDB

# Check if running
sc query MongoDB
```

### "FFmpeg not found"
- Verify FFmpeg is in PATH: `ffmpeg -version`
- If not, add FFmpeg bin folder to PATH
- Restart PowerShell after adding to PATH

### "Port 8000 already in use"
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### "Module not found" errors
```powershell
cd backend
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

### "npm install fails"
```powershell
cd ui
rmdir /s node_modules
del package-lock.json
npm cache clean --force
npm install
```

## Testing the Application

1. Backend health check:
   - Open browser: http://localhost:8000/health
   - Should see: `{"status":"healthy"}`

2. API documentation:
   - Open browser: http://localhost:8000/docs
   - You'll see interactive API documentation

3. Frontend:
   - The Electron window should open automatically
   - You should see the Dashboard

## First Recording

1. Click "Record" in the sidebar
2. Select a screen or window
3. Click "Start Recording"
4. Do something on screen
5. Click "Stop"
6. Go to "Library" to see your recording

## Stopping the Application

- Press `CTRL+C` in both terminal windows
- Or close the terminal windows

## Common Issues

### Issue: "Cannot find module 'pydantic_core'"
**Solution:**
```powershell
cd backend
venv\Scripts\activate
pip install --upgrade pydantic
```

### Issue: "MongoDB not running"
**Solution:**
```powershell
net start MongoDB
```

### Issue: Electron window doesn't open
**Solution:**
1. Make sure backend is running first
2. Check for errors in terminal
3. Try: `cd ui && npm run dev` first, then `npm run electron`

## File Locations

- **Backend**: `backend/`
- **Frontend**: `ui/`
- **Recordings**: `backend/recordings/` (created automatically)
- **Logs**: Check terminal output

## Next Steps

- Read [FEATURES.md](docs/FEATURES.md) for all features
- Check [API.md](docs/API.md) for API documentation
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help

## Quick Commands Reference

```powershell
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check MongoDB status
sc query MongoDB

# Activate Python virtual environment
cd backend
venv\Scripts\activate

# Deactivate virtual environment
deactivate

# Install Python packages
pip install -r requirements.txt

# Install Node packages
cd ui
npm install

# Start backend
uvicorn app.main:app --reload

# Start frontend dev server
npm run dev

# Start Electron
npm run electron:dev

# Build for production
npm run build
npm run package
```

## Success!

If you see:
- ✅ Backend running at http://localhost:8000
- ✅ Electron window opened
- ✅ Can navigate between pages
- ✅ Can select screen/window

You're all set! Start recording! 🎥
