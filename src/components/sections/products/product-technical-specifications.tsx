"use client";

import Link from "next/link";

import {
  Sparkles,
  Gem,
  Ruler,
  Settings,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { Container } from "@/components/layout/container";
import type {
  ProductDetail,
  ProductFeature,
} from "@/data/products";

type ProductTechnicalSpecificationsProps = {
  detail: ProductDetail;
};

const defaultHighlights: ProductFeature[] = [
  {
    title: "Reliable Performance",
    icon: "shield",
  },
  {
    title: "Standard Dimensions",
    icon: "ruler",
  },
  {
    title: "Custom Length Options",
    icon: "roof",
  },
  {
    title: "Quality Manufacturing",
    icon: "layers",
  },
];

const highlightIcons = [
  Sparkles,
  Gem,
  Ruler,
  Settings,
];

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductTechnicalSpecifications({
  detail,
}: ProductTechnicalSpecificationsProps) {
  const reduceMotion = Boolean(useReducedMotion());

  const highlights =
    detail.technicalHighlights?.length
      ? detail.technicalHighlights
      : defaultHighlights;

  const specifications =
    detail.specifications ?? [];

  return (
    <section
      id="technical-specifications"
      aria-labelledby="product-specifications-heading"
      className="
        relative w-full
        bg-white
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <Container>
        <div
          className="
            grid grid-cols-1
            items-start
            gap-12
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-14
            xl:gap-20
          "
        >
          {/* LEFT COLUMN */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              ease,
            }}
            className="min-w-0"
          >
            {/* SECTION LABEL */}
            <div>
              <p
                className="
                  font-serif
                  text-[18px]
                  text-[#171717]
                  sm:text-[20px]
                "
              >
                Technical Specifications
              </p>

              <span
                aria-hidden="true"
                className="
                  mt-2 block
                  h-[3px] w-[55px]
                  bg-[#F4F4F4]
                "
              />
            </div>

            {/* MAIN HEADING */}
            <h2
              id="product-specifications-heading"
              className="
                mt-3
                text-[27px]
                font-extrabold
                uppercase
                leading-[1.14]
                tracking-[-0.035em]
                text-[#686868]
                sm:text-[34px]
                lg:text-[36px]
              "
            >
              DETAILS THAT
              <span className="block text-[#FF6500]">
                DEFINE PERFORMANCE.
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mt-3
                max-w-[570px]
                text-[14px]
                leading-[1.5]
                text-[#686868]
                sm:text-[16px]
              "
            >
              Our roofing sheets are manufactured with
              precision using high-quality raw materials,
              ensuring consistent quality, strength and
              weather resistance for long-term performance
              across a wide range of applications.
            </p>

            {/* TECHNICAL HIGHLIGHT CARDS */}
            <div
              className="
                mt-7
                grid grid-cols-2
                gap-3
                sm:grid-cols-4
                sm:gap-4
              "
            >
              {highlights.slice(0, 4).map(
                (feature, index) => {
                  const Icon =
                    highlightIcons[index] ?? Settings;

                  return (
                    <motion.div
                      key={`${feature.title}-${index}`}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 18,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -5,
                            }
                      }
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.45,
                        delay: reduceMotion
                          ? 0
                          : index * 0.08,
                        ease,
                      }}
                      className="
                        flex min-h-[112px]
                        min-w-0
                        flex-col
                        items-center
                        justify-center
                        gap-4
                        rounded-[6px]
                        border border-[#E7E7E7]
                        bg-white
                        px-2 py-4
                        text-center
                        transition-shadow
                        duration-300
                        hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]
                        sm:min-h-[122px]
                      "
                    >
                      <Icon
                        size={30}
                        strokeWidth={1.8}
                        aria-hidden="true"
                        className="text-[#FF6500]"
                      />

                      <span
                        className="
                          max-w-[135px]
                          text-[11px]
                          font-medium
                          leading-[1.35]
                          text-[#171717]
                          sm:text-[12px]
                        "
                      >
                        {feature.title}
                      </span>
                    </motion.div>
                  );
                }
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 30,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease,
            }}
            className="min-w-0"
          >
            {/* TABLE HEADING */}
            <div>
              <h3
                className="
                  font-serif
                  text-[18px]
                  text-[#171717]
                  sm:text-[20px]
                "
              >
                Technical Specifications
              </h3>

              <span
                aria-hidden="true"
                className="
                  mt-2 block
                  h-[3px] w-[55px]
                  bg-[#FF6500]
                "
              />
            </div>

            {/* SPECIFICATION TABLE */}
            {specifications.length > 0 ? (
              <div
                className="
                  mt-3
                  overflow-hidden
                  rounded-[10px]
                  border border-[#DADFE3]
                  bg-white
                "
              >
                <table
                  className="
                    w-full
                    table-fixed
                    border-collapse
                    text-left
                    text-[12px]
                    sm:text-[14px]
                  "
                >
                  <caption className="sr-only">
                    Product technical specifications
                  </caption>

                  <tbody>
                    {specifications.map(
                      (specification, index) => (
                        <tr
                          key={`${specification.label}-${index}`}
                          className="
                            [&:not(:last-child)>*]:border-b
                            [&:not(:last-child)>*]:border-[#DADFE3]
                          "
                        >
                          {/* LABEL COLUMN */}
                          <th
                            scope="row"
                            className="
                              relative
                              w-[40%]
                              border-r border-[#DADFE3]
                              bg-[#F5F7F8]
                              px-4 py-4
                              align-top
                              font-medium
                              leading-[1.45]
                              text-[#171717]
                              sm:px-5
                            "
                          >
                            <span
                              aria-hidden="true"
                              className="
                                absolute
                                left-[6px] top-1/2
                                h-[22px] w-[2px]
                                -translate-y-1/2
                                bg-[#FF6500]
                              "
                            />

                            <span className="block break-words">
                              {specification.label}
                            </span>
                          </th>

                          {/* VALUE COLUMN */}
                          <td
                            className="
                              w-[60%]
                              bg-white
                              px-4 py-4
                              align-top
                              leading-[1.45]
                              break-words
                              text-[#171717]
                              sm:px-5
                            "
                          >
                            {specification.value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              /* TRUTHFUL EMPTY STATE */
              <div
                className="
                  mt-3
                  rounded-[10px]
                  border border-[#E5E5E5]
                  bg-white
                  px-6 py-8
                "
              >
                <h4
                  className="
                    text-[17px]
                    font-semibold
                    text-[#282828]
                  "
                >
                  Need the exact specifications?
                </h4>

                <p
                  className="
                    mt-3
                    text-[14px]
                    leading-[1.6]
                    text-[#686868]
                  "
                >
                  Verified technical specifications are
                  not available online yet. Contact our
                  team for the latest product information.
                </p>

                <Link
                  href="/contact"
                  className="
                    mt-5
                    inline-flex min-h-11
                    items-center gap-2
                    rounded-[6px]
                    bg-[#FF6500]
                    px-5 py-3
                    text-[13px]
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-[#E85B00]
                    focus-visible:outline-2
                    focus-visible:outline-offset-3
                    focus-visible:outline-[#FF6500]
                  "
                >
                  Request Specifications

                  <ArrowUpRight
                    size={17}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )}

            {/* OPTIONAL BROCHURE */}
            {detail.brochure && (
              <a
                href={detail.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4
                  inline-flex min-h-11
                  items-center gap-2
                  text-[13px]
                  font-semibold
                  text-[#FF6500]
                  underline underline-offset-4
                  focus-visible:outline-2
                  focus-visible:outline-[#FF6500]
                "
              >
                View Product Brochure
                <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}