// ===== Extended systems: veterancy, special abilities, superpowers, Dragon Balls, ambience =====
let dballs=[],corpses=[],clouds=[],waterTiles=[],forestTiles=[];
const RANKN=['','Vétéran','Élite','Héroïque'];
function rankTh(u){const c=Math.max(300,u.D.cost||300);return[c*1.5,c*4,c*8];}
function giveXP(u,v){if(!u.isU||u.D.harv||u.rank>=3||u.dead)return;u.xp+=v*(u.fac==='mha'?1.5:1);const th=rankTh(u);let r=0;while(r<3&&u.xp>=th[r])r++;
  if(r>u.rank){const up=r-u.rank;u.rank=r;const nm=Math.round(u.max*Math.pow(1.15,up));u.hp+=nm-u.max;u.max=nm;u.hp=Math.min(u.max,u.hp+u.max*.3);
    fxRing(u.x,u.y,'#ffd23a',36);for(let k=0;k<10;k++)part('spark',u.x,u.y-(u.z||0)-20,rr(-60,60),rr(-90,-20),.7,2,'#ffd23a');
    if(u.side===PL&&(u.D.hero||r>=2)){msg(u.D.name+' : rang '+RANKN[r]+' !','#ffd23a');sfx('rankup');}}}
function promote(u){if(u.rank>=3)return;giveXP(u,rankTh(u)[u.rank]-u.xp+1);}

// --- special fx that move (Kienzan disc) and superpowers ---
function updSpecial(dt){for(const f of fxs){
  if(f.type==='disc'){const s=640*dt;f.x+=f.dx*s;f.y+=f.dy*s;f.d+=s;
    if(f.d>=f.len||f.x<0||f.y<0||f.x>WW||f.y>WH){f.t=f.dur;continue;}
    for(const e of ents){if(e.dead||ally(e.side,f.side)||f.hit.has(e))continue;const d=e.isB?edgeDist({x:f.x,y:f.y,r:0},e):hyp(e.x-f.x,e.y-f.y)-e.r;
      if(d<16){f.hit.add(e);damage(e,f.dmg*(e.isB?.5:1),f.side,f.src&&!f.src.dead?f.src:null);for(let k=0;k<6;k++)part('spark',f.x,f.y-f.z,rr(-150,150),rr(-150,150),.3,2,'#ffe95a');sfx('hit',f.x,f.y);}}}
  else if(f.type==='rumble'&&!f.done){const n=7;while(f.step<n&&f.t>=f.delay+f.step*.32){const k=f.step-(n-1)/2,px=f.x+f.rdx*k*95,py=f.y+f.rdy*k*95;f.step++;
      splashDmg(px,py,f.rad,f.dmg,f.side,260,.8,null);fxBoom(px,py,f.rad*.8,'#c8a080',true);scorch(px,py,f.rad*.7,.6);shake(13);sfx('big',px,py);fxs.push({type:'giant',x:px,y:py,t:0,dur:1.4,dir:f.rdx>=0?1:-1});
      for(let j=0;j<16;j++)part('dust',px,py,rr(-200,200),rr(-120,60),1.4,rr(12,22));}if(f.step>=n)f.done=true;}
  else if((f.type==='genki'||f.type==='prom')&&!f.done){
    if(f.type==='prom'&&R()<.6)part('fire',f.x+rr(-f.rad,f.rad)*.6,f.y+rr(-f.rad,f.rad)*.4,rr(-20,20),rr(-60,-20),.6,rr(8,14));
    if(f.t>=f.delay){f.done=true;splashDmg(f.x,f.y,f.rad,f.dmg,f.side,320,.8,null);fxBoom(f.x,f.y,f.rad,f.col,true);fxBoom(f.x,f.y,f.rad*.6,'#ffffff',true);
      scorch(f.x,f.y,f.rad*1.1,.75);shake(22);sfx('big',f.x,f.y);setTimeoutG(()=>sfx('boom',f.x,f.y),.25);
      for(let k=0;k<3;k++)setTimeoutG(()=>fxRing(f.x,f.y,f.col,f.rad*(1.2+k*.3)),k*.12);
      if(f.type==='prom')for(let k=0;k<40;k++)part('fire',f.x+rr(-1,1)*f.rad*.7,f.y+rr(-1,1)*f.rad*.5,rr(-40,40),rr(-140,-40),rr(.6,1.4),rr(10,20));}}}}
