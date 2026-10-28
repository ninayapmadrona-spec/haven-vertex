import { useRef, useState } from "react";
import { caseStudies } from "@/lib/portfolioContent";
import { openCalendly, useCalendly } from "@/lib/calendly";

const CAL_URL = "https://calendly.com/havenvertex/30min";
import "./home.css";

export const PortfolioFan = () => {
  useCalendly();
  const n = caseStudies.length + 1;
  const [cur, setCur] = useState(0);
  const sx = useRef<number | null>(null);
  const moved = useRef(false);
  const go = (k: number) => setCur((c) => (((c + k) % n) + n) % n);
  const posOf = (i: number) => {
    let d = (((i - cur) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  return (
    <div>
      <div
        className="hv-fan"
        onPointerDown={(e) => { sx.current = e.clientX; moved.current = false; }}
        onPointerUp={(e) => {
          if (sx.current === null) return;
          const dx = e.clientX - sx.current;
          sx.current = null;
          if (Math.abs(dx) > 50) { moved.current = true; go(dx < 0 ? 1 : -1); }
        }}
        onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } }}
      >
        {caseStudies.map((c, i) => {
          const d = posOf(i);
          const pos = Math.max(-1, Math.min(1, d));
          return (
            <a
              key={c.client}
              className="hv-card"
              data-pos={pos}
              data-hide={Math.abs(d) > 1}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.client} website`}
              tabIndex={d === 0 ? 0 : -1}
              onClick={(e) => { if (d !== 0) { e.preventDefault(); go(d); } }}
            >
              <img src={c.image} alt={c.imageAlt} loading="lazy" width={1400} />
              <span className="hv-cap"><b className="font-serif">{c.client}</b><small>{c.platform}</small></span>
            </a>
          );
        })}
        {(() => {
          const i = caseStudies.length;
          const d = posOf(i);
          const pos = Math.max(-1, Math.min(1, d));
          return (
            <button type="button" className="hv-card hv-next" data-pos={pos} data-hide={Math.abs(d) > 1} tabIndex={d === 0 ? 0 : -1}
              onClick={(e) => { if (d !== 0) go(d); else if (window.Calendly) openCalendly(CAL_URL)(e); else window.open(CAL_URL, "_blank", "noopener"); }}>
              <span><b className="font-serif">Your website, next.</b><small>Book a free call and we start with what you have.</small></span>
            </button>
          );
        })()}
      </div>
      <div className="hv-fanctl">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project">←</button>
        <button type="button" onClick={() => go(1)} aria-label="Next project">→</button>
      </div>
    </div>
  );
};
