import type { ProductFeature } from "@/data/products";
import { Container } from "@/components/layout/container";
import { ProductDetailHeading, ProductFeatureCards } from "./product-detail-shared";
import { ProductDetailReveal } from "./product-detail-reveal";

export function ProductKeyFeatures({ features = [] }: { features?: ProductFeature[] }) {
  return <section aria-labelledby="product-features-heading" className="bg-[#F4F4F4] py-12 sm:py-16"><Container>
    <ProductDetailReveal><ProductDetailHeading id="product-features-heading">Key Features</ProductDetailHeading></ProductDetailReveal>
    <div className="mt-8">{features.length ? <ProductFeatureCards features={features} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5" /> : <p className="text-sm text-[#626262]">Contact our team for more information about this product.</p>}</div>
  </Container></section>;
}
