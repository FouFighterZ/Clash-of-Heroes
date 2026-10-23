// ===== Expansion 2: many more buildings, legends (incl. Dragon Ball Super), fusion, Ultra Instinct =====
FAC.dbz.anime='Dragon Ball Z · Super';
Object.assign(BDEF,{
  market:{key:'market',w:2,h:2,hp:900,cost:900,time:14,pow:-20,sight:5,req:['refinery'],income:4,names:{dbz:'Boutique de capsules',mha:'Agence de communication',aot:'Marché du district'},desc:'Rapporte 240 par minute, sans rien faire.'},
  hospital:{key:'hospital',w:2,h:2,hp:1000,cost:800,time:14,pow:-25,sight:6,req:['barracks'],healA:14,hrad:230,names:{dbz:'Tour de Karin',mha:'Infirmerie de Recovery Girl',aot:'Hôpital militaire'},desc:'Soigne en continu les combattants alliés proches.'},
  training:{key:'training',w:2,h:2,hp:1000,cost:1000,time:16,pow:-30,sight:6,req:['barracks','lab'],xpA:12,xrad:200,names:{dbz:'Salle de l’Esprit et du Temps',mha:'Gymnase Gamma',aot:'Terrain d’entraînement'},desc:'Les unités alliées proches gagnent de l’expérience en continu.'},
  temple2:{key:'temple2',w:3,h:3,hp:2200,cost:2000,time:28,pow:-80,sight:8,req:['temple','lab'],names:{dbz:'Planète de Beerus',mha:'Commission de sécurité',aot:'Quartier des Guerriers'},desc:'Recrute les légendes, les personnages les plus puissants (onglet Légendes).'},
  unique:{key:'unique',w:2,h:2,hp:1100,cost:1200,time:18,pow:-35,sight:6,req:['temple'],names:{dbz:'Machine à remonter le temps',mha:'Dortoirs Heights Alliance',aot:'Écurie du Bataillon'},desc:'Bâtiment propre à ton camp.',
    descs:{dbz:'Toutes les 3 minutes, ramène gratuitement un héros tombé au combat.',mha:'Toutes les 50 s, un élève de Yuei rejoint gratuitement ton armée.',aot:'Toutes les 60 s, un éclaireur à cheval rejoint gratuitement ton armée.'}},
});
Object.assign(BDEF.wall.names,{dbz:'Barrière de Ki',mha:'Mur de Cementoss'});BDEF.wall.only=null;
const B_MAIN2=['power','refinery','barracks','factory','lab','market'],B_SPEC=['temple','temple2','hospital','training','unique'],B_DEF2=['turret','def2','radar','wall'];
Object.assign(BH_EXTRA,{market:{dbz:40,mha:56,aot:34},hospital:{dbz:118,mha:44,aot:48},training:{dbz:44,mha:48,aot:34},temple2:{dbz:84,mha:96,aot:86},unique:{dbz:46,mha:76,aot:40},wall:{dbz:30,mha:30,aot:30}});
// ---- legends ----
const LEG={
 dbz:{
  beerus:{name:'Beerus',cost:3200,time:40,hp:2700,speed:84,dmg:70,range:150,rof:.9,proj:'ki',fly:true,size:11,look:'beerus',ab:{name:'Hakai',type:'hakai',cd:40,range:280,shout:'HAKAI.',col:'#b04aff'},desc:'Dieu de la Destruction (DBS). Hakai : efface une unité d’un geste.'},
  whis:{name:'Whis',cost:2600,time:34,hp:2200,speed:96,dmg:34,range:160,rof:.7,proj:'ki',fly:true,size:10,look:'whis',ab:{name:'Retour temporel',type:'rewind',cd:45,rad:320,shout:'RETOUR EN ARRIÈRE…',col:'#7fd0ff'},desc:'Ange de l’univers 7 (DBS). Remonte le temps : soigne et libère tous les alliés proches.'},
  broly:{name:'Broly',cost:3000,time:38,hp:3600,speed:80,dmg:72,range:22,rof:.9,melee:true,splash:34,size:13,look:'broly',saiyan:true,ab:{name:'Fureur légendaire',type:'rage',cd:35,dur:15,range:0,shout:'KAKAROT !!',col:'#7dff6a'},desc:'Le Super Saiyan légendaire (DBS). Plus il est blessé, plus il frappe fort.'},
  c17:{name:'Android 17',cost:2400,time:32,hp:2000,speed:90,dmg:44,range:165,rof:.8,proj:'ki',fly:true,size:10,look:'c17',ab:{name:'Barrière',type:'barrier',cd:30,rad:230,dur:8,shield:450,shout:'BARRIÈRE !',col:'#7dffa0'},desc:'Androïde garde forestier (DBS). Protège les alliés proches d’une barrière d’énergie.'},
 },
 mha:{
  mirio:{name:'Lemillion',cost:2400,time:32,hp:2000,speed:104,dmg:58,range:20,rof:.6,melee:true,size:10,look:'mirio',ab:{name:'Perméation',type:'phase',cd:18,dmg:420,range:300,w:46,shout:'PHANTOM MENACE !',col:'#ffd23a'},desc:'Traverse la matière : devient intouchable et charge à travers les ennemis.'},
  jeanist:{name:'Best Jeanist',cost:2200,time:30,hp:1800,speed:82,dmg:34,range:170,rof:.8,proj:'bullet',size:10,look:'jeanist',ab:{name:'Ligotage textile',type:'bind',cd:24,range:300,rad:130,dur:3.5,shout:'BEST JEANIST !',col:'#5a8ad8'},desc:'Immobilise tous les ennemis d’une zone avec ses fibres.'},
  mtlady:{name:'Mt. Lady',cost:2600,time:34,hp:2000,speed:80,dmg:44,range:20,rof:.8,melee:true,size:10,look:'mtlady',ab:{name:'Gigantification',type:'shift',cd:45,dur:22,form:'giantess',range:0,shout:'CANYON CANNON !',col:'#c8a0ff'},desc:'Devient géante pendant 22 s et piétine tout.'},
  eraser:{name:'Eraser Head',cost:2300,time:30,hp:1700,speed:94,dmg:40,range:60,rof:.7,melee:true,size:10,look:'eraser',ab:{name:'Effacement',type:'erase',cd:26,rad:300,dur:9,shout:'EFFACEMENT.',col:'#ff3a3a'},desc:'Annule les transformations et bloque les attaques spéciales des héros ennemis proches.'},
 },
 aot:{
  annie:{name:'Annie Leonhart',cost:2500,time:34,hp:1400,speed:92,dmg:48,range:18,rof:.6,melee:true,size:9,look:'annie',odm:true,nape:true,ab:{name:'Titan Féminin',type:'shift',cd:45,dur:24,form:'female',range:0,shout:'TITAN FÉMININ !!',col:'#a8d8ff'},desc:'Se transforme en Titan Féminin, rapide et agile.'},
  zeke:{name:'Zeke Jäger',cost:3000,time:38,hp:1500,speed:80,dmg:30,range:150,rof:1,proj:'bullet',size:9,look:'zeke',ab:{name:'Titan Bestial',type:'shift',cd:50,dur:26,form:'beast',range:0,shout:'TITAN BESTIAL !!',col:'#c8a070'},desc:'Devient le Titan Bestial : lance des pluies de rochers à longue portée.'},
  jean:{name:'Jean Kirstein',cost:1800,time:26,hp:1400,speed:96,dmg:44,range:18,rof:.65,melee:true,size:9,look:'jean',odm:true,nape:true,ab:{name:'Commandement',type:'rally',cd:26,dur:12,rad:260,shout:'EN AVANT !!',col:'#6fa4ff'},desc:'Meneur né : galvanise les troupes proches.'},
  pieck:{name:'Pieck Finger',cost:2200,time:30,hp:1300,speed:84,dmg:28,range:150,rof:1,proj:'bullet',size:9,look:'pieck',ab:{name:'Titan Charrette',type:'shift',cd:40,dur:30,form:'cart',range:0,shout:'TITAN CHARRETTE !',col:'#d8c8a0'},desc:'Devient le Titan Charrette, armé d’un canon, très endurant.'},
 }};
