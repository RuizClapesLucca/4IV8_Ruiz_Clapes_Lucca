
const apiMetodo = document.getElementById('api-metodo');
const apiUrl = document.getElementById('api-url');
const apiCodigo = document.getElementById('api-codigo');
const notificacionDiv = document.getElementById('notificacion');

async function fetchAPI(url, opciones = {}) {
    const method = opciones.method || 'GET';
    apiMetodo.textContent = method;
    apiMetodo.className = `badge badge-${method.toLowerCase()}`;
    apiUrl.textContent = url;
    apiCodigo.textContent = '...'; apiCodigo.className = 'badge badge-neutral';
    try {
        const respuesta = await fetch(url, opciones);
        apiCodigo.textContent = `${respuesta.status}`;
        apiCodigo.className = `badge ${respuesta.ok ? 'badge-success' : 'badge-error'}`;
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.message || `Error ${respuesta.status}`);
        return datos;
    } catch (err) {
        if (apiCodigo.textContent === '...') { apiCodigo.textContent = 'ERROR'; apiCodigo.className = 'badge badge-error'; }
        throw err;
    }
}

function mostrarNotificacion(mensaje, tipo){ notificacionDiv.textContent = mensaje; notificacionDiv.className = `notificacion ${tipo}`; notificacionDiv.style.display='block'; setTimeout(()=>notificacionDiv.style.display='none',3000); }
function escapeHtml(texto){ const d=document.createElement('div'); d.textContent=texto; return d.innerHTML; }
function formatearFechaHora(fechaISO){ if(!fechaISO) return '-'; return new Date(fechaISO).toLocaleString(); }

// Players module
const formPlayer = document.getElementById('form-player');
const inputPlayerId = document.getElementById('player-id');
const inputPlayerNombre = document.getElementById('player-nombre');
const inputPlayerBattletag = document.getElementById('player-battletag');
const tbodyPlayers = document.getElementById('tbody-players');
const tablaPlayers = document.getElementById('tabla-players');
const cargaPlayers = document.getElementById('carga-players');
const contadorPlayers = document.getElementById('contador-players');

async function cargarPlayers(){
    try{
        const resp = await fetchAPI('/api/jugadores');
        cargaPlayers.style.display='none';
        if(resp.data.length===0){ tablaPlayers.style.display='none'; cargaPlayers.textContent='No hay jugadores registrados.'; cargaPlayers.style.display='block'; }
        else{ tablaPlayers.style.display='table'; tbodyPlayers.innerHTML=''; resp.data.forEach(p=>{ const fila=document.createElement('tr'); fila.innerHTML=`<td>${p.id}</td><td>${escapeHtml(p.nombre)}</td><td>${escapeHtml(p.battletag||'')}</td><td><button class="btn-editar" onclick="editarPlayer(${p.id})">Editar</button><button class="btn-eliminar" onclick="confirmarEliminarPlayer(${p.id},'${escapeHtml(p.nombre)}')">Eliminar</button></td>`; tbodyPlayers.appendChild(fila); }); }
        contadorPlayers.textContent = `${resp.count}`;
    }catch(err){ mostrarNotificacion('Error al cargar jugadores: '+err.message,'error'); }
}

function validarFormPlayer(){ let ok=true; if(!inputPlayerNombre.value.trim()||inputPlayerNombre.value.trim().length<2){ ok=false; } if(!inputPlayerBattletag.value.trim()){ ok=false; } return ok; }
function limpiarFormPlayer(){ formPlayer.reset(); inputPlayerId.value=''; document.getElementById('form-titulo-player').textContent='Agregar Jugador'; document.getElementById('btn-guardar-player').textContent='Guardar'; document.getElementById('btn-cancelar-player').style.display='none'; }

