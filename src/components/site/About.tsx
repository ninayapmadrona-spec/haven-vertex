import { Check } from "lucide-react";
import { PageHero, PillLink } from "./PageHero";
import { openCalendly, useCalendly } from "@/lib/calendly";
import { useFinalCtaContact } from "@/lib/sanity/hooks";
import { useAbout } from "@/lib/sanity/hooks";

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
