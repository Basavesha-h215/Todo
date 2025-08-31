@echo off
echo Starting Travel Blog Application...
echo.

echo Starting Django Backend Server...
start "Django Backend" cmd /k "cd backend && python manage.py runserver"

echo Waiting 5 seconds for Django to start...
timeout /t 5 /nobreak > nul

echo Starting React Frontend Server...
start "React Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Django Backend: http://localhost:8000
echo React Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
