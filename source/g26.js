// ===== Balanced events (tiers, nothing before 8 min), deploy vehicle (advanced HQ), visible upgrade buttons =====
// ---- events: difficulty tiers and timing ----
const EV_TIER={kaio:1,drop:1,meteor:1,goldrush:1,spring:1,greed:1,sports:1,saiba:1,senzurain:1,merchant:1,
  breach:2,gate:2,jeju:2,kaijin:2,chimera:2,troupe:2,celljr:2,deepsea:2,redgate:2,zeke:2,eclipse:2,bounty:2,
  nomu:3,tournoi:3,garou:3,freezer:3,afo:3,titanarm:3,kamish:3,boros:3,meruem:3};
const EV_MIN={1:480,2:600,3:900};
EVENTS.push({id:'senzurain',fac:null,name:'Pluie de Senzus',col:'#7dff9a',desc:'Des sacs de Senzus tombent sur la carte : ils soignent toutes les unités proches de celui qui les ramasse.'},
  {id:'merchant',fac:null,name:'Le marchand ambulant',col:'#ffd23a',desc:'Un marchand généreux traverse la carte : chaque armée reçoit 800.'});
for(const e of EVENTS){const t=EV_TIER[e.id]||2;e.tier=t;e.minT=Math.max(EV_MIN[t],e.id==='jeju'?600:0);}
function pickEv(pool){const w=e=>e.tier===1?4:e.tier===2?2.5:gtime>1200?2:1;let tot=0;for(const e of pool)tot+=w(e);let r=R()*tot;for(const e of pool){r-=w(e);if(r<=0)return e;}return pool[pool.length-1];}
{const _re=runEvent;runEvent=function(ev){if(ev.id==='senzurain'){for(let i=0;i<3;i++){const q=randSpot(12);if(q){spawnPickup('senzu',q);if(!i){G.alertPos={x:q.x,y:q.y};}}}}
  else if(ev.id==='merchant'){for(const s of PSIDES)sides[s].credits+=800;}else return _re(ev);
  if(G.alertPos)G.pings.push({x:G.alertPos.x,y:G.alertPos.y,t:3});banner(ev.name.toUpperCase(),ev.col);msg('Événement : '+ev.desc,ev.col);sfx('event');announce(ev.name);if(NET.host)NET.evt({t:'ev',id:ev.id,x:G.alertPos?Math.round(G.alertPos.x):null,y:G.alertPos?Math.round(G.alertPos.y):null});};}
// neutral creatures are weaker: big bosses lose a lot, smaller monsters a bit
for(const k in UDEF.neu){const D=UDEF.neu[k];if(D.nerfed)continue;D.nerfed=true;const big=(D.bounty||0)>=1500,m=big?[.6,.65]:(D.bounty||0)>=250?[.8,.8]:[.9,.9];D.hp=Math.round(D.hp*m[0]);D.dmg=Math.round(D.dmg*m[1]);if(D.regen)D.regen*=.6;}
Object.assign(UDEF.neu.wtitan,{hp:780,dmg:34,speed:34,splash:22});
// ---- deploy vehicle -> advanced HQ ----
const MCV_N={dbz:'Capsule-QG mobile',mha:'QG mobile de la Commission',aot:'Convoi de colonisation',sl:'Camion de la guilde (QG mobile)',opm:'Base mobile de Metal Knight',hxh:'Caravane de l’Association',sds:'Boar Hat mobile (Hawk Mama)'};
for(const f in MCV_N){const D={key:'mcv',fac:f,name:MCV_N[f],cost:2200,time:22,hp:1600,speed:40,size:16,sight:7,at:'factory',veh:true,mcv:true,req:['factory'],rof:1,
  desc:'Véhicule de déploiement : conduis-le n’importe où puis déploie-le (touche D) en QG avancé pour construire une nouvelle base.'};D.sightPx=D.sight*TILE;UDEF[f].mcv=D;}
BDEF.hq2={key:'hq2',w:2,h:2,hp:2000,cost:2200,time:1,pow:20,sight:9,req:['__never'],names:{dbz:'QG avancé Capsule',mha:'QG avancé de la Commission',aot:'Poste avancé du Bataillon',sl:'QG avancé de la guilde',opm:'QG avancé de l’Association',hxh:'Camp de base Hunter',neu:'QG avancé',sds:'Taverne avancée de Liones'},
  desc:'Base avancée : permet de construire tout autour, produit un peu d’énergie et compte comme un quartier général.'};
NB_H.hq2=72;
NBD.hq2=function(c,o,P){const{x0,y0,W,H,a,cx,cy}=o;plinth(c,x0,y0,W,H,P.acc);box3(c,x0+6,y0+12,52,42,4,26,P.base);box3(c,x0+4,y0+10,56,46,30,5,P.roof);box3(c,cx-10,cy-8,20,16,35,16,P.base);
  onFront(c,x0+6,y0+12,42,4,x=>{x.fillStyle='#2a2a30';x.fillRect(18,-16,16,16);x.fillStyle=P.acc;x.fillRect(0,-24,52,2.4);});flag3(c,x0+48,y0+18,51,a,P.acc);line3(c,[cx,cy,51],[cx,cy,70],'#8a929c',1.3);beacon(c,cx,cy,71,a,P.glow);};
function mcvSpot(u){const tx=tileOf(u.x)-1,ty=tileOf(u.y)-1;for(let r=0;r<=3;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){const x=tx+dx,y=ty+dy;if(x<1||y<1||x+2>MW-1||y+2>MH-1)continue;let ok=true;
  for(let yy=y;yy<y+2&&ok;yy++)for(let xx=x;xx<x+2;xx++){const i=ti(xx,yy);if(blocked[i]||ore[i]>0){ok=false;break;}}if(!ok)continue;
  const x0=x*TILE,y0=y*TILE;if(ents.some(e=>e!==u&&e.isU&&!e.dead&&!e.fly&&e.x>x0-e.r&&e.x<x0+64+e.r&&e.y>y0-e.r&&e.y<y0+64+e.r))continue;return[x,y];}return null;}
