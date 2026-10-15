import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useServicesSection } from "@/lib/sanity/hooks";
import { whoIHelp } from "@/lib/homeContent";

/** Services overview (links to /services) + who I help. Keyword-rich, crawlable. */
export const HomeIntro = () => {
  const { content } = useServicesSection();

  return (
    <>
      <section className="py-20 lg:py-24" aria-labelledby="home-services-heading">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">What I Do</p>
            <h2 id="home-services-heading" className="font-serif text-4xl lg:text-5xl text-balance max-w-3xl mx-auto">
              Website Management, Maintenance & Virtual Assistant Support
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Ongoing website maintenance, content publishing and SEO support for WordPress, Wix and Squarespace sites, plus the
              admin tasks that keep your business moving.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {content.items.map((s) => (
              <Link
                key={s.title}
                to="/services"
                className="group bg-card border border-border/60 rounded-2xl p-7 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth"
              >
                <h3 className="font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-lavender-deep">
                  View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-lavender-soft" aria-labelledby="home-who-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">{whoIHelp.eyebrow}</p>
            <h2 id="home-who-heading" className="font-serif text-4xl lg:text-5xl text-balance">{whoIHelp.heading}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{whoIHelp.intro}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whoIHelp.groups.map((g) => (
              <div key={g.title} className="bg-card border border-border/60 rounded-2xl p-7 shadow-soft">
                <h3 className="font-serif text-2xl text-ink">{g.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-muted-foreground">
            Learn more <Link to="/about" className="text-lavender-deep font-semibold underline underline-offset-4">about Nina</Link>, see{" "}
            <Link to="/portfolio" className="text-lavender-deep font-semibold underline underline-offset-4">recent projects</Link>, or{" "}
            <Link to="/contact" className="text-lavender-deep font-semibold underline underline-offset-4">get in touch</Link>.
          </p>
        </div>
      </section>
    </>
  );
};
