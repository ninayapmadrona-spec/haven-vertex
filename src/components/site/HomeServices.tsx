import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const items = [
  { big: "WEB", title: "Website management", tag: "FROM $500 USD / MONTH", blurb: "Monthly updates, fixes, speed, security and SEO across Wix, Squarespace, Duda and WordPress.", head: ["Websites that stay ", "fresh", " and fast."], text: "Your site is checked, updated and sped up every month, with backups and SEO included.", chips: ["Updates", "SEO", "Speed", "Backups"] },
  { big: "AUTO", title: "Automation", tag: "CONNECT", blurb: "Forms, emails, bookings and CRM steps connected so enquiries never slip through.", head: ["Enquiries that ", "answer", " themselves."], text: "Every form submission triggers a reply, a calendar link and a CRM entry without you lifting a finger.", chips: ["Forms", "Email", "Calendly", "CRM"] },
  { big: "SEO", title: "Content and marketing", tag: "ELEVATE", blurb: "Pages, posts and graphics that keep the site and socials consistent.", head: ["Content that ", "sounds", " like you."], text: "Pages, posts and graphics made to match your brand and published on a steady rhythm.", chips: ["Pages", "Blog", "Social", "Graphics"] },
  { big: "VA", title: "Virtual assistance", tag: "SUPPORT", blurb: "Inbox, scheduling and admin handled so your day stays clear.", head: ["An extra pair of ", "capable", " hands."], text: "Inbox, scheduling and admin handled in hours that overlap with your time zone.", chips: ["Inbox", "Calendar", "Admin", "Reports"] },
];

export const HomeServices = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="hv container py-20 lg:py-28" aria-labelledby="home-services-heading">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 id="home-services-heading" className="max-w-[16ch] text-balance font-serif text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
          Website management, <em style={{ fontStyle: "normal", opacity: 0.55 }}>maintenance</em> and virtual assistant support.
        </h2>
        <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          Most small businesses do not need an agency. They need someone dependable who knows their site, answers quickly and fixes things before customers notice. That is the job: ongoing website maintenance, content publishing and SEO support for WordPress, Wix, Squarespace and Duda, plus the admin that keeps your business moving. Flexible hours overlap with your time zone.
        </p>
      </div>

      <div className="hv-accs">
        {items.map((s, k) => {
          const isOpen = open === k;
          return (
            <div key={s.title} className="hv-acc" data-open={isOpen}>
              <button type="button" aria-expanded={isOpen} aria-controls={`hv-acc-${k}`} onClick={() => setOpen(isOpen ? null : k)}>
                <span className="hv-acc-t font-serif">{s.title}</span>
                <span className="hv-acc-tag">{s.tag}</span>
                <span className="hv-acc-big font-serif" aria-hidden="true">{s.big}</span>
              </button>
              <div id={`hv-acc-${k}`} className="hv-acc-body" role="region" aria-label={s.title}>
                <div>
                  <h4 className="font-serif">{s.head[0]}<em style={{ fontStyle: "normal", opacity: 0.7 }}>{s.head[1]}</em>{s.head[2]}</h4>
                  <p>{s.text}</p>
                  <div className="hv-chips">{s.chips.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-sm">
        <Link to="/services" className="font-semibold text-primary underline underline-offset-4">See all services and pricing</Link>
      </p>
    </section>
  );
};
