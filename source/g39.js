// ===== "Les Forteresses": rock ramparts around each base with one wide entrance and two narrow, infantry-only passages =====
let narrowT=null,narrowAny=false;
{const _g=genMap;genMap=function(seed){_g(seed);narrowT=new Uint8Array(NT);narrowAny=false;const M=MAPS[MAPID];if(!M||!M.fort)return;
  const C=(MW-1)/2,R0=17,R1=19.5,set=(x,y,t)=>{x=Math.round(x);y=Math.round(y);if(x<0||y<0||x>=MW||y>=MH)return -1;const i=ti(x,y);if(ter[i]===T_WATER)return -1;ter[i]=t;return i;};
  const bases=mapPts(MAPID);
  for(const B of bases){const ac=Math.atan2(C-B.y,C-B.x);
    for(let y=Math.floor(B.y-R1-1);y<=B.y+R1+1;y++)for(let x=Math.floor(B.x-R1-1);x<=B.x+R1+1;x++){const d=hyp(x-B.x,y-B.y);if(d<R0||d>R1)continue;if(x<0||y<0||x>=MW||y>=MH)continue;const i=ti(x,y);
      if(ter[i]===T_WATER||ore[i]>0)continue;if(bases.some(o=>o!==B&&hyp(x-o.x,y-o.y)<R0))continue;ter[i]=T_ROCK;elev[i]=Math.max(elev[i],.74);}
    // wide entrance toward the map centre
    for(let r=R0-1.5;r<=R1+1.5;r+=.4){const cx=B.x+Math.cos(ac)*r,cy=B.y+Math.sin(ac)*r;for(let oy=-3;oy<=3;oy++)for(let ox=-3;ox<=3;ox++)if(hyp(ox,oy)<=2.8){const i=set(cx+ox,cy+oy,T_DIRT);if(i>=0&&elev[i]>.6)elev[i]=.5;}}
    // two narrow passages (one tile, 4-connected so infantry can walk them)
    for(const da of[-.85,.85]){const a=ac+da;let px=null,py=null;
      for(let r=R0-1.5;r<=R1+1.5;r+=.25){const x=Math.round(B.x+Math.cos(a)*r),y=Math.round(B.y+Math.sin(a)*r);
        if(px!==null&&x!==px&&y!==py){const j=set(x,py,T_DIRT);if(j>=0){narrowT[j]=1;elev[j]=.5;}}const i=set(x,y,T_DIRT);if(i>=0){narrowT[i]=1;elev[i]=.5;}px=x;py=y;}}}
  for(let i=0;i<NT;i++)if(blocked[i]!==2)blocked[i]=ter[i]>=T_WATER?1:0;
  for(let i=0;i<NT;i++)if(narrowT[i]&&ter[i]!==T_DIRT)narrowT[i]=0;narrowAny=narrowT.some(v=>v);};}
// vehicles cannot use narrow passages
const vehNarrow=u=>narrowAny&&u&&u.D&&u.D.veh&&!u.fly;
{const _bw=bw;bw=function(u,x,y){if(vehNarrow(u)){if(x<0||y<0||x>=WW||y>=WH)return true;if(narrowT[Math.floor(y/TILE)*MW+Math.floor(x/TILE)]&&!narrowT[Math.floor(u.y/TILE)*MW+Math.floor(u.x/TILE)])return true;}return _bw(u,x,y);};}
{let vg=null,vgT=-9;const _mt=moveTo;moveTo=function(u,x,y){if(!vehNarrow(u))return _mt(u,x,y);
  if(!vg||vg.length!==NT||gtime-vgT>1||gtime<vgT){vg=vg&&vg.length===NT?vg:new Uint8Array(NT);for(let i=0;i<NT;i++)vg[i]=narrowT[i]?1:blocked[i];vgT=gtime;}
  const save=blocked;blocked=vg;try{return _mt(u,x,y);}finally{blocked=save;}};}
