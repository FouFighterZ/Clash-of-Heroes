// ===== Event bosses' looks, the dragon Kamish, hero ground aura =====
Object.assign(LOOK,{
  freezer:{skin:'#f4f2f6',gi:'#f4f2f6',gi2:'#9a4ac8',pants:'#ecebf0',boots:'#f4f2f6',arms:'skin',eye:'#d8343f',bald:true,dome:'#9a4ac8',tail:'#f4f2f6',plates:'#9a4ac8'},
  fsoldier:{skin:'#efc29a',hc:'#3a2a1a',gi:'#2b46b8',gi2:'#f4f4f4',pants:'#2b46b8',boots:'#f4f4f4',arms:'gi',eye:'#2a2230',armorP:'#f6f6f2',scouter:true},
  celljr:{skin:'#5a9ad8',gi:'#4a8a4a',gi2:'#1a1a1a',pants:'#4a8a4a',boots:'#2a6a3a',arms:'skin',eye:'#d84a6a',bald:true,crest:'#4a8a4a',spots:true},
  afo:{skin:'#e8d8c8',gi:'#1a1a1e',gi2:'#3a3a40',pants:'#1a1a1e',boots:'#0e0e12',arms:'gi',eye:'#c03a3a',helm:'#141418',tie:'#8a1a1a',glowEye:'#ff4a4a',big:true},
  iceelf:{skin:'#e8f4ff',hc:'#f4faff',gi:'#7ab8e8',gi2:'#e8f4ff',pants:'#5a8ab8',boots:'#3a5a8a',arms:'gi',eye:'#4ad8ff',hood:'#9ad0f0',weapon:'wand'},
  baruka:{skin:'#d8ecf8',hc:'#f4faff',gi:'#4a7ab8',gi2:'#e8f4ff',pants:'#3a5a8a',boots:'#2a3a5a',arms:'gi',eye:'#4ad8ff',armorP:'#bfe8ff',weapon:'dagger',wglow:'#4ad8ff',dual:true},
  boros:{skin:'#5a7ad8',gi:'#e3c13b',gi2:'#8a3a3a',pants:'#3a4a8a',boots:'#e3c13b',arms:'skin',eye:'#ff3a1a',bald:true,cyclops:true,armorP:'#e3c13b',cape:'#8a2a2a',big:true},
  deepsea:{skin:'#3a8a6a',gi:'#3a8a6a',gi2:'#2a6a4a',pants:'#2a6a4a',boots:'#1e4a34',arms:'skin',eye:'#ffe14d',bald:true,fins:true,big:true,claws:true},
  fishman:{skin:'#4a9a8a',gi:'#4a9a8a',gi2:'#2a6a5a',pants:'#2a6a5a',boots:'#1e4a44',arms:'skin',eye:'#ffe14d',bald:true,fins:true,claws:true},
  meruem:{skin:'#6ab88a',gi:'#4a8a6a',gi2:'#2a4a3a',pants:'#3a6a5a',boots:'#2a4a3a',arms:'skin',eye:'#d8b040',bald:true,crest:'#e8f0e8',tail:'#5aa87a',claws:true},
});
for(const k of['freezer','fsoldier','celljr','afo','iceelf','baruka','boros','deepsea','fishman','meruem']){LOOK[k].k=k;NEWLOOKS.push(k);}
{const _mh=moreHead2;moreHead2=function(c,L,k,hx,hy,st){_mh(c,L,k,hx,hy,st);
  if(L.dome){c.beginPath();c.ellipse(hx-.4,hy-3.6,5.8,4,0,PI,PI2);c.closePath();c.fillStyle=cel(c,L.dome,hx-6,hy-8,hx+6,hy-2,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=.8;c.stroke();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.ellipse(hx-2,hy-5.2,1.6,.8,-.3,0,PI2);c.fill();}
  if(L.scouter){c.fillStyle='rgba(80,255,120,.6)';c.fillRect(hx+3.4,hy-1.6,3.4,2.4);c.strokeStyle='#e8e8e8';c.lineWidth=.6;c.strokeRect(hx+3.4,hy-1.6,3.4,2.4);}
  if(L.crest){c.fillStyle=L.crest;c.beginPath();c.moveTo(hx-5,hy-2);c.quadraticCurveTo(hx-9,hy-10,hx-3,hy-12);c.quadraticCurveTo(hx+2,hy-8,hx+1,hy-5.5);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.6;c.stroke();}
  if(L.spots){c.fillStyle='rgba(20,40,20,.5)';for(const[a,b]of[[-3,-3],[0,-5],[-4,1],[2,-2]]){c.beginPath();c.arc(hx+a,hy+b,.7,0,PI2);c.fill();}}
  if(L.cyclops){c.fillStyle=L.skin;c.fillRect(hx+.2,hy-2.6,6.6,5.2);c.fillStyle='#fff';c.beginPath();c.ellipse(hx+3.2,hy,2.4,2.2,0,0,PI2);c.fill();c.fillStyle='#ff3a1a';c.beginPath();c.arc(hx+3.6,hy,1.3,0,PI2);c.fill();c.fillStyle='#0b0810';c.beginPath();c.arc(hx+3.7,hy,.6,0,PI2);c.fill();
    c.fillStyle='#e3c13b';c.beginPath();c.moveTo(hx-5,hy-5);c.lineTo(hx+5,hy-6.4);c.lineTo(hx+3,hy-4);c.lineTo(hx-4,hy-3);c.closePath();c.fill();}
  if(L.fins){c.fillStyle=shade(hex7(L.skin),-.2);c.beginPath();c.moveTo(hx-2,hy-6);c.lineTo(hx-6,hy-12);c.lineTo(hx+1,hy-6.6);c.lineTo(hx+3,hy-10);c.lineTo(hx+4,hy-5.6);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.5;c.stroke();}};}
{const _bi=backItems;backItems=function(c,L,k,bw,top,t,walk){_bi(c,L,k,bw,top,t,walk);if(L.tail){c.strokeStyle=OUT;c.lineWidth=3.2;c.lineCap='round';c.beginPath();c.moveTo(-3,-9);c.quadraticCurveTo(-12,-6+Math.sin(t*3)*2,-14,-14+Math.sin(t*2.4)*3);c.stroke();c.strokeStyle=L.tail;c.lineWidth=2.2;c.stroke();}};}
{const _mc=moreCostume2;moreCostume2=function(c,L,k,bw,top,bob){_mc(c,L,k,bw,top,bob);if(L.plates){c.fillStyle=L.plates;for(const s of[-1,1]){c.beginPath();c.ellipse(s*5*bw,top+.8,2.4,1.6,0,0,PI2);c.fill();}c.beginPath();c.ellipse(0,top+5,2.6,2,0,0,PI2);c.fill();}};}
function drawDragon(c,u,x,y){const f=Math.cos(u.ang||0)>=0?1:-1,fl=Math.sin(u.anim*(u.moving?6:3)),z=(u.z||30)+18,yy=y-z-Math.sin(u.anim*1.5)*4,a=u.atk>0?Math.sin(u.atk/.22*PI):0;
  c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x+8,y+4,46,12,0,0,PI2);c.fill();c.save();c.translate(x,yy);c.scale(f*1.25,1.25);
  for(const s of[0,1]){c.save();c.translate(-6,-10);c.scale(1,s?.7:1);c.rotate(-.25-fl*.55+(s?.35:0));c.fillStyle=s?'#5a1a10':'#8a2a1a';c.beginPath();c.moveTo(0,0);c.lineTo(-10,-38);c.lineTo(-26,-30);c.lineTo(-44,-14);c.lineTo(-30,-6);c.lineTo(-18,-2);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
    c.strokeStyle='rgba(255,140,80,.45)';c.lineWidth=.7;c.beginPath();c.moveTo(0,0);c.lineTo(-26,-30);c.moveTo(0,0);c.lineTo(-44,-14);c.stroke();c.restore();}
  c.beginPath();c.moveTo(-40,4);c.quadraticCurveTo(-24,-8,-4,-10);c.quadraticCurveTo(14,-12,22,-24);c.lineTo(30,-26);c.quadraticCurveTo(36,-22,34,-16);c.quadraticCurveTo(24,-12,18,-2);c.quadraticCurveTo(0,8,-20,8);c.quadraticCurveTo(-34,10,-40,4);c.closePath();
  c.fillStyle=cel(c,'#a83a22',-40,-26,36,10,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1.2;c.stroke();c.fillStyle='#e8b060';c.beginPath();c.moveTo(-20,6);c.quadraticCurveTo(0,6,16,-4);c.lineTo(14,0);c.quadraticCurveTo(0,10,-20,9);c.closePath();c.fill();
  c.fillStyle='#e8d8b0';for(const[hx,hy]of[[24,-26],[28,-27]]){c.beginPath();c.moveTo(hx,hy);c.lineTo(hx-6,hy-9);c.lineTo(hx+2,hy-2);c.closePath();c.fill();}
  c.globalCompositeOperation='lighter';drawGlow(c,30,-21,5,'#ffcf3a',1);if(a>.1)drawGlow(c,40,-18,18*a,'#ff7a2a',1);c.globalCompositeOperation='source-over';c.restore();}
{const _du=drawUnitBody;drawUnitBody=function(c,u,x,y,ghost){if(u.D&&u.D.dragon)return drawDragon(c,u,x,y);
  if(u.D&&u.D.hero&&!u.D.veh&&!ghost&&!u.form&&!u.hid){const col=FAC[u.fac]&&FAC[u.fac].col||'#ffffff',p=.5+.5*Math.sin((u.anim||0)*3);c.strokeStyle=col;c.globalAlpha=.35+.25*p;c.lineWidth=1.4;c.beginPath();c.ellipse(x,y+1,u.r+7,(u.r+7)*.42,0,0,PI2);c.stroke();c.globalAlpha=1;}
  _du(c,u,x,y,ghost);};}
