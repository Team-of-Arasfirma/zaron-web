# Zaron frontend QA audit — 1 November 2026

## A. Overall status

The existing frontend was inspected and targeted defects were fixed while preserving the existing assets, brand colors, desktop layout, and animation intent. The site is not ready for deployment: Products is a placeholder, forms have no submission services, and approved content/SEO/accessibility decisions remain outstanding.

- Content routes inspected: **13** (7 main routes and 6 published articles).
- Grouped issues identified: **26**; **16 fixed**, **10 outstanding**. Counts group related symptoms with the same component or dependency; they are not counts of individual DOM nodes.
- Browser coverage: production build in installed Microsoft Edge, headless. Eight requested widths: 320, 375, 430, 768, 1024, 1280, 1440, 1920px. Heights: 740px for mobile and 900px otherwise, plus 480px menu and 450px reflow checks.
- Backend integration readiness: Contact and Careers validation can be integrated; the whole frontend is not feature complete. No backend or database code was changed.
- Original worktree already contained a frontend relocation and many uncommitted/untracked files. Those changes were preserved. No commit or push was performed.

## B. Page-by-page results

“Layout checked” means automated overflow/heading/image checks at the listed widths. Full-page screenshots were visually reviewed at 320px and 1440px for the main layouts and representative article template. This is not a Figma pixel comparison: no Figma source was supplied. All six article routes were exercised, but not every screenshot was individually reviewed pixel by pixel. Tablet results are automated layout checks, not a claim of manual visual review of every section.

| Page | Desktop | Tablet | Mobile | Animation | Console | Status |
|---|---|---|---|---|---|---|
| Home `/` | Layout checked | Layout checked | Layout checked | Carousel arrows/dots/progress/touch tested; reveals inspected | No errors in final matrix | Carousel clipping fixed; content/contrast review remains |
| About `/about` | Layout checked | Layout checked | Shape text fixed | Reduced-motion hydration fixed; count-up and Journey inspected | No errors in final matrix | Final reveal-overflow recheck recorded separately |
| Products `/products` | Placeholder checked | Placeholder checked | Placeholder checked | Shared UI only | No errors | Incomplete listing/detail/gallery/download features |
| Projects `/projects` | Layout checked | Layout checked | Hero overlap fixed | Filters and empty state tested | No errors | Functional; Roofing category currently has no entries |
| Blog `/blog` | Layout checked | Layout checked | Layout checked | Card reveals inspected | No errors | Six articles; no category filters |
| Benefits of PPGI Coils | Layout checked | Layout checked | Layout checked | Shared UI inspected | No errors | Root URL and legacy redirect tested |
| Understanding C & Z Purlins | Layout checked | Layout checked | Layout checked | Shared UI inspected | No errors | Root URL and legacy redirect tested |
| Decking Sheets | Layout checked | Layout checked | Layout checked | Shared UI inspected | No errors | Root URL and legacy redirect tested |
| Standing Seam Roofing | Layout checked | Layout checked | Layout checked | Shared UI inspected | No errors | Root URL and legacy redirect tested |
| Tile Roofing | Layout checked | Layout checked | Layout checked | Shared UI inspected | No errors | Root URL and legacy redirect tested |
| Large-scale Industrial Roofing | Layout checked | Layout checked | Layout checked | Shared UI inspected | No errors | Root URL and legacy redirect tested |
| Careers `/careers` | Layout checked | Layout checked | Layout/modal checked | Reveals and reduced-motion hydration checked | No errors | Six demo vacancies; backend pending |
| Contact `/contact` | Layout checked | Layout checked | Form/icons checked | Reveals inspected | No errors | Validation and live map tested; backend pending |

Published article paths:

- `/benefits-of-ppgi-coils`
- `/understanding-c-z-purlins`
- `/decking-sheets-for-multi-storey-structures`
- `/standing-seam-roofing`
- `/tile-roofing-style-and-protection`
- `/large-scale-industrial-roofing`

## C. Issue log

