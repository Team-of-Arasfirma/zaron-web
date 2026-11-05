"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export const PRODUCT_CATEGORIES = [
  { id: "roofing-sheets", label: "Roofing sheets" },
  { id: "crimp-sheets", label: "Crimp sheets" },
  { id: "insulation", label: "Insulation" },
  { id: "purlins", label: "Purlins" },
  {
    id: "sandwich-panel",
    label: "Sandwich Panel (PU | PIR | Rockwool (Glasswool))",
  },
  { id: "laser-cutting", label: "Laser cutting" },
  { id: "flashing", label: "Flashing" },
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
  const tabListId = useId();
  const indicatorId = useId();

  const [scrollState, setScrollState] = useState({
    hasOverflow: false,
    canScrollLeft: false,
    canScrollRight: false,
  });

  useEffect(() => {
    const element = tabListRef.current;

    if (!element) return;

    const updateScrollState = () => {
      const maxScroll = element.scrollWidth - element.clientWidth;

      const nextState = {
        hasOverflow: maxScroll > 2,
        canScrollLeft: element.scrollLeft > 2,
        canScrollRight: element.scrollLeft < maxScroll - 2,
      };

      setScrollState((previous) => {
        if (
          previous.hasOverflow === nextState.hasOverflow &&
          previous.canScrollLeft === nextState.canScrollLeft &&
          previous.canScrollRight === nextState.canScrollRight
        ) {
          return previous;
        }

        return nextState;
      });
    };

    updateScrollState();

    element.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    const observer = new ResizeObserver(updateScrollState);

    observer.observe(element);

    Array.from(element.children).forEach((child) => {
      observer.observe(child);
    });

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      observer.disconnect();
    };
  }, []);

  // Keep the selected category visible without moving the page.
  useEffect(() => {
    const element = tabListRef.current;

    if (!element) return;

    const activeTab = element.querySelector<HTMLButtonElement>(
      'button[aria-selected="true"]',
    );

    if (!activeTab) return;

    const listRect = element.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    let distance = 0;

    if (tabRect.left < listRect.left) {
      distance = tabRect.left - listRect.left;
    } else if (tabRect.right > listRect.right) {
      distance = tabRect.right - listRect.right;
    }

    if (distance !== 0) {
      element.scrollBy({
        left: distance,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }
  }, [activeCategory, reduceMotion]);

  const scrollCategories = (direction: "left" | "right") => {
    const element = tabListRef.current;

    if (!element) return;

    const distance = Math.max(108, element.clientWidth * 0.75);

    element.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
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
        'button[role="tab"]',
      );

    buttons?.[nextIndex]?.focus({ preventScroll: true });
  };

  const arrowClassName = `
    absolute top-1/2 z-30
    flex h-11 w-6 -translate-y-1/2
    items-center justify-center
    rounded-full
    text-[#FF6500]
    transition-colors duration-200
    hover:text-[#D95500]
    disabled:cursor-default
    disabled:text-[#BDBDBD]
    focus-visible:outline-2
    focus-visible:outline-offset-[-2px]
    focus-visible:outline-[#FF6500]
    motion-reduce:transition-none
  `;

  return (
    // 20px space ABOVE the white category bar.
    <div className="w-full min-w-0 pt-[20px]">
      <div
        className="
          relative z-20
          w-full min-w-0
          rounded-[12px]
          bg-white
          p-[9px]
          sm:p-[10px]
        "
      >
        {/* CATEGORY TABS */}
        <div
          ref={tabListRef}
          id={tabListId}
          role="tablist"
          aria-label="Product categories"
          className="
            flex w-full min-w-0
            gap-[6px]
            overflow-x-auto
            overscroll-x-contain
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
                onKeyDown={(event) => handleKeyDown(event, index)}
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
                  motion-reduce:transition-none
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
                    layoutId={indicatorId}
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

        {/* EDGE OVERLAYS */}
        {scrollState.hasOverflow && (
          <>
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-y-[9px] left-0 z-20
                w-6 rounded-l-[12px]
                bg-gradient-to-r from-white via-white/85 to-transparent
                sm:inset-y-[10px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-y-[9px] right-0 z-20
                w-6 rounded-r-[12px]
                bg-gradient-to-l from-white via-white/85 to-transparent
                sm:inset-y-[10px]
              "
            />

            {/* LEFT ARROW */}
            <button
              type="button"
              aria-label="Scroll categories left"
              aria-controls={tabListId}
              aria-disabled={!scrollState.canScrollLeft}
              onClick={(event) => {
                event.stopPropagation();

                if (scrollState.canScrollLeft) {
                  scrollCategories("left");
                }
              }}
              className={`
                ${arrowClassName}
                left-0
                ${
                  !scrollState.canScrollLeft
                    ? "cursor-default text-[#BDBDBD] hover:text-[#BDBDBD]"
                    : ""
                }
              `}
            >
              <ChevronLeft
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </button>

            {/* RIGHT ARROW */}
            <button
              type="button"
              aria-label="Scroll categories right"
              aria-controls={tabListId}
              aria-disabled={!scrollState.canScrollRight}
              onClick={(event) => {
                event.stopPropagation();

                if (scrollState.canScrollRight) {
                  scrollCategories("right");
                }
              }}
              className={`
                ${arrowClassName}
                right-0
                ${
                  !scrollState.canScrollRight
                    ? "cursor-default text-[#BDBDBD] hover:text-[#BDBDBD]"
                    : ""
                }
              `}
            >
              <ChevronRight
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}