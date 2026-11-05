"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// Keep server and initial client styles identical before reading the media query.
export function useCareerReducedMotion() {
  const reduced = useReducedMotion();
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  return hydrated && Boolean(reduced);
}