for(const f in LEG){FAC[f].legends=Object.keys(LEG[f]);for(const k in LEG[f]){const D=LEG[f][k];D.key=k;D.fac=f;D.hero=true;D.legend=true;D.sight=10;D.sightPx=10*TILE;D.at='temple2';D.req=['temple2'];UDEF[f][k]=D;}}
UDEF.dbz.vegito={key:'vegito',fac:'dbz',name:'Vegito',hero:true,cost:0,time:1,hp:3400,speed:100,dmg:95,range:150,rof:.7,proj:'ki',fly:true,size:11,look:'vegito',saiyan:true,at:'none',req:[],sight:10,sightPx:320,
  ab:{name:'Final Kamehameha',type:'beam',cd:18,dmg:950,range:320,len:500,w:54,shout:'FINAL KAMEHAMEHA !!',col:'#7fd0ff'},desc:'La fusion Potara de Goku et Vegeta. Dure 45 secondes.'};
UDEF.dbz.gogeta=Object.assign({},UDEF.dbz.vegito,{key:'gogeta',name:'Gogeta',hp:3000,dmg:110,look:'gogeta',
  ab:{name:'Big Bang Kamehameha',type:'beam',cd:18,dmg:1050,range:320,len:500,w:58,shout:'BIG BANG KAMEHAMEHA !!',col:'#9fe8ff'},desc:'Goku et Vegeta après la Danse de la Fusion. Moins résistant que Vegito mais frappe plus fort. Dure 45 secondes.'});
UDEF.neu.jiren={key:'jiren',fac:'neu',name:'Jiren',cost:4000,hp:6800,speed:72,dmg:120,range:26,rof:1,melee:true,splash:40,size:14,sight:11,sightPx:352,look:'jiren',tsc:1.6,regen:25,bounty:4000,at:'none',req:[],desc:'Le guerrier le plus fort de l’univers 11. Rapporte 4000.'};
EVENTS.push({id:'tournoi',fac:'dbz',name:'Le Tournoi du Pouvoir',col:'#ff5a3a',desc:'Jiren descend dans l’arène et attaque tout le monde. Celui qui l’abat empoche 4000.'});
Object.assign(FORMS,{giantess:{look:'mtlady',sc:3.3,size:22,speed:62,dmg:92,range:34,rof:1.3,melee:true,splash:50,shield:2000,sightPx:11*TILE},
  female:{look:'titan_female',sc:2.7,size:20,speed:98,dmg:85,range:30,rof:.9,melee:true,splash:30,shield:1800,sightPx:11*TILE},
  beast:{look:'titan_beast',sc:3,size:22,speed:52,dmg:110,range:280,rof:2.4,melee:false,proj:'rock',splash:60,shield:2200,sightPx:13*TILE},
  cart:{look:'titan_cart',sc:2.3,size:18,speed:92,dmg:60,range:210,rof:1.6,melee:false,proj:'shell',splash:30,shield:1700,sightPx:11*TILE}});
