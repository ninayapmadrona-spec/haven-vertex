import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { Flower, Sprig } from "./Botanical";
import "./home.css";

export const FinalCTA = () => {
  useCalendly();
  const { content } = useFinalCtaContact();

  return (
    <section className="hv py-20 lg:py-28">
      <div className="container">
        <div className="hv-final px-8 py-16 lg:px-20 lg:py-24">
          <div className="hv-deco" aria-hidden="true">
            <Flower className="text-lavender" style={{ width: 300, right: -70, top: -90 }} />
            <Sprig className="text-lavender" style={{ width: 130, right: "22%", bottom: -24 }} />
            <Sprig className="text-lavender" style={{ width: 90, right: "12%", bottom: -24, opacity: 0.7 }} />
          </div>
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.05] text-balance">{content.ctaHeading}</h2>
            {content.ctaDescription && (
              <p className="mt-6 text-lg text-primary-foreground/85 leading-relaxed">{content.ctaDescription}</p>
            )}
            {content.ctaButtonLabel && (
              <a href={content.calendlyUrl} onClick={openCalendly(content.calendlyUrl)} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex h-14 items-center rounded-full bg-white px-8 font-semibold text-primary transition-smooth hover:-translate-y-0.5 hover:shadow-elegant">
                {content.ctaButtonLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
