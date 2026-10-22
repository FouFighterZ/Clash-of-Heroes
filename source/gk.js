const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1500,height:950}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(900);await p.click('.playtabs button[data-pt=solo]');await p.waitForTimeout(300);await p.screenshot({path:'gk_menu.png',clip:{x:280,y:180,width:500,height:320}});
await p.click('#bgo');await p.waitForTimeout(800);
await p.evaluate(()=>{const hq=myB(PL,'hq')[0];const mk=(dx,dy)=>{const u=mkUnit(PL,'goku',hq.x+dx,hq.y+dy);u.gx=u.x;u.gy=u.y;return u;};
  const a=mk(150,-60),b2=mk(220,-60),c2=mk(290,-60),d=mk(360,-60);b2.ssj=true;c2.face=-1;window._d=d;window._b=b2;centerOn(hq.x+250,hq.y-60);cam.z=2;clampCam();});
await p.waitForTimeout(600);await p.evaluate(()=>{_d.casting={t:.3,T:1.1,x:_d.x+300,y:_d.y};_b.atk=.2;});await p.waitForTimeout(60);await p.screenshot({path:'gk_game.png'});
console.log(errs);await b.close();})();
