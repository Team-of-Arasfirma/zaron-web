import type { Product, ProductDetail } from "@/data/products";
import { Container } from "@/components/layout/container";
import { ProductDetailHeading, ProductFeatureCards } from "./product-detail-shared";
import { ProductDetailReveal } from "./product-detail-reveal";

export function ProductOverview({ product, detail }: { product: Product; detail: ProductDetail }) {
  return <section aria-labelledby="product-overview-heading" className="bg-white py-12 sm:py-16"><Container>
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <ProductDetailReveal className="min-w-0"><ProductDetailHeading id="product-overview-heading">Product Overview</ProductDetailHeading>
        {detail.overview?.heading && <h3 className="mt-6 text-xl font-medium leading-snug text-[#282828] sm:text-2xl">{detail.overview.heading}</h3>}
        <p className="mt-5 text-sm leading-relaxed text-[#626262]">{detail.overview?.description ?? detail.introduction ?? product.description}</p>
        {!!detail.overview?.highlights?.length && <dl className="mt-8 grid gap-5 border-t border-[#E4E4E4] pt-6 sm:grid-cols-3">{detail.overview.highlights.map(item => <div key={item.label} className="min-w-0"><dt className="text-xs text-[#626262]">{item.label}</dt><dd className="mt-2 text-lg font-semibold leading-snug text-[#282828]"><span className="mr-2 text-[#FF6500]" aria-hidden="true">/</span>{item.value}</dd></div>)}</dl>}
      </ProductDetailReveal>
      {!!detail.overview?.benefits?.length && <ProductFeatureCards features={detail.overview.benefits} />}
    </div>
  </Container></section>;
}
