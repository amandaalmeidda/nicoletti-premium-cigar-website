// Rolls-Royce inner-page patterns, Nicoletti-fied:
//  · FeatureScroll — full-bleed parallax "scroll-telling" section, offset text.
//  · ContentRail   — horizontal draggable rail of related content (related-models).
// Ghost buttons only · 0px radius · gold hairlines · three backgrounds.
const { useState, useRef, useEffect } = React;

/* FeatureScroll — cinematic full-bleed image (slow parallax) with an offset text
   block on a directional scrim. flip=true puts text on the right. */
function FeatureScroll({ img, video, label, title, body, cta, ctaHref, flip = false, id, screenLabel, height = "100vh" }) {
  const pref = useParallax(0.12);
  const scrim = flip
    ? "linear-gradient(270deg, rgba(10,8,6,.92) 0%, rgba(10,8,6,.55) 46%, rgba(10,8,6,.12) 100%)"
    : "linear-gradient(90deg, rgba(10,8,6,.92) 0%, rgba(10,8,6,.55) 46%, rgba(10,8,6,.12) 100%)";
  return (
    <section id={id} data-screen-label={screenLabel} style={{
      position: "relative", minHeight: height, display: "flex", alignItems: "center",
      justifyContent: flip ? "flex-end" : "flex-start", overflow: "hidden",
      background: "var(--color-near-black)", scrollMarginTop: 64,
    }}>
      <div ref={pref} style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }}>
        {video && <video src={video} poster={img} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: scrim }} />
      <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 560, padding: "0 clamp(48px, 7vw, 112px)", boxSizing: "border-box" }}>
        {label && <SectionLabel align="left">{label}</SectionLabel>}
        <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "22px 0 24px", fontSize: "clamp(32px, 4vw, 56px)", textWrap: "balance" }}>{title}</h2>
        {body && <p style={{ color: "rgba(245,240,232,.82)", maxWidth: 460, marginBottom: cta ? 40 : 0, lineHeight: 1.75 }}>{body}</p>}
        {cta && <GhostButton onClick={() => navTo(ctaHref)}>{cta}</GhostButton>}
      </Reveal>
    </section>
  );
}

/* ContentRail — generalized horizontal draggable rail (related models pattern).
   items: [{ img, label, title, href }]. surface: dark | light | sand. */
function RailItem({ item, light }) {
  const [hover, setHover] = useState(false);
  return (
    <a onClick={() => navTo(item.href)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: "0 0 auto", width: "clamp(280px, 27vw, 360px)", textDecoration: "none", cursor: "pointer",
        scrollSnapAlign: "start", display: "block",
      }}>
      <div style={{ overflow: "hidden", border: "1px solid", borderColor: hover ? "rgba(201,164,107,.5)" : "rgba(201,164,107,.2)", transition: "border-color 350ms ease" }}>
        <div style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "center", transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 1100ms cubic-bezier(0.4,0,0.2,1)", filter: "grayscale(.1)" }} />
      </div>
      <div className="t-label" style={{ marginTop: 22, color: light ? undefined : "var(--color-gold)" }}>{item.label}</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(20px,2.1vw,26px)", color: light ? "var(--color-espresso)" : "var(--color-off-white)", margin: "12px 0 16px", lineHeight: 1.3 }}>{item.title}</h3>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : (light ? "var(--color-tobacco)" : "rgba(245,240,232,.8)"), transition: "color 250ms ease" }}>
        {L("Explorar", "Explore")} →
      </span>
    </a>
  );
}

function ContentRail({ label, title, items, surface = "dark" }) {
  const scroller = useRef(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const light = surface !== "dark";
  const cls = surface === "dark" ? "surface-dark" : surface === "sand" ? "surface-sand" : "surface-light";

  const recompute = () => { const el = scroller.current; if (!el) return; const max = el.scrollWidth - el.clientWidth; setProgress(max > 0 ? el.scrollLeft / max : 0); };
  useEffect(() => { recompute(); }, []);
  const step = (dir) => { const el = scroller.current; if (!el) return; const card = el.querySelector("a"); const w = card ? card.getBoundingClientRect().width + 24 : 340; el.scrollBy({ left: dir * w, behavior: "smooth" }); };
  const onDown = (e) => { const el = scroller.current; if (!el) return; drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false }; el.setPointerCapture && el.setPointerCapture(e.pointerId); };
  const onMove = (e) => { const el = scroller.current; if (!el || !drag.current.down) return; const dx = e.clientX - drag.current.startX; if (Math.abs(dx) > 4) drag.current.moved = true; el.scrollLeft = drag.current.startLeft - dx; };
  const onUp = () => { drag.current.down = false; };
  const onClickCapture = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } };

  const trackBg = light ? "rgba(31,23,24,.16)" : "rgba(201,164,107,.22)";
  const hint = light ? "rgba(31,23,24,.45)" : "rgba(245,240,232,.4)";

  return (
    <section data-screen-label="Continue Rail" className={cls} style={{ padding: "140px 0 130px", boxSizing: "border-box", overflow: "hidden" }}>
      <Reveal style={{ padding: "0 80px", marginBottom: 52, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
        <div style={{ maxWidth: 620 }}>
          <SectionLabel align="left">{label}</SectionLabel>
          <h2 className="t-h2" style={{ color: light ? "var(--color-espresso)" : "var(--color-off-white)", margin: "20px 0 0", fontSize: "clamp(30px, 3.6vw, 48px)" }}>{title}</h2>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          <button className={"rail-arrow" + (light ? " rail-arrow-light" : "")} onClick={() => step(-1)} aria-label="Anterior">←</button>
          <button className={"rail-arrow" + (light ? " rail-arrow-light" : "")} onClick={() => step(1)} aria-label="Próximo">→</button>
        </div>
      </Reveal>
      <div ref={scroller} className="rail-scroller" onScroll={recompute}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onClickCapture={onClickCapture}
        style={{ display: "flex", gap: 24, padding: "0 80px", overflowX: "auto", scrollSnapType: "x proximity", cursor: "grab", touchAction: "pan-y" }}>
        {items.map((it, i) => <RailItem key={i} item={it} light={light} />)}
        <div style={{ flex: "0 0 56px" }} />
      </div>
      <div style={{ padding: "0 80px", marginTop: 42, display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ flex: 1, maxWidth: 280, height: 1, background: trackBg, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: -0.5, height: 2, width: `${Math.max(12, progress * 100)}%`, background: "var(--color-gold)", transition: "width 120ms linear" }} />
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: hint }}>{L("Arraste para explorar", "Drag to explore")}</span>
      </div>
    </section>
  );
}

Object.assign(window, { FeatureScroll, ContentRail });