PSPD.rock=300;
UPG.dbz.push({id:'divine',name:'Ki divin',desc:'Héros +25 % de dégâts, les Saiyans passent Super Saiyan Blue',cost:1600,time:34,cls:'hero',dmg:1.25});UPG_BY_ID.divine=UPG.dbz[UPG.dbz.length-1];
// ---- abilities ----
function execAbility3(u,c,ab,dx,dy,L){switch(ab.type){
  case'hakai':{let t=null,bd=90;for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const d=hyp(e.x-c.x,e.y-c.y)-(e.isB?e.w*14:e.r);if(d<bd){bd=d;t=e;}}if(!t){u.abCd=2;return true;}
    fxs.push({type:'hakai',x:t.x,y:t.y-(t.z||0)-14,t:0,dur:1});if(t.isB)damage(t,2600,u.side,u);else if(t.key==='whis'||t.D.baseKey==='whis'){if(u.side===PL||t.side===PL)msg('Whis esquive le Hakai d’un sourire : les anges y sont immunisés.','#7fd0ff');}else if(t.key==='saitama'){damage(t,2500,u.side,u);if(u.side===PL||t.side===PL)msg('Saitama encaisse le Hakai… et se gratte la tête.','#ffc21a');}else{if(t.form)endShift(t);t.shield=0;t.ui=0;damage(t,t.hp*10+99999,u.side,u);}
    sfx('transform',t.x,t.y);shake(6);return true;}
  case'rewind':{for(const e of ents)if(!e.dead&&e.isU&&ally(e.side,u.side)&&hyp(e.x-u.x,e.y-u.y)<ab.rad){e.hp=e.max;e.freeze=0;e.lift=0;e.erased=0;fxRing(e.x,e.y,ab.col,22);}
    for(let k=0;k<3;k++)fxRing(u.x,u.y,ab.col,ab.rad*(.4+k*.3));sfx('lift',u.x,u.y);return true;}
  case'barrier':{for(const e of ents)if(!e.dead&&e.isU&&ally(e.side,u.side)&&hyp(e.x-u.x,e.y-u.y)<ab.rad){e.shield=Math.max(e.shield||0,ab.shield);e.bubble=ab.dur;}fxRing(u.x,u.y,ab.col,ab.rad);sfx('charge-s',u.x,u.y);return true;}
  case'phase':{u.harden=4.5;return false;}
  case'bind':{for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&hyp(e.x-c.x,e.y-c.y)<ab.rad+e.r){e.freeze=Math.max(e.freeze,ab.dur*(e.D.hero?.5:1));e.path=null;}
    fxs.push({type:'bind',x:c.x,y:c.y,r:ab.rad,t:0,dur:1.2,sx:u.x,sy:u.y});sfx('whoosh',c.x,c.y);return true;}
  case'erase':{for(const e of ents)if(!e.dead&&e.isU&&!ally(e.side,u.side)&&e.D.hero&&hyp(e.x-u.x,e.y-u.y)<ab.rad){e.erased=ab.dur;if(e.form)endShift(e);e.buff=0;e.ui=0;e.casting=null;}
    fxRing(u.x,u.y,ab.col,ab.rad);part('flash',u.x,u.y-20,0,0,.4,50,'#ff3a3a');sfx('charge-s',u.x,u.y);return true;}}
  return false;}
// ---- per-unit DBS passives: Ultra Instinct, barrier bubble, erased ----
function updPassives2(u,dt){if(u.bubble>0){u.bubble-=dt;if(u.bubble<=0&&!u.form)u.shield=0;}
  if(u.erased>0)u.erased-=dt;if(u.ui>0)u.ui-=dt;if(u.uiCd>0)u.uiCd-=dt;
  if(u.key==='goku'&&!u.ui&&!(u.uiCd>0)&&uiReady(u)&&!u.dead){u.ui=1e9;u.uiCd=1e9;u._uicd=90;u.hp=Math.min(u.max,u.hp+u.max*.25);if(plSees(u))cutin(u,'ULTRA INSTINCT !!');fxRing(u.x,u.y,'#dfe8ff',80);sfx('transform',u.x,u.y);}}
// ---- special buildings ----
function updSpecialB(b,dt){if(b.rise<1)return;const D=b.D,s=sides[b.side];
  if(D.income)s.credits+=D.income*(1+.6*(((b)&&(b).lvl||1)-1))*dt*(s.use>s.pow?.5:1);
  if(D.healA){b.hT=(b.hT||0)-dt;if(b.hT<=0){b.hT=.5;for(const e of ents)if(!e.dead&&e.isU&&ally(e.side,b.side)&&!e.D.veh&&e.hp<e.max&&hyp(e.x-b.x,e.y-b.y)<D.hrad){e.hp=Math.min(e.max,e.hp+D.healA*.5*(1+.4*(((b)&&(b).lvl||1)-1)));if(R()<.3)part('spark',e.x,e.y-16,0,-30,.5,2,'#7dffa0');}}}
  if(D.xpA){b.xT=(b.xT||0)-dt;if(b.xT<=0){b.xT=1;for(const e of ents)if(!e.dead&&e.isU&&ally(e.side,b.side)&&!e.D.harv&&hyp(e.x-b.x,e.y-b.y)<D.xrad){giveXP(e,D.xpA*(1+.4*(((b)&&(b).lvl||1)-1)));if(R()<.3)part('spark',e.x,e.y-20,0,-40,.6,2,'#ffd23a');}}}
  if(b.key==='unique'){b.uT=(b.uT||0)+dt;const f=b.fac;
    if(f==='dbz'&&b.uT>=180&&s.fallen&&s.fallen.length){const k=s.fallen.find(k=>!heroBusy(b.side,k));if(k){b.uT=0;s.fallen.splice(s.fallen.indexOf(k),1);const u=spawnFrom(b,k);part('flash',u.x,u.y-20,0,0,.5,80,'#ffe14d');if(b.side===PL)msg('La machine à remonter le temps ramène '+u.D.name+' !','#ffd23a');}}
    if(f==='mha'&&b.uT>=50){b.uT=0;spawnFrom(b,'inf2');}
    if(f==='aot'&&b.uT>=60){b.uT=0;spawnFrom(b,'jet');}}}
