// ===== Wild monsters everywhere: weak camps that respawn, stronger as the game goes on =====
const WILD_T=[[0,[['saiba',3],['ant',2]]],[240,[['ant',3],['fsoldier',2],['orc',2],['fishman',2]]],[540,[['orc',3],['iceelf',3],['kaijin',2],['celljr',2]]],[900,[['kaijin',3],['spider',2],['chimant',3],['kargalgan',1]]],[1320,[['spider',3],['kargalgan',1],['baruka',1],['celljr',3]]]];
let wild=[],wildT=0;
{const _ie=initEvents;initEvents=function(){_ie();wild=[];wildT=4;};}
function wildTier(){let k=0;for(let i=0;i<WILD_T.length;i++)if(gtime>=WILD_T[i][0])k=i;return WILD_T[k][1];}
function wildSpot(){for(let k=0;k<200;k++){const x=(3+R()*(MW-6))|0,y=(3+R()*(MH-6))|0,X=x*TILE+16,Y=y*TILE+16;if(!walk(x,y)||ore[ti(x,y)]>0||(bridgeT&&bridgeT[ti(x,y)]))continue;
  if(BASES.some(b=>b&&hyp(b.x-x,b.y-y)<16))continue;if(ents.some(b=>b.isB&&!b.dead&&hyp(b.x-X,b.y-Y)<11*TILE))continue;if(wild.some(c=>hyp(c.x-X,c.y-Y)<9*TILE))continue;
  if(typeof tports!=='undefined'&&tports.some(t=>hyp(t.x-X,t.y-Y)<4*TILE))continue;return{x:X,y:Y};}return null;}
function wildCamp(c){const pool=wildTier(),[key,n]=pick(pool),f0=sides[2].fac;sides[2].fac='neu';c.ids=[];
  for(let i=0;i<n;i++){const a=i/n*PI2+R(),d=n===1?0:rr(22,46);let x=c.x+Math.cos(a)*d,y=c.y+Math.sin(a)*d*.7;if(blockedW(x,y)){x=c.x;y=c.y;}const u=mkUnit(2,key,x,y);u.guard={x,y};u.wild=true;u.gx=x;u.gy=y;c.ids.push(u.id);}
  sides[2].fac=f0;c.t=0;}
