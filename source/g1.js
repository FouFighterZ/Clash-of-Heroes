'use strict';
// ===== Core constants & helpers =====
const TILE=32;let MW=80,MH=80,WW=MW*TILE,WH=MH*TILE,NT=MW*MH;
const T_GRASS=0,T_DIRT=1,T_SAND=2,T_WATER=3,T_ROCK=4,T_FOREST=5;
const PI=Math.PI,PI2=PI*2;
const clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t, hyp=Math.hypot;
const R=Math.random, rr=(a,b)=>a+R()*(b-a), pick=a=>a[(R()*a.length)|0];
const ti=(x,y)=>y*MW+x;
const tileOf=v=>clamp(Math.floor(v/TILE),0,MW-1);
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function makeNoise(seed){
  const r=mulberry(seed),p=new Float32Array(65536);for(let i=0;i<65536;i++)p[i]=r();
  const n=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
    const x0=xi&255,x1=(xi+1)&255,y0=(yi&255)<<8,y1=((yi+1)&255)<<8;
    const a=p[x0+y0],b=p[x1+y0],c=p[x0+y1],d=p[x1+y1];return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;};
  const fbm=(x,y,o)=>{let s=0,a=.5,f=1,t=0;for(let i=0;i<o;i++){s+=n(x*f,y*f)*a;t+=a;a*=.5;f*=2.03;}return s/t;};
  return {n,fbm};
}

