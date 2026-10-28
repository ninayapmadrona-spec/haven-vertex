import { useEffect, useRef, useState } from "react";
import { TERMS, CURRENCIES, applyTerm, type TermId } from "@/lib/pricing";

const KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || "f05e4f0f-cbb4-45ca-9f3b-193145b7fe3c";

type Props = { plan: string; price: number; className?: string; children?: React.ReactNode };

export const StartPlan = ({ plan, price, className, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [term, setTerm] = useState<TermId>("m");
  const [cur, setCur] = useState<string>("USD");
  const [f, setF] = useState({ name: "", email: "", site: "" });
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const close = () => { if (state === "done") setState("idle"); };
    d.addEventListener("close", close);
    return () => d.removeEventListener("close", close);
  }, [state]);

  const monthly = applyTerm(price, term);
  const t = TERMS.find((x) => x.id === term)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email)) { setErr("Please add your name and a valid email."); return; }
    setErr(""); setState("sending");
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: KEY, subject: `Invoice request: ${plan} (${t.short}) from ${f.name.trim()}`, from_name: "Haven Vertex website", botcheck: "",
        name: f.name.trim(), email: f.email.trim(), service: plan,
        message: `Invoice request\nPlan: ${plan}\nTerm: ${t.label}\nPrice: $${monthly} USD / month${term === "12" ? ` ($${monthly * 12} USD paid yearly)` : ""}\nPay in currency: ${cur}\nWebsite: ${f.site.trim() || "not given"}`,
      }),
    }).then((r) => r.json()).then((j) => {
      if (!(j.success === true || j.success === "true")) throw new Error(j.message);
      setState("done");
    }).catch(() => { setErr("Couldn't send your request. Please email hello@havenvertex.com instead."); setState("idle"); });
  };

  return (
    <>
      <button type="button" className={className} onClick={() => ref.current?.showModal()}>{children || "Request invoice and start"}</button>
      <dialog ref={ref} className="w-[min(520px,92vw)] rounded-3xl border border-border bg-background p-0 text-foreground shadow-elegant backdrop:bg-[#1d1030]/60" aria-labelledby={`sp-${plan}`}>
        <div className="p-7 sm:p-9">
          {state === "done" ? (
            <>
              <h3 id={`sp-${plan}`} className="font-serif text-3xl">Thank you!</h3>
              <p className="mt-3 text-muted-foreground">Your request is with me. I'll send an invoice with bank transfer details in {cur} within 1 business day. Work starts when payment arrives.</p>
              <button type="button" className="mt-6 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground" onClick={() => ref.current?.close()}>Close</button>
            </>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4">
              <h3 id={`sp-${plan}`} className="font-serif text-3xl">Start with {plan}</h3>
              <fieldset className="grid grid-cols-3 gap-2">
                <legend className="sr-only">Plan length</legend>
                {TERMS.map((x) => (
                  <label key={x.id} className="cursor-pointer rounded-2xl border-2 px-2 py-3 text-center text-sm transition-colors" style={term === x.id ? { background: "#4b2e8f", borderColor: "#4b2e8f", color: "#fff" } : { background: "#fff", borderColor: "rgba(75,46,143,.3)", color: "#2a1745" }}>
                    <input type="radio" name="term" className="sr-only" checked={term === x.id} onChange={() => setTerm(x.id)} />
                    <b className="block">{x.short}</b>
                    <small className="opacity-80">{x.off ? `${Math.round(x.off * 100)}% off` : "No lock-in"}</small>
                  </label>
                ))}
              </fieldset>
              <p className="font-serif text-2xl">${monthly.toLocaleString("en-US")} USD <span className="font-sans text-sm text-muted-foreground">/ month{term === "12" ? ` · $${(monthly * 12).toLocaleString("en-US")} paid yearly` : ""}</span></p>
              <p className="text-sm text-muted-foreground">{t.note} Paid in advance by bank transfer. Nothing is charged here.</p>
              <input aria-label="Your name" placeholder="Your name" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className="h-12 rounded-full border border-border bg-background px-5" />
              <input aria-label="Your email" type="email" placeholder="Your email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className="h-12 rounded-full border border-border bg-background px-5" />
              <input aria-label="Your website" placeholder="Your website (optional)" value={f.site} onChange={(e) => setF({ ...f, site: e.target.value })} className="h-12 rounded-full border border-border bg-background px-5" />
              <label className="grid gap-1 text-sm">Pay in this currency
                <select value={cur} onChange={(e) => setCur(e.target.value)} className="h-12 rounded-full border border-border bg-background px-5">
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              {err && <p role="alert" className="text-sm" style={{ color: "#a1204a" }}>{err}</p>}
              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={state === "sending"} className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60">{state === "sending" ? "Sending..." : "Request my invoice"}</button>
                <button type="button" className="rounded-full border border-border px-6 py-3 font-bold" onClick={() => ref.current?.close()}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
};
