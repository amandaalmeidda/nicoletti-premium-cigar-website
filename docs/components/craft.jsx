// O Ofício / The Craft — a long-scroll, Rolls-Royce-style page on how a Nicoletti
// is made: Cuban seed → Bahian soil → the leaf's anatomy (Ligero · Seco/Viso ·
// Volado) → the five-step process → the engineering of the draw. Reuses the shared
// shell + primitives (PageShell, InnerHero, FeatureScroll, SentenceScreen,
// ContentRail, Reveal, SectionLabel, GhostButton). Three site backgrounds only;
// ghost buttons; 0px radius; gold hairlines.
const { useRef: _cUseRef } = React;

/* ---------- 2 · The Seed ---------- */
function SeedSection() {
  return (
    <section className="surface-light" data-screen-label="Craft — The Seed" style={{ padding: "clamp(110px,12vw,170px) clamp(24px,5vw,80px)", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(40px,6vw,96px)", alignItems: "center" }} className="craft-2col">
        <Reveal style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: "url(assets/photography/cigar-smoke-wood.jpeg)", backgroundSize: "cover", backgroundPosition: "center", filter: "grayscale(.06)" }} />
        <Reveal delay={120} style={{ maxWidth: 460 }}>
          <SectionLabel align="left">{L("A Semente", "The Seed")}</SectionLabel>
          <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: "20px 0 24px", fontSize: "clamp(30px,3.4vw,46px)", textWrap: "balance" }}>{L("DNA cubano, escolhido a dedo.", "Cuban DNA, chosen by hand.")}</h2>
          <p style={{ color: "rgba(31,23,24,.8)", margin: "0 0 22px", fontSize: 16.5, lineHeight: 1.85 }}>
            {L("Sementes de linhagem cubana legítima — a mesma genética das variedades mais respeitadas do mundo. Não uma inspiração, mas a folha de origem.", "Seeds of true Cuban lineage — the same genetics as the world's most respected varieties. Not an inspiration, but the origin leaf itself.")}
          </p>
          <p style={{ color: "rgba(31,23,24,.8)", margin: 0, fontSize: 16.5, lineHeight: 1.85 }}>
            {L("Pela primazia da produção, as melhores folhas são separadas para a casa antes de a produção regular começar. O critério de Franco começa na lavoura.", "By right of first selection, the finest leaves are set aside for the house before regular production begins. Franco's discernment starts in the field.")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 4 · 100% Long Filler — the signature stat ---------- */
function LongFillerStat() {
  return (
    <section className="surface-sand" data-screen-label="Craft — Long Filler" style={{ padding: "clamp(110px,12vw,165px) 24px", boxSizing: "border-box" }}>
      <Reveal style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionLabel>{L("A Construção", "The Construction")}</SectionLabel>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "clamp(14px,2vw,28px)", margin: "26px 0 6px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(84px,13vw,180px)", lineHeight: 0.9, color: "var(--color-tobacco)" }}>100<span style={{ fontSize: "0.42em", verticalAlign: "super" }}>%</span></span>
          <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(26px,3.2vw,44px)", color: "var(--color-espresso)" }}>Long Filler</span>
        </div>
        <p style={{ color: "rgba(31,23,24,.8)", margin: "22px 0 0", fontSize: "clamp(17px,1.7vw,21px)", lineHeight: 1.7, maxWidth: 560 }}>
          {L("Folhas inteiras, da cabeça ao pé. Nunca picado, nunca prensado — enrolado à mão, charuto a charuto.", "Whole leaves, head to foot. Never chopped, never pressed — rolled by hand, one cigar at a time.")}
        </p>
      </Reveal>
    </section>
  );
}

