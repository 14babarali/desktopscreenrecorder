# 🚀 START HERE - Quick Launch Guide

## The White Screen Issue - SOLVED!

The white screen happens when Electron starts before the Vite dev server is ready. Here's how to fix it:

## ✅ Correct Startup Order

### IMPORTANT: The error you saw is now FIXED!
The "require is not defined" error has been resolved. All Electron files now use ES modules.

### Step 1: Start Backend (Terminal 1)
```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Wait for**: `Uvicorn running on http://127.0.0.1:8000`

### Step 2: Start Vite Dev Server (Terminal 2)
```powershell
cd ui
npm run dev
```

**Wait for**: `Local: http://localhost:5173/`

### Step 3: Start Electron (Terminal 3)
```powershell
cd ui
npm run electron
```

**OR use the automated script:**
```powershell
cd ui
.\start-app.bat
```

## 🎯 One-Click Solution (Recommended)

### Option A: Use Batch Files

1. **Double-click** `start-backend.bat` (wait for it to start)
2. **Open new terminal**, navigate to `ui` folder
3. **Run**: `npm run dev` (wait for it to start)
4. **Open another terminal**, navigate to `ui` folder
5. **Run**: `npm run electron`

### Option B: Manual PowerShell

**Terminal 1 - Backend:**
```powershell
cd H:\PeaceDeveloper\02_learning\desktopscreenrecorder\backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Terminal 2 - Vite:**
```powershell
cd H:\PeaceDeveloper\02_learning\desktopscreenrecorder\ui
npm run dev
```

**Terminal 3 - Electron:**
```powershell
cd H:\PeaceDeveloper\02_learning\desktopscreenrecorder\ui
npm run electron
```

## 🔍 Troubleshooting White Screen

### Issue: Electron shows white screen

**Cause**: Electron started before Vite dev server was ready

**Solution**:
1. Close Electron window
2. Make sure you see `Local: http://localhost:5173/` in terminal
3. Open browser to http://localhost:5173/ - you should see the app
4. If browser works, then run `npm run electron` again

### Issue: "Failed to load resource"

**Solution**:
1. Check Vite is running: http://localhost:5173/
2. Check for errors in Vite terminal
3. Try: `npm install` then `npm run dev` again

### Issue: React Router errors

**Solution**:
```powershell
cd ui
npm install react-router-dom
npm run dev
```

## 📋 Pre-Flight Checklist

Before starting, verify:

- [ ] MongoDB is running: `net start MongoDB`
- [ ] Backend dependencies installed: `pip install -r requirements.txt`
- [ ] Frontend dependencies installed: `npm install` (in ui folder)
- [ ] FFmpeg is installed: `ffmpeg -version`
- [ ] Port 8000 is free (backend)
- [ ] Port 5173 is free (frontend)

## 🎬 First Time Setup

### 1. Install Dependencies

**Backend:**
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

**Frontend:**
```powershell
cd ui
npm install
```

### 2. Start MongoDB
```powershell
net start MongoDB
```

### 3. Create .env file
```powershell
cd backend
copy .env.example .env
```

## ✨ Success Indicators

You'll know everything is working when:

1. **Backend Terminal** shows:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   INFO:     Application startup complete.
   ```

2. **Vite Terminal** shows:
   ```
   VITE v5.4.21  ready in 1061 ms
   ➜  Local:   http://localhost:5173/
   ```

3. **Browser** (http://localhost:5173/) shows the app interface

4. **Electron Window** opens and shows the same interface

## 🎮 Testing the App

Once everything is running:

1. You should see the **Dashboard** page
2. Click **"Record"** in the sidebar
3. You should see screen selection options
4. Click **"Library"** to see recordings
5. Click **"Settings"** to configure

## 🐛 Common Errors & Fixes

### Error: "Cannot GET /"
**Fix**: Vite server not running. Run `npm run dev` first.

### Error: "net::ERR_CONNECTION_REFUSED"
**Fix**: Backend not running. Start backend first.

### Error: "Module not found"
**Fix**: 
```powershell
cd ui
rm -rf node_modules package-lock.json
npm install
```

### Error: White screen with no errors
**Fix**: 
1. Open DevTools in Electron (Ctrl+Shift+I)
2. Check Console for errors
3. Make sure http://localhost:5173/ works in browser first

## 📞 Still Having Issues?

1. **Check all three terminals** for error messages
2. **Open browser** to http://localhost:5173/ - does it work?
3. **Check DevTools** in Electron (Ctrl+Shift+I)
4. **Verify ports**:
   - Backend: http://localhost:8000/health
   - Frontend: http://localhost:5173/
5. **Read**: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 🎉 Quick Test

Once the app opens:

1. Click "Record" → Should show screen selector
2. Click "Library" → Should show empty library
3. Click "Settings" → Should show settings page
4. Click "Dashboard" → Should show stats

If all pages load, you're ready to record! 🎥

## 💡 Pro Tips

- Keep all three terminals open while using the app
- Don't close the Vite terminal - it's needed for hot reload
- Backend terminal shows API requests
- Use Ctrl+Shift+I in Electron to see console logs

---

**Need Help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or [WINDOWS_QUICKSTART.md](WINDOWS_QUICKSTART.md)
