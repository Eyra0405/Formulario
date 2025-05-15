const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const upload = require('./scripts/upload');
const crearEstructura = require('./scripts/crearEstructura');
const crearExcel = require('./scripts/crearExcel');

const app = express();
const PORT = 3000;
const INVENTARIO_PATH = path.join(__dirname, 'empresa');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/crear', upload.any(), (req, res) => {
  try {
    const empresa = req.body.empresa?.trim();
    if (!empresa) return res.status(400).send('Falta el nombre de la empresa');

    const carpetasSeleccionadas = req.body.carpetas || [];

    // Crear carpetas y mover archivos
    const empresaPath = crearEstructura({
      empresa,
      carpetasSeleccionadas,
      reqFiles: req.files,
      basePath: INVENTARIO_PATH
    });

    // Crear Excel si se requiere
    const documentacionPath = path.join(empresaPath, 'Documentacion');
    crearExcel(req.body, {}, documentacionPath);

    res.send('¡Estructura creada con éxito!');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error del servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
