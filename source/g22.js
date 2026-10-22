// ===== Second ability (key E) for the strongest heroes =====
Object.assign(ABDESC,{blink:'Téléportation instantanée',surge:'Brève montée de puissance',thunder:'Charge foudroyante qui étourdit',slot:'Arme tirée au hasard',summon:'Invoque des alliés temporaires',pull:'Attire les ennemis vers lui',king:'Paralyse de peur les ennemis proches',crush:'Écrase une zone et étourdit',snipe:'Tir unique dévastateur',feathers:'Pluie de projectiles sur une zone',rally:'Galvanise les alliés proches',harden:'Quasi invulnérable, attire les coups',rage:'Fureur : dégâts et vitesse en hausse',lift:'Soulève les ennemis puis les écrase'});
const AB2={
 dbz:{goku:{name:'Instant Transmission',type:'blink',cd:24,range:440,shout:'TRANSMISSION INSTANTANÉE !',col:'#ffe14d'},
  vegeta:{name:'Final Flash',type:'beam',cd:38,dmg:340,range:300,len:420,w:34,shout:'FINAL FLASH !!',col:'#ffe95a'},
  beerus:{name:'Sphère de destruction',type:'blast',cd:28,dmg:380,range:290,rad:90,shout:'DÉTRUIS.',col:'#b04aff'}},
 mha:{allmight:{name:'Detroit Smash',type:'cone',cd:26,dmg:300,range:70,len:200,ang:.5,knock:380,shout:'DETROIT SMASH !',col:'#ffd23a'},
  deku:{name:'Shoot Style',type:'dash_blast',cd:22,dmg:220,range:220,rad:60,knock:180,shout:'SHOOT STYLE !',col:'#7dff9a'},
  endeavor:{name:'Hell Flame',type:'cone',cd:24,dmg:260,range:60,len:180,ang:.6,knock:0,shout:'HELL FLAME !',col:'#ff7a2a'}},
 aot:{eren:{name:'Tatakae !',type:'surge',cd:40,dur:7,range:0,shout:'TATAKAE !',col:'#ffcf8a'},
  levi:{name:'Esquive Ackerman',type:'blink',cd:18,range:300,shout:'TCH.',col:'#d8f0ff'}},
 sl:{jinwoo:{name:'Échange d’ombre',type:'blink',cd:28,range:520,shout:'ÉCHANGE D’OMBRE.',col:'#8a6aff'},
  bellion:{name:'Cri du Grand Maréchal',type:'rally',cd:32,dur:10,rad:280,shout:'POUR LE ROI !',col:'#b06aff'}},
 sds:{meliodas:{name:'Hellblaze',type:'cone',cd:22,dmg:340,range:60,len:200,ang:.6,knock:200,shout:'HELLBLAZE !',col:'#3a1a4a'},merlin:{name:'Téléportation',type:'blink',cd:16,range:380,shout:'…',col:'#b06aff'},diane:{name:'Double Hammer',type:'dash_blast',cd:24,dmg:300,range:300,rad:90,knock:260,shout:'DOUBLE HAMMER !',col:'#c8a040'}},
 opm:{saitama:{name:'Saut de Saitama',type:'dash_blast',cd:30,dmg:170,range:500,rad:70,knock:300,shout:'HOP.',col:'#ffd23a'},
  tatsumaki:{name:'Barrière psychique',type:'barrier',cd:35,rad:200,dur:6,shield:300,range:0,shout:'NE BOUGEZ PAS !',col:'#5aff8a'},
  genos:{name:'Machine Gun Blow',type:'cone',cd:20,dmg:260,range:60,len:130,ang:.5,knock:150,shout:'MACHINE GUN BLOW !',col:'#ff8a2a'}},
 hxh:{gon:{name:'Jajanken : Pierre',type:'dash_blast',cd:20,dmg:300,range:200,rad:60,knock:220,shout:'JAJANKEN… PIERRE !',col:'#5affd8'},
  killua:{name:'Narukami',type:'crush',cd:24,dmg:240,range:300,rad:70,stun:1.2,shout:'NARUKAMI !',col:'#9ad8ff'},
  kurapika:{name:'Chaîne du jugement',type:'bind',cd:26,range:300,rad:60,dur:3,shout:'CHAÎNE DU JUGEMENT !',col:'#e3c13b'},
  netero:{name:'Main du Bodhisattva',type:'crush',cd:20,dmg:300,range:280,rad:90,stun:1,shout:'…',col:'#ffd23a'}}};
for(const f in AB2)for(const k in AB2[f])if(UDEF[f]&&UDEF[f][k])UDEF[f][k].ab2=AB2[f][k];
const SELF2=['rage','shift','harden','rally','rewind','barrier','erase','surge','king','summon'];
const canCast2=u=>!!(u&&u.D.ab2&&!(u.abCd2>0)&&!u.casting&&!u.dash&&u.freeze<=0&&!u.dead&&!u.form&&!(u.lift>0)&&!(u.erased>0));
function orderAbility2(u,x,y){if(!canCast2(u))return false;
  if(NET.client&&!NET.applying){NET.cmd({c:'ab2',u:u.id,x:NQ(x),y:NQ(y)});u.abCd2=Math.max(u.abCd2||0,.6);return true;}
  if(SELF2.includes(u.D.ab2.type)){startCast(u,{x:u.x,y:u.y,slot:2});return true;}u.order={type:'ability',x,y,slot:2};u.target=null;u.path=null;u.repT=0;return true;}