// ===== Factions & definitions =====
const FAC={
  dbz:{name:'Guerriers Z',anime:'Dragon Ball Z',col:'#ff8a1f',col2:'#1f6fd1',money:'Zénis',heroes:['goku','vegeta','piccolo','gohan','krilin']},
  mha:{name:'Héros de Yuei',anime:'My Hero Academia',col:'#2fd27a',col2:'#d8343f',money:'Yens',heroes:['allmight','deku','bakugo','todoroki','uraraka']},
};
const BDEF={
  hq:{w:3,h:3,hp:2600,cost:0,time:0,pow:20,sight:9,names:{dbz:'Capsule Corp.',mha:'Lycée Yuei'},desc:'Quartier général. Indispensable pour construire.'},
  power:{w:2,h:2,hp:700,cost:300,time:8,pow:100,sight:5,req:[],names:{dbz:'Générateur Capsule',mha:'Centrale électrique'},desc:'Produit 100 unités d’énergie.'},
  refinery:{w:3,h:3,hp:1300,cost:1000,time:14,pow:-30,sight:6,req:['power'],names:{dbz:'Extracteur de Ki',mha:'Centre de traitement'},desc:'Transforme les cristaux en argent. Livré avec un camion collecteur.'},
  barracks:{w:2,h:2,hp:900,cost:400,time:10,pow:-20,sight:6,req:['power'],names:{dbz:'Salle de gravité',mha:'Agence de héros'},desc:'Entraîne l’infanterie.'},
  factory:{w:3,h:3,hp:1500,cost:900,time:16,pow:-30,sight:6,req:['refinery'],names:{dbz:'Usine Capsule',mha:'Atelier de support'},desc:'Produit les blindés et les collecteurs.'},
  turret:{w:1,h:1,hp:1000,cost:500,time:10,pow:-25,sight:8,req:['barracks'],wpn:{dmg:30,range:240,rof:1.0},names:{dbz:'Tourelle Ki',mha:'Tourelle de défense'},desc:'Défense automatique contre les unités.'},
  temple:{w:2,h:2,hp:1400,cost:1200,time:20,pow:-60,sight:7,req:['factory'],names:{dbz:'Kami’s Lookout',mha:'Bureau des Pros'},desc:'Recrute les héros légendaires (un exemplaire de chaque).'},
};
const BLIST=['power','refinery','barracks','factory','turret','temple'];
for(const k in BDEF){BDEF[k].key=k;BDEF[k].req=BDEF[k].req||[];}
const UDEF={
 dbz:{
  inf1:{name:'Disciple de Kame',cost:100,time:5,hp:130,speed:62,dmg:10,range:18,rof:.8,melee:true,size:7,sight:5,look:'disciple',desc:'Combattant au corps à corps, rapide et bon marché.'},
  inf2:{name:'Guerrier Z',cost:300,time:9,hp:230,speed:72,dmg:22,range:150,rof:1.3,proj:'ki',fly:true,size:8,sight:7,look:'zwar',vsB:.7,desc:'Vole au-dessus du terrain et tire des boules de Ki.'},
  harv:{name:'Camion Capsule',cost:700,time:14,hp:900,speed:46,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Récolte les cristaux de Ki.'},
  tank:{name:'Tank Capsule',cost:750,time:14,hp:800,speed:48,dmg:55,range:210,rof:2.2,proj:'shell',splash:36,size:15,sight:7,at:'factory',veh:true,vsB:1.4,desc:'Blindé lourd à obus explosifs.'},
  goku:{name:'Goku',hero:true,cost:2000,time:28,hp:1700,speed:88,dmg:46,range:140,rof:.9,proj:'ki',fly:true,size:10,look:'goku',saiyan:true,
    ab:{name:'Kamehameha',type:'beam',cd:24,dmg:440,range:300,len:430,w:38,shout:'KA-ME-HA-ME-HA !!',col:'#6fd8ff'},desc:'Vole. Passe Super Saiyan quand il est blessé.'},
  vegeta:{name:'Vegeta',hero:true,cost:1800,time:26,hp:1550,speed:86,dmg:50,range:140,rof:.95,proj:'ki',fly:true,size:10,look:'vegeta',saiyan:true,
    ab:{name:'Big Bang Attack',type:'blast',cd:22,dmg:380,range:290,rad:95,shout:'BIG BANG ATTACK !!',col:'#8fd0ff'},desc:'Le prince des Saiyans. Vole.'},
  piccolo:{name:'Piccolo',hero:true,cost:1500,time:24,hp:1550,speed:80,dmg:40,range:150,rof:1,proj:'ki',fly:true,size:10,look:'piccolo',regen:9,
    ab:{name:'Special Beam Cannon',type:'beam',cd:24,dmg:620,range:340,len:500,w:18,shout:'SPECIAL BEAM CANNON !!',col:'#ffe95a',spiral:true},desc:'Se régénère en permanence. Rayon perforant à longue portée.'},
  gohan:{name:'Gohan',hero:true,cost:1600,time:24,hp:1400,speed:86,dmg:44,range:140,rof:.9,proj:'ki',fly:true,size:10,look:'gohan',saiyan:true,
    ab:{name:'Colère de Gohan',type:'rage',cd:35,dur:12,range:0,shout:'COLÈRE DE GOHAN !!',col:'#ffe14d'},desc:'Sa colère double ses dégâts et le soigne.'},
  krilin:{name:'Krillin',hero:true,cost:1200,time:20,hp:1100,speed:90,dmg:34,range:140,rof:.85,proj:'ki',fly:true,size:9,look:'krilin',
    ab:{name:'Destructo Disc',type:'disc',cd:18,dmg:440,range:320,len:540,shout:'DESTRUCTO DISC !!',col:'#ffe95a'},desc:'Son disque Destructo Disc tranche tout sur sa trajectoire.'},
  healer:{name:'Guérisseur namek',cost:400,time:10,hp:190,speed:60,heal:30,range:125,size:7,sight:6,look:'namek',desc:'Soigne les combattants alliés proches (pas les véhicules).'},
  jet:{name:'Avion Capsule',cost:600,time:11,hp:340,speed:125,dmg:12,range:140,rof:.45,proj:'bullet',fly:true,size:12,sight:9,at:'factory',veh:true,vsB:.5,desc:'Appareil volant rapide. Parfait pour éclairer la carte et chasser les Dragon Balls.'},
 },
 mha:{
  inf1:{name:'Sidekick',cost:100,time:5,hp:140,speed:60,dmg:10,range:18,rof:.8,melee:true,size:7,sight:5,look:'sidekick',desc:'Acolyte des pros, au corps à corps.'},
  inf2:{name:'Élève de Seconde A',cost:300,time:9,hp:250,speed:64,dmg:21,range:145,rof:1.3,proj:'quirk',size:8,sight:7,look:'student',vsB:.7,desc:'Alters variés : électricité, acide, laser, durcissement.'},
  harv:{name:'Camion de support',cost:700,time:14,hp:900,speed:46,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Récolte les cristaux de Ki.'},
  tank:{name:'Robot Faux-Vilain',cost:750,time:14,hp:950,speed:42,dmg:50,range:190,rof:2.1,proj:'missile',splash:34,size:16,sight:7,at:'factory',veh:true,vsB:1.4,desc:'Robot d’examen de Yuei, lance-missiles.'},
  allmight:{name:'All Might',hero:true,cost:2400,time:34,hp:2300,speed:82,dmg:75,range:20,rof:1.1,melee:true,size:12,look:'allmight',
    ab:{name:'United States of Smash',type:'dash_blast',cd:30,dmg:520,range:240,rad:130,knock:420,shout:'UNITED STATES OF SMASH !!',col:'#ffd23a'},desc:'Le Symbole de la Paix. Bondit et écrase tout.'},
  deku:{name:'Izuku Midoriya',hero:true,cost:1600,time:26,hp:1450,speed:98,dmg:42,range:20,rof:.7,melee:true,size:9,look:'deku',
    ab:{name:'Detroit Smash',type:'cone',cd:20,dmg:400,range:70,len:240,ang:.62,knock:480,shout:'DETROIT SMASH !!',col:'#7dff9a'},desc:'Très rapide. Onde de choc en cône.'},
  bakugo:{name:'Katsuki Bakugo',hero:true,cost:1700,time:26,hp:1400,speed:84,dmg:38,range:120,rof:1,proj:'explo',splash:28,size:9,look:'bakugo',
    ab:{name:'Howitzer Impact',type:'dash_blast',cd:22,dmg:400,range:280,rad:95,knock:200,shout:'HOWITZER IMPACT !!',col:'#ff9a3a'},desc:'Attaques explosives à zone.'},
  todoroki:{name:'Shoto Todoroki',hero:true,cost:1600,time:26,hp:1400,speed:76,dmg:34,range:160,rof:1.1,proj:'fire',size:9,look:'todoroki',
    ab:{name:'Mur de glace',type:'ice',cd:22,dmg:280,range:220,len:340,w:70,freeze:3.5,shout:'MUR DE GLACE !!',col:'#bff4ff'},desc:'Feu à distance, glace qui fige les ennemis.'},
  uraraka:{name:'Ochaco Uraraka',hero:true,cost:1300,time:20,hp:1250,speed:86,dmg:30,range:20,rof:.8,melee:true,size:9,look:'uraraka',
    ab:{name:'Zero Gravity',type:'lift',cd:22,dmg:320,range:250,rad:115,dur:2.6,shout:'ZERO GRAVITY !!',col:'#ff9ad8'},desc:'Fait léviter les ennemis, puis les laisse s’écraser au sol.'},
  healer:{name:'Infirmière de Yuei',cost:400,time:10,hp:190,speed:60,heal:30,range:125,size:7,sight:6,look:'nurse',desc:'Soigne les combattants alliés proches (pas les véhicules).'},
  jet:{name:'Drone de Hatsume',cost:600,time:11,hp:340,speed:125,dmg:12,range:140,rof:.45,proj:'bullet',fly:true,size:12,sight:9,at:'factory',veh:true,vsB:.5,desc:'Drone volant de la support-team. Parfait pour éclairer et chasser les Dragon Balls.'},
 }
};
const ULIST=['inf1','inf2','healer','harv','tank','jet'];
const SUPER={dbz:{name:'Spirit Bomb',charge:210,rad:170,dmg:1100,col:'#8fe0ff',shout:'SPIRIT BOMB !!',look:'goku',who:'Goku',delay:3},
  mha:{name:'Prominence Burn',charge:210,rad:155,dmg:1100,col:'#ff7a2a',shout:'PROMINENCE BURN !!',look:'endeavor',who:'Endeavor',delay:2.4}};
for(const f in UDEF)for(const k in UDEF[f]){const D=UDEF[f][k];D.key=k;D.fac=f;D.sight=D.sight||(D.hero?9:6);D.sightPx=D.sight*TILE;
  D.size=D.size||8;D.at=D.at||(D.hero?'temple':'barracks');D.rof=D.rof||1;D.req=D.req||[];if(D.hero)D.req=['temple'];}
const PSPD={spearb:420,bullet:760,ki:430,shell:390,missile:300,quirk:470,fire:360,explo:520,turret:470,bigball:380};

// ===== Map =====
let ter,ore,elev,blocked,bAt,oreCells,oreClaim,oreFx,N1;
let B0={x:11,y:68},B1={x:68,y:11},BASES=[B0,B1,null],PSIDES=[0,1],TEAM=[0,1,9,0,1],MAPID='vallee';
let PEACE=[0,0,0,0,0,0,0];// temporary truce: two enemy sides are allied while both have their flag up
const ally=(a,b)=>a===b||(a!==2&&b!==2&&a!=null&&b!=null&&(TEAM[a]===TEAM[b]||PEACE[a]===1&&PEACE[b]===1)),foe=(a,b)=>!ally(a,b),isPl=s=>s!=null&&s>=0&&s!==2&&s<7;
// ===== Maps: each one lists its start points, which ones a team gets for each mode, its symmetry and terrain =====
const MODE_N={'1v1':2,'2v2':4,'3v3':6};
function spSides(fmt){return fmt==='3v3'?[0,3,5,1,4,6]:fmt==='2v2'?[0,3,1,4]:[0,1];}// team A first, then team B
const LAYOUTS={
  diag2:S=>{const m=Math.round(S*.12);return{pts:[{x:m,y:S-1-m},{x:S-1-m,y:m}],def:{2:[0,1]}};},
  vallee:S=>({pts:[{x:11,y:68},{x:68,y:11}],def:{2:[0,1]}}),
  corners4:S=>{const m=Math.round(S*.1);return{pts:[{x:m,y:S-1-m},{x:m,y:m},{x:S-1-m,y:m},{x:S-1-m,y:S-1-m}],def:{2:[0,2],4:[0,1,2,3]}};},
  twin4:S=>{const m=12,h=S/2;return{pts:[{x:m,y:h+14},{x:m,y:h-14},{x:S-1-m,y:S-1-(h+14)},{x:S-1-m,y:S-1-(h-14)}],def:{2:[0,2],4:[0,1,2,3]}};},
  cross4:S=>{const m=Math.round(S*.1),c=Math.round(S/2);return{pts:[{x:m,y:c},{x:c,y:m},{x:S-1-m,y:S-1-c},{x:S-1-c,y:S-1-m}],def:{2:[0,2],4:[0,1,2,3]}};},
  cols6:S=>{const m=Math.round(S*.09),c=S/2,d=Math.round(S*.3),A=[{x:m,y:c-d},{x:m,y:c},{x:m,y:c+d}];return{pts:[...A,...A.map(p=>({x:S-1-p.x,y:S-1-p.y}))],def:{2:[1,4],4:[0,2,3,5],6:[0,1,2,3,4,5]}};},
  ring6:S=>{const R=S*.38,c=(S-1)/2,at=k=>({x:Math.round(c+Math.cos(PI/2+k*PI/3)*R),y:Math.round(c+Math.sin(PI/2+k*PI/3)*R)});return{pts:[at(0),at(2),at(4),at(3),at(5),at(1)],def:{2:[0,3],4:[0,1,3,4],6:[0,1,2,3,4,5]}};},
  mix6:S=>{const m=Math.round(S*.09),c=Math.round(S/2),A=[{x:m,y:m},{x:m,y:S-1-m},{x:c,y:S-1-m}];return{pts:[...A,...A.map(p=>({x:S-1-p.x,y:S-1-p.y}))],def:{2:[2,5],4:[0,1,3,4],6:[0,1,2,3,4,5]}};}};
const MAPS={
  arene:{name:'Arène',size:64,lay:'diag2',cat:'Petite',desc:'Petite carte 1v1 : bases proches, combats immédiats.'},
  vallee:{name:'Vallée des héros',size:80,lay:'vallee',cat:'Moyenne',desc:'Carte classique 1v1, combats rapides.'},
  gorge:{name:'Gorges rocheuses',size:88,lay:'diag2',cat:'Moyenne',terr:{r:.6,f:.7},desc:'1v1 dans un relief accidenté : beaucoup de rochers et de passages étroits.'},
  carrefour:{name:'Carrefour',size:96,lay:'corners4',sym:'quad',cat:'Moyenne',desc:'4 bases dans les coins : en 2v2, les alliés sont voisins.'},
  lac:{name:'Lac central',size:104,lay:'cross4',sym:'quad',cat:'Moyenne',lake:true,desc:'4 bases au milieu des bords, un lac au centre avec une île de cristaux reliée par des chaussées.'},
  fronts:{name:'Deux Fronts',size:112,lay:'twin4',cat:'Grande',desc:'Chaque équipe démarre côte à côte avec son partenaire, face à l’autre équipe.'},
  plaines:{name:'Grandes plaines',size:112,lay:'diag2',cat:'Grande',desc:'Grande carte 1v1 : plus de ressources et d’expansions, parties plus longues.'},
  royaumes:{name:'Les Quatre Royaumes',size:128,lay:'corners4',sym:'quad',cat:'Grande',desc:'Grande carte à 4 bases dans les coins : 2v2, ou 1v1 en diagonale.'},
  archipel:{name:'Archipel',size:128,lay:'corners4',sym:'quad',cat:'Grande',terr:{w:.43,s:.46},desc:'4 bases sur des îles séparées par l’eau : les volants et les chaussées sont précieux.'},
  bataille:{name:'Champ de bataille',size:144,lay:'cols6',cat:'Très grande',desc:'6 bases sur deux lignes : chaque équipe est alignée, côte à côte, face à l’autre. Idéal en 3v3.'},
  desert:{name:'Anneau du désert',size:144,lay:'ring6',cat:'Très grande',terr:{w:.28,s:.5,f:.82,d:.55},desc:'6 bases en cercle dans le désert : les alliés sont dispersés, entourés d’ennemis.'},
  continent:{name:'Continent sombre',size:160,lay:'corners4',sym:'quad',cat:'Immense',desc:'Immense carte à 4 bases : très longues parties, beaucoup d’expansions.'},
  terres:{name:'Terres immenses',size:176,lay:'mix6',cat:'Immense',desc:'La plus grande carte : 6 bases, certaines voisines, d’autres isolées. Pour de très longues parties en 3v3.'}};
for(const k in MAPS){const M=MAPS[k];M.players=LAYOUTS[M.lay](M.size).pts.length;}
function mapPts(id){const M=MAPS[id]||MAPS.vallee;return LAYOUTS[M.lay](M.size).pts;}
function mapDef(id,fmt){const M=MAPS[id]||MAPS.vallee,L=LAYOUTS[M.lay](M.size),n=MODE_N[fmt]||2,d=L.def[n]||L.def[2],o={};spSides(fmt).forEach((s,i)=>o[s]=d[i]);return o;}
const fmtFits=(id,fmt)=>MAPS[id]&&MAPS[id].players>=(MODE_N[fmt]||2);
function setMap(id,mode){if(mode===true)mode='2v2';else if(!mode)mode='1v1';const M=MAPS[id]||MAPS.vallee;MAPID=MAPS[id]?id:'vallee';if(!fmtFits(MAPID,mode))mode='1v1';
  MW=MH=M.size;WW=MW*TILE;WH=MH*TILE;NT=MW*MH;const P=mapPts(MAPID),D=mapDef(MAPID,mode);BASES=[];for(const s in D)BASES[s]=P[D[s]];B0=BASES[0];B1=BASES[1];
  PSIDES=[0,1,3,4,5,6].filter(s=>BASES[s]);TEAM=[0,1,9,0,1,0,1];
  if(PF.g.length!==NT){PF.g=new Float32Array(NT);PF.from=new Int32Array(NT);PF.open=new Uint32Array(NT);PF.closed=new Uint32Array(NT);PF.gen=0;}}
function posOk(pos,id,sides_){const n=mapPts(id).length,u=new Set();for(const s of sides_){const v=pos&&pos[s];if(!(v>=0&&v<n)||u.has(v))return false;u.add(v);}return true;}
function applySpawn(ST){if(ST.pos&&posOk(ST.pos,MAPID,PSIDES)){const P=mapPts(MAPID);for(const s of PSIDES)BASES[s]=P[ST.pos[s]];B0=BASES[0];B1=BASES[1];}}
const enemyBase=si=>{let best=null,bd=1e9;const me=BASES[si]||B0;for(const s of PSIDES){if(!foe(s,si)||!BASES[s])continue;const d=hyp(BASES[s].x-me.x,BASES[s].y-me.y);if(d<bd){bd=d;best=BASES[s];}}return best||B1;};
const nearBase=(x,y,r)=>BASES.some(b=>b&&hyp(x-b.x,y-b.y)<r);
function walk(x,y){return x>=0&&y>=0&&x<MW&&y<MH&&blocked[y*MW+x]===0;}
function blockedW(x,y){return x<0||y<0||x>=WW||y>=WH||blocked[Math.floor(y/TILE)*MW+Math.floor(x/TILE)]!==0;}
function bil(a,x,y){x=clamp(x,0,MW-1.001);y=clamp(y,0,MH-1.001);const x0=x|0,y0=y|0,fx=x-x0,fy=y-y0,i=y0*MW+x0;
  return lerp(lerp(a[i],a[i+1],fx),lerp(a[i+MW],a[i+MW+1],fx),fy);}

function genMap(seed){if(MAPID!=='vallee')return genMapBig(seed);
  const rng=mulberry(seed*7+3);N1=makeNoise(seed);const N2=makeNoise(seed+101);
  ter=new Uint8Array(NT);ore=new Float32Array(NT);elev=new Float32Array(NT);blocked=new Uint8Array(NT);bAt=new Array(NT).fill(null);oreClaim=new Uint8Array(NT);
  for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){
    const i=ti(x,y),e=N1.fbm(x/15,y/15,4),m=N2.fbm(x/10+30,y/10+30,3);
    elev[i]=e;let t=T_GRASS;
    if(e<.36)t=T_WATER;else if(e<.39)t=T_SAND;else if(e>.645)t=T_ROCK;else if(m>.6)t=T_FOREST;else if(m<.4)t=T_DIRT;
    ter[i]=t;
  }
  for(let i=0;i<NT;i++){const j=NT-1-i;if(j<i){ter[i]=ter[j];elev[i]=elev[j];}}
  const setT=(x,y,t,force)=>{if(x<0||y<0||x>=MW||y>=MH)return;const i=ti(x,y);if(force||ter[i]>=T_WATER){ter[i]=t;if(t<T_WATER&&elev[i]<.39)elev[i]=.42;}};
  const disc=(cx,cy,r,t,force)=>{for(let y=Math.floor(cy-r);y<=cy+r;y++)for(let x=Math.floor(cx-r);x<=cx+r;x++)if(hyp(x-cx,y-cy)<=r){setT(x,y,t,force);setT(MW-1-x,MH-1-y,t,force);}};
  const road=pts=>{for(let k=0;k<pts.length-1;k++){const[ax,ay]=pts[k],[bx,by]=pts[k+1];const L=hyp(bx-ax,by-ay),n=Math.ceil(L*2);
    for(let s=0;s<=n;s++){const t=s/n;let x=lerp(ax,bx,t),y=lerp(ay,by,t);const w=(N2.n(x/6,y/6)-.5)*6*Math.sin(t*PI);x+=-(by-ay)/L*w;y+=(bx-ax)/L*w;
      disc(x,y,2.4,T_GRASS,false);disc(x,y,.9,T_DIRT,true);}}};
  road([[B0.x,B0.y],[28,54],[39.5,39.5]]);
  road([[B0.x,B0.y],[13,42],[16,16],[40,11],[B1.x,B1.y]]);
  disc(B0.x,B0.y,9,T_GRASS,true);
  const fields=[[22,65,4],[6,55,3.5],[16,16,4.5],[39.5,39.5,5]];
  for(const[fx,fy,fr]of fields)disc(fx,fy,fr+1.6,T_GRASS,true);
  for(const[fx,fy,fr]of fields){for(let y=Math.floor(fy-fr);y<=fy+fr;y++)for(let x=Math.floor(fx-fr);x<=fx+fr;x++){
    const d=hyp(x-fx,y-fy);if(x<1||y<1||x>=MW-1||y>=MH-1)continue;
    if(d<=fr&&(d<fr*.55||N2.n(x*.7+9,y*.7+9)>.35)){const i=ti(x,y),a=Math.round(300+(1-d/fr)*500);ore[i]=a;ore[NT-1-i]=a;ter[i]=T_DIRT;ter[NT-1-i]=T_DIRT;}}}
  for(let i=0;i<NT;i++)blocked[i]=ter[i]>=T_WATER?1:0;
  const seen=new Uint8Array(NT),q=[ti(B0.x,B0.y)];seen[q[0]]=1;
  for(let h=0;h<q.length;h++){const i=q[h],x=i%MW,y=(i/MW)|0;
    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=MW||ny>=MH)continue;const j=ti(nx,ny);if(!seen[j]&&!blocked[j]){seen[j]=1;q.push(j);}}}
  for(let i=0;i<NT;i++)if(!blocked[i]&&!seen[i]){ter[i]=T_FOREST;blocked[i]=1;ore[i]=0;}
  oreCells=[];oreFx=[];for(let i=0;i<NT;i++)if(ore[i]>0){oreCells.push(i);
    oreFx[i]=[0,1,2].map(k=>({dx:rng()*20-10,dy:rng()*18-9,s:.7+rng()*.5,f:rng()<.5?-1:1,k}));}
}

