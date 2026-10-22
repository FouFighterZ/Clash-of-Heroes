// ===== Content expansion: new buildings, troops, heroes, abilities and research =====
// ---- buildings ----
Object.assign(BDEF,{
  lab:{key:'lab',w:2,h:2,hp:1100,cost:1000,time:16,pow:-40,sight:6,req:['factory'],names:{dbz:'Laboratoire du Dr Brief',mha:'Département support',aot:'Bureau de recherche'},desc:'Débloque les améliorations de ton armée. Sélectionne-le pour lancer une recherche.'},
  radar:{key:'radar',w:2,h:2,hp:900,cost:800,time:12,pow:-30,sight:13,req:['refinery'],names:{dbz:'Dragon Radar',mha:'Centre de surveillance',aot:'Tour de guet'},desc:'Vision très étendue. Affiche sur la minicarte toutes les unités ennemies, les Dragon Balls et les objets rares.'},
  def2:{key:'def2',w:2,h:2,hp:2200,cost:1200,time:16,pow:-45,sight:9,req:['lab'],wpn:{dmg:85,range:300,rof:2.4,splash:40},names:{dbz:'Canon à Ki lourd',mha:'Bastion de Cementoss',aot:'Batterie de rempart'},desc:'Défense lourde à longue portée, dégâts de zone. Idéale contre les blindés et les géants.'},
});
const B_MAIN=['power','refinery','barracks','factory','lab','temple'],B_DEF=['turret','def2','radar'];
// ---- units ----
const NEWU={
 dbz:{
  inf3:{name:'Guerrier namek',cost:260,time:8,hp:320,speed:62,dmg:20,range:40,rof:1,melee:true,size:8,sight:6,look:'namekw',regen:4,desc:'Bras extensibles : frappe au corps à corps à distance. Se régénère.'},
  inf4:{name:'Androïde de combat',cost:450,time:11,hp:440,speed:58,dmg:26,range:165,rof:1.2,proj:'laser',size:8,sight:7,look:'android',vsB:.9,desc:'Énergie infinie : rayons laser précis, très résistant.'},
  mech:{name:'Robot Capsule géant',cost:1300,time:20,hp:2300,speed:34,dmg:90,range:230,rof:2.4,proj:'shell',splash:50,size:20,sight:8,at:'factory',veh:true,mech:true,vsB:1.5,req:['lab'],desc:'Mécha lourd de la Capsule Corp. Puissance de feu dévastatrice.'},
  trunks:{name:'Future Trunks',hero:true,cost:1900,time:28,hp:1550,speed:94,dmg:55,range:20,rof:.65,melee:true,size:10,look:'trunks',saiyan:true,
    ab:{name:'Coup d’épée foudroyant',type:'slash',cd:16,dmg:470,range:300,w:42,shout:'HAAAA !!',col:'#a8d8ff'},desc:'Épéiste Saiyan venu du futur. Tranche tout sur une ligne.'},
  tien:{name:'Tien',hero:true,cost:1500,time:24,hp:1450,speed:84,dmg:42,range:140,rof:.9,proj:'ki',fly:true,size:10,look:'tien',
    ab:{name:'Tri-Beam',type:'crush',cd:22,dmg:420,range:280,rad:85,stun:1.8,shout:'TRI-BEAM !!',col:'#ffe95a'},desc:'Écrase une zone sous une pression de Ki et étourdit les ennemis.'},
  bulma:{name:'Bulma',hero:true,cost:1000,time:18,hp:750,speed:80,dmg:16,range:130,rof:.9,proj:'bullet',size:8,look:'bulma',builder:true,
    ab:{name:'Capsule-tourelle',type:'capsule',cd:35,range:200,shout:'HOI POI !',col:'#ff8a1f'},desc:'Génie de la Capsule Corp : déploie une tourelle instantanément et répare les bâtiments proches.'},
 },
 mha:{
  inf3:{name:'Héros professionnel',cost:280,time:9,hp:370,speed:62,dmg:18,range:22,rof:.8,melee:true,size:8,sight:6,look:'prohero',root:.25,desc:'Pro des arrestations : ses coups peuvent immobiliser l’ennemi un instant.'},
  inf4:{name:'Tireur de la support-team',cost:360,time:10,hp:220,speed:58,dmg:40,range:235,rof:2.2,proj:'laser',size:8,sight:9,look:'supporter',vsB:.8,desc:'Fusil de précision prototype : très longue portée.'},
  mech:{name:'Robot Zéro-Point',cost:1300,time:20,hp:3000,speed:30,dmg:105,range:44,rof:1.8,melee:true,splash:60,size:24,sight:8,at:'factory',veh:true,mech:true,vsB:1.4,req:['lab'],desc:'Le robot géant de l’examen d’entrée. Écrase tout à son passage.'},
  endeavor:{name:'Endeavor',hero:true,cost:2300,time:32,hp:2000,speed:78,dmg:58,range:150,rof:1,proj:'fire',splash:22,size:11,look:'endeavor',
    ab:{name:'Jet Burn',type:'beam',cd:22,dmg:480,range:280,len:390,w:46,shout:'JET BURN !!',col:'#ff7a2a'},desc:'Le héros numéro 2. Flammes à distance et rayon de feu dévastateur.'},
  kirishima:{name:'Eijiro Kirishima',hero:true,cost:1300,time:22,hp:1900,speed:80,dmg:36,range:20,rof:.8,melee:true,size:10,look:'kirishima',
    ab:{name:'Durcissement Ultime',type:'harden',cd:24,dur:7,rad:170,shout:'UNBREAKABLE !!',col:'#ff5a3a'},desc:'Devient quasi invulnérable et attire l’attention des ennemis proches.'},
  hawks:{name:'Hawks',hero:true,cost:1800,time:26,hp:1250,speed:115,dmg:30,range:165,rof:.7,proj:'feather',fly:true,size:9,look:'hawks',
    ab:{name:'Plumes acérées',type:'feathers',cd:18,dmg:65,n:12,range:300,rad:110,shout:'TROP LENT !',col:'#ff3a3a'},desc:'Le héros ailé numéro 3. Vole très vite et crible une zone de plumes.'},
 },
 aot:{
  inf3:{name:'Fusilier de la Garnison',cost:150,time:5,hp:125,speed:58,dmg:12,range:150,rof:1.2,proj:'bullet',size:7,sight:7,look:'garrison',desc:'Soldat des murs, bon marché, tire à distance.'},
  inf4:{name:'Brigade anti-personnel',cost:420,time:11,hp:230,speed:70,dmg:30,range:130,rof:.9,proj:'bullet',size:8,sight:8,look:'kenny',odm:true,desc:'Équipement tridimensionnel à armes à feu : traque l’infanterie ennemie.'},
  mech:{name:'Canon anti-titan lourd',cost:1100,time:18,hp:950,speed:26,dmg:150,range:340,rof:4,proj:'shell',splash:52,size:16,sight:9,at:'factory',veh:true,heavy:true,vsB:1.6,antiBig:1.5,req:['lab'],desc:'Pièce d’artillerie colossale à portée extrême.'},
  erwin:{name:'Erwin Smith',hero:true,cost:1700,time:26,hp:1300,speed:90,dmg:38,range:18,rof:.7,melee:true,size:9,look:'erwin',odm:true,nape:true,
    ab:{name:'Dévouez vos cœurs !',type:'rally',cd:30,dur:12,rad:280,shout:'DÉVOUEZ VOS CŒURS !!',col:'#6fa4ff'},desc:'Commandant du Bataillon : galvanise toutes les troupes alliées proches.'},
  reiner:{name:'Reiner Braun',hero:true,cost:2000,time:30,hp:1500,speed:82,dmg:42,range:18,rof:.75,melee:true,size:9,look:'reiner',odm:true,
    ab:{name:'Titan Cuirassé',type:'shift',cd:50,dur:26,form:'armored',range:0,shout:'TITAN CUIRASSÉ !!',col:'#f0e0b0'},desc:'Se transforme en Titan Cuirassé : armure qui réduit fortement les dégâts.'},
  sasha:{name:'Sasha Braus',hero:true,cost:1100,time:18,hp:950,speed:92,dmg:40,range:205,rof:1.4,proj:'arrow',size:8,look:'sasha',odm:true,
    ab:{name:'Flèche perçante',type:'snipe',cd:14,dmg:620,range:400,shout:'DANS LE MILLE !',col:'#ffcf8a'},desc:'Archère d’élite : tir unique dévastateur à très longue portée.'},
 }};
