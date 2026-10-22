// ===== 3D building renderer: oblique projection, lit faces, volumetric primitives =====
// World point (x, y on the ground, z height) -> screen. Heights lean slightly left so the south and east faces are visible.
const KX=-.26;
const P3=(x,y,z)=>[x+KX*z,y-z];
const LINE='rgba(18,14,24,.85)';
function poly3(c,pts,fill,stroke,lw){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();if(fill){c.fillStyle=fill;c.fill();}
  if(stroke!==false){c.strokeStyle=stroke||LINE;c.lineWidth=lw||.9;c.stroke();}}
const sh=(col,f)=>shade(hex7(col),f);
function box3(c,X,Y,W,D,z0,h,col,o){o=o||{};const z1=z0+h;
  poly3(c,[P3(X+W,Y+D,z0),P3(X+W,Y,z0),P3(X+W,Y,z1),P3(X+W,Y+D,z1)],o.side||sh(col,-.36));
  const f=P3(X,Y+D,z0),g=c.createLinearGradient(0,f[1],0,f[1]-h);g.addColorStop(0,sh(o.front||col,-.25));g.addColorStop(Math.min(.9,8/Math.max(h,1)),sh(o.front||col,-.05));g.addColorStop(1,o.front||col);
  poly3(c,[P3(X,Y+D,z0),P3(X+W,Y+D,z0),P3(X+W,Y+D,z1),P3(X,Y+D,z1)],g);
  if(!o.noTop){poly3(c,[P3(X,Y,z1),P3(X+W,Y,z1),P3(X+W,Y+D,z1),P3(X,Y+D,z1)],o.top||sh(col,.16));
    c.strokeStyle='rgba(255,255,255,.45)';c.lineWidth=.8;c.beginPath();const a=P3(X,Y+D,z1),b=P3(X+W,Y+D,z1),d=P3(X+W,Y,z1);c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(d[0],d[1]);c.stroke();}}
// draw on a face in local coords: u to the right (front) or toward the back (side), v up = negative y
function onFront(c,X,Y,D,z0,fn){const o=P3(X,Y+D,z0);c.save();c.transform(1,0,-KX,1,o[0],o[1]);fn(c);c.restore();}
function onSide(c,X,Y,W,D,z0,fn){const o=P3(X+W,Y+D,z0);c.save();c.transform(0,-1,-KX,1,o[0],o[1]);fn(c);c.restore();}
function glass(c,x,y,w,h,col,lit,dark){const g=c.createLinearGradient(x,y,x+w*.6,y+h);
  if(lit){g.addColorStop(0,'#fff6cc');g.addColorStop(1,'#ffb347');}else{g.addColorStop(0,sh(col,dark?-.1:.45));g.addColorStop(.55,sh(col,dark?-.3:0));g.addColorStop(1,sh(col,dark?-.5:-.25));}
  c.fillStyle=g;c.fillRect(x,y,w,h);c.strokeStyle='rgba(10,10,20,.55)';c.lineWidth=.55;c.strokeRect(x,y,w,h);
  if(!dark){c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.moveTo(x+1,y+h-1);c.lineTo(x+1,y+1);c.lineTo(x+Math.min(w*.5,4),y+1);c.closePath();c.fill();}}
function winGrid(c,u0,v0,w,h,cols,rows,col,lit,dark){const cw=w/cols,rh=h/rows;for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)glass(c,u0+i*cw+.8,-(v0+(j+1)*rh)+.8,cw-1.6,rh-1.6,col,lit&&lit(i,j),dark);}
function cyl3(c,cx,cy,r,z0,h,col,o){o=o||{};const b=P3(cx,cy,z0),t=P3(cx,cy,z0+h),an=Math.atan2(1,-KX),t1=an-PI/2,t2=an+PI/2;
  const g=c.createLinearGradient(b[0]-r,0,b[0]+r,0);g.addColorStop(0,sh(col,.24));g.addColorStop(.4,col);g.addColorStop(.75,sh(col,-.25));g.addColorStop(1,sh(col,-.45));
  c.beginPath();c.arc(b[0],b[1],r,t1,t2);c.arc(t[0],t[1],r,t2,t1+PI2);c.closePath();c.fillStyle=g;c.fill();c.strokeStyle=LINE;c.lineWidth=.9;c.stroke();
  if(!o.noTop){c.beginPath();c.arc(t[0],t[1],r,0,PI2);const tg=c.createRadialGradient(t[0]-r*.3,t[1]-r*.3,1,t[0],t[1],r);tg.addColorStop(0,sh(o.top||col,.3));tg.addColorStop(1,sh(o.top||col,.02));c.fillStyle=tg;c.fill();c.stroke();}}
function band3(c,cx,cy,r,z,col,w){const p=P3(cx,cy,z),an=Math.atan2(1,-KX);c.strokeStyle=col;c.lineWidth=w||2;c.beginPath();c.arc(p[0],p[1],r,an-PI/2,an+PI/2);c.stroke();}
function onCyl(cx,cy,r,z,a){return P3(cx+Math.cos(a)*r,cy+Math.sin(a)*r,z);}
function dome3(c,cx,cy,r,z0,h,col,o){o=o||{};const N=r>20?10:7;
  for(const pass of[0,1])for(let i=0;i<=N;i++){const a=i/N*PI/2,z=z0+Math.sin(a)*h,rad=Math.cos(a)*r,p=P3(cx,cy,z);if(rad<.4)continue;c.beginPath();c.arc(p[0],p[1],rad+(pass?0:1.1),0,PI2);
    if(!pass){c.fillStyle=LINE;c.fill();continue;}const k=i/N,g=c.createRadialGradient(p[0]-rad*.5,p[1]-rad*.55,rad*.05,p[0],p[1],rad*1.05);
    g.addColorStop(0,sh(col,.22+.3*k));g.addColorStop(.6,sh(col,-.05+.15*k));g.addColorStop(1,sh(col,-.38+.2*k));c.fillStyle=g;c.fill();}
  if(!o.noShine){const p=P3(cx-r*.3,cy-r*.3,z0+h*.75);c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(p[0],p[1],r*.22,r*.12,-.6,0,PI2);c.fill();}}
