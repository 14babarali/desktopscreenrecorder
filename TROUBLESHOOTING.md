# Troubleshooting Guide

## Common Installation Issues

### Issue 1: Pydantic Installation Fails (Rust/Cargo Error)

**Error Message:**
```
Cargo, the Rust package manager, is not installed or is not on PATH.
```

**Solution:**
The requirements.txt has been updated to use compatible versions. Run:

```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

If still failing, install packages individually:
```bash
pip install fastapi uvicorn[standard] motor pydantic pydantic-settings python-multipart python-dotenv aiofiles
```

### Issue 2: FFmpeg Module Not Found

**Error Message:**
```
ModuleNotFoundError: No module named 'ffmpeg'
```

**Solution:**
This has been fixed. The code now uses subprocess to call FFmpeg directly instead of the ffmpeg-python library.

**Make sure FFmpeg is installed on your system:**

**Windows:**
```powershell
# Check if FFmpeg is installed
ffmpeg -version

# If not installed, use winget
winget install Gyan.FFmpeg

# Or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

### Issue 3: MongoDB Connection Error

**Error Message:**
```
ServerSelectionTimeoutError: localhost:27017
```

**Solution:**

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB

# Or if using MongoDB Compass, start it from there
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Issue 4: Port Already in Use

**Error Message:**
```
OSError: [Errno 48] Address already in use
```

**Solution:**

**Change Backend Port:**
```bash
uvicorn app.main:app --reload --port 8001
```

**Change Frontend Port:**
Edit `ui/vite.config.js`:
```javascript
server: {
  port: 5174,  // Change from 5173
}
```

## Quick Fix Steps

### Step 1: Update Requirements
```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 2: Verify FFmpeg
```bash
ffmpeg -version
```

If not found, install FFmpeg for your OS (see above).

### Step 3: Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 4: Create .env File
```bash
cd backend
cp .env.example .env
```

### Step 5: Start Backend
```bash
cd backend
# Activate virtual environment first
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

uvicorn app.main:app --reload --port 8000
```

### Step 6: Start Frontend
```bash
cd ui
npm install
npm run dev
```

## Verification Commands

Run these to verify everything is working:

```bash
# Check Python
python --version

# Check pip
pip --version

# Check Node.js
node --version

# Check npm
npm --version

# Check MongoDB
mongod --version

# Check FFmpeg
ffmpeg -version

# Test backend
curl http://localhost:8000/health

# Expected response: {"status":"healthy"}
```

## Alternative: Simplified Installation

If you're still having issues, try this simplified approach:

### Backend (Minimal)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

pip install fastapi uvicorn motor pydantic python-dotenv aiofiles
```

### Run Backend
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd ui
npm install
npm run dev
```

## Still Having Issues?

1. **Check Python Version**: Must be 3.9 or higher
   ```bash
   python --version
   ```

2. **Check Node Version**: Must be 18 or higher
   ```bash
   node --version
   ```

3. **Clear Cache**:
   ```bash
   # Python
   pip cache purge
   
   # Node
   npm cache clean --force
   ```

4. **Reinstall Dependencies**:
   ```bash
   # Backend
   cd backend
   rm -rf venv  # Windows: rmdir /s venv
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   
   # Frontend
   cd ui
   rm -rf node_modules package-lock.json
   npm install
   ```

## Contact & Support

If issues persist:
1. Check error messages carefully
2. Verify all prerequisites are installed
3. Ensure MongoDB is running
4. Check that ports 8000 and 5173 are free
5. Review the logs in the terminal

## Success Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] MongoDB installed and running
- [ ] FFmpeg installed and in PATH
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file created
- [ ] Backend starts without errors (http://localhost:8000/health works)
- [ ] Frontend starts without errors (http://localhost:5173 loads)

Once all items are checked, you're ready to use the application!
