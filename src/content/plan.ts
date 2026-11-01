/**
 * The platform, taken from the documents the campaign supplied:
 *   - "REAN Strategic Leadership Manifesto" (6 commitments + 100-day pledge)
 *   - "REAN Strategic Framework, Roadmap & Implementation Priorities" — the Expanded version
 *     (7 pillars, 12-month roadmap, KPIs, 8 first-100-day priorities)
 * Actions and dates are kept close to the source. The commitments, thesis and 100-day pledge are
 * rewritten in Alexander's first person (campaign decision A3, 1 Nov 2026). UNVERIFIED: that
 * first-person wording still needs his sign-off — see CONTENT-TODO.md.
 */

export type Pillar = {
  slug: string;
  number: number;
  title: string;
  /** Short label for jump links. */
  label: string;
  short: string;
  /** First-person commitment, from the manifesto (pillar 3 is derived from its objective). */
  commitment: string;
  objective: string;
  actions: string[];
};

// double brackets in thesis and pledge100 mark phrases that get the on-view highlight (ui/motion/highlight.tsx).
// [[double brackets]] in thesis and pledge100 mark phrases that get the on-view fill (ui/motion/fill-text.tsx).
export const preamble = {
  lead: "Nigeria stands at a historic crossroads in its energy transition journey.",
  drivers: [
    { title: "Decentralised regulation", text: "The electricity sector has been decentralised to state regulators." },
    { title: "Rising generation costs", text: "The cost of fossil fuel generation keeps rising." },
    { title: "Unserved demand", text: "Demand that goes unserved keeps growing." },
  ],
  conclusion: "Together, they make renewable energy the foremost driver of industrial productivity, economic resilience and inclusive energy access.",
  thesis:
    "My plan moves REAN from a traditional association to an [[assertive, high-impact platform]]: one that actively defends member interests, shapes state regulatory environments and channels capital into sustainable projects across Nigeria.",
};

