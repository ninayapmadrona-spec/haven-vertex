import { Button } from "@/components/ui/button";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  useCalendly();
  const { content } = useFinalCtaContact();

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-primary px-8 py-16 lg:py-24 lg:px-20 text-center text-primary-foreground shadow-elegant">
          <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl lg:text-6xl leading-tight text-balance">{content.ctaHeading}</h2>
            {content.ctaDescription && (
              <p className="mt-6 text-lg text-primary-foreground/85 leading-relaxed">{content.ctaDescription}</p>
            )}
            {content.ctaButtonLabel && (
              <Button asChild size="lg" className="mt-10 rounded-full h-14 px-8 bg-white text-lavender-deep hover:bg-white/90 shadow-elegant group">
                <a href={content.calendlyUrl} onClick={openCalendly(content.calendlyUrl)} target="_blank" rel="noopener noreferrer">
                  {content.ctaButtonLabel}
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
