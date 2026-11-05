# Separate Roofing Profiles section

## Changes

Modified existing application files:

- `frontend/src/components/sections/products/product-detail-hero.tsx`: removed only the inline Roofing Profiles block, its local `profiles` variable and unused `Layers3` import. Breadcrumb, features, product image animation, colour previews and gallery remain intact.
- `frontend/src/components/sections/products/product-detail-template.tsx`: retained the existing conditional profiles section immediately after the Hero. Repaired pre-existing import/prop mismatches against actual exports: `ProductDetailSelection`, colours passed as `colors`, overview passed both `product` and `detail`, key features passed as `features`. Selection implementation was not changed.
- `frontend/src/components/sections/products/product-roofing-profiles.tsx`: retained the existing standalone design and data model. Made initial Motion rendering consistent and visible on server and client, with reduced-motion-aware reveal keyframes.

Created supporting files:

- `docs/qa-roofing-profiles.cjs`: browser verification with temporary local fixtures and automatic fixture route cleanup.
- `docs/roofing-profiles-preserved-files.json`: SHA-256 preservation evidence for protected files.
- This report and `docs/qa-evidence/roofing-profiles/` screenshots/results.

No new production route, product records, technical drawings or image assets were created.

## Integration

The standalone white section retains the orange accent, Roofing Profiles label, ENGINEERED FOR PRECISION heading, product-specific introduction, rounded image cards, hover border/shadow, one mobile column and two columns from 640px. Images use existing `detail.profileImages` objects, supplied alt text, Next Image, approved quality 85 and `object-contain`.

The template renders it only when `detail.profileImages` has entries. Directly rendering the component with empty images intentionally exposes its truthful unavailable state and Contact Our Team link. The Hero no longer renders any profiles content, so there is no duplicate section.

## Available drawings

Products with drawings: none.

Products missing drawings: all 15 roofing products. Colour Coated Sheet explicitly has an empty profile array. The other 14 records do not yet have configured detail data. Public Colour Coated Sheet therefore hides the profiles section until approved existing drawings are supplied.

Product data, dynamic route, colour provider implementation, available-colours component, technical specifications component, Navbar, Footer and product listing card were checked against before/after SHA-256 hashes and remain unchanged.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; the existing configured detail route is prerendered. No temporary fixture was present in the production build.

Commands used `cmd pushd` to run from the same network workspace through a Windows drive mapping.

Headless Microsoft Edge tested the real `/products/colour-coated-sheet` page and temporary populated/unavailable fixtures at 320, 375, 430, 768, 1024, 1280, 1440 and 1920px: 24 responsive cases exercised.

Passed checks: no overflow in Hero or Roofing Profiles, correct mobile/desktop columns, correct section order, no duplicate profiles, contained loaded images with alt text, no failed image requests, empty state Contact link, hidden public section for empty data, isolated reduced-motion styles and visibility without JavaScript. Desktop and mobile section screenshots were visually inspected. Fixtures use clearly labelled existing product photographs solely to exercise layout; they are not approved technical drawings and do not modify product data.

## Existing issues outside this change

- The unchanged Technical Specifications layout causes 10px horizontal page overflow at 320, 375 and 430px. The changed Hero and standalone section do not overflow. The specifications component was left untouched as explicitly requested.
- Reduced-motion full-page navigation exposes existing hydration mismatches in the Hero product-image initial animation and Technical Specifications animations. The extracted profiles section passes its isolated reduced-motion check and server-rendered visibility checks. No changes to the protected specifications component were made.
- Development testing can produce existing shared CTA image LCP guidance and Motion's expected reduced-motion diagnostic. Early fixture runs also produced image LCP hints when reusing the same photograph as the Hero; the harness was adjusted to use distinct fixture photos and below-fold isolation. See the JSON evidence for recorded diagnostics rather than treating the entire page as warning-free.

The network-drive dev watcher can delay discovery of deleted and recreated temporary routes; the harness uses a unique route per run and waits for discovery. Temporary fixture routes are removed after testing.

No commits or pushes were made.
Final verification: no temporary fixture directories remain and all protected-file hashes still match. The completed 24-case evidence is retained. Subsequent fixture reruns were blocked by development route discovery/HTTP timeouts; they are not reported as passed. The production build and application source were unchanged during these fixture-only retries.
