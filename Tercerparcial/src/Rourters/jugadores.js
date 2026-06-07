const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarJugador(datos){
  const errores = [];
  if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2) errores.push('El nombre es obligatorio y debe tener al menos 2 caracteres');
  if(!datos.battletag || typeof datos.battletag !== 'string') errores.push('El BattleTag es obligatorio');
  return errores;
}

router.get('/', async (req, res) => {
  try{
    const [rows] = await db.execute('SELECT id, nombre, battletag, created_at, updated_at FROM players ORDER BY id ASC');
    res.json({ status: 'success', data: rows, count: rows.length });
  }catch(err){
    console.error('Error al listar jugadores:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [rows] = await db.execute('SELECT id, nombre, battletag, created_at, updated_at FROM players WHERE id = ?', [id]);
    if(rows.length === 0) return res.status(404).json({ status: 'error', message: `Jugador con ID ${id} no encontrado` });
    res.json({ status: 'success', data: rows[0] });
  }catch(err){
    console.error('Error al obtener jugador:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.post('/', async (req, res) => {
  try{
    const errores = validarJugador(req.body);
    if(errores.length > 0) return res.status(400).json({ status: 'error', message: errores.join('; ') });

    const { nombre, battletag } = req.body;
    const [resultado] = await db.execute('INSERT INTO players (nombre, battletag) VALUES (?, ?)', [nombre.trim(), battletag.trim()]);
    const [nuevo] = await db.execute('SELECT id, nombre, battletag, created_at, updated_at FROM players WHERE id = ?', [resultado.insertId]);
    res.status(201).json({ status: 'success', data: nuevo[0] });
  }catch(err){
    console.error('Error al crear jugador:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [ex] = await db.execute('SELECT id FROM players WHERE id = ?', [id]);
    if(ex.length === 0) return res.status(404).json({ status: 'error', message: `Jugador con ID ${id} no encontrado` });

    const errores = validarJugador(req.body);
    if(errores.length > 0) return res.status(400).json({ status: 'error', message: errores.join('; ') });

    const { nombre, battletag } = req.body;
    await db.execute('UPDATE players SET nombre = ?, battletag = ? WHERE id = ?', [nombre.trim(), battletag.trim(), id]);
    const [updated] = await db.execute('SELECT id, nombre, battletag, created_at, updated_at FROM players WHERE id = ?', [id]);
    res.json({ status: 'success', data: updated[0] });
  }catch(err){
    console.error('Error al actualizar jugador:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [rows] = await db.execute('SELECT id, nombre FROM players WHERE id = ?', [id]);
    if(rows.length === 0) return res.status(404).json({ status: 'error', message: `Jugador con ID ${id} no encontrado` });
    await db.execute('DELETE FROM players WHERE id = ?', [id]);
    res.json({ status: 'success', data: { eliminado: rows[0] } });
  }catch(err){
    console.error('Error al eliminar jugador:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

module.exports = router;
