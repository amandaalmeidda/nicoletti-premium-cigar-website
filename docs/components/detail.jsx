// In Detail — the Rolls-Royce-style long-scroll detail page for each model.
// Rhythm: hero name → dark intro + Enquire → film on a dark→light fading bg →
// two photos on white → white→sand fade text → detail slider → sand text →
// full-bleed photo → sand text → two photos → contained photo + quote on a
// sand→white fade → full-bleed photo → second slider → final CTA → Explore.
// Reuses ScrollReveal / ScrollVideo / ModelExplore from discover.jsx (window).
const { useState, useEffect, useRef } = React;

/* Lazy resolvers — discover.jsx loads first, but resolve at render to be safe. */
const SR = (props) => { const C = window.ScrollReveal; return C ? <C {...props} /> : <div style={props.style}>{props.children}</div>; };
const SV = (props) => { const C = window.ScrollVideo; return C ? <C {...props} /> : <video {...props} muted loop playsInline />; };

/* Asset rotation — four photographs, four films; offset per model so each page
   reads distinctly. Placeholders until dedicated model photography arrives. */
const DET_P = [
  "assets/photography/cigar-smoke-wood.jpeg",
  "assets/photography/cigar-lighter-dark.jpeg",
  "assets/photography/moment-lounge-hands.jpeg",
  "assets/photography/process-cut-cigars.jpeg",
];
const DET_V = ["assets/video/hero-01.mp4", "assets/video/hero-02.mp4", "assets/video/hero-03.mp4", "assets/video/hero-moment.mp4"];
const detRot = (r, k) => DET_P[(r + k) % DET_P.length];

const DET_CRAFT = { pt: "No atelier do Recôncavo Baiano, mestres torcedores dão vida a cada referência. Long filler, folhas de DNA cubano, um solo que não existe em mais nenhum lugar.", en: "In the atelier of the Recôncavo Baiano, master rollers bring each reference to life. Long filler, leaves of Cuban DNA, a soil that exists nowhere else." };
const DET_FINAL = { pt: "Cada referência Nicoletti chega por encontro, não por catálogo. Fale com o atelier e comece a conversa.", en: "Every Nicoletti reference arrives by meeting, not by catalogue. Speak with the atelier and begin the conversation." };