function sphere3(c,cx,cy,r,z0,col){dome3(c,cx,cy,r,z0+r,r,col,{noShine:true});const p=P3(cx,cy,z0+r);
  c.beginPath();c.arc(p[0],p[1],r,Math.atan2(1,-KX)-PI/2,Math.atan2(1,-KX)+PI/2);c.strokeStyle=LINE;c.lineWidth=.9;c.stroke();
  const q=P3(cx-r*.3,cy-r*.3,z0+r*1.55);c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(q[0],q[1],r*.25,r*.14,-.6,0,PI2);c.fill();}
function gable3(c,X,Y,W,D,z0,h,col,wall){const m=D/2;
  poly3(c,[P3(X-2,Y-2,z0),P3(X+W+2,Y-2,z0),P3(X+W+2,Y+m,z0+h),P3(X-2,Y+m,z0+h)],sh(col,.18));
  poly3(c,[P3(X+W,Y+D,z0),P3(X+W,Y,z0),P3(X+W,Y+m,z0+h)],sh(wall||col,-.3));
  const a=P3(X-2,Y+D+2,z0),g=c.createLinearGradient(a[0],a[1],a[0],a[1]-h);g.addColorStop(0,sh(col,-.25));g.addColorStop(1,sh(col,.02));
  poly3(c,[P3(X-2,Y+D+2,z0),P3(X+W+2,Y+D+2,z0),P3(X+W+2,Y+m,z0+h),P3(X-2,Y+m,z0+h)],g);
  c.strokeStyle='rgba(0,0,0,.22)';c.lineWidth=.7;c.beginPath();for(let i=1;i<6;i++){const t=i/6,y=lerp(Y+D+2,Y+m,t),z=lerp(z0,z0+h,t),p=P3(X-2,y,z),q=P3(X+W+2,y,z);c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);}
  for(let i=1;i<W/5;i++){const p=P3(X-2+i*5,Y+D+2,z0),q=P3(X-2+i*5,Y+m,z0+h);c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);}c.stroke();
  c.strokeStyle=sh(col,.35);c.lineWidth=1.6;c.beginPath();const r1=P3(X-2,Y+m,z0+h),r2=P3(X+W+2,Y+m,z0+h);c.moveTo(r1[0],r1[1]);c.lineTo(r2[0],r2[1]);c.stroke();}
function pyramid3(c,X,Y,W,D,z0,h,col){const ap=P3(X+W/2,Y+D/2,z0+h);
  poly3(c,[P3(X,Y,z0),P3(X+W,Y,z0),ap],sh(col,.2));poly3(c,[P3(X,Y,z0),P3(X,Y+D,z0),ap],sh(col,.08));poly3(c,[P3(X+W,Y,z0),P3(X+W,Y+D,z0),ap],sh(col,-.32));poly3(c,[P3(X,Y+D,z0),P3(X+W,Y+D,z0),ap],sh(col,-.08));}
function cone3(c,cx,cy,r,z0,h,col){const b=P3(cx,cy,z0),ap=P3(cx,cy,z0+h),an=Math.atan2(1,-KX);const g=c.createLinearGradient(b[0]-r,0,b[0]+r,0);g.addColorStop(0,sh(col,.25));g.addColorStop(.45,col);g.addColorStop(1,sh(col,-.4));
  c.beginPath();c.arc(b[0],b[1],r,an-PI/2,an+PI/2);c.lineTo(ap[0],ap[1]);c.closePath();c.fillStyle=g;c.fill();c.strokeStyle=LINE;c.lineWidth=.9;c.stroke();}
function line3(c,a,b,col,w){const p=P3(...a),q=P3(...b);c.strokeStyle=col;c.lineWidth=w||1;c.lineCap='round';c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);c.stroke();}
function pipe3(c,a,b,r,col){line3(c,a,b,LINE,r*2+1.6);line3(c,a,b,col,r*2);line3(c,[a[0],a[1],a[2]+r*.5],[b[0],b[1],b[2]+r*.5],'rgba(255,255,255,.35)',r*.6);}
function glow3(c,x,y,z,r,col,a){const p=P3(x,y,z);c.globalCompositeOperation='lighter';drawGlow(c,p[0],p[1],r,col,a);c.globalCompositeOperation='source-over';}
function text3(c,s,x,y,size,col,stroke){c.font=`${size}px Bangers, Impact, sans-serif`;c.textAlign='center';c.textBaseline='middle';if(stroke){c.lineWidth=2.4;c.strokeStyle=stroke;c.strokeText(s,x,y);}c.fillStyle=col;c.fillText(s,x,y);}
function plinth(c,x0,y0,W,H,fc){box3(c,x0+3,y0+4,W-6,H-7,0,4,'#9aa0a8',{top:'#a9afb6'});const a=P3(x0+3,y0+4,4);
  c.strokeStyle='rgba(50,55,62,.3)';c.lineWidth=.7;c.beginPath();for(let x=x0+16;x<x0+W-6;x+=16){const p=P3(x,y0+4,4),q=P3(x,y0+H-3,4);c.moveTo(p[0],p[1]);c.lineTo(q[0],q[1]);}c.stroke();
  const s=P3(x0+6,y0+H-3,0);c.fillStyle=fc;c.fillRect(s[0],s[1]-3,10,2.4);const s2=P3(x0+W-16,y0+H-3,0);c.fillRect(s2[0],s2[1]-3,10,2.4);}
