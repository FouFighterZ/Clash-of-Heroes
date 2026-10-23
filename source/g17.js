// ===== Solo Leveling & One Punch Man: 3D buildings, construction sequences, special effects =====
LOOK.godstatue={k:'godstatue',skin:'#b4ac9c',hc:'#9a9284',gi:'#a8a090',gi2:'#8a8274',pants:'#a29a8a',boots:'#8a8274',arms:'skin',eye:'#ff3a1a',bald:true,glowEye:'#ff4a2a'};
function slPlinth(c,x0,y0,W,H){box3(c,x0+3,y0+4,W-6,H-7,0,4,'#2a2636',{top:'#363044'});const a=P3(x0+8,y0+H-6,4.2),b=P3(x0+W-8,y0+H-6,4.2);c.strokeStyle='rgba(138,90,255,.45)';c.lineWidth=.8;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}
function rune(c,x,y,z,r,a,col){const p=P3(x,y,z);c.save();c.translate(p[0],p[1]);c.scale(1,.5);c.rotate(a);c.strokeStyle=col;c.lineWidth=1.2;c.globalAlpha=.75;c.beginPath();c.arc(0,0,r,0,PI2);c.moveTo(r*.7,0);c.arc(0,0,r*.7,0,PI2);
  for(let i=0;i<6;i++){const q=i/6*PI2;c.moveTo(Math.cos(q)*r*.7,Math.sin(q)*r*.7);c.lineTo(Math.cos(q+2)*r*.7,Math.sin(q+2)*r*.7);}c.stroke();c.restore();}
function manaCrystal(c,x,y,z,s,col,a){const p=P3(x,y,z),k=Math.cos(a)*.35+.65;c.globalCompositeOperation='lighter';drawGlow(c,p[0],p[1],s*2.6,col,.55);c.globalCompositeOperation='source-over';
  c.beginPath();c.moveTo(p[0],p[1]-s*1.6);c.lineTo(p[0]+s*k,p[1]);c.lineTo(p[0],p[1]+s*1.4);c.lineTo(p[0]-s*k,p[1]);c.closePath();const g=c.createLinearGradient(p[0]-s,p[1]-s,p[0]+s,p[1]+s);g.addColorStop(0,'#ffffff');g.addColorStop(.4,col);g.addColorStop(1,shade(hex7(col),-.4));c.fillStyle=g;c.fill();c.strokeStyle=LINE;c.lineWidth=.8;c.stroke();
  c.strokeStyle='rgba(255,255,255,.55)';c.beginPath();c.moveTo(p[0],p[1]-s*1.6);c.lineTo(p[0],p[1]+s*1.4);c.stroke();}
function portal3(c,x,y,z,rx,ry,a,col){const p=P3(x,y,z);c.save();c.translate(p[0],p[1]);c.globalCompositeOperation='lighter';drawGlow(c,0,0,rx*2,col,.5);c.globalCompositeOperation='source-over';
  const g=c.createRadialGradient(0,0,1,0,0,rx);g.addColorStop(0,'#ffffff');g.addColorStop(.25,col);g.addColorStop(1,shade(hex7(col),-.6));c.fillStyle=g;c.beginPath();c.ellipse(0,0,rx,ry,0,0,PI2);c.fill();
  c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=1;for(let i=0;i<3;i++){c.beginPath();c.ellipse(0,0,rx*(.3+i*.22),ry*(.3+i*.22),0,a*2+i,a*2+i+2.2);c.stroke();}c.restore();}
function towerWin(c,X,Y,W,D,z0,h,col,a,lit,cols,rows){onFront(c,X,Y,D,z0,x=>winGrid(x,2,4,W-4,h-8,cols||Math.max(2,W/9|0),rows||Math.max(2,h/10|0),col,lit,false));
  onSide(c,X,Y,W,D,z0,x=>winGrid(x,2,4,D-4,h-8,Math.max(2,D/10|0),rows||Math.max(2,h/10|0),col,lit,true));}
