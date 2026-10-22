// ===== Particles & FX =====
function part(type,x,y,vx,vy,life,size,col,vz,extra){if(parts.length>1800)return;parts.push({type,x,y,vx,vy,life,max:life,size,col,z:type==='debris'?6:0,vz:vz||0,ex:extra,rot:R()*PI2});}
function fxRing(x,y,col,r){part('ring',x,y,0,0,.45,r,col);}
function fxBoom(x,y,rad,col,big){part('flash',x,y-6,0,0,big?.4:.22,rad*2.2,col);part('ring',x,y,0,0,big?.6:.35,rad*1.1,big?'#ffffff':col);
  const n=Math.min(40,6+rad*.5|0);
  for(let k=0;k<n;k++){const a=R()*PI2,s=rr(20,rad*2.6);part('fire',x+Math.cos(a)*rad*.2,y+Math.sin(a)*rad*.2-6,Math.cos(a)*s,Math.sin(a)*s*.7-20,rr(.3,.6),rr(rad*.18,rad*.32)+4,big?col:null);}
  for(let k=0;k<n*.6;k++){const a=R()*PI2,s=rr(10,rad*1.2);part('smoke',x+rr(-rad*.4,rad*.4),y+rr(-rad*.3,rad*.3)-8,Math.cos(a)*s,Math.sin(a)*s*.6-25,rr(1,2.2),rr(rad*.2,rad*.35)+5);}
  for(let k=0;k<n*.5;k++)part('spark',x,y-6,rr(-1,1)*rad*6,rr(-1,.6)*rad*6,rr(.2,.5),2,'#fff3b0');
  if(rad>30)for(let k=0;k<rad*.2;k++)part('debris',x,y,rr(-1,1)*rad*2.5,rr(-1,1)*rad*2,rr(.8,1.4),rr(2,4),pick(['#3a332c','#5a5048','#222']),rr(80,220));
  if(!big)scorch(x,y,rad*.7,.35);}
function shake(a){G.shake=Math.max(G.shake,a);}
function msg(text,col){if(G.state!=='play')return;feedPush(text,col);}
function cutin(u,text){if(G.cut&&G.cut.t<G.cut.dur*.6)return;if(!text&&u.side===PL&&Math.random()<.5)announce(u.D.ab.name);G.cut={u,text:text||u.D.ab.shout,col:u.D.ab?u.D.ab.col:'#ffe14d',fc:FAC[u.fac].col,t:0,dur:1.45,ssj:u.ssj||!!text};G.slow=.55;}
function updParts(dt){for(const p of parts){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
    switch(p.type){case'smoke':p.vx*=.97;p.vy*=.97;p.size+=dt*10;break;case'fire':p.vx*=.9;p.vy=p.vy*.9-dt*40;break;case'dust':p.vx*=.9;p.vy*=.9;p.size+=dt*8;break;
      case'spark':p.vx*=.93;p.vy=p.vy*.93+dt*120;break;case'debris':p.vz-=dt*420;p.z+=p.vz*dt;if(p.z<0){p.z=0;p.vz*=-.35;p.vx*=.5;p.vy*=.5;}p.rot+=dt*8;break;}}
  parts=parts.filter(p=>p.life>0);
  for(const f of fxs)f.t+=dt;fxs=fxs.filter(f=>f.t<f.dur);}
const glowCache={};
function glow(col){if(glowCache[col])return glowCache[col];const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,col);g.addColorStop(.35,col+'aa');g.addColorStop(1,col+'00');x.fillStyle=g;x.fillRect(0,0,64,64);return glowCache[col]=c;}
function hexA(col){return col.length===7?col:'#ffffff';}
function drawGlow(c,x,y,r,col,a){c.globalAlpha=a;c.drawImage(glow(hexA(col)),x-r,y-r,r*2,r*2);c.globalAlpha=1;}
function drawPartsLow(c){for(const p of parts){const a=p.life/p.max;
  if(p.type==='smoke'){c.globalAlpha=a*.45;c.fillStyle='#6a6660';c.beginPath();c.arc(p.x,p.y,p.size,0,PI2);c.fill();}
  else if(p.type==='dust'){c.globalAlpha=a*.4;c.fillStyle='#b49a72';c.beginPath();c.arc(p.x,p.y,p.size,0,PI2);c.fill();}
  else if(p.type==='debris'){c.globalAlpha=1;c.fillStyle=p.col;c.save();c.translate(p.x,p.y-p.z);c.rotate(p.rot);c.fillRect(-p.size,-p.size*.6,p.size*2,p.size*1.2);c.restore();}
  else if(p.type==='leaf'){c.globalAlpha=Math.min(1,a*2);c.fillStyle=p.col;c.save();c.translate(p.x+Math.sin(p.life*4+p.rot)*6,p.y);c.rotate(p.rot+p.life*3);c.beginPath();c.ellipse(0,0,p.size,p.size*.5,0,0,PI2);c.fill();c.restore();}
  else if(p.type==='ghost'&&p.ex){c.globalAlpha=a*.7;drawUnitBody(c,p.ex,p.x,p.y,true);}}c.globalAlpha=1;}
