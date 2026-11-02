import Image from "next/image";
import { Reveal } from "@/ui/motion/reveal";
import { milestones } from "@/content/candidate";

/**
 * About page timeline of ACOB's major milestones under Alexander, oldest first. A rail runs down the
 * left with a gold dot per milestone; each entry has the year, what happened, its ACOB source and,
 * where ACOB published one, a photo (beside the text from md, under it on phones).
 */
export function Milestones() {
  return (
    <ol className="relative mt-12 border-l border-line pl-6 sm:pl-10">
      {milestones.map((m) => (
        <li key={m.title} className="relative pb-12 last:pb-0">
          <span aria-hidden className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-gold ring-4 ring-bg sm:-left-[calc(2.5rem+5px)]" />
          <Reveal className="grid gap-5 md:grid-cols-[1fr_minmax(0,22rem)] md:gap-10">
            <div>
              <p className="font-display text-sm font-bold tracking-[0.14em] text-gold-text tabular-nums">{m.year}</p>
              <h3 className="font-display mt-2 text-2xl leading-tight font-bold tracking-tight">{m.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
              <a href={m.source.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[15px] font-semibold text-accent-text underline underline-offset-4">
                Source: {m.source.label}
              </a>
            </div>
            {m.photo && (
              <div className="overflow-hidden rounded-[var(--radius-lg)] bg-surface-2">
                <Image src={m.photo.src} alt={m.photo.alt} width={m.photo.width} height={m.photo.height} sizes="(min-width: 768px) 352px, 92vw" className="aspect-[3/2] w-full object-cover" />
              </div>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
