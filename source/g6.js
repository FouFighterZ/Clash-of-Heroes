// ===== Audio engine: procedural anime-style music + layered sound effects =====
const $=s=>document.querySelector(s);
let AC=null,master=null,musicBus=null,sfxBus=null,revSend=null,dlySend=null,noiseBuf=null,distCurve=null,muted=false;
const VOL={master:.8,music:.5,sfx:.8,voice:true};
try{Object.assign(VOL,JSON.parse(localStorage.getItem('clash-vol')||'{}'));}catch(_){}
function saveVol(){try{localStorage.setItem('clash-vol',JSON.stringify(VOL));}catch(_){}}
function applyVol(){if(!AC)return;master.gain.value=muted?0:VOL.master;musicBus.gain.value=VOL.music*.55;sfxBus.gain.value=VOL.sfx;}
function audioInit(){if(AC){if(AC.state==='suspended')AC.resume();return;}
  try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){AC=null;return;}
  master=AC.createGain();const comp=AC.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;master.connect(comp);comp.connect(AC.destination);
  musicBus=AC.createGain();sfxBus=AC.createGain();musicBus.connect(master);sfxBus.connect(master);
  // reverb (generated impulse) + echo for the lead
  const conv=AC.createConvolver(),len=AC.sampleRate*2.2,ir=AC.createBuffer(2,len,AC.sampleRate);
  for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(R()*2-1)*Math.pow(1-i/len,3);}conv.buffer=ir;
  revSend=AC.createGain();revSend.gain.value=.35;revSend.connect(conv);conv.connect(musicBus);
  const dl=AC.createDelay(1),fb=AC.createGain();dl.delayTime.value=.3;fb.gain.value=.32;dlySend=AC.createGain();dlySend.gain.value=.28;dlySend.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(musicBus);
  noiseBuf=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const nd=noiseBuf.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=R()*2-1;
  distCurve=new Float32Array(1024);for(let i=0;i<1024;i++){const x=i/512-1;distCurve[i]=Math.tanh(x*4);}
  applyVol();setMusic(G.state==='play'?'battle':'menu');}
const mtof=m=>440*Math.pow(2,(m-69)/12);
function env(g,t,a,peak,d,sus,rel,dur){g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(peak,t+a);
  g.gain.setTargetAtTime(peak*sus,t+a,d);g.gain.setTargetAtTime(0.0001,t+dur,rel);}
function osc(type,f,t,dur,dest){const o=AC.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);o.connect(dest);o.start(t);o.stop(t+dur);return o;}
function gainTo(dest,v){const g=AC.createGain();g.gain.value=v;g.connect(dest);return g;}
// ---- SFX primitives (routed to sfx bus) ----
function tone(type,f1,f2,dur,vol,delay,dest){const t=AC.currentTime+(delay||0),g=AC.createGain();g.connect(dest||sfxBus);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0005,t+dur);
  const o=osc(type,f1,t,dur+.05,g);o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+dur);return o;}
function noise(dur,vol,f1,f2,q,delay,type,dest){const t=AC.currentTime+(delay||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;s.loop=true;f.type=type||'lowpass';f.Q.value=q||1;
  f.frequency.setValueAtTime(f1,t);f.frequency.exponentialRampToValueAtTime(Math.max(40,f2),t+dur);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0005,t+dur);
  s.connect(f);f.connect(g);g.connect(dest||sfxBus);s.start(t);s.stop(t+dur+.05);}
