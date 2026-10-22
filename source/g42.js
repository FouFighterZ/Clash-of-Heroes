// ===== Dragon Ball: Hit joins the legends, Future Trunks becomes a legend; legends are made clearly stronger, pricier and slower to train than heroes =====
UDEF.dbz.hit={key:'hit',fac:'dbz',name:'Hit',hero:true,legend:true,cost:3000,time:38,hp:2600,speed:96,dmg:68,range:24,rof:.55,melee:true,size:10,look:'hit',sight:10,sightPx:10*TILE,at:'temple2',req:['temple2'],
  ab:{name:'Saut temporel',type:'phase',cd:16,dmg:620,range:300,w:46,shout:'SAUT TEMPOREL.',col:'#b04aff'},
  desc:'L’assassin légendaire de l’univers 6 (DBS). Saut temporel : il fige le temps une fraction de seconde, devient intouchable et traverse ses ennemis en les frappant.'};
FAC.dbz.legends.push('hit');
Object.assign(LOOK,{hit:{k:'hit',skin:'#9a6ab8',hair:'none',gi:'#3a2a4a',gi2:'#1a1a22',pants:'#2e2438',boots:'#1a1a22',arms:'gi',eye:'#d8343f',bald:true,big:true}});
// Future Trunks moves to the legends
{const D=UDEF.dbz.trunks;FAC.dbz.heroes=FAC.dbz.heroes.filter(k=>k!=='trunks');FAC.dbz.legends.push('trunks');D.legend=true;D.at='temple2';D.req=['temple2'];D.topTier=false;D.sight=10;D.sightPx=10*TILE;}
// balance: every legend beats the best hero of its faction by a clear margin, and costs / takes more
for(const f in FAC){const F_=FAC[f];if(!F_.heroes||!F_.legends||!UDEF[f])continue;const H=F_.heroes.map(k=>UDEF[f][k]).filter(Boolean);if(!H.length)continue;
  const mx=p=>Math.max(...H.map(d=>d[p]||0));const hHp=mx('hp'),hDmg=mx('dmg'),hCost=mx('cost'),hT=mx('time');
  for(const k of F_.legends){const D=UDEF[f][k];if(!D)continue;const dps=(D.dmg||0)/(D.rof||1),hdps=Math.max(...H.map(d=>(d.dmg||0)/(d.rof||1)));
    D.hp=Math.round(Math.max(D.hp,hHp*1.6)/50)*50;if(dps<hdps*1.5)D.dmg=Math.round(hdps*1.5*(D.rof||1));D.cost=Math.round(Math.max(D.cost,hCost*1.6)/100)*100;D.time=Math.max(D.time,Math.round(hT*1.5));
    for(const a of[D.ab,D.ab2])if(a&&a.dmg)a.dmg=Math.round(a.dmg*1.35);}}
// ===== ultimates: the hit lands after the cinematic, the camera shows the target, and the effect lingers =====
{const _ls=launchSuper;launchSuper=function(si,x,y){const n=fxs.length,ok=_ls(si,x,y);if(!ok)return ok;const hold=G.cut&&G.cut.ult?2.4:0;
  for(let i=n;i<fxs.length;i++){const f=fxs[i];if(f.delay!=null)f.delay+=hold;f.dur+=hold+1;}
  const z=cam.z||1,vw=(cv.width/(window.devicePixelRatio||1))/z,vh=(cv.height/(window.devicePixelRatio||1))/z;
  if(si===PL||ally(si,PL)||x>cam.x&&x<cam.x+vw&&y>cam.y&&y<cam.y+vh)G.ultCam={x,y,t:hold};return ok;};}
{const _u=update;update=function(dt){if(G.ultCam&&!G.cut){const z=cam.z||1;cam.x=G.ultCam.x-cam.vw()/2;cam.y=G.ultCam.y-cam.vh()/2;if(typeof clampCam==='function')clampCam();G.ultCam=null;}return _u(dt);};}
if(window.__game)window.__game.update=dt=>update(dt);
// ===== ultimate descriptions: a real tooltip on the ultimate button, and a line on each faction card =====
{const b=$('#superb');if(b){b.addEventListener('mouseenter',()=>{if(G.state!=='play'||!sides[PL])return;const f=sides[PL].fac,SP=SUPER[f],tip=$('#tip');if(!tip||!SP)return;
    tip.innerHTML='<div class="h"><b>Attaque ultime · '+SP.name+'</b></div><div>'+(SP.desc||'')+'</div><div class="m">Rayon d’effet '+SP.rad+' · se débloque en améliorant '+BDEF.temple.names[f]+' (★), puis se recharge avec le temps.</div>';
    tip.style.display='block';const r=b.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(innerWidth-tip.offsetWidth-8,r.left))+'px';tip.style.top=(r.bottom+8)+'px';tip.style.bottom='auto';});
  b.addEventListener('mouseleave',()=>{const tip=$('#tip');if(tip){tip.style.display='none';tip.style.top='';tip.style.bottom='';}});b.title='';}}
setTimeout(()=>{const b=$('#superb');if(b)b.title='';},1500);
for(const card of document.querySelectorAll('.fac[data-fac]')){const f=card.dataset.fac,SP=SUPER[f];if(!SP||card.querySelector('.ultd'))continue;const p=card.querySelector('p');if(!p)continue;
  p.insertAdjacentHTML('beforeend','<span class="ultd" style="display:block;margin-top:6px;color:'+(FAC[f].col||'#ffd23a')+'"><b>Attaque ultime · '+SP.name+'</b> '+(SP.desc||'')+'</span>');}
