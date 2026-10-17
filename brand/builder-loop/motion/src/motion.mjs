/** Sud0ops Builder Loop v3 - spiral detach / ribbon infinity / spiral return.
 * The four source outlines deform independently. Only the moving material
 * gets motion trails; the centre dot and the locked logo remain unmodified.
 * This is a visual review build; the storyboard is the design authority.
 */
import {RIG} from './rig.mjs';
import {MASTER_PATHS,CENTER} from './approved-geometry.mjs';
export {MASTER_PATHS,CENTER};
export const BLUE='#38BDF8', NAVY='#0F172A';
export const BOX=[-301,-207,1300,1300];
export const TIMES=Object.freeze({hold:.28,detach:.50,spiral:.98,flow:1.52,exit:4.40,return:4.80,lock:5.56,end:6.40});
export const DURATION=TIMES.end, PERIOD=1.44, EXIT_DURATION=1.16;
const clamp=n=>Math.max(0,Math.min(1,n));
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=n=>{n=clamp(n);return n*n*n*(n*(n*6-15)+10);};
const out=n=>1-Math.pow(1-clamp(n),3);
const TAU=Math.PI*2;
const QUADRANT=[2,0,3,1], DIRECTION=[-1,1,-1,1];
const BASE=[-3*Math.PI/4,-Math.PI/4,3*Math.PI/4,Math.PI/4];
const SHIFT=[[-86,-94],[86,-94],[-86,94],[86,94]];
function pth(pts){
 const n=pts.length,fmt=p=>p.map(x=>x.toFixed(3)).join(' ');
 const tangentAt=i=>{
  const a=pts[(i+n-1)%n],b=pts[i],c=pts[(i+1)%n];
  const v=[b[0]-a[0],b[1]-a[1]],w=[c[0]-b[0],c[1]-b[1]];
  const lv=Math.hypot(...v),lw=Math.hypot(...w);
  if(!lv||!lw||(v[0]*w[0]+v[1]*w[1])/(lv*lw)<.65)return [0,0];
  const dir=[c[0]-a[0],c[1]-a[1]],ld=Math.hypot(...dir)||1;
  return dir.map(x=>x/ld*Math.min(lv,lw)/3);
 };
 let d='M'+fmt(pts[0]);
 for(let i=0;i<n;i++){
  const j=(i+1)%n,a=tangentAt(i),b=tangentAt(j);
  d+='C'+fmt([pts[i][0]+a[0],pts[i][1]+a[1]])+' '+fmt([pts[j][0]-b[0],pts[j][1]-b[1]])+' '+fmt(pts[j]);
 }
 return d+'Z';
}
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
const norm=v=>{const m=Math.hypot(...v)||1;return v.map(x=>x/m);};
function sampleSpine(i,u){
  const pts=RIG[i].spine;
  const a=clamp(u)*(pts.length-1),k=Math.min(pts.length-2,Math.floor(a)),f=a-k;
  return {p:[mix(pts[k][0],pts[k+1][0],f),mix(pts[k][1],pts[k+1][1],f)],
    tangent:norm([pts[k+1][0]-pts[k][0],pts[k+1][1]-pts[k][1]])};
}
function bezier(a,b,c,d,t){const q=1-t;return a.map((_,j)=>q*q*q*a[j]+3*q*q*t*b[j]+3*q*t*t*c[j]+t*t*t*d[j]);}
// Smooth infinity curve with round lobes and a definite crossing, sampled
// by arc length so material does not stall at the outside of either loop.
const curves=[
[[0,0],[180,-245],[490,-280],[490,0]],
[[490,0],[490,280],[180,245],[0,0]],
[[0,0],[-180,-245],[-490,-280],[-490,0]],
[[-490,0],[-490,280],[-180,245],[0,0]]
];
const raw=curves.flatMap(c=>Array.from({length:400},(_,k)=>bezier(...c,k/400)));
raw.push(raw[0]);
const lengths=[0];
for(let i=1;i<raw.length;i++) lengths[i]=lengths[i-1]+Math.hypot(raw[i][0]-raw[i-1][0],raw[i][1]-raw[i-1][1]);
const L=lengths.at(-1); let k=0;
const ARC=Array.from({length:1601},(_,i)=>{
 const d=L*i/1600;while(k<raw.length-2&&lengths[k+1]<d) k++;
 const f=(d-lengths[k])/(lengths[k+1]-lengths[k]||1);
 return [mix(raw[k][0],raw[k+1][0],f)+CENTER.x,mix(raw[k][1],raw[k+1][1],f)+CENTER.y];
});
function sampleInfinity(s){
 const a=((s%1+1)%1)*1600,k=Math.floor(a),f=a-k;
 const p=[mix(ARC[k][0],ARC[k+1][0],f),mix(ARC[k][1],ARC[k+1][1],f)];
 const b=ARC[(k+1599)%1600],c=ARC[(k+1)%1600];
 return {p,tangent:norm([c[0]-b[0],c[1]-b[1]])};
}
function target(i,u,phase){
 const dir=DIRECTION[i],gap=14/L;
 const s=QUADRANT[i]/4+gap+(.25-2*gap)*(dir===1?u:1-u)+phase;
 const a=sampleInfinity(s);a.tangent=a.tangent.map(n=>n*dir);return a;
}