for(const f in NEWU)for(const k in NEWU[f]){const D=NEWU[f][k];D.key=k;D.fac=f;D.sight=D.sight||(D.hero?9:6);D.sightPx=D.sight*TILE;D.size=D.size||8;
  D.at=D.at||(D.hero?'temple':'barracks');D.rof=D.rof||1;D.req=D.req||[];if(D.hero)D.req=['temple'];UDEF[f][k]=D;if(D.hero)FAC[f].heroes.push(k);}
Object.assign(PSPD,{laser:760,feather:640,arrow:820});
FORMS.armored={look:'titan_armored',sc:2.7,size:21,speed:62,dmg:85,range:30,rof:1.2,melee:true,splash:34,shield:2400,armor:.55,sightPx:11*TILE};
// ---- research ----
const UPG={
 dbz:[{id:'grav',name:'Gravité ×100',desc:'Infanterie : +25 % de vie',cost:900,time:25,cls:'inf',hp:1.25},{id:'armor',name:'Armures Saiyan',desc:'Héros : +25 % de vie',cost:1200,time:30,cls:'hero',hp:1.25},
   {id:'scouter',name:'Scouters',desc:'Toutes les unités : +15 % de dégâts',cost:1100,time:28,cls:'all',dmg:1.15},{id:'caps',name:'Capsules améliorées',desc:'Véhicules : +25 % de dégâts et de vie',cost:1000,time:26,cls:'veh',dmg:1.25,hp:1.25}],
 mha:[{id:'costume',name:'Costumes renforcés',desc:'Infanterie : +25 % de vie',cost:900,time:25,cls:'inf',hp:1.25},{id:'train',name:'Entraînement intensif',desc:'Toutes les unités : +15 % de dégâts',cost:1100,time:28,cls:'all',dmg:1.15},
   {id:'gear',name:'Équipements de support',desc:'Toutes les unités : +15 % de vitesse',cost:900,time:24,cls:'all',speed:1.15},{id:'rescue',name:'Programme de sauvetage',desc:'Soins +60 % et réparation auto des bâtiments',cost:1000,time:26,cls:'all',heal:1.6,selfrep:true}],
 aot:[{id:'gas',name:'Gaz haute pression',desc:'Unités tridimensionnelles : +20 % de vitesse',cost:900,time:24,cls:'odm',speed:1.2},{id:'blades',name:'Lames en acier trempé',desc:'Corps à corps : +25 % de dégâts',cost:1000,time:26,cls:'melee',dmg:1.25},
   {id:'spears',name:'Lances-foudre améliorées',desc:'Unités à distance : +25 % de dégâts',cost:1100,time:28,cls:'ranged',dmg:1.25},{id:'walls',name:'Murailles renforcées',desc:'Bâtiments : +40 % de vie',cost:1000,time:26,cls:'bld',hp:1.4}]};
