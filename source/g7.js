// ===== Interface: HUD, production, selection, objectives, feed, menus =====
const ICON={menu:'M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z',coin:'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm-1 3v8h2V8z',
  bolt:'M13 2L4 14h7l-1 8 9-12h-7z',snd:'M3 9v6h4l5 5V4L7 9zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z',
  mute:'M3 9v6h4l5 5V4L7 9zm16.6 3l2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z',
  full:'M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z',pause:'M6 4h4v16H6zm8 0h4v16h-4z',
  house:'M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z',person:'M12 2a3 3 0 110 6 3 3 0 010-6zm-4 8h8l2 6h-3v6h-6v-6H6z',
  truck:'M2 6h12v9h1l2-5h4l1 3v6h-2a2 2 0 01-4 0H9a2 2 0 01-4 0H2z',star:'M12 2l3 7h7l-5.5 4.5 2 7.5L12 16.5 5.5 21l2-7.5L2 9h7z',
  sword:'M19 3l2 2-9 9 2 2-2 2-2-2-3 3H5v-2l3-3-2-2 2-2 2 2z',target:'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12zm0 4a2 2 0 100 4 2 2 0 000-4z',
  speed:'M13 4l7 8-7 8v-5H4V9h9z',heart:'M12 21l-9-9a5 5 0 017-7l2 2 2-2a5 5 0 017 7z',wrench:'M21 7a5 5 0 01-7 4l-8 8-3-3 8-8a5 5 0 016-6l-3 3 1 2 2 1z',
  stop:'M6 6h12v12H6z',lock:'M6 10V8a6 6 0 0112 0v2h1v12H5V10zm2 0h8V8a4 4 0 00-8 0z',info:'M12 2a10 10 0 100 20 10 10 0 000-20zm-1 5h2v2h-2zm0 4h2v6h-2z',
  warn:'M12 2l10 19H2zm-1 7v5h2V9zm0 7v2h2v-2z',check:'M9 16l-4-4-1.5 1.5L9 19 21 7l-1.5-1.5z',flag:'M5 3h2v18H5zm3 1h11l-3 4 3 4H8z',
  shield:'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z',crown:'M3 7l4 4 5-7 5 7 4-4-2 12H5z',bulb:'M12 2a7 7 0 00-4 12.7V18h8v-3.3A7 7 0 0012 2zM9 20h6v2H9z'};
const svg=(n,c)=>`<svg class="i ${c||''}" viewBox="0 0 24 24"><path d="${ICON[n]}"/></svg>`;
let tab='b',items=[],hoverEnt=null;const iconCache={};
const TABS=[{id:'b',name:'Base',ic:'house'},{id:'s',name:'Spécial',ic:'flag'},{id:'d',name:'Défense',ic:'shield'},{id:'i',name:'Troupes',ic:'person'},{id:'v',name:'Engins',ic:'truck'},{id:'h',name:'Héros',ic:'star'},{id:'l',name:'Légendes',ic:'crown'}];
const HK=['w','x','c','v','b','n',',',';'];
const ABDESC={beam:'Rayon dévastateur en ligne droite',blast:'Explosion de zone à distance',dash_blast:'Bond puis explosion de zone',cone:'Onde de choc en cône qui repousse',
  ice:'Mur de glace qui gèle les ennemis',crush:'Écrase une zone et étourdit',capsule:'Déploie une tourelle instantanément',harden:'Quasi invulnérable, attire les ennemis',feathers:'Pluie de plumes sur une zone',rally:'Galvanise les alliés proches',snipe:'Tir unique dévastateur à longue portée',rage:'Dégâts doublés, soin immédiat',disc:'Disque qui tranche tout sur sa ligne',lift:'Fait léviter puis écrase les ennemis'};
Object.assign(ABDESC,{shift:'Transformation en titan géant',slash:'Charge tranchante en ligne droite',barrage:'Salve de lances explosives en zone'});
Object.assign(ABDESC,{hakai:'Efface une unité instantanément',rewind:'Soigne et libère les alliés proches',barrier:'Bouclier d’énergie sur les alliés',phase:'Intouchable, charge à travers les ennemis',bind:'Immobilise une zone',erase:'Bloque les pouvoirs des héros ennemis'});

function tabItems(t){const f=sides[PL].fac;return(t==='b'?B_MAIN2:t==='s'?B_SPEC:t==='d'?B_DEF2:t==='i'?['inf1','inf2','inf3','inf4','healer']:t==='v'?['harv','tank','jet','mech','mcv']:t==='l'?FAC[f].legends:FAC[f].heroes).map(k=>({isB:t==='b'||t==='s'||t==='d',key:k}));}
function lookOf(fac,key){const D=UDEF[fac][key];return D.look==='student'?Object.assign({},LOOK.student,STUDENT[0]):LOOK[D.look];}
function iconFor(isB,key,fac){const id=(isB?'b':'u')+key+fac;if(iconCache[id])return iconCache[id];const c=document.createElement('canvas');c.width=180;c.height=120;const x=c.getContext('2d');
  const g=x.createRadialGradient(90,70,10,90,60,110);g.addColorStop(0,'#33425a');g.addColorStop(1,'#0e131b');x.fillStyle=g;x.fillRect(0,0,180,120);
  x.fillStyle=FAC[fac].col+'22';x.beginPath();x.moveTo(0,120);x.lineTo(180,60);x.lineTo(180,120);x.fill();
  if(isB){const D=BDEF[key],fb={tx:0,ty:0,w:D.w,h:D.h,key,fac,anim:1,rise:1,tang:-PI/4,hp:1,max:1},h=bH(fb),W=D.w*TILE,Hh=D.h*TILE,s=Math.min(1.25,150/(W+h*.3),108/(Hh+h));x.save();x.translate(90-s*(W-.26*h)/2,114-s*Hh);x.scale(s,s);
    drawBuilding(x,fb,true);x.restore();}
  else{const D=UDEF[fac][key];if(D.mech||D.heavy){x.save();x.translate(90,92);x.scale(D.mech?1.25:1.8,D.mech?1.25:1.8);const fu={fac,key,ang:-PI/5,tang:-PI/5,r:D.size,D,moving:false,anim:0,atk:0};D.mech?drawMech(x,fu,0,0,true):drawHeavyCannon(x,fu,0,0);x.restore();}else if(D.veh){x.save();x.translate(90,64);x.scale(2.6,2.6);drawVehicle(x,{fac,key,ang:-PI/5,tang:-PI/5,r:D.size,D,moving:false,anim:0,load:CAP*.7,hs:'',fly:false,z:0},0,0,true);x.restore();}
    else{x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(90,114,30,6,0,0,PI2);x.fill();drawFighter(x,90,114,lookOf(fac,key),1,0,false,D.hero?3:2.8,{});}}
  return iconCache[id]=c;}