function palm(c,x,y,z,s){const b=P3(x,y,z),t=P3(x+2*s,y,z+16*s);c.strokeStyle='#6a4526';c.lineWidth=2*s;c.beginPath();c.moveTo(b[0],b[1]);c.quadraticCurveTo(b[0]+3*s,(b[1]+t[1])/2,t[0],t[1]);c.stroke();
  for(let j=0;j<6;j++){const a=j*1.05;c.fillStyle=j%2?'#3e9a3a':'#58b84a';c.beginPath();c.ellipse(t[0]+Math.cos(a)*5*s,t[1]+Math.sin(a)*2.2*s,5.5*s,1.8*s,a,0,PI2);c.fill();}}
function crenel(c,X,Y,W,D,z,col,n){const step=W/n;for(let i=0;i<n;i+=2){box3(c,X+i*step,Y,step,4,z,5,col);box3(c,X+i*step,Y+D-4,step,4,z,5,col);}}
function beacon(c,x,y,z,a,col){if(Math.sin(a*3+x)>.5)glow3(c,x,y,z,7,col||'#ff3a3a',.95);const p=P3(x,y,z);c.fillStyle=col||'#ff3a3a';c.beginPath();c.arc(p[0],p[1],1.3,0,PI2);c.fill();}
function bH(b){const k=b.key,f=b.fac;if(BH_EXTRA[k])return BH_EXTRA[k][f]||48;return({dbz:{hq:66,power:46,refinery:66,barracks:46,factory:44,turret:30,temple:60},mha:{hq:92,power:42,refinery:58,barracks:62,factory:40,turret:30,temple:118},
  aot:{hq:82,power:44,refinery:52,barracks:44,factory:66,turret:34,temple:92,wall:30}})[f][k]||40;}

