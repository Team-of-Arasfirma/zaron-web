
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const hasDetails = Boolean(product.detail);

  const cardContent = (
    <>
      {/* TOP LABEL */}
      <div className="flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="h-[2px] w-[68px] shrink-0 bg-[#FF6500]"
        />

        <span
          className="
            text-right text-[10px] font-normal
            uppercase leading-tight text-[#282828]
            sm:text-[11px]
          "
        >
          {product.name}
        </span>
      </div>

      {/* PRODUCT IMAGE AND WATERMARK */}
      <div
        className="
          relative mt-3 flex w-full
          aspect-[1.38]
          items-center justify-center
          overflow-hidden bg-white
        "
      >
        {/* LARGE ZARON WATERMARK */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2 top-[3%]
            z-0
            w-[82%]
            max-w-[320px]
            -translate-x-1/2
            select-none
          "
        >
          <Image
            src="/opacity/name-lo.svg"
            alt=""
            width={320}
            height={130}
            className="h-auto w-full object-contain"
          />
        </div>

        {/* PRODUCT IMAGE */}
        {product.image ? (
          <div
            className="
              relative z-10
              h-[72%] w-[78%]
              max-h-[190px] max-w-[260px]
              transition-transform duration-500
              group-hover:scale-[1.04]
              motion-reduce:transform-none
            "
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={85}
              sizes="
                (max-width: 639px) 78vw,
                (max-width: 1279px) 260px,
                260px
              "
              className="object-contain object-center"
            />
          </div>
        ) : (
          <div
            className="
              relative z-10
              flex flex-col
              items-center gap-2
              text-[#AAAAAA]
            "
          >
            <Package
              size={40}
              strokeWidth={1.2}
              aria-hidden="true"
            />

            <span className="text-[11px]">
              Product image pending
            </span>
          </div>
        )}
      </div>

      {/* PRODUCT TITLE */}
      <h3
        className="
          mt-4
          text-[19px]
          font-bold
          leading-[1.3]
          text-[#282828]
          sm:text-[20px]
        "
      >
        {product.name}
      </h3>

      {/* PRODUCT DESCRIPTION */}
      <p
        className="
          mt-3 flex-1
          text-[12px]
          leading-[1.5]
          text-[#777777]
          sm:text-[13px]
        "
      >
        {product.description?.trim()
          ? product.description
          : "Product details coming soon."}
      </p>

      {/* EXPLORE CTA */}
      <div
        className="
          mt-5 flex min-h-11
          items-center justify-center
          gap-3
          font-serif
          text-[13px]
          font-semibold
          text-[#171717]
          transition-colors
          duration-300
          group-hover:text-[#FF6500]
        "
      >
        {hasDetails ? (
          <>
            Explore Products

            <ArrowRight
              aria-hidden="true"
              size={25}
              strokeWidth={1.8}
              className="
                text-[#FF6500]
                transition-transform duration-300
                group-hover:translate-x-1
                motion-reduce:transform-none
              "
            />
          </>
        ) : (
          <span className="text-[#686868]">
            Details coming soon
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 20 }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group relative
        flex h-full min-w-0
        flex-col
        overflow-hidden
        rounded-[16px]
        border border-[#E8E8E8]
        bg-white
        px-[14px] pt-[18px] pb-[16px]
        transition-shadow duration-300
        sm:px-[18px] sm:pt-[20px] sm:pb-[18px]
        ${
          hasDetails
            ? "hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
            : ""
        }
      `}
    >
      {hasDetails ? (
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View details for ${product.name}`}
          className="
            flex h-full min-w-0
            flex-1 flex-col
            rounded-[10px]
            cursor-pointer
            focus-visible:outline-2
            focus-visible:outline-offset-[-2px]
            focus-visible:outline-[#FF6500]
          "
        >
          {cardContent}
        </Link>
      ) : (
        <div className="flex h-full min-w-0 flex-1 flex-col">
          {cardContent}
        </div>
      )}
    </motion.article>
  );
}