function deployMCV(u){if(!u||u.dead||!u.D.mcv)return false;if(NET.client&&!NET.applying){NET.cmd({c:'dep',u:u.id});return true;}const p=mcvSpot(u);
  if(!p){if(u.side===PL){feedPush('Impossible de se déployer ici : trouve un terrain dégagé.','#ff4d5e');sfx('err');}return false;}
  const si=u.side;u.dead=true;sel=sel.filter(e=>e!==u);const b=mkBuilding(si,'hq2',p[0],p[1],false);b.hp=b.max;for(let k=0;k<20;k++)part('dust',b.x+rr(-30,30),b.y+rr(-20,20),rr(-40,40),rr(-30,0),1.2,rr(8,14));
  if(si===PL){msg(BDEF.hq2.names[sides[si].fac]+' déployé ! Tu peux construire tout autour.','#4fd17a');sfx('place');announce('Base avancée déployée');}return true;}
{const _rc=runCmd;runCmd=function(c){if(c&&c.c==='dep'){const u=ents.find(e=>e.id===c.u&&!e.dead&&e.side===NET.gs);if(u)deployMCV(u);return;}_rc(c);};}
function drawMCV(c,u,x,y){const P=FPAL[u.fac]||FPAL.dbz;c.save();c.translate(x,y);c.rotate(u.ang||0);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.roundRect(-20,-11,42,24,4);c.fill();
  for(const s of[-1,1]){c.fillStyle='#26262c';c.beginPath();c.roundRect(-20,s*10-3.5,40,7,3);c.fill();}c.beginPath();c.roundRect(-19,-10,30,20,3);fo(c,P.base);c.fillStyle=P.acc;c.fillRect(-19,-2,30,4);
  c.beginPath();c.roundRect(10,-9,11,18,3);fo(c,P.roof);c.fillStyle='#1a2030';c.fillRect(17,-7,3,14);c.strokeStyle='#8a929c';c.lineWidth=1.2;c.beginPath();c.moveTo(-10,0);c.lineTo(-14,-16);c.stroke();c.restore();
  const bp=Math.sin(gtime*4)>0;if(bp){c.globalCompositeOperation='lighter';drawGlow(c,x-14,y-16,5,P.glow,.9);c.globalCompositeOperation='source-over';}}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){if(u.key==='mcv')return drawMCV(c,u,x,y);return _dv(c,u,x,y,ghost);};}
window.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||G.paused)return;const k=e.key.toLowerCase();
  if(k==='d'){const L=mySel().filter(u=>u.isU&&u.D.mcv);for(const u of L)deployMCV(u);}
  if(k==='u'){const L=mySel();if(L.length===1&&L[0].isB){const b=L[0];if(!startBUp(PL,b)){feedPush(b.upg?'Amélioration déjà en cours':lvlOf(b)>=2?'Déjà amélioré':'Fonds insuffisants ('+bupCost(b)+' requis)','#ffc53d');sfx('err');}else sfx('click');}
    else{const k2=L.find(u=>u.isU&&TUP_KEYS.includes(u.key));if(k2)tryTup(k2.key);}}});
function tryTup(k){const s=sides[PL];if(!has(PL,'armory')){feedPush('Construis d’abord : '+BDEF.armory.names[s.fac]+' (onglet Spécial)','#ffc53d');sfx('err');return false;}
  const ok=startTUp(PL,k);if(!ok){const l=(s.ulv&&s.ulv[k])||0;feedPush(l>=2?'Niveau maximum atteint':s.tres?'Un entraînement est déjà en cours':'Fonds insuffisants ('+tupCost(s.fac,k,l)+' requis)','#ffc53d');sfx('err');}else{sfx('click');feedPush('Entraînement lancé : '+UDEF[s.fac][k].name,'#ffd23a');}return ok;}
// AI: build and deploy forward bases on the big maps
{const _uf=updFusion;updFusion=function(dt){_uf(dt);if(NET.client)return;for(const ai of G.ai){const si=ai.si,s=sides[si];if(!s)continue;ai.mcvT=(ai.mcvT||0)-dt;if(ai.mcvT>0)continue;ai.mcvT=4;
  const mine=ents.filter(e=>e.isU&&!e.dead&&e.side===si&&e.D.mcv);
  if(MW>80&&gtime>360&&!mine.length&&has(si,'factory')&&s.credits>3200&&myB(si,'hq2').length<2&&!s.q.factory.some(i=>i.key==='mcv'))queueUnit(si,'mcv');
  for(const u of mine){if(u.aiDst){if(!u.path&&hyp(u.x-u.aiDst.x,u.y-u.aiDst.y)<120){if(!deployMCV(u))u.aiDst=null;}else if(!u.path)orderMove(u,u.aiDst.x,u.aiDst.y);continue;}
    let best=null,bs=-1;for(const i of oreCells){if(ore[i]<=0)continue;const x=(i%MW+.5)*TILE,y=((i/MW|0)+.5)*TILE;let dOwn=1e9,dFoe=1e9;
      for(const b of ents)if(b.isB&&!b.dead){const d=hyp(b.x-x,b.y-y);if(ally(b.side,si))dOwn=Math.min(dOwn,d);else if(b.side!==2)dFoe=Math.min(dFoe,d);}
      if(dOwn<14*TILE||dFoe<20*TILE)continue;const sc=-dOwn+dFoe*.3;if(sc>bs){bs=sc;best={x:x+rr(-80,80),y:y+rr(-80,80)};}}
    if(best){u.aiDst=best;orderMove(u,best.x,best.y);}}}};}
