// ===== The Seven Deadly Sins faction: Kingdom of Liones, the Sun of Escanor, Full Counter =====
FAC.sds={name:'Les Sept Péchés Capitaux',anime:'The Seven Deadly Sins',col:'#c8202e',col2:'#3aa04a',money:'Pièces de Liones',heroes:['meliodas','ban','diane','harlequin','gowther','merlin'],legends:['escanor','elizabeth','arthur','zeldris']};
{const N={hq:'Le Boar Hat',power:'Source de magie',refinery:'Comptoir marchand de Liones',barracks:'Caserne des chevaliers de Liones',factory:'Arsenal royal de Liones',turret:'Tour de garde',
  temple:'Château de Liones',wall:'Rempart de Liones',lab:'Atelier de Merlin',radar:'Tour de vigie de Camelot',def2:'Baliste royale',market:'Taverne de Bernia',hospital:'Sanctuaire des druides d’Istar',
  training:'Terre sacrée des druides',temple2:'Royaume des Fées',unique:'Forêt du Roi des Fées'};for(const k in N)if(BDEF[k])BDEF[k].names.sds=N[k];}
BDEF.unique.descs.sds='Toutes les 50 s, une mage de la forêt des fées rejoint gratuitement ton armée.';
BH2.sds=Object.assign({},BH2.aot||{},{hq:92});for(const k in BH_EXTRA)if(BH_EXTRA[k].aot!=null)BH_EXTRA[k].sds=BH_EXTRA[k].aot;
UDEF.sds={};
{const U={
  inf1:{name:'Chevalier de Liones',cost:100,time:5,hp:160,speed:62,dmg:11,range:18,rof:.8,melee:true,size:7,sight:5,look:'liknight',desc:'Soldat du royaume en armure : solide au corps à corps.'},
  inf2:{name:'Apprenti mage de Liones',cost:300,time:9,hp:210,speed:64,dmg:23,range:155,rof:1.3,proj:'ki',pcol:'#ff7a5a',size:8,sight:7,look:'limage',vsB:.7,desc:'Lance des sorts de feu à distance.'},
  inf3:{name:'Chevalier sacré apprenti',cost:320,time:9,hp:400,speed:66,dmg:26,range:22,rof:.75,melee:true,size:8,sight:7,look:'liholy',desc:'Apprenti Chevalier sacré : sa magie renforce ses coups d’épée.'},
  inf4:{name:'Arbalétrier royal',cost:440,time:11,hp:240,speed:58,dmg:42,range:240,rof:2.2,proj:'bullet',size:8,sight:9,look:'lixbow',vsB:.8,desc:'Tireur d’élite de la garde royale, à très longue portée.'},
  healer:{name:'Druide d’Istar',cost:400,time:10,hp:190,speed:60,heal:32,range:125,size:7,sight:6,look:'druid',desc:'Soigne les combattants alliés proches (pas les véhicules).'},
  harv:{name:'Chariot marchand de Liones',cost:700,time:14,hp:900,speed:46,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Récolte les cristaux.'},
  tank:{name:'Canon de Liones',cost:750,time:14,hp:820,speed:40,dmg:58,range:220,rof:2.3,proj:'shell',splash:36,size:15,sight:7,at:'factory',veh:true,vsB:1.4,desc:'Pièce d’artillerie royale à boulets explosifs.'},
  jet:{name:'Chevalier à cheval',cost:600,time:11,hp:380,speed:128,dmg:14,range:140,rof:.5,proj:'bullet',size:12,sight:10,at:'factory',veh:true,vsB:.5,desc:'Éclaireur monté très rapide. Parfait pour chasser les Dragon Balls.'},
  mech:{name:'Grand canon de Camelot',cost:1200,time:18,hp:1100,speed:26,dmg:150,range:340,rof:4,proj:'shell',splash:60,size:20,sight:9,at:'factory',veh:true,mech:true,vsB:1.8,desc:'Artillerie de siège : portée et dégâts énormes.'},
  meliodas:{name:'Meliodas',hero:true,cost:2000,time:28,hp:1700,speed:94,dmg:50,range:22,rof:.6,melee:true,size:9,look:'meliodas',fullCounter:true,
    ab:{name:'Full Counter',type:'rage',cd:26,dur:6,range:0,shout:'FULL COUNTER !',col:'#5a5aff',counter:true},desc:'Péché de la Colère. Full Counter : pendant 6 s, renvoie aux attaquants les dégâts qu’il reçoit.'},
  ban:{name:'Ban',hero:true,cost:1700,time:26,hp:1500,speed:96,dmg:44,range:24,rof:.6,melee:true,size:9,look:'ban',regen:16,lifesteal:.25,immortal:true,
    ab:{name:'Snatch',type:'pull',cd:16,dmg:260,range:300,rad:140,shout:'SNATCH !',col:'#ff5a5a'},desc:'Péché de l’Avarice. Immortel : se régénère très vite et revient d’entre les morts une fois. Vole la force de ses ennemis.'},
  diane:{name:'Diane',hero:true,cost:1900,time:28,hp:2300,speed:70,dmg:60,range:30,rof:1,melee:true,splash:40,size:14,look:'diane',
    ab:{name:'Heavy Metal : Gideon',type:'crush',cd:22,dmg:420,range:260,rad:120,stun:2.2,shout:'HEAVY METAL !',col:'#c8a040'},desc:'Péché de l’Envie, une géante. Frappe en zone et écrase les ennemis au sol.'},
  harlequin:{name:'King (Harlequin)',hero:true,cost:1800,time:26,hp:1250,speed:96,dmg:40,range:170,rof:.8,proj:'feather',pcol:'#7adf6a',fly:true,size:9,look:'harlequin',
    ab:{name:'Chastiefol : Sunflower',type:'beam',cd:24,dmg:480,range:320,len:460,w:40,shout:'CHASTIEFOL, QUATRIÈME FORME !',col:'#7adf6a'},desc:'Péché de la Paresse, roi des fées. Vole et tire avec sa lance sacrée Chastiefol.'},
  gowther:{name:'Gowther',hero:true,cost:1600,time:24,hp:1250,speed:88,dmg:40,range:180,rof:.9,proj:'laser',pcol:'#ff8ad8',size:9,look:'gowther',
    ab:{name:'Nightmare Teller',type:'thunder',cd:18,dmg:260,range:340,w:60,stun:3,shout:'NIGHTMARE TELLER.',col:'#ff8ad8'},desc:'Péché de la Luxure. Ses flèches de lumière embrouillent l’esprit : les ennemis touchés restent paralysés.'},
  merlin:{name:'Merlin',hero:true,cost:2000,time:28,hp:1300,speed:84,dmg:46,range:190,rof:.9,proj:'ki',pcol:'#b06aff',splash:22,size:9,look:'merlin',
    ab:{name:'Exterminate Ray',type:'beam',cd:22,dmg:560,range:340,len:500,w:30,shout:'EXTERMINATE RAY.',col:'#b06aff'},desc:'Péché de la Gourmandise, la plus grande mage de Britannia. Tirs magiques en zone.'},
};
const L={
  escanor:{name:'Escanor',cost:3400,time:40,hp:3200,speed:80,dmg:90,range:30,rof:.8,melee:true,splash:36,size:12,look:'escanor',sun:true,
    ab:{name:'Cruel Sun',type:'blast',cd:28,dmg:900,range:320,rad:140,knock:260,shout:'CRUEL SUN !',col:'#ffb020'},desc:'Péché de l’Orgueil. Sa puissance suit le soleil : invincible à midi, faible la nuit.'},
  elizabeth:{name:'Elizabeth Liones',cost:2600,time:34,hp:2200,speed:84,dmg:30,range:150,rof:1,proj:'ki',pcol:'#fff2b0',heal:40,size:10,look:'elizabeth',
    ab:{name:'Lumière de la déesse',type:'rewind',cd:34,rad:320,range:0,shout:'QUE LA LUMIÈRE VOUS GUÉRISSE !',col:'#ffe9a0'},desc:'Princesse de Liones et descendante des déesses : soigne tous les alliés autour d’elle.'},
  arthur:{name:'Arthur Pendragon',cost:2800,time:36,hp:2400,speed:92,dmg:62,range:24,rof:.6,melee:true,size:10,look:'arthur',
    ab:{name:'Excalibur',type:'cone',cd:24,dmg:820,range:80,len:320,ang:.7,knock:420,shout:'EXCALIBUR !',col:'#ffd23a'},desc:'Le roi de Camelot et son épée légendaire.'},
  zeldris:{name:'Zeldris',cost:3000,time:38,hp:2600,speed:96,dmg:70,range:26,rof:.6,melee:true,size:10,look:'zeldris',
    ab:{name:'Ominous Nebula',type:'pull',cd:20,dmg:420,range:320,rad:170,shout:'OMINOUS NEBULA.',col:'#7a1a2a'},desc:'Frère de Meliodas, chef des Dix Commandements : aspire tous les ennemis vers son épée.'},
};
for(const k in U){const D=U[k];D.key=k;D.fac='sds';D.sight=D.sight||(D.hero?9:6);D.sightPx=D.sight*TILE;D.size=D.size||8;D.at=D.at||(D.hero?'temple':'barracks');D.rof=D.rof||1;D.req=D.req||[];if(D.hero)D.req=['temple'];UDEF.sds[k]=D;}
for(const k in L){const D=L[k];D.key=k;D.fac='sds';D.hero=true;D.legend=true;D.sight=10;D.sightPx=10*TILE;D.size=D.size||10;D.at='temple2';D.req=['temple2'];UDEF.sds[k]=D;}}
SUPER.sds={name:'Le Soleil d’Escanor',charge:230,rad:180,dmg:1150,col:'#ffb020',shout:'THE ONE… CRUEL SUN !!',look:'escanor',who:'Escanor',delay:2.4};
UPG.sds=[{id:'holy',name:'Entraînement des Chevaliers sacrés',desc:'Infanterie : +25 % de vie',cost:900,time:25,cls:'inf',hp:1.25},
  {id:'magic',name:'Magie de Merlin',desc:'Toutes les unités : +15 % de dégâts',cost:1100,time:28,cls:'all',dmg:1.15},
  {id:'treasure',name:'Trésors sacrés',desc:'Héros : +25 % de dégâts',cost:1500,time:32,cls:'hero',dmg:1.25},
  {id:'forge',name:'Forge des géants',desc:'Véhicules : +25 % de dégâts et de vie',cost:1000,time:26,cls:'veh',dmg:1.25,hp:1.25}];
for(const u of UPG.sds)UPG_BY_ID[u.id]=u;
// ---- looks ----
{const C=(src,o)=>Object.assign({},LOOK[src],{umbra:false,glowEye:null},o);
  Object.assign(LOOK,{
    meliodas:{skin:'#f6d6b8',hc:'#f2d25a',hairK:'killua',gi:'#f4f4f0',gi2:'#1a1a22',pants:'#1a1a22',boots:'#4a3020',arms:'gi',eye:'#3aa04a',weapon:'sword',wcol:'#d8dce4'},
    ban:{skin:'#f3d6c0',hc:'#e8ecf4',hairK:'hisoka',gi:'#c8202e',gi2:'#2a1a1a',pants:'#c8202e',boots:'#2a1a1a',arms:'skin',eye:'#d8343f',weapon:'staff'},
    diane:{skin:'#f3c9a8',hc:'#6a3a1a',hairK:'biscuit',pigtails:true,gi:'#3a8a3a',gi2:'#e8a040',pants:'#e8a040',boots:'#6a3a1a',arms:'skin',eye:'#8a4ab8',big:true,weapon:'axe',wcol:'#a88a5a'},
    harlequin:{skin:'#f6dcc4',hc:'#8a5a2a',hairK:'short',gi:'#3a8a4a',gi2:'#f4f0e0',pants:'#2a5a34',boots:'#5a3a1a',arms:'gi',eye:'#6a4a2a'},
    gowther:{skin:'#f6dcc4',hc:'#ff8ab8',hairK:'uraraka',glasses:true,gi:'#5a3a8a',gi2:'#e8c8ff',pants:'#3a2a5a',boots:'#2a1a3a',arms:'gi',eye:'#ffd23a',weapon:'wand',wcol:'#ffd0f0'},
    merlin:{skin:'#f3d4c0',hc:'#141418',hairK:'fubuki',gi:'#5a2a6a',gi2:'#e8c040',pants:'#3a1a4a',boots:'#1a1020',arms:'skin',eye:'#c070ff',dress:'#5a2a6a',weapon:'staff',wcol:'#c070ff'},
    escanor:{skin:'#e8b890',hc:'#f2d25a',hairK:'metalbat',mustache:true,gi:'#f4f0e0',gi2:'#c8202e',pants:'#2a2a3a',boots:'#4a3020',arms:'skin',eye:'#3a2a1a',big:true,weapon:'axe',wcol:'#ffb020'},
    elizabeth:{skin:'#f8e0d0',hc:'#e8e4f0',hairK:'chahaein',gi:'#f4f4f8',gi2:'#ff8ab8',pants:'#f4f4f8',boots:'#e8e0f0',arms:'skin',eye:'#4a8ad8',dress:'#ffffff'},
    arthur:{skin:'#f6d6b8',hc:'#e87a2a',hairK:'short',gi:'#2a4a9a',gi2:'#e8c040',pants:'#1a2a5a',boots:'#4a3020',arms:'gi',eye:'#4a6a2a',cape:'#c8202e',weapon:'sword',wcol:'#ffe9a0'},
    zeldris:{skin:'#f3d6c0',hc:'#141418',hairK:'jinwoo',gi:'#1a1a22',gi2:'#7a1a2a',pants:'#1a1a22',boots:'#0e0e12',arms:'gi',eye:'#c8202e',glowEye:'#ff3a3a',weapon:'katana',wcol:'#3a1a2a'},
    liknight:C('shknight',{skin:'#f1c7a2',gi:'#b8bcc8',gi2:'#c8202e',pants:'#6a6e7a',boots:'#4a4e5a',armorP:'#d8dce4',helm:'#c8ccd8',plume:'#c8202e',eye:'#3a3a4a',weapon:'sword',wcol:'#d8dce4'}),
    limage:C('hmage',{gi:'#c8202e',hood:'#c8202e',gi2:'#e8c040',pants:'#5a1a1a'}),
    liholy:C('shknight',{skin:'#f1c7a2',gi:'#c8b070',gi2:'#3aa04a',pants:'#6a5a3a',boots:'#4a3a2a',armorP:'#e8c040',helm:'#e8c040',plume:'#3aa04a',eye:'#3a3a4a',weapon:'greatsword',wcol:'#e8e4d8'}),
    lixbow:C('bhunter',{gi:'#3a5a2a',gi2:'#c8202e',pants:'#2a3a1a'}),
    druid:C('shealer',{gi:'#e8f0d8',gi2:'#3aa04a',cross:'#3aa04a',hc:'#d8c8a0'}),
    holyk:C('shknight',{skin:'#f1c7a2',gi:'#f4e8b0',gi2:'#c8202e',pants:'#8a7a4a',boots:'#5a4a2a',armorP:'#f4e8b0',helm:'#e8c040',plume:'#ffffff',cape:'#c8202e',eye:'#3a3a4a',glowEye:'#ffe14d',weapon:'greatsword',wcol:'#fff2b0'})});
  for(const k of['meliodas','ban','diane','harlequin','gowther','merlin','escanor','elizabeth','arthur','zeldris','liknight','limage','liholy','lixbow','druid','holyk']){LOOK[k].k=k;NEWLOOKS.push(k);}}
{const _h=hair;hair=function(c,L,k,...a){return _h(c,L,L.hairK||k,...a);};}
// elite unit (upgraded barracks)
UDEF.sds.elite={name:'Chevalier sacré',cost:650,time:14,hp:700,speed:80,dmg:48,range:22,rof:.7,melee:true,splash:20,size:9,sight:8,look:'holyk',key:'elite',fac:'sds',at:'barracks',req:['barracks+'],sightPx:8*TILE,desc:'Chevalier sacré de Liones : sa magie le rend redoutable au corps à corps.'};
// ---- the Sun: a day/night cycle that drives Escanor's power ----
const sunAt=t=>.5-.5*Math.cos(((t||0)+60)/240*PI2);// 0 = midnight, 1 = noon, one day = 4 minutes
const sdsHeroes=si=>ents.filter(e=>e.isU&&!e.dead&&e.side===si&&e.D.hero&&e.fac==='sds').length;
{const _dmm=dmgMult;dmgMult=function(u){let m=_dmm(u);if(u.fac==='sds'&&u.isU){const sun=sunAt(gtime);if(u.D.sun)m*=.4+1.8*sun;if(u.D.hero&&!u.D.legend){const n=sdsHeroes(u.side);if(n>1)m*=1+.06*(n-1);}}return m;};}
// Full Counter (Meliodas) and Ban's immortality
let fcGuard=false;
{const _dm=damage;damage=function(t,amt,srcSide,src){if(!t.dead&&t.isU&&t.D.fullCounter&&t.buff>0&&src&&!src.dead&&!fcGuard&&!(NET.client&&!NET.applying)){fcGuard=true;try{_dm(src,amt*1.2,t.side,t);}finally{fcGuard=false;}amt*=.15;
    if(plSees(t)&&R()<.5)part('spark',t.x,t.y-18,rr(-60,60),-40,.4,2,'#8a8aff');}
  return _dm(t,amt,srcSide,src);};}
{const _k=kill;kill=function(t,srcSide,src){if(t.isU&&t.D.immortal&&!t.dead&&!t.revived&&!NET.client){t.revived=true;t.hp=t.max*.6;t.freeze=0;fxRing(t.x,t.y,'#ff5a5a',70);part('flash',t.x,t.y-16,0,0,.4,80,'#ff5a5a');
    if(plSees(t))cutin(t,'L’IMMORTEL !');if(t.side===PL)feedPush('Ban est immortel : il se relève !','#ff5a5a');return;}return _k(t,srcSide,src);};}
// sun indicator for the Seven Deadly Sins player
{const ch=document.createElement('div');ch.className='chip';ch.id='sunchip';ch.title='Le soleil : Escanor est surpuissant à midi et très faible la nuit. Une journée dure 4 minutes.';ch.hidden=true;ch.innerHTML='<span id="sunico">☀</span><b id="suntxt" style="font-size:12px"></b>';
  const r=document.querySelector('#top .res');if(r)r.appendChild(ch);
  setInterval(()=>{if(G.state!=='play'||!sides[PL]){ch.hidden=true;return;}ch.hidden=sides[PL].fac!=='sds';if(ch.hidden)return;const s=sunAt(gtime);
    $('#sunico').textContent=s>.66?'☀':s>.33?'⛅':'☾';$('#suntxt').textContent='×'+(.4+1.8*s).toFixed(1);ch.title=(s>.66?'Midi':s>.33?(Math.sin(((gtime||0)+60)/240*PI2)>0?'Matin':'Soir'):'Nuit')+' : Escanor ×'+(.4+1.8*s).toFixed(1)+'. Le soleil règle sa force ; une journée dure 4 minutes.';ch.style.color=s>.5?'#ffb020':'#8a9ad8';},500);}
// ---- buildings: Liones uses the medieval set of the Survey Corps, with its own Boar Hat tavern ----
const asAot=o=>{const p=Object.create(o);p.fac='aot';return p;};
{const _db=drawBuilding;drawBuilding=function(c,b,ghost){if(b.fac!=='sds')return _db(c,b,ghost);if(b.key==='hq')return drawBoarHat(c,b,ghost);_db(c,asAot(b),ghost);sdsBanner(c,b);};}
{const _bh=bH;bH=function(b){return b.fac==='sds'?(b.key==='hq'?92:_bh(asAot(b))):_bh(b);};}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){return _dv(c,u.fac==='sds'?asAot(u):u,x,y,ghost);};}
{const _dmc=drawMech;drawMech=function(c,u,x,y,ghost){return _dmc(c,u.fac==='sds'?asAot(u):u,x,y,ghost);};}
function sdsBanner(c,b){if(b.key==='wall'||b.key==='turret')return;const x=b.tx*TILE+b.w*TILE-8,y=b.ty*TILE+b.h*TILE-6,a=b.anim||0;c.strokeStyle='#3a3a3a';c.lineWidth=1.4;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-26);c.stroke();
  c.fillStyle='#c8202e';c.beginPath();c.moveTo(x,y-26);for(let i=0;i<=6;i++)c.lineTo(x+i*2.2,y-26+Math.sin(a*5+i*.8)*1.2);c.lineTo(x+13,y-16);c.lineTo(x+6.5,y-13);c.lineTo(x,y-16);c.closePath();c.fill();
  c.fillStyle='#e8c040';c.beginPath();c.arc(x+6.5,y-20,2.2,0,PI2);c.fill();}
