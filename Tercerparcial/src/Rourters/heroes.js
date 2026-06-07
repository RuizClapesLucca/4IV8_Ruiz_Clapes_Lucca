const express = require('express');
const router = express.Router();
const db = require('../DB/database');

function validarHero(datos){ const errores=[]; if(!datos.nombre || typeof datos.nombre!=='string' || datos.nombre.trim().length<2) errores.push('Nombre obligatorio'); if(!datos.role || typeof datos.role!=='string') errores.push('Role obligatorio'); return errores; }

router.get('/', async (req,res)=>{ try{ const [rows]= await db.execute('SELECT id, nombre, role, created_at FROM heroes ORDER BY id ASC'); res.json({status:'success', data: rows, count: rows.length}); }catch(err){ console.error('Error listar heroes:', err.message); res.status(500).json({status:'error', message:'Error interno'}); } });

router.get('/:id', async (req,res)=>{ try{ const {id} = req.params; const [rows]= await db.execute('SELECT id, nombre, role, created_at FROM heroes WHERE id = ?', [id]); if(rows.length===0) return res.status(404).json({status:'error', message:`Hero ${id} no encontrado`}); res.json({status:'success', data: rows[0]}); }catch(err){ console.error('Error obtener hero:', err.message); res.status(500).json({status:'error', message:'Error interno'}); } });

router.post('/', async (req,res)=>{ try{ const errores = validarHero(req.body); if(errores.length>0) return res.status(400).json({status:'error', message: errores.join('; ')}); const {nombre, role} = req.body; const [resultado]= await db.execute('INSERT INTO heroes (nombre, role) VALUES (?, ?)', [nombre.trim(), role.trim()]); const [nuevo]= await db.execute('SELECT id, nombre, role, created_at FROM heroes WHERE id = ?', [resultado.insertId]); res.status(201).json({status:'success', data: nuevo[0]}); }catch(err){ console.error('Error crear hero:', err.message); res.status(500).json({status:'error', message:'Error interno'}); } });

router.put('/:id', async (req,res)=>{ try{ const {id} = req.params; const [ex] = await db.execute('SELECT id FROM heroes WHERE id = ?', [id]); if(ex.length===0) return res.status(404).json({status:'error', message:`Hero ${id} no encontrado`}); const errores = validarHero(req.body); if(errores.length>0) return res.status(400).json({status:'error', message: errores.join('; ')}); const {nombre, role} = req.body; await db.execute('UPDATE heroes SET nombre = ?, role = ? WHERE id = ?', [nombre.trim(), role.trim(), id]); const [updated] = await db.execute('SELECT id, nombre, role, created_at FROM heroes WHERE id = ?', [id]); res.json({status:'success', data: updated[0]}); }catch(err){ console.error('Error actualizar hero:', err.message); res.status(500).json({status:'error', message:'Error interno'}); } });

router.delete('/:id', async (req,res)=>{ try{ const {id} = req.params; const [rows]= await db.execute('SELECT id, nombre FROM heroes WHERE id = ?', [id]); if(rows.length===0) return res.status(404).json({status:'error', message:`Hero ${id} no encontrado`}); await db.execute('DELETE FROM heroes WHERE id = ?', [id]); res.json({status:'success', data:{eliminado: rows[0]}}); }catch(err){ console.error('Error eliminar hero:', err.message); if(err.code==='ER_ROW_IS_REFERENCED_2' || err.errno===1451) return res.status(409).json({status:'error', message:'No se puede eliminar porque tiene matches asociados'}); res.status(500).json({status:'error', message:'Error interno'}); } });

module.exports = router;
