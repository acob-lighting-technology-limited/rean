import { Fragment } from "react";

/**
 * Kinetic headline for page heroes: each word rises out of its own clipping mask, staggered.
 * Pure CSS (see .ao-rise in globals.css), so it plays at first paint without waiting for
 * hydration, and is skipped under prefers-reduced-motion.
 * Screen readers get the plain sentence via aria-label; the split words are aria-hidden.
 */
export function RiseText({
  text,
  className,
  as: Comp = "h1",
  delayMs = 0,
  translate,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  delayMs?: number;
  /** "no" for proper names that machine translation should leave alone. */
  translate?: "no";
}) {
  const words = text.split(" ");
  return (
    <Comp className={className} aria-label={text} translate={translate}>
      {words.map((word, i) => (
        // The space sits outside the inline-block: a trailing space inside one is dropped by the browser.
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-top">
            <span className="ao-rise" style={{ "--i": i, "--d": `${delayMs}ms` } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Comp>
  );
}
