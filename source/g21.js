// ===== Hunter × Hunter: characters, creatures, buildings, effects, Nen stance bar =====
Object.assign(LOOK,{
  gon:{skin:'#f3cfa8',hc:'#1a1f1a',gi:'#2f8a3a',gi2:'#1f5a26',pants:'#2f7a34',boots:'#c87a2a',arms:'skin',eye:'#6a4a2a'},
  gonadult:{skin:'#efc6a0',hc:'#141814',gi:'#2f8a3a',gi2:'#1f5a26',pants:'#2f7a34',boots:'#c87a2a',arms:'skin',eye:'#3a2a1a',big:true,torn:true},
  killua:{skin:'#f6dcc4',hc:'#eef0f6',gi:'#e8ecf4',gi2:'#3a4a8a',pants:'#5a3a8a',boots:'#4a4a5a',arms:'gi',eye:'#4a8ad8'},
  kurapika:{skin:'#f6dcc4',hc:'#f2d870',gi:'#2a4aa8',gi2:'#e3c13b',pants:'#e8e4d8',boots:'#3a2a1a',arms:'gi',eye:'#5a6a3a',tabard:true,chains:true},
  leorio:{skin:'#efc6a0',hc:'#1a1a1a',gi:'#2a3a6a',gi2:'#1a1a2a',pants:'#2a3a6a',boots:'#1a1a1a',arms:'gi',eye:'#2a2a2a',tie:'#1a1a2a',shades:true},
  biscuit:{skin:'#f8dccc',hc:'#f2d870',gi:'#d8506a',gi2:'#f4f4f4',pants:'#d8506a',boots:'#8a2a3a',arms:'skin',eye:'#4a8ad8',dress:'#d8506a',pigtails:true},
  kite:{skin:'#efc6a0',hc:'#eef0f4',gi:'#e8e2d0',gi2:'#5a4a3a',pants:'#3a3a40',boots:'#2a2018',arms:'gi',eye:'#2a2a2a',hat:'#e8e2d0',weapon:'scythe'},
  morel:{skin:'#c89870',hc:'#e8e8e8',gi:'#2a2a30',gi2:'#5a5a64',pants:'#2a2a30',boots:'#1a1a1a',arms:'gi',eye:'#2a2a2a',big:true,pipe:true,shades:true},
  knuckle:{skin:'#efc6a0',hc:'#141418',gi:'#1a1a24',gi2:'#e8e8ec',pants:'#1a1a24',boots:'#0e0e12',arms:'gi',eye:'#2a2a2a'},
  netero:{skin:'#e8c0a0',hc:'#f4f4f4',gi:'#f4f4f0',gi2:'#1a1a1a',pants:'#f4f4f0',boots:'#2a2a2a',arms:'skin',eye:'#2a2a2a',bald:true,longbeard:true,topknot:true,kanji:'心'},
  ging:{skin:'#efc6a0',hc:'#1a1f1a',gi:'#3a3a3a',gi2:'#c8a060',pants:'#3a3a3a',boots:'#2a2018',arms:'gi',eye:'#2a2a2a',headwrap:'#e8e2d0'},
  hisoka:{skin:'#f6dcc4',hc:'#ff4a6a',gi:'#e8e0f0',gi2:'#ff8ad8',pants:'#3a2a5a',boots:'#ff8ad8',arms:'gi',eye:'#e8b020',clown:true,cardsuit:true,weapon:'card'},
  zeno:{skin:'#e8c0a0',hc:'#e8e8e8',gi:'#e8e0c0',gi2:'#3a3a3a',pants:'#3a5a7a',boots:'#2a2a2a',arms:'skin',eye:'#2a2a2a',mustache:true,kanji:'一'},
  hunter1:{skin:'#f0c39a',hc:'#5a3a22',gi:'#c87a2a',gi2:'#3a3a3a',pants:'#3a4a5a',boots:'#2a2018',arms:'skin',eye:'#2a2230',plate:true},
  nenuser:{skin:'#efc6a0',hc:'#2a2a4a',gi:'#3a6a6a',gi2:'#e8e0c0',pants:'#2a3a3a',boots:'#1a1a1a',arms:'gi',eye:'#2a2a2a',q:'#5affd8'},
  butler:{skin:'#efc6a0',hc:'#1a1a1a',gi:'#1a1a22',gi2:'#e8e8ec',pants:'#1a1a22',boots:'#0e0e12',arms:'gi',eye:'#2a2a2a',tie:'#1a1a1a',glasses:true},
  bhunter:{skin:'#e0b090',hc:'#4a3a2a',gi:'#5a6a3a',gi2:'#3a3a2a',pants:'#4a4a3a',boots:'#2a2018',arms:'gi',eye:'#2a2a2a',weapon:'rifle',hat:'#4a5a2a'},
  hmedic:{skin:'#f3d4b6',hc:'#3a2a1a',gi:'#f4f4f8',gi2:'#2ab8a8',pants:'#2a3a6a',boots:'#2a2a2a',arms:'gi',eye:'#2a2230',cross:'#2ab8a8'},
  smokesold:{skin:'#b8b8c0',gi:'#9a9aa4',gi2:'#7a7a84',pants:'#9a9aa4',boots:'#7a7a84',arms:'skin',eye:'#2a2a2a',helm:'#a8a8b2',weapon:'sword',wcol:'#d8d8e0'},
  golem:{skin:'#8a8274',gi:'#7a7264',gi2:'#5a5448',pants:'#7a7264',boots:'#5a5448',arms:'skin',eye:'#5affd8',bald:true,glowEye:'#5affd8',big:true},
  chimant:{skin:'#4a6a3a',gi:'#3a5a2a',gi2:'#2a3a1a',pants:'#3a5a2a',boots:'#1e2e14',arms:'skin',eye:'#ffe14d',insect:'#3a5a2a',claws:true},
  pitou:{skin:'#f6e0d0',hc:'#eef0f4',gi:'#f4f4f4',gi2:'#3a3a3a',pants:'#2a2a2a',boots:'#2a2a2a',arms:'skin',eye:'#d84a4a',catears:true,claws:true},
  chrollo:{skin:'#f3d0b0',hc:'#141418',gi:'#2a2a30',gi2:'#e8e2d0',pants:'#2a2a30',boots:'#1a1a1a',arms:'gi',eye:'#2a2a2a',coat:'#16161c',fcross:true,weapon:'dagger'},
  spider:{skin:'#efc6a0',hc:'#2a2a2a',gi:'#3a2a4a',gi2:'#8a8a8a',pants:'#2a2a2a',boots:'#1a1a1a',arms:'gi',eye:'#2a2a2a',weapon:'katana'},
});
const HXLOOKS=['gon','gonadult','killua','kurapika','leorio','biscuit','kite','morel','knuckle','netero','ging','hisoka','zeno','hunter1','nenuser','butler','bhunter','hmedic','smokesold','golem','chimant','pitou','chrollo','spider'];
for(const k of HXLOOKS){LOOK[k].k=k;NEWLOOKS.push(k);}
HAIR.gon=[[-6,2],[-7,-3],[-9,-9],[-5,-8],[-6,-15],[-2,-10],[0,-17],[2.5,-10],[5,-15],[5.4,-8],[9,-10],[7,-4],[6.5,0],[4,-3],[1.5,-1.5],[-1,-3],[-3.5,-1.5]];
Object.assign(HAIR,{gonadult:HAIR.broly,killua:HAIR.goku,kurapika:HAIR.mikasa,leorio:HAIR.short,biscuit:HAIR.uraraka,kite:HAIR.eraser,morel:HAIR.levi,knuckle:HAIR.metalbat,ging:HAIR.gon,hisoka:HAIR.vegeta,zeno:HAIR.short,
  hunter1:HAIR.short,nenuser:HAIR.eren,butler:HAIR.levi,bhunter:HAIR.short,hmedic:HAIR.uraraka,pitou:HAIR.mikasa,chrollo:HAIR.levi,spider:HAIR.eren});
