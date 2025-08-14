const express = require('express');
const app = express();
const path = require('path');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('<h1>¡Hola desde Node.js!</h1><img src="/mi-imagen.jpg" alt="Imagen">');
});

const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));
