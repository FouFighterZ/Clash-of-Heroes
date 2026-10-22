const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1500,height:950}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(600);await p.screenshot({path:'sds_menu.png'});await p.click('.fac[data-fac="sds"]');await p.click('#bgo');await p.waitForTimeout(800);
await p.evaluate(()=>{const hq=myB(PL,'hq')[0];const ks=['inf1','inf2','inf3','inf4','healer','elite','meliodas','ban','diane','harlequin','gowther','merlin','escanor','elizabeth','arthur','zeldris','harv','tank','jet','mech'];
  ks.forEach((k,i)=>{const u=mkUnit(PL,k,hq.x+160+(i%7)*48,hq.y-120+Math.floor(i/7)*70);u.gx=u.x;u.gy=u.y;});
  for(const [k,dx,dy] of [['barracks',-4,4],['power',-4,0],['temple',4,4],['refinery',0,4]])mkBuilding(PL,k,hq.tx+dx,hq.ty+dy,true);recalcPower(PL);
  for(const e of ents)if(e.isU&&e.side!==PL&&!e.D.hero)e.dead=true;centerOn(hq.x+180,hq.y);cam.z=1.15;clampCam();});
await p.waitForTimeout(1200);await p.screenshot({path:'sds_units.png'});
console.log(errs);await b.close();})();
