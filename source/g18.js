// ===== Online multiplayer: lobby, host-authoritative state sync, remote commands =====
// The host simulates the whole battle; the guest runs the same simulation as a prediction and is corrected by the host's snapshots.
Object.assign(NET,{gs:1,fmt:'1v1',cid:Math.random().toString(36).slice(2,10),guests:{},on:false,host:false,client:false,applying:false,tr:null,room:null,nr:null,me:'',peer:null,lan:false,
  cmdSeq:0,cmdQ:[],cmdAck:0,lastCmd:0,evSeq:0,evQ:[],evAck:0,lastEv:0,snapN:0,snapT:0,cache:new Map(),sideC:[],globC:{},oreSent:null,oreT:0,
  prevIds:new Set(),killQ:[],goneQ:[],fullCur:0,allT:0,lastRecv:0,flushT:0,lock:new Map(),name:'',code:'',lost:false});
const NSKIP=new Set(['D','FD','hunt','jx','jy','jt','jam','trk','stomp','scanT','repT','ancT','stuck','seen','u','liftSrc','src']);
const NDEC=new Set(['cd','abCd','atk','hitFl','buff','freeze','lift','harden','rally','ui','uiCd','erased','bubble','formT','ht','puT','potT','hopeT','hope','zT','boredT','recoil','uT','hT','xT','smT']);
const NLOCK=new Set(['x','y','path','pi','order','target','moving','gx','gy','ang','face','tang']);
const NQ=v=>Math.round(v*100)/100;
function nEnc(v,d){if(v==null)return null;const t=typeof v;if(t==='number')return isFinite(v)?NQ(v):0;if(t==='string'||t==='boolean')return v;if(t==='function')return undefined;
  if(v.isU||v.isB)return{'#':v.id};if(d>3)return null;if(v instanceof Set||ArrayBuffer.isView(v))return null;
  if(Array.isArray(v)){const a=[];for(let i=0;i<Math.min(v.length,48);i++){const e=nEnc(v[i],d+1);a.push(e===undefined?null:e);}return a;}
  if(v.key&&v.hp!==undefined&&v.name)return undefined;const o={};for(const k in v){if(k==='D'||k==='u'||k==='hit')continue;const e=nEnc(v[k],d+1);if(e!==undefined)o[k]=e;}return o;}
function nDec(v,M){if(v==null||typeof v!=='object')return v;if(Array.isArray(v))return v.map(x=>nDec(x,M));if('#'in v&&Object.keys(v).length===1)return M.get(v['#'])||null;const o={};for(const k in v)o[k]=nDec(v[k],M);return o;}
// ---------- transports: claude.ai room, or a local network server ----------
function lanRoom(){const ws=new WebSocket((location.protocol==='https:'?'wss://':'ws://')+location.host+'/ws');let me='',pres={},peersL=[],pcb=[],rooms={};
  const send=o=>{if(ws.readyState===1)ws.send(JSON.stringify(o));};
  ws.onmessage=ev=>{let m;try{m=JSON.parse(ev.data);}catch(_){return;}if(m.op==='id')me=m.peer;
    else if(m.op==='peers'){peersL=m.list.map(p=>({peer:p.peer,presence:p.presence||{},isMe:p.peer===me,sameTab:p.peer===me}));for(const f of pcb)f({peers:peersL,joined:[],left:[],updated:[]});}
    else if(m.op==='msg'){const R=rooms[m.room];if(!R)return;const msg={topic:m.topic,data:m.data,peer:m.peer,isMe:m.peer===me,sameTab:m.peer===me};for(const f of(R.h[m.topic]||[]))f(msg);}};
  return new Promise(res=>{ws.onopen=()=>res({lan:true,presence:p=>{Object.assign(pres,p);for(const k in p)if(p[k]===null)delete pres[k];send({op:'pres',p:pres});return Promise.resolve();},
    peers:()=>peersL,onPeers:f=>{pcb.push(f);setTimeout(()=>f({peers:peersL,joined:[],left:[],updated:[]}),0);return()=>{pcb=pcb.filter(x=>x!==f);};},
    join:name=>{const R={h:{},name,emit:(topic,data)=>{send({op:'emit',room:name,topic,data});return Promise.resolve();},on:(topic,f)=>{(R.h[topic]=R.h[topic]||[]).push(f);return()=>{};},leave:()=>{send({op:'leave',room:name});delete rooms[name];return Promise.resolve();}};
      rooms[name]=R;send({op:'join',room:name});return Promise.resolve(R);},connected:()=>ws.readyState===1});ws.onerror=()=>res(null);setTimeout(()=>res(null),4000);});}
async function netTransport(){if(NET.room)return NET.room;let r=null;
  try{if(window.claude&&claude.use)r=await claude.use('room');}catch(_){r=null;}
  if(!r&&/^https?:$/.test(location.protocol)&&!/claude|anthropic/.test(location.host)){try{r=await lanRoom();}catch(_){r=null;}if(r)NET.lan=true;}
  NET.room=r;return r;}
