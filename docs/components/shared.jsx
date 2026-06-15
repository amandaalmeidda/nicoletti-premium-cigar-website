// Shared building blocks for all pages — opening hero, sentence screens, two-photo
// screens, title screens, Red&Black table, sub-nav, page shell. Uses the three v2.5
// backgrounds. Ghost buttons only · 0px radius · gold hairlines · Crimson never as bg.
const { useState, useEffect, useRef } = React;

/* Scroll cue — "Scroll" + thin gold line. Opening screens only. */
function ScrollCue({ label = "Scroll" }) {
  return (
    <div style={{ position: "absolute", left: "50%", bottom: 36, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5, zIndex: 4 }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-off-white)" }}>{label}</span>
      <span style={{ width: 1, height: 44, background: "linear-gradient(var(--color-gold), transparent)" }} />
    </div>
  );
}

/* PageShell — wires Header + MenuOverlay (blurred hero bg) + Footer around content. */
function PageShell({ heroImg, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Header onOpenMenu={() => setMenuOpen(true)} />
      {children}
      <Footer />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} bg={heroImg} />
    </div>
  );
}

/* InnerHero — opening 100vh full-bleed media. Optional label + headline; otherwise
   cinematic and text-free (header logo carries the brand). */
function InnerHero({ img, video, label, headline, screenLabel, scrollCue = true }) {
  return (
    <section data-screen-label={screenLabel} style={{
      position: "relative", width: "100%", height: "100vh", minHeight: 620,
      overflow: "hidden", background: "var(--color-near-black)",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        {video && <video src={video} poster={img} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.42), rgba(10,8,6,.22) 40%, rgba(10,8,6,.66))" }} />
      {(label || headline) && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", textAlign: "center", padding: "0 40px 18vh", gap: 22 }}>
          {label && <div className="t-label" style={{ letterSpacing: "0.22em", fontSize: 12 }}>{label}</div>}
          {headline && <h1 className="t-h1" style={{ margin: 0, fontSize: "clamp(40px, 5vw, 76px)", lineHeight: 1.12 }}>{headline}</h1>}
        </div>
      )}
      {scrollCue && <ScrollCue />}
    </section>
  );
}

