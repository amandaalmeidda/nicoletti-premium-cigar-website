// Discover — the long, Rolls-Royce-style scroll narrative shown for each model's
// Discover tab. A cinematic sequence: bare hero photo → title → video+enquire →
// pinned fill-photo → phrase → full-bleed video → phrase → two-image essay →
// detail CTA → grow-on-scroll photo → Explore Further. Pure CSS/JS scroll effects,
// all reduced-motion / print safe (effects only enhance an already-visible base).
const { useState, useEffect, useRef } = React;

const dvFam = (id) => (window.FAMILIES || []).find((f) => f.id === id) || {};

// Per-model Discover content — copy in Nicoletti's voice + asset rotation so each
// line reads distinctly. Phrases stay short and evocative; no filler.
const DISCOVER = {
  nirvana: {
    spec: { pt: "Ring 52 · 110mm · 4⅜\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 52 · 110mm · 4⅜\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    video: "assets/video/hero-moment.mp4",
    videoText: { pt: "A entrada na coleção. Uma expressão serena de cedro e creme — suavidade elevada a uma forma de arte.", en: "The entry into the collection. A serene expression of cedar and cream — softness elevated to an art form." },
    fill: "assets/photography/cigar-smoke-wood.jpeg",
    phrase1: { pt: "O primeiro fósforo da noite não tem pressa.", en: "The first match of the night is in no hurry." },
    bigVideo: "assets/video/hero-02.mp4",
    phrase2: { pt: "Suavidade não é ausência. É domínio.", en: "Softness is not absence. It is mastery." },
    two: ["assets/photography/process-cut-cigars.jpeg", "assets/photography/moment-lounge-hands.jpeg"],
    twoText: { pt: "Capa Red ou Black, a mesma origem: folhas de DNA cubano num solo que não existe em mais nenhum lugar — cada folha escolhida para uma beleza que permanece.", en: "Red wrapper or Black, the same origin: leaves of Cuban DNA in a soil that exists nowhere else — each leaf chosen for a beauty that endures." },
    grow: "assets/photography/cigar-lighter-dark.jpeg",
  },
  gold: {
    spec: { pt: "Ring 52 / 56 · até 164mm · 6½\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 52 / 56 · up to 164mm · 6½\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    video: "assets/video/hero-01.mp4",
    videoText: { pt: "O centro da coleção. Presença solar, intensidade média — um brilho que permanece depois da última baforada.", en: "The heart of the collection. A solar presence, medium intensity — a glow that lingers after the final draw." },
    fill: "assets/photography/cigar-lighter-dark.jpeg",
    phrase1: { pt: "Onde o DNA cubano e o dulçor baiano se encontram.", en: "Where Cuban DNA and Bahian sweetness meet." },
    bigVideo: "assets/video/hero-03.mp4",
    phrase2: { pt: "O equilíbrio é a forma mais difícil de luxo.", en: "Balance is the most difficult form of luxury." },
    two: ["assets/photography/cigar-smoke-wood.jpeg", "assets/photography/moment-lounge-hands.jpeg"],
    twoText: { pt: "Cedro, baunilha, feno tostado. A capa natural em sua expressão mais plena — sem pressa, sem excesso.", en: "Cedar, vanilla, toasted hay. The natural wrapper in its fullest expression — unhurried, never excessive." },
    grow: "assets/photography/process-cut-cigars.jpeg",
  },
  borogod: {
    spec: { pt: "Ring 58 · 125mm · 5\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 58 · 125mm · 5\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    video: "assets/video/hero-02.mp4",
    videoText: { pt: "Ring maior, presença imediata. Fumaça densa e fria, couro e conversa — a assinatura brasileira, sem concessões.", en: "A larger ring, immediate presence. Dense, cool smoke, leather and conversation — the Brazilian signature, without compromise." },
    fill: "assets/photography/moment-lounge-hands.jpeg",
    phrase1: { pt: "A assinatura brasileira, sem pedir licença.", en: "The Brazilian signature, asking no permission." },
    bigVideo: "assets/video/hero-moment.mp4",
    phrase2: { pt: "Personalidade não se ensina. Acontece.", en: "Character is not taught. It happens." },
    two: ["assets/photography/cigar-lighter-dark.jpeg", "assets/photography/process-cut-cigars.jpeg"],
    twoText: { pt: "Frutas secas, madeira tostada, corpo cheio. Um final longo e quente para quem já conhece Cruz das Almas.", en: "Dried fruit, toasted wood, full body. A long, warm finish for those who already know Cruz das Almas." },
    grow: "assets/photography/cigar-smoke-wood.jpeg",
  },
  platinum: {
    spec: { pt: "Ring 60 · 156mm · 6⅛\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 60 · 156mm · 6⅛\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    video: "assets/video/hero-03.mp4",
    videoText: { pt: "Final longo, complexidade, reserva absoluta. A palavra final da casa Nicoletti — feita para noites que não contam o tempo.", en: "A long finish, complexity, absolute reserve. The final word of the house of Nicoletti — made for nights that do not count the hours." },
    fill: "assets/photography/process-cut-cigars.jpeg",
    phrase1: { pt: "O cume da coleção. Para noites que giram em torno do charuto.", en: "The summit of the collection. For nights that revolve around the cigar." },
    bigVideo: "assets/video/hero-01.mp4",
    phrase2: { pt: "Algumas noites pedem a noite inteira.", en: "Some nights ask for the whole night." },
    two: ["assets/photography/moment-lounge-hands.jpeg", "assets/photography/cigar-smoke-wood.jpeg"],
    twoText: { pt: "A maior referência da coleção. Fumaça mais fria, doçura natural em seu ápice — reservada a quem chegou aqui por escolha.", en: "The grandest reference in the collection. Cooler smoke, natural sweetness at its peak — reserved for those who arrived here by choice." },
    grow: "assets/photography/cigar-lighter-dark.jpeg",
  },
};

/* Grow-on-scroll — scales a layer from 0.82 → 1 as it rises through the viewport. */
function useGrowOnScroll(start = 0.82) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress 0 when the element's top is at the bottom of the viewport, 1 when at the top.
      const p = Math.max(0, Math.min(1, 1 - r.top / vh));
      const s = start + (1 - start) * p;
      el.style.transform = `scale(${s.toFixed(3)})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [start]);
  return ref;
}

/* Scroll lift — subtle upward drift as an element passes through the viewport.
   Content sits slightly low when entering from below and rises as you scroll down.
   Honors reduced-motion. The transform is on an inner node so it never fights the
   Reveal fade-in (which transforms the outer wrapper, then self-clears). */
function useScrollLift(amount = 34) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // p: +1 when the element's center is at the bottom of the viewport, -1 at the top.
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      el.style.transform = `translate3d(0, ${(p * amount).toFixed(1)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [amount]);
  return ref;
}

function Lift({ amount = 34, style, children }) {
  const ref = useScrollLift(amount);
  return <div ref={ref} style={{ willChange: "transform", ...style }}>{children}</div>;
}

/* ScrollReveal — slow fade + slide-up triggered when the element enters the
   viewport on scroll (not on a timer), so every text block animates in as you
   reach it. Bulletproof: reveals immediately under reduced-motion, and a timeout
   safety net guarantees it can never be left hidden (print/headless/no-IO). */
function ScrollReveal({ children, y = 44, delay = 0, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    let done = false, t = 0, io = null;
    const inView = () => { const r = el.getBoundingClientRect(); const vh = window.innerHeight || document.documentElement.clientHeight; return r.top < vh * 0.88 && r.bottom > 0; };
    const reveal = () => {
      if (done) return; done = true;
      setShown(true);
      // Belt-and-braces: write the visible state directly to the DOM too, so a
      // delayed/suppressed React re-render (print snapshot, throttled webview)
      // can never leave the block hidden. Matches the shown-state inline style.
      el.style.opacity = "1"; el.style.transform = "translateY(0)"; el.style.filter = "blur(0px)";
      cleanup();
    };
    const onGeom = () => { if (!done && inView()) reveal(); };
    // Print path: the snapshot happens immediately after beforeprint handlers run,
    // so force the final visible state synchronously — UNCONDITIONALLY, including
    // blocks already revealed but still mid-transition (done=true makes reveal()
    // a no-op, so the style writes cannot live only inside it).
    const revealInstant = () => {
      el.style.transition = "none";
      el.style.opacity = "1"; el.style.transform = "translateY(0)"; el.style.filter = "blur(0px)";
      reveal();
    };
    const cleanup = () => {
      if (io) io.disconnect(); if (t) clearTimeout(t);
      window.removeEventListener("scroll", onGeom);
      window.removeEventListener("resize", onGeom);
    };
    if (inView()) {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
      t = setTimeout(reveal, 2600); // safety net for the visible block only
    } else {
      if ("IntersectionObserver" in window) {
        // Offscreen blocks reveal ONLY when scrolled into view — no global timer,
        // otherwise everything below the fold is already visible on arrival.
        io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) reveal(); }, { threshold: 0.18, rootMargin: "0px 0px -14% 0px" });
        io.observe(el);
      } else {
        t = setTimeout(reveal, 1200); // no-IO fallback — never leave content hidden
      }
      // Last resort when IO exists but stays silent (embedded/headless webviews):
      // a cheap passive geometry check on scroll/resize.
      window.addEventListener("scroll", onGeom, { passive: true });
      window.addEventListener("resize", onGeom, { passive: true });
    }
    window.addEventListener("beforeprint", revealInstant); // print/PDF always shows content
    // beforeprint stays attached until unmount — reveal()'s cleanup must NOT remove
    // it, or blocks mid-transition would never get their print-time instant write.
    return () => { cleanup(); window.removeEventListener("beforeprint", revealInstant); };
  }, []);
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      filter: shown ? "blur(0px)" : "blur(7px)",
      transition: "opacity 1200ms cubic-bezier(0.22,1,0.36,1), transform 1200ms cubic-bezier(0.22,1,0.36,1), filter 1200ms cubic-bezier(0.22,1,0.36,1)",
      transitionDelay: delay ? delay + "ms" : "0ms",
      willChange: "transform, opacity, filter", ...style,
    }}>{children}</div>
  );
}