const netSend=o=>{if(NET.nr)NET.nr.emit('net',o).catch(()=>{});};
// ---------- lobby UI ----------
(function(){const css=document.createElement('style');css.textContent=`
#bmp{font-family:var(--f-disp);font-size:24px;letter-spacing:1px;background:linear-gradient(180deg,#5aa8ff,#2a64c8);color:#fff;border:3px solid #000;border-radius:8px;padding:4px 30px;cursor:pointer;box-shadow:5px 5px 0 #000;transform:rotate(1deg);text-shadow:2px 2px 0 #000;margin-left:18px}
.gorow{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px}
#mp .box{width:min(640px,100%)} #mp h2{margin:0;font-family:var(--f-disp);font-weight:400;font-size:34px;letter-spacing:1px}
#mp .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap} #mp input{flex:1;min-width:160px;background:#0b1017;border:1px solid var(--line);border-radius:6px;color:var(--ink,#eef2f8);padding:9px 11px;font:inherit}
#mpstat{font-size:13px;color:var(--muted);line-height:1.5;background:#0b1017;border:1px solid var(--line);border-radius:6px;padding:10px 12px}
#mplist{display:flex;flex-direction:column;gap:6px;max-height:240px;overflow:auto} #mplist .g{display:flex;align-items:center;gap:10px;background:#0b1017;border:1px solid var(--line);border-radius:6px;padding:8px 10px}
#mplist .g b{flex:1}#mplob{background:#0b1017;border:1px solid var(--line);border-radius:6px;padding:10px 12px;font-size:13px}#mplob .tm{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:6px 0}#mplob .tm div{border:1px solid var(--line);border-radius:5px;padding:6px 8px}#mplob .tm h4{margin:0 0 4px;font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em}#mplist .mbtn{padding:7px 10px;font-size:12.5px} #mplist .empty{font-size:12px;color:var(--muted);padding:6px 2px} #mp .note{font-size:12px;color:var(--muted);line-height:1.5}
#netb{display:none;position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:5;pointer-events:none;align-items:center;gap:6px;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;background:#0b1017e6;border:1px solid var(--line)} #netb i{width:8px;height:8px;border-radius:50%;background:#4fd17a;display:inline-block}`;document.head.appendChild(css);
  const go=$('#bgo'),row=document.createElement('div');row.className='gorow';go.parentNode.insertBefore(row,go);row.appendChild(go);const b=document.createElement('button');b.type='button';b.id='bmp';b.textContent='Multijoueur';row.appendChild(b);
  const o=document.createElement('div');o.className='ovl';o.id='mp';o.hidden=true;o.innerHTML=`<div class="box"><h2>Multijoueur · 2 à 4 joueurs</h2>
   <div class="row"><input id="mpname" maxlength="18" placeholder="Ton pseudo" aria-label="Ton pseudo"><span class="note" id="mpfac"></span></div>
   <div id="mpstat">Connexion…</div>
   <div class="row"><span class="note">Format (choisi par celui qui crée) :</span><div class="seg" id="mpfmt"><button type="button" data-f="1v1" class="on">1 contre 1</button><button type="button" data-f="2v2">2 contre 2 (jusqu’à 4 joueurs)</button></div></div>
   <div id="mplob" hidden></div>
   <button type="button" class="mbtn pri" id="mpcreate">Créer une partie</button>
   <div><div class="note" style="margin-bottom:6px">Parties ouvertes :</div><div id="mplist"><div class="empty">Recherche…</div></div></div>
   <div class="note">Tes amis ouvrent ce même jeu (le même lien), choisissent leur camp, cliquent sur « Multijoueur » puis sur « Rejoindre ». En 2 contre 2, chacun choisit son équipe : les places vides sont jouées par l’ordinateur.</div>
   <button type="button" class="mbtn" id="mpclose">Retour au menu</button></div>`;document.body.appendChild(o);
  const nb=document.createElement('span');nb.id='netb';nb.innerHTML='<i></i><span></span>';document.body.appendChild(nb);
  try{$('#mpname').value=localStorage.getItem('clash-name')||'';}catch(_){}
  b.onclick=()=>{audioInit();sfx('click');openMP();};o.querySelectorAll('#mpfmt button').forEach(x=>x.onclick=()=>{NET.fmt=x.dataset.f;o.querySelectorAll('#mpfmt button').forEach(y=>y.classList.toggle('on',y===x));sfx('click');});$('#mpclose').onclick=()=>{closeMP(true);};$('#mpcreate').onclick=()=>createMP();})();
const mpName=()=>{const v=($('#mpname').value||'').trim().slice(0,18)||'Joueur';try{localStorage.setItem('clash-name',v);}catch(_){}return v;};
const mpStat=(h)=>{$('#mpstat').innerHTML=h;};
let mpPeersOff=null;
async function openMP(){$('#mp').hidden=false;$('#mpfac').textContent='Ton camp : '+FAC[menuFac].name+' ('+FAC[menuFac].anime+')';mpStat('Connexion au salon…');$('#mpcreate').disabled=true;
  const r=await netTransport();if(!r){mpStat('<b>Le multijoueur n’est pas disponible ici.</b><br>Ouvre le jeu depuis son lien claude.ai (connecté à ton compte), ou lance le pack « réseau local » sur l’un des deux PC.');$('#mplist').innerHTML='';return;}
  $('#mpcreate').disabled=false;mpStat(NET.lan?'Connecté au serveur local. Crée une partie ou rejoins celle de ton ami.':'Connecté au salon en ligne. Crée une partie ou rejoins celle de ton ami.');
  if(!mpPeersOff)mpPeersOff=r.onPeers(()=>renderMPList(),e=>{mpStat('Salon indisponible ('+e.code+'). Vérifie que le jeu t’a été partagé avec le droit d’interagir.');});renderMPList();}