function launchSuper(si,x,y){const s=sides[si],SP=SUPER[s.fac];if(!s||s.sp<SP.charge||!has(si,'temple+'))return false;s.sp=0;
  const fake={D:{name:SP.who,look:SP.look,ab:{col:SP.col,shout:SP.shout}},fac:s.fac,ssj:false,v:0};
  G.cut={u:fake,text:SP.shout,col:SP.col,fc:FAC[s.fac].col,t:0,dur:1.6,ssj:false};G.slow=.5;
  let rdx=1,rdy=0;{const hq=myB(si,'hq')[0]||myB(si)[0];if(hq){const l=hyp(x-hq.x,y-hq.y)||1;rdx=(x-hq.x)/l;rdy=(y-hq.y)/l;}}
  fxs.push({type:SP.fx||(s.fac==='dbz'?'genki':s.fac==='mha'?'prom':'rumble'),rdx,rdy,step:0,x,y,t:0,dur:SP.delay+.8,delay:SP.delay,col:SP.col,rad:SP.rad,side:si,done:false,dmg:SP.dmg});
  G.pings.push({x,y,t:SP.delay+1});sfx('super');
  if(foe(si,PL)){G.alertPos={x,y};msg('ALERTE : attaque ultime ennemie ('+SP.name+') ! Éloigne tes unités du cercle','#ff4d5e');banner('ATTAQUE ULTIME ENNEMIE !','#ff4d5e');sfx('alert');announce('Alerte ! Attaque ultime ennemie');}
  return true;}
