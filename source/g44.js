// ===== Bridges over wide water on watery maps: wide ones for everyone, narrow footbridges for infantry only =====
let bridges=[],bridgeT=null;
function landDist(sx,sy,gx,gy,lim){const seen=new Map(),q=[[sx,sy,0]];seen.set(sy*MW+sx,1);for(let h=0;h<q.length;h++){const[x,y,d]=q[h];if(x===gx&&y===gy)return d;if(d>=lim)continue;
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=MW||ny>=MH)continue;const i=ny*MW+nx;if(seen.has(i)||blocked[i])continue;seen.set(i,1);q.push([nx,ny,d+1]);}}return Infinity;}
function bridgeFits(x,y,dx,dy,w,P){const px=-dy,py=dx,o=(w-1)>>1;let k=1;
  for(;k<22;k++){const cx=x+dx*k,cy=y+dy*k;if(cx<P||cy<P||cx>=MW-P||cy>=MH-P)return 0;const i=cy*MW+cx;if(ter[i]!==T_WATER)break;
    for(let s=-o;s<=o;s++){if(!s)continue;const j=(cy+py*s)*MW+cx+px*s;if(bridgeT[j]||(ter[j]!==T_WATER&&blocked[j]))return 0;}}
  const len=k-1;if(len<4||len>18)return 0;
  for(const t of[0,k])for(let s=-o;s<=o;s++){const ex=x+dx*t+px*s,ey=y+dy*t+py*s,j=ey*MW+ex;if(bridgeT[j]||(blocked[j]&&ter[j]!==T_WATER)||(!s&&blocked[j]))return 0;}
  return len;}
function nearFit(a,b,c,d,w,P,len){for(let r=0;r<=5;r++)for(let s=-r;s<=r;s++)for(const t of[-r,r])for(const[ox,oy]of[[s,t],[t,s]]){const x=a+ox,y=b+oy;if(x<P||y<P||x>=MW-P||y>=MH-P||blocked[y*MW+x])continue;
  if(ter[(y+d)*MW+x+c]!==T_WATER)continue;const L=bridgeFits(x,y,c,d,w,P);if(L&&Math.abs(L-len)<=4)return[x,y,c,d,L];}return null;}
function symCopies(x,y,dx,dy){const S=MW,M=MAPS[MAPID],out=[[x,y,dx,dy]];
  if(M.sym==='quad'){let a=[x,y,dx,dy];for(let r=0;r<3;r++){a=[S-1-a[1],a[0],-a[3],a[2]];out.push(a);}}else out.push([S-1-x,S-1-y,-dx,-dy]);return out;}
function layBridge(x,y,dx,dy,w,len){const px=-dy,py=dx,o=(w-1)>>1,tiles=[];
  for(let k=1;k<=len;k++)for(let s=-o;s<=o;s++){const tx=x+dx*k+px*s,ty=y+dy*k+py*s,i=ty*MW+tx;if(ter[i]!==T_WATER&&!bridgeT[i]&&s)continue;ter[i]=T_DIRT;elev[i]=.45;blocked[i]=0;bridgeT[i]=1;if(w===1)narrowT[i]=1;tiles.push(i);}
  bridges.push({x0:(x+dx+px*-o)*TILE,y0:(y+dy+py*-o)*TILE,x1:(x+dx*len+px*o)*TILE+TILE,y1:(y+dy*len+py*o)*TILE+TILE,dx,dy,w,len});if(w===1)narrowAny=true;}
{const _g=genMap;genMap=function(seed){_g(seed);bridges=[];bridgeT=new Uint8Array(NT);const P=(typeof EDGE_PAD!=='undefined'?EDGE_PAD:0)+2;
  let water=0,tot=0;for(let y=P;y<MH-P;y++)for(let x=P;x<MW-P;x++){tot++;if(ter[y*MW+x]===T_WATER)water++;}if(water/tot<.1)return;
  const rng=mulberry(seed*13+7),want={3:water/tot>.25?3:2,1:2};
  for(const w of[3,1]){let made=0;for(let tries=0;tries<4000&&made<want[w];tries++){const x=P+((rng()*(MW-2*P))|0),y=P+((rng()*(MH-2*P))|0),i=y*MW+x;if(blocked[i])continue;
      const dirs=[[1,0],[-1,0],[0,1],[0,-1]],[dx,dy]=dirs[(rng()*4)|0];if(ter[(y+dy)*MW+x+dx]!==T_WATER)continue;
      const len=bridgeFits(x,y,dx,dy,w,P);if(!len)continue;const ex=x+dx*(len+1),ey=y+dy*(len+1);if(landDist(x,y,ex,ey,Math.ceil(len*2.5))<len*2.5)continue;
      const C=symCopies(x,y,dx,dy).map(([a,b,c,d],k)=>k?nearFit(a,b,c,d,w,P,len):[a,b,c,d,len]);if(!C.every(Boolean))continue;
      C.forEach(([a,b,c,d,L])=>layBridge(a,b,c,d,w,L));made++;}}};}