function closeMP(cancel){$('#mp').hidden=true;if(cancel&&!NET.on){clearInterval(NET.lobT);clearInterval(NET.hiT);NET.guests={};NET.role=null;NET.joined=null;$('#mplob').hidden=true;}if(cancel&&NET.code&&!NET.on){NET.code='';if(NET.room)NET.room.presence({cdh:null}).catch(()=>{});if(NET.nr){NET.nr.leave().catch(()=>{});NET.nr=null;}}}
const SLOTS={'1v1':{A:[],B:[1]},'2v2':{A:[3],B:[1,4]}};
const escH=t=>String(t||'').replace(/[<>&"]/g,'').slice(0,18);
function renderMPList(){const r=NET.room;if(!r)return;const L=r.peers().filter(p=>!p.isMe&&p.presence&&p.presence.cdh&&p.presence.cdh.open);const el=$('#mplist');
  if(!L.length){el.innerHTML='<div class="empty">Aucune partie ouverte pour l’instant.</div>';return;}el.innerHTML='';
  for(const p of L){const g=p.presence.cdh;if(typeof g.code!=='string'||!/^[a-z0-9]{4,10}$/.test(g.code))continue;const d=document.createElement('div');d.className='g';const nm=document.createElement('b');nm.textContent=escH(g.name||'Joueur');
    const f=document.createElement('span');f.className='note';const two=g.fmt==='2v2',fr=g.free||{};f.textContent=(FAC[g.fac]?FAC[g.fac].name:'')+' · '+(two?'2 contre 2':'1 contre 1');d.append(nm,f);
    const mk=(label,team,dis)=>{const bt=document.createElement('button');bt.type='button';bt.className='mbtn pri';bt.textContent=label;bt.disabled=!!dis;bt.onclick=()=>joinMP(g.code,team);d.appendChild(bt);};
    if(two){mk('Avec '+escH(g.name),'A',fr.A===0);mk('Contre '+escH(g.name),'B',fr.B===0);}else mk('Rejoindre','B');el.appendChild(d);}}
function lobHTML(slots,fmt,me){const _pk='<div class="sppick"><canvas class="spmap" width="420" height="420"></canvas><div class="note">Clique sur la carte pour choisir où tu commences'+(NET.role==='host'?' (choisis d’abord un joueur ci-dessous pour placer les ordis)':'')+'.</div><div class="spchips"></div></div>';const S=SLOTS[fmt]||SLOTS['1v1'],nm=s=>slots[s]?escH(slots[s].name)+' <span class="note">('+(FAC[slots[s].fac]?FAC[slots[s].fac].name:'')+')</span>'+(slots[s].cid===me?' ← toi':''):'<span class="note">Ordinateur</span>';
  return `<div class="tm"><div><h4>Équipe 1</h4>${escH(NET.role==='host'?NET.name:(NET.hostName||'Hôte'))} <span class="note">(hôte)</span>${S.A.map(s=>'<br>'+nm(s)).join('')}</div><div><h4>Équipe 2</h4>${S.B.map(s=>nm(s)).join('<br>')}</div></div>`+_pk+(NET.role==='host'?lobOpts(fmt):'');}
function lobOpts(fmt){const D=['Facile','Normal','Difficile'],sg=(k,v)=>'<span class="seg" style="display:inline-flex">'+D.map((t,i)=>'<button type="button" data-'+k+'="'+i+'" class="'+(i===v?'on':'')+'">'+t+'</button>').join('')+'</span>';
  return '<div class="note" style="margin-top:10px;display:flex;flex-direction:column;gap:6px"><div>Ordis adverses : '+sg('ldiff',menuDiff)+'</div>'+(fmt==='2v2'?'<div>Ordi allié : '+sg('ladiff',menuADiff)+'</div>':'')+'<div>Carte : <b>'+escH(MAPS[lobMap()].name)+'</b> · argent : <b>'+menuCash+'</b>. La carte, le format et l’argent se règlent dans l’onglet Multijoueur du menu.</div></div>';}
document.addEventListener('click',ev=>{const t=ev.target.closest&&ev.target.closest('[data-ldiff],[data-ladiff]');if(!t)return;if(t.dataset.ldiff!=null){menuDiff=+t.dataset.ldiff;document.querySelectorAll('#diff button').forEach(x=>x.classList.toggle('on',+x.dataset.d===menuDiff));}else menuADiff=+t.dataset.ladiff;
  t.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===t));sfx('click');});
async function createMP(){const r=NET.room;if(!r||NET.code)return;NET.name=mpName();NET.code=Math.random().toString(36).slice(2,8).replace(/[^a-z0-9]/g,'x');NET.guests={};NET.fmtC=NET.fmt||'1v1';
  try{NET.nr=await r.join('cdh-'+NET.code);}catch(e){mpStat('Impossible de créer la partie ('+(e&&e.code||'erreur')+').');NET.code='';return;}
  NET.nr.on('net',onNet);NET.role='host';$('#mpcreate').disabled=true;lobTick();NET.lobT=setInterval(lobTick,1000);
  mpStat(NET.fmtC==='2v2'?'<b>Partie 2 contre 2 créée !</b> Tes amis cliquent sur « Avec '+escH(NET.name)+' » ou « Contre '+escH(NET.name)+' ». Lance quand tu veux : les places vides seront jouées par l’ordinateur.':'<b>Partie créée !</b> En attente de ton ami… Il doit cliquer sur « Multijoueur » puis « Rejoindre » à côté de <b>'+escH(NET.name)+'</b>. Choisissez vos positions sur la carte, puis clique sur « Lancer la partie ».');}
function hostSlots(){const o={};for(const g of Object.values(NET.guests))if(g.side!=null)o[g.side]={name:g.name,fac:g.fac,cid:g.cid};return o;}
function lobTick(){if(NET.role!=='host'||NET.on){clearInterval(NET.lobT);return;}const now=performance.now();for(const k in NET.guests)if(now-NET.guests[k].lastRecv>7000)delete NET.guests[k];
  const S=SLOTS[NET.fmtC],sl=hostSlots(),free={A:S.A.filter(x=>!sl[x]).length,B:S.B.filter(x=>!sl[x]).length};
  if(NET.room)NET.room.presence({cdh:{code:NET.code,name:NET.name,fac:menuFac,open:true,fmt:NET.fmtC,free}}).catch(()=>{});netSend({t:'lob',fmt:NET.fmtC,slots:sl,hn:NET.name,map:lobMap(),pos:lobPos(),seed:seedFor(lobMap())});
  const lb=$('#mplob');lb.hidden=false;lb.innerHTML=lobHTML(sl,NET.fmtC,'')+'<button type="button" class="mbtn pri" id="mpgo" style="width:100%;text-align:center">Lancer la partie</button>';spLobDraw();
  const go=$('#mpgo');if(go)go.onclick=()=>startHost();}
function hostHello(d,peer){if(NET.on||NET.role!=='host')return;let g=NET.guests[d.cid];const S=SLOTS[NET.fmtC];
  if(!g){const sl=hostSlots(),team=d.team==='A'&&S.A.length?'A':'B',side=S[team].find(x=>!sl[x]);if(side==null){netSend({t:'lob',fmt:NET.fmtC,slots:sl,full:d.cid});return;}
    g=NET.guests[d.cid]={cid:d.cid,side,name:escH(d.name||'Ami'),fac:d.fac,lastCmd:0,evAck:0};}
  g.peer=peer;g.fac=d.fac;g.lastRecv=performance.now();}
async function joinMP(code,team){const r=NET.room;if(!r||NET.on)return;NET.name=mpName();NET.code=code;NET.role='guest';NET.team=team||'B';if(!NET.nr||NET.joined!==code){try{NET.nr=await r.join('cdh-'+code);}catch(e){mpStat('Impossible de rejoindre ('+(e&&e.code||'erreur')+').');return;}NET.joined=code;NET.nr.on('net',onNet);}
  mpStat('Connexion à la partie…');clearInterval(NET.hiT);const hi=()=>{if(NET.on||NET.role!=='guest'){clearInterval(NET.hiT);return;}netSend({t:'hello',cid:NET.cid,team:NET.team,name:NET.name,fac:menuFac,code});};hi();NET.hiT=setInterval(hi,1200);}
