// Heritage — long-scroll, Rolls-Royce-style narrative for Nicoletti's origin.
// Rhythm: video hero + centered header → text on white w/ thin divider → centered
// text → full-bleed video → invite-to-lounge (text + button) → photo slider + text
// → Legacy cards (Franco + 3 subjects) → Journal cards → footer.
// Pure CSS/JS scroll effects; reuses Reveal / SectionLabel / GhostButton / ContentRail.
const { useState, useEffect, useRef } = React;

/* Autoplaying muted loop video — plays only while on screen. */
function HVideo({ src, style }) {
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

/* ScrollReveal — fade + rise as the element enters the viewport. Bulletproof:
   reveals immediately under reduced-motion, geometry + IO triggers, beforeprint
   instant path, and writes the visible state straight to the DOM so it can never
   be left hidden (print/PDF/headless). */
function HReveal({ children, y = 40, delay = 0, style }) {
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

/* ---------- 1 · Video hero + centered header ---------- */
function HeritageHero() {
  return (
    <section data-screen-label="Heritage — Hero" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 620, overflow: "hidden", background: "var(--color-near-black)" }}>
      <HVideo src="assets/video/hero-home-02.mp4" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.46), rgba(10,8,6,.22) 38%, transparent 60%, rgba(10,8,6,.5))" }}></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", zIndex: 2 }}>
        <HReveal y={26} style={{ textAlign: "center" }}>
          <h1 className="t-h1" style={{ margin: 0, fontStyle: "normal", fontSize: "clamp(44px, 6.4vw, 100px)", letterSpacing: "0.08em", fontWeight: 300, textTransform: "uppercase" }}>{L("A Herança", "The Heritage")}</h1>
        </HReveal>
      </div>
      <ScrollCue />
    </section>
  );
}

/* ---------- 2 · Text on white + thin line divider ---------- */
function GuidingText() {
  return (
    <section className="surface-light" data-screen-label="Heritage — Guiding Text" style={{ padding: "clamp(120px,13vw,180px) 24px clamp(80px,9vw,120px)", boxSizing: "border-box" }}>
      <HReveal y={36} style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <p style={{ margin: 0, color: "rgba(31,23,24,.82)", fontSize: "clamp(17px,1.5vw,20px)", lineHeight: 1.9, letterSpacing: "0.01em" }}>
          {L("Cada charuto Nicoletti nasce de uma só terra — Cruz das Almas, no Recôncavo Baiano. É ali que a linhagem cubana encontra o solo brasileiro, e o critério encontra a sua origem.", "Every Nicoletti cigar is born of a single land — Cruz das Almas, in the Recôncavo Baiano. There, Cuban lineage meets Brazilian soil, and discernment finds its origin.")}
        </p>
      </HReveal>
      <div style={{ maxWidth: 1280, margin: "clamp(80px,9vw,120px) auto 0", height: 1, background: "rgba(31,23,24,.14)" }}></div>
    </section>
  );
}

/* FactSlot — an unmistakable, fill-me-in placeholder for a real fact we don't have
   yet. Gold, dashed underline; the hint says exactly what to drop in. Never ships a
   fabricated detail — it ships an elegant blank. */
function FactSlot({ hint }) {
  return (
    <span data-factslot="true" title="Placeholder — replace with the real detail" style={{
      fontFamily: "var(--font-body)", fontStyle: "normal", fontWeight: 600,
      fontSize: "0.82em", letterSpacing: "0.03em", color: "var(--color-gold)",
      borderBottom: "1px dashed rgba(201,164,107,.78)", padding: "0 0.32em 0.05em",
      whiteSpace: "nowrap", verticalAlign: "baseline",
    }}>{pick(hint)}</span>
  );
}

