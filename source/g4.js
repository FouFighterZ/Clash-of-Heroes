// ===== Camera & canvas =====
const cv=document.getElementById('cv'),ctx=cv.getContext('2d'),mini=document.getElementById('mini'),mctx=mini.getContext('2d');
let dpr=1;const cam={x:0,y:0,z:1,vw(){return cv.clientWidth/this.z;},vh(){return cv.clientHeight/this.z;}};
function resize(){dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.max(1,cv.clientWidth*dpr|0);cv.height=Math.max(1,cv.clientHeight*dpr|0);clampCam();}
function clampCam(){const vw=cam.vw(),vh=cam.vh();cam.x=vw>=WW?(WW-vw)/2:clamp(cam.x,0,WW-vw);cam.y=vh>=WH?(WH-vh)/2:clamp(cam.y,0,WH-vh);}
function centerOn(x,y){cam.x=x-cam.vw()/2;cam.y=y-cam.vh()/2;clampCam();}
window.addEventListener('resize',resize);

// ===== Input =====
const mouse={x:0,y:0,wx:0,wy:0,in:false,down:false,sx:0,sy:0,box:false,pan:false,px:0,py:0,lastClick:0,touch:false,tid:null};
const keys={};let mode=null;// null | {type:'place',key} | {type:'ability',u} | {type:'amove'}
function toWorld(){mouse.wx=cam.x+mouse.x/cam.z;mouse.wy=cam.y+mouse.y/cam.z;}
function pickAt(wx,wy,anySide){let best=null,bd=1e9;
  for(const e of ents){if(e.dead||!e.isU)continue;if(e.side!==PL&&!plSees(e))continue;const hy=e.y-(e.z||0)-(e.D.veh?0:10),d=hyp(e.x-wx,hy-wy);if(d<e.r+10&&d<bd){bd=d;best=e;}}
  if(best)return best;
  for(const e of ents){if(e.dead||!e.isB)continue;if(!ally(e.side,PL)&&!e.seen)continue;const x0=e.tx*TILE,y0=e.ty*TILE;if(wx>=x0&&wx<x0+e.w*TILE&&wy>=y0-bH(e)*.85&&wy<y0+e.h*TILE)return e;}
  return null;}
function mySel(){return sel.filter(e=>!e.dead&&e.side===PL);}
function setSel(list){sel=list.filter(e=>!e.dead);G.selSig='';const b=sel.length===1&&sel[0].isB&&sel[0].side===PL?sel[0]:null;
  if(b&&sides[PL].q[b.key])sides[PL].primary[b.key]=b;if(sel.length)sfx('click');}
function boxSelect(add){const x0=Math.min(mouse.sx,mouse.x),x1=Math.max(mouse.sx,mouse.x),y0=Math.min(mouse.sy,mouse.y),y1=Math.max(mouse.sy,mouse.y);
  const L=ents.filter(e=>e.isU&&!e.dead&&e.side===PL&&(()=>{const sx=(e.x-cam.x)*cam.z,sy=(e.y-(e.z||0)-8-cam.y)*cam.z;return sx>=x0-6&&sx<=x1+6&&sy>=y0-6&&sy<=y1+6;})());
  const combat=L.filter(u=>!u.D.harv);const pickL=combat.length?combat:L;setSel(add?[...new Set([...sel,...pickL])]:pickL);}
function clickSelect(add,dbl){const e=pickAt(mouse.wx,mouse.wy);
  if(!e){if(!add)setSel([]);return;}
  if(dbl&&e.isU&&e.side===PL){const vw=cam.vw(),vh=cam.vh();setSel(ents.filter(o=>o.isU&&!o.dead&&o.side===PL&&o.key===e.key&&o.x>cam.x&&o.x<cam.x+vw&&o.y>cam.y&&o.y<cam.y+vh));return;}
  if(add&&e.side===PL&&e.isU){if(sel.includes(e))setSel(sel.filter(o=>o!==e));else setSel([...sel,e]);}else setSel([e]);}
function rightCommand(wx,wy){const my=mySel(),units=my.filter(e=>e.isU);
  if(!units.length){const b=my.find(e=>e.isB&&(sides[PL].q[e.key]));if(b){setRally(b,wx,wy);G.clicks.push({x:wx,y:wy,t:.6,col:'#ffc53d'});sfx('click');}return;}
  const t=pickAt(wx,wy);
  if(t&&foe(t.side,PL)){let n=0;for(const u of units)if(u.D.dmg){orderAttack(u,t);n++;}if(n){G.clicks.push({x:t.x,y:t.y,t:.6,col:'#ff4d5e'});sfx('click');}
    const hv=units.filter(u=>u.D.harv);if(hv.length&&!n)cmdMove(hv,wx,wy);return;}
  if(t&&t.isB&&t.key==='refinery'&&t.side===PL){const hv=units.filter(u=>u.D.harv);for(const u of hv)harvRet(u);if(hv.length){sfx('click');return;}}
  const i=ti(tileOf(wx),tileOf(wy));if(ore[i]>0&&units.some(u=>u.D.harv)){cmdHarvest(units,i);cmdMove(units.filter(u=>!u.D.harv),wx,wy,false);G.clicks.push({x:wx,y:wy,t:.6,col:'#ffd34a'});sfx('click');return;}
  cmdMove(units,wx,wy,false);G.clicks.push({x:wx,y:wy,t:.6,col:'#4fd17a'});sfx('click');}
