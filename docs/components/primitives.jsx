// Nicoletti — shared primitives. Exported to window for cross-file use.
const { useState, useEffect, useRef } = React;

// Ghost button — the ONLY button. Transparent, 1px gold, 0 radius.
function GhostButton({ children, arrow = true, onClick, style, className }) {
  return (
    <button className={"btn-ghost" + (className ? " " + className : "")} onClick={onClick} style={style}>
      <span>{children}</span>
      {arrow && <span className="arrow">→</span>}
    </button>
  );
}

// Section label — Montserrat SemiBold caps, gold, with optional flanking hairlines.
function SectionLabel({ children, flank = false, color, align = "center" }) {
  const ln = { width: 36, height: 1, background: color || "var(--color-gold)" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", gap: 14 }}>
      {flank && align === "center" && <span style={ln} />}
      <span className="t-label" style={color ? { color } : null}>{children}</span>
      {flank && <span style={ln} />}
    </div>
  );
}

// Gold hairline divider.
function Divider({ width = "100%", opacity = 1, margin = "0", color = "var(--color-gold)" }) {
  return <div style={{ width, height: 1, background: color, opacity, margin }} />;
}

// Fade-up reveal on enter. Reveals via IntersectionObserver (nice scroll-in
// effect in real browsers) but is BULLETPROOF: an on-mount in-view check, a
// scroll/resize fallback, AND a guaranteed timeout net so content can NEVER be
// left permanently hidden (covers print, PDF export, headless/throttled iframes).
function useReveal(threshold = 0.15, eager = false) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(eager);
  useEffect(() => {
    if (eager) return;
    const el = ref.current; if (!el) return;
    let fired = false, io = null, t = 0;
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    const cleanup = () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      if (io) io.disconnect();
      if (t) clearTimeout(t);
    };
    const fire = () => { if (fired) return; fired = true; setSeen(true); cleanup(); };
    const onScroll = () => { if (inView()) fire(); };
    if (inView()) { fire(); return; }
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => { if (es.some(e => e.isIntersecting)) fire(); }, { threshold });
      io.observe(el);
    }
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    t = setTimeout(fire, 1200); // safety net — never leave content hidden
    return cleanup;
  }, []);
  return [ref, seen];
}

// Reveal — gentle fade-up entrance, then SELF-CLEARS. The element animates from
// hidden via CSS, and on completion (animationend, with a timeout fallback) the
// animation class is removed so the resting DOM state is a plain, fully-visible
// node. This is bulletproof: content can never be left invisible (zero-JS / print
// / PDF), AND DOM-cloning screenshot tools — which restart CSS animations from
// their hidden first frame — capture the cleared, visible state. `delay` ms.
function Reveal({ children, delay = 0, threshold, as = "div", style, className }) {
  const Tag = as;
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLit(true), (delay || 0) + 1000);
    return () => clearTimeout(t);
  }, []);
  const cls = [lit ? null : "reveal-up", className].filter(Boolean).join(" ") || undefined;
  return (
    <Tag className={cls} style={{ ...style, animationDelay: (delay || 0) + "ms" }} onAnimationEnd={() => setLit(true)}>
      {children}
    </Tag>
  );
}

// Slow parallax — translateY a layer as it crosses the viewport. Subtle (luxury,
// not theme-park). strength ~0.12 = 12% of scroll distance. Honors reduced-motion.
function useParallax(strength = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const host = el.parentElement; if (!host) return;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress: -1 (below) → 0 (centered) → 1 (above)
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      const shift = -p * strength * r.height;
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.18)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [strength]);
  return ref;
}

Object.assign(window, { GhostButton, SectionLabel, Divider, useReveal, Reveal, useParallax });
