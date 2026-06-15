// Journal — three seed articles as alternating editorial rows (Warm White).
const { useState } = React;

const ARTICLES = [
  { id: "art-0", cat: "The Lounge", title: { pt: "Onde as noites não têm pressa", en: "Where the nights are in no hurry" }, img: "assets/photography/moment-lounge-hands.jpeg",
    summary: { pt: "A arte de não apressar o fim de uma boa noite — sobre o tempo que o charuto exige, e entrega.", en: "The art of not hurrying the end of a good night — on the time the cigar asks for, and gives." } },
  { id: "art-1", cat: "The Ritual", title: { pt: "O primeiro fósforo da noite", en: "The first match of the night" }, img: "assets/photography/cigar-smoke-wood.jpeg",
    summary: { pt: "O acendimento não é uma formalidade. É o início de um contrato entre o charuto e quem o aprecia.", en: "The lighting is not a formality. It is the beginning of a contract between the cigar and the one who savours it." } },
  { id: "art-2", cat: "The Craft", title: { pt: "Cada folha carrega uma decisão", en: "Every leaf carries a decision" }, img: "assets/photography/process-cut-cigars.jpeg",
    summary: { pt: "Da plantação ao enrolamento, cada etapa é uma escolha deliberada. O long filler não é um detalhe técnico — é uma declaração.", en: "From planting to rolling, every step is a deliberate choice. Long filler is not a technical detail — it is a declaration." } },
];

function ArticleRow({ a, flip, delay }) {
  const [hover, setHover] = useState(false);
  const media = (
    <div style={{ flex: "1 1 0", minWidth: 300 }}>
      <div style={{ overflow: "hidden" }}>
        <div style={{ width: "100%", aspectRatio: "4 / 3", backgroundImage: `url(${a.img})`, backgroundSize: "cover", backgroundPosition: "center", transform: hover ? "scale(1.03)" : "scale(1)", transition: "transform 600ms cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
  const text = (
    <div style={{ flex: "1 1 0", minWidth: 300, display: "flex", flexDirection: "column", justifyContent: "center", padding: flip ? "0 64px 0 0" : "0 0 0 64px" }}>
      <div className="t-label">{a.cat}</div>
      <h3 className="t-h3" style={{ margin: "16px 0 18px", fontWeight: 500, fontSize: "clamp(26px,2.8vw,38px)" }}>{pick(a.title)}</h3>
      <p style={{ margin: "0 0 26px", color: "rgba(31,23,24,.78)", maxWidth: 460, lineHeight: 1.75 }}>{pick(a.summary)}</p>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : "var(--color-tobacco)", transition: "color 200ms ease" }}>{L("Ler a história", "Read the journal")} →</span>
    </div>
  );
  return (
    <Reveal delay={delay}>
      <a id={a.id} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="article-row" style={{ display: "flex", gap: 0, alignItems: "stretch", textDecoration: "none", cursor: "pointer", flexDirection: flip ? "row-reverse" : "row", scrollMarginTop: 124 }}>
        {media}{text}
      </a>
    </Reveal>
  );
}

function JournalPage() {
  const HERO = "assets/photography/moment-lounge-hands.jpeg";
  const SUB = [
    { id: "jr-top", label: "Journal" },
    { id: "art-0", label: "The Lounge" },
    { id: "art-1", label: "The Ritual" },
    { id: "art-2", label: "The Craft" },
  ];
  return (
    <PageShell heroImg={HERO}>
      <div id="jr-top"><InnerHero img={HERO} label={L("Journal", "Journal")} headline={L("A continuação da noite", "The continuation of the night")} scrollCue={true} screenLabel="Journal — Opening" /></div>
      <SubNav items={SUB} />
      <section data-screen-label="Articles" className="surface-light" style={{ padding: "150px 80px", boxSizing: "border-box" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 120 }}>
          {ARTICLES.map((a, i) => <ArticleRow key={i} a={a} flip={i % 2 === 1} delay={0} />)}
        </div>
      </section>
      <ContentRail surface="sand" label={L("Continue a explorar", "Continue exploring")} title={L("Mais da casa Nicoletti.", "More from the house of Nicoletti.")}
        items={[
          { img: "assets/photography/process-cut-cigars.jpeg", label: L("A Coleção", "The Collection"), title: L("Quatro famílias, dez referências.", "Four families, ten references."), href: "A Coleção.html" },
          { img: "assets/photography/cigar-smoke-wood.jpeg", label: L("Heritage", "Heritage"), title: L("Cruz das Almas.", "Cruz das Almas."), href: "Heritage.html" },
          { img: "assets/photography/cigar-lighter-dark.jpeg", label: L("The Club", "The Club"), title: L("Por convite.", "By invitation."), href: "The Club.html" },
        ]} />
    </PageShell>
  );
}

Object.assign(window, { JournalPage });
