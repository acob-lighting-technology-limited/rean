# Alexander Obiechina for REAN President: audit and revamp plan

Prepared 1 November 2026. Nothing in the repo has been changed yet; this is the only new file.

---

## 0. The facts that reshape the brief

| Finding | Source | Why it matters |
|---|---|---|
| This is an **association election**, not a public-office race. REAN describes itself as an "independent, non-profit Industry association" and claims about 200 members. | rean.org.ng (About and home pages) | The audience is roughly 200 member companies and their representatives, not the general public. Donate and volunteer flows don't apply. What matters is a credible plan, trust, and a link that looks good when shared on WhatsApp. |
| The presidential election appears to be on **25 November 2026** (24 days away), for the 2026–2028 term. | A rival candidate's LinkedIn post. I did **not** find it on rean.org.ng. | This sets the timeline. The site should be live by about 10 November so it gets two weeks of sharing. |
| At least one other candidate has declared: **Damilola Asaleye**, the current REAN Vice President. The incumbent president is **Ayo Ademilua**. | rean.org.ng/excos, LinkedIn | The tone should be positive and plan-led, never comparative. |
| Many associations restrict candidate campaigning, for example limits on using the association's logo, on endorsements from sitting officers, and on using member lists. | Several association election policies (ASHA, AMCP, NACAC and others) | REAN's own election rules need checking before launch (see question A2). |
| The real manifesto has **6 commitments** and the framework has **7 pillars**, each with specific actions, plus an **8-step 100-day plan with day ranges**, a **12-month roadmap** and **KPIs**. | Desktop/rean PDFs | The current site uses almost none of this. Its 5 "pillars" are vague and don't match the documents. |
| The newsletter series describes actions as if they have **already happened**, for example "REAN has officially deployed a standardized Project Pipeline Database" and a forum that "brings together over 500 industry leaders". | Desktop/rean newsletter PDF | Published before the election, these would read as false claims. I recommend holding them back (see question A4). |
| Verified bio facts: full name **Alexander Chinedu Obiechina**, **Founder & CEO of ACOB Lighting Technology Limited**, ACOB founded **2016**, based in **Gwarinpa, Abuja**. He was a panellist on *"Beyond Pilots: Building Distributed Renewables and Mini-Grids at Commercial Scale"* at the Nigeria Energy Leadership Summit (the stage screen is visible in the photos). | ACOB-Website constants, acoblighting.com, the photos | These are the only biographical facts I'll use until you send an approved bio. |

---

## 1. Audit of the current site

### Verdict on the animations: yes, overdone, but the technique is better than the judgement

**What it gets right** (credit where due):
- The scroll-driven CSS animations are gated behind `@supports (animation-timeline)` and `prefers-reduced-motion`, and they run off the main thread.
- The motion reel has a static fallback for reduced motion and for no-JS.

**What's wrong:**
- **Quantity.** About 20 selector groups reveal on scroll, plus parallax and sticky elements. Two elements pulse forever. Nearly everything moves, so nothing stands out.
- **Scroll-jacking.** The 100-days teaser is 210vh tall, so on desktop you scroll two full screens past a single number. `/story` is a 15-second scroll-scrubbed reel with skew driven by scroll speed, a perspective grid and "chromatic" offsets. That is showreel motion, not campaign motion.
- **Invented numbers.** The reel animates "500+ projects", "36 states" and "1,000+ jobs", marked only with a small "sample" asterisk. On a candidate's site that is a credibility risk.
- **Slower first render.** Hero content starts at `opacity: 0` and fades in over 0.7 s, which delays the largest contentful paint.
- **The wrong brand.** A scrolling band repeats "ACOB LIGHTING TECHNOLOGY LIMITED". A REAN candidacy built around his company's branding invites conflict-of-interest questions.

### web-design-guidelines findings (Vercel rules), abbreviated

