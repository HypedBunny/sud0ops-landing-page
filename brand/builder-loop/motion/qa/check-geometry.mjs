import assert from 'node:assert/strict';
import fs from 'node:fs';
import {sample,sampleExit,poseAt,MASTER_PATHS,CENTER,BOX,DURATION,PERIOD,TIMES,EXIT_DURATION,svgAt} from '../src/motion.mjs';
assert.deepEqual(sample(0).pieces.map(x=>x.d),MASTER_PATHS);
assert.deepEqual(sample(DURATION).pieces.map(x=>x.d),MASTER_PATHS);
let checked=0;
function inspect(f){
 assert.deepEqual(f.center,CENTER);assert.equal(f.pieces.length,4);
 for(const p of f.pieces)for(const [x,y] of p.points||[]){
  assert(Number.isFinite(x)&&Number.isFinite(y));
  assert(x>BOX[0]&&x<BOX[0]+BOX[2],`x clipped: ${x}`);
  assert(y>BOX[1]&&y<BOX[1]+BOX[3],`y clipped: ${y}`);
 }
 checked++;
}
for(let i=0;i<=640;i++)inspect(sample(i/100));
let exitChecks=0;
for(const t of [.30,.39,.63,.9,1.2,1.52,1.73,2.15,2.56,2.98,3.42,4.15,5.13,8.91,100.13]){
 const origin=poseAt(t,{loading:true}),at=sample(t,{loading:true}),begin=sampleExit(0,origin);
 assert.deepEqual(begin.pieces.map(p=>p.d),at.pieces.map(p=>p.d));
 for(let i=0;i<=60;i++){inspect(sampleExit(EXIT_DURATION*i/60,origin));exitChecks++;}
 assert.deepEqual(sampleExit(EXIT_DURATION,origin).pieces.map(x=>x.d),MASTER_PATHS);
}
const before=sample(2.0,{loading:true}),after=sample(2.0+PERIOD,{loading:true});
assert.deepEqual(before.pieces.map(p=>p.d),after.pieces.map(p=>p.d));
assert.notEqual(sample(2).pieces[0].d,sample(2.11).pieces[0].d);
assert(!svgAt(0).includes('data-trails'));
assert(!svgAt(DURATION).includes('data-trails'));
assert(svgAt(.80).includes('feGaussianBlur'));
assert(!svgAt(2.1).includes('mask='));
const result={status:'pass',checks:{fixed_dot_and_finite_unclipped_geometry_frames:checked,exit_frames:exitChecks,exit_origins:15,start_end_paths:'identical to unchanged master',loop_period_seconds:PERIOD,loop_geometry:'exactly periodic',completion:'no position jump at start; exact master at end',blur:'moving pieces only; absent in locked states',centre_halo:'none'},visual_approval:'Animation still needs user review; numerical checks are not visual approval.'};
fs.writeFileSync(new URL('./geometry-report.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