// no building on a bridge
{const _cp=canPlace;canPlace=function(si,key,tx,ty,gap){if(bridgeT){const D=BDEF[key];for(let y=ty-1;y<=ty+D.h;y++)for(let x=tx-1;x<=tx+D.w;x++){if(x<0||y<0||x>=MW||y>=MH)continue;if(bridgeT[y*MW+x])return false;}}return _cp(si,key,tx,ty,gap);};}
// drawing: wooden decks over the water
function drawBridges(c){for(const b of bridges){const hor=b.dx!==0,x0=Math.min(b.x0,b.x1),x1=Math.max(b.x0,b.x1),y0=Math.min(b.y0,b.y1),y1=Math.max(b.y0,b.y1);
  const ext=10,X0=hor?x0-ext:x0+(b.w===1?6:2),X1=hor?x1+ext:x1-(b.w===1?6:2),Y0=hor?y0+(b.w===1?6:2):y0-ext,Y1=hor?y1-(b.w===1?6:2):y1+ext;
  c.fillStyle='rgba(0,0,0,.28)';c.fillRect(X0+4,Y0+6,X1-X0,Y1-Y0);
  c.fillStyle=b.w===1?'#b08a58':'#8a5e34';c.fillRect(X0,Y0,X1-X0,Y1-Y0);
  c.strokeStyle=b.w===1?'rgba(70,45,20,.55)':'rgba(50,30,12,.6)';c.lineWidth=1;c.beginPath();
  if(hor)for(let x=X0+6;x<X1;x+=6){c.moveTo(x,Y0);c.lineTo(x,Y1);}else for(let y=Y0+6;y<Y1;y+=6){c.moveTo(X0,y);c.lineTo(X1,y);}c.stroke();
  if(b.w===1){c.strokeStyle='#d8c090';c.lineWidth=1.4;c.beginPath();if(hor){c.moveTo(X0,Y0-1);c.lineTo(X1,Y0-1);c.moveTo(X0,Y1+1);c.lineTo(X1,Y1+1);}else{c.moveTo(X0-1,Y0);c.lineTo(X0-1,Y1);c.moveTo(X1+1,Y0);c.lineTo(X1+1,Y1);}c.stroke();}
  else{c.fillStyle='#5a3a1a';if(hor){c.fillRect(X0,Y0-3,X1-X0,4);c.fillRect(X0,Y1-1,X1-X0,4);for(let x=X0;x<X1;x+=24){c.fillRect(x,Y0-7,4,8);c.fillRect(x,Y1-1,4,8);}}
    else{c.fillRect(X0-3,Y0,4,Y1-Y0);c.fillRect(X1-1,Y0,4,Y1-Y0);for(let y=Y0;y<Y1;y+=24){c.fillRect(X0-6,y,7,4);c.fillRect(X1-1,y,7,4);}}}}}
{const _dz=drawZones;drawZones=function(c){drawBridges(c);_dz(c);};}
// paint water under the decks
{const _rt=renderTerrain;renderTerrain=function(...a){if(!bridgeT||!bridges.length)return _rt(...a);const sv=[];for(let i=0;i<NT;i++)if(bridgeT[i]){sv.push([i,ter[i],elev[i]]);ter[i]=T_WATER;elev[i]=.3;}
  try{return _rt(...a);}finally{for(const[i,t,e]of sv){ter[i]=t;elev[i]=e;}}};}