/* ---------- 5 · The Anatomy — Ligero · Seco/Viso · Volado ---------- */
const CRAFT_TIERS = [
  { pos: { pt: "Topo", en: "Top" }, name: "Ligero", role: { pt: "Força e corpo. A folha mais exposta ao sol, a mais lenta a queimar.", en: "Strength and body. The leaf most exposed to the sun, the slowest to burn." } },
  { pos: { pt: "Centro", en: "Centre" }, name: "Seco · Viso", role: { pt: "Aroma de média intensidade. O equilíbrio que sustenta o conjunto.", en: "Aroma of medium intensity. The balance that holds the blend together." } },
  { pos: { pt: "Base", en: "Base" }, name: "Volado", role: { pt: "Combustão regular. A folha que garante a queima constante e fria.", en: "Even combustion. The leaf that keeps the burn steady and cool." } },
];
function AnatomySection() {
  return (
    <section className="surface-light" data-screen-label="Craft — The Anatomy" style={{ padding: "clamp(110px,12vw,170px) clamp(24px,5vw,80px)", boxSizing: "border-box" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(56px,6vw,80px)" }}>
        <SectionLabel>{L("A Anatomia", "The Anatomy")}</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: "18px 0 0", fontSize: "clamp(30px,3.6vw,48px)", textWrap: "balance" }}>{L("Três folhas, um miolo.", "Three leaves, one core.")}</h2>
        <p className="t-pullquote" style={{ color: "var(--color-tobacco)", fontStyle: "italic", margin: "20px 0 0", fontSize: "clamp(18px,1.9vw,24px)", lineHeight: 1.5 }}>{L("O equilíbrio é construído, não encontrado.", "Balance is built, not found.")}</p>
      </Reveal>

      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(40px,6vw,88px)", alignItems: "center" }} className="craft-2col">
        <Reveal style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: "url(assets/photography/process-cut-cigars.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <Reveal delay={120} style={{ display: "flex", flexDirection: "column" }}>
          {CRAFT_TIERS.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(18px,2vw,30px)", padding: "26px 0", borderTop: i ? "1px solid rgba(31,23,24,.14)" : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingTop: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--color-gold)" }} />
                {i < CRAFT_TIERS.length - 1 && <span style={{ width: 1, flex: 1, minHeight: 30, background: "rgba(201,164,107,.45)" }} />}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-tobacco)", marginBottom: 7 }}>{pick(t.pos)}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(22px,2.3vw,30px)", color: "var(--color-espresso)", margin: "0 0 10px", letterSpacing: "0.01em" }}>{t.name}</h3>
                <p style={{ color: "rgba(31,23,24,.74)", margin: 0, fontSize: 15.5, lineHeight: 1.7, maxWidth: 380 }}>{pick(t.role)}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 6 · The Process — five-step sequence ---------- */
