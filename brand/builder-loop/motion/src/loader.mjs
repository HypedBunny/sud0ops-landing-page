/** Minimal client-side adapter. No framework or animation-library dependency. */
import {sample,sampleExit,poseAt,renderFrame,DURATION,EXIT_DURATION} from './motion.mjs';
let serial=0;
export function createBuilderLoopLoader(host,{
 mode='loading',size=240,trails=true,quality='full',onComplete=()=>{},label='Loading'
}={}){
 if(!host||host.nodeType!==1)throw new TypeError('A dedicated host element is required.');
 if(!['loading','once'].includes(mode))throw new TypeError('mode must be loading or once.');
 if(!Number.isFinite(size)||size<16)throw new RangeError('size must be at least 16 CSS pixels.');
 if(!['full','low'].includes(quality))throw new TypeError('quality must be full or low.');
 if(typeof onComplete!=='function')throw new TypeError('onComplete must be a function.');
 const stage=document.createElement('div');
 stage.style.cssText=`width:${size}px;max-width:100%;aspect-ratio:1;line-height:0`;
 stage.setAttribute('role','status');stage.setAttribute('aria-label',label);
 host.append(stage);
 const prefix=`sud0ops-v3-${++serial}`;
 const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
 let raf=0,disposed=false,done=false,origin=null,originTime=0,exitStart=0;
 let start=performance.now(),lastPaint=-Infinity,hiddenAt=0;
 const options={background:false,trails,quality,idPrefix:prefix};
 function paint(f,history){
  if(disposed)return;
  stage.innerHTML=renderFrame(f,{...options,history});
  const svg=stage.firstElementChild;
  svg.style.cssText='display:block;width:100%;height:100%';
  svg.setAttribute('aria-hidden','true');svg.removeAttribute('role');
 }
 function finish(){
  if(done||disposed)return;
  done=true;cancelAnimationFrame(raf);raf=0;
  paint(sample(DURATION));stage.setAttribute('aria-label','Loaded');
  queueMicrotask(()=>{if(!disposed)onComplete();});
 }
 function draw(now){
  raf=0;if(disposed||done||mq.matches||document.hidden)return;
  const t=(now-start)/1000;
  if(now-lastPaint>=1000/30-1){
   lastPaint=now;
   if(origin){
    const e=(now-exitStart)/1000;
    if(e>=EXIT_DURATION){finish();return;}
    paint(sampleExit(e,origin),past=>past<0?sample(originTime+past,{loading:mode==='loading'}):sampleExit(past,origin));
   }else{
    if(mode==='once'&&t>=DURATION){finish();return;}
    paint(sample(t,{loading:mode==='loading'}),past=>sample(past,{loading:mode==='loading'}));
   }
  }
  raf=requestAnimationFrame(draw);
 }
 function complete(){
  if(disposed||done||origin)return;
  if(mq.matches||document.hidden){finish();return;}
  const now=performance.now();originTime=(now-start)/1000;
  const current=poseAt(originTime,{loading:mode==='loading'});
  if(mode==='once'&&['spiral-in','reassemble'].includes(current.state))return;
  origin=current;exitStart=now;
  if(origin.exact){finish();return;}
  if(!raf&&!document.hidden)raf=requestAnimationFrame(draw);
 }
 function motionChange(){
  cancelAnimationFrame(raf);raf=0;
  if(mq.matches){paint(sample(0));if(origin||mode==='once')finish();}
  else if(!done&&!disposed){start=performance.now();origin=null;lastPaint=-Infinity;raf=requestAnimationFrame(draw);}
 }
 function visibilityChange(){
  const now=performance.now();
  if(document.hidden){hiddenAt=now;cancelAnimationFrame(raf);raf=0;}
  else if(!disposed&&!done&&!mq.matches){
   if(hiddenAt){const dt=now-hiddenAt;start+=dt;if(origin)exitStart+=dt;hiddenAt=0;}
   if(!raf)raf=requestAnimationFrame(draw);
  }
 }
 mq.addEventListener('change',motionChange);
 document.addEventListener('visibilitychange',visibilityChange);
 paint(sample(0));
 if(!mq.matches)raf=requestAnimationFrame(draw);else if(mode==='once')queueMicrotask(finish);
 return Object.freeze({complete,destroy(){
  if(disposed)return;disposed=true;cancelAnimationFrame(raf);raf=0;
  mq.removeEventListener('change',motionChange);document.removeEventListener('visibilitychange',visibilityChange);stage.remove();
 },get finished(){return done;}});
}
