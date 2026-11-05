import { Gauge, Layers, Palette, Ruler, Settings, ShieldCheck, Sparkles, Warehouse } from "lucide-react";
import type { ProductFeature, ProductIcon } from "@/data/products";
import { ProductDetailReveal } from "./product-detail-reveal";

const icons: Record<ProductIcon, typeof Layers> = { palette: Palette, shield: ShieldCheck, sparkles: Sparkles, layers: Layers, roof: Warehouse, ruler: Ruler, gauge: Gauge, settings: Settings };

export function ProductDetailHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-[28px] font-semibold leading-tight tracking-tight text-[#282828] sm:text-[36px]"><span aria-hidden="true" className="mb-5 block h-[3px] w-14 bg-[#FF6500]" />{children}</h2>;
}

export function ProductFeatureCards({ features, className = "grid gap-4 sm:grid-cols-2", compact = false }: { features: ProductFeature[]; className?: string; compact?: boolean }) {
  return <div className={className}>{features.map((feature, index) => {
    const Icon = icons[feature.icon ?? "layers"];
    return <ProductDetailReveal key={feature.title} delay={index * 0.04} className="h-full min-w-0">
      <article className={`h-full rounded-xl border border-[#E4E4E4] bg-white transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none ${compact ? "p-4" : "p-5 sm:p-6"}`}>
        <Icon aria-hidden="true" className="mb-4 size-7 text-[#FF6500]" strokeWidth={1.5} />
        <h3 className="text-[15px] font-semibold leading-snug text-[#282828]">{feature.title}</h3>
        {feature.description && <p className="mt-2 text-sm leading-relaxed text-[#626262]">{feature.description}</p>}
      </article>
    </ProductDetailReveal>;
  })}</div>;
}
