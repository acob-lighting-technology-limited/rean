"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/ui/lib/cn";
import { easeSun } from "@/ui/motion/easing";
import { buttonClasses } from "@/ui/primitives/button";
import { nav, whatsappChatHref } from "@/lib/site";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

/**
 * Fixed header, behaving like the ACOB website's:
 * - At the top of a page it is see-through. Over a dark photo banner (any element marked
 *   data-header-tone="dark", see components/page-hero.tsx) its text turns white.
 * - Once the page scrolls it turns solid, with a blur.
 * - Scrolling down past the first screenful slides it away; scrolling up brings it back. It never
 *   hides while the phone menu is open, and keyboard focus inside it brings it back.
 * - Each route change resyncs against the real scroll position, since the header is not remounted.
 * - Only a banner actually on screen under the header counts: Next keeps the previous page mounted
 *   but hidden (display: none) for instant back navigation, and its banner must not turn the links
 *   white over a light page.
 * On a full page load it drops in as the loading curtain clears, links following in turn
 * (.ao-drop, .ao-nav-item in globals.css); below lg, where the links are in the menu, the theme and
 * menu buttons arrive with the logo instead (.ao-nav-actions).
 * On phones the menu is a full-screen sheet, ported from the Vertex Electric site: the two-line
 * toggle turns into an X, the sheet wipes down from under the header, and its numbered links slide
 * up one by one (reversed on close). Escape closes it, focus moves into it and back to the toggle,
 * the page behind stops scrolling, and any route change closes it (the open state is tied to the
 * path it was opened on).
 */
/** Vertex's menu wipe: slow in and out, so the sheet reads as a curtain. */
const WIPE = [0.76, 0, 0.24, 1] as const;
const chatHref = whatsappChatHref("Hello Alexander, I saw your plan for REAN and would like to ask a question.");

export function SiteHeader() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const lastY = useRef(0);

  // Scroll state, read in event and frame callbacks only.
  useEffect(() => {
    let frame = 0;
    const sync = (fromRoute = false) => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setOverDark(
        [...document.querySelectorAll('[data-header-tone="dark"]')].some((el) => {
          const box = el.getBoundingClientRect();
          return el.getClientRects().length > 0 && box.top < 64 && box.bottom > 0;
        }),
      );
      if (fromRoute) setHidden(false);
      else if (Math.abs(y - lastY.current) > 6) setHidden(y > lastY.current && y > 160);
      lastY.current = y;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => sync());
    };
    frame = requestAnimationFrame(() => sync(true));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const solid = scrolled || open;
  const onDark = overDark && !solid;

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      data-tone={onDark ? "on-dark" : undefined}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "ao-drop fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,translate] duration-500 ease-out",
        solid ? "border-line bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] shadow-sm backdrop-blur-xl" : "border-transparent bg-transparent",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-full" aria-label="Alexander Obiechina for REAN President, home">
          <BrandMark />
          <span className="min-w-0 leading-tight">
            <span translate="no" className={cn("font-display block truncate text-base font-bold transition-colors duration-500", onDark && "text-white")}>
              Alexander Obiechina
            </span>
            <span className={cn("block truncate text-[13px] transition-colors duration-500", onDark ? "text-white/75" : "text-muted")}>for REAN President</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              style={{ "--i": i } as React.CSSProperties}
              className={cn(
                "ao-nav-item relative rounded-full px-3 py-2 text-[15px] font-medium transition-colors duration-(--dur)",
                onDark ? "text-white/80 hover:text-white" : "text-muted hover:text-fg",
                isActive(item.href) && (onDark ? "text-white" : "text-fg"),
                isActive(item.href) && "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full",
                isActive(item.href) && (onDark ? "after:bg-glow" : "after:bg-accent"),
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ao-nav-item ao-nav-actions flex items-center gap-2" style={{ "--i": nav.length } as React.CSSProperties}>
          <Link href="/get-involved" className={cn(buttonClasses(), "hidden sm:inline-flex")}>
            Get involved
          </Link>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className={cn("relative inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden", onDark ? "border-white/40 text-white" : "border-line-strong")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <m.span aria-hidden className="absolute h-px w-4 bg-current" initial={false} animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }} transition={{ duration: 0.35, ease: easeSun }} />
            <m.span aria-hidden className="absolute h-px w-4 bg-current" initial={false} animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }} transition={{ duration: 0.35, ease: easeSun }} />
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would make it the containing block for this fixed sheet. */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            key="menu"
            ref={sheetRef}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: WIPE, delay: 0.1 } }}
            transition={{ duration: 0.6, ease: WIPE }}
            className="fixed inset-x-0 top-16 bottom-0 z-[45] flex flex-col justify-between overflow-y-auto overscroll-contain bg-bg px-4 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 lg:hidden"
          >
            <nav aria-label="Mobile">
              <m.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                className="border-t border-line"
              >
                {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-line">
                    <m.div
                      variants={{
                        hidden: { y: "100%", opacity: 0, transition: { duration: 0.25, ease: easeSun } },
                        show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: easeSun } },
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="font-display flex items-baseline justify-between py-5 text-3xl font-semibold tracking-tight aria-[current=page]:text-accent-text"
                      >
                        {item.label}
                        <span aria-hidden className="text-xs font-medium text-muted tabular-nums">
                          0{i + 1}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </m.ul>
            </nav>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.6, ease: easeSun } }}
              exit={{ opacity: 0 }}
              className="mt-10 space-y-3"
            >
              <Link href="/get-involved" className={cn(buttonClasses({ size: "lg" }), "w-full")}>
                Get involved
              </Link>
              {chatHref && (
                <a href={chatHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-[var(--radius-lg)] border border-line bg-surface p-5">
                  <span>
                    <span className="block text-sm text-muted">Questions for Alexander?</span>
                    <span className="font-display text-lg font-semibold">Chat on WhatsApp</span>
                    <span className="sr-only"> (opens WhatsApp)</span>
                  </span>
                  <span aria-hidden className="text-accent-text">
                    ↗
                  </span>
                </a>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