// Four independently curling spines. A varying radius creates a spiral,
// not four rigid pieces rotated as one group.
function spiralSpine(i,u,spin){
 const sweep=1.50,angle=BASE[i]+spin+(u-.5)*sweep;
 const r=200+235*u;
 const dx=235*Math.cos(angle)-r*sweep*Math.sin(angle);
 const dy=235*Math.sin(angle)+r*sweep*Math.cos(angle);
 return {p:[CENTER.x+r*Math.cos(angle),CENTER.y+r*Math.sin(angle)],tangent:norm([dx,dy])};
}
function angleMix(a,b,t){return a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;}
// Polar release/return avoids the implosion produced by linearly mixing
// points on opposite sides of a fast orbit. The material actually spirals.
function fieldPosition(i,u,p){
 const a=sampleSpine(i,u),sp=spiralSpine(i,u,0),b=target(i,u,p.phase);
 const av=[a.p[0]+SHIFT[i][0]*p.det-CENTER.x,a.p[1]+SHIFT[i][1]*p.det-CENTER.y];
 const sv=[sp.p[0]-CENTER.x,sp.p[1]-CENTER.y];
 const v=p.b<.999999?clamp(p.s/(1-p.b)):1;
 const ar=Math.hypot(...av),sr=Math.hypot(...sv);
 const aa=Math.atan2(av[1],av[0]),sa=Math.atan2(sv[1],sv[0]);
 const angle=angleMix(aa,sa,v)+p.spin,r=mix(ar,sr,v);
 return [mix(CENTER.x+r*Math.cos(angle),b.p[0],p.b),mix(CENTER.y+r*Math.sin(angle),b.p[1],p.b)];
}
function field(i,u,p){
 const pos=fieldPosition(i,u,p),lo=Math.max(0,u-.001),hi=Math.min(1,u+.001);
 const a=fieldPosition(i,lo,p),b=fieldPosition(i,hi,p),t=norm([b[0]-a[0],b[1]-a[1]]);
 return {x:pos[0],y:pos[1],tx:t[0],ty:t[1],q:clamp(p.s+p.b)};
}
function vertex(i,u,along,across,p){
 const f=field(i,u,p),q=f.q;
 const centerPortion=Math.min(1,Math.min(u,1-u)/.05);
 const acrossMaterial=mix(across,Math.sign(across)*64,q*centerPortion);
 const width=mix(1,mix(.91,.78,p.b),q);
 const taper=1-.13*p.s*(1-u);
 const l=along*(1-.82*q),w=acrossMaterial*width*taper;
 return [f.x+l*f.tx-w*f.ty,f.y+l*f.ty+w*f.tx];
}
function piece(i,p){
 const points=RIG[i].uv.map(([u,l,w])=>vertex(i,u,l,w,p));
 const start=vertex(i,0,0,0,p),end=vertex(i,1,0,0,p);
 // A slender highlight follows each bent material piece, not a static glow.
 const line=Array.from({length:42},(_,j)=>vertex(i,.08+.84*j/41,0,-31,p));
 return {id:i,d:pth(points),points,start,end,line};
}
const restPose=()=>({s:0,b:0,spin:0,phase:0,det:0});
export function poseAt(time,{loading=false}={}){
 const t=Math.max(0,Number(time)||0),T=TIMES;
 if(t<=T.hold)return {state:'rest',pose:restPose(),exact:true};
 if(t<T.detach){const k=(t-T.hold)/(T.detach-T.hold);return {state:'detach',pose:{s:.45*smooth(k),b:0,spin:.80*out(k),phase:0,det:out(k)},exact:false};}
 if(t<T.spiral){const k=(t-T.detach)/(T.spiral-T.detach);return {state:'spiral-out',pose:{s:mix(.45,1,smooth(k)),b:0,spin:mix(.80,TAU,smooth(k)),phase:0,det:1},exact:false};}
 if(t<T.flow){const k=(t-T.spiral)/(T.flow-T.spiral),b=smooth(k);return {state:'form-infinity',pose:{s:1-b,b,spin:TAU,phase:-(1-k)*.18,det:0},exact:false};}
 if(loading||t<T.exit)return {state:'infinity',pose:{s:0,b:1,spin:0,phase:(t-T.flow)/PERIOD,det:0},exact:false};
 if(t<T.lock)return exitPose(t-T.exit,{state:'infinity',pose:{s:0,b:1,spin:0,phase:(T.exit-T.flow)/PERIOD,det:0},exact:false});
 return {state:'complete',pose:restPose(),exact:true};
}
// Completion is also supported at arbitrary phases. The departure geometry
// is captured, then its four ribbons curl inward instead of cross-fading.
export function exitPose(elapsed,origin){
 const e=Math.max(0,Number(elapsed)||0);
 if(e>=EXIT_DURATION)return {state:'complete',pose:restPose(),exact:true};
 if(e<.40){
  const k=e/.40,v=smooth(k),from=origin.pose;
  return {state:'spiral-in',pose:{s:mix(from.s,1,v),b:from.b*(1-v),spin:mix(from.spin,.85,v),phase:from.phase+(e-e*e/.8)/PERIOD,det:from.det*(1-v)},exact:false};
 }
 const k=(e-.40)/.76;
 return {state:'reassemble',pose:{s:1-smooth(k),b:0,spin:mix(.85,TAU,out(k)),phase:origin.pose.phase,det:0},exact:false,settle:k};
}
function frameFrom(p,t){
 const f={...p,t,center:{...CENTER}};
 f.q=clamp(p.pose.s+p.pose.b);
 // Tiny per-piece return delays make the four separate landings legible.
 f.pieces=p.exact?MASTER_PATHS.map((d,i)=>({id:i,d})):RIG.map((_,i)=>{
  let params=p.pose;
  if(p.state==='reassemble'){
   const stagger=[0,.022,.044,.066][i];
   const k=clamp((p.settle-stagger)/(1-stagger));
   params={...params,s:1-smooth(k),spin:mix(.85,TAU,out(k))};
  }
  return piece(i,params);
 });
 return f;
}
export function sample(time,options={}){return frameFrom(poseAt(time,options),Math.max(0,Number(time)||0));}
export function sampleExit(elapsed,origin){return frameFrom(exitPose(elapsed,origin),elapsed);}
const fmt=n=>Number(n).toFixed(3),alpha=n=>clamp(n).toFixed(4);
function openPath(points){return 'M'+points.map(p=>p.map(fmt).join(' ')).join('L');}
export function renderFrame(f,{background=true,trails=true,quality='full',history=null,idPrefix='blv3'}={}){
 const prefix=String(idPrefix).replace(/[^a-zA-Z0-9_-]/g,'')||'blv3';
 const at=history||((t)=>sample(t));
 const motion=!f.exact;
 const speed=f.state==='infinity'?.62:f.state==='detach'?1:1.15;
 const filters=motion&&trails?`<filter id="${prefix}-blur" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${fmt(3.5*speed)}"/></filter>`:'';
 const grads=f.pieces.map((p,i)=>{
  if(!p.start||!f.q)return '';
  const a=DIRECTION[i]===1?p.start:p.end,b=DIRECTION[i]===1?p.end:p.start;
  return `<linearGradient id="${prefix}-shade-${i}" gradientUnits="userSpaceOnUse" x1="${fmt(a[0])}" y1="${fmt(a[1])}" x2="${fmt(b[0])}" y2="${fmt(b[1])}"><stop offset="0" stop-color="${NAVY}" stop-opacity="${alpha(.73*f.q)}"/><stop offset=".55" stop-color="${NAVY}" stop-opacity="${alpha(.22*f.q)}"/><stop offset="1" stop-color="${NAVY}" stop-opacity="0"/></linearGradient>`;
 }).join('');
 let tail='';
 if(motion&&trails){
  const count=quality==='low'?3:7;
  const ghosts=[];
  for(let j=count;j>=1;j--){
   const dt=j*.016*speed,prior=at(f.t-dt);
   if(prior.exact)continue;
   const a=.14*Math.exp(-j*.24);
   ghosts.push(`<g opacity="${alpha(a)}">${prior.pieces.map(p=>`<path d="${p.d}"/>`).join('')}</g>`);
  }
  tail=`<g data-trails="true" fill="${BLUE}" filter="url(#${prefix}-blur)">${ghosts.join('')}</g>`;
 }
 const main=f.pieces.map((p,i)=>`<g><path data-piece="${i}" d="${p.d}" fill="${BLUE}"/>${p.start&&f.q?`<path d="${p.d}" fill="url(#${prefix}-shade-${i})"/>`:''}${p.line&&f.q>.08?`<path d="${openPath(p.line)}" fill="none" stroke="#F8FAFC" stroke-width="1.8" stroke-opacity="${alpha(.12*f.q)}"/>`:''}</g>`).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="${BOX.join(' ')}" role="img" aria-label="Sud0ops Builder Loop loading animation"><title>Sud0ops Builder Loop - spiral motion v3</title>${background?`<rect x="${BOX[0]}" y="${BOX[1]}" width="${BOX[2]}" height="${BOX[3]}" fill="${NAVY}"/>`:''}<defs>${filters}${grads}</defs>${tail}<g data-material="true">${main}</g><circle data-center="true" cx="${CENTER.x}" cy="${CENTER.y}" r="${CENTER.r}" fill="${BLUE}"/></svg>`;
}
export function svgAt(time,options={}){
 const f=sample(time,options);
 return renderFrame(f,{...options,history:t=>sample(t,options)});
}
