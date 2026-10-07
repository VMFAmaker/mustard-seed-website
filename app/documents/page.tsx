import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { documentGroups, documents } from "@/lib/site";

export const metadata: Metadata = { title: "Documents", description: "Mustard Seed policies, terms and agreements." };

export default function DocumentsPage() {
  return (
    <>
      <PageHero eyebrow="Documents" title="Policies & terms" intro="How we work, how we protect your information, and the terms we work to." />
      <section className="section">
        <div className="container doc-index">
          {documentGroups.map((g) => (
            <div key={g.key} className="doc-group">
              <h2>{g.label}</h2>
              <ul>
                {documents
                  .filter((d) => d.group === g.key)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link href={`/documents/${d.slug}`}>
                        <Icon name="doc" />
                        <span>{d.title}</span>
                        <Icon name="arrow" className="doc-go" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
