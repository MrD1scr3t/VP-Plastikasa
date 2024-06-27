const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const os = require('os');
// Nombre del adaptador de LAN inalámbrica (puede variar según el sistema operativo y configuración)
const wifiInterfaceName = 'Wi-Fi';

// // Obtener las interfaces de red
const networkInterfaces = os.networkInterfaces();

// // Bandera para saber si se encontró la IP
let found = false;

var ip;

// // Recorrer las interfaces de red
Object.keys(networkInterfaces).forEach(interfaceName => {
  if (interfaceName === wifiInterfaceName) {
    networkInterfaces[interfaceName].forEach(interface => {
      if (interface.family === 'IPv4' && !interface.internal) {
        ip = interface.address
        found = true
      }
    });
  }
});

// // Si no se encontró la IP
if (!found) {
  console.log(`No se encontró la dirección IP del adaptador de LAN inalámbrica (${wifiInterfaceName}).`);
}

let portfront, portback

try {
 
  const configPath = path.join(__dirname, 'config.txt');

  const config = fs.readFileSync(configPath, 'utf8').trim().split('\n');

  config.forEach(line => {
    const [key, value] = line.split(':');
    if (key === 'portfront') {
      portfront = value.trim();
    }else if (key === 'portback'){
      portback = value.trim();
    }
  });
  
} catch (error) {
  console.error('Error al leer el archivo de configuración:', error);
  ip = 'localhost'; 
  portfront = 8080;  
  portback = 3000;
}

app.set('port', portfront);
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');

const cors = require('cors');
app.use(cors());

app.use(require('./routes/index'));
// app.use(express.static('public', {'extensions':['html']}));

app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'), () => {
    console.log(`Servidor Front Activo`);
});