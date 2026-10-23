// ===== Game state =====
let ents=[],projs=[],parts=[],fxs=[],sides=[],sel=[],groups={},PL=0,gtime=0,nextId=1;
let vis=new Uint8Array(NT),expl=new Uint8Array(NT);
const G={state:'menu',diff:1,shake:0,slow:0,msgs:[],cut:null,lastAlert:-99,alertPos:null,pings:[],clicks:[],ai:[],over:false,auto:false,fogT:0,aiT:0,winT:0};
const DIFF=[{mult:.55,wave0:4,first:480,wcap:9,think:1.4,dmg:.75,hp:.85,noSuper:true},{mult:.85,wave0:5,first:330,wcap:15,think:.8,dmg:.9,hp:1},{mult:1.25,wave0:7,first:190,wcap:24,think:.5,dmg:1,hp:1}];
const STUDENT=[{hc:'#ff86cf',gi:'#6a2c8c',q:'#d4ff3a',skin:'#f6b8d8'},{hc:'#f5d63a',gi:'#2c2c34',q:'#fff04a'},{hc:'#d8343f',gi:'#5a5a5e',q:'#ff7a3a'},{hc:'#2a2a3a',gi:'#3a6ad6',q:'#9ad8ff'}];

function mkSide(fac,ai){return{fac,ai,credits:3000,pow:0,use:0,prodB:null,q:{barracks:[],factory:[],temple:[],temple2:[]},ups:[],res:null,primary:{},st:{built:0,kills:0,lost:0,harv:0},mult:1,sp:0,wishes:0};}
function mkUnit(side,key,x,y){const fac=sides[side].fac,D=UDEF[fac][key];
  const u={id:nextId++,isU:true,side,key,D,fac,x,y,hp:D.hp,max:D.hp,r:D.size,fly:!!D.fly,z:D.fly?16:0,path:null,pi:0,order:null,target:null,cd:R()*.5,abCd:0,
    face:side===0?1:-1,ang:side===0?-PI/4:PI*.75,tang:0,anim:R()*10,moving:false,scanT:R()*.4,repT:0,freeze:0,buff:0,kx:0,ky:0,gx:x,gy:y,atk:0,hitFl:0,
    load:0,hs:'seek',ht:0,ot:-1,v:(R()*4)|0,ssj:false,stuck:0,xp:0,rank:0,lift:0};
  {const m=upMul(u,'hp');if(m!==1){u.max=Math.round(u.max*m);u.hp=u.max;}}ents.push(u);return u;}
function mkBuilding(side,key,tx,ty,instant){const D=BDEF[key];
  const b={id:nextId++,isB:true,side,key,D,fac:sides[side].fac,tx,ty,w:D.w,h:D.h,x:(tx+D.w/2)*TILE,y:(ty+D.h/2)*TILE,hp:D.hp,max:D.hp,r:D.w*16,
    rise:instant?1:0,popped:!!instant,anim:R()*10,cd:0,target:null,scanT:0,tang:side===0?-PI/4:PI*.75,rally:null,seen:side===PL,smT:0};
  for(let y=ty;y<ty+D.h;y++)for(let x=tx;x<tx+D.w;x++){blocked[ti(x,y)]=2;bAt[ti(x,y)]=b;}
  {const m=upMul(b,'hp');if(m!==1){b.max=Math.round(b.max*m);b.hp=b.max;}}ents.push(b);recalcPower(side);return b;}
function recalcPower(s){let p=0,u=0;for(const e of ents)if(e.isB&&!e.dead&&e.side===s){if(e.D.pow>0)p+=e.D.pow*(1+.5*(((e)&&(e).lvl||1)-1));else u-=e.D.pow;}sides[s].pow=p;sides[s].use=u;}
const myB=(si,key)=>ents.filter(e=>e.isB&&!e.dead&&e.side===si&&(!key||e.key===key));
const has=(si,key)=>{const up=!!key&&key.charCodeAt(key.length-1)===43,k=up?key.slice(0,-1):key;return ents.some(e=>e.isB&&!e.dead&&e.side===si&&e.key===k&&e.rise>=1&&(!up||(e.lvl||1)>=2));};// 'key+' = upgraded building
const reqName=(k,f)=>{const up=k.endsWith('+'),D=BDEF[up?k.slice(0,-1):k];return(D?D.names[f]||D.names.dbz:k)+(up?' ★ (amélioration)':'');};
const reqOk=(si,req)=>req.every(k=>has(si,k)||(k==='refinery'&&sides[si]&&sides[si].fac==='sl'&&has(si,'power')));
function edgeDist(a,t){if(t.isB){const x0=t.tx*TILE,y0=t.ty*TILE,x1=x0+t.w*TILE,y1=y0+t.h*TILE;
  const dx=Math.max(x0-a.x,0,a.x-x1),dy=Math.max(y0-a.y,0,a.y-y1);return hyp(dx,dy)-(a.isB?a.r:a.r);}return hyp(t.x-a.x,t.y-a.y)-t.r-a.r;}
function visibleTo(side,e){if(e.hid&&foe(e.side,side))return false;if(side!==PL||ally(e.side,side))return true;if(e.isB)return e.seen;return vis[ti(tileOf(e.x),tileOf(e.y))]===1;}
const plSees=e=>ally(e.side,PL)||!e.hid&&((e.isB?e.seen:vis[ti(tileOf(e.x),tileOf(e.y))]===1));

// ===== Production =====
function startBuild(si,key){const s=sides[si],D=BDEF[key];if(s.prodB||s.credits<D.cost||!reqOk(si,D.req)||!(has(si,'hq')||has(si,'hq2')))return false;s.credits-=D.cost;s.prodB={key,prog:0,ready:false};return true;}
function cancelBuild(si){const s=sides[si];if(!s.prodB)return;s.credits+=BDEF[s.prodB.key].cost;s.prodB=null;}
function heroBusy(si,key){const s=sides[si];if(s.fusion&&(key==='goku'||key==='vegeta'))return true;return ents.some(e=>e.isU&&!e.dead&&e.side===si&&e.key===key)||Object.values(s.q).some(q=>q.some(it=>it.key===key));}
function queueUnit(si,key){const s=sides[si],D=UDEF[s.fac][key],q=s.q[D.at];
  if(!has(si,D.at)||!reqOk(si,D.req)||s.credits<D.cost||q.length>=8)return false;if(D.hero&&heroBusy(si,key))return false;
  s.credits-=D.cost;q.push({key,prog:0});return true;}
function unqueueUnit(si,key){const s=sides[si],D=UDEF[s.fac][key],q=s.q[D.at];for(let i=q.length-1;i>=0;i--)if(q[i].key===key){s.credits+=D.cost;q.splice(i,1);return true;}return false;}
function prodBuilding(si,cat){const p=sides[si].primary[cat];if(p&&!p.dead&&p.rise>=1)return p;return ents.find(e=>e.isB&&!e.dead&&e.side===si&&e.key===cat&&e.rise>=1);}
function updProd(si,dt){updResearch(si,dt);const s=sides[si],rate=s.use>s.pow?.45:1,SP=SUPER[s.fac];
  if(s.fac==='dbz'&&has(si,'temple')){s.szT=(s.szT||0)+dt*rate;if(s.szT>=80&&(s.senzu||0)<3){s.szT=0;s.senzu=(s.senzu||0)+1;if(si===PL)msg('Karin t’envoie un Senzu ('+s.senzu+'/3) : il soignera un héros en danger','#7dff9a');}}
  if(has(si,'temple+')&&s.sp<SP.charge){s.sp=Math.min(SP.charge,s.sp+dt*rate*(has(si,'relay+')?2:has(si,'relay')?1.6:1));if(s.sp>=SP.charge&&si===PL){msg(SP.name+' est prête ! Clique sur son bouton en haut de l’écran',FAC[s.fac].col);banner(SP.name.toUpperCase()+' PRÊTE !',FAC[s.fac].col);sfx('ready');announce(SP.name+' est prête');}}
  if(s.prodB&&!s.prodB.ready&&(has(si,'hq')||has(si,'hq2'))){s.prodB.prog+=dt*rate*(has(si,'hq+')||has(si,'hq2+')?1.4:1)/BDEF[s.prodB.key].time;
    if(s.prodB.prog>=1){s.prodB.prog=1;s.prodB.ready=true;if(si===PL){msg('Construction terminée : '+BDEF[s.prodB.key].names[s.fac]+'. Clique sa carte puis place-le.','#4fd17a');sfx('ready');announce('Construction achevée');}}}
  for(const cat in s.q){const q=s.q[cat];if(!q.length)continue;const B=prodBuildings(si,cat);if(!B.length)continue;const done=[];
    for(let k=0;k<Math.min(B.length,q.length);k++){const b=B[k],it=q[k],D=UDEF[s.fac][it.key];
      it.prog+=dt*rate*(b.key==='temple2'&&(b.lvl||1)>=2?2:1+.25*((b.lvl||1)-1))*(sides[si].hqBoost||1)/D.time;if(it.prog>=1)done.push([it,b,D]);}
    for(const[it,b,D]of done){q.splice(q.indexOf(it),1);spawnFrom(b,it.key);s.st.built++;
      if(si===PL&&(D.hero||!s.q[cat].length)){msg(D.hero?D.name+' rejoint la bataille !':D.name+' prêt',D.hero?FAC[s.fac].col:null);sfx(D.hero?'rankup':'ready');if(D.hero){banner(D.name.toUpperCase()+' ARRIVE !',FAC[s.fac].col);announce(D.name+' rejoint la bataille');}else if(R()<.3)announce('Unité opérationnelle');}}}}
