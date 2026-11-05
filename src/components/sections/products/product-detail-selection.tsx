"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { ProductColor } from "@/data/products";

type ProductSelectionContextValue = {
  selected?: ProductColor;
  select: (color: ProductColor) => void;
};

const SelectionContext =
  createContext<ProductSelectionContextValue>({
    select: () => {},
  });

export function ProductDetailSelection({
  children,
}: {
  children: ReactNode;
}) {
  const [selected, select] = useState<ProductColor>();

  return (
    <SelectionContext.Provider value={{ selected, select }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useProductColor() {
  return useContext(SelectionContext);
}