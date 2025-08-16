const express = require('express');
const app = express();
const connection = require('./db');  // Importamos la conexión a la base de datos

// URL pública de tu imagen en S3
const imagenS3 = 'https://s3-ubuntu-proyect.s3.us-east-2.amazonaws.com/aws-servicios-principales.jpg';

// Ruta principal para mostrar la imagen y los usuarios de la base de datos
app.get('/', (req, res) => {
    // Consulta a la base de datos para obtener los usuarios
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error al obtener usuarios');
        }

        // Crear una lista de usuarios en formato HTML
        let usuariosHTML = '';
        results.forEach(user => {
            usuariosHTML += `<li>${user.nombre} - ${user.email}</li>`;
        });

        // Enviar la respuesta con la imagen y la lista de usuarios
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Mi primer despliegue</title>
            </head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding-top: 50px;">
                <h1 style="color: #2c3e50;">Mi primer despliegue de Aplicación Web en AWS con Node.js</h1>
                <img src="${imagenS3}" alt="Imagen desde S3" style="max-width: 400px; margin-top: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.2);">
                
                <h2 style="margin-top: 40px; color: #2c3e50;">Accediendo a los datos de la base de datos:</h2>
                <ul style="list-style-type: none; padding: 0;">
                    ${usuariosHTML}  <!-- Aquí mostramos los usuarios -->
                </ul>
            </body>
            </html>
        `);
    });
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', express.json(), (req, res) => {
    const { nombre, email } = req.body;

    // Insertar un nuevo usuario en la base de datos
    const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
    connection.query(query, [nombre, email], (err, results) => {
        if (err) {
            console.error('Error al insertar el usuario:', err);
            return res.status(500).send('Error al agregar el usuario');
        }
        res.status(201).send('Usuario agregado exitosamente');
    });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto http://localhost${PORT}`));