// one item at a time per building: every building of the right type works in parallel (primary building first)
function prodBuildings(si,cat){const p=sides[si].primary[cat];return ents.filter(e=>e.isB&&!e.dead&&e.side===si&&e.key===cat&&e.rise>=1).sort((a,b)=>(b===p)-(a===p));}
function spawnFrom(b,key){const tx=b.tx+((b.w/2)|0),ty=b.ty+b.h,p=nearestFree(tx,ty,10,tx,ty+2)||[tx,ty];
  const u=mkUnit(b.side,key,p[0]*TILE+16+rr(-4,4),p[1]*TILE+12);
  if(u.D.hero){fxRing(u.x,u.y,FAC[u.fac].col,40);sides[b.side].heroMade=true;}
  if(b.rally&&!u.D.harv)cmdMove([u],b.rally.x,b.rally.y,true);
  else if(!u.D.harv){orderMove(u,u.x+rr(-24,24),u.y+30);}
  return u;}
function canPlace(si,key,tx,ty,gap){const D=BDEF[key];
  if(tx<1||ty<1||tx+D.w>MW-1||ty+D.h>MH-1)return false;
  for(let y=ty;y<ty+D.h;y++)for(let x=tx;x<tx+D.w;x++){const i=ti(x,y);if(blocked[i]||ore[i]>0)return false;}
  if(gap){for(let y=ty-1;y<=ty+D.h;y++)for(let x=tx-1;x<=tx+D.w;x++){if(x<0||y<0||x>=MW||y>=MH)continue;if(blocked[ti(x,y)]===2)return false;}}
  const x0=tx*TILE,y0=ty*TILE,x1=x0+D.w*TILE,y1=y0+D.h*TILE;
  for(const e of ents)if(e.isU&&!e.dead&&!e.fly&&e.x>x0-e.r&&e.x<x1+e.r&&e.y>y0-e.r&&e.y<y1+e.r)return false;
  for(const b of ents)if(b.isB&&!b.dead&&b.side===si){const dx=Math.max(b.tx-(tx+D.w-1),tx-(b.tx+b.w-1),0),dy=Math.max(b.ty-(ty+D.h-1),ty-(b.ty+b.h-1),0);if(Math.max(dx,dy)<=(key==='outpost'?10:4))return true;}
  return false;}
function placeBuilding(si,key,tx,ty){const s=sides[si];if(!s.prodB||!s.prodB.ready||s.prodB.key!==key||!canPlace(si,key,tx,ty,false))return false;
  const b=mkBuilding(si,key,tx,ty,false);s.prodB=null;s.st.built++;
  for(let k=0;k<b.w*b.h*3;k++)part('dust',b.tx*TILE+R()*b.w*TILE,b.ty*TILE+R()*b.h*TILE,rr(-20,20),rr(-20,10),1.2,rr(8,14));
  if(key==='refinery')spawnFrom(b,'harv');
  if(si===PL)sfx('place',b.x,b.y);return true;}
function sellBuilding(b){if(b.dead||b.key==='hq')return;sides[b.side].credits+=Math.round(b.D.cost*.5*b.hp/b.max);
  for(let k=0;k<20;k++)part('dust',b.tx*TILE+R()*b.w*TILE,b.ty*TILE+R()*b.h*TILE,rr(-30,30),rr(-30,10),1.4,rr(8,16));
  removeBuilding(b);sfx('sell',b.x,b.y);}
function removeBuilding(b){b.dead=true;for(let y=b.ty;y<b.ty+b.h;y++)for(let x=b.tx;x<b.tx+b.w;x++){const i=ti(x,y);blocked[i]=ter[i]>=T_WATER?1:0;bAt[i]=null;}recalcPower(b.side);}

// ===== Orders =====
function moveTo(u,x,y){x=clamp(x,8,WW-8);y=clamp(y,8,WH-8);
  if(u.fly){u.path=[{x,y}];u.pi=0;return;}
  const gx=tileOf(x),gy=tileOf(y),p=(u.D.odm&&!u.form?findPathODM:findPath)(tileOf(u.x),tileOf(u.y),gx,gy);
  if(!p){u.path=null;return;}
  const pts=p.map(i=>({x:(i%MW+.5)*TILE,y:((i/MW|0)+.5)*TILE}));
  if(walk(gx,gy)){if(pts.length&&p[p.length-1]===ti(gx,gy))pts[pts.length-1]={x,y};else if(!pts.length)pts.push({x,y});}
  u.path=smooth(pts,u.x,u.y);u.pi=0;}
function orderMove(u,x,y,am){u.order={type:am?'amove':'move',x,y};u.target=null;moveTo(u,x,y);u.stuck=0;if(u.D.harv){releaseClaim(u);}}
function orderAttack(u,t){if(!u.D.dmg)return;u.order={type:'attack',target:t};u.target=t;u.path=null;u.repT=0;}
function orderStop(u){u.order=null;u.target=null;u.path=null;u.gx=u.x;u.gy=u.y;u.moving=false;if(u.D.harv){u.hs='seek';u.ht=0;}}
function cmdMove(list,x,y,am){const L=list.filter(u=>u.isU&&!u.dead);if(!L.length)return;
  L.sort((a,b)=>hyp(a.x-x,a.y-y)-hyp(b.x-x,b.y-y));const offs=[[0,0]];
  for(let r=1;offs.length<L.length;r++){const n=6*r;for(let k=0;k<n;k++){const a=k/n*PI2+r*.5;offs.push([Math.cos(a)*r*24,Math.sin(a)*r*24]);}}
  L.forEach((u,i)=>{let px=x+offs[i][0],py=y+offs[i][1];if(!u.fly&&bw(u,px,py)){const n=nearestFree(tileOf(px),tileOf(py),6,tileOf(x),tileOf(y));if(n){px=n[0]*TILE+16;py=n[1]*TILE+16;}}
    if(u.D.harv){u.order={type:'move',x:px,y:py};moveTo(u,px,py);releaseClaim(u);}else orderMove(u,px,py,am);});}
function cmdHarvest(list,i){for(const u of list)if(u.D.harv){u.order=null;releaseClaim(u);u.hx=(i%MW+.5)*TILE;u.hy=((i/MW|0)+.5)*TILE;u.hs='seek';u.ht=0;}}
function canCast(u){return u.D.ab&&u.abCd<=0&&!u.casting&&!u.dash&&u.freeze<=0&&!u.dead&&!u.form&&!(u.lift>0)&&!(u.erased>0);}
function orderAbility(u,x,y){if(!canCast(u))return false;if(['rage','shift','harden','rally','rewind','barrier','erase'].includes(u.D.ab.type)){startCast(u,{x:u.x,y:u.y});return true;}
  u.order={type:'ability',x,y};u.target=null;u.path=null;u.repT=0;return true;}

