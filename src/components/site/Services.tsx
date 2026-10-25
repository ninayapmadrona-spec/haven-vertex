import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { PageHero, PillLink } from "./PageHero";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { useServicesSection } from "@/lib/sanity/hooks";

export const Services = () => {
  const { content } = useServicesSection();
  useCalendly();
  const { content: contact } = useFinalCtaContact();

  return (
    <>
    <PageHero eyebrow={content.eyebrow || "Services"} title={content.heading} intro={content.description} note="Organised. Reliable. Proactive.">
      <PillLink href={contact.calendlyUrl} onClick={openCalendly(contact.calendlyUrl)} newTab>Book a free call</PillLink>
    </PageHero>
    <section id="services" className="pb-24 pt-4 lg:pb-32">
      <div className="container">

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {content.items.map((s) => {
            return (
              <article key={s.title} className="group relative gradient-card rounded-3xl p-8 lg:p-10 border border-lavender/80 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-smooth flex flex-col">
                <h3 className="font-serif text-3xl mb-3">{s.title}</h3>
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

                <Button asChild className="mt-8 rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary hover:-translate-y-0.5 transition-smooth">
                  <Link to="/contact">Let's Discuss</Link>
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
};