formPlayer.addEventListener('submit', async e=>{ e.preventDefault(); if(!validarFormPlayer()) return mostrarNotificacion('Verifica los campos','error'); const datos={ nombre: inputPlayerNombre.value.trim(), battletag: inputPlayerBattletag.value.trim() }; const id=inputPlayerId.value; try{ if(id){ await fetchAPI(`/api/jugadores/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(datos)}); mostrarNotificacion('Jugador actualizado','exito'); } else { await fetchAPI('/api/jugadores', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(datos)}); mostrarNotificacion('Jugador creado','exito'); } limpiarFormPlayer(); cargarPlayers(); cargarSelectPlayers(); } catch(err){ mostrarNotificacion(err.message,'error'); } });

window.editarPlayer = async function(id){ try{ const resp = await fetchAPI(`/api/jugadores/${id}`); inputPlayerId.value = resp.data.id; inputPlayerNombre.value = resp.data.nombre; inputPlayerBattletag.value = resp.data.battletag || ''; document.getElementById('form-titulo-player').textContent='Editar Jugador'; document.getElementById('btn-guardar-player').textContent='Actualizar'; document.getElementById('btn-cancelar-player').style.display='inline-block'; cambiarSeccion('players'); }catch(err){ mostrarNotificacion(err.message,'error'); } }

window.confirmarEliminarPlayer = function(id,nombre){ if(confirm(`¿Eliminar a "${nombre}" y sus partidas?`)){ eliminarPlayer(id); } }
async function eliminarPlayer(id){ try{ await fetchAPI(`/api/jugadores/${id}`, { method:'DELETE' }); mostrarNotificacion('Jugador eliminado','exito'); cargarPlayers(); cargarSelectPlayers(); cargarMatches(); }catch(err){ mostrarNotificacion(err.message,'error'); } }
document.getElementById('btn-cancelar-player').addEventListener('click', limpiarFormPlayer);

// Heroes module
const formHero = document.getElementById('form-hero');
const inputHeroId = document.getElementById('hero-id');
const inputHeroNombre = document.getElementById('hero-nombre');
const inputHeroRole = document.getElementById('hero-role');
const tbodyHeroes = document.getElementById('tbody-heroes');
const tablaHeroes = document.getElementById('tabla-heroes');
const cargaHeroes = document.getElementById('carga-heroes');
const contadorHeroes = document.getElementById('contador-heroes');

async function cargarHeroes(){ try{ const resp = await fetchAPI('/api/heroes'); cargaHeroes.style.display='none'; if(resp.data.length===0){ tablaHeroes.style.display='none'; cargaHeroes.textContent='No hay héroes registrados.'; cargaHeroes.style.display='block'; } else{ tablaHeroes.style.display='table'; tbodyHeroes.innerHTML=''; resp.data.forEach(h=>{ const fila=document.createElement('tr'); fila.innerHTML=`<td>${h.id}</td><td>${escapeHtml(h.nombre)}</td><td>${escapeHtml(h.role||'')}</td><td><button class="btn-editar" onclick="editarHero(${h.id})">Editar</button><button class="btn-eliminar" onclick="confirmarEliminarHero(${h.id},'${escapeHtml(h.nombre)}')">Eliminar</button></td>`; tbodyHeroes.appendChild(fila); }); } contadorHeroes.textContent = `${resp.count}`; }catch(err){ mostrarNotificacion('Error al cargar héroes: '+err.message,'error'); } }

function validarFormHero(){ let ok=true; if(!inputHeroNombre.value.trim()||inputHeroNombre.value.trim().length<2) ok=false; if(!inputHeroRole.value.trim()) ok=false; return ok; }
function limpiarFormHero(){ formHero.reset(); inputHeroId.value=''; document.getElementById('form-titulo-hero').textContent='Agregar Héroe'; document.getElementById('btn-guardar-hero').textContent='Guardar'; document.getElementById('btn-cancelar-hero').style.display='none'; }
formHero.addEventListener('submit', async e=>{ e.preventDefault(); if(!validarFormHero()) return mostrarNotificacion('Verifica los campos','error'); const datos={ nombre: inputHeroNombre.value.trim(), role: inputHeroRole.value.trim() }; const id=inputHeroId.value; try{ if(id){ await fetchAPI(`/api/heroes/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(datos)}); mostrarNotificacion('Héroe actualizado','exito'); } else { await fetchAPI('/api/heroes', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(datos)}); mostrarNotificacion('Héroe creado','exito'); } limpiarFormHero(); cargarHeroes(); cargarSelectHeroes(); }catch(err){ mostrarNotificacion(err.message,'error'); } });

