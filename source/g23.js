// ===== Epic announcer + many more anime events =====
// ---- announcer: deepest French voice available, slower delivery, an anime "title card" impact before each line ----
const ANN={voice:null,pref:'',q:[],busy:false,t:0,streak:{},first:false};
try{ANN.pref=localStorage.getItem('clash-voice')||'';}catch(_){}
function annVoices(){if(!window.speechSynthesis)return[];return speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang));}
function annPickVoice(){const L=annVoices();if(!L.length)return null;if(ANN.pref){const v=L.find(v=>v.name===ANN.pref);if(v)return v;}
  const score=v=>(/paul|henri|claude|thomas|mathieu|daniel|nicolas|antoine|gerard|guillaume|male|homme/i.test(v.name)?10:0)+(/google/i.test(v.name)?3:0)+(/natural|neural|online/i.test(v.name)?4:0)-(/amelie|amélie|audrey|julie|marie|celine|hortense|denise|female|femme|virginie/i.test(v.name)?6:0);
  return L.slice().sort((a,b)=>score(b)-score(a))[0];}
function annStinger(big){if(!AC||muted)return;const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(32,t+.7);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(big?.9:.6,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.9);o.connect(g);g.connect(sfxBus);if(revSend)g.connect(revSend);o.start(t);o.stop(t+1);
  const n=AC.createBufferSource(),f=AC.createBiquadFilter(),g2=AC.createGain();n.buffer=noiseBuf;f.type='bandpass';f.frequency.setValueAtTime(3200,t);f.frequency.exponentialRampToValueAtTime(400,t+.5);f.Q.value=.8;
  g2.gain.setValueAtTime(.35,t);g2.gain.exponentialRampToValueAtTime(.001,t+.55);n.connect(f);f.connect(g2);g2.connect(sfxBus);if(revSend)g2.connect(revSend);n.start(t);n.stop(t+.6);
  for(const fr of[523,659,784].slice(0,big?3:2)){const s=AC.createOscillator(),sg=AC.createGain();s.type='sawtooth';s.frequency.value=fr/2;sg.gain.setValueAtTime(.0001,t+.03);sg.gain.exponentialRampToValueAtTime(.05,t+.06);sg.gain.exponentialRampToValueAtTime(.001,t+.8);
    const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1800;s.connect(lp);lp.connect(sg);sg.connect(sfxBus);if(revSend)sg.connect(revSend);s.start(t+.03);s.stop(t+.85);}}
function annSpeak(text,big){if(!window.speechSynthesis)return;try{const u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=big?.8:.86;u.pitch=big?.2:.32;u.volume=Math.min(1,VOL.master*VOL.sfx*1.3);
  const v=annPickVoice();if(v)u.voice=v;u.onend=u.onerror=()=>{ANN.busy=false;setTimeout(annNext,120);};ANN.busy=true;ANN.t=performance.now();speechSynthesis.cancel();speechSynthesis.speak(u);}catch(_){ANN.busy=false;}}
