# Quick Startup Checklist ✅

Print this or keep it open while starting the app!

## Before You Start

- [ ] MongoDB is running: `net start MongoDB`
- [ ] You're in the project root directory
- [ ] You have 3 terminal windows ready

## Terminal 1: Backend

```powershell
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

- [ ] See: "Uvicorn running on http://127.0.0.1:8000"
- [ ] Test: http://localhost:8000/health returns `{"status":"healthy"}`

## Terminal 2: Vite Dev Server

```powershell
cd ui
npm run dev
```

- [ ] See: "Local: http://localhost:5173/"
- [ ] Test: http://localhost:5173/ shows the app in browser
- [ ] No errors in terminal

## Terminal 3: Electron

```powershell
cd ui
npm run electron
```

- [ ] Electron window opens
- [ ] App interface is visible (NOT white screen)
- [ ] Can see Dashboard page
- [ ] Sidebar navigation works

## Quick Test

- [ ] Click "Record" → See screen selector
- [ ] Click "Library" → See library page
- [ ] Click "Settings" → See settings page
- [ ] Click "Dashboard" → Back to dashboard

## If White Screen Appears

1. [ ] Close Electron window
2. [ ] Check Terminal 2 - is Vite running?
3. [ ] Open browser to http://localhost:5173/
4. [ ] If browser works, restart Electron
5. [ ] If browser fails, restart Vite (Ctrl+C, then `npm run dev`)

## Common Issues

### "MongoDB connection failed"
```powershell
net start MongoDB
```

### "Port 8000 already in use"
```powershell
# Find and kill the process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### "Cannot find module"
```powershell
cd ui
npm install
```

### "Module 'pydantic_core' not found"
```powershell
cd backend
venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Success! 🎉

If all checkboxes are checked, you're ready to record!

---

**Need detailed help?** → [START_HERE.md](START_HERE.md)
