
"use client";

import { Check } from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import type { ProductColor } from "@/data/products";
import { Container } from "@/components/layout/container";
import { ProductDetailReveal } from "./product-detail-reveal";
import { useProductColor } from "./product-detail-selection";

type ProductColorSwatchesProps = {
  colors: ProductColor[];
  preview?: boolean;
};

export function ProductColorSwatches({
  colors,
  preview = false,
}: ProductColorSwatchesProps) {
  const { selected, select } = useProductColor();
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      role="group"
      aria-label={
        preview
          ? "Product colour previews"
          : "Available product colours"
      }
      className={
        preview
          ? "flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          : "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      }
    >
      {colors.map((color, index) => {
        const isSelected =
          selected?.name === color.name;

        return (
          <motion.button
            key={`${color.name}-${index}`}
            type="button"
            aria-label={`Select ${color.name}`}
            aria-pressed={isSelected}
            onClick={() => select(color)}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.97 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
            className={`
              group
              flex min-w-0
              flex-col items-center
              justify-start
              rounded-[10px]
              text-center
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-[#FF6500]
              ${
                preview
                  ? "w-[58px] p-1"
                  : "w-full p-2"
              }
            `}
          >
            {/* COLOUR SWATCH */}
            <span
              className={`
                relative
                flex shrink-0
                items-center justify-center
                overflow-hidden
                rounded-[7px]
                border border-black/15
                transition-[box-shadow,border-color]
                duration-200
                ${
                  preview
                    ? "h-[48px] w-[48px]"
                    : "aspect-[1.55] w-full"
                }
                ${
                  isSelected
                    ? "ring-2 ring-[#FF6500] ring-offset-[3px]"
                    : "group-hover:ring-1 group-hover:ring-[#FF6500]/50"
                }
              `}
              style={{
                backgroundColor: color.hex,
              }}
            >
              {isSelected && (
                <span
                  className="
                    flex size-7
                    items-center justify-center
                    rounded-full
                    bg-white/90
                    shadow-sm
                  "
                >
                  <Check
                    aria-hidden="true"
                    size={17}
                    strokeWidth={2.3}
                    className="text-[#282828]"
                  />
                </span>
              )}
            </span>

            {/* COLOUR NAME */}
            {!preview && (
              <span
                className={`
                  mt-3
                  block w-full
                  break-words
                  text-[12px]
                  leading-[1.4]
                  sm:text-[13px]
                  ${
                    isSelected
                      ? "font-semibold text-[#282828]"
                      : "font-normal text-[#626262]"
                  }
                `}
              >
                {color.name}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export function ProductAvailableColours({
  colors = [],
}: {
  colors?: ProductColor[];
}) {
  const { selected } = useProductColor();

  return (
    <section
      id="available-colours"
      aria-labelledby="product-colours-heading"
      className="
        relative w-full
        bg-white
        py-14
        sm:py-16
        lg:py-20
      "
    >
      <Container>
        <ProductDetailReveal>
          {/* SECTION LABEL */}
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="
                h-[3px] w-[55px]
                shrink-0
                bg-[#FF6500]
              "
            />

            <span
              className="
                font-serif
                text-[18px]
                text-[#282828]
                sm:text-[20px]
              "
            >
              Product Colours
            </span>
          </div>

          {/* HEADING */}
          <h2
            id="product-colours-heading"
            className="
              mt-5
              text-[clamp(1.9rem,3.6vw,3.2rem)]
              font-extrabold
              uppercase
              leading-[1.12]
              tracking-[-0.035em]
              text-[#686868]
            "
          >
            AVAILABLE{" "}
            <span className="text-[#FF6500]">
              COLOURS.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              max-w-[720px]
              text-[14px]
              leading-[1.7]
              text-[#626262]
              sm:text-[16px]
            "
          >
            Explore the available finishes for your
            roofing project. Select a colour to preview
            its selection and contact our team to
            confirm current availability.
          </p>

          {colors.length > 0 ? (
            <>
              {/* COLOUR GRID */}
              <div className="mt-9 sm:mt-11">
                <ProductColorSwatches
                  colors={colors}
                />
              </div>

              {/* SELECTED COLOUR */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="
                  mt-8
                  flex min-h-[48px]
                  items-center gap-3
                  rounded-[10px]
                  border border-[#E7E7E7]
                  bg-[#F8F8F8]
                  px-4 py-3
                "
              >
                {selected && (
                  <span
                    aria-hidden="true"
                    className="
                      h-6 w-6
                      shrink-0
                      rounded-full
                      border border-black/15
                    "
                    style={{
                      backgroundColor: selected.hex,
                    }}
                  />
                )}

                <p
                  className="
                    text-[13px]
                    text-[#626262]
                    sm:text-[14px]
                  "
                >
                  {selected ? (
                    <>
                      Selected colour:{" "}
                      <span className="font-semibold text-[#282828]">
                        {selected.name}
                      </span>
                    </>
                  ) : (
                    "Choose a colour to view your selection."
                  )}
                </p>
              </div>
            </>
          ) : (
            /* NO APPROVED COLOURS */
            <div
              className="
                mt-8
                rounded-[12px]
                border border-[#E5E5E5]
                bg-[#F8F8F8]
                px-6 py-7
              "
            >
              <p
                className="
                  max-w-[650px]
                  text-[14px]
                  leading-[1.7]
                  text-[#626262]
                "
              >
                The confirmed colour range is not
                available online yet. Please contact
                our team for current finishes and
                colour samples.
              </p>
            </div>
          )}
        </ProductDetailReveal>
      </Container>
    </section>
  );
}