function chime(notes,step,vol,type){notes.forEach((m,i)=>tone(type||'triangle',mtof(m),mtof(m)*1.002,.5,vol,i*step));}
const sfxT={};
function sfx(k,x,y){if(!AC||muted)return;let v=1;
  if(x!==undefined&&G.state==='play'){const vw=cam.vw(),vh=cam.vh(),d=hyp(x-(cam.x+vw/2),y-(cam.y+vh/2));v=clamp(1.25-d/(Math.max(vw,vh)*.85),0,1);if(v<.05)return;}
  const now=AC.currentTime,gap={mg:.05,ki:.05,zap:.06,punch:.05,hit:.05,'boom-s':.07,heal:.25,coin:1.2}[k]||.04;if(sfxT[k]&&now-sfxT[k]<gap)return;sfxT[k]=now;
  switch(k){
  case'ki':tone('sine',380,1100,.14,.07*v);tone('sine',90,60,.12,.1*v);noise(.1,.05*v,5000,1200,1,0,'bandpass');break;
  case'zap':tone('square',1400,300,.12,.04*v);noise(.1,.05*v,8000,3000,2,0,'bandpass');break;
  case'mg':for(let i=0;i<3;i++){noise(.05,.09*v,3500,900,1,i*.05);tone('square',160,80,.04,.03*v,i*.05);}break;
  case'cannon':tone('sine',120,40,.4,.35*v);noise(.35,.3*v,1800,120);break;
  case'missile':noise(.5,.14*v,800,3000,2,0,'bandpass');tone('sawtooth',200,600,.3,.03*v);break;
  case'explo':noise(.25,.22*v,2500,200);tone('sine',140,50,.2,.15*v);break;
  case'flame':noise(.3,.14*v,1200,500,.7,0,'bandpass');break;
  case'punch':tone('sine',110,38,.16,.4*v);noise(.07,.2*v,2500,500,1);break;
  case'hit':noise(.08,.15*v,3000,800);tone('square',180,90,.06,.04*v);break;
  case'boom-s':noise(.32,.24*v,1600,120);tone('sine',90,40,.25,.18*v);break;
  case'boom':noise(.8,.42*v,1400,60);tone('sine',80,30,.6,.34*v);noise(.6,.08*v,7000,2000,1,.05,'highpass');break;
  case'big':noise(1.3,.5*v,2400,45,2);tone('sine',65,25,1.1,.42*v);noise(.9,.12*v,8000,1500,1,.08,'highpass');break;
  case'beam':tone('sawtooth',110,420,1.1,.1*v);tone('sawtooth',113,430,1.1,.08*v);noise(1.3,.32*v,5000,700,1.5);tone('sine',55,40,1.2,.3*v);break;
  case'charge':tone('sawtooth',110,620,1.05,.06*v);tone('sine',220,1240,1.05,.05*v);for(let i=0;i<8;i++)tone('triangle',1200+i*180,1600+i*180,.08,.025*v,i*.12);break;
  case'charge-s':tone('triangle',220,880,.5,.08*v);break;
  case'whoosh':noise(.4,.3*v,5000,350,3,0,'bandpass');break;
  case'smash':tone('sine',90,30,.5,.45*v);noise(.7,.45*v,3000,80,1.5);noise(.5,.2*v,600,3000,4,0,'bandpass');break;
  case'ice':noise(.5,.2*v,7000,2500,4,0,'highpass');for(let i=0;i<6;i++)tone('triangle',2000+R()*2500,1800,.25,.05*v,i*.05);break;
  case'disc':{const o=tone('sawtooth',900,1300,1,.04*v);noise(.9,.07*v,6000,3000,8,0,'bandpass');break;}
  case'lift':tone('sine',300,1100,.7,.12*v);tone('triangle',600,2200,.7,.04*v);chime([84,88,91],.07,.05*v);break;
  case'heal':chime([79,83,86],.06,.035*v,'sine');break;
  case'rankup':tone('sawtooth',147,147,.6,.06);tone('sawtooth',220,220,.6,.05,.05);tone('sawtooth',294,294,.7,.05,.1);noise(.5,.08,4000,800,1);break;
  case'dball':chime([84,88,91,96,100],.06,.06,'sine');tone('sine',2000,3000,.4,.03,.3);break;
  case'transform':tone('sawtooth',80,320,1.2,.12*v);noise(1.2,.3*v,800,4000,2,0,'bandpass');for(let i=0;i<5;i++)noise(.06,.12*v,9000,4000,1,.2+i*.18,'highpass');break;
  case'shenron':tone('sawtooth',45,38,3,.22);tone('sawtooth',46,39,3,.18);noise(3,.25,300,80,1);for(let i=0;i<4;i++)noise(.15,.3,9000,3000,1,.4+i*.7,'highpass');break;
  case'super':tone('sawtooth',100,800,2.4,.08);tone('sine',200,1600,2.4,.06);noise(2.4,.12,300,6000,3,0,'bandpass');break;
  case'ko':tone('square',520,110,.35,.05*v);break;
  case'place':noise(.25,.25*v,900,200);tone('square',150,110,.12,.07*v);noise(.08,.1*v,4000,2000,2,.15,'bandpass');noise(.08,.1*v,4000,2000,2,.25,'bandpass');break;
  case'sell':chime([84,79,76],.06,.06,'triangle');break;
  case'coin':chime([76,83],.05,.025,'triangle');break;
  case'ready':tone('sawtooth',147,147,.35,.06);tone('sawtooth',220,220,.45,.05,.12);noise(.3,.05,600,200);break;
  case'alert':for(let i=0;i<3;i++){tone('sawtooth',110,104,.32,.11,i*.42);tone('sawtooth',165,156,.32,.06,i*.42);}break;
  case'click':tone('square',420,260,.035,.04);noise(.03,.04,3000,1500,2,0,'bandpass');break;
  case'hover':tone('sine',900,800,.02,.012);break;
  case'tab':tone('sine',180,90,.12,.12);noise(.05,.05,2500,800,1);break;
  case'err':tone('sawtooth',120,90,.18,.07);break;
  case'event':tone('sawtooth',73,73,2.2,.14);tone('sawtooth',110,110,2.2,.1,.15);noise(2.4,.2,300,60,1);for(let i=0;i<3;i++)noise(.4,.25,800,80,1,i*.55);break;
  case'loot':chime([69,76,81,88],.06,.06,'triangle');tone('sine',220,440,.4,.08);break;
  case'win':tone('sawtooth',147,147,2.5,.08);tone('sawtooth',220,220,2.5,.07,.2);tone('sawtooth',294,294,2.5,.06,.4);tone('sawtooth',370,370,2.5,.05,.6);tone('sine',73,73,2.5,.2);break;
  case'lose':tone('sawtooth',110,55,3,.1);tone('sawtooth',131,65,3,.08,.3);noise(3,.1,400,60,1);break;
  }}
