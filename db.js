const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'bd-aws.cv22q2o0a1t9.us-east-2.rds.amazonaws.com', // Endpoint de la base de datos RDS
    user: 'admin', // Tu usuario de base de datos
    password: '753159#MrZukaOp', // La contraseña de tu base de datos
    database: 'db-aws', // El nombre de la base de datos
    port: 3306 // Asegúrate de que el puerto es el correcto (3306 por defecto para MySQL)
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