function updWild(dt){if(NET.client||G.state!=='play')return;wildT-=dt;if(wildT>0)return;wildT=3;const want=Math.max(5,Math.round(MW/13));
  if(wild.length<want){const p=wildSpot();if(p){const c={x:p.x,y:p.y,ids:[],t:0,cd:0};wild.push(c);wildCamp(c);}}
  for(const c of wild){if(c.ids.some(id=>ents.some(e=>e.id===id&&!e.dead))){c.cd=0;continue;}c.cd+=3;if(c.cd>=rr(60,90)){if(ents.some(e=>e.isU&&!e.dead&&isPl(e.side)&&hyp(e.x-c.x,e.y-c.y)<8*TILE))continue;wildCamp(c);c.cd=0;}}}
{const _uf=updFusion;updFusion=function(dt){_uf(dt);updWild(dt);};}
// ===== Solo Leveling: Jinwoo starts on the field, money only from kills, respawn at level 1 =====
const SL_KILL=t=>Math.round(t.D.bounty?0:(t.D.cost||(t.isB?600:100))*.45);
function slSpawnJinwoo(si,msgIt){const hq=myB(si,'hq')[0]||myB(si,'hq2')[0]||myB(si)[0];if(!hq||ents.some(e=>e.isU&&!e.dead&&e.side===si&&e.key==='jinwoo'))return;
  const tx=hq.tx+((hq.w/2)|0),ty=hq.ty+hq.h,p=nearestFree(tx,ty,10,tx,ty+2)||[tx,ty],u=mkUnit(si,'jinwoo',p[0]*TILE+16,p[1]*TILE+12);u.gx=u.x;u.gy=u.y;if(u&&typeof ariseFx==='function')ariseFx(u);if(msgIt&&si===PL)msg('Sung Jinwoo se relève au quartier général… de retour au niveau 1.','#6fd8ff');}
{const _ng=newGame;newGame=function(...a){const r=_ng(...a);for(const si of PSIDES)if(sides[si]&&sides[si].fac==='sl')slSpawnJinwoo(si,false);return r;};}
if(window.__game)window.__game.newGame=(...a)=>newGame(...a);
{const _k=kill;kill=function(t,srcSide,src){const was=!t.dead;_k(t,srcSide,src);if(!was||!t.dead||NET.client)return;
  if(srcSide!=null&&isPl(srcSide)&&sides[srcSide]&&sides[srcSide].fac==='sl'&&!ally(srcSide,t.side)&&!(t.D&&t.D.harv&&t.side===srcSide)){const S=sides[srcSide],v=SL_KILL(t);if(v>0){S.credits+=v;if(srcSide===PL&&v>=150)feedPush('Le Système : +'+v+' pour '+(t.D.name||'la cible'),'#6fd8ff');}
    if(src&&src.key==='jinwoo')slXP(srcSide,Math.max(6,(t.D.cost||(t.isB?600:100))/8));}
  if(t.isU&&t.key==='jinwoo'&&sides[t.side]&&sides[t.side].fac==='sl'){const s=sides[t.side];s.slv=1;s.slx=0;slSpawnJinwoo(t.side,true);}};}
{const _dm=dmgMult;dmgMult=function(u){let m=_dm(u);if(u&&u.key==='jinwoo'&&sides[u.side])m*=1+.04*((sides[u.side].slv||1)-1);return m;};}
for(const f of['sl'])if(UDEF[f]&&UDEF[f].jinwoo)UDEF[f].jinwoo.desc=(UDEF[f].jinwoo.desc||'')+' Présent dès le début de la partie. Chaque ennemi qu’il tue lui rapporte de l’expérience : plus de vie et de dégâts. S’il meurt, il réapparaît aussitôt au quartier général, mais niveau 1.';
FAC.sl&&(FAC.sl.econ='Pas de récolte : l’Armée des Ombres ne gagne de l’argent qu’en tuant des ennemis (adversaires, événements, monstres sauvages).');
// ===== Dragon Ball: transformations are earned by kills and kept =====
const TF_K={ssj:5,blue:15,ui:25,rose:6};
{const _k=kill;kill=function(t,srcSide,src){const was=!t.dead;_k(t,srcSide,src);if(was&&t.dead&&src&&src.isU&&!src.dead&&foe(src.side,t.side)&&!(t.D&&t.D.harv)){src.kills=(src.kills||0)+1;
  if(src.fac==='dbz'&&SAIYANS.has(src.key)&&src.side===PL){const k=src.kills,nx=!src.ssj?TF_K[src.key==='black'?'rose':'ssj']:!src.sblue&&src.key!=='black'?TF_K.blue:src.key==='goku'&&!(src.ui>0)?TF_K.ui:0;if(nx&&nx-k<=2&&nx>k)feedPush(src.D.name+' : encore '+(nx-k)+' ennemi'+(nx-k>1?'s':'')+' avant la prochaine transformation','#ffd23a');}}};}
SAIYANS.add('broly');
{const _g=goSSJ;goSSJ=function(u,why){if((u.kills||0)<TF_K[u.key==='black'?'rose':'ssj'])return;return _g(u,why);};}
{const _g=goBlue;goBlue=function(u,why){if((u.kills||0)<TF_K.blue)return;return _g(u,why);};}
uiReady=function(u){return !!u.sblue&&(u.kills||0)>=TF_K.ui;};
updTransform=function(u){if(!SAIYANS.has(u.key)||u.dead||u.fusing)return;const k=u.kills||0,s=sides[u.side];
  if(!u.ssj){if(k>=TF_K[u.key==='black'?'rose':'ssj'])goSSJ(u,k+' ennemis vaincus !');return;}
  if(!u.sblue&&u.key!=='black'&&u.key!=='broly'&&s&&s.ups.includes('divine')&&k>=TF_K.blue)goBlue(u,k+' ennemis vaincus !');};
// fusions keep the forms and add up the kills of Goku and Vegeta
{const _df=doFusion;doFusion=function(g,v,kind){const k=(g.kills||0)+(v.kills||0);_df(g,v,kind);const F=sides[g.side]&&sides[g.side].fusion;if(F&&F.z)F.z.kills=k;};}
for(const k of SAIYANS){const D=UDEF.dbz[k];if(!D||!D.desc)continue;D.desc=D.desc.replace(/ Super Saiyan : .*$/,'').replace(/ Super Saiyan Rosé : .*$/,'');
  D.desc+=k==='black'?' Super Saiyan Rosé après '+TF_K.rose+' ennemis vaincus.':' Transformations gagnées au combat et gardées : Super Saiyan après '+TF_K.ssj+' ennemis vaincus'+(k==='broly'?'':', Super Saiyan Blue après '+TF_K.blue+' (avec l’amélioration divine)')+(k==='goku'?', Ultra Instinct après '+TF_K.ui:'')+'.';}
