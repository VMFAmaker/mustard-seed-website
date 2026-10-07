import Link from "next/link";
import { documents, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-left">
          <Link href="/" className="footer-brand">
            Mustard Seed<span>.</span>
          </Link>
          <p className="footer-tag">{site.tagline}</p>
          <p className="footer-big">
            Grow your
            <br />
            business
          </p>
          <Link href="/contact" className="footer-contact">
            Contact
          </Link>
        </div>

        <div className="footer-divider" aria-hidden />

        <div className="footer-right">
          <h2>Info</h2>
          <p>Email us:</p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          {site.phone && (
            <>
              <p>Contact number:</p>
              <p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </p>
            </>
          )}

          <h2>Address</h2>
          {(site.address ?? [site.legalName, site.location]).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <a href="#top" className="back-to-top" aria-label="Back to top">
          <svg viewBox="0 0 52 76" aria-hidden>
            <path d="M26 74V3M4 25L26 3l22 22" />
          </svg>
        </a>
      </div>

      <div className="footer-legal">
        <div className="container">
          <p className="legal-copy">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            {site.companyNumber && <> Registered in England &amp; Wales, company no. {site.companyNumber}.</>}
          </p>
          <ul className="legal-links">
            {documents.map((d) => (
              <li key={d.slug}>
                <Link href={`/documents/${d.slug}`}>{d.short}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
