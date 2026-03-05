# Quick Start Guide

Get the recording application running in 5 minutes!

## Prerequisites Check

Ensure you have installed:
- ✅ Node.js 18+ (`node --version`)
- ✅ Python 3.9+ (`python --version`)
- ✅ MongoDB (`mongod --version`)
- ✅ FFmpeg (`ffmpeg -version`)

## 1. Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Start MongoDB (if not running)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongodb

# Run backend
uvicorn app.main:app --reload --port 8000
```

Backend running at: http://localhost:8000

## 2. Frontend Setup (2 minutes)

Open a new terminal:

```bash
# Navigate to ui
cd ui

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend running at: http://localhost:5173

## 3. Run Electron App (1 minute)

Open another terminal:

```bash
cd ui
npm run electron:dev
```

The Electron app window will open automatically!

## Quick Test

1. Click "Record" in the sidebar
2. Select a screen or window
3. Click "Start Recording"
4. Record for a few seconds
5. Click "Stop"
6. Go to "Library" to see your recording

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod --version`
- Check port 8000 is free
- Verify .env file exists

### Frontend won't start
- Delete node_modules and run `npm install` again
- Check port 5173 is free
- Clear npm cache: `npm cache clean --force`

### Electron won't open
- Ensure Vite dev server is running first
- Check console for errors
- Try: `npm run dev` then `npm run electron`

## Next Steps

- Read [SETUP.md](docs/SETUP.md) for detailed setup
- Check [FEATURES.md](docs/FEATURES.md) for all features
- Review [API.md](docs/API.md) for API documentation
- See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for development guide

## Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review error messages in console
3. Ensure all prerequisites are installed
4. Verify all services are running

Happy Recording! 🎥
