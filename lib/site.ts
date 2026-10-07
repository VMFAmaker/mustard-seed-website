import type { IconName } from "@/components/Icon";

// ---- Company details: fill these in and every page updates ----
export const site = {
  name: "Mustard Seed",
  legalName: "Mustard Seed Ltd",
  tagline: "Counselling & Business Incubator",
  motto: "Faith · Purpose · Growth",
  email: "virgilioalmeida2005@gmail.com",
  phone: null as string | null, // e.g. "020 0000 0000"
  address: null as string[] | null, // e.g. ["1 High Street", "Birmingham", "B1 1AA"]
  companyNumber: null as string | null,
  location: "United Kingdom",
};

export type Pillar = {
  slug: string;
  number: string;
  name: string;
  icon: IconName;
  short: string;
  intro: string;
  why: { figure?: string; text: string };
  services: { icon: IconName; title: string; text: string }[];
  note?: string;
};

export const pillars: Pillar[] = [
  {
    slug: "operational",
    number: "01",
    name: "Operational",
    icon: "gear",
    short: "The systems that run your business, day to day.",
    intro: "We build the processes that let your business run without you holding everything together.",
    why: { figure: "73%", text: "of small business owners lack expertise in at least one critical function." },
    services: [
      { icon: "flow", title: "Process design", text: "Map how work really flows, then remove what slows it down." },
      { icon: "people", title: "Embedded support", text: "A Mustard Seed professional working inside your team." },
      { icon: "box", title: "Delivery & quality", text: "Quality that holds up as volume grows." },
      { icon: "gauge", title: "Performance tracking", text: "Clear KPIs and quarterly reviews." },
      { icon: "cap", title: "Team training", text: "Your people keep it running after we step back." },
    ],
  },
  {
    slug: "marketing",
    number: "02",
    name: "Marketing",
    icon: "megaphone",
    short: "Reach the right customers with a brand that grows.",
    intro: "Clarity on who you serve, a sharper message, and a repeatable way to win new customers.",
    why: { text: "A lack of market understanding is one of the most common reasons UK startups fail." },
    services: [
      { icon: "target", title: "Brand & positioning", text: "Be clear on who you serve and why they choose you." },
      { icon: "map", title: "Go-to-market plan", text: "A focused plan matched to your stage and budget." },
      { icon: "magnet", title: "Customer acquisition", text: "Find the channels that actually reach your customers." },
      { icon: "pencil", title: "Campaigns & content", text: "Hands-on help producing and running them." },
      { icon: "chartsearch", title: "Measure & refine", text: "Back what works. Cut what doesn't." },
    ],
  },
  {
    slug: "financial",
    number: "03",
    name: "Financial",
    icon: "chart",
    short: "Cash flow, forecasting and the numbers that matter.",
    intro: "Clear numbers, calmer decisions, and an owner who understands their own finances.",
    why: { text: "Cash flow problems are among the most common reasons UK startups fail, and they can be fixed." },
    services: [
      { icon: "cycle", title: "Cash flow forecasting", text: "See pressure coming and plan for it." },
      { icon: "book", title: "Bookkeeping systems", text: "Books that are always up to date." },
      { icon: "pie", title: "Budgeting & planning", text: "Budgets tied to your growth goals." },
      { icon: "report", title: "Management reporting", text: "The health of the business at a glance." },
      { icon: "bulb", title: "Financial coaching", text: "Read and act on your own numbers." },
    ],
    note: "Small financial aid for network members is planned for the future.",
  },
  {
    slug: "legal",
    number: "04",
    name: "Legal",
    icon: "scales",
    short: "Solid foundations, through trusted partner firms.",
    intro: "The right legal foundations protect everything else you build.",
    why: { text: "Specialist legal guidance, without the cost of an in-house legal team." },
    services: [
      { icon: "columns", title: "Structure & governance", text: "The right set-up as your business grows." },
      { icon: "contract", title: "Contracts & agreements", text: "Clients, suppliers and partners, covered." },
      { icon: "clipboard", title: "Compliance", text: "Understand and meet your obligations." },
      { icon: "lock", title: "Data protection & IP", text: "Protect your data and your ideas." },
    ],
    note: "Delivered through trusted partner firms. This pillar is in development.",
  },
];

