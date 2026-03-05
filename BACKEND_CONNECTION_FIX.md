# Backend Connection Fix

## Problem
The desktop app shows "Loading recordings..." forever because the backend API is not running.

## Solution

The desktop app needs **3 things running**:

1. ✅ **MongoDB** - Database
2. ✅ **Backend API** - FastAPI server
3. ✅ **Electron App** - Desktop application

## Quick Start

### Option 1: Use the Startup Script (Easiest)

**Double-click**: `START_DESKTOP_APP.bat`

This will:
1. Start MongoDB
2. Start Backend API
3. Start Vite Dev Server
4. Start Electron App

### Option 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Terminal 2 - Electron:**
```powershell
cd ui
npm run electron:dev
```

## Verify Backend is Running

### Check 1: Terminal Output
You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Check 2: Browser Test
Open: http://localhost:8000/health

Should return:
```json
{"status":"healthy"}
```

### Check 3: API Docs
Open: http://localhost:8000/docs

Should show interactive API documentation.

## Verify Connection in Desktop App

### Dashboard Page
- Should show storage statistics
- Should show "0" recordings (if none exist)
- No loading spinner

### Library Page
- Should show "No recordings found" (if none exist)
- NOT "Loading recordings..."
- Search bar should work

### After Recording
- Click "Record" → "Start Recording" → "Stop"
- Should redirect to Library
- Should show your recording

## Common Issues

### Issue: "Loading recordings..." forever

**Cause**: Backend not running

**Fix**:
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Issue: "Failed to save recording"

**Cause**: Backend not running or MongoDB not running

**Fix**:
```powershell
# Start MongoDB
net start MongoDB

# Start Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Issue: "Network Error" in console

**Cause**: Backend not accessible

**Fix**: Check backend is running on port 8000

### Issue: Backend starts but crashes

**Cause**: MongoDB not running

**Fix**:
```powershell
net start MongoDB
```

## Architecture

```
Desktop App (Electron)
        ↓
    HTTP Requests
        ↓
Backend API (FastAPI) ← Port 8000
        ↓
    MongoDB ← Port 27017
```

All three must be running!

## Startup Checklist

Before using the app:

- [ ] MongoDB is running: `net start MongoDB`
- [ ] Backend is running: Check http://localhost:8000/health
- [ ] Electron app is open
- [ ] Can see Dashboard (not loading forever)
- [ ] Can navigate to Library (not loading forever)

## Testing the Connection

### Test 1: Dashboard
1. Open desktop app
2. Click "Dashboard"
3. Should see stats (not loading)

### Test 2: Library
1. Click "Library"
2. Should see "No recordings found" or list of recordings
3. NOT "Loading recordings..."

### Test 3: Recording
1. Click "Record"
2. Click "Start Recording"
3. Wait a few seconds
4. Click "Stop"
5. Should save and redirect to Library
6. Should see your recording

## Success Indicators

✅ Backend terminal shows: "Uvicorn running on http://127.0.0.1:8000"
✅ http://localhost:8000/health returns `{"status":"healthy"}`
✅ Dashboard shows stats (not loading)
✅ Library shows recordings or "No recordings found"
✅ Can record and save successfully

## Quick Commands

```powershell
# Check MongoDB status
sc query MongoDB

# Start MongoDB
net start MongoDB

# Start Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload

# Start Desktop App
cd ui
npm run electron:dev

# Or use the all-in-one script
START_DESKTOP_APP.bat
```

---

**Remember**: The desktop app is a **client** that needs the **backend server** to save/load recordings!
