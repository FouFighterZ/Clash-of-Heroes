// ===== Animation pass: construction sequences, unit motion, per-hero flourishes, vehicle feel =====
const BUILD_T=2.2; // seconds for the construction sequence
// --- construction: logic side (stage events) ---
function updBuildAnim(b,dt){if(b.rise>=1){if(!b.popped){b.popped=true;const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;
      fxRing(b.x,b.y+H*.3,FAC[b.fac].col,Math.max(W,H)*.8);for(let k=0;k<18;k++)part('spark',x0+R()*W,y0+R()*H-bH(b)*R(),rr(-60,60),rr(-90,-20),.7,2,'#fff6c0');
      if(b.side===PL&&b.D.cost)sfx('place',b.x,b.y);}return;}
  const before=b.rise;b.rise=Math.min(1,b.rise+dt/BUILD_T);const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;
  if(b.fac==='dbz'){if(before<.28&&b.rise>=.28){for(let k=0;k<34;k++){const a=R()*PI2,s=rr(30,120);part('smoke',b.x+Math.cos(a)*8,y0+H*.6+Math.sin(a)*6,Math.cos(a)*s,Math.sin(a)*s*.6-20,rr(.8,1.4),rr(10,18));}
      part('flash',b.x,y0+H*.5,0,0,.3,W*1.4,'#ffffff');fxs.push({type:'pop',x:b.x,y:y0+H*.4-20,t:0,dur:.9});shake(3);sfx('place',b.x,b.y);}}
  else if(b.fac==='mha'){if(R()<dt*14)part('spark',x0+R()*W,y0+H-(H+bH(b))*b.rise,rr(-40,40),rr(-40,10),.4,1.5,'#6fe8ff');}
  else{if(R()<dt*8)part('dust',x0+R()*W,y0+H-R()*6,rr(-20,20),rr(-15,0),1,rr(5,9));if(R()<dt*6)part('spark',x0+rr(4,W-4),y0+H-(H+bH(b))*b.rise,rr(-30,30),rr(-50,-10),.3,1.5,'#ffd890');}}
// --- construction: drawing (called inside drawBuilding before the body, returns whether to draw the body) ---
function buildPre(c,b){const r=b.rise,x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,h=bH(b);
  if(b.fac==='dbz'){
    if(r<.28){const p=r/.28,z=(1-p*p)*160,gp=P3(cx,y0+H*.55,0);c.fillStyle='rgba(0,0,0,'+(.15+.25*p)+')';c.beginPath();c.ellipse(gp[0],gp[1],6+p*10,3+p*4,0,0,PI2);c.fill();
      const q=P3(cx,y0+H*.55,z);c.save();c.translate(q[0],q[1]);c.rotate(r*30);c.fillStyle='#f6f8fb';c.beginPath();c.roundRect(-9,-4,18,8,4);c.fill();c.strokeStyle=LINE;c.lineWidth=1;c.stroke();
      c.fillStyle='#ff8a1f';c.fillRect(-1,-4,2,8);c.fillStyle='#2a64c8';c.font='bold 4px sans-serif';c.textAlign='center';c.fillText(b.D.w>2?'3':'1',4.5,1.5);c.restore();
      c.globalCompositeOperation='lighter';drawGlow(c,q[0],q[1],12,'#ffffff',.5);c.globalCompositeOperation='source-over';return false;}
    const p=(r-.28)/.72,s=1-Math.cos(p*PI*3)*Math.exp(-p*5)*.45,sy=s,sx=2-s;c.translate(cx,y0+H);c.scale(Math.min(1.2,sx),sy);c.translate(-cx,-(y0+H));c.globalAlpha=Math.min(1,p*4);return true;}
  if(b.fac==='mha'){const g=P3(x0,y0,0);c.strokeStyle='rgba(111,232,255,.55)';c.lineWidth=.8;c.beginPath();for(let x=x0+4;x<=x0+W-4;x+=8){c.moveTo(x,y0+4);c.lineTo(x,y0+H-4);}for(let y=y0+4;y<=y0+H-4;y+=8){c.moveTo(x0+4,y);c.lineTo(x0+W-4,y);}c.stroke();
    const zt=h*Math.min(1,r*1.3);c.strokeStyle='rgba(111,232,255,.75)';c.lineWidth=1;c.beginPath();for(const[px,py]of[[x0+4,y0+4],[x0+W-4,y0+4],[x0+W-4,y0+H-4],[x0+4,y0+H-4]]){const a=P3(px,py,0),q=P3(px,py,zt);c.moveTo(a[0],a[1]);c.lineTo(q[0],q[1]);}
    const t1=P3(x0+4,y0+4,zt),t2=P3(x0+W-4,y0+4,zt),t3=P3(x0+W-4,y0+H-4,zt),t4=P3(x0+4,y0+H-4,zt);c.moveTo(t1[0],t1[1]);c.lineTo(t2[0],t2[1]);c.lineTo(t3[0],t3[1]);c.lineTo(t4[0],t4[1]);c.closePath();c.stroke();}
  const top=y0-h-30,hh=(y0+H-top)*r;c.beginPath();c.rect(x0-40,y0+H-hh,W+80,hh+6);c.clip();if(b.fac==='mha')c.globalAlpha=.55+.45*r;return true;}