export const pillars: Pillar[] = [
  {
    slug: "advocacy",
    number: 1,
    title: "Policy advocacy",
    label: "Advocacy",
    short: "A data-backed voice before ministries, regulators and customs.",
    commitment: "I will maintain an unyielding, data-backed advocacy agenda before federal ministries, state agencies and market regulators.",
    objective: "Position REAN as the foremost unified voice of renewable energy operators, shaping fiscal, trade and power-sector regulation.",
    actions: [
      "Establish a dedicated Advocacy and Regulatory Affairs Committee of industry experts and corporate representatives.",
      "Publish evidence-based position papers on customs classifications, import duty waivers, VAT exemptions and licensing.",
      "Lead structured engagements to end irregular customs classifications, double taxation and port clearance delays for clean energy equipment.",
      "Hold quarterly public–private policy roundtables with the Federal Ministry of Power, NERC and the Ministry of Finance.",
      "Set up an early-warning regulatory desk that reviews draft rules and advises members on compliance impact.",
    ],
  },
  {
    slug: "state-markets",
    number: 2,
    title: "Decentralised electricity market",
    label: "Electricity market",
    short: "One consultative voice across Nigeria’s state electricity markets.",
    commitment: "I will position REAN as the definitive consultative counterpart to State Electricity Regulatory Commissions and state energy ministries.",
    objective: "Coordinate renewable energy business interests across Nigeria’s state electricity markets under the decentralised legal regime.",
    actions: [
      "Engage State Electricity Regulatory Commissions (SERCs) and state energy ministries across all states.",
      "Push for harmonised, predictable licensing and light-handed compliance, ending fragmented licences, tariff distortions and double taxation.",
      "Protect members from arbitrary sub-national levies, duplicate permits and municipal operating obstacles.",
      "Form a Decentralised Electricity Market Working Group of mini-grid developers, C&I operators and legal specialists.",
      "Publish state-by-state market entry guides and compliance toolkits.",
    ],
  },
  {
    slug: "partnerships",
    number: 3,
    title: "Strategic partnership",
    label: "Partnerships",
    short: "Institutional alliances that open doors for members.",
    // Not in the manifesto: derived from the framework objective for this pillar.
    commitment: "I will build high-impact institutional alliances that unlock commercial opportunities for members and expand REAN’s national and global influence.",
    objective: "Build high-impact institutional alliances that unlock commercial opportunities and expand REAN’s national and global influence.",
    actions: [
      "Formalise partnerships with development finance institutions, commercial banks and multilateral agencies.",
      "Link with international clean-energy trade associations to enable technology transfer.",
      "Keep an active executive stakeholder calendar, with a named owner and deliverables for every relationship.",
    ],
  },
  {
    slug: "investment",
    number: 4,
    title: "Investment and financial sustainability",
    label: "Investment",
    short: "A deal-origination hub connecting bankable projects to capital.",
    commitment: "I will transform REAN into an active deal-origination hub, connecting bankable projects to local banks, DFIs and patient climate capital.",
    objective: "Mobilise catalytic capital, project finance and commercial credit, while building long-term financial resilience for the association.",
    actions: [
      "Build a verified pipeline database of bankable member projects: MW capacity, capex, technology and stage.",
      "Convene an annual REAN Clean Energy Investment Forum bringing together development partners, local and foreign financiers and impact fund administrators.",
      "Work and partner with DFIs on local-currency debt, credit de-risking and blended finance instruments.",
      "Secure REAN’s financial sustainability through conference fees, programme fees, grants and sponsorship.",
      "Identify viable investment opportunities that will boost REAN’s financial sustainability.",
    ],
  },
  {
    slug: "membership",
    number: 5,
    title: "Inclusive membership",
    label: "Membership",
    short: "Every member enterprise, at every scale, with a real voice.",
    commitment: "I will build a genuinely democratic and transparent association where every member enterprise has an active voice and equal access to opportunities.",
    objective: "Build a thriving, diverse and representative membership that delivers tangible value to enterprises of all sizes.",
    actions: [
      "Set an equitable, tiered dues schedule so startups, local SMEs and utility-scale developers thrive alongside one another.",
      "Guarantee transparent appointments and fair representation across committees, working groups and trade delegations.",
      "Broker consortiums and procurement matchmaking so smaller local contractors can partner on national mini-grid and commercial projects.",
      "Run retention campaigns, regular feedback surveys and a dedicated member concierge desk.",
    ],
  },
  {
    slug: "capacity",
    number: 6,
    title: "Capacity development",
    label: "Capacity",
    short: "Skills, direct OEM access and a pipeline of young engineers.",
    commitment: "I will elevate domestic engineering and project finance capability, secure direct OEM technology partnerships and cultivate student talent.",
    objective: "Strengthen technical proficiency across the industry, widen access to modern technology and build an academic talent pipeline.",
    actions: [
      "Deliver accredited masterclasses in hybrid mini-grid design, battery storage (BESS), smart metering and HSE standards.",
      "Host executive masterclasses in project finance modelling, bankable contracts and regulatory compliance.",
      "Negotiate direct OEM framework agreements, authorised warranties and technical support for modules, inverters and batteries.",
      "Launch REAN Student Chapters in pioneer universities, with internships, hackathons and mentorship.",
    ],
  },
  {
    slug: "digital",
    number: 7,
    title: "Data- and technology-driven leadership",
    label: "Data & technology",
    short: "Verified sector data and a portal members actually use.",
    commitment: "I will establish REAN as the authoritative digital information hub, publishing verified sector metrics and showcasing member milestones.",
    objective: "Make REAN the authoritative source of verified sector data and the place where member achievements are seen.",
    actions: [
      "Deploy an upgraded portal with a searchable member directory, knowledge library and self-service member dashboard.",
      "Publish an annual State of the Sector Impact Report: verified MW deployed, capital mobilised, jobs and emissions avoided.",
      "Run regular Member Spotlight features across national media, newsletters and industry conferences.",
      "Share market intelligence briefs on Nigeria’s energy deficit and clean-energy solutions.",
    ],
  },
];

export type Priority = { number: number; title: string; start: number; end: number; detail: string };

/** Framework §4, "First 100-Day Priorities (Fully Expanded)". Day ranges are from the document. */
export const priorities: Priority[] = [
  {
    number: 1,
    title: "Inaugurate core governance taskforces",
    start: 1,
    end: 15,
    detail:
      "Inaugurate the Advocacy and Regulatory Affairs Committee and the Decentralised Electricity Market Working Group. Finalise terms of reference, appoint committee leadership and set monthly reporting to the Governing Board.",
  },
  {
    number: 2,
    title: "Membership audit & database cleanse",
    start: 15,
    end: 35,
    detail:
      "Verify the active membership registry, reconcile outstanding dues, audit current tiers (startups, SMEs, large developers) and switch on automated digital invoicing and renewal reminders.",
  },
  {
    number: 3,
    title: "Commission the digital portal & directory",
    start: 20,
    end: 50,
    detail: "Contract an agency to rebuild the REAN portal: a searchable member directory, resource hub, member login and lead generation for members.",
  },
  {
    number: 4,
    title: "National industry data & impact survey",
    start: 30,
    end: 65,
    detail: "Survey all active members to aggregate installed solar and storage capacity (MW), investment, local jobs and mini-grid connections, to ground REAN’s advocacy papers in data.",
  },
  {
    number: 5,
    title: "Open state regulatory dialogues",
    start: 45,
    end: 75,
    detail: "Send formal representation letters and hold introductory consultations with pioneer State Electricity Regulatory Commissions to secure REAN’s role as a consultative stakeholder.",
  },
  {
    number: 6,
    title: "Open bankable project intake",
    start: 50,
    end: 85,
    detail: "Launch an intake portal for shovel-ready projects seeking debt, equity or technical advisory, building the deal-flow pipeline for the REAN Investment Forum.",
  },
  {
    number: 7,
    title: "Approve the academic collaboration framework",
    start: 60,
    end: 90,
    detail: "Ratify guidelines for REAN Student Chapters and sign pilot MoUs with two pioneer engineering universities for internships, research challenges and technical training.",
  },
  {
    number: 8,
    title: "100-day executive progress review",
    start: 100,
    end: 100,
    detail: "Present verified membership records, baseline survey findings, committee agendas and the Year 1 timetable to the Governing Board and General Assembly.",
  },
];