function portrait(e,w,h){const c=document.createElement('canvas');c.width=w*2;c.height=h*2;const x=c.getContext('2d');x.scale(2,2);
  const g=x.createRadialGradient(w/2,h*.45,4,w/2,h/2,w*.8);g.addColorStop(0,FAC[e.fac].col+'66');g.addColorStop(1,'#0b1017');x.fillStyle=g;x.fillRect(0,0,w,h);
  if(e.isB)x.drawImage(iconFor(true,e.key,e.fac),0,0,w,h);
  else if(e.D.mech||e.D.heavy){x.save();x.translate(w/2,h*.78);x.scale(w/80,w/80);e.D.mech?drawMech(x,e,0,0,true):drawHeavyCannon(x,e,0,0);x.restore();}
  else if(e.D.veh){x.save();x.translate(w/2,h/2);x.scale(w/52,w/52);drawVehicle(x,{fac:e.fac,key:e.key,ang:-PI/5,tang:-PI/5,r:e.r,D:e.D,moving:false,anim:0,load:e.load,hs:'',fly:false,z:0},0,0,true);x.restore();}
  else{const sc=h/30;drawFighter(x,w/2,h*1.18,unitLook(e),1,gtime,false,sc,{ssj:e.ssj||e.buff>0,aura:e.ssj?'#ffd23a':null});}
  return c;}
// ---------- production ----------
function buildTabs(){const t=$('#tabs');t.innerHTML='';for(const T of TABS){const b=document.createElement('button');b.type='button';b.className='tab'+(T.id===tab?' on':'');b.dataset.t=T.id;
  b.innerHTML=svg(T.ic)+`<span>${T.name}</span><span class="dot" hidden></span>`;b.title=T.name+' (Tab pour changer)';b.onclick=()=>{setTab(T.id);sfx('tab');};t.appendChild(b);}}
function setTab(t){tab=t;document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x.dataset.t===t));buildGrid();}
function cycleTab(){const i=TABS.findIndex(T=>T.id===tab);setTab(TABS[(i+1)%TABS.length].id);sfx('tab');}
function buildGrid(){const grid=$('#grid');grid.innerHTML='';items=tabItems(tab);const fac=sides[PL].fac;
  items.forEach((it,i)=>{const D=it.isB?BDEF[it.key]:UDEF[fac][it.key],el=document.createElement('button');el.type='button';el.className='card';
    const cv2=document.createElement('canvas');cv2.width=180;cv2.height=120;cv2.getContext('2d').drawImage(iconFor(it.isB,it.key,fac),0,0);el.appendChild(cv2);
    el.insertAdjacentHTML('beforeend',`<span class="hk">${HK[i]}</span><span class="cnt"></span><div class="ft"><span class="nm">${it.isB?D.names[fac]:D.name}</span><span class="cs">${D.cost}</span></div><div class="pg"></div><div class="pct"></div><div class="lock">${svg('lock')}<span class="lt"></span></div><div class="rdy">PRÊT !<small>Clique, puis place-le</small></div>`);
    el.addEventListener('click',e=>{audioInit();itemClick(it,e.shiftKey);});
    el.addEventListener('contextmenu',e=>{e.preventDefault();itemCancel(it);});
    el.addEventListener('pointerenter',()=>{showTip(it,el);sfx('hover');});el.addEventListener('pointerleave',hideTip);
    it.el=el;it.pg=el.querySelector('.pg');it.pct=el.querySelector('.pct');it.cnt=el.querySelector('.cnt');it.lt=el.querySelector('.lt');grid.appendChild(el);});
  refreshUI();}
function itemClick(it,shift){const s=sides[PL];
  if(it.isB){if(s.prodB&&s.prodB.key===it.key&&s.prodB.ready){mode={type:'place',key:it.key};sfx('click');return;}
    if(s.prodB){feedPush(s.prodB.ready?'Place d’abord le bâtiment terminé (carte qui clignote)':'Une construction est déjà en cours','#ffc53d');sfx('err');return;}
    if(!has(PL,'hq')&&!has(PL,'hq2')){feedPush('Ton quartier général est détruit : plus de construction possible','#ff4d5e');sfx('err');return;}
    if(!reqOk(PL,BDEF[it.key].req)){feedPush('Il faut d’abord : '+BDEF[it.key].req.map(k=>BDEF[k].names[s.fac]).join(', '),'#ffc53d');sfx('err');return;}
    if(s.credits<BDEF[it.key].cost){feedPush('Fonds insuffisants ('+BDEF[it.key].cost+' requis)','#ff4d5e');sfx('err');return;}startBuild(PL,it.key);sfx('click');}
  else{const D=UDEF[s.fac][it.key];if(!has(PL,D.at)){feedPush('Il faut d’abord : '+BDEF[D.at].names[s.fac],'#ffc53d');sfx('err');return;}
    if(D.hero&&heroBusy(PL,it.key)){feedPush(D.name+' est déjà sur le terrain ou en formation','#ffc53d');sfx('err');return;}
    let n=0;for(let k=0;k<(shift&&!D.hero?5:1);k++)if(queueUnit(PL,it.key))n++;if(!n){feedPush(s.credits<D.cost?'Fonds insuffisants ('+D.cost+' requis)':'File de production pleine',s.credits<D.cost?'#ff4d5e':'#ffc53d');sfx('err');}else sfx('click');}
  refreshUI();}