const SLB={
 hq(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+58,y0+44,30,42,4,34,'#3a4660');towerWin(c,x0+58,y0+44,30,42,4,34,'#4ab8ff',a,i=>Math.sin(a+i)>.3);
   box3(c,x0+12,y0+22,46,46,4,84,'#2a3448');towerWin(c,x0+12,y0+22,46,46,4,84,'#5a8ad8',a,(i,j)=>Math.sin(a*.7+i*2+j)>.55,5,8);box3(c,x0+10,y0+20,50,50,88,5,'#1c2230');
   onFront(c,x0+10,y0+20,50,88,x=>{x.fillStyle='#8a5aff';x.fillRect(0,-5,50,1.6);});const t=P3(x0+35,y0+70,74);text3(c,'KHA',t[0],t[1],12,'#e8f0ff','#1a2030');line3(c,[x0+40,y0+40,93],[x0+40,y0+40,118],'#8a929c',1.4);beacon(c,x0+40,y0+40,119,a,'#4ab8ff');
   box3(c,x0+16,y0+74,34,14,4,14,'#3a4660');onFront(c,x0+16,y0+74,14,4,x=>{x.fillStyle='#1a2030';x.fillRect(12,-12,10,12);x.fillStyle='rgba(74,184,255,.6)';x.fillRect(13,-11,8,10);});},
 power(c,o){const{x0,y0,W,H,a,cx,cy}=o;slPlinth(c,x0,y0,W,H);for(const[dx,dy]of[[-16,-12],[16,-12],[-16,12],[16,12]])box3(c,cx+dx-3,cy+dy-3,6,6,4,14+((dx+dy)&4),'#3a3448');
   cyl3(c,cx,cy,12,4,8,'#2a2638');rune(c,cx,cy,13,15,a,'#4ab8ff');manaCrystal(c,cx,cy,30+Math.sin(a*2)*3,8,'#4ab8ff',a*1.5);
   for(const[dx,dy]of[[-16,-12],[16,-12],[-16,12],[16,12]]){const q=P3(cx+dx,cy+dy,20),p=P3(cx,cy,30);c.strokeStyle='rgba(74,184,255,'+(.3+.3*Math.sin(a*6+dx))+')';c.lineWidth=1;c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(p[0],p[1]);c.stroke();}},
 refinery(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+40,50,44,4,30,'#3a4256');towerWin(c,x0+8,y0+40,50,44,4,30,'#4ab8ff',a,i=>i%2===0,4,2);
   for(const[x,y]of[[x0+70,y0+30],[x0+70,y0+66]]){cyl3(c,x,y,12,4,38,'#56607a');band3(c,x,y,12,24,'#4ab8ff',2);glow3(c,x,y,42,8,'#4ab8ff',.4+.3*Math.sin(a*3+y));}
   pipe3(c,[x0+58,y0+50,24],[x0+64,y0+40,26],2,'#8a94a8');for(let i=0;i<5;i++)manaCrystal(c,x0+20+i*6,y0+26+(i%2)*4,6,3,'#7ad8ff',a+i);},
 barracks(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+14,48,40,4,40,'#3a4458');towerWin(c,x0+8,y0+14,48,40,4,40,'#7ab8ff',a,(i,j)=>(i+j+Math.floor(a))%3===0,4,3);
   box3(c,x0+6,y0+12,52,44,44,4,'#20283a');onFront(c,x0+6,y0+12,44,44,x=>{x.fillStyle='#1a1a24';x.fillRect(4,-3,44,3);x.font='bold 3.6px sans-serif';x.fillStyle='#8a5aff';x.textAlign='center';x.fillText('ÉVALUATION · E → S',26,-.6);});},
 factory(c,o){const{x0,y0,W,H,a,cx}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+10,y0+18,76,62,4,44,'#2a2436');stoneLines(c,x0+10,y0+18,76,62,4,44);
   onFront(c,x0+10,y0+18,62,4,x=>{x.fillStyle='#08060c';x.beginPath();x.moveTo(22,0);x.lineTo(22,-24);x.quadraticCurveTo(38,-40,54,-24);x.lineTo(54,0);x.closePath();x.fill();x.globalCompositeOperation='lighter';drawGlow(x,38,-12,22,'#8a5aff',.55+.25*Math.sin(a*3));x.globalCompositeOperation='source-over';});
   for(const[x,y]of[[x0+12,y0+20],[x0+84,y0+20],[x0+12,y0+78],[x0+84,y0+78]])cone3(c,x,y,4,48,16,'#3a3448');if(Math.sin(a*2)>.6)glow3(c,cx,y0+80,22,10,'#8a5aff',.5);},
 turret(c,o){const{x0,y0,a,cx,cy,b}=o;box3(c,x0+6,y0+8,20,18,0,6,'#2a2636');box3(c,cx-5,cy-4,10,8,6,26,'#342e44');pyramid3(c,cx-5,cy-4,10,8,32,8,'#3e3652');onFront(c,cx-5,cy-4,8,6,x=>{x.strokeStyle='#8a5aff';x.lineWidth=.8;x.beginPath();x.moveTo(5,-4);x.lineTo(5,-20);x.moveTo(2,-10);x.lineTo(8,-14);x.stroke();});
   const fire=b&&b.target&&b.cd>(b.D.wpn.rof-.25);glow3(c,cx,cy,46+Math.sin(a*3)*2,fire?14:8,'#b06aff',fire?1:.7);},
 temple(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+12,y0+12,40,40,4,96,'#1e1e2a');towerWin(c,x0+12,y0+12,40,40,4,96,'#5a4a9a',a,(i,j)=>Math.sin(a*.5+i*3+j*1.3)>.6,4,9);
   box3(c,x0+10,y0+10,44,44,100,5,'#141420');onFront(c,x0+10,y0+10,44,100,x=>{x.fillStyle='#8a5aff';x.fillRect(0,-5,44,1.4);});const t=P3(x0+32,y0+52,86);text3(c,'AHJIN',t[0],t[1],8.5,'#d8c8ff','#141420');beacon(c,x0+32,y0+32,108,a,'#8a5aff');},
 lab(c,o){const{x0,y0,W,H,a,cx,cy}=o;slPlinth(c,x0,y0,W,H);cyl3(c,cx,cy+6,14,4,8,'#3a3448');rune(c,cx,cy+6,13,16,-a,'#4ab8ff');
   const p=P3(cx,cy,36+Math.sin(a*2)*2);c.save();c.translate(p[0],p[1]);c.globalCompositeOperation='lighter';drawGlow(c,0,0,30,'#4ab8ff',.45);c.globalCompositeOperation='source-over';c.fillStyle='rgba(16,40,80,.82)';c.strokeStyle='#7ad8ff';c.lineWidth=1;c.beginPath();c.roundRect(-20,-14,40,26,2);c.fill();c.stroke();
   c.fillStyle='#bfe8ff';c.font='bold 5px Chakra Petch, sans-serif';c.textAlign='center';c.fillText('[ BOUTIQUE ]',0,-7);c.fillStyle='rgba(122,216,255,.6)';for(let i=0;i<3;i++)c.fillRect(-15,-3+i*4.5,30*(.4+.6*((Math.sin(a+i)+1)/2)),2);c.restore();},
 radar(c,o){const{x0,y0,W,H,a,cx,cy}=o;slPlinth(c,x0,y0,W,H);box3(c,cx-8,cy-6,16,14,4,58,'#3a4458');towerWin(c,cx-8,cy-6,16,14,4,58,'#4ab8ff',a,(i,j)=>(j+Math.floor(a*2))%4===0,2,6);
   for(let i=0;i<3;i++){const p=P3(cx,cy,64+i*6);c.strokeStyle='rgba(74,184,255,'+(.7-i*.18)+')';c.lineWidth=1.4;c.beginPath();c.ellipse(p[0],p[1],12+i*5+Math.sin(a*3+i)*2,(12+i*5)*.4,0,0,PI2);c.stroke();}line3(c,[cx,cy,62],[cx,cy,84],'#8a929c',1.2);beacon(c,cx,cy,85,a,'#4ab8ff');},
 def2(c,o){const{x0,y0,W,H,a,cx,cy,b}=o;box3(c,x0+4,y0+6,W-8,H-10,0,8,'#8a8274',{top:'#9a9284'});stoneLines(c,x0+4,y0+6,W-8,H-10,0,8);const p=P3(cx,cy+8,8);c.save();drawFighter(c,p[0],p[1],LOOK.godstatue,-1,a*.2,false,2.3,{stance:true});c.restore();
   if(b&&b.target&&b.cd>(b.D.wpn.rof-.4)){c.globalCompositeOperation='lighter';drawGlow(c,p[0]-6,p[1]-46,14,'#ff3a1a',1);c.globalCompositeOperation='source-over';}},
 market(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+16,48,38,4,30,'#3a4458');onFront(c,x0+8,y0+16,38,4,x=>{x.fillStyle='rgba(74,184,255,.35)';x.fillRect(4,-22,40,18);x.strokeStyle='#7ad8ff';x.lineWidth=.6;x.strokeRect(4,-22,40,18);
     x.fillStyle='#bfe8ff';x.font='bold 5px Chakra Petch, sans-serif';x.textAlign='center';x.fillText('₩ '+(12000+Math.floor(Math.sin(a*.5)*900))+' ▲',24,-11);});for(let i=0;i<3;i++)manaCrystal(c,x0+18+i*14,y0+30,40+Math.sin(a*2+i)*2,3.4,'#4ab8ff',a+i);},
 hospital(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+8,y0+12,48,42,4,46,'#e8ecf2');towerWin(c,x0+8,y0+12,48,42,4,46,'#6aa8e8',a,null,4,4);box3(c,x0+12,y0+16,40,34,50,3,'#c8ccd4');
   const p=P3(x0+32,y0+33,53);c.fillStyle='#4ab8ff';c.fillRect(p[0]-1.6,p[1]-6,3.2,12);c.fillRect(p[0]-6,p[1]-1.6,12,3.2);},
 training(c,o){const{x0,y0,W,H,a,cx,cy}=o;slPlinth(c,x0,y0,W,H);box3(c,cx-20,cy-4,6,8,4,34,'#3a3448');box3(c,cx+14,cy-4,6,8,4,34,'#3a3448');box3(c,cx-22,cy-5,44,10,38,6,'#2a2638');portal3(c,cx,cy+4,20,13,16,a,'#4ab8ff');
   const t=P3(cx,cy+4,48);text3(c,'RANG D',t[0],t[1],7,'#bfe8ff','#141420');},
 temple2(c,o){const{x0,y0,W,H,a}=o;slPlinth(c,x0,y0,W,H);box3(c,x0+16,y0+26,64,52,4,40,'#2a2232');stoneLines(c,x0+16,y0+26,64,52,4,40);crenel(c,x0+16,y0+26,64,52,44,'#342a40',8);
   for(const[x,y,h]of[[x0+18,y0+28,70],[x0+78,y0+28,70],[x0+48,y0+50,96],[x0+18,y0+78,58],[x0+78,y0+78,58]]){cyl3(c,x,y,9,4,h,'#30283c');cone3(c,x,y,11,4+h,22,'#4a2a5a');glow3(c,x,y,h-10,5,'#ff3a5a',.5+.4*Math.sin(a*2+x));}
   onFront(c,x0+16,y0+26,52,4,x=>{x.fillStyle='#0a060e';x.beginPath();x.moveTo(24,0);x.lineTo(24,-16);x.quadraticCurveTo(32,-26,40,-16);x.lineTo(40,0);x.fill();x.globalCompositeOperation='lighter';drawGlow(x,32,-8,14,'#ff3a5a',.6);x.globalCompositeOperation='source-over';});},
 unique(c,o){const{x0,y0,W,H,a,cx,cy}=o;slPlinth(c,x0,y0,W,H);rune(c,cx,cy+2,4.5,26,a*.6,'#8a5aff');box3(c,cx-12,cy-6,24,14,4,12,'#2a2436');box3(c,cx-14,cy-8,28,18,16,3,'#3a3448');
   for(const[dx,dy]of[[-20,-16],[20,-16],[-20,18],[20,18]]){box3(c,cx+dx-3,cy+dy-3,6,6,4,20,'#2a2436');glow3(c,cx+dx,cy+dy,26,6,'#8a5aff',.6+.3*Math.sin(a*4+dx));}
   const p=P3(cx,cy,20);c.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const h=(a*30+i*9)%34;drawGlow(c,p[0]+Math.sin(a*3+i)*5,p[1]-h,8-h*.15,'#7a4aff',.6);}c.globalCompositeOperation='source-over';},
 wall(c,o){const{x0,y0,a}=o;c.globalAlpha*=.8;box3(c,x0+2,y0+6,28,22,0,24,'#3a6aaa',{top:'#7ab8ff',front:'#4a8ad8'});c.globalAlpha/= .8;onFront(c,x0+2,y0+6,22,0,x=>{x.strokeStyle='rgba(191,232,255,'+(.4+.3*Math.sin(a*3))+')';x.lineWidth=.6;x.beginPath();for(let i=0;i<4;i++){x.moveTo(0,-4-i*5);x.lineTo(28,-6-i*5);}x.stroke();});},
};
const OPB={
 hq(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+60,y0+50,28,36,4,40,'#c8ccd4');towerWin(c,x0+60,y0+50,28,36,4,40,'#6a9ad8',a,null,3,3);
   box3(c,x0+16,y0+20,46,48,4,116,'#e8eaee');towerWin(c,x0+16,y0+20,46,48,4,116,'#5a8ad8',a,(i,j)=>Math.sin(a*.6+i*2.1+j*1.7)>.7,5,11);box3(c,x0+14,y0+18,50,52,120,6,'#d8343f');
   const t=P3(x0+39,y0+68,104);c.fillStyle='#ffc21a';c.beginPath();c.arc(t[0],t[1],9,0,PI2);c.fill();c.strokeStyle=LINE;c.lineWidth=1;c.stroke();text3(c,'HA',t[0],t[1]+.5,10,'#d8343f');line3(c,[x0+39,y0+44,126],[x0+39,y0+44,148],'#8a929c',1.4);beacon(c,x0+39,y0+44,149,a);
   box3(c,x0+22,y0+74,30,12,4,12,'#c8ccd4');onFront(c,x0+22,y0+74,12,4,x=>{x.fillStyle='rgba(90,140,220,.7)';x.fillRect(10,-10,10,10);});},
 power(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+8,y0+20,40,32,4,24,'#b8bcc4');for(const x of[x0+16,x0+30])cyl3(c,x,y0+28,5,28,22,'#9aa0a8');
   for(const x of[x0+16,x0+30])glow3(c,x,y0+28,52,5,'#ffffff',.25);
   box3(c,x0+48,y0+14,8,8,4,40,'#7a8088');for(let i=0;i<3;i++){const p=P3(x0+52,y0+18,40),q=P3(x0+64,y0+40+i*6,10);c.strokeStyle='#2a2a2a';c.lineWidth=.5;c.beginPath();c.moveTo(p[0],p[1]);c.quadraticCurveTo((p[0]+q[0])/2,(p[1]+q[1])/2+6,q[0],q[1]);c.stroke();}
   onFront(c,x0+8,y0+20,32,4,x=>{x.fillStyle='#ffc21a';x.fillRect(0,-4,40,2);x.font='bold 4px sans-serif';x.fillStyle='#2a2a2a';x.textAlign='center';x.fillText('VILLE Z',20,-12);});},
 refinery(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');hazardFloor(c,x0+60,y0+50,30,36);box3(c,x0+8,y0+36,50,46,4,28,'#9aa0aa');towerWin(c,x0+8,y0+36,50,46,4,28,'#7ab0e8',a,null,4,2);
   cyl3(c,x0+74,y0+28,13,4,30,'#c8ccd4');band3(c,x0+74,y0+28,13,18,'#ffc21a',3);
   for(let i=0;i<6;i++){const p=P3(x0+64+(i%3)*8,y0+64+((i/3)|0)*8,6);c.fillStyle=['#7a4a9a','#5a2a7a','#8a5aaa'][i%3];c.beginPath();c.moveTo(p[0]-4,p[1]+2);c.lineTo(p[0]-1,p[1]-5);c.lineTo(p[0]+4,p[1]-2);c.lineTo(p[0]+3,p[1]+3);c.closePath();c.fill();c.strokeStyle=LINE;c.lineWidth=.6;c.stroke();}
   line3(c,[x0+30,y0+40,32],[x0+30,y0+40,62],'#ffc21a',2);line3(c,[x0+30,y0+40,62],[x0+66+Math.sin(a*.6)*8,y0+62,58],'#ffc21a',2);line3(c,[x0+66+Math.sin(a*.6)*8,y0+62,58],[x0+66+Math.sin(a*.6)*8,y0+62,36],'#2a2a2a',.7);},
 barracks(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+8,y0+14,48,40,4,36,'#eef0f2');towerWin(c,x0+8,y0+14,48,40,4,36,'#6a9ad8',a,null,4,3);box3(c,x0+6,y0+12,52,44,40,4,'#d8343f');
   onFront(c,x0+6,y0+12,44,40,x=>{x.fillStyle='#ffc21a';x.fillRect(6,-3.4,40,3.4);x.font='bold 3.4px sans-serif';x.fillStyle='#2a2a2a';x.textAlign='center';x.fillText('INSCRIPTION DES HÉROS',26,-.8);});},
 factory(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+8,y0+16,80,64,4,46,'#3a3a44');onFront(c,x0+8,y0+16,64,4,x=>{x.fillStyle='#1a1a20';x.fillRect(18,-34,44,34);x.fillStyle='#ffc21a';for(let i=0;i<9;i++){x.beginPath();x.moveTo(18+i*5,-34);x.lineTo(21+i*5,-34);x.lineTo(18+i*5,-31);x.closePath();x.fill();}
     x.fillStyle='#ff3a3a';x.globalAlpha=.6+.4*Math.sin(a*4);x.fillRect(2,-42,6,3);x.fillRect(72,-42,6,3);x.globalAlpha=1;x.font='bold 5px sans-serif';x.fillStyle='#c8ccd4';x.textAlign='center';x.fillText('METAL KNIGHT',40,-38);});
   for(let i=0;i<2;i++){const p=P3(x0+24+i*44,y0+30,50);c.save();c.translate(p[0],p[1]);c.rotate(a*(i?-1:1));c.strokeStyle='#5a5a64';c.lineWidth=2.4;c.beginPath();for(let k=0;k<8;k++){const q=k/8*PI2;c.moveTo(0,0);c.lineTo(Math.cos(q)*7,Math.sin(q)*3.6);}c.stroke();c.restore();}},
 turret(c,o){const{x0,y0,a,cx,cy,b}=o;box3(c,x0+5,y0+8,22,18,0,8,'#5a5a64');cyl3(c,cx,cy+2,8,8,8,'#3a3a44');const ang=(b&&b.tang)||-PI/4,p=P3(cx,cy+2,18);c.save();c.translate(p[0],p[1]);c.rotate(ang);
   c.fillStyle='#4a4a54';c.beginPath();c.roundRect(-6,-5,12,10,2);c.fill();c.strokeStyle=LINE;c.lineWidth=.8;c.stroke();c.fillStyle='#22222a';c.fillRect(4,-4,12,2.4);c.fillRect(4,1.6,12,2.4);c.fillStyle='#ffc21a';c.fillRect(-6,-1,12,2);c.restore();glow3(c,cx,cy+2,22,4,'#ff3a3a',.7);},
 temple(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+10,y0+14,44,40,4,58,'#f2f2f4');towerWin(c,x0+10,y0+14,44,40,4,58,'#6a9ad8',a,null,4,5);box3(c,x0+8,y0+12,48,44,62,4,'#e3c13b');
   const t=P3(x0+32,y0+54,46);c.fillStyle='#d8343f';c.beginPath();c.arc(t[0],t[1],8,0,PI2);c.fill();c.strokeStyle='#e3c13b';c.lineWidth=1.4;c.stroke();text3(c,'S',t[0],t[1]+.5,12,'#ffe9a0');flag3(c,x0+48,y0+20,66,a,'#ffc21a');},
 lab(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+8,y0+22,40,30,4,24,'#d8dce2');towerWin(c,x0+8,y0+22,40,30,4,24,'#7ab0e8',a,null,3,2);dome3(c,x0+28,y0+36,12,28,12,'#c8d8e8');
   cyl3(c,x0+50,y0+28,5,4,30,'#9aa0a8');sphere3(c,x0+50,y0+28,4,34,'#ff8a2a');glow3(c,x0+50,y0+28,38,9,'#ff8a2a',.5+.3*Math.sin(a*5));},
 radar(c,o){const{x0,y0,W,H,a,cx,cy}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+10,y0+16,40,34,4,22,'#c8ccd4');cyl3(c,cx,cy,4,26,22,'#8a929c');const p=P3(cx,cy,52);c.save();c.translate(p[0],p[1]);c.rotate(Math.sin(a*.8)*.6);
   c.fillStyle='#eef0f2';c.beginPath();c.ellipse(0,0,15,8,-.3,0,PI2);c.fill();c.strokeStyle=LINE;c.lineWidth=1;c.stroke();c.fillStyle='#c8ccd4';c.beginPath();c.ellipse(1,1,10,5,-.3,0,PI2);c.fill();c.strokeStyle='#5a5a64';c.beginPath();c.moveTo(0,0);c.lineTo(6,-9);c.stroke();c.restore();beacon(c,cx,cy,62,a);},
 def2(c,o){const{x0,y0,W,H,a,cx,cy,b}=o;plinth(c,x0,y0,W,H,'#ffc21a');hazardFloor(c,x0+8,y0+10,W-16,H-18);cyl3(c,cx,cy,18,4,12,'#3a3a44');const ang=(b&&b.tang)||-PI/4,p=P3(cx,cy,20);c.save();c.translate(p[0],p[1]);c.rotate(ang);
   c.fillStyle='#4a4a54';c.beginPath();c.roundRect(-12,-9,22,18,4);c.fill();c.strokeStyle=LINE;c.lineWidth=1;c.stroke();c.fillStyle='#2a2a30';c.beginPath();c.roundRect(6,-4,26,8,2);c.fill();c.stroke();c.fillStyle='#ffc21a';c.fillRect(-12,-2,22,4);c.restore();},
 market(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+6,y0+16,52,38,4,26,'#f2f2ee');onFront(c,x0+6,y0+16,38,4,x=>{x.fillStyle='rgba(120,170,230,.55)';x.fillRect(4,-16,44,14);x.fillStyle='#d8343f';x.fillRect(0,-26,52,8);
     x.font='bold 6px Bangers, sans-serif';x.fillStyle='#ffe14d';x.textAlign='center';x.fillText(Math.sin(a*3)>0?'SOLDES -50 % !':'SUPERMARCHÉ',26,-20);});
   for(let i=0;i<2;i++){const p=P3(x0+14+i*10,y0+58,4);c.strokeStyle='#8a929c';c.lineWidth=.8;c.strokeRect(p[0]-3,p[1]-5,6,4);}},
 hospital(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+8,y0+12,48,42,4,44,'#f2f4f6');towerWin(c,x0+8,y0+12,48,42,4,44,'#7ab0e8',a,null,4,4);const p=P3(x0+32,y0+33,48);c.fillStyle='#d8343f';c.fillRect(p[0]-1.8,p[1]-6.5,3.6,13);c.fillRect(p[0]-6.5,p[1]-1.8,13,3.6);},
 training(c,o){const{x0,y0,W,H,a,cx,cy}=o;const q=P3(cx,cy,1);c.strokeStyle='#d86a3a';c.lineWidth=4;c.beginPath();c.ellipse(q[0],q[1],26,14,0,0,PI2);c.stroke();c.strokeStyle='#f4f4f4';c.lineWidth=.6;c.stroke();
   for(const dx of[-12,12])line3(c,[cx+dx,cy-12,0],[cx+dx,cy-12,22],'#5a5a64',1.6);line3(c,[cx-12,cy-12,22],[cx+12,cy-12,22],'#8a929c',1.4);box3(c,cx+12,cy+8,10,6,0,8,'#8a6a3a');const t=P3(cx+17,cy+14,14);text3(c,'100',t[0],t[1],7,'#ffe14d','#2a2a2a');
   const bob=Math.abs(Math.sin(a*4))*4,p=P3(cx,cy-12,12+bob);c.fillStyle='#ffd23a';c.beginPath();c.arc(p[0],p[1],2.6,0,PI2);c.fill();c.fillStyle='#f6d2ac';c.beginPath();c.arc(p[0],p[1]-4,2,0,PI2);c.fill();},
 temple2(c,o){const{x0,y0,W,H,a}=o;plinth(c,x0,y0,W,H,'#ffc21a');box3(c,x0+14,y0+24,66,56,4,40,'#e8eaee');towerWin(c,x0+14,y0+24,66,56,4,40,'#6a9ad8',a,null,6,3);
   box3(c,x0+28,y0+34,38,36,44,44,'#f2f2f4');towerWin(c,x0+28,y0+34,38,36,44,44,'#6a9ad8',a,(i,j)=>Math.sin(a+i+j)>.5,3,4);pyramid3(c,x0+28,y0+34,38,36,88,14,'#e3c13b');
   const t=P3(x0+47,y0+70,66);c.fillStyle='#d8343f';c.beginPath();c.arc(t[0],t[1],9,0,PI2);c.fill();c.strokeStyle='#e3c13b';c.lineWidth=1.6;c.stroke();text3(c,'S',t[0],t[1]+.5,13,'#ffe9a0');beacon(c,x0+47,y0+52,104,a,'#ffc21a');},
 unique(c,o){const{x0,y0,W,H,a}=o;box3(c,x0+3,y0+4,W-6,H-7,0,4,'#8a8a7a',{top:'#a8a690'});box3(c,x0+10,y0+20,44,32,4,20,'#c8a878');woodLines(c,x0+10,y0+20,44,32,4,20);gable3(c,x0+10,y0+20,44,32,24,16,'#3a3a3a','#c8a878');
   onFront(c,x0+10,y0+20,32,4,x=>{x.fillStyle='#2a1a10';x.fillRect(16,-14,12,14);x.fillStyle='#f4ecd8';x.fillRect(14,-19,16,4);x.font='bold 3.6px sans-serif';x.fillStyle='#1a1a1a';x.textAlign='center';x.fillText('POING DE L’EAU',22,-16);});palm(c,x0+56,y0+58,4,.7);},
 wall(c,o){const{x0,y0}=o;box3(c,x0+2,y0+8,28,18,0,18,'#c8ccd2');onFront(c,x0+2,y0+8,18,0,x=>{x.fillStyle='#ffc21a';for(let i=0;i<4;i++){x.beginPath();x.moveTo(i*8,-6);x.lineTo(i*8+4,-6);x.lineTo(i*8+8,-12);x.lineTo(i*8+4,-12);x.closePath();x.fill();}x.fillStyle='#2a2a2a';x.fillRect(0,-12.6,28,.8);});},
};
{const _d3=drawB3;drawB3=function(c,b,ghost){const T=b.fac==='sl'?SLB:b.fac==='opm'?OPB:null;if(!T)return _d3(c,b,ghost);const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;
  (T[b.key]||T.barracks)(c,{x0,y0,W,H,cx:x0+W/2,cy:y0+H/2,a:b.anim||0,b:ghost?null:b,ghost});};}
