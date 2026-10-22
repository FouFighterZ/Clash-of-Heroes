// ===== Attack on Titan faction: data, mechanics, sprites, buildings =====
FAC.aot={name:'Bataillon d’exploration',anime:'L’Attaque des Titans',col:'#4f8be0',col2:'#7a5a3a',money:'Pièces',heroes:['eren','mikasa','levi','armin','hange']};
Object.assign(BDEF.hq.names,{aot:'Poste du Mur Rose'});Object.assign(BDEF.power.names,{aot:'Réserve de gaz'});Object.assign(BDEF.refinery.names,{aot:'Entrepôt de ravitaillement'});
Object.assign(BDEF.barracks.names,{aot:'Caserne des recrues'});Object.assign(BDEF.factory.names,{aot:'Atelier d’armement'});Object.assign(BDEF.turret.names,{aot:'Canon de rempart'});Object.assign(BDEF.temple.names,{aot:'QG du Bataillon'});
BDEF.wall={key:'wall',w:1,h:1,hp:1500,cost:100,time:3,pow:0,sight:3,req:['barracks'],only:'aot',names:{aot:'Mur de pierre',dbz:'Mur',mha:'Mur'},desc:'Bloc de muraille très résistant et bon marché. Bloque le passage des ennemis au sol.'};
UDEF.aot={
  inf1:{name:'Recrue',cost:130,time:6,hp:115,speed:64,dmg:11,range:18,rof:.8,melee:true,size:7,sight:6,look:'recruit',odm:true,nape:true,desc:'Lames et équipement tridimensionnel : traverse forêts et falaises, dégâts doublés contre les grandes cibles.'},
  inf2:{name:'Soldat lance-foudre',cost:340,time:10,hp:190,speed:60,dmg:28,range:145,rof:1.9,proj:'spear',splash:20,size:8,sight:7,look:'spearman',odm:true,antiBig:1.4,vsB:1.1,desc:'Lances explosives. Très efficaces contre les titans, robots et blindés.'},
  healer:{name:'Médecin militaire',cost:350,time:9,hp:170,speed:62,heal:26,range:120,size:7,sight:6,look:'medic',odm:true,desc:'Soigne les soldats proches. Équipé du matériel tridimensionnel.'},
  harv:{name:'Chariot de ravitaillement',cost:650,time:13,hp:850,speed:48,size:14,sight:4,at:'factory',harv:true,veh:true,desc:'Chariot tiré par des chevaux. Récolte les cristaux.'},
  tank:{name:'Canon de campagne',cost:700,time:13,hp:620,speed:40,dmg:72,range:290,rof:3,proj:'shell',splash:44,size:14,sight:8,at:'factory',veh:true,vsB:1.5,desc:'Artillerie à très longue portée, lente et fragile au contact.'},
  jet:{name:'Éclaireur à cheval',cost:450,time:9,hp:380,speed:138,dmg:14,range:120,rof:.8,proj:'bullet',size:11,sight:10,at:'factory',veh:true,mounted:true,desc:'Cavalerie rapide à grande vision. Idéale pour chasser les Dragon Balls.'},
  eren:{name:'Eren Jäger',hero:true,cost:1900,time:28,hp:1300,speed:86,dmg:40,range:18,rof:.7,melee:true,size:9,look:'eren',odm:true,nape:true,
    ab:{name:'Titan Assaillant',type:'shift',cd:45,dur:24,form:'attack',range:0,shout:'TATAKAE !!',col:'#ffcf8a'},desc:'Se transforme en Titan Assaillant pendant 24 s : énorme, robuste, frappe en zone.'},
  mikasa:{name:'Mikasa Ackerman',hero:true,cost:1600,time:24,hp:1250,speed:102,dmg:48,range:18,rof:.6,melee:true,size:9,look:'mikasa',odm:true,nape:true,
    ab:{name:'Assaut aux lames',type:'slash',cd:16,dmg:380,range:300,w:44,shout:'ASSAUT !!',col:'#ff6a6a'},desc:'Fonce à travers les lignes ennemies en tranchant tout sur son passage.'},
  levi:{name:'Livaï Ackerman',hero:true,cost:2100,time:30,hp:1350,speed:108,dmg:60,range:18,rof:.55,melee:true,size:9,look:'levi',odm:true,nape:true,
    ab:{name:'Tourbillon Ackerman',type:'dash_blast',cd:20,dmg:480,range:280,rad:72,knock:0,shout:'TOURBILLON !!',col:'#d8f0ff'},desc:'Le soldat le plus fort de l’humanité. Ravage les grandes cibles.'},
  armin:{name:'Armin Arlert',hero:true,cost:1800,time:26,hp:1000,speed:80,dmg:22,range:130,rof:1.1,proj:'bullet',size:8,look:'armin',odm:true,
    ab:{name:'Titan Colossal',type:'shift',cd:60,dur:18,form:'colossal',range:0,shout:'TITAN COLOSSAL !!',col:'#ff8a5a'},desc:'Devient le Titan Colossal : explosion à la transformation, vapeur brûlante autour de lui.'},
  hange:{name:'Hange Zoë',hero:true,cost:1300,time:20,hp:1050,speed:86,dmg:34,range:150,rof:1.3,proj:'spear',splash:24,size:9,look:'hange',odm:true,antiBig:1.5,
    ab:{name:'Salve lance-foudre',type:'barrage',cd:18,dmg:190,range:300,rad:58,n:5,shout:'FEU À VOLONTÉ !!',col:'#ffb040'},desc:'Scientifique audacieuse : salve de lances explosives sur une zone.'},
};
for(const k in UDEF.aot){const D=UDEF.aot[k];D.key=k;D.fac='aot';D.sight=D.sight||(D.hero?9:6);D.sightPx=D.sight*TILE;D.size=D.size||8;D.at=D.at||(D.hero?'temple':'barracks');D.rof=D.rof||1;D.req=D.req||[];if(D.hero)D.req=['temple'];}
PSPD.spear=380;
SUPER.aot={name:'Le Grondement',charge:230,rad:115,dmg:620,col:'#ffb07a',shout:'LE GRONDEMENT !!',look:'titan_attack',who:'Eren Jäger',delay:1.6};
const FORMS={attack:{look:'titan_attack',sc:2.7,size:21,speed:76,dmg:95,range:30,rof:1.1,melee:true,splash:36,shield:1800,sightPx:11*TILE},
  colossal:{look:'titan_colossal',sc:3.6,size:27,speed:46,dmg:120,range:36,rof:1.6,melee:true,splash:70,shield:2500,steam:24,sightPx:12*TILE}};