function itemCancel(it){const s=sides[PL];if(it.isB){if(s.prodB&&s.prodB.key===it.key){cancelBuild(PL);if(mode&&mode.type==='place')mode=null;sfx('sell');}}else if(unqueueUnit(PL,it.key))sfx('sell');refreshUI();}
function showTip(it,el){const s=sides[PL],f=s.fac,D=it.isB?BDEF[it.key]:UDEF[f][it.key],tip=$('#tip');const name=it.isB?D.names[f]:D.name;
  const req=it.isB?D.req:[D.at,...D.req.filter(k=>k!==D.at)];const miss=req.filter(k=>!has(PL,k)).map(k=>reqName(k,f));
  const bar=(l,v)=>`<span>${l}</span><i style="width:${Math.round(clamp(v,.04,1)*100)}%"></i>`;let st='';
  if(!it.isB){st='<div class="sb">'+bar('Vie',D.hp/2300)+(D.dmg?bar('Dégâts',D.dmg/D.rof/75)+bar('Portée',D.range/240):D.heal?bar('Soins',D.heal/40):'')+bar('Vitesse',D.speed/125)+'</div>';}
  else st=`<div class="m">Vie ${D.hp} · Énergie ${D.pow>0?'+':''}${D.pow}${D.wpn?` · Dégâts ${D.wpn.dmg}/s`:''}</div>`;
  const ab=!it.isB&&D.ab?`<div class="ab"><b style="font-family:var(--f-ui);font-size:12.5px">Spéciale (Q) : ${D.ab.name}</b><br>${ABDESC[D.ab.type]}${D.ab2?`<br><b style="font-family:var(--f-ui);font-size:12.5px">2e capacité (E) : ${D.ab2.name}</b><br>${ABDESC[D.ab2.type]}`:''}</div>`:'';
  const tags=!it.isB?[D.fly?'Volant':'',D.melee?'Corps à corps':'',D.hero?'Héros unique':''].filter(Boolean).join(' · '):'';
  tip.innerHTML=`<div class="h"><b>${name}</b><span class="c">${D.cost} ${FAC[f].money}</span></div><div>${(D.descs&&D.descs[f])||D.desc||''}</div>${tags?`<div class="m">${tags}</div>`:''}${st}${ab}${miss.length?`<div class="r">Nécessite : ${miss.join(', ')}</div>`:''}<div class="m">Raccourci ${HK[items.indexOf(it)].toUpperCase()} · clic droit : annuler${!it.isB&&!D.hero?' · Maj+clic : ×5':''}</div>`;
  tip.style.display='block';const r=el.getBoundingClientRect();tip.style.left=clamp(r.left+r.width/2-130,8,window.innerWidth-268)+'px';tip.style.top=Math.max(8,r.top-tip.offsetHeight-8)+'px';}
function hideTip(){$('#tip').style.display='none';}
// ---------- feed, banner, hint ----------
const FEEDMAX=4;let lastFeed=null;
function feedPush(text,col,opt){const f=$('#feed');if(!f)return;col=col||'#8e9bb0';
  if(lastFeed&&lastFeed.base===text&&lastFeed.el.isConnected){lastFeed.n++;lastFeed.el.querySelector('.tx').textContent=text+' ×'+lastFeed.n;lastFeed.t=performance.now();return;}
  const ic=col==='#ff4d5e'||col==='#ff8a6a'?'warn':col==='#ffb52a'||col==='#ffd23a'||col==='#ffc53d'?'star':col==='#7dff9a'||col==='#4fd17a'?'check':'info';
  const el=document.createElement('div');el.className='fe';el.style.setProperty('--c',col);el.innerHTML=svg(ic)+`<span class="tx"></span>`;el.querySelector('.tx').textContent=text;
  if((ic==='warn')&&G.alertPos){const p={...G.alertPos};el.classList.add('click');el.insertAdjacentHTML('beforeend','<span class="go2">voir ›</span>');el.onclick=()=>centerOn(p.x,p.y);}
  f.appendChild(el);lastFeed={el,base:text,n:1,t:performance.now()};while(f.children.length>FEEDMAX)f.firstChild.remove();
  const born=performance.now();setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),650);},7000);}
let bannerT=null;function banner(text,col){const b=$('#banner');b.textContent=text;b.style.setProperty('--bc',col||'#ff4d5e');b.classList.remove('on');void b.offsetWidth;b.classList.add('on');clearTimeout(bannerT);bannerT=setTimeout(()=>b.classList.remove('on'),2300);}
function hintText(){const s=sides[PL];if(mode){if(mode.type==='place')return'Clique sur la carte pour placer : '+BDEF[mode.key].names[s.fac]+' (près de tes bâtiments, cases vertes) · clic droit : annuler';
    if(mode.type==='ability')return'Vise avec le clic gauche pour lancer '+mode.u.D.ab.name+' · clic droit : annuler';
    if(mode.type==='super')return'Choisis la cible de '+SUPER[s.fac].name+' · clic droit : annuler';
    return'Clique sur la destination : tes unités attaqueront tout ce qu’elles croisent';}
  if(s.prodB&&s.prodB.ready)return'Bâtiment prêt ! Clique sur sa carte qui clignote (onglet Bâtiments) pour le placer';return'';}
