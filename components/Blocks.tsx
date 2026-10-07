import Link from "next/link";
import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";

export function PageHero({ eyebrow, title, intro, icon, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; icon?: IconName; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        {icon && (
          <div className="page-hero-icon">
            <Icon name={icon} />
          </div>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {intro && <p className="page-hero-intro">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, text, link }: { eyebrow: string; title: ReactNode; text?: ReactNode; link?: { href: string; label: string } }) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {(text || link) && (
        <div className="section-head-side">
          {text && <p>{text}</p>}
          {link && (
            <Link href={link.href} className="text-link">
              {link.label} <Icon name="arrow" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export function CallToAction({ title = "Ready to grow?", text = "Tell us about your business. It starts with a conversation." }: { title?: ReactNode; text?: ReactNode }) {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">Faith · Purpose · Growth</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link href="/contact" className="btn btn-gold btn-lg">
          Book a conversation <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
