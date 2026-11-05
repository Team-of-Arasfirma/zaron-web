
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";

type Category =
  | "All Projects"
  | "Industrial"
  | "Commercial"
  | "Roofing"
  | "Structural"
  | "Agricultural";

type Project = {
  id: number;
  title: string;
  category: Exclude<Category, "All Projects">;
  image: string;
  location: string;
};

const categories: Category[] = [
  "All Projects",
  "Industrial",
  "Commercial",
  "Roofing",
  "Structural",
  "Agricultural",
];

const projects: Project[] = [
  {
    id: 1,
    title: "Industrial Roofing Project",
    category: "Industrial",
    image: "/projects/gallery/project-01.png",
    location: "Tamil Nadu",
  },
  {
    id: 2,
    title: "Commercial Roofing Project",
    category: "Commercial",
    image: "/projects/gallery/project-02.png",
    location: "Tamil Nadu",
  },
  {
    id: 3,
    title: "Steel Structure Project",
    category: "Structural",
    image: "/projects/gallery/project-03.png",
    location: "Tamil Nadu",
  },

  {
    id: 4,
    title: "Agricultural Roofing Project",
    category: "Agricultural",
    image: "/projects/gallery/project-05.png",
    location: "Tamil Nadu",
  },
  {
    id: 5,
    title: "Factory Roofing Project",
    category: "Industrial",
    image: "/projects/gallery/project-06.png",
    location: "Tamil Nadu",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      layout={!reduceMotion}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 30,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 15,
            }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.07,
        ease,
      }}
      className="group w-full min-w-0 max-w-[380px]"
    >
      {/* FIGMA IMAGE: 380 × 300px / RADIUS 14px */}
      <div
        className="
          relative isolate
          aspect-[19/15]
          w-full max-w-[380px]
          overflow-hidden rounded-[14px]
          bg-[#EAEAEA]
        "
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          quality={85}
          loading={project.id === 1 ? "eager" : "lazy"}
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1279px) 50vw, 380px"
          className="
            object-cover object-center
            transition-transform
            duration-500 ease-out
            group-hover:scale-[1.02]
            motion-reduce:transform-none
          "
        />

        {/* SUBTLE HOVER GRADIENT */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-black/20 via-transparent to-transparent
            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />

        {/* CATEGORY LABEL */}
        <div
          className="
            absolute left-4 top-4
            rounded-full
            border border-white/50
            bg-black/40
            px-4 py-2
            text-[12px] font-medium text-white
            backdrop-blur-md
          "
        >
          {project.category}
        </div>
      </div>

      {/* PROJECT INFORMATION */}
      <div className="mt-4 px-1">
        <h3
          className="
            text-[17px] font-semibold
            leading-[1.35]
            text-[#282828]
            sm:text-[19px]
          "
        >
          {project.title}
        </h3>

        <p className="mt-1 text-[13px] text-[#888888]">
          {project.location}
        </p>
      </div>
    </motion.article>
  );
}

export function ProjectsGallery() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All Projects");

  const reduceMotion = Boolean(useReducedMotion());

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Projects") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section
      id="projects-gallery"
      aria-labelledby="projects-gallery-heading"
      className="w-full bg-white py-16 md:py-20 lg:py-24"
    >
      <Container>
        {/* SECTION LABEL */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 15 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
          }}
          className="flex items-center gap-4"
        >
          <span className="h-[3px] w-[52px] bg-[#FF6500]" />

          <span className="text-[16px] font-medium text-[#282828]">
            Our Projects
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 25 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            delay: reduceMotion ? 0 : 0.1,
            ease,
          }}
          className="mt-7"
        >
          <h2
            id="projects-gallery-heading"
            className="
              text-[30px] font-extrabold
              leading-[1.12]
              tracking-[-0.035em]
              text-[#686868]
              sm:text-[40px]
              md:text-[48px]
              lg:text-[54px]
            "
          >
            PROJECTS THAT
            <span className="block text-[#FF6500]">
              SPEAK FOR THEMSELVES.
            </span>
          </h2>

          <p
            className="
              mt-4 max-w-[760px]
              text-[15px] leading-[1.6]
              text-[#777777]
              sm:text-[17px]
            "
          >
            Explore our roofing and structural project portfolio
            across industrial, commercial and other applications.
          </p>
        </motion.div>

        {/* CATEGORY FILTERS */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 15 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            delay: reduceMotion ? 0 : 0.2,
          }}
          className="mt-10 flex flex-wrap items-center gap-3"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const active = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className={`
                  rounded-full border
                  px-5 py-2.5
                  text-[13px] font-medium
                  transition-all duration-300
                  sm:text-[14px]
                  ${
                    active
                      ? "border-[#FF6500] bg-[#FF6500] text-white shadow-[0_5px_14px_rgba(255,101,0,0.15)]"
                      : "border-[#D9D9D9] bg-white text-[#555555] hover:border-[#FF6500] hover:text-[#FF6500]"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* PROJECT IMAGE GRID */}
        <motion.div
          layout={!reduceMotion}
          className="
            mt-10 grid grid-cols-1
            justify-items-center
            gap-x-6 gap-y-10
            sm:grid-cols-2
            xl:grid-cols-3
            xl:gap-x-8
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-[#777777]">
            No projects available in this category.
          </div>
        )}
      </Container>
    </section>
  );
}