function drawSpecial(c){for(const f of fxs){
  if(f.type==='disc'){c.save();c.translate(f.x,f.y-f.z);c.globalCompositeOperation='lighter';drawGlow(c,0,0,26,'#ffe95a',.8);c.rotate(f.t*40);
    c.fillStyle='#fff8c0';c.beginPath();c.ellipse(0,0,16,5,0,0,PI2);c.fill();c.strokeStyle='#ffd23a';c.lineWidth=2;c.stroke();c.restore();
    c.fillStyle='rgba(0,0,0,.2)';c.beginPath();c.ellipse(f.x+6,f.y+4,12,3,0,0,PI2);c.fill();}
  else if(f.type==='slash'){const a=1-f.t/f.dur;c.globalCompositeOperation='lighter';c.strokeStyle=f.col;c.globalAlpha=a;c.lineWidth=6*a+1;c.lineCap='round';c.beginPath();c.moveTo(f.x1,f.y1-12);c.lineTo(f.x2,f.y2-12);c.stroke();c.strokeStyle='#fff';c.lineWidth=2;c.stroke();c.globalAlpha=1;c.globalCompositeOperation='source-over';}
  else if(f.type==='giant'){const a=f.t<.2?f.t/.2:1-(f.t-.2)/(f.dur-.2);c.save();c.globalAlpha=clamp(a,0,1)*.85;drawFighter(c,f.x,f.y+10,LOOK.titan_colossal,f.dir,f.t*3,true,4.2,{});c.restore();}
  else if(f.type==='rumble'&&!f.done){c.strokeStyle='rgba(255,160,110,'+(.4+.4*Math.sin(f.t*12))+')';c.lineWidth=4;c.setLineDash([12,8]);c.beginPath();c.moveTo(f.x-f.rdx*300,f.y-f.rdy*300);c.lineTo(f.x+f.rdx*300,f.y+f.rdy*300);c.stroke();c.setLineDash([]);}
  else if(f.type==='bolt'){const a=1-f.t/f.dur;c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,240,160,'+a+')';c.lineWidth=5;c.beginPath();let yy=f.y-420,xx=f.x;c.moveTo(xx,yy);while(yy<f.y){yy+=40;xx=f.x+rr(-18,18);c.lineTo(xx,yy);}c.stroke();c.globalCompositeOperation='source-over';}
  else if(f.type==='heal'){const t=f.t2;if(!t||t.dead)continue;const a=1-f.t/f.dur;c.globalCompositeOperation='lighter';c.strokeStyle='rgba(125,255,160,'+a*.8+')';c.lineWidth=3;
    c.beginPath();c.moveTo(f.x1,f.y1);c.quadraticCurveTo((f.x1+t.x)/2,Math.min(f.y1,t.y)-30,t.x,t.y-(t.z||0)-12);c.stroke();drawGlow(c,t.x,t.y-(t.z||0)-12,14,'#7dffa0',a);c.globalCompositeOperation='source-over';}
  else if(f.type==='genki'){const p=clamp(f.t/f.delay,0,1),r=lerp(20,f.rad*.55,Math.min(1,p*1.6)),h=p<.6?420:lerp(420,0,(p-.6)/.4);
    c.strokeStyle='rgba(143,224,255,'+(.4+.4*Math.sin(f.t*10))+')';c.lineWidth=3;c.setLineDash([10,8]);c.beginPath();c.ellipse(f.x,f.y,f.rad,f.rad*.6,0,0,PI2);c.stroke();c.setLineDash([]);
    if(!f.done){c.fillStyle='rgba(0,20,40,.25)';c.beginPath();c.ellipse(f.x,f.y,r*(1-h/600),r*.5*(1-h/600),0,0,PI2);c.fill();
      c.globalCompositeOperation='lighter';drawGlow(c,f.x,f.y-h-r*.3,r*2.2,'#8fe0ff',.9);c.globalCompositeOperation='source-over';
      const g=c.createRadialGradient(f.x-r*.3,f.y-h-r*.6,r*.1,f.x,f.y-h-r*.3,r);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#bff0ff');g.addColorStop(1,'#3aa8ff');
      c.fillStyle=g;c.beginPath();c.arc(f.x,f.y-h-r*.3,r,0,PI2);c.fill();c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;
      for(let k=0;k<4;k++){c.beginPath();c.arc(f.x,f.y-h-r*.3,r*(.4+k*.15),f.t*3+k,f.t*3+k+1.6);c.stroke();}
      if(R()<.7)part('spark',f.x+rr(-300,300),f.y-h+rr(-200,100),(f.x-(f.x+rr(-300,300)))*.5,rr(-40,40),.5,2,'#bff0ff');}}
  else if(f.type==='prom'){const p=clamp(f.t/f.delay,0,1);c.strokeStyle='rgba(255,90,40,'+(.4+.4*Math.sin(f.t*14))+')';c.lineWidth=3;c.setLineDash([10,8]);
    c.beginPath();c.ellipse(f.x,f.y,f.rad,f.rad*.6,0,0,PI2);c.stroke();c.setLineDash([]);
    if(f.done||p>.85){const a=f.done?clamp(1-(f.t-f.delay)/.8,0,1):(p-.85)/.15;c.globalCompositeOperation='lighter';
      const g=c.createLinearGradient(0,f.y-500,0,f.y);g.addColorStop(0,'rgba(255,120,40,0)');g.addColorStop(.6,'rgba(255,140,50,'+a*.8+')');g.addColorStop(1,'rgba(255,240,180,'+a+')');
      c.fillStyle=g;c.beginPath();c.ellipse(f.x,f.y-220,f.rad*.55,260,0,0,PI2);c.fill();drawGlow(c,f.x,f.y,f.rad*1.6,'#ff7a2a',a);c.globalCompositeOperation='source-over';}}}
  c.globalCompositeOperation='source-over';}

