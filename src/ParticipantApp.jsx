import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════
   BRAND TOKENS
═══════════════════════════════════════ */
const b = {
  red:        "#f0535a",
  redDark:    "#c23d43",
  redPale:    "#fde8e9",
  teal:       "#1fbba8",
  tealDark:   "#158a7b",
  tealPale:   "#d4f3ef",
  purple:     "#543092",
  purpleDark: "#3a1f66",
  purplePale: "#e4d9f5",
  ink:        "#1a1020",
  offwhite:   "#fafaf8",
  warm:       "#f7f5f2",
  border:     "#e8e4de",
  stone:      "#8a8290",
  white:      "#ffffff",
};

/* ═══════════════════════════════════════
   PAGE METADATA — drives menu + page info
═══════════════════════════════════════ */
const PAGES = [
  {
    id: 0,
    slug: "welcome",
    label: "Welcome",
    title: "Ngā Piki me Ngā Heke",
    subtitle: "The Rises and the Falls",
    description: "An introduction to the programme — a guided journey through art, wellbeing, and understanding.",
    showInMenu: true,
  },
  {
    id: 1,
    slug: "chapter-1",
    label: "Chapter 1",
    title: "Te Tūāpae — The Context",
    subtitle: "Chapter One of Three",
    description: "Exploring the foundational relationship between creative practice and mental wellbeing. Introduces the research context and the communities this work serves.",
    showInMenu: true,
  },
  {
    id: 2,
    slug: "chapter-2",
    label: "Chapter 2",
    title: "Ngā Reo — The Voices",
    subtitle: "Chapter Two of Three",
    description: "Bringing together voices from participants and practitioners who have walked this path. Their honesty and courage shape everything that follows.",
    showInMenu: true,
  },
  {
    id: 3,
    slug: "chapter-3",
    label: "Chapter 3",
    title: "Te Ara Whakamua — The Path Forward",
    subtitle: "Chapter Three · Final",
    description: "Looking ahead to the role of creative practice in mental health and wellbeing — and the space where your own journey begins.",
    showInMenu: true,
  },
  {
    id: 4,
    slug: "portal",
    label: "Participant Portal",
    title: "Participant Portal",
    subtitle: "Your personal creative space",
    description: "Sign in to access your wellbeing check-in, reflection journal, and artwork upload.",
    showInMenu: false,
  },
];

/* ═══════════════════════════════════════
   LOGO
═══════════════════════════════════════ */
const LogoMark = ({ size = 86 }) => (
  <svg width={size * (120/86)} height={size} viewBox="0 0 120 86" fill="none">
    <polygon points="10,28 34,10 58,28 52,28 34,16 16,28" fill={b.purple} />
    <polygon points="10,40 34,22 58,40 52,40 34,28 16,40" fill={b.purple} opacity="0.7" />
    <polygon points="62,46 86,28 110,46 104,46 86,34 68,46" fill={b.teal} />
    <polygon points="62,58 86,40 110,58 104,58 86,46 68,58" fill={b.teal} opacity="0.7" />
    <rect x="30" y="8" width="28" height="4" rx="2" fill={b.red} />
    <rect x="62" y="60" width="28" height="4" rx="2" fill={b.red} />
    <text x="60" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="rgba(255,255,255,0.35)" fontStyle="italic">me</text>
  </svg>
);

const LogoFull = ({ size = 100, dark = false }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <LogoMark size={size * 0.72} />
    <div style={{ textAlign: "center", marginTop: 6 }}>
      <div style={{ fontFamily: "'Arial Black', Impact, sans-serif", fontWeight: 900, fontSize: size * 0.2, lineHeight: 1.05, letterSpacing: "-0.02em", color: dark ? b.ink : b.red }}>
        <div>NGĀ PIKI</div>
        <div>NGĀ HEKE</div>
      </div>
    </div>
  </div>
);

const LogoInline = ({ height = 36 }) => (
  <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
    <LogoMark size={height} />
  </div>
);

/* ═══════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════ */
const Wave = ({ color = b.offwhite }) => (
  <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 52 }}>
    <path d="M0,26 C480,52 960,0 1440,26 L1440,52 L0,52 Z" fill={color} />
  </svg>
);

const Dots = ({ current, total, onNavigate, completedPages }) => (
  <div style={{ display: "flex", gap: 10, justifyContent: "center", padding: "14px 0", alignItems: "center" }}>
    {Array.from({ length: total }).map((_, i) => {
      const done = completedPages && completedPages.includes(i);
      const active = i === current;
      return (
        <button key={i} onClick={() => onNavigate && done && onNavigate(i)}
          title={PAGES[i]?.label}
          style={{
            width: active ? 28 : 8, height: 8, borderRadius: 4, border: "none",
            background: active ? b.red : done ? b.teal : b.border,
            transition: "all 0.35s ease",
            cursor: done && !active ? "pointer" : "default",
            padding: 0,
          }} />
      );
    })}
  </div>
);

