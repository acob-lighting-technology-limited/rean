/**
 * Facts about the candidate.
 * Decision (1 Nov 2026): fill every gap from existing material (the previous site, the Desktop
 * `rean` folder, public sources) and correct it later. Anything not confirmed by the campaign is
 * tagged (see scripts/check-launch.mjs) and listed in CONTENT-TODO.md; `npm run check:launch` fails while any remain.
 */

export const candidate = {
  name: "Alexander Obiechina",
  /** Source: ACOB-Website constants ("Mr. Alexander Chinedu Obiechina"). */
  fullName: "Alexander Chinedu Obiechina",
  role: "Founder & CEO, ACOB Lighting Technology Limited",
  /**
   * UNVERIFIED: draft biography composed from public sources and the previous site.
   * Needs Alexander's approval before launch.
   */
  bio: [
    "Alexander Obiechina is the founder and Chief Executive Officer of ACOB Lighting Technology Limited, a renewable energy company he established in Abuja in 2016.",
    "Under his leadership ACOB grew from large-scale LED street lighting, with rollouts across 23 states, into solar EPC and hybrid mini-grids from 2018, as an early partner of the Rural Electrification Agency’s pilot programme. Today its teams deliver productive-use solar systems that power markets, health centres and community facilities across Nigeria.",
    "He has spoken on taking distributed renewables and mini-grids beyond pilots to commercial scale, and he is standing for President of REAN to build on the association’s achievements, strengthen its institutional capacity and work with members to advance the industry.",
  ] as string[] | null,
  /**
   * UNVERIFIED: words attributed to Alexander, drafted from the previous site's vision statement
   * and the manifesto preamble. He has not approved this wording.
   */
  // double brackets mark phrases that get the on-view highlight (ui/motion/highlight.tsx).
  // [[double brackets]] mark phrases that get the on-view fill (ui/motion/fill-text.tsx).
  whyRunning: [
    "Nigeria’s renewable energy industry needs an association that connects members to opportunities, strengthens our collective voice, promotes practical solutions and delivers [[measurable value]].",
    "My vision is to build on REAN’s achievements, strengthen its institutional capacity and work collaboratively with members to advance the industry: an association that [[defends your interests]] in every ministry and every state market, [[brings capital]] to your projects, and reports openly on its progress, so you can hold me to [[every commitment]] on this site.",
  ] as string[] | null,
};

/** Old site's "Commitment to members" page, first person. UNVERIFIED: carried over, approval not confirmed. */
export const memberCommitments = [
  { title: "I will listen.", text: "Member perspectives should inform the association’s priorities and direction." },
  { title: "I will connect.", text: "REAN should help members find ways to learn from and work with one another." },
  { title: "I will be clear.", text: "Members deserve open communication about decisions, priorities and progress." },
  { title: "I will work with you.", text: "Lasting progress comes from shared effort across the renewable energy industry." },
];

export type Figure = {
  value: number;
  suffix?: string;
  label: string;
  /** false = not confirmed by the campaign; listed in CONTENT-TODO.md. */
  verified: boolean;
  note: string;
};

/**
 * Track-record figures.
 * UNVERIFIED: 500+ and 1,000+ come from the previous site, whose developer marked them
 * "sample: true — PLACEHOLDERS: replace them with verified figures before launch".
 * The campaign chose to show them until real figures arrive.
 */
export const figures: Figure[] = [
  { value: 10, label: "Years leading ACOB", verified: true, note: "ACOB founded 2016 (acoblighting.com); 10 years in 2026." },
  { value: 500, suffix: "+", label: "Projects delivered", verified: false, note: "Previous site sample figure." },
  { value: 15, suffix: "+", label: "Years industry experience", verified: false, note: "Supplied by the campaign, 1 Nov 2026; replaces the sample 36 states reached." },
  { value: 1000, suffix: "+", label: "Jobs enabled", verified: false, note: "Previous site sample figure." },
];

export type Fact = { label: string; text: string; source?: { label: string; href: string } };