// --- Dragon Balls ---
function placeDragonBalls(){dballs=[];let tries=0;
  while(dballs.length<7&&tries<6000){tries++;const x=2+((R()*(MW-4))|0),y=2+((R()*(MH-4))|0);if(!walk(x,y)||ore[ti(x,y)]>0)continue;
    if(nearBase(x,y,22))continue;if(dballs.some(b=>hyp(b.tx-x,b.ty-y)<10))continue;
    dballs.push({tx:x,ty:y,x:x*TILE+16,y:y*TILE+16,n:dballs.length+1,carrier:null,ph:R()*6,cool:0});}}
const dbCount=si=>dballs.filter(b=>b.carrier&&!b.carrier.dead&&b.carrier.side===si).length;
function dropBalls(u){for(const b of dballs){if(b.carrier!==u)continue;b.carrier=null;let x=u.x+rr(-24,24),y=u.y+rr(-24,24);
  if(blockedW(x,y)){const n=nearestFree(tileOf(x),tileOf(y),8);if(n){x=n[0]*TILE+16;y=n[1]*TILE+16;}}b.x=x;b.y=y;b.cool=1;
  if(u.side===PL)msg('Ton porteur est tombé : Dragon Ball perdue !','#ffb52a');}}
function updDragonBalls(dt){
  if(G.dbRespawn>0){G.dbRespawn-=dt;if(G.dbRespawn<=0){placeDragonBalls();msg('Les Dragon Balls se sont de nouveau dispersées !','#ffb52a');}return;}
  G.dbT-=dt;if(G.dbT>0)return;G.dbT=.2;
  for(const b of dballs){if(b.carrier){if(!b.carrier.dead){b.x=b.carrier.x;b.y=b.carrier.y;}continue;}if(b.cool>0){b.cool-=.2;continue;}
    for(const e of ents){if(e.dead||!e.isU||e.D.harv||e.side===2)continue;if(hyp(e.x-b.x,e.y-b.y)<24){b.carrier=e;const n=dbCount(e.side);
      part('flash',b.x,b.y-8,0,0,.4,44,'#ffb52a');fxRing(b.x,b.y,'#ffb52a',30);sfx('dball');
      if(e.side===PL)msg('Dragon Ball à '+b.n+(b.n>1?' étoiles':' étoile')+' récupérée ! ('+n+'/7)','#ffb52a');else if(n>=4)msg('Attention : l’ennemi possède '+n+' Dragon Balls sur 7 !','#ff8a6a');
      if(n>=7)summonShenron(e.side);break;}}}}
function summonShenron(si){dballs=[];G.dbRespawn=150;sides[si].wishes++;G.shenron={t:0,dur:6,si};shake(8);sfx('shenron');setMusic('shenron');setTimeoutG(()=>{if(G.state==='play')setMusic('battle');},9);banner('SHENRON APPARAÎT !','#7dff9a');announce('Shenron a été invoqué');
  msg(si===PL?'Shenron apparaît ! Fais un vœu.':'L’ennemi a invoqué Shenron !',si===PL?'#7dff9a':'#ff4d5e');
  if(si===PL&&!G.auto){G.wishPending=true;setTimeoutG(()=>openWish(),1.4);}else setTimeoutG(()=>grantWish(si,aiWish(si)),2.2);}
function aiWish(si){const missing=FAC[sides[si].fac].heroes.filter(k=>!heroBusy(si,k)).length;return missing>=3?'revive':sides[si].credits<2000?'gold':'power';}
const WISHES={gold:'Richesse : +5000',revive:"2 héros rejoignent la bataille",power:'Puissance divine : soins complets et +1 rang'};
function grantWish(si,w){const s=sides[si];
  if(w==='gold')s.credits+=5000;
  else if(w==='revive'){const home=myB(si,'temple')[0]||myB(si,'hq')[0]||myB(si)[0];if(home)for(const k of FAC[s.fac].heroes.filter(k=>!heroBusy(si,k)).slice(0,2)){const u=spawnFrom(home,k);fxRing(u.x,u.y,'#7dff9a',50);}}
  else for(const e of ents)if(e.isU&&!e.dead&&e.side===si){e.hp=e.max;promote(e);}
  msg((si===PL?'Vœu exaucé : ':'Vœu ennemi : ')+WISHES[w],si===PL?'#7dff9a':'#ff8a6a');sfx('ready');}
