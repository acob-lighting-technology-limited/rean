import type { Metadata } from "next";
import { Container } from "@/ui/primitives/container";
import { Reveal, Stagger, StaggerItem } from "@/ui/motion/reveal";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { photos } from "@/content/candidate";
import { kpis, roadmap } from "@/content/plan";

export const metadata: Metadata = {
  title: "Accountability: roadmap and targets",
  description:
    "A 12-month roadmap in four phases — Foundation, Rollout, Scale, Review — and the indicators members can use to measure progress, each with a review cadence.",
  alternates: { canonical: "/accountability" },
};

export default function AccountabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Accountability"
        title="Measured, published, reviewed."
        lede="A plan is only as good as members' ability to check it. Baselines are set during the membership audit; progress is then tracked against these indicators at a fixed cadence."
        photo={photos.bannerAccountability}
      />

      <section aria-labelledby="roadmap">
        <Container className="py-16 sm:py-20">
          <SectionHeading id="roadmap" eyebrow="12-month roadmap" title="4 phases, 12 months." />
          <Stagger as="ol" className="relative mt-12 grid gap-4 lg:grid-cols-4">
            {roadmap.map((phase, i) => (
              <StaggerItem as="li" key={phase.name} className="ao-card flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-9 place-items-center rounded-full bg-action text-[15px] font-bold text-on-action tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] text-muted tabular-nums">{phase.months}</p>
                    <h3 className="font-display text-2xl leading-tight font-bold">{phase.name}</h3>
                  </div>
                </div>
                <ul className="mt-5 flex-1 space-y-2 text-[15px] leading-relaxed">
                  {phase.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-4 text-[15px] text-muted">
                  <span className="font-semibold text-fg">Outcome: </span>
                  {phase.outcome}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section aria-labelledby="kpis" className="border-t border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            id="kpis"
            eyebrow="Key performance indicators"
            title="What gets measured, and how often."
            lede="One set of indicators for each pillar. Targets shown are the ones set in the framework; the rest are counted from the baseline."
          />
          {/* Phones: one card per area instead of a sideways-scrolling table */}
          <Stagger as="ul" className="mt-10 space-y-4 md:hidden">
            {kpis.map((k) => (
              <StaggerItem as="li" key={k.area} className="ao-card rounded-[var(--radius-lg)] border border-line p-5">
                <h3 className="text-lg font-semibold">{k.area}</h3>
                <p className="text-[15px] text-muted">Reviewed: {k.cadence}</p>
                <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
                  {k.indicators.map((ind) => (
                    <li key={ind} className="flex gap-2">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {ind}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12 hidden overflow-x-auto rounded-[var(--radius-lg)] border border-line md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Key performance indicators by strategic area, with evaluation cadence</caption>
              <thead className="bg-surface-2 text-[13px] tracking-[0.12em] text-muted uppercase">
                <tr>
                  <th scope="col" className="w-1/4 px-5 py-4 font-semibold">
                    Strategic area
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Indicators
                  </th>
                  <th scope="col" className="w-44 px-5 py-4 font-semibold">
                    Reviewed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {kpis.map((k) => (
                  <tr key={k.area} className="align-top">
                    <th scope="row" className="px-5 py-5 font-semibold">
                      {k.area}
                    </th>
                    <td className="px-5 py-5">
                      <ul className="space-y-1.5 text-[15px] leading-relaxed">
                        {k.indicators.map((ind) => (
                          <li key={ind}>{ind}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-5 text-[15px] text-muted">{k.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
