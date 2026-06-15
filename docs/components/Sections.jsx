// Homepage scroll sections 2–8. Built on the three v2.5 backgrounds in alternating
// rhythm. All copy verbatim from the Copy Map. Ghost buttons only · 0px radius.
const { useState } = React;

/* ---------- Section 2 & 4 — Sentence screens ---------- */
function SentenceScreen({ quote, attribution, surface = "light", minHeight = "76vh", screenLabel }) {
  const dark = surface === "dark";
  return (
    <section data-screen-label={screenLabel} className={dark ? "surface-dark" : "surface-light"} style={{
      minHeight, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "120px 24px", boxSizing: "border-box",
    }}>
      <Reveal style={{ maxWidth: 1040, textAlign: "center" }}>
        <p className="t-pullquote" style={{
          margin: 0, color: dark ? "var(--color-off-white)" : "var(--color-espresso)",
          fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1.45, textWrap: "balance",
        }}>{quote}</p>
        {attribution && (
          <div style={{
            marginTop: 32, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 400,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: dark ? "rgba(245,240,232,.6)" : "var(--color-smoke-gray)",
          }}>— {attribution}</div>
        )}
      </Reveal>
    </section>
  );
}

/* ---------- Section 3 — Heritage (full-bleed photo + parallax, text left) ---------- */
function HeritageSection() {
  const pref = useParallax(0.14);
  return (
    <section data-screen-label="Heritage" style={{
      position: "relative", minHeight: "94vh", display: "flex", alignItems: "center",
      overflow: "hidden", background: "var(--color-near-black)",
    }}>
      <div ref={pref} style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(assets/photography/cigar-smoke-wood.jpeg)",
        backgroundSize: "cover", backgroundPosition: "center right", willChange: "transform",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,8,6,.92) 0%, rgba(10,8,6,.78) 38%, rgba(10,8,6,.30) 75%, rgba(10,8,6,.20) 100%)" }} />
      <Reveal style={{ position: "relative", zIndex: 2, maxWidth: 620, padding: "0 80px", boxSizing: "border-box" }}>
        <SectionLabel align="left">A Origem</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "24px 0 28px", fontSize: "clamp(34px, 4vw, 54px)" }}>
          Cruz das Almas,<br/>no Recôncavo Baiano.
        </h2>
        <p style={{ color: "rgba(245,240,232,.82)", maxWidth: 480, marginBottom: 40 }}>
          Sementes de DNA cubano cultivadas num solo que não existe em mais nenhum lugar. A estrutura clássica encontrou aqui um dulçor natural e uma fumaça sedosa.
        </p>
        <GhostButton onClick={() => navTo("Heritage.html")}>Discover the heritage</GhostButton>
      </Reveal>
    </section>
  );
}

/* ---------- Section 5 — Collection preview (Near Black, centered) ---------- */
function CollectionSection() {
  return (
    <section data-screen-label="Collection Preview" className="surface-dark" style={{
      padding: "160px 24px", boxSizing: "border-box", textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      <Reveal style={{ maxWidth: 720 }}>
        <SectionLabel>A Coleção</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "26px 0 28px", fontSize: "clamp(36px, 4.2vw, 56px)" }}>
          Uma seleção privada.
        </h2>
        <p style={{ color: "rgba(245,240,232,.82)", maxWidth: 560, margin: "0 auto 44px" }}>
          Quatro famílias. Duas capas. Dez referências curadas por Franco Nicoletti a partir das melhores folhas de Cruz das Almas.
        </p>
        <GhostButton onClick={() => navTo("A Coleção.html")}>Enter the collection</GhostButton>
      </Reveal>
    </section>
  );
}

/* ---------- Section 6 — Franco (split: photo left, Soft Sand panel right) ---------- */
function FrancoSection() {
  return (
    <section data-screen-label="Franco" className="surface-sand" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "84vh" }}>
      {/* Photo left */}
      <div className="franco-photo" style={{
        backgroundImage: "url(assets/photography/moment-lounge-hands.jpeg)",
        backgroundSize: "cover", backgroundPosition: "center", minHeight: 420,
      }} />
      {/* Soft Sand panel right */}
      <div style={{ display: "flex", alignItems: "center", padding: "120px clamp(48px, 7vw, 112px)", boxSizing: "border-box" }}>
        <Reveal style={{ maxWidth: 480 }}>
          <SectionLabel align="left">O Curador</SectionLabel>
          <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: "22px 0 26px", fontSize: "clamp(34px, 3.6vw, 50px)" }}>
            Franco Nicoletti
          </h2>
          <p style={{ color: "rgba(31,23,24,.82)", marginBottom: 32 }}>
            Franco não opera uma linha industrial. Ele assina uma curadoria de excelência baseada em décadas de presença nas mesas mais exigentes do mundo. A primazia da produção é reservada para a sua marca — não o que sobra, mas o que é separado antes de tudo começar.
          </p>
          <div className="t-signature" style={{ color: "var(--color-tobacco)", fontSize: 30, marginBottom: 36 }}>Con Amore, Franco Nicoletti</div>
          <GhostButton onClick={() => navTo("Heritage.html")}>The story of Franco</GhostButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Section 7 — Journal preview (Warm White, three editorial cards) ---------- */