// ===== Movement =====
function turn(a,b,s){const d=((b-a+PI*3)%PI2)-PI;return a+clamp(d,-s,s);}
function bw(u,x,y){return u.D.odm&&!u.form?odmBlocked(x,y):blockedW(x,y);}
function unitSpeed(u){let s=(u.FD||u.D).speed*upMul(u,'speed');if(u.rally>0)s*=1.25;if(u.ui>0)s*=1.4;if(u.D.odm&&!u.form&&u.anchor)s*=1.2;if(u.ssj)s*=1.2;if(u.buff>0)s*=1.4;if(u.D.harv&&u.load>0)s*=.85;return s;}
function followPath(u,dt){
  if(!u.path||u.pi>=u.path.length){u.moving=false;u.path=null;return true;}
  u.jt=(u.jt||0)+dt;if(u.jt>=1){const mv=hyp(u.x-(u.jx||0),u.y-(u.jy||0));u.jx=u.x;u.jy=u.y;u.jt=0;u.jam=mv<8?(u.jam||0)+1:0;
    const end=u.path[u.path.length-1];if(u.jam>=2&&hyp(end.x-u.x,end.y-u.y)<90){u.jam=0;u.moving=false;u.path=null;return true;}
    if(u.jam>=4){u.jam=0;moveTo(u,end.x+rr(-20,20),end.y+rr(-20,20));if(!u.path||!u.path.length)return true;}}
  const p=u.path[u.pi],dx=p.x-u.x,dy=p.y-u.y,d=hyp(dx,dy),sp=unitSpeed(u)*dt;
  if(d<=Math.max(sp,3)){if(u.fly||!bw(u,p.x,p.y)){u.x=p.x;u.y=p.y;}u.pi++;if(u.pi>=u.path.length){u.moving=false;u.path=null;return true;}return false;}
  const nx=u.x+dx/d*sp,ny=u.y+dy/d*sp;
  if(u.fly||!bw(u,nx,ny)){u.x=nx;u.y=ny;u.stuck=0;}
  else if(!bw(u,nx,u.y))u.x=nx;else if(!bw(u,u.x,ny))u.y=ny;
  else{u.stuck+=dt;if(u.stuck>.5){u.stuck=0;const last=u.path[u.path.length-1];moveTo(u,last.x,last.y);}}
  u.moving=true;if(u.D.veh&&!u.fly){u.trk=(u.trk||0)+sp;if(u.trk>8){u.trk=0;track(u.x,u.y,u.ang);}}if(Math.abs(dx)>1)u.face=dx<0?-1:1;u.ang=turn(u.ang,Math.atan2(dy,dx),dt*(u.D.veh?4:9));return false;}
function faceTo(u,x,y){if(Math.abs(x-u.x)>1)u.face=x<u.x?-1:1;u.tang=Math.atan2(y-u.y,x-u.x);}
function moveSafe(u,dx,dy){const nx=u.x+dx,ny=u.y+dy;if(u.fly||!bw(u,nx,ny)){u.x=clamp(nx,4,WW-4);u.y=clamp(ny,4,WH-4);}
  else if(!bw(u,nx,u.y))u.x=clamp(nx,4,WW-4);else if(!bw(u,u.x,ny))u.y=clamp(ny,4,WH-4);}
function separate(){const cell=new Map();
  for(const u of ents){if(!u.isU||u.dead)continue;const k=(tileOf(u.x)+tileOf(u.y)*MW)*2+(u.fly?1:0);let a=cell.get(k);if(!a){a=[];cell.set(k,a);}a.push(u);}
  for(const u of ents){if(!u.isU||u.dead)continue;const tx=tileOf(u.x),ty=tileOf(u.y);
    for(let oy=-1;oy<=1;oy++)for(let ox=-1;ox<=1;ox++){const a=cell.get(((tx+ox)+(ty+oy)*MW)*2+(u.fly?1:0));if(!a)continue;
      for(const v of a){if(v.id<=u.id||(u.D.harv&&v.D.harv))continue;const dx=v.x-u.x,dy=v.y-u.y,d=hyp(dx,dy),m=(u.r+v.r)*.85;
        if(d<m){if(d<.01){moveSafe(v,rr(-1,1),rr(-1,1));continue;}const push=(m-d)*.5,nx=dx/d,ny=dy/d;let wu=.5,wv=.5;
          if(u.moving&&!v.moving){wu=.25;wv=.75;}else if(v.moving&&!u.moving){wu=.75;wv=.25;}
          if(u.hs==='mine'||u.hs==='unload'){wu=.05;wv=.95;}else if(v.hs==='mine'||v.hs==='unload'){wu=.95;wv=.05;}
          moveSafe(u,-nx*push*wu*2,-ny*push*wu*2);moveSafe(v,nx*push*wv*2,ny*push*wv*2);}}}}}

// ===== Combat =====
function findTarget(src,rad,unitsOnly){let best=null,bs=1e9;
  for(const e of ents){if(e.dead||ally(e.side,src.side))continue;if(unitsOnly&&!e.isU)continue;const d=edgeDist(src,e);if(d>rad)continue;if(!visibleTo(src.side,e))continue;
    const s=d+(e.isB?160:0)+(e.D.harv?30:0)-(e.D.hero?20:0);if(s<bs){bs=s;best=e;}}return best;}
function dmgMult(u){let m=(1+.12*(u.rank||0))*upMul(u,'dmg');if(u.rally>0)m*=1.35;if(u.key==='broly')m*=1+(1-u.hp/u.max)*.8;if(u.ui>0)m*=1.5;if(u.ssj)m*=1.4;if(u.buff>0)m*=2.2;return m;}
function fire(u,t){const D=u.form?u.FD:u.D;u.atkN=(u.atkN||0)+1;if(u.D.veh)u.recoil=1;u.cd=D.rof*(u.buff>0?.7:1);u.atk=.22;faceTo(u,t.x,t.y);
  const dm=D.dmg*dmgMult(u)*(t.isB?(D.vsB||1):1)*(D.nape&&isBig(t)?1.6:1)*(D.antiBig&&isBig(t)?D.antiBig:1);
  if(D.melee){if(D.root&&t.isU&&!t.D.hero&&R()<D.root){t.freeze=Math.max(t.freeze,.9);t.path=null;}if(D.splash){splashDmg(t.x,t.y,D.splash,dm,u.side,140,1,u);shake(3);}else damage(t,dm,u.side,u);const hx=lerp(u.x,t.x,.6),hy=lerp(u.y,t.y,.6)-10;
    for(let k=0;k<5;k++)part('spark',hx,hy,rr(-120,120),rr(-120,60),.25,2,'#fff6c0');
    if(D.hero){part('flash',hx,hy,0,0,.15,26,u.D.ab?u.D.ab.col:'#fff');part('ring',hx,hy,0,0,.25,18,'#ffffff');}
    sfx('punch',u.x,u.y);}
  else{let col=D.pcol||'#9fe6ff';if(D.proj==='quirk')col=STUDENT[u.v].q;else if(u.ssj)col='#ffe46a';else if(u.fac==='dbz'&&u.key==='vegeta')col='#c6a4ff';else if(u.key==='piccolo')col='#ffef7a';
    spawnProj(u,t,dm,D.proj,col,D.splash);if(plSees(u))part('flash',u.x+(u.D.veh?Math.cos(u.tang||u.ang)*16:u.face*9),u.y-(u.z||0)-(u.D.veh?2:13),0,0,.08,u.D.veh?18:9,u.D.veh?'#ffd890':col);sfx({shell:'cannon',missile:'missile',bullet:'mg',explo:'explo',fire:'flame',quirk:'zap'}[D.proj]||'ki',u.x,u.y);}}
function spawnProj(src,t,dmg,kind,col,splash,tx,ty){const fz=src.isB?24:(src.z||0)+12;
  const p={x:src.x+(src.isU?src.face*7:0),y:src.y,z:fz,t,tx:t?t.x:tx,ty:t?t.y:ty,dmg,kind,col:col||'#fff',splash:splash||0,side:src.side,src,spd:PSPD[kind]||420,age:0};
  projs.push(p);return p;}
