
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";

const products = [
  {
    id: "standing-seam",
    title: "Standing Seam",
    image: "/products/standing-seam.png",
    description:
      "Premium standing seam roofing systems for lasting protection.",
  },
  {
    id: "roofing-sheet",
    title: "Roofing Sheet",
    image: "/products/roofing-sheet.png",
    description:
      "High-performance roofing sheets engineered for strength.",
  },
  {
    id: "ppgl-coils",
    title: "PPGL Coils",
    image: "/products/ppgl-coils.png",
    description:
      "Durable pre-painted galvalume coils for industrial applications.",
  },
  {
    id: "purlin",
    title: "Purlin",
    image: "/products/purlin.png",
    description:
      "Precision-engineered structural support solutions.",
  },
  {
    id: "aluminium-tape-roll",
    title: "Aluminium Tape Roll",
    image: "/products/Aluminium Tape Roll.png",
    description:
      "Reliable aluminium tape for roofing and industrial applications.",
  },
];

const count = products.length;

function circularDistance(index: number, active: number) {
  const forward = (index - active + count) % count;

  return forward > count / 2
    ? forward - count
    : forward;
}

export function ProductsSection() {
  const [active, setActive] = useState(1);
  const [width, setWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);

  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const mobile = width > 0 && width < 768;
  const tablet = width >= 768 && width < 1100;

  // Mobile: active card + a small preview of next card.
  const gap = mobile ? 12 : 20;

  // 86% card gives approximately 10% next-card peek
  // after accounting for the 12px gap.
  const mobileCardSize = width * 0.86;

  const bigWidth = mobile
    ? mobileCardSize
    : tablet
      ? Math.min(370, width * 0.49)
      : 410;

  const smallWidth = mobile
    ? mobileCardSize
    : tablet
      ? Math.min(320, width * 0.42)
      : 340;

  // Mobile cards are square.
  const bigHeight = mobile
    ? mobileCardSize
    : tablet
      ? 530
      : 600;

  const smallHeight = mobile
    ? mobileCardSize
    : tablet
      ? 490
      : 540;

  // On mobile align the active card to the left,
  // keeping the next card visible at the right edge.
  const center = mobile
    ? 0
    : (width - bigWidth) / 2;

  const move = (direction: number) => {
    setActive(
      (current) => (current + direction + count) % count
    );
  };

  const slideTransition = reduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 170,
        damping: 28,
        mass: 1,
      };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="w-full overflow-hidden bg-white py-14 md:py-24"
    >
      <Container>
        {/* HEADER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 35 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
          }}
          className="mb-7 flex items-end justify-between gap-4 md:mb-10"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-[3px] w-10 shrink-0 bg-[#FF6500]"
              />

              <h2
                id="products-heading"
                className="font-serif text-lg text-[#232323]"
              >
                Our Products
              </h2>
            </div>

            <p className="mt-3 max-w-xl text-[12px] leading-5 text-[#666666] sm:text-sm sm:leading-7">
              Engineered roofing, cladding and structural
              solutions for lasting performance.
            </p>
          </div>

          {/* ARROWS */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous product"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#FF6500] text-[#FF6500] transition-colors hover:bg-[#FF6500] hover:text-white sm:size-10"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next product"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#FF6500] text-[#FF6500] transition-colors hover:bg-[#FF6500] hover:text-white sm:size-10"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        </motion.div>

        {/* CAROUSEL REVEAL */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 45 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
          }}
        >
          <motion.div
            ref={viewportRef}
            aria-roledescription="carousel"
            aria-label="Zaron products"
            className="relative w-full overflow-hidden select-none"
            style={{
              height: width > 0 ? bigHeight + 12 : 0,
              touchAction: "pan-y",
            }}
            onPanEnd={(_, info) => {
              if (
                info.offset.x < -45 ||
                info.velocity.x < -450
              ) {
                move(1);
              } else if (
                info.offset.x > 45 ||
                info.velocity.x > 450
              ) {
                move(-1);
              }
            }}
          >
            {width > 0 &&
              products.map((product, index) => {
                const distance = circularDistance(
                  index,
                  active
                );

                const selected = distance === 0;

                const cardWidth = selected
                  ? bigWidth
                  : smallWidth;

                const cardHeight = selected
                  ? bigHeight
                  : smallHeight;

                const x = mobile
                  ? distance * (mobileCardSize + gap)
                  : distance === 0
                    ? center
                    : distance < 0
                      ? center -
                        smallWidth -
                        gap +
                        (distance + 1) *
                          (smallWidth + gap)
                      : center +
                        bigWidth +
                        gap +
                        (distance - 1) *
                          (smallWidth + gap);

                // Mobile: active card and the next-card preview.
                const visible = mobile
                  ? distance === 0 || distance === 1
                  : Math.abs(distance) <= 1;

                return (
                  <motion.div
                    key={product.id}
                    initial={false}
                    animate={{
                      x,
                      y: mobile
                        ? 0
                        : selected
                          ? 0
                          : 30,
                      width: cardWidth,
                      height: cardHeight,
                      opacity: visible ? 1 : 0,
                      scale: mobile
                        ? 1
                        : selected
                          ? 1
                          : 0.97,
                    }}
                    transition={slideTransition}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: selected ? 3 : 1,
                      pointerEvents: visible
                        ? "auto"
                        : "none",
                    }}
                    aria-hidden={!visible}
                  >
                    <article
                      className={`
                        relative flex h-full flex-col
                        overflow-hidden rounded-2xl
                        bg-white p-3 sm:p-5
                        ${
                          selected
                            ? "border-2 border-[#FF6500] shadow-[0_15px_40px_rgba(255,101,0,0.10)]"
                            : "border border-[#E5E5E5] shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
                        }
                      `}
                    >
                      {/* CARD SELECTION */}
                      {!mobile && (
                        <button
                          type="button"
                          onClick={() => setActive(index)}
                          aria-label={`Select ${product.title}`}
                          aria-pressed={selected}
                          tabIndex={visible ? 0 : -1}
                          className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-[#FF6500]"
                        />
                      )}

                      {/* PRODUCT LABEL */}
                      <div className="flex shrink-0 items-center justify-between gap-2">
                        <span
                          aria-hidden="true"
                          className="h-[2px] w-8 bg-[#FF6500] sm:w-12"
                        />

                        <span className="text-right text-[9px] uppercase text-[#555555] sm:text-[10px]">
                          {product.title}
                        </span>
                      </div>

                      {/* WATERMARK */}
                      <div className="pointer-events-none absolute left-1/2 top-[12%] w-[75%] -translate-x-1/2 sm:top-14">
                        <Image
                          src="/opacity/name-lo.svg"
                          alt=""
                          width={300}
                          height={100}
                          className="h-auto w-full"
                        />
                      </div>

                      {/* LARGER MOBILE PRODUCT IMAGE */}
                      <motion.div
                        animate={{
                          scale: selected ? 1 : 0.94,
                        }}
                        transition={slideTransition}
                        className="
                          relative z-0 mx-auto
                          mt-1 h-[51%] min-h-0 w-full
                          sm:mt-7 sm:h-[230px]
                          lg:mt-10 lg:h-[300px]
                        "
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          sizes="(max-width: 767px) 86vw, (max-width: 1099px) 350px, 350px"
                          className="
                            object-contain
                            scale-[1.16]
                            sm:scale-100
                          "
                        />
                      </motion.div>

                      {/* PRODUCT DETAILS */}
                      <div className="relative z-0 mt-auto">
                        <h3 className="text-[14px] font-semibold leading-tight text-[#252525] sm:text-xl">
                          {product.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-[#777777] sm:mt-3 sm:line-clamp-3 sm:text-xs sm:leading-5">
                          {product.description}
                        </p>
                      </div>

                      {/* EXPLORE LINK */}
                      <Link
                        href="/products"
                        tabIndex={visible ? 0 : -1}
                        className="relative z-20 mt-1 flex min-h-8 cursor-pointer items-center justify-center gap-2 text-[11px] font-semibold text-[#252525] transition-colors hover:text-[#FF6500] sm:mt-4 sm:min-h-10 sm:text-sm"
                      >
                        Explore Products

                        <ArrowRight
                          size={18}
                          className="text-[#FF6500]"
                        />
                      </Link>
                    </article>
                  </motion.div>
                );
              })}
          </motion.div>
        </motion.div>

        {/* DOT NAVIGATION */}
        <div className="mt-5 flex items-center justify-center gap-2 md:mt-7">
          {products.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${product.title}`}
              aria-pressed={active === index}
              className="flex size-9 cursor-pointer items-center justify-center"
            >
              <motion.span
                animate={{
                  width: active === index ? 32 : 7,
                  backgroundColor:
                    active === index
                      ? "#FF6500"
                      : "#D5D5D5",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                }}
                className="h-[7px] rounded-full"
              />
            </button>
          ))}
        </div>

        {/* PROGRESS TRACK */}
        <div className="mx-auto mt-4 max-w-[260px]">
          <div className="h-1 overflow-hidden rounded-full bg-[#DADADA]">
            <motion.div
              animate={{
                width: `${((active + 1) / count) * 100}%`,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
              }}
              className="h-full bg-[#FF6500]"
            />
          </div>

          <p className="mt-2 text-center text-xs text-[#777777]">
            {String(active + 1).padStart(2, "0")}
            {" / "}
            {String(count).padStart(2, "0")}
          </p>
        </div>
      </Container>
    </section>
  );
}