function placeTile(){const D=BDEF[mode.key];return{x:Math.round(mouse.wx/TILE-D.w/2),y:Math.round(mouse.wy/TILE-D.h/2)};}
function leftAction(){
  if(mode&&mode.type==='place'){const p=placeTile();if(placeBuilding(PL,mode.key,p.x,p.y)){mode=null;}else{msg('Emplacement impossible','#ff4d5e');sfx('err');}return true;}
  if(mode&&mode.type==='ability'){if(!mode.u.dead&&(mode.slot===2?orderAbility2:orderAbility)(mode.u,mouse.wx,mouse.wy))G.clicks.push({x:mouse.wx,y:mouse.wy,t:.6,col:(mode.slot===2?mode.u.D.ab2:mode.u.D.ab).col});mode=null;return true;}
  if(mode&&mode.type==='super'){if(launchSuper(PL,mouse.wx,mouse.wy))G.clicks.push({x:mouse.wx,y:mouse.wy,t:.6,col:SUPER[sides[PL].fac].col});mode=null;return true;}
  if(mode&&mode.type==='amove'){cmdMove(mySel().filter(e=>e.isU),mouse.wx,mouse.wy,true);G.clicks.push({x:mouse.wx,y:mouse.wy,t:.6,col:'#ff8a1f'});mode=null;sfx('click');return true;}
  return false;}
cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointerenter',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;mouse.in=true;});cv.addEventListener('pointerleave',()=>{mouse.in=false;});
cv.addEventListener('pointerdown',e=>{if(G.state!=='play')return;audioInit();const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;toWorld();mouse.in=true;
  try{cv.setPointerCapture(e.pointerId);}catch(_){}
  if(e.pointerType==='touch'){mouse.touch=true;mouse.down=true;mouse.pan=false;mouse.sx=mouse.x;mouse.sy=mouse.y;mouse.px=mouse.x;mouse.py=mouse.y;return;}
  mouse.touch=false;
  if(e.button===1){mouse.pan=true;mouse.px=mouse.x;mouse.py=mouse.y;e.preventDefault();return;}
  if(e.button===2){if(mode){mode=null;return;}rightCommand(mouse.wx,mouse.wy);return;}
  if(e.button===0){if(leftAction())return;mouse.down=true;mouse.box=false;mouse.sx=mouse.x;mouse.sy=mouse.y;}});
cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;toWorld();
  if(mouse.touch&&mouse.down){if(hyp(mouse.x-mouse.sx,mouse.y-mouse.sy)>10)mouse.pan=true;if(mouse.pan){cam.x-=(mouse.x-mouse.px)/cam.z;cam.y-=(mouse.y-mouse.py)/cam.z;clampCam();}mouse.px=mouse.x;mouse.py=mouse.y;return;}
  if(mouse.pan){cam.x-=(mouse.x-mouse.px)/cam.z;cam.y-=(mouse.y-mouse.py)/cam.z;clampCam();mouse.px=mouse.x;mouse.py=mouse.y;return;}
  if(mouse.down&&hyp(mouse.x-mouse.sx,mouse.y-mouse.sy)>6)mouse.box=true;});
cv.addEventListener('pointerup',e=>{if(G.state!=='play'){mouse.down=false;return;}toWorld();
  if(mouse.touch){mouse.down=false;if(!mouse.pan)touchTap();mouse.pan=false;return;}
  if(mouse.pan&&(e.button===1)){mouse.pan=false;return;}
  if(e.button===0&&mouse.down){mouse.down=false;const now=performance.now();if(mouse.box)boxSelect(e.shiftKey);else clickSelect(e.shiftKey,now-mouse.lastClick<320);mouse.lastClick=now;mouse.box=false;}});
function touchTap(){if(leftAction())return;const e=pickAt(mouse.wx,mouse.wy);
  if(e&&e.side===PL){setSel([e]);return;}if(mySel().some(s=>s.isU)||mySel().some(s=>s.isB)){rightCommand(mouse.wx,mouse.wy);return;}if(e)setSel([e]);}
cv.addEventListener('wheel',e=>{if(G.state!=='play')return;e.preventDefault();const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top,wx=cam.x+mx/cam.z,wy=cam.y+my/cam.z;
  cam.z=clamp(cam.z*(e.deltaY<0?1.1:1/1.1),.55,1.6);cam.x=wx-mx/cam.z;cam.y=wy-my/cam.z;clampCam();},{passive:false});
let miniDrag=false;
function miniPos(e){const r=mini.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*WW,y:(e.clientY-r.top)/r.height*WH};}
mini.addEventListener('contextmenu',e=>e.preventDefault());
mini.addEventListener('pointerdown',e=>{if(G.state!=='play')return;const p=miniPos(e);if(e.button===2){const u=mySel().filter(s=>s.isU);if(u.length){cmdMove(u,p.x,p.y,false);sfx('click');}return;}
  miniDrag=true;try{mini.setPointerCapture(e.pointerId);}catch(_){}centerOn(p.x,p.y);});
