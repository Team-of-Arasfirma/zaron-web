"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const demoArticleRoots = new Set(["roofing-sheets", "standing-seam", "industrial-roofing", "roofing-tips", "metal-roofing"]);
const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const staticRoots = new Set([
  "",
  "about",
  "products",
  "projects",
  "blog",
  "careers",
  "contact",
]);

export function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = Boolean(useReducedMotion());

  const [menu, setMenu] = useState({
    pathname,
    open: false,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  const isMenuOpen = menu.pathname === pathname && menu.open;

  const isProjectsPage =
    pathname === "/projects" || pathname.startsWith("/projects/");

  const isContactPage =
    pathname === "/contact" || pathname.startsWith("/contact/");

  const isBlogArticle =
    (pathname.split("/").filter(Boolean).length === 2 && demoArticleRoots.has(pathname.split("/")[1])) || (
    pathname.startsWith("/") &&
    !staticRoots.has(pathname.slice(1)) &&
    pathname.split("/").filter(Boolean).length === 1);

  // Contact and blog articles have light backgrounds.
  // Projects uses light glass at the top only.
  const isLightNavbar =
    pathname === "/products" ||
    pathname.startsWith("/products/") ||
    isContactPage ||
    isBlogArticle ||
    (isProjectsPage && !isScrolled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) setMenu({ pathname, open: false });
    };
    media.addEventListener("change", closeOnDesktop);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const links = headerRef.current?.querySelectorAll<HTMLElement>(
          "#mobile-navigation a[href]",
        );
        const first = toggleRef.current;
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === "Escape") {
        toggleRef.current?.focus();
        setMenu({
          pathname,
          open: false,
        });
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, pathname]);

  const isActive = (href: string) => {
    if (href === "/blog" && isBlogArticle) {
      return true;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 lg:px-[70px] xl:px-[90px]"
    >
      <motion.nav
        aria-label="Main navigation"
        initial={false}
        animate={{
          backgroundColor: isLightNavbar
            ? "rgba(255,255,255,0.82)"
            : isScrolled
              ? "rgba(30,30,30,0.78)"
              : "rgba(255,255,255,0.10)",

          borderColor: isLightNavbar
            ? "rgba(255,255,255,0.70)"
            : "rgba(255,255,255,0.30)",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: "easeOut",
        }}
        className="
          relative mx-auto
          flex min-h-[85px]
          w-full items-center
          justify-between
          rounded-[48px]
          border border-white/30
          px-5 py-2
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          sm:px-7 lg:px-8
        "
      >
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Zaron Industries Home"
          className="relative z-20 flex shrink-0 items-center"
        >
          <div className="relative h-[70px] w-[94px] sm:h-[80px] sm:w-[105px]">
            <Image
              src={isLightNavbar ? "/logo/zaron-b.png" : "/logo/zaron-w.png"}
              alt="Zaron Industries"
              fill
              loading="eager"
              sizes="(max-width: 639px) 94px, 105px"
              className="object-contain"
            />
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-2 lg:flex xl:gap-4">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`
                  relative rounded-md
                  px-4 py-3
                  text-[13px] font-medium
                  transition-all duration-300
                  xl:text-[14px]
                  ${
                    active
                      ? "bg-[#FF6500] text-white"
                      : isLightNavbar
                        ? "text-[#282828] hover:bg-[#FF6500]/10 hover:text-[#FF6500]"
                        : "text-white hover:bg-white/15"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setMenu({
              pathname,
              open: !isMenuOpen,
            })
          }
          className={`
            relative z-20
            flex h-11 w-11
            items-center justify-center
            rounded-full border
            transition-colors duration-300
            hover:bg-[#FF6500]
            hover:text-white
            lg:hidden
            ${
              isLightNavbar
                ? "border-[#282828]/20 bg-[#282828]/5 text-[#282828]"
                : "border-white/30 bg-white/10 text-white"
            }
          `}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            key="mobile-navigation"
            initial={{
              opacity: 0,
              y: -15,
              height: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -15,
              height: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: "easeInOut",
            }}
            className={`
              mt-3 max-h-[calc(100dvh-130px)] overflow-y-auto overscroll-contain
              rounded-[24px]
              border
              shadow-[0_16px_40px_rgba(0,0,0,0.2)]
              backdrop-blur-xl
              lg:hidden
              ${
                isLightNavbar
                  ? "border-[#282828]/10 bg-white/95"
                  : "border-white/20 bg-[#202020]/95"
              }
            `}
          >
            <div className="flex flex-col gap-1 p-4">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setMenu({
                        pathname,
                        open: false,
                      })
                    }
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex items-center justify-between
                      rounded-xl px-5 py-4
                      text-[15px] font-medium
                      transition-colors duration-300
                      ${
                        active
                          ? "bg-[#FF6500] text-white"
                          : isLightNavbar
                            ? "text-[#282828] hover:bg-[#FF6500]/10 hover:text-[#FF6500]"
                            : "text-white hover:bg-white/10"
                      }
                    `}
                  >
                    {item.label}
                    <ArrowUpRight size={17} />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}