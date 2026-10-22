// ===== New buildings, building levels, troop upgrades (Arsenal) and hero awakenings (Sanctuary) =====
const NB_NAMES={
 armory:{dbz:'Salle d’armes Capsule Corp',mha:'Labo d’équipement de Hatsume',aot:'Forge tridimensionnelle',sl:'Arsenal de la guilde Ahjin',opm:'Atelier de Child Emperor',hxh:'Armurerie Zoldyck'},
 shrine:{dbz:'Planète de King Kai',mha:'Salle de One For All',aot:'Les Chemins d’Ymir',sl:'Trône du Monarque',opm:'Salle d’entraînement des classes S',hxh:'Salle du Nen avancé'},
 outpost:{dbz:'Avant-poste Capsule',mha:'Poste de patrouille',aot:'Avant-poste du Bataillon',sl:'Balise de Porte',opm:'Poste de l’Association',hxh:'Campement Hunter'},
 drill:{dbz:'Foreuse Capsule',mha:'Foreuse industrielle',aot:'Mine de cristal',sl:'Extracteur de mana',opm:'Foreuse de Metal Knight',hxh:'Mine de Greed Island'},
 shieldgen:{dbz:'Générateur de barrière',mha:'Bouclier de Cementoss',aot:'Palissade renforcée',sl:'Barrière de rang S',opm:'Champ de force de Metal Knight',hxh:'Barrière de Nen'},
 relay:{dbz:'Relais de Ki',mha:'Antenne de la Commission',aot:'Tour du Grondement',sl:'Obélisque du Système',opm:'Antenne de la Ville Z',hxh:'Phare de la Black Whale'}};
Object.assign(NB_NAMES.armory,{sds:'Forge de Liones'});Object.assign(NB_NAMES.shrine,{sds:'Sanctuaire des déesses'});Object.assign(NB_NAMES.outpost,{sds:'Avant-poste de Liones'});
Object.assign(NB_NAMES.drill,{sds:'Mine des géants'});Object.assign(NB_NAMES.shieldgen,{sds:'Barrière de Merlin'});Object.assign(NB_NAMES.relay,{sds:'Cristal solaire d’Escanor'});
Object.assign(BDEF,{
  armory:{key:'armory',w:2,h:2,hp:1100,cost:900,time:14,pow:-30,sight:6,req:['barracks'],desc:'Améliore tes troupes : chaque type d’unité peut monter jusqu’au niveau 3 (+20 % de vie et de dégâts par niveau). Sélectionne-le pour lancer une amélioration.'},
  shrine:{key:'shrine',w:2,h:2,hp:1200,cost:1200,time:18,pow:-40,sight:6,req:['temple'],desc:'Éveille certains héros : plus de vie, plus de dégâts, recharge plus rapide et nouvelle apparence. Sélectionne-le pour choisir un éveil.'},
  outpost:{key:'outpost',w:1,h:1,hp:650,cost:350,time:8,pow:-5,sight:9,req:['barracks'],desc:'Petit poste avancé : peut être construit jusqu’à 10 cases de ta base et permet ensuite de bâtir autour de lui. Grande vision.'},
  drill:{key:'drill',w:2,h:2,hp:900,cost:1100,time:16,pow:-20,sight:5,req:['refinery'],desc:'À placer près d’un gisement : extrait lui-même les cristaux proches (4 cases) et les transforme en argent, sans camion.'},
  shieldgen:{key:'shieldgen',w:2,h:2,hp:1000,cost:1000,time:15,pow:-40,sight:6,req:['lab'],desc:'Les bâtiments alliés dans un large rayon subissent 30 % de dégâts en moins.'},
  relay:{key:'relay',w:2,h:2,hp:900,cost:1300,time:18,pow:-50,sight:6,req:['temple'],desc:'Concentre l’énergie : ton attaque ultime se charge 60 % plus vite.'}});