mini.addEventListener('pointermove',e=>{if(miniDrag){const p=miniPos(e);centerOn(p.x,p.y);}});
mini.addEventListener('pointerup',()=>{miniDrag=false;});
window.addEventListener('keydown',e=>{if(G.state!=='play')return;const k=e.key.toLowerCase();keys[e.key]=true;
  if(k==='escape'){if(!$('#pausem').hidden){closePause();return;}if(mode)mode=null;else if(sel.length)setSel([]);else openPause();return;}
  if(G.paused&&k!=='p')return;
  else if(k==='p'){togglePause();}
  else if(k==='f'){toggleFull();}
  else if(k==='tab'){e.preventDefault();cycleTab();}
  else if(HK.includes(k)&&!e.ctrlKey&&!e.metaKey){const it=items[HK.indexOf(k)];if(it)itemClick(it,e.shiftKey);}
  else if(k==='a'&&(e.ctrlKey||e.metaKey)){e.preventDefault();setSel(ents.filter(u=>u.isU&&!u.dead&&u.side===PL&&!u.D.harv));}
  else if(k==='a'&&mySel().some(s=>s.isU&&s.D.dmg)){mode={type:'amove'};}
  else if(k==='s'){for(const u of mySel())if(u.isU)orderStop(u);}
  else if(k==='q'){triggerAbility();}
  else if(k==='h'){const hq=myB(PL,'hq')[0]||myB(PL)[0];if(hq)centerOn(hq.x,hq.y);}
  else if(k===' '&&G.alertPos){centerOn(G.alertPos.x,G.alertPos.y);e.preventDefault();}
  else if(/^[1-9]$/.test(k)){if(e.ctrlKey||e.metaKey){groups[k]=mySel().filter(s=>s.isU);msg('Groupe '+k+' assigné');e.preventDefault();}
    else if(groups[k]){const g=groups[k].filter(u=>!u.dead);const now=performance.now();if(G.lastGroup===k&&now-G.lastGroupT<400&&g.length){let x=0,y=0;g.forEach(u=>{x+=u.x;y+=u.y;});centerOn(x/g.length,y/g.length);}
      setSel(g);G.lastGroup=k;G.lastGroupT=now;}}
  else if(k==='+'||k==='='){cam.z=clamp(cam.z*1.1,.55,1.6);clampCam();}else if(k==='-'){cam.z=clamp(cam.z/1.1,.55,1.6);clampCam();}
  if(e.key.startsWith('Arrow'))e.preventDefault();});
window.addEventListener('keyup',e=>{keys[e.key]=false;});
window.addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
function triggerAbility(u){const hs=u?[u]:mySel().filter(s=>s.isU&&s.D.ab&&canCast(s));if(!hs.length){if(!u&&mySel().some(s=>s.isU&&s.D.ab))msg('Attaque spéciale en recharge');return;}
  const h=hs[0];if(h.D.ab.type==='rage'){orderAbility(h,h.x,h.y);return;}mode={type:'ability',u:h};}
function toggleFull(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>msg('Plein écran indisponible ici : utilise F11'));}catch(_){msg('Plein écran indisponible ici : utilise F11');}}
function togglePause(){if(G.wishPending||G.state!=='play')return;if(G.paused)closePause();else openPause();}

// ===== Rendering =====
function drawOre(c,x0,y0,x1,y1){const t=gtime;
  for(let ty=Math.max(0,y0);ty<=Math.min(MH-1,y1);ty++)for(let tx=Math.max(0,x0);tx<=Math.min(MW-1,x1);tx++){const i=ti(tx,ty);if(ore[i]<=0||!expl[i])continue;
    const n=Math.min(3,Math.ceil(ore[i]/260)),X=tx*TILE+16,Y=ty*TILE+16;
    for(let k=0;k<n;k++){const f=oreFx[i][k];crystal(c,X+f.dx,Y+f.dy,f.s*(ore[i]>500?1.15:.95),f.f);}
    if(vis[i]){c.globalCompositeOperation='lighter';drawGlow(c,X,Y-4,20,'#ffb52a',.16+Math.sin(t*2+i)*.06);c.globalCompositeOperation='source-over';}}}
function crystal(c,x,y,s,f){c.save();c.translate(x,y);c.scale(s*f,s);
  c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(3,1,7,2.5,0,0,PI2);c.fill();
  c.beginPath();c.moveTo(-4,0);c.lineTo(-5,-8);c.lineTo(-1,-15);c.lineTo(3,-8);c.lineTo(2,0);c.closePath();c.fillStyle='#ffcf3a';c.fill();c.strokeStyle='#7a3a0a';c.lineWidth=1;c.stroke();
  c.beginPath();c.moveTo(-1,-15);c.lineTo(3,-8);c.lineTo(2,0);c.lineTo(-1,-1);c.closePath();c.fillStyle='#e8861a';c.fill();
  c.beginPath();c.moveTo(1,0);c.lineTo(5,-6);c.lineTo(8,-1);c.lineTo(6,1);c.closePath();c.fillStyle='#ffdb5a';c.fill();c.stroke();
  c.fillStyle='rgba(255,255,230,.85)';c.beginPath();c.moveTo(-3.5,-3);c.lineTo(-4,-8);c.lineTo(-2.5,-11);c.lineTo(-2.5,-5);c.fill();c.restore();}