// ---- Potara fusion ----
function fusionPair(list){const g=list.find(e=>e.isU&&!e.dead&&e.key==='goku'&&!e.form),v=list.find(e=>e.isU&&!e.dead&&e.key==='vegeta'&&e.side===(g&&g.side));
  if(!g||!v||hyp(g.x-v.x,g.y-v.y)>160||g.casting||v.casting)return null;return[g,v];}
function doFusion(g,v,kind){kind=kind==='gogeta'?'gogeta':'vegito';const si=g.side,s=sides[si];if(s.fusion)return;const x=(g.x+v.x)/2,y=(g.y+v.y)/2;
  const f=(g.hp/g.max+v.hp/v.max)/2;ents=ents.filter(e=>e!==g&&e!==v);sel=sel.filter(e=>e!==g&&e!==v);
  const z=mkUnit(si,kind,x,y);z.hp=Math.max(z.max*.5,z.max*f);z.ssj=z.hp<z.max*.6;z.rank=Math.max(g.rank,v.rank);
  for(const b of dballs)if(b.carrier===g||b.carrier===v)b.carrier=z;s.fusion={g,v,z,t:45};
  fxRing(x,y,'#ffe14d',120);part('flash',x,y-20,0,0,.6,160,'#ffffff');shake(12);sfx('transform',x,y);if(plSees(z))cutin(z,kind==='gogeta'?'FU… SION… HA !!':'FUSION POTARA !!');
  if(si===PL){msg('Goku et Vegeta fusionnent : '+(kind==='gogeta'?'GOGETA':'VEGITO')+' ! (45 s)','#ffd23a');setSel([z]);}}
function updFusion(dt){for(const si of PSIDES){const s=sides[si],F=s.fusion;if(!F)continue;F.t-=dt;if(F.t>0&&!F.z.dead)continue;
  const z=F.z,x=z.x,y=z.y,f=z.dead?.3:clamp(z.hp/z.max,.3,1);if(!z.dead){ents=ents.filter(e=>e!==z);sel=sel.filter(e=>e!==z);}
  for(const[u,dx]of[[F.g,-14],[F.v,14]]){u.x=x+dx;u.y=y;if(!u.fly&&blockedW(u.x,u.y)){u.x=x;u.y=y;}u.hp=u.max*f;u.order=null;u.target=null;u.path=null;u.casting=null;u.dead=false;ents.push(u);}
  for(const b of dballs)if(b.carrier===z)b.carrier=F.g;s.fusion=null;part('flash',x,y-20,0,0,.5,120,'#ffffff');if(si===PL)msg('La fusion prend fin.','#ffd23a');}}
function aiFusion(si){const s=sides[si];if(s.fac!=='dbz'||s.fusion)return;const P=fusionPair(ents.filter(e=>e.side===si));if(!P)return;
  let n=0;for(const e of ents)if(!e.dead&&e.isU&&e.side!==si&&hyp(e.x-P[0].x,e.y-P[0].y)<300)n++;if(n>=4)doFusion(P[0],P[1],R()<.5?'gogeta':'vegito');}
