@echo off
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║     Starting AI Ambulance Dispatch System Servers             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Start Backend Server in new window
echo [1/2] Starting Backend Server...
start "Backend Server - DO NOT CLOSE" cmd /k "cd /d "%~dp0server" && node index.js"
timeout /t 3 /nobreak > nul

REM Start Frontend Server in new window
echo [2/2] Starting Frontend Server...
start "Frontend Server - DO NOT CLOSE" cmd /k "cd /d "%~dp0" && npm run dev"
timeout /t 5 /nobreak > nul

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║              ✅ SERVERS ARE STARTING! ✅                        ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 🌐 Two new windows opened:
echo    1. Backend Server  - http://localhost:5000
echo    2. Frontend Server - http://localhost:3000
echo.
echo ⚠️  IMPORTANT: Keep BOTH windows open!
echo.
echo 📝 TO OPEN WEBSITE:
echo    1. Open browser
echo    2. Go to: http://localhost:3000
echo    3. Login: admin@emergency.ai / 123456
echo.
echo Opening website in 3 seconds...
timeout /t 3 /nobreak > nul
start http://localhost:3000
echo.
echo ✅ Done! Website should open in your browser.
echo.
pause
