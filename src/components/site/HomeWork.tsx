import { Link } from "react-router-dom";
import { PortfolioFan } from "./PortfolioFan";
import "./home.css";

const steps = [
  { k: "Free call", t: "We talk it through", p: "Thirty minutes to look at your site and what is slowing it down." },
  { k: "Setup", t: "I tidy and connect", p: "Access, backups, tracking and the first round of fixes." },
  { k: "Monthly", t: "It keeps improving", p: "Steady updates and a short report so you always know what changed." },
];

export const HomeWork = () => (
  <div className="hv">
    <section className="container border-t border-border py-20 lg:py-28" aria-labelledby="home-work-heading">
      <h2 id="home-work-heading" className="font-serif text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
        Recent <em style={{ fontStyle: "normal", opacity: 0.55 }}>work</em>
      </h2>
      <PortfolioFan />
      <p className="mt-8 text-muted-foreground">
        More detail on the <Link to="/portfolio" className="font-semibold text-primary underline underline-offset-4">portfolio page</Link>.
      </p>
    </section>

    <section className="container border-t border-border py-20 lg:py-28" aria-labelledby="home-process-heading">
      <h2 id="home-process-heading" className="font-serif text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
        How we <em style={{ fontStyle: "normal", opacity: 0.55 }}>work</em> together
      </h2>
      <div className="hv-steps">
        {steps.map((s) => (
          <div key={s.k} className="hv-step">
            <span className="k">{s.k}</span>
            <h3 className="font-serif text-3xl">{s.t}</h3>
            <p className="text-[15px] leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