const VideoBox = ({ label }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div onClick={() => setPlaying(!playing)} style={{
      width: "100%", maxWidth: 720, margin: "0 auto", aspectRatio: "16/9",
      borderRadius: 14,
      background: `linear-gradient(135deg, ${b.purpleDark} 0%, ${b.purple} 55%, ${b.tealDark} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      cursor: "pointer", position: "relative", overflow: "hidden",
      border: `2px solid ${b.purple}30`,
      boxShadow: "0 16px 56px rgba(84,48,146,0.28)",
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }} viewBox="0 0 720 405" fill="none">
        <polygon points="0,135 180,45 360,135 315,135 180,68 45,135" fill="white" />
        <polygon points="0,180 180,90 360,180 315,180 180,113 45,180" fill="white" />
        <polygon points="360,225 540,135 720,225 675,225 540,158 405,225" fill="white" />
        <polygon points="360,270 540,180 720,270 675,270 540,203 405,270" fill="white" />
      </svg>
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: playing ? `${b.red}ee` : `${b.red}bb`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.25s", boxShadow: `0 4px 28px ${b.red}55`,
        zIndex: 1,
      }}>
        {playing
          ? <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 5, height: 22, background: "#fff", borderRadius: 2 }} />
              <div style={{ width: 5, height: 22, background: "#fff", borderRadius: 2 }} />
            </div>
          : <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: `22px solid #fff`, marginLeft: 6 }} />
        }
      </div>
      <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 14, fontFamily: "Georgia, serif", fontSize: 13, letterSpacing: 0.4, zIndex: 1 }}>
        {playing ? "Playing…" : label}
      </p>
    </div>
  );
};

const AgreementBox = ({ checked, onChange, accent = b.teal, label }) => (
  <div onClick={() => onChange(!checked)} style={{
    padding: "20px 24px", background: b.white, borderRadius: 10, cursor: "pointer",
    border: `2px solid ${checked ? accent : b.border}`,
    boxShadow: checked ? `0 0 0 3px ${accent}18` : "none",
    transition: "all 0.25s",
  }}>
    <label style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer" }}>
      <div style={{
        width: 22, height: 22, borderRadius: 5, flexShrink: 0, marginTop: 2,
        border: `2px solid ${checked ? accent : b.stone}`,
        background: checked ? accent : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
      }}>
        {checked && <svg width="13" height="10" viewBox="0 0 13 10"><polyline points="1.5,5 5,8.5 11.5,1.5" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>}
      </div>
      <span style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.ink, lineHeight: 1.65 }}>{label}</span>
    </label>
  </div>
);



