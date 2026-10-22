// ===== Smoothness: costly path searches are spread over several frames; water ripples only where the camera looks =====
let pathMs=0;
{const _up=update;update=function(dt){pathMs=0;return _up(dt);};}
{const _mt=moveTo;moveTo=function(u,x,y){if(u.fly||pathMs<8){u.waitPath=null;const t=performance.now();try{return _mt(u,x,y);}finally{pathMs+=performance.now()-t;}}u.waitPath={x,y};};}
{const _uu=updUnit;updUnit=function(u,dt){if(u.waitPath){if(pathMs>=8)return;const w=u.waitPath;u.waitPath=null;moveTo(u,w.x,w.y);}return _uu(u,dt);};}
drawWater=function(c,x0,y0,x1,y1){if(!ter)return;x0=Math.max(0,x0|0);y0=Math.max(0,y0|0);x1=Math.min(MW-1,x1|0);y1=Math.min(MH-1,y1|0);let n=0;c.strokeStyle='rgba(235,250,255,.55)';c.lineWidth=1.2;c.beginPath();
  for(let ty=y0;ty<=y1&&n<500;ty++)for(let tx=x0;tx<=x1;tx++){const i=ty*MW+tx;if(ter[i]!==T_WATER)continue;const ph=(i*.618)%1,s=Math.sin(gtime*1.6+ph*PI2);if(s<.55)continue;
    const x=tx*TILE+8+ph*16,y=ty*TILE+8+((i*.37)%1)*16,l=4+s*5;c.moveTo(x-l,y);c.quadraticCurveTo(x,y-1.5,x+l,y);if(++n>=500)break;}c.stroke();};
// 3D-gear paths: the "cliffs are walkable" grid is rebuilt at most once per second instead of on every search
{let odm=null,odmT=-9,odmN=0;findPathODM=function(sx,sy,gx,gy){if(!odm||odmN!==NT||gtime-odmT>1||gtime<odmT){odm=odm&&odmN===NT?odm:new Uint8Array(NT);odmN=NT;odmT=gtime;for(let i=0;i<NT;i++)odm[i]=(blocked[i]===2||ter[i]===T_WATER)?1:0;}
  const save=blocked;blocked=odm;try{return findPath(sx,sy,gx,gy);}finally{blocked=save;}};}
// water ripples as tiny filled dashes (much cheaper than hundreds of stroked curves)
drawWater=function(c,x0,y0,x1,y1){if(!ter)return;x0=Math.max(0,x0|0);y0=Math.max(0,y0|0);x1=Math.min(MW-1,x1|0);y1=Math.min(MH-1,y1|0);let n=0;c.fillStyle='rgba(235,250,255,.5)';
  for(let ty=y0;ty<=y1&&n<600;ty++)for(let tx=x0;tx<=x1;tx++){const i=ty*MW+tx;if(ter[i]!==T_WATER)continue;const ph=(i*.618)%1,s=Math.sin(gtime*1.6+ph*PI2);if(s<.55)continue;
    const x=tx*TILE+8+ph*16,y=ty*TILE+8+((i*.37)%1)*16,l=4+s*5;c.fillRect(x-l,y-.6,l*2,1.3);c.fillRect(x-l*.4,y-1.6,l*.8,1);if(++n>=600)break;}};
// ore crystals drawn from pre-rendered images
{const _cr=crystal,CRC={};crystal=function(c,x,y,s,f){const k=Math.round(s*20)+(f<0?'n':'p');let im=CRC[k];
  if(!im){const R=2,S=Math.round(s*20)/20;im=document.createElement('canvas');im.width=Math.ceil(26*S*R);im.height=Math.ceil(22*S*R);const x2=im.getContext('2d');x2.scale(R,R);_cr(x2,13*S,18*S,S,f);im.S=S;CRC[k]=im;}
  c.drawImage(im,x-13*im.S,y-18*im.S,im.width/2,im.height/2);};}
