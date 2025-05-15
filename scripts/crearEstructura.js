const fs = require('fs');
const path = require('path');

function crearEstructura({empresa, carpetasSeleccionadas, reqFiles, basePath}) {
  const empresaPath = path.join(basePath, empresa);
  if (!fs.existsSync(empresaPath)) fs.mkdirSync(empresaPath, { recursive: true });

  const rutasCarpetas = {};
  carpetasSeleccionadas.forEach(nombre => {
    const ruta = path.join(empresaPath, nombre);
    if (!fs.existsSync(ruta)) fs.mkdirSync(ruta, { recursive: true });
    rutasCarpetas[nombre] = ruta;
  });

  // Mover archivos a carpetas según campo
  if (reqFiles && reqFiles.length > 0) {
    reqFiles.forEach(file => {
      const carpeta = file.fieldname.match(/archivos\[(.+?)\]/)?.[1] || 'otros';
      const rutaCarpeta = rutasCarpetas[carpeta] || path.join(empresaPath, carpeta);
      if (!fs.existsSync(rutaCarpeta)) fs.mkdirSync(rutaCarpeta, { recursive: true });
      const destino = path.join(rutaCarpeta, file.originalname);
      fs.renameSync(file.path, destino);
    });
  }

  return empresaPath;
}

module.exports = crearEstructura;
