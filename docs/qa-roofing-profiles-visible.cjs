const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const Module = require('module');
const { chromium } = require('C:/Users/239/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const frontend = path.resolve(__dirname, '../frontend');
const ts = require(path.join(frontend, 'node_modules/typescript'));
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith('@/') ? path.join(frontend, 'src', request.slice(2)) : request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2020 } });
    module._compile(output.outputText, filename);
  };
}
const React = require(path.join(frontend, 'node_modules/react'));
const { renderToStaticMarkup } = require(path.join(frontend, 'node_modules/react-dom/server'));
const { ProductRoofingProfiles } = require(path.join(frontend, 'src/components/sections/products/product-roofing-profiles.tsx'));
const { products } = require(path.join(frontend, 'src/data/products.ts'));
const product = products.find(p => p.slug === 'colour-coated-sheet');
const fixtureHTML = renderToStaticMarkup(React.createElement(ProductRoofingProfiles, { product, detail: { ...product.detail, profileImages: [
  { src: '/products/ppgl-coils.png', alt: 'Temporary rendering fixture: product photograph, not a technical drawing' },
  { src: '/products/standing-seam.png', alt: 'Second temporary rendering fixture: product photograph, not a technical drawing' },
] } }));
(async () => {
  const output = path.join(__dirname, 'qa-evidence/roofing-profiles-visible');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const errors = [], warnings = [], failures = [], results = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); if (m.type() === 'warning') warnings.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) failures.push({ url: r.url(), status: r.status() }); });
  const base = 'http://localhost:3000';
  const response = await page.goto(base + '/products/colour-coated-sheet', { waitUntil: 'networkidle', timeout: 45000 });
  assert.equal(response.status(), 200);
  const styles = await page.locator('link[rel="stylesheet"]').evaluateAll(links => links.map(link => link.href));
  for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + '/products/colour-coated-sheet', { waitUntil: 'networkidle', timeout: 45000 });
    assert.equal(await page.locator('#roofing-profiles').count(), 1);
    assert.equal(await page.locator('#product-detail-hero').getByText('Roofing Profiles', { exact: true }).count(), 0);
    assert.equal(await page.locator('#roofing-profiles img').count(), 0);
    assert.equal(await page.locator('#roofing-profiles a').getAttribute('href'), '/contact');
    const ordering = await page.evaluate(() => {
      const hero = document.querySelector('#product-detail-hero');
      const profiles = document.querySelector('#roofing-profiles');
      const colours = document.querySelector('#product-colours-heading')?.closest('section') || [...document.querySelectorAll('main section')].find(s => s.textContent.includes('Available Colours'));
      return { heroThenProfiles: hero.nextElementSibling === profiles, profilesThenColours: profiles.nextElementSibling === colours, sections: [...document.querySelector('main').children].map(e => e.id || e.getAttribute('aria-labelledby')) };
    });
    assert(ordering.heroThenProfiles && ordering.profilesThenColours);
    await page.locator('#roofing-profiles').scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const geometry = await page.locator('#roofing-profiles').evaluate(section => ({ width: innerWidth, pageWidth: document.documentElement.scrollWidth, overflow: [section, ...section.querySelectorAll('*')].filter(e => { const r=e.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth+1); }).map(e => e.tagName) }));
    assert.deepEqual(geometry.overflow, []);
    assert(await page.locator('#roofing-profiles-heading').isVisible());
    results.push({ case: 'real-empty-state', ...geometry, ordering });
    if ([320,1440].includes(width)) await page.locator('#roofing-profiles').screenshot({ path: path.join(output, `empty-${width}.png`), style: 'header { visibility: hidden !important }' });
    // Render the real component into a temporary in-memory document, with real
    // existing photos explicitly labelled as test assets. No app route or data is changed.
    await page.setContent('<html><head><base href="'+base+'">'+styles.map(href=>'<link rel="stylesheet" href="'+href+'">').join('')+'</head><body>'+fixtureHTML+'</body></html>', { waitUntil: 'networkidle' });
    await page.locator('#roofing-profiles img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    assert.equal(await page.locator('#roofing-profiles img').count(), 2);
    const populated = await page.locator('#roofing-profiles').evaluate(section => ({ width: innerWidth, pageWidth: document.documentElement.scrollWidth, cards: [...section.querySelectorAll('article')].map(e=>e.getBoundingClientRect().toJSON()), images: [...section.querySelectorAll('img')].map(i=>({loaded:i.complete&&i.naturalWidth>0,fit:getComputedStyle(i).objectFit,alt:i.alt})), overflow: [section,...section.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.left< -1||r.right>innerWidth+1)}).map(e=>e.tagName) }));
    assert.deepEqual(populated.overflow, []);
    assert.equal(populated.pageWidth, width);
    assert.equal(Math.abs(populated.cards[0].y-populated.cards[1].y)<1, width>=640);
    populated.images.forEach(i=>{assert(i.loaded&&i.alt);assert.equal(i.fit,'contain')});
    results.push({case:'in-memory-populated-fixture',...populated});
    if ([320,1440].includes(width)) {
      const height = Math.ceil(await page.locator('#roofing-profiles').evaluate(e=>e.getBoundingClientRect().height));
      await page.setViewportSize({width,height:height+50});
      await page.locator('#roofing-profiles').screenshot({path:path.join(output,`populated-${width}.png`)});
    }
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  const beforeReduced = errors.length;
  await page.goto(base+'/products/colour-coated-sheet',{waitUntil:'networkidle',timeout:45000});
  await page.locator('#roofing-profiles').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  assert(await page.locator('#roofing-profiles-heading').isVisible());
  const reducedMotionErrors = errors.slice(beforeReduced);
  const nojs = await browser.newContext({javaScriptEnabled:false});
  const staticPage = await nojs.newPage();
  await staticPage.goto(base+'/products/colour-coated-sheet',{waitUntil:'load',timeout:45000});
  assert(await staticPage.locator('#roofing-profiles-heading').isVisible());
  const report={results,errors,warnings:[...new Set(warnings)],failures,reducedMotionErrors,noJavaScript:'profiles visible',populatedFixture:'Server-rendered real component with in-memory test photographs only; animation hydration not tested for populated fixture',profileAssetsFound:0,mappedPaths:[]};
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(report,null,2));
  await browser.close();
  assert.deepEqual(failures,[]);
  console.log(JSON.stringify({cases:results.length,failures,errors:errors.length,reducedMotionErrors:reducedMotionErrors.length,pageOverflow:results.filter(r=>r.pageWidth>r.width).map(r=>({case:r.case,width:r.width,pageWidth:r.pageWidth}))},null,2));
})().catch(error=>{console.error(error);process.exit(1)});