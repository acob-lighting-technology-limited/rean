# Campaign site v1: hand-over

Built 1 November 2026 against [REVAMP-PLAN.md](REVAMP-PLAN.md).

- **Status:** runs locally and was verified at desktop (1440px) and mobile (375px) widths, in light and dark mode.
- **Not done:** nothing is committed and nothing has been pushed or deployed.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

To configure contact channels and form delivery, copy `.env.example` to `.env.local`. Any variable left blank stays hidden on the site; it is never filled with a fake value.

## What changed, and why

| Before | Now | Why |
|---|---|---|
| Vague "5 pillars" written for the site | **7 pillars**, the **8-step 100-day plan with day ranges**, the **12-month roadmap** and **KPIs**, all taken from the supplied PDFs (`src/content/plan.ts`) | The documents are specific and credible; the old copy could have belonged to any association |
| The `/story` reel animating invented figures ("500+ projects", "36 states", "1,000+ jobs") | Removed. Only numbers that appear in the plan itself are shown (7, 8, 100, 12, ≥85%, ≥90%) | Invented statistics are a credibility risk for a candidate |
| Green theme with an ACOB banner scrolling in the reel | The campaign's own green (`#008000`, glowing `#39d057` on dark grounds) on zinc neutrals, every pairing contrast-checked (`src/ui/tokens.css`). The banner is gone. A light/dark toggle sits in the header | The campaign asked to keep its green theme (1 Nov 2026), replacing an interim amber palette |
| About 20 scroll-reveal groups, infinite pulses, 210vh scroll-jacking | A handful of purposeful moments (below), no loops, no scroll-jacking | Motion should guide the reader, not perform |
| 7–11px labels | Text is at least 13px, body at least 16px | Readable on phones |
| No skip link, glyph icons read aloud, a mobile menu with no Escape or focus handling | Skip link; decorative glyphs hidden from screen readers; the mobile menu handles focus, Escape, scroll lock and closing on navigation | Accessibility |
| No OG images, sitemap, robots or structured data | A WhatsApp/LinkedIn preview card for each page, sitemap, robots and `Person` JSON-LD | Most members will first see the link as a WhatsApp preview |
| A newsletter page showing "pending" and a placeholder signup | A **pledge / question form** (server action, zod validation, honeypot, Resend email). It says plainly that it isn't live until it's configured, and keeps what people typed | A real action for members, without pretending a message was sent |
| Separate Sanity studio (never connected), multi-service `vercel.json` | A single Next app; content lives in typed files | One editor and 24 days; a CMS can come back later |
| Old routes | `/manifesto` and `/pillars` → `/plan`, `/commitment` → `/accountability`, `/newsletter` → `/updates`, `/story` → `/about` | Old links already shared keep working |

The old code is in `_legacy/` until you're happy to delete it.

### Motion, and where each piece earns its place

