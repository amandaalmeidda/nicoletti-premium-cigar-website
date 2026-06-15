// Collection — Rolls-Royce-style model experience. A two-tier nav sits under the
// header: row 1 holds the active model's tabs (Discover · In Detail) + Enquire;
// row 2 (toggled by the chevron) is the model switcher. Enquire opens a modal that
// routes a buy/sell intent into a contact form that emails the atelier.
const { useState, useEffect } = React;

// Each "model" is a cigar line. Pulls intro/ringline/cigars from FAMILIES (collection.jsx).
const MODELS = [
  { id: "nirvana",  label: "Nirvana Supreme",   hero: "assets/photography/product-silk.png",    headline: { pt: "O primeiro tempo da noite.", en: "The opening movement of the night." } },
  { id: "gold",     label: "Gold Selection",    hero: "assets/photography/gold-detail.jpeg",  headline: { pt: "Onde o equilíbrio acontece.", en: "Where balance is found." } },
  { id: "borogod",  label: "Borogod Supreme",   hero: "assets/photography/product-black.png", headline: { pt: "A assinatura brasileira.", en: "The Brazilian signature." } },
  { id: "platinum", label: "Platinum Selection", hero: "assets/photography/product-smoke.png", headline: { pt: "O cume da coleção.", en: "The summit of the collection." } },
];

const famById = (id) => (window.FAMILIES || []).find((f) => f.id === id) || {};

const ATELIER_EMAIL = "atelier@nicoletti.com";