// ---- Voice announcer (browser speech, French) ----
let lastVoice=0;
function announce(t){if(!VOL.voice||muted||!window.speechSynthesis)return;const now=performance.now();if(now-lastVoice<2200)return;lastVoice=now;
  try{const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';u.rate=.94;u.pitch=.55;u.volume=Math.min(1,VOL.master*VOL.sfx*1.2);const v=speechSynthesis.getVoices().find(v=>/^fr/i.test(v.lang));if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(_){}}

// ---- Music: dark cinematic step sequencer (D minor), taiko, choir, strings, brass; intensity follows the fighting ----
const SONGS={
  menu:{bpm:84,prog:[[50,53,57],[46,50,53],[43,46,50],[45,49,52]],len:64,style:'menu',
    mel:[[0,74,8],[8,72,4],[12,69,4],[16,70,12],[28,69,4],[32,67,8],[40,70,8],[48,69,16]]},
  battle:{bpm:132,prog:[[50,53,57],[46,50,53],[43,46,50],[45,49,52]],len:128,style:'battle',
    mel:[[0,69,6],[6,74,2],[8,72,4],[12,74,4],[16,77,6],[22,76,2],[24,74,8],[32,70,6],[38,72,2],[40,74,4],[44,77,4],[48,76,8],[56,73,8],
      [64,74,4],[68,77,4],[72,81,8],[80,79,4],[84,77,4],[88,74,8],[96,79,6],[102,77,2],[104,74,4],[108,72,4],[112,73,8],[120,76,4],[124,73,4]]},
  shenron:{bpm:66,prog:[[38,41,45],[34,38,41],[36,40,43],[33,37,40]],len:64,style:'myst',
    mel:[[0,62,8],[8,65,8],[16,64,6],[22,62,2],[24,60,8],[32,57,8],[40,60,8],[48,61,16]]},
};
const MUS={song:null,next:0,step:0,timer:null,int:.3,target:.3};let ambient=null;
function setMusic(name){if(!AC)return;if(MUS.song===SONGS[name])return;MUS.song=SONGS[name];MUS.step=0;MUS.next=AC.currentTime+.08;MUS.name=name;
  if(!MUS.timer)MUS.timer=setInterval(schedMusic,25);if(name!=='menu')startAmbient();else stopAmbient();}
function stopMusic(){MUS.song=null;stopAmbient();}
function startAmbient(){if(ambient||!AC)return;const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();
  s.buffer=noiseBuf;s.loop=true;f.type='lowpass';f.frequency.value=360;f.Q.value=.7;g.gain.value=.05;l.frequency.value=.09;lg.gain.value=.035;l.connect(lg);lg.connect(g.gain);
  s.connect(f);f.connect(g);g.connect(sfxBus);s.start();l.start();ambient={s,l};}
function stopAmbient(){if(!ambient)return;try{ambient.s.stop();ambient.l.stop();}catch(_){}ambient=null;}
function schedMusic(){if(!AC||!MUS.song)return;if(G.state==='play'){const hot=gtime-(G.combat||-99)<7;MUS.target=hot?1:.3;}else MUS.target=.6;
  MUS.int+=(MUS.target-MUS.int)*.02;
  while(MUS.next<AC.currentTime+.15){playStep(MUS.song,MUS.step,MUS.next);MUS.next+=60/MUS.song.bpm/4;MUS.step++;}}
function playStep(S,s,t){const st=s%16,bar=Math.floor(s/16)%S.prog.length,ch=S.prog[bar],sd=60/S.bpm/4,I=MUS.int,ms=s%S.len,fac=sides[PL]&&sides[PL].fac;
  if(S.style==='battle'){
    if(st===0){taiko(t,.55,55);if(bar===0&&I>.6)crash(t,.08);}
    if(I>.45&&(st===3||st===6||st===10||st===11))taiko(t,.32+.2*I,st===10?62:75);
    if(I>.7&&(st===14||st===15))taiko(t,.25,95);
    if(st===8)taiko(t,.45,50);if((st===4||st===12)&&I>.55)snare(t,.18*I);if(I>.6&&st%2===0)hat(t,.03,false);
    if(st%2===0)bassN(t,ch[0]-12+(st%8===6?12:0),sd*1.7,.2);
    strings(t,ch[[0,1,2,1][st%4]]+12+(st>=8?(st%4===2?12:0):0),sd*.9,.035+.03*I);
    if(st===0)choir(t,ch.map(n=>n+12),sd*16,.05+.02*(1-I));
    if(I>.55)for(const[p,n,l]of S.mel)if(p===ms)horn(t,n-12,l*sd,.09*Math.min(1,I*1.15),fac);}
  else if(S.style==='menu'){
    if(st===0)taiko(t,.4,52);if(st===10)taiko(t,.25,60);if(st===0)choir(t,ch.map(n=>n+12),sd*16,.07);
    if(st%2===0)pianoN(t,ch[(st/2)%3]+24,.05);if(st===0||st===8)bassN(t,ch[0]-12,sd*7,.16);
    for(const[p,n,l]of S.mel)if(p===ms)horn(t,n-12,l*sd,.07,'menu');}
  else{if(st===0){choir(t,ch.map(n=>n+12),sd*16,.09);taiko(t,.35,40);}if(st%4===0)pianoN(t,ch[(st/4)%3]+24,.04);if(st===0)bassN(t,ch[0],sd*14,.18);
    for(const[p,n,l]of S.mel)if(p===ms)horn(t,n,l*sd,.06,'menu');}}
function taiko(t,v,f){const g=AC.createGain();g.connect(musicBus);g.connect(revSend);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.6);
  const o=osc('sine',f*2.2,t,.65,g);o.frequency.exponentialRampToValueAtTime(f*.8,t+.18);
  const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g2=AC.createGain();s.buffer=noiseBuf;fl.type='lowpass';fl.frequency.value=900;g2.gain.setValueAtTime(v*.5,t);g2.gain.exponentialRampToValueAtTime(.001,t+.12);s.connect(fl);fl.connect(g2);g2.connect(musicBus);s.start(t);s.stop(t+.15);}
function kick(t,v){taiko(t,v,55);}
function snare(t,v){const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;f.type='bandpass';f.frequency.value=1500;f.Q.value=.7;
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);s.connect(f);f.connect(g);g.connect(musicBus);g.connect(revSend);s.start(t);s.stop(t+.25);}
function hat(t,v,open){const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;f.type='highpass';f.frequency.value=8000;
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+(open?.2:.04));s.connect(f);f.connect(g);g.connect(musicBus);s.start(t);s.stop(t+.25);}
function crash(t,v){const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;f.type='highpass';f.frequency.value=3500;
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+2);s.connect(f);f.connect(g);g.connect(musicBus);g.connect(revSend);s.start(t);s.stop(t+2.1);}
function bassN(t,m,d,v){const f=AC.createBiquadFilter(),g=AC.createGain(),sh=AC.createWaveShaper();sh.curve=distCurve;f.type='lowpass';f.Q.value=3;f.frequency.setValueAtTime(900,t);f.frequency.exponentialRampToValueAtTime(220,t+d);
  g.gain.setValueAtTime(v,t);g.gain.setTargetAtTime(.0001,t+d*.9,.05);sh.connect(f);f.connect(g);g.connect(musicBus);osc('sawtooth',mtof(m),t,d+.2,gainTo(sh,.5));osc('sine',mtof(m)/2,t,d+.2,gainTo(g,.9));}