```
## frontend/src/app/layout.tsx
layout.tsx:29 - no skip link rendered (the .skip-link CSS exists at campaign.css:5 but nothing uses it)
layout.tsx:12 - no metadataBase / Open Graph / Twitter image; WhatsApp link previews will be blank
layout.tsx:29 - lang="en"; use "en-NG"

## frontend/src/app/campaign.css
campaign.css:10,11,18,23,30,38,40,53-57,62,78,104,106,121,132,136,148,152,162,168,170,172,178,194,206 - body and label text at 7–11px (brand subtitle is 7px); unreadable on phones
campaign.css:22 - h1 letter-spacing -.075em; tight enough to hurt legibility
campaign.css:221-225 - mobile menu: no Escape to close, no focus management, no scroll lock
campaign.css:334 / globals.css:326 - infinite pulse loops

## frontend/src/app/scroll.css
scroll.css:23-24 - 210vh sticky "scrollytelling" band (scroll-jacking)
scroll.css:52-55 - blanket reveal on ~20 selector groups

## frontend/src/app/page.tsx
page.tsx:47 - decorative hero art wrapper has aria-label "Candidate portrait" (the image inside already has alt text)
page.tsx:48 - ticker glyphs "✳" read aloud; need aria-hidden
page.tsx:50 - "↗" glyph icons in links read aloud

## frontend/src/app/pillars/page.tsx, commitment/page.tsx
pillars:129, commitment:78 - icon glyphs (◎ ⌁ ✳ ↗) not aria-hidden

## frontend/src/components/site-header.tsx
site-header.tsx:638 - 7 nav items + theme toggle + CTA at 1050px: crowded and wraps
site-header.tsx:647 - menu doesn't close on Escape or on back/forward navigation

## frontend/src/components/motion-reel.tsx
motion-reel.tsx:187-192 - fabricated KPI values shipped to production
motion-reel.tsx:358 - getBoundingClientRect inside the rAF loop on every scroll frame

## frontend/src/app/prototypes/page.tsx
prototypes/page.tsx - internal design-exploration tool is a public route, and prototypes.css (16KB) loads on every page

## frontend/src/app/page.module.css
✗ create-next-app boilerplate, unused
```

### Structure, performance, SEO and content

- **Not a git repository.** There is no `.git` folder, so this is a downloaded copy with no history and no remote (see question A5).
- **The CSS strategy doesn't scale.** Four global stylesheets (about 70KB unminified) load on every route. There's no Tailwind, and each page is a single 2,000-character line of JSX, so it's very hard to review or edit.
- **The Sanity backend isn't wired up.** The studio throws at build without `SANITY_STUDIO_PROJECT_ID`, the newsletter page is a "pending" placeholder, and `vercel.json` relies on Vercel's multi-service routing. That's a lot of moving parts for zero content.
- **Little SEO groundwork.** There's no sitemap, robots file, per-page descriptions, `Person` structured data or OG images.
- **The copy is generic.** "Member value / Industry voice / Practical progress" could belong to any association. The documents you supplied are specific and far stronger. The site also has no "how to vote", no election date, no contact route and no way to show support.
- **Branding.** The colours are ACOB green (`#008000`), so the campaign looks like an ACOB company page.

---

## 2. Proposed information architecture

The site should be short, scannable and built around the plan. Every page should end with the same two actions: **Share on WhatsApp** and **Pledge your support / Ask Alexander**.

| Route | Purpose | Content source |
|---|---|---|
| `/` | Hero (portrait, name, "Candidate for President, REAN", election date countdown*), a 3-sentence "why I'm running"*, the 7 pillars at a glance, the 100-day timeline preview, credentials strip, closing call to action | Manifesto + framework; *needs his words |
| `/plan` | The 7 pillars. Each has the commitment headline, its objective and 3–4 concrete actions, with a sticky pillar index (anchors, deep-linkable) | Framework (Expanded) + Manifesto |
| `/first-100-days` | An 8-priority **Gantt-style timeline** with real day ranges (Days 1–15 … Day 100); bars draw in on scroll | Framework §4 |
| `/accountability` | The 12-month roadmap (4 quarters) and the KPI table: "how members can hold me to account" | Framework §2–3 |
| `/about` | Approved bio*, ACOB background (2016, Abuja), speaking and panel photos, LinkedIn | Bio needed |
| `/get-involved` | Pledge support (name, company, REAN membership, optional message), ask a question, WhatsApp share, contact details | Needs inbox or WhatsApp number |
| `/updates` | Real campaign updates only (empty state until there are some) | Posts written as he goes |
| `/privacy` | Data notice for the form (NDPA 2023) | Needs controller name and contact |