// ---------- message handling ----------
function onNet(m){if(m.sameTab)return;const d=m.data;if(!d||typeof d!=='object')return;
  if(NET.role==='host'){if(d.t==='hello'&&d.code===NET.code&&FAC[d.fac]&&typeof d.cid==='string'){hostHello(d,m.peer);return;}
    if(d.t==='pos'&&!NET.on&&typeof d.cid==='string'&&NET.guests[d.cid]){const g=NET.guests[d.cid];if(g.side!=null)lobMove(g.side,d.slot|0,true);return;}
    const g=d.cid&&NET.guests[d.cid];if(!g||!NET.on||g.lost)return;g.lastRecv=performance.now();if(d.t==='c')hostCmds(d,g);else if(d.t==='bye')guestLeft(g,g.name+' a quitté la partie.');return;}
  if(NET.role==='guest'){if(d.t==='lob'&&!NET.on){NET.hostName=d.hn;if(d.full===NET.cid){mpStat('Cette équipe est complète : choisis l’autre équipe.');clearInterval(NET.hiT);return;}
      NET.lmap=MAPS[d.map]?d.map:null;NET.lseed=(d.seed|0)||null;NET.lpos=d.pos||null;NET.lslots=d.slots||{};NET.lfmt=d.fmt;$('#mplob').hidden=false;$('#mplob').innerHTML=lobHTML(d.slots||{},d.fmt,NET.cid);spLobDraw();const mine=Object.values(d.slots||{}).some(x=>x&&x.cid===NET.cid);mpStat(mine?'<b>Tu es dans la partie !</b> En attente du lancement par '+escH(d.hn)+'…':'Connexion à la partie…');return;}
    if(d.t!=='s')return;if(!NET.on){applySnap(d);if(NET.on){NET.peer=m.peer;NET.lastRecv=performance.now();clearInterval(NET.hiT);}return;}if(m.peer!==NET.peer)return;NET.lastRecv=performance.now();applySnap(d);}}
NET.isG=si=>NET.host&&Object.values(NET.guests).some(g=>g.side===si&&!g.lost);
function startHost(){if(NET.on)return;clearInterval(NET.lobT);const seed=seedFor(lobMap());NET.on=true;NET.host=true;NET.client=false;Object.assign(NET,{evQ:[],evSeq:0,cache:new Map(),sideC:[],globC:{},prevIds:new Set(),killQ:[],goneQ:[],snapT:0,oreT:0,nextSnap:null,lost:false});
  if(NET.room)NET.room.presence({cdh:{code:NET.code,name:NET.name,fac:menuFac,open:false}}).catch(()=>{});
  closeMP(false);$('#menu').hidden=true;G.auto=false;const ALLF=['dbz','mha','aot','sl','opm','hxh','sds'],rf=x=>pick(ALLF.filter(f=>f!==x)),sl=hostSlots(),fac=s=>sl[s]?sl[s].fac:null;
  for(const g of Object.values(NET.guests)){g.lastRecv=performance.now();g.lastCmd=0;g.evAck=0;}
  const MS=menuSetup(NET.fmtC);G.opp=fac(1)||MS.opp;G.setup=Object.assign(MS.setup,NET.fmtC==='2v2'?{f3:fac(3)||MS.setup.f3,f4:fac(4)||MS.setup.f4}:{},{map:lobMap(),pos:lobPos()});
  G.mirror=true;newGame(menuFac,menuDiff,seed);G.mirror=false;const gs=Object.values(NET.guests).map(g=>g.side);G.ai=G.ai.filter(a=>!gs.includes(a.si));for(const s of gs){sides[s].ai=false;sides[s].mult=1;sides[s].dmgM=1;sides[s].hpM=1;}NET.oreSent=Int16Array.from(ore);
  const asg={},names={};for(const g of Object.values(NET.guests)){asg[g.cid]=g.side;names[g.side]=g.name;}names[0]=NET.name;NET.names=names;
  NET.evt({t:'start',seed,hf:menuFac,sp:G.speed||1,hn:NET.name,asg,names,setup:Object.assign({},G.setup,{f3:sides[3]&&sides[3].fac,f4:sides[4]&&sides[4].fac}),f1:sides[1].fac,diff:menuDiff});
  netBadge();for(const g of Object.values(NET.guests))feedPush(g.name+' a rejoint la partie ('+FAC[g.fac].name+', '+(ally(g.side,0)?'ton allié':'adversaire')+').','#5aa8ff');announce(gs.length>1?'Joueurs connectés':'Adversaire connecté');}
function startGuest(e){const gs=e.asg&&e.asg[NET.cid];if(gs==null){mpStat('La partie a commencé sans toi.');return;}NET.on=true;NET.client=true;NET.host=false;closeMP(false);$('#menu').hidden=true;G.auto=false;NET.gs=gs;NET.names=e.names||{};
  G.opp=e.f1;G.setup=e.setup||{map:'vallee',mode:'1v1'};G.mirror=true;G.speed=e.sp||1;newGame(e.hf,e.diff==null?1:e.diff,e.seed);G.mirror=false;G.ai=[];
  for(const b of ents)if(b.isB)removeBuilding(b);ents=[];sel=[];nextId=1e7;PL=NET.gs;vis.fill(0);expl.fill(0);uiNewGame(sides[PL].fac);{const B=BASES[PL],C=MW/2;centerOn((B.x+Math.sign(C-B.x)*4)*TILE,(B.y+Math.sign(C-B.y)*2)*TILE);}updFog();
  NET.peerName=String(e.hn||'Hôte').slice(0,18);netBadge();$('#feed').innerHTML='';const al=PSIDES.filter(s=>s!==PL&&ally(s,PL)).map(s=>NET.names[s]||'l’ordinateur');
  feedPush('Connecté à la partie de '+NET.peerName+'. Tu joues '+FAC[sides[PL].fac].name+(al.length?' — ton allié : '+al.join(', '):'')+'.','#5aa8ff');}