for(const k in NB_NAMES){BDEF[k].names=Object.assign({},NB_NAMES[k],{neu:k});}
B_MAIN2.push('drill','outpost');B_SPEC.push('armory','shrine','relay');B_DEF2.push('shieldgen');
AI_ORDER.push('armory','outpost','shrine','shieldgen','drill','relay','power');
const NB_H={armory:46,shrine:80,outpost:54,drill:70,shieldgen:52,relay:96};
{const _bH=bH;bH=function(b){return NB_H[b.key]||_bH(b);};}
const lvlOf=b=>(b&&b.lvl)||1;
// ---- troop and hero upgrade data ----
const TUP_KEYS=['inf1','inf2','inf3','inf4','healer','tank','jet','mech'];
const tupCost=(fac,k,l)=>Math.max(500,Math.round(UDEF[fac][k].cost*2.4*(l+1)/50)*50);
const AWK={
 dbz:{goku:{name:'Super Saiyan God',look:{hc:'#d8343f'},col:'#ff4a4a',cost:2200},vegeta:{name:'Super Saiyan Blue Évolution',look:{hc:'#2a6ad8'},col:'#4ab8ff',cost:2000},piccolo:{name:'Orange Piccolo',look:{skin:'#f08a3a'},col:'#ff9a3a',cost:1800}},
 mha:{deku:{name:'One For All 45 %',look:{gi:'#1f7a4a'},col:'#7dff9a',cost:1900},allmight:{name:'All Might à son apogée',look:{gi:'#1f4ad8'},col:'#ffd23a',cost:2400},bakugo:{name:'Explosion maximale',look:{gi:'#1a1a22'},col:'#ff9a3a',cost:1900}},
 aot:{eren:{name:'Le Titan Originel',look:{hc:'#2a1a12'},col:'#ffcf8a',cost:2200},levi:{name:'Éveil Ackerman',look:{cape:'#1f4a2a'},col:'#d8f0ff',cost:2000},mikasa:{name:'Éveil Ackerman',look:{scarf:'#e8202e'},col:'#ff6a6a',cost:1800}},
 sl:{jinwoo:{name:'Monarque des Ombres',look:{coat:'#1e1238',gi:'#1e1430'},col:'#8a5aff',cost:2400},igris:{name:'Igris le Sanglant',look:{plume:'#ff2020'},col:'#ff3a3a',cost:1800},beru:{name:'Beru, Maréchal',look:{insect:'#3a2a5a'},col:'#c070ff',cost:1900}},
 opm:{genos:{name:'Genos, arsenal de Kuseno',look:{gi:'#3a3a52'},col:'#ff8a2a',cost:1900},tatsumaki:{name:'Tatsumaki à pleine puissance',look:{hc:'#5affa0'},col:'#5aff8a',cost:2200},bang:{name:'Bang sérieux',look:{gi:'#1a2a3a'},col:'#7ad8ff',cost:1900}},
 sds:{meliodas:{name:'Mode Assaut',look:{hc:'#1a1a22',gi2:'#3a1a4a'},col:'#5a3aff',cost:2300},ban:{name:'Ban le Purgatoire',look:{gi:'#7a1a1a'},col:'#ff3a3a',cost:1900},harlequin:{name:'King, Roi des Fées éveillé',look:{gi:'#2a6a3a'},col:'#7adf6a',cost:2000}},
 hxh:{killua:{name:'Godspeed maîtrisé',look:{hc:'#e8f4ff'},col:'#9ad8ff',cost:2000},kurapika:{name:'Emperor Time permanent',look:{eye:'#ff2a2a'},col:'#ff2a2a',cost:2100},gon:{name:'Jajanken parfait',look:{},col:'#ffcf3a',cost:1900}}};
