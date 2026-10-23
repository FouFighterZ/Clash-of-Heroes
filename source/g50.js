// ===== Beerus and Whis: gods of the universe, far stronger (and far pricier) than the other legends =====
{const B=UDEF.dbz.beerus;Object.assign(B,{cost:6500,time:75,hp:6000,dmg:140,rof:.8});B.ab.cd=55;B.ab.range=300;B.ab2.dmg=900;B.ab2.rad=110;
  B.desc='Dieu de la Destruction de l’univers 7 (DBS). Hakai : efface n’importe quelle cible d’un geste (seuls les anges y échappent, et Saitama y résiste). Sphère de destruction : explosion massive.';}
{const W=UDEF.dbz.whis;Object.assign(W,{cost:6000,time:70,hp:4600,dmg:105,rof:.5,range:26,melee:true,dodge:.5,regen:20});W.ab.cd=40;W.ab.rad=360;
  W.ab2={name:'Bâton de l’ange',type:'bind',cd:22,range:320,rad:170,dur:4,shout:'UN PEU DE PATIENCE…',col:'#bfe8ff'};
  W.desc='Ange de l’univers 7, maître de Beerus (DBS). Esquive la moitié des attaques et frappe au bâton à une vitesse folle. Aura de l’ange : les alliés proches se battent 20 % mieux. Retour temporel : remonte le temps pour tous les alliés proches (soin complet). Bâton de l’ange : immobilise les ennemis d’une zone. Immunisé au Hakai.';}
// Whis' aura: nearby allies +20% damage
{const _dm=dmgMult;let wl=[],wT=-9;dmgMult=function(u){let m=_dm(u);if(!u||!u.isU)return m;if(gtime-wT>.5||gtime<wT){wT=gtime;wl=ents.filter(e=>e.isU&&!e.dead&&e.key==='whis');}
  for(const w of wl)if(w!==u&&ally(w.side,u.side)&&hyp(w.x-u.x,w.y-u.y)<280){m*=1.2;break;}return m;};}
{const _du=drawUnitBody;drawUnitBody=function(c,u,x,y,ghost){if(u.key==='whis'&&!ghost){c.save();c.globalAlpha=.12+.05*Math.sin(gtime*2);c.strokeStyle='#bfe8ff';c.lineWidth=2;c.beginPath();c.ellipse(x,y,280,280*.6,0,0,PI2);c.stroke();c.restore();}return _du(c,u,x,y,ghost);};}
