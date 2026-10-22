// ===== Real soundtrack files per anime (falls back to the generated score when an anime has none) =====
const TRACKS={dbz:['dbz_battle_01.ogg','dbz_battle_02.ogg','dbz_battle_03.ogg','dbz_battle_04.ogg','dbz_battle_26.ogg'],mha:['you_say_run.ogg'],aot:[],sl:['arise.mp3','beru_theme.mp3','dark_aria.mp3','opening_level.mp3','statue_of_god.mp3'],opm:['the_hero_opening.ogg','seigi_shikkou.ogg'],
  hxh:['hxh_boys_be_courageous.ogg','hxh_legend_of_martial_artist.ogg','hxh_marionette_life.ogg','hxh_mosa_domo_no_heigei.ogg','hxh_opening.ogg']};
const FMUS={el:null,fac:null,list:[],i:0,fadeT:null,failed:new Set()};
const fmVol=()=>muted?0:VOL.master*VOL.music;
function fmFade(to,ms,done){const el=FMUS.el;if(!el){if(done)done();return;}clearInterval(FMUS.fadeT);const from=el.volume,t0=performance.now();
  FMUS.fadeT=setInterval(()=>{const p=Math.min(1,(performance.now()-t0)/ms);el.volume=Math.max(0,Math.min(1,from+(to-from)*p));if(p>=1){clearInterval(FMUS.fadeT);if(done)done();}},40);}
function fmPlay(){const f=FMUS.fac,name=FMUS.list[FMUS.i%FMUS.list.length];if(!name)return;const el=FMUS.el||(FMUS.el=new Audio());
  el.onended=()=>{FMUS.i++;fmPlay();};el.onerror=()=>{FMUS.failed.add(name);FMUS.list=FMUS.list.filter(n=>n!==name);if(FMUS.list.length)fmPlay();else{fmStop();setMusic('battle');}};
  el.src='music/'+name;el.volume=0;const p=el.play();if(p&&p.catch)p.catch(()=>{});fmFade(fmVol(),1500);}
function fmStart(fac){const L=(TRACKS[fac]||[]).filter(n=>!FMUS.failed.has(n));if(!L.length)return false;if(FMUS.fac===fac&&FMUS.el&&!FMUS.el.paused)return true;
  FMUS.fac=fac;FMUS.list=L.slice().sort(()=>Math.random()-.5);FMUS.i=0;fmPlay();return true;}
function fmStop(){if(!FMUS.el)return;const el=FMUS.el;FMUS.fac=null;fmFade(0,700,()=>{if(!FMUS.fac)el.pause();});}
{const _sm=setMusic;setMusic=function(name){const fac=sides[PL]&&sides[PL].fac;
  if(name==='battle'&&G.state==='play'&&AC&&fmStart(fac)){MUS.song=null;MUS.name='battle';startAmbient();return;}
  fmStop();if(name==='battle'&&MUS.name==='battle'&&!MUS.song)MUS.name='';_sm(name);};}
{const _st=stopMusic;stopMusic=function(){fmStop();_st();};}
{const _av=applyVol;applyVol=function(){_av();if(FMUS.el&&FMUS.fac)FMUS.el.volume=fmVol();};}
