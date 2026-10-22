// Clash of Heroes — serveur pour jouer en réseau local (aucune dépendance, Node.js 16+)
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),os=require('os');
let PORT=+process.env.PORT||8080,hostsFn=null,DIRS=[__dirname];// DIRS: newer downloaded files first, then the bundled ones
const find=rel=>{for(const d of DIRS){const p=path.join(d,rel);if(fs.existsSync(p))return p;}return null;};
const page=()=>fs.readFileSync(find('clash-of-heroes.html'));
const srv=http.createServer((req,res)=>{const u=req.url.split('?')[0];
  if(u==='/'||u==='/index.html'||u==='/clash-of-heroes.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(page());}
  else if(/^\/music\/[\w.-]+\.(ogg|mp3|wav)$/.test(u)&&find(u.slice(1))){const ext=u.split('.').pop();
    res.writeHead(200,{'Content-Type':{ogg:'audio/ogg',mp3:'audio/mpeg',wav:'audio/wav'}[ext],'Cache-Control':'max-age=3600'});fs.createReadStream(find(u.slice(1))).pipe(res);}
  else if(u==='/lan-hosts'&&hostsFn){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(hostsFn()));}
  else{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Introuvable');}});
const clients=new Map();let nid=1;
srv.on('upgrade',(req,sock)=>{if(req.url.split('?')[0]!=='/ws'||!req.headers['sec-websocket-key']){sock.destroy();return;}
  const acc=crypto.createHash('sha1').update(req.headers['sec-websocket-key']+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+acc+'\r\n\r\n');sock.setNoDelay(true);
  const c={id:'p'+(nid++),sock,pres:{},rooms:new Set(),buf:Buffer.alloc(0),frag:''};clients.set(c.id,c);send(c,{op:'id',peer:c.id});peers();
  console.log('+ joueur connecté ('+(req.socket.remoteAddress||'?')+')');
  sock.on('data',d=>{c.buf=Buffer.concat([c.buf,d]);parse(c);});
  const bye=()=>{if(clients.delete(c.id)){peers();console.log('- joueur déconnecté');}};sock.on('close',bye);sock.on('end',bye);sock.on('error',bye);});
function parse(c){for(;;){const b=c.buf;if(b.length<2)return;const fin=b[0]&128,op=b[0]&15,masked=b[1]&128;let len=b[1]&127,off=2;
  if(len===126){if(b.length<4)return;len=b.readUInt16BE(2);off=4;}else if(len===127){if(b.length<10)return;len=Number(b.readBigUInt64BE(2));off=10;}
  const mo=masked?4:0;if(b.length<off+mo+len)return;let pl=Buffer.from(b.subarray(off+mo,off+mo+len));if(masked){const m=b.subarray(off,off+4);for(let i=0;i<pl.length;i++)pl[i]^=m[i&3];}
  c.buf=b.subarray(off+mo+len);
  if(op===8){try{c.sock.end();}catch(_){}return;}if(op===9){frame(c,10,pl);continue;}if(op===10)continue;
  if(op===1||op===0){c.frag+=pl.toString('utf8');if(fin){const t=c.frag;c.frag='';onMsg(c,t);}}}}
function frame(c,op,data){const n=data.length;let h;if(n<126)h=Buffer.from([128|op,n]);else if(n<65536){h=Buffer.alloc(4);h[0]=128|op;h[1]=126;h.writeUInt16BE(n,2);}else{h=Buffer.alloc(10);h[0]=128|op;h[1]=127;h.writeBigUInt64BE(BigInt(n),2);}
  try{c.sock.write(Buffer.concat([h,data]));}catch(_){}}
const send=(c,o)=>frame(c,1,Buffer.from(JSON.stringify(o)));
function peers(){const list=[...clients.values()].map(c=>({peer:c.id,presence:c.pres}));for(const c of clients.values())send(c,{op:'peers',list});}
function onMsg(c,t){let m;try{m=JSON.parse(t);}catch(_){return;}
  if(m.op==='pres'){c.pres=m.p&&typeof m.p==='object'?m.p:{};peers();}
  else if(m.op==='join'&&typeof m.room==='string')c.rooms.add(m.room);
  else if(m.op==='leave')c.rooms.delete(m.room);
  else if(m.op==='emit'){const out=Buffer.from(JSON.stringify({op:'msg',room:m.room,topic:m.topic,data:m.data,peer:c.id}));for(const o of clients.values())if(o!==c&&o.rooms.has(m.room))frame(o,1,out);}}
// Standalone (node server.js) or embedded in the desktop app (require('./server').start(port,{hosts}))
function start(port,opts){opts=opts||{};hostsFn=opts.hosts||null;if(opts.dirs)DIRS=[...opts.dirs,__dirname];return new Promise((ok,ko)=>{const tryP=p=>{const onErr=e=>{srv.off('listening',onOk);if(e.code==='EADDRINUSE'&&opts.retry&&p<port+20)tryP(p+1);else ko(e);};
  const onOk=()=>{srv.off('error',onErr);PORT=p;ok(p);};srv.once('error',onErr);srv.once('listening',onOk);srv.listen(p,'0.0.0.0');};tryP(port);});}
module.exports={start};
if(require.main===module)start(PORT).then(()=>{const ips=[];for(const l of Object.values(os.networkInterfaces()))for(const a of l||[])if(a.family==='IPv4'&&!a.internal)ips.push(a.address);
  console.log('\n  ==============================================');
  console.log('   CLASH OF HEROES — serveur réseau local prêt');
  console.log('  ==============================================\n');
  console.log('  Sur CE PC, ouvre dans ton navigateur :   http://localhost:'+PORT);
  for(const ip of ips)console.log('  Sur le PC de ton ami (même Wi-Fi)    :   http://'+ip+':'+PORT);
  console.log('\n  Puis : Multijoueur > Créer une partie (toi) / Rejoindre (ton ami).');
  console.log('  Laisse cette fenêtre ouverte pendant la partie. Ctrl+C pour arrêter.\n');}).catch(e=>console.log('Erreur : '+(e.code==='EADDRINUSE'?'le port '+PORT+' est déjà utilisé.':e.message)));