function drawB3(c,b,ghost){if(b.key==='lab'||b.key==='radar'||b.key==='def2'){drawB3x(c,b,ghost);return;}if(['market','hospital','training','temple2','unique'].includes(b.key)||(b.key==='wall'&&b.fac!=='aot')){drawB3y(c,b,ghost);return;}const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,cy=y0+H/2,a=b.anim||0,k=b.key,f=b.fac,fc=FAC[f].col;
 if(f==='dbz'){
  if(k==='hq'){plinth(c,x0,y0,W,H,fc);
    cyl3(c,x0+26,y0+28,16,4,10,'#e6ebf2');dome3(c,x0+26,y0+28,16,14,18,'#eef2f8');
    cyl3(c,cx+8,cy+6,33,4,16,'#f2f4f8');band3(c,cx+8,cy+6,33,8,'#ff8a1f',4);
    for(let i=0;i<7;i++){const an=.35+i*.42,p=onCyl(cx+8,cy+6,33,14,an);c.fillStyle='#2a64c8';c.beginPath();c.ellipse(p[0],p[1],2.6,1.9,0,0,PI2);c.fill();c.fillStyle='rgba(255,255,255,.6)';c.fillRect(p[0]-1.2,p[1]-1.2,1,1);}
    dome3(c,cx+8,cy+6,33,20,40,'#f7f9fc');
    for(let i=0;i<5;i++){const an=.6+i*.42,p=onCyl(cx+8,cy+6,26,40,an);c.fillStyle='rgba(42,100,200,.85)';c.beginPath();c.ellipse(p[0],p[1],2,1.5,0,0,PI2);c.fill();}
    const lp=P3(cx+18,cy+30,40);text3(c,'CC',lp[0],lp[1],15,'#2a64c8','#fff');
    box3(c,cx-8,y0+H-26,28,14,4,16,'#eef1f5');onFront(c,cx-8,y0+H-26,14,4,x=>{x.fillStyle='#2a3240';x.fillRect(10,-14,9,14);x.fillStyle='#ff8a1f';x.fillRect(0,-16,28,2);x.font='bold 4.6px Chakra Petch, sans-serif';x.fillStyle='#2a64c8';x.textAlign='center';x.fillText('CAPSULE CORP.',14,-12.5);});
    line3(c,[cx+18,cy-4,60],[cx+18,cy-4,80],'#8a929c',1.4);beacon(c,cx+18,cy-4,81,a);const d=P3(x0+20,y0+20,34);c.strokeStyle='#9aa4b0';c.lineWidth=1.5;c.beginPath();c.ellipse(d[0],d[1],6,3,-.5,0,PI2);c.stroke();
    palm(c,x0+86,y0+88,4,.8);palm(c,x0+10,y0+90,4,.7);}
  else if(k==='power'){plinth(c,x0,y0,W,H,fc);cyl3(c,cx,cy+2,22,4,10,'#d8dee6');band3(c,cx,cy+2,22,9,'#ffb030',2);
    for(let i=0;i<3;i++){const an=i*PI2/3+.4;line3(c,[cx+Math.cos(an)*14,cy+2+Math.sin(an)*14,14],[cx+Math.cos(an)*6,cy+2+Math.sin(an)*6,30],'#8a929c',2.2);}
    cyl3(c,cx,cy+2,9,14,6,'#b8c0ca');const pu=.85+Math.sin(a*5)*.15;glow3(c,cx,cy+2,34,26*pu,'#ffb030',.85);sphere3(c,cx,cy+2,9,25,'#ffd27a');
    const o=P3(cx,cy+2,34);c.strokeStyle='#5aa8ff';c.lineWidth=1.4;for(const r0 of[0,PI/2]){c.beginPath();c.ellipse(o[0],o[1],16,5,a*2+r0,0,PI2);c.stroke();}
    for(let i=0;i<3;i++)box3(c,x0+8+i*6,y0+H-14,4,6,4,6,'#7a828c');}
  else if(k==='refinery'){plinth(c,x0,y0,W,H,fc);hazardFloor(c,cx-14,y0+H-16,28,9);
    cyl3(c,x0+30,y0+34,15,4,56,'#f2f4f8');band3(c,x0+30,y0+34,15,20,'#ff8a1f',2.5);band3(c,x0+30,y0+34,15,50,'#ff8a1f',2.5);
    const lv=.45+Math.sin(a*1.2)*.25;onFront(c,x0+22,y0+34,15,0,x=>{x.fillStyle='#1e2430';x.fillRect(0,-50,10,30);x.fillStyle='#ffb52a';x.fillRect(1,-21-28*lv,8,28*lv);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(1,-49,2,28);});
    glow3(c,x0+30,y0+48,40,16,'#ffb52a',.4);dome3(c,x0+30,y0+34,15,60,8,'#e8ecf2',{noShine:true});
    cyl3(c,x0+68,y0+40,20,4,16,'#e8ecf2');dome3(c,x0+68,y0+40,20,20,20,'#f4f6fa');const t=P3(x0+72,y0+56,30);text3(c,'KI',t[0],t[1],11,'#ff8a1f','#fff');
    pipe3(c,[x0+42,y0+36,44],[x0+56,y0+38,30],2.2,'#b8c0ca');pipe3(c,[x0+40,y0+40,14],[x0+50,y0+44,14],2,'#b8c0ca');
    box3(c,x0+70,y0+64,16,12,4,6,'#7a828c');}
  else if(k==='barracks'){plinth(c,x0,y0,W,H,fc);for(const[lx,ly]of[[cx-18,cy+10],[cx+16,cy+12],[cx,cy-14]])line3(c,[lx,ly,0],[lx*.7+cx*.3,ly*.7+cy*.3,14],'#7a828c',2.4);
    sphere3(c,cx,cy+2,24,10,'#f2f4f8');band3(c,cx,cy+2,24.5,26,'#ffd23a',3);
    for(let i=0;i<6;i++){const p=onCyl(cx,cy+2,22,32,.2+i*.45);c.fillStyle='#4aa0ff';c.beginPath();c.arc(p[0],p[1],2.4,0,PI2);c.fill();c.strokeStyle=LINE;c.lineWidth=.6;c.stroke();c.fillStyle='rgba(255,255,255,.7)';c.fillRect(p[0]-1,p[1]-1.2,1,1);}
    const t=P3(cx+4,cy+14,46);text3(c,'100G',t[0],t[1],10,'#d8343f','#fff');line3(c,[cx-6,cy-6,58],[cx-6,cy-6,70],'#8a929c',1.2);beacon(c,cx-6,cy-6,71,a);
    poly3(c,[P3(cx-6,cy+24,10),P3(cx+6,cy+24,10),P3(cx+8,y0+H-4,4),P3(cx-8,y0+H-4,4)],'#c8ced6');}
  else if(k==='factory'){plinth(c,x0,y0,W,H,fc);const X=x0+8,Y=y0+18,WW=W-16,D=H-30,N=12;box3(c,X,Y,WW,D,4,20,'#e6eaf0',{noTop:true});
    for(let i=0;i<N;i++){const y=Y+i*D/N,z=24+Math.sin(PI*(i+.5)/N)*18;box3(c,X,y,WW,D/N+.4,4,z-4,i<N/2?'#f2f5f9':'#e2e7ee',{top:sh('#e8edf3',.2-.35*Math.abs(i-N/2)/N)});}
    onFront(c,X,Y,D,4,x=>{x.fillStyle='#262c36';x.fillRect(WW/2-17,-20,34,20);x.save();x.beginPath();x.rect(WW/2-20,-23,40,23);x.rect(WW/2-17,-20,34,20);x.clip('evenodd');
      x.fillStyle='#f2c230';x.fillRect(WW/2-20,-23,40,23);x.fillStyle='#222';for(let i=-4;i<12;i++)x.fillRect(WW/2-20+i*5,-23,2.5,23);x.restore();
      for(let i=0;i<4;i++){x.fillStyle='rgba(255,255,255,.12)';x.fillRect(WW/2-16,-19+i*5,32,1);}
      x.font='bold 6px Chakra Petch, sans-serif';x.fillStyle='#2a64c8';x.textAlign='center';x.fillText('CAPSULE',WW/2,-26);});
    onSide(c,X,Y,WW,D,4,x=>{winGrid(x,6,6,D-12,8,4,1,'#4a8ad8',null,true);});
    const sp=P3(X+WW*.7,Y+D*.5,44);c.fillStyle='rgba(120,190,255,.7)';c.fillRect(sp[0]-8,sp[1]-2,16,4);}
  else if(k==='turret'){box3(c,x0+2,y0+6,W-4,W-8,0,5,'#8d9298');cyl3(c,cx,cy+3,9,5,12,'#c8ced8');band3(c,cx,cy+3,9,9,'#ff8a1f',2);
    const hz=24,end=[cx+Math.cos(b.tang)*16,cy+3+Math.sin(b.tang)*16,hz];pipe3(c,[cx,cy+3,hz],end,2,'#6a707a');sphere3(c,cx,cy+3,8,16,'#f4f6fa');
    const lp=P3(cx+Math.cos(b.tang)*6,cy+3+Math.sin(b.tang)*6,hz);glow3(c,cx+Math.cos(b.tang)*6,cy+3+Math.sin(b.tang)*6,hz,8,'#ff8a1f',.9);c.fillStyle='#ff8a1f';c.beginPath();c.arc(lp[0],lp[1],2.4,0,PI2);c.fill();}
  else if(k==='temple')drawLookout3(c,b,ghost);
 }else if(f==='mha'){
  if(k==='hq'){plinth(c,x0,y0,W,H,fc);
    for(const tx of[x0+8,x0+58]){box3(c,tx,y0+16,30,34,4,80,'#7fa8cc',{top:'#c8d4de'});
      onFront(c,tx,y0+16,34,4,x=>{winGrid(x,2,4,26,72,4,9,'#3a6a9a',(i,j)=>Math.sin(a*.6+i*1.7+j*2.3+tx)>.55);x.fillStyle='#e8eef4';for(let j=0;j<=9;j++)x.fillRect(0,-4-j*8,30,.8);});
      onSide(c,tx,y0+16,30,34,4,x=>{winGrid(x,2,4,30,72,4,9,'#2a4a6a',(i,j)=>Math.sin(a*.5+i*2.1+j*1.3)>.7,true);});
      box3(c,tx+8,y0+24,14,12,84,6,'#9aa4ae');beacon(c,tx+15,y0+30,92,a);}
    box3(c,x0+38,y0+22,20,20,50,14,'#e0e6ec');onFront(c,x0+38,y0+22,20,50,x=>{x.fillStyle='#1b2733';x.fillRect(1,-13,18,12);text3(x,'UA',10,-7,12,'#2fd27a','#0b1017');});
    box3(c,x0+4,y0+58,88,28,4,18,'#c9d2dc');onFront(c,x0+4,y0+58,28,4,x=>{winGrid(x,4,3,80,12,10,1,'#4a7aa8');x.fillStyle='#2a3a4a';x.fillRect(38,-14,12,14);x.fillStyle='#2fd27a';x.fillRect(0,-18,88,1.6);});
    text3(c,'U.A.',P3(cx,y0+66,24)[0],P3(cx,y0+66,24)[1],8,'#fff','#0b1017');}
  else if(k==='power'){plinth(c,x0,y0,W,H,fc);box3(c,x0+8,y0+26,48,26,4,10,'#8a9aa8');
    for(const sx of[x0+20,x0+44]){cyl3(c,sx,y0+30,7,14,10,'#6a7a88');for(let j=0;j<5;j++)cyl3(c,sx,y0+30,5.2-j*.3,24+j*4,2.6,j%2?'#e8ecf0':'#c8d0d8');}
    if(Math.sin(a*13)>0){const p=P3(x0+20,y0+30,46),q=P3(x0+44,y0+30,46);c.globalCompositeOperation='lighter';c.strokeStyle='#fff36a';c.lineWidth=2;c.beginPath();c.moveTo(p[0],p[1]);for(let j=1;j<6;j++)c.lineTo(lerp(p[0],q[0],j/6),lerp(p[1],q[1],j/6)+rr(-5,5));c.lineTo(q[0],q[1]);c.stroke();drawGlow(c,(p[0]+q[0])/2,p[1],20,'#fff36a',.6);c.globalCompositeOperation='source-over';}
    onFront(c,x0+8,y0+26,26,4,x=>{x.fillStyle='#f2c230';x.beginPath();x.moveTo(20,-9);x.lineTo(25,-1);x.lineTo(15,-1);x.closePath();x.fill();x.fillStyle='#222';x.fillRect(19.5,-6,1,3);});}
  else if(k==='refinery'){plinth(c,x0,y0,W,H,fc);hazardFloor(c,cx-14,y0+H-16,28,9);
    for(const[lx,ly]of[[x0+20,y0+30],[x0+46,y0+30],[x0+20,y0+56],[x0+46,y0+56]])line3(c,[lx,ly,4],[lx,ly,22],'#55606a',2.4);
    sphere3(c,x0+33,y0+43,20,16,'#c8d0d8');band3(c,x0+33,y0+43,20.5,36,'#2fd27a',2.5);
    cyl3(c,x0+76,y0+30,8,4,58,'#e8ecf0');for(let j=0;j<4;j++)band3(c,x0+76,y0+30,8.2,12+j*14,'#d8343f',4);if(!ghost&&R()<.12)part('smoke',P3(x0+76,y0+30,64)[0],P3(x0+76,y0+30,64)[1],rr(-4,4),-18,2.4,6);
    pipe3(c,[x0+52,y0+44,26],[x0+70,y0+34,20],2.4,'#9aa4ae');pipe3(c,[x0+33,y0+64,8],[x0+48,y0+80,8],2,'#9aa4ae');}
  else if(k==='barracks'){plinth(c,x0,y0,W,H,fc);box3(c,x0+6,y0+20,52,36,4,36,'#dfe4ea');
    onFront(c,x0+6,y0+20,36,4,x=>{winGrid(x,3,12,46,22,5,2,'#4a7aa8',(i,j)=>Math.sin(a+i+j*3)>.6);x.fillStyle='#2a3a4a';x.fillRect(19,-11,14,11);x.fillStyle='#d8343f';x.fillRect(15,-14,22,2.5);});
    onSide(c,x0+6,y0+20,52,36,4,x=>winGrid(x,3,10,30,22,3,2,'#2a4a6a',null,true));
    box3(c,x0+10,y0+30,44,3,40,16,'#d8343f',{side:'#8a1a22'});onFront(c,x0+10,y0+30,3,40,x=>{text3(x,'HERO',22,-8,12,'#fff','#5a0a10');});
    line3(c,[x0+14,y0+31,40],[x0+14,y0+31,36],'#555',1);}
  else if(k==='factory'){plinth(c,x0,y0,W,H,fc);const X=x0+6,Y=y0+22,WW=84,D=56;box3(c,X,Y,WW,D,4,22,'#9aa6b0',{noTop:true});
    for(let i=0;i<4;i++){const sx=X+i*21;poly3(c,[P3(sx,Y,26),P3(sx+21,Y,26),P3(sx+21,Y+D,26),P3(sx,Y+D,26)],'#b4bec8');
      poly3(c,[P3(sx,Y,26),P3(sx,Y+D,26),P3(sx,Y+D,40),P3(sx,Y,40)],'#7ab0d8');poly3(c,[P3(sx,Y,40),P3(sx,Y+D,40),P3(sx+21,Y+D,26),P3(sx+21,Y,26)],'#c8d2dc');}
    onFront(c,X,Y,D,4,x=>{x.save();x.beginPath();x.rect(WW/2-20,-23,40,23);x.clip();x.fillStyle='#f2c230';x.fillRect(WW/2-20,-23,40,23);x.fillStyle='#222';for(let i=-4;i<12;i++)x.fillRect(WW/2-20+i*5,-23,2.5,23);x.restore();
      x.fillStyle='#3a424c';x.fillRect(WW/2-17,-20,34,20);for(let i=0;i<5;i++){x.fillStyle='rgba(255,255,255,.12)';x.fillRect(WW/2-17,-19+i*4,34,1);}});
    const gp=P3(x0+78,y0+30,40);c.save();c.translate(gp[0],gp[1]);c.rotate(a*.8);c.fillStyle=fc;for(let i=0;i<8;i++){c.rotate(PI/4);c.fillRect(-2,-10,4,4);}c.beginPath();c.arc(0,0,7,0,PI2);c.fill();c.strokeStyle=LINE;c.stroke();c.fillStyle='#0b1017';c.beginPath();c.arc(0,0,2.5,0,PI2);c.fill();c.restore();}
  else if(k==='turret'){box3(c,x0+3,y0+7,W-6,W-10,0,14,'#6f7c88');box3(c,x0+7,y0+10,W-14,W-16,14,7,'#9aa8b4');
    for(const s of[-1,1]){const ox=-Math.sin(b.tang)*3*s,oy=Math.cos(b.tang)*3*s;pipe3(c,[cx+ox,cy+oy,22],[cx+ox+Math.cos(b.tang)*16,cy+oy+Math.sin(b.tang)*16,22],1.4,'#40464c');}
    const p=P3(cx,cy,21);c.fillStyle=fc;c.fillRect(p[0]-3,p[1]-1,6,2);}
  else if(k==='temple'){plinth(c,x0,y0,W,H,fc);box3(c,x0+12,y0+18,40,32,4,104,'#2c3648',{top:'#5a6478'});
    onFront(c,x0+12,y0+18,32,4,x=>{winGrid(x,3,6,34,92,4,14,'#4a6aa8',(i,j)=>Math.sin(a*.4+i*3.1+j*1.7)>.5);x.fillStyle='#e8b830';for(let j=0;j<=14;j+=2)x.fillRect(0,-6-j*6.6,40,.8);x.fillRect(0,-104,40,2);});
    onSide(c,x0+12,y0+18,40,32,4,x=>{winGrid(x,3,6,26,92,3,14,'#2a3a68',null,true);});
    box3(c,x0+16,y0+22,32,24,108,3,'#3a4458');const h=P3(cx,y0+34,111);c.strokeStyle='#e8b830';c.lineWidth=1.2;c.beginPath();c.ellipse(h[0],h[1],8,8,0,0,PI2);c.stroke();text3(c,'H',h[0],h[1],9,'#e8b830');
    box3(c,x0+14,y0+44,36,3,110,14,'#e8b830',{side:'#9a7a10'});onFront(c,x0+14,y0+44,3,110,x=>text3(x,'No.1',18,-7,11,'#3a2a10'));beacon(c,x0+46,y0+20,112,a);}
 }else{
  if(k==='wall'){box3(c,x0,y0+4,W,W-6,0,26,'#a89e8e');stoneLines(c,x0,y0+4,W,W-6,0,26);crenel(c,x0,y0+4,W,W-6,26,'#b8ae9e',5);return;}
  if(k!=='turret')plinth(c,x0,y0,W,H,fc);
  if(k==='hq'){box3(c,x0+4,y0+10,W-8,22,4,60,'#b0a696');stoneLines(c,x0+4,y0+10,W-8,22,4,60);crenel(c,x0+4,y0+10,W-8,22,64,'#c0b6a6',11);
    for(const tx of[x0+8,x0+W-20]){cyl3(c,tx+6,y0+44,9,4,52,'#a39a8a');cone3(c,tx+6,y0+44,11,56,22,'#3a5a8a');}
    box3(c,cx-18,y0+40,36,34,4,46,'#a39a8a');stoneLines(c,cx-18,y0+40,36,34,4,46);crenel(c,cx-18,y0+40,36,34,50,'#b3aa9a',7);
    onFront(c,cx-18,y0+40,34,4,x=>{x.fillStyle='#2a221a';x.beginPath();x.moveTo(9,0);x.lineTo(9,-18);x.arc(18,-18,9,PI,0);x.lineTo(27,0);x.fill();x.strokeStyle='#5a4a3a';x.lineWidth=1;x.beginPath();for(let i=11;i<27;i+=3.4){x.moveTo(i,0);x.lineTo(i,-24);}x.stroke();
      x.fillStyle='#2f6a3a';x.fillRect(4,-42,9,16);x.fillRect(23,-42,9,16);wings(x,8.5,-35,2.2);wings(x,27.5,-35,2.2);});
    flag3(c,cx,y0+56,54,a,'#2f6a3a');}
  else if(k==='power'){box3(c,x0+6,y0+20,22,30,4,22,'#8a6a42');woodLines(c,x0+6,y0+20,22,30,4,22);gable3(c,x0+6,y0+20,22,30,26,12,'#7a3a2a','#8a6a42');
    for(let i=0;i<2;i++){cyl3(c,x0+40+i*12,y0+30+i*10,6,4,26,'#8f969e');dome3(c,x0+40+i*12,y0+30+i*10,6,30,4,'#a8aeb6',{noShine:true});band3(c,x0+40+i*12,y0+30+i*10,6,12,'#5a5f66',1.5);}
    pipe3(c,[x0+28,y0+40,12],[x0+40,y0+38,12],1.6,'#6a7078');const v=P3(x0+52,y0+40,32);c.fillStyle='#d8343f';c.beginPath();c.arc(v[0],v[1],2,0,PI2);c.fill();}
  else if(k==='refinery'){hazardFloor(c,cx-14,y0+H-16,28,9);box3(c,x0+8,y0+22,62,44,4,30,'#9a6a3a');woodLines(c,x0+8,y0+22,62,44,4,30);gable3(c,x0+8,y0+22,62,44,34,18,'#8a3a2a','#9a6a3a');
    onFront(c,x0+8,y0+22,44,4,x=>{x.fillStyle='#3a2a1a';x.fillRect(20,-22,22,22);x.strokeStyle='#6a4a2a';x.lineWidth=1;x.beginPath();x.moveTo(20,-22);x.lineTo(42,0);x.moveTo(42,-22);x.lineTo(20,0);x.stroke();});
    for(let i=0;i<3;i++)box3(c,x0+72,y0+30+i*12,12,10,4,8+(i%2)*4,'#b88a52');cyl3(c,x0+80,y0+76,4,4,9,'#7a5030');cyl3(c,x0+70,y0+80,4,4,9,'#7a5030');}
  else if(k==='barracks'){box3(c,x0+6,y0+20,52,30,4,24,'#a07a4a');woodLines(c,x0+6,y0+20,52,30,4,24);gable3(c,x0+6,y0+20,52,30,28,14,'#6a3a2a','#a07a4a');
    onFront(c,x0+6,y0+20,30,4,x=>{for(let i=0;i<4;i++)glass(x,4+i*12,-17,6,8,'#5a4a3a',Math.sin(a+i)>.2);x.fillStyle='#3a2414';x.fillRect(22,-12,8,12);});
    cyl3(c,x0+48,y0+24,3.5,30,14,'#7a6a5a');if(!ghost&&R()<.06)part('smoke',P3(x0+48,y0+24,46)[0],P3(x0+48,y0+24,46)[1],rr(-3,3),-14,2,5);
    for(const dx of[10,18]){line3(c,[x0+dx,y0+H-8,4],[x0+dx,y0+H-8,14],'#6a4526',2);line3(c,[x0+dx-3,y0+H-8,11],[x0+dx+3,y0+H-8,11],'#6a4526',1.6);}}
  else if(k==='factory'){box3(c,x0+8,y0+26,62,48,4,34,'#8a8278');stoneLines(c,x0+8,y0+26,62,48,4,34);gable3(c,x0+8,y0+26,62,48,38,14,'#4a4a52','#8a8278');
    cyl3(c,x0+80,y0+30,7,4,64,'#6a625a');band3(c,x0+80,y0+30,7.2,40,'#4a423a',2);if(!ghost&&R()<.18)part('smoke',P3(x0+80,y0+30,70)[0],P3(x0+80,y0+30,70)[1],rr(-4,4),-20,2.4,7);
    onFront(c,x0+8,y0+26,48,4,x=>{x.fillStyle='#1e140c';x.beginPath();x.moveTo(20,0);x.lineTo(20,-14);x.arc(31,-14,11,PI,0);x.lineTo(42,0);x.fill();});glow3(c,x0+38,y0+72,10,18+Math.sin(a*6)*3,'#ff7a2a',.85);
    box3(c,x0+74,y0+70,10,6,4,6,'#3a3a40');}
  else if(k==='turret'){cyl3(c,cx,cy+3,13,0,22,'#a39a8a');for(let i=0;i<6;i++){const an=i*PI/3;box3(c,cx+Math.cos(an)*10-2,cy+3+Math.sin(an)*10-2,4,4,22,4,'#b3aa9a');}
    pipe3(c,[cx,cy+3,24],[cx+Math.cos(b.tang)*20,cy+3+Math.sin(b.tang)*20,26],2.4,'#2a2a30');const p=P3(cx,cy+3,24);c.fillStyle='#5a3a20';c.beginPath();c.arc(p[0],p[1],4,0,PI2);c.fill();}
  else if(k==='temple'){box3(c,x0+14,y0+18,36,34,4,64,'#b0a696');stoneLines(c,x0+14,y0+18,36,34,4,64);pyramid3(c,x0+10,y0+14,44,42,68,30,'#3a5a8a');
    onFront(c,x0+14,y0+18,34,4,x=>{for(let i=0;i<3;i++)glass(x,6+i*9,-52,5,9,'#3a3020',Math.sin(a+i)>.4);x.fillStyle='#2f6a3a';x.fillRect(10,-36,16,26);wings(x,18,-26,4.2);x.fillStyle='#2a221a';x.fillRect(13,-8,10,8);});
    flag3(c,x0+32,y0+35,104,a,'#2f6a3a');}
 }}
