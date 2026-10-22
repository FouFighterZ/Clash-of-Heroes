// ===== Teleporters appear during the game and stay: random ones send units to a random free spot, linked pairs send them to each other =====
let tports=[],tpT=0,tpN=0;
{const _ie=initEvents;initEvents=function(){_ie();tports=[];tpT=rr(120,200);tpN=0;};}
function tpFree(x,y,minB){const tx=tileOf(x),ty=tileOf(y);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=tx+dx,Y=ty+dy;if(X<0||Y<0||X>=MW||Y>=MH)return false;const i=Y*MW+X;if(blocked[i]||ter[i]===T_WATER||ter[i]===T_FOREST||(bridgeT&&bridgeT[i])||ore[i]>0)return false;}
  return !ents.some(b=>b.isB&&!b.dead&&hyp(b.x-x,b.y-y)<minB*TILE)&&!tports.some(t=>hyp(t.x-x,t.y-y)<6*TILE);}
function tpSpot(minB){for(let k=0;k<300;k++){const x=(3+R()*(MW-6))*TILE,y=(3+R()*(MH-6))*TILE;const X=tileOf(x)*TILE+16,Y=tileOf(y)*TILE+16;if(tpFree(X,Y,minB))return{x:X,y:Y};}return null;}
function addTeleporter(){const pair=tports.filter(t=>t.pair).length<4&&(tpN%2===1||tports.filter(t=>!t.pair).length>=2);let made=null;
  if(pair){const a=tpSpot(9);if(!a)return;let b=null;for(let k=0;k<20&&!b;k++){const c=tpSpot(9);if(c&&hyp(c.x-a.x,c.y-a.y)>MW*TILE*.35)b=c;}if(!b)return;const id=++tpN,col=pick(['#4ad8ff','#7dff9a','#ffb04a']);
    tports.push({id,x:a.x,y:a.y,pair:id+1000,col},{id:id+1000,x:b.x,y:b.y,pair:id,col});made={name:'Téléporteurs reliés',col,desc:'Deux téléporteurs identiques sont apparus et restent jusqu’à la fin : toute unité qui marche sur l’un ressort par l’autre.',at:a};}
  else{const a=tpSpot(9);if(!a)return;tports.push({id:++tpN,x:a.x,y:a.y,col:'#c87aff'});made={name:'Téléporteur instable',col:'#c87aff',desc:'Un téléporteur est apparu et reste jusqu’à la fin : toute unité qui marche dessus est envoyée au hasard sur la carte (jamais dans l’eau, les arbres ou près d’un bâtiment).',at:a};}
  G.pings.push({x:made.at.x,y:made.at.y,t:4});msg(made.name+' : '+made.desc,made.col);sfx('event');try{evCard(made);}catch(_){}}
function tpUse(u,t){let d=null;if(t.pair){const o=tports.find(x=>x.id===t.pair);if(o){const a=R()*PI2;d={x:o.x+Math.cos(a)*30,y:o.y+Math.sin(a)*22};if(!u.fly&&bw(u,d.x,d.y))d={x:o.x,y:o.y+30};}}
  else d=tpSpot(7);if(!d)return;part('flash',u.x,u.y-14,0,0,.35,60,t.col);u.x=d.x;u.y=d.y;u.gx=d.x;u.gy=d.y;u.path=null;u.order=null;u.target=null;u.moving=false;u.tpCd=gtime+4;
  part('flash',u.x,u.y-14,0,0,.35,60,t.col);fxRing(u.x,u.y,t.col,30);if(u.side===PL&&sel.includes(u))centerOn(u.x,u.y);}
function updTports(dt){if(NET.client||G.state!=='play')return;tpT-=dt;if(tpT<=0){tpT=rr(240,360);if(tports.length<6)addTeleporter();}
  for(const t of tports)for(const u of ents){if(!u.isU||u.dead||u.D.hawk||u.D.mcv&&false||u.fly||(u.tpCd||0)>gtime)continue;if(Math.abs(u.x-t.x)<20&&Math.abs(u.y-t.y)<16&&hyp(u.x-t.x,(u.y-t.y)*1.3)<18)tpUse(u,t);}}
{const _uf=updFusion;updFusion=function(dt){_uf(dt);updTports(dt);};}
{const _dz=drawZones;drawZones=function(c){_dz(c);for(const t of tports){const a=gtime*(t.pair?2.2:-3);c.save();c.translate(t.x,t.y);
  c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(0,2,22,10,0,0,PI2);c.fill();c.fillStyle='#2a2e3a';c.beginPath();c.ellipse(0,0,20,9,0,0,PI2);c.fill();c.strokeStyle='#8a929c';c.lineWidth=2;c.stroke();
  c.globalCompositeOperation='lighter';drawGlow(c,0,-2,22,t.col,.55);c.strokeStyle=t.col;c.lineWidth=2;for(let k=0;k<3;k++){c.beginPath();c.ellipse(0,-k*5,15-k*3,6.5-k*1.3,0,a+k,a+k+PI*1.3);c.stroke();}
  for(let k=0;k<4;k++){const h=((gtime*30+k*12)%40);c.fillStyle=t.col;c.globalAlpha=1-h/40;c.fillRect(-10+k*6,-h,2,4);}c.globalAlpha=1;c.globalCompositeOperation='source-over';c.restore();
  if(t.pair){const o=tports.find(x=>x.id===t.pair);if(o&&t.id<o.id)txt(c,'⇄',t.x,t.y-26,14,t.col,true);else txt(c,'⇄',t.x,t.y-26,14,t.col,true);}else txt(c,'?',t.x,t.y-26,14,t.col,true);}};}
// minimap marks
{const _dm=drawMini;drawMini=function(){_dm();const m=mctx,s=mini.width/WW;for(const t of tports){if(!expl[ti(tileOf(t.x),tileOf(t.y))])continue;m.fillStyle=t.col;m.beginPath();m.arc(t.x*s,t.y*s,2.6,0,PI2);m.fill();}};}
