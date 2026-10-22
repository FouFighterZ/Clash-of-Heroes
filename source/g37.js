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
// training room: a button in the unit panel sends the selected units into the nearest room with free places
function nearestTrainB(L){let best=null,bd=1e9;const c=L[0];for(const b of ents)if(b.isB&&!b.dead&&b.side===PL&&b.key==='training'&&b.rise>=1&&(b.inside||[]).length<trCap(b)){const d=hyp(b.x-c.x,b.y-c.y);if(d<bd){bd=d;best=b;}}return best;}
{const _ru=refreshUI;refreshUI=function(){_ru();const p=$('#selp');if(!p)return;const L=sel.filter(e=>!e.dead&&e.isU&&e.side===PL&&!e.D.harv&&!e.D.veh);let bx=p.querySelector('#xtrain');
  const has_=L.length&&ents.some(b=>b.isB&&!b.dead&&b.side===PL&&b.key==='training'&&b.rise>=1);const acts=p.querySelector('.acts');
  if(!has_||!acts){if(bx)bx.remove();return;}if(!bx){bx=document.createElement('button');bx.type='button';bx.id='xtrain';bx.className='abil';bx.style.setProperty('--ac','#ffd23a');
    bx.innerHTML='<span class="ico"></span><span><b>S’entraîner</b><small>Entrer dans '+BDEF.training.names[sides[PL].fac]+'</small></span>';
    bx.onclick=()=>{const U=sel.filter(e=>!e.dead&&e.isU&&e.side===PL&&!e.D.harv&&!e.D.veh);const b=U.length&&nearestTrainB(U);if(!b){feedPush('Aucune salle d’entraînement libre','#ffc53d');sfx('err');return;}
      if(NET.client&&!NET.applying)NET.cmd({c:'tin',u:U.map(u=>u.id),b:b.id});else trainOrder(U,b);sfx('click');};}
  if(bx.parentNode!==acts)acts.prepend(bx);};}
