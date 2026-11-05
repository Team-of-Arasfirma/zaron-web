
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full bg-[#F4F4F4] py-14 md:py-20"
    >
      <Container>
        <div
          className="
            grid grid-cols-1 items-center gap-10
            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-12 xl:gap-16
          "
        >
          {/* LEFT — FACTORY IMAGE */}
          <div className="relative">
            <div
              className="
                relative h-[280px] w-full
                overflow-hidden rounded-[18px]
                shadow-[0_12px_32px_rgba(0,0,0,0.08)]
                sm:h-[360px]
                md:h-[420px]
                lg:h-[430px]
              "
            >
              <Image
                src="/Banner/fac-cta.png"
                alt="Zaron manufacturing facility"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="
                  object-cover object-center
                  transition-transform duration-700
                  hover:scale-[1.04]
                  motion-reduce:transform-none
                "
              />

              {/* EXISTING IMAGE OVERLAY */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/10"
              />

              {/* LEFT IMAGE LOGO */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute left-5 top-5
                  sm:left-6 sm:top-6
                "
              >
                <Image
                  src="/opacity/zaron-lo.svg"
                  alt=""
                  width={86}
                  height={86}
                  className="
                    h-[56px] w-[56px]
                    object-contain
                    sm:h-[72px] sm:w-[72px]
                  "
                />
              </div>

              {/* BOTTOM RIGHT BRAND NAME */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute bottom-4 right-4
                  hidden sm:block
                "
              >
                <Image
                  src="/opacity/name-lo.svg"
                  alt=""
                  width={160}
                  height={42}
                  className="
                    h-auto w-[120px]
                    object-contain
                    lg:w-[150px]
                  "
                />
              </div>
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="relative isolate w-full">
            {/* BACKGROUND LOGO — NO EXTRA OPACITY */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0 z-0
                flex items-center justify-center
                overflow-hidden
              "
            >
              <Image
                src="/opacity/zaron-lo.svg"
                alt=""
                width={350}
                height={350}
                className="
                  h-[240px] w-[240px]
                  object-contain
                  sm:h-[300px] sm:w-[300px]
                  lg:h-[350px] lg:w-[350px]
                "
              />
            </div>

            {/* CONTENT ABOVE WATERMARK */}
            <div className="relative z-10">
              {/* SMALL TITLE */}
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="
                    h-[3px] w-[40px]
                    rounded-full bg-[#FF6500]
                  "
                />

                <p className="text-[15px] font-medium text-[#1F1F1F]">
                  Our story
                </p>
              </div>

              {/* MAIN HEADING */}
              <h2
                id="about-heading"
                className="
                  mt-6 max-w-[560px]
                  text-[clamp(2.2rem,4vw,4rem)]
                  leading-[1.08]
                  font-extrabold uppercase
                  tracking-[-0.04em]
                  text-[#232323]
                "
              >
                <span className="block">
                  BUILT FOR
                </span>

                <span className="block">
                  BETTER{" "}
                  <span className="text-[#FF6500]">
                    ROOFING.
                  </span>
                </span>
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-6 max-w-[620px]
                  text-[15px] leading-[1.8]
                  text-[#555555]
                  sm:text-[16px]
                "
              >
                Zaron delivers high-performance roofing,
                cladding and structural solutions for
                demanding industrial and commercial
                environments. Combining precision
                engineering, advanced materials and reliable
                performance, we help create stronger,
                more efficient and sustainable buildings.
              </p>

              {/* EXPLORE PRODUCTS BUTTON */}
              <div className="mt-8">
                <Link
                  href="/products"
                  className="
                    inline-flex min-h-[46px]
                    items-center justify-center
                    rounded-full bg-[#FF6500]
                    px-7 text-[14px]
                    font-semibold text-white
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#E85C00]
                    hover:shadow-[0_10px_24px_rgba(255,101,0,0.22)]
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#FF6500]
                    motion-reduce:transform-none
                  "
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