function drawPartsHigh(c){c.globalCompositeOperation='lighter';for(const p of parts){const a=p.life/p.max;
  switch(p.type){
  case'fire':drawGlow(c,p.x,p.y,p.size*(.6+a*.6),p.col||(a>.6?'#ffe08a':a>.3?'#ff9a3a':'#c8401a'),Math.min(1,a*1.6));break;
  case'flash':drawGlow(c,p.x,p.y,p.size*(1.2-a*.4),p.col||'#ffffff',a);break;
  case'spark':c.strokeStyle=p.col||'#fff';c.globalAlpha=a;c.lineWidth=p.size;c.beginPath();c.moveTo(p.x,p.y);c.lineTo(p.x-p.vx*.04,p.y-p.vy*.04);c.stroke();break;
  case'line':{c.strokeStyle=p.col;c.globalAlpha=a*.8;c.lineWidth=2;const l=hyp(p.ex.dx,p.ex.dy)||1,ux=p.ex.dx/l,uy=p.ex.dy/l;c.beginPath();
    for(let k=-2;k<=2;k++){c.moveTo(p.x+uy*k*6,p.y-ux*k*6);c.lineTo(p.x+uy*k*6-ux*40,p.y-ux*k*6-uy*40);}c.stroke();break;}
  case'bolt':{c.strokeStyle=p.col;c.globalAlpha=a;c.lineWidth=2;c.beginPath();let x=p.x,y=p.y;c.moveTo(x,y);for(let k=0;k<4;k++){x+=rr(-8,8);y-=rr(4,8);c.lineTo(x,y);}c.stroke();break;}
  }}c.globalAlpha=1;c.globalCompositeOperation='source-over';
  for(const p of parts){if(p.type!=='ring')continue;const a=p.life/p.max;c.globalAlpha=a;c.strokeStyle=p.col||'#fff';c.lineWidth=2+a*4;c.beginPath();c.ellipse(p.x,p.y,p.size*(1.1-a)+4,(p.size*(1.1-a)+4)*.6,0,0,PI2);c.stroke();}c.globalAlpha=1;}
function drawFx(c){for(const f of fxs){const p=f.t/f.dur;
  if(f.type==='beam'){const ext=clamp(f.t/.14,0,1),fade=p>.7?1-(p-.7)/.3:1,w=f.w*fade*(1+Math.sin(f.t*60)*.08);
    const x2=lerp(f.x1,f.x2,ext),y2=lerp(f.y1,f.y2,ext),y1=f.y1-f.z,y2z=y2-f.z*(1-ext*.5);
    c.globalCompositeOperation='lighter';c.lineCap='round';
    c.strokeStyle=f.col+'55';c.lineWidth=w*2;c.beginPath();c.moveTo(f.x1,y1);c.lineTo(x2,y2z);c.stroke();
    c.strokeStyle=f.col;c.lineWidth=w;c.stroke();c.strokeStyle='#ffffff';c.lineWidth=w*.42;c.stroke();
    if(f.spiral){c.strokeStyle='#c050ff';c.lineWidth=3;c.beginPath();const L=hyp(x2-f.x1,y2z-y1)||1,ux=(x2-f.x1)/L,uy=(y2z-y1)/L;
      for(let s=0;s<=L;s+=6){const o=Math.sin(s/9-f.t*30)*w*1.1;const X=f.x1+ux*s-uy*o,Y=y1+uy*s+ux*o;s?c.lineTo(X,Y):c.moveTo(X,Y);}c.stroke();}
    drawGlow(c,f.x1,y1,w*2.4,f.col,fade);drawGlow(c,x2,y2z,w*2.8*ext,f.col,fade);c.globalCompositeOperation='source-over';}
  else if(f.type==='arc'&&f.t>0){const a=1-f.t/f.dur,r=f.r+f.t*420;c.globalAlpha=a;c.strokeStyle='#ffffff';c.lineWidth=3+a*5;
    c.beginPath();c.ellipse(f.x,f.y-8,r,r*.7,0,f.a-f.spread,f.a+f.spread);c.stroke();c.strokeStyle=f.col;c.lineWidth=2;c.stroke();c.globalAlpha=1;}
  else if(f.type==='ice'&&f.t>0){const g=Math.min(1,f.t/.15),a=p>.85?1-(p-.85)/.15:1,s=f.s*g;c.globalAlpha=a*.92;c.save();c.translate(f.x,f.y);c.rotate(f.rot);
    c.fillStyle='rgba(0,30,40,.25)';c.beginPath();c.ellipse(4,2,s*.7,s*.3,0,0,PI2);c.fill();
    const gr=c.createLinearGradient(-s*.4,-s*1.4,s*.4,0);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,'#bff4ff');gr.addColorStop(1,'#5fb8e0');c.fillStyle=gr;
    c.beginPath();c.moveTo(-s*.45,0);c.lineTo(-s*.15,-s*1.5);c.lineTo(s*.2,-s*.9);c.lineTo(s*.5,0);c.closePath();c.fill();c.strokeStyle='#2a6a8a';c.lineWidth=1;c.stroke();
    c.restore();c.globalAlpha=1;}}}

