// ===== One upgrade per building: +50 % health and a feature of its own =====
const BFEAT={hq:'Construction des bâtiments 40 % plus rapide.',hq2:'Construction des bâtiments 40 % plus rapide.',power:'Produit 50 % d’énergie en plus.',
  refinery:'Les camions rapportent 25 % de plus, et un camion gratuit est livré.',barracks:'Débloque une nouvelle unité : {elite}.',factory:'Débloque une nouvelle unité : {mech}.',
  turret:'+35 % de dégâts et +10 % de portée.',def2:'+35 % de dégâts et +10 % de portée.',temple:'Débloque l’attaque ultime : {super}.',temple2:'Les légendes sont recrutées deux fois plus vite.',
  lab:'Les recherches vont deux fois plus vite.',radar:'Vision très étendue (×1,8).',market:'Revenus passifs +60 %.',hospital:'Soins 40 % plus puissants.',training:'Expérience gagnée +40 %.',
  unique:'Son effet spécial arrive deux fois plus souvent.',wall:'Mur renforcé : deux fois plus de vie.',armory:'Entraînements des troupes deux fois plus rapides et 30 % moins chers.',
  shrine:'Éveils des héros deux fois plus rapides.',outpost:'Vision doublée et réparation automatique.',drill:'Extraction +30 %.',shieldgen:'Protection portée à 45 % de dégâts en moins.',
  relay:'L’attaque ultime se charge deux fois plus vite.'};
function featText(b){const f=b.fac,t=BFEAT[b.key];if(!t)return'';return t.replace('{elite}',UDEF[f]&&UDEF[f].elite?UDEF[f].elite.name:'unité d’élite')
  .replace('{mech}',UDEF[f]&&UDEF[f].mech?UDEF[f].mech.name:'blindé lourd').replace('{super}',SUPER[f]?SUPER[f].name:'attaque ultime');}
// heavy vehicles now come from the upgraded factory instead of the lab
for(const f in UDEF)if(UDEF[f].mech&&!UDEF[f].mech.hero)UDEF[f].mech.req=['factory+'];
// ---- elite infantry unlocked by the upgraded barracks ----
const ELOOK={
  saiyelite:['fsoldier',{hc:'#141418',gi:'#1a2a6a',gi2:'#f2f2ee',pants:'#1a2a6a',armorP:'#f2f2ee',tail:'#6a3a1a'}],
  tophero:['prohero',{gi:'#d8343f',gi2:'#ffd23a',pants:'#2a2a3a',cape:'#d8343f'}],
  levisq:['garrison',{cape:'#1f4a2a',gi:'#6a4a2a'}],
  shelite:['shknight',{plume:'#ff3a3a',armorP:'#5a4a88',helm:'#3a2a5a',glowEye:'#ff5a5a'}],
  ninja:['opmb',{gi:'#1a1a22',gi2:'#5a5a6a',pants:'#1a1a22',boots:'#0e0e12',hc:'#141418',weapon:'katana'}],
  phantom:['nenuser',{gi:'#1a1a22',gi2:'#c070ff',pants:'#22202a',boots:'#121014',hc:'#141418'}]};
for(const k in ELOOK){const[src,o]=ELOOK[k];if(!LOOK[src])continue;LOOK[k]=Object.assign({},LOOK[src],o,{k:LOOK[src].k||src});if(typeof NEWLOOKS!=='undefined')NEWLOOKS.push(k);}
const ELITES={
  dbz:{name:'Guerrier Saiyan d’élite',cost:650,time:14,hp:560,speed:84,dmg:42,range:165,rof:1.1,proj:'ki',fly:true,size:9,sight:8,look:'saiyelite',vsB:.8,desc:'Saiyan en armure de combat : vole et bombarde de Ki. Débloqué par la Salle de gravité améliorée.'},
  mha:{name:'Pro-Héros du Top 10',cost:650,time:14,hp:720,speed:82,dmg:48,range:20,rof:.8,melee:true,splash:22,size:9,sight:7,look:'tophero',desc:'Héros professionnel classé : encaisse énormément et frappe en zone.'},
  aot:{name:'Escouade spéciale de Livaï',cost:600,time:13,hp:430,speed:96,dmg:50,range:22,rof:.55,melee:true,size:8,sight:8,look:'levisq',desc:'Soldats d’élite tridimensionnels : très rapides, redoutables contre les grandes cibles.'},
  sl:{name:'Chevalier d’élite des ombres',cost:650,time:14,hp:780,speed:72,dmg:44,range:22,rof:.8,melee:true,splash:20,size:9,sight:7,look:'shelite',desc:'Garde d’élite de l’armée des ombres, aussi solide qu’Igris.'},
  opm:{name:'Ninja du village caché',cost:600,time:13,hp:420,speed:116,dmg:46,range:20,rof:.5,melee:true,size:8,sight:8,look:'ninja',desc:'Ninja aussi rapide que Sonic : frappe et disparaît avant qu’on ne le voie.'},
  hxh:{name:'Membre de la Brigade fantôme',cost:650,time:14,hp:540,speed:80,dmg:44,range:175,rof:1.1,proj:'ki',pcol:'#c070ff',size:8,sight:8,look:'phantom',vsB:.8,desc:'Voleur de la Brigade fantôme : projette un Nen redoutable à distance.'}};
function addElite(f,D){D.key='elite';D.fac=f;D.at='barracks';D.req=['barracks+'];D.sight=D.sight||7;D.sightPx=D.sight*TILE;D.size=D.size||8;D.rof=D.rof||1;UDEF[f].elite=D;}
for(const f in ELITES)if(UDEF[f])addElite(f,ELITES[f]);
{const _ti=tabItems;tabItems=function(t){const L=_ti(t);if(t==='i'&&UDEF[sides[PL].fac].elite)L.push({isB:false,key:'elite'});return L;};}
if(typeof TUP_KEYS!=='undefined')TUP_KEYS.push('elite');
// ---- per-building features that need a tick: faster special building, self-repairing outposts ----
{const _sb=updSpecialB;updSpecialB=function(b,dt){if(b.key==='unique'&&lvlOf(b)>=2&&b.rise>=1)b.uT=(b.uT||0)+dt;_sb(b,dt);
  if(b.key==='outpost'&&lvlOf(b)>=2&&b.hp<b.max&&!NET.client)b.hp=Math.min(b.max,b.hp+b.max*.01*dt);};}
// ---- AI recruits elites once its barracks is upgraded ----
{const _au=aiUpdate;aiUpdate=function(ai,dt){const t0=ai.t;_au(ai,dt);if(t0>0&&ai.t===t0-dt)return;const si=ai.si,s=sides[si];
  if(s&&UDEF[s.fac].elite&&has(si,'barracks+')&&s.q.barracks.length<2&&s.credits>900&&R()<.35)queueUnit(si,'elite');};}
