// ===== Detailed character renderer (cel-shaded, anime faces, per-hero costumes) =====
for(const k in LOOK)LOOK[k].k=k;
Object.assign(LOOK.goku,{eye:'#1b1822',boots:'#2a50b8',boot2:'#d8343f',emblem:true,under:'#1d4fbf'});
Object.assign(LOOK.gohan,{eye:'#1b1822',emblem:true,under:'#2a2a3a',wrist:'#d0342c'});
Object.assign(LOOK.krilin,{eye:'#1b1822',emblem:true,under:'#1d4fbf'});
Object.assign(LOOK.disciple,{eye:'#1b1822',emblem:true,under:'#1f4fb0'});
Object.assign(LOOK.zwar,{eye:'#1b1822',emblem:true,under:'#1f4fb0',wrist:'#1f4fb0'});
Object.assign(LOOK.vegeta,{eye:'#1b1822',pants:'#2b46b8',boots:'#f4f4f4',boot2:'#e3c13b'});
Object.assign(LOOK.piccolo,{eye:'#1b1822',pants:'#6a2c8c',boots:'#7a3a1a'});
Object.assign(LOOK.namek,{eye:'#1b1822'});
Object.assign(LOOK.allmight,{eye:'#6fd8ff',pants:'#2a5ad6',gloves:'#f4f4f4',boots:'#d8343f'});
Object.assign(LOOK.deku,{eye:'#2f9a5e',pants:'#2f9a5e',gloves:'#f0f0f0',boots:'#d8343f'});
Object.assign(LOOK.bakugo,{eye:'#d8343f',pants:'#3a4a3a',boots:'#26262e'});
Object.assign(LOOK.todoroki,{eye:'#6a8ac8',eye2:'#9aa0a8',pants:'#2c3e7a'});
Object.assign(LOOK.uraraka,{eye:'#6a3a22',pants:'#26262e',boots:'#f4f4f4',gloves:'#ff9ad8'});
Object.assign(LOOK.endeavor,{eye:'#4ab8ff',pants:'#1f2a44',boots:'#1f2a44'});
HAIR.armin=null;Object.assign(LOOK.sidekick,{eye:'#2a2230',cape:'#c8343f'});Object.assign(LOOK.nurse,{eye:'#2a2230'});Object.assign(LOOK.student,{eye:'#2a2230'});
function hex7(c){return c&&c.length===4?'#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c;}
function cel(c,col,x0,y0,x1,y1,e){col=hex7(col);e=e||.56;const g=c.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,shade(col,.16));g.addColorStop(e-.02,col);g.addColorStop(e,shade(col,-.24));g.addColorStop(1,shade(col,-.32));return g;}
function seg(c,pts,w,col){c.lineCap='round';c.lineJoin='round';c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.strokeStyle=OUT;c.lineWidth=w+1.7;c.stroke();c.strokeStyle=col;c.lineWidth=w;c.stroke();
  c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=w*.3;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0]-w*.18,p[1]-w*.18):c.moveTo(p[0]-w*.18,p[1]-w*.18));c.stroke();}
function eye(c,x,y,iris,angry,far){const h=angry?1.6:2.05,w=1.38,ir=hex7(iris||'#2a2230');
  c.fillStyle='#fff';c.beginPath();c.ellipse(x,y,w,h,0,0,PI2);c.fill();
  const g=c.createLinearGradient(0,y-h,0,y+h);g.addColorStop(0,shade(ir,-.5));g.addColorStop(.5,ir);g.addColorStop(1,shade(ir,.4));
  c.fillStyle=g;c.beginPath();c.ellipse(x+.25,y+.12,1.02,h*.86,0,0,PI2);c.fill();c.fillStyle='#0b0810';c.beginPath();c.ellipse(x+.3,y+.25,.46,h*.46,0,0,PI2);c.fill();
  c.fillStyle='#fff';c.beginPath();c.ellipse(x-.15,y-h*.42,.44,.58,-.3,0,PI2);c.fill();c.fillStyle='rgba(255,255,255,.8)';c.beginPath();c.arc(x+.62,y+h*.42,.24,0,PI2);c.fill();
  c.strokeStyle='#120e16';c.lineCap='round';c.lineWidth=1.05;c.beginPath();
  if(angry){if(far){c.moveTo(x-1.5,y-h*.5);c.lineTo(x+1.5,y-h*.95);}else{c.moveTo(x-1.5,y-h*.95);c.lineTo(x+1.5,y-h*.5);}}else{c.moveTo(x-1.5,y-h*.62);c.quadraticCurveTo(x,y-h*1.16,x+1.5,y-h*.72);}c.stroke();
  c.lineWidth=.6;c.beginPath();c.moveTo(x+(far?-1.45:1.45),y-h*.7);c.lineTo(x+(far?-2.15:2.15),y-h*1);c.stroke();
  c.strokeStyle='rgba(18,14,22,.45)';c.lineWidth=.4;c.beginPath();c.moveTo(x-.8,y+h*.9);c.lineTo(x+.8,y+h*.9);c.stroke();
  c.strokeStyle='#120e16';c.lineWidth=.95;c.beginPath();if(angry){if(far){c.moveTo(x-1.6,y-h-1.5);c.lineTo(x+1.4,y-h-.3);}else{c.moveTo(x-1.4,y-h-.3);c.lineTo(x+1.6,y-h-1.5);}}
  else{c.moveTo(x-1.4,y-h-1);c.quadraticCurveTo(x,y-h-1.7,x+1.4,y-h-1.1);}c.stroke();}