/* ====================== MODEL NAV (two tiers) ====================== */
function ModelNav({ models, activeId, tab, onModel, onTab, onEnquire, scrolled }) {
  const [switcher, setSwitcher] = useState(false);
  const current = models.find((m) => m.id === activeId) || models[0];

  // Collapse the model switcher whenever the tab or model changes.
  useEffect(() => { setSwitcher(false); }, [tab, activeId]);

  const tabStyle = (key) => ({
    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.18em",
    textTransform: "uppercase", cursor: "pointer", padding: "6px 0",
    color: tab === key ? "var(--color-off-white)" : "rgba(245,240,232,.62)",
    borderBottom: tab === key ? "1px solid var(--color-gold)" : "1px solid transparent",
    transition: "color 220ms ease", whiteSpace: "nowrap",
  });

  return (
    <div style={{
      position: "fixed", left: 0, width: "100%", zIndex: 150,
      top: scrolled ? 70 : 132, transition: "top 320ms ease",
    }}>
      {/* Row 1 — active model tabs + enquire. Transparent at top; blurs on scroll. */}
      <div style={{
        background: scrolled ? "rgba(10,8,6,0.32)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(125%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(125%)" : "none",
        borderTop: "1px solid " + (scrolled ? "rgba(245,240,232,.16)" : "transparent"),
        borderBottom: "1px solid " + (scrolled ? "rgba(201,164,107,.18)" : "rgba(245,240,232,.22)"),
        transition: "background 300ms ease, border-color 300ms ease",
      }}>
        <div style={{
          padding: "0 48px", height: 58, boxSizing: "border-box",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
        }}>
          {/* Left — model name + chevron */}
          <button onClick={() => setSwitcher((s) => !s)} className="modelnav-toggle" style={{
            background: "transparent", border: "none", cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: 12, color: "var(--color-off-white)",
          }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{
              transform: switcher ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms ease", flexShrink: 0,
            }}>
              <path d="M3 6l5 5 5-5" stroke="var(--color-gold)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase" }}>{current.label}</span>
          </button>

          {/* Right — tabs + enquire */}
          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <span key="discover" onClick={() => onTab("discover")} style={tabStyle("discover")}>{L("Descobrir", "Discover")}</span>
            <span key="detail" onClick={() => onTab("detail")} style={tabStyle("detail")}>{L("Em Detalhe", "In Detail")}</span>
            <span style={{ width: 1, height: 18, background: "rgba(245,240,232,.22)" }} />
            <span onClick={onEnquire} className="enquire-link" style={{
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "var(--color-gold)", cursor: "pointer", whiteSpace: "nowrap",
              transition: "color 200ms ease",
            }}>{L("Solicitar", "Enquire")}</span>
          </div>
        </div>
      </div>

      {/* Row 2 — model switcher (warm-white bar, RR-style) */}
      <div style={{
        maxHeight: switcher ? 80 : 0, overflow: "hidden",
        transition: "max-height 420ms cubic-bezier(0.4,0,0.2,1)",
        background: "var(--color-warm-white)", boxShadow: switcher ? "0 14px 30px rgba(0,0,0,.28)" : "none",
      }}>
        <div style={{
          padding: "0 48px", height: 80, boxSizing: "border-box",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap",
        }}>
          {models.map((m) => {
            const on = m.id === activeId;
            return (
              <span key={m.id} onClick={() => { onModel(m.id); setSwitcher(false); }} className="model-switch-item" style={{
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: on ? 600 : 500, letterSpacing: "0.14em",
                textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
                color: on ? "var(--color-tobacco)" : "var(--color-espresso)",
                borderBottom: on ? "1px solid var(--color-tobacco)" : "1px solid transparent",
                paddingBottom: 3, transition: "color 200ms ease, border-color 200ms ease",
              }}>{m.label}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ====================== ENQUIRE MODAL ====================== */
function EnquireModal({ open, onClose, model }) {
  const [step, setStep] = useState("choice"); // choice | form | sent
  const [intent, setIntent] = useState(null);  // "comprar" | "vender"
  const [form, setForm] = useState({ nome: "", email: "", tel: "", msg: "" });

  // Reset to the first step whenever the modal is (re)opened.
  useEffect(() => { if (open) { setStep("choice"); setIntent(null); setForm({ nome: "", email: "", tel: "", msg: "" }); } }, [open]);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const choose = (i) => { setIntent(i); setStep("form"); };
  const intentLabel = intent === "comprar" ? "Comprar" : "Vender";

  const submit = (e) => {
    e.preventDefault();
    const subject = `Interesse Nicoletti — ${intentLabel}${model ? " · " + model.label : ""}`;
    const body = [
      `Intenção: ${intentLabel} charutos Nicoletti`,
      model ? `Referência de interesse: ${model.label}` : "",
      "",
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Telefone: ${form.tel || "—"}`,
      "",
      "Mensagem:",
      form.msg || "—",
    ].filter((l) => l !== null).join("\n");
    // Compose an email to the atelier with the enquiry pre-filled.
    try {
      window.location.href = `mailto:${ATELIER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch (_) {}
    setStep("sent");
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", boxSizing: "border-box",
      pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0,
      transition: "opacity 380ms cubic-bezier(0.4,0,0.2,1)",
    }}>
      {/* Scrim */}
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(10,8,6,0.78)",
        backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      }} />

      {/* Panel */}
      <div style={{
        position: "relative", zIndex: 2, width: "100%", maxWidth: 620,
        background: "var(--color-near-black)", border: "1px solid rgba(201,164,107,.24)",
        padding: "clamp(40px, 5vw, 72px) clamp(28px, 5vw, 72px)", boxSizing: "border-box",
        transform: open ? "translateY(0)" : "translateY(18px)", transition: "transform 420ms cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div onClick={onClose} className="menu-close" style={{
          position: "absolute", top: 22, right: 26, fontFamily: "var(--font-body)", fontSize: 24,
          fontWeight: 300, color: "var(--color-off-white)", cursor: "pointer", lineHeight: 1,
        }}>×</div>

        {step === "choice" && (
          <div style={{ textAlign: "center" }}>
            <div className="t-label" style={{ marginBottom: 18 }}>Atelier Nicoletti</div>
            <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: 0, fontSize: "clamp(28px, 3.2vw, 42px)" }}>
              {L("Direcione o seu interesse", "Direct your interest")}
            </h2>
            <div style={{ width: 44, height: 1, background: "var(--color-gold)", opacity: 0.6, margin: "26px auto 0" }} />
            <p style={{ color: "rgba(245,240,232,.7)", margin: "26px auto 40px", maxWidth: 400, fontSize: 15.5, lineHeight: 1.65 }}>
              {L("Diga-nos como podemos servi-lo. O atelier responde a cada pedido pessoalmente.", "Tell us how we may be of service. The atelier responds to every request personally.")}
            </p>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
              <GhostButton arrow={false} onClick={() => choose("comprar")}>{L("Quero Comprar", "I Wish to Buy")}</GhostButton>
              <GhostButton arrow={false} onClick={() => choose("vender")}>{L("Quero Vender", "I Wish to Sell")}</GhostButton>
            </div>
          </div>
        )}

        {step === "form" && (
          <div>
            <button onClick={() => setStep("choice")} style={{
              background: "transparent", border: "none", cursor: "pointer", padding: 0, marginBottom: 22,
              display: "flex", alignItems: "center", gap: 8, color: "rgba(245,240,232,.6)",
              fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase",
            }}>← {L("Voltar", "Back")}</button>
            <div className="t-label" style={{ marginBottom: 12 }}>
              {L(intentLabel, intent === "comprar" ? "Buy" : "Sell")}{model ? " · " + model.label : ""}
            </div>
            <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "0 0 30px", fontSize: "clamp(26px, 3vw, 38px)" }}>
              {L("Deixe os seus dados", "Leave your details")}
            </h2>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <input className="field field-dark" required placeholder={L("Nome completo", "Full name")} value={form.nome} onChange={set("nome")} />
              <input className="field field-dark" required type="email" placeholder={L("Email", "Email")} value={form.email} onChange={set("email")} />
              <input className="field field-dark" placeholder={L("Telefone (opcional)", "Phone (optional)")} value={form.tel} onChange={set("tel")} />
              <textarea className="field field-dark" rows={3} placeholder={L("A sua mensagem", "Your message")} value={form.msg} onChange={set("msg")} style={{ resize: "vertical", lineHeight: 1.6 }} />
              <div style={{ marginTop: 8 }}>
                <GhostButton onClick={submit}>{L("Enviar Pedido", "Send Request")}</GhostButton>
              </div>
            </form>
          </div>
        )}

        {step === "sent" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 1, height: 44, background: "var(--color-gold)", opacity: 0.6, margin: "0 auto 26px" }} />
            <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: 0, fontSize: "clamp(26px, 3vw, 40px)" }}>
              {L("Recebemos o seu pedido.", "We have received your request.")}
            </h2>
            <p style={{ color: "rgba(245,240,232,.7)", margin: "24px auto 36px", maxWidth: 420, fontSize: 15.5, lineHeight: 1.7 }}>
              {L("O atelier entrará em contato pessoalmente. Se o seu cliente de email não abriu, escreva-nos diretamente para ", "The atelier will be in touch personally. If your email client did not open, write to us directly at ")}<span style={{ color: "var(--color-gold)" }}>{ATELIER_EMAIL}</span>.
            </p>
            <GhostButton arrow={false} onClick={onClose}>{L("Fechar", "Close")}</GhostButton>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====================== DETAIL VIEW ====================== */