const UPG_BY_ID={};for(const f in UPG)for(const u of UPG[f])UPG_BY_ID[u.id]=u;
function upCls(e,cls){if(cls==='bld')return e.isB;if(!e.isU)return false;const D=e.D;switch(cls){case'all':return!D.harv;case'inf':return!D.veh&&!D.hero;case'veh':return!!D.veh;case'hero':return!!D.hero;
  case'odm':return!!D.odm;case'melee':return!!D.melee;case'ranged':return!D.melee&&!!D.dmg;}return false;}
function upMul(e,stat){const s=sides[e.side];if(!s||!s.ups)return 1;let m=1;for(const id of s.ups){const u=UPG_BY_ID[id];if(u[stat]&&upCls(e,u.cls))m*=u[stat];}return m;}
function applyHpUp(e,u){if(!u.hp||!upCls(e,u.cls))return;e.max=Math.round(e.max*u.hp);e.hp=Math.min(e.max,e.hp*u.hp);}
function startResearch(si,id){const s=sides[si],u=UPG_BY_ID[id];s.ups=s.ups||[];if(s.res||s.ups.includes(id)||!has(si,'lab')||s.credits<u.cost)return false;s.credits-=u.cost;s.res={id,prog:0};return true;}
function updResearch(si,dt){const s=sides[si];if(!s.res)return;if(!has(si,'lab'))return;s.res.prog+=dt*(s.use>s.pow?.45:1)*(has(si,'lab+')?2:1)/UPG_BY_ID[s.res.id].time;
  if(s.res.prog>=1){const u=UPG_BY_ID[s.res.id];s.ups=s.ups||[];s.ups.push(u.id);s.res=null;for(const e of ents)if(!e.dead&&e.side===si)applyHpUp(e,u);
    if(si===PL){msg('Recherche terminée : '+u.name+' ('+u.desc+')','#6fd8ff');banner(u.name.toUpperCase(),'#6fd8ff');sfx('rankup');announce('Recherche terminée');}}}