function drawFighter(c,x,y,L,dir,t,mv,sc,st){
  st=st||{};const k=L.k||'';c.save();c.translate(x,y);c.scale(sc*dir,sc);
  const small=(k==='krilin'||k==='nurse')?.88:1;if(small!==1)c.scale(small,small);
  const fm=!!st.flyMove,ap=st.atk>0?clamp(st.atk/.22,0,1):0,pk=!!st.melee&&ap>0,alt=(st.atkN||0)%2===1,kick=pk&&(st.atkN||0)%3===2,stance=!!st.stance&&!mv&&!fm&&!st.cast;
  if(!st.atk&&!st.cast&&((t*.9+k.length*.37)%3.4)<.13)st=Object.assign({},st,{blink:true});
  {const lean=fm?.42:mv?.1:pk?.14*ap:0;if(lean){c.translate(0,-10);c.rotate(lean);c.translate(0,10);}if(pk)c.translate(ap*3,0);}
  const big=L.big?1.32:1,walk=mv?Math.sin(t*13):0,bob=mv?-Math.abs(Math.sin(t*13))*1.3:Math.sin(t*2.4)*.45;
  const atk=st.atk>0,cast=!!st.cast,angry=atk||cast||!!st.ssj||k==='vegeta'||k==='bakugo';
  const top=-20.5*(big>1?1.06:1)+bob,hy=top-5.6,hx=.7,bw=big;
  const ssjHair=st.ssj&&(k==='goku'||k==='gohan'||k==='vegeta'||k==='trunks'||k==='vegito'||k==='gogeta'||k==='broly');const hc=st.ui?'#dfe6f2':ssjHair?(st.blue?'#4ad8ff':'#ffe14d'):L.hc;
  const suit=L.gi,pants=L.pants||L.gi,sleeve=L.arms==='gi'?L.gi:L.skin;
  // aura
  if(st.aura){c.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const a=-PI/2+(i-3.5)*.3,fl=12+Math.sin(t*20+i*1.7)*4;
      c.fillStyle=st.aura+'5a';c.beginPath();c.moveTo(-9*bw,1);c.quadraticCurveTo(Math.cos(a)*fl*1.3,-16+Math.sin(a)*fl*1.6,Math.cos(a)*4,-36*bw-fl*.45+Math.sin(t*25+i)*3);c.quadraticCurveTo(Math.cos(a)*fl,-12,9*bw,1);c.fill();}
    c.globalCompositeOperation='source-over';}
  // capes behind
  backItems(c,L,k,bw,top,t,walk);
  if(k==='piccolo'||L.cape){const cw=k==='piccolo'?1.25:.8;c.beginPath();c.moveTo(-5.5*bw,top+1);c.quadraticCurveTo(-12*cw-walk*1.5,top+10,-10*cw-walk*2,1);c.lineTo(3,1);c.lineTo(4.5,top+1);c.closePath();
    c.fillStyle=cel(c,L.cape||'#f2f2ee',-12,top,4,0,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();}
  // back arm
  const shY=top+2.2,arm=(sx,pts,w,col,front)=>{seg(c,[[sx*bw,shY],...pts],w*bw,col);};
  if(!cast){let ex2=-6*bw,ey2=shY+4.5,hx2=-5.2*bw+walk*1.6,hy2=-10.5+bob;
    if(fm){ex2=-7*bw;ey2=shY+3;hx2=-9*bw;hy2=shY+6;}else if(pk&&alt&&!kick){ex2=4*bw;ey2=shY+2;hx2=(4+8*ap)*bw;hy2=top+3;}else if(stance){ex2=-1*bw;ey2=shY+5;hx2=3*bw;hy2=top+4;}
    arm(-4.6,[[ex2,ey2],[hx2,hy2]],2.7,shade(hex7(sleeve),-.12));hand(c,L,k,hx2,hy2,bw,true,st);}
  // legs
  const LG=[-1,1].map(s=>{let fx=s*2.3*bw+(s>0?walk*2.6:-walk*2.6),fy=-2.2;if(fm){fx=-5+s*1.6;fy=-3.6+s*.9;}else if(stance){fx=s*3.4*bw+.6;}if(kick&&s>0){fx=(2.3+8*ap)*bw;fy=-2.2-7*ap;}return[s,fx,fy];});
  for(const[s,fx,fy]of LG){const hipx=s*2.2*bw;seg(c,[[hipx,-10+bob],[hipx+(fx-hipx)*.5+.4,(-10+bob+fy)/2+.6],[fx,fy]],3.6*bw,s>0?pants:shade(hex7(pants),-.15));}
  for(const[s,fx,fy]of LG){c.beginPath();c.ellipse(fx+1,fy+.9,2.7*bw,1.9,0,0,PI2);c.fillStyle=cel(c,L.boots,fx-2,fy-1,fx+3,fy+2,.5);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
    if(L.boot2){c.fillStyle=L.boot2;c.fillRect(fx-.8,fy-.9,3.2,.9);}if(k==='deku'){c.fillStyle='#f4f4f4';c.fillRect(fx-1.4,fy+1.8,5,.8);}}
  // torso
  c.beginPath();c.moveTo(-5.6*bw,top+1.6);c.quadraticCurveTo(-5.9*bw,top,-4*bw,top-.2);c.lineTo(4*bw,top-.2);c.quadraticCurveTo(5.9*bw,top,5.6*bw,top+1.6);c.lineTo(4.4*bw,-9.4+bob);c.lineTo(-4.4*bw,-9.4+bob);c.closePath();
  c.fillStyle=cel(c,suit,-6*bw,top,6*bw,-9,.58);c.fill();c.strokeStyle=OUT;c.lineWidth=1.1;c.stroke();c.save();c.clip();c.fillStyle='rgba(0,0,0,.16)';c.fillRect(-6.5*bw,top-1,3.2*bw,24);c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=1.1;c.beginPath();c.moveTo(5.3*bw,top+1.6);c.lineTo(4.3*bw,-9.6+bob);c.stroke();c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=.5;c.beginPath();c.moveTo(-1.5*bw,top+5);c.quadraticCurveTo(0,top+6.2,1.8*bw,top+5.2);c.stroke();c.restore();
  costume(c,L,k,bw,top,bob,st);
  // belt
  if(!['vegeta','allmight','uraraka','endeavor','todoroki','titan_attack','titan_colossal'].includes(k)){c.fillStyle=L.gi2;c.fillRect(-4.6*bw,-11.4+bob,9.2*bw,2.1);c.strokeStyle=OUT;c.lineWidth=.6;c.strokeRect(-4.6*bw,-11.4+bob,9.2*bw,2.1);
    if(L.emblem||k==='piccolo'||k==='gohan'){c.fillStyle=L.gi2;c.beginPath();c.moveTo(-3.8*bw,-10+bob);c.lineTo(-5.4*bw,-6+bob+walk*.6);c.lineTo(-4.2*bw,-6+bob);c.lineTo(-3,-9.5+bob);c.fill();}}
  // front arm
  let ex,ey,hx3,hy3;if(atk&&!(pk&&alt)&&!kick){ex=(5+3*ap)*bw;ey=top+3;hx3=(6+6.5*ap)*bw;hy3=top+3;}else if(cast){ex=7.5*bw;ey=top+5;hx3=11*bw;hy3=top+5.5;}else if(fm){ex=8*bw;ey=top+2;hx3=11*bw;hy3=top+1;}else if(stance||atk){ex=6*bw;ey=shY+4;hx3=7*bw;hy3=top+3.5;}else{ex=6.2*bw;ey=shY+4.5;hx3=5.6*bw-walk*1.6;hy3=-10.5+bob;}
  arm(4.6,[[ex,ey],[hx3,hy3]],2.8,sleeve);if(cast)seg(c,[[-2*bw,shY+.5],[6*bw,top+5.5],[hx3-1.5,hy3+1.2]],2.6*bw,sleeve);
  hand(c,L,k,hx3,hy3,bw,false,st);if(k==='piccolo')shoulderPads(c,bw,top);
  // head
  c.fillStyle=cel(c,L.skin,0,0,0,0);c.fillStyle=L.skin;c.fillRect(-1.5,top-2.4,3.2,3);
  if(k==='yamcha'||k==='zwar'){poly(c,[[-6,5],[-7.5,-1],[-3,-1],[-4,5]],hx,hy);fo(c,hc);}
  c.beginPath();c.ellipse(hx,hy,6.1,6.3,0,PI*.95,PI*.05+PI2);c.quadraticCurveTo(hx+6,hy+4.5,hx+3.2,hy+6.3);c.quadraticCurveTo(hx-1.5,hy+6.8,hx-4.6,hy+3.6);c.closePath();
  c.fillStyle=cel(c,L.skin,hx+5,hy-5,hx-5,hy+6,.66);c.fill();c.strokeStyle=OUT;c.lineWidth=1.1;c.stroke();
  // ears
  if(k==='piccolo'||k==='namek'||k==='namekw'){c.beginPath();c.moveTo(hx-4.5,hy+.5);c.lineTo(hx-10,hy-3.5);c.lineTo(hx-4.8,hy-1.8);c.closePath();fo(c,L.skin,.8);}
  else{c.beginPath();c.ellipse(hx-3.4,hy+1.2,1.1,1.6,0,0,PI2);fo(c,shade(hex7(L.skin),-.08),.8);}
  face(c,L,k,hx,hy,angry,atk||cast,st,t);aotFace(c,L,k,hx,hy,t);
  if(!headX(c,L,k,hx,hy,t)&&!neuHead(c,L,k,hx,hy)&&!aotHair(c,L,k,hx,hy))hair(c,L,k,hx,hy,hc,st,t,ssjHair);moreHead(c,L,k,hx,hy);moreHead2(c,L,k,hx,hy,st);
  if(st.frozen){c.fillStyle='rgba(190,240,255,.45)';c.strokeStyle='#e8fbff';c.lineWidth=1.2;c.beginPath();c.roundRect(-9*bw,-36*bw,18*bw,37*bw,3);c.fill();c.stroke();
    c.strokeStyle='rgba(255,255,255,.7)';c.beginPath();c.moveTo(-6,-30);c.lineTo(-2,-20);c.stroke();}
  c.restore();}
