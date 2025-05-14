 function agregarCamara() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Cámara:</h3>
        <input type="text" name="camara_nombre[]" placeholder="Nombre">
        <input type="text" name="camara_ip[]" placeholder="IP">
        <input type="text" name="camara_mac[]" placeholder="MAC">
        <input type="text" name="camara_cred[]" placeholder="Credenciales">
        <input type="text" name="camara_patch[]" placeholder="Patch Panel">
    `;
    document.getElementById('camara').appendChild(div);
  }
  function agregarSwitch() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Switch:</h3>
        <input type="text" name="switch_nombre[]" placeholder="Nombre">
        <input type="text" name="switch_ip[]" placeholder="IP">
        <input type="text" name="switch_ubicacion[]" placeholder="Ubicación">
    `;
    document.getElementById('switch').appendChild(div);
  }
  function agregarFirewall() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Firewall</h3>
        <input type="text" name="firewall_nombre[]" placeholder="Nombre">
        <input type="text" name="firewall_ip[]" placeholder="IP">
        <input type="text" name="firewall_interconexion[]" placeholder="Interconexión">
        <input type="text" name="firewall_ubicacion[]" placeholder="Ubicación">
    `;
    document.getElementById('firewall').appendChild(div);
  }
  function agregarControlAccesos() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Control de Accesos:</h3>
        <input type="text" name="acceso_nombre[]" placeholder="Nombre">
        <input type="text" name="firewall_nombre[]" placeholder="Nombre">
        <input type="text" name="firewall_ip[]" placeholder="IP">
        <input type="text" name="firewall_interconexion[]" placeholder="Interconexión">
        <input type="text" name="firewall_ubicacion[]" placeholder="Ubicación">
    `;
    document.getElementById('acceso').appendChild(div);
  }
  function agregarWifi() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Punto de Accesos WiFi:</h3>
        <input type="text" name="firewall_nombre[]" placeholder="Nombre">
        <input type="text" name="firewall_ip[]" placeholder="IP">
        <input type="text" name="firewall_interconexion[]" placeholder="Interconexión">
        <input type="text" name="firewall_ubicacion[]" placeholder="Ubicación">
    `;
    document.getElementById('wifi').appendChild(div);
  }
  function agregarServidores() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Servidores:</h3>
        <input type="text" name="firewall_nombre[]" placeholder="Nombre">
        <input type="text" name="firewall_ip[]" placeholder="IP">
        <input type="text" name="firewall_interconexion[]" placeholder="Interconexión">
        <input type="text" name="firewall_ubicacion[]" placeholder="Ubicación">
    `;
    document.getElementById('servidor').appendChild(div);
  }
  function agregarDispositivoFinal() {
    const div = document.createElement('div');
    div.classList.add('group');
    div.innerHTML = `
        <h3>Dispositivos Finales:</h3>
        <input type="text" name="final_nombre[]" placeholder="Nombre">
        <input type="text" name="final_ip[]" placeholder="IP">
        <input type="text" name="final_mac[]" placeholder="Dirección MAC">
        <input type="text" name="final_credenciales[]" placeholder="Credenciales">
        <input type="text" name="final_patch[]" placeholder="Patch Panel">
    `;
    document.getElementById('finales').appendChild(div);
  }
  function toggleSection(id) {
    const section = document.getElementById(id);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  }
   function mostrarArchivo(checkbox) {
    const li = checkbox.closest("li");
    const archivoInput = li.querySelector(".archivo-input");
    if (archivoInput) {
      archivoInput.style.display = checkbox.checked ? "block" : "none";
    }
  }