from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
source='\n'.join((root/'src'/n).read_text() for n in ['approved-geometry.mjs','rig.mjs','motion.mjs','loader.mjs'])
source=re.sub(r'^import .*?;\n','',source,flags=re.M)
source=re.sub(r'^export \{[^\n]*\};\n','',source,flags=re.M).replace('export ','')
html='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sud0ops - Builder Loop / Spiral motion v3</title><style>
:root{color-scheme:dark;--bg:#0F172A;--panel:#142036;--line:#273449;--blue:#38BDF8;--text:#F8FAFC;--muted:#CBD5E1}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.6 system-ui,sans-serif}main{max-width:1050px;padding:34px 24px;margin:auto}.eyebrow{font:12px/1.6 ui-monospace,monospace;letter-spacing:.15em;color:var(--blue)}h1{font-size:clamp(28px,4vw,48px);line-height:1.1;letter-spacing:-.035em;margin:10px 0 14px}p{color:var(--muted);margin:0 0 20px;max-width:750px}.stage{border:1px solid var(--line);display:grid;place-items:center;background:var(--bg);overflow:hidden}#art{width:min(100%,640px);aspect-ratio:1}#art svg{width:100%;height:100%;display:block}.controls{padding:14px;border:1px solid var(--line);border-top:0;display:flex;gap:8px;flex-wrap:wrap;align-items:center}button,select{font:14px/1.5 system-ui,sans-serif;border:1px solid var(--line);padding:9px 14px;background:var(--panel);color:var(--text);cursor:pointer}button:first-child{background:var(--blue);color:var(--bg)}button:focus-visible,input:focus-visible,select:focus-visible,a:focus-visible{outline:2px solid var(--blue);outline-offset:3px}input{accent-color:var(--blue)}.seek{display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--line);border-top:0}.seek input{flex:1;min-width:0}.seek output,#state{font:12px/1.5 ui-monospace,monospace}#state{color:var(--blue);padding:12px 0 24px}.details{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid var(--line);padding-top:24px}.details h2{font-size:16px;margin:0 0 8px}.details p{font-size:14px}a{color:var(--blue)}.note{font-size:13px;color:var(--muted);border-left:2px solid var(--blue);padding-left:14px;margin:20px 0}.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}@media(max-width:640px){main{padding:24px 16px}.details{grid-template-columns:1fr;gap:8px}.controls{padding:10px}button,select{font-size:12px;padding:8px 10px}}
</style></head><body><main><div class="eyebrow">SUD0OPS / BUILDER LOOP / V3</div><h1>Detach. Spiral. Reassemble.</h1><p>A sharper release and return, with flexible material moving through a figure-eight. The blue centre dot remains fixed.</p><div class="stage"><div id="art" role="img" aria-label="Sud0ops Builder Loop animation"></div></div><div class="controls"><button type="button" id="once">Replay</button><button type="button" id="load">Keep loading</button><button type="button" id="finish">Finish loading</button><button type="button" id="pause">Pause</button><label for="speed" class="sr">Playback speed</label><select id="speed"><option value="1">Real time</option><option value="0.35">Slow motion / 0.35x</option></select><label><input type="checkbox" id="trails" checked> Motion blur</label></div><div class="seek"><label class="sr" for="seek">Scrub one-shot animation</label><input type="range" id="seek" min="0" max="6.4" step="0.01" value="0"><output id="clock">0.00 / 6.40 s</output></div><div id="state" aria-live="polite">01 / RESTING ZERO</div><div class="details"><section><h2>Fast release</h2><p>Four parts detach with angular momentum, curl outward and carry directional trails.</p></section><section><h2>Living figure-eight</h2><p>The parts bend into the symbol itself. They do not orbit it as four rigid tiles.</p></section><section><h2>Exact landing</h2><p>The pieces spiral inward and settle separately. The last frame uses the unchanged source logo paths.</p></section></div><p class="note">Motion review build based on the approved v3 storyboard. Review the animation before deploying. Reduced-motion preferences are respected. No website has been changed.</p><p><a href="reference/approved-storyboard-v3.png">Approved storyboard</a> &nbsp; <a href="exports/builder-loop-spiral-v3.mp4">MP4</a> &nbsp; <a href="guides/AGENT-HANDOVER.md">Agent handover</a></p></main><script>'''
script=r'''
const art=document.getElementById('art'),seek=document.getElementById('seek'),clock=document.getElementById('clock'),label=document.getElementById('state');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let nowTime=0,playing=false,raf=0,last=0,mode='once',origin=null,exitTime=0,lastState='';
const names={'rest':'01 / RESTING ZERO','detach':'02 / AGGRESSIVE DETACH','spiral-out':'03 / SPIRAL RELEASE','form-infinity':'04 / FORM INFINITY','infinity':'05 / CONTINUOUS FLOW','spiral-in':'06 / SPIRAL RETURN','reassemble':'07 / INDIVIDUAL REASSEMBLY','complete':'08 / ORIGINAL ZERO'};
function paint(f,history){
 art.innerHTML=renderFrame(f,{trails:document.getElementById('trails').checked,background:true,history});
 const state=reduced.matches?'REDUCED MOTION / STATIC ZERO':names[f.state];
 if(state!==lastState){label.textContent=state;lastState=state;}
 clock.textContent=`${nowTime.toFixed(2)} / ${DURATION.toFixed(2)} s`;
 seek.value=Math.min(nowTime,DURATION);
}
function renderCurrent(){
 if(reduced.matches){paint(sample(0));return;}
 if(origin)paint(sampleExit(exitTime,origin),past=>past<0?sample(nowTime+past,{loading:true}):sampleExit(past,origin));
 else paint(sample(nowTime,{loading:mode==='loading'}),past=>sample(past,{loading:mode==='loading'}));
}
function tick(n){
 if(!playing)return;
 const dt=Math.min((n-last)/1000,.08)*Number(document.getElementById('speed').value);last=n;
 if(origin){exitTime+=dt;if(exitTime>=EXIT_DURATION){playing=false;nowTime=DURATION;origin=null;mode='once';}}
 else{nowTime+=dt;if(mode==='once'&&nowTime>=DURATION){nowTime=DURATION;playing=false;}}
 renderCurrent();if(playing)raf=requestAnimationFrame(tick);else document.getElementById('pause').textContent='Resume';
}
function start(which){cancelAnimationFrame(raf);mode=which;nowTime=0;origin=null;exitTime=0;playing=!reduced.matches;renderCurrent();last=performance.now();document.getElementById('pause').textContent='Pause';if(playing)raf=requestAnimationFrame(tick);}
document.getElementById('once').onclick=()=>start('once');
document.getElementById('load').onclick=()=>start('loading');
document.getElementById('finish').onclick=()=>{if(origin||nowTime>=DURATION&&mode==='once')return;if(reduced.matches){nowTime=DURATION;renderCurrent();return;}origin=poseAt(nowTime,{loading:mode==='loading'});exitTime=0;if(origin.exact){origin=null;nowTime=DURATION;mode='once';playing=false;renderCurrent();return;}if(!playing){playing=true;last=performance.now();raf=requestAnimationFrame(tick);}};
document.getElementById('pause').onclick=()=>{if(reduced.matches)return;playing=!playing;document.getElementById('pause').textContent=playing?'Pause':'Resume';if(playing){last=performance.now();raf=requestAnimationFrame(tick);}else cancelAnimationFrame(raf);};
seek.oninput=()=>{playing=false;cancelAnimationFrame(raf);origin=null;mode='once';nowTime=Number(seek.value);renderCurrent();document.getElementById('pause').textContent='Resume';};
document.getElementById('trails').onchange=renderCurrent;
reduced.addEventListener('change',()=>{cancelAnimationFrame(raf);playing=false;origin=null;nowTime=0;renderCurrent();});
window.renderAt=(t,options={})=>{playing=false;cancelAnimationFrame(raf);origin=null;nowTime=t;art.innerHTML=svgAt(t,options);return sample(t,options).state;};
window.__motion={sample,sampleExit,poseAt,svgAt,renderFrame,DURATION,TIMES,CENTER,MASTER_PATHS,createBuilderLoopLoader};
renderCurrent();if(!reduced.matches)start('once');
'''
(root/'OPEN-MOTION.html').write_text(html+source+'\n'+script+'</script></body></html>')
print('Built self-contained demo')
