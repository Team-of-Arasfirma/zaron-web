import { chromium } from "file:///C:/Users/239/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import assert from "node:assert/strict";
import fs from "node:fs";
const output = "docs/qa-evidence/static-blog";
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ reducedMotion: "reduce" });
const base = process.env.BLOG_QA_BASE || "http://localhost:3000";
const results = [], errors = [], externalRequests = [];
page.on("pageerror", e => errors.push(e.message));
page.on("request", r => { if (/blogs\?|\/api\/|cloudinary/.test(r.url())) externalRequests.push(r.url()); });
try {
  await page.goto(base + "/blog", { waitUntil: "networkidle" });
  const links = await page.locator("#blog-articles article > a").evaluateAll(nodes => nodes.map(n => ({ href: n.getAttribute("href"), title: n.querySelector("h3").textContent.trim() })));
  assert.equal(links.length, 6);
  assert.equal(new Set(links.map(l => l.href)).size, 6);
  for (const width of [375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/blog", ...links.map(l => l.href)]) {
      const response = await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, route);
      for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 650) { await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(40); }
      await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0), { timeout: 30000 });
      await page.waitForTimeout(400);
      const state = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        broken: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.currentSrc),
        h1: document.querySelector("h1")?.textContent.trim(),
        columns: document.querySelector("#blog-articles .grid") ? getComputedStyle(document.querySelector("#blog-articles .grid")).gridTemplateColumns.split(" ").length : null,
        heights: [...document.querySelectorAll("#blog-articles article > a")].map(a => a.getBoundingClientRect().height),
      }));
      assert(state.scrollWidth <= width, JSON.stringify({ route, ...state }));
      assert.deepEqual(state.broken, [], JSON.stringify({ route, ...state }));
      if (route === "/blog") {
        assert.equal(state.columns, width < 640 ? 1 : width < 1024 ? 2 : 3);
        for (let i = 0; i < state.heights.length; i += state.columns) {
          const row = state.heights.slice(i, i + state.columns);
          assert(Math.max(...row) - Math.min(...row) < 2);
        }
      } else {
        const expected = links.find(l => l.href === route);
        assert.equal(state.h1, expected.title);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://www.zaron.in" + route);
        assert((await page.locator(".blog-rich-content h2").count()) >= 3);
        assert((await page.locator(".blog-rich-content h3").count()) >= 1);
      }
      results.push({ route, ...state });
      if (route === "/blog" || route === links[2].href) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: output + "/" + (route === "/blog" ? "listing" : "article") + "-" + width + ".png", fullPage: true });
      }
    }
    console.log("Responsive width passed:", width);
  }
  for (const link of links) {
    await page.goto(base + "/blog");
    await page.locator('#blog-articles a[href="' + link.href + '"] img').click();
    await page.waitForURL(base + link.href);
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").textContent(), link.title);
    await page.getByRole("link", { name: "Back to Blogs", exact: true }).first().click();
    await page.waitForURL(base + "/blog");
    await page.goBack(); await page.waitForURL(base + link.href);
    await page.goForward(); await page.waitForURL(base + "/blog");
    await page.locator('#blog-articles a[href="' + link.href + '"]').getByText("Read Article", { exact: true }).click();
    await page.waitForURL(base + link.href);
  }
  await page.goto(base + "/blog");
  await page.locator("#blog-articles article > a").first().focus();
  await page.keyboard.press("Enter");
  await page.waitForURL(base + links[0].href);
  const missing = await page.goto(base + "/roofing-sheets/unknown-article");
  assert.equal(missing.status(), 404);
  const wrongCategory = await page.goto(base + "/roofing-tips/best-roofing-sheets-in-india");
  assert.equal(wrongCategory.status(), 404);
  const smoke = [];
  for (const route of ["/", "/about", "/products", "/products/colour-coated-sheet", "/projects", "/careers", "/contact"]) {
    const r = await page.goto(base + route, { waitUntil: "domcontentloaded" });
    assert.equal(r.status(), 200, route);
    smoke.push({ route, status: r.status() });
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(base + "/blog");
  await page.locator("#blog-articles").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  assert.equal(await page.locator("#blog-articles article").count(), 6);
  assert.deepEqual(errors, []);
  assert.deepEqual(externalRequests, []);
  fs.writeFileSync(output + "/results.json", JSON.stringify({ results, smoke, errors, externalRequests, navigation: "All six cards, image and Read Article clicks, back links, browser back/forward, refresh, keyboard Enter passed", unknown: "Both 404", motion: "Reduced and standard motion checked" }, null, 2));
  console.log("PASS: 35 responsive cases, six navigation flows, keyboard, metadata, images, 404, route smoke tests; no API requests.");
} finally { await browser.close(); }



