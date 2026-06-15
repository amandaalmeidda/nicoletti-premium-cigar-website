// Homepage hero — three stacked full-screen moments you scroll through. Slide 1 is
// a looping video; 2 & 3 are the approved C-category stills. Near Black base. The
// left rail tracks/jumps between moments; vinyl widget stays fixed bottom-left.
const { useState, useEffect, useRef } = React;

const HERO_SLIDES = [
  {
    img: "assets/photography/box-presentation.jpeg",
    video: "assets/video/hero-home-01.mp4",
    label: { pt: "A Coleção", en: "The Collection" },
    headline: { pt: ["Quatro famílias.", "Uma seleção privada."], en: ["Four families.", "A private selection."] },
    cta: { pt: "Descubra a coleção", en: "Discover the collection" }, link: "A Coleção.html",
  },
  {
    img: "assets/photography/tobacco-field.jpeg",
    video: "assets/video/hero-home-02.mp4",
    label: { pt: "A Origem", en: "The Origin" },
    headline: { pt: ["Nascido em Cruz das Almas,", "no Recôncavo Baiano."], en: ["Born in Cruz das Almas,", "in the Recôncavo Baiano."] },
    cta: { pt: "Descubra a origem", en: "Discover the heritage" }, link: "Heritage.html",
  },
  {
    img: "assets/photography/lounge-interior.jpeg",
    video: "assets/video/hero-home-03.mp4",
    label: { pt: "Os Lounges", en: "The Lounges" },
    headline: { pt: ["Encontrado nas mesas", "mais exigentes do mundo."], en: ["Found at the most", "discerning tables in the world."] },
    cta: { pt: "Encontre um lounge", en: "Find a lounge" }, link: "The Club.html",
  },
];

function MomentPanel({ slide, index, setRef }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [vReady, setVReady] = useState(false);
  useEffect(() => { setRef(index, ref.current); }, []);

  // Restart the video from the very beginning each time this panel scrolls into
  // view; pause + rewind once it leaves so the next return is a clean restart.
  useEffect(() => {
    const el = ref.current;
    if (!el || !slide.video) return;
    const io = new IntersectionObserver(([e]) => {
      const v = videoRef.current; if (!v) return;
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        try { v.currentTime = 0; const p = v.play(); if (p && p.catch) p.catch(() => {}); } catch (_) {}
      } else if (!e.isIntersecting) {
        try { v.pause(); v.currentTime = 0; } catch (_) {}
      }
    }, { threshold: [0, 0.5, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} data-screen-label={`Hero ${index + 1}`} style={{
      position: "relative", width: "100%", height: "100vh", minHeight: 640,
      overflow: "hidden", background: "var(--color-near-black)",
    }}>
      {/* Media — video slides stay pure black until the video is actually playing,
          then fade in. No poster, no frozen first frame ("cigar image") flash. */}
      <div style={{
        position: "absolute", inset: 0, background: "var(--color-near-black)",
        backgroundImage: slide.video ? "none" : `url(${slide.img})`, backgroundSize: "cover", backgroundPosition: "center",
      }}>
        {slide.video && (
          <video ref={videoRef} src={slide.video} autoPlay loop muted playsInline preload="auto"
            onPlaying={() => setVReady(true)}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              opacity: vReady ? 1 : 0, transition: "opacity 600ms ease",
            }} />
        )}
      </div>
      {/* Protection gradients */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.34), rgba(10,8,6,.18) 38%, rgba(10,8,6,.72))" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 62%, rgba(10,8,6,.30), transparent 72%)" }} />

      {/* Centered content — mid-screen, RR-style */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "0 40px", boxSizing: "border-box",
      }}>
        <Reveal style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 32,
          maxWidth: "min(1180px, 92vw)",
        }}>
          {slide.label && <div className="t-label" style={{ letterSpacing: "0.24em", fontSize: 13 }}>{pick(slide.label)}</div>}
          <h1 className="t-h1" style={{ margin: 0, fontSize: "clamp(48px, 6.6vw, 104px)", lineHeight: 1.1 }}>
            {pick(slide.headline).map((line, k) => <span key={k} style={{ display: "block" }}>{line}</span>)}
          </h1>
          <div style={{ marginTop: 10 }}><GhostButton onClick={() => navTo(slide.link)}>{pick(slide.cta)}</GhostButton></div>
        </Reveal>
      </div>

      {/* Scroll cue — first panel only */}
      {index === 0 && (
        <div style={{ position: "absolute", left: "50%", bottom: 36, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-off-white)" }}>{L("Scroll", "Scroll")}</span>
          <span className="hero-scroll-line" style={{ width: 1, height: 44, background: "linear-gradient(var(--color-gold), transparent)" }} />
        </div>
      )}
    </section>
  );
}

function HeroCarousel({ onCurrentImg }) {
  const [active, setActive] = useState(0);
  const [inHero, setInHero] = useState(true);
  const refs = useRef([]);
  const setRef = (i, el) => { refs.current[i] = el; };

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.5) {
          const i = refs.current.indexOf(e.target);
          if (i >= 0) setActive(i);
        }
      });
      // Rail visible only while a hero panel still covers the viewport's vertical
      // center — the moment the content section crosses the midpoint, dots vanish.
      const mid = (window.innerHeight || 0) / 2;
      const centerInHero = refs.current.some(el => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      setInHero(centerInHero);
    }, { threshold: [0.2, 0.5, 0.75] });
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => { onCurrentImg && onCurrentImg(HERO_SLIDES[active].img); }, [active]);

  const go = (i) => {
    const el = refs.current[i];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      {HERO_SLIDES.map((s, i) => (
        <MomentPanel key={i} slide={s} index={i} setRef={setRef} />
      ))}

      {/* Fixed left rail — scroll-position dots */}
      <div style={{
        position: "fixed", left: 44, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 18, zIndex: 80,
        opacity: inHero ? 1 : 0, pointerEvents: inHero ? "auto" : "none",
        transition: "opacity 400ms ease",
      }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Moment ${i + 1}`} style={{
            background: "transparent", border: "none", padding: 6, margin: -6, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              display: "block",
              width: i === active ? 12 : 6, height: i === active ? 12 : 6, borderRadius: "50%",
              background: i === active ? "transparent" : "rgba(245,240,232,.4)",
              border: i === active ? "1px solid var(--color-gold)" : "none",
              transition: "all 300ms ease",
            }} />
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HeroCarousel, HERO_SLIDES });
