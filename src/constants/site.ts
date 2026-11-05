import type { NavigationItem } from "@/types/navigation";

export const siteConfig = {
  name: "ZARON",
  // Temporary metadata: replace when approved brand copy is available.
  description: "Temporary description: Zaron website content is awaiting approval.",
} as const;

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];