export const journey: { icon: IconName; name: string; when: string; text: string; equity?: string }[] = [
  { icon: "seed", name: "Diagnostic", when: "Months 1–3", text: "We research, plan and agree direction together.", equity: "5%" },
  { icon: "sprout", name: "Integration & Growth", when: "Months 4–12", text: "We embed and implement against agreed KPIs.", equity: "7%" },
  { icon: "tree", name: "Maturity", when: "Month 12+", text: "We build towards independence milestones.", equity: "5%" },
  { icon: "network", name: "The Network", when: "Ongoing", text: "Quarterly reviews, referrals and shared growth." },
];

export const values: { icon: IconName; name: string; text: string }[] = [
  { icon: "hands", name: "Stewardship", text: "Care and accountability with every resource." },
  { icon: "heart", name: "Service", text: "Your success comes before short-term returns." },
  { icon: "shield", name: "Integrity", text: "Transparent terms and honest assessments." },
  { icon: "community", name: "Community", text: "Members support one another." },
  { icon: "star", name: "Excellence", text: "Specialist-grade work in every engagement." },
];

export type DocumentInfo = { slug: string; title: string; short: string; group: "website" | "terms" | "policies" };

export const documentGroups = [
  { key: "website", label: "Using this website" },
  { key: "terms", label: "Working with us" },
  { key: "policies", label: "Company policies" },
] as const;

export const documents: DocumentInfo[] = [
  { slug: "privacy-policy", title: "Website Privacy Policy", short: "Privacy Policy", group: "website" },
  { slug: "cookie-policy", title: "Cookie Policy", short: "Cookie Policy", group: "website" },
  { slug: "terms-of-use", title: "Website Terms of Use", short: "Terms of Use", group: "website" },
  { slug: "terms-of-business", title: "General Terms of Business", short: "Terms of Business", group: "terms" },
  { slug: "payment-terms", title: "Standard Payment Terms", short: "Payment Terms", group: "terms" },
  { slug: "anti-bribery-policy", title: "Anti-Bribery & Corruption Policy", short: "Anti-Bribery Policy", group: "policies" },
  { slug: "complaints-policy", title: "Complaints Handling Policy", short: "Complaints Policy", group: "policies" },
  { slug: "conflicts-of-interest-policy", title: "Conflicts of Interest Policy", short: "Conflicts of Interest", group: "policies" },
  { slug: "data-protection-policy", title: "Data Protection Policy", short: "Data Protection", group: "policies" },
  { slug: "equal-opportunities-policy", title: "Equal Opportunities Policy", short: "Equal Opportunities", group: "policies" },
  { slug: "health-and-safety-policy", title: "Health & Safety Policy", short: "Health & Safety", group: "policies" },
  { slug: "information-security-policy", title: "Information Security Policy", short: "Information Security", group: "policies" },
];

// ---- Portfolio: network members are shown under a codename to keep them confidential ----
// Set status to "published" once a case study is written; only published ones get their own page.
export type CaseStudy = {
  slug: string;
  number: string;
  codename: string; // e.g. "Project Cedar" (never the real company name)
  sector: string;
  stage: string;
  pillars: Pillar["slug"][];
  summary: string;
  challenge: string;
  approach: string[];
  outcome: string;
  results: { figure: string; text: string }[];
  status: "published" | "in-development";
};

export const caseStudies: CaseStudy[] = [1, 2, 3].map((n) => ({
  slug: `case-study-${n}`,
  number: String(n).padStart(2, "0"),
  codename: "To be developed",
  sector: "To be developed",
  stage: "To be developed",
  pillars: [],
  summary: "A sample project showing how we work with a network member. To be developed.",
  challenge: "To be developed",
  approach: [],
  outcome: "To be developed",
  results: [],
  status: "in-development",
}));

export const nav = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];
