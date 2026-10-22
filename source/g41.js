// ===== Seven Deadly Sins: the Boar Hat headquarters is Hawk Mama, who can get up, walk and settle down elsewhere =====
const HAWK_CD=60;
UDEF.sds.hawk={key:'hawk',fac:'sds',name:'Hawk Mama (en marche)',cost:0,time:1,hp:BDEF.hq.hp,speed:38,size:24,sight:9,sightPx:9*TILE,veh:true,hawk:true,trans:6,rof:1,at:'none',req:['__never'],
  desc:'Le Boar Hat sur le dos de Hawk Mama. En marche, aucune construction n’est possible ; « Se poser » (touche D) pour redevenir le quartier général, puis il faut attendre 1 minute avant de repartir.'};
function hawkSpot(u){const tx=tileOf(u.x)-1,ty=tileOf(u.y)-1;for(let r=0;r<=4;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;const x=tx+dx,y=ty+dy;
  if(x<1||y<1||x+3>MW-1||y+3>MH-1)continue;let ok=true;for(let yy=y;yy<y+3&&ok;yy++)for(let xx=x;xx<x+3;xx++){const i=ti(xx,yy);if(blocked[i]||ore[i]>0){ok=false;break;}}if(!ok)continue;
  const x0=x*TILE,y0=y*TILE;if(ents.some(e=>e!==u&&e.isU&&!e.dead&&!e.fly&&e.x>x0-e.r&&e.x<x0+96+e.r&&e.y>y0-e.r&&e.y<y0+96+e.r))continue;return[x,y];}return null;}
const hawkWait=b=>Math.max(0,HAWK_CD-(gtime-(b.landT??-1e9)));
function hawkLift(b){if(!b||b.dead||b.key!=='hq'||b.fac!=='sds'||b.rise<1||b.upg)return false;if(hawkWait(b)>0){if(b.side===PL){feedPush('Hawk Mama se repose encore '+Math.ceil(hawkWait(b))+' s','#ffc53d');sfx('err');}return false;}
  if(NET.client&&!NET.applying){NET.cmd({c:'hlift',b:b.id});return true;}
  const si=b.side,f=b.hp/b.max,lvl=b.lvl||1,wasSel=sel.includes(b);removeBuilding(b);ents=ents.filter(e=>e!==b);sel=sel.filter(e=>e!==b);
  const u=mkUnit(si,'hawk',b.x,b.y+10);u.cargo=b.cargo||[];b.cargo=[];u.max=Math.round(b.max);u.hp=Math.max(1,u.max*f);u.hlvl=lvl;u.gx=u.x;u.gy=u.y;for(let k=0;k<14;k++)part('dust',u.x+rr(-40,40),u.y+rr(-10,20),rr(-40,40),rr(-30,0),1.2,rr(8,14));
  if(wasSel)setSel([u]);if(si===PL){msg('Hawk Mama se lève ! Plus de nouvelle construction tant qu’elle marche.','#ff9ab0');sfx('place');}return true;}
function hawkLand(u){if(!u||u.dead||!u.D.hawk)return false;if(NET.client&&!NET.applying){NET.cmd({c:'hland',u:u.id});return true;}const p=hawkSpot(u);
  if(!p){if(u.side===PL){feedPush('Pas assez de place pour se poser ici (3 × 3 cases libres)','#ff4d5e');sfx('err');}return false;}
  const si=u.side,wasSel=sel.includes(u);u.dead=true;ents=ents.filter(e=>e!==u);sel=sel.filter(e=>e!==u);const b=mkBuilding(si,'hq',p[0],p[1],true);b.rise=1;b.lvl=u.hlvl||1;
  if(b.lvl>=2){b.max=Math.round(BDEF.hq.hp*1.5);}b.hp=Math.max(1,b.max*(u.hp/u.max));b.landT=gtime;b.cargo=u.cargo||[];u.cargo=[];recalcPower(si);for(let k=0;k<20;k++)part('dust',b.x+rr(-40,40),b.y+rr(-20,20),rr(-40,40),rr(-30,0),1.2,rr(8,14));shake(4);
  if(wasSel)setSel([b]);if(si===PL){msg('Hawk Mama se pose : le Boar Hat est de nouveau ton quartier général. Elle pourra repartir dans 1 minute.','#ff9ab0');sfx('place');}return true;}
{const _rc=runCmd;runCmd=function(c){const SI=NET.gs;if(c&&c.c==='hlift'){const b=ents.find(e=>e.id===c.b&&!e.dead&&e.side===SI);if(b)hawkLift(b);return;}
  if(c&&c.c==='hland'){const u=ents.find(e=>e.id===c.u&&!e.dead&&e.side===SI);if(u)hawkLand(u);return;}_rc(c);};}