// ---------- objectives ----------
function objectives(){const s=sides[PL],f=s.fac,N=k=>BDEF[k].names[f];s.od=s.od||{};
  const L=[{id:'p',t:`Construis : ${N('power')}`,ok:()=>has(PL,'power'),k:'power'},{id:'r',t:`Construis : ${N('refinery')} (livre un camion collecteur)`,ok:()=>has(PL,'refinery'),k:'refinery'},
    {id:'b',t:`Construis : ${N('barracks')}, puis entraîne des soldats`,ok:()=>has(PL,'barracks'),k:'barracks'},{id:'f',t:`Construis : ${N('factory')}`,ok:()=>has(PL,'factory'),k:'factory'},
    {id:'t',t:`Construis : ${N('temple')}`,ok:()=>has(PL,'temple'),k:'temple'},{id:'h',t:'Recrute un héros (onglet Héros)',ok:()=>!!s.heroMade,hero:true},
    {id:'w',t:`Détruis la base ennemie (${ents.filter(e=>e.isB&&isPl(e.side)&&foe(e.side,PL)).length} bâtiments restants)`,ok:()=>false}];
  for(const o of L)if(!s.od[o.id]&&o.ok())s.od[o.id]=true;const cur=L.find(o=>!s.od[o.id]);return{L,cur,s};}
let objSig='';
function renderObjectives(){const{L,cur,s}=objectives();const html=L.map(o=>`<li class="${s.od[o.id]?'done':o===cur?'cur':''}"><span class="ck">${s.od[o.id]?svg('check'):''}</span><span>${o.t}</span></li>`).join('');
  if(html!==objSig){objSig=html;$('#objl').innerHTML=html;}$('#objb').textContent=`Bonus : Dragon Balls ${dbCount(PL)}/7. Réunis-les pour obtenir un vœu de Shenron.`;
  let hk=null;if(cur&&cur.k&&!(sides[PL].prodB&&sides[PL].prodB.key!==cur.k))hk={isB:true,key:cur.k};else if(cur&&cur.hero&&has(PL,'temple'))hk={isB:false,key:FAC[s.fac].heroes.find(k=>!heroBusy(PL,k))};
  if(s.prodB&&s.prodB.ready)hk={isB:true,key:s.prodB.key};return hk;}
// ---------- per-frame HUD refresh ----------
let incHist=[];
function refreshUI(){const s=sides[PL];if(!s||!items.length&&G.state!=='play')return;const f=s.fac;
  $('#cred').textContent=Math.floor(s.credits);
  if(!incHist.length||gtime-incHist[incHist.length-1][0]>=1){incHist.push([gtime,s.st.harv]);while(incHist.length>61)incHist.shift();}
  const o=incHist[0],inc=gtime-o[0]>5?Math.round((s.st.harv-o[1])*60/(gtime-o[0])):0;$('#income').textContent=inc>0?'+'+inc+'/min':'';
  const pw=$('#pow');pw.classList.toggle('low',s.use>s.pow);$('#powtxt').textContent=s.use+' / '+s.pow;$('#powfill').style.width=(s.pow?clamp(s.use/s.pow,0,1)*100:100)+'%';
  const me=dbCount(PL),en=PSIDES.filter(s=>foe(s,PL)).reduce((a,s)=>a+dbCount(s),0);let h='';for(let k=0;k<7;k++)h+=`<i class="b ${k<me?'me':k>=7-en?'en':''}"></i>`;const bh=$('#dballs');if(bh.innerHTML!==h)bh.innerHTML=h;
  const SP=SUPER[f],okT=has(PL,'temple+'),rdy=okT&&s.sp>=SP.charge;$('#supern').textContent=SP.name;
  $('#supers').textContent=!okT?(has(PL,'temple')?'Améliore : ':'Nécessite : ')+BDEF.temple.names[f]+(has(PL,'temple')?' ★':''):rdy?'PRÊT ! Clique pour viser':'Charge '+Math.floor(s.sp/SP.charge*100)+' %';
  $('#superring').setAttribute('stroke-dashoffset',94.25*(1-(okT?s.sp/SP.charge:0)));const sb=$('#superb');sb.classList.toggle('ready',rdy);sb.classList.toggle('off',!okT);
  const t=Math.floor(gtime);$('#clock').textContent=String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');
  const hint=renderObjectives();
  // tabs dots
  for(const T of TABS){const el=document.querySelector(`.tab[data-t="${T.id}"] .dot`);if(!el)continue;let n='';
    if(T.id==='b'||T.id==='d'||T.id==='s'){if(s.prodB&&s.prodB.ready&&tabItems(T.id).some(i=>i.key===s.prodB.key))n='!';}else{const keys=tabItems(T.id).map(i=>i.key);let c=0;for(const q of Object.values(s.q))for(const it of q)if(keys.includes(it.key))c++;if(c)n=c;}
    el.hidden=!n;el.textContent=n;}
  for(const it of items){const D=it.isB?BDEF[it.key]:UDEF[f][it.key];let locked=false,lt='',prog=-1,ready=false,cnt=0,busy=false;
    if(it.isB){if(!has(PL,'hq')&&!has(PL,'hq2')){locked=true;lt='Quartier général détruit';}else if(!reqOk(PL,D.req)){locked=true;lt='Nécessite<br>'+D.req.filter(k=>!has(PL,k)).map(k=>reqName(k,f)).join('<br>');}
      if(s.prodB){if(s.prodB.key===it.key){prog=s.prodB.prog;ready=s.prodB.ready;}else busy=true;}}
    else{const q=s.q[D.at];if(!has(PL,D.at)){locked=true;lt='Nécessite<br>'+BDEF[D.at].names[f];}else if(!reqOk(PL,D.req)){locked=true;lt='Nécessite<br>'+D.req.filter(k=>!has(PL,k)).map(k=>reqName(k,f)).join('<br>');}else if(D.hero&&ents.some(e=>e.isU&&!e.dead&&e.side===PL&&e.key===it.key)){locked=true;lt='Sur le terrain';}
      const mine=q.filter(x=>x.key===it.key);cnt=mine.length;if(cnt)prog=q[0].key===it.key?q[0].prog:0;}
    it.el.classList.toggle('locked',locked&&prog<0);if(it._lt!==lt){it.lt.innerHTML=lt;it._lt=lt;}it.el.classList.toggle('ready',ready);it.el.classList.toggle('busy',busy&&!locked);
    it.el.classList.toggle('poor',s.credits<D.cost&&prog<0);it.el.classList.toggle('hint',!!hint&&hint.isB===it.isB&&hint.key===it.key&&!locked);
    it.cnt.textContent=cnt>1?cnt:'';it.pg.style.background=prog>=0&&!ready?`conic-gradient(transparent 0 ${prog*360}deg, rgba(0,0,0,.66) ${prog*360}deg 360deg)`:'none';
    it.pct.textContent=prog>=0&&!ready?Math.floor(prog*100)+'%':'';}
  const ht=hintText(),hn=$('#hint');hn.hidden=!ht;if(ht&&hn.textContent!==ht)hn.textContent=ht;
  updateSelPanel();}