function genMapBig(seed){const S=MW,M=MAPS[MAPID],quad=M.sym==='quad',T=Object.assign({w:.35,s:.38,r:.655,f:.62,d:.4},M.terr||{}),rng=mulberry(seed*7+3);N1=makeNoise(seed);const N2=makeNoise(seed+101);
  ter=new Uint8Array(NT);ore=new Float32Array(NT);elev=new Float32Array(NT);blocked=new Uint8Array(NT);bAt=new Array(NT).fill(null);oreClaim=new Uint8Array(NT);
  const canon=(x,y)=>{if(quad){for(let k=0;k<4;k++){if(x<S/2&&y>=S/2)return[x,y];const nx=S-1-y,ny=x;x=nx;y=ny;}return[x,y];}return y*S+x<NT/2?[x,y]:[S-1-x,S-1-y];};
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){const[cx,cy]=canon(x,y),i=ti(x,y),e=N1.fbm(cx/16,cy/16,4),m=N2.fbm(cx/11+30,cy/11+30,3);elev[i]=e;let t=T_GRASS;
    if(e<T.w)t=T_WATER;else if(e<T.s)t=T_SAND;else if(e>T.r)t=T_ROCK;else if(m>T.f)t=T_FOREST;else if(m<T.d)t=T_DIRT;ter[i]=t;}
  if(M.lake){const C=(S-1)/2,R=S*.17;for(let y=0;y<S;y++)for(let x=0;x<S;x++){const d=hyp(x-C,y-C);if(d<R+N2.n(x*.3,y*.3)*3){const i=ti(x,y);ter[i]=T_WATER;elev[i]=.3;}}}
  const setT=(x,y,t,force)=>{x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=S||y>=S)return;const i=ti(x,y);if(force||ter[i]>=T_WATER){ter[i]=t;if(t<T_WATER&&elev[i]<.39)elev[i]=.42;}};
  const disc=(cx,cy,r,t,force)=>{for(let y=Math.floor(cy-r);y<=cy+r;y++)for(let x=Math.floor(cx-r);x<=cx+r;x++)if(hyp(x-cx,y-cy)<=r)setT(x,y,t,force);};
  const road=pts=>{for(let k=0;k<pts.length-1;k++){const[ax,ay]=pts[k],[bx,by]=pts[k+1];const L=hyp(bx-ax,by-ay)||1,n=Math.ceil(L*2);
    for(let s=0;s<=n;s++){const t=s/n;let x=lerp(ax,bx,t),y=lerp(ay,by,t);const w=(N2.n(x/6,y/6)-.5)*6*Math.sin(t*PI);x+=-(by-ay)/L*w;y+=(bx-ax)/L*w;disc(x,y,2.6,T_GRASS,false);disc(x,y,1,T_DIRT,true);}}};
  const C=S/2-.5,bases=mapPts(MAPID),fields=[];
  for(const B of bases){const dx=Math.sign(C-B.x)||1,dy=Math.sign(C-B.y)||1;road([[B.x,B.y],[lerp(B.x,C,.5)+dy*4,lerp(B.y,C,.5)-dx*4],[C,C]]);disc(B.x,B.y,10,T_GRASS,true);
    fields.push([B.x+dx*11,B.y-dy*3,4.2],[B.x-dx*2,B.y+dy*12,3.8],[lerp(B.x,C,.42)-dy*7,lerp(B.y,C,.42)+dx*7,4.6]);}
  const nearPair=(a,b)=>{const d=hyp(bases[a].x-bases[b].x,bases[a].y-bases[b].y);return bases.filter((_,k)=>k!==a&&hyp(bases[a].x-bases[k].x,bases[a].y-bases[k].y)<d-.5).length<2;};
  for(let a=0;a<bases.length;a++)for(let b=a+1;b<bases.length;b++){const A=bases[a],B=bases[b];if(!nearPair(a,b)&&!nearPair(b,a))continue;const mx=(A.x+B.x)/2,my=(A.y+B.y)/2;road([[A.x,A.y],[lerp(mx,C,.25),lerp(my,C,.25)],[B.x,B.y]]);fields.push([lerp(mx,C,.18),lerp(my,C,.18),5]);}
  fields.push([C,C,6.5]);for(const[fx,fy,fr]of fields)disc(fx,fy,fr+1.6,T_GRASS,true);
  for(const[fx,fy,fr]of fields)for(let y=Math.floor(fy-fr);y<=fy+fr;y++)for(let x=Math.floor(fx-fr);x<=fx+fr;x++){const d=hyp(x-fx,y-fy);if(x<1||y<1||x>=S-1||y>=S-1)continue;
    if(d<=fr&&(d<fr*.55||N2.n(x*.7+9,y*.7+9)>.35)){const i=ti(x,y);ore[i]=Math.round(300+(1-d/fr)*500);ter[i]=T_DIRT;}}
  for(let i=0;i<NT;i++)blocked[i]=ter[i]>=T_WATER?1:0;
  const seen=new Uint8Array(NT),q=[ti(B0.x,B0.y)];seen[q[0]]=1;
  for(let h=0;h<q.length;h++){const i=q[h],x=i%MW,y=(i/MW)|0;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=MW||ny>=MH)continue;const j=ti(nx,ny);if(!seen[j]&&!blocked[j]){seen[j]=1;q.push(j);}}}
  for(let i=0;i<NT;i++)if(!blocked[i]&&!seen[i]){ter[i]=T_FOREST;blocked[i]=1;ore[i]=0;}
  oreCells=[];oreFx=[];for(let i=0;i<NT;i++)if(ore[i]>0){oreCells.push(i);oreFx[i]=[0,1,2].map(k=>({dx:rng()*20-10,dy:rng()*18-9,s:.7+rng()*.5,f:rng()<.5?-1:1,k}));}}

