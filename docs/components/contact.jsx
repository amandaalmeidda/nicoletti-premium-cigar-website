// Contact — minimal form (Warm White) + two addresses. Opening Near Black banner.
const { useState, useRef, useEffect } = React;

const SUBJECTS = [
  { pt: "Parcerias B2B", en: "B2B Partnerships" },
  { pt: "Imprensa", en: "Press" },
  { pt: "A Coleção", en: "The Collection" },
  { pt: "Outro", en: "Other" },
];

// Custom on-brand dropdown — the native <select> falls back to OS styling that
// clashes with the palette. Underline trigger + gold chevron + warm-white panel,
// sharp corners, tobacco/gold option states. Closes on outside click / Escape.
function SubjectSelect({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} style={{
        width: "100%", background: "transparent", border: "none",
        borderBottom: "1px solid " + (open ? "var(--color-gold)" : "var(--border-input)"),
        borderRadius: 0, padding: "12px 0", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-espresso)", textAlign: "left",
        transition: "border-color 200ms ease",
      }}>
        <span>{pick(options[value])}</span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 240ms ease" }}>
          <path d="M3 6l5 5 5-5" stroke="var(--color-tobacco)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{
        position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 40,
        background: "#FFFFFF", border: "1px solid rgba(31,23,24,.12)", boxShadow: "var(--shadow-elevated)",
        borderRadius: 0, overflow: "hidden",
        opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(-6px)",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 200ms ease, transform 200ms ease",
      }}>
        {options.map((o, i) => {
          const on = i === value;
          return (
            <div key={i} onClick={() => { onChange(i); setOpen(false); }} className="subject-opt" style={{
              padding: "13px 18px", cursor: "pointer",
              fontFamily: "var(--font-body)", fontSize: 15,
              color: on ? "var(--color-tobacco)" : "var(--color-espresso)",
              fontWeight: on ? 600 : 400,
              borderLeft: "2px solid " + (on ? "var(--color-gold)" : "transparent"),
              background: on ? "var(--gold-10)" : "transparent",
              transition: "background 160ms ease, color 160ms ease",
            }}>{pick(o)}</div>
          );
        })}
      </div>
    </div>
  );
}

function ContactForm() {
  const [data, setData] = useState({ nome: "", email: "", assunto: 0, mensagem: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setData(d => ({ ...d, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section data-screen-label="Contact Form" className="surface-light" style={{ padding: "140px 24px 150px", boxSizing: "border-box" }}>
      <Reveal style={{ maxWidth: 620, margin: "0 auto" }}>
        <p style={{ textAlign: "center", color: "rgba(31,23,24,.78)", fontSize: 18, lineHeight: 1.7, margin: "0 0 56px" }}>
          {L("Para parcerias, imprensa ou questões sobre a coleção, escreva-nos diretamente — o atelier responde a cada mensagem pessoalmente.", "For partnerships, press, or questions about the collection, write to us directly — the atelier responds to every message personally.")}
        </p>
        {!sent ? (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <input className="field" placeholder={L("Nome", "Name")} value={data.nome} onChange={set("nome")} required />
            <input className="field" type="email" placeholder={L("Email", "Email")} value={data.email} onChange={set("email")} required />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-tobacco)" }}>{L("Assunto", "Subject")}</label>
              <SubjectSelect options={SUBJECTS} value={data.assunto} onChange={(i) => setData((d) => ({ ...d, assunto: i }))} />
            </div>
            <textarea className="field" placeholder={L("Mensagem", "Message")} value={data.mensagem} onChange={set("mensagem")} rows={4} required style={{ resize: "vertical", fontFamily: "var(--font-body)" }} />
            <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
              <GhostButton arrow={false}>{L("Iniciar conversa", "Start a conversation")}</GhostButton>
            </div>
          </form>
        ) : (
          <p className="t-pullquote" style={{ textAlign: "center", color: "var(--color-espresso)", fontSize: "clamp(22px,2.4vw,30px)", margin: "20px 0 0" }}>
            {L("Lemos cada mensagem com atenção.", "We read every message with attention.")}
          </p>
        )}

        {/* Two addresses */}
        <div style={{ marginTop: 80, paddingTop: 48, borderTop: "1px solid rgba(31,23,24,.12)", display: "flex", gap: 64, justifyContent: "center", flexWrap: "wrap" }}>
          {[{ k: L("Europa", "Europe"), v: "contact@nicoletticigars.com" }, { k: L("Brasil", "Brazil"), v: "brasil@nicoletticigars.com" }].map(a => (
            <div key={a.k} style={{ textAlign: "center" }}>
              <div className="t-label" style={{ marginBottom: 10 }}>{a.k}</div>
              <a href={`mailto:${a.v}`} className="link-text" style={{ fontSize: 15, color: "var(--color-tobacco)" }}>{a.v}</a>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ContactPage() {
  const HERO = "assets/photography/cigar-lighter-dark.jpeg";
  return (
    <PageShell heroImg={HERO}>
      <section data-screen-label="Contact — Opening" style={{ position: "relative", minHeight: "66vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "var(--color-near-black)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.6), rgba(10,8,6,.78))" }} />
        <Reveal style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "120px 24px 0" }}>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="t-h1" style={{ margin: "22px 0 0", fontSize: "clamp(34px,4.4vw,64px)", textWrap: "balance" }}>{L("O primeiro passo é sempre uma conversa.", "The first step is always a conversation.")}</h1>
        </Reveal>
      </section>
      <ContactForm />
    </PageShell>
  );
}

Object.assign(window, { ContactPage });