// ---- construction: shadows rising (SL) / cranes and Metal Knight drones (OPM) ----
{const _ub=updBuildAnim;updBuildAnim=function(b,dt){_ub(b,dt);if(b.rise>=1||!plSees(b))return;const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE;
  if(b.fac==='sl'&&R()<dt*18)part('smoke',x0+R()*W,y0+H-R()*8,rr(-10,10),rr(-40,-15),rr(.8,1.4),rr(6,11),'#2a2040');
  if(b.fac==='opm'&&R()<dt*10)part('spark',x0+R()*W,y0+H-(H+bH(b))*b.rise,rr(-40,40),rr(-50,-10),.3,1.5,'#ffe14d');};}
{const _bp=buildPre;buildPre=function(c,b){if(b.fac==='sl'){const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,p=P3(x0+W/2,y0+H/2,0);const g=c.createRadialGradient(p[0],p[1],2,p[0],p[1],W*.75);g.addColorStop(0,'rgba(10,4,20,.95)');g.addColorStop(.7,'rgba(40,20,80,.6)');g.addColorStop(1,'rgba(40,20,80,0)');
    c.fillStyle=g;c.beginPath();c.ellipse(p[0],p[1],W*.75,H*.5,0,0,PI2);c.fill();}return _bp(c,b);};}
{const _bq=buildPost;buildPost=function(c,b){if(b.fac!=='sl'&&b.fac!=='opm')return _bq(c,b);const r=b.rise,x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,cx=x0+W/2,h=bH(b),a=b.anim||0,ey=y0+H-(H+h+30)*r;
  if(b.fac==='sl'){c.globalCompositeOperation='lighter';const g=c.createLinearGradient(x0-10,0,x0+W+10,0);g.addColorStop(0,'rgba(138,90,255,0)');g.addColorStop(.5,'rgba(160,120,255,.9)');g.addColorStop(1,'rgba(138,90,255,0)');c.fillStyle=g;c.fillRect(x0-14,ey-1.5,W+28,3);c.globalCompositeOperation='source-over';
    c.strokeStyle='rgba(20,10,40,.85)';c.lineWidth=2;for(let i=0;i<5;i++){const sx=x0+W*(.1+i*.2);c.beginPath();c.moveTo(sx,y0+H);c.quadraticCurveTo(sx+Math.sin(a*4+i)*8,(y0+H+ey)/2,sx+Math.sin(a*3+i*2)*4,ey);c.stroke();}
    c.font='bold 9px Chakra Petch, sans-serif';c.textAlign='center';c.fillStyle='#bfa8ff';c.fillText('[ '+Math.floor(r*100)+' % ]',cx,y0-h-14);return;}
  const mx=x0+W+6,top=y0-h-26;c.strokeStyle='#ffc21a';c.lineWidth=2;c.beginPath();c.moveTo(mx,y0+H);c.lineTo(mx,top);c.stroke();c.lineWidth=.8;c.beginPath();for(let y=y0+H;y>top;y-=8){c.moveTo(mx-3,y);c.lineTo(mx+3,y-8);}c.stroke();
  const jx=mx-W*.9*(.6+.4*Math.sin(a*.8));c.lineWidth=2;c.beginPath();c.moveTo(mx+10,top);c.lineTo(jx,top);c.stroke();c.strokeStyle='#2a2a2a';c.lineWidth=.7;c.beginPath();c.moveTo(jx+6,top);c.lineTo(jx+6,ey-6);c.stroke();c.fillStyle='#8a929c';c.fillRect(jx+2,ey-8,8,5);
  for(let i=0;i<2;i++){const an=a*2+i*PI,dx=cx+Math.cos(an)*W*.5,dy=ey-12+Math.sin(an)*6;c.fillStyle='#4a4a54';c.fillRect(dx-3,dy-1.5,6,3);c.fillStyle='rgba(200,210,220,.5)';c.fillRect(dx-6,dy-2.6,4,1);c.fillRect(dx+2,dy-2.6,4,1);
    c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,225,77,.7)';c.lineWidth=1;c.beginPath();c.moveTo(dx,dy);c.lineTo(dx+rr(-5,5),ey);c.stroke();c.globalCompositeOperation='source-over';}
  c.fillStyle='#ffc21a';c.fillRect(x0,y0+H+2,W,2.4);c.fillStyle='#1a1a1a';for(let x=x0;x<x0+W;x+=6)c.fillRect(x,y0+H+2,3,2.4);};}
