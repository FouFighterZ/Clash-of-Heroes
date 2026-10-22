const { chromium } = require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1600,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+e.stack.split('\n')[1]));await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(800);await p.click('#bgo');await p.waitForTimeout(300);
for(const f of(process.argv[2]||'sl,opm').split(',')){
 await p.evaluate((f)=>{const g=window.__game;g.G.opp='dbz';g.newGame(f,1,77);g.G.noFog=true;ents=ents.filter(e=>e.side!==0);
  const ks=['hq','power','refinery','barracks','factory','turret','temple','lab','radar','def2','market','hospital','training','temple2','unique','wall'];let x=24,y=26,rowH=0;
  for(const k of ks){const D=BDEF[k];if(x+D.w>56){x=24;y+=rowH+2;rowH=0;}for(let yy=y-1;yy<y+D.h+1;yy++)for(let xx=x-1;xx<x+D.w+1;xx++){blocked[ti(xx,yy)]=0;ter[ti(xx,yy)]=0;ore[ti(xx,yy)]=0;}mkBuilding(0,k,x,y,true);x+=D.w+1;rowH=Math.max(rowH,D.h);}
  g.cam.z=1.05;centerOn(40*32,33*32);for(let i=0;i<4;i++)g.update(1/30);g.G.paused=true;g.render();},f);await p.waitForTimeout(300);await p.screenshot({path:'gb_'+f+'.png'});
 await p.evaluate((f)=>{const g=window.__game;g.newGame(f,1,77);g.G.noFog=true;ents=ents.filter(e=>e.side!==0);const ks=Object.keys(UDEF[f]).filter(k=>!k.startsWith('sh_'));
  ks.forEach((k,i)=>{const u=mkUnit(0,k,(28+(i%9)*2.4)*32,(33+Math.floor(i/9)*2.6)*32);u.face=1;u.ang=0;});
  if(f==='sl')['goku','allmight','levi'].forEach((k,i)=>{const fac=['dbz','mha','aot'][i];const D=ensureShade('sh_'+fac+'_'+k);const u=mkUnit(0,'sh_'+fac+'_'+k,(28+i*2.4)*32,(33+3*2.6)*32);u.face=1;});
  g.cam.z=1.5;centerOn(38*32,36.5*32);for(let i=0;i<4;i++)g.update(1/30);g.G.paused=true;g.render();},f);await p.waitForTimeout(300);await p.screenshot({path:'gu_'+f+'.png'});}
console.log(errs.join('\n'));await b.close();})();