| ID | Page / Component | Severity | Issue | Root Cause | Fix | Verification |
|---|---|---|---|---|---|---|
| F01 | Navbar, all routes | High | Menu could exceed a short viewport and leave background scrolling | No menu height cap or scroll lock | Dynamic viewport cap, internal scrolling, body overflow restored on close | 375×480 menu tests across main routes and article |
| F02 | Navbar, all routes | High | Keyboard focus could leave open menu; desktop resize left stale state | No focus cycle or breakpoint cleanup | Cycle toggle/menu links, focus toggle on Escape, close on desktop breakpoint | Keyboard, navigation, resize assertions |
| F03 | Products navbar | High | White navigation on a light placeholder background | Products omitted from light-theme selection | Use existing light navbar variant | Browser screenshots; no navbar dimensions changed |
| F04 | Careers job cards | High | Button nested inside an article acting as a button | Two interactive layers | One native Apply button with a stretched hit area; article retains semantics and full-card click area | All six dialogs and return focus tested; no nested button roles |
| F05 | About Mission/Vision | High | Mobile text escaped the slanted shapes | Fixed height with absolutely positioned content | Content participates in sizing; preserve SVG shapes and desktop minimum heights | Screenshots and containment checks at all eight widths |
| F06 | Projects hero | High | Mobile/tablet illustration overlapped the description | Large absolute illustration without reserved space | Reserve image space below text only below desktop breakpoint | Before/after screenshots; desktop positioning preserved |
| F07 | Contact support | Medium | Social controls squeezed into a narrow panel | Fixed gaps without wrapping | Wrap controls and reduce small-screen gap | Mobile screenshot and layout check |
| F08 | Contact form | Medium | Invalid submission left focus on the submit button | Custom validation did not focus an error | Focus the first invalid field | Empty submission gives four invalid fields and focuses name |
| F09 | About statistics | High | Hydration error under reduced motion | Server rendered zero; first client render rendered target | Use a hydration snapshot before showing final reduced-motion values | Baseline React error reproduced; final reduced-motion checks clean |
| F10 | Shared focus/anchors | Medium | Inconsistent keyboard outlines and section targets hidden by fixed header | Only some controls/sections had local treatment | Shared focus-visible fallback and 130px section scroll margin | Source inspection and keyboard checks |
| F11 | Products page | Medium | Missing main landmark | Placeholder returned a section directly | Wrap existing placeholder in main | Route inspection and build |
| F12 | Projects metadata | Medium | Projects inherited generic site metadata | No page metadata export | Page-specific title/description using existing page subject matter | Build and source inspection |
| F13 | CTA/font loading | Medium | Eager below-fold CTA image and unused monospace font preload | Route-dependent eager image and default font preload | Lazy CTA image; remove unnecessary client routing dependency; disable mono preload | Build, source inspection, final matrix has no preload warnings |
| F14 | Home products carousel | High | Side-card Explore links were clipped | Non-shrinking image exhausted fixed-height card space | Allow image flex shrink within existing card heights/widths | All eight width containment checks; screenshots |
| F15 | Contact directions | Medium | Embed and outgoing directions used separate location sources | Opaque short URL versus configured office address | Generate directions destination from the same office address | Link inspection and live map screenshot |
| F16 | About Who We Are | High | Offscreen reveal caused 3px page overflow at 640px | Initial positive x transform extended past section edge | Contain horizontal animation overflow on that section | Targeted reflow recheck; see final verification addendum |
| R01 | Products | High | Listing/categories/details/colors/galleries/brochures absent | Page is only “Welcome to Products” | Await approved UI and product data; no data invented | Route/source inventory |
| R02 | Contact | High | Cannot submit enquiries | No submission endpoint | Connect actual API, loading/error/success states, server validation | Form truthfully says unavailable; no false success |
| R03 | Careers | High | Vacancies are demo data and applications cannot be sent | Preview implementation only | Confirm jobs and integrate application/resume service | All six preview dialogs validated |
| R04 | Footer legal | Medium | Terms and Privacy are plain text; no legal routes | Approved legal content/pages absent | Supply approved content and implement routes later | Source/route inventory; no dead fake links added |
| R05 | Footer social | Medium | Four icons are inactive placeholders | Empty social URLs | Supply verified company links | Source inspection; icons render as spans |
| R06 | Contact social | High | Instagram/Facebook/YouTube reference Rajalakshmi Roofing | Ownership/brand relationship not established by this project | Confirm intended accounts before changing destinations | URLs inspected; not generic platform homepages |
| R07 | Company facts | High | Capacity and office hours conflict across sections | Separate hard-coded copy | Obtain approved values and reconcile | Home: 100,000+ MT/year; accomplishments: 50,000+; About: 2,300+; footer Mon–Sat versus Contact Mon–Fri. Values preserved |
| R08 | Global SEO | High | Temporary description; no canonical base, sitemap or robots file | Deployment domain/approved metadata not configured | Confirm production origin and copy, then add canonical URLs and discovery files | Source inventory; redirects work but canonical SEO remains incomplete |
| R09 | Text contrast | High | Existing approved combinations have insufficient contrast | Brand/text/background choices | Obtain approved accessible color treatment without silently changing brand palette | Calculated white/orange #FF6500: 2.95:1; white/About gray #A7A7A7: 2.41:1; #858585 on white: 3.69:1. Full accessibility sign-off not claimed |
| R10 | Media/content readiness | Medium | Large source assets and decorative video affordance | Multi-MB PNG originals; no CTA video interaction | Review same-image lossless/visual-quality optimization; supply higher-resolution hero if required; confirm video intent | Largest PNG 5.86 MB; home hero 1672×941 may upscale at 1920/high DPR; no approved images replaced |

