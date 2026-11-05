import { ProductsHero } from "@/components/sections/products/products-hero";
import { ProductsCatalog } from "@/components/sections/products/products-catalog";

export default function ProductsPage() {
  return (
    <main>
      <ProductsHero />
      <ProductsCatalog />
    </main>
  );
}