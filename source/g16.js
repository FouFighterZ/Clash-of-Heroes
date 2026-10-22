// ===== Solo Leveling & One Punch Man: characters, weapons, creatures, robots =====
const SHD={skin:'#1a1826',gi:'#2a2638',gi2:'#3a3450',pants:'#221e30',boots:'#141020',arms:'gi',eye:'#6a8aff',umbra:true,glowEye:'#8aa0ff'};
Object.assign(LOOK,{
  jinwoo:{skin:'#efc9a8',hc:'#121218',gi:'#1b1b24',gi2:'#2a2a38',pants:'#15151c',boots:'#0c0c12',arms:'gi',eye:'#7a6aff',coat:'#121219',weapon:'dagger',wglow:'#8a6aff',glowEye:'#9a8aff',dual:true},
  igris:Object.assign({},SHD,{skin:'#2a1418',gi:'#7a1a20',gi2:'#3a0a0e',pants:'#4a1216',boots:'#2a0a0c',helm:'#5a1218',plume:'#d8202a',weapon:'sword',wcol:'#c8ccd8',glowEye:'#ff4a4a',armorP:'#9a2a2a'}),
  beru:Object.assign({},SHD,{skin:'#221a2e',gi:'#2a2238',gi2:'#3a2a50',insect:'#2a2238',wingsI:true,glowEye:'#d080ff',claws:true}),
  chahaein:{skin:'#f5d4bc',hc:'#ead69a',gi:'#e8e8f0',gi2:'#c8a040',pants:'#d8d8e4',boots:'#8a8aa0',arms:'gi',eye:'#8a5a3a',weapon:'sword',wcol:'#eef4ff',armorP:'#c8a040'},
  choi:{skin:'#efc9a8',hc:'#2a1a1a',gi:'#a81e24',gi2:'#1a1a1a',pants:'#8a161c',boots:'#1a1a1a',arms:'gi',eye:'#3a2020',glasses:true,tie:'#1a1a1a'},
  baek:{skin:'#efc9a8',hc:'#e8dcc0',gi:'#f2f2f4',gi2:'#c8c8d0',pants:'#e8e8ec',boots:'#5a5a62',arms:'gi',eye:'#d8a020',tie:'#2a2a30'},
  iron:Object.assign({},SHD,{skin:'#22222c',gi:'#3a3a48',gi2:'#26262e',pants:'#2e2e3a',boots:'#18181e',big:true,helm:'#30303c',shield:true,armorP:'#5a5a6a'}),
  jinho:{skin:'#f3cfb0',hc:'#6a4024',gi:'#c89a5a',gi2:'#6a4a2a',pants:'#3a3a4a',boots:'#4a3020',arms:'gi',eye:'#4a3020'},
  bellion:Object.assign({},SHD,{skin:'#1e1a2a',hc:'#2a2440',gi:'#2a2238',gi2:'#8a5aff',pants:'#221c30',boots:'#141020',big:true,glowEye:'#c090ff',weapon:'whip',armorP:'#6a4ab8',cape:'#1a1626'}),
  thomas:{skin:'#e8b890',hc:'#f0d070',gi:'#1a1a1e',gi2:'#3a3a40',pants:'#2a3a5a',boots:'#2a2018',arms:'skin',eye:'#2a2a30',big:true,shades:true},
  liu:{skin:'#efc9a8',hc:'#141418',gi:'#2a4a3a',gi2:'#c8a040',pants:'#1e2a24',boots:'#141414',arms:'gi',eye:'#2a2020',weapon:'sword',wcol:'#d8ffe8'},
  gunhee:{skin:'#e8c0a0',hc:'#c8c8c8',gi:'#1a1a24',gi2:'#3a3a48',pants:'#1a1a24',boots:'#0e0e12',arms:'gi',eye:'#2a2a2a',tie:'#8a1a1a'},
  shsold:Object.assign({},SHD,{helm:'#262234',weapon:'sword',wcol:'#6a6a88'}),
  shknight:Object.assign({},SHD,{gi:'#302a44',helm:'#2a2440',plume:'#6a3aff',weapon:'greatsword',wcol:'#7a7a9a',armorP:'#4a4068'}),
  shmage:Object.assign({},SHD,{skin:'#202a20',gi:'#2a2238',gi2:'#5a3a8a',hood:'#241e34',glowEye:'#c090ff',weapon:'staff',tusks:true}),
  hmage:{skin:'#f1c7a2',hc:'#3a2a1a',gi:'#2a4a8a',gi2:'#c8a040',pants:'#22304a',boots:'#1a1a24',arms:'gi',eye:'#3a3a5a',hood:'#2a4a8a',weapon:'wand'},
  shealer:{skin:'#f3d4b6',hc:'#e8e0d0',gi:'#f4f4f8',gi2:'#5a8ad8',pants:'#e8e8f0',boots:'#c8c8d8',arms:'gi',eye:'#5a8ad8',cross:'#5a8ad8'},
  whitetiger:{skin:'#f4f2ec',gi:'#f4f2ec',gi2:'#1a1a1a',pants:'#ecebe4',boots:'#d8d6cc',arms:'skin',eye:'#ffd23a',tiger:true,claws:true},
  shgiant:Object.assign({},SHD,{skin:'#1c1828',gi:'#262036',gi2:'#3a2c54',arms:'skin',helm:'#221c30',big:true,glowEye:'#9a7aff',armorP:'#3a3054'}),
  orc:{skin:'#5a7a3a',hc:'#1a1a1a',gi:'#6a4a2a',gi2:'#e8e0c8',pants:'#4a3420',boots:'#2a1e14',arms:'skin',eye:'#ff3a1a',tusks:true,weapon:'axe'},
  kargalgan:{skin:'#4a6a34',gi:'#5a2a6a',gi2:'#e8e0c8',pants:'#3a2030',boots:'#2a1e14',arms:'skin',eye:'#ff3a1a',tusks:true,hood:'#4a1a5a',weapon:'staff',big:true},
  ant:{skin:'#3a1a1a',gi:'#4a1e1a',gi2:'#2a0e0c',pants:'#3a1614',boots:'#200a08',arms:'skin',eye:'#ff6a3a',insect:'#4a1e1a',claws:true},
  saitama:{skin:'#f6d2ac',gi:'#ffd23a',gi2:'#1a1a1a',pants:'#ffd23a',boots:'#d8343f',arms:'gi',eye:'#1a1a1a',gloves:'#d8343f',cape:'#f6f6f2',bald:true,okface:true,zipper:true},
  genos:{skin:'#f3d0b0',hc:'#f2d870',gi:'#26262c',gi2:'#5a4a3a',pants:'#6a5a48',boots:'#2a2420',arms:'gi',eye:'#ffcf3a',cyborg:true,gloves:'#3a3a42'},
  tatsumaki:{skin:'#f6d6c0',hc:'#3ad87a',gi:'#1a1a22',gi2:'#1a1a22',pants:'#1a1a22',boots:'#1a1a22',arms:'skin',eye:'#3ad87a',dress:'#1a1a22'},
  bang:{skin:'#efc6a0',hc:'#f4f4f4',gi:'#3a5a7a',gi2:'#1a1a24',pants:'#2a3a52',boots:'#2a2a2a',arms:'gi',eye:'#2a2a2a',beard:true,brows:true},
  king:{skin:'#efc6a0',hc:'#f2d870',gi:'#f4f4f4',gi2:'#3a4a6a',pants:'#3a4a6a',boots:'#2a2a2a',arms:'skin',eye:'#2a2a2a',scars:true},
  mumen:{skin:'#efc6a0',gi:'#4a6a3a',gi2:'#2a2a2a',pants:'#3a4a2a',boots:'#2a2a2a',arms:'gi',eye:'#2a2a2a',mhelm:true},
  metalbat:{skin:'#efc6a0',hc:'#141418',gi:'#1a1a24',gi2:'#3a3a48',pants:'#1a1a24',boots:'#0e0e12',arms:'gi',eye:'#2a2a2a',weapon:'bat'},
  fubuki:{skin:'#f6d6c0',hc:'#141418',gi:'#1f5a3a',gi2:'#143a26',pants:'#1f5a3a',boots:'#141414',arms:'skin',eye:'#3ad87a',stole:true,dress:'#1f5a3a'},
  blast:{skin:'#efc6a0',hc:'#141418',gi:'#1f3a2a',gi2:'#e8e0c0',pants:'#1a2a20',boots:'#141414',arms:'gi',eye:'#3a2a20',cape:'#2a2a30',big:true},
  atomic:{skin:'#efc6a0',hc:'#1a1a1a',gi:'#5a3a6a',gi2:'#e8e0c0',pants:'#2a2a3a',boots:'#2a2018',arms:'gi',eye:'#2a2a2a',beard:true,weapon:'katana'},
  flash:{skin:'#f3d0b0',hc:'#f2f0d8',gi:'#3a2a5a',gi2:'#e8e0f0',pants:'#2a1e44',boots:'#1a1430',arms:'gi',eye:'#5a3a8a',scarf:'#f4f4f4',weapon:'katana'},
  zombie:{skin:'#e0c0a8',hc:'#1a1a1a',gi:'#d8d0c0',gi2:'#3a3430',pants:'#3a3a40',boots:'#2a2420',arms:'gi',eye:'#6a1a1a',coat:'#c8c0ae',cig:true},
  opmc:{skin:'#f0c39a',hc:'#5a3a22',gi:'#3a6ad6',gi2:'#f2c230',pants:'#2a3a6a',boots:'#22283a',arms:'gi',eye:'#2a2230',cape:'#d8343f',domino:'#1a1a22'},
  opmb:{skin:'#f0c39a',gi:'#d8d8e0',gi2:'#3a3a48',pants:'#3a3a48',boots:'#22283a',arms:'gi',eye:'#2a2230',visor:'#4ad8ff',weapon:'blaster'},
  bangdis:{skin:'#efc6a0',hc:'#2a1a12',gi:'#f2f2ee',gi2:'#1a1a1a',pants:'#f2f2ee',boots:'#e8d8c0',arms:'gi',eye:'#2a2230'},
  opma:{skin:'#efc6a0',hc:'#a85a2a',gi:'#2a2a34',gi2:'#e3c13b',pants:'#2a2a34',boots:'#1a1a1a',arms:'gi',eye:'#2a2230',cape:'#e3c13b'},
  opmmed:{skin:'#f3d4b6',hc:'#3a2a1a',gi:'#f4f4f8',gi2:'#3a8ad8',pants:'#e8e8f0',boots:'#e4e4ec',arms:'gi',eye:'#2a2230',cross:'#d8343f'},
  kaijin:{skin:'#7a4a9a',gi:'#5a2a7a',gi2:'#3a1a4a',pants:'#4a2a5a',boots:'#2a1434',arms:'skin',eye:'#ffe14d',horns:true,bald:true,big:true,claws:true},
  kabuto:{skin:'#2a3a2a',gi:'#1e2e1e',gi2:'#3a5a2a',pants:'#1e2e1e',boots:'#141e14',arms:'skin',eye:'#ff3a3a',insect:'#24361e',horn1:true,big:true,claws:true},
  garou:{skin:'#efc6a0',hc:'#e8e8ec',gi:'#1a1a22',gi2:'#3a3a48',pants:'#1a1a22',boots:'#141418',arms:'gi',eye:'#2a2a2a',torn:true},
});
const NEWLOOKS=['jinwoo','igris','beru','chahaein','choi','baek','iron','jinho','bellion','thomas','liu','gunhee','shsold','shknight','shmage','hmage','shealer','whitetiger','shgiant','orc','kargalgan','ant',
  'saitama','genos','tatsumaki','bang','king','mumen','metalbat','fubuki','blast','atomic','flash','zombie','opmc','opmb','bangdis','opma','opmmed','kaijin','kabuto','garou'];
