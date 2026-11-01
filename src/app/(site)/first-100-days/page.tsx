import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/ui/primitives/container";
import { Arrow } from "@/ui/primitives/button";
import { Reveal } from "@/ui/motion/reveal";
import { ClosingCta } from "@/components/closing-cta";
import { HundredDayChart } from "@/components/hundred-day-chart";
import { PageHero } from "@/components/page-hero";
import { pledge100, priorities } from "@/content/plan";
import { photos } from "@/content/candidate";
import { FilledText } from "@/ui/motion/fill-text";

export const metadata: Metadata = {
  title: "The first 100 days",
  description:
    "8 priorities with start and finish dates, from inaugurating the advocacy and state-market taskforces in days 1–15 to a verified progress review on day 100.",
  alternates: { canonical: "/first-100-days" },
};

export default function First100DaysPage() {
  return (
    <>
      <PageHero
        eyebrow="First 100 days"
        title="Momentum from day one."
        lede="8 foundational priorities, each with a start and finish date, ending in a published progress review on day 100."
        photo={photos.banner100}
        photoPosition="center 35%"
      />

      <Container className="py-16 sm:py-20">
        <Reveal className="mb-10 rounded-[var(--radius-lg)] bg-band p-6 text-on-band sm:p-8">
          <p className="text-[13px] font-semibold tracking-[0.14em] text-glow uppercase">The 100-day pledge</p>
          <p className="font-display mt-3 max-w-4xl text-2xl leading-snug font-semibold sm:text-3xl">
            <FilledText text={pledge100} />
          </p>
        </Reveal>

        <h2 className="sr-only">The 8 priorities</h2>
        <HundredDayChart items={priorities} detailed />

        <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/plan" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
            The 7 pillars behind these priorities <Arrow />
          </Link>
          <Link href="/accountability" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
            What happens after day 100 <Arrow />
          </Link>
        </Reveal>
      </Container>

      <ClosingCta />
    </>
  );
}