// ---- looks ----
Object.assign(LOOK,{
  beerus:{k:'beerus',skin:'#9a6ab8',hair:'none',gi:'#1a1a22',gi2:'#e3c13b',pants:'#f0e8d0',boots:'#1a1a22',arms:'skin',eye:'#2ad8c8',gold:true},
  whis:{k:'whis',skin:'#8ab8e8',hair:'whis',hc:'#f4f4f8',gi:'#7a1a3a',gi2:'#1a1a22',pants:'#7a1a3a',boots:'#1a1a22',arms:'gi',eye:'#6a3aa8',halo:true},
  broly:{k:'broly',skin:'#d8a070',hair:'broly',hc:'#16161e',gi:'#d8a070',gi2:'#e3c13b',pants:'#f0f0e8',boots:'#e3c13b',arms:'skin',eye:'#1b1822',big:true,bare:true},
  c17:{k:'c17',skin:'#f0d2b4',hair:'mikasa',hc:'#16161e',gi:'#4a6a3a',gi2:'#8a6a3a',pants:'#3a4a5a',boots:'#4a3a2a',arms:'gi',eye:'#5a8ad8',scarf:'#ff8a1f'},
  vegito:{k:'vegito',skin:'#f3c9a0',hair:'vegito',hc:'#16161e',gi:'#1d2a6a',gi2:'#ff8a1f',pants:'#1d2a6a',boots:'#f4f4f4',arms:'skin',eye:'#1b1822',vest:'#ff8a1f',potara:true},
  gogeta:{k:'gogeta',skin:'#f3c9a0',hair:'gogeta',hc:'#16161e',gi:'#1a1a3a',gi2:'#ffb020',pants:'#f4f4f4',boots:'#1a1a22',arms:'skin',eye:'#1b1822',vest:'#1a1a3a'},
  mirio:{k:'mirio',skin:'#f3c9a0',hair:'recruit',hc:'#f2d870',gi:'#e8c040',gi2:'#3a3a44',pants:'#e8c040',boots:'#d8343f',arms:'gi',eye:'#3a6ad6',cape:'#f4f4f4'},
  jeanist:{k:'jeanist',skin:'#f3c9a0',hair:'jeanist',hc:'#f2d870',gi:'#3a5a9a',gi2:'#2a3a6a',pants:'#3a5a9a',boots:'#2a2a30',arms:'gi',eye:'#3a6ad6',collar:true},
  mtlady:{k:'mtlady',skin:'#f6d2b4',hair:'mtlady',hc:'#f2d870',gi:'#8a5ac8',gi2:'#f0e0c0',pants:'#8a5ac8',boots:'#f0e0c0',arms:'gi',eye:'#8a5ac8',mask:true},
  eraser:{k:'eraser',skin:'#ecc8a6',hair:'eraser',hc:'#16161e',gi:'#22222a',gi2:'#3a3a44',pants:'#22222a',boots:'#22222a',arms:'gi',eye:'#d8343f',wrap:true,goggles:true},
  annie:Object.assign({},SC,{k:'annie',hair:'annie',hc:'#f2d870',eye:'#6a9ad8',gi:'#d8d0c0',cape:null}),
  zeke:Object.assign({},SC,{k:'zeke',hair:'recruit',hc:'#e8c860',eye:'#6a9ad8',gi:'#5a6a4a',cape:null,beard:true,goggles:true}),
  jean:Object.assign({},SC,{k:'jean',hair:'levi',hc:'#a87a4a',eye:'#7a5a3a'}),
  pieck:Object.assign({},SC,{k:'pieck',hair:'pieck',hc:'#22222a',eye:'#5a5a6a',gi:'#5a6a4a',cape:null}),
  titan_female:{k:'titan_female',skin:'#f0c8b8',gi:'#f0c8b8',gi2:'#e0a898',pants:'#e8bca8',boots:'#d8a898',arms:'skin',hair:'recruit',hc:'#f2d870',eye:'#6ad8ff',titan:true,plates:true},
  titan_beast:{k:'titan_beast',skin:'#c8a070',gi:'#8a6a42',gi2:'#7a5a32',pants:'#8a6a42',boots:'#6a4a2a',arms:'skin',hair:'recruit',hc:'#e8c860',eye:'#f4f0e0',titan:true,fur:true},
  titan_cart:{k:'titan_cart',skin:'#d8a888',gi:'#6a6a6a',gi2:'#4a4a4a',pants:'#c8987a',boots:'#a87a5a',arms:'skin',hair:'pieck',hc:'#22222a',eye:'#f4f0e0',titan:true},
  jiren:{k:'jiren',skin:'#9aa0b0',hair:'none',gi:'#c8343f',gi2:'#1a1a22',pants:'#1a1a22',boots:'#f4f4f4',arms:'skin',eye:'#0a0a0a',big:true},
});
Object.assign(HAIR,{
  whis:[[-5,1],[-6,-4],[-4,-8],[-3,-16],[0,-21],[3,-16],[4,-8],[6,-4],[5.6,.5],[3,-3],[0,-2.6],[-3,-3]],
  broly:[[-7,8],[-9,0],[-7.5,-6],[-9.5,-9],[-4,-9],[-3,-13],[0,-9],[3,-13],[4.5,-8.5],[8.5,-9.5],[7,-3],[8.5,3],[6,2],[5,-2],[2,-4],[-1,-3.5],[-3.5,-1.5],[-5,8]],
  gogeta:[[-6,1],[-7.5,-5],[-6,-11],[-8,-15],[-3,-12],[-1.5,-18],[1.5,-12],[4.5,-17],[5,-10],[8,-11],[6.5,-4],[6,1],[4,-3],[2,-5],[0,-3],[-2,-4.5],[-4,-1]],
  vegito:[[-5.5,0],[-6.5,-6],[-5.5,-14],[-2.5,-10],[-1,-17.5],[1,-11],[3,-16.5],[4,-9],[6.5,-12.5],[6,-4],[5.5,0],[4,-3],[4.5,2.5],[3,-1.5],[2,-6],[0,-3],[-2,-4],[-4,-1]],
  jeanist:[[-6,2],[-6.8,-3],[-4,-7.5],[1,-8],[5.5,-6],[7,-2],[7,3],[5.4,4],[4.6,0],[1.5,-.5],[-1,-2.5],[-4,-1]],
  mtlady:[[-7,9],[-7.5,-2],[-5,-7],[0,-8.4],[4.5,-7],[7,-3],[6.8,1],[4.4,-2.4],[1.6,-1.2],[-.6,-3],[-3.4,-2],[-4.6,4],[-5,9]],
  eraser:[[-7.5,7],[-8.5,-1],[-7,-6],[-3,-9],[1,-9.5],[5,-8],[8,-4],[8,2],[6.5,-1],[5.5,3],[4,-2],[2,-1],[0,-3],[-3,-1.5],[-5,2],[-5.5,7]],
  annie:[[-5.8,1],[-6.6,-4],[-3.5,-7.6],[1,-7.8],[5,-6],[6.6,-2],[6.4,2.5],[4.4,-1.6],[3,1.4],[1.6,-1.4],[-.6,-3],[-3.2,-2.2]],
  pieck:[[-6.5,8],[-7,-2],[-5,-6.6],[-1,-8],[3,-7.6],[6.6,-4],[7,4],[5.6,4],[5.4,-1],[3,-3.4],[1,-2.4],[-1.4,-3.4],[-3.6,-2],[-4.6,8]]});
