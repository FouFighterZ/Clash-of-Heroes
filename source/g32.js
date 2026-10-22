// ===== Ultimate attacks ("attaques ultimes"): description, full-screen cinematic per faction, Escanor's sun =====
const ULT_DESC={
  dbz:'Goku lève les bras et rassemble l’énergie de tous les êtres vivants en une sphère bleue géante, puis la lance sur la zone ciblée.',
  mha:'Endeavor pousse son Alter au maximum et libère une colonne de flammes à plus de 3 000 degrés qui incinère toute la zone.',
  aot:'Eren active le pouvoir du Titan Originel : des Titans colossaux se mettent en marche et écrasent tout sur une longue ligne.',
  sl:'Sung Jinwoo appelle son armée : des soldats de l’ombre surgissent du sol et submergent la zone ciblée.',
  opm:'Pour une fois, Saitama ne retient pas sa force : un seul coup de poing qui pulvérise tout dans la zone… et même les nuages.',
  hxh:'Netero joint les mains, puis déclenche la bombe cachée dans son corps : une explosion en forme de rose suivie d’un nuage de poison.',
  sds:'Escanor fait naître un soleil miniature au-dessus de sa main et le laisse s’abattre sur l’ennemi. Encore plus dévastateur à midi.'};
for(const f in ULT_DESC)if(SUPER[f])SUPER[f].desc=ULT_DESC[f];
SUPER.sds.fx='sunfx';
// ---- launching: the classic cut-in becomes a themed full-screen cinematic ----
{const _ls=launchSuper;launchSuper=function(si,x,y){const ok=_ls(si,x,y);if(ok&&G.cut){const f=sides[si].fac;G.cut.ult=f;G.cut.dur=2.6;G.cut.side=si;}return ok;};}
const ULT_BG={dbz:['#0a2a6a','#4ab8ff','#e8f6ff'],mha:['#3a0a04','#ff5a1a','#ffd23a'],aot:['#2a1e14','#a8743a','#e8c890'],sl:['#08040f','#4a2a8a','#b08aff'],
  opm:['#ffd23a','#ffffff','#d8343f'],hxh:['#2a1a08','#e8b040','#fff2c0'],sds:['#4a1404','#ff8a1a','#fff2a0']};
function ultBackdrop(c,f,w,h,t){const P=ULT_BG[f]||ULT_BG.dbz,cx=w*.3,cy=h*.55;
  const g=c.createRadialGradient(cx,cy,10,cx,cy,w*.8);g.addColorStop(0,P[2]);g.addColorStop(.25,P[1]);g.addColorStop(1,P[0]);c.fillStyle=g;c.fillRect(0,0,w,h);
  c.save();c.globalCompositeOperation='lighter';
  if(f==='dbz'){for(let k=0;k<70;k++){const a=k*2.399,r=(1-((t*.6+k*.0137)%1))*w*.7;c.fillStyle='rgba(160,220,255,.7)';c.beginPath();c.arc(cx+Math.cos(a)*r,h*.25+Math.sin(a)*r*.5,2+k%3,0,PI2);c.fill();}
    const R=40+Math.min(1,t/1.6)*h*.32;drawGlow(c,cx,h*.2,R*1.4,'#4ab8ff',.9);c.fillStyle='rgba(230,250,255,.9)';c.beginPath();c.arc(cx,h*.2,R*.7,0,PI2);c.fill();}
  else if(f==='mha'||f==='sds'){for(let k=0;k<26;k++){const x=((k*97)%w),hh=h*(.3+((k*37)%50)/100)+Math.sin(t*9+k)*20;const gg=c.createLinearGradient(0,h,0,h-hh);gg.addColorStop(0,P[1]);gg.addColorStop(1,'rgba(255,200,60,0)');c.fillStyle=gg;
      c.beginPath();c.moveTo(x-30,h);c.quadraticCurveTo(x+Math.sin(t*7+k)*20,h-hh*.6,x,h-hh);c.quadraticCurveTo(x+20,h-hh*.5,x+30,h);c.fill();}
    if(f==='sds'){const R=h*.22*(.6+.4*Math.min(1,t/1.2));drawGlow(c,w*.72,h*.32,R*2,'#ffb020',1);c.fillStyle='#fff6c0';c.beginPath();c.arc(w*.72,h*.32,R,0,PI2);c.fill();}}
  else if(f==='opm'){c.globalCompositeOperation='source-over';for(let k=0;k<48;k++){const a=k/48*PI2+t*.2;c.fillStyle=k%2?'#ffe46a':'#ffffff';c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,w*1.2,a,a+PI2/96);c.closePath();c.fill();}
    c.fillStyle='rgba(216,52,63,.18)';for(let y=0;y<h;y+=10)for(let x=(y/10%2)*5;x<w;x+=10){c.beginPath();c.arc(x,y,2,0,PI2);c.fill();}}
  else{for(let k=0;k<60;k++){const x=((k*131+t*900*(k%3+1))%(w+200))-100,y=(k*71)%h;c.strokeStyle=P[2];c.globalAlpha=.25;c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x-140,y+10);c.stroke();}c.globalAlpha=1;}
  c.restore();
  // silhouettes that tell the story of each attack
  c.save();c.globalAlpha=.55;
  if(f==='aot')for(let k=0;k<6;k++)drawFighter(c,w*(.45+k*.12)-(t*40)%(w*.12),h*.98,LOOK.titan_colossal,-1,t*2+k,true,h/150,{});
  if(f==='sl')for(let k=0;k<9;k++){const rise=Math.min(1,Math.max(0,t*1.6-k*.12));c.globalAlpha=.6*rise;drawFighter(c,w*(.42+k*.065),h*1.02-rise*h*.25,LOOK.shsold||LOOK.shknight,-1,t*3+k,false,h/170,{});}
  if(f==='hxh'){c.globalAlpha=.35+.2*Math.sin(t*3);c.fillStyle='#ffd23a';c.beginPath();c.ellipse(w*.7,h*.5,h*.3,h*.42,0,0,PI2);c.fill();for(let k=0;k<12;k++){const a=k/12*PI2;c.beginPath();c.ellipse(w*.7+Math.cos(a)*h*.36,h*.5+Math.sin(a)*h*.36,h*.06,h*.03,a,0,PI2);c.fill();}}
  c.restore();}
