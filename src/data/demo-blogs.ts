import type { PublicBlog } from "@/lib/blog-api";
import type { RichNode } from "@/components/sections/blog/rich-content";

// Isolated demo dataset; the CMS client and existing stored articles remain intact.
export type DemoArticle = PublicBlog & { category: string; categorySlug: string };
const text = (value: string): RichNode => ({ type: "text", text: value });
const p = (value: string): RichNode => ({ type: "paragraph", content: [text(value)] });
const h = (value: string, level = 2): RichNode => ({ type: "heading", attrs: { level }, content: [text(value)] });
const list = (values: string[], ordered = false): RichNode => ({
  type: ordered ? "orderedList" : "bulletList",
  content: values.map(value => ({ type: "listItem", content: [p(value)] })),
});
const photo = (id: number, extension = "jpeg") =>
  "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id + "." + extension + "?auto=compress&cs=tinysrgb&w=1200";
type ArticleInput = Omit<DemoArticle, "authorName" | "seo" | "content"> & { body: RichNode[] };
function article({ body, ...fields }: ArticleInput): DemoArticle {
  return { ...fields, authorName: "Zaron Editorial Team",
    seo: { title: fields.title, description: fields.excerpt },
    content: { type: "doc", content: body.map((node, index) => {
      const intro = node.content?.[0]?.text;
      if (index !== 0 || node.type !== "paragraph" || !intro) return node;
      const sentences = intro.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) ?? [intro];
      return { ...node, content: sentences.map((sentence, sentenceIndex) => ({
        type: "text", text: sentence,
        ...(sentenceIndex < 2 ? { marks: [{ type: sentenceIndex === 0 ? "bold" : "italic" }] } : {}),
      })) };
    }) } };
}
export const demoArticles: DemoArticle[] = [
  article({
    id: "demo-1", title: "Best Roofing Sheets in India",
    category: "Roofing Sheets", categorySlug: "roofing-sheets", slug: "best-roofing-sheets-in-india",
    publishedAt: "2026-11-01", coverImage: photo(34006096),
    coverAlt: "Geometric metal roof panels forming a modern industrial roof structure",
    excerpt: "Compare roofing sheet options and learn how climate, building use and installation details shape a practical material choice.",
    body: [
      p("The best roofing sheet is the one that fits the building, its surroundings and the way it will be used. A warehouse near the coast, a workshop inland and an open agricultural shelter face different conditions. Start with the project brief rather than a single material name or a headline price."),
      h("Understand the main options"),
      p("Profiled steel sheets are widely used for industrial roofs and cladding. Colour-coated sheets add a factory-applied finish, while aluminium may be considered where weight and exposure are important. Translucent sheets can introduce daylight in selected roof zones, but require their own detailing and support checks."),
      h("Compare the complete roof assembly", 3),
      p("A sheet works together with purlins, fasteners, insulation, flashings and gutters. Comparing sheet prices alone can overlook the accessories and installation work needed to complete the roof. Ask each supplier to quote against the same drawings and specification."),
      list(["Describe the site environment, including coastal or industrial exposure.", "Confirm roof geometry, drainage routes and planned roof openings.", "Ask the project engineer to specify loads, support spacing and fixing requirements.", "Compare material documentation, installation guidance and maintenance obligations."]),
      h("Plan for climate and daily use"),
      p("Indoor comfort depends on more than roof colour. Ventilation, insulation, condensation control and the activities inside the building all matter. Coordinate these elements before ordering sheets so later additions do not create avoidable penetrations or awkward junctions."),
      { type: "paragraph", content: [text("A useful principle is "), { type: "text", text: "specify the roof as a system", marks: [{ type: "bold" }] }, text(", then choose a suitable sheet. Treat early comparisons as "), { type: "text", text: "project planning", marks: [{ type: "italic" }] }, text(" rather than a substitute for an engineered design.")] },
      h("Turn the shortlist into a clear enquiry"),
      list(["Prepare drawings and a brief describing the building use.", "Request comparable material and accessory schedules.", "Review installation responsibilities and handover documents before ordering."], true),
      p("Consider transport, safe handling, installation and future access as part of the purchase. Keep the approved specification with the building records so replacement components can be identified later."),
    ],
  }),
  article({
    id: "demo-2", title: "Benefits of Standing Seam Roofing",
    category: "Standing Seam", categorySlug: "standing-seam", slug: "benefits-of-standing-seam-roofing",
    publishedAt: "2026-10-28", coverImage: photo(17870965, "png"),
    coverAlt: "Raised seams on a metal roof reflecting sunlight against a blue sky",
    excerpt: "Explore concealed fixings, clean roof lines and the design considerations behind a well-planned standing seam roof.",
    body: [
      p("Standing seam roofing creates a distinctive surface with raised longitudinal seams. The appearance can suit both industrial buildings and architectural projects. Its advantages depend on the selected system and careful coordination of panels, clips, supports and perimeter details."),
      h("Clean lines with concealed fixings"),
      p("Many standing seam systems use concealed clips rather than exposed fasteners through the main panel surface. This can reduce exposed fixing penetrations. The roof still needs carefully designed flashings, penetrations and junctions; concealed fixings do not remove the need for installation checks."),
      h("Allowing for thermal movement", 3),
      p("Metal expands and contracts as its temperature changes. Suitable clip arrangements and fixed points allow movement in the way intended by the system designer. Panel length, support layout and installation temperature should be considered together rather than decided independently on site."),
      list(["Discuss panel geometry and permitted roof slopes with the system supplier.", "Coordinate clip type and fixing positions with the structural design.", "Detail rooflights, vents and service penetrations before installation.", "Use compatible accessories and the recommended seaming equipment."]),
      h("Appearance and practical design"),
      p("The uninterrupted lines of a standing seam roof can help define a building's architectural character. Seams create a regular rhythm that should be coordinated with elevations, gutters and roof-mounted equipment. Early setting-out reduces narrow infill panels and awkward edge conditions."),
      { type: "blockquote", content: [p("A roof's appearance begins on the drawing board, but its reliability depends on the details at every edge, seam and opening.")] },
      h("Questions to resolve before installation"),
      list(["Agree the panel layout and safe material handling.", "Review sample junction details with the installer and designer.", "Set inspection stages for clips, seams, flashings and drainage.", "Record the installed system and maintenance instructions."], true),
      p("Standing seam roofing is a system choice rather than a universal upgrade. Compare its installation needs, visual character and maintenance access with other suitable assemblies. Request project-specific guidance before selecting materials or making performance assumptions."),
    ],
  }),
  article({
    id: "demo-3", title: "Colour Coated Roofing Sheets: Complete Guide",
    category: "Roofing Sheets", categorySlug: "roofing-sheets", slug: "colour-coated-roofing-sheets-guide",
    publishedAt: "2026-10-24", coverImage: photo(9335811),
    coverAlt: "Bright blue coated metal roof with ventilation pipes beneath a clear sky",
    excerpt: "Understand substrates, finishes, colour selection and handling when specifying colour coated metal roofing sheets.",
    body: [
      p("Colour coated roofing combines a metal substrate with a factory-applied coating system. It offers a finished surface for roofs and cladding, but colour is only one part of the specification. The substrate, protective layers, profile and installation details should all suit the intended environment."),
      h("Look beneath the visible finish"),
      p("Two sheets with a similar colour may have different substrates or coating systems. Ask for documentation identifying the supplied material rather than relying on a colour sample alone. The project specification should distinguish the base material, protective coating and finish where those details are required."),
      h("Select colour in context", 3),
      p("Review samples in daylight alongside the proposed wall finishes and surroundings. Screen images are useful for shortlisting, but displays can change the appearance of a colour. If multiple deliveries are expected, discuss batch consistency and the installation sequence with the supplier."),
      list(["Confirm the intended exposure and building use.", "Review material identification and coating documentation.", "Agree colour, profile and accessory finishes.", "Check handling, storage and cleaning instructions before delivery."]),
      h("Protect the finish during handling"),
      p("A good finish can be damaged before the roof is complete. Plan unloading, dry storage and sheet movement to avoid dragging surfaces or trapping moisture between stacked panels. Follow the supplier's instructions for protective films, cutting methods and removal of metal debris."),
      h("Coordinate the surrounding components"),
      p("Ridges, eaves, valleys and penetrations need flashings suited to the roof geometry. Fasteners and sealants should be compatible with the chosen materials. Discuss dissimilar metals and drainage from adjacent surfaces with the designer so the complete assembly is considered."),
      { type: "image", attrs: { src: photo(34006096), alt: "Geometric metal roofing showing a coordinated panel layout" } },
      h("Keep useful records"),
      list(["Retain the approved material description and colour reference.", "Record the supplier's cleaning and inspection guidance.", "Keep photographs and accessory details for future maintenance."], true),
      p("Regular inspections help identify debris, damaged coatings and drainage problems early. Repairs should follow the material supplier's advice; a visually similar paint is not automatically a suitable repair system."),
    ],
  }),
  article({
    id: "demo-4", title: "How to Choose Roofing for Industrial Buildings",
    category: "Industrial Roofing", categorySlug: "industrial-roofing", slug: "how-to-choose-industrial-roofing",
    publishedAt: "2026-10-20", coverImage: photo(20507715),
    coverAlt: "Industrial warehouse exterior with a broad metal roof and rooflights",
    excerpt: "Build a clear roofing brief around operations, drainage, daylight, maintenance access and coordinated structural design.",
    body: [
      p("An industrial roof protects people, equipment and business operations. Selecting it involves more than choosing a sheet profile. The building's activities, the site environment and the planned service life should inform a brief that the architect, engineer, supplier and installer can work from."),
      h("Start with the operational brief"),
      p("Describe what will happen inside the building. Heat-producing processes, stored goods, moisture and airborne contaminants can affect roof design decisions. Future expansion, ventilation equipment and service routes should be discussed while changes can still be made on the drawings."),
      h("Coordinate structure and weather protection", 3),
      p("Roof panels transfer loads to their supports through a defined fixing arrangement. The engineer should establish the design requirements and confirm the supporting structure. At the same time, drainage must account for roof geometry, valleys, gutters and safe discharge points."),
      list(["Building use and internal environmental conditions.", "Site exposure, surrounding buildings and local weather.", "Insulation, ventilation and condensation-control strategy.", "Roof openings, equipment supports and maintenance routes."]),
      h("Balance daylight with roof coordination"),
      p("Rooflights may help bring daylight into deep floor plans. Their placement needs to work with the structural grid, internal layout and roof drainage. Coordinate the junction between rooflight and metal sheet, and make provision for inspection without treating rooflights as walking surfaces."),
      h("Compare proposals on a common basis"),
      list(["Issue the same roof plan and brief to each supplier.", "Request an itemised scope covering accessories and installation.", "Identify who is responsible for interfaces and penetrations.", "Review maintenance access and handover documentation."], true),
      p("A lower initial quotation can represent a different scope. Check whether insulation, gutters, flashings, lifting arrangements and finishing work are included before comparing totals. This helps the team identify omissions while the design remains flexible."),
      h("Plan for the building after handover"),
      p("Allow for safe inspection and cleaning from the outset. Record the materials, installed details and supplier guidance so the facilities team can maintain the roof consistently. Changes such as solar installations or new extract ducts should be reviewed before anything is attached."),
    ],
  }),
  article({
    id: "demo-5", title: "Essential Metal Roof Maintenance Tips",
    category: "Roofing Tips", categorySlug: "roofing-tips", slug: "metal-roof-maintenance-tips",
    publishedAt: "2026-10-16", coverImage: photo(21858900),
    coverAlt: "Weathered corrugated metal warehouse showing surfaces that need condition monitoring",
    excerpt: "Create a practical inspection routine for drainage, coatings, flashings and roof records, with safe access planned first.",
    body: [
      p("Metal roof maintenance begins with observation and good records. A consistent inspection routine can reveal blocked drainage, displaced flashings or local coating damage before the effects become more disruptive. The right interval depends on the location, roof system and supplier's guidance."),
      h("Plan safe access before an inspection"),
      p("Roof work should be carried out by competent people using an agreed access and protection plan. Inspect from ground level or another safe position where practical. Rooflights and fragile areas need particular care, and a roof should never be assumed safe to walk on because it appears sound."),
      h("What to look for", 3),
      list(["Debris collecting at gutters, outlets and valleys.", "Loose or damaged flashings around edges and penetrations.", "Visible coating damage, staining or signs of corrosion.", "Unexpected movement or displaced panels after storms.", "Evidence of moisture inside the building that needs investigation."]),
      h("Keep drainage paths clear"),
      p("Leaves, packaging and windblown debris can obstruct water flow. Cleaning should follow an approved method that protects the roof finish and keeps people away from unprotected edges. Avoid pushing debris into downpipes, where a blockage may become harder to identify."),
      h("Respond to damage with the right repair"),
      p("Record the location and extent of a defect before arranging repairs. Use the original system details to identify compatible materials and obtain supplier advice for coating repairs or replacement accessories. Applying sealant without understanding the source of water entry can hide the symptom while leaving the cause unresolved."),
      { type: "blockquote", content: [p("A maintenance record is most useful when it connects an observation, a photograph, an action and a follow-up date.")] },
      h("Build a repeatable routine"),
      list(["Review previous notes and known problem areas.", "Record observations with dated photographs and locations.", "Assign repair work to suitable specialists.", "Confirm completed work and update the records."], true),
      p("After severe weather or work by other trades, consider an additional inspection under the building's maintenance plan. Keep cleaning products, tools and repair methods consistent with the supplier's instructions to avoid unintended damage."),
    ],
  }),
  article({
    id: "demo-6", title: "Modern Metal Roofing Solutions",
    category: "Metal Roofing", categorySlug: "metal-roofing", slug: "modern-metal-roofing-solutions",
    publishedAt: "2026-10-12", coverImage: photo(38749884),
    coverAlt: "Construction workers coordinating roof insulation sheet installation",
    excerpt: "See how profiles, insulation, architectural details and service coordination come together in modern metal roof design.",
    body: [
      p("Modern metal roofing brings together material selection, fabrication and coordinated detailing. A roof may use profiled sheets, standing seam panels or an insulated assembly, depending on the building's needs. The starting point is a clear brief that connects appearance with practical operation."),
      h("Choose a system around the building"),
      p("Profiled sheets can suit straightforward industrial layouts, while standing seam systems offer a different seam pattern and fixing approach. Insulated assemblies combine several roof functions, but their joints, supports and penetrations still require careful coordination. No single system suits every project."),
      h("Connect roof design with indoor conditions", 3),
      p("Insulation, ventilation and vapour control should be considered together. The intended internal conditions and local climate influence the build-up that the designer specifies. Adding insulation later without reviewing the assembly can create difficult junctions or leave condensation risks unresolved."),
      list(["Set the architectural intent and roof geometry.", "Coordinate thermal and moisture-control requirements.", "Review roof-mounted services and their supports.", "Select compatible flashings, gutters and fixing components."]),
      h("Make room for future equipment"),
      p("Solar equipment, access systems and ventilation plant can influence planning even if installation is deferred. Discuss their likely positions and loads with the design team. Any proposed attachment needs review for compatibility, movement, drainage and access; it should not be improvised after handover."),
      h("Use detail coordination to simplify delivery"),
      list(["Resolve interfaces between sheets, walls and openings.", "Agree the installation sequence and material handling.", "Inspect critical junctions before they become concealed.", "Hand over approved details and maintenance guidance."], true),
      p("Digital drawings and coordinated schedules help everyone work to the same information, but they do not replace site checks. Confirm dimensions, support positions and completed details against the approved design during installation."),
      h("Think beyond the first installation"),
      p("A maintainable roof allows components to be identified and inspected over time. Keep a record of material types, finish references and compatible accessories. This supports informed repair decisions and helps future alterations respect the original design."),
      { type: "paragraph", content: [text("For a wider comparison, read our "), { type: "text", text: "guide to roofing sheets", marks: [{ type: "link", attrs: { href: "/roofing-sheets/best-roofing-sheets-in-india" } }] }, text(".")] },
    ],
  }),
];
export function articleHref(article: Pick<DemoArticle, "categorySlug" | "slug">) {
  return "/" + article.categorySlug + "/" + article.slug;
}
export function findDemoArticle(category: string, slug: string) {
  return demoArticles.find(article => article.categorySlug === category && article.slug === slug);
}