/* ---------- 2.5 · The Origin — the founding record (trust spine) ---------- */
function OriginRecord() {
  const isPT = L(true, false);
  const items = [
    { label: { pt: "Origem", en: "Origin" }, value: { pt: "Cruz das Almas, Bahia", en: "Cruz das Almas, Bahia" } },
    { label: { pt: "Fundador", en: "Founder" }, value: { pt: "Franco Nicoletti", en: "Franco Nicoletti" } },
    { label: { pt: "Linhagem", en: "Lineage" }, value: { pt: "Semente cubana · solo baiano", en: "Cuban seed · Bahian soil" } },
    { label: { pt: "A casa", en: "The house" }, value: { pt: "Quatro famílias · dez referências", en: "Four families · ten references" } },
  ];
  return (
    <section className="surface-light" data-screen-label="Heritage — The Origin" style={{ padding: "clamp(40px,6vw,80px) clamp(24px,5vw,80px) clamp(110px,12vw,160px)", boxSizing: "border-box" }}>
      <HReveal y={36} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>{L("A Origem", "The Origin")}</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: "18px 0 0", fontSize: "clamp(30px,3.8vw,50px)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 300 }}>{L("Como a Nicoletti começou.", "How Nicoletti began.")}</h2>
        <p className="t-pullquote" style={{ color: "var(--color-tobacco)", fontStyle: "italic", margin: "22px 0 0", fontSize: "clamp(18px,1.9vw,24px)", lineHeight: 1.5 }}>{L("O trabalho de uma vida.", "A lifetime in the making.")}</p>
      </HReveal>

      <HReveal y={40} delay={120} style={{ maxWidth: 1040, margin: "clamp(54px,6vw,76px) auto 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(20px,2.6vw,40px)" }} className="origin-dossier">
          {items.map((it, k) => (
            <div key={k} style={{ paddingTop: 20, borderTop: "1px solid rgba(201,164,107,.55)", display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-tobacco)" }}>{pick(it.label)}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(18px,1.7vw,23px)", lineHeight: 1.3, color: "var(--color-espresso)" }}>
                {it.slot ? <FactSlot hint={it.slot} /> : pick(it.value)}
              </span>
            </div>
          ))}
        </div>
      </HReveal>

      <HReveal y={36} delay={220} style={{ maxWidth: 640, margin: "clamp(54px,6vw,76px) auto 0", textAlign: "center" }}>
        <p style={{ color: "rgba(31,23,24,.82)", margin: 0, fontSize: 16.5, lineHeight: 1.95 }}>
          {L("A disciplina de Franco Nicoletti começou aos treze anos, num seminário na Toscana, onde aprendeu que a excelência exige tempo e intenção. Seguiram-se décadas na alta gastronomia — entre Palm Beach, Nova York e a Europa — e uma imersão direta no tabaco premium do Caribe. Dessa vida inteira nasceu uma só convicção — a de que o charuto é o mais alto gesto de hospitalidade — e, em Cruz das Almas, o solo para honrá-la. Desde então, a casa cresce por convite.", "Franco Nicoletti’s discipline began at thirteen, in a seminary in Tuscany, where he learned that excellence demands time and intention. Decades in haute cuisine followed — across Palm Beach, New York and Europe — alongside a direct immersion in the premium tobacco of the Caribbean. From that lifetime came a single conviction — that a cigar is the highest gesture of hospitality — and, in Cruz das Almas, the soil to honour it. The house has grown by invitation ever since.")}
        </p>
      </HReveal>
    </section>
  );
}

/* ---------- 3 · Centered title + subtitle + paragraph ---------- */
function OriginText() {
  return (
    <section className="surface-light" data-screen-label="Heritage — Origin Text" style={{ padding: "clamp(40px,6vw,80px) 24px clamp(120px,13vw,170px)", boxSizing: "border-box" }}>
      <HReveal y={40} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(34px,4.4vw,58px)", letterSpacing: "0.04em", color: "var(--color-espresso)", margin: 0, textTransform: "uppercase" }}>Cruz das Almas</h2>
        <p className="t-pullquote" style={{ color: "var(--color-tobacco)", fontStyle: "italic", margin: "30px 0 0", fontSize: "clamp(20px,2vw,26px)", lineHeight: 1.5 }}>
          {L("A terra que não precisava de explicação.", "The land that needed no explanation.")}
        </p>
        <p style={{ color: "rgba(31,23,24,.78)", margin: "34px auto 0", maxWidth: 600, fontSize: 16.5, lineHeight: 1.85 }}>
          {L("Sementes de verdadeira linhagem cubana, cultivadas no solo mineral de Cruz das Almas — a mesma genética que consagrou a ilha, levada pela terra baiana a uma suavidade e a um dulçor natural que Cuba não consegue replicar. Long filler, enrolado à mão, folha a folha — a estrutura clássica, mais redonda e sedosa. A assinatura de um terroir singular.", "Seeds of true Cuban lineage, grown in the mineral soil of Cruz das Almas — the same genetics the island is known for, drawn by Bahian earth into a softness and natural sweetness Cuba cannot replicate. Long filler, hand-rolled, chosen leaf by leaf — the classic structure made rounder, silkier. The signature of a singular terroir.")}
        </p>
      </HReveal>
    </section>
  );
}

/* ---------- 4 · Full-bleed video ---------- */
function FullVideo() {
  return (
    <section data-screen-label="Heritage — Full Video" style={{ position: "relative", width: "100%", height: "100vh", minHeight: 560, overflow: "hidden", background: "var(--color-near-black)" }}>
      <HVideo src="assets/video/hero-01.mp4" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.2), transparent 35%, transparent 70%, rgba(10,8,6,.34))" }}></div>
    </section>
  );
}

