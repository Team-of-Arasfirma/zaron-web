
"use client";

import { Search, X } from "lucide-react";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  return (
    <div className="w-full">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>

      <div
        className="
          group relative
          w-full max-w-[720px]
        "
      >
        <Search
          aria-hidden="true"
          size={19}
          strokeWidth={1.8}
          className="
            pointer-events-none
            absolute left-4 top-1/2
            -translate-y-1/2
            text-[#777777]
            transition-colors
            group-focus-within:text-[#FF6500]
          "
        />

        <input
          id="product-search"
          type="search"
          autoComplete="off"
          placeholder="Search Products..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            h-[52px] w-full
            rounded-[7px]
            border border-[#E5E5E5]
            bg-white
            pl-12 pr-12
            text-[14px]
            text-[#282828]
            outline-none
            transition-all duration-200
            placeholder:text-[#A0A0A0]
            focus:border-[#FF6500]
            focus:ring-2
            focus:ring-[#FF6500]/10
            [&::-webkit-search-cancel-button]:hidden
            sm:h-[56px]
          "
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear product search"
            className="
              absolute right-3 top-1/2
              flex h-8 w-8
              -translate-y-1/2
              items-center justify-center
              rounded-full
              text-[#777777]
              transition-colors duration-200
              hover:bg-[#F0F0F0]
              hover:text-[#FF6500]
              focus-visible:outline-2
              focus-visible:outline-[#FF6500]
            "
          >
            <X size={17} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
