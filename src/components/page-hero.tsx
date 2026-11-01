import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/ui/lib/cn";
import { Container } from "@/ui/primitives/container";
import { RiseText } from "@/ui/motion/rise-text";
import { Eyebrow } from "./section-heading";

type Photo = { src: string; width: number; height: number; alt: string };

/**
 * Heading block for interior pages, modelled on the ACOB website's page hero (components/ui/hero.tsx):
 * with a photo, it is a full-width image banner, darkened, with the eyebrow and title in white at the
 * bottom left and the photo slowly settling from a zoom (.ao-banner-zoom in globals.css, timed with the
 * loading curtain). The lede and any extras follow under the banner, on the page, so the long intro
 * text stays easy to read. Without a photo (privacy, updates) it is the plain text heading.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  photo,
  photoPosition = "center",
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  photo?: Photo;
  /** object-position for the crop, e.g. "center 30%" to keep a face in frame. */
  photoPosition?: string;
}) {
  const intro = (lede || children) && (
    <div className="ao-lift max-w-2xl">
      {lede && <p className="text-xl leading-relaxed text-muted">{lede}</p>}
      {children}
    </div>
  );

  if (!photo) {
    return (
      <section className="border-b border-line">
        <Container className="pt-12 pb-14 sm:pt-20 sm:pb-20">
          <Eyebrow>{eyebrow}</Eyebrow>
          <RiseText text={title} className="font-display mt-5 max-w-5xl text-[clamp(2.6rem,7vw,5.25rem)] leading-[0.95] font-extrabold tracking-[-0.03em]" />
          {intro && <div className="mt-6">{intro}</div>}
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Runs up behind the see-through header (-mt-16 cancels main's top padding), which turns its
          text white over it via data-header-tone. */}
      <section data-header-tone="dark" className="relative isolate -mt-16 h-[calc(50svh+10rem)] overflow-hidden bg-band lg:h-[calc(60svh+10rem)]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          preload
          sizes="100vw"
          className="ao-banner-zoom -z-10 object-cover"
          style={{ objectPosition: photoPosition }}
        />
        {/* Darkest at the bottom, where the title sits, and darkened again across the top, where the
            see-through header's white links sit: both stay readable on bright stage screens. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.6),transparent_9rem),linear-gradient(to_top,rgb(0_0_0/0.82),rgb(0_0_0/0.45)_55%,rgb(0_0_0/0.3))]" />
        <Container className="flex h-full flex-col justify-end pb-8 sm:pb-12">
          <Eyebrow className={cn("text-glow [&>span]:bg-glow")}>{eyebrow}</Eyebrow>
          <RiseText
            text={title}
            className="font-display mt-4 max-w-5xl text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-white"
          />
        </Container>
      </section>
      {intro && (
        <section className="border-b border-line">
          <Container className="py-10 sm:py-14">{intro}</Container>
        </section>
      )}
    </>
  );
}
