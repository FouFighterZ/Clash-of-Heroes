// ===== Transports for every faction: characters board them (right-click on the transport) and get off with "Débarquer" =====
const TRN={dbz:{n:'Nuage Magique (Kinto-un)',fly:true,cap:2,cost:500,hp:420,sp:150,look:'nimbus',d:'Le nuage jaune de Goku : rapide et volant, il emporte 2 personnages au-dessus de l’eau et des arbres.'},
  sl:{n:'Kaisel, dragon des ombres',fly:true,cap:4,cost:900,hp:900,sp:130,look:'kaisel',d:'Le dragon d’ombre de Jinwoo : il survole tout et emporte 4 personnages.'},
  mha:{n:'Fourgon des héros',cap:5,cost:600,hp:900,sp:110,look:'truck',d:'Fourgon blindé de l’agence : emporte 5 personnages.'},
  aot:{n:'Charrette du Bataillon',cap:5,cost:500,hp:700,sp:105,look:'cart',d:'Charrette tirée par des chevaux : emporte 5 soldats.'},
  opm:{n:'Bus de l’Association des Héros',cap:5,cost:600,hp:900,sp:105,look:'truck',d:'Bus blindé de l’Association : emporte 5 héros.'},
  hxh:{n:'Fourgon de l’Association Hunter',cap:5,cost:600,hp:850,sp:110,look:'truck',d:'Fourgon de l’Association : emporte 5 Hunters.'},
  sds:{n:'Chariot de Liones',cap:5,cost:500,hp:750,sp:105,look:'cart',d:'Chariot du royaume de Liones : emporte 5 chevaliers.'}};
for(const f in TRN){const T=TRN[f];if(!UDEF[f])continue;UDEF[f].trans={key:'trans',fac:f,name:T.n,cost:T.cost,time:12,hp:T.hp,speed:T.sp,size:T.fly?12:14,sight:7,sightPx:7*TILE,at:'factory',req:['factory'],
  veh:true,fly:!!T.fly,trans:T.cap,tlook:T.look,rof:1,desc:T.d+' Sélectionne des personnages puis clic droit sur le transport pour les faire monter ; « Débarquer » pour les faire descendre.'};}
{const _ti=tabItems;tabItems=function(t){const L=_ti(t);if(t==='v'&&UDEF[sides[PL].fac].trans)L.push({isB:false,key:'trans'});return L;};}
const capOf=t=>t?(t.D&&t.D.trans)||(t.isB&&t.key==='hq'&&t.fac==='sds'&&t.rise>=1?6:0):0;
const canRide=u=>u&&u.isU&&!u.dead&&!u.D.veh&&!u.D.harv&&!u.form;
function tBoard(u,t){t.cargo=t.cargo||[];u.rideT=null;const cap=capOf(t),nm=t.isB?BDEF.hq.names.sds:t.D.name;if(t.dead||t.cargo.length>=cap){if(u.side===PL)feedPush(nm+' est plein ('+cap+' places)','#ffc53d');return;}
  t.cargo.push(u);ents=ents.filter(e=>e!==u);sel=sel.filter(e=>e!==u);for(const d of dballs)if(d.carrier===u)d.carrier=t;u.order=null;u.target=null;u.path=null;u.moving=false;
  if(u.side===PL)sfx('click');}
function tUnload(t,hurt){if(!t.cargo||!t.cargo.length)return 0;const L=t.cargo.splice(0);let k=0;
  for(const u of L){if(u.dead)continue;const a=k++/L.length*PI2;let x=t.x+Math.cos(a)*26,y=t.y+Math.sin(a)*18;
    if(bw(u,x,y)){const p=(typeof nearestShore==='function'?nearestShore(x,y):null);if(p){x=p.x;y=p.y;}}
    u.x=x;u.y=y;u.gx=x;u.gy=y;u.order=null;u.path=null;if(hurt)u.hp=Math.max(1,u.hp*.7);ents.push(u);}
  for(const d of dballs)if(d.carrier===t)d.carrier=L[0]||null;return L.length;}
