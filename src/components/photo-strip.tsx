import Image from "next/image";
import { Container } from "@/ui/primitives/container";
import { photos } from "@/content/candidate";
import { SectionHeading } from "./section-heading";

const strip = [photos.stripNativeFull, photos.stripSeatedMic, photos.stripGroup, photos.stripWave, photos.summitAudience, photos.stripColleagues];

/**
 * Home-page ribbon of event photos that drifts slowly sideways (.ao-strip in globals.css).
 * The row is rendered twice so the loop is seamless; the second copy is hidden from assistive tech.
 * Pauses on hover or keyboard focus. Under reduced motion it stops and becomes a row you scroll.
 */
export function PhotoStrip() {
  const row = (copy: boolean) =>
    strip.map((p) => (
      <li key={`${p.src}-${copy}`} aria-hidden={copy || undefined} className="shrink-0 pr-4">
        <div className="h-[240px] overflow-hidden rounded-[var(--radius-lg)] bg-surface-2 sm:h-[320px]">
          <Image src={p.src} alt={copy ? "" : p.alt} width={p.width} height={p.height} sizes="(min-width: 640px) 480px, 360px" className="h-full w-auto object-cover" />
        </div>
      </li>
    ));
  return (
    <section aria-labelledby="on-the-ground" className="overflow-hidden py-20 sm:py-28">
      <Container>
        <SectionHeading id="on-the-ground" eyebrow="On the ground" title="In the room where the sector meets." />
      </Container>
      <div className="ao-strip mt-12">
        <ul className="ao-strip-track flex w-max">
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  );
}