/* ---------- 5 · Invite to the Lounge — text + button on white ---------- */
function LoungeInvite() {
  return (
    <section className="surface-light" data-screen-label="Heritage — Lounge Invite" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(120px,13vw,170px) 24px", boxSizing: "border-box" }}>
      <HReveal y={40} style={{ maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 28 }}>
        <SectionLabel>{L("O Lounge", "The Lounge")}</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(32px,4vw,52px)", textWrap: "balance" }}>
          {L("O encontro acontece à mesa.", "The meeting happens at the table.")}
        </h2>
        <p style={{ color: "rgba(31,23,24,.78)", margin: 0, maxWidth: 560, fontSize: 16.5, lineHeight: 1.8 }}>
          {L("A herança Nicoletti não termina na terra — continua nas mesas mais exigentes do mundo. O Lounge é onde a coleção encontra quem a procura.", "The Nicoletti heritage does not end in the soil — it continues at the most discerning tables in the world. The Lounge is where the collection meets those who seek it.")}
        </p>
        <div style={{ marginTop: 10 }}>
          <GhostButton onClick={() => navTo("The Club.html")}>{L("Conheça os lounges", "Discover the lounges")}</GhostButton>
        </div>
      </HReveal>
    </section>
  );
}

/* ---------- 6 · Photo slider + text ---------- */
const HSLIDES = [
  "assets/photography/lounge-interior.jpeg",
  "assets/photography/balcony.jpeg",
  "assets/photography/lounge-vinyl.jpeg",
  "assets/photography/lounge-sax.jpeg",
];
function HeritageSlider() {
  const [i, setI] = useState(0);
  const n = HSLIDES.length;
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
  const arrowStyle = { background: "transparent", border: "none", cursor: "pointer", padding: 6, color: "var(--color-espresso)", display: "flex", alignItems: "center" };
  const chev = (dir) => (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
      <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <section className="surface-sand" data-screen-label="Heritage — Slider" style={{ padding: "clamp(110px,11vw,160px) 0", boxSizing: "border-box", overflow: "hidden" }}>
      <HReveal y={36}>
        <div style={{ display: "flex", gap: 28, transform: `translateX(calc(50vw - (${SW}) / 2 - ${i} * ((${SW}) + 28px)))`, transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}>
          {HSLIDES.map((img, k) => (
            <div key={k} onClick={() => k !== i && manual(k)} style={{ flex: `0 0 ${SW}`, aspectRatio: "16 / 9", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: k === i ? 1 : 0.45, transition: "opacity 700ms ease", cursor: k === i ? "default" : "pointer" }}></div>
          ))}
        </div>
      </HReveal>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginTop: 36 }}>
        <button aria-label={L("Anterior", "Previous")} onClick={() => manual(i - 1)} style={arrowStyle}>{chev("prev")}</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {HSLIDES.map((_, k) => (
            <span key={k} onClick={() => manual(k)} style={{ width: 7, height: 7, borderRadius: "50%", cursor: "pointer", background: k === i ? "var(--color-tobacco)" : "rgba(31,23,24,.25)", transition: "background 300ms ease" }}></span>
          ))}
        </div>
        <button aria-label={L("Próximo", "Next")} onClick={() => manual(i + 1)} style={arrowStyle}>{chev("next")}</button>
      </div>
      <HReveal y={28} style={{ textAlign: "center", maxWidth: 640, margin: "clamp(44px,5vw,64px) auto 0", padding: "0 24px" }}>
        <SectionLabel>{L("O Curador", "The Curator")}</SectionLabel>
        <h3 className="t-h3" style={{ color: "var(--color-espresso)", margin: "18px 0 16px", fontWeight: 500, fontSize: "clamp(24px,2.6vw,34px)" }}>{L("As mesas que formaram Franco.", "The tables that shaped Franco.")}</h3>
        <p style={{ color: "rgba(31,23,24,.78)", margin: 0, fontSize: 16, lineHeight: 1.8 }}>
          {L("Palm Beach, Londres, Toscana. O palato de Franco Nicoletti formou-se nas mesas mais exigentes do mundo — uma vida inteira de atenção antes de uma única folha ser selecionada.", "Palm Beach, London, Tuscany. Franco Nicoletti's palate was formed at the most discerning tables in the world — a lifetime of attention before a single leaf was selected.")}
        </p>
      </HReveal>
    </section>
  );
}

