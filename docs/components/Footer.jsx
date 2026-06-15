// Footer — Near-Black Charcoal #111010. Flat gold logo, gold hairline, six nav
// items, Instagram/Facebook hairline icons, copyright. Crimson never appears here.
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#F5F0E8" stroke="none" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 8h-2.2c-.6 0-1.3.6-1.3 1.4V11H15l-.4 2.6h-3.1V21H8.6v-7.4H6.4V11h2.2V9.1C8.6 6.9 10 5 12.4 5H15z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="surface-footer" style={{
      width: "100%", padding: "96px 48px 48px", display: "flex", flexDirection: "column",
      alignItems: "center", gap: 44, boxSizing: "border-box",
    }}>
      <img onClick={() => navTo(HOME_FILE)} src="assets/logos/nicoletti-logo-gold.png" alt="Nicoletti Premium Cigars" style={{ height: 88, cursor: "pointer" }} />
      <div style={{ width: "100%", maxWidth: 1100, height: 1, background: "rgba(201,164,107,.25)" }} />
      <nav style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
        {NAV_ITEMS.map(item => (
          <a key={item.file} onClick={() => navTo(item.file)} className="footer-link" style={{
            fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 400, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#F5F0E8", opacity: 0.55,
            textDecoration: "none", cursor: "pointer",
          }}>{pick(item.label)}</a>
        ))}
      </nav>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <a href="#" className="social-link" style={{ opacity: 0.4, lineHeight: 0 }} aria-label="Instagram"><IconInstagram /></a>
        <a href="#" className="social-link" style={{ opacity: 0.4, lineHeight: 0 }} aria-label="Facebook"><IconFacebook /></a>
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#F5F0E8", opacity: 0.28, letterSpacing: "0.12em", textAlign: "center" }}>
        A House of Italian Elegance&nbsp;&nbsp;·&nbsp;&nbsp;Rooted in Bahia
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#F5F0E8", opacity: 0.2, letterSpacing: "0.1em" }}>
        © 2026 Nicoletti Premium Cigars. All rights reserved.
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
