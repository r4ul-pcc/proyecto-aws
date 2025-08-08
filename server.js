const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola desde Node.js!');
});

const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));
