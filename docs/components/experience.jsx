// Experience — "The Art of Appreciation". A long-scroll, Rolls-Royce-style
// narrative about the ritual of a Nicoletti. Rhythm: video hero → text+button →
// three photos → text+button → full photo → text → full photo → oxblood text+button
// → oxblood slider → text → white side-slider → oxblood text+button → continue rail.
// Oxblood (#2A1013) is the signature crimson, deepened — used as the rich dark
// "signature colour" background rather than a flat red panel.
const { useState, useEffect, useRef } = React;

const OXBLOOD = "#2A1013";

/* Autoplaying muted loop video — plays only while on screen. */
function EVideo({ src, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { const p = el.play(); if (p && p.catch) p.catch(() => {}); }
      else el.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} loop muted playsInline preload="metadata" style={style} />;
}

/* Scroll reveal — fade + rise on enter. Bulletproof (geometry + IO + beforeprint
   instant path + direct DOM write), so content is never left hidden. */
function EReveal({ children, y = 40, delay = 0, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    let done = false, t = 0, io = null;
    const inView = () => { const r = el.getBoundingClientRect(); const vh = window.innerHeight || document.documentElement.clientHeight; return r.top < vh * 0.88 && r.bottom > 0; };
    const reveal = () => { if (done) return; done = true; setShown(true); el.style.opacity = "1"; el.style.transform = "translateY(0)"; el.style.filter = "blur(0px)"; cleanup(); };
    const onGeom = () => { if (!done && inView()) reveal(); };
    const revealInstant = () => { el.style.transition = "none"; el.style.opacity = "1"; el.style.transform = "translateY(0)"; el.style.filter = "blur(0px)"; reveal(); };
    const cleanup = () => { if (io) io.disconnect(); if (t) clearTimeout(t); window.removeEventListener("scroll", onGeom); window.removeEventListener("resize", onGeom); };
    if (inView()) { requestAnimationFrame(() => requestAnimationFrame(reveal)); t = setTimeout(reveal, 2600); }
    else {
      if ("IntersectionObserver" in window) { io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) reveal(); }, { threshold: 0.18, rootMargin: "0px 0px -14% 0px" }); io.observe(el); }
      else { t = setTimeout(reveal, 1200); }
      window.addEventListener("scroll", onGeom, { passive: true });
      window.addEventListener("resize", onGeom, { passive: true });
    }
    window.addEventListener("beforeprint", revealInstant);
    return () => { cleanup(); window.removeEventListener("beforeprint", revealInstant); };
  }, []);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0, transform: shown ? "translateY(0)" : `translateY(${y}px)`, filter: shown ? "blur(0px)" : "blur(6px)",
      transition: "opacity 1100ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1), filter 1100ms cubic-bezier(0.22,1,0.36,1)",
      transitionDelay: delay ? delay + "ms" : "0ms", willChange: "transform, opacity, filter", ...style,
    }}>{children}</div>
  );
}

/* ---------- 1 · Video hero + big centered header ---------- */
function ExpHero() {
  return (
    <section data-screen-label="Experience — Hero" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 620, overflow: "hidden", background: "var(--color-near-black)" }}>
      <EVideo src="assets/video/hero-moment.mp4" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.52), rgba(10,8,6,.26) 38%, transparent 62%, rgba(10,8,6,.52))" }}></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", zIndex: 2 }}>
        <EReveal y={26} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
          <div className="t-label" style={{ color: "var(--color-off-white)", opacity: 0.85, fontSize: 12, letterSpacing: "0.34em" }}>{L("A Experiência", "The Experience")}</div>
          <h1 className="t-h1" style={{ margin: 0, fontStyle: "normal", fontWeight: 300, fontSize: "clamp(40px, 6vw, 96px)", letterSpacing: "0.07em", textTransform: "uppercase", lineHeight: 1.06 }}>{L("A Arte de Apreciar", "The Art of Appreciation")}</h1>
        </EReveal>
      </div>
      <ScrollCue />
    </section>
  );
}

