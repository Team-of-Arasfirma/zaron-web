export type ProductCategory =
  | "roofing-sheets"
  | "crimp-sheets"
  | "insulation"
  | "purlins"
  | "sandwich-panel"
  | "laser-cutting"
  | "flashing";

export type ProductIcon =
  | "palette"
  | "shield"
  | "sparkles"
  | "layers"
  | "roof"
  | "ruler"
  | "gauge"
  | "settings";

export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

// Shared palette sampled from the supplied colour chart.
export const PRODUCT_COLOURS: ProductColor[] = [
  { name: "Off White", hex: "#F2EDE3" },
  { name: "Grey", hex: "#AAAAAC" },
  { name: "Sky Blue", hex: "#67BCE9" },
  { name: "Royal Blue", hex: "#3D62AE" },
  { name: "Callified Green", hex: "#A4C0A0" },
  { name: "Brick Red", hex: "#BA4635" },
  { name: "Bare", hex: "#EDE5D8" },
  { name: "Aluminium", hex: "#B4BBC2" },
  { name: "Teracotta Red", hex: "#D15440" },
  { name: "Chocolate Brown", hex: "#7E4B2E" },
  { name: "Purple", hex: "#6D2981" },
  { name: "State Grey", hex: "#606E7B" },
  { name: "Violet", hex: "#A988BE" },
  { name: "Elephant Grey", hex: "#9B9B9E" },
  { name: "Golden Yellow", hex: "#F7B316" },
  { name: "Orange", hex: "#F4771F" },
  { name: "Neon Red", hex: "#ED362E" },
  { name: "Taurus Blue", hex: "#1E5174" },
  { name: "Sandal", hex: "#CAB293" },
  { name: "Iron Stone", hex: "#4B4E50" },
  { name: "Window Grey", hex: "#B1B1B3" },
  { name: "Mist Green", hex: "#A4C69E" },
  { name: "Relience Green", hex: "#517233" },
  { name: "Turquoise Green", hex: "#38BEB9" },
];

