const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarTorneo(datos){
  const errores = [];
  if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2) errores.push('El nombre del torneo es obligatorio y debe tener al menos 2 caracteres');
  if(datos.temporada !== undefined && typeof datos.temporada !== 'string') errores.push('Temporada inválida');
  return errores;
}

router.get('/', async (req, res) => {
  try{
    const [rows] = await db.execute('SELECT id, nombre, temporada, created_at FROM torneos ORDER BY id ASC');
    res.json({ status: 'success', data: rows, count: rows.length });
  }catch(err){
    console.error('Error listar torneos:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [rows] = await db.execute('SELECT id, nombre, temporada, created_at FROM torneos WHERE id = ?', [id]);
    if(rows.length === 0) return res.status(404).json({ status: 'error', message: `Torneo con ID ${id} no encontrado` });
    res.json({ status: 'success', data: rows[0] });
  }catch(err){
    console.error('Error obtener torneo:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.post('/', async (req, res) => {
  try{
    const errores = validarTorneo(req.body);
    if(errores.length > 0) return res.status(400).json({ status: 'error', message: errores.join('; ') });

    const { nombre, temporada = null } = req.body;
    const [resultado] = await db.execute('INSERT INTO torneos (nombre, temporada) VALUES (?, ?)', [nombre.trim(), temporada]);
    const [nuevo] = await db.execute('SELECT id, nombre, temporada, created_at FROM torneos WHERE id = ?', [resultado.insertId]);
    res.status(201).json({ status: 'success', data: nuevo[0] });
  }catch(err){
    console.error('Error crear torneo:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [ex] = await db.execute('SELECT id FROM torneos WHERE id = ?', [id]);
    if(ex.length === 0) return res.status(404).json({ status: 'error', message: `Torneo con ID ${id} no encontrado` });

    const errores = validarTorneo(req.body);
    if(errores.length > 0) return res.status(400).json({ status: 'error', message: errores.join('; ') });

    const { nombre, temporada = null } = req.body;
    await db.execute('UPDATE torneos SET nombre = ?, temporada = ? WHERE id = ?', [nombre.trim(), temporada, id]);
    const [updated] = await db.execute('SELECT id, nombre, temporada, created_at FROM torneos WHERE id = ?', [id]);
    res.json({ status: 'success', data: updated[0] });
  }catch(err){
    console.error('Error actualizar torneo:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [rows] = await db.execute('SELECT id, nombre FROM torneos WHERE id = ?', [id]);
    if(rows.length === 0) return res.status(404).json({ status: 'error', message: `Torneo con ID ${id} no encontrado` });
    await db.execute('DELETE FROM torneos WHERE id = ?', [id]);
    res.json({ status: 'success', data: { eliminado: rows[0] } });
  }catch(err){
    console.error('Error eliminar torneo:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

module.exports = router;
