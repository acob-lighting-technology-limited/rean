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
   * Biography supplied by the campaign, 1 Nov 2026 (wording tidied; claims as given).
   */
  bio: [
    "Alexander Obiechina is the founder and Chief Executive Officer of ACOB Lighting Technology Limited, a renewable energy company he established in Abuja in 2016. He holds an MBA, specialising in Product Development Management (PDM), from Cardiff Metropolitan University, United Kingdom, and is a 2019 Mandela Washington Fellow, a programme sponsored by the US Department of State.",
    "Under his leadership ACOB grew from a large-scale LED street lighting infrastructure company, with rollouts across 23 states, into a solar EPC and renewable energy service company (RESCO), among the pioneers of mini-grid development in Nigeria. ACOB partnered with the Rural Electrification Agency at a very early stage to pilot the development and rollout of mini-grids in Nigeria. Today its teams deliver productive-use solar systems that power markets, health centres, community facilities and businesses across Nigeria.",
    "ACOB remains one of the pioneer local renewable energy companies to access concessional debt in the capital market to scale decentralised renewable energy solutions (mini-grids). That growth has given young Nigerians internships, training and job placements in the renewable energy sector.",
    "Alexander has built partnerships with development partners through the Nigeria Electrification Project (NEP), funded by the World Bank and the African Development Bank, and with GIZ under the Nigerian Energy Support Programme (NESP).",
    "He has spoken on many platforms on taking distributed renewables and mini-grids beyond pilot scale, and on working with stakeholders in the sector towards a viable renewable energy market. He is standing for President of REAN to build on the association’s achievements, strengthen its institutional capacity and work with members to take the association to the next level.",
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
 * Track-record figures, supplied by the campaign on 1 Nov 2026 (replacing the previous site's samples).
 * Not independently verified: the campaign stands behind them.
 */
export const figures: Figure[] = [
  { value: 15, suffix: "+", label: "Years industry experience", verified: false, note: "Supplied by the campaign, 1 Nov 2026; replaces the sample 36 states reached." },
  { value: 10, suffix: "+", label: "Years leading ACOB", verified: true, note: "ACOB founded 2016 (acoblighting.com); 10+ supplied by the campaign, 1 Nov 2026." },
  { value: 100, suffix: "+", label: "Projects delivered", verified: false, note: "Supplied by the campaign, 1 Nov 2026; replaces the sample 500+." },
  { value: 5000, suffix: "+", label: "Jobs enabled", verified: false, note: "Supplied by the campaign, 1 Nov 2026; replaces the sample 1,000+." },
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
  // Education and fellowship: supplied by the campaign, 1 Nov 2026.
  {
    label: "Education",
    text: "MBA, specialising in Product Development Management (PDM), Cardiff Metropolitan University, United Kingdom.",
  },
  {
    label: "Fellowship",
    text: "2019 Mandela Washington Fellow, a programme sponsored by the US Department of State.",
  },
  {
    label: "Street lighting",
    text: "ACOB began with large-scale LED street lighting: rollout programmes across 23 states, and 25 kilometres of critical infrastructure maintained for the FCDA and state governments, from the National Stadium to the Airport City Gate.",
    source: { label: "ACOB: Our Story", href: "https://www.acoblighting.com/about/our-story" },
  },
  {
    label: "Mini-grids",
    text: "ACOB moved into solar EPC and mini-grid development as a renewable energy service company (RESCO), partnering with the Rural Electrification Agency at a very early stage to pilot mini-grids in Nigeria.",
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

export type Milestone = {
  year: string;
  title: string;
  text: string;
  photo?: { src: string; width: number; height: number; alt: string };
  source: { label: string; href: string };
};

// Major milestones, from ACOB's own published updates (acoblighting.com/updates), 2 Nov 2026.
// Photos are ACOB's, from the same posts (the largest copies ACOB holds, 1080–1280px wide).
// UNVERIFIED: use of ACOB's photos, and of officials shown in them, to be confirmed by the campaign.
const acobUpdate = (slug: string) => ({ label: "ACOB update", href: `https://www.acoblighting.com/updates/${slug}` });
export const milestones: Milestone[] = [
  {
    year: "2016",
    title: "Founds ACOB Lighting Technology",
    text: "Starts ACOB in Abuja, with large-scale LED street lighting for federal and state governments.",
    source: { label: "acoblighting.com", href: "https://www.acoblighting.com/about/our-story" },
  },
  {
    year: "2019",
    title: "First mini-grid, Obadore",
    text: "Selected by the Rural Electrification Agency as the South West developer under the Mini-Grid Acceleration Scheme. With the African Development Bank, ACOB builds a 30 kWp solar hybrid mini-grid in Obadore, Lagos, powering more than 300 homes and businesses.",
    photo: { src: "/images/milestones/obadore-2019.jpg", width: 1280, height: 719, alt: "Aerial view of Obadore community, with the solar mini-grid at the edge of the village" },
    source: acobUpdate("lighting-up-obadore-acob-lighting-s-solar-solution"),
  },
  {
    year: "2024",
    title: "Nigeria Electrification Project grant",
    text: "After a 2023 REA grant to bring mini-grid power to 17,860 people, ACOB signs a Minimum Subsidy Tender grant under the Nigeria Electrification Project, funded by the African Development Bank, for mini-grids in Jigawa and Nasarawa.",
    photo: { src: "/images/milestones/rea-nep-grant-2024.jpg", width: 1280, height: 854, alt: "ACOB and REA representatives holding the signed grant agreements" },
    source: acobUpdate("rea-nep-accelerates-off-grid-power-generation-in-jigawa-nasarawa-with-grant-agreement-signing"),
  },
  {
    year: "2025",
    title: "Africa Minigrids Program",
    text: "Signs grant awards with the Global Environment Facility, UNDP and REA, one of 18 developers chosen to build 23 new mini-grids across Nigeria’s six geo-political zones.",
    photo: { src: "/images/milestones/gef-grant-2025.jpg", width: 1080, height: 720, alt: "Developers and officials holding signed grant awards under the Africa Minigrids Program" },
    source: acobUpdate("signing-of-grant-awards-with-the-global-environment-facility"),
  },
  {
    year: "2025",
    title: "Best Social Bond in Africa",
    text: "ACOB’s NGN 1.51 billion, 7-year InfraCredit-guaranteed green infrastructure bond wins Best Social Bond in Africa at the EMEA Finance Achievement Awards in London.",
    photo: { src: "/images/milestones/social-bond-award-2025.jpg", width: 1080, height: 708, alt: "Alexander Obiechina with the other winners on stage in London, the Best Social Bond in Africa citation on the screen behind" },
    source: acobUpdate("acob-lighting-wins-best-social-bond-in-africa-at-the-2025-emea-finance-achievement-awards"),
  },
  {
    year: "2025",
    title: "On the global stage",
    text: "Speaks at the Sustainable Energy for All Forum in Barbados on “Powering the SDGs: From Connection to Consumption”, and at COP30 in Belém, Brazil, on mini-grids and the productive use of energy in Africa.",
    source: acobUpdate("acob-lighting-to-speak-at-cop30-on-mini-grids-and-productive-use-of-energy-in-africa"),
  },
  {
    year: "2025",
    title: "Nasarawa rural electrification",
    text: "Meets the Governor of Nasarawa State with the heads of REA and the Abuja Electricity Distribution Company to advance electrification for the Umaisha and Toto communities.",
    photo: { src: "/images/milestones/nasarawa-governor-2025.jpg", width: 1080, height: 720, alt: "Alexander Obiechina shaking hands with officials at Nasarawa State’s lodge in Abuja" },
    source: acobUpdate("driving-rural-electrification-progress-in-nasarawa-acob-strengthens-multi-stakeholder"),
  },
  {
    year: "2025",
    title: "Partnership with AlphaESS",
    text: "Signs a strategic cooperation agreement with AlphaESS West Africa, alongside a guest talk on Nigeria’s resilient energy future.",
    photo: { src: "/images/milestones/alphaess-mou-2025.jpg", width: 1280, height: 960, alt: "Alexander Obiechina and an AlphaESS representative exchanging the signed agreement on stage" },
    source: acobUpdate("acob-ceo-champions-nigeria-s-resilient-energy-future-at-strategic-forum"),
  },
  {
    year: "2026",
    title: "50 mini-grids for Nasarawa State",
    text: "At the Nasarawa State Investment Summit, signs an agreement with the state government to develop 50 mini-grids, witnessed by REA, after delivering five mini-grids (1.1 MWp) in the state under the Nigeria Electrification Project.",
    photo: { src: "/images/milestones/nasarawa-summit-2026.jpg", width: 1080, height: 720, alt: "Alexander Obiechina holding the signed agreement with officials at the Nasarawa Investment Summit" },
    source: acobUpdate("acob-ceo-nasarawa-state-investment-summit-2026-partnership"),
  },
];

export const photos = {
  standing: { src: "/images/portrait-standing.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina in a navy suit, smiling, hands clasped" },
  seated: { src: "/images/portrait-seated.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina seated in an armchair, smiling" },
  pointing: { src: "/images/portrait-pointing.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina smiling and pointing towards the camera" },
  side: { src: "/images/portrait-side.jpg", width: 1120, height: 1400, alt: "Alexander Obiechina in three-quarter profile, smiling" },
  /* UNVERIFIED: event photos — use permission and photographer credit not yet confirmed. */
  /* UNVERIFIED: same summit; also needs consent from the other people shown (handshake, group, colleagues). */
  aboutNative: { src: "/images/about-portrait.webp", width: 960, height: 1200, alt: "Alexander Obiechina smiling, arms folded, in a white kaftan and a patterned cap" },
  /* ACOB's published photo (acoblighting.com, Best Social Bond in Africa, June 2025). */
  awardLondon: { src: "/images/award-london.jpg", width: 1080, height: 608, alt: "Alexander Obiechina holding the Best Social Bond in Africa award at the EMEA Finance awards in London" },
  bannerPlan: { src: "/images/banner-plan.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina speaking into a microphone on stage, his name and title on the screen behind him" },
  banner100: { src: "/images/banner-100days.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina standing with the other panellists on stage at the Nigeria Energy Leadership Summit" },
  bannerAccountability: { src: "/images/banner-accountability.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina seated with fellow panellists on stage, their names on the screen above" },
  bannerAbout: { src: "/images/banner-about.jpg", width: 2400, height: 1599, alt: "Alexander Obiechina laughing with a colleague in the audience" },
  bannerInvolved: { src: "/images/banner-involved.jpg", width: 2400, height: 1300, alt: "Members in the audience at the Nigeria Energy Leadership Summit" },
  stripNativeFull: { src: "/images/strip-native-full.jpg", width: 667, height: 1000, alt: "Alexander Obiechina in a white kaftan and cap at the summit photo wall" },
  stripSeatedMic: { src: "/images/strip-seated-mic.jpg", width: 667, height: 1000, alt: "Alexander Obiechina seated on stage with a microphone" },
  stripWave: { src: "/images/strip-wave.jpg", width: 761, height: 1000, alt: "Alexander Obiechina waving from his seat in the audience" },
  stripConsult: { src: "/images/strip-consult.jpg", width: 1000, height: 722, alt: "Alexander Obiechina leaning in to talk with a delegate seated in the audience" },
  stripPanelWide: { src: "/images/strip-panel-wide.jpg", width: 1000, height: 667, alt: "The panel in session on stage at the Nigeria Energy Leadership Summit" },
} as const;

/**
 * Home gallery ("On the ground"): Alexander across the sector, not only at the Nigeria Energy summit.
 * Sources: the campaign's event photos (Telegram set and a Nigeria Energy 2026 post, its text
 * removed), and ACOB's published updates (acoblighting.com), 2 Nov 2026.
 * UNVERIFIED: use permission and photographer credit; other people shown, including officials.
 */
export const gallery = {
  nigeriaEnergy: { src: "/images/gallery/nigeria-energy-2026.jpg", width: 1000, height: 750, alt: "Alexander Obiechina laughing with a senior official at Nigeria Energy 2026 in Lagos" },
  reaOndo: { src: "/images/gallery/rea-ondo-podium.jpg", width: 1000, height: 667, alt: "Alexander Obiechina speaking at a podium at an REA state engagement in Ondo State" },
  panelKaftan: { src: "/images/gallery/panel-kaftan.jpg", width: 1000, height: 667, alt: "Alexander Obiechina making a point on a conference panel, in a white kaftan and cap" },
  panelMic: { src: "/images/gallery/panel-mic.jpg", width: 1000, height: 666, alt: "Alexander Obiechina speaking into a microphone on a panel, in a navy blazer" },
  stateHandshake: { src: "/images/gallery/state-handshake.jpg", width: 1000, height: 667, alt: "Alexander Obiechina shaking hands with an official at a state government office" },
  stateGroup: { src: "/images/gallery/state-group.jpg", width: 1000, height: 667, alt: "Alexander Obiechina with officials and colleagues at a state government office" },
  frontRow: { src: "/images/gallery/front-row.jpg", width: 1000, height: 667, alt: "Alexander Obiechina seated in the front row of a packed energy conference" },
  greeting: { src: "/images/gallery/greeting.jpg", width: 1000, height: 667, alt: "Alexander Obiechina greeting a fellow guest with a handshake" },
  delegates: { src: "/images/gallery/delegates.jpg", width: 1000, height: 667, alt: "Alexander Obiechina with fellow delegates at an energy event" },
  welcome: { src: "/images/gallery/welcome.jpg", width: 1000, height: 667, alt: "Alexander Obiechina warmly greeting an elder at an event" },
  floorMic: { src: "/images/gallery/floor-mic.jpg", width: 1000, height: 666, alt: "Alexander Obiechina standing to speak from the audience at a conference" },
  forumPortrait: { src: "/images/gallery/forum-portrait.jpg", width: 667, height: 1000, alt: "Alexander Obiechina listening during a roundtable, in a white kaftan" },
  alphaessSigning: { src: "/images/gallery/alphaess-signing.jpg", width: 1000, height: 750, alt: "Alexander Obiechina signing the strategic cooperation agreement with AlphaESS West Africa" },
  bondAward: { src: "/images/gallery/social-bond-award.jpg", width: 563, height: 1000, alt: "Alexander Obiechina in a tuxedo holding the Best Social Bond in Africa award in London" },
  nasarawaLodge: { src: "/images/gallery/nasarawa-lodge.jpg", width: 667, height: 1000, alt: "Alexander Obiechina smiling at a meeting at Nasarawa State’s lodge in Abuja" },
  nasarawaSummit: { src: "/images/gallery/nasarawa-summit.jpg", width: 1000, height: 687, alt: "Alexander Obiechina greeting guests at the Nasarawa State Investment Summit" },
} as const;