// ===== Character sprites (cel-shaded chibi, 3/4 view) =====
const OUT='#17141f';
const LOOK={
  disciple:{skin:'#f3c9a0',hair:'bald',gi:'#ff8a1f',gi2:'#1f4fb0',boots:'#1f4fb0',arms:'skin'},
  zwar:{skin:'#efc29a',hair:'yamcha',hc:'#191920',gi:'#ff8a1f',gi2:'#1f4fb0',boots:'#1f4fb0',arms:'skin'},
  goku:{skin:'#f3c9a0',hair:'goku',hc:'#16161e',gi:'#ff7b14',gi2:'#1d4fbf',boots:'#1d4fbf',arms:'skin',wrist:'#1d4fbf'},
  vegeta:{skin:'#efc29a',hair:'vegeta',hc:'#16161e',gi:'#2b46b8',gi2:'#f4f4f4',boots:'#f4f4f4',arms:'gi',armor:'#f6f6f2',gloves:'#f4f4f4'},
  piccolo:{skin:'#63c04c',hair:'piccolo',gi:'#6a2c8c',gi2:'#3a8fd6',boots:'#8a4a2a',arms:'skin',cape:'#f2f2ee'},
  gohan:{skin:'#f3c9a0',hair:'gohan',hc:'#16161e',gi:'#5a2a8c',gi2:'#d0342c',boots:'#d0342c',arms:'skin',wrist:'#d0342c'},
  sidekick:{skin:'#f0c39a',hair:'short',hc:'#5a3a22',gi:'#3a4a6a',gi2:'#e8c33a',boots:'#22283a',arms:'gi',mask:true},
  student:{skin:'#f0c39a',hair:'short',hc:'#333',gi:'#333',gi2:'#222',boots:'#222',arms:'gi'},
  allmight:{skin:'#f3c9a0',hair:'allmight',hc:'#ffd93a',gi:'#2a5ad6',gi2:'#d8343f',boots:'#d8343f',arms:'gi',big:true,gloves:'#f4f4f4'},
  deku:{skin:'#f3c9a0',hair:'deku',hc:'#1d4f34',gi:'#2f9a5e',gi2:'#1d3a2a',boots:'#d8343f',arms:'gi',gloves:'#f0f0f0'},
  bakugo:{skin:'#f3c9a0',hair:'bakugo',hc:'#f1e6a4',gi:'#26262e',gi2:'#ff8a1f',boots:'#26262e',arms:'gi',gaunt:'#8f969e'},
  todoroki:{skin:'#f3c9a0',hair:'todoroki',hc:'#f4f4f4',hc2:'#d8343f',gi:'#2c3e7a',gi2:'#e8e8e8',boots:'#2c3e7a',arms:'gi'},
  krilin:{skin:'#f3c9a0',hair:'bald',gi:'#ff7b14',gi2:'#1d4fbf',boots:'#1d4fbf',arms:'skin',wrist:'#1d4fbf'},
  namek:{skin:'#63c04c',hair:'namek',gi:'#f2f2ee',gi2:'#6a2c8c',boots:'#8a4a2a',arms:'skin'},
  nurse:{skin:'#f3d4b6',hair:'nurse',hc:'#cfcfcf',gi:'#f6f6f6',gi2:'#ff7aa8',boots:'#f4f4f4',arms:'gi'},
  uraraka:{skin:'#f6cfae',hair:'uraraka',hc:'#6a3a22',gi:'#ff9ad8',gi2:'#2a2a34',boots:'#f4f4f4',arms:'gi',gloves:'#ff9ad8'},
  endeavor:{skin:'#e6b48c',hair:'endeavor',hc:'#ff6a1a',gi:'#1f2a44',gi2:'#ff7a2a',boots:'#1f2a44',arms:'gi',big:true},
};
const HAIR={
  goku:[[-5.5,1],[-8.5,-3],[-6,-4.5],[-9.5,-8],[-5,-7],[-6.5,-11.5],[-2,-7.5],[0,-12.5],[2,-7],[5.5,-10.5],[5,-5.5],[8.5,-6],[6,-2],[5.5,0],[3,-3.5],[1,-2],[-1,-3.8],[-3,-1.5]],
  gokussj:[[-5.5,1],[-7.5,-5],[-8.5,-11],[-4,-8.5],[-3.5,-16],[0,-9.5],[2,-17],[3.5,-8.5],[7.5,-13.5],[6,-4.5],[6,0],[3,-3],[1,-1.5],[-1,-3],[-3,-1]],
  vegeta:[[-5.5,0],[-6.5,-6],[-5.5,-14],[-2.5,-10],[-1,-17.5],[1,-11],[3,-16.5],[4,-9],[6.5,-12.5],[6,-4],[5.5,0],[4,-3],[2,-6],[0,-3],[-2,-4],[-4,-1]],
  gohan:[[-5.5,1],[-7.5,-4],[-6,-8],[-3,-7],[-1,-11.5],[1.5,-7.5],[4.5,-10.5],[4.5,-6],[7.5,-5],[5.5,0],[3,-3],[4,1.5],[1,-2],[-2,-2.5]],
  gohanssj:[[-5.5,1],[-7.5,-6],[-6,-12],[-2.5,-8],[-1,-15],[1.5,-8.5],[5,-14],[5,-6],[8,-7],[5.5,0],[3,-3],[4,2],[1,-2],[-2,-2.5]],
  yamcha:[[-6,4],[-7.5,-3],[-5.5,-7],[-1,-8.5],[3,-7.5],[6.5,-4],[6,-1],[3,-3.5],[0,-2],[-3,-1.5],[-4,4]],
  short:[[-5.6,0],[-6.2,-4],[-3,-7.2],[1,-7.4],[5,-5.4],[6.2,-2],[5.6,.5],[3,-3],[0,-2.6],[-3,-2.6]],
  bakugo:[[-6,2],[-9.5,-1],[-6,-4],[-9.5,-8.5],[-4,-7],[-4.5,-12.5],[-1,-8],[1,-12.5],[2.5,-7.5],[6.5,-10.5],[5,-5],[9.5,-5],[6,-1],[8,2],[5,0],[3,-3],[1,-1],[-2,-3],[-4,0]],
  uraraka:[[-6,4.5],[-7,-2],[-5,-6],[-1,-7.6],[3,-7],[6.6,-3.5],[7,4.5],[5,4.5],[5,-1],[2,-3.5],[0,-2.5],[-3,-3],[-4.5,0],[-4,4.5]],
  endeavor:[[-5.5,0],[-7,-6],[-5,-8],[-6.5,-14],[-2,-9],[-1,-16.5],[1.5,-9.5],[4,-15.5],[4.5,-8],[7.5,-11.5],[6,-3],[5.5,0],[3,-3],[0,-2.5],[-3,-2.5]],
  allmight:[[-5.5,0],[-6,-5],[-3,-7],[-6.5,-16],[-1,-8],[1,-8],[5.5,-16.5],[3,-7],[6,-4],[5.5,0],[3,-3],[0,-2],[-3,-3]],
};
function poly(c,pts,ox,oy){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(ox+p[0],oy+p[1]):c.moveTo(ox+p[0],oy+p[1]));c.closePath();}
function fo(c,col,lw){c.fillStyle=col;c.fill();c.lineWidth=lw||1;c.strokeStyle=OUT;c.stroke();}
function limb(c,x1,y1,x2,y2,w,col){c.lineCap='round';c.strokeStyle=OUT;c.lineWidth=w+1.6;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();}
function drawFighterOld(c,x,y,L,dir,t,mv,sc,st){
  st=st||{};c.save();c.translate(x,y);c.scale(sc*dir,sc);
  const big=L.big?1.35:1,walk=mv?Math.sin(t*13):0,bob=mv?-Math.abs(Math.sin(t*13))*1.2:Math.sin(t*2.4)*.4,hy=-22*(big>1?1.08:1)+bob;
  const hc=st.ssj?'#ffe14d':L.hc,sleeve=L.arms==='gi'?L.gi:L.skin;
  if(st.aura){c.globalCompositeOperation='lighter';const ac=st.aura;for(let k=0;k<7;k++){const a=-PI/2+(k-3)*.32,fl=11+Math.sin(t*20+k*1.7)*4;
      c.fillStyle=ac+'66';c.beginPath();c.moveTo(-8*big,0);c.quadraticCurveTo(Math.cos(a)*fl*1.2,-14+Math.sin(a)*fl*1.6,Math.cos(a)*4,-30*big-fl*.4+Math.sin(t*25+k)*3);c.quadraticCurveTo(Math.cos(a)*fl,-10,8*big,0);c.fill();}
    c.globalCompositeOperation='source-over';}
  if(L.cape){c.beginPath();c.moveTo(-5,-17+bob);c.quadraticCurveTo(-11,-6,-9+walk,1);c.lineTo(5,1);c.lineTo(4,-17+bob);c.closePath();fo(c,L.cape);}
  // legs
  const lw=3.4*big;limb(c,-2*big,-8+bob,-2*big-walk*2.5,-1.5,lw,L.gi2==='#f4f4f4'||L.arms==='gi'?L.gi:L.gi);limb(c,2*big,-8+bob,2*big+walk*2.5,-1.5,lw,L.gi);
  c.fillStyle=L.boots;c.strokeStyle=OUT;c.lineWidth=1;
  for(const s of[-1,1]){const bx=s*2*big+s*walk*2.5;c.beginPath();c.ellipse(bx+.8,-1.2,2.4*big,1.7,0,0,PI2);c.fill();c.stroke();}
  // back arm
  const atk=st.atk>0,cast=st.cast;
  if(!cast)limb(c,-3.5*big,-15*big+bob,-4.5*big-walk*1.5,-9+bob,2.8*big,sleeve);
  // torso
  c.beginPath();c.roundRect(-5*big,-18*big+bob,10*big,11*big,3*big);fo(c,L.gi);
  if(L.armor){c.beginPath();c.roundRect(-4.5,-17.5+bob,9,7,2);fo(c,L.armor);c.fillStyle='#e3c13b';c.fillRect(-5,-17.6+bob,3,2);c.fillRect(2,-17.6+bob,3,2);}
  if(L.hair==='goku'||L.hair==='gohan'){c.fillStyle=L.gi2;c.beginPath();c.moveTo(-1.5,-18+bob);c.lineTo(1.5,-18+bob);c.lineTo(0,-14.5+bob);c.fill();}
  if(L.hair==='allmight'){c.fillStyle='#f4f4f4';c.fillRect(-5*big,-13*big+bob,10*big,2);c.fillStyle='#ffd23a';c.fillRect(-1.5,-17*big+bob,3,3);}
  if(L.hair==='deku'){c.strokeStyle='#e8e8e0';c.lineWidth=1.2;c.beginPath();c.moveTo(-4,-17+bob);c.lineTo(4,-12+bob);c.stroke();}
  if(L.hair==='bakugo'){c.strokeStyle='#ff8a1f';c.lineWidth=1.6;c.beginPath();c.moveTo(-4,-16+bob);c.lineTo(0,-12+bob);c.lineTo(4,-16+bob);c.stroke();}
  if(L.hair==='todoroki'){c.fillStyle='#e8e8e8';c.fillRect(-5,-18+bob,2.5,11);}
  c.fillStyle=L.gi2;c.fillRect(-5*big,-9*big+bob,10*big,2*big);
  // front arm
  let ax=4.5*big+walk*1.5,ay=-9+bob;if(atk){ax=10*big;ay=-15*big+bob;}if(cast){ax=10*big;ay=-14*big+bob;}
  limb(c,3.5*big,-15*big+bob,ax,ay,2.8*big,sleeve);
  if(cast)limb(c,-2*big,-15*big+bob,ax-1,ay+2,2.8*big,sleeve);
  const hand=L.gaunt||L.gloves||(L.wrist?L.wrist:L.skin);c.beginPath();c.arc(ax,ay,(L.gaunt?2.8:1.8)*big,0,PI2);fo(c,hand);
  // head
  const hx=.5;
  if(L.hair==='yamcha'){poly(c,[[-6,4],[-7,-2],[-3,-1],[-4,4]],hx,hy);fo(c,hc);}
  c.beginPath();c.arc(hx,hy,5.6,0,PI2);fo(c,L.skin);
  if(L.hair==='piccolo'||L.hair==='namek'){c.beginPath();c.moveTo(hx-5,hy);c.lineTo(hx-9,hy-3);c.lineTo(hx-5,hy-2.5);fo(c,L.skin);}
  // face
  if(L.mask){c.fillStyle='#22283a';c.fillRect(hx-1,hy-2.5,7,2.5);}
  if(L.hair==='allmight'){c.fillStyle='#1f2a50';c.fillRect(hx,hy-2.6,5.4,2.6);c.fillStyle='#7fd0ff';c.fillRect(hx+1.5,hy-1.8,1,1);c.fillRect(hx+4,hy-1.8,1,1);
    c.fillStyle='#fff';c.fillRect(hx+.5,hy+1.8,5,1.3);}
  else{c.fillStyle=st.ssj?'#1f8a8a':'#1a1622';c.fillRect(hx+1.6,hy-2.4,1.3,2.4);c.fillRect(hx+4.1,hy-2.4,1.2,2.4);c.fillStyle='#fff';c.fillRect(hx+1.6,hy-2.4,.6,.7);c.fillRect(hx+4.1,hy-2.4,.6,.7);
    c.strokeStyle='#5a2a2a';c.lineWidth=.7;c.beginPath();c.moveTo(hx+2.5,hy+2.4);c.lineTo(hx+4.4,hy+2.1);c.stroke();
    if(L.hair==='vegeta'||L.hair==='bakugo'||st.ssj){c.strokeStyle=OUT;c.lineWidth=.9;c.beginPath();c.moveTo(hx+1.2,hy-3.4);c.lineTo(hx+3,hy-2.7);c.moveTo(hx+5.6,hy-3.4);c.lineTo(hx+4.1,hy-2.7);c.stroke();}}
  if(L.hair==='todoroki'){c.fillStyle='rgba(180,40,40,.55)';c.beginPath();c.ellipse(hx+4.4,hy-1.4,1.8,2,0,0,PI2);c.fill();}
  if(L.hair==='uraraka'){c.fillStyle='rgba(255,110,140,.6)';c.fillRect(hx+1,hy+.8,1.6,1);c.fillRect(hx+4,hy+.8,1.6,1);}
  if(L.hair==='endeavor'){c.globalCompositeOperation='lighter';drawGlow(c,hx+2,hy+4,8,'#ff6a1a',.8);c.globalCompositeOperation='source-over';poly(c,[[0,2],[2,6],[4,3.5],[6,6.5],[6.5,1.5]],hx,hy);fo(c,'#ff7a2a');}
  if(L.hair==='deku'){c.fillStyle='#b07a50';c.fillRect(hx+1.5,hy+.6,.6,.6);c.fillRect(hx+4.2,hy+.6,.6,.6);}
  // hair
  const H=L.hair;
  if(H==='bald'){c.fillStyle='#7a4a3a';c.fillRect(hx+.5,hy-4.5,.9,.9);c.fillRect(hx+2.5,hy-4.8,.9,.9);}
  else if(H==='piccolo'){c.beginPath();c.ellipse(hx-.5,hy-4,6.4,4.6,0,PI,PI2);c.lineTo(hx+6,hy-2.5);c.lineTo(hx-7,hy-2.5);c.closePath();fo(c,'#f4f4f0');
    c.fillStyle='#7a3aa0';c.fillRect(hx-6.4,hy-3.8,12.8,1.6);c.strokeStyle=OUT;c.lineWidth=1.3;c.beginPath();c.moveTo(hx+2,hy-4);c.lineTo(hx+4,hy-9);c.moveTo(hx+3.5,hy-4);c.lineTo(hx+6.5,hy-8);c.stroke();}
  else if(H==='namek'){c.strokeStyle=OUT;c.lineWidth=1.3;c.beginPath();c.moveTo(hx+1,hy-5);c.quadraticCurveTo(hx+2,hy-10,hx+4,hy-11);c.moveTo(hx+3,hy-5);c.quadraticCurveTo(hx+5,hy-9,hx+7,hy-9);c.stroke();
    c.fillStyle='#4a9a3a';c.beginPath();c.arc(hx+4,hy-11,1.1,0,PI2);c.arc(hx+7,hy-9,1.1,0,PI2);c.fill();}
  else if(H==='nurse'){c.beginPath();c.arc(hx-1,hy-7.5,3.4,0,PI2);fo(c,hc);poly(c,HAIR.short,hx,hy);fo(c,hc);c.fillStyle='#ff7aa8';c.fillRect(hx-3,hy-6,4,1.5);}
  else if(H==='deku'){const bumps=[[-4.5,-2.5,3],[-2.5,-5.8,3],[.8,-6.6,3.1],[4,-5,2.8],[5.6,-1.8,2.3],[-5.6,.6,2.2]];
    for(const[a,b,r]of bumps){c.beginPath();c.arc(hx+a,hy+b,r+.9,0,PI2);c.fillStyle=OUT;c.fill();}for(const[a,b,r]of bumps){c.beginPath();c.arc(hx+a,hy+b,r,0,PI2);c.fillStyle=hc;c.fill();}
    c.fillStyle='#2f7a50';c.beginPath();c.arc(hx-1,hy-6.5,1.2,0,PI2);c.fill();}
  else if(H==='todoroki'){poly(c,HAIR.short,hx,hy);fo(c,'#f4f4f4');c.save();poly(c,HAIR.short,hx,hy);c.clip();c.fillStyle=L.hc2;c.fillRect(hx+.5,hy-9,9,12);c.restore();poly(c,HAIR.short,hx,hy);c.strokeStyle=OUT;c.lineWidth=1;c.stroke();}
  else{let k=H;if(st.ssj&&(H==='goku'||H==='gohan'))k=H+'ssj';const pts=HAIR[k]||HAIR.short;
    if(st.ssj||H==='endeavor'){c.globalCompositeOperation='lighter';drawGlow(c,hx,hy-6,16,H==='endeavor'?'#ff6a1a':'#ffe14d',.6);c.globalCompositeOperation='source-over';}
    poly(c,pts,hx,hy);fo(c,hc);
    c.save();poly(c,pts,hx,hy);c.clip();c.fillStyle=st.ssj?'#fff8b0':'rgba(255,255,255,.18)';c.beginPath();c.ellipse(hx-2,hy-7,3,1.6,-.4,0,PI2);c.fill();c.restore();}
  if(st.frozen){c.fillStyle='rgba(190,240,255,.45)';c.strokeStyle='#e8fbff';c.lineWidth=1.2;c.beginPath();c.roundRect(-8*big,-32*big,16*big,33*big,3);c.fill();c.stroke();}
  c.restore();}

