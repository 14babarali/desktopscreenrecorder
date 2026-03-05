# Installation Guide

## Prerequisites Installation

### Windows

#### 1. Install Node.js
```powershell
# Download from https://nodejs.org/
# Or use winget
winget install OpenJS.NodeJS.LTS
```

#### 2. Install Python
```powershell
# Download from https://python.org/
# Or use winget
winget install Python.Python.3.11
```

#### 3. Install MongoDB
```powershell
# Download from https://www.mongodb.com/try/download/community
# Or use winget
winget install MongoDB.Server

# Start MongoDB
net start MongoDB
```

#### 4. Install FFmpeg
```powershell
# Download from https://ffmpeg.org/download.html
# Or use winget
winget install Gyan.FFmpeg

# Add to PATH if not automatic
```

### macOS

#### 1. Install Homebrew (if not installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. Install All Dependencies
```bash
# Install Node.js
brew install node

# Install Python
brew install python@3.11

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Install FFmpeg
brew install ffmpeg

# Start MongoDB
brew services start mongodb-community
```

### Linux (Ubuntu/Debian)

#### 1. Update Package Manager
```bash
sudo apt update
```

#### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 3. Install Python
```bash
sudo apt-get install -y python3 python3-pip python3-venv
```

#### 4. Install MongoDB
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 5. Install FFmpeg
```bash
sudo apt-get install -y ffmpeg
```

## Verify Installation

Run these commands to verify everything is installed:

```bash
# Check Node.js
node --version
# Expected: v18.x.x or higher

# Check npm
npm --version
# Expected: 9.x.x or higher

# Check Python
python --version
# Expected: Python 3.9.x or higher

# Check pip
pip --version
# Expected: pip 21.x.x or higher

# Check MongoDB
mongod --version
# Expected: db version v5.x.x or higher

# Check FFmpeg
ffmpeg -version
# Expected: ffmpeg version 4.x.x or higher
```

## Application Installation

### 1. Clone or Download Project
```bash
# If using git
git clone <repository-url>
cd desktopscreenrecorder

# Or extract downloaded zip
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env if needed (optional)
# Default values should work for local development
```

### 3. Frontend Setup

```bash
# Navigate to ui (from project root)
cd ui

# Install dependencies
npm install

# This may take a few minutes
```

## Running the Application

### Option 1: Development Mode (Recommended for Testing)

#### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

#### Terminal 2 - Frontend
```bash
cd ui
npm run dev
```

#### Terminal 3 - Electron
```bash
cd ui
npm run electron:dev
```

### Option 2: Quick Start (All in One)

Create a start script:

**Windows (start.bat)**:
```batch
@echo off
start cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"
timeout /t 3
start cmd /k "cd ui && npm run electron:dev"
```

**macOS/Linux (start.sh)**:
```bash
#!/bin/bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000 &
sleep 3
cd ../ui
npm run electron:dev
```

Make executable (macOS/Linux):
```bash
chmod +x start.sh
./start.sh
```

## Building for Production

### Build Frontend
```bash
cd ui
npm run build
```

### Package Electron App
```bash
cd ui
npm run package
```

The packaged app will be in `ui/release/` directory.

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Backend (port 8000)
# Change port in command:
uvicorn app.main:app --reload --port 8001

# Frontend (port 5173)
# Change in ui/vite.config.js
```

### Python Virtual Environment Issues
```bash
# Delete and recreate
rm -rf venv  # Windows: rmdir /s venv
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Node Modules Issues
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json  # Windows: rmdir /s node_modules, del package-lock.json
npm install
```

### FFmpeg Not Found
```bash
# Verify FFmpeg is in PATH
ffmpeg -version

# If not, add to PATH or reinstall
```

## First Run Checklist

- [ ] All prerequisites installed
- [ ] All versions verified
- [ ] MongoDB running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file created
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Electron window opens
- [ ] Can select screen/window
- [ ] Can start recording
- [ ] Can stop recording
- [ ] Recording appears in library

## Getting Help

If you encounter issues:

1. Check error messages in console
2. Verify all prerequisites are installed
3. Check MongoDB is running
4. Ensure ports 8000 and 5173 are free
5. Review logs in terminal
6. Check documentation in `/docs` folder

## Next Steps

After successful installation:

1. Read `QUICKSTART.md` for basic usage
2. Check `docs/FEATURES.md` for all features
3. Review `docs/DEVELOPMENT.md` for development
4. See `docs/API.md` for API details

---

**Installation Complete!** 🎉

You're ready to start recording!