function buildPost(c,b){const r=b.rise,x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,h=bH(b),a=b.anim||0;
  if(b.fac==='dbz'){if(r>.28&&r<.6){c.fillStyle='rgba(255,255,255,'+(.5*(1-(r-.28)/.32))+')';c.beginPath();c.ellipse(cx,y0+H*.55,W*.7,H*.45,0,0,PI2);c.fill();}return;}
  const ey=y0+H-(H+h+30)*r;
  if(b.fac==='mha'){c.globalCompositeOperation='lighter';const g=c.createLinearGradient(x0-10,0,x0+W+10,0);g.addColorStop(0,'rgba(111,232,255,0)');g.addColorStop(.5,'rgba(111,232,255,.9)');g.addColorStop(1,'rgba(111,232,255,0)');
    c.fillStyle=g;c.fillRect(x0-20,ey-1.5,W+40,3);for(let i=0;i<3;i++){const an=a*2.2+i*PI2/3,dx=cx+Math.cos(an)*W*.55,dy=ey-10+Math.sin(an)*8;drawGlow(c,dx,dy,6,'#6fe8ff',.9);
      c.strokeStyle='rgba(111,232,255,.6)';c.lineWidth=1;c.beginPath();c.moveTo(dx,dy);c.lineTo(dx+rr(-6,6),ey);c.stroke();}c.globalCompositeOperation='source-over';
    for(let i=0;i<3;i++){const an=a*2.2+i*PI2/3,dx=cx+Math.cos(an)*W*.55,dy=ey-10+Math.sin(an)*8;c.fillStyle='#2a3440';c.fillRect(dx-3,dy-1.5,6,3);c.fillStyle='#9aa4ae';c.fillRect(dx-5,dy-2.5,3,1);c.fillRect(dx+2,dy-2.5,3,1);}
    c.font='bold 9px Chakra Petch, sans-serif';c.textAlign='center';c.fillStyle='#6fe8ff';c.fillText(Math.floor(r*100)+'%',cx,y0-h-14);return;}
  // AoT: timber scaffold + workers
  const sh2=Math.max(10,(H+h)*(1-r)*.7+16);c.strokeStyle='#8a6a3a';c.lineWidth=2;c.beginPath();for(let x=x0+3;x<=x0+W-3;x+=(W-6)/3){c.moveTo(x,y0+H);c.lineTo(x,Math.min(ey,y0+H)-6);}
  for(let y=y0+H-4;y>ey-6;y-=11){c.moveTo(x0+3,y);c.lineTo(x0+W-3,y);}c.stroke();c.strokeStyle='#5a4020';c.lineWidth=1;c.beginPath();for(let y=y0+H-4;y>ey;y-=11){c.moveTo(x0+3,y);c.lineTo(x0+3+(W-6)/3,y-11);}c.stroke();
  for(let i=0;i<2;i++){const wx=x0+10+i*(W-20),wy=y0+H+4,sw=Math.sin(a*8+i*2);c.fillStyle='#6a4a2a';c.fillRect(wx-1.5,wy-9,3,6);c.fillStyle='#f1c7a2';c.beginPath();c.arc(wx,wy-11,2,0,PI2);c.fill();
    c.strokeStyle='#3a2a1a';c.lineWidth=1.2;c.beginPath();c.moveTo(wx+1,wy-7);c.lineTo(wx+4+sw*1.5,wy-11+sw*2);c.stroke();c.fillStyle='#55555c';c.fillRect(wx+3+sw*1.5,wy-13+sw*2,3,2);}}