const HX1_V=[{gi:'#c87a2a'},{gi:'#5a7aa8'},{gi:'#8a4a8a'},{gi:'#6a8a3a'}];
{const _ul=unitLook;unitLook=function(u){if(u.D.look==='hunter1')return Object.assign({},LOOK.hunter1,HX1_V[(u.v||0)%4]);return _ul(u);};}
{const _mh=moreHead2;moreHead2=function(c,L,k,hx,hy,st){_mh(c,L,k,hx,hy,st);const ey=hy+.6;
  if(k==='kurapika'&&st.ssj){c.globalCompositeOperation='lighter';for(const ex of[hx+1.5,hx+4.6])drawGlow(c,ex,ey,3,'#ff2a2a',1);c.globalCompositeOperation='source-over';c.fillStyle='#ff2a2a';for(const ex of[hx+1.8,hx+4.9]){c.beginPath();c.arc(ex,ey+.2,.7,0,PI2);c.fill();}}
  if(L.longbeard){c.fillStyle='#f4f4f4';c.beginPath();c.moveTo(hx+.5,hy+3.4);c.quadraticCurveTo(hx+3,hy+15,hx+4.5,hy+18);c.quadraticCurveTo(hx+6.5,hy+10,hx+6.4,hy+3.4);c.closePath();c.fill();c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=.5;c.stroke();}
  if(L.mustache){c.fillStyle=L.hc;c.beginPath();c.ellipse(hx+3.4,hy+3.6,2.8,.9,0,0,PI2);c.fill();}
  if(L.topknot){c.fillStyle='#f4f4f4';c.beginPath();c.ellipse(hx-1,hy-7.6,1.8,2.4,-.3,0,PI2);c.fill();c.strokeStyle=OUT;c.lineWidth=.6;c.stroke();}
  if(L.catears){for(const s of[-1,1]){c.beginPath();c.moveTo(hx+s*2-1,hy-6);c.lineTo(hx+s*4.6,hy-12);c.lineTo(hx+s*5.6,hy-5);c.closePath();fo(c,L.hc,.7);c.fillStyle='#f0b8c0';c.beginPath();c.moveTo(hx+s*3,hy-6.4);c.lineTo(hx+s*4.6,hy-10);c.lineTo(hx+s*5,hy-6);c.closePath();c.fill();}}
  if(L.headwrap){c.fillStyle=L.headwrap;c.fillRect(hx-6.4,hy-5,13,2.4);c.beginPath();c.moveTo(hx-6,hy-4);c.lineTo(hx-10,hy-1);c.lineTo(hx-9,hy-4.6);c.closePath();c.fill();}
  if(L.hat){c.fillStyle=L.hat;c.beginPath();c.ellipse(hx,hy-5.4,8.6,2,0,0,PI2);c.fill();c.strokeStyle=OUT;c.lineWidth=.7;c.stroke();c.beginPath();c.ellipse(hx-.4,hy-7.2,5.4,3.6,0,PI,PI2);c.closePath();c.fill();c.stroke();}
  if(L.clown){c.fillStyle='#ff4a8a';c.beginPath();for(let i=0;i<10;i++){const a=-PI/2+i*PI/5,r=i%2?.6:1.4;c.lineTo(hx+1+Math.cos(a)*r,hy+3.8+Math.sin(a)*r);}c.closePath();c.fill();c.fillStyle='#5ad8ff';c.beginPath();c.moveTo(hx+5,hy+2.6);c.quadraticCurveTo(hx+6.2,hy+4.4,hx+5,hy+5);c.quadraticCurveTo(hx+3.8,hy+4.4,hx+5,hy+2.6);c.fill();}
  if(L.fcross){c.strokeStyle='#1a1a1a';c.lineWidth=.6;c.beginPath();c.moveTo(hx+3,hy-3.4);c.lineTo(hx+3,hy-.8);c.moveTo(hx+1.9,hy-2.4);c.lineTo(hx+4.1,hy-2.4);c.stroke();}
  if(L.pigtails){for(const s of[-1,1]){c.beginPath();c.ellipse(hx+s*6.4,hy-1,2.2,4.2,s*.4,0,PI2);fo(c,L.hc,.7);}}
  if(L.pipe){c.strokeStyle='#5a3a1a';c.lineWidth=1.1;c.beginPath();c.moveTo(hx+4.6,hy+4.2);c.lineTo(hx+8,hy+5.4);c.stroke();c.fillStyle='#5a3a1a';c.fillRect(hx+7.6,hy+3.4,2,2.4);}};}
{const _mc=moreCostume2;moreCostume2=function(c,L,k,bw,top,bob){_mc(c,L,k,bw,top,bob);const B=-9.4+bob;
  if(L.tabard){c.fillStyle='#e8e4d8';c.fillRect(-1.6,top,3.2,B-top+5);c.strokeStyle='#e3c13b';c.lineWidth=.7;c.strokeRect(-4.4*bw,top+.6,8.8*bw,B-top);c.fillStyle='#e3c13b';c.fillRect(-4.6*bw,B-1.4,9.2*bw,1.4);}
  if(L.kanji){c.fillStyle='#1a1a1a';c.font='bold 5px serif';c.textAlign='center';c.fillText(L.kanji,.4,top+6.4);}
  if(L.plate){c.fillStyle='#f4f4f4';c.beginPath();c.arc(1.6,top+3.6,2,0,PI2);c.fill();c.strokeStyle=OUT;c.lineWidth=.4;c.stroke();c.fillStyle='#1a1a1a';c.font='bold 2.2px sans-serif';c.textAlign='center';c.fillText('405',1.6,top+4.4);}
  if(L.cardsuit){c.fillStyle='#ff4a8a';c.font='bold 3.4px sans-serif';c.textAlign='center';c.fillText('♦',-2.6,top+4.4);c.fillStyle='#3a2a5a';c.fillText('♣',2.6,top+4.4);}};}
