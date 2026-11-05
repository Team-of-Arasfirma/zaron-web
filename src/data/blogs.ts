
export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  publishedAt: string;
  status: "draft" | "published";
};

export const blogs: Blog[] = [
  {
    id: "1",
    title: "Benefits of PPGI Coils in Modern Construction",
    slug: "benefits-of-ppgi-coils",
    excerpt:
      "Discover why PPGI coils are widely used in roofing and cladding applications for their strength, durability and finish.",
    content: [
      "Pre-painted galvanized iron (PPGI) coils are widely used in modern roofing, cladding and industrial building applications.",
      "Their pre-applied coating provides an attractive finish, while the galvanized steel substrate helps provide corrosion resistance.",
      "When selecting PPGI materials, consider coating specifications, sheet thickness, site conditions and the intended application.",
    ],
    coverImage:
      "https://images.pexels.com/photos/36397989/pexels-photo-36397989.jpeg?auto=compress&cs=tinysrgb&w=1200",
    publishedAt: "2026-10-28",
    status: "published",
  },
  {
    id: "2",
    title: "Understanding C & Z Purlins and Their Applications",
    slug: "understanding-c-z-purlins",
    excerpt:
      "Learn how C & Z purlins provide strong structural support for industrial and commercial buildings.",
    content: [
      "C and Z purlins are cold-formed steel members commonly used to support roofing and wall systems.",
      "Their profiles help engineers design efficient secondary framing systems for industrial and commercial structures.",
      "The appropriate profile, thickness and spacing depend on the structure's engineering requirements and loading conditions.",
    ],
    coverImage:
      "https://images.pexels.com/photos/26872298/pexels-photo-26872298.jpeg?auto=compress&cs=tinysrgb&w=1200",
    publishedAt: "2026-10-25",
    status: "published",
  },
  {
    id: "3",
    title: "Decking Sheets: Strength for Multi-Storey Structures",
    slug: "decking-sheets-for-multi-storey-structures",
    excerpt:
      "Explore how decking sheets improve structural performance and reduce construction time.",
    content: [
      "Steel decking sheets are used in a variety of multi-storey construction systems.",
      "Depending on the specified deck system, profiled steel sheets can serve as permanent formwork and may contribute to composite slab performance.",
      "Engineers should verify span capacity, loading, fastening and compatibility with the overall floor design.",
    ],
    coverImage:
      "https://images.pexels.com/photos/36122954/pexels-photo-36122954.jpeg?auto=compress&cs=tinysrgb&w=1200",
    publishedAt: "2026-10-23",
    status: "published",
  },
  {
    id: "4",
    title: "Standing Seam Roofing: A Durable and Modern Solution",
    slug: "standing-seam-roofing",
    excerpt:
      "Know the advantages of standing seam roofing for large-span and architectural projects.",
    content: [
      "Standing seam roofing uses raised, interlocking seams to create a clean architectural appearance.",
      "Concealed fastening systems can reduce exposed roof penetrations and accommodate thermal movement when correctly designed.",
      "Performance depends on the selected profile, material, installation quality and site conditions.",
    ],
    coverImage:
      "https://images.pexels.com/photos/17113695/pexels-photo-17113695.jpeg?auto=compress&cs=tinysrgb&w=1200",
    publishedAt: "2026-10-20",
    status: "published",
  },
  {
    id: "5",
    title: "Tile Roofing: Style and Protection Combined",
    slug: "tile-roofing-style-and-protection",
    excerpt:
      "See how tile roofing offers an attractive and durable solution for commercial and residential projects.",
    content: [
      "Tile-profile roofing combines a traditional roof appearance with modern material options.",
      "Suitable roofing selection considers weather exposure, roof pitch, structural loading and maintenance requirements.",
      "A coordinated approach to profile selection, accessories and installation helps deliver a consistent finish.",
    ],
    coverImage:
      "https://images.pexels.com/photos/38340835/pexels-photo-38340835.jpeg?auto=compress&cs=tinysrgb&w=1200",
    publishedAt: "2026-10-16",
    status: "published",
  },
  {
    id: "6",
    title:
      "Project Spotlight: Large-Scale Roofing for Industrial Facilities",
    slug: "large-scale-industrial-roofing",
    excerpt:
      "A closer look at how roofing and cladding solutions support major industrial projects.",
    content: [
      "Large industrial facilities require roofing systems designed around structural performance, weather protection and operational needs.",
      "Material selection, layout coordination and installation planning are important parts of successful industrial roofing projects.",
      "This overview discusses general project considerations rather than a specific completed Zaron installation.",
    ],
    coverImage:
      "https://images.pexels.com/photos/12171800/pexels-photo-12171800.jpeg?auto=compress&cs=tinysrgb&w=1200",
    publishedAt: "2026-10-12",
    status: "published",
  },
];

export function getPublishedBlogs() {
  return blogs
    .filter((blog) => blog.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
}