// ===== Terrain painting (pre-rendered once, CoH-like ground) =====
let terr,terrMini;
function renderTerrain(seed){
  const rng=mulberry(seed+55),Nb=makeNoise(seed+7),N=N1;
  const S=2,w=WW/S,h=WH/S,cv=document.createElement('canvas');cv.width=w;cv.height=h;
  const cx=cv.getContext('2d'),img=cx.createImageData(w,h),d=img.data,tm=new Uint8Array(w*h);
  for(let py=0;py<h;py++)for(let px=0;px<w;px++){
    const X=px*S,Y=py*S,wx=X+(N.n(px/20,py/20)-.5)*30,wy=Y+(N.n(px/20+50,py/20+50)-.5)*30;
    const tx=clamp(Math.floor(wx/TILE),0,MW-1),ty=clamp(Math.floor(wy/TILE),0,MH-1);
    let t=ter[ty*MW+tx];if(t===T_DIRT&&ore[ty*MW+tx]>0)t=6;tm[py*w+px]=t;
  }
  const C=[[[84,128,46],[124,166,60]],[[150,118,76],[120,92,58]],[[214,194,140],[192,170,116]],null,null,[[46,82,34],[64,104,42]],[[128,92,60],[104,76,50]]];
  for(let py=0;py<h;py++)for(let px=0;px<w;px++){
    const i=py*w+px,t=tm[i],X=px*S,Y=py*S;
    const n1=Nb.n(px/2.2,py/2.2),n2=Nb.fbm(px/45,py/45,3),n3=N.n(px/9+200,py/9);
    let r,g,b;const sp=(n1-.5)*16+(n3-.5)*12;
    if(t===T_WATER){const e=bil(elev,X/TILE-.5,Y/TILE-.5),dep=clamp((.37-e)/.07,0,1);
      r=lerp(78,20,dep)+(n3-.5)*8;g=lerp(170,72,dep)+(n3-.5)*10;b=lerp(196,132,dep)+(n2-.5)*14;}
    else if(t===T_ROCK){const e=bil(elev,X/TILE-.5,Y/TILE-.5),k=clamp((e-.64)/.08,0,1),s=Math.sin((px*.9+py*.35)/2.6+n2*12)*7;
      r=lerp(124,176,k)+sp+s;g=lerp(114,164,k)+sp+s;b=lerp(104,148,k)+sp*.8+s;}
    else{const[a,bb]=C[t],f=clamp(n2*1.7-.35,0,1);r=lerp(a[0],bb[0],f)+sp;g=lerp(a[1],bb[1],f)+sp;b=lerp(a[2],bb[2],f)+sp*.6;
      if(t===T_GRASS){const yp=clamp((Nb.n(px/30+90,py/30)-.62)*4,0,1);r=lerp(r,170,yp*.45);g=lerp(g,168,yp*.3);b=lerp(b,74,yp*.45);}}
    if(t!==T_WATER){const ea=N.fbm(X/480,Y/480,4),eb=N.fbm((X+10)/480,(Y+10)/480,4),sl=clamp(1+(ea-eb)*48+(t===T_ROCK?(n2-.5)*.3:0)+(ea-.5)*.12,.8,1.22);r*=sl;g*=sl;b*=sl;}
    const L=px>2?tm[i-2]:t,Rt=px<w-3?tm[i+2]:t,U=py>2?tm[i-2*w]:t,Dn=py<h-3?tm[i+2*w]:t;
    if(L!==t||Rt!==t||U!==t||Dn!==t){
      if(t===T_WATER){r=lerp(r,226,.6);g=lerp(g,240,.6);b=lerp(b,242,.6);}
      else if(t===T_ROCK){r*=.5;g*=.5;b*=.55;}
      else if(L===T_ROCK||Rt===T_ROCK||U===T_ROCK||Dn===T_ROCK){r*=.72;g*=.72;b*=.72;}
      else if(L===T_WATER||Rt===T_WATER||U===T_WATER||Dn===T_WATER){r*=.78;g*=.82;b*=.86;}
      else{r*=.94;g*=.94;b*=.94;}
    }
    const j=i*4;d[j]=r;d[j+1]=g;d[j+2]=b;d[j+3]=255;
  }
  cx.putImageData(img,0,0);
  terr=document.createElement('canvas');terr.width=WW;terr.height=WH;
  const c=terr.getContext('2d');c.imageSmoothingEnabled=true;c.drawImage(cv,0,0,WW,WH);
  // grass tufts, flowers, pebbles
  for(let k=0;k<9000;k++){const x=rng()*WW,y=rng()*WH,t=ter[tileOf(y)*MW+tileOf(x)];
    if(t===T_GRASS&&!ore[tileOf(y)*MW+tileOf(x)]){c.strokeStyle=rng()<.5?'rgba(38,74,26,.55)':'rgba(170,214,92,.45)';c.lineWidth=1;c.beginPath();
      for(let s=-1;s<=1;s++){c.moveTo(x+s*1.5,y);c.lineTo(x+s*2.6+rng()-.5,y-3-rng()*3);}c.stroke();}
    else if(t===T_DIRT||t===T_SAND){c.fillStyle=rng()<.5?'rgba(70,52,34,.45)':'rgba(220,200,160,.35)';c.beginPath();c.ellipse(x,y,1+rng()*2,1+rng()*1.3,0,0,PI2);c.fill();}}
  for(let k=0;k<700;k++){const x=rng()*WW,y=rng()*WH;if(ter[tileOf(y)*MW+tileOf(x)]!==T_GRASS)continue;
    c.fillStyle=pickR(rng,['#fff6d0','#ffd94a','#ff8fb8','#c9b8ff']);c.beginPath();c.arc(x,y,1.4,0,PI2);c.fill();}
  // cliffs and boulders
  for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){if(ter[ti(x,y)]!==T_ROCK)continue;const X=x*TILE,Y=y*TILE;
    if(y<MH-1&&ter[ti(x,y+1)]!==T_ROCK){const cg=c.createLinearGradient(0,Y+TILE-6,0,Y+TILE+18);cg.addColorStop(0,'#7a7068');cg.addColorStop(.35,'#5a524a');cg.addColorStop(1,'#2e2a26');c.fillStyle=cg;c.beginPath();c.moveTo(X,Y+TILE-6);
      for(let s=0;s<=4;s++)c.lineTo(X+s*8,Y+TILE+10+rng()*8);c.lineTo(X+TILE,Y+TILE-6);c.closePath();c.fill();
      c.strokeStyle='rgba(30,26,24,.6)';c.lineWidth=1;for(let s=0;s<4;s++){const sx=X+4+s*8+rng()*3;c.beginPath();c.moveTo(sx,Y+TILE-4);c.lineTo(sx+rng()*2-1,Y+TILE+3);c.stroke();}}
    if(rng()<.55)boulder(c,X+8+rng()*16,Y+8+rng()*14,5+rng()*7,rng);}
  // shoreline boulders on sand
  // trees
  const trees=[];for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){if(ter[ti(x,y)]!==T_FOREST)continue;const n=1+(rng()<.6?1:0);
    for(let k=0;k<n;k++)trees.push([x*TILE+6+rng()*20,y*TILE+8+rng()*18,10+rng()*6,rng()]);}
  trees.sort((a,b)=>a[1]-b[1]);
  c.fillStyle='rgba(10,24,8,.3)';for(const[x,y,r]of trees){c.beginPath();c.ellipse(x+13,y+6,r*1.5,r*.62,.35,0,PI2);c.fill();}
  for(const t of trees)tree(c,...t);
  terrMini=document.createElement('canvas');terrMini.width=400;terrMini.height=400;
  const m=terrMini.getContext('2d');m.imageSmoothingEnabled=true;m.drawImage(terr,0,0,400,400);
  scorchCtx=c;
}
function pickR(rng,a){return a[(rng()*a.length)|0];}
function boulder(c,x,y,s,rng){const n=7,pts=[];for(let k=0;k<n;k++){const a=k/n*PI2,r=s*(.75+rng()*.35);pts.push([x+Math.cos(a)*r,y+Math.sin(a)*r*.8]);}
  c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+3,y+3,s,s*.7,0,0,PI2);c.fill();
  const g=c.createLinearGradient(x-s,y-s,x+s,y+s);g.addColorStop(0,'#c9c0b2');g.addColorStop(.5,'#9a9084');g.addColorStop(1,'#5f5850');
  c.fillStyle=g;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();c.strokeStyle='#3a332e';c.lineWidth=1.2;c.stroke();
  c.strokeStyle='rgba(255,255,240,.5)';c.beginPath();c.moveTo(pts[3][0]+2,pts[3][1]+1);c.lineTo(pts[5][0]+1,pts[5][1]+2);c.stroke();}