function hpBar(c,x,y,w,f,col,en){c.fillStyle='rgba(0,0,0,.7)';c.fillRect(x-w/2-1,y-1,w+2,6);c.fillStyle=en?'#ff5a68':f>.5?(col||'#4fd17a'):f>.25?'#ffc53d':'#ff4d5e';c.fillRect(x-w/2,y,w*f,4);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(x-w/2,y,w*f,1);}
function render(){const W=cv.width,H=cv.height;ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#05070b';ctx.fillRect(0,0,W,H);if(!terr)return;
  let sx=0,sy=0;if(G.shake>.3){sx=rr(-G.shake,G.shake);sy=rr(-G.shake,G.shake);}
  const z=cam.z*dpr;ctx.setTransform(z,0,0,z,(-cam.x+sx)*z,(-cam.y+sy)*z);ctx.imageSmoothingEnabled=true;
  const vw=cam.vw(),vh=cam.vh(),X0=Math.max(0,cam.x-2),Y0=Math.max(0,cam.y-2),X1=Math.min(WW,cam.x+vw+2),Y1=Math.min(WH,cam.y+vh+2);
  ctx.drawImage(terr,X0,Y0,X1-X0,Y1-Y0,X0,Y0,X1-X0,Y1-Y0);
  const tx0=Math.floor(cam.x/TILE)-1,ty0=Math.floor(cam.y/TILE)-1,tx1=Math.ceil((cam.x+vw)/TILE)+1,ty1=Math.ceil((cam.y+vh)/TILE)+3;
  drawWater(ctx,tx0,ty0,tx1,ty1);drawOre(ctx,tx0,ty0,tx1,ty1);drawDragonBalls(ctx);drawZones(ctx);drawPickups(ctx);
  // dock markers & rally
  const inView=(x,y,m)=>x>cam.x-m&&x<cam.x+vw+m&&y>cam.y-m&&y<cam.y+vh+m;
  for(const c of G.clicks){const a=c.t/.6;ctx.strokeStyle=c.col;ctx.globalAlpha=a;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(c.x,c.y,14*a+4,(14*a+4)*.6,0,0,PI2);ctx.stroke();ctx.globalAlpha=1;}
  // selection circles under
  for(const e of sel){if(e.dead)continue;ctx.strokeStyle=e.side===PL?'#4fd17a':'#ff4d5e';ctx.lineWidth=1.6;
    if(e.isU){ctx.beginPath();ctx.ellipse(e.x,e.y+1,e.r+4,(e.r+4)*.5,0,0,PI2);ctx.stroke();}}
  // sorted world objects
  const dl=[];
  for(const e of ents){if(e.dead)continue;if(e.isB){if(!ally(e.side,PL)&&!e.seen)continue;if(!inView(e.x,e.y,140))continue;dl.push(e);}
    else{if(e.side!==PL&&!plSees(e))continue;if(!inView(e.x,e.y,60))continue;if(!e.fly)drawUnitShadow(ctx,e);dl.push(e);}}
  for(const e of dl)if(e.fly)drawUnitShadow(ctx,e);
  dl.sort((a,b)=>((a.fly?1e5:0)+(a.isB?(a.ty+a.h)*TILE-4:a.y))-((b.fly?1e5:0)+(b.isB?(b.ty+b.h)*TILE-4:b.y)));
  drawCorpses(ctx);drawPartsLow(ctx);
  for(const e of dl){if(e.isB)drawBuilding(ctx,e);else{drawUnitBody(ctx,e,e.x,e.y);drawCarried(ctx,e,e.x,e.y);}}
  // projectiles
  ctx.globalCompositeOperation='lighter';
  for(const p of projs){const y=p.y-p.z;if(p.kind==='shell'){ctx.strokeStyle='#ffe0a0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x,y);const l=hyp(p.tx-p.x,p.ty-p.y)||1;ctx.lineTo(p.x-(p.tx-p.x)/l*12,y-(p.ty-p.y)/l*12);ctx.stroke();}
    else if(p.kind==='bigball'){drawGlow(ctx,p.x,y,34+Math.sin(p.age*30)*4,p.col,1);drawGlow(ctx,p.x,y,14,'#ffffff',1);}
    else if(p.kind==='missile'){drawGlow(ctx,p.x,y,9,'#ffb040',1);}
    else if(p.kind==='rock'){ctx.globalCompositeOperation='source-over';drawRock(ctx,p,y);ctx.globalCompositeOperation='lighter';}
    else if(p.kind==='bullet'){ctx.strokeStyle='#fff0a0';ctx.lineWidth=1.5;const l=hyp(p.tx-p.x,p.ty-p.y)||1;ctx.beginPath();ctx.moveTo(p.x,y);ctx.lineTo(p.x-(p.tx-p.x)/l*9,y-(p.ty-p.y)/l*9);ctx.stroke();}
    else{const l=hyp(p.tx-p.x,p.ty-p.y)||1,ux=(p.tx-p.x)/l,uy=(p.ty-p.y)/l;if(p.kind!=='fire'){ctx.strokeStyle=p.col;ctx.globalAlpha=.55;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(p.x,y);ctx.lineTo(p.x-ux*22,y-uy*22);ctx.stroke();ctx.globalAlpha=1;}
      drawGlow(ctx,p.x,y,p.kind==='fire'?12:10,p.col,1);drawGlow(ctx,p.x,y,4,'#ffffff',1);}}
  ctx.globalCompositeOperation='source-over';
  drawFx(ctx);drawSpecial(ctx);drawPopFx(ctx);drawPartsHigh(ctx);drawClouds(ctx);
  // fog
  ctx.imageSmoothingEnabled=true;if(!G.noFog)ctx.drawImage(fogC,0,0,MW,MH,-TILE*.5,-TILE*.5,WW+TILE,WH+TILE);
  // overlays: hp bars, selection brackets, rally
  for(const e of dl){const s=sel.includes(e),hv=mouse.in&&!mouse.box&&hoverEnt===e;
    if(e.isB){if(s){const x0=e.tx*TILE,y0=e.ty*TILE,w=e.w*TILE,h=e.h*TILE,l=10;ctx.strokeStyle=e.side===PL?'#4fd17a':'#ff4d5e';ctx.lineWidth=2;ctx.beginPath();
        for(const[cx,cy,dx,dy]of[[x0,y0,1,1],[x0+w,y0,-1,1],[x0,y0+h,1,-1],[x0+w,y0+h,-1,-1]]){ctx.moveTo(cx+dx*l,cy);ctx.lineTo(cx,cy);ctx.lineTo(cx,cy+dy*l);}ctx.stroke();
        if(e.rally&&e.side===PL){ctx.setLineDash([5,4]);ctx.strokeStyle='#ffc53d';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.rally.x,e.rally.y);ctx.stroke();ctx.setLineDash([]);
          ctx.fillStyle='#ffc53d';ctx.beginPath();ctx.moveTo(e.rally.x,e.rally.y);ctx.lineTo(e.rally.x,e.rally.y-16);ctx.lineTo(e.rally.x+10,e.rally.y-12);ctx.lineTo(e.rally.x,e.rally.y-8);ctx.fill();}}
      if(s||hv||e.hp<e.max)hpBar(ctx,e.x,e.ty*TILE-bH(e)-6,e.w*TILE*.7,e.hp/e.max,null,foe(e.side,PL));}
    else{const top=e.y-(e.z||0)-(e.form?FORMS[e.form].sc*31:e.D.veh?e.r+8:e.D.hero?52:39);if(s||hv||(e.D.hero&&e.hp<e.max))hpBar(ctx,e.x,top,e.D.hero?30:20,e.hp/e.max,e.D.hero?'#7fe0ff':ally(e.side,PL)&&e.side!==PL?'#5aa8ff':null,foe(e.side,PL));
      if(e.rank)chevrons(ctx,e.x-(e.D.hero?19:14),top+3,e.rank);
      if(e.D.harv&&(s||hv)){ctx.fillStyle='#ffc93a';ctx.fillRect(e.x-10,top+5,20*e.load/CAP,2);}
      if(e.freeze>0){ctx.fillStyle='#bff4ff';ctx.font='10px Chakra Petch, sans-serif';ctx.textAlign='center';ctx.fillText('GELÉ',e.x,top-4);}}}
  // pings
  for(const p of G.pings){const a=(p.t%1);ctx.strokeStyle='#ff4d5e';ctx.lineWidth=3;ctx.globalAlpha=1-a;ctx.beginPath();ctx.arc(p.x,p.y,20+a*60,0,PI2);ctx.stroke();ctx.globalAlpha=1;}
  // modes
  if(mode&&mode.type==='place'&&mode.key==='wall'){const p=placeTile(),d=mode.drag||p,w=wallPreview(PL,d.x,d.y,p.x,p.y);
    for(const[x,y,ok]of w.tiles){if(ok){ctx.globalAlpha=.55;drawBuilding(ctx,{tx:x,ty:y,w:1,h:1,key:'wall',fac:sides[PL].fac,anim:gtime,rise:1,tang:-PI/4},true);ctx.globalAlpha=1;}
      ctx.fillStyle=ok?'rgba(79,209,122,.35)':'rgba(255,77,94,.4)';ctx.fillRect(x*TILE+1,y*TILE+1,TILE-2,TILE-2);}}
  else if(mode&&mode.type==='place'){const D=BDEF[mode.key],p=placeTile();ctx.globalAlpha=.55;drawBuilding(ctx,{tx:p.x,ty:p.y,w:D.w,h:D.h,key:mode.key,fac:sides[PL].fac,anim:gtime,rise:1,tang:-PI/4},true);ctx.globalAlpha=1;
    const ok=canPlace(PL,mode.key,p.x,p.y,false);for(let y=p.y;y<p.y+D.h;y++)for(let x=p.x;x<p.x+D.w;x++){const free=x>=0&&y>=0&&x<MW&&y<MH&&!blocked[ti(x,y)]&&!ore[ti(x,y)];
      ctx.fillStyle=ok&&free?'rgba(79,209,122,.35)':'rgba(255,77,94,.4)';ctx.fillRect(x*TILE+1,y*TILE+1,TILE-2,TILE-2);}}
  if(mode&&mode.type==='super'){const SP=SUPER[sides[PL].fac];ctx.strokeStyle=SP.col;ctx.fillStyle=SP.col+'30';ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(mouse.wx,mouse.wy,SP.rad,SP.rad*.6,0,0,PI2);ctx.fill();ctx.stroke();}
  if(mode&&mode.type==='ability'&&!mode.u.dead){const u=mode.u,ab=mode.slot===2?u.D.ab2:u.D.ab,dx=mouse.wx-u.x,dy=mouse.wy-u.y,l=hyp(dx,dy)||1;ctx.strokeStyle=ab.col;ctx.fillStyle=ab.col+'33';ctx.lineWidth=2;
    ctx.setLineDash([6,5]);ctx.beginPath();ctx.ellipse(u.x,u.y,ab.range,ab.range*.75,0,0,PI2);ctx.stroke();ctx.setLineDash([]);
    if(ab.type==='beam'||ab.type==='ice'){const w=ab.w,ux=dx/l,uy=dy/l,L=ab.len;ctx.beginPath();ctx.moveTo(u.x-uy*w/2,u.y+ux*w/2);ctx.lineTo(u.x+ux*L-uy*w/2,u.y+uy*L+ux*w/2);ctx.lineTo(u.x+ux*L+uy*w/2,u.y+uy*L-ux*w/2);ctx.lineTo(u.x+uy*w/2,u.y-ux*w/2);ctx.closePath();ctx.fill();ctx.stroke();}
    else if(ab.type==='cone'){const a=Math.atan2(dy,dx);ctx.beginPath();ctx.moveTo(u.x,u.y);ctx.arc(u.x,u.y,ab.len,a-ab.ang,a+ab.ang);ctx.closePath();ctx.fill();ctx.stroke();}
    else{ctx.beginPath();ctx.arc(mouse.wx,mouse.wy,ab.rad,0,PI2);ctx.fill();ctx.stroke();}}
  // screen space
  ctx.setTransform(dpr,0,0,dpr,0,0);const sw=cv.clientWidth,sh=cv.clientHeight;drawVignette(ctx,sw,sh);if(G.shenron)drawShenron(ctx,sw,sh);
  if(mouse.box){ctx.strokeStyle='#4fd17a';ctx.lineWidth=1.5;ctx.fillStyle='rgba(79,209,122,.1)';const x=Math.min(mouse.sx,mouse.x),y=Math.min(mouse.sy,mouse.y),w=Math.abs(mouse.x-mouse.sx),h=Math.abs(mouse.y-mouse.sy);ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h);}
  if(G.cut)drawCutin(ctx,sw,sh);
  if(hoverEnt&&!hoverEnt.dead&&!mouse.box){const e=hoverEnt,nm=e.isB?e.D.names[e.fac]:e.D.name,sx=(e.x-cam.x)*cam.z,sy=((e.isB?e.ty*TILE-bH(e)-14:e.y-(e.z||0)-(e.D.veh?e.r+16:46))-cam.y)*cam.z;
    ctx.font='600 12px Chakra Petch, sans-serif';const w=ctx.measureText(nm).width+16;ctx.fillStyle='rgba(8,11,16,.85)';ctx.strokeStyle=e.side===PL?FAC[e.fac].col:'#ff4d5e';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.roundRect(sx-w/2,sy-18,w,20,4);ctx.fill();ctx.stroke();ctx.fillStyle='#eef2f8';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(nm,sx,sy-8);ctx.textBaseline='alphabetic';}}
