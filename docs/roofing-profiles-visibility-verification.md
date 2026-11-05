# Roofing Profiles visibility verification — 2 November 2026

## Root cause and current implementation

The earlier missing section was caused by the template condition `Boolean(detail.profileImages?.length)` combined with an empty Colour Coated Sheet profile array. At the beginning of this request, the current template already rendered `ProductRoofingProfiles` unconditionally immediately after the Hero. No such condition remains. The standalone component has no early return or hidden initial state; its empty-data branch includes the label, orange accent, ENGINEERED FOR PRECISION heading, product introduction, styled unavailable card and Contact Our Team link.

The current development URL returned HTTP 200 with the profiles section in the HTML. Browser assertions confirmed the section is visible and appears exactly once, outside the Hero, immediately above Available Colours. No application-source edits were necessary or made during this request. The existing unconditional template fix was preserved instead of rewriting working code.

## Files created

- `docs/qa-roofing-profiles-visible.cjs`
- `docs/roofing-profiles-visibility-verification.md`
- Screenshots and `results.json` in `docs/qa-evidence/roofing-profiles-visible/`.

Application files modified: none. Product data, colours, hero, selection provider, dynamic route, technical specifications, Navbar, Footer, homepage carousel and listing cards were left unchanged.

## Assets

Inspected all public assets, including `public/products/`. No `public/products/profiles/` directory or matching technical profile SVG/PNG drawings exist. Existing product assets are photographs: roofing sheet, standing seam, coils, purlin, aluminium tape and product hero imagery. They were not mapped as technical drawings.

Approved profile images found: none. Product profile paths mapped: none. Colour Coated Sheet retains `profileImages: []`; its unavailable state is intentionally visible. Approved profile drawings remain needed before real cards can be populated.

## Browser verification

Headless Microsoft Edge against `http://localhost:3000/products/colour-coated-sheet`:

- Eight widths checked: 320, 375, 430, 768, 1024, 1280, 1440 and 1920px.
- Real empty state: visible heading/message/Contact link at every width; exactly one section; no profiles inside the Hero; no overflowing elements within the profiles section.
- Asserted real page order at every width: `product-detail-hero`, `roofing-profiles`, `available-colours`, `technical-specifications`, overview, key features.
- Populated case: server-rendered the actual component into temporary in-memory browser documents with two clearly labelled existing product photographs. No fixture routes, production records, fake technical drawings or temporary application files were created. All images loaded with alt text and object-contain; one column on small mobile and two from 640px; no fixture overflow at any tested width.
- Sixteen geometry/order cases completed. Populated-fixture animation hydration was not tested, because these fixtures used server-rendered static markup; this limitation is recorded in the JSON.
- Actual empty section remains visible with JavaScript disabled and reduced motion enabled.
- No failed image responses were recorded. One generic resource-404 console message occurred during the mixed real-page/in-memory fixture run; its URL was not captured. A separate fresh real-page browser navigation then completed with no console errors or HTTP error responses.
- The mixed fixture run recorded the existing reduced-motion full-page hydration mismatch involving Hero image and Technical Specifications animations, plus Motion's reduced-motion diagnostic. This is not reported as a clean full-page console result.
- Existing Technical Specifications layout still makes the page 10px wider at 320, 375 and 430px; the profiles section itself fits. This protected component was not modified.

Images `empty-320.png` and `populated-1440.png` were visually inspected. `page-order.png` captures the current real page. The in-memory fixture does not carry the root layout's font variables, so its typography is not a reference for changing the production design.

The standalone Node renderer used Next Image's default quality configuration and printed a fixture-only quality diagnostic; actual frontend configuration supports quality 85. No project configuration was changed.

## Required validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; Colour Coated Sheet prerendered successfully.

Commands ran through `cmd pushd` against the same network workspace to accommodate Windows npm command scripts. No server timeouts are reported as successful tests. No commits or pushes were made.