// ---- mechanics ----
const isBig=t=>t&&(t.isU&&(t.r>=12||t.form))&&!t.isB;
function startShift(u){const F=FORMS[u.D.ab.form];u.form=u.D.ab.form;u.formT=u.D.ab.dur;u.FD=Object.assign({},u.D,F);u.shield=F.shield;u.r=F.size;u.path=null;u.z=0;
  fxs.push({type:'bolt',x:u.x,y:u.y,t:0,dur:.5});part('flash',u.x,u.y-40,0,0,.5,160,'#ffe8a0');fxRing(u.x,u.y,'#ffffff',120);shake(14);sfx('big',u.x,u.y);
  for(let k=0;k<30;k++)part('smoke',u.x+rr(-30,30),u.y-rr(0,60),rr(-40,40),rr(-60,-10),rr(1.5,3),rr(12,22));
  if(u.form==='colossal'){splashDmg(u.x,u.y,150,520*dmgMult(u),u.side,360,.8,u);fxBoom(u.x,u.y,150,'#ff8a5a',true);scorch(u.x,u.y,150,.7);}
  else splashDmg(u.x,u.y,70,200,u.side,250,.6,u);}
function endShift(u){u.form=null;u.FD=null;u.shield=0;u.r=u.D.size;u.formT=0;for(let k=0;k<24;k++)part('smoke',u.x+rr(-30,30),u.y-rr(0,70),rr(-20,20),rr(-50,-10),rr(1.5,3),rr(12,24));
  if(u.side===PL)msg(u.D.name+' sort de son titan, épuisé','#ffcf8a');}
