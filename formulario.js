const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const multer = require('multer');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const INVENTARIO_PATH = path.join(__dirname, 'empresa');

// Configuración de subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST para crear estructura
app.post('/crear', upload.array('archivos'), (req, res) => {
  const empresa = req.body.empresa?.trim();
  const trabajo = req.body.trabajo?.trim();
  const documentacion = req.body.documentacion === 'si';

  if (!empresa || !trabajo) {
    return res.status(400).send('Faltan datos');
  }

  const empresaPath = path.join(INVENTARIO_PATH, empresa);
  const trabajoPath = path.join(empresaPath, trabajo);
  const docPath = path.join(trabajoPath, 'Documentacion');

  try {
    if (!fs.existsSync(INVENTARIO_PATH)) fs.mkdirSync(INVENTARIO_PATH);
    if (!fs.existsSync(empresaPath)) fs.mkdirSync(empresaPath);
    if (!fs.existsSync(trabajoPath)) fs.mkdirSync(trabajoPath);
    if (!fs.existsSync(docPath)) fs.mkdirSync(docPath);

    if (documentacion) {
      const workbook = xlsx.utils.book_new();

      // Hoja 1: General
      const infoGeneral = [
        ['Empresa', empresa],
        ['Trabajo', trabajo],
        ['Fecha de creación', new Date().toLocaleString()]
      ];
      const infoSheet = xlsx.utils.aoa_to_sheet(infoGeneral);
      xlsx.utils.book_append_sheet(workbook, infoSheet, 'General');

      // Hoja 2: Materiales
      const materiales = [['Cantidad', 'Material']];
      if (Array.isArray(req.body.material)) {
        req.body.material.forEach((mat, i) => {
          const cantidad = req.body.cantidad[i];
          if (mat && cantidad) {
            materiales.push([cantidad, mat]);
          }
        });
      }
      const matSheet = xlsx.utils.aoa_to_sheet(materiales);
      xlsx.utils.book_append_sheet(workbook, matSheet, 'Materiales');

      // Hoja 3: Técnico
      const tecnica = [['Dispositivo', 'IP asignada', '']];
      if (Array.isArray(req.body.dispositivo)) {
        req.body.dispositivo.forEach((dev, i) => {
          const ip = req.body.ip[i];
          if (dev && ip) {
            tecnica.push([dev, ip]);
          }
        });
      }
      const ipSheet = xlsx.utils.aoa_to_sheet(tecnica);
      xlsx.utils.book_append_sheet(workbook, ipSheet, 'Técnico');

      // Guardar Excel
      const docFile = path.join(docPath, 'documentacion.xlsx');
      xlsx.writeFile(workbook, docFile);

      // Mover archivos subidos
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          const newPath = path.join(docPath, file.originalname);
          fs.renameSync(file.path, newPath);
        });
      }
    }

    res.send('¡Estructura creada con éxito!');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error del servidor');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
