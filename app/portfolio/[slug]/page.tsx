import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallToAction, PageHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { caseStudies, pillars } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Every slot gets a page (a static export needs at least one); unpublished ones say they're being written.
export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = caseStudies.find((x) => x.slug === slug);
  if (!s) return {};
  return s.status === "published" ? { title: `${s.codename} · Portfolio`, description: s.summary } : { title: `Case study ${s.number} · Portfolio` };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();
  if (study.status !== "published") {
    return (
      <PageHero eyebrow={`Portfolio · Case study ${study.number}`} title="This case study is being written." intro="Our first stories from the network are on their way. Check back soon." icon="seed">
        <div className="hero-actions">
          <Link href="/portfolio" className="btn btn-gold">
            <Icon name="arrowLeft" /> Back to portfolio
          </Link>
        </div>
      </PageHero>
    );
  }
  const used = pillars.filter((p) => study.pillars.includes(p.slug));

  return (
    <>
      <PageHero eyebrow={`Portfolio · Case study ${study.number}`} title={study.codename} intro={study.summary} icon="tree">
        <ul className="doc-meta">
          <li>Sector: {study.sector}</li>
          <li>Stage: {study.stage}</li>
          <li>Name withheld for confidentiality</li>
        </ul>
      </PageHero>

      {study.results.length > 0 && (
        <section className="section section-tight">
          <div className="container stat-row">
            {study.results.map((r) => (
              <div className="stat" key={r.text}>
                <span className="stat-figure">{r.figure}</span>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container case-story">
          <div className="case-block">
            <p className="eyebrow">The challenge</p>
            <p className="case-lead">{study.challenge}</p>
          </div>
          <div className="case-block">
            <p className="eyebrow">What we did</p>
            <ol className="contact-next">
              {study.approach.map((a, i) => (
                <li key={a}>
                  <span className="contact-next-num">{i + 1}</span>
                  <p className="case-step">{a}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="case-block">
            <p className="eyebrow">The outcome</p>
            <p className="case-lead">{study.outcome}</p>
          </div>
          <aside className="case-block">
            <p className="eyebrow">Pillars involved</p>
            <div className="chip-options">
              {used.map((p) => (
                <Link key={p.slug} href={`/services/${p.slug}`} className="chip-option">
                  <Icon name={p.icon} /> {p.name}
                </Link>
              ))}
            </div>
            <Link href="/portfolio" className="text-link case-back">
              <Icon name="arrowLeft" /> All case studies
            </Link>
          </aside>
        </div>
      </section>

      <CallToAction title="Could your business be next?" text="Join the network and grow alongside other members." />
    </>
  );
}
