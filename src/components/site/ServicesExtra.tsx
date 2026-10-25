import { Link } from "react-router-dom";
import { servicesExtra as c } from "@/lib/servicesContent";

/** Keyword-rich detail under the package cards on /services. */
export const ServicesExtra = () => (
  <section className="py-20 lg:py-24">
    <div className="container">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="font-serif text-3xl lg:text-4xl text-balance">{c.heading}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{c.intro}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {c.groups.map(([title, text]) => (
          <div key={title} className="bg-card border border-border/60 rounded-2xl p-7 shadow-soft">
            <h3 className="font-serif text-2xl text-ink">{title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-3xl lg:text-4xl text-center mt-20 mb-10">{c.stepsHeading}</h2>
      <ol className="grid md:grid-cols-3 gap-6">
        {c.steps.map(([title, text], i) => (
          <li key={title} className="bg-lavender-soft rounded-2xl p-7">
            <span className="font-serif text-4xl text-lavender-deep">{i + 1}</span>
            <h3 className="mt-2 font-sans font-bold text-ink">{title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>

      <div className="max-w-3xl mx-auto text-center mt-20">
        <h2 className="font-serif text-3xl lg:text-4xl text-balance">{c.hoursHeading}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{c.hours}</p>
        <p className="mt-6 text-muted-foreground">
          Not sure which package fits? <Link to="/contact" className="text-lavender-deep font-semibold underline underline-offset-4">Book a free discovery call</Link>, or learn{" "}
          <Link to="/about" className="text-lavender-deep font-semibold underline underline-offset-4">more about Nina</Link>.
        </p>
      </div>
    </div>
  </section>
);
