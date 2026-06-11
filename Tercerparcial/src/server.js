// Ocupo este servidor para que el front y la BD se comuniquen.
//consta para que sirva la API.
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares que ocupo: CORS, JSON y un logger simple (consta que ayuda a debug).
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{ console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`); next(); });

// Ocupo esto para servir los archivos estáticos del front
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routers: ocupo cada uno para separar players/heroes/partidas/torneos
const jugadoresRouter = require('./Rourters/jugadores');
const heroesRouter = require('./Rourters/heroes');
const partidasRouter = require('./Rourters/partidas');
const torneosRouter = require('./Rourters/torneos');

app.use('/api/jugadores', jugadoresRouter);
app.use('/api/heroes', heroesRouter);
app.use('/api/partidas', partidasRouter);
app.use('/api/torneos', torneosRouter);

app.get('/', (req,res)=> res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.use((err, req, res, next) => { console.error('Unhandled error:', err); res.status(500).json({status:'error', message:'Error interno'}); });

app.listen(PORT, ()=> console.log('Overwatch server listening on', PORT));

module.exports = app;