## D. Validation results and limits

- **TypeScript:** `npx tsc --noEmit` executed successfully on the fixed frontend. Final narrow-fix check is recorded in the addendum.
- **ESLint:** `npm run lint` executed successfully with no reported errors/warnings. No blanket suppressions or unsafe type workarounds added.
- **Production build:** `npm run build` executed successfully; Next 16.4.2 generated all main pages and six static article paths. Final narrow-fix check is recorded in the addendum.
- **Responsive matrix:** 104 production-browser cases completed, all content routes returned 200, one h1 per route, no document horizontal overflow after scrolling all sections. The extra 640px pre-scroll test found F16, which received a separate targeted fix/recheck.
- **Browser console/network:** final 104-case matrix recorded zero console warnings/errors, zero runtime exceptions, and zero failed/HTTP-error requests. The initial run had preload warnings; final run did not reproduce them. This is observed coverage, not a guarantee against intermittent warnings on every device.
- **Carousel overflow flags:** the raw probe intentionally reports partially visible next-card content and desktop side-selection hit areas outside the viewport. These are contained by the carousel and do not increase document scroll width. A not-yet-loaded watermark in a hidden slide appears under the raw `broken` field at 320px; its SVG exists and there was no failed request. That raw label does not prove a broken asset.
- **Interactions:** navigation body lock/Escape/focus/route close/resize, arrows/dots/progress/touch swipe, project category counts/empty state/image dimensions, Contact required/email/mobile validation, all six career positions/dialogs/focus restoration, resume extension/MIME/5 MB limits, truthful unavailable notices tested. Native browser constraints remain active. Test inputs were synthetic, and no candidate or enquiry data was submitted externally.
- **Routing:** all six legacy `/blog/{slug}` URLs return permanent **308** redirects to root slugs. Blog navigation is active on articles. Unknown root slug, unknown legacy blog path, and nonexistent product detail return **404**. Reserved slugs are validated in the existing routing helper. No extra product/legal pages were invented.
- **Assets:** 39 local source references covering 32 unique asset paths checked; none missing. Six Pexels article images loaded through the configured optimizer. Configured qualities are 75/85 and all explicit quality=85 uses are allowed. Existing alt text and image sizing were inspected; no replacements made.
- **Maps:** focused browser check loaded Google Maps and visibly showed Zaron Industries at the configured Palangarai address. Evidence: `qa-evidence/map-final.png` and `map.json`. Baseline full-page captures could show a blank lazy iframe because they scroll past it quickly; the focused test resolves this ambiguity.
- **Animations:** existing Motion reveals, hover styles, carousel transitions, filtering and count-up inspected. Journey moving point and track share the same path; center logo is outside the rotating ring. Reduced motion removes moving-dot SMIL animations and displays final statistics with no hydration error. No new decorative animations added. Frame-rate/performance profiling of every animation was not performed.
- **Accessibility:** native job button semantics, form labels/errors, dialog focus cycle/Escape/restoration and menu keyboard use tested. Not a full WCAG or screen-reader certification. Existing contrast issues remain R09. Touch target sizes were inspected; small brand/design controls are not asserted to meet an across-the-site 44px policy.
- **Zoom:** automated 640 CSS-pixel reflow approximates a 1280px browser at 200% zoom. Actual desktop browser zoom controls, mobile Safari, Firefox and physical devices were not tested.
- **Lighthouse:** not installed in the available project/runtime; no Lighthouse score claimed. No dependencies were installed for the audit.
- **Performance:** local unthrottled Edge measurements (1440×900, one navigation per route) are in `qa-evidence/performance.json`: initial LCP samples 444–1600ms, initial 2.5-second CLS samples 0. These are local observations, not field Core Web Vitals or deployment estimates. INP was not measured. Source PNG byte sizes are not the same as optimized network-transfer sizes.