export const pledge100 =
  "Within my first 100 days, I will complete the national membership audit, inaugurate the Advocacy and State Market Committees, open the bankable project pipeline intake, and publish a [[verified progress review]].";

export type Phase = { months: string; name: string; activities: string[]; outcome: string };

/** Framework §2, "Proposed 12-Month Action Roadmap". */
export const roadmap: Phase[] = [
  {
    months: "Months 1–3",
    name: "Foundation",
    activities: [
      "Complete the membership audit and clean the database.",
      "Ratify terms of reference for the Advocacy and State Market Committees.",
      "Issue the RFP for the new digital portal and member directory.",
      "Launch the sector-wide impact and installed-capacity survey.",
    ],
    outcome: "Clean membership records, working governance bodies and verified baseline sector data.",
  },
  {
    months: "Months 4–6",
    name: "Rollout",
    activities: [
      "Launch the new portal and searchable member directory.",
      "Convene the first SERC roundtables.",
      "Run the first technical and project-finance masterclasses.",
      "Open intake for the bankable project pipeline.",
    ],
    outcome: "A modern digital footprint, active engagement with state regulators and the first pipeline intake.",
  },
  {
    months: "Months 7–9",
    name: "Scale",
    activities: [
      "Open direct OEM technology access and vendor-credit dialogues.",
      "Sign academic MoUs and launch pioneer REAN Student Chapters.",
      "Publish state-level market entry and compliance guides.",
      "Circulate the validated Investment Prospectus to funders.",
    ],
    outcome: "University partnerships, preferential OEM terms and an investor-ready project deal-book.",
  },
  {
    months: "Months 10–12",
    name: "Review",
    activities: [
      "Host the flagship REAN Clean Energy Investment Forum.",
      "Publish the national State of the Sector Impact Report.",
      "Convene the Annual General Assembly, leadership awards and AGM.",
      "Review Board performance against targets and calibrate the Year 2 plan.",
    ],
    outcome: "Finance mobilised, industry recognition and updated multi-year milestones.",
  },
];

export type Kpi = { area: string; cadence: string; indicators: string[] };

/** Framework §3, "Key Performance Indicators". Targets (≥90%, ≥85%) are from the document. */
export const kpis: Kpi[] = [
  {
    area: "Policy advocacy",
    cadence: "Quarterly / annual",
    indicators: [
      "Formal policy submissions and regulatory briefs delivered",
      "Structured ministerial, NERC and legislative engagements held",
      "Verified tariff resolutions, tax clarifications or customs relief achieved",
    ],
  },
  {
    area: "Decentralised electricity market",
    cadence: "Quarterly",
    indicators: [
      "Consultative sessions held with SERCs and state energy boards",
      "State compliance toolkits published and circulated",
      "Inter-state regulatory alignment interventions documented",
    ],
  },
  {
    area: "Strategic partnership",
    cadence: "Twice yearly",
    indicators: ["Institutional MoUs signed with DFIs, banks and agencies", "Co-funded initiatives and joint programmes launched", "Stakeholder calendar compliance — target ≥ 90%"],
  },
  {
    area: "Investment and financial sustainability",
    cadence: "Twice yearly / annual",
    indicators: [
      "Cumulative MW and capital value profiled in the pipeline",
      "Qualified lenders and impact funds attending the Investment Forum",
      "Transaction value closed, facilitated or matched through REAN",
    ],
  },
  {
    area: "Inclusive membership",
    cadence: "Quarterly",
    indicators: ["Verified active corporate and individual members", "Annual retention and renewal rate — target ≥ 85%", "Share of startups, micro-enterprises and SMEs in leadership programmes"],
  },
  {
    area: "Capacity development",
    cadence: "Twice yearly",
    indicators: ["Masterclasses delivered and trainees certified", "University MoUs signed and student chapters inaugurated", "OEM demonstration sessions and equipment access deals"],
  },
  {
    area: "Data- and technology-driven leadership",
    cadence: "Monthly / quarterly",
    indicators: ["Website visits and member directory profile searches", "Member Spotlight features published", "Media citations and reach of the Annual Impact Report"],
  },
];
