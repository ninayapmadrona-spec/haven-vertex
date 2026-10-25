import { Link } from "react-router-dom";
import { aboutExtra } from "@/lib/homeContent";
import { caseStudies } from "@/lib/portfolioContent";
import { PageHero, PillLink } from "@/components/site/PageHero";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import "@/components/site/home.css";

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