// building placement search: unit and building lists are built once per search instead of once per tested tile
let CPC=null;
{const _cp=canPlace;canPlace=function(si,key,tx,ty,gap){if(!CPC)return _cp(si,key,tx,ty,gap);const D=BDEF[key];
  if(tx<1||ty<1||tx+D.w>MW-1||ty+D.h>MH-1)return false;
  for(let y=ty;y<ty+D.h;y++)for(let x=tx;x<tx+D.w;x++){const i=ti(x,y);if(blocked[i]||ore[i]>0)return false;}
  if(gap){for(let y=ty-1;y<=ty+D.h;y++)for(let x=tx-1;x<=tx+D.w;x++){if(x<0||y<0||x>=MW||y>=MH)continue;if(blocked[ti(x,y)]===2)return false;}}
  const x0=tx*TILE,y0=ty*TILE,x1=x0+D.w*TILE,y1=y0+D.h*TILE;
  for(const e of CPC.u)if(e.x>x0-e.r&&e.x<x1+e.r&&e.y>y0-e.r&&e.y<y1+e.r)return false;
  const lim=key==='outpost'?10:4;for(const b of CPC.b){const dx=Math.max(b.tx-(tx+D.w-1),tx-(b.tx+b.w-1),0),dy=Math.max(b.ty-(ty+D.h-1),ty-(b.ty+b.h-1),0);if(Math.max(dx,dy)<=lim)return true;}
  return false;};}
{const _fs=findSpot;findSpot=function(si,key){CPC={u:ents.filter(e=>e.isU&&!e.dead&&!e.fly),b:ents.filter(b=>b.isB&&!b.dead&&b.side===si)};const save=oreCells;
  if(key==='refinery'||key==='drill'){const hq=myB(si,'hq2')[0]||myB(si,'hq')[0]||myB(si)[0];if(hq){const near=save.filter(i=>ore[i]>0&&Math.abs(i%MW-hq.tx)<34&&Math.abs((i/MW|0)-hq.ty)<34);oreCells=near.length>400?near.filter((_,j)=>j%Math.ceil(near.length/400)===0):near;}}
  try{return _fs(si,key);}finally{CPC=null;oreCells=save;}};}
// ===== Battle marks (scorches, tracks, wrecks) on their own small tiles instead of the terrain image =====
// Drawing them on the giant terrain image forced the whole image to be re-sent to the graphics card after every explosion: big freezes.
const DCH=256;let dChunks={};
let terrK=1;
{const _rt=renderTerrain;renderTerrain=function(seed){_rt(seed);dChunks={};scorchCtx=null;terrK=1;
};}// never modified afterwards
function drawTerrainChunks(c,X0,Y0,X1,Y1){if(terr&&terr.getContext){const k=terrK;c.drawImage(terr,X0*k,Y0*k,(X1-X0)*k,(Y1-Y0)*k,X0,Y0,X1-X0,Y1-Y0);}
  const d0x=Math.floor(X0/DCH),d1x=Math.floor((X1-1)/DCH),d0y=Math.floor(Y0/DCH),d1y=Math.floor((Y1-1)/DCH);
  for(let y=d0y;y<=d1y;y++)for(let x=d0x;x<=d1x;x++){const d=dChunks[x+','+y];if(d)c.drawImage(d,x*DCH,y*DCH);}}
function decalChunk(x,y){const k=x+','+y;let d=dChunks[k];if(!d){d=document.createElement('canvas');d.width=d.height=DCH;dChunks[k]=d;}return d;}
let decalDepth=0;
function decalWrap(name,box){const f=window[name];window[name]=function(...a){if(decalDepth>0)return f.apply(this,a);if(!terr)return;const b=box(...a);if(!b)return;
  const x0=Math.max(0,Math.floor(b[0]/DCH)),x1=Math.floor(Math.min(WW-1,b[2])/DCH),y0=Math.max(0,Math.floor(b[1]/DCH)),y1=Math.floor(Math.min(WH-1,b[3])/DCH);decalDepth++;
  try{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const c=decalChunk(x,y).getContext('2d');c.setTransform(1,0,0,1,-x*DCH,-y*DCH);scorchCtx=c;f.apply(this,a);}}finally{decalDepth--;scorchCtx=null;}};}
decalWrap('scorch',(x,y,r)=>[x-r,y-r,x+r,y+r]);
decalWrap('scorchLine',(x1,y1,x2,y2,w)=>[Math.min(x1,x2)-w,Math.min(y1,y2)-w,Math.max(x1,x2)+w,Math.max(y1,y2)+w]);
decalWrap('track',(x,y)=>[x-14,y-14,x+14,y+14]);
decalWrap('wreck',(x,y,a,r)=>{const m=r*1.8+6;return[x-m,y-m,x+m,y+m];});
decalWrap('rubble',b=>{const x0=b.tx*TILE,y0=b.ty*TILE,W=b.w*TILE,H=b.h*TILE,m=Math.max(W,H)*.8+10;return[x0-m,y0-m,x0+W+m,y0+H+m];});
