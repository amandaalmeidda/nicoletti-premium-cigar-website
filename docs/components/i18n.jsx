// Nicoletti — bilingual (PT / EN) layer. Loaded right after Babel, before every
// other component, so the global helpers (L, useLang, LangFlag, pick) are
// available everywhere. Language is persisted in localStorage and a change
// re-renders the whole React root (registered per page in the bootstrap), so
// every L() call re-evaluates while component state is preserved.
const { useState: _i18nUseState, useEffect: _i18nUseEffect } = React;

const LANG_KEY = "nicoletti-lang";
window.__langSubs = window.__langSubs || new Set();

function getLang() {
  try { const v = localStorage.getItem(LANG_KEY); return v === "en" || v === "pt" ? v : "pt"; }
  catch (e) { return "pt"; }
}
function setLang(l) {
  if (l !== "en" && l !== "pt") return;
  try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  try { document.documentElement.lang = l === "en" ? "en" : "pt-BR"; } catch (e) {}
  window.__langSubs.forEach((fn) => { try { fn(l); } catch (e) {} });
}
// Pick a string for the active language. L(pt, en).
function L(pt, en) { return getLang() === "en" ? (en != null ? en : pt) : pt; }
// Pick from a { pt, en } object (handy for module-level data tables).
function pick(obj) { if (!obj) return obj; return getLang() === "en" && obj.en != null ? obj.en : obj.pt; }

// Subscribe a component to language changes (re-renders it on switch).
function useLang() {
  const [lang, setL] = _i18nUseState(getLang());
  _i18nUseEffect(() => {
    const fn = (l) => setL(l);
    window.__langSubs.add(fn);
    return () => window.__langSubs.delete(fn);
  }, []);
  return lang;
}

// Small circular flags, drawn minimal. ~20px.
function FlagBR({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "block" }}>
      <defs><clipPath id="nic-flag-br"><circle cx="12" cy="12" r="11" /></clipPath></defs>
      <g clipPath="url(#nic-flag-br)">
        <rect width="24" height="24" fill="#009B3A" />
        <polygon points="12,3.2 20.8,12 12,20.8 3.2,12" fill="#FEDF00" />
        <circle cx="12" cy="12" r="4.1" fill="#002776" />
      </g>
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
    </svg>
  );
}
function FlagUK({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: "block" }}>
      <defs><clipPath id="nic-flag-uk"><circle cx="12" cy="12" r="11" /></clipPath></defs>
      <g clipPath="url(#nic-flag-uk)">
        <rect width="24" height="24" fill="#012169" />
        <path d="M0,0 L24,24 M24,0 L0,24" stroke="#FFFFFF" strokeWidth="4.6" />
        <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" strokeWidth="2.1" />
        <path d="M12,0 V24 M0,12 H24" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M12,0 V24 M0,12 H24" stroke="#C8102E" strokeWidth="3.5" />
      </g>
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.55" />
    </svg>
  );
}

// Language switcher — two flags + codes, active one lit, the other dimmed.
function LangFlag({ color }) {
  const lang = useLang();
  const ink = color || "var(--color-off-white)";
  const Opt = ({ code, Flag, label }) => {
    const on = lang === code;
    return (
      <button
        onClick={() => setLang(code)}
        aria-label={label}
        title={label}
        className="lang-opt"
        style={{
          background: "transparent", border: "none", padding: "4px 2px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6, color: ink,
          opacity: on ? 1 : 0.42, transition: "opacity 220ms ease",
        }}
      >
        <span style={{ display: "block", color: ink }}><Flag /></span>
        <span style={{
          fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
          textTransform: "uppercase", color: ink,
        }}>{code.toUpperCase()}</span>
      </button>
    );
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Opt code="pt" Flag={FlagBR} label="Português" />
      <span style={{ width: 1, height: 16, background: ink, opacity: 0.28 }} />
      <Opt code="en" Flag={FlagUK} label="English" />
    </div>
  );
}

// Apply the persisted language to <html lang> on load.
try { document.documentElement.lang = getLang() === "en" ? "en" : "pt-BR"; } catch (e) {}

Object.assign(window, { getLang, setLang, L, pick, useLang, LangFlag, FlagBR, FlagUK });
