// Bossa Nova vinyl widget — fixed bottom-left of hero. 80px vinyl, Maltese cross
// label, gold tonearm. MANUAL PLAY ONLY — defaults paused, never autoplays.
const { useState, useRef } = React;

function VinylWidget() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.volume = 0.7;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const spinStyle = {
    transformBox: "fill-box", transformOrigin: "center",
    animation: "spin 9s linear infinite",
    animationPlayState: playing ? "running" : "paused",
  };

  // Tonearm: playing = stylus on groove; parked = lifted to the right edge.
  const armD = playing ? "M 90,11 Q 76,11 61,30" : "M 90,11 Q 87,23 81,40";
  const tipCx = playing ? 61 : 81;
  const tipCy = playing ? 30 : 40;

  return (
    <div onClick={toggle} style={{
      position: "fixed", bottom: 28, left: 36, zIndex: 90,
      display: "flex", alignItems: "center", gap: 11,
      cursor: "pointer", userSelect: "none", opacity: 0.92,
    }}>
      {/* Manual play only — never autoplays. Loops while playing. */}
      <audio ref={audioRef} src="assets/audio/sand-and-salt-water.mp3" loop preload="none" />
      <svg width="62" height="48" viewBox="0 0 104 80" fill="none"
        style={{ overflow: "visible", filter: "drop-shadow(0 3px 10px rgba(0,0,0,.55))", flexShrink: 0 }}>
        <defs>
          <radialGradient id="vwRG" cx="44%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#1d1209"/><stop offset="55%" stopColor="#0d0905"/><stop offset="100%" stopColor="#060403"/>
          </radialGradient>
          <radialGradient id="vwSG" cx="30%" cy="26%" r="66%">
            <stop offset="0%" stopColor="#C9A46B" stopOpacity=".22"/><stop offset="60%" stopColor="#C9A46B" stopOpacity=".06"/><stop offset="100%" stopColor="#C9A46B" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="vwLG" cx="36%" cy="32%" r="66%">
            <stop offset="0%" stopColor="#422410"/><stop offset="100%" stopColor="#1c0f07"/>
          </radialGradient>
          <radialGradient id="vwPG" cx="30%" cy="26%" r="70%">
            <stop offset="0%" stopColor="#EDD094"/><stop offset="55%" stopColor="#C9A46B"/><stop offset="100%" stopColor="#8B6228"/>
          </radialGradient>
        </defs>

        {/* Spinning record — disc r=39, center (40,40) → 78px ≈ 80px */}
        <g style={spinStyle}>
          <circle cx="40" cy="40" r="39" fill="url(#vwRG)"/>
          {[21,23,25,27,29,31,33,35].map((r, i) => (
            <circle key={r} cx="40" cy="40" r={r} stroke="#C9A46B" strokeWidth={i % 2 ? ".32" : ".45"} fill="none" opacity={i % 2 ? ".10" : ".14"}/>
          ))}
          <circle cx="40" cy="40" r="39" fill="url(#vwSG)"/>
          <circle cx="40" cy="40" r="39" stroke="#C9A46B" strokeWidth="1" fill="none" opacity={playing ? .58 : .35}/>
          {/* Center label */}
          <circle cx="40" cy="40" r="13.5" fill="url(#vwLG)"/>
          <circle cx="40" cy="40" r="13.5" stroke="#C9A46B" strokeWidth=".4" fill="none" opacity={playing ? .42 : .25}/>
          {/* Maltese cross */}
          <polygon transform="translate(40,40) scale(1.42)"
            points="-1.43,-3.91 0,-3.38 1.43,-3.91 1.17,-1.17 3.91,-1.43 3.38,0 3.91,1.43 1.17,1.17 1.43,3.91 0,3.38 -1.43,3.91 -1.17,1.17 -3.91,1.43 -3.38,0 -3.91,-1.43 -1.17,-1.17"
            fill="#C9A46B" opacity={playing ? .9 : .55}/>
          <circle cx="40" cy="40" r="2.2" fill="#040302"/>
        </g>

        {/* Tonearm (static) */}
        <path d={armD} stroke="rgba(0,0,0,.35)" strokeWidth="3" strokeLinecap="round"/>
        <path d={armD} stroke="#C9A46B" strokeWidth="1.6" strokeLinecap="round" opacity={playing ? .9 : .55}/>
        <circle cx="90" cy="11" r="5.5" fill="url(#vwPG)" opacity={playing ? 1 : .65}/>
        <circle cx="90" cy="11" r="5.5" stroke="#C9A46B" strokeWidth=".5" fill="none" opacity={playing ? .55 : .35}/>
        <circle cx={tipCx} cy={tipCy} r="2.4" fill="#C9A46B" opacity={playing ? .8 : .45}/>
      </svg>

      <div style={{ color: "var(--color-off-white)" }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 7, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-gold)", opacity: playing ? 0.85 : 0.4 }}>
          {playing ? L("Tocando agora", "Now Playing") : L("Seleção de Franco", "Franco's Selection")}
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 12, lineHeight: 1.25, marginTop: 1, opacity: playing ? 0.95 : 0.65 }}>
          Sand and Salt Water
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.35, marginTop: 3 }}>
          {playing ? L("Toque para pausar", "Tap to pause") : L("Toque para tocar", "Tap to play")}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VinylWidget });
