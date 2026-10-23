// ===== Solo Leveling & One Punch Man factions: data and unique mechanics =====
var NET=window.NET||{client:false,host:false,applying:false,on:false};window.NET=NET;
FAC.sl={name:'Armée des Ombres',anime:'Solo Leveling',col:'#8a5aff',col2:'#2a2440',money:'Wons',heroes:['jinwoo','igris','beru','chahaein','choi','baek','iron','jinho'],legends:['bellion','thomas','liu','gunhee']};
FAC.opm={name:'Association des Héros',anime:'One Punch Man',col:'#ffc21a',col2:'#d8343f',money:'Yens',heroes:['saitama','genos','tatsumaki','bang','king','mumen','metalbat','fubuki'],legends:['blast','atomic','flash','zombie']};
// ---- buildings ----
const BN={
 hq:['Association des Chasseurs','Siège de l’Association des Héros'],power:['Générateur de mana','Centrale de la Ville Z'],refinery:['Raffinerie de cristaux de mana','Centre de tri des débris de monstres'],
 barracks:['Centre d’évaluation des chasseurs','Bureau d’inscription des héros'],factory:['Repaire des Ombres','Usine de Metal Knight'],turret:['Obélisque runique','Tourelle de Metal Knight'],
 temple:['Guilde Ahjin','Salle des classes S'],wall:['Barrière de mana','Barricade de l’Association'],lab:['Boutique du Système','Laboratoire du Dr Kuseno'],
 radar:['Tour de détection des Portes','Centre de prédiction des catastrophes'],def2:['Statue du Dieu','Canon lourd de Metal Knight'],market:['Bourse des cristaux','Supermarché de la Ville Z'],
 hospital:['Hôpital des chasseurs','Hôpital de l’Association'],training:['Donjon instantané','Parcours d’entraînement de Saitama'],temple2:['Château du Démon','Quartier général des classes S'],
 unique:['Autel des Ombres','Dojo du Poing de l’Eau']};
