import Image from "next/image";
import { cn } from "@/ui/lib/cn";
import { Container } from "@/ui/primitives/container";
import { photos } from "@/content/candidate";
import { SectionHeading } from "./section-heading";

const rows = [
  [photos.stripNativeFull, photos.stripSeatedMic, photos.stripPanel, photos.stripWave, photos.summitAudience, photos.stripColleagues],
  [photos.stripConsult, photos.stripPhotoWall, photos.stripPanelWide, photos.stripGuest, photos.stripBooth, photos.stripGreeting],
];

/**
 * Home-page ribbon of event photos: two rows drifting slowly sideways in opposite directions
 * (.ao-strip and .ao-strip-reverse in globals.css).
 * Each row is rendered twice so the loop is seamless; the second copy is hidden from assistive tech.
 * A row pauses on hover or keyboard focus. Under reduced motion they stop and become rows you scroll.
 */
export function PhotoStrip() {
  const row = (strip: (typeof rows)[number], copy: boolean) =>
    strip.map((p) => (
      <li key={`${p.src}-${copy}`} aria-hidden={copy || undefined} className="shrink-0 pr-4">
        <div className="h-[200px] overflow-hidden rounded-[var(--radius-lg)] bg-surface-2 sm:h-[280px]">
          <Image src={p.src} alt={copy ? "" : p.alt} width={p.width} height={p.height} sizes="(min-width: 640px) 420px, 300px" className="h-full w-auto object-cover" />
        </div>
      </li>
    ));
  return (
    <section aria-labelledby="on-the-ground" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <SectionHeading id="on-the-ground" eyebrow="On the ground" title="In the room where the sector meets." />
      </Container>
      <div className="mt-12 space-y-4">
        {rows.map((strip, i) => (
          <div key={i} className={cn("ao-strip", i === 1 && "ao-strip-reverse")}>
            <ul className="ao-strip-track flex w-max">
              {row(strip, false)}
              {row(strip, true)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