function tree(c,x,y,r,v){const cols=v<.5?['#1f3c18','#2f5a24','#4a8331','#79b244']:['#20391c','#355d27','#55893a','#8cbf52'];
  c.fillStyle='#4a3020';c.fillRect(x-2,y-9,4,11);c.fillStyle='#2e1c12';c.fillRect(x+.5,y-9,1.5,11);y-=6;
  const lobes=[[0,-r*.35,r*.75],[-r*.5,-r*.1,r*.6],[r*.5,-r*.1,r*.6],[-r*.25,-r*.6,r*.55],[r*.3,-r*.62,r*.5]];
  c.fillStyle=cols[0];for(const[a,b,s]of lobes){c.beginPath();c.arc(x+a,y-6+b,s+1.4,0,PI2);c.fill();}
  c.fillStyle=cols[1];for(const[a,b,s]of lobes){c.beginPath();c.arc(x+a,y-6+b,s,0,PI2);c.fill();}
  c.fillStyle=cols[2];for(const[a,b,s]of lobes){c.beginPath();c.arc(x+a-s*.22,y-6+b-s*.25,s*.62,0,PI2);c.fill();}
  c.fillStyle=cols[3];for(const[a,b,s]of lobes.slice(3)){c.beginPath();c.arc(x+a-s*.35,y-6+b-s*.4,s*.28,0,PI2);c.fill();}}
