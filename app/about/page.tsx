import type { Metadata } from "next";
import { CallToAction, PageHero, SectionHead } from "@/components/Blocks";
import Icon, { type IconName } from "@/components/Icon";
import { values } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: "Who Mustard Seed is, what makes us different, and the values that guide us." };

const compare: { icon: IconName; name: string; text: string; us?: boolean }[] = [
  { icon: "calendar", name: "Accelerators", text: "Short programmes of mentorship, and then you're on your own." },
  { icon: "coins", name: "Venture capital", text: "Capital, but very little hands-on help." },
  { icon: "people", name: "Mustard Seed", text: "Inside your business for the long term, with our incentives aligned to yours.", us: true },
];

const reasons: { icon: IconName; name: string; text: string }[] = [
  { icon: "nodebt", name: "No debt burden", text: "No loans and no repayments." },
  { icon: "tool", name: "Hands-on execution", text: "We do the work with you." },
  { icon: "percent", name: "Fair terms", text: "Staged equity and mutual exit rights." },
  { icon: "grid", name: "Full access", text: "All four pillars for members." },
  { icon: "network", name: "Business network", text: "Referrals and shared services." },
  { icon: "sunrise", name: "Faith-driven culture", text: "Integrity and service at our core." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>Rooted in faith.<br />Built for growth.</>} intro="A faith-driven business incubator and venture capital firm based in the United Kingdom." />

      <section className="section">
        <div className="container parable">
          <div className="parable-art" aria-hidden>
            <div className="parable-seed">
              <Icon name="seed" />
              <span>The smallest seed</span>
            </div>
            <div className="parable-path" />
            <div className="parable-tree">
              <Icon name="tree" className="icon-thin" />
              <span>The largest of garden plants</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Our name</p>
            <p className="statement-text small">
              The parable of the mustard seed: the smallest of seeds grows into the largest of garden plants. <em>Small beginnings, great growth.</em>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHead eyebrow="How we're different" title="Inside the business, not on the sidelines" />
          <div className="compare-row">
            {compare.map((c) => (
              <div key={c.name} className={`compare-card${c.us ? " is-us" : ""}`}>
                <Icon name={c.icon} className="icon-lg" />
                <h3>{c.name}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why founders choose us" title="Built around your success" />
          <div className="icon-grid">
            {reasons.map((r) => (
              <div key={r.name} className="icon-item">
                <Icon name={r.icon} className="icon-lg" />
                <div>
                  <h3>{r.name}</h3>
                  <p>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHead eyebrow="What guides us" title="Our values" text="Christian principles of service, integrity and community are how we operate, not a marketing line." />
          <div className="values-row">
            {values.map((v) => (
              <div key={v.name} className="value">
                <Icon name={v.icon} className="icon-lg" />
                <h3>{v.name}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
