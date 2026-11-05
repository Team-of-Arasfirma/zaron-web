import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailTemplate } from "@/components/sections/products/product-detail-template";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.filter(product => product.detail).map(product => ({ slug: product.slug }));
}

function getProduct(slug: string) {
  const product = products.find(product => product.slug === slug);
  if (!product?.detail) notFound();
  return { product, detail: product.detail };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product, detail } = getProduct((await params).slug);
  return {
    title: `${product.name} | Zaron Industries`,
    description: detail.introduction ?? product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { product, detail } = getProduct((await params).slug);
  return <ProductDetailTemplate product={product} detail={detail} />;
}