// she still counts as the base: no defeat while she walks
{const _cw=checkWin;checkWin=function(){if(G.over)return;const alive=t=>ents.some(e=>!e.dead&&isPl(e.side)&&(e.isB||e.D&&(e.D.hawk||e.D.mcv))&&(t?TEAM[e.side]===TEAM[PL]:TEAM[e.side]!==TEAM[PL]));
  if(alive(true)&&alive(false))return;_cw();};}
{const _ib=typeof isBeaten==='function'?isBeaten:null;}
// buttons: lift on the HQ, land on the walking pig; key D also lands
{const _xh=xupgHTML;xupgHTML=function(e){let h=_xh(e);if(e.isB&&e.key==='hq'&&e.fac==='sds'&&e.side===PL&&e.rise>=1){const w=hawkWait(e);
  h+='<button type="button" class="bupb '+(w>0||e.upg?'off':'')+'" data-hlift="'+e.id+'"><span>🐖 '+(w>0?'Hawk Mama se repose… '+Math.ceil(w)+' s':'Se déplacer (Hawk Mama se lève)')+'</span></button>';}return h;};}
document.addEventListener('click',ev=>{if(G.state!=='play')return;const t=ev.target.closest&&ev.target.closest('[data-hlift],[data-hland]');if(!t)return;
  if(t.dataset.hlift){const b=ents.find(x=>x.id==t.dataset.hlift);if(b)hawkLift(b);}else{const u=ents.find(x=>x.id==t.dataset.hland);if(u)hawkLand(u);}refreshUI();});
{const _ru=refreshUI;refreshUI=function(){_ru();const p=$('#selp');if(!p)return;const u=sel.find(e=>!e.dead&&e.isU&&e.side===PL&&e.D.hawk);let bx=p.querySelector('#xhland');const acts=p.querySelector('.acts');
  if(!u||!acts){if(bx)bx.remove();return;}if(!bx){bx=document.createElement('button');bx.type='button';bx.id='xhland';bx.className='abil';bx.style.setProperty('--ac','#ff9ab0');
    bx.innerHTML='<span class="ico"></span><span><b>Se poser (touche D)</b><small>Redevient le quartier général (3 × 3 cases libres)</small></span>';}bx.dataset.hland=u.id;if(bx.parentNode!==acts)acts.prepend(bx);};}
window.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||G.paused)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;
  if(e.key.toLowerCase()==='d'){for(const u of mySel().filter(u=>u.isU&&u.D.hawk))hawkLand(u);refreshUI();}});
// walking pig drawing
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){if(u.key!=='hawk')return _dv(c,u,x,y,ghost);const f=u.face||1;c.save();c.translate(x,0);c.scale(f,1);c.translate(-x,0);
  drawBoarHat(c,{x,y:y-14+(u.moving?Math.abs(Math.sin(u.anim*6))*-3:0),anim:u.anim,rise:1,tx:0,ty:0,w:3,h:3},false);c.restore();};}
// icons pass only tile coordinates: derive the centre
{const _db=drawBoarHat;drawBoarHat=function(c,b,ghost){if(!isFinite(b.x)||!isFinite(b.y))b=Object.assign({},b,{x:(b.tx||0)*TILE+(b.w||3)*TILE/2,y:(b.ty||0)*TILE+(b.h||3)*TILE/2});return _db(c,b,ghost);};}