// ---- visible upgrade / deploy buttons next to the commands ----
(function(){const css=document.createElement('style');css.textContent=`.xact{display:flex;align-items:center;gap:6px;width:100%;padding:7px 10px;margin-top:5px;border-radius:6px;background:linear-gradient(180deg,#3a2e10,#1e180a);border:1px solid #ffd23a;color:#ffe9a0;font-weight:700;font-size:12px;cursor:pointer;text-align:left}
.xact:hover{filter:brightness(1.2)}.xact.off{opacity:.5}.xact kbd{margin-left:auto;font-size:10px;border:1px solid #ffd23a88;border-radius:3px;padding:0 4px}`;document.head.appendChild(css);})();
function xactHTML(L){const s=sides[PL];if(!L.length||L.some(e=>e.side!==PL))return'';
  if(L.length===1&&L[0].isB){const b=L[0];if(b.rise<1)return'';const l=lvlOf(b);if(l>=2)return`<button type="button" class="xact off">★ Déjà amélioré</button>`;
    return`<button type="button" class="xact ${b.upg||s.credits<bupCost(b)?'off':''}" data-bup="${b.id}">⬆ ${b.upg?'Amélioration '+Math.floor(b.upg.prog*100)+' %':'Améliorer · '+bupCost(b)}<kbd>U</kbd></button>`;}
  let h='';const mc=L.filter(u=>u.isU&&u.D.mcv);if(mc.length)h+=`<button type="button" class="xact" data-dep="1">⚑ Déployer en QG avancé<kbd>D</kbd></button>`;
  const ks=[...new Set(L.filter(u=>u.isU&&TUP_KEYS.includes(u.key)).map(u=>u.key))];if(ks.length===1){const k=ks[0],l=(s.ulv&&s.ulv[k])||0,cur=s.tres&&s.tres.key===k;
    h+=l>=2?`<button type="button" class="xact off">★★★ ${UDEF[s.fac][k].name} : niveau max</button>`:`<button type="button" class="xact ${!has(PL,'armory')||s.tres?'off':''}" data-tup2="${k}" title="${has(PL,'armory')?'':'Nécessite : '+BDEF.armory.names[s.fac]}">⬆ ${cur?'Entraînement '+Math.floor(s.tres.prog*100)+' %':'Améliorer ce type (niv. '+(l+2)+') · '+tupCost(s.fac,k,l)}<kbd>U</kbd></button>`;}
  return h;}
{const _ru=refreshUI;refreshUI=function(){_ru();const p=$('#selp');if(!p)return;const acts=p.querySelector('.acts');let box=p.querySelector('#xact');const L=sel.filter(e=>!e.dead),h=acts&&G.state==='play'?xactHTML(L):'';
  if(!h){if(box)box.remove();return;}if(!box||box.parentNode!==acts){if(box)box.remove();box=document.createElement('div');box.id='xact';acts.appendChild(box);}if(box._h!==h){box._h=h;box.innerHTML=h;}};}
document.addEventListener('click',ev=>{if(G.state!=='play')return;const t=ev.target.closest&&ev.target.closest('[data-dep],[data-tup2]');if(!t)return;
  if(t.dataset.dep){for(const u of mySel().filter(u=>u.isU&&u.D.mcv))deployMCV(u);}else tryTup(t.dataset.tup2);});
FTIPS.dbz=(FTIPS.dbz||[]).concat(['Sélectionne un bâtiment et appuie sur <b>U</b> pour l’<b>améliorer</b> (une fois, avec un bonus spécial).']);
for(const f of['mha','aot','sl','opm','hxh'])FTIPS[f]=(FTIPS[f]||[]).concat(['Sélectionne un bâtiment et appuie sur <b>U</b> pour l’<b>améliorer</b>. Avec un Arsenal, sélectionne des troupes et appuie sur <b>U</b> pour les entraîner.']);
FTIPS.sds=['Le <b>soleil</b> règle la force d’<b>Escanor</b> (indicateur en haut) : sors-le à midi, cache-le la nuit.','<b>Meliodas</b> renvoie les dégâts pendant <b>Full Counter</b> (Q). <b>Ban</b> se relève une fois après sa mort.'];
FTIPS.dbz.push('Le <b>véhicule de déploiement</b> (usine) devient un QG avancé n’importe où : touche <b>D</b>.');
// ===== Walls drawn as a line: hold the click and drag =====
function wallTiles(x0,y0,x1,y1){const out=[[x0,y0]];let x=x0,y=y0;const dx=Math.abs(x1-x0),dy=Math.abs(y1-y0),sx=Math.sign(x1-x0),sy=Math.sign(y1-y0);
  if(dx>=dy*3){y1=y0;}else if(dy>=dx*3){x1=x0;}
  while((x!==x1||y!==y1)&&out.length<30){const ex=Math.abs(x1-x),ey=Math.abs(y1-y);if(ex*dy>=ey*dx&&x!==x1)x+=sx;else if(y!==y1)y+=sy;else x+=sx;out.push([x,y]);}return out;}
function wallPreview(si,x0,y0,x1,y1){const s=sides[si],c=BDEF.wall.cost,ts=wallTiles(x0,y0,x1,y1),res=[];let money=s.credits,first=true,okPts=[];
  const near=(x,y)=>okPts.some(p=>Math.max(Math.abs(p[0]-x),Math.abs(p[1]-y))<=4);
  for(const[x,y]of ts){const free=canPlace(si,'wall',x,y,false)||(okPts.length&&near(x,y)&&wallFree(x,y));let ok=free&&(first||money>=c);if(ok){if(!first)money-=c;first=false;okPts.push([x,y]);}res.push([x,y,ok]);}
  return{tiles:res,n:okPts.length,cost:Math.max(0,okPts.length-1)*c};}
function wallFree(x,y){if(x<1||y<1||x>=MW-1||y>=MH-1)return false;const i=ti(x,y);if(blocked[i]||ore[i]>0)return false;const x0=x*TILE,y0=y*TILE;
  for(const e of ents)if(e.isU&&!e.dead&&!e.fly&&e.x>x0-e.r&&e.x<x0+TILE+e.r&&e.y>y0-e.r&&e.y<y0+TILE+e.r)return false;return true;}
