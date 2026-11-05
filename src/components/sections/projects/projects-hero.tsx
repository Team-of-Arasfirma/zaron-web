
"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsHero() {
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
      id="projects-hero"
      aria-labelledby="projects-hero-heading"
      className="relative isolate w-full overflow-hidden bg-[#FFFAE9]"
    >
      <Container>
        <div
          className="
            relative min-h-[700px]
            pt-[155px] pb-12
            sm:min-h-[760px]
            md:pt-[180px]
            lg:min-h-[790px]
            lg:pt-[180px]
            xl:min-h-[850px]
          "
        >
          {/* OUTLINED BACKGROUND PROJECTS TEXT */}
          <motion.span
            aria-hidden="true"
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 40,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              delay: reduceMotion ? 0 : 0.4,
              ease,
            }}
            className="
              pointer-events-none absolute
              top-[175px] right-[-2%] z-0
              hidden select-none whitespace-nowrap
              text-[110px] font-black
              leading-none tracking-[-0.06em]
              text-transparent
              [-webkit-text-stroke:1px_rgba(40,40,40,0.07)]
              lg:block
              xl:text-[150px]
            "
          >
            PROJECTS
          </motion.span>

          {/* SECTION CONTENT */}
          <div className="relative z-20 max-w-[720px] pb-[440px] sm:pb-[530px] md:pb-[600px] lg:pb-0">
            {/* SECTION LABEL */}
            <motion.div
              {...reveal(0.1)}
              className="flex items-center gap-6"
            >
              <span
                aria-hidden="true"
                className="h-[3px] w-[52px] rounded-full bg-[#FF6500]"
              />

              <span
                className="
                  font-serif text-[18px]
                  text-[#282828]
                  sm:text-[22px]
                "
              >
                Projects
              </span>
            </motion.div>

            {/* MAIN HEADING */}
            <h1
              id="projects-hero-heading"
              className="
                mt-8 text-[38px]
                font-extrabold
                leading-[1.08]
                tracking-[-0.04em]
                sm:text-[52px]
                md:text-[62px]
                lg:text-[68px]
                xl:text-[76px]
              "
            >
              <motion.span
                {...reveal(0.22)}
                className="block text-[#282828]"
              >
                BUILT TO PERFORM.
              </motion.span>

              <motion.span
                {...reveal(0.35)}
                className="mt-3 block text-[#F05A00]"
              >
                PROVEN IN THE
              </motion.span>

              <motion.span
                {...reveal(0.47)}
                className="block text-[#F05A00]"
              >
                REAL WORLD.
              </motion.span>
            </h1>

            {/* HERO DESCRIPTION */}
            <motion.p
              {...reveal(0.65)}
              className="
                mt-7 max-w-[530px]
                text-[15px] leading-[1.55]
                text-[#555555]
                sm:text-[18px]
                md:text-[20px]
              "
            >
              Explore selected roofing, cladding and
              structural projects delivered across
              industries and applications.
            </motion.p>
          </div>

          {/* ROOFING CUTOUT IMAGE */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 100,
                    y: 40,
                    scale: 1.04,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              delay: reduceMotion ? 0 : 0.3,
              ease,
            }}
            className="
              pointer-events-none
              absolute z-10
              right-[-100px] bottom-[50px]
              h-[420px] w-[850px]
              sm:right-[-130px]
              sm:bottom-[25px]
              sm:h-[510px] sm:w-[1050px]
              md:right-[-180px]
              md:h-[580px] md:w-[1160px]
              lg:right-[-240px]
              lg:bottom-[-15px]
              lg:h-[670px] lg:w-[1350px]
              xl:right-[-300px]
              xl:h-[740px] xl:w-[1500px]
            "
          >
            <Image
              src="/projects/projects-hero-roof.png"
              alt="Modern industrial metal roofing structure with steel framing"
              fill
              loading="eager"
              quality={85}
              sizes="(max-width: 640px) 850px, (max-width: 1024px) 1160px, 1500px"
              className="object-contain object-right-bottom"
            />
          </motion.div>

          {/* SCROLL INDICATOR */}
          <motion.a
            href="#projects-gallery"
            {...reveal(0.85)}
            className="
              absolute bottom-[24px] left-0
              z-30 inline-flex items-center
              gap-3 text-[12px] font-semibold
              tracking-[0.04em]
              text-[#282828]
              transition-colors duration-300
              hover:text-[#FF6500]
              sm:bottom-[40px]
              sm:text-sm
            "
            aria-label="Scroll to explore projects"
          >
            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, 8, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="text-[#FF6500]"
            >
              <ArrowDown size={21} strokeWidth={2} />
            </motion.span>

            SCROLL TO EXPLORE
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
