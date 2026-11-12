
"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import type { ProductCategory } from "@/data/products";

import {
  PRODUCT_CATEGORIES,
  ProductCategoryTabs,
} from "./product-category-tabs";

import { ProductSearch } from "./product-search";
import { ProductsGrid } from "./products-grid";

export function ProductsCatalog() {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>("roofing-sheets");

  const [searchQuery, setSearchQuery] = useState("");

  // Get the selected category's display name.
  const selectedCategory = PRODUCT_CATEGORIES.find(
    (category) => category.id === activeCategory
  );

  const categoryHeading =
    selectedCategory?.label ?? "All Products";

  // Change category and reset search.
  const handleCategoryChange = (
    category: ProductCategory
  ) => {
    setActiveCategory(category);
    setSearchQuery("");
  };

  return (
    <section
      id="products-catalog"
      aria-label="Browse products"
      className="
        relative w-full
        bg-[#F4F4F4]
        pb-16 md:pb-20
      "
    >
      <Container>
        {/* CATEGORY TABS */}
        <div className="relative z-20 -mt-5">
          <ProductCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* PRODUCT CONTENT */}
        <div
          id="products-category-panel"
          role="tabpanel"
          aria-labelledby={`product-tab-${activeCategory}`}
          tabIndex={0}
          className="min-w-0 pt-7 sm:pt-8"
        >
          {/* SEARCH */}
          <ProductSearch
            value={searchQuery}
            onChange={setSearchQuery}
          />

          {/* DYNAMIC CATEGORY HEADING */}
          <h2
            className="
              mt-6
              text-[22px] font-bold
              tracking-[-0.025em]
              text-[#686868]
              sm:text-[26px]
            "
          >
            {categoryHeading}
          </h2>

          {/* PRODUCT GRID */}
          <div className="mt-6">
            <ProductsGrid
              category={activeCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
