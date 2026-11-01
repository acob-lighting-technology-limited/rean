"use client";

import { useEffect, useRef, useState } from "react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from 0 to `to` the first time it scrolls into view.
 * The server HTML carries the final number (no-JS, crawlers and screen readers get the real value);
 * the count only runs when the number is below the fold at load, so nobody sees it jump back to 0.
 * Plain rAF + IntersectionObserver rather than the motion library, to keep this off the bundle.
 */
export function CountUp({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: leave the real number
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * easeOut(t)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    // Reset only once we know the number is off-screen, then count when it arrives.
    raf = requestAnimationFrame(() => setValue(0));
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden>
        {new Intl.NumberFormat("en-NG").format(value)}
        {suffix}
      </span>
      <span className="sr-only">
        {new Intl.NumberFormat("en-NG").format(to)}
        {suffix}
      </span>
    </span>
  );
}
