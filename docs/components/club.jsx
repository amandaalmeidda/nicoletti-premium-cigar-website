// The Club / Lounge — two paths (Soft Sand cloister bifurcation) + registration form.
const { useState } = React;

function TwoPaths() {
  const goForm = () => { const el = document.getElementById("lounge-form"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }); };
  const Path = ({ label, body, cta, onClick, delay }) => (
    <Reveal delay={delay} style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22, padding: "0 8px" }}>
      <SectionLabel align="left">{label}</SectionLabel>
      <p style={{ margin: 0, color: "rgba(31,23,24,.82)", fontSize: 18, lineHeight: 1.7, maxWidth: 360 }}>{body}</p>
      <div style={{ marginTop: 8 }}><GhostButton onClick={onClick}>{cta}</GhostButton></div>
    </Reveal>
  );
  return (
    <section data-screen-label="Two Paths" className="surface-sand" style={{ padding: "150px 80px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 0, alignItems: "stretch", flexWrap: "wrap" }}>
        <Path label={L("Europa", "Europe")} body={L("Para aquisições na Europa, o atelier atende diretamente — cada pedido é respondido pessoalmente.", "For acquisitions in Europe, the atelier attends to you directly — each request is answered personally.")} cta={L("Consultar disponibilidade", "Enquire about availability")} onClick={() => navTo("Contact.html")} delay={0} />
        <div className="paths-divider" style={{ width: 1, background: "rgba(164,99,42,.3)", margin: "0 56px", alignSelf: "stretch" }} />
        <Path label={L("Brasil", "Brazil")} body={L("No Brasil, o acesso acontece por parcerias e encontros — o Lounge Nicoletti é o primeiro passo.", "In Brazil, access happens through partnerships and meetings — the Nicoletti Lounge is the first step.")} cta={L("Deixar meu nome", "Leave my name")} onClick={goForm} delay={120} />
      </div>
    </section>
  );
}

function LoungeForm() {
  const [data, setData] = useState({ nome: "", email: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setData(d => ({ ...d, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <section id="lounge-form" data-screen-label="Registration" className="surface-light" style={{ padding: "150px 24px", boxSizing: "border-box", scrollMarginTop: 80 }}>
      <Reveal style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Lounge Nicoletti</SectionLabel>
        <h2 className="t-h2" style={{ color: "var(--color-espresso)", margin: "22px 0 48px", fontSize: "clamp(32px,3.6vw,50px)" }}>{L("Registre seu interesse", "Register your interest")}</h2>
        {!sent ? (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 32, textAlign: "left" }}>
            <input className="field" placeholder={L("Nome", "Name")} value={data.nome} onChange={set("nome")} required />
            <input className="field" type="email" placeholder={L("Email", "Email")} value={data.email} onChange={set("email")} required />
            <input className="field" placeholder={L("Cidade", "City")} value={data.cidade} onChange={set("cidade")} required />
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <GhostButton arrow={false}>{L("Deixar meu nome", "Leave my name")}</GhostButton>
            </div>
          </form>
        ) : (
          <p className="t-pullquote" style={{ color: "var(--color-espresso)", fontSize: "clamp(20px,2.2vw,28px)", lineHeight: 1.6, margin: 0 }}>
            {L("Recebemos seu nome. Se houver um encontro alinhado ao seu momento, entraremos em contato.", "We have received your name. Should there be a meeting suited to your moment, we will be in touch.")}
          </p>
        )}
      </Reveal>
    </section>
  );
}

Object.assign(window, { TwoPaths, LoungeForm });
