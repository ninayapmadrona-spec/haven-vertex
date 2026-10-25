import { useState } from "react";
import { Link } from "react-router-dom";
import { Flower, Sprig } from "./Botanical";
import { ART } from "./HomeArt";
import "./home.css";

const items = [
  { title: "Website management", tag: "FROM $500 USD / MONTH", blurb: "Monthly updates, fixes, speed, security and SEO across Wix, Squarespace and WordPress.", head: ["Websites that stay ", "fresh", " and fast."], text: "Your site is checked, updated and sped up every month, with backups and SEO included.", chips: ["Updates", "SEO", "Speed", "Backups"] },
  { title: "Automation", tag: "CONNECT", blurb: "Forms, emails, bookings and CRM steps connected so enquiries never slip through.", head: ["Enquiries that ", "answer", " themselves."], text: "Every form submission triggers a reply, a calendar link and a CRM entry without you lifting a finger.", chips: ["Forms", "Email", "Calendly", "CRM"] },
  { title: "Content and marketing", tag: "ELEVATE", blurb: "Pages, posts and graphics that keep the site and socials consistent.", head: ["Content that ", "sounds", " like you."], text: "Pages, posts and graphics made to match your brand and published on a steady rhythm.", chips: ["Pages", "Blog", "Social", "Graphics"] },
  { title: "Virtual assistance", tag: "SUPPORT", blurb: "Inbox, scheduling and admin handled so your day stays clear.", head: ["An extra pair of ", "capable", " hands."], text: "Inbox, scheduling and admin handled in hours that overlap with your time zone.", chips: ["Inbox", "Calendar", "Admin", "Reports"] },
];

export const HomeServices = () => {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const [shown, setShown] = useState(0);
  const pick = (k: number) => {
    if (k === i) return;
    setI(k);
    setOut(true);
    window.setTimeout(() => { setShown(k); setOut(false); }, 300);
  };
  const d = items[shown];

  return (
    <section className="hv container py-20 lg:py-28" aria-labelledby="home-services-heading">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <h2 id="home-services-heading" className="max-w-[16ch] text-balance font-serif text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
          Website management, <em style={{ fontStyle: "normal", opacity: 0.55 }}>maintenance</em> and virtual assistant support.
        </h2>
        <p className="max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          Most small businesses do not need an agency. They need someone dependable who knows their site, answers quickly and fixes things before customers notice. That is the job: ongoing website maintenance, content publishing and SEO support for WordPress, Wix and Squarespace, plus the admin that keeps your business moving. Flexible hours overlap with your time zone.
        </p>
      </div>

      <div className="hv-svcwrap">
        <div className="hv-svc" role="tablist" aria-label="Services">
          {items.map((s, k) => (
            <button key={s.title} type="button" role="tab" aria-selected={k === i} onClick={() => pick(k)}>
              <h3 className="font-serif">{s.title}</h3>
              <span>{s.tag}</span>
              <p>{s.blurb}</p>
            </button>
          ))}
          <p className="pt-6 text-sm text-muted-foreground" style={{ all: "unset", display: "block", paddingTop: 24, fontSize: 14 }}>
            <Link to="/services" className="font-semibold text-primary underline underline-offset-4">See all services and pricing</Link>
          </p>
        </div>

        <div className="hv-panel" aria-live="polite">
          <div className="hv-deco" aria-hidden="true">
            <Sprig className="text-lavender" style={{ width: 90, right: "4%", bottom: -16 }} />
            <Flower className="text-lavender" style={{ width: 140, left: -40, top: -40 }} />
          </div>
          <div className={`hv-ptxt${out ? " out" : ""}`}>
            <h4 className="font-serif">{d.head[0]}<em style={{ fontStyle: "normal", opacity: 0.55 }}>{d.head[1]}</em>{d.head[2]}</h4>
            <p>{d.text}</p>
          </div>
          <div className="hv-artbox">
            {ART.map((a, k) => <div key={k} className={k === i ? "on" : ""}>{a}</div>)}
          </div>
          <div className="hv-chips">{d.chips.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
      </div>
    </section>
  );
};