for(const k of NEWLOOKS)LOOK[k].k=k;
Object.assign(HAIR,{
  jinwoo:[[-6,2],[-7,-3],[-5,-7],[-1,-8.6],[3,-8],[6.4,-5],[7.2,-1],[6,1.8],[5.2,-1.6],[4,1.2],[3,-2.2],[1.2,.4],[-.2,-2.6],[-2,-.2],[-3.6,-2],[-4.4,2]],
  tatsumaki:[[-7,6],[-8.5,2],[-7.5,-2],[-8.5,-5],[-6,-7.5],[-3,-9.5],[1,-9.5],[4.5,-8.5],[7,-6],[8.5,-2.5],[7.5,1],[8.6,4.5],[6.5,6],[5.6,2],[4,-2],[1.5,-1],[-1,-2.6],[-3.5,-1.4],[-5,3]],
  metalbat:[[-6,1],[-7,-4],[-4,-7],[1,-8],[6,-8.5],[10,-7.5],[11,-5],[8,-4.5],[6.2,-3],[5.6,0],[4,-2.6],[1,-2],[-2,-3],[-4.5,-1]],
  orc:[[-4,-4],[-3,-9],[-1,-11],[1.5,-11],[3.5,-9],[4,-5],[1.5,-5.5],[-1.5,-5.5]],
  chahaein:HAIR.mikasa,choi:HAIR.levi,baek:HAIR.short,jinho:HAIR.eren,liu:HAIR.levi,gunhee:HAIR.short,thomas:HAIR.short,bellion:HAIR.eraser,shealer:HAIR.uraraka,
  genos:HAIR.bakugo,bang:HAIR.kirishima,king:HAIR.eren,fubuki:HAIR.mikasa,blast:HAIR.goku,atomic:HAIR.eraser,flash:HAIR.pieck,zombie:HAIR.eren,garou:HAIR.vegeta,
  opmc:HAIR.short,bangdis:HAIR.short,opma:HAIR.kirishima,opmmed:HAIR.uraraka});
