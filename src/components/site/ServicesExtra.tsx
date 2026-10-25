import { Link } from "react-router-dom";
import { Wave } from "./Botanical";
import "./home.css";
import { servicesExtra as c } from "@/lib/servicesContent";

/** Keyword-rich detail under the package cards on /services. */
export const ServicesExtra = () => (
  <>
  <section className="pb-4 pt-4">
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

    </div>
  </section>
  <section className="hv hv-band" style={{ paddingTop: "8rem", paddingBottom: "8rem" }} aria-labelledby="svc-steps">
    <Wave flip />
    <div className="container relative z-10">
      <p className="hv-eyebrow">My approach</p>
      <h2 id="svc-steps" className="max-w-[18ch] font-serif text-4xl leading-[1.05] text-balance lg:text-5xl">{c.stepsHeading}</h2>
      <ol className="hv-psteps" style={{ gridTemplateColumns: `repeat(${c.steps.length}, 1fr)` }}>
        {c.steps.map(([title, text], i) => (
          <li key={title} className="hv-pstep">
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="font-serif">{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </div>
    <Wave />
  </section>
  <section className="pb-20 pt-4 lg:pb-24">
    <div className="container">
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
  </>
);
