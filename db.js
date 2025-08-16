const mysql = require('mysql2');

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'mrzukaop7u7.cv22q2o0a1t9.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: '753159#MrZukaOp',
  database: 'mrzukaop7u7'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = connection;
