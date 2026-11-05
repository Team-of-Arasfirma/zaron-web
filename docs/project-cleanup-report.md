# Zaron structure inspection and cleanup — 24 October 2026

## Existing structure and baseline

The project already lives in frontend/. The initial Git status showed deleted root
Next.js configuration, package files, src/app files, and five starter public SVGs;
frontend/ and docs/ were untracked. These changes predate this cleanup. They were
not reverted, staged, committed, or treated as permission to delete anything else.

```text
zaron/
  .gitignore, AGENTS.md, README.md
  docs/frontend-foundation.md
  frontend/
    package.json, package-lock.json, next.config.ts, tsconfig.json
    eslint.config.mjs, components.json
    public/Banner/hero banner.png
    public/logo/zaron-b.png, zaron-w.png
    src/
      app/layout.tsx, globals.css, favicon.ico
      app/(website)/page.tsx
      app/(website)/{about,products,projects,blog,careers,contact}/page.tsx
      components/layout/{navbar,footer,container,section,page-intro}.tsx
      components/sections/home/{hero-section,intro-section}.tsx
      components/ui/button.tsx
      constants/site.ts
      hooks/README.md
      lib/utils.ts
      types/navigation.ts
```

No backend or admin implementation exists. No additional nested AGENTS.md was
found in the source inventory. Dependencies and assets were retained. Next.js
16.4.2's installed project-structure and layouts-and-pages guides were read before
editing; the installed Image guide was also consulted.

## Proposed and implemented minimal changes

Keep the existing directory structure. Add app/(website)/layout.tsx to own the
public Navbar, Footer, main landmark, and skip link. Keep app/layout.tsx responsible
for the document, fonts, global styles, and metadata. Future app/admin routes must
sit outside (website) and provide their own accessible main landmark.

Render the existing HeroSection from the homepage, correcting its asset reference
to the exact existing /Banner/hero banner.png name. Use absolute Navbar positioning
only when pathname is /. Other pages retain normal document flow and receive a
slate backing so the existing white glass navigation remains readable. The logo
remains 94 by 80 pixels. No negative margins are used.

Add root ignore rules for frontend's node_modules, .next, out, build and coverage.
The existing root-only patterns did not cover these nested generated directories.

No source files were moved. Public shell JSX and its imports were relocated from
the root layout to the new website layout. The homepage import changed from
IntroSection to HeroSection. No barrel exports or new dependencies were needed.

## Duplication, unused files, and deletion recommendations

| Exact path | Evidence and recommendation |
| --- | --- |
| frontend/src/components/sections/home/intro-section.tsx | Previously the actual homepage; now superseded by the existing HeroSection and has no remaining source imports. Retained. Recommend deletion only after explicit approval. Its aria-labelledby also includes an unresolved bg-red-600 ID token; do not reuse unchanged. |
| frontend/src/components/ui/button.tsx | No current consuming source import. Retain as the installed shadcn/Base UI primitive for planned features. |
| frontend/public/logo/zaron-w.png | No current source reference. Retain as a planned alternate logo; no deletion recommended. |
| frontend/src/app/favicon.svg | Automatically exposed by App Router convention; not unused merely because no import exists. Retain pending approved branded replacement. |
| frontend/src/hooks/README.md | Guidance only, no hook implementation. Retain; no empty hook files added. |
| README.md | Starter instructions assume a root package.json; commands should instead run in frontend/. Recommend updating documentation. Retained. |
| docs/frontend-foundation.md | Historical foundation notes describe a single link, server-only components, and root-owned public shell. Current Navbar is interactive and has seven links; the website layout now owns the shell. Retain as historical context; this report describes current architecture. |

HeroSection and IntroSection are alternative homepage implementations, not copied
implementations. No duplicate routes, repeated shell rendering, duplicate CSS
blocks requiring consolidation, or misplaced component files were identified.
PageIntro already consolidates the six inner-page heading implementations. Those
pages are linked by primaryNavigation, have distinct metadata, and must stay.
The utility module re-exports cn from the existing dependency; direct cn use in the
UI primitive does not duplicate the utility implementation.

No files or images were deleted or renamed. No extra placeholder sections,
backend, admin, or empty about-section directory was created.

## Assets, interaction, and design limits

Only three public assets exist: the factory banner and two logo variants. The
hyphenated Hero filename was broken and is corrected without renaming the asset.
The black Navbar logo path already matched its file exactly. All seven navigation
destinations correspond to page files, and Hero CTAs target /products and /contact.

The existing glass styling, Hero copy, colors, CTA layout, and responsive breakpoints
are retained. Hero content already has pt-32, below the approximately 102–106px
closed Navbar. The mobile dropdown remains a temporary overlay with Escape focus
return, click-to-close, reduced motion support, and aria-expanded state. Public
components render once. Future admin routes outside the group inherit no public
shell. No admin functionality was fabricated.

No Figma reference was supplied, so exact parity with an approved Figma design
cannot be certified. Browser-level mobile, zoom, visual, and interaction checks
remain a limitation of this source/build inspection. The installed Image guide
notes priority is deprecated in favor of preload, and quality 85 is outside the
default [75] allowlist; these existing settings are follow-up compatibility items,
not asset-path failures.

## Validation

Results are recorded below after completion. Run all npm commands in frontend/.
The initial TypeScript check found stale .next/types/validator.ts references to
old route locations (including page.jsage.js). A production build regenerates
route types; repeat TypeScript after that rather than editing generated files.

### Final results

- npm run lint: PASS, no warnings or errors after unused root-layout imports were removed.
- npx tsc --noEmit: PASS after the production build regenerated route types.
- npm run build: PASS with Next.js 16.4.2 / Turbopack; all seven website routes were prerendered successfully.
- Generated HTML verification: / contains exactly one header, footer, and main;
  Hero heading, encoded corrected banner URL, and homepage overlay classes are
  present; the placeholder intro is absent. /about also contains exactly one
  header, footer, and main, with normal-flow Navbar classes and no Hero heading.
- git diff --check: PASS for tracked changes (Git emitted only its CRLF conversion notice).
- Final Git status retains the pre-existing root deletions and untracked frontend/
  and docs/. The only newly modified tracked file is .gitignore. Generated
  frontend dependencies/build files are ignored.

The final architecture is the existing structure above plus
frontend/src/app/(website)/layout.tsx and this report. No additional directories
are needed until real features require them. No dependency changes, commits,
pushes, or deployments were performed.