const JOURNAL = [
  { img: "assets/photography/moment-lounge-hands.jpeg", label: "The Lounge", title: "Onde as noites não têm pressa" },
  { img: "assets/photography/cigar-smoke-wood.jpeg", label: "The Ritual", title: "O primeiro fósforo da noite" },
  { img: "assets/photography/process-cut-cigars.jpeg", label: "The Craft", title: "Cada folha carrega uma decisão" },
];

function JournalCard({ item, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <a onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => navTo("Journal.html")}
         style={{ textDecoration: "none", cursor: "pointer", display: "block" }}>
        <div style={{ overflow: "hidden", borderRadius: 2 }}>
          <div style={{
            width: "100%", aspectRatio: "4 / 3", backgroundImage: `url(${item.img})`,
            backgroundSize: "cover", backgroundPosition: "center", borderRadius: 2,
            transform: hover ? "scale(1.03)" : "scale(1)", transition: "transform 600ms cubic-bezier(0.4,0,0.2,1)",
          }} />
        </div>
        <div className="t-label" style={{ marginTop: 24 }}>{item.label}</div>
        <h3 className="t-h3" style={{ marginTop: 12, marginBottom: 18, fontWeight: 500 }}>{item.title}</h3>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : "var(--color-tobacco)", transition: "color 200ms ease" }}>
          Read the journal →
        </span>
      </a>
    </Reveal>
  );
}

function JournalSection() {
  return (
    <section data-screen-label="Journal" className="surface-light" style={{ padding: "160px 80px", boxSizing: "border-box" }}>
      <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
        <SectionLabel>Journal</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", marginTop: 22, fontSize: "clamp(34px, 3.8vw, 52px)" }}>A continuação da noite</h2>
      </Reveal>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
        {JOURNAL.map((it, i) => <JournalCard key={i} item={it} delay={i * 100} />)}
      </div>
      <Reveal style={{ textAlign: "center", marginTop: 72 }}>
        <GhostButton onClick={() => navTo("Journal.html")}>View all stories</GhostButton>
      </Reveal>
    </section>
  );
}

/* ---------- Section 8 — The Club (Near Black, split: text left, photo right) ---------- */
function ClubSection() {
  return (
    <section data-screen-label="The Club" className="surface-dark" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "120px clamp(48px, 7vw, 112px)", boxSizing: "border-box", order: 1 }}>
        <Reveal style={{ maxWidth: 480 }}>
          <SectionLabel align="left">The Club</SectionLabel>
          <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "22px 0 26px", fontSize: "clamp(32px, 3.6vw, 50px)" }}>
            Não há ingresso.<br/>Há convite.
          </h2>
          <p style={{ color: "rgba(245,240,232,.82)", marginBottom: 40 }}>
            No Brasil, o acesso à Coleção Nicoletti acontece por encontros e parcerias. O Lounge Nicoletti é o primeiro passo.
          </p>
          <GhostButton arrow={false} onClick={() => navTo("The Club.html")}>Begin the conversation</GhostButton>
        </Reveal>
      </div>
      <div className="club-photo" style={{
        backgroundImage: "url(assets/photography/cigar-lighter-dark.jpeg)",
        backgroundSize: "cover", backgroundPosition: "center", minHeight: 420, order: 2,
      }} />
    </section>
  );
}

/* ---------- Register-interest band (RR "Keep in touch", brand-safe) ---------- */
function RegisterBand() {
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (val.trim()) setSent(true); };
  return (
    <section data-screen-label="Register Interest" className="surface-sand" style={{ padding: "130px 24px", boxSizing: "border-box" }}>
      <Reveal style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Por Convite</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: "22px 0 18px", fontSize: "clamp(30px, 3.4vw, 46px)" }}>Nicoletti não se anuncia. É encontrado.</h2>
        {!sent ? (
          <form onSubmit={submit} style={{ marginTop: 40, display: "flex", gap: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto", alignItems: "stretch", borderBottom: "1px solid rgba(31,23,24,.3)" }}>
            <input value={val} onChange={(e) => setVal(e.target.value)} type="email" placeholder="Deixe seu email" required
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "14px 4px", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-espresso)" }} />
            <button type="submit" style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-tobacco)", padding: "0 8px" }}>Registrar →</button>
          </form>
        ) : (
          <p style={{ marginTop: 40, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(20px,2.2vw,26px)", color: "var(--color-espresso)" }}>
            Recebemos seu nome. Se houver um encontro alinhado ao seu momento, entraremos em contato.
          </p>
        )}
      </Reveal>
    </section>
  );
}

Object.assign(window, { SentenceScreen, HeritageSection, CollectionSection, FrancoSection, JournalSection, ClubSection, RegisterBand });
