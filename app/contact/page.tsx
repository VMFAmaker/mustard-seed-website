import type { Metadata } from "next";
import { PageHero } from "@/components/Blocks";
import ContactForm from "@/components/ContactForm";
import Icon, { type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Mustard Seed to talk about growing your business." };

const next: { icon: IconName; name: string; text: string }[] = [
  { icon: "mail", name: "Reach out", text: "Tell us a little about your business." },
  { icon: "chat", name: "Talk it through", text: "A first conversation to see if we're a good fit." },
  { icon: "seed", name: "Diagnostic", text: "Three months to research, plan and agree direction." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let&apos;s grow something<br />that lasts.</>} intro="Tell us about your business and where you want to take it." />

      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-info">
            <div className="contact-detail">
              <Icon name="mail" className="icon-lg" />
              <div>
                <span>Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
            {site.phone && (
              <div className="contact-detail">
                <Icon name="phone" className="icon-lg" />
                <div>
                  <span>Phone</span>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </div>
              </div>
            )}
            <div className="contact-detail">
              <Icon name="pin" className="icon-lg" />
              <div>
                <span>Based in</span>
                <p>{site.address ? site.address.join(", ") : site.location}</p>
              </div>
            </div>

            <h2 className="contact-next-title">What happens next</h2>
            <ol className="contact-next">
              {next.map((n, i) => (
                <li key={n.name}>
                  <span className="contact-next-num">{i + 1}</span>
                  <div>
                    <h3>{n.name}</h3>
                    <p>{n.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <div className="contact-card">
            <h2>Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