Object.assign(WPN,{scythe:(c,x,y)=>{c.strokeStyle='#5a4a3a';c.lineWidth=1.4;c.beginPath();c.moveTo(x-2,y+7);c.lineTo(x+3,y-14);c.stroke();c.strokeStyle='#d8dce8';c.lineWidth=1.6;c.beginPath();c.moveTo(x+3,y-14);c.quadraticCurveTo(x+12,y-14,x+15,y-6);c.stroke();},
  card:(c,x,y)=>{c.save();c.translate(x+2,y-2);c.rotate(-.4);c.fillStyle='#f8f8f8';c.fillRect(-1.6,-2.4,3.2,4.6);c.strokeStyle=OUT;c.lineWidth=.4;c.strokeRect(-1.6,-2.4,3.2,4.6);c.fillStyle='#ff4a8a';c.fillRect(-.6,-.8,1.2,1.4);c.restore();},
  rifle:(c,x,y)=>{c.strokeStyle='#2a2a2a';c.lineWidth=1.8;c.beginPath();c.moveTo(x-3,y+1);c.lineTo(x+12,y-3);c.stroke();c.fillStyle='#5a3a1a';c.fillRect(x-5,y-.4,4,2.4);}});
{const _hd=hand;hand=function(c,L,k,x,y,bw,back,st){_hd(c,L,k,x,y,bw,back,st);if(L.chains&&back){c.strokeStyle='#c8ccd4';c.lineWidth=.6;for(let i=0;i<4;i++){c.beginPath();c.ellipse(x-1-i*1.6,y+1.2+i*1.4,.9,.6,.6,0,PI2);c.stroke();}}};}
// stance visuals: Ren flames, Zetsu ghosts (seen only by their owner), smoke soldiers
{const _du=drawUnitBody;drawUnitBody=function(c,u,x,y,ghost){const N=!ghost&&u.isU&&u.side!=null&&sides[u.side]?nenOf(u):null;
  if(N===NEN.ren){c.globalCompositeOperation='lighter';drawGlow(c,x,y-(u.z||0)-14,22+Math.sin(u.anim*12)*2,'#ff8a3a',.45);c.globalCompositeOperation='source-over';}
  else if(N===NEN.ten&&!u.moving){c.strokeStyle='rgba(90,255,216,.35)';c.lineWidth=1;c.beginPath();c.ellipse(x,y-(u.z||0)-14,u.r+6,u.r+14,0,0,PI2);c.stroke();}
  const ga=u.hid?.42:u.key==='smoke'?.72:1;if(ga<1){c.save();c.globalAlpha*=ga;_du(c,u,x,y,ghost);c.restore();}else _du(c,u,x,y,ghost);};}
