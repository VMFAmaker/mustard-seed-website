"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/components/Icon";
import { pillars, site } from "@/lib/site";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "manual"; mailto: string; text: string } | { kind: "error"; message: string };

const stages = ["Just starting out", "0–2 years, some revenue", "2–5 years, ready to scale", "Established, hitting a ceiling"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [interests, setInterests] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const toggle = (name: string) => setInterests((cur) => (cur.includes(name) ? cur.filter((x) => x !== name) : [...cur, name]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      business: String(form.get("business") ?? "").trim(),
      stage: String(form.get("stage") ?? ""),
      interests,
      message: String(form.get("message") ?? "").trim(),
      website: String(form.get("website") ?? ""), // honeypot
    };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) return setStatus({ kind: "sent" });
      const body = await res.json().catch(() => ({}));
      if (res.status === 400) return setStatus({ kind: "error", message: body.error ?? "Please check the form and try again." });
    } catch {
      /* fall through to the email option */
    }
    // No email service connected yet (or offline): let the visitor send it from their own email app.
    const lines = [`Name: ${data.name}`, `Email: ${data.email}`];
    if (data.business) lines.push(`Business: ${data.business}`);
    if (data.stage) lines.push(`Stage: ${data.stage}`);
    if (data.interests.length) lines.push(`Interested in: ${data.interests.join(", ")}`);
    const text = [...lines, "", data.message].join("\n");
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry from ${data.name}${data.business ? ` (${data.business})` : ""}`)}&body=${encodeURIComponent(text)}`;
    setStatus({ kind: "manual", mailto, text });
  }

  if (status.kind === "sent") {
    return (
      <div className="form-done">
        <Icon name="check" className="icon-lg" />
        <h3>Thank you, your message has been sent.</h3>
        <p>We'll be in touch soon to arrange a first conversation.</p>
      </div>
    );
  }

  if (status.kind === "manual") {
    return (
      <div className="form-done">
        <Icon name="mail" className="icon-lg" />
        <h3>Your message is ready to send</h3>
        <p>
          Open it in your email app, or copy it and send it to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <pre className="form-preview">{status.text}</pre>
        <div className="form-done-actions">
          <a href={status.mailto} className="btn btn-gold">
            Open in email app <Icon name="arrow" />
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              navigator.clipboard?.writeText(`To: ${site.email}\n\n${status.text}`).then(() => setCopied(true));
            }}
          >
            <Icon name="copy" /> {copied ? "Copied" : "Copy message"}
          </button>
        </div>
        <button type="button" className="text-link form-back" onClick={() => setStatus({ kind: "idle" })}>
          <Icon name="arrowLeft" /> Edit message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label className="field">
          <span>Your name</span>
          <input name="name" required autoComplete="name" maxLength={100} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={200} />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Business name</span>
          <input name="business" autoComplete="organization" maxLength={150} />
        </label>
        <label className="field">
          <span>Where is your business?</span>
          <select name="stage" defaultValue="">
            <option value="">Choose one</option>
            {stages.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="field">
        <legend>What would you like help with?</legend>
        <div className="chip-options">
          {pillars.map((p) => (
            <button type="button" key={p.slug} className={`chip-option${interests.includes(p.name) ? " on" : ""}`} aria-pressed={interests.includes(p.name)} onClick={() => toggle(p.name)}>
              <Icon name={p.icon} /> {p.name}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="field">
        <span>Tell us about your business</span>
        <textarea name="message" required rows={5} maxLength={4000} placeholder="What you do, where you want to grow, and what's holding you back." />
      </label>
      <label className="hp" aria-hidden>
        Leave this empty <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {status.kind === "error" && <p className="form-error">{status.message}</p>}
      <button type="submit" className="btn btn-gold btn-lg" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : "Send message"} <Icon name="arrow" />
      </button>
    </form>
  );
}