function drawDragonBalls(c){for(const b of dballs){if(b.carrier)continue;if(!expl[ti(tileOf(b.x),tileOf(b.y))])continue;
  const bob=Math.sin(gtime*2.5+b.ph)*2,y=b.y-8+bob;
  c.globalCompositeOperation='lighter';const g=c.createLinearGradient(0,y-140,0,y);g.addColorStop(0,'rgba(255,180,60,0)');g.addColorStop(1,'rgba(255,180,60,.28)');
  c.fillStyle=g;c.fillRect(b.x-6,y-140,12,140);drawGlow(c,b.x,y,22,'#ffb52a',.7);c.globalCompositeOperation='source-over';
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(b.x+2,b.y+2,6,2.5,0,0,PI2);c.fill();dragonBall(c,b.x,y,6.5,b.n);}}
function dragonBall(c,x,y,r,n){const g=c.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r);g.addColorStop(0,'#fff6c0');g.addColorStop(.35,'#ffb52a');g.addColorStop(1,'#d06a0a');
  c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,PI2);c.fill();c.strokeStyle='#7a3a0a';c.lineWidth=.8;c.stroke();c.fillStyle='#e01a1a';
  const pos=[[0,0],[-.35,-.3],[.35,.3],[.35,-.3],[-.35,.3],[0,-.45],[0,.45]];for(let k=0;k<n;k++){const[px,py]=pos[k];star(c,x+px*r,y+py*r,r*(n>4?.14:.2));}}
function star(c,x,y,s){c.beginPath();for(let k=0;k<10;k++){const a=-PI/2+k*PI/5,rr2=k%2?s*.45:s;c.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2);}c.closePath();c.fill();}
function drawCarried(c,u,x,y){const n=dballs.filter(b=>b.carrier===u).length;if(!n)return;const lift=(u.z||0)+(u.fly?Math.sin(u.anim*3)*2:0);
  for(let k=0;k<n;k++){const a=gtime*3+k*PI2/n;dragonBall(c,x+Math.cos(a)*14,y-lift-16+Math.sin(a)*5,3.2,1);}}