// ---- abilities ----
function execAbility2(u,c,ab,dx,dy,L){switch(ab.type){
  case'crush':{let x=c.x,y=c.y;splashDmg(x,y,ab.rad,ab.dmg*dmgMult(u),u.side,60,.7,u);for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&hyp(e.x-x,e.y-y)<ab.rad+e.r){e.freeze=Math.max(e.freeze,ab.stun*(e.D.hero?.5:1));e.path=null;}
    fxBoom(x,y,ab.rad*.8,ab.col,true);for(let k=0;k<3;k++)fxRing(x,y,ab.col,ab.rad*(.6+k*.3));part('flash',x,y-20,0,0,.4,ab.rad*2,ab.col);scorch(x,y,ab.rad,.6);shake(11);sfx('big',x,y);return true;}
  case'capsule':{let tx=tileOf(c.x),ty=tileOf(c.y);let ok=null;for(let r=0;r<=3&&!ok;r++)for(let yy=ty-r;yy<=ty+r&&!ok;yy++)for(let xx=tx-r;xx<=tx+r&&!ok;xx++){
      if(xx<1||yy<1||xx>=MW-1||yy>=MH-1||blocked[ti(xx,yy)]||ore[ti(xx,yy)]>0)continue;if(ents.some(e=>e.isU&&!e.dead&&!e.fly&&tileOf(e.x)===xx&&tileOf(e.y)===yy))continue;ok=[xx,yy];}
    if(ok){const b=mkBuilding(u.side,'turret',ok[0],ok[1],false);b.rise=.6;for(let k=0;k<20;k++)part('smoke',b.x+rr(-14,14),b.y+rr(-10,10),rr(-30,30),rr(-40,-5),1,rr(8,14));sfx('place',b.x,b.y);}
    else u.abCd=2;return true;}
  case'harden':{u.harden=ab.dur;fxRing(u.x,u.y,ab.col,60);part('flash',u.x,u.y-16,0,0,.3,60,ab.col);for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&!e.D.harv&&hyp(e.x-u.x,e.y-u.y)<ab.rad){e.target=u;if(e.order&&e.order.type!=='move')e.order={type:'attack',target:u};}
    sfx('transform',u.x,u.y);return true;}
  case'feathers':{const tg=ents.filter(e=>!e.dead&&!ally(e.side,u.side)&&hyp(e.x-c.x,e.y-c.y)<ab.rad+(e.isB?e.w*16:e.r));for(let i=0;i<ab.n;i++){setTimeoutG(()=>{if(u.dead)return;const t=tg.length?tg[i%tg.length]:null;
      if(t&&!t.dead)spawnProj(u,t,ab.dmg*dmgMult(u),'feather','#ff3a3a',0);else spawnProj(u,null,ab.dmg*dmgMult(u),'feather','#ff3a3a',14,c.x+rr(-ab.rad,ab.rad)*.7,c.y+rr(-ab.rad,ab.rad)*.5);sfx('whoosh',u.x,u.y);},i*.06);}return true;}
  case'rally':{for(const e of ents)if(!e.dead&&e.isU&&ally(e.side,u.side)&&!e.D.harv&&hyp(e.x-u.x,e.y-u.y)<ab.rad){e.rally=ab.dur;e.hp=Math.min(e.max,e.hp+e.max*.2);fxRing(e.x,e.y,ab.col,18);}
    fxRing(u.x,u.y,ab.col,ab.rad*.8);part('flash',u.x,u.y-20,0,0,.4,90,ab.col);sfx('rankup',u.x,u.y);return true;}
  case'snipe':{let best=null,bd=80;for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const d=hyp(e.x-c.x,e.y-c.y)-(e.isB?e.w*14:e.r);if(d<bd){bd=d;best=e;}}
    if(best){const p=spawnProj(u,best,ab.dmg*dmgMult(u)*(isBig(best)?1.5:1)*(best.isB?.6:1),'arrow','#ffe0a0',0);p.spd=1100;p.big=true;}sfx('whoosh',u.x,u.y);return true;}
  }return false;}
// ---- per-unit passives (called each update) ----
function updPassives(u,dt){if(u.harden>0){u.harden-=dt;if(R()<dt*10)part('spark',u.x+rr(-8,8),u.y-rr(10,30),0,-20,.3,1.5,'#ff8a5a');}
  if(u.rally>0){u.rally-=dt;if(R()<dt*4)part('spark',u.x+rr(-6,6),u.y-rr(10,24),0,-30,.5,1.5,'#6fa4ff');}
  if(u.D.builder){u.bT=(u.bT||0)-dt;if(u.bT<=0){u.bT=1;for(const b of ents)if(b.isB&&!b.dead&&ally(b.side,u.side)&&b.hp<b.max&&hyp(b.x-u.x,b.y-u.y)<170){b.hp=Math.min(b.max,b.hp+30);if(R()<.5)part('spark',b.x+rr(-10,10),b.y-10,0,-30,.5,2,'#7dff9a');}}}}
