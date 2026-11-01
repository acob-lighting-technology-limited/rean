"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/ui/lib/cn";
import { buttonClasses } from "@/ui/primitives/button";
import { nav } from "@/lib/site";
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
 * On a full page load it drops in as the loading curtain clears, links following in turn
 * (.ao-drop, .ao-nav-item in globals.css). On phones the menu is a full-screen sheet: Escape closes
 * it, focus moves into it and back to the toggle, the page behind stops scrolling, and any route
 * change closes it (the open state is tied to the path it was opened on).
 */
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
      setOverDark(Boolean(document.querySelector('[data-header-tone="dark"]')));
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

        <div className="ao-nav-item flex items-center gap-2" style={{ "--i": nav.length } as React.CSSProperties}>
          <Link href="/get-involved" className={cn(buttonClasses(), "hidden sm:inline-flex")}>
            Get involved
          </Link>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className={cn("inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden", onDark ? "border-white/40 text-white" : "border-line-strong")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className={cn("absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-(--dur)", open && "translate-y-[5px] rotate-45")} />
              <span className={cn("absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-(--dur)", open && "-translate-y-[5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would make it the containing block for this fixed sheet. */}
      <div
        id="mobile-menu"
        ref={sheetRef}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-bg px-4 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="divide-y divide-line border-y border-line">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="font-display flex items-center justify-between py-4 text-2xl font-semibold tracking-tight aria-[current=page]:text-accent-text"
                >
                  {item.label}
                  <span aria-hidden className="text-muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/get-involved" className={cn(buttonClasses({ size: "lg" }), "mt-8 w-full")}>
          Get involved
        </Link>
      </div>
    </>
  );
}
