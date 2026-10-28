import { Check } from "lucide-react";
import { PageHero, PillLink } from "./PageHero";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { useAbout } from "@/lib/sanity/hooks";
import { availabilityText } from "@/lib/availability";

export const About = () => {
  const { content: about } = useAbout();
  useCalendly();
  const { content: contact } = useFinalCtaContact();
  const paragraphs = about.bodyParagraphs || [];
  const lastIndex = paragraphs.length - 1;

  return (
    <>
    <PageHero eyebrow={about.eyebrow || "About"} title={about.heading} note="Operations. People. Systems. Freedom.">
      <PillLink href={contact.calendlyUrl} onClick={openCalendly(contact.calendlyUrl)} newTab>Book a free call</PillLink>
    </PageHero>
    <section id="about" className="pb-20 pt-4 lg:pb-28">
      <div className={`container grid gap-12 items-start ${about.images?.[0] ? "lg:grid-cols-12" : ""}`}>
        {about.images?.[0] && (
          <div className="lg:col-span-5">
            <img
              src={about.images[0]}
              alt="Nina Madrona, founder of Haven Vertex"
              className="w-full rounded-2xl object-cover shadow-soft hidden lg:block"
            />
          </div>
        )}
        <div className={about.images?.[0] ? "lg:col-span-7" : "max-w-3xl"}>
          <aside className="mb-10 rounded-3xl bg-accent p-6 sm:p-8" aria-label="Who you will work with">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lavender-deep">Meet Nina</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">One person, on purpose.</h2>
            <p className="mt-3 max-w-[56ch] text-foreground/80 leading-relaxed">
              Haven Vertex is just me. You talk to me on the first call and I do the work every month after. I take on a limited number of clients so replies stay fast. If I bring on help in the future, I stay your main contact.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lavender-deep">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#2fa56a" }} aria-hidden="true" />
              {availabilityText()}
            </p>
          </aside>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === lastIndex ? "font-medium text-foreground" : undefined}>
                {p}
              </p>
            ))}
          </div>
          {!!about.points?.length && (
            <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {about.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-lavender-deep" />
                  </span>
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
    </>
  );
};
