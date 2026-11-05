const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('C:/Users/239/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fixtureSlug = 'roofing-profile-test-fixture-' + Date.now();
const fixtureDirectory = path.resolve(__dirname, '../frontend/src/app/(website)', fixtureSlug);
assert(!fs.existsSync(fixtureDirectory), 'Refusing to overwrite an existing fixture route');
fs.mkdirSync(fixtureDirectory);
fs.writeFileSync(path.join(fixtureDirectory, 'page.tsx'), `
import { products } from "@/data/products";
import { ProductDetailTemplate } from "@/components/sections/products/product-detail-template";
import { ProductRoofingProfiles } from "@/components/sections/products/product-roofing-profiles";
export const metadata = { robots: { index: false, follow: false } };
export default async function Fixture({ searchParams }: { searchParams: Promise<{ empty?: string; isolated?: string }> }) {
  const product = products.find(product => product.slug === "colour-coated-sheet")!;
  const detail = product.detail!;
  if ((await searchParams).empty) return <main className="pt-36"><ProductRoofingProfiles product={product} detail={{ ...detail, profileImages: [] }} /></main>;
  const populatedDetail = { ...detail, profileImages: [
    { src: "/products/ppgl-coils.png", alt: "Rendering test fixture: existing product photograph, not a technical drawing" },
    { src: "/products/standing-seam.png", alt: "Second rendering test fixture: existing product photograph, not a technical drawing" },
  ] };
  if ((await searchParams).isolated) return <main className="pt-[1000px]"><ProductRoofingProfiles product={product} detail={populatedDetail} /></main>;
  return <ProductDetailTemplate product={product} detail={populatedDetail} />;
}
`);
(async () => {
  const output = path.join(__dirname, 'qa-evidence/roofing-profiles');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  // Network-drive watchers can lag when the temporary route is recreated.
  for (let attempt = 0; attempt < 30; attempt++) {
    const warmup = await page.request.get('http://localhost:3000/' + fixtureSlug);
    if (warmup.status() === 200) break;
    if (attempt === 29) throw new Error('Temporary fixture route was not discovered by the dev server');
    await page.waitForTimeout(1000);
  }
  const errors = [], warnings = [], failed = [], results = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); if (message.type() === 'warning') warnings.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) failed.push({ status: response.status(), url: response.url() }); });
  const cases = [
    { name: 'public-empty', route: '/products/colour-coated-sheet', count: 0 },
    { name: 'fixture-populated', route: '/' + fixtureSlug, count: 1 },
    { name: 'fixture-unavailable', route: '/' + fixtureSlug + '?empty=1', count: 1 },
  ];
  for (const test of cases) {
    for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto('http://localhost:3000' + test.route, { waitUntil: 'networkidle', timeout: 120000 });
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('#product-detail-hero #roofing-profiles').count(), 0);
      assert.equal(await page.locator('#product-detail-hero').getByText('Roofing Profiles', { exact: true }).count(), 0);
      assert.equal(await page.locator('#roofing-profiles').count(), test.count);
      if (test.count) {
        await page.locator('#roofing-profiles').scrollIntoViewIfNeeded();
        await page.waitForTimeout(850);
        assert(await page.locator('#roofing-profiles-heading').isVisible());
        if (test.name === 'fixture-populated') {
          assert.equal(await page.locator('#roofing-profiles img').count(), 2);
          const layout = await page.locator('#roofing-profiles article').evaluateAll(cards => cards.map(card => card.getBoundingClientRect().toJSON()));
          assert.equal(Math.abs(layout[0].y - layout[1].y) < 1, width >= 640);
          assert.equal(await page.locator('#product-detail-hero + #roofing-profiles').count(), 1);
          assert.equal(await page.locator('#roofing-profiles + section [id="product-colours-heading"]').count(), 1);
          const images = await page.locator('#roofing-profiles img').evaluateAll(imgs => imgs.map(i => ({ fit: getComputedStyle(i).objectFit, alt: i.alt, loaded: i.complete && i.naturalWidth > 0 })));
          images.forEach(image => { assert.equal(image.fit, 'contain'); assert(image.alt); assert(image.loaded); });
        } else {
          assert.equal(await page.locator('#roofing-profiles img').count(), 0);
          assert.equal(await page.locator('#roofing-profiles a').getAttribute('href'), '/contact');
        }
      }
      const result = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.currentSrc) }));
      const scopedOverflow = await page.locator('#product-detail-hero, #roofing-profiles').evaluateAll(sections => sections.flatMap(section => [section, ...section.querySelectorAll('*')]).filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1); }).map(e => ({ tag: e.tagName, text: e.textContent?.trim().slice(0, 60) })));
      assert.deepEqual(scopedOverflow, []);
      // Only inspect loaded profile images here; other shared sections lazy-load below the viewport.
      results.push({ case: test.name, width, scrollWidth: result.scrollWidth, scopedOverflow, pageOverflow: result.scrollWidth > width ? "Existing protected Technical Specifications layout" : null });
      if ([320, 1440].includes(width)) {
        if (test.count) await page.locator('#roofing-profiles').screenshot({ path: path.join(output, `${test.name}-${width}.png`) });
        else await page.screenshot({ path: path.join(output, `${test.name}-${width}.png`) });
      }
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000/' + fixtureSlug, { waitUntil: 'networkidle' });
  await page.locator('#roofing-profiles').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  assert(await page.locator('#roofing-profiles-heading').isVisible());
  const existingReducedMotionErrors = errors.filter(error => error.includes('hydrated') && error.includes('ProductTechnicalSpecifications'));
  await page.goto('http://localhost:3000/' + fixtureSlug + '?isolated=1', { waitUntil: 'networkidle' });
  await page.locator('#roofing-profiles').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const reduced = await page.locator('#roofing-profiles article').evaluateAll(cards => cards.map(card => ({ opacity: getComputedStyle(card).opacity, transform: getComputedStyle(card).transform })));
  reduced.forEach(card => { assert.equal(card.opacity, '1'); assert(['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(card.transform)); });
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await nojs.newPage();
  await staticPage.goto('http://localhost:3000/' + fixtureSlug);
  assert(await staticPage.locator('#roofing-profiles-heading').isVisible());
  assert.equal(await staticPage.locator('#roofing-profiles article').first().evaluate(e => getComputedStyle(e).opacity), '1');
  await browser.close();
  const unexpectedWarnings = warnings.filter(warning => !warning.includes('/Banner/fac-cta.png') && !warning.includes('/opacity/name-lo.svg') && !warning.includes('You have Reduced Motion enabled'));
  const unexpectedErrors = errors.filter(error => !existingReducedMotionErrors.includes(error));
  const report = { results, existingReducedMotionErrors, reducedMotion: reduced, noJavaScript: 'visible', errors, warnings: [...new Set(warnings)], unexpectedWarnings: [...new Set(unexpectedWarnings)], failedRequests: failed, fixtureNote: 'Temporary local-only fixtures use existing product photographs explicitly labelled as rendering test images, not technical drawings; no product records changed.' };
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2));
  assert.deepEqual(unexpectedErrors, []);
  assert.deepEqual(failed, []);
  assert.deepEqual(unexpectedWarnings, []);
  console.log(JSON.stringify(report, null, 2));
})().finally(() => {
  fs.unlinkSync(path.join(fixtureDirectory, 'page.tsx'));
  fs.rmdirSync(fixtureDirectory);
}).catch(error => { console.error(error); process.exit(1); });