import { site } from "@/lib/site";

// Sends contact-form enquiries by email through Resend (resend.com) when these are set:
//   RESEND_API_KEY   your Resend API key
//   CONTACT_FROM     a sender on a domain verified in Resend, e.g. "Mustard Seed <website@yourdomain.co.uk>"
//   CONTACT_TO       where enquiries go (defaults to the email in lib/site.ts)
// Without them the route answers 503 and the form lets the visitor send it from their own email app.

type Body = { name?: string; email?: string; business?: string; stage?: string; interests?: string[]; message?: string; website?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true }); // honeypot: quietly ignore bots

  const name = (body.name ?? "").trim().slice(0, 100);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 4000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please add your name, a valid email address and a message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) return Response.json({ error: "Email sending is not set up." }, { status: 503 });

  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (body.business) lines.push(`Business: ${body.business.slice(0, 150)}`);
  if (body.stage) lines.push(`Stage: ${body.stage.slice(0, 100)}`);
  if (body.interests?.length) lines.push(`Interested in: ${body.interests.slice(0, 4).join(", ")}`);
  const text = [...lines, "", message].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: process.env.CONTACT_TO || site.email, reply_to: email, subject: `Website enquiry from ${name}`, text }),
  });
  if (!res.ok) return Response.json({ error: "Could not send right now." }, { status: 502 });
  return Response.json({ ok: true });
}