function selfRepair(dt){for(const s of PSIDES){if(!sides[s].ups||!sides[s].ups.includes('rescue'))continue;for(const b of ents)if(b.isB&&!b.dead&&b.side===s&&b.hp<b.max)b.hp=Math.min(b.max,b.hp+6*dt);}}
// ---- looks ----
Object.assign(LOOK,{
  namekw:{k:'namekw',skin:'#63c04c',hair:'namek',gi:'#6a2c8c',gi2:'#3a8fd6',boots:'#7a3a1a',arms:'skin',eye:'#1b1822',cape:'#f2f2ee'},
  android:{k:'android',skin:'#f0d2b4',hair:'short',hc:'#e8762a',gi:'#6f8a7a',gi2:'#2a2a30',pants:'#3a3a44',boots:'#8a5a2a',arms:'skin',eye:'#d8343f',wrist:'#2a2a30'},
  trunks:{k:'trunks',skin:'#f3c9a0',hair:'trunks',hc:'#c4a8e6',gi:'#2f4a8a',gi2:'#2a2a30',pants:'#5a5a66',boots:'#e3c13b',arms:'gi',eye:'#5a8ad8',sword:true},
  tien:{k:'tien',skin:'#f3c9a0',hair:'bald',gi:'#2f7a46',gi2:'#d8343f',pants:'#e8e2c8',boots:'#2a2a30',arms:'skin',eye:'#1b1822',third:true,wrist:'#2a2a30'},
  bulma:{k:'bulma',skin:'#f6d2b4',hair:'bulma',hc:'#3aa8d8',gi:'#e85a8a',gi2:'#f2f2f2',pants:'#3a4a8a',boots:'#d8343f',arms:'skin',eye:'#3a6ad6'},
  prohero:{k:'prohero',skin:'#e8c8a0',hair:'short',hc:'#3a2a1a',gi:'#8a5a32',gi2:'#5a3a1a',pants:'#7a4a2a',boots:'#4a2a14',arms:'gi',eye:'#2a2230',mask:true,wood:true},
  supporter:{k:'supporter',skin:'#f3c9a0',hair:'short',hc:'#ff7ab8',gi:'#f2c230',gi2:'#3a3a44',pants:'#d8a820',boots:'#3a3a44',arms:'gi',eye:'#e8a020',goggles:true},
  kirishima:{k:'kirishima',skin:'#f3c9a0',hair:'kirishima',hc:'#d8343f',gi:'#2a2a30',gi2:'#d8343f',pants:'#2a2a30',boots:'#2a2a30',arms:'skin',eye:'#d8343f',bare:true},
  hawks:{k:'hawks',skin:'#f3c9a0',hair:'recruit',hc:'#f2d060',gi:'#8a5a32',gi2:'#2a2a30',pants:'#2a2a30',boots:'#2a2a30',arms:'gi',eye:'#e8a020',wings:'#d8242e',goggles:true},
  garrison:Object.assign({},SC,{k:'garrison',hair:'short',hc:'#8a6a3a',cape:null,armband:'#c8343f'}),
  kenny:Object.assign({},SC,{k:'kenny',hair:'short',hc:'#2a2a30',gi:'#24242c',pants:'#2a2a34',cape:null,hat:true}),
  erwin:Object.assign({},SC,{k:'erwin',hair:'erwin',hc:'#f0d27a',eye:'#4a8ad8',cravat:true}),
  reiner:Object.assign({},SC,{k:'reiner',hair:'recruit',hc:'#e8c860',eye:'#c8a040'}),
  sasha:Object.assign({},SC,{k:'sasha',hair:'hange',hc:'#7a4a24',eye:'#7a4a24',bow:true}),
  titan_armored:{k:'titan_armored',skin:'#d8a888',gi:'#ece2cc',gi2:'#d8ccb0',pants:'#e2d6bc',boots:'#c8bca0',arms:'skin',hair:'titan_armored',hc:'#e8c860',eye:'#f4f0e0',titan:true,plates:true},
});
Object.assign(HAIR,{trunks:HAIR.mikasa,bulma:HAIR.hange,erwin:HAIR.levi,titan_armored:HAIR.recruit,
  kirishima:[[-6,1],[-8.5,-3],[-6,-5],[-8,-10],[-3.5,-7.5],[-2.5,-13],[0,-8],[2.5,-13],[3.5,-7.5],[7.5,-10],[6,-4],[8,-2],[5.8,.6],[3.6,-2.6],[1.6,-1.4],[-.6,-3],[-3.2,-2.2]]});