function placeWallLine(si,x0,y0,x1,y1){const s=sides[si];if(!s.prodB||!s.prodB.ready||s.prodB.key!=='wall')return 0;
  if(NET.client&&!NET.applying){NET.cmd({c:'pwl',x0,y0,x1,y1});NET.placedT=performance.now();s.prodB.ready=false;s.prodB.sent=true;sfx('place');return 1;}
  let n=0;const c=BDEF.wall.cost;
  for(const[x,y]of wallTiles(x0,y0,x1,y1)){if(!canPlace(si,'wall',x,y,false))continue;
    if(!n){if(placeBuilding(si,'wall',x,y))n++;continue;}
    if(s.credits<c)break;s.credits-=c;mkBuilding(si,'wall',x,y,false);s.st.built++;n++;
    for(let k=0;k<3;k++)part('dust',x*TILE+R()*TILE,y*TILE+R()*TILE,rr(-20,20),rr(-20,10),1.2,rr(8,14));}
  if(si===PL&&n>1)msg(n+' blocs de mur posés (−'+(n-1)*c+')','#4fd17a');return n;}
{const _rc=runCmd;runCmd=function(c){if(c&&c.c==='pwl'){const nm=v=>typeof v==='number'&&isFinite(v)?v|0:0;placeWallLine(NET.gs,nm(c.x0),nm(c.y0),nm(c.x1),nm(c.y1));return;}_rc(c);};}
{const _la=leftAction;leftAction=function(){if(mode&&mode.type==='place'&&mode.key==='wall'){const p=placeTile();if(!mode.drag)mode.drag={x:p.x,y:p.y};return true;}return _la();};}
cv.addEventListener('pointerup',e=>{if(!(mode&&mode.type==='place'&&mode.key==='wall'&&mode.drag))return;const d=mode.drag,p=placeTile();
  if(placeWallLine(PL,d.x,d.y,p.x,p.y)){mode=null;}else{mode.drag=null;msg('Emplacement impossible','#ff4d5e');sfx('err');}});
{const _ht=hintText;hintText=function(){if(mode&&mode.type==='place'&&mode.key==='wall'){if(mode.drag){const p=placeTile(),w=wallPreview(PL,mode.drag.x,mode.drag.y,p.x,p.y);return'Relâche pour poser '+w.n+' bloc'+(w.n>1?'s':'')+' de mur'+(w.cost?' · '+w.cost+' '+FAC[sides[PL].fac].money:'');}
  return'Mur : maintiens le clic et glisse pour tracer une ligne ('+BDEF.wall.cost+' par bloc supplémentaire) · clic droit : annuler';}return _ht();};}
// ===== Game setup options: ally/enemy factions, start position, starting money, ally AI level =====
let menuPos={0:0,1:1},menuSel=0,menuF5='rand',menuF6='rand';
let menuF3='rand',menuF4='rand',menuADiff=1,menuSpawn=0,menuAllyPos='cote',menuCash=3000;
const ALLF6=['dbz','mha','aot','sl','opm','hxh','sds'],FSHORT={rand:'Aléatoire',dbz:'DBZ',mha:'MHA',aot:'Titans',sl:'Solo Lev.',opm:'OPM',hxh:'HxH',sds:'7 Péchés'};
function menuSetup(fmt){const duo=fmt==='2v2'||fmt==='3v3',rf=(c,not)=>c&&c!=='rand'?c:pick(ALLF6.filter(f=>!not.includes(f)));
  const opp=rf(menuOpp!=='rand'&&menuOpp===menuFac?'rand':menuOpp,[menuFac]);let map=menuMap;if(!fmtFits(map,fmt))map=Object.keys(MAPS).find(k=>fmtFits(k,fmt));
  const setup={map,seed:seedFor(map),mode:duo?fmt:'1v1',cash:menuCash,adiff:menuADiff,pos:Object.assign({},posOk(menuPos,map,spSides(fmt))?menuPos:defaultPos(map,fmt))};
  if(duo){setup.f3=rf(menuF3,[menuFac]);setup.f4=rf(menuF4,[opp]);if(fmt==='3v3'){setup.f5=rf(menuF5,[menuFac]);setup.f6=rf(menuF6,[opp]);}}return{opp,setup};}
{const box=document.querySelector('.menu .opts');if(box){const row=document.createElement('div');row.className='opts';row.id='opts2';box.after(row);
  const seg=(id,label,items,get,set,cls)=>{const o=document.createElement('div');o.className='opt'+(cls?' '+cls:'');o.innerHTML='<span>'+label+'</span><div class="seg" id="'+id+'"></div>';row.appendChild(o);
    const fill=list=>{const sg=o.querySelector('.seg');sg.innerHTML='';for(const[v,t]of list){const b=document.createElement('button');b.type='button';b.textContent=t;b.classList.toggle('on',String(get())===String(v));
      b.onclick=()=>{set(v);sg.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));sfx('click');};sg.appendChild(b);}};fill(items);return{o,fill};};
  const facItems=Object.entries(FSHORT);
  seg('f3sel','Allié',facItems,()=>menuF3,v=>menuF3=v,'only2');
  seg('f4sel','Adversaire 2',facItems,()=>menuF4,v=>menuF4=v,'only2');
  seg('adsel','Ordi allié',[[0,'Facile'],[1,'Normal'],[2,'Difficile']],()=>menuADiff,v=>menuADiff=v,'only2');
  const pk=document.createElement('div');pk.className='opt';pk.innerHTML='<span>Départs</span><div class="sppick" id="menupick"><canvas class="spmap" width="420" height="420"></canvas><div class="note">Voici la carte vue du dessus : choisis un joueur, puis clique sur un emplacement pour placer sa base.</div><div class="spchips"></div></div>';row.appendChild(pk);
  seg('cashsel','Argent de départ',[[1500,'1 500'],[3000,'3 000'],[6000,'6 000'],[10000,'10 000']],()=>menuCash,v=>menuCash=v);
  const st=document.createElement('style');st.textContent='#opts2[data-m="1v1"] .only2{display:none}#opts2{margin-top:-6px}.opt>span.lb2{display:none}';document.head.appendChild(st);
  const _sm=syncMapUI;syncMapUI=function(){_sm();row.dataset.m=menuMode;if(!posOk(menuPos,menuMap,spSides(menuMode)))menuPos=defaultPos(menuMap,menuMode);if(!spSides(menuMode).includes(menuSel))menuSel=0;menuPickDraw();
    const lbl=document.querySelector('#diff')&&document.querySelector('#diff').parentNode.querySelector('span');if(lbl)lbl.textContent=menuMode!=='1v1'?'Ordis adverses':'Difficulté';};syncMapUI();}}
