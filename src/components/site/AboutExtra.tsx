import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { aboutExtra } from "@/lib/homeContent";
import seo from "@/lib/seo/pages.json";

const siteUrl = (import.meta.env.VITE_SITE_URL || seo.siteUrl).replace(/\/$/, "");

/** Keyword-rich "what I do" and "why work with me" blocks for the About page. */
export const AboutExtra = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nina Madrona",
    jobTitle: "Website Manager & Virtual Assistant",
    url: `${siteUrl}/about`,
    worksFor: { "@type": "ProfessionalService", name: "Haven Vertex", url: `${siteUrl}/` },
    knowsAbout: ["Website management", "WordPress", "Wix", "Squarespace", "SEO", "Content publishing", "Virtual assistance"],
  };

  return (
    <section className="pb-24 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-serif text-3xl lg:text-4xl text-balance">{aboutExtra.workHeading}</h2>
          <div className="mt-6 space-y-5">
            {aboutExtra.work.map(([title, text]) => (
              <div key={title}>
                <h3 className="font-sans font-bold text-ink">{title}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl text-balance mt-12">{aboutExtra.industriesHeading}</h2>
          <div className="mt-6 space-y-5">
            {aboutExtra.industries.map(([title, text]) => (
              <div key={title}>
                <h3 className="font-sans font-bold text-ink">{title}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-muted-foreground">
            See the full list of <Link to="/services" className="text-lavender-deep font-semibold underline underline-offset-4">website management packages</Link>{" "}
            or browse <Link to="/portfolio" className="text-lavender-deep font-semibold underline underline-offset-4">recent projects</Link>.
          </p>
        </div>
        <div className="bg-lavender-soft rounded-2xl p-8 lg:p-10 self-start">
          <h2 className="font-serif text-3xl lg:text-4xl text-balance">{aboutExtra.whyHeading}</h2>
          <ul className="mt-6 space-y-4">
            {aboutExtra.why.map((w) => (
              <li key={w} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-lavender-deep" />
                </span>
                <span className="text-foreground">{w}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted-foreground">
            Ready to hand off your website?{" "}
            <Link to="/contact" className="text-lavender-deep font-semibold underline underline-offset-4">Book a free discovery call</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};
