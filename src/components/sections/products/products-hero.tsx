
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";

const HERO_IMAGE = "/products/products-hero.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductsHero() {
  const reduceMotion = Boolean(useReducedMotion());

  const reveal = (delay: number) => ({
    initial: reduceMotion
      ? (false as const)
      : {
          opacity: 0,
          y: 20,
        },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="products-hero"
      aria-labelledby="products-hero-heading"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#222D32]
        text-white
      "
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="
          pointer-events-none
          -z-20
          object-cover
          object-center
        "
      />

      {/* DARK OVERLAY */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          bg-gradient-to-r
          from-[#101820]/85
          via-[#101820]/60
          to-[#101820]/20
        "
      />

      {/* SUBTLE BOTTOM GRADIENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-[45%]
          -z-10
          bg-gradient-to-t
          from-[#101820]/55
          to-transparent
        "
      />

      {/* HERO CONTENT */}
      <Container
        className="
          relative z-10
          flex min-h-[280px]
          flex-col justify-end
          pt-[125px] pb-[56px]
          sm:min-h-[300px]
          sm:pt-[140px]
          sm:pb-[65px]
          lg:min-h-[340px]
          lg:pt-[155px]
          lg:pb-[70px]
        "
      >
        {/* BREADCRUMB */}
        <motion.nav
          {...reveal(0.08)}
          aria-label="Breadcrumb"
          className="
            flex flex-wrap
            items-center gap-2
            text-[12px]
            font-normal
            text-white/90
            sm:text-[13px]
          "
        >
          <Link
            href="/"
            className="
              transition-colors
              hover:text-[#FF6500]
              focus-visible:rounded-sm
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#FF6500]
            "
          >
            Home
          </Link>

          <ChevronRight
            size={13}
            strokeWidth={1.8}
            aria-hidden="true"
            className="text-white/80"
          />

          <span>Products</span>

          <ChevronRight
            size={13}
            strokeWidth={1.8}
            aria-hidden="true"
            className="text-white/80"
          />

          <span
            aria-current="page"
            className="text-white"
          >
            Roofing sheets
          </span>
        </motion.nav>

        {/* TITLE */}
        <motion.h1
          {...reveal(0.17)}
          id="products-hero-heading"
          className="
            mt-5
            text-[32px]
            font-extrabold
            leading-[1.1]
            tracking-[-0.035em]
            text-white
            sm:text-[38px]
            lg:text-[44px]
          "
        >
          Our Products
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          {...reveal(0.28)}
          className="
            mt-3
            max-w-[650px]
            text-[13px]
            font-normal
            leading-[1.5]
            text-white/90
            sm:text-[14px]
            lg:text-[15px]
          "
        >
          High-performance roofing, cladding and
          structural solutions for industrial and
          commercial applications.
        </motion.p>
      </Container>
    </section>
  );
}
