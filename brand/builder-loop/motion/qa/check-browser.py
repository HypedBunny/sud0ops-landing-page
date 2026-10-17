from pathlib import Path
from playwright.sync_api import sync_playwright
import json,time,os,shutil
root=Path(__file__).resolve().parents[1]
html=(root/'OPEN-MOTION.html').read_text()
errors=[];checks=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium') or p.chromium.executable_path,args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1200,'height':1000})
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(html);page.evaluate('renderAt(.80)')
 page.screenshot(path=str(root/'qa/browser-desktop.png'),full_page=True)
 checks.append({'name':'standalone script execution','pass':True,'test_method':'HTML injected via set_content; file URL navigation restricted in test environment'})
 perf=page.evaluate('''()=>{const x=[];for(let j=0;j<15;j++){const t=performance.now();renderAt(2+j*.05);x.push(performance.now()-t);}return {mean_ms:x.reduce((a,b)=>a+b)/x.length,max_ms:Math.max(...x)};}''')
 # Isolate client adapter from demo playback, track its callback and cleanup.
 page.evaluate('''()=>{document.querySelector('main').style.display='none';let host=document.createElement('div');host.id='test';document.body.append(host);window.finishedCount=0;window.loader=__motion.createBuilderLoopLoader(document.querySelector('#test'),{size:240,quality:'low',onComplete:()=>window.finishedCount++});}''')
 page.wait_for_timeout(620)
 page.evaluate('loader.complete();loader.complete()')
 page.wait_for_timeout(1400)
 got=page.evaluate('''()=>({done:loader.finished,count:finishedCount,paths:Array.from(document.querySelectorAll('#test [data-piece]'),p=>p.getAttribute('d')),dot:[...document.querySelector('#test [data-center]').attributes].reduce((a,b)=>(a[b.name]=b.value,a),{})})''')
 assert got['done'] and got['count']==1
 assert got['paths']==page.evaluate('__motion.MASTER_PATHS')
 checks.append({'name':'loading complete / repeated complete','pass':True,'callback_count':got['count']})
 page.evaluate('loader.destroy();loader.destroy()')
 assert page.locator('#test').inner_html()==''
 checks.append({'name':'idempotent destroy / DOM cleanup','pass':True})
 page.emulate_media(reduced_motion='reduce')
 page.evaluate("window.finishedCount=0;window.loader=__motion.createBuilderLoopLoader(document.querySelector('#test'),{onComplete:()=>window.finishedCount++})")
 page.wait_for_timeout(200)
 assert page.evaluate('loader.finished') is False
 assert page.evaluate("[...document.querySelectorAll('#test [data-piece]')].map(p=>p.getAttribute('d'))")==page.evaluate('__motion.MASTER_PATHS')
 page.evaluate('loader.complete()');page.wait_for_timeout(30)
 assert page.evaluate('finishedCount')==1
 checks.append({'name':'reduced motion: static while loading; callback after complete','pass':True})
 page.evaluate('loader.destroy()')
 page.emulate_media(reduced_motion='no-preference')
 page.evaluate('''()=>{let h=document.querySelector('#test');window.a=__motion.createBuilderLoopLoader(h,{quality:'low'});window.b=__motion.createBuilderLoopLoader(h,{quality:'low'});}''')
 page.wait_for_timeout(550)
 ids=page.evaluate("[...document.querySelectorAll('defs [id]')].map(x=>x.id)")
 assert len(ids)==len(set(ids)) and len(ids)>0
 page.evaluate('a.destroy();b.destroy()')
 checks.append({'name':'multiple instances: unique SVG resource IDs','pass':True})
 # Demo mobile/reduced-motion snapshot and normal-motion animation frame.
 mobile=b.new_page(viewport={'width':390,'height':844},device_scale_factor=1,reduced_motion='reduce')
 mobile.on('pageerror',lambda e:errors.append(str(e)))
 mobile.set_content(html)
 assert mobile.evaluate('document.documentElement.scrollWidth<=window.innerWidth')
 assert mobile.locator('#state').inner_text().startswith('REDUCED MOTION')
 mobile.screenshot(path=str(root/'qa/browser-mobile-reduced-motion.png'),full_page=True)
 checks.append({'name':'390px mobile layout; reduced-motion demo','pass':True})
 mobile.emulate_media(reduced_motion='no-preference');mobile.evaluate('renderAt(2.10)')
 mobile.screenshot(path=str(root/'qa/browser-mobile-infinity.png'),full_page=True)
 b.close()
assert not errors,errors
report={'status':'pass','environment':'Installed Chromium, headless Linux','checks':checks,'page_errors':errors,'desktop_svg_generation_and_DOM_update_sample':perf,'limits':['No Safari or Firefox execution available in this check.','No user-site integration or framework build performed.','Visual approval remains a separate user decision.','Frame timings exclude completed paint and do not establish mobile performance.']}
(root/'qa/browser-report.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