// --- unit motion feel (logic side) ---
function updMotion(u,dt){if(u.recoil>0)u.recoil=Math.max(0,u.recoil-dt*5);
  if(u.fly&&u.D.veh){const da=((u.ang-(u.pang??u.ang)+PI*3)%PI2)-PI;u.bank=lerp(u.bank||0,clamp(da/Math.max(dt,.001)*.12,-.5,.5),Math.min(1,dt*6));}u.pang=u.ang;
  if(!u.moving||!plSees(u))return;const r=u.r;
  if(u.D.veh&&!u.fly){if(R()<dt*(u.D.mech?3:5))part('smoke',u.x-Math.cos(u.ang)*r,u.y-Math.sin(u.ang)*r-6,rr(-6,6),-14,1.4,rr(4,7));if(R()<dt*8)part('dust',u.x-Math.cos(u.ang)*r*.8,u.y-Math.sin(u.ang)*r*.8,rr(-10,10),rr(-8,0),.8,rr(5,9));
    if(u.D.mech){u.stomp=(u.stomp||0)+dt*5;if(u.stomp>1){u.stomp=0;for(let k=0;k<6;k++)part('dust',u.x+rr(-14,14),u.y+rr(-4,4),rr(-30,30),rr(-14,0),.8,rr(7,12));shake(1.2);}}}
  else if(u.fly&&u.D.veh){if(R()<dt*10)part('smoke',u.x-Math.cos(u.ang)*r,u.y-Math.sin(u.ang)*r-(u.z||16),0,-4,.5,rr(2,3));}
  else if(!u.fly&&!(u.z>4)){if(R()<dt*(u.D.hero?5:3))part('dust',u.x+rr(-3,3),u.y,-Math.cos(u.ang)*20,rr(-6,0),.6,rr(3,6));}
  else if(u.fly&&u.D.hero&&R()<dt*12)part('line',u.x,u.y-(u.z||16)-12,0,0,.22,1,u.ssj?'#ffe14d':'#ffffff',0,{dx:Math.cos(u.ang),dy:Math.sin(u.ang)});}