// extra costume details (called from drawFighter)
function moreCostume(c,L,k,bw,top,bob){const B=-9.4+bob;
  if(L.wood){c.strokeStyle='rgba(60,30,10,.55)';c.lineWidth=.7;c.beginPath();for(let i=-3;i<=3;i+=2){c.moveTo(i,top+1);c.quadraticCurveTo(i+1.5,top+5,i,B);}c.stroke();}
  if(L.bare){c.fillStyle=L.skin;c.beginPath();c.moveTo(-4.6,top);c.lineTo(4.6,top);c.lineTo(3.8,B-2);c.lineTo(-3.8,B-2);c.closePath();c.fill();c.strokeStyle='rgba(120,70,50,.5)';c.lineWidth=.6;c.beginPath();c.moveTo(0,top+2);c.lineTo(0,B-3);c.moveTo(-3,top+5);c.quadraticCurveTo(0,top+6.5,3,top+5);c.stroke();
    c.fillStyle='#d8343f';c.fillRect(-4.6,B-2.4,9.2,2);}
  if(L.plates){c.fillStyle='rgba(255,250,235,.85)';c.strokeStyle='rgba(120,100,70,.7)';c.lineWidth=.6;for(const[x,y,w,h]of[[-4.5,top+.5,4,4],[.5,top+.5,4,4],[-3.5,top+5,7,3]]){c.beginPath();c.roundRect(x,y,w,h,1);c.fill();c.stroke();}}
  if(k==='trunks'){c.fillStyle='#2a2a30';c.beginPath();c.moveTo(-2,top);c.lineTo(2,top);c.lineTo(0,top+4);c.fill();c.fillStyle='#e8e8e8';c.font='bold 2.6px sans-serif';c.fillText('CC',2.2,top+3);}
  if(k==='tien'){c.fillStyle='#d8343f';c.fillRect(-4.6,B-2.4,9.2,2);}
  if(k==='bulma'){c.fillStyle='#f2f2f2';c.fillRect(-4.6,top+4,9.2,1.2);}
  if(k==='kenny'){c.fillStyle='#3a3a44';c.beginPath();c.moveTo(-5.4,top+1);c.lineTo(-6.6,B+4);c.lineTo(6.6,B+4);c.lineTo(5.4,top+1);c.closePath();c.fill();}}
function moreHead(c,L,k,hx,hy){if(L.third){c.fillStyle='#fff';c.beginPath();c.ellipse(hx+2.6,hy-3.6,.9,1.2,0,0,PI2);c.fill();c.fillStyle='#1b1822';c.beginPath();c.ellipse(hx+2.8,hy-3.5,.45,.7,0,0,PI2);c.fill();}
  if(L.hat){c.fillStyle='#1a1a20';c.beginPath();c.ellipse(hx,hy-5.4,8.6,2.2,0,0,PI2);c.fill();c.beginPath();c.roundRect(hx-4.6,hy-11,9.2,6,2);c.fill();c.fillStyle='#5a5a66';c.fillRect(hx-4.6,hy-6.8,9.2,1.2);}}
function backItems(c,L,k,bw,top,t,walk){if(L.wings){for(const s of[-1,1]){c.save();c.translate(-1,top+2);c.scale(s===-1?1:.75,1);c.rotate(s===-1?-.35:.2);c.beginPath();c.moveTo(0,0);
      for(let i=0;i<=6;i++){const a=-PI*.9+i*PI*.13;c.lineTo(Math.cos(a)*(16+Math.sin(t*6+i)*1.5)-2,Math.sin(a)*12-2);}c.closePath();c.fillStyle=cel(c,L.wings,-16,-10,0,4,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=.8;c.stroke();c.restore();}}
  if(L.sword){c.strokeStyle='#5a5a66';c.lineWidth=2;c.beginPath();c.moveTo(-5,top+9);c.lineTo(3,top-7);c.stroke();c.fillStyle='#8a5a32';c.fillRect(1.6,top-9,2.6,3);}
  if(L.bow){c.strokeStyle='#7a4a24';c.lineWidth=1.2;c.beginPath();c.arc(-4,top+4,7,-PI*.45,PI*.45);c.stroke();}}
// ---- mech and heavy vehicles ----
function drawMech(c,u,x,y,ghost){const f=u.fac,t=u.moving?u.anim:0,st=Math.sin(t*5);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x+6,y+4,u.r*1.2,u.r*.6,0,0,PI2);c.fill();
  if(f==='dbz'){for(const s of[-1,1])box3(c,x-12+s*0+ (s>0?14:0),y-4+(s>0?st:-st)*3,8,8,0,16,'#c8ced8');box3(c,x-16,y-10,32,18,16,22,"#eef1f5");
    onFront(c,x-16,y-10,18,16,k=>{k.fillStyle='#ff8a1f';k.fillRect(0,-12,32,3);k.fillStyle='#2a64c8';k.beginPath();k.arc(16,-17,4,0,PI2);k.fill();k.fillStyle='#fff';k.font='bold 4px sans-serif';k.textAlign='center';k.fillText('CC',16,-15.5);});
    dome3(c,x-2,y-2,9,38,9,'#9ad8ff');const a=u.tang||u.ang;for(const s of[-1,1]){const ox=-Math.sin(a)*14*s,oy=Math.cos(a)*14*s*.6;pipe3(c,[x+ox,y+oy,30],[x+ox+Math.cos(a)*20,y+oy+Math.sin(a)*20,30],2.6,'#6a707a');}}
  else{const H=64;box3(c,x-18,y-8,36,16,0,10,'#40464c');for(let i=0;i<7;i++){const p=P3(x-18+i*6+((t*20)%6),y+8,2);c.fillStyle='#22262a';c.fillRect(p[0],p[1]-6,3,6);}
    box3(c,x-14,y-6,28,14,10,34,'#7a9476');onFront(c,x-14,y-6,14,10,k=>{k.fillStyle='#d8c04a';k.fillRect(0,-30,28,3);text3(k,'0',14,-16,16,'#fff','#2a3a2a');});
    box3(c,x-9,y-3,18,10,44,16,'#8aa486');const e=P3(x+2,y+7,52);glow3(c,x+2,y+7,52,12,'#ff3a2a',.9);c.fillStyle='#ff3a2a';c.beginPath();c.arc(e[0],e[1],3,0,PI2);c.fill();
    for(const s of[-1,1]){const sw=u.atk>0?Math.sin(u.atk*20)*6:0;box3(c,x+s*20-4,y-4+sw,8,8,18,24,'#6a8466');}}}