## E. Modified files

All paths below are relative to `Z:\user\Desktop\zaron`.

| Source file | Responsibility / affected routes | Reason |
|---|---|---|
| `frontend/src/app/layout.tsx` | Root fonts, all routes | Stop unused monospace preload |
| `frontend/src/app/globals.css` | Shared styles, all routes | Keyboard focus fallback and anchor offset |
| `frontend/src/app/(website)/products/page.tsx` | Products route | Main landmark |
| `frontend/src/app/(website)/projects/page.tsx` | Projects route | Specific metadata |
| `frontend/src/components/layout/navbar.tsx` | Navigation, all routes | Light Products variant, bounded menu, lock, focus, resize cleanup |
| `frontend/src/components/sections/about/mission-vision.tsx` | About shape cards | Size content without text spilling |
| `frontend/src/components/sections/about/manufacturing-capability.tsx` | About count-up | Hydration-safe reduced-motion final values |
| `frontend/src/components/sections/about/who-we-are.tsx` | About reveal | Contain offscreen transform overflow |
| `frontend/src/components/sections/careers/job-card.tsx` | Careers cards | One native button with full-card hit area |
| `frontend/src/components/sections/contact/contact-form.tsx` | Contact validation | Focus first invalid field |
| `frontend/src/components/sections/contact/contact-support.tsx` | Contact support | Wrap narrow social controls |
| `frontend/src/components/sections/contact/contact-map.tsx` | Contact map links | Same address for embed and directions |
| `frontend/src/components/sections/home/cta-image.tsx` | Shared CTA, all routes | Lazy image and remove unnecessary client component |
| `frontend/src/components/sections/home/products-section.tsx` | Home carousel | Allow image to shrink so links fit |

Added audit artifacts:

- `docs/frontend-qa-audit-2026-11-01.md`: this report.
- `docs/qa-browser.cjs`: full route/viewport/screenshot probe.
- `docs/qa-interactions.cjs`: assertion-based browser interaction suite; optional regex argument selects targeted rechecks.
- `docs/qa-assets.cjs`: local reference audit.
- `docs/qa-map.cjs`: focused external map verification.
- `docs/qa-performance.cjs`: local LCP/CLS sampling.
- `docs/qa-reduced.cjs`: initial reduced-motion diagnostic.
- `docs/qa-fixes-applied.txt`: non-executable record of the initial applied edits, not a reusable migration.
- `docs/qa-evidence/*`: before/after PNGs and machine-readable results; every generated file is enumerated in `docs/qa-evidence-manifest.txt`.
- `docs/qa-evidence-manifest.txt`: full evidence file inventory.

QA scripts reference the available bundled Playwright runtime and installed Edge. Adjust those environment-specific paths if rerunning elsewhere. No application dependency/package/config changes were required.

## F. Outstanding work

Finish the approved Products UI with actual product data and brochures; approve legal pages, social accounts, company facts and metadata; choose accessible approved contrast treatments; confirm video/media requirements; configure canonical URLs/sitemap/robots for the production origin; integrate Contact/Careers APIs with real submission states and server-side validation. Then test the integrated application on deployed infrastructure and additional browser/device families.

## G. Recommendation

**Continue frontend completion first.** Contact and Careers can begin backend API integration in parallel once endpoint and upload contracts are agreed. An admin dashboard should follow confirmed content workflows. Deployment preparation should wait until R01–R09 and any required media deliverables have been resolved. The current site is a validated frontend preview, not a production-ready application.

## Final verification addendum

After F16, TypeScript, ESLint and the production build all passed again. About was rechecked at all eight requested widths: **8/8 successful**, no overflow, console entries or failed requests. The 640px reflow check passed across all main routes plus a representative article. Mission/Vision and carousel containment passed at every requested width; reduced-motion hydration/counts/Journey checks passed again.

Combined final interaction status: **10/10 groups passed**. `qa-evidence/interactions.json` merges the full suite with the targeted final-build rechecks; `interactions-before-final-overflow-fix.json` preserves the prior About failure, and `interactions-first-run.json` preserves early test-harness locator/tab-order failures. The harness was corrected without changing working application behavior to accommodate those assumptions.

Machine-readable final summary: `qa-evidence/validation-summary.json`. Full 104-case matrix: `final.json`. Last About-only matrix: `about-final.json`. The temporary local QA server was stopped after verification.
