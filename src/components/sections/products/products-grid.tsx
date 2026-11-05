
"use client";

import { SearchX } from "lucide-react";

import {
  products,
  type ProductCategory,
} from "@/data/products";

import { ProductCard } from "./product-card";

type ProductsGridProps = {
  category: ProductCategory;
  searchQuery: string;
};

export function ProductsGrid({
  category,
  searchQuery,
}: ProductsGridProps) {
  const normalizedQuery = searchQuery
    .trim()
    .toLocaleLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.category === category &&
      product.name
        .toLocaleLowerCase()
        .includes(normalizedQuery)
  );

  if (filteredProducts.length === 0) {
    return (
      <div
        className="
          flex min-h-[260px]
          flex-col items-center
          justify-center gap-3
          rounded-[14px]
          border border-dashed
          border-[#D0D0D0]
          bg-white
          px-6 py-12 text-center
        "
      >
        <SearchX
          size={38}
          className="text-[#FF6500]"
          aria-hidden="true"
        />

        <h3
          className="
            text-[18px] font-semibold
            text-[#282828]
          "
        >
          No products found
        </h3>

        <p className="max-w-[360px] text-[14px] text-[#777777]">
          {searchQuery.trim()
            ? "Try another product name or clear your search."
            : "Product information for this category is not available yet."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid grid-cols-1
        gap-5
        sm:grid-cols-2
        sm:gap-6
        xl:grid-cols-3
        xl:gap-7
      "
      aria-live="polite"
    >
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
