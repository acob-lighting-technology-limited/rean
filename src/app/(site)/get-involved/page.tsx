import type { Metadata } from "next";
import { Container } from "@/ui/primitives/container";
import { Reveal } from "@/ui/motion/reveal";
import { ElectionDate } from "@/components/election-date";
import { PageHero } from "@/components/page-hero";
import { Placeholder } from "@/components/placeholder";
import { PledgeForm } from "@/components/pledge-form";
import { ShareOnWhatsApp, WhatsAppIcon } from "@/components/share";
import { photos } from "@/content/candidate";
import { electionDateLabel, formatPhone, site, socials, whatsappChatHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Pledge your support for Alexander Obiechina’s plan for REAN, ask him a question, or share the plan with a colleague on WhatsApp.",
  alternates: { canonical: "/get-involved" },
};

export default function GetInvolvedPage() {
  const chat = whatsappChatHref("Hello, I have a question about Alexander Obiechina’s plan for REAN.");
  return (
    <>
      <PageHero eyebrow="Get involved" title="Back the plan. Ask the hard questions." lede="3 ways to help, in order of impact." photo={photos.bannerInvolved}>
        <ElectionDate className="mt-4 text-[15px]" />
      </PageHero>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="space-y-10">
          <Reveal>
            <p className="font-display text-5xl font-extrabold text-accent-text">1</p>
            <h2 className="font-display mt-2 text-2xl font-bold">Share the plan</h2>
            <p className="mt-2 text-muted">Send it to colleagues at other member companies. A recommendation from someone they know counts for more than anything on this site.</p>
            <ShareOnWhatsApp className="mt-5" path="/plan" />
          </Reveal>

          <Reveal>
            <p className="font-display text-5xl font-extrabold text-accent-text">2</p>
            <h2 className="font-display mt-2 text-2xl font-bold">Pledge your support, or ask a question</h2>
            <p className="mt-2 text-muted">Use the form. Pledges help the campaign see where support stands; questions go straight to the team.</p>
          </Reveal>

          <Reveal>
            <p className="font-display text-5xl font-extrabold text-accent-text">3</p>
            <h2 className="font-display mt-2 text-2xl font-bold">Talk to the campaign</h2>
            <ul className="mt-3 space-y-2">
              {chat && (
                <li>
                  <a href={chat} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-accent-text underline underline-offset-4">
                    <WhatsAppIcon /> Chat on WhatsApp
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="break-all font-semibold text-accent-text underline underline-offset-4">
                    {site.email}
                  </a>
                </li>
              )}
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-text underline underline-offset-4">
                    Message Alexander on {s.label}
                  </a>
                </li>
              ))}
              {site.phone && (
                <li>
                  <a href={`tel:${site.phone}`} className="font-semibold text-accent-text tabular-nums underline underline-offset-4">
                    {formatPhone(site.phone)}
                  </a>
                </li>
              )}
            </ul>
            {!chat && !site.email && !site.phone && !socials.length && <Placeholder block className="mt-3">Campaign WhatsApp number, email and phone</Placeholder>}
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-bold">How voting works</h2>
            {/* UNVERIFIED: generic guidance; replace with REAN's actual procedure once confirmed. */}
            <p className="mt-3 text-muted">
              REAN elects its President on <span className="font-semibold text-fg">{electionDateLabel}</span>. Voting is for members of the association. Check with the REAN Secretariat that your
              membership is in good standing and how votes will be cast, so your voice counts on the day.
            </p>
          </Reveal>
        </div>

        <div id="pledge" className="scroll-mt-24">
          <PledgeForm />
        </div>
      </Container>
    </>
  );
}
