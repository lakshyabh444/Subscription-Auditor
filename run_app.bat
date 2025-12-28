@echo off
echo Starting Subscription Auditor...
echo Please wait for the application to load...

:: Navigate to the project directory
cd /d "%~dp0"

:: Open the browser
start http://localhost:3000

:: Start the Next.js server
npm run dev

pause
