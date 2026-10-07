import Link from "next/link";
import Icon from "@/components/Icon";
import { pillars, type CaseStudy } from "@/lib/site";

export default function CaseCard({ study }: { study: CaseStudy }) {
  const published = study.status === "published";
  const used = pillars.filter((p) => study.pillars.includes(p.slug));
  const body = (
    <>
      <div className="case-top">
        <span className="case-num">Case study {study.number}</span>
        <span className={`case-status${published ? " is-live" : ""}`}>{published ? "Network member" : "To be developed"}</span>
      </div>
      <div className="case-mark">
        <Icon name={published ? "tree" : "seed"} className="icon-lg" />
      </div>
      <h3>{study.codename}</h3>
      <dl className="case-facts">
        <div>
          <dt>Sector</dt>
          <dd>{study.sector}</dd>
        </div>
        <div>
          <dt>Stage</dt>
          <dd>{study.stage}</dd>
        </div>
        <div>
          <dt>Pillars</dt>
          <dd className="case-pillars">
            {used.length ? used.map((p) => <Icon key={p.slug} name={p.icon} title={p.name} />) : "To be developed"}
          </dd>
        </div>
      </dl>
      <p>{study.summary}</p>
      {published && (
        <span className="case-go">
          Read the case study <Icon name="arrow" />
        </span>
      )}
    </>
  );

  return published ? (
    <Link href={`/portfolio/${study.slug}`} className="case-card">
      {body}
    </Link>
  ) : (
    <article className="case-card is-pending">{body}</article>
  );
}