function updProj(p,dt){p.age+=dt;if(p.t&&!p.t.dead){p.tx=p.t.x;p.ty=p.t.y;}
  const dx=p.tx-p.x,dy=p.ty-p.y,d=hyp(dx,dy),s=p.spd*dt*(p.kind==='missile'?Math.min(1.6,.6+p.age*2):1);
  const tz=p.t?(p.t.isB?18:(p.t.z||0)+9):0;p.z+=(tz-p.z)*Math.min(1,s/Math.max(d,1));
  if(d<=s+3){impact(p);p.dead=true;return;}
  p.x+=dx/d*s;p.y+=dy/d*s;
  if(p.kind==='missile'&&R()<.8)part('smoke',p.x,p.y-p.z,rr(-6,6),rr(-12,-2),.6,rr(3,5));
  else if(p.kind==='fire')part('fire',p.x+rr(-3,3),p.y-p.z+rr(-3,3),rr(-10,10),rr(-20,0),.3,rr(4,7));
  else if(p.kind==='bigball'&&R()<.9)part('fire',p.x+rr(-8,8),p.y-p.z+rr(-8,8),rr(-20,20),rr(-20,20),.35,rr(8,12),p.col);
  if(p.age>4)p.dead=true;}
function impact(p){const x=p.tx,y=p.ty;
  if(p.kind==='spearb'){doBlast(x,y,p.ab.rad,p.ab.dmg,p.src,p.ab.col,0);return;}
  if(p.kind==='bigball'){doBlast(x,y,p.ab.rad,p.ab.dmg,p.src,p.ab.col,p.ab.knock||0);return;}
  const ps=p.src&&!p.src.dead?p.src:null;if(p.splash)splashDmg(x,y,p.splash,p.dmg,p.side,0,1,ps);else if(p.t&&!p.t.dead)damage(p.t,p.dmg,p.side,ps);
  const hz=p.t&&!p.t.dead?(p.t.isB?14:(p.t.z||0)+8):4,hy=y-hz;
  switch(p.kind){
    case'shell':case'missile':case'explo':fxBoom(x,y,p.kind==='explo'?16:22,p.kind==='explo'?'#ffb040':'#ffcf6a');sfx('boom-s',x,y);break;
    case'fire':for(let k=0;k<6;k++)part('fire',x+rr(-6,6),hy+rr(-6,6),rr(-30,30),rr(-40,0),.45,rr(5,9));break;
    default:part('flash',x,hy,0,0,.14,18,p.col);for(let k=0;k<5;k++)part('spark',x,hy,rr(-140,140),rr(-140,80),.3,2,p.col);}}
function damage(t,amt,srcSide,src){if(t.dead)return;if(t.ui>0&&R()<.6){if(R()<.3)part('spark',t.x+rr(-10,10),t.y-20,rr(-60,60),-30,.3,1.5,'#dfe8ff');return;}if(t.harden>0)amt*=.1;if(t.form&&FORMS[t.form].armor)amt*=FORMS[t.form].armor;if(t.shield>0){const a=Math.min(t.shield,amt);t.shield-=a;amt-=a;if(t.shield<=0&&t.form)endShift(t);}if(t.side===PL||srcSide===PL)G.combat=gtime;if(t.freeze>0&&t.isU)amt*=.7;t.hp-=amt;t.hitFl=.1;
  if(t.side===PL&&srcSide!==PL)underAttack(t);if(t.hp<=0)kill(t,srcSide,src);}
function splashDmg(x,y,r,dmg,side,knock,vsB,src){for(const e of ents){if(e.dead||ally(e.side,side))continue;
  const d=e.isB?edgeDist({x,y,r:0,isB:false},e):hyp(e.x-x,e.y-y)-e.r;if(d>r)continue;const f=1-.5*clamp(d,0,r)/r;
  damage(e,dmg*f*(e.isB?(vsB||1):1),side,src);
  if(knock&&e.isU&&!e.dead){const dx=e.x-x,dy=e.y-y,l=hyp(dx,dy)||1,k=knock*(e.D.veh?.35:e.D.hero?.6:1)*f;e.kx+=dx/l*k;e.ky+=dy/l*k;e.path=null;}}}
function kill(t,srcSide,src){if(t.dead)return;if(t.D.bounty&&srcSide!==undefined&&isPl(srcSide)){sides[srcSide].credits+=t.D.bounty;if(srcSide===PL)msg(t.D.name+' abattu : +'+t.D.bounty,'#ffd23a');}
  if(t.D.boom){const bx=t.x,by=t.y;setTimeoutG(()=>{splashDmg(bx,by,44,55,2,120,1,null);fxBoom(bx,by,34,'#9aff6a');},.05);}if(src&&src.isU&&!src.dead&&!ally(src.side,t.side))giveXP(src,t.D.cost||(t.isB?600:100));if(t.isU)dropBalls(t);if(t.isU&&t.D.hero&&t.key!=='vegito'&&t.side<2){const ss=sides[t.side];ss.fallen=ss.fallen||[];if(!ss.fallen.includes(t.key))ss.fallen.push(t.key);}
  if(srcSide!==undefined&&srcSide!==t.side)sides[srcSide].st.kills++;sides[t.side].st.lost++;
  if(t.isB){removeBuilding(t);const cx=t.x,cy=t.y,s=t.w*TILE;fxBoom(cx,cy,s*.7,'#ffb040');
    for(let k=0;k<t.w*t.h;k++)setTimeoutG(()=>fxBoom(t.tx*TILE+R()*t.w*TILE,t.ty*TILE+R()*t.h*TILE,rr(16,30),'#ffcf6a'),R()*.8);
    rubble(t);shake(t.w*4);sfx('boom',cx,cy);if(t.side===PL)msg(t.D.names[t.fac]+' détruit !','#ff4d5e');
    for(const s of sides)for(const k in s.primary)if(s.primary[k]===t)delete s.primary[k];}
  else{t.dead=true;releaseClaim(t);
    if(t.D.veh){fxBoom(t.x,t.y,26,'#ffb040');if(t.fly){scorch(t.x,t.y,16);}else wreck(t.x,t.y,t.ang,t.r);for(let k=0;k<6;k++)setTimeoutG(()=>part('smoke',t.x+rr(-6,6),t.y-4,rr(-5,5),-20,2.2,rr(6,10)),k*.6);sfx('boom',t.x,t.y);for(let k=0;k<8;k++)part('debris',t.x,t.y,rr(-90,90),rr(-90,90),1,3,'#3a3a3a',rr(60,160));}
    else{part('flash',t.x,t.y-10-t.z,0,0,.2,t.D.hero?50:22,t.D.hero?'#ffffff':'#ffcf9a');for(let k=0;k<(t.D.hero?24:8);k++)part('spark',t.x,t.y-10-t.z,rr(-150,150),rr(-150,100),.5,2,FAC[t.fac].col);
      if(!t.fly)corpses.push({x:t.x,y:t.y,L:unitLook(t),dir:t.face,t:0,sc:t.D.hero?1.15:1});else part('ghost',t.x,t.y-t.z,0,-18,.9,1,null,0,t);if(t.D.hero){fxRing(t.x,t.y,'#ffffff',70);shake(6);}sfx('ko',t.x,t.y);}
    if(t.D.hero&&plSees(t))msg(t.D.name+' est K.O. !',t.side===PL?'#ff4d5e':'#ffc53d');}
  if(G.abilitySel===t)G.abilitySel=null;}
let timers=[];function setTimeoutG(fn,d){timers.push({fn,t:d});}
function underAttack(t){if(gtime-G.lastAlert<14)return;G.lastAlert=gtime;G.alertPos={x:t.x,y:t.y};G.pings.push({x:t.x,y:t.y,t:2});
  msg(t.isB?'Notre base est attaquée ! (Espace pour y aller)':(t.D.hero?t.D.name+' est attaqué !':'Nos unités sont attaquées'),'#ff4d5e');sfx('alert');announce(t.isB?'Notre base est attaquée':'Nos unités sont attaquées');}

// ===== Abilities =====
function startCast(u,o){const ab=u.D.ab;u.casting={t:ab.type==='beam'?1.1:ab.type==='rage'?.5:.6,T:ab.type==='beam'?1.1:.6,x:o.x,y:o.y};u.abCd=ab.cd;u.path=null;u.moving=false;
  faceTo(u,o.x,o.y);if(plSees(u))cutin(u);sfx(ab.type==='beam'?'charge':'charge-s',u.x,u.y);}
