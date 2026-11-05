
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";

const ease = [0.22, 1, 0.36, 1] as const;

export function BlogHero() {
  const reduceMotion = Boolean(useReducedMotion());

  const reveal = (delay: number) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 30,
        },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="blog-hero"
      aria-labelledby="blog-hero-heading"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#98A5B6]
      "
    >
      <Container>
        <div
          className="
            relative
            min-h-[680px]
            pt-[165px] pb-[340px]
            sm:min-h-[730px]
            sm:pt-[180px]
            sm:pb-[380px]
            md:min-h-[690px]
            md:pt-[195px]
            md:pb-[250px]
            lg:min-h-[650px]
            lg:pt-[170px]
            lg:pb-[120px]
            xl:min-h-[690px]
            xl:pt-[175px]
          "
        >
          {/* HERO TEXT */}
          <div
            className="
              relative z-20
              max-w-[670px]
            "
          >
            {/* BLOG LABEL */}
            <motion.p
              {...reveal(0.1)}
              className="
                text-[42px]
                font-extrabold
                leading-none
                tracking-[-0.035em]
                text-[#FF6500]
                sm:text-[50px]
                md:text-[54px]
                lg:text-[58px]
              "
            >
              Blog
            </motion.p>

            {/* HEADING */}
            <h1
              id="blog-hero-heading"
              className="
                mt-5
                text-[38px]
                font-extrabold
                leading-[1.15]
                tracking-[-0.035em]
                text-white
                sm:text-[48px]
                md:text-[55px]
                lg:text-[58px]
                xl:text-[62px]
              "
            >
              <motion.span
                {...reveal(0.25)}
                className="block"
              >
                INSIGHTS THAT
              </motion.span>

              <motion.span
                {...reveal(0.4)}
                className="block"
              >
                BUILD BETTER.
              </motion.span>
            </h1>

            {/* DESCRIPTION */}
            <motion.p
              {...reveal(0.6)}
              className="
                mt-3
                max-w-[640px]
                text-[16px]
                font-normal
                leading-[1.35]
                text-[#292929]
                sm:text-[19px]
                md:text-[21px]
                lg:text-[21px]
              "
            >
              Explore practical insights, product knowledge,
              project stories and industry updates from Zaron.
            </motion.p>
          </div>

          {/* ILLUSTRATION */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 75,
                    y: 25,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.15,
              delay: reduceMotion ? 0 : 0.3,
              ease,
            }}
            className="
              pointer-events-none
              absolute z-10
              bottom-0
              right-[-60px]
              h-[350px]
              w-[690px]
              max-w-none

              sm:right-[-75px]
              sm:h-[430px]
              sm:w-[850px]

              md:right-[-130px]
              md:h-[480px]
              md:w-[970px]

              lg:right-[-160px]
              lg:h-[555px]
              lg:w-[1120px]

              xl:right-[-175px]
              xl:h-[630px]
              xl:w-[1300px]

              2xl:right-[-200px]
              2xl:w-[1420px]
            "
          >
            <Image
              src="/blog/blog-hero-illustration.png"
              alt="Illustration of an industrial steel roofing structure with trees, city skyline and sunset"
              fill
              loading="eager"
              quality={85}
              sizes="(max-width: 639px) 690px, (max-width: 1023px) 970px, (max-width: 1279px) 1120px, 1420px"
              className="
                object-contain
                object-right-bottom
              "
            />
          </motion.div>
        </div>
      </Container>

      {/* BOTTOM BORDER */}
      <div
        aria-hidden="true"
        className="
          absolute bottom-0 left-0
          z-30 h-[2px] w-full
          bg-white/30
        "
      />
    </section>
  );
}