// Per-model copy — Nicoletti voice, PT + EN. Resolved per-render via pick().
const DETAIL_COPY = {
  nirvana: {
    r: 0,
    spec: { pt: "Ring 52 · 110mm · 4⅜\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 52 · 110mm · 4⅜\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    intro: { title: { pt: "Um triunfo de suavidade", en: "A triumph of softness" }, body: { pt: "Nirvana Supreme redefine a entrada na coleção — uma expressão de equilíbrio e suavidade absoluta que eleva o primeiro tempo da noite a uma forma de arte.", en: "Nirvana Supreme redefines the entry into the collection — an expression of balance and absolute softness that elevates the opening movement of the night to an art form." } },
    film: { title: { pt: "Compostura exterior, refinada", en: "Exterior composure, refined" }, body: { pt: "Cedro e creme sob luz quente. Cada folha selecionada à mão em Cruz das Almas — cada detalhe pensado para uma suavidade que convida, nunca se impõe.", en: "Cedar and cream under warm light. Each leaf selected by hand in Cruz das Almas — every detail considered for a softness that invites, never imposes." } },
    fade1: { title: { pt: "Desenho atemporal", en: "Timeless design" }, body: { pt: "Ring 52, 110 milímetros. A proporção exata para quarenta minutos que não pedem mais nada.", en: "Ring 52, 110 millimetres. The exact proportion for forty minutes that ask for nothing more." } },
    slider1: { label: { pt: "A Capa", en: "The Wrapper" }, body: { pt: "Red — Cubra Viso: abertura, fluidez, dulçor natural. Black — Cubra Maduro: cacau, couro, final espresso.", en: "Red — Cubra Viso: openness, fluidity, natural sweetness. Black — Cubra Maduro: cocoa, leather, an espresso finish." } },
    sand1: { title: { pt: "Detalhes que envolvem", en: "Details that envelop" }, body: { pt: "Amêndoa tostada, flor suave, especiaria leve no acabamento. O perfil que recebe — e permanece.", en: "Toasted almond, soft floral notes, a light spice on the finish. The profile that receives — and remains." } },
    sand2: { title: { pt: "O extraordinário, à mão", en: "The extraordinary, by hand" }, body: DET_CRAFT },
    quote: { pt: "A entrada certa muda a noite inteira.", en: "The right beginning changes the whole night." },
    slider2: { title: { pt: "Harmonização", en: "Pairing" }, body: { pt: "White Burgundy · Whisky japonês · Café coado. O atelier indica o par exato de cada capa.", en: "White Burgundy · Japanese whisky · Filter coffee. The atelier advises the exact pairing for each wrapper." } },
  },
  gold: {
    r: 1,
    spec: { pt: "Ring 52 / 56 · até 164mm · 6½\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 52 / 56 · up to 164mm · 6½\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    intro: { title: { pt: "Um triunfo de equilíbrio", en: "A triumph of balance" }, body: { pt: "Gold Selection redefine o centro da coleção — sua expressão inflexível de presença solar e intensidade média eleva o encontro entre o DNA cubano e o dulçor baiano a uma forma de arte.", en: "Gold Selection redefines the heart of the collection — its uncompromising expression of solar presence and medium intensity elevates the meeting of Cuban DNA and Bahian sweetness to an art form." } },
    film: { title: { pt: "Presença solar, refinada", en: "Solar presence, refined" }, body: { pt: "Cedro, creme, baunilha, feno tostado. A capa natural em sua expressão mais plena — sem pressa, sem excesso.", en: "Cedar, cream, vanilla, toasted hay. The natural wrapper in its fullest expression — unhurried, never excessive." } },
    fade1: { title: { pt: "A medida do centro", en: "The measure of the centre" }, body: { pt: "Ring 52 e 56, até 164 milímetros. Da conversa de uma hora às noites que não contam o tempo.", en: "Ring 52 and 56, up to 164 millimetres. From the hour-long conversation to nights that do not count the time." } },
    slider1: { label: { pt: "A Capa", en: "The Wrapper" }, body: { pt: "Red: cedro, baunilha, frutas secas leves. Black: madeira escura, cacau, a qualidade mineral do terroir baiano.", en: "Red: cedar, vanilla, light dried fruit. Black: dark wood, cocoa, the mineral quality of the Bahian terroir." } },
    sand1: { title: { pt: "Detalhes que permanecem", en: "Details that remain" }, body: { pt: "Um brilho que fica depois da última baforada. O equilíbrio é a forma mais difícil de luxo.", en: "A glow that lingers after the final draw. Balance is the most difficult form of luxury." } },
    sand2: { title: { pt: "O extraordinário, à mão", en: "The extraordinary, by hand" }, body: DET_CRAFT },
    quote: { pt: "Pequenas coisas fazem o equilíbrio. E o equilíbrio não é coisa pequena.", en: "Small things make balance. And balance is no small thing." },
    slider2: { title: { pt: "Harmonização", en: "Pairing" }, body: { pt: "Champagne maduro · Bourbon de tonel único · Espresso doce. O atelier indica o par exato de cada capa.", en: "Mature Champagne · Single-barrel bourbon · Sweet espresso. The atelier advises the exact pairing for each wrapper." } },
  },
  borogod: {
    r: 2,
    spec: { pt: "Ring 58 · 125mm · 5\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 58 · 125mm · 5\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    intro: { title: { pt: "Um triunfo de personalidade", en: "A triumph of character" }, body: { pt: "Borogod Supreme é a assinatura brasileira — uma expressão sem concessões de presença e caráter, onde cada detalhe foi pensado para uma beleza que permanece.", en: "Borogod Supreme is the Brazilian signature — an uncompromising expression of presence and character, where every detail has been considered for a beauty that endures." } },
    film: { title: { pt: "Presença imediata, refinada", en: "Immediate presence, refined" }, body: { pt: "Couro, frutas secas, madeira tostada. Corpo cheio, final longo e quente — o temperamento de Cruz das Almas, sem pedir licença.", en: "Leather, dried fruit, toasted wood. Full body, a long warm finish — the temperament of Cruz das Almas, asking no permission." } },
    fade1: { title: { pt: "A medida da assinatura", en: "The measure of the signature" }, body: { pt: "Ring 58, 125 milímetros. Cinquenta minutos de conversa que não pede licença.", en: "Ring 58, 125 millimetres. Fifty minutes of conversation that asks no permission." } },
    slider1: { label: { pt: "A Capa", en: "The Wrapper" }, body: { pt: "Red: fumaça densa e fria, corpo cheio. Black: a expressão mais intensa da família — para quem quer ir além.", en: "Red: dense, cool smoke, full body. Black: the most intense expression of the family — for those who wish to go further." } },
    sand1: { title: { pt: "Detalhes de caráter", en: "Details of character" }, body: { pt: "Personalidade não se ensina. Acontece — folha a folha, no solo do Recôncavo.", en: "Character is not taught. It happens — leaf by leaf, in the soil of the Recôncavo." } },
    sand2: { title: { pt: "O extraordinário, à mão", en: "The extraordinary, by hand" }, body: DET_CRAFT },
    quote: { pt: "O Brasil não imita. Assina.", en: "Brazil does not imitate. It signs." },
    slider2: { title: { pt: "Harmonização", en: "Pairing" }, body: { pt: "Malbec de altitude · Rum envelhecido · Espresso curto. O atelier indica o par exato de cada capa.", en: "High-altitude Malbec · Aged rum · Short espresso. The atelier advises the exact pairing for each wrapper." } },
  },
  platinum: {
    r: 3,
    spec: { pt: "Ring 60 · 156mm · 6⅛\" · Médio · Long Filler · Cruz das Almas, Recôncavo Baiano.", en: "Ring 60 · 156mm · 6⅛\" · Medium · Long Filler · Cruz das Almas, Recôncavo Baiano." },
    intro: { title: { pt: "Um triunfo de critério", en: "A triumph of discernment" }, body: { pt: "Platinum Selection é a palavra final da casa — final longo, complexidade e reserva absoluta, elevados à sua expressão mais plena.", en: "Platinum Selection is the final word of the house — a long finish, complexity and absolute reserve, elevated to their fullest expression." } },
    film: { title: { pt: "Reserva absoluta", en: "Absolute reserve" }, body: { pt: "Ring 60, fumaça mais fria, doçura natural em seu ápice. Reservado a quem chegou aqui por escolha.", en: "Ring 60, cooler smoke, natural sweetness at its peak. Reserved for those who arrived here by choice." } },
    fade1: { title: { pt: "A medida do cume", en: "The measure of the summit" }, body: { pt: "Ring 60, 156 milímetros. Para noites inteiras que giram em torno do charuto.", en: "Ring 60, 156 millimetres. For whole nights that revolve around the cigar." } },
    slider1: { label: { pt: "A Capa", en: "The Wrapper" }, body: { pt: "Red: doçura natural no ápice. Black: profundidade e gravidade — fim da noite, silêncio, atenção.", en: "Red: natural sweetness at its peak. Black: depth and gravity — the end of the night, silence, attention." } },
    sand1: { title: { pt: "Detalhes do cume", en: "Details of the summit" }, body: { pt: "Complexidade que se revela em camadas, terço a terço. Algumas noites pedem a noite inteira.", en: "Complexity that reveals itself in layers, third by third. Some nights ask for the whole night." } },
    sand2: { title: { pt: "O extraordinário, à mão", en: "The extraordinary, by hand" }, body: DET_CRAFT },
    quote: { pt: "A palavra final não se apressa.", en: "The final word is never hurried." },
    slider2: { title: { pt: "Harmonização", en: "Pairing" }, body: { pt: "Vintage Port · Single malt turfado · Café de origem. O atelier indica o par exato de cada capa.", en: "Vintage Port · Peated single malt · Single-origin coffee. The atelier advises the exact pairing for each wrapper." } },
  },
};

// Build a model's detail data for the CURRENT language. Called per-render so it
// re-resolves when the language switches.
const buildDetail = (id) => {
  const c = DETAIL_COPY[id]; const r = c.r;
  return {
    spec: pick(c.spec),
    intro: { title: pick(c.intro.title), body: pick(c.intro.body) },
    film: { title: pick(c.film.title), body: pick(c.film.body) },
    fade1: { title: pick(c.fade1.title), body: pick(c.fade1.body) },
    slider1: { label: pick(c.slider1.label), body: pick(c.slider1.body) },
    sand1: { title: pick(c.sand1.title), body: pick(c.sand1.body) },
    sand2: { title: pick(c.sand2.title), body: pick(c.sand2.body) },
    quote: pick(c.quote),
    slider2: { title: pick(c.slider2.title), body: pick(c.slider2.body) },
    introBg: detRot(r, 2),
    video: DET_V[r],
    two1: [detRot(r, 1), detRot(r, 3)],
    slider1Imgs: [detRot(r, 2), detRot(r, 0), detRot(r, 3), detRot(r, 1)],
    full1: detRot(r, 0),
    two2: [detRot(r, 3), detRot(r, 2)],
    quoteImg: detRot(r, 1),
    full2: detRot(r, 2),
    slider2Imgs: [detRot(r, 0), detRot(r, 1), detRot(r, 2), detRot(r, 3)],
  };
};

/* ---------- 1 · Hero — full-bleed photo, model name centered ---------- */
function DetHero({ model }) {
  return (
    <section data-screen-label={`In Detail — ${model.label}`} style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden", background: "var(--color-near-black)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${model.hero})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.34), rgba(10,8,6,.08) 34%, transparent 60%, rgba(10,8,6,.5))" }}></div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", zIndex: 2 }}>
        <SR y={30}>
          <h1 className="t-h1" style={{ margin: 0, fontSize: "clamp(50px, 7.5vw, 118px)", letterSpacing: "0.03em", lineHeight: 1.05 }}>{model.label}</h1>
          <div className="t-label" style={{ marginTop: 24, color: "var(--color-off-white)", opacity: 0.85, fontSize: 12, letterSpacing: "0.4em" }}>{L("Em Detalhe", "In Detail")}</div>
        </SR>
      </div>
      <ScrollCue />
    </section>
  );
}

