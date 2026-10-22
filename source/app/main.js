// Clash of Heroes — desktop app: runs the local-network server and shows the game in its own window
const {app,BrowserWindow,Menu,shell,net}=require('electron');
const path=require('path'),os=require('os'),dgram=require('dgram'),fs=require('fs');
let server=null;// loaded after the update check, so a newer downloaded server can be used

app.commandLine.appendSwitch('autoplay-policy','no-user-gesture-required');
// Friends' PCs are on the local network: never send that traffic through a proxy
app.commandLine.appendSwitch('proxy-bypass-list','<local>;localhost;127.*;10.*;192.168.*;172.16.*;172.17.*;172.18.*;172.19.*;172.2*;172.30.*;172.31.*;169.254.*');
const DISC_PORT=41234;
const hosts=new Map();
let port=8080,win=null;

function lanIfaces(){const out=[];for(const l of Object.values(os.networkInterfaces()))for(const a of l||[])if(a.family==='IPv4'&&!a.internal)out.push(a);return out;}
function bcastAddr(a){const ip=a.address.split('.').map(Number),m=a.netmask.split('.').map(Number);return ip.map((v,i)=>(v|(~m[i]&255))).join('.');}

// Each running copy announces itself on the Wi-Fi every 2 s and lists the others
function discovery(){const s=dgram.createSocket({type:'udp4',reuseAddr:true});
  s.on('error',()=>{});
  s.on('message',(buf,r)=>{let d;try{d=JSON.parse(buf);}catch(_){return;}if(!d||d.cdh!==1||!(d.port>0))return;
    if(lanIfaces().some(a=>a.address===r.address)&&d.port===port)return;
    hosts.set(r.address+':'+d.port,{ip:r.address,port:d.port,name:String(d.name||'').slice(0,40),t:Date.now()});});
  s.bind(DISC_PORT,()=>{try{s.setBroadcast(true);}catch(_){}
    const beat=()=>{const msg=Buffer.from(JSON.stringify({cdh:1,port,name:os.hostname()}));const to=new Set(['255.255.255.255',...lanIfaces().map(bcastAddr)]);for(const a of to)s.send(msg,DISC_PORT,a,()=>{});};
    beat();setInterval(beat,2000);});}
const freshHosts=()=>{const now=Date.now();return[...hosts.values()].filter(h=>now-h.t<7000).map(({ip,port,name})=>({ip,port,name}));};

// ---- automatic updates: newer game files are downloaded into the user folder and served before the bundled ones ----
const readJSON=p=>{try{return JSON.parse(fs.readFileSync(p,'utf8'));}catch(_){return null;}};
const updDir=()=>path.join(app.getPath('userData'),'jeu');
const verOf=p=>(readJSON(path.join(p,'version.json'))||{version:0}).version||0;
async function fetchT(url,ms){const ac=new AbortController(),t=setTimeout(()=>ac.abort(),ms);try{return await net.fetch(url,{signal:ac.signal,cache:'no-store'});}finally{clearTimeout(t);}}
async function checkUpdate(status){const cfg=readJSON(path.join(__dirname,'update.json'));if(!cfg||!cfg.base)return;
  const dir=updDir(),have=Math.max(verOf(dir),verOf(__dirname));
  const r=await fetchT(cfg.base+'version.json?t='+Date.now(),6000);if(!r.ok)return;const remote=await r.json();if(!(remote.version>have)||!Array.isArray(remote.files))return;
  status('Mise à jour vers la version '+remote.version+'…');const tmp=dir+'.tmp';fs.rmSync(tmp,{recursive:true,force:true});fs.mkdirSync(path.join(tmp,'music'),{recursive:true});
  let n=0;for(const f of remote.files){if(typeof f.path!=='string'||!/^(clash-of-heroes\.html|server\.js|music\/[\w.-]+\.(ogg|mp3|wav))$/.test(f.path))continue;const dst=path.join(tmp,f.path);n++;
    if(f.path!=='clash-of-heroes.html'&&f.path!=='server.js'){const old=[path.join(dir,f.path),path.join(__dirname,f.path)].find(p=>{try{return fs.statSync(p).size===f.size;}catch(_){return false;}});
      if(old){if(old.startsWith(dir))fs.copyFileSync(old,dst);continue;}}
    status('Mise à jour vers la version '+remote.version+'… ('+n+'/'+remote.files.length+')');
    const rr=await fetchT(cfg.base+f.path.split('/').map(encodeURIComponent).join('/')+'?v='+remote.version,120000);if(!rr.ok)throw new Error(f.path);fs.writeFileSync(dst,Buffer.from(await rr.arrayBuffer()));}
  fs.writeFileSync(path.join(tmp,'version.json'),JSON.stringify(remote));fs.rmSync(dir,{recursive:true,force:true});fs.renameSync(tmp,dir);}
const loadingPage=t=>'data:text/html;charset=utf-8,'+encodeURIComponent('<body style="margin:0;background:#05070b;color:#ffc53d;font:22px sans-serif;display:grid;place-items:center;height:100vh"><div>'+t+'</div></body>');
function createWindow(){
  win=new BrowserWindow({width:1600,height:900,minWidth:1100,minHeight:700,backgroundColor:'#05070b',title:'Clash of Heroes',icon:path.join(__dirname,'icon.png'),autoHideMenuBar:true,show:false,
    webPreferences:{contextIsolation:true,nodeIntegration:false}});
  Menu.setApplicationMenu(null);
  win.once('ready-to-show',()=>{win.maximize();win.show();});
  win.webContents.setWindowOpenHandler(({url})=>{if(/^https?:/.test(url))shell.openExternal(url);return{action:'deny'};});
  win.webContents.on('before-input-event',(e,i)=>{if(i.type!=='keyDown')return;
    if(i.key==='F11'){win.setFullScreen(!win.isFullScreen());e.preventDefault();}
    else if(i.key==='F5'){win.webContents.reloadIgnoringCache();e.preventDefault();}});
  win.on('page-title-updated',e=>e.preventDefault());
  win.loadURL(loadingPage('Clash of Heroes : chargement…'));}

if(!app.requestSingleInstanceLock())app.quit();
else{app.on('second-instance',()=>{if(win){if(win.isMinimized())win.restore();win.focus();}});
  app.whenReady().then(async()=>{createWindow();
    try{await checkUpdate(t=>{if(win)win.loadURL(loadingPage(t));});}catch(_){}
    const dir=updDir(),dirs=verOf(dir)>verOf(__dirname)?[dir]:[];
    try{server=require(dirs.length&&fs.existsSync(path.join(dir,'server.js'))?path.join(dir,'server.js'):'./server.js');}catch(_){server=require('./server.js');}
    try{port=await server.start(8080,{hosts:freshHosts,retry:true,dirs});}catch(e){port=0;}
    discovery();if(win)win.loadURL('http://localhost:'+port+'/');});
  app.on('window-all-closed',()=>app.quit());}
