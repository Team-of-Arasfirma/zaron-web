
"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { useCareerReducedMotion } from "@/hooks/use-career-reduced-motion";
import { Container } from "@/components/layout/container";

const HERO_IMAGE = "/careers/career-hero.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function CareerHero() {
  const reduced = useCareerReducedMotion();

  const entrance = (delay: number) => ({
    initial: reduced
      ? (false as const)
      : {
          opacity: 0,
          y: 22,
        },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduced ? 0 : 0.6,
      delay: reduced ? 0 : delay,
      ease,
    },
  });

  return (
    <section
      id="career-hero"
      aria-labelledby="career-heading"
      className="
        relative w-full
        overflow-hidden
        bg-[#222D32]
        pb-16 pt-40
        text-white
        sm:pb-20
        lg:pb-24 lg:pt-48
      "
    >
      <Container
        className="
          mx-auto grid
          max-w-[1920px]
          grid-cols-1
          items-center
          gap-8
          lg:grid-cols-[1.1fr_1fr]
          lg:gap-10
        "
      >
        {/* LEFT CONTENT */}
        <div className="relative z-10 min-w-0">
          {/* CAREER LABEL */}
          <motion.p
            {...entrance(0)}
            className="
              mb-5 text-lg
              font-medium
              text-[#FF6500]
            "
          >
            Career
          </motion.p>

          {/* MAIN HEADING */}
          <h1
            id="career-heading"
            className="
              text-[clamp(2rem,3.6vw,4.5rem)]
              font-extrabold
              leading-[1.12]
              tracking-[-0.035em]
            "
          >
            <motion.span
              {...entrance(0.1)}
              className="block"
            >
              BUILD YOUR FUTURE
            </motion.span>

            <motion.span
              {...entrance(0.2)}
              className="block"
            >
              WITH ZARON.
            </motion.span>
          </h1>

          {/* DESCRIPTION */}
          <motion.p
            {...entrance(0.3)}
            className="
              mt-6 max-w-xl
              text-base
              leading-relaxed
              text-gray-300
              sm:text-lg
            "
          >
            At Zaron, every role contributes to real
            projects, better solutions and continuous
            progress. Build your skills, take on
            meaningful challenges and grow with us.
          </motion.p>
        </div>

        {/* RIGHT HERO IMAGE */}
        <motion.div
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  x: 24,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: reduced ? 0 : 0.8,
            delay: reduced ? 0 : 0.2,
            ease,
          }}
          className="
            relative
            mx-auto
            h-[280px] w-full
            max-w-[560px]
            sm:h-[350px]
            md:h-[400px]
            lg:h-[420px]
          "
        >
          <Image
            src={HERO_IMAGE}
            alt="Team collaborating on industrial projects at Zaron Industries"
            fill
            loading="eager"
            quality={85}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 560px, 45vw"
            className="
              object-contain
              object-center
            "
          />
        </motion.div>
      </Container>
    </section>
  );
}