function strings(t,m,d,v){const f=AC.createBiquadFilter(),g=AC.createGain();f.type='lowpass';f.frequency.value=2200;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+d+.08);
  f.connect(g);g.connect(musicBus);g.connect(revSend);for(const det of[-8,8]){const o=osc('sawtooth',mtof(m),t,d+.12,f);o.detune.value=det;}}
function choir(t,ms,d,v){const g=AC.createGain();g.connect(musicBus);g.connect(revSend);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.6);g.gain.setTargetAtTime(.0001,t+d-.2,.35);
  for(const fr of[700,1150]){const bp=AC.createBiquadFilter();bp.type='bandpass';bp.frequency.value=fr;bp.Q.value=5;bp.connect(g);
    for(const m of ms)for(const det of[-10,0,10]){const o=osc('sawtooth',mtof(m),t,d+1,bp);o.detune.value=det;}}}
function pianoN(t,m,v){const g=AC.createGain();g.connect(musicBus);g.connect(revSend);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+1.2);osc('triangle',mtof(m),t,1.25,g);osc('sine',mtof(m)*2,t,.6,gainTo(g,.25));}
function horn(t,m,d,v,fac){const g=AC.createGain(),f=AC.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(500,t);f.frequency.linearRampToValueAtTime(fac==='dbz'?2600:1900,t+.12);f.frequency.setTargetAtTime(1300,t+.15,.3);
  f.connect(g);g.connect(musicBus);g.connect(revSend);g.connect(dlySend);env(g,t,.06,v,.3,.85,.12,d);
  const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=5;lg.gain.value=5;lfo.connect(lg);lfo.start(t+.2);lfo.stop(t+d+.4);
  if(fac==='dbz'){const sh=AC.createWaveShaper();sh.curve=distCurve;sh.connect(f);for(const det of[-5,5]){const o=osc('sawtooth',mtof(m+12),t,d+.4,gainTo(sh,.5));o.detune.value=det;lg.connect(o.frequency);}}
  else for(const det of[-7,0,7]){const o=osc('sawtooth',mtof(m+12),t,d+.4,f);o.detune.value=det;lg.connect(o.frequency);}
  osc('sawtooth',mtof(m),t,d+.4,gainTo(f,.5));}