// ---- creatures & machines ----
function hxDog(c,u,x,y){const t=u.moving?u.anim*10:0,f=Math.cos(u.ang||0)>=0?1:-1,a=u.atk>0?Math.sin(u.atk/.22*PI):0;c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x+3,y+3,22,7,0,0,PI2);c.fill();c.save();c.translate(x,y);c.scale(f,1);
  for(let i=0;i<4;i++){const lx=-12+i*8,sw=Math.sin(t+i*1.6)*3.4;c.fillStyle=i%2?'#3a3a42':'#4a4a54';c.beginPath();c.roundRect(lx+sw-2.4,-10,5,11,2);c.fill();}
  c.beginPath();c.ellipse(0,-15,19,10,0,0,PI2);c.fillStyle=cel(c,'#5a5a66',-15,-25,15,-5,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1.2;c.stroke();c.strokeStyle='#3a3a42';c.lineWidth=2.4;c.beginPath();c.moveTo(-18,-16);c.quadraticCurveTo(-26,-24+Math.sin(u.anim*8)*3,-24,-30);c.stroke();
  c.save();c.translate(17+a*5,-20-a*3);c.beginPath();c.ellipse(0,0,8.4,7,0,0,PI2);c.fillStyle=cel(c,'#5a5a66',-7,-7,7,7,.55);c.fill();c.stroke();for(const s of[-1,1]){c.beginPath();c.moveTo(-3+s*3,-5);c.lineTo(-1+s*4,-12);c.lineTo(1+s*3,-5);c.closePath();c.fill();c.stroke();}
  c.fillStyle='#4a4a54';c.beginPath();c.ellipse(6,2,5,3.4,0,0,PI2);c.fill();c.fillStyle='#f4f0e0';c.beginPath();c.arc(3,-2,1.8,0,PI2);c.fill();c.fillStyle='#1a1a1a';c.beginPath();c.arc(3.4,-2,1,0,PI2);c.fill();
  if(a>.2){c.fillStyle='#f4f0e0';for(let i=0;i<3;i++){c.beginPath();c.moveTo(3+i*2,3.6);c.lineTo(4+i*2,6);c.lineTo(5+i*2,3.6);c.fill();}}c.restore();c.restore();}
