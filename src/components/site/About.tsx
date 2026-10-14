import { Check } from "lucide-react";
import { useAbout } from "@/lib/sanity/hooks";

export const About = () => {
  const { content: about } = useAbout();
  const paragraphs = about.bodyParagraphs || [];
  const lastIndex = paragraphs.length - 1;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          {about.eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-lavender-deep mb-4">{about.eyebrow}</p>}
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-balance">{about.heading}</h2>
          {about.images?.[0] && (
            <img
              src={about.images[0]}
              alt="About Haven Vertex"
              className="mt-8 w-full rounded-2xl object-cover shadow-soft hidden lg:block"
            />
          )}
        </div>
        <div className="lg:col-span-7 lg:pt-4">
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
  );
};