// ---- special effects ----
{const _ds=drawSpecial;drawSpecial=function(c){_ds(c);for(const f of fxs){const p=f.t/f.dur;
  if(f.type==='arise'){c.globalCompositeOperation='lighter';drawGlow(c,f.x,f.y-20,40*(1-p*.5),'#5a2aaa',.7*(1-p));c.globalCompositeOperation='source-over';c.fillStyle='rgba(10,4,20,'+(.6*(1-p))+')';c.beginPath();c.ellipse(f.x,f.y,22,9,0,0,PI2);c.fill();
    c.strokeStyle='rgba(20,8,40,'+(.8*(1-p))+')';c.lineWidth=2;for(let i=0;i<5;i++){c.beginPath();c.moveTo(f.x+(i-2)*6,f.y);c.quadraticCurveTo(f.x+(i-2)*8+Math.sin(f.t*8+i)*6,f.y-30,f.x+(i-2)*3,f.y-60*p-10);c.stroke();}
    if(f.big&&p>.3)txt(c,'ARISE',f.x,f.y-58-p*16,16,'#c0a8ff',true);}
  else if(f.type==='lvlup'){const u=f.u,x=u&&!u.dead?u.x:f.x,y=(u&&!u.dead?u.y-50:f.y)-p*24;c.globalAlpha=1-Math.max(0,p-.6)/.4;c.fillStyle='rgba(10,30,60,.8)';c.strokeStyle='#6fd8ff';c.lineWidth=1.2;c.beginPath();c.roundRect(x-30,y-10,60,16,2);c.fill();c.stroke();
    c.font='bold 10px Chakra Petch, sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#bfefff';c.fillText('LEVEL UP !',x,y-2);c.textBaseline='alphabetic';c.globalAlpha=1;}
  else if(f.type==='onepunch'){c.save();c.globalAlpha=1-p;c.translate(f.x,f.y-p*14);c.rotate(-.12);c.font=`${22+p*8}px Bangers, Impact, sans-serif`;c.textAlign='center';c.lineWidth=5;c.strokeStyle='#1a1a1a';c.strokeText('ONE PUNCH !',0,0);c.fillStyle='#ffe14d';c.fillText('ONE PUNCH !',0,0);c.restore();
    c.strokeStyle='rgba(255,255,255,'+(1-p)+')';c.lineWidth=2;c.beginPath();for(let i=0;i<10;i++){const an=i/10*PI2;c.moveTo(f.x+Math.cos(an)*(10+p*30),f.y+30+Math.sin(an)*(6+p*16));c.lineTo(f.x+Math.cos(an)*(26+p*50),f.y+30+Math.sin(an)*(14+p*26));}c.stroke();}
  else if(f.type==='kingeng'){const k=Math.sin(f.t*14)>0;c.strokeStyle='rgba(255,58,58,'+(.6*(1-p))+')';c.lineWidth=3;c.beginPath();c.ellipse(f.x,f.y,f.r*(k?1:.95),f.r*.6*(k?1:.95),0,0,PI2);c.stroke();if(p<.8)txt(c,k?'BA-DOUM':'…',f.x,f.y-70,14,'#ff5a5a',true);}
  else if(f.type==='shadowarmy'){c.strokeStyle='rgba(138,90,255,'+(.4+.4*Math.sin(f.t*10))+')';c.lineWidth=3;c.setLineDash([10,8]);c.beginPath();c.ellipse(f.x,f.y,f.rad,f.rad*.6,0,0,PI2);c.stroke();c.setLineDash([]);
    c.fillStyle='rgba(10,4,24,'+Math.min(.55,f.t/f.delay*.55)+')';c.beginPath();c.ellipse(f.x,f.y,f.rad*.9,f.rad*.54,0,0,PI2);c.fill();
    if(!f.done)for(let i=0;i<8;i++){const an=i/8*PI2+f.t,r=f.rad*.6;portal3(c,f.x+Math.cos(an)*r,f.y+Math.sin(an)*r*.6,2,7,3,f.t*3,'#7a4aff');}}
  else if(f.type==='serious'){c.strokeStyle='rgba(255,210,58,'+(.4+.4*Math.sin(f.t*12))+')';c.lineWidth=3;c.setLineDash([12,8]);c.beginPath();c.ellipse(f.x,f.y,f.rad,f.rad*.6,0,0,PI2);c.stroke();c.setLineDash([]);
    if(f.done){const q=clamp((f.t-f.delay)/.8,0,1);c.globalCompositeOperation='lighter';c.strokeStyle='rgba(255,255,255,'+(1-q)+')';c.lineWidth=8*(1-q)+1;c.beginPath();for(let i=0;i<24;i++){const an=i/24*PI2;c.moveTo(f.x+Math.cos(an)*f.rad*.3,f.y+Math.sin(an)*f.rad*.18);c.lineTo(f.x+Math.cos(an)*f.rad*(1+q*3),f.y+Math.sin(an)*f.rad*.6*(1+q*3));}c.stroke();
      drawGlow(c,f.x,f.y-30,f.rad*2*(1-q*.5),'#ffffff',1-q);c.globalCompositeOperation='source-over';}}}};}
{const _dz=drawZones;drawZones=function(c){_dz(c);for(const g of gates){portal3(c,g.x,g.y,24,26,34,gtime,g.broke?'#ff4d5e':'#4ab8ff');const left=Math.max(0,Math.ceil(g.dur-g.t));
  txt(c,g.broke?'RUPTURE DE DONJON !':'PORTE DE RANG A · '+left+' s',g.x,g.y-70,14,g.broke?'#ff4d5e':'#7ad8ff',true);}};}