function netBadge(){const b=$('#netb');if(!b)return;b.style.display='inline-flex';const n=Object.keys(NET.names||{}).length;b.querySelector('span').textContent=n>2?'En ligne · '+n+' joueurs':'En ligne · vs '+(NET.host?(Object.values(NET.guests)[0]||{}).name||'':NET.peerName);}
function guestLeft(g,txt){if(g.lost)return;g.lost=true;feedPush(txt+' L’ordinateur prend le relais de son camp.','#ff4d5e');banner('JOUEUR DÉCONNECTÉ','#ff4d5e');G.ai.push(aiInit(g.side,DIFF[1]));sides[g.side].ai=true;}
function peerLeft(txt){if(!NET.on||NET.lost)return;NET.lost=true;banner('CONNEXION PERDUE','#ff4d5e');
  feedPush('Connexion à l’hôte perdue. La partie est terminée.','#ff4d5e');NET.on=false;NET.client=false;setTimeout(()=>{if(G.state==='play')endGame(false);},2500);
  const b=$('#netb');if(b)b.querySelector('i').style.background='#ff4d5e';}
// ---------- host: snapshots ----------
NET.evt=e=>{if(!NET.host)return;NET.evQ.push([++NET.evSeq,e]);};
NET.killed=(t,s,src)=>{if(NET.host)NET.killQ.push({i:t.id,s:s==null?-1:s,r:3});};
function encEnt(e,full){let C=NET.cache.get(e.id);if(!C){C={f:{},tv:{}};NET.cache.set(e.id,C);full=true;}const out={};let n=0;
  for(const k in e){if(NSKIP.has(k))continue;let v=e[k];if(typeof v==='function')continue;
    if(typeof v==='number'&&(NDEC.has(k)||k==='anim')){const p=C.tv[k];const pred=p?(k==='anim'?p[0]+(gtime-p[1]):Math.max(0,p[0]-(gtime-p[1]))):null;if(full||pred===null||Math.abs(pred-v)>.3){out[k]=NQ(v);C.tv[k]=[v,gtime];n++;}continue;}
    if(k==='path'&&v)v=v.slice(0,48);const ev=nEnc(v,0);const s=ev===undefined?'u':JSON.stringify(ev);if(full||C.f[k]!==s){out[k]=ev===undefined?null:ev;C.f[k]=s;n++;}}
  return n?out:null;}
function encSide(s){const o={};for(const k in s){if(k==='away'||k==='ai')continue;const e=nEnc(k==='credits'?Math.floor(s[k]):s[k],0);if(e!==undefined)o[k]=e;}return o;}
function hostTick(){const now=performance.now();for(const g of Object.values(NET.guests))if(!g.lost&&now-g.lastRecv>15000)guestLeft(g,g.name+' ne répond plus.');
  const LIM=NET.lan?60000:3300,iv=NET.lan?.08:.25;if(NET.nextSnap!=null&&gtime<NET.nextSnap)return;NET.nextSnap=gtime+iv*(G.speed||1);NET.snapN++;
  const P=[],ackm={};for(const g of Object.values(NET.guests))ackm[g.cid]=g.lastCmd;P.push(['a',ackm]);if(NET.evQ.length)P.push(['ev',NET.evQ.slice(0,8)]);
  const sd={};for(let i=0;i<sides.length;i++){if(!sides[i])continue;const s=JSON.stringify(encSide(sides[i]));if(s!==NET.sideC[i]){NET.sideC[i]=s;sd[i]=JSON.parse(s);}}if(Object.keys(sd).length)P.push(['sd',sd]);
  const gl={db:dballs,pk:pickups,zn:zones,gt:gates,hz:hzones,ec:G.eclipse>0?Math.ceil(G.eclipse):0,rn:G.rain>0?Math.ceil(G.rain):0,dbr:G.dbRespawn>0?1:0,pc:PEACE.join('')},go={};for(const k in gl){const s=JSON.stringify(nEnc(gl[k],0));if(s!==NET.globC[k]){NET.globC[k]=s;go[k]=JSON.parse(s);}}if(Object.keys(go).length)P.push(['gl',go]);
  if(gtime>NET.oreT){NET.oreT=gtime+1;const od=[];for(let i=0;i<NT;i++)if(ore[i]!==NET.oreSent[i]){od.push(i,ore[i]);NET.oreSent[i]=ore[i];if(od.length>=400)break;}if(od.length)P.push(['or',od]);}
  const ids=new Set();for(const e of ents)if(!e.dead)ids.add(e.id);const kd=new Set(NET.killQ.map(k=>k.i));
  for(const id of NET.prevIds)if(!ids.has(id)){if(!kd.has(id))NET.goneQ.push({i:id,r:3});NET.cache.delete(id);}NET.prevIds=ids;
  if(NET.killQ.length){P.push(['k',NET.killQ.map(k=>[k.i,k.s])]);for(const k of NET.killQ)k.r--;NET.killQ=NET.killQ.filter(k=>k.r>0);}
  if(NET.goneQ.length){P.push(['x',NET.goneQ.map(g=>g.i)]);for(const g of NET.goneQ)g.r--;NET.goneQ=NET.goneQ.filter(g=>g.r>0);}
  if(gtime>NET.allT){NET.allT=gtime+2;P.push(['all',[...ids]]);}
  const msgs=[];const fresh=()=>({t:'s',n:NET.snapN,gt:NQ(gtime)});let cur=fresh(),size=50;
  for(const[k,v]of P){const l=JSON.stringify(v).length+k.length+4;if(size+l>LIM&&size>50){msgs.push(cur);cur=fresh();size=50;}cur[k]=v;size+=l;}
  const L=ents.filter(e=>!e.dead),nf=NET.lan?L.length:Math.max(4,Math.ceil(L.length/12));const fullSet=new Set();for(let i=0;i<nf&&L.length;i++){NET.fullCur=(NET.fullCur+1)%L.length;fullSet.add(L[NET.fullCur].id);}
  cur.e=[];
  for(const e of L){const f=fullSet.has(e.id),r=encEnt(e,f);if(!r)continue;const C=NET.cache.get(e.id),rec=[e.id,r];if(f||!C.sent){rec.push(1);C.sent=true;}
    const l=JSON.stringify(rec).length+1;if(size+l>LIM&&size>50){msgs.push(cur);cur=fresh();cur.e=[];size=50;}cur.e.push(rec);size+=l;}
  msgs.push(cur);for(const m of msgs)netSend(m);}