function updForms(u,dt){if(!u.form)return;u.formT-=dt;
  if(R()<dt*8)part('smoke',u.x+rr(-u.r,u.r)*.6,u.y-rr(20,u.r*3.2),rr(-10,10),rr(-40,-15),2,rr(8,14));
  if(u.FD.steam){u.stT=(u.stT||0)-dt;if(u.stT<=0){u.stT=.5;for(const e of ents){if(e.dead||ally(e.side,u.side)||!e.isU)continue;if(hyp(e.x-u.x,e.y-u.y)<80+e.r)damage(e,u.FD.steam*.5,u.side,u);}}
    if(R()<dt*20)part('smoke',u.x+rr(-60,60),u.y+rr(-40,30),rr(-10,10),rr(-30,-10),1.4,rr(10,18));}
  if(u.formT<=0)endShift(u);}
const odmBlocked=(x,y)=>{if(x<0||y<0||x>=WW||y>=WH)return true;const i=Math.floor(y/TILE)*MW+Math.floor(x/TILE);return blocked[i]===2||ter[i]===T_WATER;};
function odmAnchor(u){const tx=tileOf(u.x),ty=tileOf(u.y);for(let r=1;r<=3;r++)for(let y=ty-r;y<=ty+r;y++)for(let x=tx-r;x<=tx+r;x++){if(x<0||y<0||x>=MW||y>=MH)continue;const t=ter[ti(x,y)];if(t===T_FOREST||t===T_ROCK||blocked[ti(x,y)]===2)return r;}return 0;}
function findPathODM(sx,sy,gx,gy){const save=blocked;const tmp=new Uint8Array(NT);for(let i=0;i<NT;i++)tmp[i]=(save[i]===2||ter[i]===T_WATER)?1:0;blocked=tmp;let p;try{p=findPath(sx,sy,gx,gy);}finally{blocked=save;}return p;}
// AoT ODM swing visuals and steam/gas
function drawODM(c,u,x,y){if(!u.D.odm||u.form||!u.moving)return;const n=u.anchor||0;if(!n)return;const lift=u.z||0,a=u.ang;
  const ax=x+Math.cos(a)*44+Math.sin(u.anim*2)*6,ay=y-lift-40+Math.sin(a)*20;c.strokeStyle='rgba(40,40,40,.75)';c.lineWidth=.8;c.beginPath();c.moveTo(x,y-lift-12);c.lineTo(ax-6,ay);c.moveTo(x,y-lift-12);c.lineTo(ax+6,ay+4);c.stroke();}
// ---- looks ----
const SC={skin:'#f1c7a2',gi:'#8a5a32',gi2:'#5a3a1e',pants:'#ece6d6',boots:'#3a2616',arms:'gi',cape:'#2f6a3a',sc:true,eye:'#3a3020'};
Object.assign(LOOK,{
  recruit:Object.assign({},SC,{hair:'recruit',hc:'#6a4a2a',cape:null}),spearman:Object.assign({},SC,{hair:'short',hc:'#3a2a1a',spear:true,cape:null}),
  medic:Object.assign({},SC,{hair:'short',hc:'#a8783a',armband:'#2fd27a',cape:null}),
  eren:Object.assign({},SC,{hair:'eren',hc:'#4a3020',eye:'#2fa88a'}),mikasa:Object.assign({},SC,{hair:'mikasa',hc:'#15151c',eye:'#6a6a78',scarf:'#c8202e'}),
  levi:Object.assign({},SC,{hair:'levi',hc:'#121218',eye:'#6a7280',cravat:true}),armin:Object.assign({},SC,{hair:'mikasa',hc:'#f2d870',eye:'#4a8ad8'}),
  hange:Object.assign({},SC,{hair:'hange',hc:'#6a4024',eye:'#6a4024',goggles:true}),
  titan_attack:{skin:'#d9a383',gi:'#d9a383',gi2:'#c08a6a',pants:'#cf9878',boots:'#c08a6a',arms:'skin',hair:'titan_attack',hc:'#2a1c14',eye:'#38d0a0',titan:true},
  titan_colossal:{skin:'#b8533c',gi:'#b8533c',gi2:'#e08a6a',pants:'#a8432c',boots:'#9a3a28',arms:'skin',hair:'none',hc:'#b8533c',eye:'#f4f0e0',titan:true,colossal:true},
});
for(const k of['recruit','spearman','medic','eren','mikasa','levi','armin','hange','titan_attack','titan_colossal'])LOOK[k].k=k;
Object.assign(HAIR,{recruit:[[-5.8,1],[-6.6,-4],[-3.5,-7.4],[1,-7.6],[5,-5.8],[6.4,-2],[5.8,.6],[3.5,-2.6],[1.6,-1.4],[-.6,-3],[-3.2,-2.2]],
  eren:[[-6,3],[-7.5,-2],[-6,-6],[-3,-8],[1,-8.6],[4.6,-7],[6.9,-3.5],[6.4,0],[4,-3],[3.6,1.5],[1.5,-2.5],[-1,-3],[-3.5,-1.5],[-4.5,3]],
  mikasa:[[-6.5,4.6],[-7,-2],[-5,-6.6],[-1,-8],[3,-7.6],[6.6,-4],[7,2],[5.4,2],[5.4,-1.5],[3,-3.6],[1.4,-2.2],[-.6,-3.4],[-3,-2.4],[-4.6,1],[-4.6,4.6]],
  levi:[[-5.8,-.5],[-6.4,-4.5],[-4,-7.2],[0,-8],[4,-7.4],[6.3,-4.4],[6,-.5],[4.5,-3.4],[3.5,0],[2.2,-3.6],[.8,-1],[-.5,-4],[-2.5,-3.2],[-4,-1.5]],
  hange:[[-5.8,1],[-6.6,-4],[-3.5,-7.6],[1,-7.8],[5,-6],[6.6,-2],[6,1.5],[3.5,-2.6],[1.6,-1],[-.6,-3],[-3.2,-2.2]],
  titan_attack:[[-7,8],[-8,-2],[-6,-7],[-1,-9],[4,-8],[7.2,-4],[7.5,3],[6,3],[5,-2],[2,-4],[-1,-3.5],[-3.5,-1.5],[-4.5,7]]});
