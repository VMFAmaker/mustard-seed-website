import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/Blocks";
import Icon from "@/components/Icon";
import { documents } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
type DocContent = { meta: string[]; control: [string, string][]; html: string; toc: [string, string][] };

// Content is generated from the Word documents by scripts/convert-docs.py
async function load(slug: string): Promise<DocContent> {
  const file = path.join(process.cwd(), "content", "documents", `${slug}.json`);
  return JSON.parse(await fs.readFile(file, "utf-8"));
}

export function generateStaticParams() {
  return documents.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = documents.find((d) => d.slug === slug);
  return doc ? { title: doc.title } : {};
}

export default async function DocumentPage({ params }: Props) {
  const { slug } = await params;
  const doc = documents.find((d) => d.slug === slug);
  if (!doc) notFound();
  const content = await load(slug);
  const details = [...content.meta, ...content.control.filter(([k]) => !/^(version|effective date)$/i.test(k)).map(([k, v]) => `${k}: ${v}`)];

  return (
    <>
      <PageHero eyebrow="Mustard Seed Ltd · Documents" title={doc.title}>
        <ul className="doc-meta">
          {details.map((m) => (
            <li key={m} dangerouslySetInnerHTML={{ __html: m }} />
          ))}
        </ul>
      </PageHero>

      <section className="section">
        <div className="container doc-layout">
          <aside className="doc-toc">
            <p className="eyebrow">On this page</p>
            <nav>
              {content.toc.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
            </nav>
            <Link href="/documents" className="text-link">
              <Icon name="arrowLeft" /> All documents
            </Link>
          </aside>
          <article className="doc-body" dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>
      </section>
    </>
  );
}
