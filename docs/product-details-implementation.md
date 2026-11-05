# Product details implementation — 2 November 2026

## Delivered

Reusable, data-driven product detail template with hero, available colours, technical specifications, overview and key features, followed by the existing layout CTA and footer. Includes four hero features, four technical request cards when specifications are unavailable, three non-numerical overview highlights, four overview benefit cards and five key features. Existing CTA, footer, homepage carousel, category structure and all 15 roofing records are preserved.

Enabled route: `/products/colour-coated-sheet`.

Only products with `detail` data receive listing links and static detail pages. Unknown slugs and existing products without details return 404. The route uses asynchronous params, `generateStaticParams`, product-specific metadata and `notFound()`. Existing root-level article routes remain in the production route output.

## Created files

Under `frontend/src/components/sections/products/`:

- `product-detail-template.tsx`
- `product-detail-hero.tsx`
- `product-available-colours.tsx`
- `product-technical-specifications.tsx`
- `product-overview.tsx`
- `product-key-features.tsx`
- `product-detail-reveal.tsx`
- `product-detail-selection.tsx`
- `product-detail-shared.tsx`

Also:

- `frontend/src/app/(website)/products/[slug]/page.tsx`
- `docs/qa-product-details.cjs`
- This implementation report and browser evidence under `docs/qa-evidence/product-details/`.

## Modified files

- `frontend/src/data/products.ts`: optional strongly typed details and the initial Colour Coated Sheet record. Features derive from existing catalogue copy; no numerical specifications added.
- `frontend/src/components/sections/products/product-card.tsx`: working detail link only for configured products; other cards show a non-interactive unavailable state.
- `frontend/src/components/layout/navbar.tsx`: existing light Navbar theme extended to `/products/` descendants. Dimensions, menu behavior and unrelated route themes preserved.

## Assets and approval still needed

The referenced `product details.svg` was not present in the project or supplied attachments. Layout follows the written section requirements and existing site conventions; exact Figma/SVG visual fidelity remains unverified and requires the reference.

The existing `/products/roofing-sheet.png` was inspected and shows a blue profiled roofing sheet. It is reused consistently with the existing product listing. Product identification should receive final owner confirmation.

Missing: approved profile drawings, colour names and hex codes, colour-specific product images, verified technical values and brochure. No substitute drawings, CSS recolouring, invented measurements, fictional brochures or unsupported numerical claims were added.

Colour availability displays an unavailable message until approved colours are configured. The reusable picker supports keyboard-operable pressed-state buttons, visible focus, mirrored hero previews and optional colour-specific images. These interactive swatches could not be exercised on the configured route because its approved palette is absent. Technical specifications render a real table when rows are configured; the current route displays a truthful request-specifications state.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; Colour Coated Sheet prerendered successfully.

The successful commands ran through Windows `cmd pushd` to map the network workspace. Initial direct UNC invocations failed because npm command scripts switched to `C:/Windows`; those failures were environment-related and were resolved without changing project configuration. Direct local TypeScript and ESLint CLI invocations also passed.

Headless Microsoft Edge against the existing development server at `http://localhost:3000`:

- `/products` and `/products/colour-coated-sheet` tested at 320, 375, 430, 768, 1024, 1280, 1440 and 1920px: all 16 cases passed.
- No horizontal page overflow, broken images, unexpected failed requests or browser console errors.
- Intentional horizontal category-tab scrolling excluded from element-overflow assertions.
- One H1 per page; five detail sections; working card navigation; exactly 14 unavailable detail states.
- Dark logo and Products active state on detail route passed.
- Mobile menu open and Escape close passed.
- Unknown and unconfigured product slugs returned HTTP 404.
- Reduced-motion emulation and content visibility with JavaScript disabled passed.
- Desktop hero and mobile image-in-view screenshots visually inspected.
- Existing shared-component image warnings were observed in the development log; no unrelated shared media changes were made.
- Browser checks used the development server; the production build was validated separately, not served for a second browser run.

Evidence: `docs/qa-evidence/product-details/results.json` and adjacent PNGs. Full-page screenshots may omit an offscreen raster image in headless capture; the separate hero mobile screenshot verifies its visible loaded state.

No commits or pushes were made. Exact reference matching, approved colours, actual technical specification rows and profile artwork remain dependent on supplied source material.