function headX(c,L,k,hx,hy,t){
  if(k==='beerus'){for(const s of[-1,1]){c.beginPath();c.moveTo(hx+s*2.6,hy-4.5);c.lineTo(hx+s*5.8,hy-13);c.lineTo(hx+s*6.4,hy-3.2);c.closePath();fo(c,L.skin);c.fillStyle='#d8a8e8';c.beginPath();c.moveTo(hx+s*3.6,hy-5);c.lineTo(hx+s*5.6,hy-10.5);c.lineTo(hx+s*5.8,hy-4.4);c.closePath();c.fill();}
    c.fillStyle='#e3c13b';c.fillRect(hx-3.5,hy-6.4,7.6,1.2);return true;}
  if(k==='jiren'){c.fillStyle='rgba(60,60,80,.4)';c.beginPath();c.ellipse(hx+.4,hy-3,5,2,0,0,PI2);c.fill();c.fillStyle='#0a0a0a';c.beginPath();c.ellipse(hx+1.6,hy+.4,1.5,2.2,0,0,PI2);c.ellipse(hx+4.6,hy+.4,1.5,2.2,0,0,PI2);c.fill();return true;}
  return false;}
function moreCostume2(c,L,k,bw,top,bob){const B=-9.4+bob;
  if(L.gold){c.fillStyle='#e3c13b';c.beginPath();c.ellipse(0,top+1,5.6*bw,2.2,0,0,PI);c.fill();c.strokeStyle=OUT;c.lineWidth=.5;c.stroke();c.fillStyle='#2ad8c8';c.beginPath();c.arc(0,top+2,1,0,PI2);c.fill();}
  if(L.vest){c.fillStyle=L.vest;c.beginPath();c.moveTo(-5.4,top+.5);c.lineTo(-2,top+.5);c.lineTo(-2.4,B);c.lineTo(-4.4,B);c.closePath();c.fill();c.beginPath();c.moveTo(5.4,top+.5);c.lineTo(2,top+.5);c.lineTo(2.4,B);c.lineTo(4.4,B);c.closePath();c.fill();}
  if(L.collar){c.fillStyle='#2a3a6a';c.beginPath();c.roundRect(-3.6,top-4.5,7.4,5,1.5);c.fill();}
  if(L.wrap){c.strokeStyle='#9aa0a8';c.lineWidth=1.6;c.beginPath();c.ellipse(0,top-.4,4.6,1.8,0,0,PI2);c.stroke();c.beginPath();c.moveTo(-3,top+1);c.quadraticCurveTo(-7,top+4,-6,B);c.stroke();}
  if(L.fur){c.fillStyle='rgba(90,60,30,.55)';for(let i=0;i<6;i++){c.beginPath();c.moveTo(-5+i*2,top);c.lineTo(-4+i*2,top+3);c.lineTo(-3+i*2,top);c.fill();}}
  if(L.beard){}
  if(k==='broly'){c.fillStyle='#e3c13b';c.fillRect(-4.6*bw,B-2.4,9.2*bw,2.2);}}
function moreHead2(c,L,k,hx,hy,st){if(L.halo){c.strokeStyle='#6fd8ff';c.lineWidth=1.4;c.beginPath();c.ellipse(hx-1,hy+6.5,6,1.8,0,0,PI2);c.stroke();}
  if(L.potara){c.fillStyle='#ffd23a';c.beginPath();c.arc(hx-3.4,hy+3.2,1,0,PI2);c.fill();c.fillStyle='#2fd27a';c.beginPath();c.arc(hx-3.4,hy+4.6,.7,0,PI2);c.fill();}
  if(L.beard){c.fillStyle=L.hc;c.beginPath();c.moveTo(hx+1,hy+3);c.quadraticCurveTo(hx+3.6,hy+8,hx+6,hy+3);c.closePath();c.fill();}
  if(k==='jeanist'){c.fillStyle=L.hc;c.beginPath();c.ellipse(hx+3.4,hy-.4,3.4,2,0,0,PI2);c.fill();}
  if(k==='annie'){c.beginPath();c.arc(hx-4,hy-5,2.6,0,PI2);fo(c,L.hc);}}
