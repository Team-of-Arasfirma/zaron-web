const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('C:/Users/239/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  const output = path.join(__dirname, 'qa-evidence/admin-phase-1');
  fs.mkdirSync(output, { recursive: true });
  const base = 'http://127.0.0.1:4173';
  const routes = [['/', 'Dashboard'], ['/products', 'Products'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/careers', 'Careers'], ['/enquiries', 'Enquiries'], ['/cta-banner', 'CTA Banner'], ['/users-roles', 'Users & Roles'], ['/settings', 'Settings']];
  const errors = [], warnings = [], failures = [], cases = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); if (m.type() === 'warning') warnings.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400) failures.push({ url: r.url(), status: r.status() }); });
  try {
    for (const [route, title] of routes) {
      for (const width of [320, 375, 430, 768, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        assert.equal(await page.locator('h1').textContent(), title);
        assert.equal(await page.locator('h1').count(), 1);
        assert.match(await page.title(), new RegExp(title.replace('&', '&')));
        assert.equal(await page.locator('body').evaluate(() => document.documentElement.scrollWidth), width);
        if (width >= 1024) {
          const active = page.locator('aside a[aria-current="page"]');
          assert.equal(await active.count(), 1);
          assert.equal(await active.textContent(), title);
          assert.equal(await active.evaluate(e => getComputedStyle(e).backgroundColor), 'rgb(255, 101, 0)');
        }
        assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || !i.naturalWidth).length), 0);
        cases.push({ route, width, status: response.status(), overflow: false });
        if (route === '/' && [320,1440].includes(width)) await page.screenshot({ path: path.join(output, `dashboard-${width}.png`), fullPage: true });
      }
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').textContent(), title);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    assert.equal(await page.getByText('Not connected', { exact: true }).count(), 3);
    await page.getByRole('link', { name: 'Products Catalogue & product information' }).click();
    await page.waitForURL('**/products');
    await page.locator('aside').getByRole('link', { name: 'CTA Banner', exact: true }).click();
    await page.waitForURL('**/cta-banner');
    for (const width of [320, 375, 430, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      const toggle = page.getByRole('button', { name: 'Open navigation' });
      await toggle.click();
      const dialog = page.getByRole('dialog');
      assert(await dialog.isVisible());
      assert(await dialog.evaluate(d => d.contains(document.activeElement)));
      for (let n = 0; n < 15; n++) {
        await page.keyboard.press('Tab');
        assert(await dialog.evaluate(d => d.contains(document.activeElement)));
      }
      await page.keyboard.press('Shift+Tab');
      assert(await dialog.evaluate(d => d.contains(document.activeElement)));
      const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineWidth);
      assert.notEqual(outline, '0px');
      if (width === 375) await page.screenshot({ path: path.join(output, 'drawer-375.png') });
      await page.keyboard.press('Escape');
      assert.equal(await dialog.isVisible(), false);
      assert(await toggle.evaluate(e => document.activeElement === e));
      await toggle.click();
      await dialog.getByRole('link', { name: 'Products', exact: true }).click();
      await page.waitForURL('**/products');
      assert.equal(await dialog.isVisible(), false);
      await toggle.click();
      await page.mouse.click(width - 5, 400);
      assert.equal(await dialog.isVisible(), false);
      await toggle.click();
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.waitForTimeout(100);
      assert.equal(await dialog.isVisible(), false);
      assert.equal(await page.locator('body').evaluate(e => e.style.overflow), '');
    }
    await page.goto(base + '/not-a-module', { waitUntil: 'networkidle' });
    assert.match(await page.locator('h1').textContent(), /not in the workspace/);
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'admin-main');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Open navigation' }).click();
    assert.equal(await page.getByRole('dialog').evaluate(d => getComputedStyle(d).animationName), 'none');
    await page.keyboard.press('Escape');
    const report = { cases, routeRefresh: 'passed', activeNavigation: 'passed', quickNavigation: 'passed', mobileDrawer: 'passed at 320, 375, 430 and 768', keyboardFocusTrap: 'passed', escapeAndFocusReturn: 'passed', backdropDismissal: 'passed', desktopResize: 'passed', skipLink: 'passed', reducedMotion: 'passed', notFound: 'passed', errors, warnings, failures };
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2));
    assert.deepEqual(errors, []);
    assert.deepEqual(warnings, []);
    assert.deepEqual(failures, []);
    console.log(JSON.stringify({ cases: cases.length, ...report, cases: cases.length }, null, 2));
  } catch (error) {
    await page.screenshot({ path: path.join(output, 'failure.png'), fullPage: true });
    fs.writeFileSync(path.join(output, 'failure.json'), JSON.stringify({ cases, errors, warnings, failures, error: error.message }, null, 2));
    throw error;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });