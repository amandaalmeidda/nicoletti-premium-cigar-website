// Header — fixed, transparent over the opening hero, condenses into a solid
// Near-Black bar (flat-gold logo) after scrolling. + full-screen MenuOverlay
// (left 40% right-aligned nav · right 60% blurred hero). Cross-page navigation.
const { useEffect, useState } = React;

const HOME_FILE = "Nicoletti Homepage.html";
const NAV_ITEMS = [
{ label: { pt: "Herança", en: "Heritage" }, file: "Heritage.html" },
{ label: { pt: "A Coleção", en: "The Collection" }, file: "A Coleção.html" },
{ label: { pt: "Experiência", en: "Experience" }, file: "Experience.html" },
{ label: { pt: "O Clube", en: "The Club" }, file: "The Club.html" },
{ label: { pt: "Diário", en: "Journal" }, file: "Journal.html" },
{ label: { pt: "Contato", en: "Contact" }, file: "Contact.html" }];


function currentFile() {
  try {return decodeURIComponent(location.pathname.split("/").pop() || "");} catch (e) {return "";}
}
function navTo(file) {location.href = encodeURI(file);}

function Header({ onOpenMenu }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ink = "var(--color-off-white)";
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, width: "100%",
      padding: scrolled ? "16px 48px" : "28px 48px",
      background: scrolled ? "rgba(10,8,6,0.32)" : "transparent",
      backdropFilter: scrolled ? "blur(16px) saturate(125%)" : "none", WebkitBackdropFilter: scrolled ? "blur(16px) saturate(125%)" : "none",
      borderBottom: scrolled ? "1px solid transparent" : "1px solid rgba(245,240,232,.30)",
      zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between",
      boxSizing: "border-box", transition: "padding 300ms ease, background 300ms ease, border-color 300ms ease"
    }}>
      {/* Left — hamburger + MENU */}
      <div onClick={onOpenMenu} style={{ display: "flex", alignItems: "center", cursor: "pointer", flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ width: 24, height: 1, background: ink }} />)}
        </div>
        <span className="t-nav-trigger" style={{ color: ink, marginLeft: 14 }}>{L("Menu", "Menu")}</span>
      </div>
      {/* Center — logo (full-color at top, flat-gold when condensed) */}
      <div onClick={() => navTo(HOME_FILE)} style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}>
        <img src={scrolled ? "assets/logos/nicoletti-logo-gold.png" : "assets/logos/nicoletti-logo-color.png"}
        alt="Nicoletti Premium Cigars"
        style={{ height: scrolled ? 38 : 84, objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,.45))", transition: "height 300ms ease" }} />
      </div>
      {/* Right — language switcher */}
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <LangFlag />
      </div>
    </header>);

}

function MenuOverlay({ open, onClose, bg }) {
  useEffect(() => {
    const h = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", h);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {document.removeEventListener("keydown", h);document.body.style.overflow = "";};
  }, [open, onClose]);

  const here = currentFile();

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 400, display: "flex",
      pointerEvents: open ? "auto" : "none"
    }}>
      {/* LEFT HALF — translucent panel that blurs the live page behind it.
             Slides in from the left; right half stays crisp and untouched. */}
      <div style={{
        position: "relative", zIndex: 2, width: "50%", height: "100%",
        background: open ? "rgba(10,8,6,0.58)" : "rgba(10,8,6,0)",
        backdropFilter: open ? "blur(24px) saturate(120%)" : "blur(0px) saturate(100%)",
        WebkitBackdropFilter: open ? "blur(24px) saturate(120%)" : "blur(0px) saturate(100%)",
        borderRight: open ? "1px solid rgba(245,240,232,0.12)" : "1px solid rgba(245,240,232,0)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        boxSizing: "border-box", padding: "0 48px",
        transition: "backdrop-filter 1700ms cubic-bezier(0.22,1,0.36,1), -webkit-backdrop-filter 1700ms cubic-bezier(0.22,1,0.36,1), background-color 1500ms ease, border-color 1500ms ease",
        textAlign: "right", alignItems: "stretch", gap: "50px"
      }}>
        <div onClick={onClose} className="menu-close" style={{
          position: "absolute", top: 28, left: 48,
          fontFamily: "var(--font-body)", fontSize: 26, fontWeight: 300,
          color: "var(--color-off-white)", cursor: "pointer", lineHeight: 1,
          opacity: open ? 1 : 0,
          transition: `opacity 900ms ease ${open ? 500 : 0}ms`
        }}>×</div>

        {NAV_ITEMS.map((item, i) => {
          const active = here === item.file;
          return (
            <div key={item.file} onClick={() => navTo(item.file)} className="menu-item-row" style={{
              fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 300,
              color: active ? "var(--color-gold)" : "var(--color-off-white)", letterSpacing: "0.22em",
              lineHeight: 1, textTransform: "uppercase", cursor: "pointer", textAlign: "right",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 1000ms cubic-bezier(0.22,1,0.36,1) ${open ? 360 + i * 120 : 0}ms, transform 1000ms cubic-bezier(0.22,1,0.36,1) ${open ? 360 + i * 120 : 0}ms, color 240ms ease`
            }}>{pick(item.label)}</div>);

        })}
        <div style={{
          marginTop: 40, fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 400,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "var(--color-off-white)", opacity: open ? 0.32 : 0,
          transition: `opacity 1000ms ease ${open ? 360 + NAV_ITEMS.length * 120 : 0}ms`, textAlign: "right"
        }}>{L("A House of Italian Elegance\u00a0\u00a0·\u00a0\u00a0Rooted in Bahia", "A House of Italian Elegance\u00a0\u00a0·\u00a0\u00a0Rooted in Bahia")}</div>
      </div>

      {/* RIGHT HALF — crisp, click to dismiss */}
      <div onClick={onClose} style={{ position: "relative", zIndex: 2, flex: 1 }} />
    </div>);

}

Object.assign(window, { Header, MenuOverlay, NAV_ITEMS, HOME_FILE, navTo, currentFile });