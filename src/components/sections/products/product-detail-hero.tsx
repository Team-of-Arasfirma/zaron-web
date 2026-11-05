
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ChevronRight,
  Package,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type {
  Product,
  ProductDetail,
} from "@/data/products";

import { Container } from "@/components/layout/container";
import { ProductFeatureCards } from "./product-detail-shared";
import { ProductDetailReveal } from "./product-detail-reveal";
import { ProductColorSwatches } from "./product-available-colours";
import { useProductColor } from "./product-detail-selection";

type ProductDetailHeroProps = {
  product: Product;
  detail: ProductDetail;
  categoryLabel: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductDetailHero({
  product,
  detail,
  categoryLabel,
}: ProductDetailHeroProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const { selected } = useProductColor();

  const productImage =
    selected?.image ??
    detail.heroImage ??
    product.image;

  const productHeading =
    detail.heading ?? product.name;

  const productDescription =
    detail.introduction ?? product.description;

  const gallery = detail.gallery ?? [];
  const colors = detail.colors ?? [];

  return (
    <section
      id="product-detail-hero"
      aria-labelledby="product-detail-heading"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#F4F4F4]
        pt-[132px] pb-14
        sm:pt-[150px] sm:pb-16
        lg:pt-[160px] lg:pb-20
      "
    >
      <Container>
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="
            mb-9
            sm:mb-12
          "
        >
          <ol
            className="
              flex flex-wrap
              items-center
              gap-x-2 gap-y-2
              text-[12px]
              leading-relaxed
              text-[#626262]
              sm:text-[13px]
            "
          >
            <li>
              <Link
                href="/"
                className="
                  rounded
                  transition-colors
                  hover:text-[#FF6500]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#FF6500]
                "
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight size={13} />
            </li>

            <li>
              <Link
                href="/products"
                className="
                  rounded
                  transition-colors
                  hover:text-[#FF6500]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#FF6500]
                "
              >
                Products
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight size={13} />
            </li>

            <li>
              <Link
                href="/products#products-catalog"
                className="
                  rounded
                  transition-colors
                  hover:text-[#FF6500]
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#FF6500]
                "
              >
                {categoryLabel}
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight size={13} />
            </li>

            <li
              aria-current="page"
              className="
                max-w-full
                font-medium
                break-words
                text-[#282828]
              "
            >
              {product.name}
            </li>
          </ol>
        </nav>

        {/* MAIN HERO */}
        <div
          className="
            grid min-w-0
            grid-cols-1
            items-start
            gap-10
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-12
            xl:gap-16
          "
        >
          {/* LEFT SIDE */}
          <ProductDetailReveal className="min-w-0">
            {/* CATEGORY LABEL */}
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="
                  h-[3px] w-[56px]
                  shrink-0
                  bg-[#FF6500]
                "
              />

              <p
                className="
                  text-[12px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#626262]
                  sm:text-[13px]
                "
              >
                {categoryLabel}
              </p>
            </div>

            {/* PRODUCT HEADING */}
            <h1
              id="product-detail-heading"
              className="
                mt-5
                max-w-[640px]
                text-[clamp(2.3rem,4.5vw,4rem)]
                font-extrabold
                leading-[1.08]
                tracking-[-0.045em]
                text-[#FF6500]
              "
            >
              {productHeading}
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-6
                max-w-[590px]
                text-[14px]
                leading-[1.75]
                text-[#626262]
                sm:text-[16px]
              "
            >
              {productDescription}
            </p>

            {/* HERO FEATURE CARDS */}
            {Boolean(detail.heroFeatures?.length) && (
              <div className="mt-8 sm:mt-10">
                <ProductFeatureCards
                  features={detail.heroFeatures!}
                  compact
                />
              </div>
            )}

          </ProductDetailReveal>

          {/* RIGHT SIDE */}
          <ProductDetailReveal
            delay={0.1}
            className="min-w-0"
          >
            {/* MAIN PRODUCT IMAGE */}
            <div
              className="
                relative
                aspect-[1.12]
                w-full
                overflow-hidden
                rounded-[20px]
                border border-[#E4E4E4]
                bg-white
                sm:aspect-[1.25]
                lg:aspect-[1.05]
                xl:aspect-[1.12]
              "
            >
              {productImage ? (
                <motion.div
                  key={productImage}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.97,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    ease,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={productImage}
                    alt={
                      selected?.image
                        ? `${product.name} in ${selected.name}`
                        : product.name
                    }
                    fill
                    preload
                    quality={85}
                    sizes="
                      (max-width: 1023px) 90vw,
                      (max-width: 1279px) 44vw,
                      40vw
                    "
                    className="
                      object-contain
                      p-4
                      sm:p-6
                    "
                  />
                </motion.div>
              ) : (
                <div
                  className="
                    flex h-full
                    flex-col items-center
                    justify-center gap-3
                    text-[#777777]
                  "
                >
                  <Package
                    aria-hidden="true"
                    size={46}
                    strokeWidth={1.5}
                  />

                  <p className="text-[13px]">
                    Product image not available
                  </p>
                </div>
              )}
            </div>

            {/* COLOUR PREVIEW */}
            {colors.length > 0 && (
              <div
                className="
                  mt-6
                  rounded-[14px]
                  border border-[#E6E6E6]
                  bg-white
                  p-4
                  sm:p-5
                "
              >
                <ProductColorSwatches
                  colors={colors}
                  preview
                />
              </div>
            )}

            {/* PRODUCT GALLERY */}
            {gallery.length > 0 && (
              <div
                className="
                  mt-5
                  grid grid-cols-3
                  gap-3
                "
              >
                {gallery.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="
                      group/gallery
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-[12px]
                      border border-[#E7E7E7]
                      bg-white
                    "
                  >
                    <Image
                      src={src}
                      alt={`${product.name}, view ${index + 2}`}
                      fill
                      quality={85}
                      sizes="
                        (max-width: 639px) 28vw,
                        (max-width: 1023px) 25vw,
                        13vw
                      "
                      className="
                        object-contain
                        p-3
                        transition-transform
                        duration-300
                        group-hover/gallery:scale-[1.04]
                        motion-reduce:transform-none
                      "
                    />
                  </div>
                ))}
              </div>
            )}
          </ProductDetailReveal>
        </div>
      </Container>
    </section>
  );
}
