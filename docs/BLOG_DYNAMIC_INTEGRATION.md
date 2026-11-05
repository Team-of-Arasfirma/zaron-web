# Dynamic blog integration

## Routes and design

/blog keeps the existing hero and animated article cards, adding API-backed content, pagination, empty/unavailable behavior and listing loading UI. Existing article URLs remain /:slug, including all six legacy slugs. /blog/:slug redirects only when the article is published. Static /about, /products, /projects, /blog, /careers and /contact routes remain intact; the API also rejects these reserved article slugs.

The existing article header, cover, content column, related cards, navbar and footer design remain. RichContent replaces only the paragraph renderer. A generic hardcoded takeaway previously shown on every article was removed because it was outside the stored article content. Navbar article detection recognizes root-level dynamic articles without importing static article bodies; its visual styles remain unchanged.

## Fetching and publication

lib/blog-api.ts is server-only. Set BLOG_API_URL to the absolute API base including /api. In local development use BLOG_API_URL=http://127.0.0.1:5001/api in .env.local. Set SITE_URL to the actual website origin for canonical URLs. Production values are deployment-specific; no local URL is embedded in production source.

fetch uses cache:no-store and an 8-second timeout. React.cache deduplicates detail fetches for metadata/page within the request. New HTTP requests read the latest published state; no webhook/revalidation secret is required. Existing open browser tabs do not update themselves. Drafts/unpublished details return 404; API outage produces controlled unavailable UI rather than a false missing article. Listing fetch failure leaves the hero and navigation visible with Retry.

Public summary requests use page/limit 12 and descending publication date then _id. Related articles use the latest summary page, excluding the current article. All dates render in UTC from database ISO dates.

## Content and SEO

Render structured Tiptap JSON using React tags and escaped text, never dangerouslySetInnerHTML. The renderer whitelists safe URL protocols and bounds depth. Styles cover headings, lists, quotes, links, images and paragraphs. Public metadata uses SEO title/description with article fallbacks, Open Graph article metadata, cover image and canonical URL. Use SITE_URL for production canonical origins.

Pexels legacy images remain configured, and Cloudinary is added to Next Image remote patterns. CMS cover images retain Next Image layout and responsive sizing but use unoptimized CDN delivery, avoiding a second server-side fetch and supporting manually entered safe HTTPS URLs. Inline images are normal lazy images with safe sources and alt text. The detail route deliberately has no loading boundary so unavailable articles can return HTTP 404 before streaming begins.

## Migration and configuration

All six original source records remain in src/data/blogs.ts solely as migration input. Runtime listing/detail/navbar no longer import it. src/lib/blog-routes.ts is retained as a legacy utility but has no runtime callers. The migration reads source data dynamically; it does not use a second hardcoded content copy. The reviewed dry run reports six inserts. Real migration/persistence remains blocked by MongoDB's disk safeguard. Until configured and migrated, production-source pages show controlled empty/unavailable states rather than fabricated static fallback articles.

NEXT_DIST_DIR optionally selects a separate Next build directory for isolated browser testing; default remains .next. Browser QA uses .next-blog-qa to avoid the regular development server. BLOG_API_URL and SITE_URL are server-only. Restart the development server if environment changes are not picked up.

## Checks and limitations

Read the installed Next.js 16.4.2 fetching/metadata guides before changes. Run npx tsc --noEmit, npm run lint and npm run build. Existing docs/qa-*.cjs scripts cause unrelated full-project lint failures; source-only lint isolates the blog result. Browser evidence lives under admin/qa/evidence/blog. QA fixtures are explicitly in-memory; they cannot verify real database persistence or live Cloudinary uploads. MongoDB error 14031 requires restoring disk capacity without editing database files or disabling safeguards.

Use backend/docs/BLOG_IMPLEMENTATION_REPORT.md for the final validation record. No products, projects, careers or other admin modules were implemented.
