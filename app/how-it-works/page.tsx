import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction, PageHero, SectionHead } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { journey } from "@/lib/site";

export const metadata: Metadata = { title: "How it works", description: "A staged, equity-based growth partnership, or fee-based consulting." };

const memberGets = ["All four service pillars", "Embedded, hands-on support", "Quarterly reviews", "Business Network access & referrals", "Mutual exit rights at every stage"];

const fees = [
  { icon: "clock" as const, price: "£75–£150", per: "per hour", name: "Hourly consulting" },
  { icon: "doc" as const, price: "£1,500–£8,000", per: "per project", name: "Project engagements" },
  { icon: "cycle" as const, price: "£500–£1,500", per: "per month", name: "Retainer" },
];

export default function HowItWorksPage() {
  const staged = journey.filter((s) => s.equity);
  return (
    <>
      <PageHero eyebrow="How it works" title={<>Grow together,<br />stage by stage.</>} intro="A long-term partnership with clear milestones and fair terms." />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The journey" title="Four stages of growth" />
          <ol className="timeline timeline-light">
            {journey.map((s, i) => (
              <li key={s.name}>
                <div className="timeline-dot">
                  <Icon name={s.icon} />
                </div>
                <span className="timeline-step">Stage {i + 1} · {s.when}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                {s.equity && <span className="pill">{s.equity} equity earned</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHead eyebrow="Equity, earned in stages" title="17% preferred, built up over time" text="We earn equity as we deliver. Nothing is taken up front." />
          <div className="equity-bar" role="img" aria-label="5% at Diagnostic, 7% at Integration and Growth, 5% at Maturity: 17% in total">
            {staged.map((s) => (
              <div key={s.name} style={{ flexGrow: parseInt(s.equity!) }}>
                <strong>{s.equity}</strong>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
          <div className="equity-notes">
            <p>
              <Icon name="percent" /> 15–20% negotiated per business
            </p>
            <p>
              <Icon name="cycle" /> Plus a 5–10% revenue or profit share, paid monthly
            </p>
            <p>
              <Icon name="exit" /> Either side can step away at any stage boundary
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Two ways to engage" title="Choose your path" />
          <div className="paths">
            <div className="path path-featured">
              <span className="path-tag">Option A · Preferred</span>
              <h3>Network Membership</h3>
              <p className="path-price">
                15–20% equity <span>+ 5–10% revenue share</span>
              </p>
              <ul>
                {memberGets.map((m) => (
                  <li key={m}>
                    <Icon name="check" /> {m}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-gold">
                Talk to us about membership <Icon name="arrow" />
              </Link>
            </div>
            <div className="path">
              <span className="path-tag">Option B</span>
              <h3>Fee-Based Consulting</h3>
              <p className="path-price">
                No equity <span>Pay for the work you need</span>
              </p>
              <ul className="fee-list">
                {fees.map((f) => (
                  <li key={f.name}>
                    <Icon name={f.icon} />
                    <span>
                      <strong>{f.price}</strong> {f.per}
                      <small>{f.name}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-outline">
                Ask about a project <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