const isAwk=u=>{const s=sides[u.side];return!!(s&&s.awk&&s.awk[u.key]&&AWK[u.fac]&&AWK[u.fac][u.key]);};
// ---- effects ----
{const _mk=mkUnit;mkUnit=function(side,key,x,y){const u=_mk(side,key,x,y);const s=sides[side];if(s){const l=(s.ulv&&s.ulv[key])||0;let m=Math.pow(1.2,l);if(isAwk(u))m*=1.3;if(m!==1){u.max=Math.round(u.max*m);u.hp=u.max;}}return u;};}
{const _dmm=dmgMult;dmgMult=function(u){let m=_dmm(u);const s=sides[u.side];if(s&&s.ulv&&s.ulv[u.key])m*=Math.pow(1.2,s.ulv[u.key]);if(isAwk(u))m*=1.3;return m;};}
{const _p2=updPassives2;updPassives2=function(u,dt){_p2(u,dt);if(u.abCd>0&&isAwk(u))u.abCd-=dt*.33;};}
{const _ul=unitLook;unitLook=function(u){const L=_ul(u);if(isAwk(u)){const a=AWK[u.fac][u.key];return Object.assign({},L,a.look);}return L;};}
let shieldT=0,shieldList=[];
{const _dm=damage;damage=function(t,amt,s,src){if(t.isB&&shieldList.length){for(const g of shieldList)if(!g.dead&&ally(g.side,t.side)&&hyp(g.x-t.x,g.y-t.y)<300){amt*=lvlOf(g)>=2?.55:.7;break;}}_dm(t,amt,s,src);};}
// ---- per tick: building upgrades, troop/hero research, drills, AI usage ----
function updUpgrades(dt){shieldT-=dt;if(shieldT<=0){shieldT=.5;shieldList=ents.filter(e=>e.isB&&!e.dead&&e.key==='shieldgen'&&e.rise>=1);}if(NET.client)return;
  for(const b of ents){if(!b.isB||b.dead)continue;
    if(b.upg){const s=sides[b.side];b.upg.prog+=dt*(s.use>s.pow?.5:1)/b.upg.T;if(b.upg.prog>=1){b.lvl=lvlOf(b)+1;b.upg=null;const nm=Math.round(b.max*(b.key==='wall'?2:1.5));b.hp+=nm-b.max;b.max=nm;recalcPower(b.side);if(b.key==='refinery'&&!NET.client)spawnFrom(b,'harv');
      fxRing(b.x,b.y,FAC[b.fac].col,b.w*24);for(let k=0;k<14;k++)part('spark',b.tx*TILE+R()*b.w*TILE,b.ty*TILE+R()*b.h*TILE-20,rr(-50,50),rr(-90,-30),.7,2,'#ffd23a');
      if(b.side===PL){msg(b.D.names[b.fac]+' amélioré : '+featText(b),'#ffd23a');sfx('rankup');if(b.key==='temple')announce(SUPER[b.fac].name+' débloquée');}}}
    if(b.key==='drill'&&b.rise>=1){b.drT=(b.drT||0)-dt;if(b.drT<=0){b.drT=2;let got=0;const tx=b.tx+1,ty=b.ty+1;
      for(let y=ty-4;y<=ty+4&&got<16;y++)for(let x=tx-4;x<=tx+4&&got<16;x++){if(x<0||y<0||x>=MW||y>=MH)continue;const i=ti(x,y);if(ore[i]>0){const t=Math.min(ore[i],16-got);ore[i]-=t;got+=t;}}
      if(got){const s=sides[b.side],g=Math.round(got*1.6*s.mult*(1+.3*(lvlOf(b)-1)));s.credits+=g;s.st.harv+=g;if(plSees(b))part('spark',b.x,b.y-30,rr(-20,20),-50,.6,2,'#ffd34a');}}}}
  for(const si of PSIDES){const s=sides[si];if(!s)continue;
    if(s.tres){s.tres.prog+=dt/24*(has(si,'armory+')?2:1);if(s.tres.prog>=1){const k=s.tres.key;s.ulv=s.ulv||{};s.ulv[k]=(s.ulv[k]||0)+1;s.tres=null;for(const e of ents)if(!e.dead&&e.isU&&e.side===si&&e.key===k){const nm=Math.round(e.max*1.2);e.hp+=nm-e.max;e.max=nm;fxRing(e.x,e.y,'#ffd23a',18);}
      if(si===PL){msg(UDEF[s.fac][k].name+' : niveau '+(s.ulv[k]+1)+' !','#ffd23a');sfx('rankup');announce('Troupes améliorées');}}}
    if(s.ares){s.ares.prog+=dt/30*(has(si,'shrine+')?2:1);if(s.ares.prog>=1){const k=s.ares.key;s.awk=s.awk||{};s.awk[k]=true;s.ares=null;const A=AWK[s.fac][k];
      for(const e of ents)if(!e.dead&&e.isU&&e.side===si&&e.key===k){const nm=Math.round(e.max*1.3);e.hp+=nm-e.max;e.max=nm;fxRing(e.x,e.y,A.col,70);part('flash',e.x,e.y-20,0,0,.5,90,A.col);if(plSees(e))cutin(e,A.name.toUpperCase()+' !');}
      if(si===PL){banner(A.name.toUpperCase(),A.col);msg(UDEF[s.fac][k].name+' est éveillé : '+A.name+' !',A.col);announce(A.name,true);}}}}
  for(const ai of G.ai){const si=ai.si,s=sides[si];if(!s)continue;ai.upT=(ai.upT||0)-dt;if(ai.upT>0)continue;ai.upT=6;
    if(s.credits>2400){const c=ents.filter(b=>b.isB&&!b.dead&&b.side===si&&b.rise>=1&&!b.upg&&lvlOf(b)<2&&['power','refinery','barracks','factory','turret','def2','temple','lab','temple2','hq'].includes(b.key));const pri=c.find(b=>b.key==='temple')||c.find(b=>b.key==='temple2')||c.find(b=>b.key==='barracks')||c.find(b=>b.key==='factory');if(c.length)startBUp(si,pri&&R()<.7?pri:pick(c));}
    if(has(si,'armory')&&!s.tres&&s.credits>2000){const k=pick(['inf1','inf2','inf3','inf4','tank']);startTUp(si,k);}
    if(has(si,'shrine')&&!s.ares&&s.credits>3000){const ks=Object.keys(AWK[s.fac]||{}).filter(k=>!(s.awk&&s.awk[k]));if(ks.length)startAwk(si,pick(ks));}}}
{const _uf=updFusion;updFusion=function(dt){_uf(dt);updUpgrades(dt);};}
const bupCost=b=>b.key==='temple'?2500:b.key==='temple2'?2500:b.key==='hq'||b.key==='hq2'?1500:b.key==='wall'?150:Math.max(400,Math.round((b.D.cost||1000)*.75/50)*50);
function startBUp(si,b){const s=sides[si];if(!b||b.dead||b.side!==si||b.rise<1||b.upg||lvlOf(b)>=2)return false;const c=bupCost(b);if(s.credits<c)return false;
  if(NET.client&&!NET.applying){NET.cmd({c:'bup',b:b.id});return true;}s.credits-=c;b.upg={prog:0,T:b.key==='temple'||b.key==='temple2'?40:b.key==='hq'||b.key==='hq2'?30:20};return true;}
