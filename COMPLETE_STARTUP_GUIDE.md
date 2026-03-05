# Complete Startup Guide - Desktop Recording App

## 🎯 What You Need Running

The desktop app has **3 components** that must all be running:

```
┌─────────────────────────────────────────┐
│  1. MongoDB (Database)                  │
│     Port: 27017                         │
│     Stores: Recording metadata          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  2. Backend API (FastAPI)               │
│     Port: 8000                          │
│     Does: Save/Load recordings          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  3. Desktop App (Electron)              │
│     UI: Recording interface             │
│     Does: Capture screen, show library  │
└─────────────────────────────────────────┘
```

## 🚀 Easiest Way: One-Click Start

**Double-click**: `START_DESKTOP_APP.bat`

This automatically starts everything in the correct order!

## 📋 Manual Start (3 Terminals)

### Terminal 1: Start MongoDB
```powershell
net start MongoDB
```

### Terminal 2: Start Backend
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Wait for**: `Uvicorn running on http://127.0.0.1:8000`

### Terminal 3: Start Desktop App
```powershell
cd ui
npm run electron:dev
```

**Wait for**: Electron window opens

## ✅ Verification Steps

### Step 1: Check MongoDB
```powershell
sc query MongoDB
```
Should show: `STATE: 4 RUNNING`

### Step 2: Check Backend
Open browser: http://localhost:8000/health

Should show: `{"status":"healthy"}`

### Step 3: Check Desktop App
- Electron window should be open
- Click "Dashboard" → Should show stats (not loading forever)
- Click "Library" → Should show "No recordings found" or list

## 🎬 First Recording Test

1. **Click "Record"** in sidebar
2. **Click "Start Recording"** button
3. **Do something on screen** (move mouse, type, etc.)
4. **Click "Stop"** after a few seconds
5. **Should redirect to Library**
6. **Should see your recording!**

## 🐛 Troubleshooting

### Problem: "Loading recordings..." forever

**Cause**: Backend not running

**Fix**:
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Problem: "Failed to save recording"

**Cause**: Backend or MongoDB not running

**Fix**:
```powershell
# Start MongoDB
net start MongoDB

# Start Backend
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

### Problem: Backend won't start

**Cause**: MongoDB not running

**Fix**:
```powershell
net start MongoDB
```

Then restart backend.

### Problem: "Port 8000 already in use"

**Cause**: Backend already running somewhere

**Fix**:
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill it (replace PID with actual number)
taskkill /PID <PID> /F
```

## 📊 Status Indicators

### Backend Running ✅
```
Terminal shows:
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Backend NOT Running ❌
```
Desktop app shows:
- "Loading recordings..." forever
- "Failed to save recording"
- Network errors in console
```

### MongoDB Running ✅
```powershell
sc query MongoDB
# Shows: STATE: 4 RUNNING
```

### MongoDB NOT Running ❌
```
Backend shows:
ServerSelectionTimeoutError: localhost:27017
```

## 🎯 Quick Reference

### Start Everything
```powershell
# Option 1: One-click
START_DESKTOP_APP.bat

# Option 2: Manual
# Terminal 1
net start MongoDB

# Terminal 2
cd backend && venv\Scripts\activate && uvicorn app.main:app --reload

# Terminal 3
cd ui && npm run electron:dev
```

### Stop Everything
```powershell
# Stop Electron: Close window or Ctrl+C in terminal
# Stop Backend: Ctrl+C in backend terminal
# Stop MongoDB: net stop MongoDB (optional)
```

### Check Status
```powershell
# MongoDB
sc query MongoDB

# Backend
curl http://localhost:8000/health

# Desktop App
# Should be visible window
```

## 📝 Daily Usage

### Starting Your Day
1. Run `START_DESKTOP_APP.bat`
2. Wait for Electron window to open
3. Start recording!

### During the Day
- Keep all 3 terminals open
- Don't close backend terminal
- Desktop app can be minimized

### End of Day
- Close Electron window
- Ctrl+C in backend terminal
- (Optional) `net stop MongoDB`

## 🎓 Understanding the Architecture

### Why 3 Components?

1. **MongoDB** = Database
   - Stores recording metadata (title, duration, etc.)
   - Runs as Windows service

2. **Backend API** = Server
   - Saves recordings to database
   - Loads recordings for library
   - Processes video files

3. **Desktop App** = Client
   - User interface
   - Captures screen
   - Sends data to backend

### Data Flow

```
User clicks "Start Recording"
        ↓
Desktop App captures screen
        ↓
User clicks "Stop"
        ↓
Desktop App sends metadata to Backend
        ↓
Backend saves to MongoDB
        ↓
Desktop App shows in Library
```

## ✨ Success Checklist

Before recording:
- [ ] MongoDB running (`sc query MongoDB`)
- [ ] Backend running (http://localhost:8000/health works)
- [ ] Desktop app open
- [ ] Dashboard shows stats (not loading)
- [ ] Library shows recordings or "No recordings found"

After recording:
- [ ] Recording saves successfully
- [ ] Redirects to Library
- [ ] Recording appears in list
- [ ] Can play recording

---

**Remember**: All 3 components must be running for the app to work!

**Easiest way**: Just run `START_DESKTOP_APP.bat` 🚀
