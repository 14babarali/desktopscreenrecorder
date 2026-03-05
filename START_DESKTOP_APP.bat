@echo off
echo ========================================
echo  Desktop Recording App - Quick Start
echo ========================================
echo.

REM Check if MongoDB is running
echo [1/4] Checking MongoDB...
sc query MongoDB | find "RUNNING" >nul
if errorlevel 1 (
    echo MongoDB is not running. Starting...
    net start MongoDB
) else (
    echo MongoDB is already running
)
echo.

REM Start Backend
echo [2/4] Starting Backend API...
start "Backend API" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload"
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul
echo.

REM Start Vite Dev Server
echo [3/4] Starting Vite Dev Server...
start "Vite Dev Server" cmd /k "cd ui && npm run dev"
echo Waiting for Vite to start...
timeout /t 8 /nobreak > nul
echo.

REM Start Electron
echo [4/4] Starting Desktop App...
cd ui
npm run electron

echo.
echo ========================================
echo  Desktop App Started!
echo ========================================
pause
