import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { setViewMode } from "@/lib/viewMode";
import { Lavender } from "@/components/site/Botanical";
import { RouteSeo } from "@/components/site/RouteSeo";
import "@/components/site/home.css";
import { TERMS, applyTerm, ADDON_PRICE, PACKAGE_INCLUDES, EXTRA_HOUR, type TermId } from "@/lib/pricing";
import "./kiosk.css";

type Item = { id: string; c: string; t: string; d: string; p?: number; single?: boolean; b?: string };
const CATS = [
  { id: "pkg", n: "Start here", s: "Pick a package", ic: "1", h: ["Start with a ", "package"], t: "Choose your package", sub: "Pick one. You can change it any time on your call." },
  { id: "web", n: "Websites", s: "Keep it fresh", ic: "W", h: ["Keep your site ", "fresh"], t: "Website care", sub: "Tap to add what your site needs each month." },
  { id: "aut", n: "Automation", s: "Connect it all", ic: "A", h: ["Let enquiries ", "flow"], t: "Automation", sub: "Forms, bookings and emails that run themselves." },
  { id: "con", n: "Content", s: "Say it well", ic: "C", h: ["Content that ", "sounds like you"], t: "Content and marketing", sub: "Pages, posts and graphics on a steady rhythm." },
  { id: "sup", n: "Support", s: "Hand it off", ic: "S", h: ["An extra pair of ", "hands"], t: "Virtual assistance", sub: "Take the admin off your plate." },
];
const ITEMS: Item[] = [
  { id: "p1", c: "pkg", t: "Essential Website Support", d: "Up to 6 hours a month. Updates, blog posts, landing pages, backups and a monthly check-up for WordPress, Wix, Squarespace or Duda.", p: 500, single: true },
  { id: "p2", c: "pkg", t: "Content & Marketing Support", d: "Up to 12 hours a month. Everything in Essential plus newsletters, Canva graphics, social scheduling and a monthly report.", p: 800, single: true, b: "For content" },
  { id: "p3", c: "pkg", t: "Dedicated Digital Support", d: "Up to 30 hours a month. Website, content, inbox, calendar, research and SEO with same-day replies.", p: 1500, single: true },
  { id: "w1", c: "web", t: "Monthly updates", d: "Text, images, services and prices kept current." },
  { id: "w2", c: "web", t: "Speed and SEO check", d: "Faster pages and the basics Google looks for." },
  { id: "w3", c: "web", t: "Landing page edits", d: "New offers and campaign pages published fast." },
  { id: "w4", c: "web", t: "Backups and security", d: "Regular backups and plugin updates handled." },
  { id: "a1", c: "aut", t: "Form and auto reply", d: "Every enquiry gets a fast, personal reply." },
  { id: "a2", c: "aut", t: "Online booking", d: "Calendly or similar, linked to your site." },
  { id: "a3", c: "aut", t: "CRM and list sync", d: "New leads land where you already work." },
  { id: "a4", c: "aut", t: "Newsletter setup", d: "Mailchimp or MailerLite, ready to send." },
  { id: "c1", c: "con", t: "Blog publishing", d: "Posts formatted, optimised and scheduled." },
  { id: "c2", c: "con", t: "Canva graphics", d: "On-brand images for the site and socials." },
  { id: "c3", c: "con", t: "Social scheduling", d: "A steady posting rhythm without the daily chase." },
  { id: "c4", c: "con", t: "Monthly report", d: "A short summary of what changed and what is next." },
  { id: "s1", c: "sup", t: "Inbox and admin", d: "Emails sorted and routine tasks cleared." },
  { id: "s2", c: "sup", t: "Calendar management", d: "Appointments organised in your time zone." },
  { id: "s3", c: "sup", t: "Research tasks", d: "Suppliers, tools and ideas looked into for you." },
  { id: "s4", c: "sup", t: "Priority communication", d: "Faster replies when something is urgent." },
];
const money = (n: number) => `$${n.toLocaleString("en-US")} USD / month`;
const addonPrice = (id: string) => ADDON_PRICE[id] ?? 0;
const KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || "f05e4f0f-cbb4-45ca-9f3b-193145b7fe3c";

