# Zaron frontend foundation

## Structure

- src/app/: routes, root document, shared shell, and metadata.
- src/components/layout/: Navbar, Footer, Container, and Section.
- src/components/sections/home/: server-rendered homepage sections.
- src/components/ui/: existing shadcn Nova / Base UI primitives, preserved.
- src/lib/: existing utilities, preserved.
- src/hooks/: reusable browser hooks, added only when required.
- src/constants/: site metadata and approved navigation destinations.
- src/types/: shared contracts; local props remain beside components.

Import components directly rather than through broad barrel exports. Compose
homepage sections in the page. The root layout owns the only main landmark,
Navbar, Footer, and keyboard skip link. Each Section requires aria-labelledby
pointing to its visible heading. Container controls shared width and mobile-first
horizontal gutters; Section controls vertical spacing.

## Rendering and interaction

All new components currently render on the server. There is no animation or
mobile-menu JavaScript for the single navigation destination. Add a small client
component only when interaction is needed. Keep Motion imports inside those
client components, respect reduced-motion preferences, and leave meaningful
content visible without animation. Use Lucide icons where useful, label icon-only
controls, and hide decorative icons from assistive technology.

Use existing neutral theme tokens and Geist fonts until branding is approved.
The text wordmark is a placeholder, not a logo design. Temporary metadata and
page copy are explicitly labelled. Do not add guessed addresses, statistics,
product claims, navigation routes, structured data, or canonical URLs.

## Approval required before visual branding

1. Approved logo files (prefer SVG), variants, clear space and usage rules.
2. Brand palette and foreground/background combinations with accessible contrast.
3. Typography, font licences, weights and hierarchy; retain Geist meanwhile.
4. Owned/licensed industrial and product photographs, crops and alt-text context.
5. Approved sitemap, navigation labels, homepage section order and calls to action.
6. Approved company/product copy, SEO description and public contact information.
7. Reference layouts, density, corner treatment and motion direction.
8. Production domain and sharing assets before canonical/Open Graph URLs are added.

This is a neutral structural foundation. Premium visual branding and business
claims await approval. Remaining starter SVGs and the favicon are preserved.

## Validation

Run npm run lint, npx tsc --noEmit, and npm run build from the project on Z:.
No dependency or build configuration changes are needed for this foundation.
