import Link from "next/link";
import { CallToAction, SectionHead } from "@/components/Blocks";
import CaseCard from "@/components/CaseCard";
import Icon, { type IconName } from "@/components/Icon";
import Roots from "@/components/Roots";
import { caseStudies, journey, pillars } from "@/lib/site";

const promises: { icon: IconName; title: string; text: string }[] = [
  { icon: "people", title: "Embedded, not advisory", text: "We work inside your business, alongside your team." },
  { icon: "nodebt", title: "Equity, not debt", text: "No loans and no repayment pressure." },
  { icon: "network", title: "A growing network", text: "Members refer, share and grow together." },
];

const stats = [
  { figure: "60%", text: "of UK startups fail within five years" },
  { figure: "99.9%", text: "of UK businesses are small businesses" },
  { figure: "£12.8bn", text: "UK small-business support market" },
  { figure: "73%", text: "of owners lack skills in a key area" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Counselling &amp; Business Incubator</p>
            <h1>
              Grow your business from the <em>roots</em> up.
            </h1>
            <p className="hero-intro">We work inside small businesses and help them grow, with equity rather than debt.</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-gold btn-lg">
                Book a conversation <Icon name="arrow" />
              </Link>
              <Link href="/how-it-works" className="text-link light">
                How it works <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <Roots />
          </div>
        </div>
        <div className="container promise-row">
          {promises.map((p) => (
            <div className="promise" key={p.title}>
              <Icon name={p.icon} />
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container statement">
          <p className="eyebrow">Why Mustard Seed</p>
          <p className="statement-text">
            Most support stops at advice. We roll up our sleeves and work <em>inside</em> your business until it can stand on its own.
          </p>
          <Link href="/about" className="text-link">
            About us <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Four pillars of support" text="Network members get all four. Choose one to see what's included." link={{ href: "/services", label: "All services" }} />
          <div className="pillar-row">
            {pillars.map((p) => (
              <Link key={p.slug} href={`/services/${p.slug}`} className="pillar-col">
                <span className="pillar-num">{p.number}</span>
                <Icon name={p.icon} className="icon-lg" />
                <h3>{p.name}</h3>
                <p>{p.short}</p>
                <span className="pillar-go">
                  Explore <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHead eyebrow="The journey" title="From seed to network" link={{ href: "/how-it-works", label: "How it works" }} />
          <ol className="timeline">
            {journey.map((s, i) => (
              <li key={s.name}>
                <div className="timeline-dot">
                  <Icon name={s.icon} />
                </div>
                <span className="timeline-step">Stage {i + 1} · {s.when}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Portfolio" title="Growing together" text="Case studies from our network, shared under codenames to keep every member confidential." link={{ href: "/portfolio", label: "View portfolio" }} />
          <div className="case-grid">
            {caseStudies.map((s) => (
              <CaseCard key={s.slug} study={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHead eyebrow="The opportunity" title="A gap worth closing" />
          <div className="stat-row">
            {stats.map((s) => (
              <div className="stat" key={s.figure}>
                <span className="stat-figure">{s.figure}</span>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