- **Headline word-rise, sun arc and portrait unveil.** These are pure CSS, so they play at first paint without waiting for JavaScript and never hide the candidate's name on a slow connection. An earlier JS version did hide it, which is why they were moved.
- **The 100-day timeline bars** draw in as they scroll into view, so the sequencing reads at a glance.
- **The sticky pillar index on `/plan`** tracks the pillar in view, to help readers find their way down a long page.
- **Section headings and roadmap cards** reveal gently, with a stagger.
- **Stronger pass (1 Nov 2026, at the campaign's request):** reveals now rise further with a blur-to-sharp settle; cards stagger in with a slight scale; key photos wipe open while settling from a zoom (`ImageReveal`); the hero photo drifts inside its arch on scroll (`Parallax`); cards lift on hover; and a thin green bar runs across the top between pages (`components/nav-progress.tsx`). A branded loading screen (`components/splash.tsx`) covers every full page load: the AO mark pops in and its gold arc draws, the name rises word by word and a green bar fills, then the dark panel lifts away like a curtain (about 2.4s in all) as the header drops in and the hero animates underneath. The "Why I'm running" statement, the plan thesis on the home page and the 100-day pledge use ACOB's fill text: a solid green block fills in behind key phrases from the left as they come into view (`ui/motion/fill-text.tsx`, ported from ACOB's `components/ui/animated-fill-text.tsx`; mark phrases with `[[double brackets]]` in the content files). The hero arc draws itself from the top down both sides (`.ao-ring`). It's pure CSS, so it can't get stuck, and the hero entrances wait for it (`--splash-delay`). This was the campaign's call: I advised against it because it hides the candidate for that time on every visit.
- **Reduced motion:** all of the above is off under `prefers-reduced-motion`. Under Save-Data, the JS-driven reveals drop their transforms and keep only the fade.

### Performance (production build, gzip)

| | Home | Plan | 100 days | Get involved |
|---|---|---|---|---|
| First-load JS | 193 KB | 187 KB | 188 KB | 190 KB |

- **CSS:** 9 KB.
- **Fonts:** one variable font file, 88 KB.
- **Hero image on mobile:** about 14 KB.

**Being honest about the budget.** The plan set a 120 KB JS target, and that was wrong. React 19 plus Next 16 alone are about 135 KB. Of the rest:

- About **45 KB is the `motion` library**, against my estimate of about 15 KB.
- The scroll reveals and the bar animation could be rewritten as about 1 KB of CSS plus an IntersectionObserver, with no visible difference.
- I kept `motion` because the plan and your stated preference specify it. Swapping it out is a quick follow-up if you want the 45 KB back.

Two cuts are already made:

- **Fonts:** a second font family was dropped, saving 47 KB.
- **Get involved page:** zod no longer reaches the browser, saving about 29 KB there.

### `/web-design-guidelines`: second pass

**Fixed in this pass:**

- Curly apostrophes.
- Numerals for counts.
- A non-breaking space after "≥".
- A specific submit label.
- The h1→h3 heading skip on `/first-100-days`.
- `translate="no"` on the candidate's name.
- Removed `viewport-fit=cover`.
- A hover state on the mobile pillar chips.

**Deliberate deviations:**

- **Sentence case, not Title Case,** for headings. This is the standard style in Nigerian and British editorial writing.
- **Real `autocomplete` tokens** (name, email, tel) rather than `autocomplete="off"`, because autofill helps people on phones.
- **No unsaved-changes warning** on a short form.
- **Clip-path and stroke animations.** The two on-load entrances animate these rather than only transform and opacity; each runs once, for about a second.

## Before launch: what still needs checking

**Update, 1 Nov 2026.** The campaign chose to fill every gap with existing material and correct it later. Its decisions were:

- **Election date:** 25 Nov 2026, shown as confirmed.
- **Voice:** the 7 pillar commitments, the plan's opening line and the 100-day pledge are rewritten in his first person.
- **Borrowed from the previous site:**
  - The slogan.
  - The "My commitment to members" cards.
  - The track-record figures (10 / 500+ / 36 / 1,000+).
- **Drafted from public sources:** a biography and a "Why I'm running" statement.
- **Contacts and legal:** the LinkedIn URL from search results, and default wording for "Published by", privacy and voting.

**Every borrowed or unconfirmed item** is listed in **[CONTENT-TODO.md](CONTENT-TODO.md)** and tagged `UNVERIFIED` in the code.

`npm run check:launch` lists them all and exits with an error while any remain. It currently reports 17. It isn't wired into `build`, so preview deploys still work. Run it before going live.

**Highest risk:**

- Three of the four figures (500+ projects, 36 states, 1,000+ jobs) were marked by the previous developer as samples to be replaced.
- The statement and the bio are words attributed to Alexander that he hasn't approved.

## Files worth knowing

| What | Where |
|---|---|
| Content | `src/content/plan.ts` · `candidate.ts` · `updates.ts` |
| Contact channels, election date, share text | `src/lib/site.ts` |
| Tokens, contrast notes, CSS entrances | `src/ui/tokens.css`, `src/app/globals.css` |
| Motion | `src/ui/motion/` |
| Form | `src/components/pledge-form.tsx`, `src/app/actions/pledge.ts`, `src/lib/pledge.ts` |
| Photo pipeline | `npm run images -- "<folder with the supplied photos>"` |