function hostCmds(d,g){if(typeof d.a==='number'){g.evAck=Math.max(g.evAck,d.a);const act=Object.values(NET.guests).filter(x=>!x.lost);const mn=act.length?Math.min(...act.map(x=>x.evAck)):NET.evSeq;NET.evQ=NET.evQ.filter(e=>e[0]>mn);}
  if(!Array.isArray(d.c))return;for(const it of d.c){if(!Array.isArray(it)||it[0]!==g.lastCmd+1)continue;g.lastCmd=it[0];NET.gs=g.side;try{runCmd(it[1]);}catch(err){console.warn('cmd',err);}}}
function runCmd(c){if(!c||typeof c!=='object')return;const SI=NET.gs,byId=id=>ents.find(e=>e.id===id&&!e.dead),mine=id=>{const e=byId(id);return e&&e.side===SI?e:null;},U=ids=>(Array.isArray(ids)?ids:[]).map(mine).filter(e=>e&&e.isU);
  const num=v=>typeof v==='number'&&isFinite(v)?v:0;
  switch(c.c){
  case'mv':cmdMove(U(c.u),num(c.x),num(c.y),!!c.am);break;
  case'at':{const t=byId(c.t);if(t&&foe(t.side,SI))for(const u of U(c.u))orderAttack(u,t);break;}
  case'st':for(const u of U(c.u))orderStop(u);break;
  case'hv':cmdHarvest(U(c.u),num(c.i)|0);break;
  case'hr':for(const u of U(c.u))harvRet(u);break;
  case'ab':{const u=mine(c.u);if(u&&u.isU)orderAbility(u,num(c.x),num(c.y));break;}
  case'sb':if(BDEF[c.k])startBuild(SI,c.k);break;
  case'cb':cancelBuild(SI);break;
  case'qu':if(UDEF[sides[SI].fac][c.k])queueUnit(SI,c.k);break;
  case'uq':if(UDEF[sides[SI].fac][c.k])unqueueUnit(SI,c.k);break;
  case'pb':if(BDEF[c.k])placeBuilding(SI,c.k,num(c.x)|0,num(c.y)|0);break;
  case'sell':{const b=mine(c.b);if(b&&b.isB)sellBuilding(b);break;}
  case'rep':{const b=mine(c.b);if(b&&b.isB)b.repairing=!!c.v&&b.hp<b.max;break;}
  case'ral':{const b=mine(c.b);if(b&&b.isB)b.rally={x:num(c.x),y:num(c.y)};break;}
  case'pri':{const b=mine(c.b);if(b&&b.isB&&sides[SI].q[b.key])sides[SI].primary[b.key]=b;break;}
  case'sup':launchSuper(SI,num(c.x),num(c.y));break;
  case'res':if(UPG_BY_ID[c.id]&&UPG[sides[SI].fac].includes(UPG_BY_ID[c.id]))startResearch(SI,c.id);break;
  case'fuse':{const g=mine(c.g),v=mine(c.v);if(g&&v&&fusionPair([g,v]))doFusion(g,v);break;}
  case'wish':if(NET.wishFor===SI&&WISHES[c.k]){NET.wishFor=null;grantWish(SI,c.k);}break;}}
// ---------- guest: applying snapshots ----------
function applySnap(d){if(!NET.on&&d.ev){for(const[s,e]of d.ev)if(s===NET.lastEv+1&&e.t==='start'){NET.lastEv=s;NET.peer=NET.peer||null;startGuest(e);}if(!NET.on)return;}
  if(!NET.client)return;NET.applying=true;try{
  const M=new Map();for(const e of ents)M.set(e.id,e);
  if(d.gt!=null){const dg=d.gt-gtime;if(Math.abs(dg)>1)gtime=d.gt;else gtime+=dg*.2;}
  {const ack=d.a&&typeof d.a==='object'?d.a[NET.cid]:null;if(typeof ack==='number'){NET.cmdAck=Math.max(NET.cmdAck,ack);NET.cmdQ=NET.cmdQ.filter(c=>c[0]>NET.cmdAck);}}if(false){NET.cmdQ=NET.cmdQ.filter(c=>c[0]>NET.cmdAck);}
  const before=sides.map(s=>s&&{ready:!!(s.prodB&&s.prodB.ready),ups:(s.ups||[]).length,sp:s.sp});
  if(d.e){const now=performance.now();for(const[id,f,full]of d.e){let e=M.get(id);
    if(!e){if(!full||!(f.isU||f.isB))continue;e=netCreate(id,f);if(!e)continue;M.set(id,e);}
    const lk=NET.lock.get(id),locked=lk&&lk>now;const hadCast=e.casting,hadDash=e.dash,form0=e.form;
    for(const k in f){if(locked&&NLOCK.has(k))continue;let v=nDec(f[k],M);
      if((k==='x'||k==='y')&&typeof v==='number'&&e.isU&&!full){const dd=Math.abs(v-e[k]);if(dd<40){e[k]+= (v-e[k])*.5;continue;}}
      if(k==='casting'&&!v&&hadCast&&e.isU&&!e.dead){const c=e.casting;e.casting=null;try{execAbility(e,c);}catch(_){}continue;}
      if(k==='casting'&&v&&!hadCast&&e.D&&e.D.ab){if(plSees(e))cutin(e);sfx(e.D.ab.type==='beam'?'charge':'charge-s',e.x,e.y);}
      if(k==='dash'&&!v&&hadDash&&e.isU){try{e.dash.t=e.dash.T;updDash(e,0);}catch(_){e.dash=null;}continue;}
      e[k]=v;}
    if(e.isU){if(e.form&&(!e.FD||e.form!==form0))e.FD=Object.assign({},e.D,FORMS[e.form]);if(!e.form)e.FD=null;if(e.form&&!form0&&plSees(e))fxRing(e.x,e.y,'#ffffff',90);}}}
  if(d.sd)for(const i in d.sd){const s=sides[i];if(!s)continue;const v=nDec(d.sd[i],M);delete v.fac;Object.assign(s,v);}
  if(d.gl){const g=d.gl;if(g.db)dballs=nDec(g.db,M);if(g.pk)pickups=nDec(g.pk,M);if(g.zn)zones=nDec(g.zn,M);if(g.gt)gates=nDec(g.gt,M);if(g.hz)hzones=nDec(g.hz,M);if(g.ec!=null)G.eclipse=g.ec;if(g.rn!=null)G.rain=g.rn;if(g.dbr!=null)G.dbRespawn=g.dbr?99:0;if(typeof g.pc==='string')peaceSet(g.pc.split('').map(Number));}
  if(d.or)for(let j=0;j<d.or.length;j+=2){const i=d.or[j],v=d.or[j+1];if(v>0&&!(ore[i]>0)&&!oreCells.includes(i)){oreCells.push(i);oreFx[i]=[0,1,2].map(k=>({dx:R()*20-10,dy:R()*18-9,s:.7+R()*.5,f:R()<.5?-1:1,k}));}ore[i]=v;}
  if(d.k)for(const[id,s]of d.k){const t=M.get(id);if(t&&!t.dead)kill(t,s<0?undefined:s,null);}
  if(d.x)for(const id of d.x){const t=M.get(id);if(t&&!t.dead){if(t.isB)removeBuilding(t);else t.dead=true;}}
  if(d.all){const A=new Set(d.all);for(const t of ents)if(!t.dead&&!A.has(t.id)){if(t.isB)removeBuilding(t);else t.dead=true;}}
  if(d.ev)for(const[s,e]of d.ev){if(s!==NET.lastEv+1)continue;NET.lastEv=s;try{guestEvent(e);}catch(err){console.warn(err);}}
  guestNotify(before);}finally{NET.applying=false;}}