function segDist(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,l2=dx*dx+dy*dy||1,t=clamp(((px-x1)*dx+(py-y1)*dy)/l2,0,1);return hyp(px-(x1+dx*t),py-(y1+dy*t));}
function execAbility(u,c){const ab=u.D.ab;let dx=c.x-u.x,dy=c.y-u.y;const L=hyp(dx,dy)||1;dx/=L;dy/=L;if(L<2){dx=u.face;dy=0;}
  if(execAbility3(u,c,ab,dx,dy,L))return;if(execAbility2(u,c,ab,dx,dy,L))return;
  switch(ab.type){
  case'beam':{const hz=(u.z||0)+14,x1=u.x+dx*10,y1=u.y+dy*10,x2=u.x+dx*ab.len,y2=u.y+dy*ab.len;
    fxs.push({type:'beam',x1,y1,x2,y2,z:hz,w:ab.w,col:ab.col,t:0,dur:1.15,spiral:ab.spiral});
    for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const d=segDist(e.x,e.y,x1,y1,x2,y2)-(e.isB?e.w*14:e.r);if(d<ab.w/2+4)damage(e,ab.dmg*dmgMult(u)*(e.isB?.7:1),u.side,u);}
    fxBoom(x2,y2,46,ab.col);scorchLine(x1,y1,x2,y2,ab.w*.6);shake(9);sfx('beam',u.x,u.y);break;}
  case'blast':{const p=spawnProj(u,null,0,'bigball',ab.col,0,c.x,c.y);p.ab={...ab,dmg:ab.dmg*dmgMult(u)};p.z=(u.z||0)+16;sfx('ki',u.x,u.y);break;}
  case'dash_blast':{let tx=c.x,ty=c.y;const dd=hyp(tx-u.x,ty-u.y);if(dd>ab.range){tx=u.x+dx*ab.range;ty=u.y+dy*ab.range;}
    if(!u.fly&&bw(u,tx,ty)){const n=nearestFree(tileOf(tx),tileOf(ty),5,tileOf(u.x),tileOf(u.y));if(n){tx=n[0]*TILE+16;ty=n[1]*TILE+16;}else{tx=u.x;ty=u.y;}}
    u.dash={sx:u.x,sy:u.y,tx,ty,t:0,T:.38};sfx('whoosh',u.x,u.y);break;}
  case'cone':{const cx=u.x,cy=u.y;for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const ex=e.x-cx,ey=e.y-cy,d=hyp(ex,ey)-(e.isB?e.w*14:e.r);if(d>ab.len)continue;
      const a=Math.acos(clamp((ex*dx+ey*dy)/(hyp(ex,ey)||1),-1,1));if(a>ab.ang&&d>20)continue;damage(e,ab.dmg*dmgMult(u)*(e.isB?.6:1),u.side,u);
      if(e.isU&&!e.dead){const k=ab.knock*(e.D.veh?.35:e.D.hero?.6:1);e.kx+=dx*k;e.ky+=dy*k;e.path=null;}}
    for(let k=0;k<6;k++)fxs.push({type:'arc',x:cx,y:cy,a:Math.atan2(dy,dx),r:20+k*14,t:-k*.05,dur:.55,col:ab.col,spread:ab.ang});
    for(let k=0;k<40;k++){const a=Math.atan2(dy,dx)+rr(-ab.ang,ab.ang),s=rr(150,420);part('dust',cx,cy,Math.cos(a)*s,Math.sin(a)*s,1,rr(8,16));}
    part('flash',cx+dx*30,cy+dy*30-12,0,0,.25,70,ab.col);shake(10);sfx('smash',cx,cy);break;}
  case'ice':{const x1=u.x,y1=u.y,x2=u.x+dx*ab.len,y2=u.y+dy*ab.len;
    for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const d=segDist(e.x,e.y,x1,y1,x2,y2)-(e.isB?e.w*14:e.r);if(d<ab.w/2){damage(e,ab.dmg*dmgMult(u)*(e.isB?.6:1),u.side,u);
      if(e.isU&&!e.dead){e.freeze=ab.freeze*(e.D.hero?.5:1);e.path=null;}}}
    const n=Math.floor(ab.len/12);for(let k=1;k<=n;k++){const t=k/n,px=lerp(x1,x2,t),py=lerp(y1,y2,t);
      for(let j=0;j<2;j++)fxs.push({type:'ice',x:px+rr(-ab.w*.4,ab.w*.4),y:py+rr(-ab.w*.3,ab.w*.3),s:rr(8,18)*(1-t*.3),rot:rr(-.5,.5),t:-t*.35,dur:4.2});}
    shake(7);sfx('ice',u.x,u.y);break;}
  case'disc':{fxs.push({type:'disc',x:u.x+dx*12,y:u.y+dy*12,z:(u.z||0)+16,dx,dy,d:0,len:ab.len,hit:new Set(),dmg:ab.dmg*dmgMult(u),side:u.side,src:u,t:0,dur:9});sfx('disc',u.x,u.y);break;}
  case'lift':{for(const e of ents){if(e.dead||ally(e.side,u.side)||!e.isU)continue;if(hyp(e.x-c.x,e.y-c.y)>ab.rad+e.r)continue;
      e.lift=ab.dur*(e.D.hero?.6:1);e.liftDmg=ab.dmg*dmgMult(u);e.liftSrc=u;e.path=null;}
    part('flash',c.x,c.y-20,0,0,.4,ab.rad*1.4,ab.col);fxRing(c.x,c.y,ab.col,ab.rad);for(let k=0;k<24;k++)part('spark',c.x+rr(-ab.rad,ab.rad)*.7,c.y+rr(-ab.rad,ab.rad)*.5,0,rr(-80,-30),.9,2,ab.col);sfx('lift',c.x,c.y);break;}
  case'shift':startShift(u);if(u.side===PL)msg(u.D.name+' se transforme !',FAC[u.fac].col);break;
  case'phase':case'slash':{let tx=c.x,ty=c.y;if(L>ab.range){tx=u.x+dx*ab.range;ty=u.y+dy*ab.range;}if(bw(u,tx,ty)){const n=nearestFree(tileOf(tx),tileOf(ty),5);if(n){tx=n[0]*TILE+16;ty=n[1]*TILE+16;}}
    for(const e of ents){if(e.dead||ally(e.side,u.side))continue;const dd=segDist(e.x,e.y,u.x,u.y,tx,ty)-(e.isB?e.w*14:e.r);if(dd<ab.w/2)damage(e,ab.dmg*dmgMult(u)*(isBig(e)?2:1)*(e.isB?.5:1),u.side,u);}
    fxs.push({type:'slash',x1:u.x,y1:u.y,x2:tx,y2:ty,t:0,dur:.45,col:ab.col});u.dash={sx:u.x,sy:u.y,tx,ty,t:0,T:.22,noBlast:true};sfx('whoosh',u.x,u.y);break;}
  case'barrage':{for(let i=0;i<ab.n;i++){const px=c.x+rr(-ab.rad,ab.rad)*.9,py=c.y+rr(-ab.rad,ab.rad)*.6;setTimeoutG(()=>{if(u.dead)return;const p=spawnProj(u,null,0,'spearb','#ffb040',0,px,py);p.ab={rad:ab.rad,dmg:ab.dmg*dmgMult(u),col:'#ffb040'};sfx('missile',u.x,u.y);},i*.13);}break;}
  case'rage':{u.buff=ab.dur;u.hp=Math.min(u.max,u.hp+u.max*.4);fxRing(u.x,u.y,ab.col,90);part('flash',u.x,u.y-14,0,0,.3,80,ab.col);
    for(let k=0;k<8;k++)part('bolt',u.x+rr(-20,20),u.y-rr(0,30),0,0,.3,20,'#cfe8ff');shake(6);sfx('transform',u.x,u.y);break;}
  }}
function updDash(u,dt){const d=u.dash;d.t+=dt;const p=Math.min(1,d.t/d.T);u.x=lerp(d.sx,d.tx,p);u.y=lerp(d.sy,d.ty,p);u.z=(u.fly?16:0)+Math.sin(p*PI)*46;
  faceTo(u,d.tx,d.ty);part('line',u.x,u.y-u.z-10,0,0,.25,1,(d.ab||u.D.ab).col,0,{dx:d.tx-d.sx,dy:d.ty-d.sy});
  if(p>=1){const nb=d.noBlast;u.dash=null;u.z=u.fly?16:0;const ab=d.ab||u.D.ab;if(!nb)doBlast(u.x,u.y,ab.rad,ab.dmg*dmgMult(u),u,ab.col,ab.knock||0);}}
