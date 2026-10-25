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
