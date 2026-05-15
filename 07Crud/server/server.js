const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Elpro109@',
    database: 'pnt_practica1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const db = pool.promise();

// log de peticiones
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    next();
});

// ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// aquí irían tus rutas API GET/POST/PUT/DELETE
// por ejemplo:
// app.get('/api/items', async (req, res) => { ... });

app.use((req, res) => {
    res.status(404).send('Archivo no encontrado');
});

app.listen(PORT, () => {
    console.log('Servidor inicializado en el puerto: ' + PORT);
    console.log('Para salir presiona ctrl + c');
});