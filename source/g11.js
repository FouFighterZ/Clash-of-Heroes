// ===== Random rewards, anime events and neutral creatures =====
FAC.neu={name:'Créatures',col:'#b04aff',money:'',heroes:[]};
UDEF.neu={
  saiba:{name:'Saibaman',cost:120,hp:170,speed:86,dmg:16,range:16,rof:.8,melee:true,size:7,sight:9,look:'saibaman',bounty:120,boom:true},
  nomu:{name:'Nomu',cost:2500,hp:3400,speed:66,dmg:85,range:24,rof:1.1,melee:true,splash:30,size:16,sight:10,look:'nomu',tsc:2.1,regen:18,bounty:2500},
  wtitan:{name:'Titan pur',cost:450,hp:1500,speed:38,dmg:70,range:26,rof:1.5,melee:true,splash:28,size:19,sight:8,look:'titan_wild',tsc:2.6,bounty:450},
};
for(const k in UDEF.neu){const D=UDEF.neu[k];D.key=k;D.fac='neu';D.sightPx=D.sight*TILE;D.at='none';D.req=[];D.desc=D.desc||'Créature neutre : attaque tout le monde. Rapporte '+D.bounty+' à celui qui l’abat.';}
Object.assign(LOOK,{
  saibaman:{k:'saibaman',skin:'#7cc04e',gi:'#6aae40',gi2:'#5a9a34',pants:'#6aae40',boots:'#4a8a2a',arms:'skin',hair:'none',eye:'#101010',titan:false},
  nomu:{k:'nomu',skin:'#2a2a34',gi:'#2a2a34',gi2:'#1a1a22',pants:'#22222a',boots:'#18181e',arms:'skin',hair:'none',eye:'#f4f4e0',titan:true,big:true},
  titan_wild:{k:'titan_wild',skin:'#e4b89e',gi:'#e4b89e',gi2:'#d0a088',pants:'#d8ac92',boots:'#c89a80',arms:'skin',hair:'titan_wild',hc:'#6a4a2a',eye:'#3a2a20',titan:true},
});
HAIR.titan_wild=HAIR.eren;
function neuHead(c,L,k,hx,hy){if(k==='saibaman'){c.fillStyle='#5a9a34';for(let i=-1;i<=1;i++){c.beginPath();c.ellipse(hx+i*2,hy-4.5,1.1,3.2,i*.3,0,PI2);c.fill();}
    c.fillStyle='#101010';c.beginPath();c.ellipse(hx+1.6,hy+.4,1.4,2,0,0,PI2);c.ellipse(hx+4.6,hy+.4,1.4,2,0,0,PI2);c.fill();return true;}
  if(k==='nomu'){c.beginPath();c.ellipse(hx-.5,hy-4.5,6,4.2,0,PI,PI2);c.closePath();c.fillStyle='#f08aa0';c.fill();c.strokeStyle='#8a3a4a';c.lineWidth=.6;c.stroke();
    c.beginPath();for(let i=-4;i<=3;i+=1.6){c.moveTo(hx+i,hy-5);c.quadraticCurveTo(hx+i+.8,hy-8,hx+i+1.4,hy-5);}c.stroke();return true;}
  return false;}
// ---------- pickups ----------
let pickups=[],zones=[];
const PICK={gold:{name:'Coffre de trésor',col:'#ffd23a'},senzu:{name:'Sac de Senzus',col:'#7dff9a'},scroll:{name:'Parchemin d’entraînement',col:'#6fd8ff'},
  capsule:{name:'Capsule mystère',col:'#ff8a1f'},crate:{name:'Caisse de la support-team',col:'#f2c230'}};
function randSpot(minBase){for(let k=0;k<400;k++){const x=3+((R()*(MW-6))|0),y=3+((R()*(MH-6))|0);if(!walk(x,y)||ore[ti(x,y)]>0)continue;
  if(nearBase(x,y,minBase))continue;return{x:x*TILE+16,y:y*TILE+16};}return null;}
function spawnPickup(type,pos){pos=pos||randSpot(14);if(!pos)return;pickups.push({type,x:pos.x,y:pos.y,t:0,life:type==='crate'?120:90,ph:R()*6});
  if(type!=='crate'&&expl[ti(tileOf(pos.x),tileOf(pos.y))])feedPush('Un objet rare est apparu : '+PICK[type].name,'#ffd23a');}
