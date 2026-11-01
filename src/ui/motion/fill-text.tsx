"use client";

import { Fragment, useEffect, useRef, useState } from "react";

/**
 * A solid brand-green block fills in behind a word or short phrase from the left the first time
 * it scrolls into view, with the words in the on-green colour on top. Ported from the ACOB
 * website's AnimatedFillText (components/ui/animated-fill-text.tsx), used there on "Our Vision for
 * Energy": same IntersectionObserver trigger (10% visible, once), same 1.2s ease-out fill, same
 * optional sequential delay. Changed from ACOB: the words keep the paragraph's colour until the
 * block reaches them (ACOB set them white throughout, invisible on a light page before the fill);
 * the keyframes live in globals.css (.ao-fill); and padding is trimmed for running text.
 */
export function FillText({ text, duration = 1.2, delay = 0 }: { text: string; duration?: number; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Above the fold on a full page load the loading curtain is still up: wait for it to clear
          // (--splash-delay, dropped to 0s once it has gone; see lib/splash.ts).
          const splash = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--splash-delay")) || 0;
          const wait = Math.max(0, splash * 1000 + 300 - performance.now());
          timer = setTimeout(() => setIsVisible(true), wait + delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    // The green block and the on-green copy of the words are one CSS pseudo-element (.ao-fill::after,
    // content from data-text), so copy-paste and page text get the phrase once, with no stray break.
    <span ref={ref} data-on={isVisible || undefined} data-text={text} className="ao-fill" style={{ "--fill-duration": `${duration}s` } as React.CSSProperties}>
      {text}
    </span>
  );
}

/**
 * Renders a content string, filling any phrase wrapped in [[double brackets]]. Fills in the same
 * string play one after another (ACOB's `sequential` option), 350ms apart.
 */
export function FilledText({ text }: { text: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/);
  let n = 0;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <FillText key={i} text={part} delay={n++ * 350} />
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
