import { Link } from "react-router-dom";
import { Portfolio as PortfolioSection } from "@/components/site/Portfolio";
import { aboutExtra } from "@/lib/homeContent";
import { caseStudies } from "@/lib/portfolioContent";

const PortfolioPage = () => (
  <>
    <PortfolioSection />
    <section className="pb-20 lg:pb-24">
      <div className="container max-w-5xl">
        <h2 className="font-serif text-3xl lg:text-4xl text-balance">Selected Client Work</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {caseStudies.map((c) => (
            <article key={c.client} className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-soft">
              <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${c.client} website`}>
                <img src={c.image} alt={c.imageAlt} loading="lazy" width={1400} className="w-full aspect-[16/10] object-cover object-top border-b border-border/60" />
              </a>
              <div className="p-7">
              <p className="text-[10px] uppercase tracking-[0.25em] text-lavender-deep">{c.sector} · {c.platform}</p>
              <h3 className="mt-2 font-serif text-2xl text-ink">{c.client}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground list-disc pl-5">
                {c.work.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-lavender-deep font-semibold underline underline-offset-4">Visit {c.client} website →</a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground italic">More project samples and screenshots are available on request.</p>
      </div>
    </section>
    <section className="pb-24 lg:pb-32">
      <div className="container max-w-4xl">
        <h2 className="font-serif text-3xl lg:text-4xl text-balance">Industries I've Supported</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {aboutExtra.industries.map(([title, text]) => (
            <div key={title} className="bg-card border border-border/60 rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted-foreground">
          Want to see how this could work for your business? Explore the{" "}
          <Link to="/services" className="text-lavender-deep font-semibold underline underline-offset-4">website management services</Link> or{" "}
          <Link to="/contact" className="text-lavender-deep font-semibold underline underline-offset-4">request project samples</Link>.
        </p>
      </div>
    </section>
  </>
);

export default PortfolioPage;