/* Autoplaying muted loop video that starts only when on screen. */
function ScrollVideo({ src, style, controls = false }) {
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
  return <video ref={ref} src={src} loop muted playsInline preload="metadata" controls={controls} style={style} />;
}

/* ---------- 1 · Bare hero photo (no heading) ---------- */
function DiscHero({ img }) {
  return (
    <section data-screen-label="Discover — Hero" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden", background: "var(--color-near-black)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.18), transparent 30%, transparent 72%, rgba(10,8,6,.55))" }} />
      <ScrollCue />
    </section>
  );
}

/* ---------- 2 · Title + subtitle ---------- */
function DiscTitle({ model, spec }) {
  return (
    <section className="surface-light" data-screen-label="Discover — Title" style={{ minHeight: "78vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "140px 24px", boxSizing: "border-box" }}>
      <ScrollReveal y={46} style={{ maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(46px, 7vw, 104px)", letterSpacing: "0.04em", lineHeight: 1.04, color: "var(--color-espresso)", margin: 0, textShadow: "none" }}>{model.label}</h1>
        <div className="t-label" style={{ color: "var(--color-tobacco)", fontSize: 13, letterSpacing: "0.34em" }}>{pick(model.headline)}</div>
        <p className="t-caption" style={{ maxWidth: 560, marginTop: 18, color: "var(--color-smoke-gray)", letterSpacing: "0.03em", lineHeight: 1.7 }}>{spec}</p>
      </ScrollReveal>
    </section>
  );
}

/* ---------- 3 · Video + text + enquire ---------- */
function DiscVideoText({ src, text, onEnquire, onSeeDetail }) {
  return (
    <section className="surface-light" data-screen-label="Discover — Film" style={{ padding: "40px 24px 150px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ScrollReveal y={30} style={{ width: "100%" }}>
          <ScrollVideo src={src} controls style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", background: "#000" }} />
        </ScrollReveal>
        <ScrollReveal y={36} style={{ width: "100%" }}>
          <p className="t-pullquote" style={{ color: "var(--color-espresso)", textAlign: "center", margin: "64px 0 44px", maxWidth: 760, marginLeft: "auto", marginRight: "auto", fontSize: "clamp(26px, 3vw, 40px)", lineHeight: 1.4 }}>{text}</p>
        </ScrollReveal>
        <ScrollReveal y={26} delay={140}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
            <GhostButton arrow={false} onClick={onEnquire}>{L("Solicitar", "Enquire")}</GhostButton>
            <GhostButton onClick={onSeeDetail}>{L("Ver em detalhe", "View in detail")}</GhostButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------- 4 · Big photo that fills the page as you scroll past (pinned) ---------- */
function DiscFillPhoto({ img }) {
  return (
    <section data-screen-label="Discover — Fill Photo" style={{ position: "relative", height: "180vh", background: "var(--color-near-black)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.12), transparent 40%, rgba(10,8,6,.28))" }} />
      </div>
    </section>
  );
}

/* ---------- 5 / 7 · Phrase ---------- */
function DiscPhrase({ text, surface = "light" }) {
  const dark = surface === "dark";
  return (
    <section className={dark ? "surface-dark" : "surface-light"} data-screen-label="Discover — Phrase" style={{ minHeight: "66vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px", boxSizing: "border-box" }}>
      <ScrollReveal y={52} style={{ maxWidth: 980, textAlign: "center" }}>
        <p className="t-pullquote" style={{ margin: 0, color: dark ? "var(--color-off-white)" : "var(--color-espresso)", fontSize: "clamp(30px, 4vw, 56px)", lineHeight: 1.35, textWrap: "balance" }}>{text}</p>
      </ScrollReveal>
    </section>
  );
}

/* ---------- 6 · Full-bleed video ---------- */
function DiscBigVideo({ src }) {
  return (
    <section data-screen-label="Discover — Big Film" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 560, overflow: "hidden", background: "var(--color-near-black)" }}>
      <ScrollVideo src={src} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.22), transparent 35%, transparent 70%, rgba(10,8,6,.4))" }} />
    </section>
  );
}

/* ---------- 8 · Two images + text (long editorial) ---------- */
function DiscTwoImages({ imgs, text }) {
  return (
    <section className="surface-sand" data-screen-label="Discover — Two Images" style={{ padding: "150px 80px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <ScrollReveal y={44} style={{ maxWidth: 720, margin: "0 auto 72px", textAlign: "center" }}>
          <p className="t-pullquote" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(26px, 3vw, 42px)", lineHeight: 1.4 }}>{text}</p>
        </ScrollReveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <ScrollReveal y={40} style={{ display: "block" }}>
            <div style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: `url(${imgs[0]})`, backgroundSize: "cover", backgroundPosition: "center", marginTop: 56 }} />
          </ScrollReveal>
          <ScrollReveal y={40} delay={140} style={{ display: "block" }}>
            <div style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: `url(${imgs[1]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9 · Detail CTA ---------- */
function DiscDetailCTA({ model, onSeeDetail }) {
  return (
    <section className="surface-light" data-screen-label="Discover — Detail CTA" style={{ minHeight: "58vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, maxWidth: 820 }}>
        <ScrollReveal y={42}>
          <p className="t-pullquote" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1.35 }}>{model.label} {L("é uma obra de critério.", "is a work of judgement.")}</p>
        </ScrollReveal>
        <ScrollReveal y={28} delay={160}>
          <GhostButton onClick={onSeeDetail}>{L("Ver em detalhe", "View in detail")}</GhostButton>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------- 10 · Photo that grows as you scroll ---------- */
function DiscGrowPhoto({ img }) {
  const ref = useGrowOnScroll(0.82);
  return (
    <section className="surface-light" data-screen-label="Discover — Grow Photo" style={{ padding: "60px 24px 120px", boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div ref={ref} style={{ width: "100%", aspectRatio: "21 / 9", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", transformOrigin: "center", willChange: "transform" }} />
      </div>
    </section>
  );
}

/* ---------- 11 · Explore Further (3 doorways) ---------- */
function ModelExplore({ models, activeId, onModel, onSeeDetail, onDiscover, mode = "discover" }) {
  const others = models.filter((m) => m.id !== activeId);
  const next = others[0] || models[0];
  const active = models.find((m) => m.id === activeId) || models[0];
  const d = DISCOVER[activeId] || DISCOVER.nirvana;
  // First doorway flips by context: Discover tab → In Detail; In Detail tab → Discover.
  const first = mode === "detail"
    ? { img: d.fill, label: L("Descobrir", "Discover"), title: L("A narrativa desta referência", "The narrative of this reference"), blurb: L(`O primeiro olhar sobre ${active.label} — o filme, o ritmo, a história.`, `The first look at ${active.label} — the film, the rhythm, the story.`), action: onDiscover, cta: L("Descobrir", "Discover") }
    : { img: d.fill, label: L("Em Detalhe", "In Detail"), title: L("Especificações e perfis", "Specifications and profiles"), blurb: L("Ring, capa, perfil de fumaça e harmonização desta referência.", "Ring, wrapper, smoke profile and pairings of this reference."), action: onSeeDetail, cta: L("Ver detalhe", "View detail") };
  const cards = [
    first,
    { img: next.hero, label: next.label, title: pick(next.headline), blurb: L("Continue pela coleção — outra referência, o mesmo critério.", "Continue through the collection — another reference, the same discernment."), action: () => onModel(next.id), cta: L("Explorar", "Explore") },
    { img: "assets/photography/cigar-lighter-dark.jpeg", label: L("The Club", "The Club"), title: L("Não há ingresso. Há convite.", "There is no ticket. There is an invitation."), blurb: L("O acesso à Coleção Nicoletti começa por um encontro.", "Access to the Nicoletti Collection begins with a meeting."), action: () => navTo("The Club.html"), cta: L("Saber mais", "Learn more") },
  ];
  return (
    <section className="surface-dark" data-screen-label="Discover — Explore Further" style={{ padding: "clamp(96px,11vw,150px) clamp(40px,6vw,96px)", boxSizing: "border-box" }}>
      <ScrollReveal y={38} style={{ textAlign: "center", marginBottom: "clamp(56px,6vw,80px)" }}>
        <SectionLabel flank>{L("Explore Mais", "Explore Further")}</SectionLabel>
        <p className="t-pullquote" style={{ color: "rgba(245,240,232,.5)", margin: "22px 0 0", fontSize: "clamp(21px,2vw,28px)" }}>{L("Continue a sua jornada", "Continue your journey")}</p>
      </ScrollReveal>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(28px,3vw,52px)" }}>
        {cards.map((c, i) => <ExploreCard key={i} card={c} delay={i * 90} />)}
      </div>
    </section>
  );
}

function ExploreCard({ card, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <ScrollReveal y={40} delay={delay} style={{ height: "100%" }}>
      <a onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={card.action}
        style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "3 / 4", backgroundImage: `url(${card.img})`, backgroundSize: "cover", backgroundPosition: "center", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 800ms cubic-bezier(0.4,0,0.2,1)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,0) 55%, rgba(10,8,6,.55))" }} />
        </div>
        <div style={{ paddingTop: 26 }}>
          <SectionLabel align="left">{card.label}</SectionLabel>
          <h3 className="t-h3" style={{ color: "var(--color-off-white)", margin: "16px 0 14px", fontWeight: 500, fontSize: "clamp(22px,1.7vw,27px)", textWrap: "balance" }}>{card.title}</h3>
          <p style={{ color: "rgba(245,240,232,.62)", fontSize: 15, lineHeight: 1.55, margin: "0 0 22px", maxWidth: 340 }}>{card.blurb}</p>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : "rgba(201,164,107,.7)", transition: "color 200ms ease" }}>{card.cta} →</span>
        </div>
      </a>
    </ScrollReveal>
  );
}

/* ====================== DISCOVER VIEW (assembled) ====================== */
function DiscoverView({ model, onSeeDetail, onEnquire, models, activeId, onModel }) {
  const d = DISCOVER[model.id] || DISCOVER.nirvana;
  return (
    <div key={model.id}>
      <DiscHero img={model.hero} />
      <DiscTitle model={model} spec={pick(d.spec)} />
      <DiscVideoText src={d.video} text={pick(d.videoText)} onEnquire={onEnquire} onSeeDetail={onSeeDetail} />
      <DiscFillPhoto img={d.fill} />
      <DiscPhrase text={pick(d.phrase1)} surface="light" />
      <DiscBigVideo src={d.bigVideo} />
      <DiscPhrase text={pick(d.phrase2)} surface="light" />
      <DiscTwoImages imgs={d.two} text={pick(d.twoText)} />
      <DiscDetailCTA model={model} onSeeDetail={onSeeDetail} />
      <DiscGrowPhoto img={d.grow} />
      <ModelExplore models={models} activeId={activeId} onModel={onModel} onSeeDetail={onSeeDetail} />
    </div>
  );
}

Object.assign(window, { DiscoverView, ModelExplore, ScrollReveal, ScrollVideo });