/* SentenceScreen — single centered line. surface: light | dark | sand. */
function SentenceScreen({ quote, attribution, surface = "light", minHeight = "70vh", screenLabel }) {
  const cls = surface === "dark" ? "surface-dark" : surface === "sand" ? "surface-sand" : "surface-light";
  const dark = surface === "dark";
  return (
    <section data-screen-label={screenLabel} className={cls} style={{ minHeight, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px", boxSizing: "border-box" }}>
      <Reveal style={{ maxWidth: 1040, textAlign: "center" }}>
        <p className="t-pullquote" style={{ margin: 0, color: dark ? "var(--color-off-white)" : "var(--color-espresso)", fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1.45, textWrap: "balance" }}>{quote}</p>
        {attribution && <div style={{ marginTop: 32, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: dark ? "rgba(245,240,232,.6)" : "var(--color-smoke-gray)" }}>— {attribution}</div>}
      </Reveal>
    </section>
  );
}

/* TwoPhotoScreen — two images side by side (Near Black), optional captions. */
function TwoPhotoScreen({ left, right, surface = "dark", screenLabel }) {
  const cls = surface === "dark" ? "surface-dark" : surface === "sand" ? "surface-sand" : "surface-light";
  const Cell = ({ item, delay }) => (
    <Reveal delay={delay} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ width: "100%", aspectRatio: "3 / 4", backgroundImage: `url(${item.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      {item.caption && <div className="t-caption" style={{ letterSpacing: "0.04em" }}>{item.caption}</div>}
    </Reveal>
  );
  return (
    <section data-screen-label={screenLabel} className={cls} style={{ padding: "120px 80px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <Cell item={left} delay={0} />
        <Cell item={right} delay={120} />
      </div>
    </section>
  );
}

/* TitleScreen — closing screen. Big wordmark-style title + lines + footnote. */
function TitleScreen({ title, lines, footnote, surface = "dark", screenLabel }) {
  const cls = surface === "dark" ? "surface-dark" : surface === "sand" ? "surface-sand" : "surface-light";
  const dark = surface === "dark";
  return (
    <section data-screen-label={screenLabel} className={cls} style={{ minHeight: "64vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px", boxSizing: "border-box" }}>
      <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, maxWidth: 900 }}>
        <div style={{ width: 1, height: 48, background: "var(--color-gold)", opacity: 0.5 }} />
        <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "0.32em", textTransform: "uppercase", color: dark ? "var(--color-off-white)" : "var(--color-espresso)", margin: 0 }}>{title}</h2>
        {lines && lines.map((l, i) => (
          <div key={i} style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)" }}>{l}</div>
        ))}
        {footnote && <p className="t-caption" style={{ maxWidth: 560, marginTop: 8, color: dark ? "rgba(245,240,232,.55)" : "var(--color-smoke-gray)" }}>{footnote}</p>}
      </Reveal>
    </section>
  );
}

/* RedBlackTable — the wrapper logic. Two columns: RED (natural) · BLACK (maduro). */
const RB_RED = { pt: ["Capa Natural", "Abertura, fluidez.", "Dulçor natural de Cruz das Almas.", "Entardecer, início de conversa."], en: ["Natural Wrapper", "Openness, fluidity.", "Natural sweetness of Cruz das Almas.", "Dusk, the start of conversation."] };
const RB_BLACK = { pt: ["Capa Madura", "Profundidade e gravidade.", "Notas sombrias, fermentação prolongada.", "Fim da noite, silêncio, atenção."], en: ["Maduro Wrapper", "Depth and gravity.", "Dark notes, prolonged fermentation.", "The end of night, silence, attention."] };

function RedBlackTable({ dark = true }) {
  const txt = dark ? "rgba(245,240,232,.82)" : "rgba(31,23,24,.82)";
  const hair = dark ? "rgba(201,164,107,.16)" : "rgba(31,23,24,.14)";
  const accent = dark ? "var(--color-gold)" : "var(--color-tobacco)";
  const Col = ({ chip, name, rows, delay }) => (
    <Reveal delay={delay} style={{ flex: 1, minWidth: 280 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <span style={{ width: 16, height: 16, background: chip, borderRadius: 0, border: "1px solid rgba(201,164,107,.4)" }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: accent }}>{name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ padding: "18px 0", borderTop: i ? `1px solid ${hair}` : "none" }}>
            <span style={{ fontFamily: i === rows.length - 1 ? "var(--font-display)" : "var(--font-body)", fontStyle: i === rows.length - 1 ? "italic" : "normal", fontSize: i === 0 ? 19 : 16, color: i === rows.length - 1 ? accent : txt, lineHeight: 1.5 }}>{r}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 80, flexWrap: "wrap" }}>
      <Col chip="var(--color-tobacco)" name="Red" rows={pick(RB_RED)} delay={0} />
      <Col chip="var(--color-espresso)" name="Black" rows={pick(RB_BLACK)} delay={120} />
    </div>
  );
}

/* SubNav — sticky sub-navigation (Collection). Smooth-scrolls to in-page anchors. */
function SubNav({ items }) {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 124, behavior: "smooth" });
  };
  return (
    <div style={{
      position: "sticky", top: 70, zIndex: 150, background: "rgba(10,8,6,0.92)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(201,164,107,.16)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", padding: "18px 24px" }}>
        {items.map(it => (
          <span key={it.id} onClick={() => go(it.id)} className="subnav-item" style={{
            fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(245,240,232,.7)", cursor: "pointer", transition: "color 200ms ease",
          }}>{it.label}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ScrollCue, PageShell, InnerHero, SentenceScreen, TwoPhotoScreen, TitleScreen, RedBlackTable, SubNav });
