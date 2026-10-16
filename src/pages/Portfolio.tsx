import { Link } from "react-router-dom";
import { Portfolio as PortfolioSection } from "@/components/site/Portfolio";
import { aboutExtra } from "@/lib/homeContent";

const PortfolioPage = () => (
  <>
    <PortfolioSection />
    <section className="pb-24 lg:pb-32">
      <div className="container max-w-4xl">
        <h2 className="font-serif text-3xl lg:text-4xl text-balance">Industries I've Supported</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {aboutExtra.industries.map(([title, text]) => (
            <div key={title} className="bg-card border border-border/60 rounded-2xl p-6 shadow-soft">
              <h3 className="font-serif text-xl text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-muted-foreground">
          Want to see how this could work for your business? Explore the{" "}
          <Link to="/services" className="text-lavender-deep font-semibold underline underline-offset-4">website management services</Link> or{" "}
          <Link to="/contact" className="text-lavender-deep font-semibold underline underline-offset-4">request project samples</Link>.
        </p>
      </div>
    </section>
  </>
);

export default PortfolioPage;
