const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarPartida(datos){
  const errores = [];
  if(!datos.player_id) errores.push('El ID del jugador es obligatorio');
  if(!datos.hero_id) errores.push('El ID del héroe es obligatorio');
  if(datos.kills !== undefined && (isNaN(Number(datos.kills)) || Number(datos.kills) < 0)) errores.push('Kills inválido');
  if(datos.deaths !== undefined && (isNaN(Number(datos.deaths)) || Number(datos.deaths) < 0)) errores.push('Deaths inválido');
  return errores;
}

router.get('/', async (req, res) => {
  try{
    const [rows] = await db.execute(`
      SELECT m.id, m.player_id, p.nombre AS player_nombre, m.hero_id, h.nombre AS hero_nombre, m.kills, m.deaths, m.total_score, m.fecha_match
      FROM matches m
      INNER JOIN players p ON m.player_id = p.id
      INNER JOIN heroes h ON m.hero_id = h.id
      ORDER BY m.fecha_match DESC
    `);
    res.json({ status: 'success', data: rows, count: rows.length });
  }catch(err){
    console.error('Error al listar partidas:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [rows] = await db.execute(`
      SELECT m.id, m.player_id, p.nombre AS player_nombre, m.hero_id, h.nombre AS hero_nombre, m.kills, m.deaths, m.total_score, m.fecha_match
      FROM matches m
      INNER JOIN players p ON m.player_id = p.id
      INNER JOIN heroes h ON m.hero_id = h.id
      WHERE m.id = ?
    `, [id]);

    if(rows.length === 0) return res.status(404).json({ status: 'error', message: `Partida con ID ${id} no encontrada` });
    res.json({ status: 'success', data: rows[0] });
  }catch(err){
    console.error('Error al obtener partida:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.get('/jugador/:player_id', async (req, res) => {
  try{
    const { player_id } = req.params;
    const [player] = await db.execute('SELECT id, nombre, battletag FROM players WHERE id = ?', [player_id]);
    if(player.length === 0) return res.status(404).json({ status: 'error', message: `Jugador con ID ${player_id} no encontrado` });

    const [matches] = await db.execute(`
      SELECT m.id, h.nombre AS hero, m.kills, m.deaths, m.total_score, m.fecha_match
      FROM matches m
      INNER JOIN heroes h ON m.hero_id = h.id
      WHERE m.player_id = ?
      ORDER BY m.fecha_match DESC
    `, [player_id]);

    const totalMatches = matches.length;
    const totalScore = matches.reduce((sum, m) => sum + (m.total_score || 0), 0);

    res.json({ status: 'success', data: { player: player[0], matches, total_matches: totalMatches, total_score: totalScore } });
  }catch(err){
    console.error('Error al obtener partidas del jugador:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.post('/', async (req, res) => {
  try{
    const errores = validarPartida(req.body);
    if(errores.length > 0) return res.status(400).json({ status: 'error', message: errores.join('; ') });

    const { player_id, hero_id, kills = 0, deaths = 0 } = req.body;

    const [player] = await db.execute('SELECT id, nombre FROM players WHERE id = ?', [player_id]);
    if(player.length === 0) return res.status(404).json({ status: 'error', message: `Jugador con ID ${player_id} no encontrado` });

    const [hero] = await db.execute('SELECT id, nombre FROM heroes WHERE id = ?', [hero_id]);
    if(hero.length === 0) return res.status(404).json({ status: 'error', message: `Héroe con ID ${hero_id} no encontrado` });

    const total_score = (Number(kills) || 0) - (Number(deaths) || 0);
    const [resultado] = await db.execute('INSERT INTO matches (player_id, hero_id, kills, deaths, total_score) VALUES (?, ?, ?, ?, ?)', [player_id, hero_id, parseInt(kills), parseInt(deaths), total_score]);

    res.status(201).json({ status: 'success', data: { id: resultado.insertId, jugador: player[0].nombre, heroe: hero[0].nombre, kills: parseInt(kills), deaths: parseInt(deaths), total_score } });
  }catch(err){
    console.error('Error al crear partida:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const [r] = await db.execute('SELECT id FROM matches WHERE id = ?', [id]);
    if(r.length === 0) return res.status(404).json({ status: 'error', message: `Partida con ID ${id} no encontrada` });
    await db.execute('DELETE FROM matches WHERE id = ?', [id]);
    res.json({ status: 'success', data: { mensaje: `Partida con ID ${id} eliminada` } });
  }catch(err){
    console.error('Error al eliminar partida:', err.message);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
  }
});

module.exports = router;