/* ---------- Text + thin divider + (optional) button, light or soft-grey ---------- */
function TextButton({ title, paras, cta, ctaHref, label, bg, screenLabel }) {
  return (
    <section data-screen-label={screenLabel} style={{ background: bg || "var(--color-warm-white)", padding: "clamp(120px,13vw,175px) 24px", boxSizing: "border-box" }}>
      <EReveal y={38} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {label && <SectionLabel>{label}</SectionLabel>}
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4.2vw,56px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: label ? "20px 0 0" : 0, textTransform: "uppercase", textWrap: "balance" }}>{title}</h2>
        <div style={{ width: 46, height: 1, background: "rgba(31,23,24,.22)", margin: "32px 0" }}></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 620 }}>
          {paras.map((p, k) => <p key={k} style={{ margin: 0, color: "rgba(31,23,24,.8)", fontSize: 16.5, lineHeight: 1.85 }}>{p}</p>)}
        </div>
        {cta && <div style={{ marginTop: 44 }}><GhostButton onClick={() => navTo(ctaHref)}>{cta}</GhostButton></div>}
      </EReveal>
    </section>
  );
}

/* ---------- Text only (white), title + subtitle + body ---------- */
function TextOnly({ label, title, subtitle, paras, screenLabel }) {
  return (
    <section className="surface-light" data-screen-label={screenLabel} style={{ padding: "clamp(120px,13vw,175px) 24px", boxSizing: "border-box" }}>
      <EReveal y={38} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        {label && <SectionLabel>{label}</SectionLabel>}
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4.2vw,56px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: label ? "20px 0 0" : 0, textTransform: "uppercase", textWrap: "balance" }}>{title}</h2>
        {subtitle && <p className="t-pullquote" style={{ color: "var(--color-tobacco)", fontStyle: "italic", margin: "26px 0 0", fontSize: "clamp(19px,1.9vw,25px)", lineHeight: 1.5 }}>{subtitle}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600, margin: "32px auto 0" }}>
          {paras.map((p, k) => <p key={k} style={{ margin: 0, color: "rgba(31,23,24,.8)", fontSize: 16.5, lineHeight: 1.85 }}>{p}</p>)}
        </div>
      </EReveal>
    </section>
  );
}

/* ---------- Text + button on oxblood (signature colour) ---------- */
function OxbloodText({ label, title, paras, cta, ctaHref, screenLabel }) {
  return (
    <section data-screen-label={screenLabel} style={{ background: OXBLOOD, padding: "clamp(120px,13vw,180px) 24px", boxSizing: "border-box" }}>
      <EReveal y={40} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {label && <SectionLabel color="var(--color-gold)">{label}</SectionLabel>}
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4.2vw,56px)", letterSpacing: "0.04em", color: "var(--color-off-white)", margin: label ? "20px 0 0" : 0, textTransform: "uppercase", textWrap: "balance" }}>{title}</h2>
        <div style={{ width: 46, height: 1, background: "rgba(201,164,107,.5)", margin: "30px 0" }}></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 600 }}>
          {paras.map((p, k) => <p key={k} style={{ margin: 0, color: "rgba(245,240,232,.82)", fontSize: 16.5, lineHeight: 1.85 }}>{p}</p>)}
        </div>
        {cta && <div style={{ marginTop: 44 }}><GhostButton onClick={() => navTo(ctaHref)}>{cta}</GhostButton></div>}
      </EReveal>
    </section>
  );
}

