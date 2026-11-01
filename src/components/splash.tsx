import { Fragment } from "react";

const NAME = ["Alexander", "Obiechina"];

/**
 * Branded loading screen for a full page load, on a black curtain in both themes: a soft shadow
 * marks its edge over the light page, a thin lit green line over the dark page (--splash-* in tokens.css).
 *  1. the AO mark pops in and its gold arc draws, like a sunrise;
 *  2. the name rises word by word out of its masks, "for REAN President" slides up under it,
 *     and a green bar fills;
 *  3. the whole panel lifts away like a curtain, its bottom edge curving as it goes, while the
 *     mark drifts the other way (a touch of parallax weight), uncovering the hero as it animates in.
 * All timing is in globals.css (.ao-splash*), so it needs no JavaScript and always clears.
 * Hidden from assistive tech: the page underneath is already there for screen readers.
 */
export function Splash() {
  return (
    <div aria-hidden className="ao-splash">
      <div className="ao-splash-stage flex flex-col items-center px-4 text-center">
        <svg viewBox="0 0 40 40" className="ao-splash-mark size-20 sm:size-24">
          <rect x="0.25" y="0.25" width="39.5" height="39.5" rx="19.75" fill="var(--ao-ink)" stroke="var(--splash-line)" strokeWidth="0.5" />
          <path className="ao-splash-arc" pathLength={1} d="M8 22a12 12 0 0 1 24 0" fill="none" stroke="var(--ao-gold-bright)" strokeWidth="2.5" strokeLinecap="round" />
          <text className="ao-splash-ao" x="20" y="29" textAnchor="middle" fontFamily="var(--font-archivo), sans-serif" fontWeight="800" fontSize="12" fill="var(--ao-paper)" letterSpacing="-0.4">
            AO
          </text>
        </svg>
        <p translate="no" className="font-display mt-6 text-[clamp(2rem,7vw,3.5rem)] leading-none font-extrabold tracking-[-0.03em]">
          {NAME.map((word, i) => (
            <Fragment key={word}>
              <span className="inline-block overflow-hidden pb-[0.1em] align-top">
                <span className="ao-splash-word" style={{ "--i": i } as React.CSSProperties}>
                  {word}
                </span>
              </span>
              {i < NAME.length - 1 && " "}
            </Fragment>
          ))}
        </p>
        <p className="ao-splash-sub mt-3 text-[13px] font-semibold tracking-[0.3em] text-(--splash-accent) uppercase">for REAN President</p>
        <div className="mt-7 h-0.5 w-40 overflow-hidden rounded-full bg-(--splash-line)">
          <div className="ao-splash-bar size-full rounded-full bg-(--splash-accent)" />
        </div>
      </div>
    </div>
  );
}
