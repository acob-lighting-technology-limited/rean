# Content to verify before launch

On 1 November 2026 the campaign chose to fill every gap with existing material and correct it later. This is the single list of everything on the site that is **borrowed, drafted or unconfirmed**.

Each item is tagged `UNVERIFIED` (or `verified: false`) in the code. `npm run check:launch` lists them all and fails while any remain. When an item is confirmed or replaced, delete its tag and tick it here.

## 1. Words attributed to Alexander (highest risk: he hasn't approved them)

- [ ] **"Why I'm running" statement**, on the home page. Drafted from the previous site's vision line and the manifesto preamble. `src/content/candidate.ts` → `whyRunning`.
- [x] **Biography**, on the About page. Supplied by the campaign, 1 Nov 2026 (MBA, Mandela Washington Fellowship, REA, NEP/GIZ, concessional debt); wording tidied. `candidate.ts` → `bio`.
- [ ] **The 7 pillar commitments**, the plan's opening line and the 100-day pledge, rewritten from the manifesto's institutional voice into "I will…". Pillar 3 (partnerships) has no manifesto commitment, so it was derived from the framework objective. `src/content/plan.ts`.
- [ ] **"My commitment to members"** (I will listen / connect / be clear / work with you), carried over from the previous site. `candidate.ts` → `memberCommitments`.
- [ ] **Slogan** "Powering the industry. Empowering our members.", carried over from the previous site. `src/lib/site.ts` → `slogan`.

## 2. Figures

| Figure | Where | Status |
|---|---|---|
| **10+** years leading ACOB | Home, About | Supplied by the campaign, 1 Nov 2026 (ACOB founded 2016). |
| **100+** projects delivered | Home, About | Supplied by the campaign, 1 Nov 2026 (replaces the sample 500+). |
| **15+** years industry experience | Home, About | Supplied by the campaign, 1 Nov 2026 (replaces the sample 36 states). |
| **5,000+** jobs enabled | Home, About | Supplied by the campaign, 1 Nov 2026 (replaces the sample 1,000+). |
| **23 states** of LED street-lighting rollouts; **25 km** of infrastructure maintained | About, "On the record" and bio | ✅ From ACOB's published "Our Story" page (1 Nov 2026). The Bayan Fada (1,350 people) and Nasarawa (5 NEP sites) items were removed at the campaign's request. |
| ≥85% retention, ≥90% stakeholder-calendar targets; all day ranges and phases | Plan pages | ✅ From the supplied framework PDF. |

All figures live in `src/content/candidate.ts` → `figures` and `facts`.

## 3. Names, links and dates

- [ ] **Election date: 25 November 2026**, shown as confirmed. Its only source is another candidate's LinkedIn post. Confirm it with the REAN Secretariat. `site.ts` → `election`.
- [ ] **LinkedIn URL** `linkedin.com/in/alexander-obiechina-505455a6`, found in public search results. `site.ts` → `linkedin`.
- [ ] **Display name** "Alexander Obiechina"; the full name "Alexander Chinedu Obiechina" comes from ACOB's site.
- [ ] **"Published by the Alexander Obiechina campaign"**: default wording. Also used as the data controller on the privacy page. `site.ts` → `publishedBy`.

## 4. Photos

- [ ] **Studio portraits.** These are the WhatsApp-compressed copies from the Desktop `rean` folder; get the originals.
- [ ] **Hero cut-out** (`public/images/portrait-standing-cutout.png`): a trial, cut from the WhatsApp copy of the standing portrait (1 Nov 2026) because the MD did not like the studio backdrop. Redo it from the original high-resolution photo, ideally by a designer, before launch. The home hero now shows a tight head-and-collar crop of it (`portrait-hero-crop.png`), enlarged, so it is soft until the original arrives.
- [ ] **Nigeria Energy summit photos** (`summit-*`, `hero-*`, `strip-*`, `about-*` in `public/images`). Get permission and a photographer credit; they show the event's branding. Several also show other people (the handshake on Get involved, the group on stage and the colleagues at the photo wall in the home strip): get their consent or swap those photos out.

## 5. Process and legal

- [ ] **"How voting works"** on Get involved. The current text is generic ("check with the Secretariat"). Replace it with REAN's actual procedure: who votes, and whether in person, online or by proxy.
- [ ] **Privacy notice.** The 60-day retention period and the controller name are defaults. Have it reviewed against the NDPA 2023.
- [ ] **REAN candidate rules.** Confirm the site may use REAN's name, and that "Not an official REAN website" is enough.

## 6. Still empty (no material existed)

These stay hidden until filled; nothing fake is shown:

- [x] Phone and WhatsApp (0803 290 2825), Facebook and Instagram: supplied by the campaign on 1 Nov 2026, set as defaults in `src/lib/site.ts`.
- [ ] Campaign email (`.env.local`).
- [ ] Form delivery: a Resend API key and a verified sender domain. Until then the form says it isn't live.
- [ ] Events and endorsements. No section exists; add one when there's real material, and get written consent for endorsements.
- [ ] Campaign updates (`src/content/updates.ts`). The newsletter PDF is deliberately held back, because it describes outcomes as already achieved.