function hxAirship(c,u,x,y){const z=(u.z||16)+6,yy=y-z-Math.sin(u.anim*1.6)*2,f=Math.cos(u.ang||0)>=0?1:-1;c.save();c.translate(x,yy);c.scale(f,1);
  c.beginPath();c.ellipse(0,-6,20,8,0,0,PI2);c.fillStyle=cel(c,'#e8e2d0',-20,-14,20,2,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=.6;for(let i=-2;i<=2;i++){c.beginPath();c.ellipse(0,-6,20,8-Math.abs(i)*1.6,0,PI*1.05,PI*1.95);c.stroke();}
  c.fillStyle='#2ab8a8';c.fillRect(-20,-7,40,2);c.beginPath();c.moveTo(-18,-6);c.lineTo(-26,-14);c.lineTo(-24,-6);c.lineTo(-26,2);c.closePath();fo(c,'#2ab8a8',.8);
  c.beginPath();c.roundRect(-7,2,14,5,2);fo(c,'#5a4a3a',.8);c.fillStyle='#ffe9a0';for(let i=0;i<3;i++)c.fillRect(-5+i*4,3.6,2,1.6);c.strokeStyle='rgba(200,200,200,.7)';c.lineWidth=.8;c.beginPath();const pr=u.anim*30;c.ellipse(-22,-6,1,4*Math.abs(Math.sin(pr)),0,0,PI2);c.stroke();c.restore();}
function hxTruck(c,u,x,y){c.save();c.translate(x,y);c.rotate(u.ang||0);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.roundRect(-15,-8,32,18,3);c.fill();c.beginPath();c.roundRect(-16,-9,22,18,2);fo(c,'#5a4a3a');
  c.fillStyle='#ffcf3a';c.globalAlpha=.5+.4*Math.min(1,(u.load||0)/CAP);c.fillRect(-14,-6,18,12);c.globalAlpha=1;c.beginPath();c.roundRect(6,-8,11,16,3);fo(c,'#2ab8a8');c.fillStyle='#1a2a2a';c.fillRect(13,-6,3,12);c.restore();}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){if(u.fac==='hxh'){const D=u.D||UDEF.hxh[u.key];if(D.harv)return hxTruck(c,u,x,y);if(u.key==='jet')return hxAirship(c,u,x,y);return hxDog(c,u,x,y);}return _dv(c,u,x,y,ghost);};}
{const _dmc=drawMech;drawMech=function(c,u,x,y,ghost){if(u.fac==='hxh')return drawFighter(c,x,y,LOOK.golem,Math.cos(u.ang||0)>=0?1:-1,u.anim,u.moving,2.5,{atk:u.atk,atkN:u.atkN||0,melee:true});return _dmc(c,u,x,y,ghost);};}
// ---- buildings ----
function hxPlinth(c,x0,y0,W,H){box3(c,x0+3,y0+4,W-6,H-7,0,4,'#8a8a7a',{top:'#9a9a88'});const a=P3(x0+8,y0+H-6,4.2),b=P3(x0+W-8,y0+H-6,4.2);c.strokeStyle='rgba(42,184,168,.55)';c.lineWidth=.9;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}
function nenFlame(c,x,y,z,r,a){const p=P3(x,y,z);c.globalCompositeOperation='lighter';for(let i=0;i<3;i++)drawGlow(c,p[0]+Math.sin(a*5+i*2)*r*.2,p[1]-i*r*.35,r*(1-i*.25),'#5affd8',.45);c.globalCompositeOperation='source-over';}
const HXB={
 hq(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+10,y0+40,76,44,4,34,'#e8e2d0');stoneLines(c,x0+10,y0+40,76,44,4,34);towerWin(c,x0+10,y0+40,76,44,4,34,'#5a8aa8',a,null,7,2);
   box3(c,x0+32,y0+22,32,30,4,78,'#f2ecdc');towerWin(c,x0+32,y0+22,32,30,4,78,'#5a8aa8',a,(i,j)=>Math.sin(a+i+j*2)>.6,3,7);pyramid3(c,x0+30,y0+20,36,34,82,14,'#2ab8a8');
   const t=P3(x0+48,y0+52,62);c.fillStyle='#2ab8a8';c.beginPath();c.arc(t[0],t[1],7,0,PI2);c.fill();c.strokeStyle='#f4f4f4';c.lineWidth=1.2;c.stroke();text3(c,'H',t[0],t[1]+.5,10,'#ffffff');flag3(c,x0+48,y0+36,96,a,'#2ab8a8');},
 power(c,o){const{x0,y0,W,H,a,cx,cy}=o;hxPlinth(c,x0,y0,W,H);cyl3(c,cx,cy,15,4,10,'#a8a290');for(let i=0;i<4;i++){const an=i/4*PI2+.4;box3(c,cx+Math.cos(an)*18-3,cy+Math.sin(an)*14-3,6,6,4,18,'#8a8474');}
   sphere3(c,cx,cy,8,22+Math.sin(a*2)*2,'#5affd8');nenFlame(c,cx,cy,34,16,a);},
 refinery(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+34,54,48,4,26,'#8a6a42');woodLines(c,x0+8,y0+34,54,48,4,26);gable3(c,x0+8,y0+34,54,48,30,14,'#5a3a22','#8a6a42');
   for(let i=0;i<3;i++)box3(c,x0+66,y0+40+i*14,12,10,4+(i===1?10:0),10,'#b88a52');for(let i=0;i<5;i++)manaCrystal(c,x0+70+(i%3)*6,y0+76,8,3,'#ffcf3a',a+i);},
 barracks(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+14,48,40,4,34,'#e8e2d0');towerWin(c,x0+8,y0+14,48,40,4,34,'#5a8aa8',a,null,4,3);box3(c,x0+6,y0+12,52,44,38,4,'#2ab8a8');
   const t=P3(x0+20,y0+54,22);c.fillStyle='#f4f4f4';c.beginPath();c.arc(t[0],t[1],6,0,PI2);c.fill();c.strokeStyle=LINE;c.lineWidth=.8;c.stroke();text3(c,'287',t[0],t[1]+.4,6,'#1a1a1a');},
 factory(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+18,80,62,4,30,'#a8a290');gable3(c,x0+8,y0+18,80,62,34,20,'#2a8a80','#a8a290');
   onFront(c,x0+8,y0+18,62,4,x=>{x.fillStyle='#2a2a2a';x.fillRect(22,-28,36,28);x.fillStyle='#e8e2d0';x.beginPath();x.ellipse(40,-14,14,6,0,0,PI2);x.fill();});},
 turret(c,o){const{x0,y0,a,cx,cy,b}=o;for(const[dx,dy]of[[-8,-6],[8,-6],[-8,8],[8,8]])line3(c,[cx+dx,cy+dy,0],[cx+dx*.5,cy+dy*.5,28],'#6a4a2a',2);box3(c,cx-8,cy-7,16,14,26,4,'#8a6a42');
   const fire=b&&b.target&&b.cd>(b.D.wpn.rof-.25);sphere3(c,cx,cy,4,30,'#5affd8');nenFlame(c,cx,cy,36,fire?14:9,a);},
 temple(c,o){const{x0,y0,W,H,a,cx,cy}=o;hxPlinth(c,x0,y0,W,H);cyl3(c,cx,cy,22,4,24,'#d8d2c0');cyl3(c,cx,cy,16,28,70,'#e8e2d0');for(let i=0;i<6;i++)band3(c,cx,cy,16,36+i*10,'rgba(90,138,168,.8)',1.4);
   cyl3(c,cx,cy,20,98,6,'#2ab8a8');cyl3(c,cx,cy,10,104,22,'#e8e2d0');cone3(c,cx,cy,12,126,10,'#2ab8a8');beacon(c,cx,cy,138,a,'#5affd8');},
 lab(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+10,y0+18,44,32,4,18,'#e8d8b8');woodLines(c,x0+10,y0+18,44,32,4,18);gable3(c,x0+8,y0+16,48,36,22,14,'#2a5a56','#e8d8b8');
   onFront(c,x0+10,y0+18,32,4,x=>{x.fillStyle='#f4ecd8';x.fillRect(14,-14,14,10);x.font='bold 7px serif';x.fillStyle='#1a1a1a';x.textAlign='center';x.fillText('念',21,-6.4);});},
 radar(c,o){const{x0,y0,W,H,a,cx,cy}=o;hxPlinth(c,x0,y0,W,H);cyl3(c,cx,cy,16,4,30,'#e8e2d0');dome3(c,cx,cy,16,34,14,'#c8d8e0');const p=P3(cx+6,cy,42);c.save();c.translate(p[0],p[1]);c.rotate(-.6+Math.sin(a*.5)*.3);
   c.fillStyle='#5a5a64';c.fillRect(0,-2,16,4);c.fillStyle='#8a929c';c.fillRect(14,-3,4,6);c.restore();beacon(c,cx,cy,50,a,'#5affd8');},
 def2(c,o){const{x0,y0,W,H,a,cx,cy,b}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+14,48,36,4,14,'#3a4a5a');cyl3(c,cx,cy,12,18,8,'#5a6a7a');const ang=(b&&b.tang)||-PI/4,p=P3(cx,cy,28);c.save();c.translate(p[0],p[1]);c.rotate(ang);
   c.beginPath();c.roundRect(-9,-7,16,14,3);c.fillStyle='#4a5a6a';c.fill();c.strokeStyle=LINE;c.lineWidth=.8;c.stroke();c.fillStyle='#2a3440';c.fillRect(4,-3,20,6);c.fillStyle='#2ab8a8';c.fillRect(-9,-1,16,2);c.restore();},
 market(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+6,y0+14,52,40,4,30,'#e8dcc0');for(let i=0;i<5;i++)cyl3(c,x0+10+i*11,y0+56,2.2,4,26,'#f4ecd8',{noTop:true});pyramid3(c,x0+4,y0+12,56,46,34,10,'#8a3a3a');
   onFront(c,x0+6,y0+14,40,4,x=>{x.fillStyle='#8a3a3a';x.fillRect(8,-30,36,6);x.font='bold 4.4px sans-serif';x.fillStyle='#ffe9a0';x.textAlign='center';x.fillText('ENCHÈRES',26,-25.6);});},
 hospital(c,o){const{x0,y0,W,H,a}=o;hxPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+14,48,40,4,40,'#f4f4f6');towerWin(c,x0+8,y0+14,48,40,4,40,'#5a8aa8',a,null,4,3);const p=P3(x0+32,y0+34,44);c.fillStyle='#2ab8a8';c.fillRect(p[0]-1.8,p[1]-6.5,3.6,13);c.fillRect(p[0]-6.5,p[1]-1.8,13,3.6);},
 training(c,o){const{x0,y0,W,H,a,cx,cy}=o;const q=P3(cx,cy,0);c.fillStyle='#4a8ad8';c.beginPath();c.ellipse(q[0],q[1],28,16,0,0,PI2);c.fill();c.fillStyle='#6ab84a';c.beginPath();c.ellipse(q[0],q[1]-1,20,11,0,0,PI2);c.fill();c.strokeStyle='#e8d8a0';c.lineWidth=1.4;c.stroke();
   palm(c,cx-8,cy-4,0,.6);const p=P3(cx+6,cy,22+Math.sin(a*2)*2);c.save();c.translate(p[0],p[1]);c.rotate(Math.sin(a)*.2);c.fillStyle='#f4ecd8';c.fillRect(-6,-9,12,17);c.strokeStyle='#c8a040';c.lineWidth=1;c.strokeRect(-6,-9,12,17);
   c.font='bold 6px Bangers, sans-serif';c.fillStyle='#2a6a3a';c.textAlign='center';c.fillText('GI',0,1.6);c.restore();c.globalCompositeOperation='lighter';drawGlow(c,p[0],p[1],14,'#ffe9a0',.5);c.globalCompositeOperation='source-over';},
 temple2(c,o){const{x0,y0,W,H,a}=o;box3(c,x0+3,y0+4,W-6,H-7,0,8,'#5a5248',{top:'#6a6256'});box3(c,x0+16,y0+26,64,50,8,34,'#3a3438');stoneLines(c,x0+16,y0+26,64,50,8,34);gable3(c,x0+14,y0+24,68,54,42,18,'#1e1a22','#3a3438');
   for(const[x,y]of[[x0+18,y0+28],[x0+78,y0+28]]){cyl3(c,x,y,7,8,52,'#2e282e');cone3(c,x,y,9,60,14,'#1e1a22');}towerWin(c,x0+16,y0+26,64,50,8,34,'#c8a040',a,(i,j)=>Math.sin(a*.6+i*3)>.4,6,2);},
 unique(c,o){const{x0,y0,W,H,a,cx}=o;box3(c,x0+4,y0+20,W-8,14,0,52,'#7a7468');stoneLines(c,x0+4,y0+20,W-8,14,0,52);onFront(c,x0+4,y0+20,14,0,x=>{x.fillStyle='#4a453e';x.fillRect(12,-46,32,46);x.strokeStyle='#2a2620';x.lineWidth=1.2;x.beginPath();x.moveTo(28,-46);x.lineTo(28,0);x.stroke();
     x.font='bold 5px sans-serif';x.fillStyle='#e8dcc0';x.textAlign='center';for(let i=0;i<4;i++)x.fillText(String(i+1),18+(i%2)*20,-38+Math.floor(i/2)*14);});},
 wall(c,o){const{x0,y0}=o;box3(c,x0+2,y0+6,28,22,0,22,'#7a7468');stoneLines(c,x0+2,y0+6,28,22,0,22);},
};
{const _d3=drawB3;drawB3=function(c,b,ghost){if(b.fac!=='hxh')return _d3(c,b,ghost);const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;(HXB[b.key]||HXB.barracks)(c,{x0,y0,W,H,cx:x0+W/2,cy:y0+H/2,a:b.anim||0,b:ghost?null:b,ghost});};}
{const _bq=buildPost;buildPost=function(c,b){if(b.fac!=='hxh')return _bq(c,b);const r=b.rise,x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,h=bH(b),a=b.anim||0,ey=y0+H-(H+h+30)*r;
  c.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const x=x0+W*(i/6);drawGlow(c,x,ey+Math.sin(a*8+i)*3,10,'#5affd8',.6);}c.globalCompositeOperation='source-over';
  c.font='bold 10px serif';c.textAlign='center';c.fillStyle='#5affd8';c.fillText('念 '+Math.floor(r*100)+' %',cx,y0-h-14);};}
{const _ub=updBuildAnim;updBuildAnim=function(b,dt){_ub(b,dt);if(b.fac==='hxh'&&b.rise<1&&plSees(b)&&R()<dt*14)part('spark',b.tx*TILE+R()*b.w*TILE,b.ty*TILE+b.h*TILE-R()*bH(b)*b.rise,rr(-20,20),rr(-60,-20),.6,2,'#5affd8');};}
// ---- effects ----
{const _ds=drawSpecial;drawSpecial=function(c){_ds(c);for(const f of fxs){const p=f.t/f.dur;
  if(f.type==='assassin'){c.save();c.globalAlpha=1-p;c.translate(f.x,f.y-p*16);c.font='16px Bangers, Impact, sans-serif';c.textAlign='center';c.lineWidth=4;c.strokeStyle='#1a1a1a';c.strokeText('ASSASSINAT !',0,0);c.fillStyle='#c8a0ff';c.fillText('ASSASSINAT !',0,0);c.restore();}
  else if(f.type==='slotnum'){c.save();c.globalAlpha=Math.min(1,(1-p)*3);c.fillStyle='#1a1a22';c.strokeStyle='#e3c13b';c.lineWidth=1.4;c.beginPath();c.roundRect(f.x-26,f.y-14,52,24,3);c.fill();c.stroke();c.font='14px Bangers, Impact, sans-serif';c.textAlign='center';c.fillStyle='#ffe14d';
    c.fillText(p<.35?String(1+((f.t*30)|0)%9):f.n+' · '+f.w,f.x,f.y+3);c.restore();}
  else if(f.type==='bungee'){c.strokeStyle='rgba(255,106,168,'+(1-p)+')';c.lineWidth=1.6;for(let i=0;i<6;i++){const an=i/6*PI2;c.beginPath();c.moveTo(f.x1,f.y1-14);c.quadraticCurveTo((f.x1+f.x)/2,(f.y1+f.y)/2-30,f.x+Math.cos(an)*f.r*.6,f.y+Math.sin(an)*f.r*.4);c.stroke();}}
  else if(f.type==='guanyin'){const a=p<.2?p/.2:p>.75?(1-p)/.25:1;c.save();c.globalAlpha=a*.85;c.globalCompositeOperation='lighter';const x=f.x,y=f.y;drawGlow(c,x,y-90,110,'#ffd23a',.6);
    c.fillStyle='rgba(255,210,80,.55)';c.beginPath();c.ellipse(x,y-150,22,26,0,0,PI2);c.fill();c.beginPath();c.moveTo(x-40,y-120);c.lineTo(x+40,y-120);c.lineTo(x+30,y-20);c.lineTo(x-30,y-20);c.closePath();c.fill();
    for(let i=0;i<14;i++){const an=-PI*.9+i/13*PI*.8;c.beginPath();c.ellipse(x+Math.cos(an)*90,y-110+Math.sin(an)*70,9,5,an,0,PI2);c.fill();}c.restore();}
  else if(f.type==='rose'&&!f.done){c.strokeStyle='rgba(255,106,168,'+(.4+.4*Math.sin(f.t*10))+')';c.lineWidth=3;c.setLineDash([10,8]);c.beginPath();c.ellipse(f.x,f.y,f.rad,f.rad*.6,0,0,PI2);c.stroke();c.setLineDash([]);
    const q=P3(f.x,f.y,10);c.fillStyle='#ff4a8a';for(let i=0;i<5;i++){const an=i/5*PI2+f.t;c.beginPath();c.ellipse(q[0]+Math.cos(an)*4,q[1]-8+Math.sin(an)*2,4,6,an,0,PI2);c.fill();}}
  else if(f.type==='poison'){const a=f.t<1?f.t:f.t>f.dur-2?(f.dur-f.t)/2:1;c.fillStyle='rgba(176,74,138,'+(.18*a)+')';c.beginPath();c.ellipse(f.x,f.y,f.r,f.r*.6,0,0,PI2);c.fill();
    if(f.t<1.6){const h=f.t/1.6;c.globalCompositeOperation='lighter';drawGlow(c,f.x,f.y-60-h*140,90*(1-h*.3),'#ff9ad8',.6*(1-h));drawGlow(c,f.x,f.y-30,60,'#ffffff',.5*(1-h));c.globalCompositeOperation='source-over';}}}};}