function drawCutin(c,sw,sh){const C=G.cut,p=C.t/C.dur,inp=clamp(C.t/.18,0,1),out=p>.8?(p-.8)/.2:0,ease=1-Math.pow(1-inp,3);
  const bh=Math.min(140,sh*.24),cy=sh*.26,off=(1-ease)*-sw+out*sw;c.save();c.translate(off,0);
  c.globalAlpha=.9;c.fillStyle='#0b0e13';c.beginPath();c.moveTo(0,cy-bh/2+18);c.lineTo(sw,cy-bh/2-18);c.lineTo(sw,cy+bh/2-18);c.lineTo(0,cy+bh/2+18);c.closePath();c.fill();
  c.save();c.clip();c.globalAlpha=1;const g=c.createLinearGradient(0,0,sw,0);g.addColorStop(0,C.fc);g.addColorStop(.5,C.col);g.addColorStop(1,C.fc);c.fillStyle=g;c.globalAlpha=.55;c.fillRect(0,cy-bh,sw,bh*2);
  c.globalAlpha=.5;c.strokeStyle='#ffffff';c.lineWidth=2;for(let k=0;k<40;k++){const y=cy-bh/2+((k*37.3+C.t*900)%bh),x=((k*97.1+C.t*2600)%(sw+300))-150;c.beginPath();c.moveTo(x,y);c.lineTo(x+120+k%5*30,y-8);c.stroke();}
  c.globalAlpha=1;const u=C.u,sc=bh/30;drawFighter(c,sw*.18,cy+bh*.62,unitLook(u),1,gtime,false,sc,{ssj:C.ssj||u.ssj,aura:C.col,cast:true});c.restore();
  c.strokeStyle='#ffffff';c.lineWidth=4;c.beginPath();c.moveTo(0,cy-bh/2+18);c.lineTo(sw,cy-bh/2-18);c.moveTo(0,cy+bh/2+18);c.lineTo(sw,cy+bh/2-18);c.stroke();
  const fs=Math.min(64,sw/(C.text.length*.55));c.save();c.translate(sw*.62,cy);c.rotate(-.05);c.scale(1+Math.max(0,.25-C.t)*2,1+Math.max(0,.25-C.t)*2);
  c.font=`${fs}px Bangers, Impact, sans-serif`;c.textAlign='center';c.textBaseline='middle';c.lineWidth=8;c.strokeStyle='#111';c.strokeText(C.text,0,0);c.fillStyle='#ffffff';c.fillText(C.text,0,0);
  c.fillStyle=C.col;c.globalAlpha=.35;c.fillText(C.text,3,3);c.restore();
  c.font='600 14px Chakra Petch, sans-serif';c.textAlign='left';c.fillStyle='#fff';c.globalAlpha=1;c.fillText(u.D.name.toUpperCase(),sw*.3,cy+bh/2-4);c.restore();}