let scorchCtx=null;
function scorch(x,y,r,a=.55){if(!scorchCtx)return;const c=scorchCtx,g=c.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,`rgba(22,16,12,${a})`);g.addColorStop(.6,`rgba(30,22,16,${a*.6})`);g.addColorStop(1,'rgba(30,22,16,0)');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,PI2);c.fill();}
function scorchLine(x1,y1,x2,y2,w){if(!scorchCtx)return;const c=scorchCtx;c.save();c.lineCap='round';c.strokeStyle='rgba(24,18,14,.35)';c.lineWidth=w*1.1;
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.strokeStyle='rgba(16,12,10,.35)';c.lineWidth=w*.5;c.stroke();c.restore();}
function rubble(b){if(!scorchCtx)return;const c=scorchCtx,x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;scorch(x0+W/2,y0+H/2,Math.max(W,H)*.75,.6);
  for(let k=0;k<b.w*b.h*5;k++){const x=x0+R()*W,y=y0+R()*H,s=2+R()*5;c.fillStyle=pick(['#5a5650','#3e3a36','#6e665c','#2a2624']);c.save();c.translate(x,y);c.rotate(R()*PI);c.fillRect(-s/2,-s/3,s,s*.66);c.restore();}}

// ===== Pathfinding (A*, 8 directions, no corner cutting) =====
var PF={g:new Float32Array(NT),from:new Int32Array(NT),open:new Uint32Array(NT),closed:new Uint32Array(NT),gen:0,heap:[],hf:[]};
const DIRS=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.4142],[1,-1,1.4142],[-1,1,1.4142],[-1,-1,1.4142]];
function hpush(i,f){const H=PF.heap,F=PF.hf;let k=H.length;H.push(i);F.push(f);while(k>0){const p=(k-1)>>1;if(F[p]<=F[k])break;[H[p],H[k]]=[H[k],H[p]];[F[p],F[k]]=[F[k],F[p]];k=p;}}
function hpop(){const H=PF.heap,F=PF.hf,top=H[0],lh=H.pop(),lf=F.pop();if(H.length){H[0]=lh;F[0]=lf;let k=0;const n=H.length;
  for(;;){const l=2*k+1,r=l+1;let m=k;if(l<n&&F[l]<F[m])m=l;if(r<n&&F[r]<F[m])m=r;if(m===k)break;[H[m],H[k]]=[H[k],H[m]];[F[m],F[k]]=[F[k],F[m]];k=m;}}return top;}
