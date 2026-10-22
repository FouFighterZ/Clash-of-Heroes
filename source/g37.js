// ===== Buildings (walls excepted) may never cut a passage: placement is refused if it would split the walkable ground around it =====
const PASS={lab:null,st:null};
function passLabel(ring,extra){const lab=PASS.lab&&PASS.lab.length===NT?PASS.lab.fill(0):(PASS.lab=new Int32Array(NT));const q=PASS.st&&PASS.st.length===NT?PASS.st:(PASS.st=new Int32Array(NT));let id=0;
  const free=i=>blocked[i]===0&&!(extra&&extra.has(i));
  for(const r of ring){if(lab[r]||!free(r))continue;id++;let h=0,t=0;q[t++]=r;lab[r]=id;
    while(h<t){const i=q[h++],x=i%MW,y=(i/MW)|0;
      if(x>0){const j=i-1;if(!lab[j]&&free(j)){lab[j]=id;q[t++]=j;}}if(x<MW-1){const j=i+1;if(!lab[j]&&free(j)){lab[j]=id;q[t++]=j;}}
      if(y>0){const j=i-MW;if(!lab[j]&&free(j)){lab[j]=id;q[t++]=j;}}if(y<MH-1){const j=i+MW;if(!lab[j]&&free(j)){lab[j]=id;q[t++]=j;}}}}
  return ring.map(r=>lab[r]);}
function keepsPassage(key,tx,ty){if(key==='wall')return true;const D=BDEF[key],ring=[],foot=new Set();
  for(let y=ty;y<ty+D.h;y++)for(let x=tx;x<tx+D.w;x++)foot.add(y*MW+x);
  for(let y=ty-1;y<=ty+D.h;y++)for(let x=tx-1;x<=tx+D.w;x++){if(x<0||y<0||x>=MW||y>=MH)continue;const i=y*MW+x;if(!foot.has(i)&&blocked[i]===0)ring.push(i);}
  if(ring.length<2)return true;const now=passLabel(ring,foot);const parts=new Set(now);if(parts.size<2)return true;
  const before=passLabel(ring,null);const m=new Map();for(let k=0;k<ring.length;k++){const b=before[k],n=now[k];if(m.has(b)&&m.get(b)!==n)return false;m.set(b,n);}return true;}
let passMemo={k:''};
{const _cp=canPlace;canPlace=function(si,key,tx,ty,gap){if(!_cp(si,key,tx,ty,gap))return false;if(gap||key==='wall')return true;
  const k=key+','+tx+','+ty+','+ents.length+','+Math.floor(gtime);if(passMemo.k===k)return passMemo.v;const v=keepsPassage(key,tx,ty);passMemo={k,v};return v;};}
// AI: skip spots that would cut a passage and look again
{const _fs=findSpot;findSpot=function(si,key){if(key==='wall')return _fs(si,key);const bad=new Set(),_c=canPlace;
  try{canPlace=function(s,k,x,y,g){return !bad.has(x+','+y)&&_c(s,k,x,y,g);};
    for(let n=0;n<8;n++){const sp=_fs(si,key);if(!sp||keepsPassage(key,sp.x,sp.y))return sp;bad.add(sp.x+','+sp.y);}return null;}finally{canPlace=_c;}};}
// placement preview: tell the player why the spot is refused
{const _ht=typeof hintText==='function'?hintText:null;if(_ht)hintText=function(){if(mode&&mode.type==='place'&&mode.key!=='wall'){const D=BDEF[mode.key],p=placeTile();
  if(p&&!keepsPassage(mode.key,p.x,p.y))return'Impossible ici : ce bâtiment bloquerait un passage';}return _ht();};}