function hand(c,L,k,x,y,bw,back,st){if(L.spear){c.fillStyle='#2a2a30';c.fillRect(x-1.2,y-5,2.4,6);c.fillStyle='#c8a040';c.fillRect(x-.7,y-6.4,1.4,1.6);}if(L.sc&&!back&&!L.spear&&!L.armband){c.strokeStyle='#d8dde4';c.lineWidth=.9;c.beginPath();c.moveTo(x,y);c.lineTo(x+6,y-3.5);c.stroke();}let col=L.gloves||(L.arms==='gi'?L.skin:L.skin);
  if(L.wrist){c.fillStyle=back?shade(hex7(L.wrist),-.15):L.wrist;c.beginPath();c.roundRect(x-2.1*bw,y-2.6,3.4*bw,2.2,.8);c.fill();c.strokeStyle=OUT;c.lineWidth=.6;c.stroke();}
  if(k==='bakugo'){c.beginPath();c.roundRect(x-3.4,y-3.4,6.4,6,2.2);c.fillStyle=cel(c,'#8f969e',x-3,y-3,x+3,y+3,.5);c.fill();c.strokeStyle=OUT;c.lineWidth=.9;c.stroke();
    c.fillStyle='#ff8a1f';c.fillRect(x-1,y-4.4,2,1.4);c.fillStyle='#2a2a30';c.fillRect(x-3.2,y-.5,6,1);return;}
  c.beginPath();c.arc(x,y,(k==='allmight'?2.4:1.9)*bw,0,PI2);c.fillStyle=back?shade(hex7(col),-.12):col;c.fill();c.strokeStyle=OUT;c.lineWidth=.9;c.stroke();
  if(L.q&&st.atk>0){c.globalCompositeOperation='lighter';drawGlow(c,x,y,7,L.q,.9);c.globalCompositeOperation='source-over';}}
