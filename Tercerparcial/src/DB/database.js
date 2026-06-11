// Ocupo esto para conectarme a la BD, consta para que las consultas funcionen.
// Nota de estudiante: aquí están las credenciales en claro, yo no sé aún cómo ocultarlas.
const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    port : 3307,
    user : 'root',
    password : 'Elpro109@',
    database : 'overwatchdb',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
});

module.exports = pool.promise();