/* DetailView lives in detail.jsx (separate babel scope) — resolved at render. */

/* ====================== MODEL EXPERIENCE (stateful page) ====================== */
function ModelExperience() {
  const [activeId, setActiveId] = useState(MODELS[0].id);
  const [tab, setTab] = useState("discover");
  const [scrolled, setScrolled] = useState(false);
  const [enquire, setEnquire] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const model = MODELS.find((m) => m.id === activeId) || MODELS[0];

  const selectModel = (id) => { setActiveId(id); setTab("discover"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const selectTab = (t) => { setTab(t); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // DiscoverView / DetailView live in their own files (separate babel scopes) — resolve at render.
  const Discover = window.DiscoverView;
  const Detail = window.DetailView;

  return (
    <div>
      <ModelNav
        models={MODELS} activeId={activeId} tab={tab} scrolled={scrolled}
        onModel={selectModel} onTab={selectTab} onEnquire={() => setEnquire(true)}
      />
      {tab === "discover"
        ? <Discover model={model} onSeeDetail={() => selectTab("detail")} onEnquire={() => setEnquire(true)} models={MODELS} activeId={activeId} onModel={selectModel} />
        : <Detail model={model} onEnquire={() => setEnquire(true)} models={MODELS} activeId={activeId} onModel={selectModel} onDiscover={() => selectTab("discover")} />}
      <EnquireModal open={enquire} onClose={() => setEnquire(false)} model={model} />
    </div>
  );
}

Object.assign(window, { ModelNav, EnquireModal, ModelExperience, MODELS });
