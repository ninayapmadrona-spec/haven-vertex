import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { TERMS, PAYMENT_TERMS, EXTRA_HOUR, BUILDS } from "@/lib/pricing";
import { StartPlan } from "./StartPlan";
import { setViewMode } from "@/lib/viewMode";

const packages = [
  { n: "Essential Website Support", p: 500, h: 25 },
  { n: "Content & Marketing Support", p: 800, h: 40 },
  { n: "Dedicated Digital Support", p: 1500, h: 75 },
];
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export const ServicesPricing = () => (
  <>
    <section className="container pb-20 lg:pb-28" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className="max-w-[20ch] text-balance font-serif text-4xl leading-[1.05] sm:text-5xl">
        Save more when you <em style={{ fontStyle: "normal", opacity: 0.55 }}>commit</em>.
      </h2>
      <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">
        Every plan is month to month by default. Choose a longer term and the monthly price drops. All prices are in USD.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-sm text-muted-foreground">
              <th className="py-3 pr-4 font-medium">Package</th>
              {TERMS.map((t) => (
                <th key={t.id} className="py-3 pr-4 font-medium">
                  {t.label}
                  {t.off > 0 && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-lavender-deep">{Math.round(t.off * 100)}% off</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packages.map((k) => (
              <tr key={k.n} className="border-b border-border/60">
                <th scope="row" className="py-4 pr-4 font-serif text-xl font-normal">{k.n}</th>
                {TERMS.map((t) => {
                  const m = Math.round(k.p * (1 - t.off));
                  return (
                    <td key={t.id} className="py-4 pr-4">
                      <span className="font-serif text-2xl">{fmt(m)}</span> <span className="text-sm text-muted-foreground">/ month</span>
                      <div className="text-xs text-muted-foreground">{k.h} hours a month</div>
                      {t.id === "12" && <div className="text-xs text-muted-foreground">{fmt(m * 12)} paid upfront for the year</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">
        Each plan works out to about $20 an hour when you use every hour, and that includes website skills, not just admin. In Australia, freelance virtual assistants typically charge AU$35 to AU$65 an hour, and agency website retainers often start around AU$2,500 a month.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">Extra hours are ${EXTRA_HOUR} an hour, agreed with you first.</p>
    </section>

    <section className="container pb-20 lg:pb-28" aria-labelledby="build-heading">
      <h2 id="build-heading" className="max-w-[20ch] text-balance font-serif text-4xl leading-[1.05] sm:text-5xl">
        Only need a new <em style={{ fontStyle: "normal", opacity: 0.55 }}>website</em>?
      </h2>
      <p className="mt-4 max-w-[62ch] text-lg text-muted-foreground">
        Fixed prices, agreed before we start. No monthly plan needed. In Australia, small agencies commonly quote AU$2,000 to AU$5,000 for a landing page and AU$5,000 to AU$15,000 for a 5 to 10 page business site.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {BUILDS.map((b) => (
          <article key={b.id} className="flex flex-col rounded-3xl border border-lavender/80 bg-card p-7 shadow-soft">
            <h3 className="font-serif text-2xl">{b.name}</h3>
            <p className="mt-2 text-lavender-deep"><span className="text-sm">From</span> <span className="font-serif text-3xl">{fmt(b.price)}</span> <span className="text-sm text-muted-foreground">USD</span></p>
            <p className="mt-1 text-sm text-muted-foreground">{b.pages} · {b.time}</p>
            <ul className="mt-5 grid gap-2.5">
              {b.includes.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-lavender-deep" /><span>{x}</span></li>
              ))}
            </ul>
            <StartPlan build plan={b.name} price={b.price} className="mt-auto h-12 rounded-full border border-primary/40 font-bold text-primary transition-colors hover:bg-accent">Book this build</StartPlan>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-[70ch] text-[15px] leading-relaxed text-muted-foreground">
        Prices are fixed for the pages listed. 50% deposit to book, 50% when the site is ready to launch. Extra pages are quoted before I add them. Bigger or custom projects, such as memberships or bookings, are quoted after a free call. Add a monthly plan after launch if you want me to look after the site.
      </p>
    </section>

    <section className="container pb-20 lg:pb-28" aria-labelledby="payment-heading">
      <h2 id="payment-heading" className="font-serif text-4xl leading-[1.05] sm:text-5xl">
        How payment <em style={{ fontStyle: "normal", opacity: 0.55 }}>works</em>
      </h2>
      <ul className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {PAYMENT_TERMS.map((x) => (
          <li key={x.t} className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 flex-shrink-0 text-lavender-deep" />
            <div>
              <h3 className="font-sans text-base font-bold">{x.t}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{x.p}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12 rounded-3xl bg-plum p-8 text-[#F1EAFF] lg:p-10">
        <h3 className="font-serif text-3xl">Want something in between?</h3>
        <p className="mt-2 max-w-[56ch] opacity-85">Build your own plan: pick only the tasks you need and see the monthly price as you go.</p>
        <Link to="/kiosk" onClick={() => setViewMode("kiosk")} className="mt-6 inline-block rounded-full bg-[#CDB4F7] px-6 py-3 font-bold text-[#2a1745] transition-transform hover:-translate-y-0.5">
          Build your own plan
        </Link>
      </div>
    </section>
  </>
);