// costume overlays for Survey Corps and titans (called from drawFighter's costume hook)
function aotCostume(c,L,k,bw,top,bob){const B=-9.4+bob;
  if(L.titan){c.strokeStyle=L.colossal?'#f0a080':'rgba(120,60,40,.55)';c.lineWidth=.6;c.beginPath();
    for(let i=-2;i<=2;i++){c.moveTo(i*1.8,top+1);c.quadraticCurveTo(i*2.2,top+5,i*1.6,B);}c.moveTo(-4,top+4);c.quadraticCurveTo(0,top+6,4,top+4);c.stroke();return;}
  c.fillStyle='#f2efe6';c.beginPath();c.moveTo(-1.8,top-.2);c.lineTo(1.8,top-.2);c.lineTo(1.2,B);c.lineTo(-1.2,B);c.fill();
  c.strokeStyle='#2a1a10';c.lineWidth=.9;c.beginPath();c.moveTo(-4.8,top+5);c.lineTo(4.8,top+5);c.moveTo(-4.5,top+7.5);c.lineTo(4.5,top+7.5);c.stroke();
  c.fillStyle='#8a8f96';for(const s of[-1,1]){c.beginPath();c.roundRect(s*5.2-2,B-3.2,4,4.4,1);c.fill();c.strokeStyle=OUT;c.lineWidth=.6;c.stroke();}
  c.strokeStyle='#c8ccd2';c.lineWidth=.9;c.beginPath();c.moveTo(5.2,B-3);c.lineTo(8.5,B-6.5);c.stroke();
  if(L.cravat){c.fillStyle='#f6f6f2';c.beginPath();c.moveTo(-1.6,top-.5);c.lineTo(1.6,top-.5);c.lineTo(0,top+3);c.fill();}
  if(L.scarf){c.fillStyle=L.scarf;c.beginPath();c.roundRect(-3.4,top-2.2,7,2.8,1.2);c.fill();c.strokeStyle=OUT;c.lineWidth=.5;c.stroke();c.beginPath();c.moveTo(-3,top-1);c.quadraticCurveTo(-7,top+1,-8.5,top+5+Math.sin(bob*3)*.5);c.lineTo(-6.5,top+5);c.quadraticCurveTo(-5.5,top+1.5,-2,top);c.fill();}
  if(L.armband){c.fillStyle=L.armband;c.fillRect(-6.2,top+3,2.2,1.6);}
  // wings emblem on the jacket
  wings(c,-2.6,top+3.2,1.1);}
