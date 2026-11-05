# Static blog client demo

The listing reads only src/data/demo-blogs.ts. Existing CMS clients, stored content and older routes remain intact for future integration.

## Files
Created:
- src/data/demo-blogs.ts
- src/app/(website)/[slug]/[articleSlug]/page.tsx
- docs/qa-static-blog.mjs
- docs/static-blog-demo.md
- docs/qa-evidence/static-blog/ (screenshots and results)

Modified:
- src/app/(website)/blog/page.tsx
- src/components/sections/blog/blog-articles.tsx
- src/components/layout/navbar.tsx (recognises category article URLs for the existing light article navigation style and active Blog link)

Reuses the website layout, Navbar, Footer, Container, original article design and RichContent renderer. Existing remote image configuration permits images.pexels.com; no config change was needed.

## Article routes
- Best Roofing Sheets in India: /roofing-sheets/best-roofing-sheets-in-india
- Benefits of Standing Seam Roofing: /standing-seam/benefits-of-standing-seam-roofing
- Colour Coated Roofing Sheets: Complete Guide: /roofing-sheets/colour-coated-roofing-sheets-guide
- How to Choose Roofing for Industrial Buildings: /industrial-roofing/how-to-choose-industrial-roofing
- Essential Metal Roof Maintenance Tips: /roofing-tips/metal-roof-maintenance-tips
- Modern Metal Roofing Solutions: /metal-roofing/modern-metal-roofing-solutions

The route is a child of the existing [slug] directory to avoid competing names at the same dynamic segment. It validates category and article together, provides generateStaticParams for six pages and uses dynamicParams=false for unknown paths. Existing static routes, products/[slug], single-segment legacy articles and blog/[slug] are preserved. No sitemap generator existed, so none was changed.

Each article has its own title, description, canonical and Open Graph metadata. Canonicals use https://www.zaron.in and omit /blog/.

## Images
All six images are hosted on Pexels. Source pages:
- https://www.pexels.com/photo/modern-architectural-metal-roof-structure-34006096/
- https://www.pexels.com/photo/metal-shining-in-sunlight-roof-17870965/
- https://www.pexels.com/photo/blue-roof-9335811/
- https://www.pexels.com/photo/warehouse-building-exterior-20507715/
- https://www.pexels.com/photo/warehouse-made-of-rusting-corrugated-sheet-metal-21858900/
- https://www.pexels.com/photo/construction-workers-installing-roof-insulation-38749884/

License: https://www.pexels.com/legal-pages/license
Pexels permits website and commercial use under its license. Photos are illustrative and do not represent Zaron projects or endorsements. All six final CDN URLs returned HTTP 200 with image content. Photo 17870965 uses its original PNG path; the guessed JPEG path returned 404 and was not used. No third-party image files were copied into the repository. Online images remain dependent on Pexels availability.

## Validation
- TypeScript: npx tsc --noEmit.
- Source lint: npx eslint src.
- Production build: npm run build.
- Full lint: npm run lint encounters 35 existing no-require-imports errors and one unused-variable warning in older docs/qa-*.cjs files. Those unrelated files were not modified.
- Browser checks: docs/qa-static-blog.mjs; evidence is written to docs/qa-evidence/static-blog/results.json.

Run node docs/qa-static-blog.mjs against an available frontend server. Default base URL: http://localhost:3000. BLOG_QA_BASE selects an isolated preview port.

Browser coverage includes 35 listing/article cases at 375, 430, 768, 1024 and 1440 pixels; grid columns and equal row heights; loaded images and no horizontal overflow; article headings and canonicals; every card's image and Read Article navigation; direct URLs and refresh; back links and browser back/forward; keyboard Enter; unknown and wrong-category 404 responses; reduced and standard motion; smoke checks of existing main routes and the product detail route. Consult the generated results for actual completed-run status.

## Completed verification
PASS: final TypeScript check, source and new QA-script lint, production build.
PASS: 35 responsive browser cases and all six navigation flows.
PASS: images, metadata, keyboard navigation, reduced and standard motion, unknown and wrong-category HTTP 404.
PASS: main routes and existing product detail smoke checks; no Blog API requests.
Full-project lint remains blocked by the 35 pre-existing errors and one warning described above.
Final browser run used http://localhost:3101 because port 3000 already had an existing frontend process.
The production preview remains available at http://localhost:3101/blog.
No commits, pushes, deployment, backend/admin edits or database operations were performed.