function stoneLines(c,X,Y,W,D,z0,h){onFront(c,X,Y,D,z0,x=>{x.strokeStyle='rgba(60,50,40,.35)';x.lineWidth=.6;x.beginPath();for(let v=5,r=0;v<h;v+=5,r++){x.moveTo(0,-v);x.lineTo(W,-v);for(let u=(r%2?4:0);u<W;u+=8){x.moveTo(u,-v);x.lineTo(u,-v+5);}}x.stroke();});
  onSide(c,X,Y,W,D,z0,x=>{x.strokeStyle='rgba(30,25,20,.3)';x.lineWidth=.6;x.beginPath();for(let v=5;v<h;v+=5){x.moveTo(0,-v);x.lineTo(D,-v);}x.stroke();});}
function woodLines(c,X,Y,W,D,z0,h){onFront(c,X,Y,D,z0,x=>{x.strokeStyle='rgba(50,30,15,.4)';x.lineWidth=.7;x.beginPath();for(let u=4;u<W;u+=4){x.moveTo(u,0);x.lineTo(u,-h);}x.stroke();x.fillStyle='#4a3020';x.fillRect(0,-h,W,1.6);x.fillRect(0,-1.6,W,1.6);});}
function hazardFloor(c,X,Y,W,D){const pts=[P3(X,Y,4.2),P3(X+W,Y,4.2),P3(X+W,Y+D,4.2),P3(X,Y+D,4.2)];c.save();poly3(c,pts,'#f2c230',false);c.clip();c.fillStyle='#222';for(let i=-D;i<W;i+=7){c.beginPath();c.moveTo(pts[0][0]+i,pts[3][1]);c.lineTo(pts[0][0]+i+3.5,pts[3][1]);c.lineTo(pts[0][0]+i+3.5+D,pts[0][1]);c.lineTo(pts[0][0]+i+D,pts[0][1]);c.fill();}c.restore();poly3(c,pts,null);}
function flag3(c,x,y,z,a,col){line3(c,[x,y,z],[x,y,z+22],'#4a3020',1.4);const p=P3(x,y,z+22);c.fillStyle=col;c.beginPath();c.moveTo(p[0],p[1]);for(let i=0;i<=7;i++)c.lineTo(p[0]+i*2,p[1]+Math.sin(a*6+i*.8)*1.3);for(let i=7;i>=0;i--)c.lineTo(p[0]+i*2,p[1]+9+Math.sin(a*6+i*.8)*1.3);c.closePath();c.fill();wings(c,p[0]+7,p[1]+4.5,1.7);}
function drawLookout3(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,cx=x0+32,cy=y0+34,a=b.anim||0,fl=Math.sin(a*1.4)*1.5,z=26+fl;
  c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(cx+6,cy+8,28,14,0,0,PI2);c.fill();
  const tip=P3(cx,cy,z-30),an=Math.atan2(1,-KX),b0=P3(cx,cy,z);const g=c.createLinearGradient(b0[0]-30,0,b0[0]+30,0);g.addColorStop(0,'#e0cca0');g.addColorStop(.5,'#c0a878');g.addColorStop(1,'#8a7450');
  c.beginPath();c.arc(b0[0],b0[1],30,an-PI/2,an+PI/2);c.quadraticCurveTo(b0[0]+4,b0[1]+18,tip[0],tip[1]);c.closePath();c.fillStyle=g;c.fill();c.strokeStyle=LINE;c.lineWidth=.9;c.stroke();
  c.strokeStyle='rgba(90,70,40,.45)';c.beginPath();for(let i=1;i<4;i++){const p=P3(cx,cy,z-i*7);c.moveTo(p[0]-28+i*6,p[1]);c.quadraticCurveTo(p[0],p[1]+6,p[0]+28-i*6,p[1]);}c.stroke();
  cyl3(c,cx,cy,30,z,4,'#e8e2d4',{top:'#f8f4e8'});const tp=P3(cx,cy,z+4);c.strokeStyle='rgba(140,120,80,.3)';for(let r=8;r<30;r+=7){c.beginPath();c.arc(tp[0],tp[1],r,0,PI2);c.stroke();}
  palm(c,cx-20,cy-6,z+4,.8);palm(c,cx+20,cy-10,z+4,.75);
  box3(c,cx-11,cy-8,22,16,z+4,14,'#f6f6f2');onFront(c,cx-11,cy-8,16,z+4,x=>{for(let i=0;i<4;i++){x.fillStyle='#3a3a44';x.fillRect(2+i*5.2,-11,2.6,9);}});
  dome3(c,cx,cy,10,z+18,12,'#f4f0e0');for(const s of[-1,1])dome3(c,cx+s*9,cy+4,4,z+18,6,'#f4f0e0',{noShine:true});
  const sp=P3(cx,cy,z+30);c.fillStyle='#e8b830';c.beginPath();c.moveTo(sp[0]-2,sp[1]+1);c.lineTo(sp[0],sp[1]-9);c.lineTo(sp[0]+2,sp[1]+1);c.fill();
  if(!ghost)glow3(c,cx,cy,z+20,24,'#fff6c0',.22);}