function startTUp(si,k){const s=sides[si],l=(s.ulv&&s.ulv[k])||0;if(s.tres||l>=2||!has(si,'armory')||!UDEF[s.fac][k])return false;const c=Math.round(tupCost(s.fac,k,l)*(has(si,'armory+')?.7:1));if(s.credits<c)return false;
  if(NET.client&&!NET.applying){NET.cmd({c:'tup',k});return true;}s.credits-=c;s.tres={key:k,prog:0};return true;}
function startAwk(si,k){const s=sides[si],A=AWK[s.fac]&&AWK[s.fac][k];if(!A||s.ares||(s.awk&&s.awk[k])||!has(si,'shrine')||s.credits<A.cost)return false;
  if(NET.client&&!NET.applying){NET.cmd({c:'awk',k});return true;}s.credits-=A.cost;s.ares={key:k,prog:0};return true;}
{const _rc=runCmd;runCmd=function(c){const SI=NET.gs;if(c&&c.c==='bup'){const b=ents.find(e=>e.id===c.b&&!e.dead&&e.side===SI);if(b)startBUp(SI,b);return;}if(c&&c.c==='tup'){startTUp(SI,c.k);return;}if(c&&c.c==='awk'){startAwk(SI,c.k);return;}_rc(c);};}
// ---- UI: upgrade panel inside the selection panel ----
(function(){const css=document.createElement('style');css.textContent=`#xupg{display:flex;flex-direction:column;gap:5px;margin-top:6px}#xupg .resg{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px}#xupg .rbtn{padding:3px 6px}#xupg .rbtn b{font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#xupg .rbtn small{font-size:9.5px}#selp .info{overflow:auto}
#xupg .bupb{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:6px;background:#0b1017;border:1px solid #ffd23a88;color:inherit;cursor:pointer;font-weight:700;font-size:12px;position:relative;overflow:hidden;text-align:left}
#xupg .bupb:hover{border-color:#ffd23a}#xupg .bupb.off{opacity:.55;cursor:default}#xupg .bupb i{position:absolute;left:0;bottom:0;height:3px;background:#ffd23a}#xupg .stars{color:#ffd23a;letter-spacing:2px}`;document.head.appendChild(css);})();
function xupgHTML(e){const s=sides[PL],f=s.fac;let h='';
  if(e.isB&&e.rise>=1){const l=lvlOf(e),F=featText(e);if(l<2){const c=bupCost(e),cur=e.upg;h+=`<button type="button" class="bupb ${cur||s.credits<c?'off':''}" data-bup="${e.id}"><span class="stars">☆</span><span>${cur?'Amélioration… '+Math.floor(cur.prog*100)+' %':'Améliorer · '+c}</span>${cur?`<i style="width:${cur.prog*100}%"></i>`:''}</button><div class="desc">Après amélioration : +50 % de vie${F?' et '+F.charAt(0).toLowerCase()+F.slice(1):'.'}</div>`;}
    else h+=`<div class="desc"><span class="stars" style="color:#ffd23a">★</span> Amélioré : ${F||'+50 % de vie.'}</div>`;}
  if(e.isB&&e.key==='armory'&&e.rise>=1)h+='<div class="resg">'+TUP_KEYS.filter(k=>UDEF[f][k]).map(k=>{const l=(s.ulv&&s.ulv[k])||0,cur=s.tres&&s.tres.key===k,done=l>=2;
    return`<button type="button" class="rbtn ${done?'done':cur?'cur':''}" data-tup="${k}" title="${UDEF[f][k].name}"><b>${UDEF[f][k].name.slice(0,22)}</b><small>${done?'Niveau 3 (max)':cur?'Entraînement… '+Math.floor(s.tres.prog*100)+' %':'Niv. '+(l+1)+' → '+(l+2)+' · '+tupCost(f,k,l)}</small><i style="width:${cur?s.tres.prog*100:0}%"></i></button>`;}).join('')+'</div>';
  if(e.isB&&e.key==='shrine'&&e.rise>=1)h+='<div class="resg">'+Object.keys(AWK[f]||{}).map(k=>{const A=AWK[f][k],done=s.awk&&s.awk[k],cur=s.ares&&s.ares.key===k;
    return`<button type="button" class="rbtn ${done?'done':cur?'cur':''}" data-awk="${k}" title="${A.name}"><b>${UDEF[f][k].name}</b><small>${done?'Éveillé : '+A.name:cur?'Éveil… '+Math.floor(s.ares.prog*100)+' %':A.name+' · '+A.cost}</small><i style="width:${cur?s.ares.prog*100:0}%"></i></button>`;}).join('')+'</div>';
  return h;}
{const _ru=refreshUI;refreshUI=function(){_ru();const p=$('#selp');if(!p)return;const L=sel.filter(e=>!e.dead);const e=L.length===1&&L[0].isB&&L[0].side===PL?L[0]:null;let box=p.querySelector('#xupg');
  if(!e){if(box)box.remove();return;}const info=p.querySelector('.info');if(!info)return;if(!box){box=document.createElement('div');box.id='xupg';info.appendChild(box);}const h=xupgHTML(e);if(box._h!==h){box._h=h;box.innerHTML=h;}};}
