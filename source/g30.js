// ===== Setup screens laid out in sections; teams shown face to face; faction blurbs behind a "?" =====
{const menu=document.querySelector('.menu'),optOf=id=>{const e=document.getElementById(id);return e&&e.closest('.opt');},$$=s=>document.querySelectorAll(s);
  const how=menu.querySelector('.howto');if(how)how.remove();
  const facs=menu.querySelector('.facs'),pickT=document.createElement('h3');pickT.className='sectitle';pickT.textContent='Choisis ton camp';facs.before(pickT);
  const setup=document.createElement('div');setup.className='setup';facs.after(setup);
  const sec=(id,title,cls)=>{const s=document.createElement('section');s.className='sec '+(cls||'');s.id=id;s.innerHTML='<h4>'+title+'</h4><div class="secb"></div>';setup.appendChild(s);return s.querySelector('.secb');};
  const sMode=sec('secmode','Mode de jeu'),sSet=sec('secset','Réglages'),sTeams=sec('secteams','Équipes','solo-only wide'),sMap=sec('secmap','Carte','wide');
  const mv=(id,box)=>{const o=optOf(id);if(o)box.appendChild(o);};
  mv('modesel',sMode);mv('speed',sSet);mv('cashsel',sSet);mv('diff',sSet);mv('adsel',sSet);mv('mapsel',sMap);mv('menupick',sMap);
  for(const id of['diff','adsel']){const o=optOf(id);if(o)o.style.display='none';}// solo: in the teams panel; online: in the lobby, only if seats stay free
  for(const id of['opp','f3sel','f4sel']){const o=optOf(id);if(o)o.style.display='none';}
  setup.insertBefore(document.getElementById('secteams'),document.getElementById('secmap'));
  {const o=optOf('menupick');if(o)o.classList.remove('solo-only');const rb=document.createElement('button');rb.type='button';rb.className='mbtn';rb.id='mapreroll';rb.textContent='🎲 Générer une autre carte';rb.style.width='auto';
    rb.onclick=()=>{seedFor.m[menuMap]=1+((Math.random()*1e6)|0);menuPickDraw();sfx('click');};const mo=optOf('mapsel');if(mo)mo.appendChild(rb);}
  // ---- teams panel (solo) ----
  const FL=['rand',...ALLF6],fname=f=>f==='rand'?'Aléatoire':FAC[f].name+' ('+FSHORT[f]+')',DN=['Facile','Normal','Difficile'];
  const sel=(val,opts,on)=>{const s=document.createElement('select');for(const[v,t]of opts){const o=document.createElement('option');o.value=v;o.textContent=t;s.appendChild(o);}s.value=String(val);s.onchange=()=>{on(s.value);sfx('click');renderTeams();};return s;};
  const mini=f=>{const c=document.createElement('canvas');c.width=c.height=96;c.className='tmini';const x=c.getContext('2d');
    if(f==='rand'||!FAC[f]){x.fillStyle='#2a3443';x.beginPath();x.arc(48,48,40,0,PI2);x.fill();x.fillStyle='#ffc53d';x.font='bold 46px Bangers, Impact, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('?',48,52);return c;}
    const k=FAC[f].heroes[0];x.fillStyle=FAC[f].col+'40';x.beginPath();x.arc(48,48,44,0,PI2);x.fill();try{drawFighter(x,48,92,LOOK[k],1,1,false,2.7,{});}catch(_){}return c;};
  const row=(who,f,ctrl,col)=>{const r=document.createElement('div');r.className='trow';r.style.setProperty('--c',col);r.appendChild(mini(f));const t=document.createElement('div');t.className='tinfo';
    t.innerHTML='<b>'+who+'</b>';if(ctrl)for(const c of[].concat(ctrl))t.appendChild(c);else{const s=document.createElement('span');s.className='tfac';s.textContent=FAC[f].name;t.appendChild(s);}r.appendChild(t);return r;};
  const FV={3:()=>menuF3,5:()=>menuF5,1:()=>menuOpp,4:()=>menuF4,6:()=>menuF6},FS={3:v=>menuF3=v,5:v=>menuF5=v,1:v=>menuOpp=v,4:v=>menuF4=v,6:v=>menuF6=v};
  window.renderTeams=function(){const fmt=menuMode,two=fmt!=='1v1';sTeams.innerHTML='';const A=document.createElement('div'),V=document.createElement('div'),B=document.createElement('div');A.className='team ta';B.className='team tb';V.className='vs';V.textContent='VS';
    A.innerHTML='<h5>Ton équipe</h5>';B.innerHTML='<h5>Équipe adverse</h5>';A.appendChild(row('Toi',menuFac,null,'#4fd17a'));
    const sd=spSides(fmt),allies=sd.filter(s=>s===3||s===5),enemies=sd.filter(s=>s===1||s===4||s===6);
    allies.forEach((s,i)=>{const ctr=[sel(FV[s](),FL.map(f=>[f,fname(f)]),v=>FS[s](v))];if(i===0)ctr.push(sel(menuADiff,DN.map((t,k)=>[k,'Niveau : '+t]),v=>menuADiff=+v));else ctr.push(Object.assign(document.createElement('span'),{className:'tfac',textContent:'Même niveau que le premier allié'}));
      A.appendChild(row((allies.length>1?'Allié '+(i+1):'Allié')+' · ordinateur',FV[s](),ctr,spCol(s)));});
    enemies.forEach((s,i)=>{const ctr=[sel(FV[s](),FL.map(f=>[f,fname(f)]),v=>FS[s](v))];if(i===0)ctr.push(sel(menuDiff,DN.map((t,k)=>[k,'Niveau : '+t]),v=>{menuDiff=+v;$$('#diff button').forEach(x=>x.classList.toggle('on',+x.dataset.d===menuDiff));}));else ctr.push(Object.assign(document.createElement('span'),{className:'tfac',textContent:'Même niveau que l’ennemi 1'}));
      B.appendChild(row((enemies.length>1?'Ennemi '+(i+1):'Ennemi')+' · ordinateur',FV[s](),ctr,spCol(s)));});
    sTeams.append(A,V,B);};
  $$('.fac').forEach(b=>b.addEventListener('click',()=>setTimeout(renderTeams,0)));
  {const _sm=syncMapUI;syncMapUI=function(){_sm();renderTeams();};}
  // ---- faction blurb in a tooltip behind "?" ----
  const tip=document.createElement('div');tip.id='factip';tip.hidden=true;document.body.appendChild(tip);
  $$('.fac').forEach(card=>{const q=document.createElement('span');q.className='facq';q.textContent='?';q.title='';card.appendChild(q);const p=card.querySelector('p'),pr=card.querySelector('.pros'),an=card.querySelector('.an'),h=card.querySelector('h3');
    q.addEventListener('mouseenter',()=>{tip.innerHTML='<b>'+(h?h.textContent:'')+'</b><small>'+(an?an.textContent:'')+'</small><div>'+(p?p.innerHTML:'')+'</div>'+(pr?'<div class="pros">'+pr.innerHTML+'</div>':'');tip.hidden=false;
      const r=q.getBoundingClientRect(),w=300;tip.style.left=Math.max(8,Math.min(innerWidth-w-8,r.left-w/2))+'px';tip.style.top=(r.bottom+8)+'px';});
    q.addEventListener('mouseleave',()=>{tip.hidden=true;});});
  const st=document.createElement('style');st.textContent=`
.menu .opts,.menu #opts2{display:none!important}
.sectitle{margin:0;font-family:var(--f-disp);font-weight:400;font-size:24px;letter-spacing:1px;color:var(--fg);align-self:flex-start}
.fac p,.fac .pros{display:none!important}.fac{padding-bottom:12px}
.facq{position:absolute;top:8px;left:10px;width:22px;height:22px;border-radius:50%;background:#0b1017;border:1.5px solid var(--muted);color:var(--fg);font-weight:700;font-size:13px;display:grid;place-items:center;cursor:help}
.facq:hover{border-color:var(--warn);color:var(--warn)}
#factip{position:fixed;z-index:60;width:300px;background:linear-gradient(180deg,#1b2431f8,#0d1219f8);border:1px solid var(--acc);border-radius:8px;padding:10px 12px;font-size:12.5px;line-height:1.45;color:var(--muted);box-shadow:0 8px 24px #000a;pointer-events:none}
#factip b{display:block;font-family:var(--f-disp);font-weight:400;font-size:22px;color:var(--fg);letter-spacing:.5px}#factip small{display:block;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;margin-bottom:6px}
#factip .pros{display:flex;gap:5px;flex-wrap:wrap;margin-top:8px}#factip .pros span{font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:3px;background:#0008;border:1px solid var(--line);color:var(--fg)}
.setup{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%}
.sec{background:#0b1017cc;border:1px solid var(--line);border-radius:10px;padding:10px 14px 12px;display:flex;flex-direction:column;gap:8px;min-width:0}.sec.wide{grid-column:1/-1}
.sec>h4{margin:0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--warn)}
.sec .secb{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center}.sec .opt{flex-wrap:wrap}
#secmap .secb{align-items:flex-start;justify-content:space-between}#secmap #mapsel{flex-wrap:wrap}
#secteams .secb{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:stretch}
.team{display:flex;flex-direction:column;gap:8px;padding:8px;border-radius:8px}.team h5{margin:0;font-family:var(--f-disp);font-weight:400;font-size:20px;letter-spacing:1px}
.team.ta{background:#4fd17a10;border:1px solid #4fd17a55}.team.ta h5{color:#4fd17a}.team.tb{background:#ff4d5e10;border:1px solid #ff4d5e55}.team.tb h5{color:#ff6a7a}
.vs{align-self:center;font-family:var(--f-disp);font-size:40px;color:var(--warn);text-shadow:3px 3px 0 #000}
.trow{display:flex;gap:10px;align-items:center;padding:6px 8px;border-radius:8px;background:#0b1017;border-left:4px solid var(--c)}
.tmini{width:56px;height:56px;flex:none}.tinfo{display:flex;flex-direction:column;gap:4px;min-width:0}.tinfo b{font-size:13px}.tfac{font-size:12px;color:var(--muted)}
.tinfo select{background:#151c26;color:var(--fg);border:1px solid var(--line);border-radius:5px;padding:4px 6px;font-family:var(--f-ui);font-size:12.5px;max-width:260px}
.menu[data-play="multi"] #secteams{display:none}
#secmap .secb{display:grid;grid-template-columns:1fr auto;gap:12px 24px;align-items:start}#secmap .opt:has(#mapsel){flex-direction:column;align-items:flex-start}
#menupick canvas{width:340px!important;height:340px!important;border-radius:10px;box-shadow:0 6px 20px #0008}#menupick{gap:14px}#menupick .note{max-width:170px}
@media (max-width:1100px){.setup{grid-template-columns:1fr}#secteams .secb{grid-template-columns:1fr}.vs{justify-self:center}}`;document.head.appendChild(st);
  renderTeams();}