// own harvesters work on their own and can't be selected
{const _ss=setSel;setSel=function(list){return _ss((list||[]).filter(e=>!(e&&e.isU&&e.D&&e.D.harv&&e.side===PL)));};}
// AI difficulty: damage and health multipliers
{const _dm=damage;damage=function(t,amt,srcSide,src){const S=srcSide!=null&&sides[srcSide];if(S&&S.dmgM&&S.dmgM!==1)amt*=S.dmgM;return _dm(t,amt,srcSide,src);};}
{const _mu=mkUnit;mkUnit=function(side,key,x,y){const u=_mu(side,key,x,y);const S=sides[side];if(u&&S&&S.hpM&&S.hpM!==1){u.max=Math.round(u.max*S.hpM);u.hp=Math.min(u.hp,u.max);}return u;};}
// ===== Start position picker (menu and multiplayer lobby) =====
function defaultPos(map,fmt){return mapDef(map,fmt);}
function spCol(s){return({0:'#4fd17a',3:'#5aa8ff',5:'#7ad8ff',1:'#ff4d5e',4:'#ff9a3a',6:'#ff6ab0'})[s];}
// real top-down preview of a map (same seed as the game that will be played)
// (stores live on the functions so they work even when called before this line runs)
function seedFor(map){const m=seedFor.m||(seedFor.m={});return m[map]||(m[map]=1+((Math.random()*1e6)|0));}
function mapPreview(map,seed){const MPREV=mapPreview.c||(mapPreview.c={}),key=map+':'+seed;if(MPREV[key])return MPREV[key];if(G.state==='play')return null;
  setMap(map,'1v1');genMap(seed);const S=MW,O=400,k=O/S,h=(x,y)=>{const n=Math.sin(x*12.9898+y*78.233)*43758.5453;return n-Math.floor(n);};
  const COL=[[92,148,64],[146,112,70],[222,202,146],[56,118,176],[128,124,118],[42,92,44]];
  // base layer: one pixel per tile, with relief light from the top-left, then smoothed when scaled up
  const base=document.createElement('canvas');base.width=base.height=S;const bx=base.getContext('2d'),img=bx.createImageData(S,S),d=img.data;
  const E=(x,y)=>elev[ti(clamp(x,0,S-1),clamp(y,0,S-1))];
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){const i=ti(x,y),t=ter[i],c=COL[t]||COL[0],rel=t===3?0:clamp((E(x-1,y-1)-E(x+1,y+1))*6,-.25,.25),v=.92+h(x,y)*.12+rel;
    d[i*4]=Math.min(255,c[0]*v);d[i*4+1]=Math.min(255,c[1]*v);d[i*4+2]=Math.min(255,c[2]*v);d[i*4+3]=255;}
  bx.putImageData(img,0,0);
  const mask=(test,col)=>{const m=document.createElement('canvas');m.width=m.height=S;const mx=m.getContext('2d'),mi=mx.createImageData(S,S),md=mi.data;
    for(let i=0;i<NT;i++)if(test(i)){md[i*4]=col[0];md[i*4+1]=col[1];md[i*4+2]=col[2];md[i*4+3]=255;}mx.putImageData(mi,0,0);return m;};
  const cv=document.createElement('canvas');cv.width=cv.height=O;const c=cv.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  c.drawImage(base,0,0,O,O);
  // shores and water with ripples
  const wm=mask(i=>ter[i]===3,[56,118,176]);c.save();c.filter='blur('+(k*1.2).toFixed(1)+'px)';c.globalAlpha=.75;c.drawImage(mask(i=>ter[i]===3,[236,220,164]),-k*.4,-k*.4,O+k*.8,O+k*.8);c.restore();
  c.drawImage(wm,0,0,O,O);c.save();c.globalCompositeOperation='source-atop';c.restore();
  c.strokeStyle='rgba(200,230,255,.35)';c.lineWidth=Math.max(1,k*.35);for(let y=0;y<S;y+=3)for(let x=0;x<S;x+=4)if(ter[ti(x,y)]===3&&h(x,y)<.35){c.beginPath();c.moveTo(x*k,y*k+k/2);c.quadraticCurveTo(x*k+k,y*k,x*k+k*2,y*k+k/2);c.stroke();}
  // rocks
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){if(ter[ti(x,y)]!==4||h(x,y)>.55)continue;const px=(x+.5)*k,py=(y+.5)*k,r=k*(.55+h(y,x)*.5);
    c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(px+r*.3,py+r*.35,r,r*.6,0,0,PI2);c.fill();c.fillStyle='#8e8a84';c.beginPath();c.moveTo(px-r,py+r*.3);c.lineTo(px-r*.4,py-r*.7);c.lineTo(px+r*.6,py-r*.5);c.lineTo(px+r,py+r*.3);c.closePath();c.fill();
    c.fillStyle='#b8b4ac';c.beginPath();c.moveTo(px-r*.4,py-r*.7);c.lineTo(px+r*.6,py-r*.5);c.lineTo(px+r*.1,py-r*.1);c.closePath();c.fill();}
  // forests, tree by tree
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){if(ter[ti(x,y)]!==5||h(x+3,y)>.8)continue;const px=(x+.2+h(x,y+5)*.6)*k,py=(y+.2+h(y,x+9)*.6)*k,r=k*(.7+h(x+1,y+2)*.45);
    c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.arc(px+r*.35,py+r*.4,r,0,PI2);c.fill();c.fillStyle=h(x,y)<.5?'#2c5a26':'#336a2a';c.beginPath();c.arc(px,py,r,0,PI2);c.fill();
    c.fillStyle='rgba(140,200,90,.35)';c.beginPath();c.arc(px-r*.3,py-r*.35,r*.45,0,PI2);c.fill();}
  // crystal fields glow
  c.save();c.globalCompositeOperation='lighter';c.filter='blur('+(k*1.5).toFixed(1)+'px)';c.globalAlpha=.55;c.drawImage(mask(i=>ore[i]>0,[255,200,60]),0,0,O,O);c.restore();
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){if(!(ore[ti(x,y)]>0)||h(x,y)>.45)continue;const px=(x+.5)*k,py=(y+.5)*k,r=k*.75;
    c.fillStyle='#c88a18';c.beginPath();c.moveTo(px,py-r*1.4);c.lineTo(px+r*.6,py);c.lineTo(px,py+r*.5);c.lineTo(px-r*.6,py);c.closePath();c.fill();c.fillStyle='#ffe27a';c.beginPath();c.moveTo(px,py-r*1.4);c.lineTo(px+r*.25,py-r*.2);c.lineTo(px-r*.3,py-r*.1);c.closePath();c.fill();}
  // vignette and frame light
  const vg=c.createRadialGradient(O/2,O/2,O*.35,O/2,O/2,O*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.45)');c.fillStyle=vg;c.fillRect(0,0,O,O);
  const lg=c.createLinearGradient(0,0,O,O);lg.addColorStop(0,'rgba(255,240,200,.10)');lg.addColorStop(1,'rgba(0,0,30,.12)');c.fillStyle=lg;c.fillRect(0,0,O,O);
  return MPREV[key]=cv;}
