// A Coleção — four families, ten references. Typographic spec cards (no product
// shots): ring gauge anchor, wrapper chip, availability, profile, harmonização.
const { useState } = React;

const FAMILIES = [
  {
    id: "nirvana", label: "Nirvana Supreme",
    intro: "O primeiro tempo da noite. A entrada na coleção — não um compromisso, uma escolha.",
    ringline: "Ring 52 · Equilíbrio, suavidade absoluta.",
    cigars: [
      { name: "Nirvana Supreme 52 Red", wrapper: "Red — Cubra Viso", red: true, avail: "Available via partnership",
        spec: "Ring 52 · 110mm · 4⅜\" · Medium · 40–50 min",
        profileLabel: "Perfil", profile: "Cedro e creme leve. Amêndoa tostada, flor suave. Especiaria leve no acabamento.",
        harmon: "White Burgundy · Whisky japonês · Café coado" },
      { name: "Nirvana Supreme 52 Black", wrapper: "Black — Cubra Maduro", red: false, avail: "Available via partnership",
        spec: "Ring 52 · 110mm · 4⅜\" · Medium-Full · 40–50 min",
        profileLabel: "Perfil", profile: "Madeira escura, cacau, fumaça densa. Chocolate amargo, couro. Final espresso.",
        harmon: "Rioja Reserva · Single malt Speyside · Duplo espresso" },
    ],
  },
  {
    id: "gold", label: "Gold Selection",
    intro: "O centro da coleção. Onde o DNA cubano e o dulçor baiano atingem o equilíbrio.",
    ringline: "Ring 52/56 · Presença solar, intensidade média, brilho.",
    cigars: [
      { name: "Gold Selection 52 Red", wrapper: "Red — Capa Natural", red: true, avail: "Available",
        spec: "Ring 52 · 140mm · 5⅝\" · Medium · 55–65 min",
        profileLabel: "Perfil", profile: "Cedro, creme, baunilha, feno tostado, frutas secas leves." },
      { name: "Gold Selection 52 Black", wrapper: "Black — Capa Madura", red: false, avail: "Available",
        spec: "Ring 52 · 140mm · 5⅝\" · Medium-Full · 55–65 min",
        profileLabel: "Perfil", profile: "Madeira escura, cacau, frutas escuras, qualidade mineral do terroir baiano." },
      { name: "Gold Selection 56 Red", wrapper: "Red — Capa Natural", red: true, avail: "Coming soon",
        spec: "Ring 56 · 164mm · 6½\" · Medium · 70–85 min",
        profileLabel: "Prévia", profile: "A expressão mais expansiva da capa natural — dulçor sem pressa." },
      { name: "Gold Selection 56 Black", wrapper: "Black — Capa Madura", red: false, avail: "Coming soon",
        spec: "Ring 56 · 164mm · 6½\" · Medium-Full · 70–85 min",
        profileLabel: "Prévia", profile: "O mais exigente da família Gold — para noites longas e conversas profundas." },
    ],
  },
  {
    id: "borogod", label: "Borogod Supreme",
    intro: "A assinatura brasileira. Ring maior, presença imediata.",
    ringline: "Ring 58 · Personalidade marcada, notas de couro, conversa.",
    cigars: [
      { name: "Borogod Supreme 58 Red", wrapper: "Red — Capa Natural", red: true, avail: "Available",
        spec: "Ring 58 · 125mm · 5\" · Medium · 50–60 min",
        profileLabel: "Perfil", profile: "Fumaça densa e fria. Frutas secas, madeira tostada, corpo cheio. Final longo e quente." },
      { name: "Borogod Supreme 58 Black", wrapper: "Black — Capa Madura", red: false, avail: "Coming soon",
        spec: "Ring 58 · 125mm · 5\" · Medium-Full · 50–60 min",
        profileLabel: "Prévia", profile: "A expressão mais intensa da família — para quem já conhece Cruz das Almas e quer ir além." },
    ],
  },
  {
    id: "platinum", label: "Platinum Selection",
    intro: "O cume da coleção. Para noites que giram em torno do charuto.",
    ringline: "Ring 60 · Final longo, complexidade, reserva absoluta.",
    cigars: [
      { name: "Platinum Selection 60 Red", wrapper: "Red — Capa Natural", red: true, avail: "Coming soon",
        spec: "Ring 60 · 156mm · 6⅛\" · Medium · 75–90 min",
        profileLabel: "Prévia", profile: "A maior referência de capa natural. Fumaça mais fria. Doçura natural em seu ápice." },
      { name: "Platinum Selection 60 Black", wrapper: "Black — Capa Madura", red: false, avail: "Coming soon",
        spec: "Ring 60 · 156mm · 6⅛\" · Medium-Full · 75–90 min",
        profileLabel: "Prévia", profile: "A palavra final da coleção Nicoletti. O mais exigente, o mais recompensador, a noite mais longa. Reservado para quem trabalhou através da coleção e chegou aqui por escolha, não por acaso." },
    ],
  },
];

function gauge(spec) { const m = spec.match(/Ring\s+(\d+)/); return m ? m[1] : ""; }