/* ═══════════════════════════════════════
   PAGE INFO BANNER
═══════════════════════════════════════ */
function PageInfoBanner({ pageId }) {
  const [open, setOpen] = useState(false);
  const page = PAGES.find(p => p.id === pageId);
  if (!page || pageId === 0) return null;

  return (
    <div style={{
      background: b.purplePale,
      borderBottom: `1px solid ${b.purple}20`,
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <button onClick={() => setOpen(!open)} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "12px 0",
          background: "transparent", border: "none", cursor: "pointer",
          textAlign: "left",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 3, height: 18, background: `linear-gradient(180deg, ${b.purple}, ${b.teal})`, borderRadius: 2 }} />
            <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", color: b.purple, letterSpacing: 1, textTransform: "uppercase" }}>
              {page.subtitle}
            </span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone, fontStyle: "italic" }}>— {page.title}</span>
          </div>
          <span style={{
            fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.purple,
            transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
            display: "inline-block",
          }}>▾</span>
        </button>

        {open && (
          <div style={{ paddingBottom: 16, paddingLeft: 13 }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#3a2840", lineHeight: 1.75 }}>
              {page.description}
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.stone }}>
                🗂 Page {pageId} of {PAGES.filter(p => p.showInMenu).length - 1}
              </span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.stone }}>
                ⏱ Approx. 3–4 minutes
              </span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.stone }}>
                📹 Includes video content
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer({ onNavigate, completedPages }) {
  return (
    <footer style={{ background: b.ink, marginTop: 0 }}>
      {/* Top accent */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})` }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "52px 28px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, marginBottom: 48, maxWidth: 300 }}>

          {/* About column */}
          <div>
            <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", color: b.red, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>About</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["About the Programme", "Research Background", "Facilitator Resources", "Contact Us"].map(item => (
                <button key={item} style={{ background: "transparent", border: "none", textAlign: "left", fontFamily: "Georgia, serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", cursor: "default", padding: 0 }}>
                  · {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 24 }} />

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            © 2026 Ngā Piki me Ngā Heke. Research prototype.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use", "Accessibility"].map(item => (
              <span key={item} style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", cursor: "default" }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Te Reo acknowledgement */}
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.72rem", color: "rgba(255,255,255,0.18)", marginTop: 16, textAlign: "center" }}>
          Ngā mihi ki ngā tangata whenua o te rohe nei — We acknowledge the people of this land
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   WELCOME PAGE
═══════════════════════════════════════ */
function Welcome({ onNext, onSkip }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, ${b.ink} 0%, #2a1545 50%, #0d2e2a 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px 24px 40px" }}>
      {/* BG decoration */}
      <svg style={{ position: "absolute", top: -40, right: -60, opacity: 0.06, pointerEvents: "none" }} width="500" height="400" viewBox="0 0 500 400" fill="none">
        <polygon points="0,150 200,30 400,150 360,150 200,60 40,150" fill={b.teal} />
        <polygon points="0,210 200,90 400,210 360,210 200,120 40,210" fill={b.teal} />
        <polygon points="100,290 300,170 500,290 460,290 300,200 140,290" fill={b.purple} />
        <polygon points="100,340 300,220 500,340 460,340 300,250 140,340" fill={b.purple} />
      </svg>
      <svg style={{ position: "absolute", bottom: -60, left: -80, opacity: 0.05, pointerEvents: "none" }} width="400" height="400" viewBox="0 0 400 400" fill="none">
        <polygon points="0,160 160,60 320,160 290,160 160,80 30,160" fill={b.red} />
        <polygon points="0,220 160,120 320,220 290,220 160,140 30,220" fill={b.red} />
      </svg>

      <div style={{ maxWidth: 680, textAlign: "center", zIndex: 1, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(32px)", transition: "all 0.9s ease" }}>
        <div style={{ marginBottom: 32 }}><LogoFull size={110} dark={false} /></div>

        <p style={{ fontFamily: "Georgia, serif", color: b.teal, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", marginBottom: 20, opacity: 0.85 }}>
          He mihi maioha
        </p>

        <div style={{ width: 56, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, margin: "0 auto 28px", borderRadius: 2 }} />

        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.95rem,2.2vw,1.12rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.9, marginBottom: 52, maxWidth: 520, margin: "0 auto 52px" }}>
          A guided journey through art, wellbeing, and understanding. This experience shares important context across three chapters before you begin your creative practice.
        </p>

        <button onClick={onNext}
          style={{ background: b.red, border: "none", color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "0.88rem", letterSpacing: 3, padding: "18px 56px", cursor: "pointer", borderRadius: 4, textTransform: "uppercase", transition: "all 0.25s", boxShadow: `0 6px 28px ${b.red}55` }}
          onMouseEnter={e => { e.currentTarget.style.background = b.redDark; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 36px ${b.red}55`; }}
          onMouseLeave={e => { e.currentTarget.style.background = b.red; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 28px ${b.red}55`; }}>
          Learn More
        </button>

        <p style={{ marginTop: 24, color: "rgba(255,255,255,0.28)", fontSize: 12, fontFamily: "Georgia, serif", letterSpacing: 1 }}>3 chapters · Approx. 10 minutes</p>

        <p style={{ marginTop: 28, fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.35)" }}>
          Already completed the introduction?{" "}
          <button onClick={onSkip} style={{ background: "none", border: "none", padding: 0, fontFamily: "Georgia, serif", fontSize: "0.85rem", color: b.teal, cursor: "pointer", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "3px" }}>
            Go straight to the participant portal →
          </button>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CHAPTER PAGE  (video FIRST, then text)
═══════════════════════════════════════ */
function ChapterPage({ chapter, dotsCurrent, title, te, body, videoLabel, onNext, onBack, completedPages, onNavigate }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, [chapter]);

  const themes = [
    { accent: b.teal,   gradient: `linear-gradient(135deg, ${b.purpleDark}, ${b.purple})`,  pageBg: b.offwhite },
    { accent: b.red,    gradient: `linear-gradient(135deg, ${b.tealDark},   ${b.teal})`,    pageBg: "#f0fbf9"  },
    { accent: b.purple, gradient: `linear-gradient(135deg, ${b.redDark},    ${b.red})`,     pageBg: b.offwhite },
  ];
  const theme = themes[chapter - 1];

  return (
    <div style={{ minHeight: "100vh", background: theme.pageBg, display: "flex", flexDirection: "column" }}>

      {/* Chapter hero header */}
      <div style={{ background: theme.gradient, padding: "56px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})` }} />
        <svg style={{ position: "absolute", right: -40, top: -20, opacity: 0.07, pointerEvents: "none" }} width="320" height="220" viewBox="0 0 320 220" fill="none">
          <polygon points="0,90 130,22 260,90 228,90 130,40 32,90" fill="white" />
          <polygon points="0,130 130,62 260,130 228,130 130,80 32,130" fill="white" />
        </svg>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Dots current={dotsCurrent} total={3} onNavigate={onNavigate} completedPages={completedPages} />
          <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Georgia, serif", letterSpacing: 3, fontSize: 11, textTransform: "uppercase", marginBottom: 10 }}>Chapter {chapter} of 3</p>
          <h2 style={{ color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55em", display: "block", fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: 1, marginBottom: 6 }}>{te}</span>
            {title}
          </h2>
        </div>
      </div>

      <Wave color={theme.pageBg} />

      {/* Content — VIDEO FIRST, then text */}
      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", padding: "8px 24px 24px", width: "100%", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0.1s" }}>

        {/* 1. VIDEO */}
        <div style={{ marginBottom: 36 }}>
          <VideoBox label={videoLabel} />
        </div>

        {/* 2. BODY TEXT */}
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.12rem)", color: "#3a3040", lineHeight: 1.9, marginBottom: 32 }}>
          {body}
        </p>

        {/* 3. NAV */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 16, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 28px", cursor: "pointer", borderRadius: 6, fontSize: "0.9rem", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = b.stone}
            onMouseLeave={e => e.currentTarget.style.borderColor = b.border}>
            ← Back
          </button>
          <button onClick={onNext} style={{
            background: theme.accent, border: "none", color: b.white,
            fontFamily: "'Arial Black', sans-serif", fontSize: "0.78rem", letterSpacing: 2,
            padding: "14px 40px", cursor: "pointer",
            borderRadius: 6, textTransform: "uppercase", transition: "all 0.25s",
            boxShadow: `0 4px 20px ${theme.accent}44`,
          }}>
            {chapter < 3 ? "Continue →" : "Final Chapter →"}
          </button>
        </div>
      </div>

      <Footer onNavigate={onNavigate} completedPages={completedPages} />
    </div>
  );
}