/* ---------- Three large photos (editorial offset trio) ---------- */
function ThreePhotos({ imgs }) {
  return (
    <section className="surface-light" data-screen-label="Experience — Three Photos" style={{ padding: "clamp(40px,6vw,80px) clamp(24px,5vw,80px) clamp(100px,11vw,150px)", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px,2.4vw,40px)", alignItems: "start" }}>
        {imgs.map((img, k) => (
          <EReveal key={k} y={42} delay={k * 110} style={{ display: "block" }}>
            <div style={{ width: "100%", aspectRatio: "3 / 4", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", marginTop: k === 1 ? 64 : 0 }}></div>
          </EReveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Full-bleed photo ---------- */
function FullPhoto({ img, screenLabel }) {
  return (
    <section data-screen-label={screenLabel} style={{ position: "relative", width: "100%", height: "100vh", minHeight: 560, overflow: "hidden", background: "var(--color-near-black)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.16), transparent 36%, transparent 70%, rgba(10,8,6,.3))" }}></div>
    </section>
  );
}

/* ---------- Center-peek slider (oxblood) + caption ---------- */
function PeekSlider({ imgs, label, title, body, dark, screenLabel }) {
  const [i, setI] = useState(0);
  const n = imgs.length;
  const go = (v) => setI(((v % n) + n) % n);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 5600);
    return () => clearInterval(t);
  }, [auto]);
  const manual = (v) => { setAuto(false); go(v); };
  const SW = "min(62vw, 940px)";
  const ink = dark ? "var(--color-off-white)" : "var(--color-espresso)";
  const dim = dark ? "rgba(245,240,232,.82)" : "rgba(31,23,24,.78)";
  const dotOff = dark ? "rgba(245,240,232,.3)" : "rgba(31,23,24,.25)";
  const dotOn = dark ? "var(--color-gold)" : "var(--color-tobacco)";
  const arrowStyle = { background: "transparent", border: "none", cursor: "pointer", padding: 6, color: ink, display: "flex", alignItems: "center" };
  const chev = (dir) => (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
      <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <section data-screen-label={screenLabel} style={{ background: dark ? OXBLOOD : "var(--color-warm-white)", padding: "clamp(110px,11vw,160px) 0", boxSizing: "border-box", overflow: "hidden" }}>
      <EReveal y={36}>
        <div style={{ display: "flex", gap: 28, transform: `translateX(calc(50vw - (${SW}) / 2 - ${i} * ((${SW}) + 28px)))`, transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}>
          {imgs.map((img, k) => (
            <div key={k} onClick={() => k !== i && manual(k)} style={{ flex: `0 0 ${SW}`, aspectRatio: "16 / 9", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: k === i ? 1 : 0.4, transition: "opacity 700ms ease", cursor: k === i ? "default" : "pointer" }}></div>
          ))}
        </div>
      </EReveal>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginTop: 36 }}>
        <button aria-label={L("Anterior", "Previous")} onClick={() => manual(i - 1)} style={arrowStyle}>{chev("prev")}</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {imgs.map((_, k) => (
            <span key={k} onClick={() => manual(k)} style={{ width: 7, height: 7, borderRadius: "50%", cursor: "pointer", background: k === i ? dotOn : dotOff, transition: "background 300ms ease" }}></span>
          ))}
        </div>
        <button aria-label={L("Próximo", "Next")} onClick={() => manual(i + 1)} style={arrowStyle}>{chev("next")}</button>
      </div>
      <EReveal y={28} style={{ textAlign: "center", maxWidth: 640, margin: "clamp(44px,5vw,64px) auto 0", padding: "0 24px" }}>
        <SectionLabel color={dark ? "var(--color-gold)" : undefined}>{label}</SectionLabel>
        <h3 className="t-h3" style={{ color: ink, margin: "18px 0 16px", fontWeight: 500, fontSize: "clamp(24px,2.6vw,34px)" }}>{title}</h3>
        <p style={{ color: dim, margin: 0, fontSize: 16, lineHeight: 1.8 }}>{body}</p>
      </EReveal>
    </section>
  );
}

/* ---------- White side-slider (image left, text right) — the families ---------- */
function SideSlider({ heading, sub, items }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const cur = items[i];
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 5200);
    return () => clearInterval(t);
  }, [auto]);
  const manual = (v) => { setAuto(false); setI(((v % n) + n) % n); };
  const arrowStyle = { background: "transparent", border: "1px solid rgba(31,23,24,.3)", width: 46, height: 46, borderRadius: 0, cursor: "pointer", color: "var(--color-espresso)", display: "flex", alignItems: "center", justifyContent: "center" };
  const chev = (dir) => (
    <svg width="8" height="14" viewBox="0 0 9 16" fill="none" style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
      <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <section className="surface-light" data-screen-label="Experience — Side Slider" style={{ padding: "clamp(110px,12vw,165px) clamp(24px,5vw,80px)", boxSizing: "border-box" }}>
      <EReveal y={34} style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(56px,6vw,80px)" }}>
        <SectionLabel>{sub}</SectionLabel>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: "20px 0 0", textTransform: "uppercase" }}>{heading}</h2>
      </EReveal>
      <EReveal y={36} style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
        <div style={{ overflow: "hidden" }}>
          <div key={i} className="exp-fade" style={{ width: "100%", aspectRatio: "4 / 3", backgroundImage: `url(${cur.img})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div className="t-label" style={{ color: "var(--color-tobacco)" }}>{pick(cur.gauge)}</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(28px,3vw,40px)", color: "var(--color-espresso)", margin: "16px 0 18px", letterSpacing: "0.02em" }}>{cur.name}</h3>
          <p style={{ color: "rgba(31,23,24,.8)", fontSize: 16.5, lineHeight: 1.8, margin: "0 0 32px", maxWidth: 440 }}>{pick(cur.blurb)}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <button aria-label={L("Anterior", "Previous")} onClick={() => manual(i - 1)} style={arrowStyle}>{chev("prev")}</button>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.12em", color: "rgba(31,23,24,.55)" }}>{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
            <button aria-label={L("Próximo", "Next")} onClick={() => manual(i + 1)} style={arrowStyle}>{chev("next")}</button>
          </div>
          <GhostButton onClick={() => navTo("A Coleção.html")}>{L("Ver a coleção", "View the collection")}</GhostButton>
        </div>
      </EReveal>
    </section>
  );
}

/* ---------- Editorial slide — image bleeds left, text right, dots ---------- */
function EditorialSlider({ heading, sub, items }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const cur = items[i];
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 5400);
    return () => clearInterval(t);
  }, [auto]);
  const manual = (v) => { setAuto(false); setI(((v % n) + n) % n); };
  return (
    <section className="surface-light" data-screen-label="Experience — Editorial Slider" style={{ padding: "clamp(110px,12vw,165px) 0", boxSizing: "border-box", overflow: "hidden" }}>
      <EReveal y={34} style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(56px,6vw,80px)", padding: "0 24px" }}>
        <SectionLabel>{sub}</SectionLabel>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: "20px 0 0", textTransform: "uppercase" }}>{heading}</h2>
      </EReveal>
      <EReveal y={36} style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: "clamp(36px,5vw,72px)", alignItems: "center" }}>
        <div style={{ overflow: "hidden" }}>
          <div key={i} className="exp-fade" style={{ width: "100%", aspectRatio: "16 / 10", backgroundImage: `url(${cur.img})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
        </div>
        <div style={{ paddingRight: "clamp(24px,6vw,96px)", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(26px,2.8vw,38px)", color: "var(--color-espresso)", margin: "0 0 18px", letterSpacing: "0.02em" }}>{pick(cur.title)}</h3>
          <p style={{ color: "rgba(31,23,24,.8)", fontSize: 16.5, lineHeight: 1.8, margin: "0 0 30px", maxWidth: 420 }}>{pick(cur.blurb)}</p>
          <span onClick={() => navTo(cur.href)} style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-tobacco)", cursor: "pointer" }}>{L("Descobrir", "Discover more")} →</span>
          <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
            {items.map((_, k) => (
              <span key={k} onClick={() => manual(k)} style={{ width: 7, height: 7, borderRadius: "50%", cursor: "pointer", background: k === i ? "var(--color-tobacco)" : "rgba(31,23,24,.25)", transition: "background 300ms ease" }}></span>
            ))}
          </div>
        </div>
      </EReveal>
    </section>
  );
}

/* ---------- Text + contained video, light ---------- */
function TextVideo({ label, title, paras, src }) {
  return (
    <section className="surface-light" data-screen-label="Experience — Text + Video" style={{ padding: "clamp(120px,13vw,170px) 24px", boxSizing: "border-box" }}>
      <EReveal y={36} style={{ maxWidth: 720, margin: "0 auto clamp(56px,6vw,76px)", textAlign: "center" }}>
        {label && <SectionLabel>{label}</SectionLabel>}
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4.2vw,56px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: label ? "20px 0 0" : 0, textTransform: "uppercase" }}>{title}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 560, margin: "28px auto 0" }}>
          {paras.map((p, k) => <p key={k} style={{ margin: 0, color: "rgba(31,23,24,.8)", fontSize: 16.5, lineHeight: 1.8 }}>{p}</p>)}
        </div>
      </EReveal>
      <EReveal y={30} style={{ maxWidth: 1040, margin: "0 auto" }}>
        <EVideo src={src} style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", background: "#000" }} />
      </EReveal>
    </section>
  );
}