// opm C-class heroes: varied costumes
const OPMC_V=[{gi:'#3a6ad6',cape:'#d8343f'},{gi:'#d8343f',cape:'#f2c230'},{gi:'#2f9a5e',cape:'#1a1a22'},{gi:'#6a3a9a',cape:'#f4f4f4'}];
{const _ul=unitLook;unitLook=function(u){if(u.D.look==='opmc'){const v=OPMC_V[(u.v||0)%4];return Object.assign({},LOOK.opmc,v);}return _ul(u);};}
// ---- head pieces ----
function glowDots(c,L,hx,hy){c.globalCompositeOperation='lighter';for(const ex of[hx+1.5,hx+4.6])drawGlow(c,ex,hy+.4,3.2,L.glowEye,1);c.globalCompositeOperation='source-over';c.fillStyle='#fff';for(const ex of[hx+1.5,hx+4.6]){c.beginPath();c.ellipse(ex,hy+.4,.9,.5,0,0,PI2);c.fill();}}
{const _hx=headX;headX=function(c,L,k,hx,hy,t){
  if(L.helm){c.beginPath();c.ellipse(hx,hy-.6,6.8,7,0,0,PI2);c.fillStyle=cel(c,L.helm,hx-6,hy-7,hx+6,hy+6,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=1.1;c.stroke();
    c.fillStyle='rgba(0,0,0,.75)';c.fillRect(hx-.4,hy-.5,7,1.9);c.fillRect(hx+2.6,hy-.5,1.4,5);c.strokeStyle='rgba(255,255,255,.22)';c.lineWidth=.8;c.beginPath();c.arc(hx-1,hy-2,4.4,PI*1.1,PI*1.6);c.stroke();
    if(L.plume){c.fillStyle=L.plume;c.beginPath();c.moveTo(hx-1,hy-7);c.quadraticCurveTo(hx-8,hy-12,hx-13,hy-4+Math.sin(t*6)*1.2);c.quadraticCurveTo(hx-7,hy-7,hx-3,hy-5);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.6;c.stroke();}
    if(L.glowEye)glowDots(c,L,hx,hy);return true;}
  if(L.insect){c.beginPath();c.ellipse(hx+.6,hy-.4,6.4,6,0,0,PI2);c.fillStyle=cel(c,L.insect,hx-6,hy-6,hx+6,hy+6,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
    c.strokeStyle=OUT;c.lineWidth=1;c.beginPath();c.moveTo(hx+2,hy-5);c.quadraticCurveTo(hx+5,hy-12,hx+10,hy-12);c.moveTo(hx-1,hy-5.5);c.quadraticCurveTo(hx,hy-12,hx+4,hy-14);if(L.horn1){c.moveTo(hx+3,hy-4);c.quadraticCurveTo(hx+9,hy-6,hx+10,hy-13);}c.stroke();
    c.fillStyle=shade(hex7(L.insect),.25);c.beginPath();c.moveTo(hx+5,hy+3);c.lineTo(hx+9,hy+5);c.lineTo(hx+5.4,hy+5.4);c.closePath();c.fill();c.beginPath();c.moveTo(hx+4,hy+4.4);c.lineTo(hx+7.4,hy+7.4);c.lineTo(hx+3.6,hy+6);c.closePath();c.fill();
    c.globalCompositeOperation='lighter';drawGlow(c,hx+3.6,hy-.6,4,L.glowEye||L.eye,1);c.globalCompositeOperation='source-over';c.fillStyle=L.eye;c.beginPath();c.ellipse(hx+3.6,hy-.6,2,1.4,.3,0,PI2);c.fill();return true;}
  if(L.hood){c.beginPath();c.moveTo(hx-6.6,hy+5);c.quadraticCurveTo(hx-8.4,hy-8,hx+.5,hy-9);c.quadraticCurveTo(hx+8,hy-8.6,hx+7.2,hy-1);c.lineTo(hx+5.6,hy-1.6);c.quadraticCurveTo(hx+4,hy-6.4,hx-1,hy-5);c.quadraticCurveTo(hx-3.6,hy,hx-3,hy+6);c.closePath();
    c.fillStyle=cel(c,L.hood,hx-6,hy-9,hx+6,hy+4,.6);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();if(L.glowEye)glowDots(c,L,hx,hy);return true;}
  if(L.tiger){for(const s of[-1,1]){c.beginPath();c.moveTo(hx+s*3.4,hy-4);c.lineTo(hx+s*5.6,hy-9);c.lineTo(hx+s*6.4,hy-3.4);c.closePath();fo(c,L.skin,.8);}c.strokeStyle='#1a1a1a';c.lineWidth=1.1;c.beginPath();
    for(const[a,b]of[[-4,-4],[-1,-5.5],[2,-5]]){c.moveTo(hx+a,hy+b);c.lineTo(hx+a+1.4,hy+b+2.6);}c.moveTo(hx-5,hy+1);c.lineTo(hx-2.6,hy+1.6);c.stroke();c.fillStyle='#f8e8d8';c.beginPath();c.ellipse(hx+4.6,hy+3.6,2.6,1.8,0,0,PI2);c.fill();c.fillStyle='#2a1a1a';c.beginPath();c.arc(hx+6.2,hy+2.6,.8,0,PI2);c.fill();return true;}
  if(L.mhelm){c.beginPath();c.ellipse(hx,hy-1.6,6.6,5.4,0,PI*.98,PI2*1.01);c.closePath();c.fillStyle=cel(c,'#c8ccd2',hx-6,hy-7,hx+6,hy,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
    c.fillStyle='#3a3a3a';c.fillRect(hx-6.4,hy-2.2,13,1.6);c.fillStyle='#ffcf3a';c.strokeStyle=OUT;c.lineWidth=.6;for(const ex of[hx+1.4,hx+4.6]){c.beginPath();c.arc(ex,hy-1.4,1.7,0,PI2);c.fill();c.stroke();}return true;}
  if(L.bald){c.fillStyle='rgba(255,255,255,.45)';c.beginPath();c.ellipse(hx-1.2,hy-4.4,2.6,1.3,-.4,0,PI2);c.fill();if(L.horns){for(const s of[-1,1]){c.beginPath();c.moveTo(hx+s*2-1,hy-5);c.quadraticCurveTo(hx+s*6,hy-10,hx+s*4+2,hy-14);c.lineTo(hx+s*3,hy-5.4);c.closePath();fo(c,'#e8dcc0',.8);}}return true;}
  const r=_hx(c,L,k,hx,hy,t);if(!r&&!L.hc&&NEWLOOKS.includes(k))return true;return r;};}
{const _mh=moreHead2;moreHead2=function(c,L,k,hx,hy,st){_mh(c,L,k,hx,hy,st);const ey=hy+.6;
  if(L.glowEye&&!L.helm&&!L.hood&&!L.insect)glowDots(c,L,hx,hy);
  if(L.glasses){c.strokeStyle='#1a1a1a';c.lineWidth=.6;c.fillStyle='rgba(200,230,255,.35)';for(const ex of[hx+1.5,hx+4.6]){c.beginPath();c.roundRect(ex-1.6,ey-1.4,3.2,2.4,.6);c.fill();c.stroke();}c.beginPath();c.moveTo(hx+3.1,ey-.4);c.lineTo(hx+3,ey-.4);c.stroke();}
  if(L.shades){c.fillStyle='#101014';c.beginPath();c.roundRect(hx-.4,ey-1.6,7.2,2.6,1);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.fillRect(hx+.4,ey-1.2,1.6,.6);}
  if(L.scars){c.strokeStyle='#a85a4a';c.lineWidth=.55;c.beginPath();for(let i=0;i<3;i++){c.moveTo(hx+3.4+i*.9,ey-3.6);c.lineTo(hx+4.6+i*.9,ey+2.4);}c.stroke();}
  if(L.okface&&!st.cast&&!(st.atk>0)){c.fillStyle=L.skin;c.fillRect(hx+.1,ey-3.6,6.4,5.4);c.fillStyle='#1a1a1a';for(const ex of[hx+1.6,hx+4.6]){c.beginPath();c.ellipse(ex,ey,.55,.5,0,0,PI2);c.fill();}
    c.strokeStyle='#1a1a1a';c.lineWidth=.45;c.beginPath();c.moveTo(hx+.6,ey-1.8);c.lineTo(hx+2.6,ey-1.6);c.moveTo(hx+3.8,ey-1.6);c.lineTo(hx+5.6,ey-1.8);c.moveTo(hx+2.6,ey+3.6);c.lineTo(hx+4,ey+3.6);c.stroke();}
  if(L.cyborg){c.fillStyle='#0e0e10';for(const ex of[hx+1.5,hx+4.6]){c.beginPath();c.ellipse(ex,ey,1.25,1.7,0,0,PI2);c.fill();}c.fillStyle='#ffcf3a';for(const ex of[hx+1.8,hx+4.9]){c.beginPath();c.arc(ex,ey+.2,.55,0,PI2);c.fill();}}
  if(L.tusks){c.fillStyle='#f4ecd8';for(const ex of[hx+2,hx+5]){c.beginPath();c.moveTo(ex-.6,hy+4.2);c.lineTo(ex,hy+1.6);c.lineTo(ex+.6,hy+4.2);c.closePath();c.fill();}}
  if(L.brows){c.fillStyle='#f4f4f4';c.fillRect(hx+.2,ey-3.2,2.8,1);c.fillRect(hx+3.6,ey-3.2,2.8,1);}
  if(L.cig){c.fillStyle='#f4f4f4';c.fillRect(hx+5.2,hy+4,3,.8);c.fillStyle='#ff6a1a';c.fillRect(hx+8,hy+4,.7,.8);}
  if(L.domino){c.fillStyle=L.domino;c.beginPath();c.roundRect(hx-.2,ey-1.8,7,2.8,1.2);c.fill();c.fillStyle='#fff';for(const ex of[hx+1.5,hx+4.6]){c.beginPath();c.ellipse(ex,ey-.4,.8,.6,0,0,PI2);c.fill();}}
  if(L.visor){c.fillStyle='#d8d8e0';c.beginPath();c.ellipse(hx,hy-1.4,6.6,5.6,0,PI,PI2);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.8;c.stroke();c.fillStyle=L.visor;c.globalAlpha=.85;c.beginPath();c.roundRect(hx-.4,ey-2.4,7.6,2.8,1);c.fill();c.globalAlpha=1;}};}
// ---- costume pieces ----
{const _mc=moreCostume2;moreCostume2=function(c,L,k,bw,top,bob){_mc(c,L,k,bw,top,bob);const B=-9.4+bob;
  if(L.coat){c.fillStyle=L.coat;c.beginPath();c.moveTo(-5.6*bw,top+1);c.lineTo(-2,top+1);c.lineTo(-1,B+2.4);c.lineTo(-5.2*bw,B+3);c.closePath();c.fill();c.beginPath();c.moveTo(5.6*bw,top+1);c.lineTo(2,top+1);c.lineTo(1.2,B+2.4);c.lineTo(5.2*bw,B+3);c.closePath();c.fill();
    c.strokeStyle='rgba(255,255,255,.12)';c.lineWidth=.6;c.beginPath();c.moveTo(-2,top+1);c.lineTo(-1,B+2);c.moveTo(2,top+1);c.lineTo(1.2,B+2);c.stroke();c.fillStyle=L.coat;c.beginPath();c.ellipse(0,top-.4,4.4*bw,1.6,0,PI,PI2);c.fill();}
  if(L.armorP){for(const s of[-1,1]){c.beginPath();c.ellipse(s*5.4*bw,top+.8,3.4*bw,2.4,s*.25,0,PI2);c.fillStyle=cel(c,L.armorP,s*5-3,top-2,s*5+3,top+3,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=.8;c.stroke();}
    c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=.6;c.beginPath();c.moveTo(-3.6*bw,top+4);c.quadraticCurveTo(0,top+5.4,3.6*bw,top+4);c.moveTo(0,top+1);c.lineTo(0,B-1);c.stroke();}
  if(L.tie){c.fillStyle='#f4f4f4';c.beginPath();c.moveTo(-1.6,top-.2);c.lineTo(1.6,top-.2);c.lineTo(0,top+3);c.closePath();c.fill();c.fillStyle=L.tie;c.beginPath();c.moveTo(-.7,top+.6);c.lineTo(.7,top+.6);c.lineTo(1,top+6);c.lineTo(0,top+7.4);c.lineTo(-1,top+6);c.closePath();c.fill();}
  if(L.zipper){c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=.6;c.beginPath();c.moveTo(0,top);c.lineTo(0,B-1);c.stroke();c.fillStyle='#c8c8c8';c.fillRect(-.6,top+.4,1.2,1.4);}
  if(L.cyborg){c.globalCompositeOperation='lighter';drawGlow(c,0,top+4,5,'#ff8a2a',.9);c.globalCompositeOperation='source-over';c.fillStyle='#ffb04a';c.beginPath();c.arc(0,top+4,1.4,0,PI2);c.fill();
    c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=.5;c.beginPath();c.moveTo(-4,top+2);c.lineTo(-2,top+6);c.moveTo(4,top+2);c.lineTo(2,top+6);c.stroke();}
  if(L.dress){c.fillStyle=L.dress;c.beginPath();c.moveTo(-4.6*bw,B-1);c.lineTo(4.6*bw,B-1);c.lineTo(6.2*bw,B+4.6);c.lineTo(-6.2*bw,B+4.6);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.8;c.stroke();}
  if(L.stole){c.fillStyle='#f4f2ee';c.beginPath();c.ellipse(0,top+.6,6.4*bw,2.6,0,0,PI2);c.fill();c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=.6;c.stroke();}
  if(L.cross){c.fillStyle=L.cross;c.fillRect(-.6,top+1,1.2,4);c.fillRect(-2,top+2.4,4,1.2);}
  if(L.torn){c.fillStyle=L.skin;c.beginPath();c.moveTo(-3,top+2);c.lineTo(0,top+4);c.lineTo(-1,top+7);c.lineTo(2,top+5);c.lineTo(3,top+8);c.lineTo(3.6,top+3);c.closePath();c.fill();}
  if(k==='metalbat'){c.fillStyle='#e8e8ec';c.fillRect(-.5,top+.5,1,B-top-1.5);}
  if(k==='bang'||k==='bangdis'){c.fillStyle=k==='bang'?'#1a1a24':'#1a1a1a';c.fillRect(-4.6*bw,B-1.8,9.2*bw,1.8);}};}
{const _bi=backItems;backItems=function(c,L,k,bw,top,t,walk){_bi(c,L,k,bw,top,t,walk);
  if(L.coat){c.fillStyle=shade(hex7(L.coat),-.1);c.beginPath();c.moveTo(-5*bw,top+2);c.quadraticCurveTo(-9-walk*1.5,-4,-8-walk*2.2,1);c.lineTo(2,1);c.lineTo(3,top+6);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.9;c.stroke();}
  if(L.wingsI){c.globalAlpha=.55;for(const s of[0,1]){c.save();c.translate(-2,top+2);c.rotate(-.5-s*.5+Math.sin(t*30)*.12);c.fillStyle=s?'#6a4a9a':'#8a6ac8';c.beginPath();c.ellipse(-8,0,9,3,0,0,PI2);c.fill();c.restore();}c.globalAlpha=1;}};}
const WPN={dagger:(c,x,y,L)=>{c.strokeStyle=OUT;c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(x+5.5,y-4.2);c.stroke();c.strokeStyle='#d8dce8';c.lineWidth=1.1;c.stroke();if(L.wglow){c.globalCompositeOperation='lighter';drawGlow(c,x+4,y-3,4,L.wglow,.8);c.globalCompositeOperation='source-over';}},
  sword:(c,x,y,L)=>{c.strokeStyle=OUT;c.lineWidth=2.2;c.beginPath();c.moveTo(x-1,y+1);c.lineTo(x+10,y-7);c.stroke();c.strokeStyle=L.wcol||'#d8dce8';c.lineWidth=1.3;c.stroke();c.strokeStyle='#5a4a2a';c.lineWidth=1.4;c.beginPath();c.moveTo(x-1,y-2);c.lineTo(x+1.6,y+1.8);c.stroke();},
  greatsword:(c,x,y,L)=>{c.strokeStyle=OUT;c.lineWidth=3.2;c.beginPath();c.moveTo(x-1,y+1);c.lineTo(x+12,y-10);c.stroke();c.strokeStyle=L.wcol||'#c8ccd8';c.lineWidth=2.2;c.stroke();},
  katana:(c,x,y,L)=>{c.strokeStyle=OUT;c.lineWidth=1.8;c.beginPath();c.moveTo(x-1,y+1);c.quadraticCurveTo(x+6,y-5,x+12,y-7);c.stroke();c.strokeStyle='#eef2f8';c.lineWidth=1;c.stroke();},
  bat:(c,x,y)=>{c.strokeStyle=OUT;c.lineWidth=3.2;c.lineCap='round';c.beginPath();c.moveTo(x-1,y+1);c.lineTo(x+9,y-8);c.stroke();c.strokeStyle='#c8ccd4';c.lineWidth=2.2;c.stroke();},
  whip:(c,x,y,L)=>{c.strokeStyle='#8a5aff';c.lineWidth=1.2;c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+8,y-10,x+14,y+4,x+20,y-4);c.stroke();c.globalCompositeOperation='lighter';drawGlow(c,x+18,y-3,4,'#8a5aff',.7);c.globalCompositeOperation='source-over';},
  staff:(c,x,y,L)=>{c.strokeStyle='#5a3a1a';c.lineWidth=1.6;c.beginPath();c.moveTo(x,y+7);c.lineTo(x+1,y-12);c.stroke();c.fillStyle='#e8e0c8';c.beginPath();c.arc(x+1,y-13,2,0,PI2);c.fill();c.globalCompositeOperation='lighter';drawGlow(c,x+1,y-13,5,L.glowEye||'#ff5a2a',.8);c.globalCompositeOperation='source-over';},
  wand:(c,x,y)=>{c.strokeStyle='#e8d8a0';c.lineWidth=1;c.beginPath();c.moveTo(x,y);c.lineTo(x+5,y-5);c.stroke();c.globalCompositeOperation='lighter';drawGlow(c,x+5,y-5,4,'#7ab8ff',.8);c.globalCompositeOperation='source-over';},
  axe:(c,x,y)=>{c.strokeStyle='#5a3a1a';c.lineWidth=1.6;c.beginPath();c.moveTo(x,y+2);c.lineTo(x+7,y-8);c.stroke();c.fillStyle='#8a8a90';c.beginPath();c.moveTo(x+5,y-9);c.quadraticCurveTo(x+11,y-9,x+10,y-3);c.lineTo(x+7,y-6);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.6;c.stroke();},
  blaster:(c,x,y)=>{c.fillStyle='#3a3a48';c.fillRect(x-1,y-2.4,8,2.6);c.fillStyle='#4ad8ff';c.fillRect(x+6,y-2,1.6,1.8);}};
{const _hd=hand;hand=function(c,L,k,x,y,bw,back,st){_hd(c,L,k,x,y,bw,back,st);if(L.weapon&&(!back||L.dual))WPN[L.weapon](c,x,y,L);
  if(L.shield&&back){c.beginPath();c.roundRect(x-5,y-8,8,12,3);c.fillStyle=cel(c,'#4a4a5a',x-5,y-8,x+3,y+4,.5);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();c.strokeStyle='#8a9aff';c.lineWidth=.6;c.beginPath();c.moveTo(x-1,y-6);c.lineTo(x-1,y+2);c.stroke();}
  if(L.claws&&!back){c.strokeStyle='#e8e0d0';c.lineWidth=.7;c.beginPath();for(let i=-1;i<=1;i++){c.moveTo(x+1,y+i);c.lineTo(x+4,y+i*1.6-1.5);}c.stroke();}};}
// ---- Mumen Rider's bicycle, shadow trails ----
{const _du=drawUnitBody;drawUnitBody=function(c,u,x,y,ghost){if(u.key==='mumen'&&!u.form){const t=u.moving?u.anim*9:0;c.strokeStyle='#2a2a2a';c.lineWidth=1.4;for(const s of[-1,1]){c.beginPath();c.ellipse(x+s*9*u.face,y-4,4.6,4.6,0,0,PI2);c.stroke();
      c.strokeStyle='rgba(60,60,60,.6)';c.lineWidth=.6;c.beginPath();c.moveTo(x+s*9*u.face+Math.cos(t)*4,y-4+Math.sin(t)*4);c.lineTo(x+s*9*u.face-Math.cos(t)*4,y-4-Math.sin(t)*4);c.stroke();c.strokeStyle='#2a2a2a';c.lineWidth=1.4;}
    c.strokeStyle='#5a7a3a';c.lineWidth=1.6;c.beginPath();c.moveTo(x-9*u.face,y-4);c.lineTo(x,y-9);c.lineTo(x+9*u.face,y-4);c.moveTo(x,y-9);c.lineTo(x+6*u.face,y-14);c.stroke();}
  if(u.D.extracted&&!ghost){c.globalCompositeOperation='lighter';drawGlow(c,x,y-(u.z||0)-14,20,'#5a3aaa',.35);c.globalCompositeOperation='source-over';}
  _du(c,u,x,y,ghost);};}
// ---- creatures & robots (drawn instead of vehicles) ----
function slBear(c,u,x,y){const t=u.moving?u.anim*10:0,f=Math.cos(u.ang||0)>=0?1:-1,a=u.atk>0?Math.sin(u.atk/.22*PI):0;c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x+3,y+3,20,7,0,0,PI2);c.fill();c.save();c.translate(x,y);c.scale(f,1);
  for(let i=0;i<4;i++){const lx=-11+i*7,sw=Math.sin(t+i*1.6)*3;c.fillStyle=i%2?'#1c1830':'#24203a';c.beginPath();c.roundRect(lx+sw-2.4,-9,5,10,2);c.fill();}
  c.beginPath();c.ellipse(0,-14,17,10,0,0,PI2);c.fillStyle=cel(c,'#2a2440',-15,-24,15,-4,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1.2;c.stroke();
  c.strokeStyle='rgba(160,140,255,.35)';c.lineWidth=.8;c.beginPath();for(let i=0;i<5;i++){c.moveTo(-10+i*5,-22);c.lineTo(-12+i*5,-17);}c.stroke();
  c.save();c.translate(15+a*5,-17-a*3);c.beginPath();c.ellipse(0,0,8,7,0,0,PI2);c.fillStyle=cel(c,'#2a2440',-7,-7,7,7,.55);c.fill();c.stroke();for(const s of[-1,1]){c.beginPath();c.arc(-2+s*3,-6,2.2,0,PI2);c.fill();c.stroke();}
  c.fillStyle='#3a3454';c.beginPath();c.ellipse(5,2,4,3,0,0,PI2);c.fill();c.globalCompositeOperation='lighter';drawGlow(c,3,-2,4,'#9ab8ff',1);c.globalCompositeOperation='source-over';c.fillStyle='#fff';c.fillRect(2,-2.6,2.4,1);
  if(a>.2){c.fillStyle='#f4f0e0';c.beginPath();c.moveTo(4,3);c.lineTo(7,5);c.lineTo(9,3);c.fill();}c.restore();c.restore();}
function slWyvern(c,u,x,y){const z=u.z||16,fl=Math.sin(u.anim*(u.moving?10:5)),f=Math.cos(u.ang||0)>=0?1:-1,yy=y-z-Math.sin(u.anim*3)*2;c.save();c.translate(x,yy);c.scale(f,1);
  for(const s of[0,1]){c.save();c.translate(-2,-4);c.scale(1,s?.75:1);c.rotate(-.3-fl*.6+(s?.3:0));c.fillStyle=s?'#1c1830':'#2a2440';c.beginPath();c.moveTo(0,0);c.lineTo(-6,-20);c.lineTo(-14,-14);c.lineTo(-22,-6);c.lineTo(-10,-2);c.closePath();c.fill();c.strokeStyle=OUT;c.lineWidth=.9;c.stroke();
    c.strokeStyle='rgba(160,140,255,.4)';c.lineWidth=.6;c.beginPath();c.moveTo(0,0);c.lineTo(-14,-14);c.moveTo(0,0);c.lineTo(-22,-6);c.stroke();c.restore();}
  c.beginPath();c.moveTo(-18,2);c.quadraticCurveTo(-6,-6,8,-6);c.quadraticCurveTo(14,-6,18,-12);c.lineTo(22,-11);c.quadraticCurveTo(18,-2,8,2);c.quadraticCurveTo(-4,6,-18,2);c.closePath();c.fillStyle=cel(c,'#2a2440',-18,-12,22,6,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();
  c.globalCompositeOperation='lighter';drawGlow(c,19,-11,4,'#c090ff',1);c.globalCompositeOperation='source-over';c.restore();}
function slGiant(c,u,x,y){drawFighter(c,x,y,LOOK.shgiant,Math.cos(u.ang||0)>=0?1:-1,u.anim,u.moving,2.5,{atk:u.atk,atkN:u.atkN||0,melee:true});}
function slTruck(c,u,x,y){c.save();c.translate(x,y);c.rotate(u.ang||0);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.roundRect(-15,-8,32,18,3);c.fill();
  c.beginPath();c.roundRect(-16,-9,22,18,2);fo(c,'#2a3a5a');c.fillStyle='#4ab8ff';c.globalAlpha=.6+.3*Math.min(1,(u.load||0)/CAP);c.fillRect(-14,-6,18,12);c.globalAlpha=1;c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=.6;for(let i=0;i<4;i++){c.beginPath();c.moveTo(-13+i*4.5,-6);c.lineTo(-11+i*4.5,6);c.stroke();}
  c.beginPath();c.roundRect(6,-8,11,16,3);fo(c,'#e8ecf2');c.fillStyle='#2a3a5a';c.fillRect(13,-6,3,12);c.fillStyle='#8a5aff';c.fillRect(6,-1,11,2);c.restore();}
function opmTruck(c,u,x,y){c.save();c.translate(x,y);c.rotate(u.ang||0);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.roundRect(-15,-8,32,18,3);c.fill();
  c.beginPath();c.roundRect(-16,-9,22,18,2);fo(c,'#f2f2ee');c.fillStyle='#ffc21a';c.fillRect(-16,-2,22,4);c.fillStyle='#d8343f';c.font='bold 5px sans-serif';c.textAlign='center';c.fillText('HA',-5,1.8);
  c.beginPath();c.roundRect(6,-8,11,16,3);fo(c,'#d8343f');c.fillStyle='#2a3440';c.fillRect(13,-6,3,12);c.restore();}
function mkRobot(c,u,x,y){const t=u.moving?u.anim:0;c.save();c.translate(x,y);c.rotate(u.ang||0);c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.roundRect(-16,-11,34,24,4);c.fill();
  for(const s of[-1,1]){c.fillStyle='#26262c';c.beginPath();c.roundRect(-16,s*9-3.5,32,7,3);c.fill();c.fillStyle='#4a4a54';for(let i=0;i<7;i++)c.fillRect(-15+((i*5+t*40)%31),s*9-3,1.6,6);}
  c.beginPath();c.roundRect(-12,-8,24,16,4);fo(c,'#3a3a44');c.fillStyle='#ffc21a';for(let i=0;i<5;i++){c.beginPath();c.moveTo(-12+i*5,-8);c.lineTo(-9+i*5,-8);c.lineTo(-12+i*5,-5);c.closePath();c.fill();}c.restore();
  c.save();c.translate(x,y-6);c.rotate(u.tang!=null&&u.target?u.tang:u.ang||0);const r=u.recoil||0;c.beginPath();c.roundRect(-8,-7,15,14,3);fo(c,'#54545e');c.fillStyle='#2a2a30';for(const s of[-1,1]){c.beginPath();c.roundRect(4-r*3,s*4-2,10,4,1);c.fill();}
  c.globalCompositeOperation='lighter';drawGlow(c,-2,0,4,'#ff3a3a',.9);c.globalCompositeOperation='source-over';c.restore();}
function mkDrone(c,u,x,y){const z=u.z||16,yy=y-z-Math.sin(u.anim*4)*1.5;c.save();c.translate(x,yy);c.rotate(u.ang||0);for(const[a,b]of[[-8,-8],[8,-8],[-8,8],[8,8]]){c.strokeStyle='#3a3a44';c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(a,b);c.stroke();
    c.fillStyle='rgba(200,210,220,.35)';c.beginPath();c.ellipse(a,b,5.5,1.6,u.anim*40,0,PI2);c.fill();}
  c.beginPath();c.roundRect(-6,-5,12,10,3);fo(c,'#4a4a54');c.fillStyle='#ffc21a';c.fillRect(-6,-1,12,2);c.globalCompositeOperation='lighter';drawGlow(c,5,0,4,'#ff3a3a',.9);c.globalCompositeOperation='source-over';c.restore();}
function mkMech(c,u,x,y){const t=u.moving?u.anim:0,st=Math.sin(t*5),f=Math.cos(u.ang||0)>=0?1:-1,a=u.atk>0?u.atk/.22:0;c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(x+6,y+4,u.r*1.2,u.r*.6,0,0,PI2);c.fill();c.save();c.translate(x,y);c.scale(f,1);
  for(const s of[-1,1]){const lift=s*st*3;c.fillStyle='#2a2a32';c.beginPath();c.roundRect(-10+s*6-4,-22+lift,8,22-lift,2);c.fill();c.strokeStyle=OUT;c.lineWidth=1;c.stroke();c.beginPath();c.roundRect(-10+s*6-6,-3+lift*.3,12,5,2);fo(c,'#3a3a44');}
  c.beginPath();c.roundRect(-20,-50,36,30,6);c.fillStyle=cel(c,'#4a4a56',-20,-50,16,-20,.55);c.fill();c.strokeStyle=OUT;c.lineWidth=1.3;c.stroke();
  c.fillStyle='#ffc21a';c.fillRect(-20,-30,36,3);c.fillStyle='#1a1a20';c.beginPath();c.roundRect(-2,-46,16,9,2);c.fill();c.globalCompositeOperation='lighter';drawGlow(c,8,-41,7,'#ff3a3a',.95);c.globalCompositeOperation='source-over';c.fillStyle='#ff5a4a';c.fillRect(2,-43,10,3);
  c.save();c.translate(10,-34);c.rotate(-.1-a*.1);c.beginPath();c.roundRect(-2-(u.recoil||0)*4,-5,26,10,2);fo(c,'#3a3a44');c.fillStyle='#1a1a20';c.fillRect(20-(u.recoil||0)*4,-3,6,6);c.restore();
  c.beginPath();c.roundRect(-26,-46,8,18,3);fo(c,'#3a3a44');c.fillStyle='#2a2a30';for(let i=0;i<3;i++)c.fillRect(-25,-44+i*5,6,3);c.restore();}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){const f=u.fac,D=u.D||UDEF[f][u.key];
  if(f==='sl'){if(D.harv)return slTruck(c,u,x,y);if(D.beast==='bear')return slBear(c,u,x,y);if(D.beast==='wyvern')return slWyvern(c,u,x,y);}
  if(f==='opm'){if(D.harv)return opmTruck(c,u,x,y);if(u.key==='jet')return mkDrone(c,u,x,y);return mkRobot(c,u,x,y);}
  return _dv(c,u,x,y,ghost);};}
{const _dmc=drawMech;drawMech=function(c,u,x,y,ghost){if(u.fac==='sl')return slGiant(c,u,x,y);if(u.fac==='opm')return mkMech(c,u,x,y);return _dmc(c,u,x,y,ghost);};}