function drawMini(){const hasRadar=has(PL,'radar');const MM=mini.width,MT=MM/MW;const m=mctx,s=MM/WW;m.drawImage(terrMini,0,0,MM,MM);
  m.fillStyle='#ffc93a';for(const i of oreCells){if(ore[i]>0&&expl[i])m.fillRect((i%MW)*MT,((i/MW)|0)*MT,MT,MT);}
  m.imageSmoothingEnabled=true;m.drawImage(fogC,0,0,MW,MH,0,0,MM,MM);
  for(const e of ents){if(e.dead||e.hid&&foe(e.side,PL))continue;if(!ally(e.side,PL)&&!(e.isB?e.seen:vis[ti(tileOf(e.x),tileOf(e.y))])&&!(e.isU&&hasRadar))continue;const col=e.side===PL?FAC[sides[PL].fac].col:ally(e.side,PL)?'#5aa8ff':e.side===2?'#c070ff':'#ff3a4a';m.fillStyle=col;
    if(e.isB){m.fillRect(e.tx*MT,e.ty*MT,e.w*MT,e.h*MT);m.strokeStyle='#000';m.lineWidth=.6;m.strokeRect(e.tx*MT,e.ty*MT,e.w*MT,e.h*MT);}else m.fillRect(e.x*s-2.5,e.y*s-2.5,e.D.hero?7:5,e.D.hero?7:5);}
  if(hasRadar)for(const b of dballs){if(b.carrier)continue;m.fillStyle='#ffb52a';m.beginPath();m.arc(b.x*s,b.y*s,3.5,0,PI2);m.fill();}
  for(const p of pickups){if(!expl[ti(tileOf(p.x),tileOf(p.y))]&&!hasRadar)continue;m.fillStyle=PICK[p.type].col;m.beginPath();m.arc(p.x*s,p.y*s,4,0,PI2);m.fill();m.strokeStyle='#000';m.lineWidth=1;m.stroke();}
  for(const z of zones){m.strokeStyle='#ffd23a';m.lineWidth=2;m.beginPath();m.arc(z.x*s,z.y*s,z.r*s,0,PI2);m.stroke();}
  for(const p of G.pings){m.strokeStyle='#ff4d5e';m.lineWidth=2;m.beginPath();m.arc(p.x*s,p.y*s,4+(p.t%1)*10,0,PI2);m.stroke();}
  m.strokeStyle='#ffffff';m.lineWidth=2;m.strokeRect(cam.x*s,cam.y*s,cam.vw()*s,cam.vh()*s);}

