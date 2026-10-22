// ===== Hunter × Hunter faction: data, Nen stances, vows and unique abilities =====
FAC.hxh={name:'Association Hunter',anime:'Hunter × Hunter',col:'#2ab8a8',col2:'#e8a020',money:'Jennys',heroes:['gon','killua','kurapika','leorio','biscuit','kite','morel','knuckle'],legends:['netero','ging','hisoka','zeno']};
{const N={hq:'Siège de l’Association Hunter',power:'Générateur d’aura',refinery:'Comptoir des chasseurs de trésors',barracks:'Centre d’examen Hunter',factory:'Hangar à dirigeables',turret:'Tour de guet de Nen',
  temple:'Tour Céleste',wall:'Mur de pierre Zoldyck',lab:'Dojo de Nen de Wing',radar:'Observatoire Hunter',def2:'Batterie de la Black Whale',market:'Enchères de York Shin',hospital:'Clinique de Leorio',
  training:'Île de Greed Island',temple2:'Manoir Zoldyck',unique:'Porte du Testament'};for(const k in N)BDEF[k].names.hxh=N[k];}
BDEF.unique.descs.hxh='Toutes les 50 s, un majordome Zoldyck rejoint gratuitement ton armée.';
BH2.hxh={hq:92,power:44,refinery:50,barracks:50,factory:54,turret:44,temple:130,wall:30,lab:40,radar:72,def2:44,market:46,hospital:48,training:36,temple2:76,unique:56};
UDEF.hxh={};
{const U={
  inf1:{name:'Hunter amateur',cost:100,time:5,hp:140,speed:66,dmg:11,range:18,rof:.8,melee:true,size:7,sight:6,look:'hunter1',desc:'Candidat Hunter agile au corps à corps. Profite des postures de Nen.'},
  inf2:{name:'Utilisateur d’émission',cost:300,time:9,hp:220,speed:64,dmg:23,range:155,rof:1.3,proj:'ki',pcol:'#5affd8',size:8,sight:7,look:'nenuser',vsB:.7,desc:'Projette son aura à distance sous forme de boules de Nen.'},
  inf3:{name:'Majordome Zoldyck',cost:300,time:9,hp:360,speed:72,dmg:24,range:20,rof:.7,melee:true,size:8,sight:7,look:'butler',desc:'Garde du domaine Zoldyck : rapide, solide, redoutable au contact.'},
  inf4:{name:'Chasseur de primes',cost:440,time:11,hp:240,speed:60,dmg:42,range:240,rof:2.2,proj:'bullet',size:8,sight:9,look:'bhunter',vsB:.8,desc:'Tireur d’élite à très longue portée. Idéal pour les embuscades en Zetsu.'},
  healer:{name:'Médecin Hunter',cost:400,time:10,hp:190,speed:62,heal:30,range:125,size:7,sight:6,look:'hmedic',desc:'Soigne les combattants alliés proches (pas les véhicules).'},
  harv:{name:'Camion de l’Association Hunter',cost:700,time:14,hp:900,speed:46,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Récolte les cristaux.'},
  tank:{name:'Mike, chien de garde Zoldyck',cost:750,time:14,hp:1000,speed:62,dmg:46,range:24,rof:1,melee:true,splash:24,size:15,sight:8,at:'factory',veh:true,vsB:1.1,beast:'dog',desc:'Le gigantesque chien de garde du domaine Zoldyck. Charge et déchiquette.'},
  jet:{name:'Dirigeable de l’Association',cost:650,time:11,hp:480,speed:110,dmg:14,range:150,rof:.5,proj:'bullet',fly:true,size:14,sight:11,at:'factory',veh:true,vsB:.5,desc:'Dirigeable d’observation : grande vision, idéal pour repérer et chasser les trésors.'},
  mech:{name:'Golem de Greed Island',cost:1300,time:20,hp:2700,speed:34,dmg:92,range:34,rof:1.8,melee:true,splash:48,size:22,sight:8,at:'factory',veh:true,mech:true,vsB:1.4,req:['lab'],desc:'Golem de pierre invoqué par une carte de Greed Island. Écrase tout autour de lui.'},
  smoke:{name:'Soldat de fumée',cost:0,time:1,hp:260,speed:80,dmg:22,range:20,rof:.7,melee:true,size:8,sight:6,look:'smokesold',at:'none',desc:'Invoqué par Morel (Deep Purple). Disparaît au bout de 20 s.'},
  gon:{name:'Gon Freecss',hero:true,cost:1900,time:28,hp:1550,speed:96,dmg:48,range:20,rof:.65,melee:true,size:9,look:'gon',
    ab:{name:'Contrat : Forme adulte',type:'shift',cd:150,dur:22,form:'gonadult',vow:true,range:0,shout:'JAJANKEN… PIERRE !!',col:'#ffcf3a'},desc:'Contrat et Restriction : devient adulte pendant 22 s avec une puissance démesurée… puis s’effondre, épuisé.'},
  killua:{name:'Killua Zoldyck',hero:true,cost:1800,time:26,hp:1350,speed:118,dmg:44,range:20,rof:.5,melee:true,size:9,look:'killua',
    ab:{name:'Godspeed : Coup de tonnerre',type:'thunder',cd:12,dmg:400,range:340,w:42,stun:1.6,shout:'GODSPEED !',col:'#9ad8ff'},desc:'Héritier des assassins Zoldyck. Le plus rapide : traverse les lignes en foudroyant et étourdissant.'},
  kurapika:{name:'Kurapika',hero:true,cost:1900,time:28,hp:1400,speed:88,dmg:46,range:40,rof:.7,melee:true,size:9,look:'kurapika',
    ab:{name:'Emperor Time',type:'rage',cd:40,dur:14,drain:.035,range:0,shout:'EMPEROR TIME !',col:'#ff2a2a'},desc:'Ses yeux écarlates lui donnent une puissance absolue… au prix de sa vie qui s’écoule pendant 14 s.'},
  leorio:{name:'Leorio Paladiknight',hero:true,cost:1200,time:20,hp:1300,speed:84,dmg:30,range:24,rof:.9,melee:true,heal:22,size:10,look:'leorio',
    ab:{name:'Poing téléporté',type:'snipe',cd:14,dmg:520,range:380,shout:'TU VAS PRENDRE ÇA !',col:'#5affd8'},desc:'Futur médecin : soigne les alliés proches et frappe à distance à travers son aura.'},
  biscuit:{name:'Biscuit Krueger',hero:true,cost:1600,time:24,hp:1700,speed:86,dmg:52,range:20,rof:.7,melee:true,size:9,look:'biscuit',
    ab:{name:'Massage de Cookie-chan',type:'rewind',cd:40,rad:280,range:0,shout:'COOKIE-CHAN !',col:'#ff9ad8'},desc:'Maîtresse de Nen de 57 ans au corps de fillette. Soigne entièrement les alliés proches.'},
  kite:{name:'Kite',hero:true,cost:1700,time:26,hp:1450,speed:90,dmg:46,range:26,rof:.75,melee:true,size:9,look:'kite',
    ab:{name:'Crazy Slot',type:'slot',cd:16,dmg:420,range:300,rad:90,shout:'CRAZY SLOT !',col:'#e8e0d0'},desc:'Sa roulette choisit une arme au hasard à chaque utilisation : faux, fusil ou bâton.'},
  morel:{name:'Morel Mackernasey',hero:true,cost:1500,time:24,hp:1600,speed:80,dmg:40,range:22,rof:.8,melee:true,size:10,look:'morel',
    ab:{name:'Deep Purple',type:'summon',cd:30,n:4,range:0,shout:'DEEP PURPLE !',col:'#c8c8d0'},desc:'Invoque des soldats de fumée qui combattent à ses côtés pendant 20 s.'},
  knuckle:{name:'Knuckle Bine',hero:true,cost:1400,time:22,hp:1550,speed:90,dmg:44,range:20,rof:.65,melee:true,size:9,look:'knuckle',
    ab:{name:'Hakoware : Faillite',type:'crush',cd:22,dmg:360,range:280,rad:90,stun:2.6,shout:'HAKOWARE !',col:'#c070ff'},desc:'Les intérêts de son aura s’accumulent : écrase une zone et paralyse les ennemis.'},
};
const L={
  netero:{name:'Isaac Netero',cost:3400,time:40,hp:3000,speed:90,dmg:80,range:24,rof:.55,melee:true,splash:28,size:11,look:'netero',ab:{name:'Bodhisattva aux 100 mains : Zéro',type:'cone',cd:36,dmg:950,range:80,len:340,ang:.8,knock:520,guanyin:true,shout:'ZÉRO !',col:'#ffd23a'},desc:'Le président de l’Association, au sommet du Nen. Invoque une statue géante aux mille mains.'},
  ging:{name:'Ging Freecss',cost:2800,time:36,hp:2400,speed:96,dmg:62,range:24,rof:.6,melee:true,size:10,look:'ging',ab:{name:'Poing de Nen',type:'blast',cd:22,dmg:620,range:300,rad:110,knock:300,shout:'…',col:'#5affd8'},desc:'Le père de Gon, l’un des cinq meilleurs utilisateurs de Nen du monde.'},
  hisoka:{name:'Hisoka',cost:2600,time:34,hp:2100,speed:100,dmg:54,range:130,rof:.8,proj:'feather',pcol:'#ff4a8a',size:10,look:'hisoka',ab:{name:'Bungee Gum',type:'pull',cd:18,dmg:320,range:320,rad:150,shout:'BUNGEE GUM !',col:'#ff6aa8'},desc:'Magicien imprévisible : ses cartes tranchent à distance et Bungee Gum attire les ennemis vers lui.'},
  zeno:{name:'Zeno Zoldyck',cost:3000,time:38,hp:2500,speed:88,dmg:60,range:26,rof:.7,melee:true,size:10,look:'zeno',ab:{name:'Dragon Dive',type:'barrage',cd:24,dmg:230,range:340,rad:70,n:8,shout:'DRAGON DIVE !',col:'#7ad8ff'},desc:'Le grand-père assassin. Une pluie de dragons d’aura s’abat sur la zone.'},
};
for(const k in U){const D=U[k];D.key=k;D.fac='hxh';D.sight=D.sight||(D.hero?9:6);D.sightPx=D.sight*TILE;D.size=D.size||8;D.at=D.at||(D.hero?'temple':'barracks');D.rof=D.rof||1;D.req=D.req||[];if(D.hero)D.req=['temple'];UDEF.hxh[k]=D;}
for(const k in L){const D=L[k];D.key=k;D.fac='hxh';D.hero=true;D.legend=true;D.sight=10;D.sightPx=10*TILE;D.size=D.size||10;D.at='temple2';D.req=['temple2'];UDEF.hxh[k]=D;}}
FORMS.gonadult={look:'gonadult',sc:1.75,size:14,speed:112,dmg:170,range:24,rof:.55,melee:true,splash:42,shield:2600,sightPx:11*TILE};
SUPER.hxh={name:'Rose du Pauvre',charge:230,rad:180,dmg:1150,col:'#ff6aa8',shout:'ROSE DU PAUVRE.',look:'netero',who:'Isaac Netero',delay:2.2,fx:'rose'};
UPG.hxh=[{id:'nten',name:'Maîtrise du Ten',desc:'Infanterie : +25 % de vie',cost:900,time:25,cls:'inf',hp:1.25},
  {id:'nken',name:'Ken',desc:'Toutes les unités : +15 % de dégâts',cost:1100,time:28,cls:'all',dmg:1.15},
  {id:'zetsu2',name:'Zetsu parfait',desc:'En Zetsu : les ennemis doivent être deux fois plus près pour te repérer, et tu encaisses moins',cost:1000,time:26,cls:'all'},
  {id:'hatsu',name:'Hatsu personnel',desc:'Héros : +25 % de dégâts',cost:1500,time:32,cls:'hero',dmg:1.25},
  {id:'shu',name:'Shu',desc:'Véhicules : +25 % de dégâts et de vie',cost:1000,time:26,cls:'veh',dmg:1.25,hp:1.25}];
for(const u of UPG.hxh)UPG_BY_ID[u.id]=u;
Object.assign(UDEF.neu,{
  chimant:{name:'Fourmi-chimère',cost:400,hp:800,speed:90,dmg:36,range:20,rof:.8,melee:true,size:10,sight:9,look:'chimant',tsc:1.35,bounty:400},
  pitou:{name:'Neferpitou, garde royale',cost:3000,hp:5600,speed:112,dmg:100,range:24,rof:.6,melee:true,splash:32,size:12,sight:11,look:'pitou',tsc:1.3,regen:16,bounty:3000,dodge:.2},
  chrollo:{name:'Chrollo, chef de la Brigade',cost:3200,hp:4800,speed:96,dmg:88,range:24,rof:.65,melee:true,splash:26,size:11,sight:11,look:'chrollo',tsc:1.2,regen:14,bounty:3200},
  spider:{name:'Membre de la Brigade Fantôme',cost:500,hp:1400,speed:92,dmg:52,range:22,rof:.7,melee:true,size:10,sight:9,look:'spider',tsc:1.15,bounty:500},
});
for(const k of['chimant','pitou','chrollo','spider']){const D=UDEF.neu[k];D.key=k;D.fac='neu';D.sightPx=D.sight*TILE;D.at='none';D.req=[];D.desc='Créature neutre : attaque tout le monde. Rapporte '+D.bounty+' à celui qui l’abat.';}
EVENTS.push({id:'chimera',fac:'hxh',name:'Invasion des Fourmis-chimères',col:'#7ac850',desc:'Neferpitou mène les fourmis-chimères à l’attaque. Celui qui l’abat empoche 3000.'},
  {id:'troupe',fac:'hxh',name:'La Brigade Fantôme frappe',col:'#c8a0ff',desc:'Chrollo et ses araignées pillent la carte. Celui qui abat Chrollo empoche 3200.'});
{const _re=runEvent;runEvent=function(ev){if(ev.id!=='chimera'&&ev.id!=='troupe')return _re(ev);const p=randSpot(18)||{x:(MW/2-.5)*TILE,y:(MW/2-.5)*TILE};
  const ring=(k,n,r)=>{for(let i=0;i<n;i++){let x=p.x+rr(-r,r),y=p.y+rr(-r,r);if(blockedW(x,y)){const q=nearestFree(tileOf(x),tileOf(y),8);if(q){x=q[0]*TILE+16;y=q[1]*TILE+16;}}mkUnit(2,k,x,y);}};
  if(ev.id==='chimera'){mkUnit(2,'pitou',p.x,p.y);ring('chimant',6,80);}else{mkUnit(2,'chrollo',p.x,p.y);ring('spider',3,60);}part('flash',p.x,p.y-20,0,0,.6,140,ev.col);shake(9);
  G.alertPos={x:p.x,y:p.y};G.pings.push({x:p.x,y:p.y,t:4});banner(ev.name.toUpperCase(),ev.col);msg('Événement : '+ev.desc,ev.col);sfx('event');announce(ev.name);};}
// ---- Nen stances: Ten (defence), Ren (power), Zetsu (invisible ambushes) ----
const NEN={ten:{name:'Ten',col:'#5affd8',taken:.8,deal:1,spd:1,desc:'Ten : ton aura protège ton armée (-20 % de dégâts subis).'},
  ren:{name:'Ren',col:'#ff8a3a',taken:1.1,deal:1.35,spd:1,desc:'Ren : aura déchaînée (+35 % de dégâts, +10 % de dégâts subis).'},
  zetsu:{name:'Zetsu',col:'#8a96a8',taken:1.5,deal:1,spd:1.15,desc:'Zetsu : aura éteinte, ton armée est invisible tant qu’aucun ennemi n’est tout proche. Le premier coup porté inflige ×2,5 (assassinat).'}};
const nenOf=u=>{const s=sides[u.side];return s&&s.fac==='hxh'&&u.isU&&!u.D.veh&&!u.D.harv?NEN[s.nen||'ten']:null;};
function setNen(si,m){const s=sides[si];if(!s||s.fac!=='hxh'||!NEN[m]||(s.nen||'ten')===m)return false;
  if(NET.client&&!NET.applying&&si===PL){NET.cmd({c:'nen',m});s.nen=m;s.nenT=gtime+4;sfx('transform');return true;}
  if(gtime<(s.nenT||0))return false;s.nen=m;s.nenT=gtime+4;for(const e of ents)if(!e.dead&&e.side===si&&nenOf(e)&&R()<.5)fxRing(e.x,e.y,NEN[m].col,16);
  if(si===PL){feedPush('Posture '+NEN[m].name+' — '+NEN[m].desc.split(' : ')[1],NEN[m].col);sfx('transform');}return true;}
{const _rc=runCmd;runCmd=function(c){if(c&&c.c==='nen'){setNen(NET.gs,c.m);return;}_rc(c);};}
let nenT=0;
function updNen(dt){nenT-=dt;const step=nenT<=0;if(step)nenT=.25;
  for(const u of ents){if(u.dead||!u.isU)continue;if(u.revealT>0)u.revealT-=dt;if(u.life!=null){u.life-=dt;if(u.life<=0&&!NET.client){u.dead=true;for(let k=0;k<10;k++)part('smoke',u.x+rr(-8,8),u.y-rr(0,24),rr(-10,10),-20,1,rr(6,10),'#c8c8d0');}}
    if(u.D.ab&&u.D.ab.drain&&u.buff>0&&u.hp>1)u.hp=Math.max(1,u.hp-u.max*u.D.ab.drain*dt);
    if(u.exhaust>0)u.exhaust-=dt;
    if(!step||NET.client)continue;const N=nenOf(u);if(!N||sides[u.side].nen!=='zetsu'){u.hid=false;continue;}
    if(u.revealT>0||u.casting||u.dash){u.hid=false;continue;}const det=sides[u.side].ups.includes('zetsu2')?55:100;let seen=false;
    for(const e of ents){if(e.dead||!e.isU||ally(e.side,u.side))continue;if(Math.abs(e.x-u.x)<det&&Math.abs(e.y-u.y)<det&&hyp(e.x-u.x,e.y-u.y)<det){seen=true;break;}}u.hid=!seen;}
  if(NET.client)return;for(const ai of G.ai){const s=sides[ai.si];if(!s||s.fac!=='hxh')continue;ai.nenT=(ai.nenT||0)-dt;if(ai.nenT>0)continue;ai.nenT=2;
    const army=ents.filter(e=>e.isU&&!e.dead&&e.side===ai.si&&!e.D.harv);let near=0;for(const u of army){if(u.target&&!u.target.dead&&hyp(u.target.x-u.x,u.target.y-u.y)<260)near++;}
    setNen(ai.si,near>=3?'ren':ai.attacking?'zetsu':'ten');}}
{const _uf=updFusion;updFusion=function(dt){_uf(dt);updNen(dt);};}
{const _dm=damage;damage=function(t,amt,srcSide,src){if(!t.dead&&!(NET.client&&!NET.applying)){const N=nenOf(t);if(N){let k=N.taken;if(N===NEN.zetsu&&sides[t.side].ups.includes('zetsu2'))k=1.2;amt*=k;}}_dm(t,amt,srcSide,src);};}
{const _dmm=dmgMult;dmgMult=function(u){let m=_dmm(u);const N=nenOf(u);if(N)m*=N.deal;if(u.hid)m*=2.5;return m;};}
{const _us=unitSpeed;unitSpeed=function(u){let s=_us(u);const N=nenOf(u);if(N)s*=N.spd;if(u.exhaust>0)s*=.5;return s;};}
{const _fi=fire;fire=function(u,t){const amb=u.hid;_fi(u,t);if(amb){u.hid=false;u.revealT=3;if(plSees(u)||t.side===PL)fxs.push({type:'assassin',x:t.x,y:t.y-24,t:0,dur:.8});}else if(nenOf(u)&&sides[u.side].nen==='zetsu')u.revealT=Math.max(u.revealT||0,1.2);};}
// ---- vows, unique abilities ----
{const _es=endShift;endShift=function(u){const was=u.form;_es(u);if(was==='gonadult'&&!NET.client){u.hp=Math.max(1,Math.min(u.hp,u.max*.15));u.freeze=10;u.exhaust=30;
  if(u.side===PL)msg('Le contrat a un prix : Gon s’effondre, épuisé (10 s).','#ffcf3a');for(let k=0;k<16;k++)part('smoke',u.x+rr(-10,10),u.y-rr(0,30),rr(-20,20),-30,1.2,rr(6,10));}};}
{const _e3=execAbility3;execAbility3=function(u,c,ab,dx,dy,L){
  if(ab.guanyin)fxs.push({type:'guanyin',x:u.x-u.face*30,y:u.y,face:u.face,t:0,dur:1.8});
  if(ab.type==='thunder'){let tx=c.x,ty=c.y;if(L>ab.range){tx=u.x+dx*ab.range;ty=u.y+dy*ab.range;}if(bw(u,tx,ty)){const n=nearestFree(tileOf(tx),tileOf(ty),5);if(n){tx=n[0]*TILE+16;ty=n[1]*TILE+16;}}
    for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const dd=segDist(e.x,e.y,u.x,u.y,tx,ty)-(e.isB?e.w*14:e.r);if(dd<ab.w/2){damage(e,ab.dmg*dmgMult(u)*(e.isB?.5:1),u.side,u);if(e.isU&&!e.dead){e.freeze=Math.max(e.freeze,ab.stun*(e.D.hero?.5:1));e.path=null;}}}
    fxs.push({type:'bolt',x:tx,y:ty,t:0,dur:.5});fxs.push({type:'slash',x1:u.x,y1:u.y,x2:tx,y2:ty,t:0,dur:.45,col:ab.col});for(let k=0;k<8;k++)part('bolt',lerp(u.x,tx,R()),lerp(u.y,ty,R())-14,0,0,.25,20,'#cfe8ff');
    u.dash={sx:u.x,sy:u.y,tx,ty,t:0,T:.16,noBlast:true};shake(6);sfx('whoosh',u.x,u.y);return true;}
  if(ab.type==='slot'){const n=1+((R()*9)|0),pickT=n===1||n===4?'cone':n===3||n===7?'crush':'barrage';
    const sub=pickT==='cone'?{type:'cone',dmg:ab.dmg,len:220,ang:.6,knock:300,col:'#e8e0d0'}:pickT==='crush'?{type:'crush',dmg:ab.dmg*.9,rad:ab.rad,stun:1.8,col:'#e8e0d0'}:{type:'barrage',dmg:ab.dmg*.45,rad:60,n:6,col:'#e8e0d0'};
    fxs.push({type:'slotnum',x:u.x,y:u.y-60,n,w:pickT==='cone'?'FAUX':pickT==='crush'?'BÂTON':'FUSIL',t:0,dur:1.4});const D0=u.D;u.D=Object.assign({},D0,{ab:Object.assign({},ab,sub)});try{execAbility(u,c);}finally{u.D=D0;}return true;}
  if(ab.type==='summon'){if(!NET.client)for(let i=0;i<ab.n;i++){const a=i/ab.n*PI2,s=mkUnit(u.side,'smoke',u.x+Math.cos(a)*30,u.y+Math.sin(a)*22);s.life=20;s.gx=s.x;s.gy=s.y;if(u.target)orderAttack(s,u.target);}
    for(let k=0;k<30;k++)part('smoke',u.x+rr(-40,40),u.y-rr(0,30),rr(-30,30),rr(-30,-5),1.4,rr(10,16),'#c8c8d0');sfx('whoosh',u.x,u.y);return true;}
  if(ab.type==='pull'){for(const e of ents){if(e.dead||ally(e.side,u.side)||!e.isU)continue;const d=hyp(e.x-c.x,e.y-c.y);if(d>ab.rad+e.r)continue;damage(e,ab.dmg*dmgMult(u),u.side,u);
      if(!e.dead){const dx2=u.x-e.x,dy2=u.y-e.y,l=hyp(dx2,dy2)||1,k=Math.min(l*2.4,520)*(e.D.veh?.4:1);e.kx+=dx2/l*k;e.ky+=dy2/l*k;e.path=null;}}
    fxs.push({type:'bungee',x1:u.x,y1:u.y,x:c.x,y:c.y,r:ab.rad,t:0,dur:.9});sfx('whoosh',c.x,c.y);return true;}
  return _e3(u,c,ab,dx,dy,L);};}
{const _oa=orderAbility;orderAbility=function(u,x,y){if(u.D.ab&&u.D.ab.type==='summon'){if(!canCast(u))return false;startCast(u,{x:u.x,y:u.y});return true;}return _oa(u,x,y);};}
// ---- Hunters live off bounties and treasure ----
{const _k=kill;kill=function(t,srcSide,src){const live=!t.dead;_k(t,srcSide,src);if(!live||!t.dead||NET.client)return;if(srcSide!=null&&isPl(srcSide)&&sides[srcSide].fac==='hxh'&&t.D.bounty&&srcSide!==t.side){sides[srcSide].credits+=t.D.bounty;if(srcSide===PL)feedPush('Prime de Hunter doublée : +'+t.D.bounty,'#2ab8a8');}};}
{const _tp=takePickup;takePickup=function(p,u){_tp(p,u);const s=sides[u.side];if(s&&s.fac==='hxh'){s.credits+=600;if(u.side===PL)feedPush('Chasseur de trésors : +600 en plus','#2ab8a8');}};}
// ---- Rose du Pauvre: a giant blast that leaves a poison cloud ----
{const _us=updSpecial;updSpecial=function(dt){_us(dt);for(const f of fxs){
  if(f.type==='rose'&&!f.done&&f.t>=f.delay){f.done=true;splashDmg(f.x,f.y,f.rad,f.dmg,f.side,420,.8,null);fxBoom(f.x,f.y,f.rad,'#ff6aa8',true);fxBoom(f.x,f.y,f.rad*.5,'#ffffff',true);scorch(f.x,f.y,f.rad*1.1,.8);shake(24);sfx('big',f.x,f.y);setTimeoutG(()=>sfx('boom',f.x,f.y),.25);
    fxs.push({type:'poison',x:f.x,y:f.y,r:f.rad*1.1,side:f.side,t:0,dur:9,tick:0});}
  else if(f.type==='poison'){f.tick-=dt;if(f.tick<=0){f.tick=.5;for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,f.side)&&hyp(e.x-f.x,e.y-f.y)<f.r)damage(e,22,f.side,null);}if(R()<dt*20)part('smoke',f.x+rr(-f.r,f.r)*.8,f.y+rr(-f.r,f.r)*.5,rr(-10,10),rr(-20,-5),1.6,rr(10,18),'#b04a8a');}}};}
