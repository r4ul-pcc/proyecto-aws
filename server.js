const express = require('express');
const app = express();
const connection = require('./db');  // Conexión a la base de datos

// Middleware para procesar el cuerpo de la solicitud en formato JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Esto es necesario para los formularios

// URL pública de tu imagen en S3
const imagenS3 = 'https://s3-ubuntu-proyect.s3.us-east-2.amazonaws.com/aws-servicios-principales.jpg';

// Ruta principal para mostrar la imagen y los usuarios de la base de datos
app.get('/', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error al obtener usuarios');
        }

        let usuariosHTML = '';
        results.forEach(user => {
            usuariosHTML += `<li>
                ${user.nombre} - ${user.email} <br> Comentario: ${user.comentario}
                <form action="/usuarios/eliminar/${user.id}" method="POST" style="display:inline;">
                    <button type="submit">Eliminar</button>
                </form>
            </li>`;
        });

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
                    ${usuariosHTML}
                </ul>

                <h2 style="margin-top: 40px;">Añadir Comentario:</h2>
                <form action="/usuarios" method="POST">
                    <input type="text" name="nombre" placeholder="Tu nombre" required><br>
                    <input type="email" name="email" placeholder="Tu email" required><br>
                    <textarea name="comentario" placeholder="Tu comentario" required></textarea><br>
                    <button type="submit">Añadir Comentario</button>
                </form>
            </body>
            </html>
        `);
    });
});

// Ruta para añadir un nuevo comentario
app.post('/usuarios', (req, res) => {
    const { nombre, email, comentario } = req.body;

    const query = 'INSERT INTO usuarios (nombre, email, comentario) VALUES (?, ?, ?)';
    connection.query(query, [nombre, email, comentario], (err, results) => {
        if (err) {
            console.error('Error al insertar el comentario:', err);
            return res.status(500).send('Error al agregar el comentario');
        }
        res.redirect('/');  // Redirigir a la página principal
    });
});

// Ruta para eliminar un comentario
app.post('/usuarios/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el comentario:', err);
            return res.status(500).send('Error al eliminar el comentario');
        }
        res.redirect('/');  // Redirigir a la página principal
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto http://localhost:${PORT}`));
