@echo off
echo Starting Recording App Backend...
echo.

cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing/updating dependencies...
pip install --upgrade pip
pip install -r requirements.txt

echo.
echo Starting FastAPI server...
echo Backend will be available at: http://localhost:8000
echo API docs at: http://localhost:8000/docs
echo.
echo Press CTRL+C to stop the server
echo.

uvicorn app.main:app --reload --port 8000
