const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1500,height:950}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(900);await p.click('.playtabs button[data-pt=solo]');await p.click('#bgo');await p.waitForTimeout(800);
await p.evaluate(()=>{const hq=myB(PL,'hq')[0];const ks=['goku','vegeta','gohan','piccolo','trunks','beerus','whis'];
  ks.forEach((k,i)=>{const u=mkUnit(PL,k,hq.x+120+i*60,hq.y-150);u.gx=u.x;u.gy=u.y;u.z=0;u.fly=false;});
  ks.forEach((k,i)=>{const u=mkUnit(PL,k,hq.x+120+i*60,hq.y-60);u.gx=u.x;u.gy=u.y;u.ssj=true;u.fly=false;u.z=0;});
  centerOn(hq.x+300,hq.y-100);cam.z=1.8;clampCam();});
await p.waitForTimeout(500);await p.screenshot({path:'gk2.png'});console.log(errs);await b.close();})();
