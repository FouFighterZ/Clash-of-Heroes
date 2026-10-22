// ===== Solo Leveling portals in every game: a random-rank gate opens with monsters guarding it; clear them all for a random reward =====
let sgates=[],sgT=0,sgN=0;
const SG_RANKS=[{r:'E',col:'#9ad8a0',m:[['orc',3]]},{r:'D',col:'#7ad8ff',m:[['orc',5]]},{r:'C',col:'#4ab8ff',m:[['iceelf',4],['orc',2]]},
  {r:'B',col:'#b04aff',m:[['kargalgan',1],['orc',4]]},{r:'A',col:'#ff8a3a',m:[['baruka',1],['iceelf',4]]},{r:'S',col:'#ff4d5e',m:[['kamish',1],['iceelf',3],['orc',2]]}];
const SG_W=[26,24,20,15,10,5];
{const _ie=initEvents;initEvents=function(){_ie();sgates=[];sgT=rr(150,230);sgN=0;};}
function sgPick(){let t=R()*SG_W.reduce((a,b)=>a+b,0);for(let i=0;i<SG_W.length;i++){t-=SG_W[i];if(t<=0)return i;}return 0;}
function openGate(){const p=randSpot(18);if(!p)return;const k=sgPick(),RK=SG_RANKS[k],g={id:++sgN,x:p.x,y:p.y,rank:RK.r,col:RK.col,ids:[],last:-1};
  const f0=sides[2].fac;sides[2].fac='neu';
  for(const[key,n]of RK.m)for(let i=0;i<n;i++){const a=(i/n)*PI2+R(),d=n===1?0:rr(40,80);let x=p.x+Math.cos(a)*d,y=p.y+30+Math.sin(a)*d*.6;
    if(blockedW(x,y)){const q=nearestFree(tileOf(x),tileOf(y),6);if(q){x=q[0]*TILE+16;y=q[1]*TILE+16;}}
    const u=mkUnit(2,key,x,y);u.guard={x,y,g:g.id};u.gx=x;u.gy=y;g.ids.push(u.id);}
  sides[2].fac=f0;sgates.push(g);part('flash',p.x,p.y-30,0,0,.6,160,RK.col);shake(6);G.pings.push({x:p.x,y:p.y,t:4});G.alertPos={x:p.x,y:p.y};
  const ev={name:'Portail de rang '+RK.r,col:RK.col,desc:'Un portail s’est ouvert, gardé par des monstres qui ne bougent pas. Bats-les tous pour une récompense au hasard : 5000 '+(FAC[sides[PL].fac].money||'')+', un héros gratuit ou un véhicule de base mobile.'};
  banner(ev.name.toUpperCase(),ev.col);msg('Portail : '+ev.desc,ev.col);sfx('event');try{evCard(ev);}catch(_){}}
function gateReward(g){const si=g.last;if(!PSIDES.includes(si))return;const s=sides[si],f=s.fac,opts=['cash'];
  const free=FAC[f].heroes.filter(k=>UDEF[f][k]&&!heroBusy(si,k));if(free.length)opts.push('hero');if(UDEF[f].mcv)opts.push('mcv');
  const o=pick(opts),me=si===PL||ally(si,PL);let t;
  if(o==='cash'){s.credits+=5000;t='5000 '+(FAC[f].money||'');}
  else if(o==='hero'){const k=pick(free),u=mkUnit(si,k,g.x,g.y+20);u.gx=u.x;u.gy=u.y;t='le héros '+u.D.name;}
  else{const u=mkUnit(si,'mcv',g.x,g.y+20);u.gx=u.x;u.gy=u.y;t='un véhicule de base mobile ('+u.D.name+')';}
  fxRing(g.x,g.y,'#ffd23a',110);part('flash',g.x,g.y-30,0,0,.6,160,'#ffd23a');
  if(si===PL){banner('PORTAIL NETTOYÉ !','#ffd23a');msg('Portail de rang '+g.rank+' nettoyé ! Récompense : '+t,'#ffd23a');sfx('ready');}
  else msg((me?'Ton allié':'L’adversaire')+' a nettoyé un portail de rang '+g.rank+' et obtient '+t,me?'#4fd17a':'#ff4d5e');}
function updSGates(dt){if(NET.client||G.state!=='play')return;sgT-=dt;if(sgT<=0){sgT=rr(200,300);if(sgates.length<2)openGate();}
  for(const g of sgates){if(g.ids.some(id=>ents.some(e=>e.id===id&&!e.dead)))continue;g.done=true;gateReward(g);}
  sgates=sgates.filter(g=>!g.done);}
{let acc=0;const _uf=updFusion;updFusion=function(dt){_uf(dt);updSGates(dt);};}
// guards stay at their post and only fight what comes close
{const _uu=updUnit;updUnit=function(u,dt){const G_=u.guard;if(G_&&!u.dead){const t=u.target;if(t&&(t.dead||hyp(t.x-G_.x,t.y-G_.y)>190))u.target=null;}
  _uu(u,dt);if(G_&&!u.dead){if(u.target&&hyp(u.target.x-G_.x,u.target.y-G_.y)>190)u.target=null;if(!u.target&&hyp(u.x-G_.x,u.y-G_.y)>40&&!(u.order&&u.order.type==='move'))orderMove(u,G_.x,G_.y,false);}};}
{const _k=kill;kill=function(t,srcSide,src){const was=!t.dead;_k(t,srcSide,src);if(was&&t.dead&&t.guard){const g=sgates.find(x=>x.id===t.guard.g);if(g&&srcSide!=null)g.last=srcSide;}};}
{const _dz=drawZones;drawZones=function(c){_dz(c);for(const g of sgates){portal3(c,g.x,g.y,24,26,34,gtime,g.col);
  const n=g.ids.filter(id=>ents.some(e=>e.id===id&&!e.dead)).length;txt(c,'PORTAIL DE RANG '+g.rank+' · '+n+' gardien'+(n>1?'s':''),g.x,g.y-70,14,g.col,true);}};}
