# 🏢 Inventario de Empresa
Este proyecto es una aplicación web desarrollada con **Node.js**, **Express** y **XLSX** que permite registrar trabajos para distintas empresas, crear automáticamente la estructura de carpetas en el sistema de archivos y generar documentación en Excel. También incluye scripts para facilitar la ejecución automática tanto del servidor como del navegador (Google Chrome).

## 🚀 Características
- Interfaz web desde formulario (`/public/index.html`)
- Registra datos de empresa, trabajo, materiales y configuración técnica
- Crea estructura de carpetas con subcarpetas
- Exporta la información a un archivo `documentacion.xlsx` usando la librería `xlsx`
- Soporte para múltiples materiales y dispositivos/IPs
- Script `.bat` que arranca el servidor y abre la URL automáticamente en Chrome

## 🛠️ Tecnologías utilizadas
- **Node.js**
- **Express**
- **Body-parser**
- **XLSX** (`xlsx`)
- **HTML/CSS** (Frontend en `/public`)
- **PowerShell / .bat** para automatización local

## 📂 Estructura del proyecto
Inventario/
├── empresa/
│ └── NombreEmpresa/
│ └── NombreTrabajo/
│ └── Documentacion/
│ └── documentacion.xlsx
├── public/
│ └── index.html
├── formulario.js
├── lanzar-servidor.bat
├── README.md

## 📦 Instalación y ejecución
### 1. Clona el repositorio
### 2. git clone https://github.com/Eyra0405/Formulario.git
### 3. cd Formulario
### 4. npm install
### 5. ejecuta el .bat


## 📋 Requisitos
Node.js instalado

Google Chrome instalado (si usas el .bat)

Windows (para usar el .bat o PowerShell)