// ---------- selection panel ----------
const TIPS=['Sélectionne <b>Goku et Vegeta</b> ensemble (proches) pour les fusionner en <b>Vegito</b>.','L’onglet <b>Légendes</b> s’ouvre avec le bâtiment des légendes : Beerus, Broly, Mt. Lady, Titan Bestial…','<b>Clic droit</b> sur les cristaux dorés avec un camion pour récolter.','Glisse le clic gauche pour sélectionner un groupe, puis <b>clic droit</b> pour l’envoyer.',
  'Avec un héros sélectionné, appuie sur <b>Q</b> pour son attaque spéciale.','<b>Ctrl+1</b> mémorise un groupe, <b>1</b> le rappelle.','Une unité qui porte des Dragon Balls les lâche quand elle tombe : protège-la !',
  'Sélectionne un bâtiment de production puis <b>clic droit</b> sur la carte : les nouvelles unités iront à ce point de ralliement.','Si l’énergie est en rouge, tout ralentit : construis un générateur.',
  '<b>A</b> puis clic : tes unités attaquent tout ce qu’elles croisent en chemin.'];
const FTIPS={sl:['Garde <b>Sung Jinwoo</b> près des combats : les ennemis tués autour de lui se relèvent dans ton armée des ombres.','Le <b>Système</b> (en haut) affiche le niveau de Jinwoo, tes ombres et la quête journalière en cours.'],hxh:['Change la <b>posture de Nen</b> de toute ton armée avec les boutons Ten / Ren / Zetsu en haut (touche Z).','En <b>Zetsu</b>, tes troupes sont invisibles : approche-toi en silence, le premier coup inflige ×2,5.'],opm:['La compétence de <b>Saitama</b> (touche Q) tue les troupes en un coup, mais il part parfois aux soldes : ne compte pas que sur lui !','Chaque ennemi abattu rapporte une <b>prime de l’Association</b>. <b>King</b> paralyse de peur les ennemis proches (touche Q).']};
function TP(){const f=sides[PL]&&sides[PL].fac;return[...(FTIPS[f]||[]),...TIPS.filter(t=>f==='dbz'||!t.includes('Vegito'))];}
function tags(e){const t=[];if(e.side!==PL)t.push(['Ennemi','enemy']);
  if(e.isB){t.push(['Bâtiment','']);if(e.D.pow>0)t.push(['Énergie +'+e.D.pow,'']);else if(e.D.pow<0)t.push(['Consomme '+(-e.D.pow),'']);if(e.rise<1)t.push(['En construction','rank']);}
  else{const D=e.D;if(D.hero)t.push(['Héros','hero']);t.push([D.harv?'Collecteur':D.heal?'Soigneur':D.veh?'Véhicule':'Infanterie','']);if(D.fly)t.push(['Volant','']);if(D.odm&&!e.form)t.push(['Tridimensionnel','']);if(e.form)t.push(['Titan','hero']);if(D.nape)t.push(['Anti-géants','']);
    if(D.melee)t.push(['Corps à corps','']);else if(D.dmg)t.push(['Distance','']);if(e.rank)t.push([RANKN[e.rank],'rank']);if(e.ssj)t.push(['Super Saiyan','ssj']);
    const n=dballs.filter(b=>b.carrier===e).length;if(n)t.push([n+' Dragon Ball'+(n>1?'s':''),'db']);}
  return t.map(([a,c])=>`<span class="tg ${c}">${a}</span>`).join('');}
function cmdBtns(units,b){let h='<div class="cmd">';
  if(units){h+=`<button type="button" class="cbtn" data-c="amove">${svg('target')}Attaquer<span class="k">A</span></button><button type="button" class="cbtn" data-c="stop">${svg('stop')}Stop<span class="k">S</span></button>`;}
  if(b){h+=`<button type="button" class="cbtn ${b.repairing?'on':''}" data-c="rep">${svg('wrench')}${b.repairing?'Répare…':'Réparer'}</button>`;if(b.key!=='hq')h+=`<button type="button" class="cbtn danger" data-c="sell">${svg('coin')}Vendre</button>`;}
  return h+'</div>';}
function abilBtn(u){const ab=u.D.ab;return`<button type="button" class="abil" data-ab="${u.id}" style="--ac:${ab.col}"><span class="ico"></span><span><b>${ab.name}</b><small>${ABDESC[ab.type]}</small></span><span class="key">Q</span><span class="cdv"></span></button>`;}
function wireSel(p,L){p.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const c=b.dataset.c;sfx('click');
    if(c==='amove')mode={type:'amove'};else if(c==='stop'){for(const u of mySel())if(u.isU)orderStop(u);}
    else if(c==='rep'){const e=L[0];setRepair(e,!e.repairing&&e.hp<e.max);if(!e.repairing&&e.hp>=e.max)feedPush('Ce bâtiment est intact');G.selSig='';}
    else if(c==='sell'){sfx('sell');sellBuilding(L[0]);setSel([]);}});
  p.querySelectorAll('[data-ab]').forEach(b=>b.onclick=()=>{const u=L.find(e=>e.id==b.dataset.ab);if(u)triggerAbility(u);});
  p.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{const S=sides[PL];if(S.ups.includes(b.dataset.up))return;if(S.res){feedPush('Une recherche est déjà en cours','#ffc53d');sfx('err');return;}if(!startResearch(PL,b.dataset.up)){feedPush('Fonds insuffisants','#ff4d5e');sfx('err');}else{sfx('click');G.selSig='';}});
  p.querySelectorAll('[data-fuse]').forEach(b=>b.onclick=()=>{const P=fusionPair(sel.filter(e=>e.side===PL));if(P)doFusion(P[0],P[1]);else{feedPush('Goku et Vegeta doivent être proches l’un de l’autre','#ffc53d');sfx('err');}});
  p.querySelectorAll('[data-mu]').forEach(b=>b.onclick=()=>{const u=L.find(e=>e.id==b.dataset.mu);if(u){setSel([u]);}});}