/* ---------- 7 · Legacy cards — Franco + three subjects ---------- */
function LegacyCard({ card, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <HReveal y={40} delay={delay} style={{ height: "100%" }}>
      <a onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={card.action}
        style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "3 / 4", backgroundImage: `url(${card.img})`, backgroundSize: "cover", backgroundPosition: "center", transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 900ms cubic-bezier(0.4,0,0.2,1)", filter: "grayscale(.08)" }}></div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,0) 58%, rgba(10,8,6,.5))" }}></div>
        </div>
        <div style={{ paddingTop: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(20px,1.6vw,25px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-espresso)", margin: "0 0 12px" }}>{pick(card.title)}</h3>
          <p style={{ color: "rgba(31,23,24,.72)", fontSize: 14.5, lineHeight: 1.65, margin: "0 0 16px", maxWidth: 320 }}>{pick(card.blurb)}</p>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : "var(--color-tobacco)", transition: "color 200ms ease" }}>{pick(card.cta)} →</span>
        </div>
      </a>
    </HReveal>
  );
}
function LegacyCards() {
  const cards = [
    { img: "assets/photography/tobacco-field.jpeg", title: { pt: "Cruz das Almas", en: "Cruz das Almas" }, blurb: { pt: "O solo do Recôncavo Baiano onde o DNA cubano encontrou um dulçor que não existe em mais nenhum lugar.", en: "The soil of the Recôncavo Baiano where Cuban DNA found a sweetness that exists nowhere else." }, cta: { pt: "A terra", en: "The land" }, action: () => navTo("A Coleção.html") },
    { img: "assets/photography/tobacco-drying.jpeg", title: { pt: "O Ofício", en: "The Craft" }, blurb: { pt: "Semente cubana, solo baiano, 100% long filler enrolado à mão. Da folha à brasa.", en: "Cuban seed, Bahian soil, 100% long filler rolled by hand. From leaf to ember." }, cta: { pt: "O ofício", en: "The craft" }, action: () => navTo("The Craft.html") },
    { img: "assets/photography/lounge-interior.jpeg", title: { pt: "O Lounge", en: "The Lounge" }, blurb: { pt: "Não há ingresso, há convite. O acesso à coleção começa por um encontro.", en: "There is no ticket, there is an invitation. Access to the collection begins with a meeting." }, cta: { pt: "Saber mais", en: "Learn more" }, action: () => navTo("The Club.html") },
  ];
  return (
    <section className="surface-light" data-screen-label="Heritage — Legacy Cards" style={{ padding: "clamp(120px,12vw,170px) clamp(24px,5vw,80px)", boxSizing: "border-box" }}>
      <HReveal y={34} style={{ textAlign: "center", maxWidth: 760, margin: "0 auto clamp(64px,7vw,88px)" }}>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(32px,4vw,52px)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 300 }}>{L("Legado em movimento", "Legacy in motion")}</h2>
        <p style={{ color: "rgba(31,23,24,.7)", margin: "22px auto 0", maxWidth: 540, fontSize: 16, lineHeight: 1.7 }}>{L("As forças que dão forma à casa Nicoletti — a terra, o ofício e a mesa.", "The forces that shape the house of Nicoletti — the land, the craft and the table.")}</p>
      </HReveal>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "clamp(24px,2.6vw,40px)" }}>
        {cards.map((c, k) => <LegacyCard key={k} card={c} delay={k * 90} />)}
      </div>
    </section>
  );
}

/* ====================== HERITAGE PAGE (assembled) ====================== */
function HeritagePage() {
  const HERO = "assets/photography/balcony.jpeg";
  return (
    <PageShell heroImg={HERO}>
      <HeritageHero />
      <GuidingText />
      <OriginRecord />
      <OriginText />
      <FullVideo />
      <LoungeInvite />
      <HeritageSlider />
      <LegacyCards />
      <ContentRail surface="sand" label={L("Do Journal", "From the Journal")} title={L("A continuação da noite.", "The continuation of the night.")}
        items={[
          { img: "assets/photography/lounge-vinyl.jpeg", label: L("The Lounge", "The Lounge"), title: L("Onde as noites não têm pressa.", "Where the nights are in no hurry."), href: "Journal.html" },
          { img: "assets/photography/cigar-flame.jpeg", label: L("The Ritual", "The Ritual"), title: L("O primeiro fósforo da noite.", "The first match of the night."), href: "Journal.html" },
          { img: "assets/photography/tobacco-leaves-macro.jpeg", label: L("The Craft", "The Craft"), title: L("Cada folha carrega uma decisão.", "Every leaf carries a decision."), href: "Journal.html" },
        ]} />
    </PageShell>
  );
}

Object.assign(window, { HeritagePage, OriginRecord, FactSlot });