const Kiosk = () => {
  useCalendly();
  const [started, setStarted] = useState(() => { try { return sessionStorage.getItem("hv-kiosk-started") === "1"; } catch { return false; } });
  const [cat, setCat] = useState(0);
  const [dir, setDir] = useState<"l" | "r">("l");
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [term, setTerm] = useState<TermId>("m");
  const [form, setForm] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => { setViewMode("kiosk"); }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const go = (i: number) => { const n = (i + CATS.length) % CATS.length; setDir(n > cat ? "l" : "r"); setCat(n); };
  const toggle = (it: Item) => {
    setSel((s) => {
      const next = { ...s };
      if (it.single) ITEMS.forEach((x) => x.single && (next[x.id] = false));
      next[it.id] = it.single ? true : !s[it.id];
      return next;
    });
    setBump((b) => b + 1);
  };
  const chosen = ITEMS.filter((i) => sel[i.id]);
  const pkg = chosen.find((i) => i.single);
  const extras = chosen.length - (pkg ? 1 : 0);
  const c = CATS[cat];
  const covered = (i: Item) => !i.single && !!pkg && (PACKAGE_INCLUDES[pkg.id] || []).includes(i.id);
  const lineCost = (i: Item) => (i.single ? i.p || 0 : covered(i) ? 0 : addonPrice(i.id));
  const monthly = chosen.reduce((n, i) => n + lineCost(i), 0);
  const final = applyTerm(monthly, term);
  const termInfo = TERMS.find((t) => t.id === term)!;
  const planText = chosen.map((i) => `- ${i.t}${covered(i) ? " (included in package)" : ` ($${lineCost(i)}/mo)`}`).join("\n");

  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY }; };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current; drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(cat + (dx < 0 ? 1 : -1));
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) { setErr("Please add your name and a valid email."); return; }
    setErr(""); setSending(true);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: KEY, subject: `Plan request from ${form.name.trim()}`, from_name: "Haven Vertex kiosk", botcheck: "",
        name: form.name.trim(), email: form.email.trim(), service: pkg?.t || "No package chosen",
        message: `Plan built on the kiosk:\n${planText}\n\nTerm: ${termInfo.label}\nEstimated: ${money(final)}${term === "12" ? ` (${`$${(final * 12).toLocaleString("en-US")}`} paid yearly)` : ""}\nMonthly price before term discount: ${money(monthly)}`,
      }),
    }).then((r) => r.json()).then((j) => {
      if (!(j.success === true || j.success === "true")) throw new Error(j.message);
      setSentTo(form.name.trim().split(/\s+/)[0]);
    }).catch(() => setErr("Couldn't send your plan. Please email hello@havenvertex.com instead.")).finally(() => setSending(false));
  };

  return (
    <div className="kk">
      <RouteSeo />
      {!started && (
        <button type="button" className="kk-attract" aria-label="Touch to start" onClick={() => { setStarted(true); try { sessionStorage.setItem("hv-kiosk-started", "1"); } catch { /* ignore */ } }}>
          <div className="hv" aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
            <Lavender className="text-lavender" style={{ width: 120, right: "12%", bottom: -20, opacity: 0.5 }} />
            <Lavender className="text-lavender" style={{ width: 90, right: "4%", bottom: -30, opacity: 0.35 }} buds={10} />
            <Lavender className="text-lavender" style={{ width: 90, left: "6%", bottom: -30, opacity: 0.3 }} buds={10} />
          </div>
          <span className="hint">Haven Vertex · Self-order</span>
          <h2>Build your <em>website support</em> plan.</h2>
          <p>Tap what you need. See the price. Book a free call when you are ready.</p>
          <span className="kk-touch">Touch to start</span>
        </button>
      )}

      <div className="kk-wrap">
        <header className="kk-top">
          <Link to="/" className="kk-brand" onClick={() => setViewMode("classic")}>Haven Vertex<small>Connect. Automate. Elevate.</small></Link>
          <h1 key={c.id} className="kk-h">{c.h[0]}<em>{c.h[1]}</em></h1>
          <Link to="/" className="kk-switch" onClick={() => setViewMode("classic")}>Switch to classic site</Link>
        </header>

        <nav className="kk-rail" role="tablist" aria-label="Categories">
          {CATS.map((x, i) => {
            const n = ITEMS.filter((it) => it.c === x.id && sel[it.id]).length;
            return (
              <button key={x.id} type="button" role="tab" className="kk-cat" aria-selected={i === cat} onClick={() => go(i)}>
                <i>{x.ic}</i><span>{x.n}<small>{x.s}</small></span>
                {n > 0 && <b key={n} className="kk-count">{n}</b>}
              </button>
            );
          })}
        </nav>

        <section className="kk-stage" aria-live="polite" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (drag.current = null)}>
          <div key={c.id} className={`kk-pane ${dir}`}>
            <div><h2>{c.t}</h2><p className="kk-sub">{c.sub}</p></div>
            <div className="kk-grid">
              {ITEMS.filter((i) => i.c === c.id).map((i, k) => (
                <button key={i.id} type="button" className="kk-tile" style={{ ["--i" as string]: k }} aria-pressed={!!sel[i.id]} onClick={() => toggle(i)}>
                  {i.b && <span className="kk-badge">{i.b}</span>}
                  <div><div className="t">{i.t}</div><div className="d">{i.d}</div></div>
                  <div className="kk-row">
                    {i.single ? <span className="kk-price">PER MONTH<b>${i.p?.toLocaleString("en-US")}</b></span> : covered(i) ? <span className="kk-price">IN YOUR PACKAGE<b>Included</b></span> : <span className="kk-price">ADD-ON / MONTH<b>${addonPrice(i.id)}</b></span>}
                    <span className="kk-add" aria-hidden="true">+</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="kk-dots">
            <div>{CATS.map((x, i) => <i key={x.id} className={i === cat ? "on" : ""} />)}</div>
            <span className="kk-hint">Swipe or tap a category</span>
          </div>
        </section>

        <div className="kk-bar" key={bump}>
          <div className="kk-sum">
            <div className="kk-lab">{chosen.length ? `${chosen.length} ${chosen.length === 1 ? "item" : "items"} in your plan` : "Your plan"}</div>
            <div className="kk-val">
              {chosen.length ? `${money(monthly)}${extras ? `  ·  +${extras} add-on${extras > 1 ? "s" : ""}` : ""}` : "Nothing added yet"}
            </div>
          </div>
          {chosen.length > 0 && <button type="button" className="kk-clear" onClick={() => setSel({})}>Start over</button>}
          <button type="button" className="kk-go" disabled={!chosen.length} onClick={() => { setSentTo(null); setErr(""); setOpen(true); }}>Review my plan</button>
        </div>
      </div>

      {open && (
        <div className="kk-ov" role="dialog" aria-modal="true" aria-labelledby="kk-oh" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="kk-sheet">
            {sentTo !== null ? (
              <>
                <h3 id="kk-oh">Thank you{sentTo ? `, ${sentTo}` : ""}!</h3>
                <p className="kk-note" style={{ fontSize: 17 }}>Your plan is on its way to me. I'll reply within 1 to 2 business days. Want to talk sooner? Book a free 30 minute call.</p>
                <div className="kk-acts">
                  <a className="kk-a1" href="https://calendly.com/havenvertex/30min" onClick={openCalendly("https://calendly.com/havenvertex/30min")} target="_blank" rel="noopener noreferrer">Book my free call</a>
                  <button type="button" className="kk-a2" onClick={() => { setOpen(false); setSel({}); }}>Done</button>
                </div>
              </>
            ) : (
              <>
                <h3 id="kk-oh">Your plan</h3>
                <div>
                  {chosen.map((i) => (
                    <div className="kk-line" key={i.id}><span>{i.t}<small>{i.d}</small></span><span>{covered(i) ? "Included" : `$${lineCost(i).toLocaleString("en-US")} / mo`}</span></div>
                  ))}
                </div>
                <div className="kk-terms" role="radiogroup" aria-label="Plan length">
                  {TERMS.map((t) => (
                    <button key={t.id} type="button" role="radio" aria-checked={term === t.id} onClick={() => setTerm(t.id)}>
                      <b>{t.short}</b><small>{t.off ? `${Math.round(t.off * 100)}% off` : "No lock-in"}</small>
                    </button>
                  ))}
                </div>
                <p className="kk-note">{termInfo.note}</p>
                <div className="kk-total"><span>Estimated</span><span>{money(final)}</span></div>
                {term === "12" && <p className="kk-note">That is ${(final * 12).toLocaleString("en-US")} USD paid once a year.</p>}
                <p className="kk-note">This is an estimate. Plans are paid in advance and nothing is charged here. Extra hours are ${EXTRA_HOUR} an hour. We confirm everything on your free call.</p>
                <form onSubmit={send} className="kk-form" noValidate>
                  <input aria-label="Your name" placeholder="Your name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <input aria-label="Your email" placeholder="Your email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {err && <p className="kk-note" style={{ gridColumn: "1/-1", color: "#a1204a" }} role="alert">{err}</p>}
                  <div className="kk-acts" style={{ gridColumn: "1/-1" }}>
                    <button type="submit" className="kk-a1" disabled={sending}>{sending ? "Sending..." : "Send me this plan"}</button>
                    <a className="kk-a2" href="https://calendly.com/havenvertex/30min" onClick={openCalendly("https://calendly.com/havenvertex/30min")} target="_blank" rel="noopener noreferrer">Book a free call instead</a>
                  </div>
                </form>
                <button type="button" className="kk-note" style={{ background: "none", border: 0, textDecoration: "underline", textAlign: "left", padding: 0 }} onClick={() => setOpen(false)}>Keep choosing</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kiosk;