window.editarHero = async function(id){ try{ const resp = await fetchAPI(`/api/heroes/${id}`); inputHeroId.value = resp.data.id; inputHeroNombre.value = resp.data.nombre; inputHeroRole.value = resp.data.role || ''; document.getElementById('form-titulo-hero').textContent='Editar Héroe'; document.getElementById('btn-guardar-hero').textContent='Actualizar'; document.getElementById('btn-cancelar-hero').style.display='inline-block'; cambiarSeccion('heroes'); }catch(err){ mostrarNotificacion(err.message,'error'); } }

window.confirmarEliminarHero = function(id,nombre){ if(confirm(`¿Eliminar "${nombre}"?`)){ eliminarHero(id); } }
async function eliminarHero(id){ try{ await fetchAPI(`/api/heroes/${id}`, { method:'DELETE' }); mostrarNotificacion('Héroe eliminado','exito'); cargarHeroes(); cargarSelectHeroes(); cargarMatches(); }catch(err){ mostrarNotificacion(err.message,'error'); } }
document.getElementById('btn-cancelar-hero').addEventListener('click', limpiarFormHero);

// Matches module
const formMatch = document.getElementById('form-match');
const selectMatchPlayer = document.getElementById('match-player');
const selectMatchHero = document.getElementById('match-hero');
const inputMatchKills = document.getElementById('match-kills');
const inputMatchDeaths = document.getElementById('match-deaths');
const tbodyMatches = document.getElementById('tbody-matches');
const tablaMatches = document.getElementById('tabla-matches');
const cargaMatches = document.getElementById('carga-matches');
const contadorMatches = document.getElementById('contador-matches');

async function cargarSelectPlayers(){ try{ const resp = await fetchAPI('/api/jugadores'); selectMatchPlayer.innerHTML = '<option value="">-- Seleccionar --</option>'; resp.data.forEach(p=>{ const opt=document.createElement('option'); opt.value=p.id; opt.textContent=`${p.nombre}`; selectMatchPlayer.appendChild(opt); }); }catch(err){} }
async function cargarSelectHeroes(){ try{ const resp = await fetchAPI('/api/heroes'); selectMatchHero.innerHTML = '<option value="">-- Seleccionar --</option>'; resp.data.forEach(h=>{ const opt=document.createElement('option'); opt.value=h.id; opt.textContent=`${h.nombre}`; selectMatchHero.appendChild(opt); }); }catch(err){} }

async function cargarMatches(){ try{ const resp = await fetchAPI('/api/partidas'); cargaMatches.style.display='none'; if(resp.data.length===0){ tablaMatches.style.display='none'; cargaMatches.textContent='No hay partidas registradas.'; cargaMatches.style.display='block'; } else{ tablaMatches.style.display='table'; tbodyMatches.innerHTML=''; resp.data.forEach(m=>{ const fila=document.createElement('tr'); fila.innerHTML=`<td>${m.id}</td><td>${escapeHtml(m.player_nombre)}</td><td>${escapeHtml(m.hero_nombre)}</td><td>${m.kills}</td><td>${m.deaths}</td><td>${m.total_score}</td><td>${formatearFechaHora(m.fecha_match)}</td><td><button class="btn-eliminar" onclick="eliminarMatch(${m.id})">Eliminar</button></td>`; tbodyMatches.appendChild(fila); }); } contadorMatches.textContent=`${resp.count}`; }catch(err){ mostrarNotificacion('Error al cargar partidas: '+err.message,'error'); } }

formMatch.addEventListener('submit', async e=>{ e.preventDefault(); const player_id = selectMatchPlayer.value; const hero_id = selectMatchHero.value; const kills = parseInt(inputMatchKills.value)||0; const deaths = parseInt(inputMatchDeaths.value)||0; if(!player_id || !hero_id) return mostrarNotificacion('Selecciona jugador y héroe','error'); try{ await fetchAPI('/api/partidas',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ player_id, hero_id, kills, deaths }) }); mostrarNotificacion('Partida registrada','exito'); cargarMatches(); }catch(err){ mostrarNotificacion(err.message,'error'); } });

window.eliminarMatch = async function(id){ if(!confirm('¿Eliminar partida?')) return; try{ await fetchAPI(`/api/partidas/${id}`, { method:'DELETE' }); mostrarNotificacion('Partida eliminada','exito'); cargarMatches(); }catch(err){ mostrarNotificacion(err.message,'error'); } }

// Navigation
function cambiarSeccion(sec){ document.querySelectorAll('.seccion').forEach(s=>s.style.display='none'); document.getElementById(`seccion-${sec}`).style.display='block'; document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); document.querySelector(`.tab[onclick="cambiarSeccion('${sec}')"]`).classList.add('active'); }