// --- Shenron cinematic & wish modal ---
function drawShenron(c,sw,sh){const S=G.shenron,p=S.t/S.dur,a=p<.15?p/.15:p>.85?(1-p)/.15:1;
  c.fillStyle='rgba(4,18,10,'+(.55*a)+')';c.fillRect(0,0,sw,sh);
  if(Math.sin(S.t*23)>.93){c.fillStyle='rgba(220,255,230,'+(.25*a)+')';c.fillRect(0,0,sw,sh);}
  c.save();c.globalAlpha=a;const cx=sw*.5,cy=sh*.5,sc=Math.min(sw,sh)/700;
  const pts=[];for(let k=0;k<=60;k++){const t=k/60;pts.push([cx+Math.sin(t*9+S.t*1.5)*sw*.32*(1-t*.4)+ (t-.5)*sw*.2,sh*1.05-t*sh*.85+Math.cos(t*7+S.t)*40*sc]);}
  for(let k=pts.length-1;k>=1;k--){const[x,y]=pts[k],w=(18+k*.45)*sc;c.fillStyle=k%2?'#2f9a3a':'#3fb84a';c.strokeStyle='#123a16';c.lineWidth=2*sc;
    c.beginPath();c.arc(x,y,w,0,PI2);c.fill();c.stroke();c.fillStyle='#d8e070';c.beginPath();c.arc(x+w*.25,y+w*.35,w*.45,0,PI);c.fill();}
  const[hx,hy]=pts[pts.length-1];c.translate(hx,hy);c.scale(sc,sc);
  c.fillStyle='#3fb84a';c.strokeStyle='#123a16';c.lineWidth=3;c.beginPath();c.ellipse(0,0,64,38,0,0,PI2);c.fill();c.stroke();
  c.beginPath();c.ellipse(40,14,46,22,.15,0,PI2);c.fill();c.stroke();
  c.strokeStyle='#e8d8a0';c.lineWidth=6;c.beginPath();c.moveTo(-30,-26);c.quadraticCurveTo(-60,-90,-20,-120);c.moveTo(10,-30);c.quadraticCurveTo(0,-100,40,-125);c.stroke();
  c.strokeStyle='#123a16';c.lineWidth=2;c.beginPath();c.moveTo(70,20);c.quadraticCurveTo(140,40,170,-10+Math.sin(S.t*4)*10);c.moveTo(70,28);c.quadraticCurveTo(130,70,160,60+Math.sin(S.t*3)*10);c.stroke();
  c.fillStyle='#ff2a2a';c.globalCompositeOperation='lighter';c.beginPath();c.ellipse(18,-8,12,6,-.2,0,PI2);c.fill();drawGlow(c,18,-8,30,'#ff2a2a',.8);c.globalCompositeOperation='source-over';
  c.fillStyle='#fff';c.beginPath();c.moveTo(60,30);c.lineTo(66,44);c.lineTo(72,30);c.fill();c.restore();
  c.save();c.globalAlpha=a;c.font=`${Math.round(Math.min(48,sw/22))}px Bangers, Impact, sans-serif`;c.textAlign='center';c.lineWidth=7;c.strokeStyle='#05140a';
  const t1=S.si===PL?'« Je vais exaucer ton vœu. Parle ! »':'Shenron exauce le vœu de l’ennemi…';c.strokeText(t1,sw/2,sh*.2);c.fillStyle='#bfffcf';c.fillText(t1,sw/2,sh*.2);c.restore();}
function openWish(){const w=document.getElementById('wish');if(!w)return;w.hidden=false;G.paused=true;}
function chooseWish(k){document.getElementById('wish').hidden=true;G.paused=false;G.wishPending=false;grantWish(PL,k);}

// --- Ambience: clouds, water glints, leaves, vignette ---
let cloudImg=null,vignette=null,vigW=0,vigH=0;
function initAmbience(){clouds=[];for(let k=0;k<9;k++)clouds.push({x:R()*WW,y:R()*WH,r:rr(180,360),s:rr(.5,.9),vx:rr(10,18),vy:rr(3,7)});
  waterTiles=[];forestTiles=[];for(let i=0;i<NT;i++){if(ter[i]===T_WATER)waterTiles.push(i);else if(ter[i]===T_FOREST)forestTiles.push(i);}
  if(!cloudImg){cloudImg=document.createElement('canvas');cloudImg.width=cloudImg.height=256;const x=cloudImg.getContext('2d');
    for(let k=0;k<7;k++){const cx=128+rr(-50,50),cy=128+rr(-30,30),r=rr(50,80),g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,256,256);}}}
function updAmbience(dt){for(const c of clouds){c.x+=c.vx*dt;c.y+=c.vy*dt;if(c.x-c.r>WW)c.x=-c.r;if(c.y-c.r>WH)c.y=-c.r;}
  for(const c of corpses)c.t+=dt;corpses=corpses.filter(c=>c.t<14);
  const vw=cam.vw(),vh=cam.vh();
  if(forestTiles.length&&R()<dt*14){for(let k=0;k<4;k++){const i=forestTiles[(R()*forestTiles.length)|0],x=(i%MW+.5)*TILE,y=((i/MW)|0)*TILE;
    if(x>cam.x&&x<cam.x+vw&&y>cam.y&&y<cam.y+vh&&vis[i]){part('leaf',x+rr(-12,12),y-rr(4,16),rr(8,24),rr(6,14),rr(2.5,4),rr(2,3),pick(['#6fa83c','#9ccc52','#c8b040']));break;}}}}
