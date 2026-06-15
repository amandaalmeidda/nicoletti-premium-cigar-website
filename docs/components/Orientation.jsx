// Homepage "In Short" — the one plainly-spoken beat. Sits between the three hero
// films and Explore Further. A newcomer arrives knowing nothing; this answers, in
// plain language, what Nicoletti is and how they actually take part — three short
// truths on Warm White — before the doorways hand them deeper into the site.
const { useState: _orUseState } = React;

const ORIENT_PILLARS = [
  {
    n: "01",
    h: { pt: "A casa", en: "The house" },
    p: {
      pt: "Uma casa brasileira de charutos premium. Quatro famílias e dez referências, criadas por Franco Nicoletti em Cruz das Almas, na Bahia.",
      en: "A Brazilian premium cigar house. Four families and ten references, blended by Franco Nicoletti in Cruz das Almas, Bahia.",
    },
  },
  {
    n: "02",
    h: { pt: "Não se compra", en: "Not for sale" },
    p: {
      pt: "A Nicoletti não está nas prateleiras. Você solicita uma introdução, e o atelier escolhe a referência para o seu momento.",
      en: "Nicoletti isn’t found on shelves. You request an introduction, and the atelier selects the reference for your moment.",
    },
  },
  {
    n: "03",
    h: { pt: "Por onde começar", en: "Where to begin" },
    p: {
      pt: "Tudo começa por uma conversa — num lounge parceiro, ou diretamente com o atelier.",
      en: "It all starts with a conversation — at a partner lounge, or directly with the atelier.",
    },
  },
];

function Orientation() {
  return (
    <section data-screen-label="In Short" className="surface-light" style={{
      padding: "clamp(96px,11vw,150px) clamp(40px,6vw,96px)", boxSizing: "border-box",
    }}>
      <Reveal style={{ textAlign: "center", maxWidth: 760, margin: "0 auto clamp(56px,6vw,84px)" }}>
        <SectionLabel>{L("Em Resumo", "In Short")}</SectionLabel>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(32px,4.2vw,56px)",
          letterSpacing: "0.04em", color: "var(--color-espresso)", margin: "18px 0 0",
          textTransform: "uppercase", textWrap: "balance", textShadow: "none",
        }}>{L("O que é a Nicoletti?", "What is Nicoletti?")}</h2>
        <p className="t-pullquote" style={{
          color: "var(--color-tobacco)", fontStyle: "italic", margin: "22px 0 0",
          fontSize: "clamp(18px,1.9vw,24px)", lineHeight: 1.5,
        }}>{L("Três coisas que vale a pena saber antes de começar.", "Three things worth knowing before you begin.")}</p>
      </Reveal>

      <div style={{
        maxWidth: 1140, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(28px,4vw,64px)",
      }} className="orient-grid">
        {ORIENT_PILLARS.map((p, i) => (
          <Reveal key={i} delay={i * 100} style={{
            display: "flex", flexDirection: "column", gap: 14,
            paddingTop: 22, borderTop: "1px solid rgba(201,164,107,.55)",
          }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "var(--color-gold)" }}>{p.n}</span>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(22px,2.2vw,28px)",
              color: "var(--color-espresso)", margin: 0, letterSpacing: "0.01em",
            }}>{pick(p.h)}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.7, color: "rgba(31,23,24,.8)", margin: 0 }}>{pick(p.p)}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={320} style={{ textAlign: "center", marginTop: "clamp(52px,5.5vw,76px)" }}>
        <GhostButton onClick={() => navTo("Contact.html")}>{L("Fale com o atelier", "Speak with the atelier")}</GhostButton>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Orientation, ORIENT_PILLARS });
