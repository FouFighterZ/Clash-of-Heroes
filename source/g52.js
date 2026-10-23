// ===== Sung Jinwoo rides Tank (the shadow bear) or Kaisel (the shadow wyvern) =====
const isMount=t=>t&&t.isU&&!t.dead&&t.fac==='sl'&&(t.key==='tank'||t.key==='jet');
const riderOf=t=>ents.find(e=>e.isU&&!e.dead&&e.mount===t);
function mountUp(u,t){if(riderOf(t)){if(u.side===PL)feedPush(t.D.name+' porte déjà quelqu’un','#ffc53d');u.mountT=null;return;}u.mount=t;u.mountT=null;u.order=null;u.path=null;u.target=null;u.moving=false;
  if(sel.includes(u))sel=sel.map(e=>e===u?t:e);if(u.side===PL){msg('Sung Jinwoo monte sur '+t.D.name+' !','#8a5aff');sfx('click');}}
function dismount(u){const t=u.mount;if(!t)return;u.mount=null;let x=t.x+18,y=t.y+14;if(bw(u,x,y)){const p=typeof nearestShore==='function'?nearestShore(x,y):null;if(p){x=p.x;y=p.y;}}u.x=x;u.y=y;u.gx=x;u.gy=y;u.z=0;u.order=null;u.path=null;}
{const _uu=updUnit;updUnit=function(u,dt){if(u.mount){const t=u.mount;if(t.dead||!ents.includes(t)){dismount(u);}else{u.x=t.x;u.y=t.y+.5;u.face=t.face||u.face;u.moving=t.moving;u.anim+=dt;u.path=null;u.order=null;u.target=null;if(u.hp<u.max)u.hp=Math.min(u.max,u.hp+(u.D.regen||0)*dt);return;}}
  _uu(u,dt);if(u.mountT&&!u.dead){const t=ents.find(e=>e.id===u.mountT&&!e.dead);if(!isMount(t)||u.order!==u.mountO){u.mountT=null;return;}if(hyp(u.x-t.x,u.y-t.y)<t.r+u.r+16)mountUp(u,t);}};}
// hits on the rider land on the mount
{const _dm=damage;damage=function(t,amt,...a){if(t&&t.mount&&!t.mount.dead)return _dm(t.mount,amt,...a);return _dm(t,amt,...a);};}
// right-click on own Tank / Kaisel with Jinwoo selected
{const _rc=rightCommand;rightCommand=function(wx,wy){const t=pickAt(wx,wy),jw=mySel().find(e=>e.isU&&e.key==='jinwoo'&&!e.mount);
  if(jw&&isMount(t)&&t.side===PL){if(NET.client&&!NET.applying)NET.cmd({c:'mnt',u:jw.id,t:t.id});else{orderMove(jw,t.x,t.y,false);jw.mountT=t.id;jw.mountO=jw.order;}G.clicks.push({x:t.x,y:t.y,t:.6,col:'#8a5aff'});sfx('click');return;}
  _rc(wx,wy);};}
function doDismount(L){for(const e of L){const u=e.mount?e:riderOf(e);if(u&&u.mount){if(NET.client&&!NET.applying)NET.cmd({c:'dmnt',u:u.id});else dismount(u);}}}
{const _rc=runCmd;runCmd=function(c){const SI=NET.gs;if(c&&c.c==='mnt'){const u=ents.find(e=>e.id===c.u&&e.side===SI),t=ents.find(e=>e.id===c.t&&e.side===SI);if(u&&isMount(t)){orderMove(u,t.x,t.y,false);u.mountT=t.id;u.mountO=u.order;}return;}
  if(c&&c.c==='dmnt'){const u=ents.find(e=>e.id===c.u&&e.side===SI);if(u)dismount(u);return;}_rc(c);};}
window.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||G.paused)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'))return;if(e.key.toLowerCase()==='g'){doDismount(mySel());refreshUI();}});
{const _ru=refreshUI;refreshUI=function(){_ru();const p=$('#selp');if(!p)return;const m=sel.find(e=>!e.dead&&e.isU&&e.side===PL&&isMount(e)&&riderOf(e));let bx=p.querySelector('#xdism');const acts=p.querySelector('.acts');
  if(!m||!acts){if(bx)bx.remove();return;}if(!bx){bx=document.createElement('button');bx.type='button';bx.id='xdism';bx.className='abil';bx.style.setProperty('--ac','#8a5aff');
    bx.innerHTML='<span class="ico"></span><span><b>Descendre (touche G)</b><small>Sung Jinwoo descend de sa monture</small></span>';bx.onclick=()=>{doDismount(sel.slice());sfx('click');refreshUI();};}if(bx.parentNode!==acts)acts.prepend(bx);};}
// drawing: the rider is drawn sitting on the mount
{const _du=drawUnitBody;drawUnitBody=function(c,u,x,y,ghost){if(u.mount&&!u._onMount)return;return _du(c,u,x,y,ghost);};}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){_dv(c,u,x,y,ghost);if(!isMount(u))return;const r=riderOf(u);if(!r)return;
  const z0=r.z;r.z=u.key==='jet'?(u.z||16)+12+Math.sin(gtime*3)*2:16;r._onMount=true;try{drawUnitBody(c,r,x-2*(u.face||1),y,ghost);}finally{r._onMount=false;r.z=z0;}};}
// hover/selection: clicking where the rider is selects the mount
{const _pa=pickAt;pickAt=function(wx,wy,any){const e=_pa(wx,wy,any);return e&&e.mount?e.mount:e;};}
for(const k of['tank','jet']){const D=UDEF.sl[k];if(D)D.desc=(D.desc||'')+' Sung Jinwoo peut monter dessus : sélectionne-le puis clic droit sur '+(k==='tank'?'Tank':'Kaisel')+' (touche G pour descendre).';}
// the rider is not pushed apart from his own mount (that pushed Tank across the map)
{const _s=separate;separate=function(){if(!ents.some(e=>e.mount))return _s();const save=ents;ents=ents.filter(e=>!e.mount);try{return _s();}finally{ents=save;}};}