function doBlast(x,y,rad,dmg,src,col,knock){splashDmg(x,y,rad,dmg,src.side,knock,.8,src.dead?null:src);fxBoom(x,y,rad,col,true);scorch(x,y,rad*.8,.6);shake(Math.min(16,rad/7));sfx('big',x,y);}
function transformFx(u){fxRing(u.x,u.y,'#ffe14d',80);part('flash',u.x,u.y-14,0,0,.35,90,'#ffe14d');for(let k=0;k<6;k++)part('bolt',u.x+rr(-18,18),u.y-rr(0,30),0,0,.35,22,'#fff6a0');
  if(plSees(u)){cutin(u,'SUPER SAIYAN !!');}sfx('transform',u.x,u.y);}

// ===== Unit update =====
function updUnit(u,dt){updMotion(u,dt);updForms(u,dt);updPassives(u,dt);updPassives2(u,dt);const D=u.form?u.FD:u.D;
  if(u.D.odm&&!u.form){u.ancT=(u.ancT||0)-dt;if(u.ancT<=0){u.ancT=.4;u.anchor=odmAnchor(u);}u.z=lerp(u.z||0,(u.anchor&&u.moving)?(blockedW(u.x,u.y)?18:8):0,Math.min(1,dt*5));if(u.anchor&&u.moving&&R()<dt*6)part('smoke',u.x-Math.cos(u.ang)*6,u.y-(u.z||0)-10,0,-6,.6,3);}
  if(u.D.hero&&u.hp<u.max*.25&&!u.dead){const s=sides[u.side];if(s.fac==='dbz'&&s.senzu>0){s.senzu--;u.hp=u.max;fxRing(u.x,u.y,'#7dff9a',50);part('flash',u.x,u.y-16,0,0,.4,60,'#7dff9a');if(u.side===PL)msg('Senzu ! '+u.D.name+' est entièrement soigné','#7dff9a');sfx('heal',u.x,u.y);}
    else if(s.fac==='mha'&&!(u.puT>0)){u.puT=45;u.buff=8;fxRing(u.x,u.y,'#ffd23a',70);if(plSees(u))cutin(u,'PLUS ULTRA !!');sfx('transform',u.x,u.y);}}
  if(u.puT>0)u.puT-=dt;u.anim+=dt;if(u.atk>0)u.atk-=dt;if(u.hitFl>0)u.hitFl-=dt;if(u.cd>0)u.cd-=dt;if(u.abCd>0)u.abCd-=dt;if(u.buff>0)u.buff-=dt;
  if(D.regen&&u.hp<u.max)u.hp=Math.min(u.max,u.hp+D.regen*dt);
  
  if(u.kx||u.ky){moveSafe(u,u.kx*dt,u.ky*dt);const f=Math.pow(.015,dt);u.kx*=f;u.ky*=f;if(Math.abs(u.kx)+Math.abs(u.ky)<8){u.kx=u.ky=0;}
    if(R()<.5&&!u.fly)part('dust',u.x,u.y,rr(-10,10),rr(-10,10),.6,rr(5,9));}
  if(u.lift>0){u.lift-=dt;const base=u.fly?16:0;u.z=lerp(u.z,base+38,Math.min(1,dt*3));u.moving=false;
    if(u.lift<=0){u.lift=0;u.z=base;const s=u.liftSrc;damage(u,u.liftDmg,s?s.side:1-u.side,s&&!s.dead?s:null);if(!u.dead){for(let k=0;k<10;k++)part('dust',u.x,u.y,rr(-60,60),rr(-40,20),.8,rr(6,10));shake(2);}}
    return;}
  if(u.freeze>0){u.freeze-=dt;u.moving=false;return;}
  if(u.dash){updDash(u,dt);return;}
  if(u.casting){u.casting.t-=dt;u.moving=false;if(u.casting.t<=0){const c=u.casting;u.casting=null;execAbility(u,c);}return;}
  if(D.heal){u.ht-=dt;if(u.ht<=0){u.ht=1;let best=null,bf=1;
      for(const e of ents){if(e.dead||!e.isU||!ally(e.side,u.side)||e.D.veh||e.hp>=e.max)continue;if(hyp(e.x-u.x,e.y-u.y)>D.range)continue;const f=e.hp/e.max;if(f<bf){bf=f;best=e;}}
      if(best){best.hp=Math.min(best.max,best.hp+D.heal*(1+.2*u.rank)*upMul(u,'heal'));u.atk=.3;faceTo(u,best.x,best.y);fxs.push({type:'heal',x1:u.x,y1:u.y-14,t2:best,t:0,dur:.5});
        for(let k=0;k<4;k++)part('spark',best.x+rr(-6,6),best.y-(best.z||0)-rr(4,20),0,-40,.6,2,'#7dffa0');giveXP(u,8);if(plSees(u))sfx('heal',u.x,u.y);}}}
  if(D.harv){updHarv(u,dt);return;}
  let o=u.order;
  if(u.target&&(u.target.dead||!visibleTo(u.side,u.target)))u.target=null;
  if(o&&o.type==='ability'){const d=hyp(o.x-u.x,o.y-u.y);if(d<=(o.slot===2&&u.D.ab2?u.D.ab2:D.ab).range){u.order=null;u.path=null;startCast(u,o);return;}
    u.repT-=dt;if(!u.path||u.repT<=0){u.repT=1;moveTo(u,o.x,o.y);}followPath(u,dt);return;}
  if(o&&o.type==='attack'){if(o.target.dead||!visibleTo(u.side,o.target)){u.order=null;o=null;u.gx=u.x;u.gy=u.y;}else u.target=o.target;}
  if(!u.target&&D.dmg&&(!o||o.type==='amove')){u.scanT-=dt;if(u.scanT<=0){u.scanT=.35+R()*.1;u.target=findTarget(u,o?D.sightPx:Math.max(D.range+70,D.sightPx*.8));}}
  if(u.target&&(!o||o.type!=='move')){const t=u.target,d=edgeDist(u,t);
    if(d<=D.range){u.path=null;u.moving=false;faceTo(u,t.x,t.y);if(u.cd<=0)fire(u,t);return;}
    if(!o&&hyp(u.x-u.gx,u.y-u.gy)>D.sightPx*1.5){u.target=null;u.order={type:'move',x:u.gx,y:u.gy};moveTo(u,u.gx,u.gy);return;}
    u.repT-=dt;const end=u.path&&u.path.length?u.path[u.path.length-1]:null;
    if(!u.path||u.repT<=0||(end&&hyp(end.x-t.x,end.y-t.y)>80)){u.repT=.7+R()*.4;moveTo(u,t.x,t.y);}
    followPath(u,dt);return;}
  if(o&&(o.type==='move'||o.type==='amove')){if(followPath(u,dt)){u.order=null;u.gx=u.x;u.gy=u.y;}return;}
  u.moving=false;}

// ===== Harvesters =====
const CAP=500;
function dock(b){return{x:(b.tx+1.5)*TILE,y:(b.ty+b.h)*TILE+14};}
function releaseClaim(u){if(u.ot>=0){oreClaim[u.ot]=Math.max(0,oreClaim[u.ot]-1);u.ot=-1;}}
function findOreFor(u,hx,hy){let best=-1,bs=1e9;for(const i of oreCells){if(ore[i]<=0)continue;const x=(i%MW+.5)*TILE,y=((i/MW|0)+.5)*TILE;
  let s=hyp(x-u.x,y-u.y)+oreClaim[i]*300;if(hx!==undefined)s+=hyp(x-hx,y-hy)*1.5;if(s<bs){bs=s;best=i;}}return best;}
