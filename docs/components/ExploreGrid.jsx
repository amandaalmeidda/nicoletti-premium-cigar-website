// Homepage "Explore Further" grid — the RR "Continue Your Journey" pattern,
// rendered in the Nicoletti language. Three image cards on Near Black, each a
// doorway into the deeper site. This is the ONLY content section between the
// three hero moments and the footer — the home page inspires, then hands off.
const { useState } = React;

const EXPLORE_CARDS = [
  {
    img: "assets/photography/box-presentation.jpeg",
    label: { pt: "A Coleção", en: "The Collection" },
    title: { pt: "Uma seleção privada", en: "A private selection" },
    blurb: { pt: "Quatro famílias, dez referências — a expressão sem concessões do critério de Franco Nicoletti.", en: "Four families, ten references — the uncompromising expression of Franco Nicoletti's discernment." },
    file: "A Coleção.html",
  },
  {
    img: "assets/photography/tobacco-field.jpeg",
    label: { pt: "A Origem", en: "The Origin" },
    title: { pt: "Cruz das Almas, Bahia", en: "Cruz das Almas, Bahia" },
    blurb: { pt: "Linhagem cubana, solo baiano — um terroir que eleva a folha a uma forma de arte.", en: "Cuban lineage, Bahian soil — a terroir that elevates the leaf to an art form." },
    file: "Heritage.html",
  },
  {
    img: "assets/photography/lounge-interior.jpeg",
    label: { pt: "The Club", en: "The Club" },
    title: { pt: "Não há ingresso. Há convite.", en: "There is no ticket. There is an invitation." },
    blurb: { pt: "O acesso não se compra. Recebe-se — e começa por um encontro.", en: "Access is not bought. It is received — and it begins with a meeting." },
    file: "The Club.html",
  },
];

function ExploreCard({ card, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <a
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navTo(card.file)}
        style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}
      >
        {/* Image */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{
            width: "100%", aspectRatio: "3 / 4", backgroundImage: `url(${card.img})`,
            backgroundSize: "cover", backgroundPosition: "center",
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform 800ms cubic-bezier(0.4,0,0.2,1)",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,0) 55%, rgba(10,8,6,.55))" }} />
        </div>

        {/* Caption */}
        <div style={{ paddingTop: 26 }}>
          <SectionLabel align="left">{pick(card.label)}</SectionLabel>
          <h3 className="t-h3" style={{
            color: "var(--color-off-white)", margin: "16px 0 14px", fontWeight: 500,
            fontSize: "clamp(22px, 1.7vw, 27px)", textWrap: "balance",
          }}>{pick(card.title)}</h3>
          <p style={{
            color: "rgba(245,240,232,.62)", fontSize: 15, lineHeight: 1.55, margin: "0 0 22px",
            maxWidth: 340,
          }}>{pick(card.blurb)}</p>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
            textTransform: "uppercase", color: hover ? "var(--color-gold)" : "rgba(201,164,107,.7)",
            transition: "color 200ms ease",
          }}>{L("Explorar", "Explore")} →</span>
        </div>
      </a>
    </Reveal>
  );
}

function ExploreGrid() {
  return (
    <section data-screen-label="Explore Further" className="surface-dark" style={{
      padding: "clamp(96px, 11vw, 160px) clamp(40px, 6vw, 96px)", boxSizing: "border-box",
    }}>
      <Reveal style={{ textAlign: "center", marginBottom: "clamp(56px, 6vw, 84px)" }}>
        <SectionLabel flank>{L("Explore Mais", "Explore Further")}</SectionLabel>
        <p className="t-pullquote" style={{
          color: "rgba(245,240,232,.55)", margin: "22px 0 0", fontSize: "clamp(21px, 2vw, 28px)",
          letterSpacing: "0.02em",
        }}>{L("Continue a sua jornada", "Continue your journey")}</p>
      </Reveal>
      <div style={{
        maxWidth: 1280, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(28px, 3vw, 52px)",
      }}>
        {EXPLORE_CARDS.map((c, i) => <ExploreCard key={i} card={c} delay={i * 90} />)}
      </div>
    </section>
  );
}

Object.assign(window, { ExploreGrid });
