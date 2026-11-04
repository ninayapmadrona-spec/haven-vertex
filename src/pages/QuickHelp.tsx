import { RouteSeo } from "@/components/site/RouteSeo";
import { StartPlan } from "@/components/site/StartPlan";

// Unlisted page: not in the nav, sitemap or search results. Share the link directly.
const RATE = 12;
const PACKS = [
  { hours: 10, price: 120 },
  { hours: 20, price: 230 },
  { hours: 40, price: 440 },
];
const TASKS = [
  "Inbox and email replies",
  "Calendar and appointment booking",
  "Data entry and spreadsheets",
  "Social media scheduling",
  "Canva posts and simple graphics",
  "Online research and lists",
  "Small website updates (text, photos, pages)",
  "Document formatting and admin",
];
const STEPS = [
  ["Pick a pack", "Choose how many hours you want to start with."],
  ["Get an invoice", "I email bank transfer details within 1 business day."],
  ["I start work", "Once payment lands we agree your first tasks and I get going."],
];

const QuickHelp = () => (
  <div className="min-h-screen bg-background text-foreground">
    <RouteSeo />
    <header className="container flex items-center justify-between py-5">
      <a href="/" className="flex items-center gap-3"><img src="/logo.png" alt="Haven Vertex" className="h-11 w-auto" /></a>
      <a href="mailto:hello@havenvertex.com" className="text-sm font-bold text-primary underline underline-offset-4">hello@havenvertex.com</a>
    </header>

    <main>
      <section className="container pb-16 pt-10 lg:pb-24 lg:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Virtual assistant · Pay as you go</p>
        <h1 className="mt-4 max-w-[18ch] text-balance font-serif text-5xl leading-[1.02] sm:text-6xl">Extra hands for your small business.</h1>
        <p className="mt-5 max-w-[56ch] text-lg text-muted-foreground">
          Hand off the everyday tasks that keep piling up. Buy a pack of hours, send me the work, and get on with running your business. From ${RATE} an hour, no monthly contract.
        </p>
        <a href="#packs" className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-7 font-bold text-primary-foreground">See the hour packs</a>
      </section>

      <section className="container pb-16 lg:pb-24" aria-labelledby="tasks-h">
        <h2 id="tasks-h" className="font-serif text-4xl leading-[1.05] sm:text-5xl">What I can take off your plate</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {TASKS.map((t) => (
            <li key={t} className="rounded-2xl border border-border bg-card px-5 py-4">{t}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted-foreground">Not on the list? Ask. If I can do it, I will quote it honestly.</p>
      </section>

      <section id="packs" className="container pb-16 lg:pb-24" aria-labelledby="packs-h">
        <h2 id="packs-h" className="font-serif text-4xl leading-[1.05] sm:text-5xl">Hour packs</h2>
        <p className="mt-4 max-w-[60ch] text-lg text-muted-foreground">Paid in advance by bank transfer in your own currency. Hours are valid for 60 days.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PACKS.map((p) => (
            <article key={p.hours} className="flex flex-col rounded-3xl border border-border bg-card p-7">
              <h3 className="font-serif text-2xl">{p.hours} hours</h3>
              <p className="mt-2"><span className="font-serif text-3xl">${p.price}</span> <span className="text-sm text-muted-foreground">USD, paid in advance</span></p>
              <p className="mt-1 text-sm text-muted-foreground">${(p.price / p.hours).toFixed(2)} an hour</p>
              <StartPlan pack plan={`Quick help ${p.hours}-hour pack`} price={p.price} className="mt-6 h-12 rounded-full bg-primary font-bold text-primary-foreground">Buy this pack</StartPlan>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-16 lg:pb-24" aria-labelledby="how-h">
        <h2 id="how-h" className="font-serif text-4xl leading-[1.05] sm:text-5xl">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-3xl border border-border bg-card p-7">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-24 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl">Questions first?</h2>
        <p className="mx-auto mt-4 max-w-[50ch] text-lg text-muted-foreground">Message me and I will reply within one business day.</p>
        <a href="mailto:hello@havenvertex.com" className="mt-6 inline-flex h-12 items-center rounded-full border border-primary/40 px-7 font-bold text-primary">Email Nina</a>
      </section>
    </main>
  </div>
);

export default QuickHelp;
