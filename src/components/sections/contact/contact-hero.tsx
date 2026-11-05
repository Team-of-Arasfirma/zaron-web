
"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";

const HERO_IMAGE = "/contact/contact-hero.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactHero() {
  const reduceMotion = Boolean(useReducedMotion());

  const reveal = (delay: number) => ({
    initial: reduceMotion
      ? (false as const)
      : {
          opacity: 0,
          y: 25,
        },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="contact-hero"
      aria-labelledby="contact-hero-heading"
      className="
        relative isolate
        w-full overflow-hidden
        bg-[#F0F0F0]
      "
    >
      <Container
        className="
          relative mx-auto
          grid w-full
          min-h-[620px]
          grid-cols-1
          items-center
          gap-10
          pt-[145px] pb-8

          sm:min-h-[650px]
          sm:pt-[160px]

          lg:min-h-[590px]
          lg:grid-cols-[1fr_1fr]
          lg:gap-8
          lg:pt-[130px]
          lg:pb-6

          xl:min-h-[630px]
          xl:grid-cols-[0.98fr_1.02fr]
        "
      >
        {/* LEFT HERO CONTENT */}
        <div className="relative z-20 min-w-0">
          {/* SECTION LABEL */}
          <motion.div
            {...reveal(0.1)}
            className="flex items-center gap-7"
          >
            <span
              aria-hidden="true"
              className="
                h-[4px] w-[80px]
                shrink-0 rounded-full
                bg-[#FF6500]
                sm:w-[90px]
              "
            />

            <span
              className="
                font-serif
                text-[24px]
                text-[#171717]
                sm:text-[28px]
              "
            >
              Contact
            </span>
          </motion.div>

          {/* HERO HEADING */}
          <h1
            id="contact-hero-heading"
            className="
              mt-8
              text-[clamp(2.8rem,5vw,5.3rem)]
              font-extrabold
              leading-[1.15]
              tracking-[-0.04em]
              lg:whitespace-nowrap
            "
          >
            <motion.span
              {...reveal(0.2)}
              className="block text-[#282828]"
            >
              LET&apos;S BUILD
            </motion.span>

            <motion.span
              {...reveal(0.33)}
              className="mt-4 block text-[#F05A00]"
            >
              SOMETHING
            </motion.span>

            <motion.span
              {...reveal(0.46)}
              className="mt-3 block text-[#F05A00]"
            >
              STRONGER.
            </motion.span>
          </h1>

          {/* DESCRIPTION */}
          <motion.p
            {...reveal(0.6)}
            className="
              mt-7
              max-w-[780px]
              text-[17px]
              leading-[1.35]
              text-[#555555]
              sm:text-[21px]
              lg:text-[21px]
              xl:text-[24px]
            "
          >
            Planning a roofing, cladding or structural
            project? Talk to our team and discover
            the right solution for your needs.
          </motion.p>
        </div>

        {/* RIGHT HERO ILLUSTRATION */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 65,
                  y: 15,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 0.3,
            ease,
          }}
          className="
            relative z-10
            mx-auto
            aspect-[1.5]
            w-full
            max-w-[850px]
            sm:aspect-[1.65]
            lg:aspect-[1.45]
            lg:max-w-none
            xl:aspect-[1.5]
          "
        >
          <Image
            src={HERO_IMAGE}
            alt="Zaron engineering and customer support team discussing a roofing project"
            fill
            loading="eager"
            quality={85}
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 850px, 50vw"
            className="object-contain object-center"
          />
        </motion.div>
      </Container>
    </section>
  );
}