function tOrder(units,t){for(const u of units){if(!canRide(u))continue;orderMove(u,t.x,t.y,false);u.rideT=t.id;u.rideO=u.order;}}
{const _uu=updUnit;updUnit=function(u,dt){_uu(u,dt);if(u.rideT&&!u.dead){const t=ents.find(e=>e.id===u.rideT&&!e.dead);if(!t||u.order!==u.rideO){u.rideT=null;return;}
  if(hyp(u.x-t.x,u.y-t.y)<(t.isB?t.w*TILE*.8:t.r+u.r+12))tBoard(u,t);else if(!u.moving&&hyp(u.order&&u.order.x-t.x||0,u.order&&u.order.y-t.y||0)>30){orderMove(u,t.x,t.y,false);u.rideO=u.order;}}};}
{const _k=kill;kill=function(t,srcSide,src){const was=!t.dead;_k(t,srcSide,src);if(was&&t.dead&&t.cargo&&t.cargo.length){const n=tUnload(t,true);if(t.side===PL&&n)feedPush(t.D.name+' détruit : les passagers sautent !','#ff4d5e');}};}
{const _hb=heroBusy;heroBusy=function(si,key){if(_hb(si,key))return true;return ents.some(e=>!e.dead&&e.side===si&&e.cargo&&e.cargo.some(u=>u.key===key));};}
{const _rc=rightCommand;rightCommand=function(wx,wy){const t=pickAt(wx,wy),units=mySel().filter(canRide);
  if(t&&t.side===PL&&capOf(t)&&units.length&&!units.includes(t)){if(NET.client&&!NET.applying)NET.cmd({c:'tb',u:units.map(u=>u.id),t:t.id});else tOrder(units,t);G.clicks.push({x:t.x,y:t.y,t:.6,col:'#ffd23a'});sfx('click');return;}
  _rc(wx,wy);};}
function doUnload(L){for(const t of L)if(capOf(t)&&t.cargo&&t.cargo.length){if(NET.client&&!NET.applying)NET.cmd({c:'tu',t:t.id});else tUnload(t,false);}}
{const _rc=runCmd;runCmd=function(c){const SI=NET.gs;if(c&&c.c==='tb'){const t=ents.find(e=>e.id===c.t&&!e.dead&&e.side===SI);if(t&&capOf(t))tOrder(ents.filter(e=>c.u.includes(e.id)&&e.side===SI&&!e.dead),t);return;}
  if(c&&c.c==='tu'){const t=ents.find(e=>e.id===c.t&&!e.dead&&e.side===SI);if(t)tUnload(t,false);return;}_rc(c);};}
{const _ru=refreshUI;refreshUI=function(){_ru();const p=$('#selp');if(!p)return;const L=sel.filter(e=>!e.dead&&e.isU&&e.side===PL&&capOf(e));let bx=p.querySelector('#xunl');const acts=p.querySelector('.acts');
  if(!L.length||!acts){if(bx)bx.remove();return;}const n=L.reduce((a,t)=>a+((t.cargo||[]).length),0),cap=L.reduce((a,t)=>a+capOf(t),0);
  if(!bx){bx=document.createElement('button');bx.type='button';bx.id='xunl';bx.className='abil';bx.style.setProperty('--ac','#4fd17a');bx.onclick=()=>{doUnload(sel.filter(e=>!e.dead&&e.isU&&e.side===PL&&capOf(e)));sfx('click');refreshUI();};}
  const h='<span class="ico"></span><span><b>Débarquer (touche G)</b><small>À bord : '+n+' / '+cap+(n?' — '+L.flatMap(t=>(t.cargo||[]).map(u=>u.D.name)).join(', '):'')+'</small></span>';if(bx._h!==h){bx._h=h;bx.innerHTML=h;}
  if(bx.parentNode!==acts)acts.prepend(bx);};}