function drawClouds(c){c.globalAlpha=.5;for(const k of clouds){const w=k.r*2,h=k.r*1.3;c.drawImage(cloudImg,k.x-w/2,k.y-h/2,w,h);}c.globalAlpha=1;}
function drawWater(c,x0,y0,x1,y1){c.strokeStyle='rgba(235,250,255,.55)';c.lineWidth=1.2;c.beginPath();
  for(const i of waterTiles){const tx=i%MW,ty=(i/MW)|0;if(tx<x0||tx>x1||ty<y0||ty>y1)continue;const ph=(i*.618)%1,s=Math.sin(gtime*1.6+ph*PI2);if(s<.55)continue;
    const x=tx*TILE+8+ph*16,y=ty*TILE+8+((i*.37)%1)*16,l=4+s*5;c.moveTo(x-l,y);c.quadraticCurveTo(x,y-1.5,x+l,y);}c.stroke();}
function drawCorpses(c){for(const k of corpses){const a=k.t>10?1-(k.t-10)/4:1;c.save();c.globalAlpha=a*.9;c.translate(k.x,k.y);
    c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(0,0,14*k.sc,4,0,0,PI2);c.fill();c.rotate(k.dir>0?-PI/2:PI/2);
    drawFighter(c,0,-4*k.dir,k.L,k.dir,0,false,k.sc*.9,{});c.restore();
    if(k.t<3){c.fillStyle='#ffd23a';for(let j=0;j<3;j++){const an=gtime*4+j*PI2/3;star(c,k.x+k.dir*-14+Math.cos(an)*7,k.y-8+Math.sin(an)*3,2.6);}}}c.globalAlpha=1;}
function drawVignette(c,sw,sh){const sun=c.createLinearGradient(0,0,sw,sh);sun.addColorStop(0,'rgba(255,236,190,.09)');sun.addColorStop(.5,'rgba(255,236,190,0)');sun.addColorStop(1,'rgba(10,20,40,.12)');c.fillStyle=sun;c.fillRect(0,0,sw,sh);if(!vignette||vigW!==sw||vigH!==sh){vigW=sw;vigH=sh;vignette=c.createRadialGradient(sw/2,sh/2,Math.min(sw,sh)*.45,sw/2,sh/2,Math.max(sw,sh)*.75);
  vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(0,0,0,.42)');}c.fillStyle=vignette;c.fillRect(0,0,sw,sh);}
function chevrons(c,x,y,n){c.fillStyle='#ffd23a';c.strokeStyle='#3a2a00';c.lineWidth=.8;for(let k=0;k<n;k++){const yy=y-k*3.2;c.beginPath();c.moveTo(x-4,yy);c.lineTo(x,yy-2.6);c.lineTo(x+4,yy);c.lineTo(x+4,yy+1.6);c.lineTo(x,yy-1);c.lineTo(x-4,yy+1.6);c.closePath();c.fill();c.stroke();}}
function track(x,y,ang){if(!scorchCtx)return;const c=scorchCtx;c.save();c.translate(x,y);c.rotate(ang);c.fillStyle='rgba(50,36,22,.09)';c.fillRect(-2,-11,4,4);c.fillRect(-2,7,4,4);c.restore();}
function wreck(x,y,ang,r){if(!scorchCtx)return;const c=scorchCtx;scorch(x,y,r*1.6,.5);c.save();c.translate(x,y);c.rotate(ang);
  c.fillStyle='#2a2622';c.beginPath();c.roundRect(-r,-r*.65,r*2,r*1.3,4);c.fill();c.fillStyle='#3a3530';c.fillRect(-r,-r*.65-2,r*2,4);c.fillRect(-r,r*.65-2,r*2,4);
  c.fillStyle='#1a1816';c.beginPath();c.arc(0,0,r*.45,0,PI2);c.fill();c.strokeStyle='#4a2a1a';c.lineWidth=1;c.beginPath();c.moveTo(-r*.6,-r*.3);c.lineTo(r*.3,r*.4);c.stroke();c.restore();}
