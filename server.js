const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola desde Node.js!');
});

app.listen(80, "0.0.0.0", () => console.log("Servidor en puerto 80"));