function wings(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#e8e8e8';c.beginPath();c.moveTo(0,-1.6);c.quadraticCurveTo(-2.2,-1.6,-2.4,1.6);c.lineTo(0,.6);c.closePath();c.fill();
  c.fillStyle='#3a6ad6';c.beginPath();c.moveTo(0,-1.6);c.quadraticCurveTo(2.2,-1.6,2.4,1.6);c.lineTo(0,.6);c.closePath();c.fill();c.restore();}
function aotFace(c,L,k,hx,hy,t){if(L.goggles){c.strokeStyle='#3a2a1a';c.lineWidth=.8;c.fillStyle='rgba(180,220,255,.35)';for(const ex of[hx+1.5,hx+4.6]){c.beginPath();c.arc(ex,hy+.6,1.9,0,PI2);c.fill();c.stroke();}c.beginPath();c.moveTo(hx-3,hy);c.lineTo(hx-.4,hy+.4);c.stroke();}
  if(L.titan){c.fillStyle='#f4ecd8';c.beginPath();c.roundRect(hx+.4,hy+2.6,6,2.6,.6);c.fill();c.strokeStyle='#5a2a1a';c.lineWidth=.35;c.beginPath();for(let i=1;i<6;i++){c.moveTo(hx+.4+i,hy+2.6);c.lineTo(hx+.4+i,hy+5.2);}c.moveTo(hx+.4,hy+3.9);c.lineTo(hx+6.4,hy+3.9);c.stroke();
    c.globalCompositeOperation='lighter';drawGlow(c,hx+1.5,hy+.6,3,L.eye,.8);drawGlow(c,hx+4.6,hy+.6,3,L.eye,.8);c.globalCompositeOperation='source-over';}}
function aotHair(c,L,k,hx,hy){if(k==='hange'||k==='sasha'||k==='bulma'){poly(c,[[-6,-2],[-11.5,-1],[-12.5,4.5],[-9,2],[-6,1]],hx,hy);fo(c,L.hc);}
  if(k==='titan_colossal'){c.strokeStyle='rgba(255,200,170,.55)';c.lineWidth=.6;c.beginPath();for(let i=-2;i<=2;i++){c.moveTo(hx+i*1.8,hy-6);c.quadraticCurveTo(hx+i*2.2,hy-3,hx+i*2,hy-1);}c.stroke();return true;}
  return false;}
// ---- vehicles: wagon, field cannon, cavalry ----
function horse(c,x,y,t,mv,col){const g=mv?Math.sin(t*14):0;c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.ellipse(x+2,y+2,10,4.5,0,0,PI2);c.fill();
  c.strokeStyle='#3a2414';c.lineWidth=2;c.beginPath();for(const[a,b]of[[-6,-3],[-6,3],[5,-3],[5,3]]){c.moveTo(x+a,y+b);c.lineTo(x+a+(b>0?g:-g)*3,y+b*1.6);}c.stroke();
  c.beginPath();c.ellipse(x,y,9,4.2,0,0,PI2);fo(c,col||'#7a4a28');c.beginPath();c.ellipse(x+10,y,4,2.4,0,0,PI2);fo(c,col||'#7a4a28');c.fillStyle='#2a1a10';c.fillRect(x-10,y-1,3,2);c.fillRect(x+5,y-2.6,5,1.2);}