// ===== Vehicles =====
function treads(c,len,w,t,col){c.fillStyle=col||'#2a2a2e';c.strokeStyle=OUT;c.lineWidth=1;
  for(const s of[-1,1]){c.beginPath();c.roundRect(-len/2,s*w/2-3.5,len,7,3);c.fill();c.stroke();c.strokeStyle='#55555c';c.lineWidth=1;c.beginPath();
    for(let k=-len/2+((t*30)%4);k<len/2;k+=4){c.moveTo(k,s*w/2-3);c.lineTo(k,s*w/2+3);}c.stroke();c.strokeStyle=OUT;}}
function drawVehicle(c,u,x,y,ghost){const fac=u.fac,t=u.moving?u.anim:0;if(fac==='aot'&&!u.fly){c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x+4,y+4,u.r*1.2,u.r*.7,0,0,PI2);c.fill();drawAotVehicle(c,u,x,y,ghost);return;}c.save();c.translate(x,y);
  if(u.fly){c.translate(0,-((u.z||16)+Math.sin(u.anim*3)*2));c.rotate(u.ang);c.scale(1,1-Math.min(.45,Math.abs(u.bank||0)));
    if(fac==='dbz'){c.beginPath();c.moveTo(-4,-15);c.lineTo(4,-3);c.lineTo(4,3);c.lineTo(-4,15);c.lineTo(-8,15);c.lineTo(-4,3);c.lineTo(-4,-3);c.lineTo(-8,-15);c.closePath();fo(c,'#e9edf2');
      c.beginPath();c.roundRect(-14,-4.5,30,9,4.5);fo(c,'#f6f8fb');c.fillStyle='#ff8a1f';c.fillRect(-12,-1,22,2);c.beginPath();c.ellipse(8,0,4,3,0,0,PI2);fo(c,'#6fc8ff');
      c.beginPath();c.moveTo(-13,-2);c.lineTo(-18,-7);c.lineTo(-16,0);c.lineTo(-18,7);c.lineTo(-13,2);fo(c,'#e9edf2');
      if(!ghost){c.globalCompositeOperation='lighter';drawGlow(c,-16,0,7+Math.sin(u.anim*40)*2,'#7fd6ff',.8);c.globalCompositeOperation='source-over';}}
    else{for(const[a,b]of[[-9,-9],[9,-9],[-9,9],[9,9]]){c.strokeStyle=OUT;c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(a,b);c.stroke();
        c.fillStyle='rgba(200,220,230,.35)';c.beginPath();c.arc(a,b,6.5,0,PI2);c.fill();c.strokeStyle='rgba(40,40,40,.6)';c.lineWidth=1;c.beginPath();const ra=u.anim*50;c.moveTo(a+Math.cos(ra)*6,b+Math.sin(ra)*6);c.lineTo(a-Math.cos(ra)*6,b-Math.sin(ra)*6);c.stroke();}
      c.beginPath();c.roundRect(-6,-6,12,12,3);fo(c,'#f2c230');c.fillStyle='#d8343f';c.beginPath();c.arc(4,0,2.4,0,PI2);c.fill();c.fillStyle='#2fd27a';c.fillRect(-5,-1,5,2);}
    c.restore();return;}
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(4,4,u.r*1.15,u.r*.8,0,0,PI2);c.fill();if(u.moving)c.translate(0,Math.sin((u.anim||0)*22)*.8);
  c.rotate(u.ang);
  if(u.D.harv){treads(c,32,20,t);c.beginPath();c.roundRect(-16,-9,22,18,3);fo(c,fac==='dbz'?'#e8ecf2':'#7a8a7a');
      const fl=u.load/CAP;if(fl>0){c.fillStyle='#ffc93a';c.fillRect(-14,-7,20*fl,14);c.fillStyle='#fff3a0';for(let k=0;k<fl*5;k++)c.fillRect(-13+k*4,-5+(k%2)*5,2,3);}
      c.beginPath();c.roundRect(6,-8,10,16,3);fo(c,FAC[fac].col);c.fillStyle='#9fd8ff';c.fillRect(12,-6,3,12);
      if(u.hs==='mine'&&!ghost){c.strokeStyle='#ffd34a';c.lineWidth=2;c.beginPath();c.arc(18,0,4+Math.sin(u.anim*30)*1.5,0,PI2);c.stroke();}}
  else if(fac==='dbz'){treads(c,30,22,t);c.beginPath();c.roundRect(-15,-10,30,20,8);fo(c,'#eef1f5');c.fillStyle='#f2b632';c.fillRect(-15,-2,30,4);
      c.fillStyle='#1f6fd1';c.fillRect(8,-8,4,16);c.restore();c.save();c.translate(x,y);c.rotate(u.tang||u.ang);c.translate(-(u.recoil||0)*4,0);
      c.beginPath();c.roundRect(4,-2.2,16,4.4,2);fo(c,'#7a808a');c.beginPath();c.arc(0,0,7.5,0,PI2);fo(c,'#f7f9fb');c.fillStyle='#ff8a1f';c.beginPath();c.arc(0,0,3,0,PI2);c.fill();}
  else{treads(c,30,26,t,'#33363a');c.beginPath();c.roundRect(-14,-11,26,22,3);fo(c,'#6f8a6a');c.fillStyle='#4f6a4c';c.fillRect(-14,-11,8,22);
      c.fillStyle='#d8c04a';c.fillRect(-2,-11,3,22);c.restore();c.save();c.translate(x,y);c.rotate(u.tang||u.ang);c.translate(-(u.recoil||0)*4,0);
      for(const s of[-1,1]){c.beginPath();c.roundRect(2,s*9-2.5,15,5,2);fo(c,'#555a5e');}
      c.beginPath();c.roundRect(-6,-7,13,14,3);fo(c,'#88a083');c.fillStyle='#ff3a2a';c.beginPath();c.arc(4,0,2.6,0,PI2);c.fill();
      c.globalCompositeOperation='lighter';drawGlow(c,4,0,8,'#ff3a2a',.7);c.globalCompositeOperation='source-over';}
  c.restore();}