/* ═══════════════════════════════════════
   FINAL CHAPTER
═══════════════════════════════════════ */
function FinalChapter({ onComplete, onBack, completedPages, onNavigate }) {
  const [agreed, setAgreed] = useState(false);
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);

  return (
    <div style={{ minHeight: "100vh", background: b.offwhite, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${b.ink}, #2a1545)`, padding: "56px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})` }} />
        <svg style={{ position: "absolute", left: -40, bottom: -20, opacity: 0.06, pointerEvents: "none" }} width="300" height="200" viewBox="0 0 300 200" fill="none">
          <polygon points="0,80 120,20 240,80 210,80 120,36 30,80" fill={b.teal} />
          <polygon points="60,140 180,80 300,140 270,140 180,96 90,140" fill={b.red} />
        </svg>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Dots current={2} total={3} onNavigate={onNavigate} completedPages={completedPages} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif", letterSpacing: 3, fontSize: 11, textTransform: "uppercase", marginBottom: 10 }}>Chapter 3 of 3 · Final</p>
          <h2 style={{ color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 900, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55em", display: "block", fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: 1, marginBottom: 6 }}>Te Ara Whakamua</span>
            The Path Forward
          </h2>
        </div>
      </div>

      <Wave color={b.offwhite} />

      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", padding: "8px 24px 24px", width: "100%", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0.1s" }}>

        {/* VIDEO FIRST */}
        <div style={{ marginBottom: 36 }}>
          <VideoBox label="Click to play — Chapter Three: The path forward" />
        </div>

        {/* BODY TEXT */}
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.12rem)", color: "#3a3040", lineHeight: 1.9, marginBottom: 40 }}>
          We have traced the rises and the falls. This final chapter looks ahead, presenting the role that creative practice plays in mental health and wellbeing — and introduces the space where your own journey begins. Art has long been a vessel for things we cannot always say in words.
        </p>

        {/* FORMAL AGREEMENT */}
        <div style={{ padding: "30px 32px", background: b.white, borderRadius: 14, border: `2px solid ${agreed ? b.purple : b.border}`, boxShadow: agreed ? `0 4px 28px ${b.purple}18` : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.35s", marginBottom: 32 }}>
          <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.9rem", color: b.ink, marginBottom: 6, fontWeight: 900 }}>Formal Acknowledgement</h3>
          <div style={{ width: 36, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, borderRadius: 2, marginBottom: 16 }} />
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: "#3a3040", lineHeight: 1.8, marginBottom: 20 }}>
            By selecting the checkbox below, I confirm that I have engaged with all three chapters, reviewed the video content, and understand the nature of this art and wellbeing programme.
          </p>
          <AgreementBox checked={agreed} onChange={setAgreed} accent={b.purple}
            label="I agree — I have completed all chapters and acknowledge the content of this experience." />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 28px", cursor: "pointer", borderRadius: 6, fontSize: "0.9rem" }}>← Back</button>
          <button onClick={agreed ? onComplete : null} disabled={!agreed} style={{
            background: agreed ? `linear-gradient(135deg, ${b.purple}, ${b.purpleDark})` : "#ccc",
            border: "none", color: b.white, fontFamily: "'Arial Black', sans-serif",
            fontSize: "0.78rem", letterSpacing: 2, padding: "16px 48px",
            cursor: agreed ? "pointer" : "not-allowed", borderRadius: 6, textTransform: "uppercase",
            fontWeight: 900, transition: "all 0.25s", opacity: agreed ? 1 : 0.5,
            boxShadow: agreed ? `0 6px 28px ${b.purple}50` : "none",
          }}>Enter the Portal ›</button>
        </div>
      </div>

      <Footer onNavigate={onNavigate} completedPages={completedPages} />
    </div>
  );
}