function drawAotVehicle(c,u,x,y,ghost){const t=u.moving?u.anim:0;c.save();c.translate(x,y);c.rotate(u.ang);
  if(u.D.harv){horse(c,14,-5,t,u.moving);horse(c,14,5,t,u.moving,'#5a3a20');c.strokeStyle='#4a3020';c.lineWidth=1.5;c.beginPath();c.moveTo(4,-4);c.lineTo(-4,-4);c.moveTo(4,4);c.lineTo(-4,4);c.stroke();
    for(const s of[-1,1]){c.fillStyle='#2a1a10';c.fillRect(-14,s*10-1.5,8,3);}c.beginPath();c.rect(-18,-9,16,18);fo(c,'#9a6a3a');c.strokeStyle='#6a4520';c.lineWidth=.8;c.beginPath();for(let i=1;i<4;i++){c.moveTo(-18,-9+i*4.5);c.lineTo(-2,-9+i*4.5);}c.stroke();
    const fl=u.load/CAP;if(fl>0){c.fillStyle='#ffc93a';for(let i=0;i<fl*8;i++)c.fillRect(-16+(i%4)*3.5,-6+((i/4)|0)*6,2.4,3.4);}}
  else if(u.D.mounted){horse(c,0,0,t,u.moving);c.beginPath();c.arc(-1,0,3.6,0,PI2);fo(c,'#2f6a3a');c.beginPath();c.arc(-.5,0,2.2,0,PI2);fo(c,'#f1c7a2');c.fillStyle='#6a4a2a';c.beginPath();c.arc(-1.2,0,1.8,PI*.5,PI*1.5);c.fill();}
  else{for(const s of[-1,1]){c.beginPath();c.arc(-4,s*9,5,0,PI2);fo(c,'#5a3a20');c.strokeStyle='#2a1a10';c.lineWidth=.8;c.beginPath();for(let a=0;a<PI2;a+=PI/4){c.moveTo(-4,s*9);c.lineTo(-4+Math.cos(a+t*6)*5,s*9+Math.sin(a+t*6)*5);}c.stroke();}
    c.beginPath();c.rect(-14,-4,16,8);fo(c,'#8a5a32');c.restore();c.save();c.translate(x,y);c.rotate(u.tang||u.ang);c.translate(-(u.recoil||0)*4,0);c.beginPath();c.roundRect(-6,-3.2,24,6.4,3);fo(c,'#2a2a30');c.fillStyle='#55555c';c.fillRect(-4,-3.2,3,6.4);}
  c.restore();}
// ---- buildings ----
function stoneWall(c,x,y,w,d,h,col){prism(c,x,y,w,d,h,col||'#a39a8a');c.strokeStyle='rgba(60,50,40,.35)';c.lineWidth=.8;c.beginPath();
  for(let yy=y+d-h+5;yy<y+d;yy+=5){c.moveTo(x,yy);c.lineTo(x+w,yy);}for(let yy=y+d-h,r=0;yy<y+d;yy+=5,r++)for(let xx=x+(r%2?4:0);xx<x+w;xx+=8){c.moveTo(xx,yy);c.lineTo(xx,Math.min(y+d,yy+5));}c.stroke();}
function roof(c,x,y,w,h,col){c.beginPath();c.moveTo(x-3,y+h);c.lineTo(x+w*.12,y);c.lineTo(x+w*.88,y);c.lineTo(x+w+3,y+h);c.closePath();c.fillStyle=cel(c,col,x,y,x+w,y+h,.5);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
  c.strokeStyle='rgba(0,0,0,.2)';c.beginPath();for(let i=1;i<6;i++){const yy=y+h*i/6;c.moveTo(x+w*.12*(1-i/6)-3*i/6,yy);c.lineTo(x+w-w*.12*(1-i/6)+3*i/6,yy);}c.stroke();}
