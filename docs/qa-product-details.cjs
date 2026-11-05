const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('C:/Users/239/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const root = path.resolve(__dirname, '..');
  const output = path.join(__dirname, 'qa-evidence', 'product-details');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [], failures = [], results = [];
  const page = await browser.newPage();
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400 && !r.url().includes('unconfigured-product') && !r.url().includes('/bare-sheet')) failures.push({ status: r.status(), url: r.url() }); });
  const base = 'http://localhost:3000';
  for (const route of ['/products', '/products/colour-coated-sheet']) {
    for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 });
      assert.equal(response.status(), 200);
      for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 700) {
        await page.evaluate(y => scrollTo(0, y), y);
        await page.waitForTimeout(80);
      }
      await page.waitForTimeout(700);
      const result = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll('h1').length, brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.currentSrc), overflow: [...document.querySelectorAll('main h1, main h2, main h3, main p, main button, main td')].filter(e => { const r = e.getBoundingClientRect(); return !e.closest('[role="tablist"]') && r.width && (r.left < -1 || r.right > innerWidth + 1); }).map(e => e.textContent.slice(0, 100)) }));
      results.push({ route, ...result });
      assert.equal(result.scrollWidth, width, `Page overflow: ${route} ${width}`);
      assert.equal(result.h1, 1);
      assert.deepEqual(result.brokenImages, []);
      assert.deepEqual(result.overflow, []);
      if ([320, 1440].includes(width)) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: path.join(output, `${route === '/products' ? 'listing' : 'detail'}-${width}.png`), fullPage: true });
      }
    }
  }
  await page.goto(base + '/products');
  assert.equal(await page.locator('main a[href="/products/colour-coated-sheet"]').count(), 1);
  assert.equal(await page.getByText('Details coming soon', { exact: true }).count(), 14);
  await page.getByRole('link', { name: 'Explore Colour Coated Sheet' }).click();
  await page.waitForURL('**/products/colour-coated-sheet');
  assert.match(await page.title(), /Colour Coated Sheet/);
  assert.equal(await page.locator('nav[aria-label="Main navigation"] a[aria-current="page"]').textContent(), 'Products');
  assert.match(await page.locator('nav[aria-label="Main navigation"] img').getAttribute('src'), /zaron-b/);
  assert.equal(await page.locator('main section').count(), 5);
  await page.setViewportSize({ width: 375, height: 900 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('button', { name: 'Close navigation' }).waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Open navigation' }).waitFor();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  assert(await page.locator('h1').isVisible());
  const reducedMotion = await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  for (const route of ['/products/unconfigured-product', '/products/bare-sheet']) {
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 404);
  }
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await nojs.newPage();
  await staticPage.goto(base + '/products/colour-coated-sheet');
  assert(await staticPage.locator('h1').isVisible());
  assert.equal(await staticPage.locator('main section').count(), 5);
  // Expected resource errors from the two deliberate 404 navigation checks.
  const unexpectedErrors = errors.filter(error => !error.includes('404 (Not Found)'));
  const report = { results, errors: unexpectedErrors, failures, listingNavigation: 'passed', navbar: 'passed', mobileMenu: 'passed', invalidAndUnconfiguredRoutes: '404', reducedMotion, noJavaScriptContent: 'visible', colorSwatches: 'Not tested: no approved colours configured' };
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2));
  await browser.close();
  assert.deepEqual(unexpectedErrors, []);
  assert.deepEqual(failures, []);
  console.log(JSON.stringify(report, null, 2));
})().catch(error => { console.error(error); process.exit(1); });