function triggerAbility2(u){const hs=u?[u]:mySel().filter(s=>s.isU&&canCast2(s));if(!hs.length){if(!u&&mySel().some(s=>s.isU&&s.D.ab2))msg('2e capacité en recharge');return;}
  const h=hs[0];if(SELF2.includes(h.D.ab2.type)){orderAbility2(h,h.x,h.y);return;}mode={type:'ability',u:h,slot:2};}
{const _sc=startCast;startCast=function(u,o){if(!o||o.slot!==2||!u.D.ab2)return _sc(u,o);const ab=u.D.ab2,T=ab.type==='beam'?1.1:.5;
  u.casting={t:T,T,x:o.x,y:o.y,slot:2};u.abCd2=ab.cd;u.path=null;u.moving=false;faceTo(u,o.x,o.y);if(plSees(u))cutin(u,ab.shout);sfx(ab.type==='beam'?'charge':'charge-s',u.x,u.y);};}
{const _ex=execAbility;execAbility=function(u,c){if(!c||c.slot!==2||!u.D.ab2)return _ex(u,c);const D0=u.D;u.D=Object.assign({},D0,{ab:D0.ab2});try{_ex(u,c);}finally{u.D=D0;}if(u.dash)u.dash.ab=D0.ab2;};}
{const _e3=execAbility3;execAbility3=function(u,c,ab,dx,dy,L){
  if(ab.type==='blink'){let tx=c.x,ty=c.y;if(L>ab.range){tx=u.x+dx*ab.range;ty=u.y+dy*ab.range;}if(!u.fly&&blockedW(tx,ty)){const n=nearestFree(tileOf(tx),tileOf(ty),6);if(!n){u.abCd2=2;return true;}tx=n[0]*TILE+16;ty=n[1]*TILE+16;}
    for(const[x,y]of[[u.x,u.y],[tx,ty]]){fxRing(x,y,ab.col,40);part('flash',x,y-16,0,0,.3,50,ab.col);for(let k=0;k<10;k++)part('spark',x,y-14,rr(-80,80),rr(-90,10),.4,2,ab.col);}
    u.x=tx;u.y=ty;u.gx=tx;u.gy=ty;u.path=null;u.order=null;u.kx=u.ky=0;sfx('whoosh',tx,ty);return true;}
  if(ab.type==='surge'){u.buff=Math.max(u.buff||0,ab.dur);fxRing(u.x,u.y,ab.col,60);part('flash',u.x,u.y-14,0,0,.3,60,ab.col);sfx('transform',u.x,u.y);return true;}
  return _e3(u,c,ab,dx,dy,L);};}
{const _p2=updPassives2;updPassives2=function(u,dt){_p2(u,dt);if(u.abCd2>0)u.abCd2-=dt;};}
{const _rc=runCmd;runCmd=function(c){if(c&&c.c==='ab2'){const u=ents.find(e=>e.id===c.u&&!e.dead&&e.side===NET.gs);if(u&&u.isU)orderAbility2(u,+c.x||0,+c.y||0);return;}_rc(c);};}
NDEC.add('abCd2');
// AI uses the second ability too
let ai2T=0;
{const _uf=updFusion;updFusion=function(dt){_uf(dt);if(NET.client)return;ai2T-=dt;if(ai2T>0)return;ai2T=.5;
  for(const ai of G.ai)for(const u of ents){if(u.dead||u.side!==ai.si||!canCast2(u))continue;const ab=u.D.ab2;let n=0;for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&hyp(e.x-u.x,e.y-u.y)<220)n++;
    if(ab.type==='blink'){if(u.hp<u.max*.3&&n>0){const h=myB(u.side,'hq')[0];if(h)orderAbility2(u,h.x,h.y+60);}continue;}
    if(SELF2.includes(ab.type)){if(n>=3)orderAbility2(u,u.x,u.y);continue;}
    const reach=ab.type==='beam'?ab.len*.85:ab.type==='cone'?ab.len*.7:ab.range+60,rad=ab.rad||(ab.w?ab.w*.9:80);let best=null,bn=0;
    for(const e of ents){if(e.dead||ally(e.side,u.side))continue;if(hyp(e.x-u.x,e.y-u.y)>reach)continue;let k=e.isB?2:e.D.hero?2:1;for(const f of ents)if(f!==e&&!f.dead&&f.isU&&!ally(f.side,u.side)&&hyp(f.x-e.x,f.y-e.y)<rad)k++;if(k>bn){bn=k;best=e;}}
    if(best&&bn>=3)orderAbility2(u,best.x,best.y);}};}
// ---- UI: second button in the selection panel, key E ----
{const _ab=abilBtn;abilBtn=function(u){let h=_ab(u);const a=u.D.ab2;if(a)h+=`<button type="button" class="abil abil2" data-ab2="${u.id}" style="--ac:${a.col}"><span class="ico"></span><span><b>${a.name}</b><small>${ABDESC[a.type]||''}</small></span><span class="key">E</span><span class="cdv"></span></button>`;return h;};}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-ab2]');if(!b||G.state!=='play')return;const u=ents.find(x=>x.id==b.dataset.ab2&&!x.dead&&x.side===PL);if(u)triggerAbility2(u);});
window.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||e.key.toLowerCase()!=='e'||G.paused)return;triggerAbility2();});
{const _ru=refreshUI;refreshUI=function(){_ru();for(const b of document.querySelectorAll('.abil2')){const h=ents.find(x=>x.id==b.dataset.ab2);if(!h)continue;b.classList.toggle('cool',!canCast2(h));const v=b.querySelector('.cdv');if(v)v.textContent=h.abCd2>0?Math.ceil(h.abCd2)+' s':'…';}};}
