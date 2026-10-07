import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction, PageHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { pillars } from "@/lib/site";

export const metadata: Metadata = { title: "Services", description: "Operational, marketing, financial and legal support from Mustard Seed." };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Four pillars,<br />deeply rooted.</>} intro="Hands-on support across the whole business. Network members get all four." />

      <section className="section">
        <div className="container service-list">
          {pillars.map((p) => (
            <Link key={p.slug} href={`/services/${p.slug}`} className="service-row">
              <span className="service-num">{p.number}</span>
              <Icon name={p.icon} className="icon-xl" />
              <div className="service-main">
                <h2>{p.name}</h2>
                <p>{p.intro}</p>
              </div>
              <ul className="service-tags">
                {p.services.map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
              <span className="service-go" aria-hidden>
                <Icon name="arrowUpRight" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
