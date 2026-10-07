import type { Metadata } from "next";
import { CallToAction, PageHero, SectionHead } from "@/components/Blocks";
import CaseCard from "@/components/CaseCard";
import Icon, { type IconName } from "@/components/Icon";
import { caseStudies } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case studies from the Mustard Seed Business Network. Members are shown under codenames to keep them confidential.",
};

const covers: { icon: IconName; name: string; text: string }[] = [
  { icon: "search", name: "The challenge", text: "Where the business was, and what was holding it back." },
  { icon: "people", name: "What we did", text: "How we worked inside the business, pillar by pillar." },
  { icon: "chart", name: "The outcome", text: "What changed, and where the business is heading now." },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title={<>Growing together.</>} intro="Stories from the Mustard Seed Business Network: the businesses we work with, and how we help them grow.">
        <div className="why-strip">
          <Icon name="lock" className="icon-lg" />
          <p>Every member is shown under a codename. We never share names or confidential details.</p>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Case studies" title="From the network" text="Our first case studies are being written. Check back soon." />
          <div className="case-grid">
            {caseStudies.map((s) => (
              <CaseCard key={s.slug} study={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHead eyebrow="What you'll find" title="Every case study covers" />
          <ol className="steps">
            {covers.map((c, i) => (
              <li key={c.name}>
                <Icon name={c.icon} className="icon-lg" />
                <span className="steps-num">Part {i + 1}</span>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CallToAction title="Could your business be next?" text="Join the network and grow alongside other members." />
    </>
  );
}