// Init

// Tournaments module
const formTournament = document.getElementById('form-tournament');
const inputTournamentId = document.getElementById('tournament-id');
const inputTournamentNombre = document.getElementById('tournament-nombre');
const inputTournamentFecha = document.getElementById('tournament-fecha');
const tbodyTournaments = document.getElementById('tbody-tournaments');
const tablaTournaments = document.getElementById('tabla-tournaments');
const cargaTournaments = document.getElementById('carga-tournaments');
const contadorTournaments = document.getElementById('contador-tournaments');

async function cargarTorneos(){ try{ const resp = await fetchAPI('/api/torneos'); cargaTournaments.style.display='none'; if(!resp.data || resp.data.length===0){ tablaTournaments.style.display='none'; cargaTournaments.textContent='No hay torneos registrados.'; cargaTournaments.style.display='block'; } else{ tablaTournaments.style.display='table'; tbodyTournaments.innerHTML=''; resp.data.forEach(t=>{ const fila=document.createElement('tr'); const fecha = t.temporada || t.created_at || '-'; fila.innerHTML=`<td>${t.id}</td><td>${escapeHtml(t.nombre)}</td><td>${escapeHtml(fecha)}</td><td><button class="btn-editar" onclick="editarTournament(${t.id})">Editar</button><button class="btn-eliminar" onclick="confirmarEliminarTournament(${t.id},'${escapeHtml(t.nombre)}')">Eliminar</button></td>`; tbodyTournaments.appendChild(fila); }); } contadorTournaments.textContent = `${resp.count || 0}`; }catch(err){ mostrarNotificacion('Error al cargar torneos: '+err.message,'error'); } }

function validarFormTournament(){ let ok=true; if(!inputTournamentNombre.value.trim()||inputTournamentNombre.value.trim().length<2) ok=false; return ok; }
function limpiarFormTournament(){ formTournament.reset(); inputTournamentId.value=''; document.getElementById('form-titulo-tournament').textContent='Agregar Torneo'; document.getElementById('btn-guardar-tournament').textContent='Guardar'; document.getElementById('btn-cancelar-tournament').style.display='none'; }

formTournament.addEventListener('submit', async e=>{ e.preventDefault(); if(!validarFormTournament()) return mostrarNotificacion('Verifica los campos','error'); const datos = { nombre: inputTournamentNombre.value.trim(), temporada: inputTournamentFecha.value || null }; const id = inputTournamentId.value; try{ if(id){ await fetchAPI(`/api/torneos/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(datos) }); mostrarNotificacion('Torneo actualizado','exito'); } else { await fetchAPI('/api/torneos', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(datos) }); mostrarNotificacion('Torneo creado','exito'); } limpiarFormTournament(); cargarTorneos(); }catch(err){ mostrarNotificacion(err.message,'error'); } });

window.editarTournament = async function(id){ try{ const resp = await fetchAPI(`/api/torneos/${id}`); inputTournamentId.value = resp.data.id; inputTournamentNombre.value = resp.data.nombre || ''; inputTournamentFecha.value = resp.data.temporada || ''; document.getElementById('form-titulo-tournament').textContent='Editar Torneo'; document.getElementById('btn-guardar-tournament').textContent='Actualizar'; document.getElementById('btn-cancelar-tournament').style.display='inline-block'; cambiarSeccion('tournaments'); }catch(err){ mostrarNotificacion(err.message,'error'); } }

window.confirmarEliminarTournament = function(id,nombre){ if(confirm(`¿Eliminar torneo "${nombre}"?`)){ eliminarTournament(id); } }
async function eliminarTournament(id){ try{ await fetchAPI(`/api/torneos/${id}`, { method:'DELETE' }); mostrarNotificacion('Torneo eliminado','exito'); cargarTorneos(); }catch(err){ mostrarNotificacion(err.message,'error'); } }
document.getElementById('btn-cancelar-tournament').addEventListener('click', limpiarFormTournament);

// Update init to include tournaments
async function init(){ await cargarPlayers(); await cargarHeroes(); await cargarMatches(); await cargarTorneos(); await cargarSelectPlayers(); await cargarSelectHeroes(); }
window.addEventListener('load', init);