// ===== Unit drawing dispatch =====
function unitLook(u){let L=LOOK[u.D.look];if(u.D.look==='student'){const v=STUDENT[u.v];L=Object.assign({},L,{hc:v.hc,gi:v.gi,skin:v.skin||L.skin});}return L;}
function drawUnitBody(c,u,x,y,ghost){if(u.D.mech){drawMech(c,u,x,y,ghost);return;}if(u.D.heavy){drawHeavyCannon(c,u,x,y);return;}if(u.D.veh){drawVehicle(c,u,x,y,ghost);return;}
  if(u.D.tsc){drawFighter(c,x,y,LOOK[u.D.look],u.face,u.anim,u.moving,u.D.tsc,{atk:u.atk,atkN:u.atkN||0,melee:true});return;}
  if(u.form){const F=FORMS[u.form];drawFighter(c,x,y,LOOK[F.look],u.face,u.anim,u.moving,F.sc,{atk:u.atk});return;}
  const sc=u.D.hero?(u.key==='allmight'?1.6:1.52):1.28,lift=u.fly?(u.z+Math.sin(u.anim*3)*2):(u.z||0);
  const aura=u.harden>0?'#ff5a3a':u.rally>0?'#6fa4ff':u.casting?u.D.ab.col:u.ui>0?'#dfe8ff':u.buff>0?'#ffe14d':u.ssj?(u.key==='black'?'#ff5aa8':u.sblue?'#4ad8ff':'#ffd23a'):(u.fly&&u.moving&&u.D.hero?'#ffffff':null);
  drawFighter(c,x,y-lift,unitLook(u),u.face,u.anim,u.moving&&!u.fly,sc,{flyMove:u.fly&&u.moving,stance:!!u.target&&!u.moving,atkN:u.atkN||0,melee:!!(u.form?u.FD:u.D).melee,blue:!!(u.ssj&&u.sblue),ui:u.ui>0,ssj:u.ssj||u.buff>0,aura:ghost?null:aura,atk:u.atk,cast:!!u.casting,frozen:u.freeze>0});if(u.D.odm&&!ghost)drawODM(c,u,x,y);if(u.bubble>0&&!ghost){c.strokeStyle='rgba(125,255,160,.7)';c.fillStyle='rgba(125,255,160,.12)';c.lineWidth=1.5;c.beginPath();c.ellipse(x,y-lift-14,u.r+10,u.r+16,0,0,PI2);c.fill();c.stroke();}if(u.erased>0&&!ghost){c.fillStyle='#ff3a3a';c.font='bold 9px sans-serif';c.textAlign='center';c.fillText('✕',x,y-lift-44);}
  if(!ghost)heroFx(c,u,x,y,lift,sc);
  if(u.casting&&!ghost){const p=1-u.casting.t/u.casting.T;c.globalCompositeOperation='lighter';drawGlow(c,x+u.face*12*sc,y-lift-15,6+p*16,u.D.ab.col,1);c.globalCompositeOperation='source-over';
    if(R()<.5)part('spark',x+rr(-30,30),y-lift-15+rr(-30,30),0,0,.2,1.5,u.D.ab.col);}
  if(u.buff>0&&R()<.15)part('bolt',x+rr(-10,10),y-lift-rr(5,25),0,0,.15,1,'#cfe8ff');}
