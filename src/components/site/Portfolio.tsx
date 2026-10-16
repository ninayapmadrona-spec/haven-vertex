import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePortfolioSection } from "@/lib/sanity/hooks";

export const Portfolio = () => {
  const { content } = usePortfolioSection();

  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            {content.eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">{content.eyebrow}</p>}
            <h1 className="font-serif text-4xl lg:text-5xl text-balance max-w-2xl">{content.heading}</h1>
          </div>
          {content.note && <p className="text-muted-foreground italic">{content.note}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((it, i) => {
            const card = (
              <>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={it.image} alt={it.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                </div>
                <div className="p-6">
                  {it.tag && <span className="text-[10px] uppercase tracking-[0.25em] text-lavender-deep">{it.tag}</span>}
                  <h3 className="font-serif text-xl mt-2">{it.title}</h3>
                  {it.description && <p className="text-sm text-muted-foreground mt-2">{it.description}</p>}
                </div>
              </>
            );
            const className = "group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth";
            return it.url ? (
              <a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className={className}>
                {card}
              </a>
            ) : (
              <article key={i} className={className}>
                {card}
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-8 border-lavender-deep text-lavender-deep hover:bg-accent">
            <Link to="/contact">View Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