// --- per-hero flourishes (render side) ---
const BLADES=new Set(['levi','mikasa','eren','annie','jean','recruit','reiner','erwin','trunks','kenny']);
function heroFx(c,u,x,y,lift,sc){const k=u.key,t=u.anim,f=u.face,hy=y-lift,atk=u.atk>0,vis=R;
  if(BLADES.has(k)&&atk){const p=1-u.atk/.22;c.save();c.translate(x+f*8*sc,hy-16*sc);c.scale(f,1);c.globalAlpha=1-p;c.strokeStyle='#ffffff';c.lineWidth=3*(1-p)+1;c.lineCap='round';
    c.beginPath();c.arc(0,0,13*sc,-1.4+p*1.2,.4+p*1.6);c.stroke();c.strokeStyle='#bfe8ff';c.lineWidth=1;c.stroke();c.restore();}
  switch(k){
  case'deku':if(R()<(u.moving||atk?.5:.12))part('bolt',x+rr(-8,8),hy-rr(2,26),0,0,.14,1,'#7dff9a');break;
  case'bakugo':if(atk&&R()<.6){part('flash',x+f*14,hy-18,0,0,.12,14,'#ffb040');for(let i=0;i<3;i++)part('spark',x+f*14,hy-18,rr(-80,80),rr(-80,20),.25,1.5,'#ffd27a');}else if(R()<.03)part('spark',x+f*6,hy-12,rr(-30,30),-30,.3,1.2,'#ffb040');break;
  case'todoroki':if(R()<.15)part('spark',x-f*6,hy-rr(8,22),rr(-6,6),-18,.6,1.4,'#e8fbff');if(R()<.12)part('fire',x+f*6,hy-rr(10,20),0,-20,.35,rr(3,5));break;
  case'endeavor':if(R()<.35)part('fire',x+rr(-8,8),hy-rr(22,34),rr(-8,8),-30,.5,rr(4,7));break;
  case'hawks':if(R()<.02)part('leaf',x+rr(-12,12),hy-20,rr(-20,20),rr(4,12),2.5,2.5,'#d8242e');break;
  case'uraraka':if(R()<.08)part('spark',x+f*7,hy-12,0,-20,.4,1.2,'#ff9ad8');break;
  case'allmight':if(atk&&u.atk>.18)fxRing(x+f*16,hy-16,'#ffffff',10);if(u.moving&&R()<.2)part('dust',x,y,-Math.cos(u.ang)*40,0,.5,8);break;
  case'kirishima':if(atk&&R()<.5)part('spark',x+f*12,hy-16,rr(-60,60),rr(-60,20),.25,1.6,'#c8c8d0');break;
  case'beerus':if(R()<.06)part('spark',x+rr(-10,10),hy-rr(4,30),0,-14,.8,1.2,'#c890ff');break;
  case'whis':{c.globalCompositeOperation='lighter';drawGlow(c,x,hy-9*sc,6+Math.sin(t*4)*1.5,'#6fd8ff',.5);c.globalCompositeOperation='source-over';break;}
  case'broly':if(R()<.12)part('smoke',x+rr(-8,8),hy-rr(10,30),0,-14,.8,rr(3,5));if((u.buff>0||u.ssj)&&R()<.25)part('bolt',x+rr(-12,12),hy-rr(4,34),0,0,.15,1,'#9aff6a');break;
  case'jiren':if(R()<.1)part('fire',x+rr(-10,10),hy-rr(10,40),0,-20,.4,rr(4,7),'#ff3a2a');break;
  case'android':case'c17':{if(k==='android'){c.globalCompositeOperation='lighter';drawGlow(c,x+f*4*sc,hy-25*sc,3,'#ff3a3a',.8);c.globalCompositeOperation='source-over';}break;}
  case'namekw':if(atk&&u.target&&!u.target.dead){const tx=u.target.x,ty=u.target.y-(u.target.z||0)-14;c.strokeStyle=OUT;c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(x+f*6,hy-16);c.lineTo(tx,ty);c.stroke();c.strokeStyle='#63c04c';c.lineWidth=2.6;c.stroke();}break;
  case'goku':case'vegeta':case'gohan':case'trunks':case'vegito':if(atk&&!u.D.melee){c.globalCompositeOperation='lighter';drawGlow(c,x+f*12*sc,hy-16*sc,8,u.ssj?'#ffe46a':'#9fe6ff',.9);c.globalCompositeOperation='source-over';}break;
  case'sasha':if(atk){c.strokeStyle='#e8e2c8';c.lineWidth=.8;c.beginPath();c.moveTo(x+f*4,hy-20);c.lineTo(x+f*12,hy-16);c.stroke();}break;
  }}
// --- extra projectile looks ---
function drawRock(c,p,y){c.save();c.translate(p.x,y);c.rotate(p.age*6);c.fillStyle='#7a6a5a';c.beginPath();for(let i=0;i<7;i++){const a=i/7*PI2,r=7+(i%2)*2;c.lineTo(Math.cos(a)*r,Math.sin(a)*r);}c.closePath();c.fill();c.strokeStyle='#3a3028';c.lineWidth=1;c.stroke();c.restore();}
function drawPopFx(c){for(const f of fxs){if(f.type!=='pop')continue;const p=f.t/f.dur,s=1+Math.sin(Math.min(1,p*3)*PI)*.4;c.save();c.translate(f.x,f.y-p*16);c.scale(s,s);c.globalAlpha=1-Math.max(0,p-.6)/.4;
  txt(c,'POP !',0,0,22,'#ffffff',true);c.restore();}}
