// ===== F9: show the internal error log (to report problems) =====
window.addEventListener('keydown',e=>{if(e.key!=='F9')return;let d=document.getElementById('errlog');if(d){d.remove();return;}d=document.createElement('div');d.id='errlog';
  d.style.cssText='position:fixed;left:12px;bottom:240px;max-width:70vw;max-height:40vh;overflow:auto;background:rgba(8,12,20,.95);border:1px solid #ff4d5e;color:#e8eef8;font:12px monospace;padding:8px 10px;z-index:99;white-space:pre-wrap';
  d.textContent=ERRLOG.length?'Erreurs internes (version '+(document.title.match(/\d+/)||[''])[0]+') — copie ce texte pour le signaler :\n\n'+ERRLOG.map(x=>'['+x.t+'s ×'+x.n+'] '+x.m).join('\n'):'Aucune erreur interne enregistrée.';document.body.appendChild(d);});
window.addEventListener('error',ev=>{try{ERRLOG.push({m:'global: '+ev.message+' @ '+(ev.filename||'').split('/').pop()+':'+ev.lineno,t:Math.round(gtime),n:1});if(ERRLOG.length>30)ERRLOG.shift();}catch(_){}});
// per-entity isolation: one broken unit / building / AI never blocks the rest of the frame
{const _uu=updUnit;updUnit=function(u,dt){try{_uu(u,dt);}catch(e){safeRun('unit '+(u&&u.key),()=>{throw e;});}};}
{const _ub=updBuilding;updBuilding=function(b,dt){try{_ub(b,dt);}catch(e){safeRun('building '+(b&&b.key),()=>{throw e;});}};}
{const _au=aiUpdate;aiUpdate=function(ai,dt){try{_au(ai,dt);}catch(e){safeRun('ai',()=>{throw e;});}};}
{const _up=updProd;updProd=function(si,dt){try{_up(si,dt);}catch(e){safeRun('prod',()=>{throw e;});}};}
if(window.__game)window.__game.update=dt=>update(dt);
