import type { ReactNode } from "react";
import { Lavender, Silk, Wave } from "./Botanical";
import "./home.css";

type Props = {
  eyebrow?: string;
  title: string;
  /** Words at the end of the title shown in lilac. Defaults to the last two words. */
  accent?: string;
  intro?: string;
  note?: string;
  srPrefix?: string;
  children?: ReactNode;
  tall?: boolean;
};

export const PageHero = ({ eyebrow, title, accent, intro, note, srPrefix, children, tall }: Props) => {
  const words = title.split(" ");
  const accentText = accent ?? words.slice(-2).join(" ");
  const idx = title.lastIndexOf(accentText);
  const lead = idx > 0 ? title.slice(0, idx) : "";
  const tail = idx >= 0 ? accentText : "";
  return (
    <section className={`hv hv-hero ${tall ? "hv-hero-tall" : ""}`}>
      <div className="hv-hero-art" aria-hidden="true">
        <div className="hv-glow" />
        <Lavender className="text-lavender" style={{ width: 120, right: "17%", bottom: 60, height: 420, opacity: 0.85 }} />
        <Lavender className="text-lavender" style={{ width: 90, right: "8%", bottom: 40, opacity: 0.55 }} buds={11} />
        <Lavender className="text-lavender" style={{ width: 70, right: "26%", bottom: 50, opacity: 0.4 }} buds={9} />
        <Lavender className="text-lavender" style={{ width: 80, right: "-1%", bottom: 70, opacity: 0.35 }} buds={10} />
      </div>
      <Silk />
      <div className="container relative z-10">
        <div className="max-w-2xl">
          {eyebrow && <p className="hv-eyebrow">{eyebrow}</p>}
          <h1 className="hv-hero-title font-serif">
            {srPrefix && <span className="sr-only">{srPrefix}</span>}
            {idx > 0 ? lead : idx === 0 ? "" : title}
            {tail && <span className="text-lavender">{tail}</span>}
          </h1>
          {intro && <p className="hv-hero-intro">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {note && <p className="hv-script hidden md:block">{note}</p>}
      </div>
      <Wave />
    </section>
  );
};

export const PillLink = ({ href, to, onClick, children, ghost, newTab }: { href?: string; to?: string; onClick?: React.MouseEventHandler; children: ReactNode; ghost?: boolean; newTab?: boolean }) => {
  const cls = ghost ? "hv-pill hv-pill-ghost" : "hv-pill";
  return <a href={href || to} onClick={onClick} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
};