function updHarv(u,dt){const o=u.order;
  if(o&&o.type==='move'){if(followPath(u,dt)){u.order=null;u.hs='seek';u.ht=.5;u.hx=u.x;u.hy=u.y;}return;}
  u.ht-=dt;
  switch(u.hs){
  case'seek':{if(u.load>=CAP){u.hs='ret';break;}if(u.ht>0)break;releaseClaim(u);const i=findOreFor(u,u.hx,u.hy);u.hx=undefined;
    if(i<0){u.ht=2;if(u.load>0)u.hs='ret';break;}u.ot=i;oreClaim[i]++;moveTo(u,(i%MW+.5)*TILE,((i/MW|0)+.5)*TILE);u.hs='go';break;}
  case'go':{if(ore[u.ot]<=0){u.hs='seek';break;}if(followPath(u,dt)){const tx=(u.ot%MW+.5)*TILE,ty=((u.ot/MW|0)+.5)*TILE;
    if(hyp(tx-u.x,ty-u.y)<26){u.hs='mine';u.ht=.35;u.mx=tx;u.my=ty;}else{u.hs='seek';u.ht=.6;}}break;}
  case'mine':{u.moving=false;if(u.ht<=0){u.ht=.35;const take=Math.min(20,ore[u.ot],CAP-u.load);ore[u.ot]-=take;u.load+=take;u.anim+=.1;
      if(R()<.6&&plSees(u))part('spark',u.x+rr(-8,8),u.y+rr(-4,4),rr(-30,30),rr(-60,-20),.4,2,'#ffd34a');
      if(u.load>=CAP){releaseClaim(u);u.hs='ret';}else if(ore[u.ot]<=0){ore[u.ot]=0;releaseClaim(u);u.hx=u.x;u.hy=u.y;u.hs='seek';}}break;}
  case'ret':{releaseClaim(u);const rs=myB(u.side,'refinery').filter(b=>b.rise>=1);if(!rs.length){u.ht=2;u.hs='wait';break;}
    let b=rs[0],bd=1e9;for(const r of rs){const d=hyp(r.x-u.x,r.y-u.y);if(d<bd){bd=d;b=r;}}u.ref=b;const p=dock(b);moveTo(u,p.x,p.y);u.hs='retgo';break;}
  case'wait':if(u.ht<=0)u.hs=u.load>0?'ret':'seek';break;
  case'retgo':{if(!u.ref||u.ref.dead){u.hs='ret';break;}const p=dock(u.ref);const arrived=followPath(u,dt);
    if(hyp(p.x-u.x,p.y-u.y)<34){u.hs='unload';u.ht=.15;u.path=null;}else if(arrived){u.hs='wait';u.ht=1;}break;}
  case'unload':{u.moving=false;if(!u.ref||u.ref.dead){u.hs='ret';break;}u.ang=turn(u.ang,-PI/2,dt*4);
    if(u.ht<=0){u.ht=.15;const t=Math.min(50,u.load);u.load-=t;const s=sides[u.side],g=s.fac==='sl'?0:Math.round(t*s.mult*(1+.25*(((u.ref)&&(u.ref).lvl||1)-1)));s.credits+=g;s.st.harv+=g;
      if(u.load<=0){u.load=0;u.hs='seek';u.ht=0;u.hx=u.mx;u.hy=u.my;if(u.side===PL)sfx('coin');}}break;}
  }}

// ===== Buildings =====
function updBuilding(b,dt){updSpecialB(b,dt);b.anim+=dt;updBuildAnim(b,dt);
  if(b.hitFl>0)b.hitFl-=dt;const D=b.D;
  if(b.repairing&&b.rise>=1){const s=sides[b.side];if(b.hp>=b.max||s.credits<1)b.repairing=false;else{const amt=Math.min(b.max-b.hp,50*dt),cost=amt*.3;
    if(s.credits>=cost){s.credits-=cost;b.hp+=amt;if(R()<dt*8&&plSees(b))part('spark',b.tx*TILE+R()*b.w*TILE,b.ty*TILE+R()*b.h*TILE-10,rr(-30,30),rr(-60,-20),.5,2,'#7dffa0');}}}
  if(D.wpn&&b.rise>=1){const s=sides[b.side];b.cd-=dt*(s.use>s.pow?.5:1);
    if(b.target&&(b.target.dead||edgeDist(b,b.target)>D.wpn.range*(1+.1*(((b)&&(b).lvl||1)-1))))b.target=null;
    if(!b.target){b.scanT-=dt;if(b.scanT<=0){b.scanT=.4;b.target=findTarget(b,D.wpn.range*(1+.1*(((b)&&(b).lvl||1)-1)),true);}}
    if(b.target){const ta=Math.atan2(b.target.y-b.y,b.target.x-b.x);b.tang=turn(b.tang,ta,dt*5);
      if(b.cd<=0&&Math.abs(((ta-b.tang+PI*3)%PI2)-PI)<.3){b.cd=D.wpn.rof;spawnProj(b,b.target,D.wpn.dmg*(1+.35*(((b)&&(b).lvl||1)-1)),'turret',({dbz:'#ffb84a',mha:'#9dff6a',aot:'#ffe0a0',sds:'#ffd890',sl:'#b06aff',opm:'#ff5a3a',hxh:'#5affd8'})[b.fac],0);sfx('ki',b.x,b.y);}}}
  if(b.hp<b.max*.5&&plSees(b)){b.smT-=dt;if(b.smT<=0){b.smT=b.hp<b.max*.25?.08:.22;const x=b.tx*TILE+R()*b.w*TILE,y=b.ty*TILE+R()*b.h*TILE-12;
    part('smoke',x,y,rr(-6,6),rr(-30,-14),2,rr(6,10));if(b.hp<b.max*.25)part('fire',x,y+4,rr(-8,8),rr(-40,-20),.5,rr(5,9));}}}

// ===== Fog of war =====
const fogC=document.createElement('canvas');fogC.width=MW;fogC.height=MH;const fogX=fogC.getContext('2d');let fogImg=fogX.createImageData(MW,MH);
function mapBuffers(){if(vis.length!==NT){vis=new Uint8Array(NT);expl=new Uint8Array(NT);}fogC.width=MW;fogC.height=MH;fogImg=fogX.createImageData(MW,MH);}
function updFog(){vis.fill(0);
  for(const e of ents){if(e.dead||!ally(e.side,PL))continue;const s=(e.D.sight||5)*(G.eclipse>0?.55:1)*(e.isB?((e.lvl||1)>=2?(e.key==='radar'?1.8:e.key==='outpost'?2:1.25):1):1),cx=e.isB?e.tx+e.w/2:e.x/TILE,cy=e.isB?e.ty+e.h/2:e.y/TILE;
    for(let y=Math.max(0,Math.floor(cy-s));y<=Math.min(MH-1,cy+s);y++)for(let x=Math.max(0,Math.floor(cx-s));x<=Math.min(MW-1,cx+s);x++){const dx=x+.5-cx,dy=y+.5-cy;if(dx*dx+dy*dy<=s*s)vis[ti(x,y)]=1;}}
  const d=fogImg.data;for(let i=0;i<NT;i++){if(vis[i])expl[i]=1;d[i*4]=5;d[i*4+1]=7;d[i*4+2]=11;d[i*4+3]=vis[i]?0:expl[i]?125:250;}
  fogX.putImageData(fogImg,0,0);
  for(const e of ents)if(e.isB&&!e.dead&&!ally(e.side,PL)&&!e.seen){for(let y=e.ty;y<e.ty+e.h&&!e.seen;y++)for(let x=e.tx;x<e.tx+e.w;x++)if(vis[ti(x,y)]){e.seen=true;break;}}}

// ===== AI =====
const AI_ORDER=['power','refinery','barracks','power','factory','refinery','turret','power','temple','turret','lab','power','temple2','radar','barracks','def2','power','turret','factory','training','def2','power','temple','market','hospital','power','unique','market','power'];
function aiInit(si,d){return{si,t:0,wave:d.wave0,attacking:false,d,lastWave:0,front:null};}
function findSpot(si,key){const h2=myB(si,'hq2');const hq=(h2.length&&R()<.45&&key!=='turret'?pick(h2):null)||myB(si,'hq')[0]||myB(si)[0];if(!hq)return null;const D=BDEF[key],cx=hq.tx+1,cy=hq.ty+1;
  const enemy=enemyBase(si),fx=cx+(enemy.x-cx)*.12,fy=cy+(enemy.y-cy)*.12;let best=null,bs=1e9;
  for(let y=cy-14;y<=cy+14;y++)for(let x=cx-14;x<=cx+14;x++){if(!canPlace(si,key,x,y,true))continue;
    let s=hyp(x-cx,y-cy);if(key==='turret'||key==='wall')s=hyp(x-fx,y-fy)*1.5+R()*3;
    else if(key==='refinery'||key==='drill'){let od=1e9;for(const i of oreCells)if(ore[i]>0)od=Math.min(od,hyp(i%MW-x-1,(i/MW|0)-y-1));s=s*.4+od;}
    s+=R()*1.5;if(s<bs){bs=s;best={x,y};}}return best;}