function flagBanner(c,x,y,h,col){c.strokeStyle='#4a3020';c.lineWidth=1.5;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-h);c.stroke();c.fillStyle=col||'#2f6a3a';c.fillRect(x+1,y-h,12,16);wings(c,x+7,y-h+7,2);}
function drawAotBuilding(c,b,ghost){const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,a=b.anim||0,k=b.key,fc=FAC.aot.col;
  if(k!=='wall'&&k!=='turret')pad(c,x0+3,y0+6,W-6,H-8,fc);
  switch(k){
  case'hq':stoneWall(c,x0+2,y0+14,W-4,30,58,'#b0a696');c.fillStyle='#d8cfbe';for(let i=0;i<8;i++)c.fillRect(x0+4+i*11.5,y0-48,7,6);
    stoneWall(c,cx-18,y0+44,36,40,40,'#a39a8a');c.fillStyle='#2a221a';c.beginPath();c.moveTo(cx-9,y0+84);c.lineTo(cx-9,y0+70);c.arc(cx,y0+70,9,PI,0);c.lineTo(cx+9,y0+84);c.fill();
    c.strokeStyle='#5a4a3a';c.lineWidth=1;c.beginPath();for(let i=-7;i<=7;i+=3.5){c.moveTo(cx+i,y0+64);c.lineTo(cx+i,y0+84);}c.stroke();flagBanner(c,cx-16,y0+4,30);flagBanner(c,cx+30,y0+4,30,'#3a5aa8');break;
  case'power':c.beginPath();c.rect(x0+8,y0+22,22,30);fo(c,'#8a6a42');roof(c,x0+6,y0+10,26,14,'#7a3a2a');for(const i of[0,1])cyl(c,x0+40+i*12,y0+54,6,3,26,'#9aa0a6');
    c.strokeStyle='#5a5f66';c.lineWidth=2;c.beginPath();c.moveTo(x0+30,y0+40);c.lineTo(x0+46,y0+40);c.stroke();c.fillStyle='#d8343f';c.beginPath();c.arc(x0+40,y0+28,2,0,PI2);c.arc(x0+52,y0+28,2,0,PI2);c.fill();break;
  case'refinery':hazard(c,cx-14,y0+H-14,28,8);c.beginPath();c.rect(x0+8,y0+34,58,40);fo(c,'#9a6a3a');c.strokeStyle='rgba(60,40,20,.4)';c.beginPath();for(let i=1;i<7;i++){c.moveTo(x0+8+i*8.3,y0+34);c.lineTo(x0+8+i*8.3,y0+74);}c.stroke();
    roof(c,x0+6,y0+12,62,24,'#8a3a2a');c.beginPath();c.rect(x0+28,y0+52,18,22);fo(c,'#3a2a1a');for(let i=0;i<3;i++){c.beginPath();c.rect(x0+70,y0+50+i*8-(i%2)*4,14,10);fo(c,'#b88a52');}break;
  case'barracks':c.beginPath();c.rect(x0+6,y0+26,52,26);fo(c,'#a07a4a');roof(c,x0+4,y0+10,56,17,'#6a3a2a');for(let i=0;i<4;i++){c.fillStyle='#3a2a1a';c.fillRect(x0+10+i*12,y0+34,6,8);c.fillStyle='rgba(255,210,120,.6)';if(Math.sin(a+i)>0)c.fillRect(x0+11+i*12,y0+35,4,6);}
    c.fillStyle='#4a3020';c.fillRect(cx-4,y0+42,8,10);break;
  case'factory':stoneWall(c,x0+8,y0+30,62,46,34,'#8a8278');cyl(c,x0+78,y0+70,7,3,62,'#6a625a');if(!ghost&&R()<.15)part('smoke',x0+78+rr(-3,3),y0+6,rr(-4,4),-20,2.4,7);
    c.fillStyle='#2a1a10';c.fillRect(cx-14,y0+56,24,20);c.globalCompositeOperation='lighter';drawGlow(c,cx-2,y0+68,14+Math.sin(a*6)*2,'#ff7a2a',.8);c.globalCompositeOperation='source-over';
    c.fillStyle='#5a5f66';c.beginPath();c.moveTo(x0+12,y0+18);c.lineTo(x0+30,y0+18);c.lineTo(x0+26,y0+26);c.lineTo(x0+16,y0+26);c.fill();break;
  case'turret':stoneWall(c,x0-3,y0+4,W+6,W-2,20,'#a39a8a');c.save();c.translate(cx,y0+4);c.rotate(b.tang);c.beginPath();c.roundRect(-4,-3,18,6,3);fo(c,'#2a2a30');c.restore();c.beginPath();c.arc(cx,y0+6,5,0,PI2);fo(c,'#5a3a20');break;
  case'temple':stoneWall(c,x0+16,y0+26,32,30,64,'#b0a696');c.beginPath();c.moveTo(x0+12,y0-38);c.lineTo(cx,y0-62);c.lineTo(x0+52,y0-38);c.closePath();c.fillStyle=cel(c,'#3a5a8a',x0+12,y0-62,x0+52,y0-38,.5);c.fill();c.strokeStyle=OUT;c.stroke();
    for(let i=0;i<3;i++){c.fillStyle='#2a221a';c.fillRect(x0+22+i*8,y0-24,4,8);}c.fillStyle='#2f6a3a';c.fillRect(cx-8,y0-8,16,22);wings(c,cx,y0,4);flagBanner(c,x0+8,y0+50,40);break;
  case'wall':stoneWall(c,x0,y0+4,W,W-4,30,'#a89e8e');c.fillStyle='#c8bfae';c.fillRect(x0,y0-26,W,4);break;
  }}
HAIR.armin=HAIR.mikasa;
