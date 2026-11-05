
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/container";


const factoryImages = [
  {
    src: "/about/who-we-are-main.png",
    alt: "Aerial view of Zaron Industries manufacturing facility",
  },
  {
    src: "/about/about-hero-03.png",
    alt: "Roofing sheet manufacturing machinery",
  },
  {
    src: "/about/who-we-are-02.png",
    alt: "Industrial manufacturing equipment",
  },
  {
    src: "/about/who-we-are-001.png",
    alt: "Metal roofing production line",
  },
];


export function WhoWeAre() {
  const reduceMotion = Boolean(useReducedMotion());

  const reveal = {
    initial: reduceMotion
      ? false
      : { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease: "easeOut" as const,
    },
  };

  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="w-full overflow-x-clip bg-[#F4F4F4] py-14 md:py-20"
    >
      <Container>
        <div
          className="
            grid grid-cols-1 items-center
            gap-10 lg:grid-cols-2
            lg:gap-12 xl:gap-16
          "
        >
          {/* LEFT - FACTORY IMAGES */}
          <motion.div
            {...reveal}
            className="w-full min-w-0"
          >
            {/* MAIN IMAGE */}
            <div
              className="
                group relative
                aspect-[1.8/1]
                w-full overflow-hidden
                rounded-[12px]
              "
            >
              <Image
                src={factoryImages[0].src}
                alt={factoryImages[0].alt}
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="
                  object-cover
                  transition-transform duration-700
                  ease-out group-hover:scale-105
                  motion-reduce:transition-none
                "
              />
            </div>

            {/* THREE THUMBNAILS */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              {factoryImages.slice(1).map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 25 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : index * 0.1,
                  }}
                  className="
                    group relative
                    aspect-[1.05/1]
                    min-w-0 overflow-hidden
                    rounded-[10px]
                  "
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1023px) 30vw, 15vw"
                    className="
                      object-cover
                      transition-transform duration-700
                      ease-out group-hover:scale-110
                      motion-reduce:transition-none
                    "
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT - ABOUT CONTENT */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, x: 35 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              ease: "easeOut",
            }}
            className="min-w-0"
          >
            {/* SECTION LABEL */}
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="
                  h-[3px] w-[54px]
                  rounded-full bg-[#FF6500]
                "
              />

              <p
                className="
                  font-serif text-[17px]
                  text-[#252525] sm:text-[19px]
                "
              >
                Who we are
              </p>
            </div>

            {/* HEADING */}
            <h2
              id="who-we-are-heading"
              className="
                mt-6
                text-[clamp(2rem,3.2vw,3.25rem)]
                font-extrabold uppercase
                leading-[1.15]
                tracking-[-0.04em]
              "
            >
              <span className="block text-[#666666]">
                BUILT ON QUALITY.
              </span>

              <span className="mt-2 block text-[#FF6500]">
                DRIVEN BY INNOVATION.
              </span>
            </h2>

            {/* DESCRIPTION */}
            <div
              className="
                mt-6 space-y-5
                text-[14px] leading-[1.85]
                text-[#555555]
                sm:text-[16px]
              "
            >
              <p>
                Zaron Industries, established in 2012,
                began its journey in 2011 with roofing
                sheet manufacturing. From a single
                facility, we have grown into a trusted
                manufacturer of roofing, cladding and
                structural solutions, with a strong
                focus on quality, innovation and
                customer satisfaction, delivering
                products that meet global standards.
              </p>

              <p>
                Our advanced manufacturing facilities
                and modern machinery enable us to
                deliver high-performance products
                for industrial, commercial and
                infrastructure projects across India.
              </p>
            </div>

            {/* ORANGE UNDERLINE */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : 0.3,
              }}
              style={{ transformOrigin: "left" }}
              className="
                mt-7 h-[3px]
                w-[150px] rounded-full
                bg-[#FF6500]
              "
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
