import { Link } from "react-router-dom";
import { aboutExtra } from "@/lib/homeContent";
import { caseStudies } from "@/lib/portfolioContent";
import { PageHero, PillLink } from "@/components/site/PageHero";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import "@/components/site/home.css";

const dayToDay: [string, string, string][] = [
  ["Website content and blog updates", "New pages, blog posts, images and proofreading, published on WordPress and Wix sites and kept current.", "Ongoing"],
  ["WordPress builds and on-page SEO", "WordPress sites built from scratch, with keyword research, on-page SEO and link building.", "Built and optimised"],
  ["Landing pages", "Landing pages designed and tuned to turn visitors into enquiries.", "Design and optimise"],
  ["Email newsletters", "Mailchimp and MailerLite newsletters designed, written up and sent on schedule.", "Email marketing"],
  ["Social media and graphics", "Facebook and Instagram managed, with Canva graphics made to match the brand.", "Content"],
  ["Online store listings", "Etsy and online store products uploaded, with edited photos and clear descriptions.", "E-commerce"],
  ["Inbox, files and admin", "Email, files, client correspondence and scheduling handled for professional services firms.", "Virtual assistance"],
  ["Google Business Profile", "Business listings kept accurate and active so local customers find the right details.", "Local search"],
  ["Research and presentations", "Research, client presentations and recruitment support for busy owners and teams.", "Support"],
];

const PortfolioPage = () => {
  useCalendly();
  const { content: contact } = useFinalCtaContact();
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Recent Projects & Experience"
        accent="& Experience"
        intro="Managing and maintaining business websites across multiple industries. Samples available on request."
        note="Ideas. Websites. Systems. Growth."
      >
        <PillLink href={contact.calendlyUrl} onClick={openCalendly(contact.calendlyUrl)} newTab>Work with me</PillLink>
      </PageHero>

      <section className="hv pb-20 pt-4 lg:pb-24" aria-labelledby="client-work">
        <div className="container">
          <h2 id="client-work" className="font-serif text-3xl lg:text-4xl text-balance">Selected Client Work</h2>
          <div className="hv-work">
            {caseStudies.map((c) => (
              <article key={c.client} className="hv-case">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="hv-shot" aria-label={`Visit ${c.client} website`}>
                  <img src={c.image} alt={c.imageAlt} loading="lazy" width={1400} />
                </a>
                <div className="hv-meta"><span>{c.sector} · {c.platform}</span><a href={c.url} target="_blank" rel="noopener noreferrer">Visit site ↗</a></div>
                <h3 className="font-serif text-3xl">{c.client}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">{c.summary}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  {c.work.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-muted-foreground">More project samples are available on request.</p>
        </div>
      </section>

      <section className="hv pb-20 lg:pb-24" aria-labelledby="day-to-day">
        <div className="container">
          <h2 id="day-to-day" className="font-serif text-3xl lg:text-4xl text-balance">Day-to-day work I've handled</h2>
          <p className="mt-3 max-w-[62ch] text-muted-foreground">Over 12 years of hands-on support for business owners, from one-person shops to busy teams. This is the work that keeps a business moving.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dayToDay.map(([t, p, tag]) => (
              <article key={t} className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lavender-deep">{tag}</p>
                <h3 className="mt-2 font-serif text-2xl leading-tight">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container max-w-4xl">
          <h2 className="font-serif text-3xl lg:text-4xl text-balance">Industries I've Supported</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {aboutExtra.industries.map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
                <h3 className="font-sans font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground">
            Want to see how this could work for your business? Explore the{" "}
            <Link to="/services" className="font-semibold text-lavender-deep underline underline-offset-4">website management services</Link> or{" "}
            <Link to="/contact" className="font-semibold text-lavender-deep underline underline-offset-4">request project samples</Link>.
          </p>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
