// ===== Hawk Mama redrawn in 2.5D (tavern with depth, walking pig) =====
function drawHawkMama(c,x,y,t,moving,ghost,rise){c.save();if(rise<1)c.globalAlpha*=.4+.6*rise;
  const ph=t*7,bob=moving?Math.abs(Math.sin(ph))*-3:Math.sin(t*1.6)*1.2,sway=moving?Math.sin(ph)*.035:0;
  // 3D helper: X along body, Y depth (away from viewer), Z height
  const P=(X,Y,Z)=>[x+X+Y*.55,y-Z-Y*.38];
  const poly=(pts,fill,stroke)=>{c.beginPath();pts.forEach((p,i)=>{const q=P(...p);i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]);});c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.2;c.stroke();}};
  c.fillStyle='rgba(0,0,0,.28)';c.beginPath();c.ellipse(x+8,y+4,62,16,0,0,PI2);c.fill();
  // legs: far pair first (darker), near pair after the body
  const leg=(lx,ly,k,col)=>{const s=moving?Math.sin(ph+k):0,lift=Math.max(0,s)*6,sw=moving?Math.cos(ph+k)*4:0;const[a,b]=P(lx+sw,ly,0);
    c.fillStyle=col;c.beginPath();c.roundRect(a-6,b-32-lift+bob*.3,12,32,5);c.fill();c.strokeStyle='#5a2a34';c.lineWidth=1.1;c.stroke();c.fillStyle='#4a2a2a';c.beginPath();c.roundRect(a-6,b-5-lift,12,5,2);c.fill();};
  leg(-30,18,PI,'#c07888');leg(26,18,0,'#c07888');
  // body
  c.save();const[bx,by]=P(0,9,38+bob);c.translate(bx,by);c.rotate(sway);
  const g=c.createRadialGradient(-10,-18,8,0,0,64);g.addColorStop(0,'#ffd0dc');g.addColorStop(.6,'#f2a6b8');g.addColorStop(1,'#c27084');
  c.fillStyle=g;c.beginPath();c.ellipse(0,0,58,30,0,0,PI2);c.fill();c.strokeStyle='#5a2a34';c.lineWidth=1.6;c.stroke();
  c.fillStyle='rgba(255,230,236,.5)';c.beginPath();c.ellipse(-4,14,40,10,0,0,PI2);c.fill();
  // tail
  const tw=Math.sin(t*5)*3;c.strokeStyle='#d88a9a';c.lineWidth=3;c.beginPath();c.moveTo(-56,-6);c.bezierCurveTo(-68,-14+tw,-70,0,-62,-4);c.bezierCurveTo(-58,-8,-64,-14,-66,-10);c.stroke();
  // head
  const hy=-4+(moving?Math.sin(ph*2)*1.2:0);c.fillStyle='#f6b6c4';c.beginPath();c.ellipse(54,hy,20,18,0,0,PI2);c.fill();c.strokeStyle='#5a2a34';c.lineWidth=1.5;c.stroke();
  c.fillStyle='#ee9cb0';c.beginPath();c.ellipse(70,hy+4,9,7,0,0,PI2);c.fill();c.stroke();c.fillStyle='#5a2a34';c.beginPath();c.arc(68,hy+4,1.4,0,PI2);c.arc(73,hy+4,1.4,0,PI2);c.fill();
  c.fillStyle='#1a1014';c.beginPath();c.arc(57,hy-6,2.6,0,PI2);c.fill();c.fillStyle='#fff';c.beginPath();c.arc(58,hy-7,.9,0,PI2);c.fill();
  const ef=moving?Math.sin(ph*2)*.25:Math.sin(t*2)*.08;for(const[ex,s]of[[44,1],[52,.85]]){c.save();c.translate(ex,hy-14);c.rotate(-.5+ef*s);c.fillStyle=s<1?'#e898a8':'#f6b6c4';c.beginPath();c.moveTo(-6,0);c.lineTo(0,-16);c.lineTo(7,0);c.closePath();c.fill();c.strokeStyle='#5a2a34';c.lineWidth=1.2;c.stroke();c.restore();}
  c.restore();
  leg(-22,0,0,'#e8a0b0');leg(34,0,PI,'#e8a0b0');
  // tavern on the back: box X -34..22, Y 0..22, Z 52..86
  const z0=60+bob,z1=94+bob,X0=-34,X1=22,Y1=22;
  poly([[X1,0,z0],[X1,Y1,z0],[X1,Y1,z1],[X1,0,z1]],'#6a4224','#3a2210');                 // right side (shadowed)
  poly([[X0,0,z0],[X1,0,z0],[X1,0,z1],[X0,0,z1]],'#946036','#3a2210');                   // front
  c.strokeStyle='rgba(58,34,16,.45)';c.lineWidth=.8;for(let k=1;k<5;k++){const a=P(X0,0,z0+k*7),b=P(X1,0,z0+k*7),d=P(X1,Y1,z0+k*7);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.lineTo(d[0],d[1]);c.stroke();}
  // door, windows, sign
  poly([[-10,0,z0],[2,0,z0],[2,0,z0+20],[-10,0,z0+20]],'#4a2a14','#2a1408');
  for(const wx of[-28,10]){poly([[wx,0,z0+14],[wx+10,0,z0+14],[wx+10,0,z0+25],[wx,0,z0+25]],'#ffe9a0','#3a2210');}
  poly([[X1,7,z0+14],[X1,15,z0+14],[X1,15,z0+24],[X1,7,z0+24]],'#d8c070','#3a2210');
  poly([[-20,-.5,z0+27],[12,-.5,z0+27],[12,-.5,z0+33],[-20,-.5,z0+33]],'#e8c040','#3a2210');
  {const p=P(-4,0,z0+29);c.fillStyle='#3a2210';c.font='bold 6px Chakra Petch, sans-serif';c.textAlign='center';c.fillText('BOAR HAT',p[0],p[1]+1.5);}
  // gable roof (ridge along X at Y=11), eaves overhang
  const zr=z1+20;poly([[X0-4,-3,z1-1],[X1+4,-3,z1-1],[X1+4,11,zr],[X0-4,11,zr]],'#4a7a3a','#1a3a1a');      // front slope
  poly([[X1+4,11,zr],[X1+4,Y1+3,z1-1],[X1,Y1+3,z1-1],[X1,11,zr]],'#2e5424','#1a3a1a');                     // back slope edge
  poly([[X1,0,z1],[X1,Y1,z1],[X1,11,zr-2]],'#7a4e2a','#3a2210');                                          // gable triangle
  c.strokeStyle='rgba(20,50,20,.5)';c.lineWidth=.8;for(let k=1;k<4;k++){const a=P(X0-4,-3+k*3.5,z1-1+k*5),b=P(X1+4,-3+k*3.5,z1-1+k*5);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();}
  // chimney
  poly([[8,6,zr-4],[14,6,zr-4],[14,6,zr+10],[8,6,zr+10]],'#6a4a2a','#2a1408');poly([[14,6,zr-4],[14,11,zr-4],[14,11,zr+10],[14,6,zr+10]],'#4a3018','#2a1408');
  if(!ghost&&Math.sin(t*2.2)>.6){const s=P(11,8,zr+12);part('smoke',s[0],s[1],rr(-6,6),-22,1.3,rr(4,7));}
  // flag
  {const s=P(X0-2,2,z1+4),f=Math.sin(t*5);c.strokeStyle='#3a3a3a';c.lineWidth=1.3;c.beginPath();c.moveTo(s[0],s[1]);c.lineTo(s[0],s[1]-22);c.stroke();c.fillStyle='#c8202e';c.beginPath();c.moveTo(s[0],s[1]-22);c.quadraticCurveTo(s[0]-8,s[1]-20+f*2,s[0]-15,s[1]-19);c.lineTo(s[0]-14,s[1]-12);c.quadraticCurveTo(s[0]-7,s[1]-13+f*2,s[0],s[1]-14);c.fill();}
  if(moving&&!ghost&&Math.sin(ph)>.95)for(let k=0;k<2;k++)part('dust',x+rr(-30,40),y+rr(-2,6),rr(-20,20),rr(-10,0),.8,rr(6,10));
  c.restore();}
{const _db=drawBoarHat;drawBoarHat=function(c,b,ghost){if(!isFinite(b.x)||!isFinite(b.y))b=Object.assign({},b,{x:(b.tx||0)*TILE+(b.w||3)*TILE/2,y:(b.ty||0)*TILE+(b.h||3)*TILE/2});
  drawHawkMama(c,b.x-4,b.y+30,b.anim||0,!!b.walk,ghost,ghost?1:Math.min(1,b.rise||1));};}
{const _dv=drawVehicle;drawVehicle=function(c,u,x,y,ghost){if(u.key!=='hawk')return _dv(c,u,x,y,ghost);const f=u.face||1;c.save();c.translate(x,0);c.scale(f,1);c.translate(-x,0);
  drawHawkMama(c,x-4,y+16,u.anim||0,!!u.moving,false,1);c.restore();};}
// ===== random portals never open near buildings =====
{const _rs=randSpot;openGate=(function(_og){return function(){const save=randSpot;randSpot=function(m){for(let k=0;k<40;k++){const p=save(m);if(!p)return null;if(!ents.some(b=>b.isB&&!b.dead&&hyp(b.x-p.x,b.y-p.y)<10*TILE))return p;}return null;};try{return _og();}finally{randSpot=save;}};})(openGate);}
