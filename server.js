const express = require('express');
const app = express();

// URL pública de tu imagen en S3
const imagenS3 = 'https://s3-ubuntu-proyect.s3.us-east-2.amazonaws.com/aws-servicios-principales.jpg';

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Mi primer despliegue</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
            <h1 style="color: #2c3e50;">mi primer despliegue de Aplicación Web en AWS con Node.js</h1>
            <img src="${imagenS3}" alt="Imagen desde S3" style="max-width: 400px; margin-top: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.2);">
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));