"use client";
import { useEffect, useRef } from "react";

/** Decorative market-line field: slow gold price paths drifting over a faint grid.
 *  Absolutely positioned (no layout shift), aria-hidden, paused offscreen / in hidden tabs,
 *  and rendered as a single still frame under prefers-reduced-motion. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, t = 0;
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    type Line = { pts: number[]; step: number; base: number; vol: number; alpha: number; width: number; speed: number; off: number };
    let lines: Line[] = [];
    type Dot = { x: number; y: number; r: number; vy: number; a: number };
    let dots: Dot[] = [];

    const walk = (n: number, vol: number) => {
      const pts: number[] = []; let v = 0, m = 0;
      for (let i = 0; i < n; i++) { m = m * 0.86 + (rand() - 0.5) * vol; v += m; v *= 0.97; pts.push(v); }
      return pts;
    };

    const setup = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      const count = w < 640 ? 4 : 6;
      lines = Array.from({ length: count }, (_, i) => {
        const step = 6;
        return {
          step, pts: walk(Math.ceil(w / step) + 80, h * 0.007),
          base: h * (0.22 + (i / count) * 0.62), vol: 1,
          alpha: i === 1 ? 0.75 : 0.12 + rand() * 0.22,
          width: i === 1 ? 1.6 : 1,
          speed: 0.12 + rand() * 0.18, off: 0,
        };
      });
      dots = Array.from({ length: w < 640 ? 26 : 60 }, () => ({ x: rand() * w, y: rand() * h, r: 0.5 + rand() * 1.2, vy: 0.05 + rand() * 0.15, a: 0.15 + rand() * 0.4 }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // grid
      ctx.strokeStyle = "rgba(244,239,230,0.045)"; ctx.lineWidth = 1;
      const g = w < 640 ? 48 : 72;
      ctx.beginPath();
      for (let x = (-(t * 0.15) % g); x < w; x += g) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
      for (let y = 0; y < h; y += g) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
      ctx.stroke();
      // dust
      for (const d of dots) {
        ctx.fillStyle = `rgba(212,162,81,${d.a})`;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      }
      // price lines
      for (const L of lines) {
        const shift = (L.off % L.step);
        const start = Math.floor(L.off / L.step);
        ctx.beginPath();
        for (let x = -shift, i = start; x <= w + L.step; x += L.step, i++) {
          const y = L.base + L.pts[i % L.pts.length];
          if (x === -shift) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(212,162,81,0)`);
        grad.addColorStop(0.35, `rgba(212,162,81,${L.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(230,196,138,${L.alpha})`);
        ctx.strokeStyle = grad; ctx.lineWidth = L.width; ctx.stroke();
      }
      // leading point on the key line
      const k = lines[1];
      if (k) {
        const i = Math.floor((k.off + w * 0.78) / k.step) % k.pts.length;
        const x = w * 0.78 - (k.off % k.step), y = k.base + k.pts[i];
        ctx.fillStyle = "rgba(230,196,138,0.95)";
        ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(212,162,81,0.35)"; ctx.beginPath(); ctx.arc(x, y, 7 + Math.sin(t / 30) * 2, 0, Math.PI * 2); ctx.stroke();
      }
    };

    const tick = () => {
      t++;
      for (const L of lines) {
        L.off += L.speed;
        // extend the walk so it never visibly repeats
        if (L.off / L.step + w / L.step + 4 > L.pts.length) {
          let v = L.pts[L.pts.length - 1], m = 0;
          for (let n = 0; n < 60; n++) { m = m * 0.86 + (rand() - 0.5) * h * 0.007; v = (v + m) * 0.97; L.pts.push(v); }
        }
      }
      for (const d of dots) { d.y -= d.vy; if (d.y < -4) { d.y = h + 4; d.x = rand() * w; } }
      draw();
      raf = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!reduce && !raf && visible && !document.hidden) raf = requestAnimationFrame(tick); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    setup(); draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { setup(); draw(); }, 150); };
    window.addEventListener("resize", onResize);
    start();
    return () => { stop(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
