// ===== Main menu: a home screen with Solo / Multijoueur, each opening its own setup screen =====
let menuPlay='home';
{const menu=document.querySelector('.menu'),opts=document.querySelector('.menu .opts'),optOf=id=>{const e=document.getElementById(id);return e&&e.closest('.opt');};
  const tabs=document.createElement('div');tabs.className='playtabs';
  tabs.innerHTML='<button type="button" data-pt="solo"><b>⚔ Solo</b><small>Contre l’ordinateur</small></button><button type="button" data-pt="multi"><b>🌐 Multijoueur</b><small>Entre amis · 2 à 4 joueurs</small></button>';
  menu.querySelector('.logo').after(tabs);
  const head=document.createElement('div');head.className='menuhead';head.innerHTML='<button type="button" class="mbtn" id="mback">← Retour</button><h2 id="mtitle"></h2><span></span>';tabs.after(head);
  head.querySelector('#mback').onclick=()=>{set('home');sfx('click');};
  for(const id of['opp','f3sel','f4sel','menupick']){const o=optOf(id);if(o)o.classList.add('solo-only');}
  const go=$('#bgo'),mp=$('#bmp');go.classList.add('solo-only');if(mp){mp.classList.add('multi-only');mp.textContent='Créer ou rejoindre une partie';mp.style.marginLeft='0';}
  const note=document.createElement('div');note.className='snd multi-only';note.style.maxWidth='720px';note.style.textAlign='center';
  note.innerHTML='Règle le format, la carte et l’argent de départ, puis ouvre le salon. Tes amis rejoignent ta partie depuis le même jeu. S’il reste des places libres, l’ordinateur les joue : tu régleras alors son niveau dans le salon. Chacun choisit son point de départ dans le salon.';
  (go.closest('.gorow')||go).after(note);
  const st=document.createElement('style');st.textContent=`.playtabs{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.playtabs button{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:240px;padding:8px 20px;border-radius:10px;border:2px solid var(--line);background:#0b1017d8;cursor:pointer;color:var(--muted)}
.playtabs button b{font-family:var(--f-disp);font-weight:400;font-size:28px;letter-spacing:1px;color:var(--fg)}.playtabs button small{font-size:12px}
.playtabs button.on{border-color:var(--warn);background:linear-gradient(180deg,#2a2410,#14100a);color:var(--warn);box-shadow:0 0 0 3px #ffc53d30}
.menu[data-play="solo"] .multi-only,.menu[data-play="multi"] .solo-only{display:none!important}
.menu[data-play="home"]>*:not(.logo):not(.playtabs):not(.snd){display:none!important}.menu[data-play="home"]>.snd.multi-only{display:none!important}
.menu[data-play="home"]{min-height:80vh;justify-content:center;gap:40px}.menu[data-play="home"] .logo{font-size:clamp(70px,10vw,140px)}
.menu[data-play="home"] .playtabs{flex-direction:column;align-items:center;gap:18px}.menu[data-play="home"] .playtabs button{min-width:380px;padding:16px 30px}.menu[data-play="home"] .playtabs button b{font-size:44px}.menu[data-play="home"] .playtabs button small{font-size:15px}
.menu:not([data-play="home"]) .playtabs{display:none}.menu[data-play="home"] .menuhead{display:none}
.menuhead{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;width:100%}.menuhead .mbtn{justify-self:start;width:auto}.menuhead h2{margin:0;font-family:var(--f-disp);font-weight:400;font-size:34px;letter-spacing:1px;color:var(--warn)}
.menu:not([data-play="home"]) .logo{font-size:clamp(40px,5vw,64px)}.menu:not([data-play="home"]) .logo small{display:none}`;document.head.appendChild(st);
  const lab=(id,t)=>{const o=optOf(id);const s=o&&o.querySelector(':scope>span');if(s)s.textContent=t;};
  const _sm=syncMapUI;syncMapUI=function(){_sm();const m=menuPlay==='multi';
    lab('diff',m?'Ordis (places libres)':menuMode!=='1v1'?'Ordis adverses':'Difficulté');lab('adsel',m?'Ordi allié (place libre)':'Ordi allié');lab('modesel',m?'Format':'Mode');};
  const set=m=>{menuPlay=m;menu.dataset.play=m;$('#mtitle').textContent=m==='solo'?'⚔ Solo · contre l’ordinateur':m==='multi'?'🌐 Multijoueur · entre amis':'';syncMapUI();const ov=$('#menu');if(ov)ov.scrollTop=0;};
  tabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{audioInit();set(b.dataset.pt);sfx('click');});set('home');}
// the lobby takes its format from the menu
{const _o=openMP;openMP=function(...a){NET.fmt=menuMode;const r=$('#mpfmt');if(r){const row=r.closest('.row');if(row)row.hidden=true;r.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.f===menuMode));}return _o.apply(this,a);};}
// menu music starts on its own where autoplay is allowed (desktop app); otherwise on the first key press or click anywhere
{const ev=['pointerdown','keydown','touchstart'],kick=()=>{audioInit();if(AC&&AC.state==='running')for(const e of ev)document.removeEventListener(e,kick,true);};
  for(const e of ev)document.addEventListener(e,kick,true);setTimeout(kick,200);}