function updateSelPanel(){const p=$('#selp'),L=sel.filter(e=>!e.dead);
  const sig=(sides[PL]?(sides[PL].ups.length+(sides[PL].res?sides[PL].res.id:'')):'')+L.map(e=>e.id+':'+(e.rank||0)+(e.repairing?'r':'')+(e.ssj?'s':'')+(e.rise<1?'c':'')+dballs.filter(b=>b.carrier===e).length).join(',')+(L.length?'':'|'+Math.floor(gtime/12)%TP().length);
  if(sig!==G.selSig){G.selSig=sig;
    if(!L.length){const TT=TP(),i=Math.floor(gtime/12)%TT.length;p.innerHTML=`<div class="empty"><h5>Aucune sélection</h5><div class="tp">${svg('bulb')}<span>${TT[i]}</span></div><div class="tp">${svg('bulb')}<span>${TT[(i+3)%TT.length]}</span></div></div>`;return;}
    if(L.length===1){const e=L[0],D=e.D,nm=e.isB?D.names[e.fac]:D.name,own=e.side===PL;
      let stats='';if(e.isU){if(D.dmg)stats+=`<span>${svg('sword')}Dégâts <b>${Math.round(D.dmg*dmgMult(e))}</b></span><span>${svg('target')}Portée <b>${(D.range/TILE).toFixed(1)}</b></span>`;
        if(D.heal)stats+=`<span>${svg('heart')}Soins <b>${D.heal}/s</b></span>`;stats+=`<span>${svg('speed')}Vitesse <b>${Math.round(D.speed)}</b></span>`;}
      else if(e.D.wpn)stats=`<span>${svg('sword')}Dégâts <b>${D.wpn.dmg}</b></span><span>${svg('target')}Portée <b>${(D.wpn.range/TILE).toFixed(1)}</b></span>`;
      let queue='';if(e.isB&&own&&e.key==='lab'){const S=sides[PL];queue='<div class="resg">'+UPG[e.fac].map(u=>{const done=S.ups.includes(u.id),cur=S.res&&S.res.id===u.id;return`<button type="button" class="rbtn ${done?'done':cur?'cur':''}" data-up="${u.id}" title="${u.desc}"><b>${u.name}</b><small>${done?'Acquis':cur?'Recherche…':u.desc+' · '+u.cost}</small><i></i></button>`;}).join('')+'</div>';}
      else if(e.isB&&own&&sides[PL].q[e.key]){const q=sides[PL].q[e.key];queue=q.length?`<div class="queue" id="selq">${q.map(()=>'<span><canvas width="72" height="72"></canvas><i></i></span>').join('')}</div>`:`<div class="desc">Aucune production en cours. Clic droit sur la carte : point de ralliement.</div>`;}
      p.innerHTML=`<div class="por"></div><div class="info"><div class="nm">${nm}</div><div class="tags">${tags(e)}</div><div class="hpbig"><i id="shp"></i><span id="shpt"></span></div>
        ${e.isU&&!D.harv?`<div class="xpl"><span id="sxpl"></span><div class="xpb"><i id="sxp"></i></div></div>`:''}${stats?`<div class="stats">${stats}</div>`:''}
        ${e.isU&&D.harv?`<div class="desc" id="sload"></div>`:''}${queue||`<div class="desc">${D.desc||''}</div>`}</div>
        <div class="acts">${own&&e.isU&&D.ab?abilBtn(e):''}${own?cmdBtns(e.isU&&!D.harv&&D.dmg,e.isB?e:null):''}${own&&e.isU&&D.harv?cmdBtns(true,null):''}</div>`;
      p.querySelector('.por').appendChild(portrait(e,150,118));
      const qe=p.querySelector('#selq');if(qe){const q=sides[PL].q[e.key];qe.querySelectorAll('canvas').forEach((c,i)=>{c.getContext('2d').drawImage(iconFor(false,q[i].key,e.fac),30,0,120,120,0,0,72,72);});}}
    else{const heroes=L.filter(e=>e.isU&&e.D.ab&&e.side===PL).slice(0,3);
      p.innerHTML=`<div class="info" style="flex:1"><div class="nm">${L.length} unités</div><div class="multi">${L.slice(0,40).map(e=>`<button type="button" class="mu ${e.D.hero?'hero':''}" data-mu="${e.id}" title="${e.isB?e.D.names[e.fac]:e.D.name}"><canvas width="92" height="96"></canvas><i style="width:${e.hp/e.max*100}%"></i></button>`).join('')}</div></div>
        <div class="acts">${fusionPair(L.filter(e=>e.side===PL))?'<button type="button" class="abil" data-fuse="1" style="--ac:#ffd23a"><span class="ico"></span><span><b>Fusion Potara</b><small>Goku + Vegeta → Vegito (45 s)</small></span></button>':''}${heroes.map(abilBtn).join('')}${cmdBtns(true,null)}</div>`;
      p.querySelectorAll('.mu canvas').forEach((c,i)=>{const e=L[i];c.getContext('2d').drawImage(iconFor(e.isB,e.key,e.fac),30,0,120,120,0,0,92,96);});}
    wireSel(p,L);}
  if(L.length===1){const e=L[0],hp=$('#shp');if(hp){const f=e.hp/e.max;hp.style.width=(f*100)+'%';hp.style.background=e.side!==PL?'linear-gradient(180deg,#ff8a94,#c8303e)':f>.5?'':f>.25?'linear-gradient(180deg,#ffe07a,#d9a21a)':'linear-gradient(180deg,#ff8a94,#c8303e)';$('#shpt').textContent=Math.ceil(e.hp)+' / '+e.max;}
    const xp=$('#sxp');if(xp){if(e.rank>=3){xp.style.width='100%';$('#sxpl').textContent='Rang max';}else{const th=rankTh(e),lo=e.rank?th[e.rank-1]:0;xp.style.width=clamp((e.xp-lo)/(th[e.rank]-lo),0,1)*100+'%';$('#sxpl').textContent='XP → '+RANKN[e.rank+1];}}
    const ld=$('#sload');if(ld)ld.textContent=`Cargaison ${e.load} / ${CAP} · ${({seek:'cherche des cristaux',go:'part récolter',mine:'récolte',ret:'retourne à la raffinerie',retgo:'retourne à la raffinerie',unload:'décharge',wait:'en attente'})[e.hs]||''}`;
    const rb=p.querySelector('.rbtn.cur i');if(rb&&sides[PL].res)rb.style.width=(sides[PL].res.prog*100)+'%';
    const q=$('#selq');if(q&&e.isB){const Q=sides[PL].q[e.key];q.querySelectorAll('i').forEach((b,i)=>{b.style.width=(Q[i]?Q[i].prog*100:0)+'%';});}}
  for(const b of p.querySelectorAll('.abil')){const h=L.find(e=>e.id==b.dataset.ab);if(!h)continue;const cool=!canCast(h);b.classList.toggle('cool',cool);b.querySelector('.cdv').textContent=h.abCd>0?Math.ceil(h.abCd)+' s':'…';}
  for(const b of p.querySelectorAll('.mu')){const h=L.find(e=>e.id==b.dataset.mu);if(h)b.querySelector('i').style.width=(h.hp/h.max*100)+'%';}}