**Removed:** `/story` (fake KPIs, scroll-jacking), `/prototypes` (internal tool), `/manifesto`, `/pillars` and `/commitment` (merged into `/plan`), and the newsletter placeholder.

**Persistent elements:**
- A disclaimer in the footer: "Campaign site of Alexander Obiechina. Not an official REAN website." Wording to be confirmed.
- "Published by …"*.
- A floating WhatsApp share button on mobile.
- An **Add election day to calendar** (.ics) link once the date is confirmed.

## 3. Visual direction: "Daylight & Grid"

Editorial, confident and calm. The goal is serious-industry credibility, not startup flash.

- **Palette.** Deliberately **neither ACOB green nor REAN's logo colours**, so it doesn't read as either organisation.
  - Ink `#0E1A17` and warm paper `#F5F2EA`.
  - **Solar amber** `#E8A317` accent: used as fills, for large type, and for focus rings on ink. On paper it's never used for body text; accent text uses a darker amber that passes AA.
  - **Grid teal** `#1F6F66` for secondary information and charts.
  - Every text pairing will be checked against WCAG AA, and the ratios documented in the token file, as Vertex does.
- **Type.**
  - **Archivo**, a variable font with a width axis, set semi-condensed for display. It's industrial, readable and good for big numbers.
  - **Inter** for body text.
  - **Body text is at least 16px and labels at least 13px.** No 7–9px text anywhere.
- **Imagery.**
  - The studio portraits are the hero, cut out against paper with a soft amber "sunrise" arc behind him: one restrained graphic motif.
  - The summit photos are used on About as proof of sector standing.
- **Components.** The same pattern library as Vertex: `Container`, `ButtonLink`, `SectionHeading` and `Reveal`/`Stagger`/`MaskText`, adapted.
- **Light-first, with automatic dark mode.** The site follows the system setting. There's no toggle: fewer header controls and one less decision for the reader.

### Motion: fewer moments, each with a job

| Moment | Why it earns its place |
|---|---|
| Hero name rises word by word (once, on load), portrait clip-reveal | First impression; under 1 s; content is visible in the HTML from the start, so it doesn't hurt LCP |
| 100-day Gantt bars draw left to right as they enter view | Makes the sequencing legible: you *see* what happens when |
| Pillar index highlights the section in view on `/plan` | Wayfinding through a long page |
| Roadmap quarters step in, one after another | Conveys progression |
| Subtle reveal on section headings only (not on every card) | Rhythm without noise |
| Real counts only (7 pillars, 8 priorities, 100 days, 12 months) | No invented statistics |

All motion is off under `prefers-reduced-motion` and under **Save-Data** (common on Nigerian mobile plans), using `useMotionAllowed()` copied from Vertex. There's no Lenis smooth scrolling: it costs JavaScript and feels laggy on low-end Android. There are no infinite loops and no scroll-jacking.

## 4. Stack

The stack matches Vertex, so you'll recognise every file:

- **Next.js 16.4, React 19.3, Tailwind CSS v4 and TypeScript.**
- **`motion` 14** via `LazyMotion` + `m` components (domAnimation), which keeps the motion bundle around 15KB instead of around 35KB.
- **Content as typed TS files** in `src/content/` (pillars, priorities, roadmap, KPIs, bio). For 24 days and one editor, a CMS is overhead. **I recommend dropping the Sanity backend for v1.** It isn't connected today, and it can come back after the election if the site lives on.
- **Forms.** A server action with zod validation, a honeypot, and **Resend** email delivery. If no key is set, the form honestly says "not live yet", exactly the Vertex pattern.
- **Previews.** `next/og` generates Open Graph images per page, because **the WhatsApp link preview is the first thing most members will see**.
- **SEO.** `sitemap.ts`, `robots.ts`, `metadataBase` and `Person` JSON-LD.
- **Performance budget for a mid-range Android on 4G:**
  - Under 120KB of first-load JS (gzip).
  - Hero image under 90KB (AVIF/WebP via next/image).
  - 2 self-hosted font families.
  - LCP under 2.5 s.
  - The Ookla median is about 45 Mbps, but real browser tests are nearer 5–8 Mbps with about 200 ms latency, so I design for the latter.
- **Hosting.** Vercel, as usual. A single Next app, so the multi-service `vercel.json` goes.