function takePickup(p,u){const s=sides[u.side],own=u.side===PL,n=PICK[p.type].name;let txt='';
  switch(p.type){
  case'gold':{const v=Math.round(rr(700,1400)/50)*50;s.credits+=v;txt=n+' : +'+v;break;}
  case'senzu':for(const e of ents)if(e.isU&&!e.dead&&ally(e.side,u.side)&&hyp(e.x-u.x,e.y-u.y)<240){e.hp=e.max;fxRing(e.x,e.y,'#7dff9a',20);}txt=n+' : unités proches entièrement soignées';break;
  case'scroll':for(const e of ents)if(e.isU&&!e.dead&&ally(e.side,u.side)&&!e.D.harv&&hyp(e.x-u.x,e.y-u.y)<170)promote(e);txt=n+' : unités proches promues';break;
  case'capsule':{for(const k of['inf2','inf2','tank']){const m=mkUnit(u.side,k,u.x+rr(-30,30),u.y+rr(-30,30));fxRing(m.x,m.y,FAC[m.fac].col,30);}txt=n+' : renforts gratuits !';break;}
  case'crate':{s.credits+=1500;for(let i=0;i<3;i++){const m=mkUnit(u.side,'inf2',u.x+rr(-30,30),u.y+rr(-30,30));fxRing(m.x,m.y,FAC[m.fac].col,30);}txt=n+' : +1500 et 3 soldats';break;}}
  part('flash',p.x,p.y-10,0,0,.5,70,PICK[p.type].col);fxRing(p.x,p.y,PICK[p.type].col,50);for(let k=0;k<16;k++)part('spark',p.x,p.y-10,rr(-140,140),rr(-160,40),.6,2,PICK[p.type].col);
  sfx('loot');msg(own?txt:'L’ennemi a récupéré : '+n,own?'#ffd23a':'#ff8a6a');}
function drawPickups(c){for(const p of pickups){if(!expl[ti(tileOf(p.x),tileOf(p.y))])continue;const col=PICK[p.type].col,bob=Math.sin(gtime*3+p.ph)*2,y=p.y-10+bob,blink=p.life-p.t<10&&Math.sin(gtime*12)>0;if(blink)continue;
  c.globalCompositeOperation='lighter';const g=c.createLinearGradient(0,y-160,0,y);g.addColorStop(0,col+'00');g.addColorStop(1,col+'55');c.fillStyle=g;c.fillRect(p.x-7,y-160,14,160);
  drawGlow(c,p.x,y,26,col,.6+.2*Math.sin(gtime*4));c.globalCompositeOperation='source-over';c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(p.x+2,p.y+2,9,3,0,0,PI2);c.fill();
  c.save();c.translate(p.x,y);c.strokeStyle=OUT;c.lineWidth=1;
  if(p.type==='gold'||p.type==='crate'){c.fillStyle=p.type==='gold'?'#8a4a1a':'#b88a52';c.beginPath();c.roundRect(-8,-5,16,10,2);c.fill();c.stroke();c.fillStyle=p.type==='gold'?'#ffd23a':'#6a4a2a';c.fillRect(-8,-1,16,2);c.fillRect(-1.5,-5,3,10);
    if(p.type==='crate'){c.strokeStyle='#ddd';c.beginPath();c.moveTo(-8,-5);c.lineTo(0,-20);c.lineTo(8,-5);c.stroke();c.fillStyle='#f2f2f2';c.beginPath();c.arc(0,-22,9,PI,0);c.fill();c.stroke();}}
  else if(p.type==='senzu'){c.fillStyle='#a07a4a';c.beginPath();c.moveTo(-7,6);c.quadraticCurveTo(-9,-4,-3,-6);c.lineTo(3,-6);c.quadraticCurveTo(9,-4,7,6);c.closePath();c.fill();c.stroke();c.fillStyle='#7dff9a';c.beginPath();c.arc(0,-7,2.5,0,PI2);c.fill();}
  else if(p.type==='scroll'){c.fillStyle='#f2e6c0';c.fillRect(-8,-4,16,8);c.strokeRect(-8,-4,16,8);c.fillStyle='#d8343f';c.fillRect(-9.5,-5,2.5,10);c.fillRect(7,-5,2.5,10);}
  else{c.fillStyle='#f4f4f4';c.beginPath();c.roundRect(-9,-4,18,8,4);c.fill();c.stroke();c.fillStyle='#ff8a1f';c.fillRect(-1,-4,2,8);c.fillStyle='#2a64c8';c.font='bold 5px sans-serif';c.textAlign='center';c.fillText('?',4.5,2);}
  c.restore();}}