/* ---------- 2 · Dark intro — text + Enquire over a darkened photo ---------- */
function DetIntro({ d, onEnquire }) {
  return (
    <section data-screen-label="In Detail — Intro" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "160px 24px", boxSizing: "border-box", background: "var(--color-near-black)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${d.introBg})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.22 }}></div>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 0%, rgba(10,8,6,.78) 78%)" }}></div>
      <SR y={44} style={{ position: "relative", zIndex: 2, maxWidth: 760, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 26 }}>
        <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: 0, fontSize: "clamp(34px, 4vw, 54px)", textWrap: "balance" }}>{d.intro.title}</h2>
        <p style={{ color: "rgba(245,240,232,.78)", margin: 0, maxWidth: 560, fontSize: 16.5, lineHeight: 1.75 }}>{d.intro.body}</p>
        <p className="t-caption" style={{ color: "rgba(245,240,232,.5)", margin: 0, letterSpacing: "0.04em" }}>{d.spec}</p>
        <div style={{ marginTop: 14 }}>
          <GhostButton arrow={false} onClick={onEnquire}>{L("Solicitar", "Enquire")}</GhostButton>
        </div>
      </SR>
    </section>
  );
}

/* ---------- 3 · Film — video + text, dark fading into light ---------- */
function DetFilm({ d }) {
  return (
    <section data-screen-label="In Detail — Film" style={{ background: "linear-gradient(180deg, var(--color-near-black) 0%, var(--color-near-black) 6%, var(--color-warm-white) 68%, var(--color-warm-white) 100%)", padding: "110px 24px 150px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SR y={30} style={{ width: "100%" }}>
          <SV src={d.video} controls style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block", background: "#000" }} />
        </SR>
        <SR y={40} style={{ textAlign: "center", maxWidth: 680, marginTop: "clamp(72px, 9vw, 120px)" }}>
          <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(32px, 3.6vw, 50px)", textWrap: "balance" }}>{d.film.title}</h2>
          <p style={{ color: "rgba(31,23,24,.78)", margin: "26px auto 0", maxWidth: 560, fontSize: 16.5, lineHeight: 1.75 }}>{d.film.body}</p>
        </SR>
      </div>
    </section>
  );
}

/* ---------- 4 / 10 · Two large photos, staggered ---------- */
function DetTwoPhotos({ imgs, surface = "light", screenLabel = "In Detail — Two Photos" }) {
  return (
    <section className={surface === "sand" ? "surface-sand" : "surface-light"} data-screen-label={screenLabel} style={{ padding: "clamp(100px, 10vw, 150px) clamp(24px, 5vw, 80px)", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px, 3.5vw, 48px)", alignItems: "start" }}>
        <SR y={40} style={{ display: "block" }}>
          <div style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: `url(${imgs[0]})`, backgroundSize: "cover", backgroundPosition: "center", marginTop: 72 }}></div>
        </SR>
        <SR y={40} delay={140} style={{ display: "block" }}>
          <div style={{ width: "100%", aspectRatio: "4 / 5", backgroundImage: `url(${imgs[1]})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
        </SR>
      </div>
    </section>
  );
}

/* ---------- 5 / 7 / 9 · Centered text — solid or fading background ---------- */
function DetTextBand({ title, body, bg, screenLabel = "In Detail — Text" }) {
  return (
    <section data-screen-label={screenLabel} style={{ background: bg, minHeight: "62vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px", boxSizing: "border-box" }}>
      <SR y={44} style={{ maxWidth: 720, textAlign: "center" }}>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(32px, 3.8vw, 52px)", textWrap: "balance" }}>{title}</h2>
        <p style={{ color: "rgba(31,23,24,.78)", margin: "26px auto 0", maxWidth: 560, fontSize: 16.5, lineHeight: 1.75 }}>{body}</p>
      </SR>
    </section>
  );
}

/* ---------- 6 / 14 · Slider — center photo with side peeks, dots + arrows ---------- */
function DetSlider({ imgs, label, title, body, headingAbove = false, screenLabel = "In Detail — Slider" }) {
  const [i, setI] = useState(0);
  const n = imgs.length;
  const go = (v) => setI(((v % n) + n) % n);
  // Gentle auto-advance, RR-style. Pauses permanently on first manual interaction.
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 5600);
    return () => clearInterval(t);
  }, [auto, n]);
  const manual = (v) => { setAuto(false); go(v); };
  const SW = "min(62vw, 940px)";
  const arrowStyle = { background: "transparent", border: "none", cursor: "pointer", padding: 6, color: "var(--color-espresso)", display: "flex", alignItems: "center" };
  const chev = (dir) => (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" style={{ transform: dir === "prev" ? "rotate(180deg)" : "none" }}>
      <path d="M1 1l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <section className="surface-sand" data-screen-label={screenLabel} style={{ padding: "clamp(100px, 10vw, 150px) 0", boxSizing: "border-box", overflow: "hidden" }}>
      {headingAbove && (
        <SR y={40} style={{ textAlign: "center", maxWidth: 720, margin: "0 auto clamp(56px, 6vw, 84px)", padding: "0 24px" }}>
          <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(32px, 3.8vw, 52px)", textWrap: "balance" }}>{title}</h2>
          <p style={{ color: "rgba(31,23,24,.78)", margin: "24px auto 0", maxWidth: 560, fontSize: 16.5, lineHeight: 1.75 }}>{body}</p>
        </SR>
      )}
      <SR y={36}>
        <div style={{ display: "flex", gap: 28, transform: `translateX(calc(50vw - (${SW}) / 2 - ${i} * ((${SW}) + 28px)))`, transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)" }}>
          {imgs.map((img, k) => (
            <div key={k} onClick={() => k !== i && manual(k)} style={{ flex: `0 0 ${SW}`, aspectRatio: "16 / 9", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: k === i ? 1 : 0.45, transition: "opacity 700ms ease", cursor: k === i ? "default" : "pointer" }}></div>
          ))}
        </div>
      </SR>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginTop: 38 }}>
        <button aria-label={L("Anterior", "Previous")} onClick={() => manual(i - 1)} style={arrowStyle}>{chev("prev")}</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {imgs.map((_, k) => (
            <span key={k} onClick={() => manual(k)} style={{ width: 7, height: 7, borderRadius: "50%", cursor: "pointer", background: k === i ? "var(--color-tobacco)" : "rgba(31,23,24,.25)", transition: "background 300ms ease" }}></span>
          ))}
        </div>
        <button aria-label={L("Próximo", "Next")} onClick={() => manual(i + 1)} style={arrowStyle}>{chev("next")}</button>
      </div>
      {!headingAbove && (
        <SR y={30} style={{ textAlign: "center", maxWidth: 640, margin: "clamp(40px, 5vw, 64px) auto 0", padding: "0 24px" }}>
          <SectionLabel>{label}</SectionLabel>
          <p style={{ color: "rgba(31,23,24,.78)", margin: "20px auto 0", fontSize: 16, lineHeight: 1.75 }}>{body}</p>
        </SR>
      )}
    </section>
  );
}

/* ---------- 8 / 12 · Full-bleed photo ---------- */
function DetFullPhoto({ img, screenLabel = "In Detail — Full Photo" }) {
  return (
    <section data-screen-label={screenLabel} style={{ position: "relative", width: "100%", height: "100vh", minHeight: 560, overflow: "hidden", background: "var(--color-near-black)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.14), transparent 35%, transparent 72%, rgba(10,8,6,.3))" }}></div>
    </section>
  );
}

/* ---------- 11a · Contained photo on sand ---------- */
function DetPhotoBand({ img }) {
  return (
    <section className="surface-sand" data-screen-label="In Detail — Photo Band" style={{ padding: "clamp(80px, 8vw, 120px) clamp(24px, 6vw, 96px) 0", boxSizing: "border-box" }}>
      <SR y={40} style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ width: "100%", aspectRatio: "16 / 9", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
      </SR>
    </section>
  );
}

/* ---------- 11b · Quote — sand fading into white, Franco attribution ---------- */
function DetQuote({ quote }) {
  return (
    <section data-screen-label="In Detail — Quote" style={{ background: "linear-gradient(180deg, var(--color-soft-sand) 0%, var(--color-warm-white) 100%)", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px", boxSizing: "border-box" }}>
      <SR y={48} style={{ maxWidth: 760, textAlign: "center" }}>
        <p className="t-pullquote" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(30px, 4vw, 54px)", lineHeight: 1.4, textWrap: "balance" }}>“{quote}”</p>
        <div className="t-cta" style={{ color: "var(--color-espresso)", marginTop: 44, fontSize: 12, letterSpacing: "0.18em" }}>Franco Nicoletti</div>
        <div className="t-caption" style={{ marginTop: 8, color: "rgba(31,23,24,.55)", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 11 }}>{L("Fundador e Curador — Nicoletti", "Founder and Curator — Nicoletti")}</div>
      </SR>
    </section>
  );
}

/* ---------- 15 · Final CTA — white, text + Enquire ---------- */
function DetFinal({ model, onEnquire }) {
  return (
    <section className="surface-light" data-screen-label="In Detail — Final CTA" style={{ minHeight: "72vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 24px", boxSizing: "border-box" }}>
      <SR y={44} style={{ maxWidth: 720, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 28 }}>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: 0, fontSize: "clamp(34px, 4vw, 54px)", textWrap: "balance" }}>{L("Encomende o seu", "Order your")} {model.label}</h2>
        <p style={{ color: "rgba(31,23,24,.78)", margin: 0, maxWidth: 540, fontSize: 16.5, lineHeight: 1.75 }}>{pick(DET_FINAL)}</p>
        <div style={{ marginTop: 10 }}>
          <GhostButton onClick={onEnquire}>{L("Solicitar", "Enquire")}</GhostButton>
        </div>
      </SR>
    </section>
  );
}

/* ====================== DETAIL VIEW (assembled) ====================== */
function DetailView({ model, onEnquire, models, activeId, onModel, onDiscover }) {
  const d = buildDetail(model.id);
  const Explore = window.ModelExplore;
  return (
    <div key={model.id}>
      <DetHero model={model} />
      <DetIntro d={d} onEnquire={onEnquire} />
      <DetFilm d={d} />
      <DetTwoPhotos imgs={d.two1} surface="light" screenLabel="In Detail — Two Photos I" />
      <DetTextBand title={d.fade1.title} body={d.fade1.body} bg="linear-gradient(180deg, var(--color-warm-white) 0%, var(--color-soft-sand) 100%)" screenLabel="In Detail — Fade Text" />
      <DetSlider imgs={d.slider1Imgs} label={d.slider1.label} body={d.slider1.body} screenLabel="In Detail — Slider I" />
      <DetTextBand title={d.sand1.title} body={d.sand1.body} bg="var(--color-soft-sand)" screenLabel="In Detail — Sand Text I" />
      <DetFullPhoto img={d.full1} screenLabel="In Detail — Full Photo I" />
      <DetTextBand title={d.sand2.title} body={d.sand2.body} bg="var(--color-soft-sand)" screenLabel="In Detail — Sand Text II" />
      <DetTwoPhotos imgs={d.two2} surface="sand" screenLabel="In Detail — Two Photos II" />
      <DetPhotoBand img={d.quoteImg} />
      <DetQuote quote={d.quote} />
      <DetFullPhoto img={d.full2} screenLabel="In Detail — Full Photo II" />
      <DetSlider imgs={d.slider2Imgs} title={d.slider2.title} body={d.slider2.body} headingAbove screenLabel="In Detail — Slider II" />
      <DetFinal model={model} onEnquire={onEnquire} />
      {Explore && <Explore models={models} activeId={activeId} onModel={onModel} onDiscover={onDiscover} mode="detail" />}
    </div>
  );
}

Object.assign(window, { DetailView });
