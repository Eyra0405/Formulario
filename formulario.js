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
  const docFile = path.join(rutasCarpetas['Documentacion'] || trabajoPath, 'documentacion.xlsx');


  try {
const carpetasSeleccionadas = req.body.carpetas || [];
const rutasCarpetas = {};

carpetasSeleccionadas.forEach(nombre => {
  const ruta = path.join(trabajoPath, nombre);
  if (!fs.existsSync(ruta)) fs.mkdirSync(ruta, { recursive: true });
  rutasCarpetas[nombre] = ruta;
});

    if (documentacion) {
      const workbook = xlsx.utils.book_new();

      // Hoja 1: Info Empresa
    const infoGeneral = [
  ['Empresa', empresa],
  ['Trabajo', trabajo],
  ['Responsable del proyecto', req.body.responsable || ''],
  ['Dirección', req.body.direccion || ''],
  ['Teléfono', req.body.telefono || ''],
  ['Email', req.body.email || ''],
  ['Fecha de creación del registro', new Date().toLocaleString()]
];
      const infoSheet = xlsx.utils.aoa_to_sheet(infoGeneral);
      xlsx.utils.book_append_sheet(workbook, infoSheet, 'General');
// Hoja 3: Cámaras
const camaras = [['Nombre', 'IP', 'MAC', 'Credenciales', 'Patch Panel']];
if (Array.isArray(req.body.camara_nombre)) {
  req.body.camara_nombre.forEach((_, i) => {
    camaras.push([
      req.body.camara_nombre[i] || '',
      req.body.camara_ip[i] || '',
      req.body.camara_mac[i] || '',
      req.body.camara_cred[i] || '',
      req.body.camara_patch[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(camaras), 'Cámaras');

// Hoja 4: Switch
const switches = [['Nombre', 'IP', 'Ubicación']];
if (Array.isArray(req.body.switch_nombre)) {
  req.body.switch_nombre.forEach((_, i) => {
    switches.push([
      req.body.switch_nombre[i] || '',
      req.body.switch_ip[i] || '',
      req.body.switch_ubicacion[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(switches), 'Switch');

// Hoja 5: Firewall
const firewalls = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
if (Array.isArray(req.body.firewall_nombre)) {
  req.body.firewall_nombre.forEach((_, i) => {
    firewalls.push([
      req.body.firewall_nombre[i] || '',
      req.body.firewall_ip[i] || '',
      req.body.firewall_interconexion[i] || '',
      req.body.firewall_ubicacion[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(firewalls), 'Firewall');

// Hoja 6: Control de Accesos
const accesos = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
if (Array.isArray(req.body.acceso_nombre)) {
  req.body.acceso_nombre.forEach((_, i) => {
    accesos.push([
      req.body.acceso_nombre[i] || '',
      req.body.acceso_ip[i] || '',
      req.body.acceso_interconexion[i] || '',
      req.body.acceso_ubicacion[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(accesos), 'Control de Accesos');

// Hoja 7: AP (WiFi)
const wifi = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
if (Array.isArray(req.body.wifi_nombre)) {
  req.body.wifi_nombre.forEach((_, i) => {
    wifi.push([
      req.body.wifi_nombre[i] || '',
      req.body.wifi_ip[i] || '',
      req.body.wifi_interconexion[i] || '',
      req.body.wifi_ubicacion[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(wifi), 'AP');

// Hoja 8: Servidores
const servidores = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
if (Array.isArray(req.body.servidor_nombre)) {
  req.body.servidor_nombre.forEach((_, i) => {
    servidores.push([
      req.body.servidor_nombre[i] || '',
      req.body.servidor_ip[i] || '',
      req.body.servidor_interconexion[i] || '',
      req.body.servidor_ubicacion[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(servidores), 'Servidores');

// Hoja 9: Dispositivos Finales
const finales = [['Nombre', 'IP', 'MAC', 'Credenciales', 'Patch Panel']];
if (Array.isArray(req.body.final_nombre)) {
  req.body.final_nombre.forEach((_, i) => {
    finales.push([
      req.body.final_nombre[i] || '',
      req.body.final_ip[i] || '',
      req.body.final_mac[i] || '',
      req.body.final_credenciales[i] || '',
      req.body.final_patch[i] || '',
    ]);
  });
}
xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(finales), 'Dispositivos Finales');
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
