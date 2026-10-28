import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { TERMS, PAYMENT_TERMS, EXTRA_HOUR } from "@/lib/pricing";
import { setViewMode } from "@/lib/viewMode";

const packages = [
  { n: "Essential Website Support", p: 500 },
  { n: "Content & Marketing Support", p: 800 },
  { n: "Dedicated Digital Support", p: 1500 },
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
                      {t.id === "12" && <div className="text-xs text-muted-foreground">{fmt(m * 12)} paid upfront for the year</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Extra hours are ${EXTRA_HOUR} an hour, agreed with you first.</p>
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
