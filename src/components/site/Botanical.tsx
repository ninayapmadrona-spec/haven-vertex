import type { CSSProperties } from "react";

// Decorative leaves and flowers. Purely visual (aria-hidden), tinted by the
// surrounding `color`, and animated with the .hv-sway / .hv-spin classes.
export const Sprig = ({ className = "", style }: { className?: string; style?: CSSProperties }) => (
  <div className={`hv-sway ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 120 260" fill="currentColor">
      <path d="M60 258 C 54 190 68 120 60 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 214 C 18 206 6 176 10 154 C 46 160 62 184 58 214Z" />
      <path d="M62 176 C 102 168 114 138 110 116 C 74 122 58 146 62 176Z" />
      <path d="M58 134 C 24 126 14 100 18 82 C 48 88 62 108 58 134Z" />
      <path d="M62 98 C 94 90 104 66 100 50 C 72 56 58 74 62 98Z" />
      <path d="M60 60 C 44 44 46 24 60 8 C 74 24 76 44 60 60Z" />
    </svg>
  </div>
);

export const Flower = ({ className = "", style }: { className?: string; style?: CSSProperties }) => (
  <div className={`hv-spin ${className}`} style={style} aria-hidden="true">
    <svg viewBox="-60 -60 120 120" fill="currentColor">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <ellipse key={r} cx="0" cy="-30" rx="12" ry="26" transform={`rotate(${r})`} />
      ))}
      <circle r="9" fill="#27163D" opacity=".5" />
    </svg>
  </div>
);

// Drawn lavender sprig: stem with paired buds. Vector, so it reads as an
// illustration rather than a photo.
export const Lavender = ({ className = "", style, buds = 13 }: { className?: string; style?: CSSProperties; buds?: number }) => (
  <div className={`hv-sway ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 100 400" fill="currentColor">
      <path d="M50 398 C 46 300 54 180 50 30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M49 392 C 30 360 18 346 4 336 C 22 330 40 348 49 392Z" opacity=".8" />
      <path d="M51 380 C 70 350 82 338 96 330 C 78 322 60 340 51 380Z" opacity=".8" />
      {Array.from({ length: buds }).map((_, i) => {
        const t = i / (buds - 1);
        const y = 300 - t * 262;
        const s = 1 - t * 0.45;
        const x = 50 + Math.sin(y / 40) * 2;
        return (
          <g key={i} opacity={0.6 + (i % 3) * 0.14}>
            <ellipse cx={x - 9 * s} cy={y} rx={7 * s} ry={14 * s} transform={`rotate(-28 ${x - 9 * s} ${y})`} />
            <ellipse cx={x + 9 * s} cy={y - 6 * s} rx={7 * s} ry={14 * s} transform={`rotate(28 ${x + 9 * s} ${y - 6 * s})`} />
          </g>
        );
      })}
      <ellipse cx="50" cy="24" rx="5" ry="12" />
    </svg>
  </div>
);

// Soft silk ribbons along the bottom of a dark section.
export const Silk = () => (
  <svg className="hv-silk" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="hv-s1" x1="0" x2="1"><stop offset="0" stopColor="#CDB4F7" stopOpacity=".05" /><stop offset=".5" stopColor="#CDB4F7" stopOpacity=".45" /><stop offset="1" stopColor="#9B7BE0" stopOpacity=".1" /></linearGradient>
      <linearGradient id="hv-s2" x1="1" x2="0"><stop offset="0" stopColor="#E6D8FF" stopOpacity=".05" /><stop offset=".5" stopColor="#B79AF0" stopOpacity=".35" /><stop offset="1" stopColor="#CDB4F7" stopOpacity=".05" /></linearGradient>
    </defs>
    <path className="hv-silk-a" d="M-40 130 C 220 30 460 210 760 120 S 1200 10 1480 100 L1480 230 L-40 230Z" fill="url(#hv-s1)" />
    <path className="hv-silk-b" d="M-40 150 C 260 70 520 220 820 140 S 1220 50 1480 130 L1480 230 L-40 230Z" fill="url(#hv-s2)" />
  </svg>
);

// Curved edge that hands a dark section over to the light page background.
export const Wave = ({ flip = false }: { flip?: boolean }) => (
  <svg className={`hv-wave${flip ? " flip" : ""}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 70 C 280 0 560 110 860 60 S 1300 20 1440 64 V 121 H 0 Z" fill="hsl(var(--background))" />
  </svg>
);
