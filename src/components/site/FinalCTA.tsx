import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { Lavender, Wave } from "./Botanical";
import "./home.css";

export const FinalCTA = () => {
  useCalendly();
  const { content } = useFinalCtaContact();

  return (
    <section className="hv hv-band" style={{ paddingTop: "9rem", paddingBottom: "8rem" }}>
      <Wave flip />
      <div className="hv-deco" aria-hidden="true">
        <Lavender className="text-lavender" style={{ width: 110, right: "14%", bottom: -20, opacity: 0.6 }} />
        <Lavender className="text-lavender" style={{ width: 80, right: "6%", bottom: -30, opacity: 0.4 }} buds={10} />
        <Lavender className="text-lavender" style={{ width: 70, right: "24%", bottom: -30, opacity: 0.3 }} buds={9} />
      </div>
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <p className="hv-eyebrow">Ready to work together?</p>
          <h2 className="font-serif text-4xl leading-[1.05] text-balance lg:text-6xl">{content.ctaHeading}</h2>
          {content.ctaDescription && <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/80">{content.ctaDescription}</p>}
          {content.ctaButtonLabel && (
            <a href={content.calendlyUrl} onClick={openCalendly(content.calendlyUrl)} target="_blank" rel="noopener noreferrer" className="hv-pill mt-9">
              {content.ctaButtonLabel}
            </a>
          )}
        </div>
      </div>
      <Wave />
    </section>
  );
};
