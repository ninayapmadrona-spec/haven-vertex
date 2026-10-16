import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Megaphone, BriefcaseBusiness, Check, ArrowRight } from "lucide-react";
import { useServicesSection } from "@/lib/sanity/hooks";
import type { ServiceItem } from "@/lib/sanity/types";

const ICONS: Record<NonNullable<ServiceItem["icon"]>, typeof Globe> = {
  globe: Globe,
  megaphone: Megaphone,
  briefcase: BriefcaseBusiness,
};

export const Services = () => {
  const { content } = useServicesSection();

  return (
    <section id="services" className="py-24 lg:py-32 gradient-soft">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          {content.eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">{content.eyebrow}</p>}
          <h1 className="font-serif text-4xl lg:text-5xl text-balance">{content.heading}</h1>
          {content.description && <p className="mt-5 text-muted-foreground text-lg">{content.description}</p>}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {content.items.map((s) => {
            const Icon = ICONS[s.icon || "globe"];
            return (
              <article key={s.title} className="group relative gradient-card rounded-3xl p-8 lg:p-10 border border-lavender/80 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-lavender-deep" />
                </div>
                <h3 className="font-serif text-2xl mb-2">{s.title}</h3>
                {s.price && (
                  <p className="text-lavender-deep font-medium mb-4">
                    {s.priceLabel || "Starting From"} <span className="font-serif text-2xl">{s.price}</span> / Month
                  </p>
                )}
                {s.description && <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.description}</p>}

                {!!s.features?.length && (
                  <ul className="space-y-2.5 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-lavender-deep mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.idealFor && (
                  <div className="mt-auto pt-6 border-t border-border/60">
                    <p className="text-xs uppercase tracking-widest text-lavender-deep mb-2">Ideal For</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.idealFor}</p>
                  </div>
                )}

                <Button asChild className="mt-8 rounded-full h-12 gradient-primary text-primary-foreground border-0 group/btn">
                  <Link to="/contact">
                    Let's Discuss
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-smooth" />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