// ---------- pause menu ----------
function openPause(){if(G.state!=='play'||G.wishPending)return;G.paused=true;$('#pausem').hidden=false;for(const k of['master','music','sfx']){$('#v'+k).value=VOL[k];$('#ov'+k).textContent=Math.round(VOL[k]*100)+'%';}$('#vvoice').checked=VOL.voice;}
function closePause(){$('#pausem').hidden=true;G.paused=false;}
for(const k of['master','music','sfx'])$('#v'+k).addEventListener('input',e=>{VOL[k]=+e.target.value;$('#ov'+k).textContent=Math.round(VOL[k]*100)+'%';applyVol();saveVol();if(k==='sfx')sfx('click');});
$('#vvoice').addEventListener('change',e=>{VOL.voice=e.target.checked;saveVol();});
$('#presume').onclick=closePause;
$('#pquit').onclick=()=>{closePause();G.state='menu';$('#menu').hidden=false;setMusic('menu');startMenuBg();};
// ---------- top bar buttons ----------
$('#bmenu').innerHTML=svg('menu')+'Menu';$('#icoin').innerHTML=svg('coin');$('#ibolt').innerHTML=svg('bolt');
function sndIcon(){$('#bsnd').innerHTML=svg(muted?'mute':'snd');}sndIcon();$('#bfull').innerHTML=svg('full');$('#bpause').innerHTML=svg('pause');
$('#bmenu').onclick=()=>{audioInit();openPause();};$('#bpause').onclick=()=>{audioInit();openPause();};
$('#bsnd').onclick=()=>{audioInit();muted=!muted;applyVol();sndIcon();};
$('#bfull').onclick=()=>toggleFull();
$('#bobj').onclick=()=>{$('#obj').hidden=!$('#obj').hidden;};$('#objx').onclick=()=>{$('#obj').hidden=true;};
$('#superb').addEventListener('click',()=>{const s=sides[PL];if(!s||G.state!=='play')return;if(has(PL,'temple')&&s.sp>=SUPER[s.fac].charge){mode={type:'super'};sfx('click');}
  else{feedPush(has(PL,'temple')?SUPER[s.fac].name+' n’est pas encore chargée':'Construis d’abord : '+BDEF.temple.names[s.fac],'#ffc53d');sfx('err');}});
document.querySelectorAll('#wish .mbtn').forEach(b=>b.addEventListener('click',()=>{chooseWish(b.dataset.w);sfx('dball');}));
$('#bagain').addEventListener('click',()=>{$('#end').hidden=true;$('#menu').hidden=false;G.state='menu';setMusic('menu');startMenuBg();});
function uiNewGame(fac){document.documentElement.style.setProperty('--acc',FAC[fac].col);document.documentElement.style.setProperty('--acc2',({dbz:'#ffd23a',mha:'#b8ff6a',aot:'#a8d4ff',sl:'#6fd8ff',opm:'#ff5a3a',hxh:'#ffcf3a',sds:'#e8c040'})[fac]);
  $('#credlbl').textContent=FAC[fac].money;tab='b';incHist=[];objSig='';$('#feed').innerHTML='';$('#obj').hidden=false;$('#pausem').hidden=true;buildTabs();buildGrid();setMusic('battle');stopMenuBg();}
