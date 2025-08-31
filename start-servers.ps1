Write-Host "Starting Travel Blog Application..." -ForegroundColor Green
Write-Host ""

Write-Host "Starting Django Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python manage.py runserver" -WindowStyle Normal

Write-Host "Waiting 5 seconds for Django to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "Starting React Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Django Backend: http://localhost:8000" -ForegroundColor Blue
Write-Host "React Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
