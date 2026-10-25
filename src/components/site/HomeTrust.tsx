import "./home.css";
import { Lavender, Wave } from "./Botanical";

const platforms = ["Wix", "Squarespace", "WordPress", "Canva", "Google Workspace", "Mailchimp"];

export const HomeTrust = () => (
  <>
    <section className="hv container py-12" aria-label="Platforms">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Platforms I work with</p>
      <div className="hv-trust">{platforms.map((p) => <span key={p}>{p}</span>)}</div>
    </section>
  </>
);

export const HomeStats = () => (
  <section className="hv hv-band" style={{ paddingTop: "8rem", paddingBottom: "8rem" }}>
    <Wave flip />
    <Lavender className="text-lavender" style={{ width: 70, left: "1%", bottom: -10, opacity: 0.3 }} buds={10} />
    <div className="container relative z-10">
      <div className="hv-stats">
        <div>
          <p className="hv-eyebrow">The short version</p>
          <h2 className="font-serif text-4xl leading-[1.05] sm:text-5xl">Steady hands behind your website.</h2>
        </div>
        <div className="hv-stat-row">
          <div className="hv-stat"><b>12+</b><span>Years supporting businesses</span></div>
          <div className="hv-stat"><b>4</b><span>Countries served</span></div>
          <div className="hv-stat"><b>$500</b><span>USD per month to start</span></div>
        </div>
      </div>
    </div>
    <Wave />
  </section>
);