// ---- visuals for new buildings ----
function drawB3y(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,cy=y0+H/2,a=b.anim||0,k=b.key,f=b.fac,fc=FAC[f].col;
 if(k==='wall'){if(f==='dbz'){box3(c,x0+2,y0+6,W-4,W-10,0,8,'#c8ced8');cyl3(c,cx,cy+2,5,8,20,'#e6ebf2');const p=P3(cx,cy+2,30);glow3(c,cx,cy+2,30,12,'#6fd8ff',.7+.2*Math.sin(a*5));c.fillStyle='rgba(111,216,255,.35)';c.fillRect(p[0]-15,p[1]+4,30,18);}
   else{box3(c,x0,y0+4,W,W-6,0,28,'#b8b0a4');stoneLines(c,x0,y0+4,W,W-6,0,28);}return;}
 plinth(c,x0,y0,W,H,fc);
 if(f==='dbz'){
  if(k==='market'){box3(c,x0+8,y0+22,46,28,4,22,'#f2f4f8');onFront(c,x0+8,y0+22,28,4,x=>{glass(x,4,-18,22,12,'#6fc8ff');x.fillStyle='#3a3240';x.fillRect(30,-16,10,16);for(let i=0;i<8;i++){x.fillStyle=i%2?'#ff8a1f':'#fff';x.fillRect(i*5.75,-26,5.75,6);}});
    box3(c,x0+14,y0+26,30,10,26,8,'#f2f4f8');const p=P3(x0+30,y0+36,32);c.save();c.translate(p[0],p[1]);c.fillStyle='#fff';c.beginPath();c.roundRect(-12,-4,24,8,4);c.fill();c.strokeStyle=LINE;c.stroke();c.fillStyle='#ff8a1f';c.fillRect(-1,-4,2,8);c.restore();}
  else if(k==='hospital'){cyl3(c,cx,cy+4,8,4,100,'#e8dcc0');for(let j=1;j<5;j++)band3(c,cx,cy+4,8.2,j*20,'#c8b890',1.4);cyl3(c,cx,cy+4,16,100,8,'#f2ead4');dome3(c,cx,cy+4,14,108,10,'#e3c13b');
    const p=P3(cx+8,cy+4,104);c.fillStyle='#2a2a30';c.fillRect(p[0]-2,p[1]-3,4,4);glow3(c,cx,cy+4,112,16,'#7dffa0',.3+.2*Math.sin(a*3));}
  else if(k==='training'){box3(c,x0+8,y0+18,48,36,4,36,'#fafafa',{top:'#ffffff'});onFront(c,x0+8,y0+18,36,4,x=>{x.fillStyle='#0b0b10';x.fillRect(18,-24,12,24);x.fillStyle='#e8e8ee';x.fillRect(14,-28,20,3);
      for(const u of[6,38]){x.fillStyle='#c8a050';x.beginPath();x.moveTo(u-3,-22);x.lineTo(u+3,-22);x.lineTo(u,-17);x.lineTo(u+3,-12);x.lineTo(u-3,-12);x.lineTo(u,-17);x.closePath();x.fill();}});glow3(c,x0+32,y0+54,16,14,'#ffffff',.5);}
  else if(k==='temple2'){const z=30+Math.sin(a*1.2)*2,tip=P3(cx,cy,z-34),b0=P3(cx,cy,z);c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(cx+8,cy+10,40,18,0,0,PI2);c.fill();
    c.beginPath();c.arc(b0[0],b0[1],42,Math.atan2(1,-KX)-PI/2,Math.atan2(1,-KX)+PI/2);c.quadraticCurveTo(b0[0]+6,b0[1]+24,tip[0],tip[1]);c.closePath();c.fillStyle='#8a6a9a';c.fill();c.strokeStyle=LINE;c.stroke();
    cyl3(c,cx,cy,42,z,5,'#6aa84a',{top:'#7ac05a'});for(const[dx,dy]of[[-28,-10],[26,-14],[-20,18]]){line3(c,[cx+dx,cy+dy,z+5],[cx+dx,cy+dy,z+30],'#6a4a8a',3);sphere3(c,cx+dx,cy+dy,8,z+28,'#b878d8');}
    for(let i=0;i<4;i++)box3(c,cx-20+i*5,cy-14+i*4,40-i*10,28-i*8,z+5+i*10,10,'#c8a0d8');glow3(c,cx,cy,z+48,22,'#d8a8ff',.4);}
  else if(k==='unique'){hazardFloor(c,x0+12,y0+16,40,34);for(const[dx,dy]of[[-12,-10],[12,-10],[-12,10],[12,10]])line3(c,[cx+dx,cy+dy,4],[cx+dx*.7,cy+dy*.7,16],'#8a929c',2);
    cyl3(c,cx,cy,14,16,14,'#f2c230');dome3(c,cx,cy,14,30,14,'#bfe8ff');onFront(c,cx-14,cy-14,28,16,x=>{x.font='bold 5px Chakra Petch, sans-serif';x.fillStyle='#2a2a30';x.textAlign='center';x.fillText('HOPE!!',14,-6);});
    if(!ghost&&R()<.08)part('spark',P3(cx,cy,30)[0]+rr(-14,14),P3(cx,cy,30)[1],0,-30,.4,1.5,'#6fd8ff');}
 }else if(f==='mha'){
  if(k==='market'){box3(c,x0+8,y0+22,46,28,4,38,'#c8d2dc');onFront(c,x0+8,y0+22,28,4,x=>{winGrid(x,3,4,40,14,5,1,'#4a7aa8');x.fillStyle='#14202c';x.fillRect(3,-36,40,16);
      x.fillStyle=['#2fd27a','#ffd23a','#ff5a6a'][Math.floor(a/2)%3];x.fillRect(5,-34,36,12);text3(x,['PLUS ULTRA','HÉROS','No.1'][Math.floor(a/2)%3],23,-28,7,'#0b1017');});box3(c,x0+40,y0+26,10,8,42,10,'#9aa4ae');}
  else if(k==='hospital'){box3(c,x0+6,y0+20,52,32,4,30,'#f4f6f8');onFront(c,x0+6,y0+20,32,4,x=>{winGrid(x,3,8,46,12,6,1,'#7ab0d8');x.fillStyle='#ff7aa8';x.beginPath();x.arc(23,-24,4,0,PI2);x.fill();x.fillStyle='#fff';x.fillRect(22,-27,2,6);x.fillRect(20,-25,6,2);});
    box3(c,x0+20,y0+28,24,14,34,8,'#e8ecf0');}
  else if(k==='training'){const X=x0+6,Y=y0+18,WW=52,D=38,N=10;for(let i=0;i<N;i++){const y=Y+i*D/N,z=22+Math.sin(PI*(i+.5)/N)*16;box3(c,X,y,WW,D/N+.4,4,z-4,'#b8c4d0');}
    onFront(c,X,Y,D,4,x=>{x.fillStyle='#2a3440';x.fillRect(18,-16,16,16);text3(x,'TDL',26,-20,9,'#2fd27a','#0b1017');});}
  else if(k==='temple2'){box3(c,x0+10,y0+20,76,50,4,30,'#3a4252');onFront(c,x0+10,y0+20,50,4,x=>{for(let i=0;i<8;i++){x.fillStyle='#e8e2d4';x.fillRect(4+i*9.4,-28,4,28);}});
    box3(c,x0+26,y0+28,44,30,34,62,'#2c3648');onFront(c,x0+26,y0+28,30,34,x=>{winGrid(x,3,6,38,52,5,7,'#4a6aa8',(i,j)=>Math.sin(a*.5+i*2+j)>.5);});
    const p=P3(x0+48,y0+58,92);c.fillStyle='#e3c13b';star(c,p[0],p[1],7);beacon(c,x0+66,y0+30,98,a);}
  else if(k==='unique'){box3(c,x0+8,y0+20,48,30,4,70,'#e8e2d8');onFront(c,x0+8,y0+20,30,4,x=>{winGrid(x,3,6,42,60,5,6,'#5a7aa8',(i,j)=>Math.sin(a*.7+i*1.3+j*2.1)>.2);x.fillStyle='#2a3440';x.fillRect(18,-8,12,8);});
    onSide(c,x0+8,y0+20,48,30,4,x=>winGrid(x,3,6,24,60,3,6,'#3a5a7a',null,true));box3(c,x0+18,y0+24,28,4,74,10,'#2fd27a');onFront(c,x0+18,y0+24,4,74,x=>text3(x,'H·A',14,-5,8,'#0b1017'));}
 }else{
  if(k==='market'){for(let i=0;i<3;i++){const sx=x0+6+i*18,col=['#c8343f','#3a6ad6','#e8c040'][i];line3(c,[sx,y0+46,4],[sx,y0+46,24],'#5a3a20',1.6);line3(c,[sx+14,y0+46,4],[sx+14,y0+46,24],'#5a3a20',1.6);
      poly3(c,[P3(sx-1,y0+30,24),P3(sx+15,y0+30,24),P3(sx+15,y0+48,20),P3(sx-1,y0+48,20)],col);box3(c,sx,y0+40,14,8,4,8,'#9a6a3a');}for(let i=0;i<3;i++)cyl3(c,x0+12+i*14,y0+56,3.5,4,7,'#7a5030');}
  else if(k==='hospital'){box3(c,x0+6,y0+20,52,30,4,26,'#c8bfae');stoneLines(c,x0+6,y0+20,52,30,4,26);gable3(c,x0+6,y0+20,52,30,30,14,'#5a5a64','#c8bfae');
    onFront(c,x0+6,y0+20,30,4,x=>{for(let i=0;i<4;i++)glass(x,4+i*12,-18,6,9,'#5a4a3a',Math.sin(a+i)>0);x.fillStyle='#2f6a3a';x.fillRect(20,-24,12,4);});}
  else if(k==='training'){for(const[dx,dy]of[[10,14],[30,10],[50,16],[22,40],[44,42]])line3(c,[x0+dx,y0+dy,4],[x0+dx,y0+dy,30],'#6a4526',2.6);
    box3(c,x0+28,y0+44,14,4,4,30,'#9a6a3a');const p=P3(x0+35,y0+46,40);c.fillStyle='#d8b890';c.beginPath();c.arc(p[0],p[1],6,0,PI2);c.fill();c.strokeStyle=LINE;c.stroke();c.fillStyle='#c8343f';c.fillRect(p[0]-5,p[1]+5,10,2);
    c.strokeStyle='rgba(40,40,40,.6)';c.lineWidth=.7;c.beginPath();const a1=P3(x0+10,y0+14,30),a2=P3(x0+50,y0+16,30),a3=P3(x0+30,y0+10,30);c.moveTo(a1[0],a1[1]);c.lineTo(a3[0],a3[1]);c.lineTo(a2[0],a2[1]);c.stroke();}
  else if(k==='temple2'){box3(c,x0+8,y0+22,80,48,4,40,'#9a5a3a');onFront(c,x0+8,y0+22,48,4,x=>{for(let r=0;r<2;r++)for(let i=0;i<8;i++)glass(x,4+i*9.6,-34+r*16,5,10,'#3a3020',Math.sin(a+i+r)>.3);x.fillStyle='#2a1a10';x.fillRect(34,-12,12,12);});
    x0;box3(c,x0+38,y0+30,18,16,44,32,'#8a4a2a');pyramid3(c,x0+36,y0+28,22,20,76,14,'#3a3a44');const cp=P3(x0+47,y0+46,64);c.fillStyle='#f4f0e0';c.beginPath();c.arc(cp[0],cp[1],4,0,PI2);c.fill();c.strokeStyle=LINE;c.stroke();
    c.strokeStyle='#222';c.beginPath();c.moveTo(cp[0],cp[1]);c.lineTo(cp[0]+Math.cos(a)*3,cp[1]+Math.sin(a)*3);c.stroke();}
  else if(k==='unique'){box3(c,x0+6,y0+20,52,30,4,22,'#8a5a32');woodLines(c,x0+6,y0+20,52,30,4,22);gable3(c,x0+6,y0+20,52,30,26,12,'#7a3a2a','#8a5a32');
    onFront(c,x0+6,y0+20,30,4,x=>{for(let i=0;i<3;i++){x.fillStyle='#2a1a10';x.fillRect(5+i*16,-14,10,10);x.fillStyle='#7a4a28';x.beginPath();x.ellipse(10+i*16,-10,3,2.4,0,0,PI2);x.fill();}});
    for(let i=0;i<2;i++)cyl3(c,x0+12+i*10,y0+58,4,4,6,'#d8b860',{top:'#e8c870'});}
 }}
