const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1600,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(800);await p.click('#bgo');await p.waitForTimeout(300);
for(const f of['dbz','mha','aot']){await p.evaluate((f)=>{const g=window.__game;g.G.opp=f==='dbz'?'mha':'dbz';g.newGame(f,1,77);g.G.noFog=true;
  ents=ents.filter(e=>e.side!==0);let x=30,y=34;for(const k of['lab','radar','def2']){const D=BDEF[k];for(let yy=y-1;yy<y+D.h+1;yy++)for(let xx=x-1;xx<x+D.w+1;xx++){blocked[ti(xx,yy)]=0;ter[ti(xx,yy)]=0;}const bb=mkBuilding(0,k,x,y,true);x+=D.w+2;}
  const keys=['inf3','inf4','mech',...FAC[f].heroes.slice(5)];keys.forEach((k,i)=>{const u=mkUnit(0,k,(31+i*2.6)*32,40*32);u.face=1;});
  g.cam.z=1.6;centerOn(38*32,37.5*32);for(let i=0;i<4;i++)g.update(1/30);g.G.paused=true;g.render();setTab('h');},f);await p.waitForTimeout(300);await p.screenshot({path:'gal_'+f+'.png'});}
console.log(errs.join('\n'));await b.close();})();
