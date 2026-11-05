
"use client";

import type { Product, ProductDetail } from "@/data/products";

import { ProductDetailHero } from "./product-detail-hero";
import { ProductRoofingProfiles } from "./product-roofing-profiles";
import { ProductAvailableColours } from "./product-available-colours";
import { ProductTechnicalSpecifications } from "./product-technical-specifications";
import { ProductOverview } from "./product-overview";
import { ProductKeyFeatures } from "./product-key-features";
import { ProductDetailSelection } from "./product-detail-selection";

type ProductDetailTemplateProps = {
  product: Product;
  detail: ProductDetail;
};

const categoryLabels: Record<Product["category"], string> = {
  "roofing-sheets": "Roofing Sheets",
  "crimp-sheets": "Crimp Sheets",
  insulation: "Insulation",
  purlins: "Purlins",
  "sandwich-panel": "Sandwich Panel",
  "laser-cutting": "Laser Cutting",
  flashing: "Flashing",
};

export function ProductDetailTemplate({
  product,
  detail,
}: ProductDetailTemplateProps) {
  const categoryLabel = categoryLabels[product.category];

  return (
    <ProductDetailSelection key={product.slug}>
      <main>
        {/* 01. PRODUCT HERO */}
        <ProductDetailHero
          product={product}
          detail={detail}
          categoryLabel={categoryLabel}
        />

        {/* 02. ROOFING PROFILES — ALWAYS VISIBLE */}
        <ProductRoofingProfiles
          product={product}
          detail={detail}
        />

        {/* 03. AVAILABLE COLOURS */}
        <ProductAvailableColours colors={detail.colors} />

        {/* 04. TECHNICAL SPECIFICATIONS */}
        <ProductTechnicalSpecifications detail={detail} />

        {/* 05. PRODUCT OVERVIEW */}
        <ProductOverview
          product={product}
          detail={detail}
        />

        {/* 06. KEY FEATURES */}
        <ProductKeyFeatures features={detail.features} />
      </main>
    </ProductDetailSelection>
  );
}