/* ---------- Vertical photo slider ---------- */
function VerticalSlider({ label, title, imgs }) {
  const [i, setI] = useState(0);
  const n = imgs.length;
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 4200);
    return () => clearInterval(t);
  }, [auto]);
  const manual = (v) => { setAuto(false); setI(((v % n) + n) % n); };
  const arrowStyle = { background: "transparent", border: "1px solid rgba(31,23,24,.3)", width: 44, height: 44, borderRadius: 0, cursor: "pointer", color: "var(--color-espresso)", display: "flex", alignItems: "center", justifyContent: "center" };
  const chev = (dir) => (
    <svg width="14" height="8" viewBox="0 0 16 9" fill="none" style={{ transform: dir === "up" ? "rotate(180deg)" : "none" }}>
      <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <section className="surface-light" data-screen-label="Experience — Vertical Slider" style={{ padding: "clamp(110px,12vw,160px) clamp(24px,5vw,80px)", boxSizing: "border-box" }}>
      <EReveal y={34} style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(48px,5vw,72px)" }}>
        <SectionLabel>{label}</SectionLabel>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4vw,52px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: "20px 0 0", textTransform: "uppercase" }}>{title}</h2>
      </EReveal>
      <EReveal y={36} style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: "clamp(24px,4vw,56px)", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "min(74vw, 620px)", height: "clamp(440px, 72vh, 720px)", overflow: "hidden", background: "var(--color-near-black)" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", transform: `translateY(-${i * 100}%)`, transition: "transform 850ms cubic-bezier(0.22,1,0.36,1)" }}>
            {imgs.map((img, k) => (
              <div key={k} style={{ flex: "0 0 100%", height: "100%", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <button aria-label={L("Anterior", "Previous")} onClick={() => manual(i - 1)} style={arrowStyle}>{chev("up")}</button>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {imgs.map((_, k) => (
              <span key={k} onClick={() => manual(k)} style={{ width: 7, height: 7, borderRadius: "50%", cursor: "pointer", background: k === i ? "var(--color-tobacco)" : "rgba(31,23,24,.25)", transition: "background 300ms ease" }}></span>
            ))}
          </div>
          <button aria-label={L("Próximo", "Next")} onClick={() => manual(i + 1)} style={arrowStyle}>{chev("down")}</button>
        </div>
      </EReveal>
    </section>
  );
}

/* ---------- Explore Further — 3 doorways (dark) ---------- */
function ExploreCardX({ card, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <EReveal y={40} delay={delay} style={{ height: "100%" }}>
      <a onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => navTo(card.href)}
        style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "3 / 4", backgroundImage: `url(${card.img})`, backgroundSize: "cover", backgroundPosition: "center", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 800ms cubic-bezier(0.4,0,0.2,1)" }}></div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,0) 55%, rgba(10,8,6,.55))" }}></div>
        </div>
        <div style={{ paddingTop: 26 }}>
          <SectionLabel align="left">{pick(card.label)}</SectionLabel>
          <h3 className="t-h3" style={{ color: "var(--color-off-white)", margin: "16px 0 14px", fontWeight: 500, fontSize: "clamp(22px,1.7vw,27px)", textWrap: "balance" }}>{pick(card.title)}</h3>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : "rgba(201,164,107,.7)", transition: "color 200ms ease" }}>{L("Explorar", "Explore")} →</span>
        </div>
      </a>
    </EReveal>
  );
}
function ExploreFurther({ cards }) {
  return (
    <section className="surface-dark" data-screen-label="Experience — Explore Further" style={{ padding: "clamp(96px,11vw,150px) clamp(40px,6vw,96px)", boxSizing: "border-box" }}>
      <EReveal y={34} style={{ textAlign: "center", marginBottom: "clamp(56px,6vw,80px)" }}>
        <SectionLabel flank>{L("Explore Mais", "Explore Further")}</SectionLabel>
        <p className="t-pullquote" style={{ color: "rgba(245,240,232,.5)", margin: "22px 0 0", fontSize: "clamp(21px,2vw,28px)" }}>{L("Continue a sua jornada", "Continue your journey")}</p>
      </EReveal>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(28px,3vw,52px)" }}>
        {cards.map((c, k) => <ExploreCardX key={k} card={c} delay={k * 90} />)}
      </div>
    </section>
  );
}

