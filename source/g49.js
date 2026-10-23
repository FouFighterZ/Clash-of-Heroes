// ===== Saitama: by far the strongest character, but very slow to come and with real constraints =====
{const D=UDEF.opm.saitama;Object.assign(D,{cost:4500,time:150,hp:8000,dmg:380,rof:1,vsB:.3,regen:22,speed:92});
  D.ab.cd=24;D.ab2.dmg=400;
  D.desc='Le plus puissant de tous : chaque coup de poing tue une troupe, il encaisse un tiers de dégâts en moins et se régénère. Contreparties : il met 2 min 30 à arriver ; quand il s’ennuie (sans combat), il part aux soldes du supermarché pendant 25 s ; et s’il tombe, l’Association ne le rappelle pas avant 5 minutes. Sa Série de coups normaux (Q) pulvérise tout devant lui.';}
// takes half damage
{const _dm=damage;damage=function(t,amt,...a){if(t&&t.key==='saitama'&&t.isU&&amt>0)amt*=.65;return _dm(t,amt,...a);};}
// normal punches one-shot troops (heroes, legends, bosses and buildings take normal damage)
{const _dm=damage;damage=function(t,amt,srcSide,src,...a){if(src&&src.isU&&src.key==='saitama'&&t&&t.isU&&!t.dead&&!t.D.hero&&!t.D.legend&&!t.D.mech&&!((t.D.bounty||0)>=900)&&amt>=300)amt=Math.max(amt,t.hp+1);return _dm(t,amt,srcSide,src,...a);};}
// longer supermarket trips
{const _gs=goShopping;goShopping=function(u){_gs(u);const s=sides[u.side];const a=s.away&&s.away.find(x=>x.u===u);if(a)a.t=25;if(u.side===PL)feedPush('Saitama s’ennuie et part aux soldes du supermarché (25 s)…','#ffc21a');};}
// after a defeat, 5 minutes before he can be recruited again
{const _k=kill;kill=function(t,srcSide,src){const was=!t.dead;_k(t,srcSide,src);if(was&&t.dead&&t.isU&&t.key==='saitama'&&sides[t.side]){sides[t.side].saiCd=gtime+300;if(t.side===PL)msg('Saitama est tombé… l’Association ne pourra pas le rappeler avant 5 minutes.','#ffc21a');}};}
{const _q=queueUnit;queueUnit=function(si,key){const s=sides[si];if(key==='saitama'&&s&&(s.saiCd||0)>gtime){if(si===PL){feedPush('Saitama sera disponible dans '+Math.ceil(s.saiCd-gtime)+' s','#ffc53d');sfx('err');}return false;}return _q(si,key);};}
{const _gx=giveXP;giveXP=function(u,v){if(u&&u.key==='saitama')return;return _gx(u,v);};}
