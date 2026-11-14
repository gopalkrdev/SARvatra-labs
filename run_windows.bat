@echo off
setlocal enabledelayedexpansion
title SARvatra Lab - Startup Script

echo ===============================================================================
echo                SARVATRA LAB - NASA SPACE APPS CHALLENGE
echo        NISAR Earth Observation & Flood Surface Intelligence Platform
echo ===============================================================================
echo.

:: Detect Python executable
set "PYTHON_CMD="
if exist "C:\Users\Gopal_Singh\AppData\Local\Python\pythoncore-3.14-64\python.exe" (
    set "PYTHON_CMD=C:\Users\Gopal_Singh\AppData\Local\Python\pythoncore-3.14-64\python.exe"
) else (
    where python >nul 2>nul
    if !errorlevel! equ 0 (
        set "PYTHON_CMD=python"
    ) else (
        echo [ERROR] Python was not found on your system!
        pause
        exit /b 1
    )
)

echo [OK] Using Python: !PYTHON_CMD!

:: Check Python packages
echo [INFO] Verifying backend dependencies...
"!PYTHON_CMD!" -c "import fastapi, uvicorn, h5py, numpy, scipy, rasterio, shapely, pyproj; print('[OK] All Python scientific libraries verified.')"
if !errorlevel! neq 0 (
    echo [WARNING] Installing missing Python dependencies from backend\requirements.txt...
    "!PYTHON_CMD!" -m pip install -r backend\requirements.txt
)

:: Check Node.js
where node >nul 2>nul
if !errorlevel! neq 0 (
    echo [ERROR] Node.js was not found! Please install Node.js (v18+).
    pause
    exit /b 1
)

:: Start Backend in a new window
echo [INFO] Launching FastAPI Backend on http://127.0.0.1:8000 ...
start "SARvatra Lab - Backend API (Port 8000)" cmd /k "cd /d "%~dp0" && "!PYTHON_CMD!" -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

:: Start Frontend
echo [INFO] Launching Vite Frontend on http://localhost:5173 ...
start "SARvatra Lab - Web UI (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ===============================================================================
echo [SUCCESS] SARvatra Lab is starting up!
echo.
echo   &gt;&gt; Web Application:   http://localhost:5173
echo   &gt;&gt; Backend REST API:  http://127.0.0.1:8000
echo   &gt;&gt; Interactive Docs:  http://127.0.0.1:8000/docs
echo ===============================================================================
echo.
pause
