// ===== Flying over water or forest: characters can only hover above water for a limited time, then fly back to the nearest shore =====
const AIR_MAX=8,AIR_REFILL=.4,AIR_REST=2;
function overWater(x,y){const tx=Math.floor(x/TILE),ty=Math.floor(y/TILE);return tx>=0&&ty>=0&&tx<MW&&ty<MH&&(ter[ty*MW+tx]===T_WATER||ter[ty*MW+tx]===T_FOREST);}
function nearestShore(x,y){const sx=clamp(Math.floor(x/TILE),0,MW-1),sy=clamp(Math.floor(y/TILE),0,MH-1),seen=new Uint8Array(NT),q=[sy*MW+sx];seen[q[0]]=1;
  for(let h=0;h<q.length;h++){const i=q[h],tx=i%MW,ty=(i/MW)|0;if(ter[i]!==T_WATER&&!blocked[i])return{x:tx*TILE+TILE/2,y:ty*TILE+TILE/2};
    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=tx+dx,ny=ty+dy;if(nx<0||ny<0||nx>=MW||ny>=MH)continue;const j=ny*MW+nx;if(!seen[j]){seen[j]=1;q.push(j);}}}
  return null;}
{const _uu=updUnit;updUnit=function(u,dt){_uu(u,dt);if(u.dead||!u.fly||u.D.veh)return;
  if(u.landing){const L=u.landing,dx=L.x-u.x,dy=L.y-u.y,d=hyp(dx,dy),st=Math.max(90,(u.D.speed||80)*1.6)*dt;u.order=null;u.path=null;u.target=null;u.casting=null;u.moving=true;
    if(d<=st+2){u.x=L.x;u.y=L.y;u.landing=null;u.airRest=AIR_REST;u.moving=false;u.gx=u.x;u.gy=u.y;}else{u.x+=dx/d*st;u.y+=dy/d*st;u.face=dx<0?-1:1;}return;}
  if(overWater(u.x,u.y)){u.airT=(u.airT||0)+dt;u.airRest=AIR_REST;
    if(u.airT>=AIR_MAX){u.airT=AIR_MAX;const p=nearestShore(u.x,u.y);if(p){u.landing=p;if(u.side===PL)feedPush(u.D.name+' est à bout de souffle et se pose sur la terre ferme','#7fd0ff');}}}
  else if(u.airT>0){if(u.airRest>0)u.airRest-=dt;else u.airT=Math.max(0,u.airT-dt*AIR_REFILL);}};}
// gauge under the unit while it is in the air above water or catching its breath
function airGauge(c,e){const f=1-e.airT/AIR_MAX,w=26,x=e.x-w/2+3,y=e.y-(e.z||0)+5;
  c.fillStyle='rgba(0,0,0,.7)';c.fillRect(x-1,y-1,w+2,6);c.fillStyle=f>.5?'#5ad8ff':f>.25?'#ffc53d':'#ff4d5e';c.fillRect(x,y,w*f,4);
  c.fillStyle='#bfefff';c.beginPath();c.moveTo(x-5,y-2.5);c.quadraticCurveTo(x-2,y+1,x-5,y+3);c.quadraticCurveTo(x-8,y+1,x-5,y-2.5);c.fill();}
