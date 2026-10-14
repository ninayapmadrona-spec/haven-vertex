import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useHero, useFinalCtaContact } from "@/lib/sanity/hooks";
import { ArrowRight, Check, Sparkles } from "lucide-react";

// The CMS stores this as a plain string, so a value that points within the
// site ("/services") needs a router Link to keep the SPA navigation,
// while anything else (an external URL, or a leftover "#services" anchor
// from before the site had separate pages) falls back to "/services".
const isInternalPath = (url?: string) => !!url && url.startsWith("/");

export const Hero = () => {
  useCalendly();
  const { content: hero } = useHero();
  const { content: contact } = useFinalCtaContact();
  const calendlyUrl = contact.calendlyUrl;

  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden gradient-hero">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-glow/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-lavender/40 blur-3xl" />

      <div className="container relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="animate-fade-up">
          {hero.eyebrow && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-border/60 text-xs uppercase tracking-[0.2em] text-lavender-deep mb-8">
              <Sparkles className="w-3.5 h-3.5" /> {hero.eyebrow}
            </div>
          )}
          {hero.brandLine && <p className="font-serif text-2xl text-lavender-deep mb-5">{hero.brandLine}</p>}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-balance text-ink">
            {hero.headline}
          </h1>
          {hero.description?.map((paragraph, i) => (
            <p
              key={i}
              className={i === 0 ? "mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed" : "mt-4 text-base text-muted-foreground max-w-xl leading-relaxed"}
            >
              {paragraph}
            </p>
          ))}
          {!!hero.highlights?.length && (
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-5 gap-y-2.5 max-w-2xl">
              {hero.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 mt-0.5 text-lavender-deep flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {hero.primaryCtaLabel && (
              <Button asChild size="lg" className="rounded-full h-14 px-8 gradient-primary text-primary-foreground border-0 shadow-elegant hover:shadow-glow transition-smooth group">
                {hero.useCalendlyForPrimaryCta ? (
                  <a href={calendlyUrl} onClick={openCalendly(calendlyUrl)} target="_blank" rel="noopener noreferrer">
                    {hero.primaryCtaLabel}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </a>
                ) : isInternalPath(hero.secondaryCtaUrl) ? (
                  <Link to={hero.secondaryCtaUrl!}>
                    {hero.primaryCtaLabel}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </Link>
                ) : (
                  <a href={hero.secondaryCtaUrl || "/services"}>
                    {hero.primaryCtaLabel}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </a>
                )}
              </Button>
            )}
            {hero.secondaryCtaLabel && (
              <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 bg-white/70 backdrop-blur border-border hover:bg-white transition-smooth">
                {isInternalPath(hero.secondaryCtaUrl) ? (
                  <Link to={hero.secondaryCtaUrl!}>{hero.secondaryCtaLabel}</Link>
                ) : (
                  <a href={hero.secondaryCtaUrl || "/services"}>{hero.secondaryCtaLabel}</a>
                )}
              </Button>
            )}
          </div>
          {!!hero.tags?.length && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
              {hero.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative rounded-[2rem] overflow-hidden shadow-elegant">
            <img src={hero.heroImage} alt="Professional digital support workspace" width={1200} height={1400} className="w-full h-[520px] lg:h-[680px] object-cover" />
          </div>
          {hero.statBadgeNumber && (
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-elegant p-5 max-w-[240px] hidden md:block animate-float">
              <div className="text-3xl font-serif text-lavender-deep">{hero.statBadgeNumber}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{hero.statBadgeLabel}</div>
            </div>
          )}
          <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-elegant p-5 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Now booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