function drawHeavyCannon(c,u,x,y){const t=u.moving?u.anim:0;c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+4,y+4,u.r*1.3,u.r*.7,0,0,PI2);c.fill();c.save();c.translate(x,y);c.rotate(u.ang);
  for(const s of[-1,1]){c.beginPath();c.arc(-6,s*12,7,0,PI2);fo(c,'#5a3a20');c.strokeStyle='#2a1a10';c.lineWidth=.9;c.beginPath();for(let a=0;a<PI2;a+=PI/5){c.moveTo(-6,s*12);c.lineTo(-6+Math.cos(a+t*4)*7,s*12+Math.sin(a+t*4)*7);}c.stroke();}
  c.beginPath();c.rect(-20,-6,24,12);fo(c,'#7a5032');c.restore();c.save();c.translate(x,y);c.rotate(u.tang||u.ang);c.translate(-(u.recoil||0)*4,0);c.beginPath();c.roundRect(-10,-4.5,36,9,4);fo(c,'#2a2a30');c.fillStyle='#55555c';c.fillRect(-8,-4.5,4,9);c.fillRect(20,-5.5,4,11);c.restore();}
// ---- new building visuals ----
function drawB3x(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,cy=y0+H/2,a=b.anim||0,k=b.key,f=b.fac,fc=FAC[f].col;plinth(c,x0,y0,W,H,fc);
 if(f==='dbz'){
  if(k==='lab'){box3(c,x0+6,y0+22,40,30,4,26,'#eef1f5');onFront(c,x0+6,y0+22,30,4,x=>{winGrid(x,3,8,34,12,4,1,'#4a8ad8',(i)=>Math.sin(a+i)>.4);x.fillStyle='#ff8a1f';x.fillRect(0,-24,40,2);});
    dome3(c,x0+24,y0+36,12,30,12,'#d8eefc');cyl3(c,x0+50,y0+30,6,4,30,'#dfe5ec');sphere3(c,x0+50,y0+30,5,34,'#9ad8ff');glow3(c,x0+50,y0+30,39,10,'#6fd8ff',.6+.3*Math.sin(a*4));}
  else if(k==='radar'){cyl3(c,cx,cy+4,14,4,14,'#e6ebf2');band3(c,cx,cy+4,14,10,'#ff8a1f',2);line3(c,[cx,cy+4,18],[cx,cy+4,36],'#8a929c',2);const r=a*1.5,p=P3(cx,cy+4,38);
    c.save();c.translate(p[0],p[1]);c.rotate(r);c.beginPath();c.ellipse(0,0,14,5,0,0,PI2);const g=c.createLinearGradient(-14,0,14,0);g.addColorStop(0,'#f4f6fa');g.addColorStop(1,'#9aa4b0');c.fillStyle=g;c.fill();c.strokeStyle=LINE;c.stroke();c.restore();
    sphere3(c,cx+12,cy-8,5,4,'#2a3a2a');glow3(c,cx+12,cy-8,9,8,'#7dff6a',.8);const q=P3(cx+12,cy-8,9);c.fillStyle='#ffd23a';c.beginPath();c.arc(q[0]+Math.cos(a*2)*2,q[1]+Math.sin(a*2)*1.5,1.3,0,PI2);c.fill();}
  else if(k==='def2'){cyl3(c,cx,cy+4,20,4,14,'#c8ced8');band3(c,cx,cy+4,20,10,'#ff8a1f',3);sphere3(c,cx,cy+4,14,16,'#f4f6fa');const tz=34,t=b.tang;pipe3(c,[cx,cy+4,tz],[cx+Math.cos(t)*30,cy+4+Math.sin(t)*30,tz],4,'#5a606a');
    glow3(c,cx+Math.cos(t)*30,cy+4+Math.sin(t)*30,tz,12,'#ffb030',.6+.3*Math.sin(a*6));}
 }else if(f==='mha'){
  if(k==='lab'){box3(c,x0+6,y0+20,52,32,4,30,'#c8d2dc');onFront(c,x0+6,y0+20,32,4,x=>{winGrid(x,3,10,46,14,6,1,'#4a7aa8',(i)=>Math.sin(a*1.3+i)>.3);x.fillStyle='#2fd27a';x.fillRect(0,-28,52,2);});
    onSide(c,x0+6,y0+20,52,32,4,x=>winGrid(x,3,10,26,14,3,1,'#2a4a6a',null,true));const gp=P3(x0+30,y0+30,36);c.save();c.translate(gp[0],gp[1]);c.rotate(-a);c.fillStyle='#f2c230';for(let i=0;i<8;i++){c.rotate(PI/4);c.fillRect(-1.5,-8,3,3);}c.beginPath();c.arc(0,0,5.5,0,PI2);c.fill();c.restore();}
  else if(k==='radar'){box3(c,x0+10,y0+24,30,26,4,46,'#9aa6b0');onFront(c,x0+10,y0+24,26,4,x=>winGrid(x,3,6,24,36,3,4,'#3a6a9a',(i,j)=>Math.sin(a+i+j)>.5));
    line3(c,[x0+25,y0+36,50],[x0+25,y0+36,70],'#6a7078',1.6);beacon(c,x0+25,y0+36,71,a);const p=P3(x0+50,y0+30,24);c.save();c.translate(p[0],p[1]);c.rotate(Math.sin(a)*.6);c.fillStyle='#e8ecf0';c.beginPath();c.arc(0,0,8,PI*.1,PI*.9);c.fill();c.strokeStyle=LINE;c.stroke();c.restore();line3(c,[x0+50,y0+30,4],[x0+50,y0+30,20],'#6a7078',2);}
  else if(k==='def2'){box3(c,x0+4,y0+14,56,40,4,18,'#b8b0a4');stoneLines(c,x0+4,y0+14,56,40,4,18);box3(c,x0+16,y0+24,32,22,22,10,'#9a948a');const t=b.tang;
    for(const s of[-1,1]){const ox=-Math.sin(t)*5*s,oy=Math.cos(t)*5*s;pipe3(c,[cx+ox,cy+oy,30],[cx+ox+Math.cos(t)*26,cy+oy+Math.sin(t)*26,30],2.4,'#40464c');}}
 }else{
  if(k==='lab'){box3(c,x0+8,y0+22,44,30,4,24,'#a07a4a');woodLines(c,x0+8,y0+22,44,30,4,24);gable3(c,x0+8,y0+22,44,30,28,12,'#5a5a64','#a07a4a');
    onFront(c,x0+8,y0+22,30,4,x=>{for(let i=0;i<3;i++)glass(x,5+i*13,-16,7,9,'#5a4a3a',Math.sin(a*2+i)>0);});for(let i=0;i<3;i++)cyl3(c,x0+52,y0+20+i*10,3,4,6,['#3aa86a','#d8a020','#8a3ad8'][i]);}
  else if(k==='radar'){for(const[dx,dy]of[[-10,-6],[10,-6],[-10,10],[10,10]])line3(c,[cx+dx,cy+dy,4],[cx+dx*.5,cy+dy*.5,50],'#6a4526',2.4);box3(c,cx-12,cy-10,24,20,50,10,'#8a5a32');
    gable3(c,cx-12,cy-10,24,20,60,8,'#7a3a2a','#8a5a32');flag3(c,cx+10,cy-6,68,a,'#2f6a3a');}
  else if(k==='def2'){box3(c,x0+4,y0+12,56,44,4,24,'#a39a8a');stoneLines(c,x0+4,y0+12,56,44,4,24);crenel(c,x0+4,y0+12,56,44,28,'#b3aa9a',9);const t=b.tang;
    for(const s of[-1,1]){const ox=-Math.sin(t)*8*s,oy=Math.cos(t)*8*s;pipe3(c,[cx+ox,cy+oy,32],[cx+ox+Math.cos(t)*24,cy+oy+Math.sin(t)*24,33],3,'#2a2a30');}}
 }}
const BH_EXTRA={lab:{dbz:52,mha:46,aot:48},radar:{dbz:48,mha:72,aot:76},def2:{dbz:48,mha:40,aot:36}};
