const express = require('express');
const router = express.Router();
const teclado = require('../utils/teclado');
const fs = require('fs');
const path = require('path');
const os = require('os');


var ip;

// Recorrer las interfaces de red
const interfaces = os.networkInterfaces();
for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
    // Ignorar las interfaces que no son IPv4, son internas o son direcciones APIPA
        if (iface.family === 'IPv4' && !iface.internal && !iface.address.startsWith('169.254') && !interfaceName.startsWith('vEthernet')) {
            ip = iface.address;

            console.log(ip)
        }
    }
}

// ip = '192.168.0.182';

console.log(ip)

router.get('/', (req, res) => {
    const viewsData = {
        title: '',
        data: teclado,
    };
    res.render('index.html', viewsData);
});

router.get('/config',(req, res) => {
    res.render('pages/config.html', {title:'Configuración'});
});

router.get('/not-found',(req, res) => {
    res.render('pages/not-found.html', {title:'No se ha encontrado'});
});

router.get('/articulo',(req, res) => {
    res.render('pages/articulo.html', {title:'Articulo'});
});

router.get('/teclado',(req, res) => {
    const viewsData = {
        title: '',
        data: teclado,
    };
    res.render('pages/teclado.html', viewsData);
});

router.get('/config.html', (req, res) => {
    res.render('config.html', {title: 'Configuración'});
});

router.get('/portback', (req, res) => {
    const filePath = path.join(__dirname, '../config.txt'); // Ajusta la ruta según tu estructura

    // console.log('aqui' + filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Archivo no encontrado');
        }
        // Encontrar la línea que contiene 'portback'
        const portBackLine = data.split('\n').find(line => line.startsWith('portback:'));
        if (!portBackLine) {
            return res.status(404).send('portback no encontrado en el archivo de configuración');
        }
        const portBack = portBackLine.split(':')[1].trim(); // Extraer el valor del portback
        res.send(portBack); // Devolver el valor del portback
    });
});

router.get('/tiempo', (req, res) => {
    const filePath = path.join(__dirname, '../config.txt'); // Ajusta la ruta según tu estructura

    // console.log('aqui' + filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Archivo no encontrado');
        }
        // Encontrar la línea que contiene 'portback'
        const tiempoBackLine = data.split('\n').find(line => line.startsWith('tiempo:'));
        if (!tiempoBackLine) {
            return res.status(404).send('portback no encontrado en el archivo de configuración');
        }
        const tiempo = tiempoBackLine.split(':')[1].trim(); // Extraer el valor del portback
        res.send(tiempo); // Devolver el valor del portback
    });
});



router.get('/ip', (req, res) => {
    res.send(ip)
});





module.exports = router;