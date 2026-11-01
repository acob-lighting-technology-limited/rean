import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/ui/primitives/container";
import { Arrow } from "@/ui/primitives/button";
import { Reveal } from "@/ui/motion/reveal";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { PillarIndex } from "@/components/pillar-index";
import { FilledText } from "@/ui/motion/fill-text";
import { photos } from "@/content/candidate";
import { pillars, preamble } from "@/content/plan";

export const metadata: Metadata = {
  title: "The plan: 7 pillars for REAN",
  description:
    "Policy advocacy, the decentralised electricity market, strategic partnership, investment and financial sustainability, inclusive membership, capacity development and data- and technology-driven leadership: the 7 pillars of Alexander Obiechina’s plan for REAN, with concrete actions for each.",
  alternates: { canonical: "/plan" },
};

export default function PlanPage() {
  return (
    <>
      <PageHero eyebrow="The plan" title="7 pillars. Concrete actions." lede={<FilledText text={preamble.thesis} />} photo={photos.bannerPlan} photoPosition="center 30%" />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <PillarIndex pillars={pillars.map(({ slug, number, title }) => ({ slug, number, title }))} />
        </aside>

        {/* Phones: a compact jump list instead of the sticky index */}
        <nav aria-label="Jump to a pillar" className="lg:hidden">
          <ol className="flex flex-wrap gap-2">
            {pillars.map((p) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-[15px] transition-colors duration-(--dur) hover:border-fg/50 hover:bg-surface">
                  <span className="text-accent-text tabular-nums">{p.number}</span>
                  {p.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-6">
          {pillars.map((p) => (
            <Reveal as="section" key={p.slug} amount={0.15} className="scroll-mt-24 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-10">
              <article id={p.slug} aria-labelledby={`${p.slug}-title`} className="scroll-mt-24">
                <div className="flex items-start gap-5">
                  <span aria-hidden className="font-display text-5xl leading-none font-extrabold text-accent-text tabular-nums sm:text-6xl">
                    {String(p.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold tracking-[0.14em] text-muted uppercase">Pillar {p.number}</p>
                    <h2 id={`${p.slug}-title`} className="font-display mt-1 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                      {p.title}
                    </h2>
                  </div>
                </div>

                <blockquote className="mt-8 border-l-4 border-accent pl-5 text-xl leading-relaxed font-medium sm:text-2xl">
                  <p>{p.commitment}</p>
                </blockquote>

                <p className="mt-6 text-lg text-muted">
                  <span className="font-semibold text-fg">Objective: </span>
                  {p.objective}
                </p>

                <h3 className="mt-8 text-[13px] font-semibold tracking-[0.14em] text-accent-text uppercase">Actions</h3>
                <ul className="mt-4 grid gap-3">
                  {p.actions.map((a) => (
                    <li key={a} className="flex gap-3 text-[17px] leading-relaxed">
                      <svg aria-hidden viewBox="0 0 20 20" className="mt-1.5 size-4 shrink-0 text-accent-text">
                        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal className="flex flex-wrap gap-x-8 gap-y-3 pt-6">
            <Link href="/first-100-days" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
              Where it starts: the first 100 days <Arrow />
            </Link>
            <Link href="/accountability" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
              How progress is measured <Arrow />
            </Link>
          </Reveal>
        </div>
      </Container>

      <ClosingCta />
    </>
  );
}
