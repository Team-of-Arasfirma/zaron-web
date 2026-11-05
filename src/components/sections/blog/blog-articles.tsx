
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { articleHref, type DemoArticle } from "@/data/demo-blogs";

const ease = [0.22, 1, 0.36, 1] as const;

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
}

export function BlogArticles({ articles }: { articles: DemoArticle[] }) {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <section
      id="blog-articles"
      aria-labelledby="blog-articles-heading"
      className="w-full bg-[#F4F4F4] py-16 md:py-20 lg:py-24"
    >
      <Container>
        {/* SECTION HEADING */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease,
          }}
          className="mb-10 flex items-center gap-4"
        >
          <span
            aria-hidden="true"
            className="h-[3px] w-[52px] rounded-full bg-[#FF6500]"
          />

          <h2
            id="blog-articles-heading"
            className="font-serif text-[20px] text-[#282828] sm:text-[24px]"
          >
            Latest Articles
          </h2>
        </motion.div>

        {/* BLOG GRID — 6 CARDS */}
        <div
          className="
            grid grid-cols-1
            items-stretch
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {articles.map((blog, index) => {
            const imageSrc = blog.coverImage;
            const href = articleHref(blog);
            const cardClassName = `
              group flex h-full min-w-0 flex-col
              overflow-hidden rounded-[6px]
              border border-[#FFB08B]
              bg-white p-4
              shadow-[0_2px_6px_rgba(0,0,0,0.02)]
              transition-shadow duration-300
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)]
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-[#FF6500]
              sm:p-5
            `;

            const cardContent = (
              <>
                {/* COVER IMAGE */}
                <div
                  className="
                    relative block aspect-[1.5]
                    w-full overflow-hidden
                    rounded-[5px]
                    bg-[#E5E5E5]
                  "
                >
                  <Image
                    
                    src={imageSrc}
                    alt={blog.coverAlt || blog.title}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 639px) calc(100vw - 72px), (max-width: 1023px) 45vw, 33vw"
                    className="
                      object-cover object-center
                      transition-transform duration-700
                      ease-out
                      group-hover:scale-[1.04]
                      motion-reduce:transform-none
                    "
                  />

                </div>

                {/* DATE */}
                <time
                  dateTime={blog.publishedAt}
                  className="
                    mt-5 block
                    text-[12px] font-medium
                    text-[#FF6500]
                  "
                >
                  {formatDate(blog.publishedAt)}
                </time>

                {/* TITLE */}
                <h3
                  className="
                    mt-2
                    text-[18px] font-semibold
                    leading-[1.3] tracking-[-0.02em]
                    text-[#171717]
                    transition-colors duration-300
                    group-hover:text-[#FF6500]
                    sm:text-[20px]
                    lg:text-[21px]
                  "
                >
                  {blog.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                    mt-3 text-[13px]
                    leading-[1.5] text-[#858585]
                    sm:text-[14px]
                  "
                >
                  {blog.excerpt}
                </p>

                {/* READ ARTICLE */}
                <div className="mt-auto pt-6">
                  <span
                    className={`
                      inline-flex min-h-[34px]
                      items-center justify-center
                      rounded-[5px]
                      px-4 py-2
                      text-[12px] font-semibold
                      text-white
                      transition-colors duration-300
                      bg-[#FF6500] group-hover:bg-[#D94F00]
                    `}
                  >
                    Read Article
                  </span>
                </div>
              </>
            );

            return (
              <motion.article
                key={blog.id}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 35,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.1,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : (index % 3) * 0.1,
                  ease,
                }}
                whileHover={
                  reduceMotion ? undefined : { y: -5 }
                }
                className="h-full min-w-0"
              >
                <Link href={href} aria-label={"Read " + blog.title} className={cardClassName}>
                  {cardContent}
                </Link>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