function annNext(){if(ANN.busy&&performance.now()-ANN.t<6000)return;ANN.busy=false;const it=ANN.q.shift();if(!it)return;annStinger(it.big);setTimeout(()=>annSpeak(it.text,it.big),it.big?260:160);}
announce=function(t,big){if(!VOL.voice||muted||!window.speechSynthesis||!t)return;if(ANN.q.length>=2)ANN.q.splice(0,ANN.q.length-1);if(ANN.q.some(x=>x.text===t))return;ANN.q.push({text:t,big:!!big});annNext();};
if(window.speechSynthesis&&speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',()=>annVoiceUI());
function annVoiceUI(){const sel=document.getElementById('vvoicesel');if(!sel)return;const L=annVoices(),cur=(annPickVoice()||{}).name||'';sel.innerHTML='';
  if(!L.length){const o=document.createElement('option');o.textContent='Voix du navigateur';sel.appendChild(o);return;}for(const v of L){const o=document.createElement('option');o.value=v.name;o.textContent=v.name;if(v.name===cur)o.selected=true;sel.appendChild(o);}}
(function(){const row=document.getElementById('vvoice');if(!row)return;const box=row.closest('.sl');const d=document.createElement('div');d.className='sl';d.innerHTML='<label for="vvoicesel">Voix de l’annonceur</label><select id="vvoicesel" style="grid-column:2/4;background:#0b1017;color:inherit;border:1px solid var(--line);border-radius:5px;padding:6px"></select>';
  box.parentNode.insertBefore(d,box.nextSibling);const sel=d.querySelector('select');sel.onchange=()=>{ANN.pref=sel.value;try{localStorage.setItem('clash-voice',sel.value);}catch(_){}announce('Que le combat commence !',true);};annVoiceUI();})();
// hype lines: first blood, multi-kills, heroes down, victory
{const _k=kill;kill=function(t,srcSide,src){const live=!t.dead;_k(t,srcSide,src);if(!live||!t.dead||!t.isU||NET.client&&!NET.applying)return;
  if(t.side===2||srcSide==null)return;const now=gtime;
  if(!ANN.first&&isPl(srcSide)){ANN.first=true;if(ally(srcSide,PL)||ally(t.side,PL))announce('Premier sang !',true);}
  if(t.D.hero&&!t.D.extracted){if(ally(t.side,PL))announce(t.D.name+' est tombé !',true);else if(ally(srcSide,PL))announce('Héros ennemi éliminé !',true);}
  if(ally(srcSide,PL)&&isPl(t.side)){const s=ANN.streak;s.n=(now-(s.t||-99)<4)?(s.n||0)+1:1;s.t=now;const L={3:'Double K.O. !',5:'Triple K.O. !',8:'Massacre !',12:'Carnage absolu !'};if(L[s.n])announce(L[s.n],s.n>=8);}};}
{const _ng=newGame;newGame=function(...a){ANN.first=false;ANN.streak={};ANN.q=[];hzones=[];G.eclipse=0;return _ng(...a);};}
{const _eg=endGame;endGame=function(win){_eg(win);ANN.q=[];ANN.busy=false;setTimeout(()=>announce(win?'Victoire écrasante !':'Défaite… Relève-toi, guerrier.',true),300);};}
// ---- events ----
let hzones=[];
const BOSS={
  freezer:{name:'Frieza, l’empereur du mal',hp:6500,speed:90,dmg:90,range:170,rof:1,proj:'ki',pcol:'#d070ff',splash:30,fly:true,size:11,sight:11,look:'freezer',tsc:1.2,regen:15,bounty:3200},
  fsoldier:{name:'Soldat de Frieza',hp:520,speed:70,dmg:24,range:150,rof:1.2,proj:'ki',pcol:'#ff8a6a',size:8,sight:9,look:'fsoldier',tsc:1.1,bounty:250},
  celljr:{name:'Cell Jr.',hp:900,speed:110,dmg:40,range:20,rof:.55,melee:true,size:8,sight:10,look:'celljr',tsc:1,regen:6,bounty:500},
  afo:{name:'All For One',hp:7200,speed:66,dmg:105,range:190,rof:1.6,proj:'explo',pcol:'#c03a3a',splash:46,size:12,sight:12,look:'afo',tsc:1.3,regen:12,bounty:3600},
  titanarm:{name:'Titan Cuirassé',hp:7000,speed:52,dmg:120,range:30,rof:1.3,melee:true,splash:40,size:20,sight:10,look:'titan_armored',tsc:2.6,armor:true,bounty:3200},
  kamish:{name:'Kamish, le dragon',hp:9000,speed:80,dmg:130,range:180,rof:1.8,proj:'fire',pcol:'#ff5a2a',splash:60,fly:true,size:22,sight:13,look:'kamish',dragon:true,regen:15,bounty:4200},
  iceelf:{name:'Elfe des glaces',hp:600,speed:76,dmg:30,range:160,rof:1.3,proj:'ki',pcol:'#bff4ff',size:8,sight:9,look:'iceelf',tsc:1.1,bounty:300},
  baruka:{name:'Baruka, chef des elfes',hp:3600,speed:96,dmg:80,range:24,rof:.6,melee:true,splash:26,size:10,sight:11,look:'baruka',tsc:1.25,regen:10,bounty:2000},
  boros:{name:'Lord Boros',hp:8500,speed:88,dmg:120,range:26,rof:.75,melee:true,splash:44,size:12,sight:12,look:'boros',tsc:1.4,regen:30,bounty:4500},
  deepsea:{name:'Le Roi des profondeurs',hp:5200,speed:70,dmg:95,range:24,rof:1,melee:true,splash:34,size:13,sight:10,look:'deepsea',tsc:1.6,regen:14,bounty:2600},
  fishman:{name:'Homme-poisson',hp:700,speed:76,dmg:30,range:20,rof:.8,melee:true,size:9,sight:9,look:'fishman',tsc:1.15,bounty:300},
  meruem:{name:'Meruem, le Roi',hp:10000,speed:100,dmg:150,range:26,rof:.6,melee:true,splash:44,size:12,sight:13,look:'meruem',tsc:1.35,regen:30,bounty:5500,dodge:.15},
};
for(const k in BOSS){const D=Object.assign({key:k,fac:'neu',cost:BOSS[k].bounty,at:'none',req:[]},BOSS[k]);D.sightPx=D.sight*TILE;D.desc='Créature neutre : attaque tout le monde. Rapporte '+D.bounty+' à celui qui l’abat.';UDEF.neu[k]=D;}
{const _dm=damage;damage=function(t,amt,s,src){if(t.isU&&t.D.armor)amt*=.6;_dm(t,amt,s,src);};}
EVENTS.push(
  {id:'eclipse',fac:null,minT:180,name:'Éclipse totale',col:'#8a96c8',desc:'Les ténèbres tombent pendant 45 s : la vision de toutes les armées est réduite de moitié. Parfait pour une embuscade.'},
  {id:'goldrush',fac:null,name:'Ruée vers l’or',col:'#ffd23a',desc:'Les gisements se régénèrent et des coffres apparaissent sur la carte !'},
  {id:'spring',fac:null,name:'La source sacrée',col:'#7dffd8',desc:'Une source jaillit : elle soigne toutes les unités qui s’y trouvent pendant 45 s.'},
  {id:'bounty',fac:null,minT:240,name:'Contrat de chasse',col:'#ff4d5e',desc:'Une prime de 2500 est posée sur le héros le plus puissant de la partie. Abattez-le !'},
  {id:'freezer',fac:'dbz',minT:360,name:'L’armée de Frieza débarque',col:'#d070ff',desc:'Frieza et ses soldats attaquent tout le monde. Celui qui abat l’empereur empoche 3200.'},
  {id:'celljr',fac:'dbz',minT:240,name:'Les Cell Jr.',col:'#4ab8ff',desc:'Cinq Cell Jr. surgissent, rapides et voraces. Chacun rapporte 500.'},
  {id:'afo',fac:'mha',minT:420,name:'All For One se réveille',col:'#c03a3a',desc:'Le symbole du mal en personne. Celui qui l’abat empoche 3600.'},
  {id:'sports',fac:'mha',name:'Le Festival sportif de Yuei',col:'#2fd27a',desc:'Une arène apparaît : tes unités à l’intérieur gagnent de l’expérience. Le camp le plus présent remporte 2000.'},
  {id:'zeke',fac:'aot',minT:240,name:'Pluie de rochers du Titan Bestial',col:'#c8a070',desc:'Zeke bombarde la carte de rochers géants. Écartez-vous des cercles !'},
  {id:'titanarm',fac:'aot',minT:360,name:'Le Titan Cuirassé charge',col:'#f0e0b0',desc:'Un titan blindé encaisse presque tout. Celui qui l’abat empoche 3200.'},
  {id:'kamish',fac:'sl',minT:540,name:'Kamish, le dragon de rang S',col:'#ff5a2a',desc:'Le dragon légendaire survole la carte et réduit tout en cendres. Celui qui l’abat empoche 4200.'},
  {id:'redgate',fac:'sl',minT:300,name:'Une Porte rouge s’ouvre',col:'#ff4d5e',desc:'Les elfes des glaces de Baruka envahissent la carte. Baruka rapporte 2000.'},
  {id:'boros',fac:'opm',minT:480,name:'Lord Boros, le conquérant',col:'#5a7ad8',desc:'Le dominateur de l’univers débarque. Celui qui l’abat empoche 4500.'},
  {id:'deepsea',fac:'opm',minT:240,name:'Le Roi des profondeurs',col:'#3a8a6a',desc:'Une pluie torrentielle s’abat et le peuple des profondeurs attaque. Le Roi rapporte 2600.'},
  {id:'meruem',fac:'hxh',minT:600,name:'Meruem, le Roi des fourmis-chimères',col:'#5aa86a',desc:'La créature la plus puissante du monde. Celui qui l’abat empoche 5500.'},
  {id:'greed',fac:'hxh',name:'Les cartes de Greed Island',col:'#ffe9a0',desc:'Des cartes magiques tombent sur la carte : récupère-les avant l’adversaire !'});
const NEWEV=new Set(['eclipse','goldrush','spring','bounty','freezer','celljr','afo','sports','zeke','titanarm','kamish','redgate','boros','deepsea','meruem','greed']);
function rockFall(x,y){fxs.push({type:'meteor',x,y,t:0,dur:.6,rock:true});setTimeoutG(()=>{splashDmg(x,y,64,200,2,240,1,null);fxBoom(x,y,54,'#c8a070',true);scorch(x,y,50,.6);shake(8);sfx('big',x,y);for(let k=0;k<14;k++)part('debris',x,y,rr(-120,120),rr(-120,120),1,3,'#8a7a62',rr(60,160));},.55);}
{const _re=runEvent;runEvent=function(ev){if(!NEWEV.has(ev.id))return _re(ev);const C={x:(MW/2-.5)*TILE,y:(MH/2-.5)*TILE},p=randSpot(18)||C;let pos=p;
  const ring=(k,n,r)=>{for(let i=0;i<n;i++){let x=p.x+rr(-r,r),y=p.y+rr(-r,r);if(blockedW(x,y)){const q=nearestFree(tileOf(x),tileOf(y),8);if(q){x=q[0]*TILE+16;y=q[1]*TILE+16;}}mkUnit(2,k,x,y);}};
  switch(ev.id){
  case'eclipse':G.eclipse=45;break;
  case'goldrush':for(const i of oreCells)if(ore[i]>0)ore[i]=Math.min(1200,ore[i]+300);for(let i=0;i<4;i++){const q=randSpot(12);if(q){spawnPickup('gold',q);if(!i)pos=q;}}break;
  case'spring':hzones.push({x:p.x,y:p.y,r:110,t:0,dur:45});break;
  case'bounty':{let best=null;for(const e of ents)if(!e.dead&&e.isU&&isPl(e.side)&&e.D.hero&&(!best||e.max>best.max))best=e;if(!best){G.evT=20;return;}best.bountyMark=2500;pos={x:best.x,y:best.y};break;}
  case'freezer':mkUnit(2,'freezer',p.x,p.y);ring('fsoldier',4,70);part('flash',p.x,p.y-30,0,0,.6,140,'#d070ff');shake(9);break;
  case'celljr':ring('celljr',5,60);break;
  case'afo':mkUnit(2,'afo',p.x,p.y);part('flash',p.x,p.y-20,0,0,.7,160,'#c03a3a');shake(12);break;
  case'sports':zones.push({x:p.x,y:p.y,r:120,t:0,dur:50,score:{},label:'FESTIVAL SPORTIF'});break;
  case'zeke':for(let i=0;i<10;i++){const q=randSpot(14);if(!q)continue;if(!i)pos=q;setTimeoutG(()=>rockFall(q.x,q.y),1+i*.7);}break;
  case'titanarm':mkUnit(2,'titanarm',p.x,p.y);for(let k=0;k<20;k++)part('smoke',p.x+rr(-40,40),p.y-rr(0,80),rr(-30,30),-40,2,rr(12,20));shake(10);break;
  case'kamish':mkUnit(2,'kamish',p.x,p.y);shake(14);break;
  case'redgate':{const b=mkUnit(2,'baruka',p.x,p.y);ring('iceelf',5,70);gates.push({x:p.x,y:p.y-6,t:0,dur:90,boss:b.id,broke:false,red:true});break;}
  case'boros':mkUnit(2,'boros',p.x,p.y);for(let i=0;i<4;i++){const q=randSpot(14);if(q)setTimeoutG(()=>rockFall(q.x,q.y),2+i);}shake(14);break;
  case'deepsea':mkUnit(2,'deepsea',p.x,p.y);ring('fishman',5,80);G.rain=40;break;
  case'meruem':mkUnit(2,'meruem',p.x,p.y);part('flash',p.x,p.y-20,0,0,.8,200,'#5aa86a');shake(14);break;
  case'greed':for(let i=0;i<5;i++){const q=randSpot(12);if(q){spawnPickup(pick(['gold','senzu','scroll','capsule']),q);if(!i)pos=q;}}break;}
  G.alertPos={x:pos.x,y:pos.y};G.pings.push({x:pos.x,y:pos.y,t:4});banner(ev.name.toUpperCase(),ev.col);msg('Événement : '+ev.desc,ev.col);sfx('event');announce(ev.name,true);};}
{const _k=kill;kill=function(t,srcSide,src){const mark=t.bountyMark&&!t.dead;_k(t,srcSide,src);if(mark&&t.dead&&!NET.client&&srcSide!=null&&isPl(srcSide)&&foe(srcSide,t.side)){sides[srcSide].credits+=t.bountyMark;msg('Contrat rempli : '+t.D.name+' abattu, +'+t.bountyMark+' !',ally(srcSide,PL)?'#ffd23a':'#ff8a6a');}};}
{const _uf=updFusion;updFusion=function(dt){_uf(dt);if(G.eclipse>0)G.eclipse-=dt;if(G.rain>0)G.rain-=dt;
  for(const z of hzones){z.t+=dt;z.tick=(z.tick||0)-dt;if(z.tick<=0){z.tick=.5;for(const e of ents)if(!e.dead&&e.isU&&e.side!==2&&!e.D.veh&&e.hp<e.max&&hyp(e.x-z.x,e.y-z.y)<z.r){e.hp=Math.min(e.max,e.hp+e.max*.03);if(R()<.3)part('spark',e.x,e.y-18,0,-40,.6,2,'#7dffd8');}}}
  if(!NET.client)hzones=hzones.filter(z=>z.t<z.dur);};}
{const _dz=drawZones;drawZones=function(c){_dz(c);for(const z of hzones){const a=.5+.3*Math.sin(gtime*3),left=Math.ceil(z.dur-z.t);c.globalCompositeOperation='lighter';const g=c.createRadialGradient(z.x,z.y,z.r*.2,z.x,z.y,z.r);
  g.addColorStop(0,'rgba(125,255,216,.25)');g.addColorStop(1,'rgba(125,255,216,0)');c.fillStyle=g;c.beginPath();c.ellipse(z.x,z.y,z.r,z.r*.75,0,0,PI2);c.fill();c.globalCompositeOperation='source-over';
  c.strokeStyle='rgba(125,255,216,'+a+')';c.lineWidth=3;c.setLineDash([10,7]);c.beginPath();c.ellipse(z.x,z.y,z.r,z.r*.75,0,0,PI2);c.stroke();c.setLineDash([]);txt(c,'SOURCE SACRÉE · '+left+' s',z.x,z.y-z.r*.75-12,15,'#7dffd8',true);}
  for(const e of ents)if(!e.dead&&e.bountyMark&&plSees(e)){const y=e.y-(e.z||0)-58+Math.sin(gtime*5)*2;c.strokeStyle='#ff4d5e';c.lineWidth=2;c.beginPath();c.arc(e.x,y,8,0,PI2);c.moveTo(e.x-12,y);c.lineTo(e.x+12,y);c.moveTo(e.x,y-12);c.lineTo(e.x,y+12);c.stroke();txt(c,'PRIME '+e.bountyMark,e.x,y-16,11,'#ff4d5e',true);}};}
{const _dvg=drawVignette;drawVignette=function(c,sw,sh){_dvg(c,sw,sh);if(G.eclipse>0){const a=Math.min(1,G.eclipse/3,(45-G.eclipse)/2+.2);c.fillStyle='rgba(6,4,20,'+(.45*Math.max(0,Math.min(1,a)))+')';c.fillRect(0,0,sw,sh);}
  if(G.rain>0){c.strokeStyle='rgba(170,200,255,.35)';c.lineWidth=1;c.beginPath();for(let i=0;i<120;i++){const x=(i*97+gtime*900)%(sw+100)-50,y=(i*53+gtime*1400)%(sh+60)-30;c.moveTo(x,y);c.lineTo(x-6,y+18);}c.stroke();c.fillStyle='rgba(20,30,50,.18)';c.fillRect(0,0,sw,sh);}};}
