@echo off
echo Starting Recording App Frontend...
echo.

cd ui

if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

echo.
echo IMPORTANT: Make sure Vite dev server is running first!
echo If not, open another terminal and run: npm run dev
echo.
echo Starting Electron in 3 seconds...
timeout /t 3 /nobreak > nul

npm run electron