function wrapText(c,text,x,y,maxW,lh){const words=text.split(' ');let line='',n=0;const put=(l,yy)=>{c.lineWidth=4;c.strokeStyle='rgba(0,0,0,.75)';c.lineJoin='round';c.strokeText(l,x,yy);c.fillText(l,x,yy);};
  for(const wd of words){const t=line?line+' '+wd:wd;if(c.measureText(t).width>maxW&&line){put(line,y+n*lh);n++;line=wd;}else line=t;}if(line)put(line,y+n*lh);}
{const _dc=drawCutin;drawCutin=function(c,sw,sh){const C=G.cut;if(!C||!C.ult)return _dc(c,sw,sh);const f=C.ult,SP=SUPER[f],t=C.t,p=t/C.dur;
  const inA=clamp(t/.25,0,1),outA=p>.85?1-(p-.85)/.15:1,a=Math.min(inA,outA);c.save();c.globalAlpha=a*.55;c.fillStyle='#000';c.fillRect(0,0,sw,sh);c.globalAlpha=a;
  const bh=Math.min(sh*.62,420),by=sh*.5-bh/2,skew=40;c.save();c.beginPath();c.moveTo(0,by+skew);c.lineTo(sw,by);c.lineTo(sw,by+bh-skew);c.lineTo(0,by+bh);c.closePath();c.clip();
  c.translate(0,by);ultBackdrop(c,f,sw,bh,t);
  // hero
  const spr=f==='dbz'&&typeof SPR!=='undefined'&&SPR.goku&&SPR.goku.imgA&&SPR.goku.imgA.naturalWidth?SPR.goku.imgA:null,slide=(1-Math.pow(1-inA,3))*1;
  if(spr){const s=bh*.95/spr.naturalHeight;c.drawImage(spr,sw*.22-spr.naturalWidth*s/2-(1-slide)*200,bh*.05,spr.naturalWidth*s,spr.naturalHeight*s);}
  else{const L=LOOK[SP.look]||LOOK.goku;drawFighter(c,sw*.22-(1-slide)*200,bh*.97,L,1,gtime,false,bh/36,{aura:SP.col,cast:true,ssj:f==='dbz'});}
  c.restore();
  c.strokeStyle='#fff';c.lineWidth=5;c.beginPath();c.moveTo(0,by+skew);c.lineTo(sw,by);c.moveTo(0,by+bh);c.lineTo(sw,by+bh-skew);c.stroke();
  // texts
  const tx=sw*.42,zoom=1+Math.max(0,.3-t)*2.5;c.save();c.translate(tx,by+bh*.36);c.rotate(-.04);c.scale(zoom,zoom);
  c.font='600 15px Chakra Petch, sans-serif';c.fillStyle='#fff';c.textAlign='left';c.lineWidth=4;c.strokeStyle='#000';const fsT=Math.min(90,(sw*.55)/(SP.name.length*.52)),ly=-fsT*.62;c.strokeText('ATTAQUE ULTIME · '+SP.who.toUpperCase(),0,ly);c.fillText('ATTAQUE ULTIME · '+SP.who.toUpperCase(),0,ly);
  const fs=Math.min(90,(sw*.55)/(SP.name.length*.52));c.font=`${fs}px Bangers, Impact, sans-serif`;c.lineWidth=10;c.strokeStyle='#111';c.strokeText(SP.name.toUpperCase(),0,0);c.fillStyle=f==='opm'?'#d8343f':'#fff';c.fillText(SP.name.toUpperCase(),0,0);c.restore();
  if(t>.35){c.globalAlpha=a*clamp((t-.35)/.3,0,1);c.font='600 17px Chakra Petch, sans-serif';c.fillStyle='#ffffff';c.textAlign='left';wrapText(c,SP.desc||'',tx,by+bh*.36+Math.min(46,bh*.12),sw*.52,23);
    c.font='italic 700 21px Chakra Petch, sans-serif';const sy=by+bh*.36+Math.min(46,bh*.12)+80;c.lineWidth=5;c.strokeStyle='#000';c.strokeText('« '+SP.shout+' »',tx,sy);c.fillStyle='#ffe14d';c.fillText('« '+SP.shout+' »',tx,sy);}
  if(C.side!=null&&foe(C.side,PL)){c.globalAlpha=a;c.font='26px Bangers, Impact, sans-serif';c.fillStyle='#ff4d5e';c.textAlign='center';c.fillText('ATTAQUE ULTIME ENNEMIE !',sw/2,by-18);}
  c.restore();};}
