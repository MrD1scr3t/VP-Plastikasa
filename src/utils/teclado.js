const teclas = ['1234567890QWERTYUIOPASDFGHJKLZXCVBNM-']

const arregloTeclado = [];

// Iteramos sobre cada carácter del string dentro del arreglo teclas
for (let i = 0; i < teclas[0].length; i++) {
arregloTeclado.push({val :teclas[0][i], icon: ''});
}

arregloTeclado.push({val: 'search', icon: 'icon-search'})
arregloTeclado.push({val: 'delete', icon: 'icon-delete'})



module.exports = {
    arregloTeclado
}

