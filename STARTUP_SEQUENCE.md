# Startup Sequence Guide

## Why the White Screen Happens

```
❌ WRONG ORDER:
Electron starts → Tries to load http://localhost:5173 → Server not ready → White screen

✅ CORRECT ORDER:
Vite starts → Server ready at :5173 → Electron starts → Loads successfully
```

## Visual Startup Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    STEP 1: Backend                          │
│                                                             │
│  Terminal 1:                                                │
│  cd backend                                                 │
│  venv\Scripts\activate                                      │
│  uvicorn app.main:app --reload                             │
│                                                             │
│  ✅ Wait for: "Uvicorn running on http://127.0.0.1:8000"   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    STEP 2: Vite Dev Server                  │
│                                                             │
│  Terminal 2:                                                │
│  cd ui                                                      │
│  npm run dev                                                │
│                                                             │
│  ✅ Wait for: "Local: http://localhost:5173/"              │
│  ✅ Test in browser: Open http://localhost:5173/           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    STEP 3: Electron                         │
│                                                             │
│  Terminal 3:                                                │
│  cd ui                                                      │
│  npm run electron                                           │
│                                                             │
│  ✅ Electron window opens with app loaded                  │
└─────────────────────────────────────────────────────────────┘
```

## Timing is Everything!

```
Time    Terminal 1          Terminal 2          Terminal 3
────────────────────────────────────────────────────────────
0:00    Start backend       
0:05    ✅ Backend ready    
0:10                        Start Vite
0:15                        ✅ Vite ready
0:20                                            Start Electron
0:25                                            ✅ App loads!
```

## What Each Terminal Does

### Terminal 1: Backend (FastAPI)
```
Purpose: API server for saving recordings, metadata
Port: 8000
URL: http://localhost:8000
Health Check: http://localhost:8000/health
```

### Terminal 2: Vite Dev Server
```
Purpose: Serves React app with hot reload
Port: 5173
URL: http://localhost:5173
What it does: Compiles React → Serves HTML/JS/CSS
```

### Terminal 3: Electron
```
Purpose: Desktop app wrapper
What it does: Opens window → Loads http://localhost:5173
Needs: Vite server must be running first!
```

## Common Mistakes

### ❌ Mistake 1: Starting Electron First
```powershell
npm run electron:dev  # This starts BOTH Vite and Electron
# Problem: Electron might start before Vite is ready
```

**Solution**: Start them separately:
```powershell
# Terminal 1
npm run dev

# Wait for "Local: http://localhost:5173/"

# Terminal 2
npm run electron
```

### ❌ Mistake 2: Not Waiting
```
Start Vite → Immediately start Electron → White screen
```

**Solution**: Wait for confirmation messages!

### ❌ Mistake 3: Wrong Directory
```powershell
cd desktopscreenrecorder
npm run electron  # Wrong! You're in root directory
```

**Solution**: Always `cd ui` first!

## Verification Steps

### Step 1: Verify Backend
```powershell
# In browser or curl
http://localhost:8000/health

# Should return:
{"status":"healthy"}
```

### Step 2: Verify Vite
```powershell
# In browser
http://localhost:5173/

# Should show: Recording App interface
```

### Step 3: Verify Electron
```
Electron window opens
Shows same interface as browser
No white screen
No console errors (Ctrl+Shift+I)
```

## Quick Commands

### Start Everything (3 Terminals)

**Terminal 1:**
```powershell
cd backend && venv\Scripts\activate && uvicorn app.main:app --reload
```

**Terminal 2:**
```powershell
cd ui && npm run dev
```

**Terminal 3 (wait 5 seconds):**
```powershell
cd ui && npm run electron
```

## Debugging White Screen

### Check 1: Is Vite Running?
```powershell
# Look for this in Terminal 2:
VITE v5.4.21  ready in 1061 ms
➜  Local:   http://localhost:5173/
```

### Check 2: Does Browser Work?
```
Open: http://localhost:5173/
If browser shows app → Vite is working
If browser fails → Vite has an error
```

### Check 3: Electron Console
```
In Electron window: Ctrl+Shift+I
Check Console tab for errors
Look for: "Failed to load resource" or "Cannot GET /"
```

### Check 4: Network Tab
```
In Electron DevTools → Network tab
Refresh (Ctrl+R)
Should see: main.jsx, App.jsx, etc. loading
If 404 errors → Vite not running
```

## Recovery Steps

If you see white screen:

1. **Close Electron window**
2. **Check Terminal 2** - is Vite running?
3. **Test in browser** - http://localhost:5173/
4. **If browser works** - restart Electron
5. **If browser fails** - restart Vite

```powershell
# Restart Vite
Ctrl+C (in Terminal 2)
npm run dev
# Wait for "Local: http://localhost:5173/"

# Then restart Electron
npm run electron (in Terminal 3)
```

## Success Checklist

- [ ] MongoDB running
- [ ] Backend terminal shows "Uvicorn running"
- [ ] Vite terminal shows "Local: http://localhost:5173/"
- [ ] Browser shows app at http://localhost:5173/
- [ ] Electron window opens
- [ ] Electron shows app (not white screen)
- [ ] Can navigate between pages
- [ ] No console errors

## Pro Tips

1. **Always start in order**: Backend → Vite → Electron
2. **Wait for confirmation** messages before next step
3. **Test in browser first** before starting Electron
4. **Keep terminals open** while using the app
5. **Use Ctrl+Shift+I** in Electron to debug

---

**Still stuck?** → [START_HERE.md](START_HERE.md) | [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
