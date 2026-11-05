const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/239/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({channel:'msedge', headless:true});
 const root = 'Z:/user/Desktop/zaron';
 const output = path.join(root,'docs/qa-evidence'); fs.mkdirSync(output,{recursive:true});
 const slugs = [...fs.readFileSync(path.join(root,'frontend/src/data/blogs.ts'),'utf8').matchAll(/slug:\s*"([^"]+)"/g)].map(m=>m[1]);
 const routes = ['/', '/about','/products','/projects','/blog','/careers','/contact',...slugs.map(s=>'/'+s)];
 const phase = process.argv[2] || 'baseline';
 const results=[]; const errors=[]; const failures=[];
 for(const route of routes.filter(route => !process.argv[3] || route === process.argv[3])) {
  const page=await browser.newPage();
  page.on('pageerror',e=>errors.push({route,message:e.message}));
  page.on('console',m=>{if(['error','warning'].includes(m.type())) errors.push({route,type:m.type(),message:m.text()})});
  page.on('response',r=>{if(r.status()>=400) failures.push({route,status:r.status(),url:r.url()})});
  page.on('requestfailed',r=>failures.push({route,url:r.url(),error:r.failure()?.errorText}));
  for(const width of [320,375,430,768,1024,1280,1440,1920]) {
   await page.setViewportSize({width,height:width<768?740:900});
   const response=await page.goto('http://localhost:3100'+route,{waitUntil:'load',timeout:60000});
   for(let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=650){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(90)}
   await page.waitForTimeout(1200);
   const data=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.currentSrc),overflow:[...document.querySelectorAll('h1,h2,h3,p,input,select,textarea,button')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('[aria-hidden="true"]')}).map(e=>({tag:e.tagName,text:e.textContent?.trim().slice(0,70)}))}));
   results.push({route,status:response.status(),...data});
   if([320,1440].includes(width)){await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(400); await page.screenshot({path:path.join(output,(route==='/'?'home':route.slice(1))+'-'+width+'-'+phase+'.png'),fullPage:true})}
  }
  await page.close(); console.log('Checked',route);
 }
 fs.writeFileSync(path.join(output,phase+'.json'),JSON.stringify({results,errors,failures},null,2));
 await browser.close(); console.log(JSON.stringify({cases:results.length,overflow:results.filter(r=>r.scrollWidth>r.width||r.overflow.length),errors,failures},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