// ===== Game flow =====
function newGame(fac,diff,seed){seed=seed||((Math.random()*1e6)|0);const ST=G.setup||{};const mapId=MAPS[ST.map]?ST.map:'vallee',fmt=(ST.mode==='2v2'||ST.mode==='3v3')&&fmtFits(mapId,ST.mode)?ST.mode:'1v1',duo=fmt!=='1v1';setMap(mapId,fmt);mapBuffers();
  ents=[];projs=[];parts=[];fxs=[];sel=[];groups={};gtime=0;nextId=1;timers=[];mode=null;vis.fill(0);expl.fill(0);
  Object.assign(G,{state:'play',diff,shake:0,slow:0,msgs:[],cut:null,lastAlert:-99,alertPos:null,pings:[],clicks:[],over:false,paused:false,selSig:'',fogT:0,aiT:0,winT:0});
  genMap(seed);applySpawn(ST);renderTerrain(seed);placeDragonBalls();initAmbience();corpses=[];Object.assign(G,{dbRespawn:0,dbT:0,shenron:null,wishPending:false});$('#wish').hidden=true;
  const ALLF=['dbz','mha','aot','sl','opm','hxh','sds'];const efac=G.opp&&(G.opp!==fac||G.mirror)?G.opp:pick(ALLF.filter(f=>f!==fac));sides=[mkSide(fac,false),mkSide(efac,true),mkSide('neu',true)];
  for(const s of PSIDES)if(s>=3)sides[s]=mkSide(ST['f'+s]||pick(ALLF.filter(f=>f!==(s===3||s===5?fac:efac))),true);
  initEvents();const dOf=si=>ally(si,0)?DIFF[ST.adiff==null?1:ST.adiff]:DIFF[diff];for(const si of PSIDES){if(ST.cash)sides[si].credits=ST.cash;if(si!==0){const d=dOf(si);sides[si].mult=d.mult;sides[si].dmgM=d.dmg;sides[si].hpM=d.hp;}}PL=0;
  G.ai=PSIDES.filter(si=>si!==0).map(si=>aiInit(si,dOf(si)));if(G.auto)G.ai.push(aiInit(0,DIFF[1]));
  const C=MW/2;for(const si of PSIDES){const B=BASES[si];const hq=mkBuilding(si,'hq',B.x-1,B.y-1,true);hq.seen=ally(si,PL);
    const dx=Math.sign(C-B.x)||1,dy=Math.sign(C-B.y)||-1;['inf1','inf1','inf2','inf2'].forEach((k,j)=>{const u=mkUnit(si,k,hq.x+dx*(40+j*20),hq.y+dy*(50+(j%2)*20));u.gx=u.x;u.gy=u.y;});}
  resize();cam.z=1;const hq=myB(PL,'hq')[0];centerOn(hq.x+Math.sign(C*TILE-hq.x)*160,hq.y+Math.sign(C*TILE-hq.y)*60);updFog();uiNewGame(fac);
  feedPush('Suis les objectifs en haut à gauche : commence par un '+BDEF.power.names[fac]+' (touche W).',FAC[fac].col);
  if(duo){const al=PSIDES.filter(s=>s!==0&&TEAM[s]===TEAM[0]);feedPush((fmt==='3v3'?'3 contre 3':'2 contre 2')+' : '+(al.length>1?'tes alliés sont ':'ton allié est ')+al.map(s=>FAC[sides[s].fac].name).join(' et ')+' (en bleu sur la carte). Vous gagnez ensemble !','#5aa8ff');}setTimeout(()=>announce('Déploiement terminé. Que la bataille commence.'),600);}