for(const k in BN){BDEF[k].names.sl=BN[k][0];BDEF[k].names.opm=BN[k][1];}
Object.assign(BDEF.unique.descs,{sl:'Toutes les 50 s, un soldat de l’ombre se lève gratuitement. +6 ombres maximum pour Sung Jinwoo.',opm:'Toutes les 45 s, un disciple de Bang rejoint gratuitement ton armée.'});
const BH2={sl:{hq:96,power:46,refinery:56,barracks:50,factory:52,turret:44,temple:110,wall:30,lab:44,radar:84,def2:62,market:44,hospital:56,training:40,temple2:104,unique:46},
 opm:{hq:134,power:44,refinery:54,barracks:48,factory:58,turret:34,temple:70,wall:24,lab:50,radar:70,def2:42,market:40,hospital:58,training:30,temple2:92,unique:46}};
{const _bH=bH;bH=function(b){const t=BH2[b.fac];if(t)return t[b.key]||44;return _bH(b);};}
// ---- units ----
const MOREU={
 sl:{
  inf1:{name:'Soldat de l’ombre',cost:110,time:5,hp:150,speed:66,dmg:11,range:18,rof:.8,melee:true,size:7,sight:5,look:'shsold',umbra:true,desc:'Fantassin de l’armée des ombres. Bon marché, obéissant, au corps à corps.'},
  inf2:{name:'Chasseur mage (rang C)',cost:300,time:9,hp:210,speed:62,dmg:24,range:160,rof:1.3,proj:'ki',pcol:'#7ab8ff',size:8,sight:7,look:'hmage',vsB:.7,desc:'Chasseur éveillé : projectiles de mana à distance.'},
  inf3:{name:'Chevalier de l’ombre',cost:320,time:9,hp:340,speed:58,dmg:20,range:20,rof:.9,melee:true,size:9,sight:6,look:'shknight',regen:2,umbra:true,desc:'Lourde armure d’ombre. Encaisse énormément et se reforme lentement.'},
  inf4:{name:'Mage orc de l’ombre',cost:420,time:11,hp:260,speed:56,dmg:34,range:175,rof:1.8,proj:'fire',pcol:'#b06aff',splash:26,size:8,sight:8,look:'shmage',vsB:.9,umbra:true,desc:'Ancien chaman orc extrait par Jinwoo : flammes d’ombre à zone.'},
  healer:{name:'Guérisseuse de rang B',cost:400,time:10,hp:190,speed:60,heal:30,range:125,size:7,sight:6,look:'shealer',desc:'Soigne les combattants alliés proches (pas les créatures ni les véhicules).'},
  harv:{name:'Camion de l’Association',cost:700,time:14,hp:900,speed:46,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Transporte les cristaux de mana jusqu’à la raffinerie.'},
  tank:{name:'Tank, l’ours de l’ombre',cost:750,time:14,hp:1050,speed:56,dmg:48,range:24,rof:1.1,melee:true,splash:26,size:15,sight:7,at:'factory',veh:true,vsB:1.2,beast:'bear',umbra:true,desc:'Ancien ours de glace devenu ombre : charge au contact et frappe en zone.'},
  jet:{name:'Kaisel, wyverne de l’ombre',cost:650,time:11,hp:420,speed:135,dmg:16,range:140,rof:.6,proj:'fire',pcol:'#b06aff',fly:true,size:13,sight:10,at:'factory',veh:true,vsB:.5,beast:'wyvern',umbra:true,desc:'Monture volante de Jinwoo. Très rapide, idéale pour éclairer la carte.'},
  mech:{name:'Géant de l’ombre',cost:1300,time:20,hp:2600,speed:34,dmg:95,range:34,rof:1.8,melee:true,splash:50,size:22,sight:8,at:'factory',veh:true,mech:true,vsB:1.4,req:['lab'],beast:'giant',umbra:true,desc:'Géant du Château du Démon devenu ombre. Écrase tout autour de lui.'},
  jinwoo:{name:'Sung Jinwoo',hero:true,cost:2200,time:30,hp:1700,speed:96,dmg:52,range:20,rof:.6,melee:true,size:10,look:'jinwoo',
    ab:{name:'Mutilation',type:'slash',cd:15,dmg:420,range:300,w:44,shout:'MUTILATION.',col:'#8a6aff'},desc:'Le Monarque des Ombres. Extrait l’ombre des ennemis tués près de lui (ARISE !) et monte de niveau à chaque victoire de son armée.'},
  igris:{name:'Igris',hero:true,cost:1700,time:26,hp:1600,speed:92,dmg:48,range:22,rof:.7,melee:true,size:10,look:'igris',umbra:true,
    ab:{name:'Charge du Chevalier Sanglant',type:'dash_blast',cd:20,dmg:400,range:260,rad:80,knock:260,shout:'…',col:'#ff3a3a'},desc:'Le chevalier rouge, première ombre de Jinwoo. Bondit sur l’ennemi.'},
  beru:{name:'Beru',hero:true,cost:2000,time:28,hp:1650,speed:110,dmg:44,range:20,rof:.5,melee:true,size:10,look:'beru',umbra:true,lifesteal:.25,
    ab:{name:'Fureur du Roi des Fourmis',type:'rage',cd:32,dur:12,range:0,shout:'KIEEEEEH !!',col:'#c070ff'},desc:'Ancien Roi des Fourmis de l’île de Jeju. Très rapide, se soigne en frappant.'},
  chahaein:{name:'Cha Hae-In',hero:true,cost:1800,time:26,hp:1350,speed:104,dmg:50,range:20,rof:.55,melee:true,size:9,look:'chahaein',
    ab:{name:'Danse de l’épée',type:'slash',cd:14,dmg:440,range:300,w:46,shout:'DANSE DE L’ÉPÉE !',col:'#ffe9a0'},desc:'Chasseuse de rang S, vice-présidente de la guilde des Chasseurs. Lame foudroyante.'},
  choi:{name:'Choi Jong-In',hero:true,cost:1800,time:26,hp:1150,speed:78,dmg:38,range:175,rof:1.3,proj:'fire',pcol:'#ff7a2a',splash:26,size:9,look:'choi',
    ab:{name:'Pluie de météores de feu',type:'barrage',cd:20,dmg:210,range:320,rad:64,n:6,shout:'BRASIER !!',col:'#ff7a2a'},desc:'Mage de feu de rang S, maître de la guilde des Chasseurs. Bombarde une zone.'},
  baek:{name:'Baek Yoonho',hero:true,cost:1700,time:26,hp:1500,speed:92,dmg:42,range:20,rof:.7,melee:true,size:9,look:'baek',
    ab:{name:'Forme bestiale : Tigre blanc',type:'shift',cd:45,dur:22,form:'whitetiger',range:0,shout:'TIGRE BLANC !!',col:'#f4f4f4'},desc:'Maître de la guilde du Tigre Blanc. Se transforme en bête rapide et féroce.'},
  iron:{name:'Iron',hero:true,cost:1300,time:22,hp:2100,speed:74,dmg:34,range:22,rof:.9,melee:true,size:11,look:'iron',umbra:true,
    ab:{name:'Provocation de fer',type:'harden',cd:24,dur:7,rad:180,shout:'PAR ICI !!',col:'#9a8aff'},desc:'Ombre colossale en armure : attire les coups et devient presque invulnérable.'},
  jinho:{name:'Yoo Jinho',hero:true,cost:1000,time:18,hp:800,speed:84,dmg:14,range:130,rof:.9,proj:'bullet',size:8,look:'jinho',
    ab:{name:'Fortune des Yoo',type:'rally',cd:40,dur:10,rad:260,fund:900,shout:'C’EST MOI QUI PAIE !',col:'#ffd23a'},desc:'Héritier fortuné et vice-maître de la guilde Ahjin : rapporte 900 et galvanise les alliés.'},
 },
 opm:{
  inf1:{name:'Héros de classe C',cost:100,time:5,hp:140,speed:62,dmg:11,range:18,rof:.8,melee:true,size:7,sight:5,look:'opmc',desc:'Héros débutant au corps à corps. Chaque monstre abattu rapporte une prime.'},
  inf2:{name:'Héros de classe B',cost:300,time:9,hp:240,speed:64,dmg:22,range:150,rof:1.3,proj:'laser',pcol:'#ffe14d',size:8,sight:7,look:'opmb',vsB:.7,desc:'Héros équipé d’un canon d’énergie à distance.'},
  inf3:{name:'Disciple du Poing de l’Eau',cost:280,time:9,hp:330,speed:74,dmg:20,range:20,rof:.6,melee:true,size:8,sight:6,look:'bangdis',dodge:.25,desc:'Élève du dojo de Bang : esquive un coup sur quatre grâce à la fluidité de son art.'},
  inf4:{name:'Héros de classe A',cost:450,time:11,hp:380,speed:62,dmg:32,range:170,rof:1.2,proj:'ki',pcol:'#ff8a3a',size:8,sight:8,look:'opma',vsB:.9,desc:'Héros confirmé : tirs d’énergie puissants à longue portée.'},
  healer:{name:'Médecin de l’Association',cost:400,time:10,hp:190,speed:60,heal:30,range:125,size:7,sight:6,look:'opmmed',desc:'Soigne les combattants alliés proches (pas les véhicules).'},
  harv:{name:'Camion de l’Association des Héros',cost:700,time:14,hp:900,speed:46,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Ramasse les débris de monstres et les cristaux.'},
  tank:{name:'Robot de Metal Knight',cost:750,time:14,hp:900,speed:46,dmg:52,range:210,rof:2.2,proj:'missile',splash:34,size:15,sight:7,at:'factory',veh:true,vsB:1.4,desc:'Robot de combat chenillé lance-missiles.'},
  jet:{name:'Drone de Metal Knight',cost:600,time:11,hp:340,speed:128,dmg:12,range:140,rof:.45,proj:'bullet',fly:true,size:12,sight:9,at:'factory',veh:true,vsB:.5,desc:'Drone volant rapide. Parfait pour éclairer et chasser les Dragon Balls.'},
  mech:{name:'Super-robot de Metal Knight',cost:1400,time:20,hp:2600,speed:32,dmg:100,range:240,rof:2.4,proj:'shell',splash:54,size:22,sight:8,at:'factory',veh:true,mech:true,vsB:1.5,req:['lab'],desc:'Forteresse mobile du héros de classe S n°6. Puissance de feu dévastatrice.'},
  saitama:{name:'Saitama',hero:true,cost:3600,time:45,hp:2900,speed:88,dmg:60,range:20,rof:1.1,melee:true,size:10,look:'saitama',onepunch:true,vsB:.005,
    ab:{name:'Série de coups normaux',type:'cone',cd:32,dmg:99999,range:70,len:220,ang:.7,knock:520,shout:'SÉRIE DE COUPS NORMAUX CONSÉCUTIFS !',col:'#ffd23a'},desc:'Sa Série de coups normaux (Q) tue les troupes en un seul coup (les héros, boss et bâtiments encaissent 600)… mais il s’ennuie : de temps en temps, il part aux soldes du supermarché.'},
  genos:{name:'Genos',hero:true,cost:1900,time:28,hp:1500,speed:92,dmg:40,range:160,rof:.9,proj:'fire',pcol:'#ff8a2a',splash:18,size:9,look:'genos',regen:6,
    ab:{name:'Canon d’incinération',type:'beam',cd:22,dmg:500,range:300,len:440,w:46,shout:'INCINÉRATION !!',col:'#ff8a2a'},desc:'Cyborg disciple de Saitama : se répare tout seul et calcine tout sur une ligne.'},
  tatsumaki:{name:'Tatsumaki',hero:true,cost:2200,time:30,hp:1300,speed:88,dmg:36,range:170,rof:.8,proj:'ki',pcol:'#5aff8a',fly:true,size:9,look:'tatsumaki',
    ab:{name:'Tornade psychique',type:'lift',cd:22,dmg:460,range:280,rad:150,dur:2.8,shout:'DISPARAISSEZ !',col:'#5aff8a'},desc:'Héroïne de classe S n°2, la plus puissante espère. Soulève une armée entière.'},
  bang:{name:'Bang',hero:true,cost:1800,time:26,hp:1600,speed:98,dmg:46,range:20,rof:.55,melee:true,size:9,look:'bang',dodge:.35,
    ab:{name:'Poing de l’eau qui brise la roche',type:'cone',cd:18,dmg:420,range:70,len:200,ang:.55,knock:380,shout:'POING DE L’EAU QUI BRISE LA ROCHE !',col:'#7ad8ff'},desc:'Maître d’arts martiaux de classe S. Esquive un coup sur trois.'},
  king:{name:'King',hero:true,cost:900,time:18,hp:900,speed:70,dmg:4,range:20,rof:2,melee:true,size:9,look:'king',kingAura:true,
    ab:{name:'King Engine',type:'king',cd:30,rad:280,dur:3.2,range:0,shout:'BA-DOUM… BA-DOUM…',col:'#ff3a3a'},desc:'« L’homme le plus fort du monde »… en apparence. Les ennemis proches frappent moins fort, et le King Engine les paralyse de peur.'},
  mumen:{name:'Mumen Rider',hero:true,cost:800,time:16,hp:950,speed:104,dmg:12,range:20,rof:.8,melee:true,size:9,look:'mumen',
    ab:{name:'Justice Crash',type:'rally',cd:26,dur:12,rad:260,shout:'JUSTICE CRASH !!',col:'#7dff9a'},desc:'Le héros de classe C n°1 à vélo. Faible, mais son courage galvanise toutes les troupes.'},
  metalbat:{name:'Metal Bat',hero:true,cost:1500,time:24,hp:1700,speed:86,dmg:44,range:22,rof:.7,melee:true,size:9,look:'metalbat',fighting:true,
    ab:{name:'Esprit combatif',type:'rage',cd:30,dur:12,range:0,shout:'TU VAS VOIR !!',col:'#ff5a3a'},desc:'Plus il est blessé, plus il frappe fort. Batte en métal et volonté de fer.'},
  fubuki:{name:'Fubuki',hero:true,cost:1500,time:24,hp:1200,speed:84,dmg:30,range:160,rof:.9,proj:'ki',pcol:'#5aff8a',size:9,look:'fubuki',
    ab:{name:'Tempête infernale',type:'crush',cd:22,dmg:380,range:280,rad:95,stun:1.6,shout:'TEMPÊTE INFERNALE !',col:'#5aff8a'},desc:'Meneuse du Groupe Fubuki. Écrase une zone par télékinésie et étourdit.'},
 }};
const MORELEG={
 sl:{
  bellion:{name:'Bellion',cost:3200,time:40,hp:3000,speed:96,dmg:72,range:26,rof:.7,melee:true,splash:30,size:12,look:'bellion',umbra:true,ab:{name:'Lame du Grand Maréchal',type:'cone',cd:22,dmg:620,range:80,len:300,ang:.7,knock:300,shout:'POUR MON ROI.',col:'#b06aff'},desc:'Le Grand Maréchal de l’armée des ombres, la plus puissante des ombres.'},
  thomas:{name:'Thomas Andre',cost:2800,time:36,hp:3600,speed:78,dmg:66,range:22,rof:1,melee:true,splash:34,size:13,look:'thomas',ab:{name:'Charge du Goliath',type:'dash_blast',cd:22,dmg:520,range:260,rad:110,knock:460,shout:'GOLIATH !!',col:'#ffd23a'},desc:'« Le Goliath », chasseur américain de niveau national. Indestructible.'},
  liu:{name:'Liu Zhigang',cost:2600,time:34,hp:2200,speed:100,dmg:58,range:22,rof:.6,melee:true,size:10,look:'liu',ab:{name:'Lame de vent',type:'beam',cd:20,dmg:560,range:300,len:460,w:40,shout:'LAME DE VENT !',col:'#a8ffe0'},desc:'Chasseur chinois de niveau national : une lame de vent qui fend tout sur sa ligne.'},
  gunhee:{name:'Go Gun-Hee',cost:2400,time:32,hp:2300,speed:80,dmg:50,range:22,rof:.8,melee:true,size:10,look:'gunhee',ab:{name:'Volonté du Président',type:'rally',cd:30,dur:14,rad:320,shout:'POUR LA CORÉE !',col:'#6fa4ff'},desc:'Président de l’Association des Chasseurs. Galvanise toute l’armée autour de lui.'},
 },
 opm:{
  blast:{name:'Blast',cost:3400,time:40,hp:3200,speed:96,dmg:80,range:150,rof:.8,proj:'ki',pcol:'#9aff6a',fly:true,size:11,look:'blast',ab:{name:'Frappe dimensionnelle',type:'blast',cd:24,dmg:700,range:300,rad:120,knock:300,shout:'…',col:'#9aff6a'},desc:'Le héros de classe S n°1, figure mystérieuse. Puissance colossale.'},
  atomic:{name:'Atomic Samurai',cost:2800,time:36,hp:2400,speed:100,dmg:68,range:22,rof:.5,melee:true,size:10,look:'atomic',ab:{name:'Coupe atomique',type:'slash',cd:16,dmg:600,range:320,w:70,shout:'COUPE ATOMIQUE !',col:'#ff9ad8'},desc:'Le maître du sabre de classe S. Des milliers de coupes en un instant.'},
  flash:{name:'Flashy Flash',cost:2600,time:34,hp:2000,speed:130,dmg:56,range:20,rof:.4,melee:true,size:10,look:'flash',ab:{name:'Éclair éclatant',type:'phase',cd:16,dmg:480,range:340,w:46,shout:'ÉCLAIR ÉCLATANT !',col:'#e8d8ff'},desc:'Ninja de classe S plus rapide que l’œil. Traverse les lignes ennemies.'},
  zombie:{name:'Zombieman',cost:2200,time:30,hp:2600,speed:82,dmg:46,range:22,rof:.8,melee:true,size:10,look:'zombie',regen:30,ab:{name:'Immortel',type:'rage',cd:30,dur:10,range:0,shout:'JE NE MEURS PAS.',col:'#c83a3a'},desc:'Régénération absolue : se relève une fois par minute même après un coup fatal.'},
 }};
for(const f of['sl','opm']){UDEF[f]={};for(const k in MOREU[f]){const D=MOREU[f][k];D.key=k;D.fac=f;D.sight=D.sight||(D.hero?9:6);D.sightPx=D.sight*TILE;D.size=D.size||8;D.at=D.at||(D.hero?'temple':'barracks');D.rof=D.rof||1;D.req=D.req||[];if(D.hero)D.req=['temple'];UDEF[f][k]=D;}
  for(const k in MORELEG[f]){const D=MORELEG[f][k];D.key=k;D.fac=f;D.hero=true;D.legend=true;D.sight=10;D.sightPx=10*TILE;D.size=D.size||10;D.at='temple2';D.req=['temple2'];UDEF[f][k]=D;}}
FORMS.whitetiger={look:'whitetiger',sc:1.9,size:15,speed:118,dmg:70,range:22,rof:.55,melee:true,splash:22,shield:1200,sightPx:10*TILE};
SUPER.sl={name:'L’Armée des Ombres',charge:220,rad:150,dmg:800,col:'#8a5aff',shout:'ARISE !!',look:'jinwoo',who:'Sung Jinwoo',delay:2,fx:'shadowarmy'};
SUPER.opm={name:'Coup de poing sérieux',charge:270,rad:170,dmg:1050,col:'#ffd23a',shout:'COUP DE POING SÉRIEUX.',look:'saitama',who:'Saitama',delay:1.8,fx:'serious'};
// ---- research ----
UPG.sl=[{id:'arise',name:'Extraction améliorée',desc:'Chance d’extraction portée à 75 % et +6 ombres maximum',cost:1000,time:26,cls:'all'},
  {id:'shadowup',name:'Ombres d’élite',desc:'Ombres : +30 % de vie et +20 % de dégâts',cost:1200,time:28,cls:'shadow',hp:1.3,dmg:1.2},
  {id:'rerank',name:'Réévaluation de rang',desc:'Infanterie : +25 % de vie',cost:900,time:25,cls:'inf',hp:1.25},
  {id:'runes',name:'Runes de mana',desc:'Toutes les unités : +15 % de dégâts',cost:1100,time:28,cls:'all',dmg:1.15},
  {id:'monarch',name:'Éveil du Monarque',desc:'Héros : +25 % de dégâts',cost:1600,time:34,cls:'hero',dmg:1.25}];
UPG.opm=[{id:'workout',name:'100 pompes, 100 abdos, 100 squats, 10 km',desc:'Toutes les unités : +20 % de vie',cost:1000,time:26,cls:'all',hp:1.2},
  {id:'kuseno',name:'Pièces du Dr Kuseno',desc:'Véhicules : +25 % de dégâts et de vie',cost:1000,time:26,cls:'veh',dmg:1.25,hp:1.25},
  {id:'ranking',name:'Classement de l’Association',desc:'Toutes les unités : +15 % de dégâts',cost:1100,time:28,cls:'all',dmg:1.15},
  {id:'bounty',name:'Primes doublées',desc:'Les primes de l’Association pour chaque ennemi abattu sont doublées',cost:900,time:24,cls:'all'},
  {id:'sclass',name:'Réunion des classes S',desc:'Héros : +25 % de vie',cost:1400,time:30,cls:'hero',hp:1.25}];
for(const f of['sl','opm'])for(const u of UPG[f])UPG_BY_ID[u.id]=u;
{const _uc=upCls;upCls=function(e,cls){if(cls==='shadow')return!!(e.isU&&e.D.umbra);return _uc(e,cls);};}
// ---- neutral creatures from the new animes ----
Object.assign(UDEF.neu,{
  orc:{name:'Orc des hautes terres',cost:300,hp:620,speed:70,dmg:30,range:20,rof:.9,melee:true,size:10,sight:9,look:'orc',tsc:1.35,bounty:300},
  kargalgan:{name:'Kargalgan, chaman orc',cost:1800,hp:3200,speed:58,dmg:70,range:190,rof:1.8,proj:'fire',pcol:'#ff5a2a',splash:40,size:14,sight:11,look:'kargalgan',tsc:1.7,regen:10,bounty:1800},
  ant:{name:'Fourmi soldat de Jeju',cost:250,hp:420,speed:78,dmg:20,range:20,rof:.7,melee:true,size:10,sight:9,look:'ant',tsc:1.3,bounty:250},
  kaijin:{name:'Monstre de l’Association',cost:400,hp:900,speed:70,dmg:38,range:22,rof:1,melee:true,splash:20,size:12,sight:9,look:'kaijin',tsc:1.5,bounty:400},
  kabuto:{name:'Carnage Kabuto',cost:2600,hp:5200,speed:70,dmg:110,range:26,rof:1.1,melee:true,splash:40,size:16,sight:10,look:'kabuto',tsc:2.1,regen:12,bounty:2600},
  garou:{name:'Garou, le chasseur de héros',cost:3500,hp:6000,speed:104,dmg:95,range:22,rof:.6,melee:true,splash:30,size:11,sight:11,look:'garou',tsc:1.25,regen:22,bounty:3500,dodge:.25},
});
for(const k of['orc','kargalgan','ant','kaijin','kabuto','garou']){const D=UDEF.neu[k];D.key=k;D.fac='neu';D.sightPx=D.sight*TILE;D.at='none';D.req=[];D.desc='Créature neutre : attaque tout le monde. Rapporte '+D.bounty+' à celui qui l’abat.';}
EVENTS.push({id:'gate',fac:'sl',name:'Une Porte de rang A s’ouvre',col:'#4ab8ff',desc:'Des orcs surgissent d’une Porte. Tuez le chaman Kargalgan pour la refermer (+1800), sinon c’est la rupture de donjon !'},
  {id:'jeju',fac:'sl',minT:600,name:'Les fourmis de l’île de Jeju',col:'#c8503a',desc:'Une colonie de fourmis géantes envahit la carte. Chacune rapporte 250.'},
  {id:'kaijin',fac:'opm',name:'Alerte : catastrophe de niveau Démon',col:'#b04aff',desc:'L’Association des Monstres attaque avec Carnage Kabuto. Celui qui l’abat empoche 2600.'},
  {id:'garou',fac:'opm',name:'Garou, le chasseur de héros',col:'#e8e8ec',desc:'Garou traque les héros les plus forts. Celui qui l’abat empoche 3500.'});
let gates=[];
{const _ie=initEvents;initEvents=function(){_ie();gates=[];};}
{const _re=runEvent;runEvent=function(ev){if(!['gate','jeju','kaijin','garou'].includes(ev.id))return _re(ev);const c={x:(MW/2-.5)*TILE,y:(MW/2-.5)*TILE},p=randSpot(18)||c;
  const ring=(k,n,r)=>{for(let i=0;i<n;i++){let x=p.x+rr(-r,r),y=p.y+rr(-r,r);if(blockedW(x,y)){const q=nearestFree(tileOf(x),tileOf(y),8);if(q){x=q[0]*TILE+16;y=q[1]*TILE+16;}}mkUnit(2,k,x,y);}};
  if(ev.id==='gate'){const b=mkUnit(2,'kargalgan',p.x,p.y);ring('orc',6,70);gates.push({x:p.x,y:p.y-6,t:0,dur:90,boss:b.id,broke:false});part('flash',p.x,p.y-30,0,0,.6,160,'#4ab8ff');}
  else if(ev.id==='jeju'){ring('ant',6,80);for(let k=0;k<20;k++)part('dust',p.x+rr(-60,60),p.y+rr(-40,40),rr(-40,40),rr(-40,0),1.2,rr(8,14));}
  else if(ev.id==='kaijin'){mkUnit(2,'kabuto',p.x,p.y);ring('kaijin',5,80);part('flash',p.x,p.y-20,0,0,.6,140,'#b04aff');shake(10);}
  else{mkUnit(2,'garou',p.x,p.y);part('flash',p.x,p.y-20,0,0,.6,120,'#ffffff');shake(8);}
  G.alertPos={x:p.x,y:p.y};G.pings.push({x:p.x,y:p.y,t:4});banner(ev.name.toUpperCase(),ev.col);msg('Événement : '+ev.desc,ev.col);sfx('event');announce(ev.name);};}
function updGates(dt){for(const g of gates){g.t+=dt;const boss=ents.find(e=>e.id===g.boss&&!e.dead);
    if(!boss){g.dead=true;fxRing(g.x,g.y,'#4ab8ff',90);part('flash',g.x,g.y-30,0,0,.5,120,'#bfe8ff');msg('La Porte s’est refermée.','#4ab8ff');continue;}
    if(!g.broke&&g.t>=g.dur){g.broke=true;for(let i=0;i<6;i++)mkUnit(2,'orc',g.x+rr(-70,70),g.y+rr(-50,50));banner('RUPTURE DE DONJON !','#ff4d5e');msg('Personne n’a fermé la Porte : rupture de donjon, les monstres se déversent !','#ff4d5e');sfx('alert');}}
  gates=gates.filter(g=>!g.dead);}
// ---- Shadow extraction (ARISE) and the System ----
function shadeLook(L0){const L=Object.assign({},L0);for(const k in L){const v=L[k];if(typeof v==='string'&&/^#[0-9a-f]{3,6}$/i.test(v)&&k!=='k'){const h=hex7(v),n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,l=(r+g+b)/3;
    L[k]='#'+[18+l*.12+r*.05,14+l*.1+g*.04,32+l*.18+b*.08].map(x=>Math.min(255,x|0).toString(16).padStart(2,'0')).join('');}}
  L.eye='#9a8aff';L.glowEye='#a890ff';L.umbra=true;return L;}
function ensureShade(key){if(UDEF.sl[key])return UDEF.sl[key];const m=/^sh_([a-z]+)_(.+)$/.exec(key);if(!m)return null;const B=UDEF[m[1]]&&UDEF[m[1]][m[2]];if(!B)return null;
  const lk='sh:'+B.look;if(!LOOK[lk]&&LOOK[B.look])LOOK[lk]=Object.assign(shadeLook(LOOK[B.look]),{k:LOOK[B.look].k||B.look});
  const D=Object.assign({},B,{key,fac:'sl',name:'Ombre : '+B.name.replace(/^Ombre : /,''),look:lk,extracted:true,umbra:true,hp:Math.round(B.hp*.8),dmg:Math.min(B.dmg||0,700)*.85,bounty:0,boom:false,at:'none',req:[],legend:false,onepunch:false,vsB:B.onepunch?1:B.vsB});
  if(B.onepunch)D.dmg=260;UDEF.sl[key]=D;return D;}
const slLevel=si=>(sides[si]&&sides[si].slv)||1;
function shadeMax(si){const s=sides[si];return 6+Math.floor(slLevel(si)/4)+(s.ups.includes('arise')?6:0)+(has(si,'unique')?6:0);}
const shadeCount=si=>ents.filter(e=>e.isU&&!e.dead&&e.side===si&&e.D.extracted).length;
function tryExtract(t){if(!t.isU||t.D.veh||t.D.harv||t.form&&false)return;for(const si of PSIDES){const s=sides[si];if(!s||s.fac!=='sl'||ally(si,t.side))continue;
  const jw=ents.find(e=>e.isU&&!e.dead&&e.side===si&&e.key==='jinwoo');if(!jw||hyp(jw.x-t.x,jw.y-t.y)>440)continue;if(shadeCount(si)+(s.pendingSh||0)>=shadeMax(si))continue;
  const big=t.D.hero||(t.D.cost||0)>=1500||(t.D.bounty||0)>=1000;if(!big&&R()>(s.ups.includes('arise')?.75:.35))continue;
  const key=t.D.extracted?t.key:'sh_'+t.fac+'_'+t.key;if(!ensureShade(key))continue;s.pendingSh=(s.pendingSh||0)+1;const x=t.x,y=t.y;fxs.push({type:'arise',x,y,t:0,dur:1.4,big});
  if(plSees(jw)&&(big||R()<.35))cutin(jw,'ARISE.');setTimeoutG(()=>{s.pendingSh=Math.max(0,(s.pendingSh||1)-1);if(G.over||!ents.some(e=>e.isU&&!e.dead&&e.side===si&&e.key==='jinwoo'))return;
    const u=mkUnit(si,key,x,y);u.born=gtime;ariseFx(u);if(si===PL&&big)msg(u.D.name+' rejoint l’armée des ombres !','#a890ff');
    const L=jw&&!jw.dead?jw:null;if(L&&L.order)orderMove(u,L.x+rr(-40,40),L.y+rr(-40,40),true);else orderMove(u,x+rr(-20,20),y+20,true);},1.25);return;}}
function ariseFx(u){for(let k=0;k<26;k++)part('smoke',u.x+rr(-14,14),u.y-rr(0,30),rr(-20,20),rr(-60,-20),rr(.8,1.6),rr(8,14),'#2a2040');fxRing(u.x,u.y,'#8a5aff',40);part('flash',u.x,u.y-16,0,0,.4,60,'#8a5aff');sfx('transform',u.x,u.y);}
function slXP(si,v){const s=sides[si];if(!s||s.fac!=='sl')return;s.slv=s.slv||1;s.slx=(s.slx||0)+v;let up=0;while(s.slx>=60+s.slv*30&&s.slv<99){s.slx-=60+s.slv*30;s.slv++;up++;}
  if(!up)return;const jw=ents.find(e=>e.isU&&!e.dead&&e.side===si&&e.key==='jinwoo');
  if(jw){const nm=Math.round(jw.max*Math.pow(1.04,up));jw.hp+=nm-jw.max;jw.max=nm;fxs.push({type:'lvlup',x:jw.x,y:jw.y-50,t:0,dur:1.6,u:jw});fxRing(jw.x,jw.y,'#6fd8ff',40);}
  if(si===PL){msg('LEVEL UP ! Sung Jinwoo passe au niveau '+s.slv+(jw?'':' (il en profitera à son retour)'),'#6fd8ff');sfx('rankup');}}
// ---- damage / kill hooks shared by both factions ----
let kingsT=0,kings=[];
{const _dm=damage;damage=function(t,amt,srcSide,src){if(t.dead)return;
  if(NET.client&&!NET.applying){if(t.ui>0)return;t.hitFl=.1;if(t.side===PL||srcSide===PL)G.combat=gtime;if(t.side===PL&&srcSide!==PL)underAttack(t);return;}
  if(t.isU&&t.D.dodge&&R()<t.D.dodge){part('spark',t.x+rr(-8,8),t.y-18,rr(-60,60),-30,.3,1.5,'#bff4ff');return;}
  if(src&&src.isU&&kings.length){for(const k of kings)if(!ally(k.side,src.side)&&!k.dead&&hyp(k.x-src.x,k.y-src.y)<170){amt*=.6;break;}}
  if(src&&src.isU&&src.D.onepunch&&amt>5000&&(!t.isU||t.D.hero||t.D.legend||t.D.mech||(t.D.bounty||0)>=900))amt=600;
  if(src&&src.isU&&src.D.onepunch&&t.isU&&!t.dead&&amt>5000){part('flash',t.x,t.y-14,0,0,.3,90,'#ffffff');fxRing(t.x,t.y,'#ffd23a',60);shake(5);fxs.push({type:'onepunch',x:t.x,y:t.y-30,t:0,dur:.8});}
  if(src&&src.isU&&src.D.lifesteal&&!src.dead)src.hp=Math.min(src.max,src.hp+amt*src.D.lifesteal);
  _dm(t,amt,srcSide,src);};}
{const _k=kill;kill=function(t,srcSide,src){if(t.dead)return;if(NET.client&&!NET.applying){t.hp=Math.max(t.hp,1);return;}
  if(t.isU&&t.key==='zombie'&&!(t.zT>0)&&!NET.client){t.zT=60;t.hp=t.max*.5;t.freeze=0;t.lift=0;for(let k=0;k<14;k++)part('spark',t.x,t.y-16,rr(-80,80),rr(-90,-10),.6,2,'#c83a3a');fxRing(t.x,t.y,'#c83a3a',50);
    if(plSees(t))cutin(t,'JE NE MEURS PAS.');return;}
  const wasU=t.isU;_k(t,srcSide,src);if(NET.client)return;if(NET.host)NET.killed(t,srcSide,src);
  if(srcSide!=null&&isPl(srcSide)&&srcSide!==t.side){const S=sides[srcSide];
    if(S.fac==='opm'&&!(t.D.harv)){const v=Math.round((t.D.cost||(t.isB?600:100))*.2*(S.ups.includes('bounty')?2:1));S.credits+=v;if(srcSide===PL&&v>=150)feedPush('Prime de l’Association : +'+v,'#ffc21a');}
    }
  if(wasU)tryExtract(t);};}
{const _dmm=dmgMult;dmgMult=function(u){let m=_dmm(u);if(u.key==='jinwoo')m*=1+.04*(slLevel(u.side)-1);if(u.D.fighting)m*=1+(1-u.hp/u.max)*.9;if(u.hope>0)m*=1.2;return m;};}
{const _gx=giveXP;giveXP=function(u,v){const r0=u.rank;_gx(u,v);if(u.rank>r0&&sides[u.side]&&sides[u.side].fac==='opm'&&!NET.client){const g=150*u.rank;sides[u.side].credits+=g;if(u.side===PL&&(u.D.hero||u.rank>=2))feedPush('Montée au classement de l’Association : +'+g,'#ffc21a');}};}
{const _oa=orderAbility;orderAbility=function(u,x,y){if(u.D.ab&&u.D.ab.type==='king'){if(!canCast(u))return false;startCast(u,{x:u.x,y:u.y});return true;}return _oa(u,x,y);};}
{const _e3=execAbility3;execAbility3=function(u,c,ab,dx,dy,L){
  if(ab.type==='king'){for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&!e.D.veh&&hyp(e.x-u.x,e.y-u.y)<ab.rad){e.freeze=Math.max(e.freeze,ab.dur*(e.D.hero?.5:1));e.path=null;e.target=null;}
    for(let k=0;k<4;k++)setTimeoutG(()=>fxRing(u.x,u.y,'#ff3a3a',ab.rad*(.35+k*.22)),k*.25);fxs.push({type:'kingeng',x:u.x,y:u.y,t:0,dur:2.4,r:ab.rad});shake(5);sfx('alert',u.x,u.y);return true;}
  if(ab.fund&&!NET.client){sides[u.side].credits+=ab.fund;if(u.side===PL)msg('Yoo Jinho finance la guerre : +'+ab.fund,'#ffd23a');part('flash',u.x,u.y-20,0,0,.4,60,'#ffd23a');}
  return _e3(u,c,ab,dx,dy,L);};}
// per-unit passives
{const _p2=updPassives2;updPassives2=function(u,dt){_p2(u,dt);if(u.zT>0)u.zT-=dt;if(u.potT>0)u.potT-=dt;if(u.hopeT>0)u.hopeT-=dt;if(u.hope>0)u.hope-=dt;
  if(u.D.umbra&&R()<dt*(u.D.hero?6:1.5)&&plSees(u))part('smoke',u.x+rr(-6,6),u.y-(u.z||0)-rr(4,22),rr(-6,6),rr(-22,-8),.9,rr(3,6),'#2a2040');
  if(NET.client||u.dead)return;const s=sides[u.side];if(!s)return;
  if(u.D.hero&&u.hp<u.max*.25){
    if(s.fac==='sl'&&!(u.potT>0)){u.potT=60;u.hp=Math.min(u.max,u.hp+u.max*.5);fxRing(u.x,u.y,'#6fd8ff',40);part('flash',u.x,u.y-16,0,0,.35,50,'#6fd8ff');if(u.side===PL)msg('Le Système : potion de soin utilisée sur '+u.D.name,'#6fd8ff');sfx('heal',u.x,u.y);}
    else if(s.fac==='opm'&&!(u.hopeT>0)){u.hopeT=60;for(const e of ents)if(!e.dead&&e.isU&&ally(e.side,u.side)&&!e.D.harv&&hyp(e.x-u.x,e.y-u.y)<260){e.hope=8;fxRing(e.x,e.y,'#ffc21a',16);}
      if(plSees(u))cutin(u,'UN HÉROS N’ABANDONNE JAMAIS !');sfx('transform',u.x,u.y);}}
  if(u.key==='saitama'){if(u.boredT==null)u.boredT=rr(50,80);if(!u.target)u.boredT-=dt;else u.boredT-=dt*.35;if(u.boredT<=0&&!u.casting&&!u.dash)goShopping(u);}};}
function goShopping(u){const s=sides[u.side];u.boredT=rr(80,120);s.away=s.away||[];s.away.push({u,t:16});ents=ents.filter(e=>e!==u);sel=sel.filter(e=>e!==u);for(const b of dballs)if(b.carrier===u){b.carrier=null;b.x=u.x;b.y=u.y;b.cool=1;}
  for(let k=0;k<14;k++)part('dust',u.x,u.y,rr(-90,90),rr(-60,10),.8,rr(6,10));
  msg(u.side===PL?'Saitama : « Oh non ! Les soldes au supermarché ! » Il revient dans 16 s.':'Saitama ennemi est parti faire les soldes…',u.side===PL?'#ffc21a':'#ff8a6a');if(u.side===PL)announce('Saitama est parti faire les courses');}
function updAway(dt){for(const si of PSIDES){const s=sides[si];if(!s||!s.away||!s.away.length)continue;for(const a of s.away){a.t-=dt;if(a.t>0)continue;a.done=true;const u=a.u,home=myB(si,'hq')[0]||myB(si)[0];if(!home)continue;
    const p=nearestFree(home.tx+1,home.ty+home.h,8)||[home.tx+1,home.ty+home.h];u.x=p[0]*TILE+16;u.y=p[1]*TILE+16;u.path=null;u.order=null;u.target=null;u.gx=u.x;u.gy=u.y;u.kx=u.ky=0;u.freeze=0;u.lift=0;ents.push(u);
    s.credits+=300;fxRing(u.x,u.y,'#ffc21a',40);if(si===PL){msg('Saitama est de retour, les bras chargés de légumes en promo (+300).','#ffc21a');sfx('ready');}}
  s.away=s.away.filter(a=>!a.done);}}
// ---- the System: daily quests for Solo Leveling ----
function updQuests(dt){for(const si of PSIDES){const s=sides[si];if(!s||s.fac!=='sl')continue;s.qT=(s.qT==null?100:s.qT)-dt;
  if(s.quest){s.quest.t-=dt;if(s.quest.k>=s.quest.n){s.quest=null;s.credits+=1200;slXP(si,(60+(s.slv||1)*30)*2);if(si===PL){banner('QUÊTE ACCOMPLIE !','#6fd8ff');msg('Le Système : quête journalière accomplie. Récompense : +1200 et 2 niveaux.','#6fd8ff');sfx('rankup');announce('Quête accomplie');}}
    else if(s.quest.t<=0){s.quest=null;s.credits=Math.max(0,s.credits-400);if(si===PL){msg('Le Système : quête échouée. Pénalité : -400.','#ff4d5e');sfx('err');}}}
  else if(s.qT<=0&&ents.some(e=>e.isU&&!e.dead&&e.side===si&&e.key==='jinwoo')){s.qT=rr(140,170);s.quest={n:8+Math.floor((s.slv||1)/2),k:0,t:90};if(si===PL){banner('NOUVELLE QUÊTE JOURNALIÈRE','#6fd8ff');msg('Le Système : élimine '+s.quest.n+' ennemis en 90 secondes.','#6fd8ff');sfx('ready');}}}}
// ---- special buildings & global tick ----
{const _sb=updSpecialB;updSpecialB=function(b,dt){if(NET.client&&b.key==='unique')return;_sb(b,dt);if(b.key!=='unique'||b.rise<1)return;
  if(b.fac==='sl'&&b.uT>=50){b.uT=0;const u=spawnFrom(b,'inf1');ariseFx(u);}else if(b.fac==='opm'&&b.uT>=45){b.uT=0;spawnFrom(b,'inf3');}};}
{const _uf=updFusion;updFusion=function(dt){if(!NET.client)_uf(dt);kingsT-=dt;if(kingsT<=0){kingsT=.5;kings=ents.filter(e=>e.isU&&!e.dead&&e.D.kingAura);}if(NET.client)return;updAway(dt);updQuests(dt);updGates(dt);
  for(const ai of G.ai){for(const u of ents){if(u.dead||u.side!==ai.si||!u.D.ab||u.D.ab.type!=='king'||!canCast(u))continue;let n=0;for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&hyp(e.x-u.x,e.y-u.y)<220)n++;if(n>=3)orderAbility(u,u.x,u.y);}}};}
