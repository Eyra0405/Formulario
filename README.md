<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventario de Empresa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f4f4f4;
        }
        h1, h2 {
            color: #333;
        }
        ul {
            list-style-type: none;
        }
        code {
            background-color: #f5f5f5;
            padding: 2px 5px;
            border-radius: 3px;
        }
        .section {
            margin-bottom: 30px;
        }
        pre {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="section">
        <h1>🏢 Inventario de Empresa</h1>
        <p>Este proyecto es una aplicación web desarrollada con <strong>Node.js</strong>, <strong>Express</strong> y <strong>XLSX</strong> que permite registrar trabajos para distintas empresas, crear automáticamente la estructura de carpetas en el sistema de archivos y generar documentación en Excel. También incluye scripts para facilitar la ejecución automática tanto del servidor como del navegador (Google Chrome).</p>
    </div>

    <div class="section">
        <h2>🚀 Características</h2>
        <ul>
            <li>Interfaz web desde formulario (<code>/public/index.html</code>)</li>
            <li>Registra datos de empresa, trabajo, materiales y configuración técnica</li>
            <li>Crea estructura de carpetas con subcarpetas</li>
            <li>Exporta la información a un archivo <code>documentacion.xlsx</code> usando la librería <strong>xlsx</strong></li>
            <li>Soporte para múltiples materiales y dispositivos/IPs</li>
            <li>Script <code>.bat</code> que arranca el servidor y abre la URL automáticamente en Chrome</li>
        </ul>
    </div>

    <div class="section">
        <h2>🛠️ Tecnologías utilizadas</h2>
        <ul>
            <li><strong>Node.js</strong></li>
            <li><strong>Express</strong></li>
            <li><strong>Body-parser</strong></li>
            <li><strong>XLSX</strong> (<code>xlsx</code>)</li>
            <li><strong>HTML/CSS</strong> (Frontend en <code>/public</code>)</li>
            <li><strong>PowerShell / .bat</strong> para automatización local</li>
        </ul>
    </div>

    <div class="section">
        <h2>📂 Estructura del proyecto</h2>
        <pre>
Inventario/
├── empresa/
│   └── NombreEmpresa/
│       └── NombreTrabajo/
│           └── Documentacion/
│               └── documentacion.xlsx
├── public/
│   └── index.html
├── formulario.js
├── lanzar-servidor.bat
├── README.md
        </pre>
    </div>
</body>
</html>