// ---- the System window (quest tracker) for the Solo Leveling player ----
{const _dvg=drawVignette;drawVignette=function(c,sw,sh){_dvg(c,sw,sh);const s=sides[PL];if(!s||s.fac!=='sl'||G.state!=='play')return;const lv=s.slv||1,need=60+lv*30,q=s.quest,w=230,h=q?62:40,x=sw/2-w/2,y=NET.on?34:8;
  c.fillStyle='rgba(6,18,36,.82)';c.strokeStyle='#4ab8ff';c.lineWidth=1.2;c.beginPath();c.roundRect(x,y,w,h,3);c.fill();c.stroke();c.font='bold 11px Chakra Petch, sans-serif';c.textAlign='left';c.fillStyle='#bfe8ff';
  c.fillText('[ SYSTÈME ]  Sung Jinwoo · Niv. '+lv,x+10,y+16);c.fillStyle='rgba(74,184,255,.25)';c.fillRect(x+10,y+24,w-20,5);c.fillStyle='#4ab8ff';c.fillRect(x+10,y+24,(w-20)*clamp((s.slx||0)/need,0,1),5);
  c.font='10px Chakra Petch, sans-serif';c.fillStyle='#8ab8d8';c.fillText('Ombres : '+shadeCount(PL)+' / '+shadeMax(PL),x+10,y+37);
  if(q){c.fillStyle='#ffe14d';c.fillText('QUÊTE : vaincre '+q.n+' ennemis ('+Math.min(q.k,q.n)+'/'+q.n+') → niveau '+((s.slv||1)+1),x+10,y+53);}};}
