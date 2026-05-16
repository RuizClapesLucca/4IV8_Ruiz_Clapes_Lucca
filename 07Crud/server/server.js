const express = require('express'); 
const mysql = require('mysql2'); 
const path = require('path'); 
const app = express(); 
const PORT = process.env.PORT || 3000; 
const db = mysql.createPool({host:'localhost',user:'root',password:'Elpro109@',database:'pnt_practica1',waitForConnections:true,connectionLimit:10,queueLimit:0}).promise(); // crear pool de conexiones MySQL y usar promesas
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'public'))); 
app.get('/api/test',(req,res)=>res.json({ok:true})); 
app.post('/api/test',async(req,res)=>{const data=req.body;res.json({received:data})}); 
app.listen(PORT,()=>console.log(`Servidor inicializado en el puerto ${PORT}`)); 