document.addEventListener('click',ev=>{if(G.state!=='play')return;const t=ev.target.closest&&ev.target.closest('[data-bup],[data-tup],[data-awk]');if(!t)return;let ok=false;
  if(t.dataset.bup){const b=ents.find(x=>x.id==t.dataset.bup);ok=startBUp(PL,b);if(!ok&&b&&!b.upg)feedPush('Fonds insuffisants ('+bupCost(b)+' requis)','#ff4d5e');}
  else if(t.dataset.tup){ok=startTUp(PL,t.dataset.tup);if(!ok)feedPush(sides[PL].tres?'Un entraînement est déjà en cours':'Impossible pour l’instant (fonds ou niveau max)','#ffc53d');}
  else if(t.dataset.awk){ok=startAwk(PL,t.dataset.awk);if(!ok)feedPush(sides[PL].ares?'Un éveil est déjà en cours':'Fonds insuffisants','#ffc53d');}
  sfx(ok?'click':'err');});
// ---- visuals: level stars, upgrade scaffolding, new buildings, awakened heroes ----
{const _db=drawBuilding;drawBuilding=function(c,b,ghost){_db(c,b,ghost);if(ghost||b.rise<1)return;const l=lvlOf(b),y=b.ty*TILE-bH(b)-16;
  if(l>1){c.font='bold 11px sans-serif';c.textAlign='center';c.lineWidth=3;c.strokeStyle='#1a1408';const t='★'.repeat(l);c.strokeText(t,b.x,y);c.fillStyle='#ffd23a';c.fillText(t,b.x,y);}
  if(b.upg){const w=b.w*TILE*.6;c.fillStyle='rgba(0,0,0,.6)';c.fillRect(b.x-w/2,y+4,w,4);c.fillStyle='#ffd23a';c.fillRect(b.x-w/2,y+4,w*b.upg.prog,4);if(R()<.2)part('spark',b.tx*TILE+R()*b.w*TILE,b.ty*TILE+R()*b.h*TILE-10,rr(-30,30),-40,.4,1.5,'#ffd23a');}};}
