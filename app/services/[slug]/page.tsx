import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction, PageHero, SectionHead } from "@/components/Blocks";
import Icon, { type IconName } from "@/components/Icon";
import { pillars } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = pillars.find((x) => x.slug === slug);
  return p ? { title: `${p.name} support`, description: p.intro } : {};
}

const steps: { icon: IconName; name: string; text: string }[] = [
  { icon: "search", name: "Assess", text: "We find out where you are today." },
  { icon: "people", name: "Embed", text: "We work alongside your team." },
  { icon: "key", name: "Hand over", text: "You run it with confidence." },
];

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = pillars.find((p) => p.slug === slug);
  if (!pillar) notFound();
  const others = pillars.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero eyebrow={`Pillar ${pillar.number} · Services`} title={pillar.name} intro={pillar.intro} icon={pillar.icon}>
        <div className="why-strip">
          {pillar.why.figure && <span className="why-figure">{pillar.why.figure}</span>}
          <p>{pillar.why.text}</p>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What's included" title={`${pillar.name} support`} text={pillar.note} />
          <div className="included">
            {pillar.services.map((s, i) => (
              <div key={s.title} className="included-item">
                <span className="included-num">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={s.icon} className="icon-lg" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHead eyebrow="How we work" title="Assess. Embed. Hand over." />
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.name}>
                <Icon name={s.icon} className="icon-lg" />
                <span className="steps-num">Step {i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Explore" title="The other pillars" link={{ href: "/services", label: "All services" }} />
          <div className="other-pillars">
            {others.map((p) => (
              <Link key={p.slug} href={`/services/${p.slug}`} className="other-pillar">
                <Icon name={p.icon} className="icon-lg" />
                <div>
                  <span>Pillar {p.number}</span>
                  <h3>{p.name}</h3>
                  <p>{p.short}</p>
                </div>
                <Icon name="arrowUpRight" className="other-go" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title={<>Strengthen your {pillar.name.toLowerCase()} foundations</>} text="Included with Network Membership, or available as fee-based consulting." />
    </>
  );
}