function nearestFree(tx,ty,maxR,rx,ry){if(walk(tx,ty))return[tx,ty];let best=null,bs=1e9;
  for(let r=1;r<=maxR;r++){for(let y=ty-r;y<=ty+r;y++)for(let x=tx-r;x<=tx+r;x++){if(Math.max(Math.abs(x-tx),Math.abs(y-ty))!==r||!walk(x,y))continue;
    const s=hyp(x-tx,y-ty)+(rx!==undefined?hyp(x-rx,y-ry)*.02:0);if(s<bs){bs=s;best=[x,y];}}if(best)return best;}return null;}
function findPath(sx,sy,gx,gy){
  if(!walk(sx,sy)){const n=nearestFree(sx,sy,3);if(n){sx=n[0];sy=n[1];}}
  if(!walk(gx,gy)){const n=nearestFree(gx,gy,18,sx,sy);if(!n)return null;gx=n[0];gy=n[1];}
  const s=ti(sx,sy),goal=ti(gx,gy);if(s===goal)return[];
  const gen=++PF.gen;PF.heap.length=0;PF.hf.length=0;
  const hh=(x,y)=>{const dx=Math.abs(x-gx),dy=Math.abs(y-gy);return Math.max(dx,dy)+.4142*Math.min(dx,dy);};
  PF.g[s]=0;PF.open[s]=gen;PF.from[s]=-1;hpush(s,hh(sx,sy));let best=s,bh=hh(sx,sy),exp=0;
  while(PF.heap.length){const i=hpop();if(PF.closed[i]===gen)continue;PF.closed[i]=gen;if(i===goal){best=i;break;}
    const x=i%MW,y=(i/MW)|0,hv=hh(x,y);if(hv<bh){bh=hv;best=i;}if(++exp>5000)break;
    for(const[dx,dy,c]of DIRS){const nx=x+dx,ny=y+dy;if(!walk(nx,ny))continue;if(dx&&dy&&(!walk(x+dx,y)||!walk(x,y+dy)))continue;
      const j=ti(nx,ny);if(PF.closed[j]===gen)continue;const ng=PF.g[i]+c;if(PF.open[j]===gen&&ng>=PF.g[j])continue;
      PF.open[j]=gen;PF.g[j]=ng;PF.from[j]=i;hpush(j,ng+hh(nx,ny)*1.05);}}
  const out=[];for(let i=best;i!==s&&i!==-1;i=PF.from[i])out.push(i);out.reverse();return out;
}
function lineClear(x0,y0,x1,y1){const d=hyp(x1-x0,y1-y0),n=Math.ceil(d/8);
  for(let i=1;i<=n;i++){const t=i/n,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t;if(blockedW(x,y)||blockedW(x+6,y)||blockedW(x-6,y)||blockedW(x,y+6)||blockedW(x,y-6))return false;}return true;}
function smooth(pts,sx,sy){const out=[];let cx=sx,cy=sy,i=0;
  while(i<pts.length){let j=Math.min(pts.length-1,i+24);while(j>i&&!lineClear(cx,cy,pts[j].x,pts[j].y))j--;out.push(pts[j]);cx=pts[j].x;cy=pts[j].y;i=j+1;}return out;}