function spDraw(cv,map,pos,sids,label,sel,seed){const c=cv.getContext('2d'),W=cv.width,M=MAPS[map],S=M.size,P=mapPts(map),k=(W-20)/S;c.clearRect(0,0,W,W);
  const pv=seed?mapPreview(map,seed):null;c.imageSmoothingEnabled=false;
  if(pv)c.drawImage(pv,10,10,W-20,W-20);else{const g=c.createLinearGradient(0,0,W,W);g.addColorStop(0,'#2f5a2a');g.addColorStop(1,'#3d6b2c');c.fillStyle=g;c.fillRect(10,10,W-20,W-20);}
  c.strokeStyle='#0b1017';c.lineWidth=3;c.strokeRect(10,10,W-20,W-20);c.strokeStyle='rgba(255,197,61,.55)';c.lineWidth=1;c.strokeRect(13.5,13.5,W-27,W-27);
  P.forEach((p,i)=>{const x=10+p.x*k,y=10+p.y*k,who=sids.find(s=>pos[s]===i);c.save();c.shadowColor='rgba(0,0,0,.6)';c.shadowBlur=8;c.beginPath();c.arc(x,y,19,0,PI2);c.fillStyle=who!=null?'#0b1017':'rgba(11,16,23,.55)';c.fill();c.restore();
    if(who!=null){const gg=c.createRadialGradient(x-5,y-6,2,x,y,17);gg.addColorStop(0,'#ffffffcc');gg.addColorStop(.25,spCol(who));gg.addColorStop(1,spCol(who));c.fillStyle=gg;}else c.fillStyle='rgba(255,255,255,.22)';c.beginPath();c.arc(x,y,16,0,PI2);c.fill();c.beginPath();c.arc(x,y,16,0,PI2);
    c.lineWidth=who!=null&&who===sel?3:1.5;c.strokeStyle=who!=null&&who===sel?'#fff':'#000a';c.stroke();
    c.font='bold 12px Chakra Petch, sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#111';const tx=who!=null?label(who):'libre';c.fillText(tx.length>6?(/\d$/.test(tx)?tx[0]+tx.slice(-1):tx.slice(0,6)):tx,x,y);});
  cv.dataset.map=map;}
function spHit(cv,ev,map){const r=cv.getBoundingClientRect(),W=cv.width,mx=(ev.clientX-r.left)*W/r.width,my=(ev.clientY-r.top)*W/r.height,P=mapPts(map),k=(W-20)/MAPS[map].size;
  let best=-1,bd=24;P.forEach((p,i)=>{const d=hyp(10+p.x*k-mx,10+p.y*k-my);if(d<bd){bd=d;best=i;}});return best;}
function spMove(pos,side,slot,locked){const o=Object.keys(pos).map(Number).find(s=>pos[s]===slot);if(o!=null&&o!==side){if(locked&&locked(o))return false;pos[o]=pos[side];}pos[side]=slot;return true;}
function spChips(box,sids,label,canSel,sel,onSel){box.innerHTML='';for(const s of sids){const b=document.createElement('button');b.type='button';b.className='spchip'+(s===sel?' on':'');b.style.setProperty('--c',spCol(s));b.textContent=label(s);b.disabled=!canSel(s);b.onclick=()=>onSel(s);box.appendChild(b);}}
function menuPickDraw(){const pk=document.getElementById('menupick');if(!pk)return;const cv=pk.querySelector('canvas'),sids=spSides(menuMode),L=s=>({0:'Toi',3:menuMode==='3v3'?'Allié 1':'Allié',5:'Allié 2',1:menuMode==='1v1'?'Ennemi':'Ennemi 1',4:'Ennemi 2',6:'Ennemi 3'})[s];
  spDraw(cv,menuMap,menuPos,sids,L,menuSel,seedFor(menuMap));spChips(pk.querySelector('.spchips'),sids,L,()=>true,menuSel,s=>{menuSel=s;menuPickDraw();sfx('click');});
  cv.onclick=ev=>{const i=spHit(cv,ev,menuMap);if(i<0)return;spMove(menuPos,menuSel,i);menuPickDraw();sfx('click');};}
