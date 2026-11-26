import "./orbit.css";
import { useEffect, useRef } from "react";

// The mouse cursor becomes a tiny fairy light that leaves a trail of sparkles.
// Desktop (mouse) only: phones/tablets skip it entirely, and the animation
// stops whenever the mouse is still, so it costs nothing while reading.
type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number; hue: 0 | 1; tw: number };

const sprite = (rgb: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, `rgba(${rgb},1)`);
  gr.addColorStop(0.25, `rgba(${rgb},0.55)`);
  gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return c;
};

export const FairyDust = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const gold = sprite("246,201,99");
    const lilac = sprite("201,168,255");
    const white = sprite("255,246,214");
    let W = 0, H = 0, raf = 0, last = performance.now(), run = false, still = 0;
    const parts: P[] = [];
    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // On a mouse, the fairy light becomes the cursor. Touch screens keep the gentle drift.
    let mouse = false, tx = 0, ty = 0, hx = 0, hy = 0;
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!mouse) { mouse = true; hx = e.clientX; hy = e.clientY; root.classList.add("hv-fairy-cursor"); }
      tx = e.clientX; ty = e.clientY;
      still = 0;
      start();
    };
    const leave = () => { mouse = false; root.classList.remove("hv-fairy-cursor"); start(); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", leave);

    const frame = (now: number) => {
      if (!run) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const prev = { x: hx, y: hy };
      const k = Math.min(1, dt * 16);
      hx += (tx - hx) * k; hy += (ty - hy) * k;
      const h = { x: hx, y: hy };
      const moving = Math.hypot(h.x - prev.x, h.y - prev.y) > 0.3;
      still = moving ? 0 : still + dt;
      const n = mouse && moving ? 2 : 0;
      for (let i = 0; i < n && parts.length < 160; i++) {
        const a = Math.random() * Math.PI * 2, v = 6 + Math.random() * 22;
        parts.push({
          x: h.x + (Math.random() - 0.5) * 4, y: h.y + (Math.random() - 0.5) * 4,
          vx: Math.cos(a) * v - (h.x - prev.x) * 2, vy: Math.sin(a) * v + 8 - (h.y - prev.y) * 2,
          life: 0, max: 1.1 + Math.random() * 1.6, r: 2.5 + Math.random() * 5, hue: Math.random() < 0.7 ? 0 : 1, tw: Math.random() * 6,
        });
      }
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.life >= p.max) { parts.splice(i, 1); continue; }
        p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.985; p.vy *= 0.985;
        const k = 1 - p.life / p.max;
        const tw = 0.6 + 0.4 * Math.sin(p.life * 12 + p.tw);
        ctx.globalAlpha = k * tw * 0.9;
        const r = p.r * (0.5 + k * 0.5);
        ctx.drawImage(p.hue ? lilac : gold, p.x - r, p.y - r, r * 2, r * 2);
      }
      // the fairy light itself
      if (mouse) {
        ctx.globalAlpha = 0.9;
        ctx.drawImage(gold, h.x - 12, h.y - 12, 24, 24);
        ctx.globalAlpha = 1;
        ctx.drawImage(white, h.x - 4, h.y - 4, 8, 8);
      }
      ctx.globalCompositeOperation = "source-over";
      // Mouse resting and the sparkles have faded: pause until it moves again.
      if (!parts.length && (still > 0.4 || !mouse)) { run = false; return; }
      raf = requestAnimationFrame(frame);
    };
    function start() {
      if (run || document.hidden) return;
      run = true; last = performance.now(); raf = requestAnimationFrame(frame);
    }
    const vis = () => { if (document.hidden) { run = false; cancelAnimationFrame(raf); } };
    document.addEventListener("visibilitychange", vis);
    return () => { run = false; cancelAnimationFrame(raf); leave(); window.removeEventListener("pointermove", move); document.removeEventListener("mouseleave", leave); window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", vis); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 80, pointerEvents: "none" }} />;
};
