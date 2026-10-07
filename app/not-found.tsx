import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <div className="container page-hero-inner">
        <div className="page-hero-icon">
          <Icon name="seed" />
        </div>
        <p className="eyebrow">Page not found</p>
        <h1>This seed hasn&apos;t sprouted yet.</h1>
        <p className="page-hero-intro">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-gold">
            Back to home <Icon name="arrow" />
          </Link>
          <Link href="/services" className="text-link light">
            Our services <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