function aiUpdate(ai,dt){ai.t-=dt;if(ai.t>0)return;ai.t=ai.d.think||.5;const si=ai.si,s=sides[si],fac=s.fac;
  const bs=myB(si),hq=bs.find(b=>b.key==='hq');
  if(hq){if(!s.prodB){let key=null;const cnt={};for(const k of AI_ORDER){cnt[k]=(cnt[k]||0)+1;if(myB(si,k).length<cnt[k]){key=k;break;}}
      if(s.use>s.pow-10&&s.pow<1200)key='power';
      if(!key&&s.credits>2600&&myB(si,'turret').length<10)key=R()<.6?'turret':'power';
      if(key&&reqOk(si,BDEF[key].req)&&s.credits>=BDEF[key].cost)startBuild(si,key);}
    else if(s.prodB.ready){const sp=findSpot(si,s.prodB.key);if(sp)placeBuilding(si,s.prodB.key,sp.x,sp.y);else cancelBuild(si);}}
  const units=ents.filter(e=>e.isU&&!e.dead&&e.side===si),harvs=units.filter(u=>u.D.harv),army=units.filter(u=>!u.D.harv);
  const nref=myB(si,'refinery').length,reserve=(s.prodB?0:Math.max(300,Math.min(3000,aiNextCost(si)+100)))+aiHeroReserve(si);
  if(has(si,'factory')&&harvs.length<Math.min(nref*2,5)&&!s.q.factory.some(i=>i.key==='harv'))queueUnit(si,'harv');
  if(has(si,'barracks')&&s.q.barracks.length<2&&s.credits>reserve+100)queueUnit(si,s.credits>700?pick(['inf2','inf2','inf3','inf4']):pick(['inf1','inf1','inf3']));
  if(has(si,'factory')&&s.q.factory.length<1&&s.credits>reserve+800)queueUnit(si,has(si,'factory+')&&R()<.35&&s.credits>reserve+1400?'mech':'tank');
  if(has(si,'barracks')&&army.length>6&&R()<.15&&s.credits>reserve+400&&army.filter(u=>u.D.heal).length<army.length/6)queueUnit(si,'healer');
  if(has(si,'factory')&&R()<.08&&s.credits>reserve+700&&army.filter(u=>u.key==='jet').length<3)queueUnit(si,'jet');
  for(const b of bs)if(b.hp<b.max*.7&&s.credits>500&&b.rise>=1)b.repairing=true;
  if(has(si,'lab')&&!s.res&&s.credits>1500){const up=UPG[fac].find(x=>!s.ups.includes(x.id));if(up)startResearch(si,up.id);}
  if(fac==='aot'&&hq&&!s.prodB&&s.credits>900&&has(si,'barracks')&&myB(si,'wall').length<10&&R()<.3)startBuild(si,'wall');
  if(s.sp>=SUPER[fac].charge&&has(si,'temple+')&&!(ai.d.noSuper&&gtime<900)){let best=null,bn=0;for(const e of ents){if(e.dead||ally(e.side,si))continue;let n=0;
      for(const f of ents)if(!f.dead&&foe(f.side,si)&&hyp(f.x-e.x,f.y-e.y)<SUPER[fac].rad)n+=f.isB?2.5:f.D.hero?2:1;if(n>bn){bn=n;best=e;}}
    if(best&&bn>=4)launchSuper(si,best.x+rr(-20,20),best.y+rr(-20,20));}
  ai.dbT=(ai.dbT||0)-.5;if(ai.dbT<=0&&(dballs.length||pickups.length)&&gtime>75){ai.dbT=12;const free=[...dballs.filter(b=>!b.carrier),...pickups].filter(b=>aiKnows(si,b));if(army.some(u=>u.hunt&&!u.hunt.carrier&&(dballs.includes(u.hunt)||pickups.includes(u.hunt))&&!u.dead))free.length=0;
    for(const b of free){if(dballs.some(o=>o!==b&&o.hunter&&o.hunter.side===si&&!o.hunter.dead&&o.hunter.hunt===b))continue;
      let hu=null,hd=1e9;for(const u of army){if(u.D.heal||u.hunt&&!u.hunt.carrier&&(dballs.includes(u.hunt)||pickups.includes(u.hunt))||u.order&&u.order.wave)continue;const d=hyp(u.x-b.x,u.y-b.y)/(u.D.speed||60);if(d<hd){hd=d;hu=u;}}
      if(hu&&hd<90){hu.hunt=b;orderMove(hu,b.x,b.y,false);break;}}}
  aiFusion(si);
  // defend
  let threat=null;for(const e of ents){if(e.dead||ally(e.side,si)||!e.isU)continue;for(const b of bs){if(hyp(e.x-b.x,e.y-b.y)<11*TILE){threat=e;break;}}if(threat)break;}
  if(threat){for(const u of army)if(!u.order||u.order.type==='move'&&!u.order.wave){if(!u.target||u.target.isB)orderMove(u,threat.x,threat.y,true);}}
  else if(!ai.attacking){
    if(army.length>=ai.wave&&gtime>ai.d.first){const tgt=aiTarget(si,hq||army[0]);if(tgt){ai.attacking=true;ai.lastWave=gtime;ai.wave=Math.min(ai.wave+2,ai.d.wcap);
      for(const u of army){orderMove(u,tgt.x,tgt.y,true);u.order.wave=true;}if(foe(si,PL)&&!G.auto){banner('VAGUE ENNEMIE EN APPROCHE !','#ff4d5e');msg('Une vague ennemie de '+army.length+' unités attaque !','#ff4d5e');announce('Attention, vague ennemie en approche');}}}
    else{const home=hq||bs[0];if(home){const en=enemyBase(si),rx=home.x+(en.x*TILE-home.x)*.12,ry=home.y+(en.y*TILE-home.y)*.12;
      for(const u of army)if(!u.order&&!u.target&&hyp(u.x-rx,u.y-ry)>5*TILE)orderMove(u,rx+rr(-60,60),ry+rr(-60,60),true);}}}
  else{const attackers=army.filter(u=>u.order&&u.order.wave||!u.order);if(attackers.length<3&&gtime-ai.lastWave>20)ai.attacking=false;
    for(const u of army)if(!u.order&&!u.target){const tgt=aiTarget(si,u);if(tgt){orderMove(u,tgt.x,tgt.y,true);u.order.wave=true;}}}
  // heroes use specials
  for(const u of army){if(!u.D.ab||!canCast(u))continue;const ab=u.D.ab;
    if(['rage','shift','harden','rally','rewind','barrier','erase'].includes(ab.type)){let n=0;for(const e of ents)if(!e.dead&&e.isU&&foe(e.side,si)&&hyp(e.x-u.x,e.y-u.y)<220)n++;if(n>=3||u.hp<u.max*.45&&n>0)orderAbility(u,u.x,u.y);continue;}
    const reach=ab.type==='beam'?ab.len*.85:ab.type==='cone'?ab.len*.7:ab.type==='ice'?ab.len*.8:ab.range+80,rad=ab.rad||(ab.w?ab.w*.9:90);
    let best=null,bn=0;for(const e of ents){if(e.dead||ally(e.side,si))continue;if(hyp(e.x-u.x,e.y-u.y)>reach)continue;let n=e.isB?2:e.D.hero?2:1;
      for(const f of ents)if(f!==e&&!f.dead&&f.isU&&foe(f.side,si)&&hyp(f.x-e.x,f.y-e.y)<rad)n++;if(n>bn){bn=n;best=e;}}
    if(best&&bn>=3)orderAbility(u,best.x,best.y);}}
function aiTarget(si,from){let best=null,bd=1e9;for(const e of ents){if(e.dead||ally(e.side,si)||!e.isB)continue;const d=hyp(e.x-from.x,e.y-from.y)+(e.key==='turret'?120:0);if(d<bd){bd=d;best=e;}}
  if(!best)for(const e of ents){if(e.dead||ally(e.side,si))continue;const d=hyp(e.x-from.x,e.y-from.y);if(d<bd){bd=d;best=e;}}return best;}