// ---- Nen stance bar (shown when you play Hunter × Hunter) ----
(function(){const css=document.createElement('style');css.textContent=`#nenbar{position:fixed;top:60px;left:330px;z-index:5;display:none;gap:4px;align-items:center;background:#0b1017e6;border:1px solid var(--line);border-radius:8px;padding:4px 6px}
#nenbar b{font-family:var(--f-disp);font-weight:400;font-size:17px;letter-spacing:1px;color:#5affd8;margin:0 4px}#nenbar button{font-weight:700;font-size:12px;padding:5px 10px;border-radius:5px;background:var(--steel2);border:1px solid var(--line);color:inherit;cursor:pointer}
#nenbar button.on{color:#111}#nenbar small{font-size:11px;color:var(--muted);margin-left:4px;min-width:30px}`;document.head.appendChild(css);
  const d=document.createElement('div');d.id='nenbar';d.innerHTML='<b>NEN</b>'+['ten','ren','zetsu'].map(m=>`<button type="button" data-n="${m}" title="${NEN[m].desc}">${NEN[m].name}</button>`).join('')+'<small></small>';document.body.appendChild(d);
  d.querySelectorAll('button').forEach(b=>b.onclick=()=>{audioInit();if(!setNen(PL,b.dataset.n)){feedPush('Changement de posture possible dans '+Math.ceil((sides[PL].nenT||0)-gtime)+' s','#ffc53d');sfx('err');}});
  window.addEventListener('keydown',e=>{if(G.state!=='play'||e.ctrlKey||e.metaKey||e.key.toLowerCase()!=='z')return;const s=sides[PL];if(!s||s.fac!=='hxh')return;const o=['ten','ren','zetsu'],n=o[(o.indexOf(s.nen||'ten')+1)%3];if(!setNen(PL,n))sfx('err');});})();
{const _ru=refreshUI;refreshUI=function(){_ru();const d=document.getElementById('nenbar'),s=sides[PL];if(!d)return;const show=G.state==='play'&&s&&s.fac==='hxh';d.style.display=show?'flex':'none';if(!show)return;
  const cur=s.nen||'ten';d.querySelectorAll('button').forEach(b=>{const on=b.dataset.n===cur;b.classList.toggle('on',on);b.style.background=on?NEN[b.dataset.n].col:'';});const cd=Math.ceil((s.nenT||0)-gtime);d.querySelector('small').textContent=cd>0?cd+' s':'Z';};}