window.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||G.paused)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;if(e.key.toLowerCase()==='g'){doUnload(mySel());refreshUI();}});
// ---- looks ----
function drawTrans(c,u,x,y){const T=u.D.tlook,P=FPAL[u.fac]||FPAL.dbz,a=u.ang||0,t=gtime;
  if(T==='nimbus'){const z=(u.z||16)+Math.sin(t*3)*2;c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.ellipse(x,y+2,18,7,0,0,PI2);c.fill();
    for(const[dx,dy,r]of[[-12,1,7],[-4,-2,9],[6,-1,8],[13,2,6],[0,3,8],[-18,3,4]]){c.fillStyle='#ffd23a';c.beginPath();c.arc(x+dx*(u.face||1),y-z+dy,r,0,PI2);c.fill();}
    for(const[dx,dy,r]of[[-6,-4,4],[5,-3,4]]){c.fillStyle='#fff3a8';c.beginPath();c.arc(x+dx*(u.face||1),y-z+dy,r,0,PI2);c.fill();}
    if(u.moving){c.fillStyle='rgba(255,210,58,.5)';for(let k=1;k<4;k++){c.beginPath();c.arc(x-(u.face||1)*(16+k*7),y-z+2,5-k,0,PI2);c.fill();}}}
  else if(T==='kaisel'){const z=(u.z||18)+Math.sin(t*2.5)*3,f=u.face||1,w=Math.sin(t*6)*.5;c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x,y+2,26,8,0,0,PI2);c.fill();
    c.save();c.translate(x,y-z);c.scale(f,1);c.fillStyle='#1a1426';for(const s of[-1,1]){c.beginPath();c.moveTo(-4,0);c.lineTo(-10,-22*s*0+(-14-w*10));c.lineTo(-22,-8-w*6);c.lineTo(-16,2);c.closePath();c.fill();}
    c.beginPath();c.ellipse(0,0,16,6,0,0,PI2);c.fill();c.beginPath();c.moveTo(14,-2);c.lineTo(26,-7);c.lineTo(24,0);c.closePath();c.fill();c.beginPath();c.moveTo(-14,0);c.lineTo(-28,4);c.lineTo(-14,3);c.fill();
    c.fillStyle='#8a5aff';c.beginPath();c.arc(22,-5,1.6,0,PI2);c.fill();c.restore();c.globalCompositeOperation='lighter';drawGlow(c,x,y-z,14,'#8a5aff',.25);c.globalCompositeOperation='source-over';}
  else{c.save();c.translate(x,y);c.rotate(a);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.roundRect(-18,-10,38,22,4);c.fill();
    if(T==='cart'){c.strokeStyle='#5a3a1a';c.lineWidth=2;c.beginPath();c.moveTo(10,0);c.lineTo(22,0);c.stroke();c.fillStyle='#7a5a3a';c.beginPath();c.roundRect(-16,-9,26,18,2);c.fill();c.fillStyle=P.acc;c.fillRect(-16,-2,26,4);
      for(const s of[-1,1]){c.fillStyle='#3a2a1a';c.beginPath();c.arc(-6,s*10,3.5,0,PI2);c.fill();}const st=Math.sin(u.anim*12)*2;c.fillStyle='#6a4a2a';c.beginPath();c.ellipse(26,0,7,4,0,0,PI2);c.fill();c.fillRect(22+st,-5,2,10);}
    else{for(const s of[-1,1]){c.fillStyle='#26262c';for(const xx of[-12,10]){c.beginPath();c.arc(xx,s*9,3.5,0,PI2);c.fill();}}c.beginPath();c.roundRect(-18,-9,36,18,4);fo(c,P.base);c.fillStyle=P.acc;c.fillRect(-18,-1.5,36,3);
      c.fillStyle='#1a2030';c.fillRect(10,-7,6,14);c.fillStyle='#bfe4ff';for(const xx of[-12,-5,2])c.fillRect(xx,-8,4,3);}
    c.restore();}
  const n=(u.cargo||[]).length;if(n&&(u.side===PL||ally(u.side,PL))){const z=u.fly?(u.z||16):0;c.fillStyle='#0b0f16';c.beginPath();c.arc(x+14,y-z-14,6,0,PI2);c.fill();c.fillStyle='#ffd23a';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText(n,x+14,y-z-11);}}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){if(u.key==='trans')return drawTrans(c,u,x,y);return _dv(c,u,x,y,ghost);};}
