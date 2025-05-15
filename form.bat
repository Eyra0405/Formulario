@echo off
set "jsFilePath=C:\Users\tecnico\Inventario\formulario.js"
set "chromePath=C:\Program Files\Google\Chrome\Application\chrome.exe"

echo Iniciando servidor Node.js...
start "Servidor Node" cmd /k node "%jsFilePath%"

REM Espera 3 segundos para dar tiempo a que se levante el servidor
timeout /t 3 /nobreak > nul

echo Abriendo navegador en http://localhost:3000/
start "" "%chromePath%" "http://localhost:3000/"