function CigarCard({ c, delay }) {
  const [hover, setHover] = useState(false);
  const soon = c.avail === "Coming soon";
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        height: "100%", boxSizing: "border-box", padding: "36px 36px 40px",
        border: "1px solid rgba(201,164,107,.22)", background: hover ? "rgba(201,164,107,.04)" : "transparent",
        transition: "background 300ms ease, border-color 300ms ease",
        borderColor: hover ? "rgba(201,164,107,.4)" : "rgba(201,164,107,.22)",
        display: "flex", flexDirection: "column", gap: 18,
      }}>
        {/* header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 13, height: 13, background: c.red ? "var(--color-tobacco)" : "var(--color-espresso)", border: "1px solid rgba(201,164,107,.45)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,240,232,.7)" }}>{c.wrapper}</span>
          </div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: soon ? "var(--color-tobacco)" : "var(--color-gold)", whiteSpace: "nowrap" }}>{c.avail}</span>
        </div>
        {/* gauge + name */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 56, lineHeight: 1, color: "var(--color-gold)" }}>{gauge(c.spec)}</span>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 16, letterSpacing: "0.04em", color: "var(--color-off-white)", margin: 0, lineHeight: 1.4 }}>{c.name}</h3>
        </div>
        <div style={{ width: 40, height: 1, background: "rgba(201,164,107,.4)" }} />
        <div className="t-caption" style={{ color: "rgba(245,240,232,.55)", letterSpacing: "0.04em" }}>{c.spec}</div>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: 8 }}>{c.profileLabel}</div>
          <p style={{ margin: 0, color: "rgba(245,240,232,.82)", fontSize: 15, lineHeight: 1.65 }}>{c.profile}</p>
        </div>
        {c.harmon && (
          <div style={{ marginTop: "auto", paddingTop: 6 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,.45)", marginBottom: 6 }}>Harmonização</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--color-tobacco)", letterSpacing: "0.02em" }}>{c.harmon}</div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function FamilyBlock({ fam }) {
  return (
    <div id={fam.id} style={{ scrollMarginTop: 80 }}>
      <Reveal style={{ maxWidth: 720, marginBottom: 56 }}>
        <SectionLabel align="left">{fam.label}</SectionLabel>
        <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(24px,2.6vw,34px)", color: "var(--color-off-white)", margin: "20px 0 18px", lineHeight: 1.4 }}>{fam.intro}</p>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-gold)" }}>{fam.ringline}</div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
        {fam.cigars.map((c, i) => <CigarCard key={i} c={c} delay={i % 2 * 100} />)}
      </div>
    </div>
  );
}

function CollectionFamilies() {
  return (
    <section data-screen-label="Four Families" className="surface-dark" style={{ padding: "150px 80px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 130 }}>
        {FAMILIES.map(fam => <FamilyBlock key={fam.id} fam={fam} />)}
      </div>
    </section>
  );
}

/* Harmonização matrix — three rows (Vinho · Destilado · Não alcoólico) × Red/Black. */
const HARMON_ROWS = [
  { k: "Vinho", red: "White Burgundy, Pinot Noir leve, Fino Sherry", black: "Rioja Reserva, Vintage Port, Amarone" },
  { k: "Destilado", red: "Whisky japonês, rum branco envelhecido, VS Cognac", black: "Single malt Speyside, Bourbon envelhecido, VSOP Cognac" },
  { k: "Não alcoólico", red: "Café coado, chá verde, água mineral", black: "Duplo espresso, chocolate 70%+" },
];

function HarmonizacaoSection() {
  const hair = "1px solid rgba(31,23,24,.14)";
  return (
    <section id="harmonizacao" data-screen-label="Harmonização" className="surface-light" style={{ padding: "150px 80px", boxSizing: "border-box", scrollMarginTop: 64 }}>
      <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
        <SectionLabel>Harmonização</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", marginTop: 22, fontSize: "clamp(32px,3.6vw,50px)" }}>O charuto e o companheiro certo.</h2>
      </Reveal>
      <Reveal style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(120px,0.7fr) 1fr 1fr" }}>
          {/* header */}
          <div />
          <div style={{ padding: "0 24px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 13, height: 13, background: "var(--color-tobacco)", border: "1px solid rgba(201,164,107,.45)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-tobacco)" }}>Red — Medium</span>
          </div>
          <div style={{ padding: "0 24px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 13, height: 13, background: "var(--color-espresso)", border: "1px solid rgba(201,164,107,.45)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-espresso)" }}>Black — Medium-Full</span>
          </div>
          {HARMON_ROWS.map((r, i) => (
            <React.Fragment key={i}>
              <div style={{ padding: "22px 0", borderTop: hair, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-espresso)" }}>{r.k}</div>
              <div style={{ padding: "22px 24px", borderTop: hair, color: "rgba(31,23,24,.78)", fontSize: 15, lineHeight: 1.6 }}>{r.red}</div>
              <div style={{ padding: "22px 24px", borderTop: hair, color: "rgba(31,23,24,.78)", fontSize: 15, lineHeight: 1.6 }}>{r.black}</div>
            </React.Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { CollectionFamilies, HarmonizacaoSection, FamilyBlock, CigarCard, FAMILIES });