// ---- superpowers: Shadow Army and Serious Punch ----
{const _us=updSpecial;updSpecial=function(dt){_us(dt);for(const f of fxs){if((f.type!=='shadowarmy'&&f.type!=='serious')||f.done||f.t<f.delay)continue;f.done=true;
  if(f.type==='serious'){splashDmg(f.x,f.y,f.rad,f.dmg,f.side,520,.8,null);fxBoom(f.x,f.y,f.rad,'#ffffff',true);fxBoom(f.x,f.y,f.rad*.6,'#ffd23a',true);scorch(f.x,f.y,f.rad*1.1,.8);shake(26);sfx('big',f.x,f.y);setTimeoutG(()=>sfx('boom',f.x,f.y),.2);
    for(let k=0;k<50;k++){const a=R()*PI2,s=rr(200,700);part('dust',f.x,f.y,Math.cos(a)*s,Math.sin(a)*s*.6,1.6,rr(12,24));}}
  else{splashDmg(f.x,f.y,f.rad,f.dmg,f.side,180,.8,null);fxBoom(f.x,f.y,f.rad*.8,'#8a5aff',true);shake(14);sfx('big',f.x,f.y);
    if(!NET.client)for(let i=0;i<8;i++){const a=i/8*PI2,u=mkUnit(f.side,i%3?'inf1':'inf3',f.x+Math.cos(a)*50,f.y+Math.sin(a)*34);ariseFx(u);u.gx=u.x;u.gy=u.y;}}}};}
