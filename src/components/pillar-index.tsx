"use client";

import { useEffect, useState } from "react";
import { cn } from "@/ui/lib/cn";
import type { Pillar } from "@/content/plan";

/**
 * Sticky table of contents for /plan. Highlights the pillar currently in view (an observer, not
 * scroll maths), and each entry is a real anchor link so pillars stay deep-linkable and shareable.
 */
export function PillarIndex({ pillars }: { pillars: Pick<Pillar, "slug" | "number" | "title">[] }) {
  const [active, setActive] = useState(pillars[0]?.slug);

  useEffect(() => {
    const els = pillars.map((p) => document.getElementById(p.slug)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pillars]);

  return (
    <nav aria-label="Pillars" className="sticky top-24">
      <p className="text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">7 pillars</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {pillars.map((p) => (
          <li key={p.slug}>
            <a
              href={`#${p.slug}`}
              aria-current={active === p.slug ? "location" : undefined}
              className={cn(
                "-ml-px flex gap-3 border-l-2 border-transparent py-2 pl-4 text-[15px] leading-snug text-muted transition-colors duration-(--dur) hover:text-fg",
                active === p.slug && "border-accent font-semibold text-fg",
              )}
            >
              <span className="tabular-nums">{String(p.number).padStart(2, "0")}</span>
              {p.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