function update(dt){gtime+=dt;
  for(let i=timers.length-1;i>=0;i--){timers[i].t-=dt;if(timers[i].t<=0){const f=timers[i].fn;timers.splice(i,1);f();}}
  for(const si of PSIDES)updProd(si,dt);
  for(const e of ents){if(e.dead)continue;if(e.isU)updUnit(e,dt);else updBuilding(e,dt);}
  separate();for(const p of projs)updProj(p,dt);projs=projs.filter(p=>!p.dead);updSpecial(dt);updParts(dt);updDragonBalls(dt);updAmbience(dt);updEvents(dt);selfRepair(dt);updFusion(dt);
  ents=ents.filter(e=>!e.dead);if(sel.some(e=>e.dead))setSel(sel.filter(e=>!e.dead));
  G.fogT-=dt;if(G.fogT<=0){G.fogT=.2;updFog();}
  for(const ai of G.ai)aiUpdate(ai,dt);
  G.winT-=dt;if(G.winT<=0){G.winT=1;checkWin();}}
function checkWin(){if(G.over)return;const pb=ents.some(e=>e.isB&&isPl(e.side)&&TEAM[e.side]===TEAM[PL]),eb=ents.some(e=>e.isB&&isPl(e.side)&&TEAM[e.side]!==TEAM[PL]);
  if(!pb||!eb){G.over=true;const win=eb?false:true;setTimeoutG(()=>endGame(win),2.2);msg(win?'La base ennemie est rasée !':'Notre base est tombée…',win?'#ffc53d':'#ff4d5e');}}
function endGame(win){G.state='end';const s=sides[PL],t=Math.floor(gtime);$('#endt').textContent=win?'Victoire !':'Défaite…';$('#endt').style.color=win?'#ffc53d':'#ff4d5e';
  $('#ends').innerHTML=`<span>Durée</span><span>${Math.floor(t/60)} min ${String(t%60).padStart(2,'0')} s</span><span>Unités et bâtiments produits</span><span>${s.st.built}</span><span>Ennemis détruits</span><span>${s.st.kills}</span><span>Pertes</span><span>${s.st.lost}</span><span>${FAC[s.fac].money} récoltés</span><span>${Math.round(s.st.harv)}</span><span>Vœux exaucés par Shenron</span><span>${s.wishes}</span>`;
  $('#end').hidden=false;stopMusic();sfx(win?'win':'lose');announce(win?'Victoire !':'Défaite...');}
let last=performance.now(),uiT=0,miniT=0;
function frame(ts){const rdt=Math.min(.05,(ts-last)/1000);last=ts;
  if(G.state==='play'){
    if(G.shenron){G.shenron.t+=rdt;if(G.shenron.t>G.shenron.dur)G.shenron=null;}
    if(!G.paused){let dt=rdt*(G.speed||1);if(G.slow>0){G.slow-=rdt;dt*=.35;}update(dt);}
    const sp=720/cam.z*rdt;let mx=0,my=0;if(keys.ArrowLeft)mx-=1;if(keys.ArrowRight)mx+=1;if(keys.ArrowUp)my-=1;if(keys.ArrowDown)my+=1;
    if(mouse.in&&!mouse.touch&&!mouse.down&&!miniDrag&&document.hasFocus()){const ew=14;if(mouse.x<ew)mx-=1;if(mouse.x>cv.clientWidth-ew)mx+=1;if(mouse.y<ew)my-=1;if(mouse.y>cv.clientHeight-ew)my+=1;}
    if(mx||my){cam.x+=mx*sp;cam.y+=my*sp;clampCam();}toWorld();
    G.shake*=Math.pow(.02,rdt);if(G.shake<.3)G.shake=0;for(const m of G.msgs)m.t-=rdt;G.msgs=G.msgs.filter(m=>m.t>0);
    for(const p of G.pings)p.t-=rdt;G.pings=G.pings.filter(p=>p.t>0);for(const c of G.clicks)c.t-=rdt;G.clicks=G.clicks.filter(c=>c.t>0);
    if(G.cut){G.cut.t+=rdt;if(G.cut.t>G.cut.dur)G.cut=null;}
    hoverEnt=mouse.in?pickAt(mouse.wx,mouse.wy):null;
    let cur='default';if(mode)cur='crosshair';else if(hoverEnt&&foe(hoverEnt.side,PL)&&mySel().some(u=>u.isU&&u.D.dmg))cur='crosshair';else if(hoverEnt)cur='pointer';cv.style.cursor=cur;
    render();uiT-=rdt;if(uiT<=0){uiT=.15;refreshUI();}miniT-=rdt;if(miniT<=0){miniT=.2;drawMini();}}
  requestAnimationFrame(frame);}

resize();requestAnimationFrame(frame);
window.__game={newGame,update,G,get ents(){return ents;},get sides(){return sides;},render,cam};