I'll build it as a fresh app in this folder, replacing `frontend/` and `backend/`, and keep the old code in `_legacy/` until you're happy it can go.

## 5. Repo workflow: recommendation

The folder has **no git history or remote**, so I can't see who owns the original.

- **If you, or the campaign, can get write access to the original repo:** push a `redesign` branch and open a PR. That keeps history and is the least disruptive.
- **If it belongs to the "vibe coder" and they won't hand over:** **create a fresh repo, not a fork.** A fork of a public repo must stay public. It also keeps "forked from …" on the page, defaults PRs back to their repo, and ties you to someone else's account. This is a full redesign with almost no shared code, so a fork gains you nothing.

Either way I'll `git init` locally, so there's history from the first build commit. I won't create, fork or push anything on GitHub, and won't touch Vercel, until you approve the exact action.

---

## 6. Questions (one batch)

### A. Decisions

1. **Election details.**
   - Is it **25 November 2026**?
   - How do members vote: in person at an AGM, online, or by proxy?
   - Who is eligible?
   - Is it tied to the REAN event in Lagos on 24 November?
2. **REAN election rules.** Is there a candidate code of conduct? In particular:
   - Can the site use the REAN name and logo, or must it say "not official"?
   - Can sitting officers or trustees endorse?
   - Can the campaign contact members directly?
3. **The plan's voice and status.** The manifesto PDFs are written as a *Board & Secretariat charter* and are stamped *"Draft for discussion"*.
   - Are they approved as Alexander's platform?
   - May I rewrite them in his first-person voice ("I will…")?
   - Should I use the **7 pillars** (my recommendation, since it's the fuller framework) with the manifesto's 6 commitments as headlines?
4. **The newsletter series.** OK to **hold it back**? It states outcomes as already done. Alternatively I can rewrite it as "what members can expect in year one".
5. **Repo.**
   - Where's the original on GitHub?
   - Who owns it, and do you have write access?
   - Branch + PR, or fresh repo? (Not a fork.)
6. **Sanity.** Drop it for v1? (Recommended.)
7. **Old routes.** Remove `/story` and `/prototypes`? (Recommended.)
8. **Form delivery.** Where should pledges and questions go: an email inbox via Resend (I'll need an API key and a verified sender domain), WhatsApp only, or both?
9. **Visual direction.** Is "Daylight & Grid" (ink, paper, solar amber, no ACOB or REAN colours) OK, or does the campaign already have colours or a logo?

### B. Content to supply

- **Approved bio**, about 150–300 words: education, career, years in the sector, REAN membership history and any roles held, other boards. Also confirm the display name: "Alexander Obiechina" or "Alexander Chinedu Obiechina".
- **"Why I'm running"** in his words (about 150 words), plus 1–2 approved quotes.
- **Slogan.** Is "Powering the industry. Empowering our members." (from the old site) approved?
- **Original, full-resolution portraits.** The ones on the Desktop are WhatsApp-compressed (1122×1402).
- **Event photos.**
  - Permission to use them, and the photographer's credit. They show Nigeria Energy / inD branding.
  - Who is in the group shots, and do those people consent?
  - Is the man in the white agbada and cap (IMG_0789 and IMG_0799) Alexander, or someone else?
- **Contact channels:** campaign email, WhatsApp number, phone. Is LinkedIn `linkedin.com/in/alexander-obiechina-505455a6` correct? Any other socials?
- **Verified figures** you want shown, with sources (for example ACOB's installed MW or mini-grids delivered). Without them, the site shows no statistics about him.
- **Events:** member meetings, town halls or webinars before the vote.
- **Endorsements:** only with each person's written consent, and only if the REAN rules allow them.
- **Domain**, and who owns the **Vercel** account.
- **Legal footer:** the "Published by" name, and the data controller and contact for the privacy notice (NDPA 2023 applies once the form collects names and emails).

## 7. Timeline (24 days to the vote)

| When | What |
|---|---|
| Days 1–3 | Build v1 with placeholders, verify it on desktop and mobile, run the guidelines audit again |
| Days 3–7 | Swap in content as it arrives; you approve the copy |
| By about 10 November | Launch, then share in REAN WhatsApp groups (subject to the rules) |
| To 25 November | Weekly updates on `/updates` |
