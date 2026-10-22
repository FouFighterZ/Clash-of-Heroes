const {chromium}=require('/opt/node-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});const p=await b.newPage({viewport:{width:1600,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/clash.html');await p.waitForTimeout(1200);await p.click('.playtabs button[data-pt=solo]');await p.waitForTimeout(400);await p.click('#bgo');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const hq=myB(PL,'hq')[0];const x=hq.tx+hq.w;const res=[];for(let d=0;d<4;d++)res.push(d+':'+canPlace(PL,'power',x+d,hq.ty,false));mkBuilding(PL,'wall',x+6,hq.ty+4,true);res.push('wallAdj:'+canPlace(PL,'power',x+7,hq.ty+4,false));return res.join(' ');});
console.log(r,errs);await b.close();})();