export type ProductFeature = {
  title: string;
  description?: string;
  icon?: ProductIcon;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDetail = {
  heading?: string;
  introduction?: string;
  heroImage?: string;
  gallery?: string[];

  profileImages?: Array<{
    src: string;
    alt: string;
  }>;

  colors?: ProductColor[];
  heroFeatures?: ProductFeature[];
  technicalHighlights?: ProductFeature[];
  specifications?: ProductSpecification[];

  overview?: {
    heading?: string;
    description?: string;

    highlights?: Array<{
      label: string;
      value: string;
    }>;

    benefits?: ProductFeature[];
  };

  features?: ProductFeature[];
  brochure?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  image: string | null;
  description: string;
  detail?: ProductDetail;
};

// =====================================================
// PRODUCT IMAGE FOLDERS
// All images must exist under frontend/public/products/
// =====================================================

const IMAGE_PATHS = {
  roofing: "/products/Roofing",
  crimp: "/products/Crimp Sheets",
  flashing: "/products/Flashing",
  insulation: "/products/Insulation",
  laser: "/products/Laser Design Cutting",
  purlin: "/products/Purlin",
  sandwich: "/products/Sandwich Panel",
} as const;

// =====================================================
// PRODUCT 01 — COLOUR COATED SHEET
// =====================================================

const colourCoatedSheet: Product = {
  id: "roofing-1",

  name: "Colour Coated Sheet",

  slug: "colour-coated-sheet",

  category: "roofing-sheets",

  image: `${IMAGE_PATHS.roofing}/Colour Coated Sheet.png`,

  description:
    "Combining vibrant finishes with lasting durability, our colour-coated sheets deliver reliable protection and a premium look.",

  detail: {
    heading: "Colour Coated Sheet",

    introduction:
      "Combining vibrant finishes with lasting durability, our colour-coated sheets deliver reliable protection and a premium look.",

    heroImage:
      `${IMAGE_PATHS.roofing}/Colour Coated Sheet.png`,

    // HERO FEATURES
    heroFeatures: [
      {
        title: "Vibrant finishes",
        icon: "palette",
      },
      {
        title: "Lasting durability",
        icon: "layers",
      },
      {
        title: "Reliable protection",
        icon: "shield",
      },
      {
        title: "Premium look",
        icon: "sparkles",
      },
    ],

    // TECHNICAL HIGHLIGHTS
    technicalHighlights: [
      {
        title: "Reliable Performance",
        icon: "shield",
      },
      {
        title: "Standard Dimensions",
        icon: "ruler",
      },
      {
        title: "Custom Length Options",
        icon: "roof",
      },
      {
        title: "Quality Manufacturing",
        icon: "settings",
      },
    ],

    // Existing specifications.
    // Confirm these values with Zaron before publishing.
    specifications: [
      {
        label: "Sheet Thickness",
        value: "0.50 mm",
      },
      {
        label: "Sheet Width",
        value: "1090 mm",
      },
      {
        label: "Material Grade",
        value: "AZ150",
      },
      {
        label: "Profile Type",
        value: "Trapezoidal",
      },
      {
        label: "Coating Type",
        value: "PPGL",
      },
      {
        label: "Sheet Length",
        value: "30 ft",
      },
      {
        label: "Surface Finish",
        value: "Glossy",
      },
      {
        label: "Application Area",
        value:
          "Factory Shed, Industrial, Residential, Warehouse, Institutional, Commercial",
      },
    ],

    // PRODUCT OVERVIEW
    overview: {
      heading: "Colour, protection & a premium finish",

      highlights: [
        {
          label: "Product",
          value: "Colour coated",
        },
        {
          label: "Category",
          value: "Roofing sheets",
        },
        {
          label: "Appearance",
          value: "Vibrant finish",
        },
      ],

      benefits: [
        {
          title: "Vibrant finishes",
          icon: "palette",
        },
        {
          title: "Lasting durability",
          icon: "layers",
        },
        {
          title: "Reliable protection",
          icon: "shield",
        },
        {
          title: "Premium look",
          icon: "sparkles",
        },
      ],
    },

    // KEY FEATURES
    features: [
      {
        title: "Colour coated",
        description:
          "A colour-coated roofing sheet from the Zaron product range.",
        icon: "roof",
      },
      {
        title: "Vibrant finishes",
        description:
          "A vibrant finish for your roofing project.",
        icon: "palette",
      },
      {
        title: "Lasting durability",
        description:
          "Durability described in our product catalogue.",
        icon: "layers",
      },
      {
        title: "Reliable protection",
        description:
          "Roofing protection with a colour-coated finish.",
        icon: "shield",
      },
      {
        title: "Premium look",
        description:
          "A premium appearance for your roof.",
        icon: "sparkles",
      },
    ],

    colors: PRODUCT_COLOURS,

    // Existing roofing profile references retained.
    profileImages: [
      {
        src: "/products/profiles/roofing-profile-01.svg",
        alt: "Colour Coated Sheet — Roofing Profile 01",
      },
      {
        src: "/products/profiles/roofing-profile-01.svg",
        alt: "Colour Coated Sheet — Roofing Profile 02",
      },
    ],
  },
};

// =====================================================
// REUSABLE PRODUCT ENTRY TYPE
// =====================================================

type ProductEntry = {
  name: string;
  slug: string;
  image: string;
  description?: string;
};

// =====================================================
// ROOFING SHEETS — REMAINING 14 PRODUCTS
// =====================================================

const roofingData: ProductEntry[] = [
  {
    name: "Bare Sheet",
    slug: "bare-sheet",
    image: "Bare Sheet.png",
  },
  {
    name: "Aluminium Sheet",
    slug: "aluminium-sheet",
    image: "Aluminium Sheet.png",
  },
  {
    name: "Liner Sheet",
    slug: "liner-sheet",
    image: "Liner Sheet.png",
  },
  {
    name: "Multiwall Polycarbonate Sheet",
    slug: "multiwall-polycarbonate-sheet",
    image: "Multiwall Sheet.png",
  },
  {
    name: "Farm Sheet",
    slug: "farm-sheet",
    image: "Farm Sheet.png",
  },
  {
    name: "Spanish Tile Sheet",
    slug: "spanish-tile-sheet",
    image: "Spanish Tile.png",
  },
  {
    name: "Mangalore Tile Sheet",
    slug: "mangalore-tile-sheet",
    image: "Mangalore Tile Sheet.png",
  },
  {
    name: "Step Tile Sheet",
    slug: "step-tile-sheet",
    image: "Step Tile Sheet.png",
  },
  {
    name: "Polycarbonate Sheet",
    slug: "polycarbonate-sheet",
    image: "Polycarbonate Sheet.png",
  },
  {
    name: "Floor Decking Sheet",
    slug: "floor-decking-sheet",
    image: "Floor Decking Sheet.png",
  },
  {
    name: "Standing Seam (180° & 360°)",
    slug: "standing-seam",
    image: "Standing Seam.png",
  },
  {
    name: "XLPE Insulated Sheet",
    slug: "xlpe-insulated-sheet",
    image: "XLP Insulated Sheet.png",
  },
  {
    name: "APRO Stone Coated Sheet",
    slug: "apro-stone-coated-sheet",
    image: "stone Coated Sheet.png",
  },
  {
    name: "Kokabil UPVC Tile Sheets",
    slug: "kokabil-upvc-tile-sheets",
    image: "UPVC Sheet.png",
  },
];

// =====================================================
// CRIMP SHEETS — 8 PRODUCTS
// =====================================================

const crimpData: ProductEntry[] = [
  {
    name: "Double Side Crimp",
    slug: "double-side-crimp",
    image: "Double Side Crimp.png",
    description:
      "Explore the Double Side Crimp roofing profile from Zaron's crimp sheet range.",
  },
  {
    name: "Forward Crimp",
    slug: "forward-crimp",
    image: "Forward Crimp.png",
    description:
      "Explore the Forward Crimp profile for curved metal roofing designs.",
  },
  {
    name: "Normal Arch",
    slug: "normal-arch",
    image: "Normal Arch.png",
    description:
      "A curved roofing profile option from Zaron's crimp sheet collection.",
  },
  {
    name: "Nurlin Arch",
    slug: "nurlin-arch",
    image: "Nurlin Arch.png",
    description:
      "Explore the Nurlin Arch profile in Zaron's curved roofing range.",
  },
  {
    name: "Profile Ridge",
    slug: "profile-ridge",
    image: "Profile Ridge.png",
    description:
      "A profiled ridge solution from Zaron's roofing product collection.",
  },
  {
    name: "Reverse Crimp",
    slug: "reverse-crimp",
    image: "Reverse Crimp.png",
    description:
      "Explore the Reverse Crimp option for shaped metal roofing profiles.",
  },
  {
    name: "Special Crimp",
    slug: "special-crimp",
    image: "Special.png",
    description:
      "A specialty crimp profile available within the Zaron product range.",
  },
  {
    name: "Standing Seam Crimp",
    slug: "standing-seam-crimp",
    image: "Standing Seam Crimp.png",
    description:
      "Explore a crimped profile option for standing seam roofing applications.",
  },
];

// =====================================================
// FLASHING — 11 PRODUCTS
// =====================================================

const flashingData: ProductEntry[] = [
  {
    name: "Clamp",
    slug: "clamp",
    image: "Clamp.png",
  },
  {
    name: "Corner Flashing",
    slug: "corner-flashing",
    image: "Corner Flashing.png",
  },
  {
    name: "Down Take Pipe",
    slug: "down-take-pipe",
    image: "Down Take Pipe.png",
  },
  {
    name: "Drip Flashing",
    slug: "drip-flashing",
    image: "Drip Flashing.png",
  },
  {
    name: "Gable Flashing",
    slug: "gable-flashing",
    image: "Gable Flashing.png",
  },
  {
    name: "Gutter",
    slug: "gutter",
    image: "Gutter.png",
  },
  {
    name: "L Flashing",
    slug: "l-flashing",
    image: "L Flashing.png",
  },
  {
    name: "Louver",
    slug: "louver",
    image: "Louver.png",
  },
  {
    name: "Plain Ridge A",
    slug: "plain-ridge-a",
    image: "Plain Ridge A.png",
  },
  {
    name: "Plain Ridge B",
    slug: "plain-ridge-b",
    image: "Plain Ridge B.png",
  },
  {
    name: "Stiffener",
    slug: "stiffener",
    image: "Stiffener.png",
  },
];

// =====================================================
// INSULATION — 4 PRODUCTS
// =====================================================

const insulationData: ProductEntry[] = [
  {
    name: "Bubble Roll",
    slug: "bubble-roll",
    image: "Bubble Roll.png",
  },
  {
    name: "Glass Wool",
    slug: "glass-wool",
    image: "Glass Wool.png",
  },
  {
    name: "Rock Wool",
    slug: "rock-wool",
    image: "Rock wool.png",
  },
  {
    name: "XLPE Sheet",
    slug: "xlpe-sheet",
    image: "XLPE Sheet.png",
  },
];

// =====================================================
// LASER DESIGN CUTTING — 1 PRODUCT
// =====================================================

const laserData: ProductEntry[] = [
  {
    name: "Laser Design Cutting",
    slug: "laser-design-cutting",
    image: "Laser Design Cutting.png",
  },
];

// =====================================================
// PURLIN — 6 PRODUCTS
// =====================================================

const purlinData: ProductEntry[] = [
  {
    name: "Bed Bolt",
    slug: "bed-bolt",
    image: "Bed Bolt.png",
  },
  {
    name: "C & Z Purlin",
    slug: "c-z-purlin",
    image: "C & Z Purlin.png",
  },
  {
    name: "Cleat",
    slug: "cleat",
    image: "Cleat.png",
  },
  {
    name: "Hat Purlin",
    slug: "hat-purlin",
    image: "Hat Purlin.png",
  },
  {
    name: "L Angle",
    slug: "l-angle",
    image: "L Angle.png",
  },
  {
    name: "Sag Rod",
    slug: "sag-rod",
    image: "Sag Rod.png",
  },
];

// =====================================================
// SANDWICH PANEL — 3 PRODUCTS
// =====================================================

const sandwichPanelData: ProductEntry[] = [
  {
    name: "Arasfirma Concealed Wall Panel",
    slug: "arasfirma-concealed-wall-panel",
    image: "Arasfirma Concealed wall Panel.png",
    description:
      "Concealed-fixing wall panel from the Arasfirma panel range.",
  },
  {
    name: "Arasfirma Mono Wall Panel",
    slug: "arasfirma-mono-wall-panel",
    image: "Arasfirma Mono wall Panel.png",
    description:
      "Mono wall panel solution from the Arasfirma product range.",
  },
  {
    name: "Arasfirma Roof Panel",
    slug: "arasfirma-roof-panel",
    image: "Arasfirma Roof Panel.png",
    description:
      "Roof panel option from the Arasfirma product range.",
  },
];

// =====================================================
// REUSABLE CATEGORY MAPPER
// =====================================================

function createProducts(
  data: ProductEntry[],
  category: ProductCategory,
  imageFolder: string,
  idPrefix: string,
  startIndex = 1,
): Product[] {
  return data.map((item, index): Product => ({
    id: `${idPrefix}-${index + startIndex}`,

    name: item.name,

    slug: item.slug,

    category,

    image: `${imageFolder}/${item.image}`,

    description: item.description ?? "",

    detail: {
      colors: PRODUCT_COLOURS,
    },
  }));
}

// =====================================================
// ROOFING SHEETS — 15 PRODUCTS
// =====================================================

export const roofingSheetProducts: Product[] = [
  colourCoatedSheet,

  ...createProducts(
    roofingData,
    "roofing-sheets",
    IMAGE_PATHS.roofing,
    "roofing",
    2,
  ),
];

// =====================================================
// CRIMP SHEETS — 8 PRODUCTS
// =====================================================

export const crimpSheets: Product[] = createProducts(
  crimpData,
  "crimp-sheets",
  IMAGE_PATHS.crimp,
  "crimp",
);

// =====================================================
// FLASHING — 11 PRODUCTS
// =====================================================

export const flashingProducts: Product[] = createProducts(
  flashingData,
  "flashing",
  IMAGE_PATHS.flashing,
  "flashing",
);

// =====================================================
// INSULATION — 4 PRODUCTS
// =====================================================

export const insulationProducts: Product[] = createProducts(
  insulationData,
  "insulation",
  IMAGE_PATHS.insulation,
  "insulation",
);

// =====================================================
// LASER DESIGN CUTTING — 1 PRODUCT
// =====================================================

export const laserCuttingProducts: Product[] = createProducts(
  laserData,
  "laser-cutting",
  IMAGE_PATHS.laser,
  "laser",
);

// =====================================================
// PURLIN — 6 PRODUCTS
// =====================================================

export const purlinProducts: Product[] = createProducts(
  purlinData,
  "purlins",
  IMAGE_PATHS.purlin,
  "purlin",
);

// =====================================================
// SANDWICH PANEL — 3 PRODUCTS
// =====================================================

export const sandwichPanelProducts: Product[] = createProducts(
  sandwichPanelData,
  "sandwich-panel",
  IMAGE_PATHS.sandwich,
  "sandwich",
);

// =====================================================
// FINAL EXPORT — 48 PRODUCTS
// =====================================================

export const products: Product[] = [
  ...roofingSheetProducts,
  ...crimpSheets,
  ...flashingProducts,
  ...insulationProducts,
  ...laserCuttingProducts,
  ...purlinProducts,
  ...sandwichPanelProducts,
];