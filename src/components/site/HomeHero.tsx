import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { Flower, Sprig } from "./Botanical";
import { ART } from "./HomeArt";
import "./home.css";

const slides = [
  { ghost: "Sites", title: ["Websites that stay ", "fresh", " and fast."], text: "Updates, fixes, speed and SEO handled every month on Wix, Squarespace, WordPress and custom builds.", chips: ["Updates", "SEO", "Speed", "Backups"] },
  { ghost: "Flow", title: ["Enquiries that ", "answer", " themselves."], text: "Forms, emails, bookings and CRM steps connected, so every lead gets a fast, personal reply.", chips: ["Forms", "Email", "Calendly", "CRM"] },
  { ghost: "Story", title: ["Content that ", "sounds", " like you."], text: "Pages, posts and graphics produced to match your brand and keep the site worth visiting.", chips: ["Pages", "Blog", "Social", "Graphics"] },
  { ghost: "Calm", title: ["An extra pair of ", "capable", " hands."], text: "Inbox, scheduling and admin taken off your plate, in hours that overlap with yours.", chips: ["Inbox", "Calendar", "Admin", "Reports"] },
];

// Decorations per slide: [kind, style]
const decos: Array<Array<["s" | "f", React.CSSProperties]>> = [
  [["s", { width: 110, left: "2%", bottom: -18 }], ["s", { width: 80, left: "11%", bottom: -24, ["--o" as string]: 0.14 }], ["f", { width: 150, right: -30, top: -34 }]],
  [["f", { width: 190, left: -50, top: -60 }], ["s", { width: 120, right: "3%", bottom: -20 }]],
  [["s", { width: 100, left: "46%", bottom: -20 }], ["f", { width: 130, right: "6%", top: -40 }], ["s", { width: 70, left: "3%", bottom: -18, ["--o" as string]: 0.15 }]],
  [["f", { width: 170, right: -40, bottom: -50 }], ["s", { width: 105, left: "4%", bottom: -18 }]],
];

export const HomeHero = () => {
  useCalendly();
  const { content: contact } = useFinalCtaContact();
  const calendlyUrl = contact.calendlyUrl;
  const [cur, setCur] = useState(0);
  const paused = useRef(false);
  const timer = useRef<number>();

  const go = useCallback((i: number) => setCur((i + slides.length) % slides.length), []);
  const restart = useCallback(() => {
    window.clearInterval(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => {
      if (!paused.current) setCur((c) => (c + 1) % slides.length);
    }, 5600);
  }, []);
  useEffect(() => {
    restart();
    return () => window.clearInterval(timer.current);
  }, [restart]);

  return (
    <section className="hv relative overflow-hidden pt-32 lg:pt-36">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Flower className="text-lavender opacity-40" style={{ width: 300, right: -110, top: 40 }} />
        <Sprig className="text-lavender opacity-60" style={{ width: 120, left: -10, bottom: 40 }} />
      </div>
      <div className="container relative">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Connect. Automate. Elevate.</p>
            <h1 className="hv-hero-h1 mt-4 max-w-[14ch] text-balance font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="sr-only">Website management for small businesses: </span>
              Your website, <em>quietly</em> taken care of.
            </h1>
          </div>
          <div className="grid max-w-sm gap-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I manage, automate and grow websites for small businesses in Australia, the USA, the UK and Canada, so you can get on with the work you love.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={calendlyUrl} onClick={openCalendly(calendlyUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
                Book a free call
              </a>
              <Link to="/portfolio" className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold text-ink transition-smooth hover:bg-white/60">
                See my work
              </Link>
            </div>
          </div>
        </div>

        <div className="hv-feature" role="region" aria-roledescription="carousel" aria-label="What I do" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
          <div className="hv-track" style={{ transform: `translateX(-${cur * 100}%)` }}>
            {slides.map((s, i) => (
              <div key={s.ghost} className={`hv-slide${i === cur ? " cur" : ""}`} aria-hidden={i !== cur}>
                <div className="hv-deco" aria-hidden="true">
                  {decos[i].map(([k, st], j) => (k === "s" ? <Sprig key={j} style={st} /> : <Flower key={j} style={st} />))}
                </div>
                <div className="hv-ghost" aria-hidden="true">{s.ghost}</div>
                <div className="hv-copy">
                  <div>
                    <h2 className="font-serif">{s.title[0]}<em style={{ fontStyle: "normal", opacity: 0.55 }}>{s.title[1]}</em>{s.title[2]}</h2>
                    <p>{s.text}</p>
                  </div>
                  <div className="hv-chips">{s.chips.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
                <div className="hv-art"><div className="hv-artbox">{ART[i]}</div></div>
              </div>
            ))}
          </div>
          <div className="hv-ctrl">
            <button type="button" aria-label="Previous slide" onClick={() => { go(cur - 1); restart(); }}>←</button>
            <button type="button" aria-label="Next slide" onClick={() => { go(cur + 1); restart(); }}>→</button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="hv-dots">
            {slides.map((s, i) => (
              <button key={s.ghost} type="button" className={i === cur ? "on" : ""} aria-label={`Show slide ${i + 1}`} onClick={() => { go(i); restart(); }} />
            ))}
          </div>
          <p className="font-mono text-xs tracking-wide text-muted-foreground">Slides on its own. Use the arrows or dots to look around.</p>
        </div>
      </div>
    </section>
  );
};
