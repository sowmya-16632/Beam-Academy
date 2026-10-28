$ErrorActionPreference = "Stop"

Write-Host "Starting Beam backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\..\backend-app'; .\mvnw.cmd spring-boot:run"

Start-Sleep -Seconds 3

Write-Host "Starting Beam frontend..." -ForegroundColor Cyan
Set-Location "$PSScriptRoot\..\frontend"
npm run dev