const CRAFT_STEPS = [
  { n: "01", name: { pt: "Cultivo", en: "Cultivation" }, body: { pt: "Desenvolvimento lento sob a brisa atlântica.", en: "Slow development under the Atlantic breeze." } },
  { n: "02", name: { pt: "Cura", en: "Curing" }, body: { pt: "Secagem controlada. A folha perde água, ganha cor.", en: "Controlled drying. The leaf loses water, gains colour." } },
  { n: "03", name: { pt: "Fermentação", en: "Fermentation" }, body: { pt: "Aromas refinados, impurezas eliminadas.", en: "Aromas refined, impurities drawn out." } },
  { n: "04", name: { pt: "Decapagem", en: "Stripping" }, body: { pt: "Remoção do nervo central, folha a folha.", en: "The central vein removed, leaf by leaf." } },
  { n: "05", name: { pt: "Enrolamento", en: "Rolling" }, body: { pt: "À mão. Long filler, da cabeça ao pé.", en: "By hand. Long filler, head to foot." } },
];
function ProcessSection() {
  return (
    <section className="surface-dark" data-screen-label="Craft — The Process" style={{ padding: "clamp(110px,12vw,165px) clamp(24px,5vw,80px)", boxSizing: "border-box" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(56px,6vw,84px)" }}>
        <SectionLabel>{L("A Cadeia", "The Chain")}</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "18px 0 0", fontSize: "clamp(30px,3.6vw,48px)" }}>{L("Da folha à brasa.", "From leaf to ember.")}</h2>
      </Reveal>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "clamp(20px,2.4vw,36px)" }} className="craft-steps">
        {CRAFT_STEPS.map((s, i) => (
          <Reveal key={i} delay={i * 80} style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 22, borderTop: "1px solid rgba(201,164,107,.4)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(30px,3vw,42px)", color: "var(--color-gold)", lineHeight: 1 }}>{s.n}</span>
            <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-off-white)", margin: 0 }}>{pick(s.name)}</h3>
            <p style={{ color: "rgba(245,240,232,.7)", margin: 0, fontSize: 14.5, lineHeight: 1.65 }}>{pick(s.body)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 7 · The Engineering — pressure architecture + flowmeter ---------- */
const CRAFT_ENG = [
  { label: { pt: "Arquitetura de pressão", en: "Pressure architecture" }, body: { pt: "O enrolador distribui a pressão para que a combustão seja absoluta e constante — mesmo nos 178 mm da família Platinum.", en: "The roller distributes pressure so the burn stays absolute and constant — even across the 178 mm of the Platinum family." } },
  { label: { pt: "O fluxômetro", en: "The flowmeter" }, body: { pt: "Cada charuto é medido. A resistência da tragada, verificada — a honestidade do fluxo, garantida à mão.", en: "Every cigar is measured. The resistance of the draw, verified — the honesty of the flow, assured by hand." } },
];
function EngineeringSection() {
  return (
    <section className="surface-dark" data-screen-label="Craft — The Engineering" style={{ padding: "0 clamp(24px,5vw,80px) clamp(120px,13vw,170px)", boxSizing: "border-box", marginTop: "-40px" }}>
      <Reveal style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(48px,5vw,72px)" }}>
        <SectionLabel>{L("A Engenharia", "The Engineering")}</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "18px 0 0", fontSize: "clamp(28px,3.2vw,42px)", textWrap: "balance" }}>{L("A tragada não se deixa ao acaso.", "The draw is never left to chance.")}</h2>
      </Reveal>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,5vw,72px)" }} className="craft-2col">
        {CRAFT_ENG.map((e, i) => (
          <Reveal key={i} delay={i * 120} style={{ paddingTop: 26, borderTop: "1px solid rgba(201,164,107,.4)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontStyle: "italic", fontSize: "clamp(22px,2.3vw,30px)", color: "var(--color-gold)", margin: "0 0 16px" }}>{pick(e.label)}</h3>
            <p style={{ color: "rgba(245,240,232,.82)", margin: 0, fontSize: 16, lineHeight: 1.8 }}>{pick(e.body)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ====================== CRAFT PAGE (assembled) ====================== */
function CraftPage() {
  const HERO = "assets/photography/process-cut-cigars.jpeg";
  return (
    <PageShell heroImg={HERO}>
      <InnerHero
        img={HERO}
        screenLabel="Craft — Hero"
        label={L("Da semente à cinza", "From seed to ash")}
        headline={L("O Ofício", "The Craft")} />
      <SentenceScreen
        surface="light"
        minHeight="62vh"
        screenLabel="Craft — Opening"
        quote={L("Antes do ritual, antes da mesa — há uma folha.", "Before the ritual, before the table — there is a leaf.")} />
      <SeedSection />
      <FeatureScroll
        img="assets/photography/cigar-lighter-dark.jpeg"
        screenLabel="Craft — The Soil"
        label={L("O Solo", "The Soil")}
        title={L("O que Cuba não consegue replicar.", "What Cuba cannot replicate.")}
        body={L("Solo mineral, clima quente e úmido, a brisa constante do Atlântico. A folha desenvolve-se devagar — e ganha uma suavidade que não se adiciona: se extrai da terra.", "Mineral soil, a warm and humid climate, the constant Atlantic breeze. The leaf develops slowly — and gains a softness that is not added, but drawn from the earth.")} />
      <LongFillerStat />
      <AnatomySection />
      <ProcessSection />
      <EngineeringSection />
      <SentenceScreen
        surface="light"
        minHeight="60vh"
        screenLabel="Craft — Close"
        quote={L("Dez referências nascem de uma só disciplina.", "Ten references born of a single discipline.")} />
      <ContentRail surface="sand" label={L("Continue", "Continue")} title={L("A casa, por inteiro.", "The house, in full.")}
        items={[
          { img: "assets/photography/cigar-smoke-wood.jpeg", label: L("A Coleção", "The Collection"), title: L("Quatro famílias, dez referências.", "Four families, ten references."), href: "A Coleção.html" },
          { img: "assets/photography/moment-lounge-hands.jpeg", label: L("Herança", "Heritage"), title: L("O trabalho de uma vida.", "A lifetime in the making."), href: "Heritage.html" },
          { img: "assets/photography/cigar-lighter-dark.jpeg", label: L("O Clube", "The Club"), title: L("Não há ingresso. Há convite.", "There is no ticket. There is an invitation."), href: "The Club.html" },
        ]} />
    </PageShell>
  );
}

Object.assign(window, { CraftPage });