function lobFmt(){return NET.role==='host'?NET.fmtC:NET.lfmt||'1v1';}
function lobMap(){if(NET.role!=='host')return NET.lmap||'vallee';return fmtFits(menuMap,NET.fmtC)?menuMap:Object.keys(MAPS).find(k=>fmtFits(k,NET.fmtC));}
function lobPos(){const m=lobMap(),sids=spSides(NET.fmtC);if(!posOk(NET.pos,m,sids))NET.pos=posOk(menuPos,m,sids)?Object.assign({},menuPos):defaultPos(m,NET.fmtC);return NET.pos;}
function lobHuman(s){return s===0||Object.values(NET.guests||{}).some(g=>g.side===s);}
function lobMove(side,slot,fromGuest){if(NET.role!=='host'||NET.on)return;const pos=lobPos();if(slot<0||slot>=mapPts(lobMap()).length)return;spMove(pos,side,slot,o=>lobHuman(o)&&o!==side&&(fromGuest||o!==0));}
function spLobDraw(){const lb=document.getElementById('mplob');const cv=lb&&lb.querySelector('canvas.spmap');if(!cv)return;const host=NET.role==='host',fmt=lobFmt(),sids=spSides(fmt),map=host?lobMap():NET.lmap;if(!map)return;
  const slots=host?hostSlots():(NET.lslots||{}),pos=host?lobPos():(NET.lpos||defaultPos(map,fmt));if(!posOk(pos,map,sids))return;
  const mySide=host?0:+Object.keys(slots).find(s=>slots[s]&&slots[s].cid===NET.cid);
  const L=s=>s===0?(host?'Toi':(NET.hostName||'Hôte')):slots[s]?(slots[s].cid===NET.cid?'Toi':slots[s].name):'Ordi';
  if(host&&!sids.includes(NET.spSel))NET.spSel=0;const sel=host?NET.spSel:mySide;spDraw(cv,map,pos,sids,L,sel,host?seedFor(map):NET.lseed);
  const ch=lb.querySelector('.spchips');if(ch)if(host)spChips(ch,sids,L,s=>s===0||!lobHuman(s),sel,s=>{NET.spSel=s;spLobDraw();sfx('click');});else ch.innerHTML='';
  cv.onclick=ev=>{const i=spHit(cv,ev,map);if(i<0)return;sfx('click');if(host){lobMove(NET.spSel||0,i,false);spLobDraw();}else if(mySide>=0){netSend({t:'pos',cid:NET.cid,slot:i});if(NET.lpos){spMove(NET.lpos,mySide,i);spLobDraw();}}};}
{const st=document.createElement('style');st.textContent='.sppick{display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:8px}.sppick canvas{width:180px;height:180px;cursor:pointer;border-radius:8px}.sppick .note{text-align:center;max-width:260px}.spchips{display:flex;gap:5px;flex-wrap:wrap;justify-content:center}.spchip{font-weight:700;font-size:12px;padding:4px 9px;border-radius:5px;border:2px solid var(--c);background:#0b1017;cursor:pointer}.spchip.on{background:var(--c);color:#111}.spchip:disabled{opacity:.45;cursor:default}#opts2 .opt:has(#menupick){align-items:flex-start}#menupick{margin-top:0;flex-direction:row;align-items:center}#menupick .note{max-width:150px;font-size:11px;color:var(--muted)}#menupick .spchips{flex-direction:column}';document.head.appendChild(st);}
syncMapUI();
// ===== Temporary truce: press T; it starts when an enemy presses T too, and either can break it =====
const sideName=s=>(NET.names&&NET.names[s])||(sides[s]&&FAC[sides[s].fac]?FAC[sides[s].fac].name:'L’ennemi');
function peaceSet(arr){const old=PEACE.slice();let ch=false;for(let i=0;i<7;i++){const v=arr[i]?1:0;if(PEACE[i]!==v){PEACE[i]=v;ch=true;}}if(ch)peaceChanged(old);}
function togglePeace(si){if(G.state!=='play'||!isPl(si))return;if(NET.client&&!NET.applying){NET.cmd({c:'peace'});return;}const a=PEACE.slice();a[si]=a[si]?0:1;peaceSet(a);}
function peaceChanged(old){for(const u of ents){if(!u.isU||u.dead)continue;if(u.target&&ally(u.side,u.target.side))u.target=null;if(u.order&&u.order.type==='attack'&&u.order.target&&ally(u.side,u.order.target.side))u.order=null;}
  if(!sides[PL])return;const was=(a,b)=>old[a]===1&&old[b]===1;
  for(const s of PSIDES){if(TEAM[s]===TEAM[PL])continue;const now=PEACE[s]===1&&PEACE[PL]===1,before=was(s,PL);
    if(now&&!before){banner('TRÊVE !','#4fd17a');feedPush('Trêve conclue avec '+sideName(s)+' : vos troupes ne s’attaquent plus. Appuie sur T pour la rompre.','#4fd17a');announce('Trêve conclue');}
    else if(!now&&before){banner('TRÊVE ROMPUE !','#ff4d5e');feedPush('La trêve avec '+sideName(s)+' est rompue : c’est de nouveau la guerre !','#ff4d5e');announce('La trêve est rompue');}
    else if(!now&&old[s]===0&&PEACE[s]===1&&!PEACE[PL])feedPush(sideName(s)+' propose une trêve ! Appuie sur T pour accepter.','#ffd23a');}
  if(old[PL]!==PEACE[PL]&&!PSIDES.some(s=>TEAM[s]!==TEAM[PL]&&PEACE[s]===1))feedPush(PEACE[PL]?'Tu proposes une trêve à tes ennemis… (T pour annuler)':'Tu retires ta proposition de trêve.','#ffd23a');
  peaceUI();}
{const _rc=runCmd;runCmd=function(c){if(c&&c.c==='peace'){togglePeace(NET.gs);return;}_rc(c);};}
{const _ng=newGame;newGame=function(...a){PEACE=[0,0,0,0,0,0,0];const r=_ng(...a);peaceUI();return r;};}
document.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;if(e.key==='t'||e.key==='T'){togglePeace(PL);sfx('click');}});
{const b=document.createElement('button');b.type='button';b.className='ib';b.id='bpeace';b.title='Trêve temporaire (touche T) : active quand un ennemi l’accepte aussi. Recliquer pour la rompre.';b.onclick=()=>togglePeace(PL);const ck=$('#clock');if(ck)ck.before(b);}
function peaceUI(){const b=$('#bpeace');if(!b||!sides[PL])return;const with_=PSIDES.filter(s=>TEAM[s]!==TEAM[PL]&&PEACE[s]===1&&PEACE[PL]===1),offer=PSIDES.filter(s=>TEAM[s]!==TEAM[PL]&&PEACE[s]===1);
  b.textContent=with_.length?'🤝 Trêve active (T)':PEACE[PL]?'🤝 Trêve proposée… (T)':offer.length?'🤝 Accepter la trêve (T)':'🤝 Trêve (T)';b.style.borderColor=with_.length?'#4fd17a':PEACE[PL]||offer.length?'#ffd23a':'';b.style.color=with_.length?'#4fd17a':offer.length&&!PEACE[PL]?'#ffd23a':'';}
// AI answers truce proposals from human enemies, and may break a truce after a while
{const _au=aiUpdate;aiUpdate=function(ai,dt){_au(ai,dt);const si=ai.si;if(NET.client||G.state!=='play')return;const ais=new Set(G.ai.map(a=>a.si)),hum=PSIDES.filter(s=>!ais.has(s)&&TEAM[s]!==TEAM[si]&&PEACE[s]===1);
  if(!PEACE[si]){if(!hum.length){ai.pT=null;return;}if(ai.pT==null){ai.pT=gtime+rr(3,7);ai.pOk=R()<([.85,.6,.35][G.diff]??.6);return;}
    if(gtime>=ai.pT&&ai.pT>0){ai.pT=-1;if(ai.pOk){togglePeace(si);ai.brk=gtime+rr(150,320);}else if(hum.includes(PL))feedPush(sideName(si)+' refuse la trêve !','#ff4d5e');}return;}
  if(!hum.length){ai.lone=(ai.lone||0)+dt;if(ai.lone>12){ai.lone=0;togglePeace(si);}return;}ai.lone=0;
  if(ai.brk&&gtime>ai.brk){ai.brk=0;ai.pT=-1;if(hum.includes(PL))feedPush(sideName(si)+' trahit la trêve !','#ff4d5e');togglePeace(si);}};}
