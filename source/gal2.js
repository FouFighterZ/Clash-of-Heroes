const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1600,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(800);await p.click('#bgo');await p.waitForTimeout(300);
for(const f of['dbz','mha','aot']){await p.evaluate((f)=>{const g=window.__game;g.G.opp=f==='dbz'?'mha':'dbz';g.newGame(f,1,77);g.G.noFog=true;
  ents=ents.filter(e=>e.side!==0);let x=27,y=31;for(const k of['market','hospital','training','temple2','unique','wall']){const D=BDEF[k];for(let yy=y-1;yy<y+D.h+1;yy++)for(let xx=x-1;xx<x+D.w+1;xx++){blocked[ti(xx,yy)]=0;ter[ti(xx,yy)]=0;}mkBuilding(0,k,x,y+(D.h===3?-1:0),true);x+=D.w+1.6|0;x+=1;}
  const keys=[...FAC[f].legends];if(f==='dbz')keys.push('vegito','gogeta');keys.forEach((k,i)=>{const u=mkUnit(0,k,(30+i*3.2)*32,38.5*32);u.face=1;if(k==='vegito'||k==='gogeta')u.ssj=true;});
  if(f==='dbz'){sides[0].ups.push('divine');const gk=mkUnit(0,'goku',47*32,38.5*32);gk.ssj=true;const g2=mkUnit(0,'goku',49.5*32,38.5*32);g2.ui=10;}
  g.cam.z=1.45;centerOn(39*32,35*32);for(let i=0;i<4;i++)g.update(1/30);g.G.paused=true;g.render();setTab('l');},f);await p.waitForTimeout(300);await p.screenshot({path:'g2_'+f+'.png'});}
console.log(errs.join('\n'));await b.close();})();
