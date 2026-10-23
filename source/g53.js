// ===== Solo Leveling never uses mana crystals: no refinery, drill or harvester (money comes only from kills) =====
const SL_NOECO=new Set(['refinery','drill']);
{const _ti=tabItems;tabItems=function(t){const L=_ti(t);if(sides[PL]&&sides[PL].fac==='sl')return L.filter(it=>!(it.isB&&SL_NOECO.has(it.key))&&!(!it.isB&&it.key==='harv'));return L;};}
{const _sb=startBuild;startBuild=function(si,key){if(sides[si]&&sides[si].fac==='sl'&&SL_NOECO.has(key))return false;return _sb(si,key);};}
{const _q=queueUnit;queueUnit=function(si,key){if(sides[si]&&sides[si].fac==='sl'&&key==='harv')return false;return _q(si,key);};}
// the AI build order skips them for this faction
{const _au=aiUpdate;aiUpdate=function(ai,dt){const s=sides[ai.si];if(!s||s.fac!=='sl')return _au(ai,dt);const save=AI_ORDER.slice();for(let i=AI_ORDER.length-1;i>=0;i--)if(SL_NOECO.has(AI_ORDER[i]))AI_ORDER.splice(i,1);
  try{return _au(ai,dt);}finally{AI_ORDER.length=0;AI_ORDER.push(...save);}};}
if(FAC.sl)FAC.sl.desc2='Pas de raffinerie ni de récolte : l’argent ne vient que des ennemis vaincus.';
// the Solo Leveling AI hunts wild monsters and portal guards for money
{const _au=aiUpdate;aiUpdate=function(ai,dt){_au(ai,dt);const si=ai.si,s=sides[si];if(!s||s.fac!=='sl'||NET.client)return;ai.huntT=(ai.huntT||0)-dt;if(ai.huntT>0)return;ai.huntT=6;
  const prey=ents.filter(e=>e.isU&&!e.dead&&(e.wild||e.guard)&&!ally(e.side,si));if(!prey.length)return;
  const idle=ents.filter(u=>u.isU&&!u.dead&&u.side===si&&!u.D.harv&&!u.D.veh&&u.D.dmg&&!u.target&&!(u.order&&(u.order.wave||u.order.type==='amove'&&u.order.hunt))&&!u.mount);
  if(idle.length<2)return;const base=myB(si,'hq')[0]||myB(si)[0];if(!base)return;
  const p=prey.filter(e=>!(e.D.bounty>=1800&&idle.length<6)).sort((a,b)=>hyp(a.x-base.x,a.y-base.y)-hyp(b.x-base.x,b.y-base.y))[0];if(!p)return;
  const grp=idle.sort((a,b)=>hyp(a.x-p.x,a.y-p.y)-hyp(b.x-p.x,b.y-p.y)).slice(0,Math.min(idle.length,8));for(const u of grp){orderMove(u,p.x+rr(-20,20),p.y+rr(-20,20),true);if(u.order)u.order.hunt=true;}};}