// ===== Desktop app: games of the other PCs on the Wi-Fi, manual connection by IP address, auto-join =====
{const q=new URLSearchParams(location.search),back=q.get('back');
  if(back&&/^\d{2,5}$/.test(back)){const b=document.createElement('button');b.type='button';b.className='mbtn';b.id='mpback';b.textContent='↩ Revenir sur mon PC';b.style.cssText='position:fixed;left:12px;bottom:12px;z-index:40;width:auto';b.onclick=()=>{location.href='http://localhost:'+back+'/';};
    document.body.appendChild(b);setInterval(()=>{b.hidden=G.state==='play';},500);}
  const bk=()=>q.get('back')||location.port||'8080',go=(ip,port,extra)=>{const nm=($('#mpname')&&$('#mpname').value||'').trim();location.href='http://'+ip+':'+(port||8080)+'/?back='+bk()+'&fac='+menuFac+(nm?'&name='+encodeURIComponent(nm):'')+(extra||'');};
  {const f=q.get('fac'),nm=q.get('name');if(f&&FAC[f]){const card=document.querySelector('.fac[data-fac="'+f+'"]');if(card)card.click();menuFac=f;}if(nm)setTimeout(()=>{const i=$('#mpname');if(i)i.value=nm.slice(0,18);},300);}
  const tfetch=async(url,ms)=>{const ac=new AbortController(),t=setTimeout(()=>ac.abort(),ms);try{const r=await fetch(url,{signal:ac.signal,cache:'no-store'});return r.ok?await r.json():null;}catch(_){return null;}finally{clearTimeout(t);}};
  let myInfo=null,pcT=0;
  setInterval(async()=>{const mp=$('#mp');if(!NET.lan||!mp||mp.hidden||NET.on)return;if(performance.now()-pcT<1800)return;pcT=performance.now();
    if(!myInfo)myInfo=await tfetch('/lan-info',1500);const hosts=await tfetch('/lan-hosts',1500);
    let box=$('#mppcs');if(!box){box=document.createElement('div');box.id='mppcs';const list=$('#mplist');if(!list)return;list.parentNode.after(box);
      box.innerHTML='<div class="note" style="margin:8px 0 6px">Parties sur les autres PC de ton Wi-Fi :</div><div id="mppcl"></div>'+
        '<div class="row" style="margin-top:8px;gap:6px;align-items:center"><span class="note">Ou connecte-toi à l’adresse de l’hôte :</span><input id="mpip" placeholder="ex. 192.168.1.23" style="width:150px"><button type="button" class="mbtn" id="mpipgo" style="width:auto">Se connecter</button></div><div class="note" id="mpmyip" style="margin-top:4px"></div>';
      $('#mpipgo').onclick=()=>{const v=($('#mpip').value||'').trim();const m=v.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{2,5}))?$/);if(!m){mpStat('Adresse invalide : tape par exemple 192.168.1.23');return;}go(m[1],m[2]||8080);};}
    const my=$('#mpmyip');if(my&&myInfo&&myInfo.ips&&myInfo.ips.length)my.innerHTML='Ton adresse (à donner à ton ami si besoin) : <b>'+myInfo.ips.join(' ou ')+'</b>'+(myInfo.port&&myInfo.port!==8080?' (port '+myInfo.port+')':'');
    const cl=$('#mppcl');if(!cl||!Array.isArray(hosts))return;const here=location.hostname,rows=[];
    await Promise.all(hosts.filter(h=>h.ip!==here).map(async h=>{const games=await tfetch('http://'+h.ip+':'+h.port+'/lan-games',1500);rows.push({h,games});}));
    cl.innerHTML='';if(!rows.length){cl.innerHTML='<div class="empty">Aucun autre PC trouvé pour l’instant. Ton ami doit avoir lancé le jeu, et le pare-feu Windows doit autoriser Clash of Heroes.</div>';return;}
    for(const{h,games}of rows){const d=document.createElement('div');d.className='g';const n=document.createElement('b');n.textContent=h.name||h.ip;const t=document.createElement('span');t.className='note';
      d.append(n,t);if(!games){t.textContent=h.ip+' · injoignable';}else if(!games.length){t.textContent=h.ip+' · aucune partie créée';}
      else for(const g of games){t.textContent=h.ip+' · '+(FAC[g.fac]?FAC[g.fac].name:'')+' · '+(g.fmt==='3v3'?'3 contre 3':g.fmt==='2v2'?'2 contre 2':'1 contre 1');
        const mk=(label,team)=>{const bt=document.createElement('button');bt.type='button';bt.className='mbtn pri';bt.style.width='auto';bt.textContent=label;bt.onclick=()=>go(h.ip,h.port,'&join='+encodeURIComponent(g.code)+'&team='+team);d.appendChild(bt);};
        if(g.fmt&&g.fmt!=='1v1'){mk('Avec '+(g.name||'lui'),'A');mk('Contre '+(g.name||'lui'),'B');}else mk('Rejoindre '+(g.name||''),'B');}
      const c2=document.createElement('button');c2.type='button';c2.className='mbtn';c2.style.width='auto';c2.textContent='Ouvrir son salon';c2.onclick=()=>go(h.ip,h.port);d.appendChild(c2);cl.appendChild(d);}},600);
  // arriving from a "Rejoindre" button: open the multiplayer screen and join that game
  const jc=q.get('join');if(jc&&/^[a-z0-9]{4,10}$/.test(jc)){const team=q.get('team')==='A'?'A':'B';let tries=0;
    const tick=setInterval(()=>{tries++;if(tries>60){clearInterval(tick);return;}if(G.state==='play'){clearInterval(tick);return;}
      if($('#mp')&&$('#mp').hidden){const t=document.querySelector('.playtabs button[data-pt="multi"]');if(t)t.click();openMP();return;}
      if(NET.room&&NET.lan&&!NET.code){clearInterval(tick);const nm=q.get('name'),i=$('#mpname');if(nm&&i)i.value=nm.slice(0,18);joinMP(jc,team);}},500);}}
