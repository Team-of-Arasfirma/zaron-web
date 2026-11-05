
"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

export const PRODUCT_CATEGORIES = [
  { id: "roofing-sheets", label: "Roofing sheets" },
  { id: "crimp-sheets", label: "crimp sheets" },
  { id: "insulation", label: "insulation" },
  { id: "purlins", label: "Purlins" },
  {
    id: "sandwich-panel",
    label: "Sandwich Panel (PU | PIR | Rockwool (Glasswool))",
  },
  { id: "laser-cutting", label: "laser cutting" },
  { id: "flashing", label: "flashing" },
] as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[number]["id"];

type ProductCategoryTabsProps = {
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
};

export function ProductCategoryTabs({
  activeCategory,
  onCategoryChange,
}: ProductCategoryTabsProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % PRODUCT_CATEGORIES.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (index - 1 + PRODUCT_CATEGORIES.length) %
        PRODUCT_CATEGORIES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = PRODUCT_CATEGORIES.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const category = PRODUCT_CATEGORIES[nextIndex];

    onCategoryChange(category.id);

    const buttons =
      tabListRef.current?.querySelectorAll<HTMLButtonElement>(
        'button[role="tab"]'
      );

    buttons?.[nextIndex]?.focus();
    buttons?.[nextIndex]?.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <div
      className="
        relative z-20
        w-full
        rounded-[12px]
        bg-white
        p-[9px]
        sm:p-[10px]
      "
    >
      <div
        ref={tabListRef}
        role="tablist"
        aria-label="Product categories"
        className="
          flex w-full
          gap-[6px]
          overflow-x-auto
          overscroll-x-contain
          scroll-smooth
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {PRODUCT_CATEGORIES.map((category, index) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              id={`product-tab-${category.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="products-category-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => onCategoryChange(category.id)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
              className={`
                relative
                flex min-h-[46px]
                min-w-[108px]
                flex-1 shrink-0
                items-center justify-center
                rounded-[7px]
                px-3 py-3
                text-center
                text-[12px]
                font-medium
                leading-[1.35]
                transition-colors duration-200
                focus-visible:outline-2
                focus-visible:outline-offset-[-3px]
                focus-visible:outline-[#222D32]
                sm:min-h-[52px]
                sm:text-[13px]
                ${
                  isActive
                    ? "text-white"
                    : "bg-[#BDBDBD] text-white hover:bg-[#A6A6A6]"
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="active-product-category"
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    rounded-[7px]
                    bg-[#FF6500]
                  "
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 350,
                          damping: 35,
                        }
                  }
                />
              )}

              <span className="relative z-10">
                {category.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