function drawBoarHat(c,b,ghost){const x=b.x,y=b.y+8,a=b.anim||0,br=Math.sin(a*1.6)*1.2,rise=ghost?1:Math.min(1,b.rise||1);c.save();if(rise<1){c.globalAlpha*=.4+.6*rise;}
  c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+4,y+18,52,14,0,0,PI2);c.fill();
  // Hawk Mama: a giant pig carrying the tavern
  for(const[lx,ph]of[[-30,0],[-12,1.5],[14,3],[32,4.5]]){c.fillStyle='#d88a9a';c.beginPath();c.roundRect(x+lx-6,y+2,12,18,4);c.fill();c.strokeStyle='#5a2a34';c.lineWidth=1.2;c.stroke();c.fillStyle='#5a3a3a';c.fillRect(x+lx-6,y+16,12,4);}
  const g=c.createLinearGradient(0,y-40,0,y+14);g.addColorStop(0,'#f6b6c4');g.addColorStop(1,'#c87888');c.fillStyle=g;c.beginPath();c.ellipse(x,y-10+br,50,26,0,0,PI2);c.fill();c.strokeStyle='#5a2a34';c.lineWidth=1.6;c.stroke();
  c.fillStyle='#f6b6c4';c.beginPath();c.ellipse(x+46,y-6+br,16,15,0,0,PI2);c.fill();c.stroke();c.fillStyle='#e898a8';c.beginPath();c.ellipse(x+58,y-3+br,7,5.5,0,0,PI2);c.fill();c.stroke();
  c.fillStyle='#5a2a34';c.beginPath();c.arc(x+56,y-3+br,1.2,0,PI2);c.arc(x+60,y-3+br,1.2,0,PI2);c.fill();c.fillStyle='#1a1014';c.beginPath();c.arc(x+48,y-12+br,2.2,0,PI2);c.fill();
  c.fillStyle='#f6b6c4';c.beginPath();c.moveTo(x+38,y-18+br);c.lineTo(x+34,y-30+br);c.lineTo(x+44,y-21+br);c.closePath();c.fill();c.stroke();
  // the tavern
  const tx=x-30,ty=y-74+br;c.fillStyle='#8a5a32';c.fillRect(tx,ty+20,60,34);c.strokeStyle='#3a2210';c.lineWidth=1.4;c.strokeRect(tx,ty+20,60,34);
  c.strokeStyle='rgba(58,34,16,.5)';c.lineWidth=.8;for(let i=1;i<5;i++){c.beginPath();c.moveTo(tx,ty+20+i*7);c.lineTo(tx+60,ty+20+i*7);c.stroke();}
  c.fillStyle='#3a6a3a';c.beginPath();c.moveTo(tx-6,ty+22);c.lineTo(tx+30,ty-6);c.lineTo(tx+66,ty+22);c.closePath();c.fill();c.strokeStyle='#1a3a1a';c.stroke();
  c.fillStyle='#5a3a1a';c.fillRect(tx+44,ty-4,7,14);c.fillStyle='#ffe9a0';for(const wx of[tx+8,tx+40]){c.fillRect(wx,ty+28,12,10);}c.fillStyle='#4a2a14';c.fillRect(tx+24,ty+34,12,20);
  if(!ghost&&Math.sin(a*2)>0)part('smoke',tx+47,ty-6,rr(-6,6),-20,1.2,rr(4,7));
  c.fillStyle='#e8c040';c.fillRect(tx+16,ty+12,28,8);c.fillStyle='#3a2210';c.font='bold 6px Chakra Petch, sans-serif';c.textAlign='center';c.fillText('BOAR HAT',tx+30,ty+18.2);
  c.restore();}
// ---- Liones' special building, events colours, menu helpers ----
{const _sb=updSpecialB;updSpecialB=function(b,dt){_sb(b,dt);if(NET.client||b.key!=='unique'||b.fac!=='sds'||b.rise<1)return;if(b.uT>=50){b.uT=0;const u=spawnFrom(b,'inf2');if(u)part('flash',u.x,u.y-16,0,0,.4,40,'#7adf6a');}};}