// ---------- main menu ----------
let menuFac='dbz',menuDiff=1,menuOpp='rand',mbgOn=false,menuMap='vallee',menuMode='1v1';
function drawPortraits(){for(const[id,look,col]of[['pdbz','goku','#ff8a1f'],['pmha','allmight','#2fd27a'],['paot','levi','#4f8be0'],['psl','jinwoo','#8a5aff'],['popm','saitama','#ffc21a'],['phxh','gon','#2ab8a8'],['psds','meliodas','#c8202e']]){const c=document.getElementById(id).getContext('2d');c.clearRect(0,0,300,300);
    const g=c.createRadialGradient(150,140,10,150,150,150);g.addColorStop(0,col+'66');g.addColorStop(1,'#00000000');c.fillStyle=g;c.fillRect(0,0,300,300);
    drawFighter(c,150,286,LOOK[look],1,1,false,look==='allmight'?7.6:8.8,{aura:({pdbz:'#ffd23a',pmha:'#7dff9a',paot:null,psl:'#8a5aff',popm:null,phxh:'#5affd8',psds:'#c8202e'})[id]});}
  for(const f of['dbz','mha','aot','sl','opm','hxh','sds']){const r=document.getElementById('r'+f);r.innerHTML='';for(const k of FAC[f].heroes){const c=document.createElement('canvas');c.width=84;c.height=84;c.title=UDEF[f][k].name;
    const x=c.getContext('2d');drawFighter(x,42,92,LOOK[UDEF[f][k].look],1,0,false,2.6,{});r.appendChild(c);}}}
const mbg=$('#mbg'),mbx=mbg.getContext('2d');
function startMenuBg(){if(mbgOn)return;mbgOn=true;requestAnimationFrame(menuBg);}
function stopMenuBg(){mbgOn=false;}
function menuBg(ts){if(!mbgOn)return;const w=mbg.clientWidth,h=mbg.clientHeight;if(mbg.width!==w)mbg.width=w;if(mbg.height!==h)mbg.height=h;const t=ts/1000,c=mbx;
  c.fillStyle='#06080d';c.fillRect(0,0,w,h);const cx=w/2,cy=h*.42;
  for(let k=0;k<64;k++){const a=k/64*PI2+t*.05,col=['#ff8a1f','#2fd27a','#4f8be0','#8a5aff','#ffc21a','#2ab8a8'][((a/PI2*6)|0)%6];c.fillStyle=col+(k%2?'14':'22');c.beginPath();c.moveTo(cx,cy);c.lineTo(cx+Math.cos(a)*w*1.2,cy+Math.sin(a)*w*1.2);c.lineTo(cx+Math.cos(a+.05)*w*1.2,cy+Math.sin(a+.05)*w*1.2);c.fill();}
  const g=c.createRadialGradient(cx,cy,0,cx,cy,Math.max(w,h)*.7);g.addColorStop(0,'rgba(6,8,13,.2)');g.addColorStop(1,'rgba(6,8,13,.95)');c.fillStyle=g;c.fillRect(0,0,w,h);
  for(let k=0;k<40;k++){const x=(k*137.5+t*30*(1+k%3))%w,y=h-((k*91.7+t*40*(1+k%4))%h);c.fillStyle=k%2?'#ffb52a88':'#7dff9a66';c.beginPath();c.arc(x,y,1+k%3,0,PI2);c.fill();}
  requestAnimationFrame(menuBg);}
document.querySelectorAll('.fac').forEach(b=>b.addEventListener('click',()=>{audioInit();menuFac=b.dataset.fac;document.querySelectorAll('.fac').forEach(x=>x.classList.toggle('on',x===b));sfx('tab');}));
document.querySelectorAll('#diff button').forEach(b=>b.addEventListener('click',()=>{audioInit();menuDiff=+b.dataset.d;document.querySelectorAll('#diff button').forEach(x=>x.classList.toggle('on',x===b));sfx('click');}));
document.querySelectorAll('#speed button').forEach(b=>b.addEventListener('click',()=>{audioInit();G.speed=+b.dataset.s;document.querySelectorAll('#speed button').forEach(x=>x.classList.toggle('on',x===b));sfx('click');}));
document.querySelectorAll('#opp button').forEach(b=>b.addEventListener('click',()=>{menuOpp=b.dataset.o;document.querySelectorAll('#opp button').forEach(x=>x.classList.toggle('on',x===b));sfx('click');}));
{const ms=$('#mapsel');if(ms&&!ms.children.length)for(const k in MAPS){const M=MAPS[k],b=document.createElement('button');b.type='button';b.dataset.m=k;b.innerHTML=M.name+'<small>'+M.cat+' · '+M.size+'×'+M.size+(M.players===4?' · 4 bases':'')+'</small>';b.title=M.desc;ms.appendChild(b);}syncMapUI();}
function syncMapUI(){document.querySelectorAll('#mapsel button').forEach(x=>{x.hidden=menuMode==='2v2'&&MAPS[x.dataset.m].players<4;});document.querySelectorAll('#mapsel button').forEach(x=>x.classList.toggle('on',x.dataset.m===menuMap));document.querySelectorAll('#modesel button').forEach(x=>x.classList.toggle('on',x.dataset.g===menuMode));
  const t=$('#mapsel');if(t)t.title=MAPS[menuMap].desc+(menuMode==='2v2'?' Ton allié et vos 2 adversaires sont contrôlés par l’IA.':'');}
document.querySelectorAll('#mapsel button').forEach(b=>b.addEventListener('click',()=>{menuMap=b.dataset.m;syncMapUI();sfx('click');}));
document.querySelectorAll('#modesel button').forEach(b=>b.addEventListener('click',()=>{menuMode=b.dataset.g;if(menuMode==='2v2'&&MAPS[menuMap].players<4)menuMap='royaumes';syncMapUI();sfx('click');}));
$('#bgo').addEventListener('click',()=>{const MS=menuSetup(menuMode);G.setup=MS.setup;G.menuOpp=MS.opp;});
$('#bgo').addEventListener('click',()=>{audioInit();sfx('rankup');$('#menu').hidden=true;G.opp=G.menuOpp;newGame(menuFac,menuDiff);});
window.addEventListener('pointerdown',()=>audioInit(),{once:true});
drawPortraits();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{for(const k in iconCache)delete iconCache[k];drawPortraits();});
startMenuBg();
