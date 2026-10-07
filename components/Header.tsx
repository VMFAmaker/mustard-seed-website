"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { nav, pillars } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="container header-bar">
        <Link href="/" className="brand" onClick={close} aria-label="Mustard Seed home">
          <span className="brand-mark">
            <Image src="/brand/mark.png" alt="" width={44} height={44} priority />
          </span>
          <span className="brand-name">Mustard Seed</span>
        </Link>

        <nav className="main-nav" aria-label="Main">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div className="nav-drop" key={item.href}>
                <Link href="/services" className={isActive("/services") ? "active" : ""} onClick={close}>
                  Services <span className="caret" aria-hidden>&#9662;</span>
                </Link>
                <div className="drop-panel">
                  {pillars.map((p) => (
                    <Link key={p.slug} href={`/services/${p.slug}`} className="drop-item" onClick={close}>
                      <Icon name={p.icon} />
                      <span>
                        <strong>{p.name}</strong>
                        <small>{p.short}</small>
                      </span>
                    </Link>
                  ))}
                  <Link href="/services" className="drop-all" onClick={close}>
                    All services <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "active" : ""} onClick={close}>
                {item.label}
              </Link>
            ),
          )}
          <Link href="/contact" className="btn btn-gold nav-cta" onClick={close}>
            Book a conversation
          </Link>
        </nav>

        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