// ---- the Sun of Escanor on the battlefield ----
{const _us=updSpecial;updSpecial=function(dt){_us(dt);for(const f of fxs){if(f.type!=='sunfx'||f.done)continue;if(R()<.5)part('fire',f.x+rr(-f.rad,f.rad)*.5,f.y+rr(-f.rad,f.rad)*.3,rr(-20,20),rr(-50,-10),.6,rr(8,14));
  if(f.t>=f.delay){f.done=true;const sun=typeof sunAt==='function'?sunAt(gtime):.5;splashDmg(f.x,f.y,f.rad,f.dmg*(.7+.6*sun),f.side,340,.9,null);fxBoom(f.x,f.y,f.rad,'#ffb020',true);fxBoom(f.x,f.y,f.rad*.6,'#ffffff',true);
    scorch(f.x,f.y,f.rad*1.1,.8);shake(24);sfx('big',f.x,f.y);setTimeoutG(()=>sfx('boom',f.x,f.y),.25);for(let k=0;k<3;k++)setTimeoutG(()=>fxRing(f.x,f.y,'#ffb020',f.rad*(1.2+k*.3)),k*.12);
    for(let k=0;k<50;k++)part('fire',f.x+rr(-1,1)*f.rad*.7,f.y+rr(-1,1)*f.rad*.5,rr(-60,60),rr(-160,-40),rr(.6,1.4),rr(10,22));}}};}
{const _ds=drawSpecial;drawSpecial=function(c){_ds(c);for(const f of fxs){if(f.type!=='sunfx'||f.done)continue;const p=clamp(f.t/f.delay,0,1),r=lerp(16,f.rad*.5,Math.min(1,p*1.5)),h=p<.55?380:lerp(380,0,(p-.55)/.45);
  c.strokeStyle='rgba(255,176,32,'+(.4+.4*Math.sin(f.t*12))+')';c.lineWidth=3;c.setLineDash([12,8]);c.beginPath();c.ellipse(f.x,f.y,f.rad,f.rad*.6,0,0,PI2);c.stroke();c.setLineDash([]);
  c.fillStyle='rgba(0,0,0,'+(.15+.25*p)+')';c.beginPath();c.ellipse(f.x,f.y,r*1.2,r*.5,0,0,PI2);c.fill();
  c.save();c.globalCompositeOperation='lighter';drawGlow(c,f.x,f.y-h,r*2.2,'#ff8a1a',1);drawGlow(c,f.x,f.y-h,r*1.3,'#ffd23a',1);c.restore();
  const g=c.createRadialGradient(f.x-r*.3,f.y-h-r*.3,r*.1,f.x,f.y-h,r);g.addColorStop(0,'#ffffff');g.addColorStop(.4,'#fff2a0');g.addColorStop(1,'#ff9a20');c.fillStyle=g;c.beginPath();c.arc(f.x,f.y-h,r,0,PI2);c.fill();
  c.strokeStyle='rgba(255,240,180,.6)';c.lineWidth=2;for(let k=0;k<10;k++){const a=k/10*PI2+f.t*2;c.beginPath();c.moveTo(f.x+Math.cos(a)*r*1.1,f.y-h+Math.sin(a)*r*1.1);c.lineTo(f.x+Math.cos(a)*r*1.5,f.y-h+Math.sin(a)*r*1.5);c.stroke();}}};}
// ---- wording: "attaque ultime", with the description on the button ----
{const b=$('#superb');if(b)b.title='Attaque ultime : se débloque en améliorant le bâtiment des héros.';
  setInterval(()=>{if(1||G.state!=='play'||!sides[PL]||!b)return;const SP=SUPER[sides[PL].fac];b.title='Attaque ultime · '+SP.name+'\n'+(SP.desc||'')+'\nSe débloque en améliorant '+BDEF.temple.names[sides[PL].fac]+'.';},1000);}
BFEAT.temple='Débloque l’attaque ultime : {super}.';BFEAT.relay='L’attaque ultime se charge deux fois plus vite.';
BDEF.relay.desc='Concentre l’énergie : ton attaque ultime se charge 60 % plus vite.';

// hide the objectives panel while a cinematic plays
setInterval(()=>{const o=$('#obj');if(o)o.style.visibility=G.cut&&G.cut.ult?'hidden':'';},100);