function netCreate(id,f){let e;if(f.isB){if(!BDEF[f.key]||!sides[f.side])return null;e=mkBuilding(f.side,f.key,f.tx,f.ty,true);}
  else{const s=sides[f.side];if(!s)return null;if(!UDEF[s.fac][f.key]&&/^sh_/.test(f.key))ensureShade(f.key);if(!UDEF[s.fac][f.key])return null;e=mkUnit(f.side,f.key,f.x,f.y);
    if(e.D.extracted&&e.side===PL&&f.born!=null&&gtime-f.born<2)ariseFx(e);}
  e.id=id;return e;}
function guestEvent(e){switch(e.t){
  case'start':break;
  case'sup':{const s=sides[e.si];if(s){s.sp=SUPER[s.fac].charge;launchSuper(e.si,e.x,e.y);}break;}
  case'ev':{const ev=EVENTS.find(v=>v.id===e.id);if(!ev)break;if(e.x!=null){G.alertPos={x:e.x,y:e.y};G.pings.push({x:e.x,y:e.y,t:4});}banner(ev.name.toUpperCase(),ev.col);msg('Événement : '+ev.desc,ev.col);sfx('event');announce(ev.name);break;}
  case'shenron':{const si=e.si;G.shenron={t:0,dur:6,si};shake(8);sfx('shenron');setMusic('shenron');setTimeout(()=>{if(G.state==='play')setMusic('battle');},9000);banner('SHENRON APPARAÎT !','#7dff9a');announce('Shenron a été invoqué');
    msg(si===PL?'Shenron apparaît ! Fais un vœu.':'L’adversaire a invoqué Shenron !',si===PL?'#7dff9a':'#ff4d5e');if(si===PL){G.wishPending=true;setTimeout(()=>openWish(),1400);}break;}
  case'msg':if(e.si===PL)msg(e.text,e.col);break;}}
function guestNotify(before){const s=sides[PL],b=before[PL];if(!s||!b)return;
  if(s.prodB&&s.prodB.ready&&!b.ready&&!(performance.now()-(NET.placedT||0)<3000)){msg('Construction terminée : '+BDEF[s.prodB.key].names[s.fac]+'. Clique sa carte puis place-le.','#4fd17a');sfx('ready');announce('Construction achevée');}
  if((s.ups||[]).length>b.ups){const u=UPG_BY_ID[s.ups[s.ups.length-1]];if(u){msg('Recherche terminée : '+u.name+' ('+u.desc+')','#6fd8ff');banner(u.name.toUpperCase(),'#6fd8ff');sfx('rankup');}}
  const SP=SUPER[s.fac];if(s.sp>=SP.charge&&b.sp<SP.charge){msg(SP.name+' est prête ! Clique sur son bouton en haut de l’écran',FAC[s.fac].col);banner(SP.name.toUpperCase()+' PRÊTE !',FAC[s.fac].col);sfx('ready');announce(SP.name+' est prête');}}
// new units of the guest announce themselves
{const _mk=mkUnit;mkUnit=function(side,key,x,y){const u=_mk(side,key,x,y);if(NET.client&&NET.applying&&side===PL&&G.state==='play'&&gtime>2&&!u.D.extracted){if(u.D.hero){banner(u.D.name.toUpperCase()+' ARRIVE !',FAC[u.fac].col);msg(u.D.name+' rejoint la bataille !',FAC[u.fac].col);sfx('rankup');}else if(!u.D.harv&&R()<.5){msg(u.D.name+' prêt');sfx('ready');}}return u;};}
// ---------- guest: sending commands ----------
NET.cmd=(c,lockIds)=>{NET.cmdQ.push([++NET.cmdSeq,c]);if(lockIds){const until=performance.now()+(NET.lan?350:900);for(const id of lockIds)NET.lock.set(id,until);}NET.flushT=0;};
function guestTick(dt){const now=performance.now();if(now-NET.lastRecv>12000){peerLeft();return;}NET.flushT-=dt;
  if(NET.flushT<=0){NET.flushT=NET.cmdQ.length?.25:.5;const c=NET.cmdQ.slice(0,40);netSend({t:'c',cid:NET.cid,a:NET.lastEv,c});}}
