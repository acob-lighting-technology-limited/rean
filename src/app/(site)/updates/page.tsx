import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/ui/primitives/container";
import { PageHero } from "@/components/page-hero";
import { updates } from "@/content/updates";

export const metadata: Metadata = {
  title: "Campaign updates",
  description: "News from Alexander Obiechina’s campaign for President of REAN.",
  alternates: { canonical: "/updates" },
};

const dateFormat = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });

export default function UpdatesPage() {
  // Hidden until the first real post: no empty page for visitors (or for old /newsletter links).
  if (updates.length === 0) redirect("/plan");
  return (
    <>
      <PageHero eyebrow="Updates" title="From the campaign." lede="Meetings with members, answers to their questions and anything that changes in the plan." />
      <Container className="py-16 sm:py-20">
        <ol className="divide-y divide-line border-y border-line">
            {updates.map((u) => (
              <li key={u.slug} className="py-8">
                <article id={u.slug} className="grid scroll-mt-24 gap-3 md:grid-cols-[200px_1fr]">
                  <time dateTime={u.date} className="text-muted">
                    {dateFormat.format(new Date(`${u.date}T12:00:00+01:00`))}
                  </time>
                  <div className="max-w-2xl">
                    <h2 className="font-display text-2xl font-bold">{u.title}</h2>
                    {u.body.map((p) => (
                      <p key={p.slice(0, 24)} className="mt-3 text-lg leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              </li>
            ))}
        </ol>
      </Container>
    </>
  );
}
