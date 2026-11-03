import Image from "next/image";
import Link from "next/link";
import { Container } from "@/ui/primitives/container";
import { Arrow, ButtonLink } from "@/ui/primitives/button";
import { RiseText } from "@/ui/motion/rise-text";
import { FilledText } from "@/ui/motion/fill-text";
import { Reveal, Stagger, StaggerItem, ImageReveal } from "@/ui/motion/reveal";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { ElectionDate } from "@/components/election-date";
import { HeroPortrait } from "@/components/hero-portrait";
import { PhotoStrip } from "@/components/photo-strip";
import { HundredDayChart } from "@/components/hundred-day-chart";
import { Placeholder } from "@/components/placeholder";
import { ClosingCta } from "@/components/closing-cta";
import { TrackRecord } from "@/components/track-record";
import { candidate, facts, memberCommitments, photos } from "@/content/candidate";
import { pillars, preamble, priorities, roadmap } from "@/content/plan";
import { election, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      {/* Phones: portrait on top, full width. From lg: the text sits left over a near full-screen hero
          and the portrait is a large figure in the bottom-right corner, the jacket meeting the band below.
          The name and spacing scale with screen height too, so the buttons stay in view on short laptop
          screens (for example 1920x1080 at 125% Windows scaling, about 1536x730 in the browser). The
          square portrait is capped at the hero's height, so it is as big as fits with the head clear of the
          header. */}
      <section className="relative flex flex-col overflow-hidden lg:flex-row lg:items-center lg:min-h-[calc(100svh-4rem)]">
        <div className="relative mx-auto w-full max-w-[520px] pt-2 lg:pointer-events-none lg:absolute lg:right-0 lg:bottom-0 lg:mx-0 lg:w-[min(52%,calc(100svh-4rem))] lg:max-w-[880px] lg:p-0">
          <HeroPortrait />
        </div>
        <Container className="relative z-10 pt-6 pb-16 sm:pt-10 lg:py-[clamp(2.5rem,8svh,6rem)]">
          <div className="lg:max-w-[48%]">
            <Eyebrow className="ao-lift" style={{ "--d": "-150ms" } as React.CSSProperties}>
              Candidate for {election.office} · {election.short} {election.term}
            </Eyebrow>
            <RiseText
              text={candidate.name}
              translate="no"
              className="font-display mt-4 text-[clamp(3.1rem,10vw,6.75rem)] sm:mt-6 lg:text-[clamp(3.5rem,min(6.2vw,11.5svh),6.75rem)] [@media(min-width:1024px)_and_(max-height:820px)]:mt-4 leading-[0.92] font-extrabold tracking-[-0.035em]"
            />
            <p className="ao-lift font-display mt-4 text-xl font-semibold text-accent-text sm:text-2xl">{site.slogan}</p>
            <p className="ao-lift mt-4 max-w-xl text-lg leading-relaxed text-muted sm:text-xl [@media(min-width:1024px)_and_(max-height:820px)]:text-lg" style={{ "--d": "150ms" } as React.CSSProperties}>
              Let’s build an association that delivers real value to its members, amplifies their collective voice, and brings capital and new markets to Nigeria’s renewable energy industry.
            </p>
            <ElectionDate countdown={false} className="ao-lift mt-6 text-[15px]" style={{ "--d": "260ms" } as React.CSSProperties} />
            <div className="ao-lift mt-8 flex flex-wrap gap-3 [@media(min-width:1024px)_and_(max-height:820px)]:mt-6" style={{ "--d": "370ms" } as React.CSSProperties}>
              <ButtonLink href="/plan" size="lg">
                Read the plan <Arrow />
              </ButtonLink>
              <ButtonLink href="/get-involved" variant="outline" size="lg">
                Pledge your support
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Why now — the manifesto preamble */}
      <section aria-labelledby="why-now" className="bg-band text-on-band">
        <Container className="py-20 sm:py-28">
          <Reveal className="max-w-4xl">
            <p className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.14em] text-glow uppercase">
              <span aria-hidden className="h-0.5 w-6 rounded-full bg-glow" />
              Why now
            </p>
            <h2 id="why-now" className="font-display mt-4 text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
              {preamble.lead}
            </h2>
          </Reveal>
          {/* Dividers are borders on the cards, not a background behind them, so nothing shows
              before the cards themselves fade in. */}
          <Stagger as="ol" className="mt-14 grid overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-3">
            {preamble.drivers.map((d, i) => (
              <StaggerItem
                as="li"
                key={d.title}
                className="border-t border-band-line bg-band-2 p-6 first:border-t-0 sm:border-t-0 sm:border-l sm:p-8 sm:first:border-l-0"
              >
                <span className="font-display text-glow tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{d.title}</h3>
                <p className="mt-2 text-on-band-muted">{d.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 grid gap-6 md:grid-cols-2">
            <p className="text-lg text-on-band-muted">{preamble.conclusion}</p>
            <p className="text-lg">
              <FilledText text={preamble.thesis} />
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The 7 pillars */}
      <section aria-labelledby="pillars">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="pillars" eyebrow="The plan" title="7 pillars, each with concrete actions." />
            <Link href="/plan" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
              Read the full plan <Arrow />
            </Link>
          </div>
          <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <StaggerItem as="li" key={p.slug} className="h-full">
                <Link
                  href={`/plan#${p.slug}`}
                  className="ao-card group/link flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6"
                >
                  <span className="font-display text-4xl font-extrabold text-accent-text tabular-nums">{String(p.number).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 flex-1 text-muted">{p.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-accent-text">
                    The actions <Arrow />
                  </span>
                </Link>
              </StaggerItem>
            ))}
            <StaggerItem as="li" className="h-full">
              <div className="ao-card flex h-full flex-col justify-between rounded-[var(--radius-lg)] bg-surface-2 p-6">
                <p className="font-display text-2xl leading-tight font-bold">Every pillar has a measure, and every measure has a review date.</p>
                <Link href="/accountability" className="group/link mt-6 inline-flex items-center gap-2 font-semibold text-accent-text">
                  How progress is measured <Arrow />
                </Link>
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      {/* Why I'm running */}
      <section aria-labelledby="why-running" className="bg-surface">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative order-last mx-auto w-full max-w-sm lg:order-first">
            <ImageReveal className="aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-surface-2">
              <Image src={photos.seated.src} alt={photos.seated.alt} width={photos.seated.width} height={photos.seated.height} sizes="(min-width: 1024px) 384px, 90vw" className="size-full object-cover" />
            </ImageReveal>
          </Reveal>
          <div>
            <SectionHeading id="why-running" eyebrow="In his words" title="Why I’m running." />
            <div className="mt-8 max-w-2xl">
              {candidate.whyRunning ? (
                candidate.whyRunning.map((para, i) => (
                  <p key={para.slice(0, 24)} className={i === 0 ? "text-xl leading-relaxed sm:text-2xl" : "mt-5 text-lg leading-relaxed text-muted"}>
                    <FilledText text={para} />
                  </p>
                ))
              ) : (
                <Placeholder block>A 120–200 word statement from Alexander on why he is standing and what he wants REAN to be at the end of his term, in his own words.</Placeholder>
              )}
            </div>
          </div>
        </Container>
      </section>

      <PhotoStrip />

      {/* Commitment to members (carried over from the previous site) */}
      <section aria-labelledby="commitments">
        <Container className="py-20 sm:py-28">
          <SectionHeading id="commitments" eyebrow="My commitment to members" title="REAN works best when we all shape it." />
          <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {memberCommitments.map((c, i) => (
              <StaggerItem as="li" key={c.title} className="ao-card rounded-[var(--radius-lg)] border border-line bg-surface p-6">
                <span className="font-display text-sm font-bold text-accent-text tabular-nums">
                  0{i + 1} / 0{memberCommitments.length}
                </span>
                <h3 className="font-display mt-3 text-2xl font-bold">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* First 100 days */}
      <section aria-labelledby="hundred">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="hundred"
              eyebrow="First 100 days"
              title="8 priorities, each with a start and finish date."
              lede="Day 100 ends in a published, verified progress review to the Governing Board and General Assembly."
            />
            <Link href="/first-100-days" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
              See every priority in detail <Arrow />
            </Link>
          </div>
          <div className="mt-12">
            <HundredDayChart items={priorities} />
          </div>
        </Container>
      </section>

      {/* Accountability */}
      <section aria-labelledby="accountability" className="border-y border-line bg-surface">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            id="accountability"
            eyebrow="Accountability"
            title="A 12-month roadmap with published targets."
            lede="Baselines are set during the membership audit, then progress is tracked against them at a fixed cadence."
          />
          <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((phase, i) => (
              <StaggerItem as="li" key={phase.name} className="ao-card relative rounded-[var(--radius-lg)] border border-line p-6">
                <span aria-hidden className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-accent" style={{ opacity: 0.4 + i * 0.2 }} />
                <p className="text-[15px] text-muted tabular-nums">{phase.months}</p>
                <h3 className="font-display mt-1 text-2xl font-bold">{phase.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{phase.outcome}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold tabular-nums">≥85%</span>
              <span className="text-muted">membership retention target</span>
            </p>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-extrabold tabular-nums">≥90%</span>
              <span className="text-muted">stakeholder calendar compliance target</span>
            </p>
            <Link href="/accountability" className="group/link inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
              All indicators <Arrow />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Credentials */}
      <section aria-labelledby="about-teaser">
        <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <Reveal>
            <ImageReveal className="overflow-hidden rounded-[var(--radius-lg)] bg-surface-2">
              <Image
                src={photos.awardLondon.src}
                alt={photos.awardLondon.alt}
                width={photos.awardLondon.width}
                height={photos.awardLondon.height}
                sizes="(min-width: 1024px) 600px, 92vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </ImageReveal>
          </Reveal>
          <div>
            <SectionHeading id="about-teaser" eyebrow="About Alexander" title="From inside the sector." />
            <Stagger as="ul" className="mt-8 space-y-5">
              {facts.slice(0, 3).map((f) => (
                <StaggerItem as="li" key={f.label} className="border-l-2 border-accent pl-4">
                  <p className="text-[13px] font-semibold tracking-[0.12em] text-muted uppercase">{f.label}</p>
                  <p className="mt-1 text-lg">{f.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Link href="/about" className="group/link mt-8 inline-flex items-center gap-2 font-semibold text-accent-text underline-offset-4 hover:underline">
              More about Alexander <Arrow />
            </Link>
          </div>
          <TrackRecord className="lg:col-span-2" />
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}
