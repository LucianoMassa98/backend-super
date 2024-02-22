const os = require('os');

// Obtener la dirección IP del servidor
function getServerIPAddress() {
  const interfaces = os.networkInterfaces();
  let ipAddress;

  // Recorrer todas las interfaces de red
  for (const ifaceName in interfaces) {
    const iface = interfaces[ifaceName];
    // Filtrar las interfaces IPv4
    const ipv4Interfaces = iface.filter((details) => details.family === 'IPv4');
    // Tomar la primera dirección IP encontrada
    if (ipv4Interfaces.length > 0) {
      ipAddress = ipv4Interfaces[0].address;
      break;
    }
  }

  return ipAddress;
}

module.exports = { getServerIPAddress };