// From ACOB's own published site (acoblighting.com, "Our Story"), 1 Nov 2026. The earlier Blueprint
// and World Bank items were dropped: the campaign could not stand behind them.
export const facts: Fact[] = [
  {
    label: "Founder & CEO",
    text: "Founded ACOB Lighting Technology Limited in 2016. The company is headquartered in Gwarinpa, Abuja.",
    source: { label: "acoblighting.com", href: "https://www.acoblighting.com/about/our-story" },
  },
  {
    label: "Street lighting",
    text: "ACOB began with large-scale LED street lighting: rollout programmes across 23 states, and 25 kilometres of critical infrastructure maintained for the FCDA and state governments, from the National Stadium to the Airport City Gate.",
    source: { label: "ACOB: Our Story", href: "https://www.acoblighting.com/about/our-story" },
  },
  {
    label: "Mini-grids",
    text: "In 2018 ACOB moved into solar EPC and hybrid mini-grid development, as an early partner of the Rural Electrification Agency’s pilot programme.",
    source: { label: "ACOB: Our Story", href: "https://www.acoblighting.com/about/our-story" },
  },
  {
    label: "Communities",
    text: "Today ACOB’s teams deliver productive-use systems across Nigeria that power agro-processing, markets, health centres and community facilities, backed by financing, maintenance and digital monitoring.",
    source: { label: "ACOB: Our Story", href: "https://www.acoblighting.com/about/our-story" },
  },
  {
    label: "Sector voice",
    text: "Panellist on “Beyond Pilots: Building Distributed Renewables and Mini-Grids at Commercial Scale” at the Nigeria Energy Leadership Summit.",
  },
  {
    label: "REAN member",
    text: "ACOB Lighting Technology is a member company of the Renewable Energy Association of Nigeria.",
  },
];

export const photos = {
  standing: { src: "/images/portrait-standing.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina in a navy suit, smiling, hands clasped" },
  seated: { src: "/images/portrait-seated.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina seated in an armchair, smiling" },
  pointing: { src: "/images/portrait-pointing.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina smiling and pointing towards the camera" },
  side: { src: "/images/portrait-side.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina in three-quarter profile, smiling" },
  /* UNVERIFIED: event photos — use permission and photographer credit not yet confirmed. */
  summitSpeaking: {
    src: "/images/summit-speaking.jpg",
    width: 1800,
    height: 1200,
    alt: "Alexander Obiechina speaking into a microphone on stage, his name and title on the screen behind him",
  },
  summitAudience: { src: "/images/summit-audience.jpg", width: 1800, height: 1200, alt: "Audience watching a panel at the Nigeria Energy Leadership Summit" },
  /* UNVERIFIED: same summit; also needs consent from the other people shown (handshake, group, colleagues). */
  aboutNative: { src: "/images/about-portrait.webp", width: 960, height: 1200, alt: "Alexander Obiechina smiling, arms folded, in a white kaftan and a patterned cap" },
  bannerPlan: { src: "/images/banner-plan.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina speaking into a microphone on stage, his name and title on the screen behind him" },
  banner100: { src: "/images/banner-100days.jpg", width: 2400, height: 1278, alt: "The panel on stage at the Nigeria Energy Leadership Summit, the session title on the screen" },
  bannerAccountability: { src: "/images/banner-accountability.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina seated with fellow panellists on stage, their names on the screen above" },
  bannerAbout: { src: "/images/banner-about.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina laughing with a colleague in the audience" },
  bannerInvolved: { src: "/images/banner-involved.jpg", width: 2400, height: 1300, alt: "Members in the audience at the Nigeria Energy Leadership Summit" },
  stripNativeFull: { src: "/images/strip-native-full.jpg", width: 667, height: 1000, alt: "Alexander Obiechina in a white kaftan and cap at the summit photo wall" },
  stripSeatedMic: { src: "/images/strip-seated-mic.jpg", width: 667, height: 1000, alt: "Alexander Obiechina seated on stage with a microphone" },
  stripWave: { src: "/images/strip-wave.jpg", width: 761, height: 1000, alt: "Alexander Obiechina waving from his seat in the audience" },
  stripGroup: { src: "/images/strip-group-stage.jpg", width: 1000, height: 616, alt: "Alexander Obiechina with the other panellists on stage" },
  stripColleagues: { src: "/images/strip-colleagues.jpg", width: 1000, height: 667, alt: "Alexander Obiechina with two colleagues at the summit photo wall" },
} as const;