// ---------- events ----------
const EVENTS=[
  {id:'saiba',fac:'dbz',name:'Invasion des Saibaman',col:'#7cc04e',desc:'Des Saibaman surgissent et attaquent tout le monde. Chacun rapporte 120 à son tueur.'},
  {id:'kaio',fac:'dbz',name:'Le halo de King Kai',col:'#ffd23a',desc:'Un halo sacré apparaît : tes unités à l’intérieur gagnent de l’expérience. Le camp le plus présent reçoit 2000.'},
  {id:'nomu',fac:'mha',name:'Attaque de la Ligue des Vilains',col:'#b04aff',desc:'Un Nomu surpuissant débarque. Celui qui l’abat empoche 2500.'},
  {id:'drop',fac:'mha',name:'Largage de la support-team',col:'#f2c230',desc:'Hatsume largue 3 caisses de matériel sur la carte. Premier arrivé, premier servi !'},
  {id:'breach',fac:'aot',name:'Brèche dans le Mur',col:'#e4b89e',desc:'Des titans purs envahissent la carte. Chacun rapporte 450.'},
  {id:'meteor',fac:null,name:'Pluie de cristaux',col:'#ffb52a',desc:'Des météores de Ki s’écrasent et créent de nouveaux gisements. Gare aux impacts !'},
];
function initEvents(){pickups=[];zones=[];G.evT=480+rr(0,40);G.pkT=rr(35,55);G.neuT=1;}
function runEvent(ev){const c={x:(MW/2-.5)*TILE+rr(-160,160),y:(MW/2-.5)*TILE+rr(-160,160)};let pos=c;
  switch(ev.id){
  case'saiba':{const p=randSpot(18)||c;pos=p;for(let i=0;i<5;i++)mkUnit(2,'saiba',p.x+rr(-50,50),p.y+rr(-50,50));for(let k=0;k<20;k++)part('dust',p.x+rr(-40,40),p.y+rr(-40,40),rr(-40,40),rr(-40,0),1.2,rr(8,14));break;}
  case'kaio':{const p=randSpot(16)||c;pos=p;zones.push({x:p.x,y:p.y,r:120,t:0,dur:50,score:{}});break;}
  case'nomu':{const p=randSpot(18)||c;pos=p;mkUnit(2,'nomu',p.x,p.y);part('flash',p.x,p.y-20,0,0,.6,140,'#b04aff');shake(10);break;}
  case'drop':{for(let i=0;i<3;i++){const p=randSpot(12);if(p){spawnPickup('crate',p);if(!i)pos=p;}}break;}
  case'breach':{const edge=R()<.5;const sx=edge?(R()<.5?40:WW-40):rr(400,WW-400),sy=edge?rr(400,WH-400):(R()<.5?40:WH-40);pos={x:sx,y:sy};
    for(let i=0;i<3;i++){let x=sx+rr(-80,80),y=sy+rr(-80,80);if(blockedW(x,y)){const n=nearestFree(tileOf(x),tileOf(y),8);if(n){x=n[0]*TILE+16;y=n[1]*TILE+16;}}mkUnit(2,'wtitan',x,y);}break;}
  case'tournoi':{const p=randSpot(18)||c;pos=p;mkUnit(2,'jiren',p.x,p.y);part('flash',p.x,p.y-20,0,0,.6,160,'#ff5a3a');shake(12);break;}
  case'meteor':{for(let i=0;i<7;i++){const p=randSpot(16);if(!p)continue;if(!i)pos=p;setTimeoutG(()=>meteor(p.x,p.y),1.2+i*.9);}break;}}
  G.alertPos={x:pos.x,y:pos.y};G.pings.push({x:pos.x,y:pos.y,t:4});banner(ev.name.toUpperCase(),ev.col);msg('Événement : '+ev.desc,ev.col);sfx('event');announce(ev.name);}
function meteor(x,y){fxs.push({type:'meteor',x,y,t:0,dur:.6});setTimeoutG(()=>{splashDmg(x,y,70,220,2,220,1,null);fxBoom(x,y,60,'#ffb52a',true);scorch(x,y,60,.7);shake(9);sfx('big',x,y);
  const tx=tileOf(x),ty=tileOf(y);for(let yy=ty-2;yy<=ty+2;yy++)for(let xx=tx-2;xx<=tx+2;xx++){if(xx<1||yy<1||xx>=MW-1||yy>=MH-1||hyp(xx-tx,yy-ty)>2.3)continue;const i=ti(xx,yy);
    if(blocked[i]||ore[i]>0)continue;ore[i]=Math.round(rr(350,700));oreCells.push(i);oreFx[i]=[0,1,2].map(k=>({dx:R()*20-10,dy:R()*18-9,s:.7+R()*.5,f:R()<.5?-1:1,k}));}},.55);}
