// Collection rail — the signature horizontal, draggable showcase (Rolls-Royce
// "Our Motor Cars" pattern), adapted to Nicoletti's four families. Near Black.
// Drag with pointer · arrow controls · gold progress bar. 0px radius · ghost only.
const { useState, useRef, useEffect } = React;

const FAMILY_RAIL = [
  { id: "nirvana", gauge: "52", name: "Nirvana Supreme", line: "O primeiro tempo da noite.",
    note: "Equilíbrio, suavidade absoluta.", img: "assets/photography/process-cut-cigars.jpeg" },
  { id: "gold", gauge: "52·56", name: "Gold Selection", line: "O centro da coleção.",
    note: "Presença solar, intensidade média.", img: "assets/photography/cigar-smoke-wood.jpeg" },
  { id: "borogod", gauge: "58", name: "Borogod Supreme", line: "A assinatura brasileira.",
    note: "Personalidade marcada, notas de couro.", img: "assets/photography/cigar-lighter-dark.jpeg" },
  { id: "platinum", gauge: "60", name: "Platinum Selection", line: "O cume da coleção.",
    note: "Final longo, complexidade, reserva.", img: "assets/photography/moment-lounge-hands.jpeg" },
];

function RailCard({ fam }) {
  const [hover, setHover] = useState(false);
  return (
    <a onClick={() => navTo("A Coleção.html")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        flex: "0 0 auto", width: "clamp(300px, 30vw, 392px)", height: "clamp(440px, 60vh, 560px)",
        position: "relative", overflow: "hidden", textDecoration: "none", cursor: "pointer",
        border: "1px solid", borderColor: hover ? "rgba(201,164,107,.55)" : "rgba(201,164,107,.22)",
        transition: "border-color 400ms ease", scrollSnapAlign: "start",
      }}>
      {/* photo with slow zoom on hover */}
      <div style={{
        position: "absolute", inset: 0, backgroundImage: `url(${fam.img})`, backgroundSize: "cover",
        backgroundPosition: "center", transform: hover ? "scale(1.06)" : "scale(1)",
        transition: "transform 1200ms cubic-bezier(0.4,0,0.2,1)", filter: "grayscale(.15)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(10,8,6,.30), rgba(10,8,6,.55) 55%, rgba(10,8,6,.92))" }} />
      {/* content */}
      <div style={{ position: "absolute", inset: 0, padding: "34px 32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-gold)" }}>Ring {fam.gauge}</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: 64, lineHeight: 0.8, color: "rgba(245,240,232,.92)" }}>{fam.gauge.split("·")[0]}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-off-white)", margin: "0 0 12px" }}>{fam.name}</h3>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: 22, lineHeight: 1.35, color: "rgba(245,240,232,.92)", margin: "0 0 10px" }}>{fam.line}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(245,240,232,.62)", margin: "0 0 22px", lineHeight: 1.5 }}>{fam.note}</p>
          <div style={{ width: 40, height: 1, background: "var(--color-gold)", marginBottom: 18, opacity: hover ? 1 : 0.5, transition: "opacity 300ms ease" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: hover ? "var(--color-gold)" : "rgba(245,240,232,.8)", transition: "color 250ms ease" }}>
            Discover the family →
          </span>
        </div>
      </div>
    </a>
  );
}

function CollectionRail() {
  const scroller = useRef(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const recompute = () => {
    const el = scroller.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };
  useEffect(() => { recompute(); }, []);

  const step = (dir) => {
    const el = scroller.current; if (!el) return;
    const card = el.querySelector("a"); const w = card ? card.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  // pointer drag
  const onDown = (e) => { const el = scroller.current; if (!el) return; drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false }; el.setPointerCapture && el.setPointerCapture(e.pointerId); };
  const onMove = (e) => {
    const el = scroller.current; if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const onUp = () => { drag.current.down = false; };
  const onClickCapture = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } };

  return (
    <section data-screen-label="Collection Rail" className="surface-dark" style={{ padding: "150px 0 130px", boxSizing: "border-box", overflow: "hidden" }}>
      <Reveal style={{ padding: "0 80px", marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 28 }}>
        <div style={{ maxWidth: 640 }}>
          <SectionLabel align="left">A Coleção</SectionLabel>
          <h2 className="t-h2" style={{ color: "var(--color-off-white)", margin: "22px 0 18px", fontSize: "clamp(34px, 4vw, 54px)" }}>Quatro famílias. Uma seleção privada.</h2>
          <p style={{ color: "rgba(245,240,232,.72)", maxWidth: 520, margin: 0 }}>Dez referências curadas por Franco Nicoletti a partir das melhores folhas de Cruz das Almas.</p>
        </div>
        {/* arrows */}
        <div style={{ display: "flex", gap: 14 }}>
          <button className="rail-arrow" onClick={() => step(-1)} aria-label="Anterior">←</button>
          <button className="rail-arrow" onClick={() => step(1)} aria-label="Próximo">→</button>
        </div>
      </Reveal>

      <div ref={scroller} className="rail-scroller" onScroll={recompute}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onClickCapture={onClickCapture}
        style={{ display: "flex", gap: 24, padding: "0 80px", overflowX: "auto", scrollSnapType: "x proximity", cursor: "grab", touchAction: "pan-y" }}>
        {FAMILY_RAIL.map(f => <RailCard key={f.id} fam={f} />)}
        <div style={{ flex: "0 0 56px" }} />
      </div>

      {/* progress + hint */}
      <div style={{ padding: "0 80px", marginTop: 44, display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ flex: 1, maxWidth: 280, height: 1, background: "rgba(201,164,107,.22)", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: -0.5, height: 2, width: `${Math.max(12, progress * 100)}%`, background: "var(--color-gold)", transition: "width 120ms linear" }} />
        </div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,.4)" }}>Arraste para explorar</span>
      </div>
    </section>
  );
}

Object.assign(window, { CollectionRail });
