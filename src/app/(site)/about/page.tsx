import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/ui/primitives/container";
import { Reveal, Stagger, StaggerItem, ImageReveal } from "@/ui/motion/reveal";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { Placeholder } from "@/components/placeholder";
import { SectionHeading } from "@/components/section-heading";
import { TrackRecord } from "@/components/track-record";
import { candidate, facts, photos } from "@/content/candidate";
import { socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Alexander Obiechina",
  description: "Alexander Obiechina is the founder and CEO of ACOB Lighting Technology Limited, an Abuja renewable energy company founded in 2016, and a candidate for President of REAN.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Alexander" title="Built in the sector he wants to serve." lede={`${candidate.fullName} · ${candidate.role}`} photo={photos.bannerAbout} photoPosition="center 35%" />

      <section aria-labelledby="bio">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            {/* Native attire, to show a different side from the suit portraits elsewhere. A clean
                rounded frame, cropped on him, since the event background is too busy to cut out. */}
            <ImageReveal className="overflow-hidden rounded-[var(--radius-lg)] bg-surface-2">
              <Image src={photos.aboutNative.src} alt={photos.aboutNative.alt} width={photos.aboutNative.width} height={photos.aboutNative.height} sizes="(min-width: 1024px) 480px, 92vw" className="aspect-[4/5] w-full object-cover object-top" />
            </ImageReveal>
          </Reveal>

          <div>
            <SectionHeading id="bio" eyebrow="Biography" title="The person behind the plan." />
            <div className="mt-8 max-w-2xl text-lg leading-relaxed">
              {candidate.bio ? (
                candidate.bio.map((para) => (
                  <p key={para.slice(0, 24)} className="mt-4 first:mt-0">
                    {para}
                  </p>
                ))
              ) : (
                <Placeholder block>
                  Approved biography, about 150–300 words: education, career, years in the renewable energy sector, REAN membership history and any roles held, other boards.
                </Placeholder>
              )}
            </div>

            <TrackRecord className="mt-12" />

            <h3 className="mt-14 text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">On the record</h3>
            <Stagger as="ul" className="mt-5 divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <StaggerItem as="li" key={f.label} className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <p className="font-semibold">{f.label}</p>
                  <p className="text-muted">
                    {f.text}
                    {f.source && (
                      <>
                        {" "}
                        <a href={f.source.href} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-accent-text underline underline-offset-4">
                          Source: {f.source.label}
                        </a>
                      </>
                    )}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
            {socials.length > 0 && (
              <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-text underline underline-offset-4">
                    Alexander on {s.label}
                  </a>
                ))}
              </p>
            )}
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