const FPAL={dbz:{base:'#eef1f5',acc:'#ff8a1f',glow:'#6fd8ff',roof:'#2a64c8'},mha:{base:'#d8dce4',acc:'#2fd27a',glow:'#6fe8ff',roof:'#3a4a6a'},aot:{base:'#c8b08a',acc:'#4f8be0',glow:'#ffd890',roof:'#7a3a2a'},
  sl:{base:'#2a2638',acc:'#8a5aff',glow:'#4ab8ff',roof:'#1a1626'},opm:{base:'#e8eaee',acc:'#ffc21a',glow:'#ff5a3a',roof:'#d8343f'},sds:{base:'#c8b08a',acc:'#c8202e',glow:'#ffd890',roof:'#3a6a3a'},hxh:{base:'#e8e2d0',acc:'#2ab8a8',glow:'#5affd8',roof:'#2a5a56'}};
const NBD={
 armory(c,o,P){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,P.acc);box3(c,x0+8,y0+16,48,36,4,26,P.base);box3(c,x0+6,y0+14,52,40,30,4,P.roof);
   onFront(c,x0+8,y0+16,36,4,x=>{x.strokeStyle='#c8ccd8';x.lineWidth=2;x.beginPath();x.moveTo(14,-6);x.lineTo(34,-22);x.moveTo(34,-6);x.lineTo(14,-22);x.stroke();x.fillStyle=P.acc;x.beginPath();x.arc(24,-14,4,0,PI2);x.fill();});
   box3(c,x0+40,y0+52,10,6,4,6,'#4a4a52');if(Math.sin(a*6)>.7)part('spark',P3(x0+45,y0+55,12)[0],P3(x0+45,y0+55,12)[1],rr(-30,30),rr(-50,-20),.3,1.5,'#ffd890');},
 shrine(c,o,P){const{x0,y0,W,H,a,cx,cy}=o;plinth(c,x0,y0,W,H,P.acc);box3(c,cx-20,cy-14,40,30,4,22,P.base);pyramid3(c,cx-24,cy-18,48,38,26,12,P.roof);box3(c,cx-12,cy-8,24,18,38,16,P.base);pyramid3(c,cx-16,cy-12,32,26,54,12,P.roof);
   sphere3(c,cx,cy-2,5,68+Math.sin(a*2)*2,P.glow);glow3(c,cx,cy-2,73,16,P.glow,.5+.3*Math.sin(a*3));},
 outpost(c,o,P){const{x0,y0,a,cx,cy}=o;box3(c,x0+6,y0+8,20,18,0,6,'#8a8a7a');for(const[dx,dy]of[[-6,-5],[6,-5],[-6,6],[6,6]])line3(c,[cx+dx,cy+dy,6],[cx+dx*.6,cy+dy*.6,34],'#6a4a2a',1.8);box3(c,cx-8,cy-7,16,14,34,8,P.base);flag3(c,cx+4,cy-4,42,a,P.acc);beacon(c,cx-4,cy,44,a,P.glow);},
 drill(c,o,P){const{x0,y0,W,H,a,cx,cy}=o;plinth(c,x0,y0,W,H,P.acc);hazardFloor(c,x0+8,y0+10,W-16,H-18);for(const[dx,dy]of[[-14,-10],[14,-10],[0,14]])line3(c,[cx+dx,cy+dy,4],[cx,cy,62],'#5a5a64',2.4);
   const k=Math.sin(a*8)*3;cyl3(c,cx,cy,4,4+Math.abs(k),40,'#8a929c');cone3(c,cx,cy,5,0,8,'#c8ccd8');box3(c,cx-6,cy-6,12,12,58,6,P.acc);for(let i=0;i<3;i++)manaCrystal(c,x0+14+i*14,y0+H-12,6,3,'#ffcf3a',a+i);},
 shieldgen(c,o,P){const{x0,y0,W,H,a,cx,cy}=o;plinth(c,x0,y0,W,H,P.acc);cyl3(c,cx,cy,10,4,20,P.base);cyl3(c,cx,cy,4,24,22,'#9aa4b0');sphere3(c,cx,cy,6,44,P.glow);
   const p=P3(cx,cy,30);c.save();c.globalAlpha=.18+.08*Math.sin(a*2);c.fillStyle=P.glow;c.beginPath();c.ellipse(p[0],p[1],30,26,0,PI,PI2);c.fill();c.globalAlpha=.5;c.strokeStyle=P.glow;c.lineWidth=1;c.stroke();c.restore();glow3(c,cx,cy,50,14,P.glow,.6);},
 relay(c,o,P){const{x0,y0,W,H,a,cx,cy}=o;plinth(c,x0,y0,W,H,P.acc);box3(c,cx-12,cy-10,24,20,4,14,P.base);cyl3(c,cx,cy,4,18,64,'#9aa4b0');for(let i=0;i<3;i++){const p=P3(cx,cy,40+i*14),r=12-i*3+Math.sin(a*4+i)*1.5;c.strokeStyle=P.glow;c.globalAlpha=.7;c.lineWidth=1.4;c.beginPath();c.ellipse(p[0],p[1],r,r*.4,0,0,PI2);c.stroke();c.globalAlpha=1;}
   sphere3(c,cx,cy,5,82,P.acc);glow3(c,cx,cy,87,14,P.acc,.5+.4*Math.sin(a*5));}};
{const _d3=drawB3;drawB3=function(c,b,ghost){const fn=NBD[b.key];if(!fn)return _d3(c,b,ghost);const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;fn(c,{x0,y0,W,H,cx:x0+W/2,cy:y0+H/2,a:b.anim||0},FPAL[b.fac]||FPAL.dbz);};}
{const _du=drawUnitBody;drawUnitBody=function(c,u,x,y,ghost){if(!ghost&&u.isU&&isAwk(u)&&!u.hid){const A=AWK[u.fac][u.key],lift=u.fly?(u.z||0):0;c.globalCompositeOperation='lighter';drawGlow(c,x,y-lift-16,26+Math.sin(u.anim*6)*3,A.col,.4);c.globalCompositeOperation='source-over';}
  _du(c,u,x,y,ghost);if(!ghost&&u.isU&&isAwk(u)&&!u.hid){c.fillStyle=AWK[u.fac][u.key].col;c.font='bold 9px sans-serif';c.textAlign='center';c.fillText('✦',x,y-(u.fly?(u.z||0):0)-58);}};}