function shoulderPads(c,bw,top){for(const s of[-1,1]){c.beginPath();c.ellipse(s*5.4*bw,top+.6,3.6,2.4,s*.25,0,PI2);c.fillStyle=cel(c,'#f2f2ee',s*5-3,top-2,s*5+3,top+3,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=.9;c.stroke();}}
function costume(c,L,k,bw,top,bob,st){const B=-9.4+bob;c.save();
  if(L.emblem){c.fillStyle=L.under;c.beginPath();c.moveTo(-2.4,top-.1);c.lineTo(2.6,top-.1);c.lineTo(.1,top+4.5);c.closePath();c.fill();
    if(k!=='zwar'&&k!=='disciple'){c.fillStyle='#fff';c.beginPath();c.arc(2.4,top+4.2,1.7,0,PI2);c.fill();c.strokeStyle=OUT;c.lineWidth=.5;c.stroke();c.strokeStyle='#1a1622';c.lineWidth=.6;c.beginPath();c.moveTo(1.6,top+3.6);c.lineTo(3.2,top+3.6);c.moveTo(2.4,top+3);c.lineTo(2.4,top+5.2);c.stroke();}}
  switch(k){
  case'vegeta':c.beginPath();c.moveTo(-5.2,top+1);c.lineTo(5.2,top+1);c.lineTo(4.4,top+7);c.quadraticCurveTo(0,top+8.4,-4.4,top+7);c.closePath();c.fillStyle=cel(c,'#f8f8f2',-5,top,5,top+8,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=.8;c.stroke();
    c.fillStyle='#e3c13b';for(const s of[-1,1]){c.beginPath();c.roundRect(s*4-1.6,top-.8,3.2,2.6,.8);c.fill();c.stroke();}c.fillStyle='#d8d8cc';c.fillRect(-4,B-1.6,8,1.2);break;
  case'allmight':c.fillStyle='#d8343f';c.beginPath();c.moveTo(-5.6*bw,top+2);c.lineTo(-3*bw,top+2);c.lineTo(-3.6*bw,B);c.lineTo(-4.4*bw,B);c.closePath();c.fill();c.beginPath();c.moveTo(5.6*bw,top+2);c.lineTo(3*bw,top+2);c.lineTo(3.6*bw,B);c.lineTo(4.4*bw,B);c.closePath();c.fill();
    c.fillStyle='#f4f4f4';c.beginPath();c.moveTo(-3.2*bw,top);c.lineTo(3.2*bw,top);c.lineTo(0,top+3.4);c.closePath();c.fill();c.fillStyle='#ffd23a';c.fillRect(-4.4*bw,B-1.8,8.8*bw,1.6);
    c.strokeStyle='rgba(0,0,40,.35)';c.lineWidth=.6;c.beginPath();c.moveTo(0,top+4);c.lineTo(0,B-2.5);c.moveTo(-2.6,top+6.5);c.quadraticCurveTo(0,top+7.6,2.6,top+6.5);c.stroke();break;
  case'deku':c.strokeStyle='#1d3a2a';c.lineWidth=1.1;c.beginPath();c.moveTo(-4.5,top+1);c.lineTo(4.5,top+6);c.moveTo(-4.4,top+4.5);c.lineTo(-1,B);c.stroke();c.fillStyle='#9aa0a8';c.beginPath();c.roundRect(-2.6,top-1.8,5.4,2.2,1);c.fill();
    c.fillStyle='#f0f0f0';c.fillRect(-4.6,B-1.4,9.2,1.4);break;
  case'bakugo':c.strokeStyle='#ff8a1f';c.lineWidth=1.6;c.beginPath();c.moveTo(-4,top+1.4);c.lineTo(3.6,B-1.5);c.moveTo(4,top+1.4);c.lineTo(-3.6,B-1.5);c.stroke();c.fillStyle='#4a4a52';c.fillRect(-4.4,B-1.6,8.8,1.6);break;
  case'todoroki':c.strokeStyle='#e8e8e8';c.lineWidth=1.2;c.beginPath();c.moveTo(-4.5,top+.5);c.lineTo(3.5,B-1);c.moveTo(4.5,top+.5);c.lineTo(-3.5,B-1);c.stroke();c.fillStyle='#e8e8e8';c.fillRect(-4.4,B-1.6,8.8,1.6);
    c.fillStyle='rgba(190,240,255,.5)';c.fillRect(-5.4,top+.8,2,6);break;
  case'uraraka':c.fillStyle='#ff9ad8';c.beginPath();c.roundRect(-5.4,top-.4,10.8,3.4,1.5);c.fill();c.fillStyle='#26262e';c.fillRect(-1.2,top+3,2.4,B-top-3);c.fillStyle='#ff9ad8';c.fillRect(-4.4,B-1.6,8.8,1.6);break;
  case'endeavor':c.fillStyle='#ff7a2a';c.fillRect(-4.4*bw,B-1.6,8.8*bw,1.6);if(!st.noFlame){c.globalCompositeOperation='lighter';for(const s of[-1,1])drawGlow(c,s*5*bw,top,6,'#ff6a1a',.8);c.globalCompositeOperation='source-over';}break;
  case'piccolo':case'gohan':c.fillStyle=k==='piccolo'?'#3a8fd6':'#d0342c';c.fillRect(-4.6,B-2.4,9.2,2.4);c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.moveTo(-1,top);c.lineTo(1.5,top);c.lineTo(.3,top+4);c.fill();break;
  case'namek':c.fillStyle='#6a2c8c';c.fillRect(-4.6,B-2.4,9.2,2.4);c.fillStyle='#e8e8e4';c.beginPath();c.moveTo(-1.5,top);c.lineTo(1.8,top);c.lineTo(.2,top+3.6);c.fill();break;
  case'nurse':c.fillStyle='#ff7aa8';c.fillRect(-.6,top+1,1.2,4);c.fillRect(-2,top+2.4,4,1.2);break;
  case'sidekick':c.fillStyle=L.gi2;c.beginPath();c.moveTo(-2,top+1);c.lineTo(2,top+1);c.lineTo(0,top+4.5);c.closePath();c.fill();break;
  case'student':c.fillStyle='rgba(255,255,255,.25)';c.fillRect(-4.6,top+1.5,9.2,1.2);c.fillStyle=L.q||'#fff';c.fillRect(-4.4,B-1.6,8.8,1.4);break;
  }if(L.sc||L.titan)aotCostume(c,L,k,bw,top,bob);moreCostume(c,L,k,bw,top,bob);moreCostume2(c,L,k,bw,top,bob);c.restore();}
function face(c,L,k,hx,hy,angry,shout,st,t){const ex1=hx+1.5,ex2=hx+4.6,ey=hy+.6;
  if(k==='bakugo'){c.fillStyle='#1a1a20';c.beginPath();c.roundRect(hx-.4,ey-2.6,7,4.4,2);c.fill();c.strokeStyle='#ff8a1f';c.lineWidth=.6;c.stroke();}
  if(k==='sidekick'){c.fillStyle='#22283a';c.beginPath();c.roundRect(hx-.2,ey-2.3,7,3.6,1.6);c.fill();}
  if(k==='allmight'){c.fillStyle='rgba(20,26,60,.85)';c.beginPath();c.moveTo(hx-.5,ey-3);c.lineTo(hx+6.4,ey-3.2);c.lineTo(hx+6,ey+1.2);c.lineTo(hx-.3,ey+1);c.closePath();c.fill();
    c.fillStyle='#8fe8ff';c.beginPath();c.arc(ex1+.3,ey-.6,.65,0,PI2);c.arc(ex2,ey-.6,.65,0,PI2);c.fill();
    c.fillStyle='#fff';c.beginPath();c.roundRect(hx+.6,hy+3.2,5.2,2,.8);c.fill();c.strokeStyle='#5a5a5a';c.lineWidth=.35;c.beginPath();for(let i=1;i<5;i++){c.moveTo(hx+.6+i*1.04,hy+3.2);c.lineTo(hx+.6+i*1.04,hy+5.2);}c.moveTo(hx+.6,hy+4.2);c.lineTo(hx+5.8,hy+4.2);c.stroke();
    c.strokeStyle=OUT;c.lineWidth=.6;c.strokeRect(hx+.6,hy+3.2,5.2,2);return;}
  const iris=st.ssj?'#2fb8b0':L.eye||'#2a2230';
  if(st.blink){c.strokeStyle='#120e16';c.lineWidth=.8;c.beginPath();c.moveTo(ex1-1.3,ey);c.quadraticCurveTo(ex1,ey+.7,ex1+1.3,ey);c.moveTo(ex2-1.3,ey);c.quadraticCurveTo(ex2,ey+.7,ex2+1.3,ey);c.stroke();}
  else{eye(c,ex1,ey,k==='todoroki'?L.eye2:iris,angry,true);eye(c,ex2,ey,iris,angry,false);}
  if(k==='todoroki'){c.fillStyle='rgba(170,40,40,.55)';c.beginPath();c.ellipse(ex1-.2,ey+.2,2.1,2.5,0,0,PI2);c.fill();}
  if(k==='deku'){c.fillStyle='#a8724a';for(const[a,b]of[[1.4,3],[2.2,3.4],[4.4,3],[5.2,3.4]]){c.fillRect(hx+a,hy+b,.5,.5);}}
  if(k==='uraraka'){c.fillStyle='rgba(255,110,140,.55)';c.beginPath();c.ellipse(ex1,hy+3.2,1.2,.7,0,0,PI2);c.ellipse(ex2+.3,hy+3.2,1.2,.7,0,0,PI2);c.fill();}
  if(k==='zwar'){c.strokeStyle='#8a4a3a';c.lineWidth=.5;c.beginPath();c.moveTo(ex2+.6,ey-1.8);c.lineTo(ex2+1.6,ey+1.6);c.stroke();}
  if(k!=='krilin'){c.strokeStyle='rgba(60,30,30,.7)';c.lineWidth=.6;c.beginPath();c.moveTo(hx+6,hy+1.6);c.lineTo(hx+6.6,hy+2.6);c.lineTo(hx+5.9,hy+2.8);c.stroke();}
  if(shout){c.fillStyle='#5a1218';c.beginPath();c.ellipse(hx+3.6,hy+4.2,1.5,1.25,0,0,PI2);c.fill();c.fillStyle='#e05a6a';c.beginPath();c.ellipse(hx+3.6,hy+4.8,1,.5,0,0,PI2);c.fill();c.fillStyle='#fff';c.fillRect(hx+2.4,hy+3.1,2.4,.5);}
  else{c.strokeStyle='#4a2020';c.lineWidth=.6;c.beginPath();if(k==='vegeta'||k==='bakugo'||k==='todoroki'){c.moveTo(hx+2.6,hy+4.3);c.lineTo(hx+4.6,hy+4);}else{c.moveTo(hx+2.4,hy+3.9);c.quadraticCurveTo(hx+3.6,hy+4.6,hx+4.8,hy+3.8);}c.stroke();}
  if(k==='endeavor'){c.globalCompositeOperation='lighter';drawGlow(c,hx+2,hy+5,8,'#ff6a1a',.85);c.globalCompositeOperation='source-over';
    poly(c,[[-.5,3.5],[1.2,8+Math.sin(t*20)*.8],[2.8,5.5],[4.4,9+Math.sin(t*17)*.8],[5.6,5],[6.4,3]],hx,hy);c.fillStyle='#ff7a2a';c.fill();poly(c,[[1,4.5],[2.2,7],[3.4,5.5],[4.4,7.4],[5.2,4.6]],hx,hy);c.fillStyle='#ffd23a';c.fill();}}
function hair(c,L,k,hx,hy,hc,st,t,ssjHair){
  if(k==='bald'||k==='disciple'||k==='krilin'||k==='tien'){c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.ellipse(hx-1,hy-4,2.4,1.2,-.4,0,PI2);c.fill();
    c.fillStyle='#7a4a3a';const n=k==='krilin'?6:k==='tien'?0:2;for(let i=0;i<n;i++){const a=i%3,b=(i/3)|0;c.beginPath();c.arc(hx+.6+a*1.5,hy-4.6-b*1.4,.42,0,PI2);c.fill();}return;}
  if(k==='piccolo'){c.beginPath();c.ellipse(hx-.4,hy-4,6.9,5.2,0,PI,PI2);c.lineTo(hx+6.4,hy-2.4);c.lineTo(hx-7.3,hy-2.4);c.closePath();c.fillStyle=cel(c,'#f4f4f0',hx-6,hy-9,hx+6,hy-2,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
    c.fillStyle='#7a3aa0';c.fillRect(hx-6.9,hy-3.9,13.6,1.7);c.strokeStyle=OUT;c.lineWidth=1.2;c.beginPath();c.moveTo(hx+2,hy-4.5);c.quadraticCurveTo(hx+3,hy-9,hx+4.5,hy-10);c.moveTo(hx+3.5,hy-4.5);c.quadraticCurveTo(hx+6,hy-8,hx+7.5,hy-8.4);c.stroke();return;}
  if(k==='namek'||k==='namekw'){c.strokeStyle=OUT;c.lineWidth=1.3;c.beginPath();c.moveTo(hx+1,hy-5.5);c.quadraticCurveTo(hx+2,hy-10.5,hx+4,hy-11.5);c.moveTo(hx+3,hy-5.5);c.quadraticCurveTo(hx+5,hy-9.5,hx+7,hy-9.5);c.stroke();
    c.fillStyle='#4a9a3a';c.beginPath();c.arc(hx+4,hy-11.5,1.2,0,PI2);c.arc(hx+7,hy-9.5,1.2,0,PI2);c.fill();return;}
  if(k==='deku'){const bumps=[[-4.8,-2.8,3.3],[-2.8,-6.2,3.3],[.8,-7.2,3.4],[4.2,-5.4,3.1],[6,-2,2.5],[-6,.8,2.4],[1.6,-3.6,2.2]];
    for(const[a,b,r]of bumps){c.beginPath();c.arc(hx+a,hy+b,r+.9,0,PI2);c.fillStyle=OUT;c.fill();}for(const[a,b,r]of bumps){c.beginPath();c.arc(hx+a,hy+b,r,0,PI2);c.fillStyle=hc;c.fill();}
    c.fillStyle='#2f7a50';for(const[a,b,r]of bumps.slice(0,5)){c.beginPath();c.arc(hx+a-r*.3,hy+b-r*.35,r*.35,0,PI2);c.fill();}return;}
  if(k==='nurse'){c.beginPath();c.arc(hx-1,hy-8,3.6,0,PI2);fo(c,hc);poly(c,HAIR.short,hx,hy);fo(c,hc);c.fillStyle='#ff7aa8';c.fillRect(hx-3,hy-6.6,4,1.6);return;}
  let key=k==='zwar'?'yamcha':k==='sidekick'||k==='student'?'short':k;if(ssjHair&&(k==='goku'||k==='gohan'))key=k+'ssj';
  const pts=(HAIR[key]||HAIR.short).map(([a,b])=>[a*1.12,b*1.12-.4]);
  if(ssjHair||k==='endeavor'){c.globalCompositeOperation='lighter';drawGlow(c,hx,hy-7,18,k==='endeavor'?'#ff6a1a':'#ffe14d',.65);c.globalCompositeOperation='source-over';}
  if(k==='todoroki'){poly(c,pts,hx,hy);fo(c,'#f4f4f4');c.save();poly(c,pts,hx,hy);c.clip();c.fillStyle=L.hc2;c.fillRect(hx+.6,hy-12,10,16);c.fillStyle='rgba(0,0,0,.15)';c.fillRect(hx-8,hy-1.5,16,3);c.restore();poly(c,pts,hx,hy);c.strokeStyle=OUT;c.lineWidth=1;c.stroke();return;}
  let fill=hc;if(k==='endeavor'){const g=c.createLinearGradient(0,hy-16,0,hy);g.addColorStop(0,'#ffd23a');g.addColorStop(.5,'#ff7a2a');g.addColorStop(1,'#d8341a');fill=g;}
  poly(c,pts,hx,hy);c.fillStyle=k==='endeavor'?fill:cel(c,hex7(hc),hx-4,hy-12,hx+5,hy,.62);c.fill();c.strokeStyle=k==='endeavor'?'#8a2a0a':OUT;c.lineWidth=1.1;c.stroke();
  c.save();poly(c,pts,hx,hy);c.clip();c.strokeStyle=ssjHair?'#fff8b0':'rgba(255,255,255,.28)';c.lineWidth=1.1;c.beginPath();c.moveTo(hx-4,hy-6.5);c.quadraticCurveTo(hx-1.5,hy-9.5,hx+1.5,hy-8);c.stroke();
  c.strokeStyle='rgba(0,0,0,.22)';c.lineWidth=.6;c.beginPath();c.moveTo(hx,hy-3);c.lineTo(hx+1.5,hy-8);c.moveTo(hx+3,hy-3);c.lineTo(hx+4.5,hy-7);c.stroke();
  {const gg=c.createLinearGradient(0,hy-12,0,hy+3);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.7,'rgba(0,0,0,0)');gg.addColorStop(1,'rgba(0,0,0,.28)');c.fillStyle=gg;c.fillRect(hx-12,hy-16,24,22);
  c.strokeStyle=ssjHair?'rgba(255,255,230,.7)':'rgba(255,255,255,.42)';c.lineWidth=1.5;c.beginPath();c.ellipse(hx-.6,hy-4.6,4.8,1.7,-.18,PI*1.06,PI*1.82);c.stroke();c.lineWidth=.6;c.beginPath();c.ellipse(hx-.6,hy-4.6,4.8,1.7,-.18,PI*1.9,PI*1.98);c.stroke();}
  c.restore();
  if(ssjHair&&R()<.04)part('bolt',0,0,0,0,.01,1,'#fff');}
// ===== Building detail pass: flags, beacons, lit windows, signature elements =====
function decorBuilding(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,a=b.anim||0,fc=FAC[b.fac].col,k=b.key;
  // faction flag on the pad corner
  if(k!=='turret'){const fx=x0+5,fy=y0+H-6;c.strokeStyle='#3a3a3a';c.lineWidth=1.4;c.beginPath();c.moveTo(fx,fy);c.lineTo(fx,fy-22);c.stroke();
    c.fillStyle=fc;c.beginPath();c.moveTo(fx,fy-22);for(let i=0;i<=6;i++){c.lineTo(fx+i*2,fy-22+Math.sin(a*6+i*.8)*1.2);}for(let i=6;i>=0;i--)c.lineTo(fx+i*2,fy-14+Math.sin(a*6+i*.8)*1.2);c.closePath();c.fill();
    c.fillStyle='#fff';c.font='bold 5px sans-serif';c.textAlign='center';if(b.fac==='aot')wings(c,fx+6,fy-18,1.6);else c.fillText(b.fac==='dbz'?'Z':'UA',fx+6,fy-16.5);}
  // blinking rooftop beacon
  if(!ghost&&(k==='hq'||k==='factory'||k==='temple'||k==='refinery')&&Math.sin(a*3+b.tx)>.6){c.globalCompositeOperation='lighter';drawGlow(c,x0+W-10,y0-(k==='temple'&&b.fac==='mha'?58:k==='hq'?18:6),7,'#ff3a3a',.9);c.globalCompositeOperation='source-over';}
  if(b.fac==='dbz'){
    if(k==='hq'){c.save();c.font='bold 7.5px Chakra Petch, sans-serif';c.fillStyle='#2a64c8';c.textAlign='center';c.fillText('CAPSULE CORP.',x0+54,y0+82);c.restore();
      c.strokeStyle='#9aa4b0';c.lineWidth=1.4;c.beginPath();c.ellipse(x0+20,y0+20,6,3,-.6,0,PI2);c.stroke();c.beginPath();c.moveTo(x0+20,y0+20);c.lineTo(x0+22,y0+28);c.stroke();
      tree(c,x0+86,y0+92,7,.2);tree(c,x0+8,y0+92,6,.7);}
    if(k==='barracks'){c.fillStyle='#2a64c8';c.beginPath();c.arc(b.x+12,y0+30,4,0,PI2);c.fill();c.fillStyle='#fff';c.font='bold 4px sans-serif';c.textAlign='center';c.fillText('CC',b.x+12,y0+31.5);
      c.strokeStyle='#9aa4b0';c.lineWidth=1.2;c.beginPath();c.moveTo(b.x,y0+12);c.lineTo(b.x,y0+2);c.stroke();c.fillStyle='#ff3a3a';c.beginPath();c.arc(b.x,y0+2,1.6,0,PI2);c.fill();}
    if(k==='power'||k==='refinery'){c.fillStyle='rgba(0,0,0,.25)';for(let i=0;i<3;i++)c.fillRect(x0+W-16+i*4,y0+H-20,2,8);}
  }else if(b.fac==='mha'){
    if(k==='hq'){if(!ghost)for(let i=0;i<14;i++){const tx=i<7?x0+12:x0+58,col=i%7,row=(i*3+b.tx)%9;if(Math.sin(a*.7+i*1.3)>.3){c.fillStyle='rgba(255,230,150,.75)';c.fillRect(tx+col%4*6.5+1,y0-24+row*6.5,4,4);}}
      c.fillStyle='#2fd27a';c.fillRect(x0+40,y0-30,16,2);}
    if(k==='barracks'){c.fillStyle='#1a2a3a';c.fillRect(x0+40,y0+6,14,18);c.fillStyle='#ffd23a';c.beginPath();c.arc(x0+47,y0+12,3,0,PI2);c.fill();c.fillStyle='#2a5ad6';c.fillRect(x0+44,y0+15,6,7);}
    if(k==='temple'){c.strokeStyle='#e8b830';c.lineWidth=1;c.beginPath();c.arc(b.x,y0-80,6,0,PI2);c.stroke();c.fillStyle='#e8b830';c.font='bold 7px sans-serif';c.textAlign='center';c.fillText('H',b.x,y0-77.5);}
    if(k==='power'&&!ghost&&R()<.08)part('spark',x0+W/2+rr(-12,12),y0+8,rr(-30,30),rr(-30,0),.2,1.5,'#fff36a');
  }}
// ===== Kami's Lookout: floating platform (replaces the ground version) =====
function drawLookout(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,cx=x0+32,a=b.anim||0,fl=Math.sin(a*1.4)*1.5,py=y0+30+fl;
  c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(cx+8,y0+58,30,9,0,0,PI2);c.fill();
  c.beginPath();c.moveTo(cx-33,py);c.quadraticCurveTo(cx-20,py+30,cx,py+36);c.quadraticCurveTo(cx+20,py+30,cx+33,py);c.closePath();c.fillStyle=cel(c,'#c8b48a',cx-30,py,cx+30,py+36,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
  c.strokeStyle='rgba(90,70,40,.5)';c.beginPath();c.moveTo(cx-20,py+8);c.quadraticCurveTo(cx,py+22,cx+20,py+8);c.moveTo(cx-10,py+20);c.quadraticCurveTo(cx,py+28,cx+10,py+20);c.stroke();
  c.beginPath();c.ellipse(cx,py,34,15,0,0,PI2);fo(c,'#e8e2d4');c.beginPath();c.ellipse(cx,py-1.5,31,13,0,0,PI2);c.fillStyle='#f8f4e8';c.fill();
  c.strokeStyle='rgba(140,120,80,.3)';for(let r=8;r<31;r+=7){c.beginPath();c.ellipse(cx,py-1.5,r,r*.42,0,0,PI2);c.stroke();}
  for(const s of[-1,1]){const px=cx+s*22,ppy=py-3;c.strokeStyle='#7a5530';c.lineWidth=2;c.beginPath();c.moveTo(px,ppy);c.quadraticCurveTo(px+s*3,ppy-8,px+s*1,ppy-15);c.stroke();
    c.fillStyle='#3e9a3a';for(let j=0;j<6;j++){c.beginPath();c.ellipse(px+s+Math.cos(j*1.05)*5,ppy-15+Math.sin(j*1.05)*2,5.5,1.8,j*1.05,0,PI2);c.fill();}}
  c.beginPath();c.rect(cx-12,py-20,24,16);c.fillStyle=cel(c,'#f6f6f2',cx-12,py-20,cx+12,py-4,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
  for(let i=0;i<4;i++){c.fillStyle='#3a3a44';c.fillRect(cx-10+i*6,py-15,3,8);}
  dome(c,cx,py-20,12,5,13,'#f4f0e0');for(const s of[-1,1])dome(c,cx+s*10,py-19,4,2,7,'#f4f0e0');
  c.fillStyle='#e8b830';c.beginPath();c.moveTo(cx-2,py-33);c.lineTo(cx,py-42);c.lineTo(cx+2,py-33);c.fill();
  if(!ghost){c.globalCompositeOperation='lighter';drawGlow(c,cx,py-30,22,'#fff6c0',.25);c.globalCompositeOperation='source-over';}}
