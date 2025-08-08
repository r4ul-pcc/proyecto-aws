const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send('¡Hola desde Node.js!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