function updEvents(dt){
  G.evT-=dt;if(G.evT<=0){G.evT=rr(150,210);const facs=PSIDES.map(s=>sides[s].fac);const pool=EVENTS.filter(e=>(!e.fac||facs.includes(e.fac))&&(!e.minT||gtime>=e.minT));if(pool.length)runEvent(pickEv(pool));}
  G.pkT-=dt;if(G.pkT<=0){G.pkT=rr(45,80);if(pickups.length<4)spawnPickup(pick(['gold','gold','senzu','scroll','capsule']));}
  for(const p of pickups){p.t+=dt;if(p.t>p.life){p.dead=true;continue;}for(const e of ents){if(e.dead||!e.isU||e.side===2||e.D.harv)continue;if(hyp(e.x-p.x,e.y-p.y)<24){p.dead=true;takePickup(p,e);break;}}}
  pickups=pickups.filter(p=>!p.dead);
  for(const z of zones){z.t+=dt;z.tick=(z.tick||0)-dt;if(z.tick<=0){z.tick=.5;for(const e of ents){if(e.dead||!e.isU||e.side===2||e.D.harv)continue;if(hyp(e.x-z.x,e.y-z.y)<z.r){giveXP(e,22);z.score[e.side]=(z.score[e.side]||0)+1;if(R()<.3)part('spark',e.x,e.y-20,0,-50,.6,2,'#ffd23a');}}}
    if(z.t>=z.dur){z.dead=true;let w=-1,bw=0;for(const k in z.score)if(z.score[k]>bw){bw=z.score[k];w=+k;}if(w>=0){sides[w].credits+=2000;msg(z.label?(ally(w,PL)?z.label+' remporté : +2000 !':'L’adversaire remporte le '+z.label.toLowerCase()+' (+2000)'):(w===PL?'King Kai te bénit : +2000 !':'King Kai a béni l’ennemi (+2000)'),ally(w,PL)?'#ffd23a':'#ff8a6a');}}}
  zones=zones.filter(z=>!z.dead);
  // neutral creatures hunt the nearest target
  G.neuT-=dt;if(G.neuT<=0){G.neuT=1.2;for(const u of ents){if(u.dead||u.side!==2||u.order||u.target)continue;let best=null,bd=1e9;
    for(const e of ents){if(e.dead||e.side===2)continue;const d=hyp(e.x-u.x,e.y-u.y)+(e.isB?200:0);if(d<bd){bd=d;best=e;}}if(best&&bd<1600)orderMove(u,best.x,best.y,true);else orderMove(u,(MW/2-.5)*TILE+rr(-200,200),(MW/2-.5)*TILE+rr(-200,200),true);}}}
function drawZones(c){for(const z of zones){const a=.5+.3*Math.sin(gtime*3),left=Math.ceil(z.dur-z.t);c.globalCompositeOperation='lighter';const g=c.createRadialGradient(z.x,z.y,z.r*.2,z.x,z.y,z.r);
    g.addColorStop(0,'rgba(255,220,100,.18)');g.addColorStop(1,'rgba(255,220,100,0)');c.fillStyle=g;c.beginPath();c.ellipse(z.x,z.y,z.r,z.r*.75,0,0,PI2);c.fill();
    for(let i=0;i<8;i++){const an=gtime*.6+i*PI/4;c.strokeStyle='rgba(255,230,140,'+(.25*a)+')';c.lineWidth=6;c.beginPath();c.moveTo(z.x,z.y);c.lineTo(z.x+Math.cos(an)*z.r,z.y+Math.sin(an)*z.r*.75);c.stroke();}
    c.globalCompositeOperation='source-over';c.strokeStyle='rgba(255,210,58,'+a+')';c.lineWidth=3;c.setLineDash([10,7]);c.beginPath();c.ellipse(z.x,z.y,z.r,z.r*.75,0,0,PI2);c.stroke();c.setLineDash([]);
    txt(c,(z.label||'HALO DE KAIO')+' · '+left+' s',z.x,z.y-z.r*.75-12,15,'#ffd23a',true);}
  for(const f of fxs){if(f.type!=='meteor')continue;const p=f.t/f.dur,mx=f.x-260*(1-p),my=f.y-420*(1-p);c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,180,80,.7)';c.lineWidth=10*(1-p*.3);c.lineCap='round';
    c.beginPath();c.moveTo(mx-90,my-140);c.lineTo(mx,my);c.stroke();drawGlow(c,mx,my,30,'#ffb52a',1);drawGlow(c,mx,my,12,'#ffffff',1);c.globalCompositeOperation='source-over';
    c.strokeStyle='rgba(255,90,40,.6)';c.lineWidth=2;c.beginPath();c.ellipse(f.x,f.y,70,50,0,0,PI2);c.stroke();}}
