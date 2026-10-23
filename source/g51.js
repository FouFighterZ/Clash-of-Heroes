// ===== Stronger defenses for every faction; Attack on Titan walls are far tougher (and drawn taller) =====
{const T=BDEF.turret;T.hp=1800;T.wpn.dmg=55;T.wpn.range=270;}
{const D=BDEF.def2;D.hp=3600;D.wpn.dmg=140;D.wpn.range=320;}
BDEF.outpost&&(BDEF.outpost.hp=1100);BDEF.shieldgen&&(BDEF.shieldgen.hp=1600);BDEF.wall.hp=2200;
const AOT_WALL=3.5;
{const _mb=mkBuilding;mkBuilding=function(side,key,tx,ty,instant){const b=_mb(side,key,tx,ty,instant);if(b&&key==='wall'&&b.fac==='aot'){const f=b.hp/b.max;b.max=Math.round(b.max*AOT_WALL);b.hp=b.max*f;}return b;};}
if(BH_EXTRA.wall)BH_EXTRA.wall.aot=70;else{try{const _bh=bH;bH=function(b){return b.key==='wall'&&b.fac==='aot'?70:_bh(b);};}catch(_){}}
BDEF.wall.descs=Object.assign(BDEF.wall.descs||{},{aot:'Les Murs de l’humanité : trois fois et demie plus résistants que les murs des autres factions, et bien plus hauts.'});
// ===== Attack on Titan ultimate: Zeke's scream turns up to 6 soldiers into Titans for good =====
UDEF.aot.ytitan=Object.assign({},UDEF.neu.wtitan,{key:'ytitan',fac:'aot',name:'Titan pur (soldat transformé)',cost:0,hp:2600,dmg:70,speed:46,splash:30,bounty:0,at:'none',req:['__never'],sight:9,sightPx:9*TILE,
  desc:'Un soldat transformé par le cri de Zeke : un Titan pur qui reste dans cette forme jusqu’à sa mort et écrase tout autour de lui.'});
Object.assign(SUPER.aot,{name:'Le Cri de Zeke',shout:'HURLEMENT DU TITAN BESTIAL !!',look:'zeke',who:'Zeke Jäger',rad:220,
  desc:'Zeke pousse un hurlement : jusqu’à 6 de tes soldats (les plus proches de la zone visée) se transforment en Titans purs, et le restent jusqu’à leur mort.'});
if(typeof ULT_DESC!=='undefined')ULT_DESC.aot=SUPER.aot.desc;
const SCREAM_N=6;
function screamTargets(si,x,y){return ents.filter(e=>e.isU&&!e.dead&&e.side===si&&!e.D.hero&&!e.D.veh&&!e.D.harv&&!e.form&&e.key!=='ytitan'&&!e.D.heal)
  .sort((a,b)=>hyp(a.x-x,a.y-y)-hyp(b.x-x,b.y-y)).slice(0,SCREAM_N);}
{const _ls=launchSuper;launchSuper=function(si,x,y){const s=sides[si];if(!s||s.fac!=='aot')return _ls(si,x,y);const L=screamTargets(si,x,y);
  if(!L.length){if(si===PL){feedPush('Aucun soldat à transformer : il faut des soldats (pas des héros ni des engins).','#ff4d5e');sfx('err');}return false;}
  const n0=fxs.length,ok=_ls(si,x,y);if(!ok)return ok;for(let i=fxs.length-1;i>=n0;i--)if(fxs[i].type==='rumble')fxs.splice(i,1);
  const hold=(G.cut&&G.cut.ult?2.4:0)+.6;for(const u of L){u.screamed=true;u.stun=Math.max(u.stun||0,hold+.5);}
  setTimeoutG(()=>{let n=0;for(const u of L){if(u.dead||!ents.includes(u))continue;const t=mkUnit(si,'ytitan',u.x,u.y);t.gx=u.x;t.gy=u.y;t.rank=u.rank||0;
    for(const d of dballs)if(d.carrier===u)d.carrier=t;if(sel.includes(u))sel=sel.map(e=>e===u?t:e);u.dead=true;n++;
    part('flash',t.x,t.y-30,0,0,.5,110,'#ffe0a0');fxRing(t.x,t.y,'#ffb07a',60);for(let k=0;k<14;k++)part('smoke',t.x+rr(-20,20),t.y-rr(0,40),rr(-30,30),rr(-60,-20),1.4,rr(8,14),'#e8d8c0');}
    ents=ents.filter(e=>!e.dead||!L.includes(e));shake(10);if(si===PL)msg(n+' soldat'+(n>1?'s':'')+' se transforme'+(n>1?'nt':'')+' en Titans purs !','#ffb07a');},hold);
  G.ultCam={x:L[0].x,y:L[0].y,t:hold};return ok;};}
