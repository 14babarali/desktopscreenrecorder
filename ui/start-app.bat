@echo off
echo Starting Recording App...
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting Vite dev server...
start cmd /k "npm run dev"

echo Waiting for dev server to start...
timeout /t 5 /nobreak > nul

echo Starting Electron...
call npm run electron

pause
