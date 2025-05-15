const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

function crearExcel(reqBody, rutasCarpetas, empresaPath) {
  try {
    const carpetasSeleccionadas = reqBody.carpetas || [];
    const documentacion = carpetasSeleccionadas.includes('Documentacion');
    const workbook = xlsx.utils.book_new();

    // Hoja General
    const infoGeneral = [
      ['Empresa', reqBody.empresa || ''],
      ['Dirección', reqBody.direccion || ''],
      ['Teléfono', reqBody.telefono || ''],
      ['Email', reqBody.email || ''],
      ['Fecha de creación', new Date().toLocaleString()]
    ];
    const infoSheet = xlsx.utils.aoa_to_sheet(infoGeneral);
    xlsx.utils.book_append_sheet(workbook, infoSheet, 'General');

if (carpetasSeleccionadas.includes('Master Plan')) {
  const MasterPlan = [['NombreVlan', 'IpVlan', 'Direccionamiento']];
  if (Array.isArray(reqBody.MasterPlan_nombre)) {
    reqBody.MasterPlan_nombre.forEach((_, i) => {
      MasterPlan.push([
        reqBody.NombreVlan[i] || '',
        reqBody.IpVlan[i] || '',
        reqBody.Direccionamiento[i] || '',
      ]);
    });
  }
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(MasterPlan), 'Master Plan');
} 
if (carpetasSeleccionadas.includes('Camaras')) {
  const camaras = [['Nombre', 'IP', 'MAC', 'Credenciales', 'Patch Panel']];
  if (Array.isArray(reqBody.camara_nombre)) {
    reqBody.camara_nombre.forEach((_, i) => {
      camaras.push([
        reqBody.camara_nombre[i] || '',
        reqBody.camara_ip[i] || '',
        reqBody.camara_mac[i] || '',
        reqBody.camara_cred[i] || '',
        reqBody.camara_patch[i] || '',
      ]);
    });
  }
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(camaras), 'Cámaras');
} 
if (carpetasSeleccionadas.includes('Switch')) {
  const switches = [['Nombre', 'IP', 'Ubicación']];
  if (Array.isArray(reqBody.switch_nombre)) {
    reqBody.switch_nombre.forEach((_, i) => {
      switches.push([
        reqBody.switch_nombre[i] || '',
        reqBody.switch_ip[i] || '',
        reqBody.switch_ubicacion[i] || '',
      ]);
    });
  }
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(switches), 'Switch');
}  
if (carpetasSeleccionadas.includes('Firewall')) {
  const firewalls = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
  if (Array.isArray(reqBody.firewall_nombre)) {
    reqBody.firewall_nombre.forEach((_, i) => {
      firewalls.push([
        reqBody.firewall_nombre[i] || '',
        reqBody.firewall_ip[i] || '',
        reqBody.firewall_interconexion[i] || '',
        reqBody.firewall_ubicacion[i] || '',
      ]);
    });
  }
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(firewalls), 'Firewall');
}
if (carpetasSeleccionadas.includes('Control de Accesos')) {
  const accesos = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
  if (Array.isArray(reqBody.acceso_nombre)) {
    reqBody.acceso_nombre.forEach((_, i) => {
      accesos.push([
        reqBody.acceso_nombre[i] || '',
        reqBody.acceso_ip[i] || '',
        reqBody.acceso_interconexion[i] || '',
        reqBody.acceso_ubicacion[i] || '',
      ]);
    });
  }
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(accesos), 'Control de Accesos');
   }
  // AP (WiFi)
  if (carpetasSeleccionadas.includes('AP')) {
  const wifi = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
  if (Array.isArray(reqBody.wifi_nombre)) {
    reqBody.wifi_nombre.forEach((_, i) => {
      wifi.push([
        reqBody.wifi_nombre[i] || '',
        reqBody.wifi_ip[i] || '',
        reqBody.wifi_interconexion[i] || '',
        reqBody.wifi_ubicacion[i] || '',
      ]);
    });
  }
  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(wifi), 'AP');
}  
if (carpetasSeleccionadas.includes('Servidores')) {
  const servidores = [['Nombre', 'IP', 'Interconexión', 'Ubicación']];
  if (Array.isArray(reqBody.servidor_nombre)) {
    reqBody.servidor_nombre.forEach((_, i) => {
      servidores.push([
        reqBody.servidor_nombre[i] || '',
        reqBody.servidor_ip[i] || '',
        reqBody.servidor_interconexion[i] || '',
        reqBody.servidor_ubicacion[i] || '',
      ]);
    });
  }

  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(servidores), 'Servidores');
}  
  // Dispositivos Finales
if (carpetasSeleccionadas.includes('DispositivosFinales')) {
  const finales = [['Nombre', 'IP', 'MAC', 'Credenciales', 'Patch Panel']];
  if (Array.isArray(reqBody.final_nombre)) {
    reqBody.final_nombre.forEach((_, i) => {
      finales.push([
        reqBody.final_nombre[i] || '',
        reqBody.final_ip[i] || '',
        reqBody.final_mac[i] || '',
        reqBody.final_credenciales[i] || '',
        reqBody.final_patch[i] || '',
      ]);
    });
  }

  xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(finales), 'Dispositivos Finales');
}
 const docPath = rutasCarpetas['Documentacion'] || empresaPath;
    if (!fs.existsSync(docPath)) {
      console.log(`Creando carpeta destino: ${docPath}`);
      fs.mkdirSync(docPath, { recursive: true });
    } else {
      console.log(`Carpeta destino existe: ${docPath}`);
    }

    const docFile = path.join(docPath, 'documentacion.xlsx');
    console.log(`Intentando escribir el archivo Excel en: ${docFile}`);
    xlsx.writeFile(workbook, docFile);
    console.log('Archivo Excel creado correctamente.');
  } catch (error) {
    console.error('Error al crear el Excel:', error);
  }
}

module.exports = crearExcel;