function drawUnitShadow(c,u){const s=u.fly?.75:1;c.fillStyle=u.fly?'rgba(0,0,0,.22)':'rgba(0,0,0,.3)';c.beginPath();c.ellipse(u.x+(u.fly?6:1),u.y+(u.fly?4:0),u.r*1.05*s,u.r*.45*s,0,0,PI2);c.fill();}

// ===== Buildings (oblique 2.5D, light from top-left) =====
function shade(col,f){const n=parseInt(col.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;if(f<0){r*=1+f;g*=1+f;b*=1+f;}else{r+=(255-r)*f;g+=(255-g)*f;b+=(255-b)*f;}return`rgb(${r|0},${g|0},${b|0})`;}
function prism(c,x,y,w,d,h,col){c.beginPath();c.rect(x,y+d-h,w,h);fo(c,shade(col,-.28));const g=c.createLinearGradient(x,y-h,x+w,y-h+d);g.addColorStop(0,shade(col,.15));g.addColorStop(1,col);
  c.beginPath();c.rect(x,y-h,w,d);c.fillStyle=g;c.fill();c.lineWidth=1;c.strokeStyle=OUT;c.stroke();}
function cyl(c,cx,by,rx,ry,h,col){const g=c.createLinearGradient(cx-rx,0,cx+rx,0);g.addColorStop(0,shade(col,.25));g.addColorStop(.6,col);g.addColorStop(1,shade(col,-.35));
  c.beginPath();c.moveTo(cx-rx,by-h);c.lineTo(cx-rx,by);c.ellipse(cx,by,rx,ry,0,PI,0,true);c.lineTo(cx+rx,by-h);c.closePath();c.fillStyle=g;c.fill();c.lineWidth=1;c.strokeStyle=OUT;c.stroke();
  c.beginPath();c.ellipse(cx,by-h,rx,ry,0,0,PI2);fo(c,shade(col,.12));}
function dome(c,cx,by,rx,ry,h,col){const g=c.createRadialGradient(cx-rx*.35,by-h*.75,2,cx,by-h*.3,rx*1.2);g.addColorStop(0,'#ffffff');g.addColorStop(.35,col);g.addColorStop(1,shade(col,-.4));
  c.beginPath();c.ellipse(cx,by,rx,ry,0,0,PI);c.ellipse(cx,by,rx,h,0,PI,PI2);c.closePath();c.fillStyle=g;c.fill();c.lineWidth=1.2;c.strokeStyle=OUT;c.stroke();}
function pad(c,x,y,w,h,fc){c.beginPath();c.roundRect(x,y,w,h,4);fo(c,'#8d9298');c.fillStyle='#a3a8ae';c.fillRect(x+3,y+3,w-6,3);
  c.strokeStyle='rgba(40,44,50,.35)';c.lineWidth=1;c.beginPath();for(let k=x+16;k<x+w-4;k+=16){c.moveTo(k,y+3);c.lineTo(k,y+h-3);}c.stroke();
  c.fillStyle=fc;c.fillRect(x+4,y+h-6,10,3);c.fillRect(x+w-14,y+h-6,10,3);}
function hazard(c,x,y,w,h){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.fillStyle='#f2c230';c.fillRect(x,y,w,h);c.fillStyle='#222';for(let k=-h;k<w;k+=8){c.beginPath();c.moveTo(x+k,y+h);c.lineTo(x+k+4,y+h);c.lineTo(x+k+4+h,y);c.lineTo(x+k+h,y);c.fill();}c.restore();c.strokeStyle=OUT;c.lineWidth=1;c.strokeRect(x,y,w,h);}
function windows(c,x,y,w,h,cols,rows,col){const cw=w/cols,rh=h/rows;for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){c.fillStyle=(i+j)%3===0?shade(col,.35):col;c.fillRect(x+i*cw+1,y+j*rh+1,cw-2,rh-2);}}
function txt(c,s,x,y,size,col,stroke){c.font=`${size}px Bangers, Impact, sans-serif`;c.textAlign='center';c.textBaseline='middle';if(stroke){c.lineWidth=3;c.strokeStyle=OUT;c.strokeText(s,x,y);}c.fillStyle=col;c.fillText(s,x,y);}
function drawBuilding(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,fac=b.fac,a=b.anim,fc=FAC[fac].col;
  c.save();
  let drawBody=true;if(b.rise<1&&!ghost)drawBody=buildPre(c,b);
  if(drawBody){
  {const BHh=bH(b),sx=BHh*.62,sy=BHh*.22;c.fillStyle='rgba(8,14,6,.34)';c.beginPath();c.moveTo(x0+W-2,y0+4);c.lineTo(x0+W+sx,y0+4+sy);c.lineTo(x0+W+sx,y0+H+sy);c.lineTo(x0+sx,y0+H+sy);c.lineTo(x0+2,y0+H-2);c.lineTo(x0+W-2,y0+H-2);c.closePath();c.fill();}
  drawB3(c,b,ghost);}
  c.restore();
  if(!ghost&&b.hp<b.max*.6&&b.rise>=1){c.strokeStyle='rgba(20,16,14,.8)';c.lineWidth=1.3;const s=b.id*7+3,n=b.hp<b.max*.3?6:3;
    for(let k=0;k<n;k++){let x=x0+8+((s*13+k*37)%(W-16)),y=y0+((s*7+k*23)%Math.max(8,H-20))-6;c.beginPath();c.moveTo(x,y);for(let j=0;j<4;j++){x+=((s+k*j)%7)-3;y+=3+((s*j+k)%4);c.lineTo(x,y);}c.stroke();}
    if(b.hp<b.max*.3){c.fillStyle='rgba(20,14,10,.35)';c.beginPath();c.ellipse(x0+W*.3+(s%20),y0+H*.4,10,6,0,0,PI2);c.fill();}}
  if(!ghost&&b.rise<1)buildPost(c,b);
  if(!ghost&&b.repairing){const bx=b.x,by=b.ty*TILE-30+Math.sin(b.anim*5)*2;c.fillStyle='rgba(10,20,14,.75)';c.beginPath();c.arc(bx,by,9,0,PI2);c.fill();c.strokeStyle='#7dffa0';c.lineWidth=2;c.stroke();
    c.save();c.translate(bx,by);c.rotate(.7+Math.sin(b.anim*6)*.3);c.fillStyle='#7dffa0';c.fillRect(-1.2,-5,2.4,9);c.beginPath();c.arc(0,-5,3,PI*1.1,PI*1.9,true);c.lineTo(0,-5);c.fill();c.restore();}
}