/* ====================== EXPERIENCE PAGE (assembled) ====================== */
function ExperiencePage() {
  const HERO = "assets/photography/moment-lounge-hands.jpeg";
  const families = [
    { name: "Nirvana Supreme", gauge: { pt: "Ring 52 · Suavidade", en: "Ring 52 · Softness" }, img: "assets/photography/cigar-smoke-wood.jpeg", blurb: { pt: "O primeiro tempo da noite. Cedro e creme, uma suavidade que convida — a entrada na coleção.", en: "The opening movement of the night. Cedar and cream, a softness that invites — the entry into the collection." } },
    { name: "Gold Selection", gauge: { pt: "Ring 52/56 · Equilíbrio", en: "Ring 52/56 · Balance" }, img: "assets/photography/cigar-lighter-dark.jpeg", blurb: { pt: "O centro da coleção. Presença solar e intensidade média — onde o DNA cubano e o dulçor baiano se encontram.", en: "The heart of the collection. Solar presence and medium intensity — where Cuban DNA and Bahian sweetness meet." } },
    { name: "Borogod Supreme", gauge: { pt: "Ring 58 · Caráter", en: "Ring 58 · Character" }, img: "assets/photography/moment-lounge-hands.jpeg", blurb: { pt: "A assinatura brasileira. Couro, frutas secas, corpo cheio — presença imediata, sem pedir licença.", en: "The Brazilian signature. Leather, dried fruit, full body — immediate presence, asking no permission." } },
    { name: "Platinum Selection", gauge: { pt: "Ring 60 · Reserva", en: "Ring 60 · Reserve" }, img: "assets/photography/process-cut-cigars.jpeg", blurb: { pt: "O cume da coleção. Final longo, complexidade, reserva absoluta — para noites que não contam o tempo.", en: "The summit of the collection. A long finish, complexity, absolute reserve — for nights that do not count the hours." } },
  ];
  return (
    <PageShell heroImg={HERO}>
      <ExpHero />
      <TextButton screenLabel="Experience — Craft Ritual"
        title={L("Crie o seu ritual", "Craft your ritual")}
        paras={[
          L("Uma casa brasileira de charutos premium — quatro famílias e dez referências, criadas por Franco Nicoletti em Cruz das Almas, na Bahia. E um charuto Nicoletti é mais do que um charuto: uma hora reservada, um gesto deliberado, uma forma de prestar atenção — cada referência curada para acompanhar um momento, e elevá-lo.", "A Brazilian premium cigar house — four families and ten references, blended by Franco Nicoletti in Cruz das Almas, Bahia. And a Nicoletti is more than a cigar: an hour set aside, a deliberate gesture, a way of paying attention — each reference curated to accompany a moment, and to elevate it."),
          L("Descubra como ler, acender e apreciar um Nicoletti, ou fale com o atelier para encontrar a referência do seu momento.", "Discover how to read, light and savour a Nicoletti, or speak with the atelier to find the reference for your moment."),
        ]}
        cta={L("Fale com o atelier", "Speak with the atelier")} ctaHref="Contact.html" />
      <ThreePhotos imgs={["assets/photography/process-cut-cigars.jpeg", "assets/photography/cigar-smoke-wood.jpeg", "assets/photography/moment-lounge-hands.jpeg"]} />
      <TextButton screenLabel="Experience — Three Thirds"
        label={L("Os Três Terços", "The Three Thirds")}
        title={L("Como ler um Nicoletti", "How to read a Nicoletti")}
        paras={[
          L("Todo Nicoletti se revela em três tempos. O primeiro terço anuncia a intenção; o meio revela o blend por completo; o final é a promessa cumprida — o sabor que permanece depois da última tragada.", "Every Nicoletti reveals itself in three movements. The first third announces the intention; the middle reveals the blend in full; the finish is the promise fulfilled — the flavour that lingers after the final draw."),
        ]}
        cta={L("Ver a coleção", "View the collection")} ctaHref="A Coleção.html" />
      <FullPhoto img="assets/photography/cigar-smoke-wood.jpeg" screenLabel="Experience — Full Photo I" />
      <TextOnly screenLabel="Experience — Red & Black"
        label={L("A Lógica das Capas", "The Logic of the Wrappers")}
        title="Red & Black"
        subtitle={L("Duas capas, uma origem.", "Two wrappers, one origin.")}
        paras={[
          L("A Red — natural — abre a noite com fluidez e dulçor. A Black — madura — aprofunda-a com gravidade, cacau e silêncio. A escolha não é de força. É de momento.", "The Red — natural — opens the night with fluidity and sweetness. The Black — maduro — deepens it with gravity, cocoa and silence. The choice is not of strength. It is of moment."),
        ]} />
      <FullPhoto img="assets/photography/cigar-lighter-dark.jpeg" screenLabel="Experience — Full Photo II" />
      <OxbloodText screenLabel="Experience — The Ritual"
        label={L("O Ritual", "The Ritual")}
        title={L("O primeiro fósforo da noite.", "The first match of the night.")}
        paras={[
          L("O acendimento não é uma formalidade — é onde a atenção começa. Toste o pé do charuto alguns segundos acima da chama, nunca nela; depois trague suavemente e gire até a brasa acender por igual em toda a borda.", "The lighting is not a formality — it is where attention begins. Toast the foot a few seconds above the flame, never in it; then draw gently and turn the cigar until the ember glows evenly across its edge."),
          L("Fósforo de cedro, chama paciente, rotação lenta. A noite começa quando você decide que ela não tem pressa.", "A cedar match, a patient flame, a slow rotation. The night begins when you decide it is in no hurry."),
        ]}
        cta={L("Conheça o clube", "Discover the club")} ctaHref="The Club.html" />
      <PeekSlider dark screenLabel="Experience — Pairing Slider"
        imgs={["assets/photography/cigar-lighter-dark.jpeg", "assets/photography/cigar-smoke-wood.jpeg", "assets/photography/process-cut-cigars.jpeg", "assets/photography/moment-lounge-hands.jpeg"]}
        label={L("Harmonização", "Pairing")}
        title={L("O par exato", "The exact pairing")}
        body={L("Vinho do Porto, single malt, café de origem. A cada capa, um par — e a cada momento, o seu. O atelier indica o encontro exato.", "Vintage Port, single malt, single-origin coffee. To each wrapper, a pairing — and to each moment, its own. The atelier advises the exact meeting.")} />
      <TextOnly screenLabel="Experience — The Hour"
        label={L("O Tempo", "Time")}
        title={L("A hora reservada", "The hour set aside")}
        paras={[
          L("Um Nicoletti é feito para queimar devagar — um robusto sem pressa dura cerca de quarenta minutos; um Churchill inteiro, perto de duas horas. E é esse o ponto: um Nicoletti não se mede em tragadas, mas no tempo que você decide oferecer a si mesmo.", "A Nicoletti is made to burn slowly — an unhurried robusto runs about forty minutes; a full Churchill, closer to two hours. Which is the point: a Nicoletti is not measured in draws, but in the time you decide to give yourself."),
          L("É o luxo de não ter pressa.", "It is the luxury of being in no hurry."),
        ]} />
      <SideSlider heading={L("Quatro famílias", "Four families")} sub={L("A Coleção", "The Collection")} items={families} />
      <OxbloodText screenLabel="Experience — The Invitation"
        label={L("O Clube", "The Club")}
        title={L("Não há ingresso. Há convite.", "There is no ticket. There is an invitation.")}
        paras={[
          L("A apreciação de um Nicoletti culmina à mesa — entre conversa, silêncio e atenção. A Nicoletti não é vendida em lojas: você solicita uma introdução pelo atelier, é recebido num lounge parceiro e, a partir daí, a coleção completa se abre para você.", "The appreciation of a Nicoletti culminates at the table — amid conversation, silence and attention. Nicoletti is not sold in shops: you request an introduction through the atelier, are welcomed at a partner lounge, and from there the full collection opens to you."),
          L("O Lounge é o primeiro passo.", "The Lounge is the first step."),
        ]}
        cta={L("Começar a conversa", "Begin the conversation")} ctaHref="The Club.html" />
      <TextOnly screenLabel="Experience — Let Inspiration Guide"
        title={L("Deixe a inspiração guiar", "Let inspiration guide you")}
        paras={[
          L("As referências curadas por Franco Nicoletti são um ponto de partida — não um destino. Cada noite escreve a sua própria história; cabe a você escolher o tempo, a capa e a companhia.", "The references curated by Franco Nicoletti are a starting point — not a destination. Each night writes its own story; the time, the wrapper and the company are yours to choose."),
        ]} />
      <EditorialSlider sub={L("Momentos", "Moments")} heading={L("Quatro tempos de uma noite", "Four movements of a night")}
        items={[
          { title: { pt: "O Acendimento", en: "The Lighting" }, blurb: { pt: "Fósforo de cedro, chama paciente, rotação lenta. A noite começa quando você decide que ela não tem pressa.", en: "A cedar match, a patient flame, a slow rotation. The night begins when you decide it is in no hurry." }, img: "assets/photography/cigar-lighter-dark.jpeg", href: "The Club.html" },
          { title: { pt: "A Conversa", en: "The Conversation" }, blurb: { pt: "À mesa, entre amigos e desconhecidos. O charuto não interrompe a conversa — ele a aprofunda.", en: "At the table, among friends and strangers. The cigar does not interrupt the conversation — it deepens it." }, img: "assets/photography/moment-lounge-hands.jpeg", href: "The Club.html" },
          { title: { pt: "O Silêncio", en: "The Silence" }, blurb: { pt: "O último terço pede atenção. Fumaça mais fria, sabor que permanece — a promessa cumprida.", en: "The final third asks for attention. Cooler smoke, a lingering flavour — the promise fulfilled." }, img: "assets/photography/cigar-smoke-wood.jpeg", href: "Journal.html" },
          { title: { pt: "A Origem", en: "The Origin" }, blurb: { pt: "Cada folha carrega Cruz das Almas. O Recôncavo Baiano, num gesto de fumaça.", en: "Every leaf carries Cruz das Almas. The Recôncavo Baiano, in a gesture of smoke." }, img: "assets/photography/process-cut-cigars.jpeg", href: "Heritage.html" },
        ]} />
      <TextButton screenLabel="Experience — A Selection" bg="#EBEAE7"
        label={L("Sob Medida", "Made to Measure")}
        title={L("Uma seleção para o seu momento", "A selection for your moment")}
        paras={[
          L("Diga-nos o momento — uma noite, uma celebração, um presente — e o atelier indica a referência exata. Cada Nicoletti chega por encontro, não por catálogo.", "Tell us the moment — an evening, a celebration, a gift — and the atelier will advise the exact reference. Every Nicoletti arrives by meeting, not by catalogue."),
        ]}
        cta={L("Fale com o atelier", "Speak with the atelier")} ctaHref="Contact.html" />
      <FullPhoto img="assets/photography/process-cut-cigars.jpeg" screenLabel="Experience — Full Photo III" />
      <TextVideo
        label={L("Inspiração", "Inspiration")}
        title={L("Tudo começa com a atenção", "It all begins with attention")}
        paras={[
          L("Veja a coleção ganhar vida — o gesto, a fumaça, a luz quente de uma noite que não tem pressa.", "Watch the collection come to life — the gesture, the smoke, the warm light of a night in no hurry."),
        ]}
        src="assets/video/hero-03.mp4" />
      <VerticalSlider label={L("A Galeria", "The Gallery")} title={L("A casa Nicoletti", "The house of Nicoletti")}
        imgs={["assets/photography/cigar-lighter-dark.jpeg", "assets/photography/moment-lounge-hands.jpeg", "assets/photography/cigar-smoke-wood.jpeg", "assets/photography/process-cut-cigars.jpeg"]} />
      <ExploreFurther cards={[
        { img: "assets/photography/cigar-smoke-wood.jpeg", label: { pt: "Herança", en: "Heritage" }, title: { pt: "Cruz das Almas, a origem.", en: "Cruz das Almas, the origin." }, href: "Heritage.html" },
        { img: "assets/photography/process-cut-cigars.jpeg", label: { pt: "A Coleção", en: "The Collection" }, title: { pt: "Quatro famílias, dez referências.", en: "Four families, ten references." }, href: "A Coleção.html" },
        { img: "assets/photography/cigar-lighter-dark.jpeg", label: { pt: "O Clube", en: "The Club" }, title: { pt: "Não há ingresso. Há convite.", en: "There is no ticket. There is an invitation." }, href: "The Club.html" },
      ]} />
    </PageShell>
  );
}

Object.assign(window, { ExperiencePage });
