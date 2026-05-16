const express = require('express'); // importar Express para crear el servidor y manejar rutas
const mysql = require('mysql2'); // importar mysql2 para conectar con la base de datos MySQL
const path = require('path'); // importar path para construir rutas de archivos de forma segura
const app = express(); // crear la aplicación de Express
const PORT = process.env.PORT || 3000; // puerto donde escuchará el servidor
const db = mysql.createPool({host:'localhost',user:'root',password:'Elpro109@',database:'pnt_practica1',waitForConnections:true,connectionLimit:10,queueLimit:0}).promise(); // crear pool de conexiones MySQL y usar promesas
app.use(express.json()); // middleware para parsear JSON en el body de las solicitudes
app.use(express.static(path.join(__dirname,'public'))); // servir archivos estáticos desde la carpeta public
app.get('/api/test',(req,res)=>res.json({ok:true})); // ruta GET de prueba que responde JSON simple
app.post('/api/test',async(req,res)=>{const data=req.body;res.json({received:data})}); // ruta POST de prueba que recibe JSON y lo devuelve
app.listen(PORT,()=>console.log(`Servidor inicializado en el puerto ${PORT}`)); // iniciar el servidor y mostrar el puerto en consola