/* ═══════════════════════════════════════
   PORTAL SIGN-IN
═══════════════════════════════════════ */
function Portal({ onEnter }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  const canEnter = name.trim().length > 1;
  const inp = { width: "100%", padding: "14px 18px", fontFamily: "Georgia, serif", fontSize: "1rem", color: b.ink, background: b.warm, border: `2px solid ${b.border}`, borderRadius: 8, outline: "none", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, #f7f0ff 0%, ${b.offwhite} 50%, #e8faf8 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      <svg style={{ position: "absolute", top: 0, right: 0, opacity: 0.05, pointerEvents: "none" }} width="400" height="400" viewBox="0 0 400 400" fill="none">
        <polygon points="0,120 160,40 320,120 280,120 160,60 40,120" fill={b.purple} />
        <polygon points="0,180 160,100 320,180 280,180 160,120 40,180" fill={b.purple} />
      </svg>
      <div style={{ maxWidth: 460, width: "100%", zIndex: 1, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <LogoFull size={90} dark={false} />
          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: b.stone, fontSize: "0.9rem", marginTop: 10 }}>Participant Portal</p>
          <div style={{ width: 40, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, margin: "12px auto 0", borderRadius: 2 }} />
        </div>
        <div style={{ background: b.white, borderRadius: 16, padding: "40px 36px", boxShadow: `0 16px 60px ${b.purple}14`, border: `1px solid ${b.border}` }}>
          <p style={{ fontFamily: "Georgia, serif", color: b.stone, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 28, textAlign: "center" }}>
            Welcome to your personal creative space. Please enter your details to continue.
          </p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 8 }}>Your Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="First name or preferred name" style={inp}
              onFocus={e => e.target.style.borderColor = b.teal} onBlur={e => e.target.style.borderColor = b.border} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 8 }}>
              Participant Code <span style={{ fontWeight: 300, fontFamily: "Georgia, serif", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
            </label>
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. NPH-2025-001" style={inp}
              onFocus={e => e.target.style.borderColor = b.purple} onBlur={e => e.target.style.borderColor = b.border} />
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.73rem", color: b.stone, marginTop: 6, opacity: 0.7 }}>Provided by your facilitator. Leave blank if not applicable.</p>
          </div>
          <button onClick={canEnter ? () => onEnter({ name: name.trim(), code: code.trim() }) : null} disabled={!canEnter}
            style={{ width: "100%", padding: "16px", background: canEnter ? `linear-gradient(135deg, ${b.teal}, ${b.tealDark})` : "#ccc", border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase", cursor: canEnter ? "pointer" : "not-allowed", borderRadius: 8, transition: "all 0.25s", opacity: canEnter ? 1 : 0.5, boxShadow: canEnter ? `0 4px 20px ${b.teal}44` : "none" }}>
            Enter →
          </button>
        </div>
        <p style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: "0.73rem", color: b.stone, marginTop: 18, lineHeight: 1.7, opacity: 0.65 }}>Your entries are personal and private.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════ */
const LIKERT = [
  { value: 1, emoji: "😔", label: "Very low" },
  { value: 2, emoji: "😕", label: "Low" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😊", label: "Very good" },
];
const FEELINGS = [
  { id: "mood",      label: "Overall mood today" },
  { id: "energy",   label: "Energy & motivation" },
  { id: "creative", label: "Creative engagement" },
  { id: "connected",label: "Sense of connection" },
];

function LikertRow({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <p style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: b.ink, marginBottom: 12, fontWeight: 500 }}>{label}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {LIKERT.map(opt => {
          const sel = value === opt.value;
          return (
            <button key={opt.value} onClick={() => onChange(opt.value)} style={{ flex: 1, minWidth: 56, padding: "10px 6px", borderRadius: 10, cursor: "pointer", transition: "all 0.2s", border: `2px solid ${sel ? b.teal : b.border}`, background: sel ? b.tealPale : b.warm, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, boxShadow: sel ? `0 2px 12px ${b.teal}30` : "none" }}>
              <span style={{ fontSize: "1.4rem" }}>{opt.emoji}</span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.67rem", color: sel ? b.tealDark : b.stone }}>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard({ participant, entries, onSave, onRestart }) {
  const [tab, setTab] = useState("check");
  const [scores, setScores] = useState({});
  const [journal, setJournal] = useState("");
  const [artTitle, setArtTitle] = useState("");
  const [artNote, setArtNote] = useState("");
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const [v, setV] = useState(false);
  const fileRef = useRef();
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);

  const allScored = FEELINGS.every(f => scores[f.id]);
  const avgScore = allScored ? (Object.values(scores).reduce((a, bv) => a + bv, 0) / FEELINGS.length).toFixed(1) : null;

  const handleFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter(f => f.type.startsWith("image/") || f.type === "application/pdf");
    setFiles(prev => [...prev, ...valid.map(f => ({ file: f, preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null, id: Math.random().toString(36).slice(2) }))]);
  }, []);

  const handleDrop = e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); };
  const handleSubmit = () => {
    onSave({ participant, scores, avgScore, journal, artTitle, artNote, fileCount: files.length, date: new Date().toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" }) });
    setDone(true);
  };

  if (done) return <SubmitSuccess participant={participant} avgScore={avgScore} fileCount={files.length} entries={entries} onRestart={onRestart} />;

  const tabS = (id) => ({ flex: 1, padding: "14px 10px", fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", letterSpacing: 1, cursor: "pointer", border: "none", borderBottom: tab === id ? `3px solid ${b.purple}` : "3px solid transparent", background: "transparent", color: tab === id ? b.purple : b.stone, textTransform: "uppercase", transition: "all 0.2s", whiteSpace: "nowrap" });
  const inp = { width: "100%", padding: "12px 16px", fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.ink, background: b.warm, border: `2px solid ${b.border}`, borderRadius: 8, outline: "none", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, #f4f0fa 0%, ${b.offwhite} 50%, #eaf8f6 100%)` }}>
      <div style={{ background: `linear-gradient(135deg, ${b.ink}, #2a1545)`, padding: "0 24px" }}>
        <div style={{ height: 4, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})` }} />
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "18px 0" }}>
          <div>
            <LogoInline height={32} />
            <p style={{ fontFamily: "Georgia, serif", color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: 4 }}>Kia ora, {participant.name} — Session entry</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 16px", textAlign: "right" }}>
            <p style={{ fontFamily: "'Arial Black', sans-serif", color: b.teal, fontSize: "0.65rem", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Today</p>
            <p style={{ fontFamily: "Georgia, serif", color: "rgba(255,255,255,0.65)", fontSize: "0.82rem" }}>{new Date().toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px 60px", opacity: v ? 1 : 0, transition: "opacity 0.7s ease" }}>
        {entries.length > 0 && (
          <div style={{ marginBottom: 28, padding: "14px 20px", background: "rgba(255,255,255,0.7)", borderRadius: 12, border: `1px solid ${b.border}` }}>
            <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.65rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 10 }}>Previous sessions</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {entries.map((e, i) => (
                <div key={i} style={{ padding: "5px 14px", background: b.warm, borderRadius: 20, border: `1px solid ${b.border}` }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone }}>{e.date}</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.teal, marginLeft: 8, fontWeight: 600 }}>avg {e.avgScore}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", background: b.white, borderRadius: "12px 12px 0 0", border: `1px solid ${b.border}`, borderBottom: `1px solid ${b.border}`, marginBottom: 0, overflow: "hidden" }}>
          {[["check","① Wellbeing Check-in"],["journal","② Reflection Journal"],["upload","③ Upload Artwork"]].map(([id,lbl]) => (
            <button key={id} style={tabS(id)} onClick={() => setTab(id)}>{lbl}</button>
          ))}
        </div>

        {tab === "check" && (
          <div style={{ background: b.white, borderRadius: "0 0 16px 16px", padding: "36px 32px", boxShadow: `0 4px 32px ${b.purple}08`, border: `1px solid ${b.border}`, borderTop: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 4, height: 32, background: `linear-gradient(180deg, ${b.red}, ${b.teal})`, borderRadius: 2 }} />
              <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.1rem", color: b.ink }}>How are you feeling today?</h2>
            </div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone, lineHeight: 1.7, marginBottom: 28, paddingLeft: 16 }}>There are no right or wrong answers.</p>
            {FEELINGS.map(f => <LikertRow key={f.id} label={f.label} value={scores[f.id]} onChange={v => setScores(prev => ({ ...prev, [f.id]: v }))} />)}
            {allScored && (
              <div style={{ marginTop: 16, padding: "16px 20px", background: b.tealPale, borderRadius: 10, border: `2px solid ${b.teal}40`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.8rem" }}>{avgScore >= 4 ? "✨" : avgScore >= 3 ? "🍃" : "🌱"}</span>
                <div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "0.78rem", color: b.stone, marginBottom: 2 }}>Your average wellbeing score today</p>
                  <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.4rem", color: b.tealDark }}>{avgScore} <span style={{ fontSize: "0.7em", color: b.stone }}>/ 5</span></p>
                </div>
              </div>
            )}
            <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setTab("journal")} style={{ background: allScored ? b.teal : "#ccc", border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", padding: "12px 32px", borderRadius: 6, cursor: allScored ? "pointer" : "not-allowed", letterSpacing: 1, fontSize: "0.78rem", opacity: allScored ? 1 : 0.5, textTransform: "uppercase" }}>
                Next: Reflect →
              </button>
            </div>
          </div>
        )}

        {tab === "journal" && (
          <div style={{ background: b.white, borderRadius: "0 0 16px 16px", padding: "36px 32px", boxShadow: `0 4px 32px ${b.purple}08`, border: `1px solid ${b.border}`, borderTop: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 4, height: 32, background: `linear-gradient(180deg, ${b.purple}, ${b.red})`, borderRadius: 2 }} />
              <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.1rem", color: b.ink }}>Your Reflection</h2>
            </div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone, lineHeight: 1.7, marginBottom: 22, paddingLeft: 16 }}>Write freely about your experience with the artwork this session.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {["What did I create today?","How did making this feel?","What did I notice?","What challenged me?"].map(prompt => (
                <button key={prompt} onClick={() => setJournal(j => j ? j + "\n\n" + prompt + "\n" : prompt + "\n")}
                  style={{ padding: "6px 14px", background: b.purplePale, border: `1px solid ${b.purple}30`, borderRadius: 20, fontFamily: "Georgia, serif", fontSize: "0.78rem", color: b.purple, cursor: "pointer" }}>
                  + {prompt}
                </button>
              ))}
            </div>
            <textarea value={journal} onChange={e => setJournal(e.target.value)} placeholder="Begin writing here…" rows={10}
              style={{ width: "100%", padding: "16px", fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.ink, background: b.warm, border: `2px solid ${b.border}`, borderRadius: 10, outline: "none", lineHeight: 1.8, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = b.purple} onBlur={e => e.target.style.borderColor = b.border} />
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: b.stone, marginTop: 6, opacity: 0.7 }}>{journal.length} characters · {journal.trim() ? journal.trim().split(/\s+/).length : 0} words</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button onClick={() => setTab("check")} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 24px", borderRadius: 6, cursor: "pointer" }}>← Back</button>
              <button onClick={() => setTab("upload")} style={{ background: b.purple, border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", padding: "12px 32px", borderRadius: 6, cursor: "pointer", letterSpacing: 1, fontSize: "0.78rem", textTransform: "uppercase" }}>Next: Upload Art →</button>
            </div>
          </div>
        )}

        {tab === "upload" && (
          <div style={{ background: b.white, borderRadius: "0 0 16px 16px", padding: "36px 32px", boxShadow: `0 4px 32px ${b.purple}08`, border: `1px solid ${b.border}`, borderTop: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 4, height: 32, background: `linear-gradient(180deg, ${b.teal}, ${b.purple})`, borderRadius: 2 }} />
              <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.1rem", color: b.ink }}>Share Your Artwork</h2>
            </div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone, lineHeight: 1.7, marginBottom: 28, paddingLeft: 16 }}>Upload a photo or scan of what you created this session.</p>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 8 }}>Title of work <span style={{ fontWeight: 300, fontFamily: "Georgia, serif", textTransform: "none" }}>(optional)</span></label>
              <input value={artTitle} onChange={e => setArtTitle(e.target.value)} placeholder="Untitled" style={inp} onFocus={e => e.target.style.borderColor = b.teal} onBlur={e => e.target.style.borderColor = b.border} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 8 }}>Notes <span style={{ fontWeight: 300, fontFamily: "Georgia, serif", textTransform: "none" }}>(optional)</span></label>
              <textarea value={artNote} onChange={e => setArtNote(e.target.value)} placeholder="Materials used, process notes…" rows={3} style={{ ...inp, resize: "vertical" }} onFocus={e => e.target.style.borderColor = b.teal} onBlur={e => e.target.style.borderColor = b.border} />
            </div>
            <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} onClick={() => fileRef.current.click()}
              style={{ border: `2px dashed ${dragOver ? b.teal : b.border}`, borderRadius: 12, padding: "40px 24px", textAlign: "center", cursor: "pointer", background: dragOver ? b.tealPale : b.warm, transition: "all 0.2s", marginBottom: 24 }}>
              <input ref={fileRef} type="file" multiple accept="image/*,.pdf" style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🖼️</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.stone, marginBottom: 4 }}>Drag and drop your artwork here</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone, opacity: 0.6 }}>or click to browse · JPG, PNG, GIF, PDF</p>
            </div>
            {files.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px,1fr))", gap: 12, marginBottom: 28 }}>
                {files.map(f => (
                  <div key={f.id} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: `1px solid ${b.border}`, background: b.warm }}>
                    {f.preview ? <img src={f.preview} alt="artwork" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
                      : <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>📄</div>}
                    <div style={{ padding: "6px 8px" }}><p style={{ fontFamily: "Georgia, serif", fontSize: "0.68rem", color: b.stone, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.file.name}</p></div>
                    <button onClick={e => { e.stopPropagation(); setFiles(prev => prev.filter(x => x.id !== f.id)); }}
                      style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: b.red, border: "none", color: "#fff", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <button onClick={() => setTab("journal")} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 24px", borderRadius: 6, cursor: "pointer" }}>← Back</button>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                {!allScored && <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.red }}>⚠ Complete wellbeing check-in first</p>}
                <button onClick={allScored ? handleSubmit : null} disabled={!allScored}
                  style={{ background: allScored ? `linear-gradient(135deg, ${b.red}, ${b.redDark})` : "#ccc", border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", letterSpacing: 2, padding: "14px 36px", cursor: allScored ? "pointer" : "not-allowed", borderRadius: 8, textTransform: "uppercase", transition: "all 0.25s", boxShadow: allScored ? `0 4px 20px ${b.red}44` : "none", opacity: allScored ? 1 : 0.5 }}>
                  Submit Session ✓
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SUBMIT SUCCESS
═══════════════════════════════════════ */
function SubmitSuccess({ participant, avgScore, fileCount, entries, onRestart }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  const s = avgScore >= 4 ? { emoji: "✨", msg: "You seem to be in a good space today." }
    : avgScore >= 3 ? { emoji: "🍃", msg: "A steady day — every session matters." }
    : { emoji: "🌱", msg: "Thank you for showing up, even on harder days." };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, #f4f0fa, ${b.offwhite} 60%, #e8faf8)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s ease" }}>
        <div style={{ marginBottom: 20 }}><LogoFull size={80} dark={false} /></div>
        <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>{s.emoji}</div>
        <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.6rem", color: b.ink, fontWeight: 900, marginBottom: 8 }}>Tēnā koe, {participant.name}</h2>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: b.stone, marginBottom: 36, fontSize: "1rem" }}>{s.msg}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 36 }}>
          {[[`${avgScore} / 5`, "Wellbeing score", b.teal], [entries.length, "Sessions total", b.purple], [fileCount, "Files uploaded", b.red]].map(([val, lbl, col]) => (
            <div key={lbl} style={{ background: b.white, borderRadius: 12, padding: "20px 12px", border: `2px solid ${col}20`, boxShadow: `0 4px 16px ${col}14` }}>
              <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.4rem", color: col, marginBottom: 6 }}>{val}</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: b.stone, letterSpacing: 0.5 }}>{lbl}</p>
            </div>
          ))}
        </div>
        <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})`, margin: "0 auto 20px", borderRadius: 2 }} />
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: b.stone, fontSize: "0.9rem", opacity: 0.8, marginBottom: 32 }}>Ngā mihi nui</p>
        <button onClick={onRestart}
          style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", fontSize: "0.88rem", padding: "12px 28px", borderRadius: 8, cursor: "pointer", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = b.purple; e.currentTarget.style.color = b.purple; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = b.border; e.currentTarget.style.color = b.stone; }}>
          ↺ Return to the beginning
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ROOT — tracks completed pages for nav
═══════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState(0);
  const [completedPages, setCompletedPages] = useState([0]);
  const [participant, setParticipant] = useState(null);
  const [entries, setEntries] = useState([]);

  const goTo = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const advance = (nextPage) => {
    setCompletedPages(prev => prev.includes(nextPage) ? prev : [...prev, nextPage]);
    goTo(nextPage);
  };

  const isPortalSection = page >= 4;
  const chapterData = [
    { chapter: 1, dotsCurrent: 0, title: "The Context", te: "Te Tūāpae", body: "Understanding the relationship between creative practice and mental wellbeing begins with understanding the landscape we share. This chapter introduces the foundational research — patterns of connection, expression, and healing that art-making can support across communities.", videoLabel: "Click to play — Chapter One overview" },
    { chapter: 2, dotsCurrent: 1, title: "The Voices",  te: "Ngā Reo",    body: "Behind every piece of art is a story. This chapter brings together voices from participants and practitioners who have engaged with creative practice as part of their mental health journey. Their honesty and courage inform everything that follows.", videoLabel: "Click to play — Chapter Two: Community perspectives" },
  ];

  return (
    <div>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } body { -webkit-font-smoothing: antialiased; } button { font-family: inherit; } textarea, input { font-family: inherit; }`}</style>

      {/* Page info banner for brochure chapters */}
      {!isPortalSection && page > 0 && page <= 3 && (
        <PageInfoBanner pageId={page} />
      )}

      {page === 0 && <Welcome onNext={() => advance(1)} onSkip={() => { setCompletedPages([0,1,2,3]); goTo(4); }} />}
      {page === 1 && (
        <ChapterPage {...chapterData[0]} onBack={() => goTo(0)} onNext={() => advance(2)} completedPages={completedPages} onNavigate={goTo} />
      )}
      {page === 2 && (
        <ChapterPage {...chapterData[1]} onBack={() => goTo(1)} onNext={() => advance(3)} completedPages={completedPages} onNavigate={goTo} />
      )}
      {page === 3 && (
        <FinalChapter onBack={() => goTo(2)} onComplete={() => advance(4)} completedPages={completedPages} onNavigate={goTo} />
      )}
      {page === 4 && <Portal onEnter={(p) => { setParticipant(p); advance(5); }} />}
      {page === 5 && <Dashboard participant={participant} entries={entries} onSave={(e) => setEntries(prev => [...prev, e])} onRestart={() => { setPage(0); setCompletedPages([0]); setParticipant(null); setEntries([]); }} />}

      {/* Footer on welcome page */}
      {page === 0 && <Footer onNavigate={goTo} completedPages={completedPages} />}
    </div>
  );
}