const IDS=L=>L.filter(e=>e&&!e.dead).map(e=>e.id);
const NETW=(name,fn)=>{const orig=window[name];window[name]=function(...a){if(NET.client&&!NET.applying)return fn(orig,...a);return orig.apply(this,a);};};
NETW('cmdMove',(o,list,x,y,am)=>{const L=list.filter(u=>u.isU&&!u.dead&&u.side===PL);if(!L.length)return;NET.cmd({c:'mv',u:IDS(L),x:NQ(x),y:NQ(y),am:!!am},IDS(L));o(L,x,y,am);});
NETW('orderAttack',(o,u,t)=>{if(!u.D.dmg)return;NET.cmd({c:'at',u:[u.id],t:t.id},[u.id]);o(u,t);});
NETW('orderStop',(o,u)=>{NET.cmd({c:'st',u:[u.id]},[u.id]);o(u);});
NETW('cmdHarvest',(o,list,i)=>{const L=list.filter(u=>u.D&&u.D.harv);NET.cmd({c:'hv',u:IDS(L),i},IDS(L));o(list,i);});
NETW('orderAbility',(o,u,x,y)=>{if(!canCast(u))return false;NET.cmd({c:'ab',u:u.id,x:NQ(x),y:NQ(y)});u.abCd=Math.max(u.abCd,.6);return true;});
NETW('startBuild',(o,si,key)=>{const s=sides[si],D=BDEF[key];if(s.prodB||s.credits<D.cost||!reqOk(si,D.req)||!(has(si,'hq')||has(si,'hq2')))return false;NET.cmd({c:'sb',k:key});return true;});
NETW('cancelBuild',(o,si)=>{NET.cmd({c:'cb'});});
NETW('queueUnit',(o,si,key)=>{const s=sides[si],D=UDEF[s.fac][key];if(!has(si,D.at)||!reqOk(si,D.req)||s.credits<D.cost)return false;if(D.hero&&heroBusy(si,key))return false;NET.cmd({c:'qu',k:key});return true;});
NETW('unqueueUnit',(o,si,key)=>{NET.cmd({c:'uq',k:key});return true;});
NETW('placeBuilding',(o,si,key,tx,ty)=>{const s=sides[si];if(!s.prodB||!s.prodB.ready||s.prodB.key!==key||!canPlace(si,key,tx,ty,false))return false;NET.cmd({c:'pb',k:key,x:tx,y:ty});NET.placedT=performance.now();s.prodB.ready=false;s.prodB.sent=true;sfx('place');return true;});
NETW('sellBuilding',(o,b)=>{if(b.key==='hq')return;NET.cmd({c:'sell',b:b.id});});
NETW('launchSuper',(o,si,x,y)=>{const s=sides[si];if(s.sp<SUPER[s.fac].charge||!has(si,'temple+'))return false;NET.cmd({c:'sup',x:NQ(x),y:NQ(y)});return true;});
NETW('startResearch',(o,si,id)=>{const s=sides[si],u=UPG_BY_ID[id];if(s.res||s.ups.includes(id)||!has(si,'lab')||s.credits<u.cost)return false;NET.cmd({c:'res',id});return true;});
NETW('doFusion',(o,g,v)=>{NET.cmd({c:'fuse',g:g.id,v:v.id});});
function setRally(b,x,y){b.rally={x,y};if(NET.client)NET.cmd({c:'ral',b:b.id,x:NQ(x),y:NQ(y)});}
function setRepair(b,v){b.repairing=v;if(NET.client)NET.cmd({c:'rep',b:b.id,v:!!v});}
function harvRet(u){u.order=null;u.hs='ret';if(NET.client)NET.cmd({c:'hr',u:[u.id]},[u.id]);}
{const _ss=setSel;setSel=function(list){_ss(list);if(NET.client&&sel.length===1&&sel[0].isB&&sel[0].side===PL&&sides[PL].q[sel[0].key])NET.cmd({c:'pri',b:sel[0].id});};}
// ---------- guest: parts of the simulation that only the host runs ----------
for(const n of['updProd','updEvents','updDragonBalls','selfRepair']){const o=window[n];window[n]=function(...a){if(NET.client)return;return o.apply(this,a);};}
// ---------- wishes, pause and events across the network ----------
summonShenron=function(si){dballs=[];G.dbRespawn=150;sides[si].wishes++;G.shenron={t:0,dur:6,si};shake(8);sfx('shenron');setMusic('shenron');setTimeoutG(()=>{if(G.state==='play')setMusic('battle');},9);banner('SHENRON APPARAÎT !','#7dff9a');announce('Shenron a été invoqué');
  msg(si===PL?'Shenron apparaît ! Fais un vœu.':'L’adversaire a invoqué Shenron !',si===PL?'#7dff9a':'#ff4d5e');if(NET.host)NET.evt({t:'shenron',si});
  if(si===PL&&!G.auto){G.wishPending=true;setTimeoutG(()=>openWish(),1.4);}
  else if(NET.isG(si)){NET.wishFor=si;setTimeoutG(()=>{if(NET.wishFor===si){NET.wishFor=null;grantWish(si,'gold');}},25);}
  else setTimeoutG(()=>grantWish(si,aiWish(si)),2.2);};
{const _ow=openWish;openWish=function(){_ow();if(NET.on)G.paused=false;};}
chooseWish=function(k){$('#wish').hidden=true;G.paused=false;G.wishPending=false;if(NET.client){NET.cmd({c:'wish',k});msg('Vœu demandé : '+WISHES[k],'#7dff9a');return;}grantWish(PL,k);};
{const _gw=grantWish;grantWish=function(si,w){_gw(si,w);if(NET.isG(si))NET.evt({t:'msg',si,text:'Vœu exaucé : '+WISHES[w],col:'#7dff9a'});};}
{const _op=openPause;openPause=function(){_op();if(NET.on)G.paused=false;};}
{const _re=runEvent;runEvent=function(ev){_re(ev);if(NET.host)NET.evt({t:'ev',id:ev.id,x:G.alertPos?Math.round(G.alertPos.x):null,y:G.alertPos?Math.round(G.alertPos.y):null});};}
{const _ls=launchSuper;launchSuper=function(si,x,y){const r=_ls(si,x,y);if(r&&NET.host)NET.evt({t:'sup',si,x:Math.round(x),y:Math.round(y)});return r;};}
// leaving the game tells the other player
{const q=$('#pquit');if(q)q.addEventListener('click',()=>{if(NET.on){netSend({t:'bye',cid:NET.cid});NET.on=false;NET.host=NET.client=false;PL=0;}});}
{const ag=$('#bagain');if(ag)ag.addEventListener('click',()=>{if(NET.on||NET.client||NET.host){NET.on=false;NET.host=NET.client=false;}PL=0;const b=$('#netb');if(b)b.style.display='none';});}
// ---------- hook into the main loop ----------
{const _up=update;update=function(dt){_up(dt);if(NET.host&&NET.on)hostTick();else if(NET.client&&NET.on)guestTick(dt);};}
window.__game.net=NET;

{const _cw=checkWin;checkWin=function(){if(NET.client&&(gtime<6||!ents.some(e=>e.isB)))return;_cw();};}
