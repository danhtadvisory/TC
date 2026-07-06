import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   BRAND TOKENS
═══════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════
   LOGO
═══════════════════════════════════════════════════════ */
const LogoMark = ({ size = 86 }) => (
  <svg width={size * (120 / 86)} height={size} viewBox="0 0 120 86" fill="none">
    <polygon points="10,28 34,10 58,28 52,28 34,16 16,28" fill={b.purple} />
    <polygon points="10,40 34,22 58,40 52,40 34,28 16,40" fill={b.purple} opacity="0.7" />
    <polygon points="62,46 86,28 110,46 104,46 86,34 68,46" fill={b.teal} />
    <polygon points="62,58 86,40 110,58 104,58 86,46 68,58" fill={b.teal} opacity="0.7" />
    <rect x="30" y="8" width="28" height="4" rx="2" fill={b.red} />
    <rect x="62" y="60" width="28" height="4" rx="2" fill={b.red} />
    <text x="60" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="rgba(255,255,255,0.35)" fontStyle="italic">me</text>
  </svg>
);

const LogoFull = ({ size = 100 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <LogoMark size={size * 0.72} />
    <div style={{ textAlign: "center", marginTop: 6 }}>
      <div style={{ fontFamily: "'Arial Black', Impact, sans-serif", fontWeight: 900, fontSize: size * 0.2, lineHeight: 1.05, letterSpacing: "-0.02em", color: b.red }}>
        <div>NGĀ PIKI</div>
        <div>NGĀ HEKE</div>
      </div>
    </div>
  </div>
);

const LogoInline = ({ height = 36, onClick }) => (
  <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
    <LogoMark size={height} />
    <div style={{ lineHeight: 1 }}>
      <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: height * 0.34, color: b.red, letterSpacing: "-0.01em" }}>NGĀ PIKI</div>
      <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: height * 0.22, color: b.purple, marginTop: 1 }}>me</div>
      <div style={{ fontFamily: "'Arial Black', sans-serif", fontWeight: 900, fontSize: height * 0.34, color: b.red, letterSpacing: "-0.01em" }}>NGĀ HEKE</div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════ */
const Wave = ({ color = b.offwhite }) => (
  <svg viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 52 }}>
    <path d="M0,26 C480,52 960,0 1440,26 L1440,52 L0,52 Z" fill={color} />
  </svg>
);

const RainbowBar = () => (
  <div style={{ height: 4, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})` }} />
);

const Btn = ({ children, onClick, variant = "primary", style: extra = {} }) => {
  const styles = {
    primary:   { background: b.red,    color: b.white, border: "none" },
    secondary: { background: "transparent", color: b.red, border: `2px solid ${b.red}` },
    teal:      { background: b.teal,   color: b.white, border: "none" },
    ghost:     { background: "transparent", color: b.stone, border: `2px solid ${b.border}` },
  };
  return (
    <button onClick={onClick} style={{
      ...styles[variant],
      fontFamily: "'Arial Black', sans-serif", fontSize: "0.78rem", letterSpacing: 2,
      padding: "14px 36px", borderRadius: 6, cursor: "pointer",
      textTransform: "uppercase", transition: "all 0.2s",
      ...extra,
    }}>
      {children}
    </button>
  );
};

const SectionLabel = ({ children, color = b.teal }) => (
  <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", letterSpacing: 3, textTransform: "uppercase", color, marginBottom: 12 }}>{children}</p>
);

const Divider = () => (
  <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})`, borderRadius: 2, margin: "20px 0" }} />
);

/* ═══════════════════════════════════════════════════════
   SITE NAV
═══════════════════════════════════════════════════════ */
function SiteNav({ currentView, setView, onPortal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => { setMobileOpen(false); }, [currentView]);

  const navLinks = [
    { id: "home",    label: "Home" },
    { id: "about",   label: "About" },
    { id: "contact", label: "Contact" },
    { id: "support", label: "Find Support" },
  ];

  const linkStyle = (id) => ({
    background: "transparent", border: "none",
    fontFamily: "Georgia, serif", fontSize: "0.9rem",
    color: currentView === id ? b.red : "rgba(255,255,255,0.65)",
    cursor: "pointer", padding: "6px 2px",
    borderBottom: currentView === id ? `2px solid ${b.red}` : "2px solid transparent",
    transition: "all 0.15s",
  });

  // Animated burger icon
  const BurgerIcon = () => (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <rect x="0" y="0"  width={mobileOpen ? "22" : "22"} height="2" rx="1" fill="white"
        style={{ transformOrigin: "11px 1px", transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "none", transition: "all 0.25s ease" }} />
      <rect x="0" y="7"  width="22" height="2" rx="1" fill="white"
        style={{ opacity: mobileOpen ? 0 : 1, transition: "all 0.25s ease" }} />
      <rect x="0" y="14" width={mobileOpen ? "22" : "16"} height="2" rx="1" fill="white"
        style={{ transformOrigin: "11px 15px", transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none", transition: "all 0.25s ease" }} />
    </svg>
  );

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled || mobileOpen ? "rgba(26,16,32,0.98)" : "rgba(26,16,32,0.88)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <RainbowBar />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <LogoInline height={32} onClick={() => setView("home")} />

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {navLinks.map(l => (
                <button key={l.id} style={linkStyle(l.id)} onClick={() => setView(l.id)}
                  onMouseEnter={e => { if (currentView !== l.id) e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { if (currentView !== l.id) e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}>
                  {l.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile burger */}
          {isMobile && (
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "8px", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BurgerIcon />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer — slides down */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
          background: "rgba(26,16,32,0.98)",
          borderBottom: mobileOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
          maxHeight: mobileOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease, border-bottom 0.35s ease",
        }}>
          <div style={{ padding: "8px 0 24px" }}>
            {navLinks.map((l, i) => (
              <button key={l.id} onClick={() => setView(l.id)} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "14px 28px", background: "transparent", border: "none",
                borderLeft: currentView === l.id ? `3px solid ${b.red}` : "3px solid transparent",
                fontFamily: "Georgia, serif", fontSize: "1rem",
                color: currentView === l.id ? b.red : "rgba(255,255,255,0.75)",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   SITE FOOTER
═══════════════════════════════════════════════════════ */
function SiteFooter({ setView, onPortal = () => {} }) {
  return (
    <footer style={{ background: b.ink }}>
      <RainbowBar />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 28px 28px" }}>
        <div style={{ display: "flex", gap: 60, flexWrap: "wrap", marginBottom: 40 }}>
          <div style={{ flex: "1 1 220px" }}>
            <LogoFull size={80} />
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: 16, lineHeight: 1.7, maxWidth: 260 }}>
              A guided art and wellbeing programme exploring the connection between creative practice and mental health.
            </p>
          </div>
          <div style={{ flex: "1 1 160px" }}>
            <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", color: b.teal, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Navigate</p>
            {[["home","Home"],["about","About"],["contact","Contact"],["support","Find Support"]].map(([id, lbl]) => (
              <button key={id} onClick={() => setView(id)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "Georgia, serif", fontSize: "0.88rem", cursor: "pointer", padding: "4px 0", textAlign: "left", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = b.teal}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
                → {lbl}
              </button>
            ))}
            <button onClick={onPortal} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "Georgia, serif", fontSize: "0.88rem", cursor: "pointer", padding: "4px 0", textAlign: "left", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = b.teal}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>
              → Participant Portal
            </button>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", color: b.red, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>About</p>
            {["About the Programme", "Research Background", "Facilitator Resources", "Contact Us"].map(item => (
              <p key={item} style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.3)", padding: "4px 0" }}>· {item}</p>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.73rem", color: "rgba(255,255,255,0.22)" }}>© 2026 Ngā Piki me Ngā Heke. Research prototype.</p>
          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.7rem", color: "rgba(255,255,255,0.16)" }}>Ngā mihi ki ngā tangata whenua o te rohe nei</p>
        </div>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.22)", marginTop: 16, lineHeight: 1.8, textAlign: "center" }}>
          Approved by the University of Auckland Human Participants Ethics Committee on [date] for three years. Reference Number [number]. For any concerns regarding ethical issues, you may contact The University of Auckland Human Participants Ethics Committee/Auckland Health Research Ethics Committee: <a href="mailto:humanethics@auckland.ac.nz" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>humanethics@auckland.ac.nz</a>
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   LANDING PAGE
═══════════════════════════════════════════════════════ */
function LandingPage({ setView, onPortal }) {
  const [v, setV] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const nzSupport = [
    { name: "Lifeline", number: "0800 543 354", desc: "24/7 crisis support" },
    { name: "Youthline", number: "0800 376 633", desc: "For young people under 25" },
    { name: "1737", number: "Text or call 1737", desc: "Free mental health support, any time" },
  ];

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ minHeight: "75vh", background: `linear-gradient(150deg, ${b.ink} 0%, #2a1545 55%, #0d2e2a 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 24px 48px" }}>
        {/* BG chevrons */}
        <svg style={{ position: "absolute", top: -40, right: -60, opacity: 0.06, pointerEvents: "none" }} width="500" height="400" viewBox="0 0 500 400" fill="none">
          <polygon points="0,150 200,30 400,150 360,150 200,60 40,150" fill={b.teal} />
          <polygon points="0,210 200,90 400,210 360,210 200,120 40,210" fill={b.teal} />
          <polygon points="100,290 300,170 500,290 460,290 300,200 140,290" fill={b.purple} />
        </svg>
        <svg style={{ position: "absolute", bottom: -40, left: -60, opacity: 0.05, pointerEvents: "none" }} width="360" height="300" viewBox="0 0 360 300" fill="none">
          <polygon points="0,120 160,40 320,120 280,120 160,60 40,120" fill={b.red} />
          <polygon points="0,180 160,100 320,180 280,180 160,140 40,180" fill={b.red} />
        </svg>

        <div style={{ maxWidth: 720, textAlign: "center", zIndex: 1, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: "all 0.9s ease" }}>
          <div style={{ marginBottom: 32 }}><LogoFull size={110} /></div>
          <p style={{ fontFamily: "Georgia, serif", color: b.teal, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", marginBottom: 20 }}>He mihi maioha</p>
          <div style={{ width: 56, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, margin: "0 auto 28px", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.3rem,3vw,1.8rem)", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: 48, fontWeight: 400, maxWidth: 560, margin: "0 auto 48px" }}>
            Our experiences, ideas, and stories can help shape resources that feel real, relevant, and useful for rangatahi across Aotearoa. Your voice matters. Help shape what's next.
          </h1>
        </div>
      </div>

      {/* ── WHO ARE WE ── */}
      <div style={{ background: b.warm, padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: isMobile ? 32 : 60, alignItems: "start" }}>
            <div>
              <SectionLabel color={b.purple}>Ko wai mātou</SectionLabel>
              <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(1.6rem,4vw,2.2rem)", color: b.ink, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>Who Are We</h2>
              <Divider />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                {["Kaupapa Māori", "University of Auckland", "Rangatahi Māori"].map(tag => (
                  <span key={tag} style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.purple, background: b.purplePale, padding: "4px 12px", borderRadius: 20, border: `1px solid ${b.purple}25` }}>{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#3a3040", lineHeight: 1.9, marginBottom: 20 }}>
                We are a small research team from Waipapa Taumata Rau — The University of Auckland. Most of us whakapapa Māori. All of us are committed to doing research that improves the lives of rangatahi Māori. Our team includes experienced Kaupapa Māori researchers, as well as creative and technical experts.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "#3a3040", lineHeight: 1.9 }}>
                With this study we are seeking to learn more about how rangatahi keep well emotionally — what keeps you strong and connected during the ups and downs of life. We will do this through a spoken word poetry wānanga. We hope this creativity will help you share your insights in ways that are fun and interesting. These insights will help us design programmes and interventions that rangatahi Māori find helpful and that they actually want to do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── WATCH & LEARN ── */}
      <div style={{ background: `linear-gradient(135deg, ${b.purpleDark}, ${b.purple})`, padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", right: -40, top: -20, opacity: 0.07, pointerEvents: "none" }} width="320" height="260" viewBox="0 0 320 260" fill="none">
          <polygon points="0,100 130,26 260,100 228,100 130,46 32,100" fill="white" />
          <polygon points="0,145 130,71 260,145 228,145 130,91 32,145" fill="white" />
        </svg>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel color="rgba(255,255,255,0.5)">Whakaae i runga i te mārama</SectionLabel>
            <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: b.white, fontWeight: 900, marginBottom: 16 }}>Informed Consent</h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
              Before you begin, take a few minutes to watch these short videos. They'll walk you through what to expect and how to get the most from your experience.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
            {[
              { num: "01", title: "Introduction | Why you're here | Research purpose",                                                              desc: "An overview of the study, who we are, and what we're hoping to learn together with rangatahi." },
              { num: "02", title: "What's involved in participating | Benefit | Koha",                                                              desc: "What participation looks like, the benefits of taking part, and the koha you'll receive for your time." },
              { num: "03", title: "Participant rights | Safety & support | Confidentiality | Data management | Intellectual property",              desc: "Your rights as a participant, how we keep you safe, how your information is stored, and what belongs to you." },
              { num: "04", title: "Closing & Questions",                                                                                            desc: "A wrap-up of everything covered, and an opportunity to ask any questions before you decide whether to participate." },
            ].map(v => (
              <div key={v.num} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
                {/* Video placeholder */}
                <div style={{ aspectRatio: "16/9", background: "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }} viewBox="0 0 320 180" fill="none">
                    <polygon points="0,60 120,10 240,60 210,60 120,24 30,60" fill="white" />
                    <polygon points="80,120 200,70 320,120 290,120 200,84 110,120" fill="white" />
                  </svg>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${b.red}bb`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${b.red}55`, zIndex: 1 }}>
                    <div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "16px solid #fff", marginLeft: 4 }} />
                  </div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginTop: 12, letterSpacing: 0.5, zIndex: 1 }}>Video coming soon</p>
                </div>
                {/* Card info */}
                <div style={{ padding: "20px 22px 24px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: b.red, marginBottom: 12 }}>
                    <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.65rem", color: "#fff", fontWeight: 900 }}>{v.num}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.95rem", color: b.white, marginBottom: 8, lineHeight: 1.2 }}>{v.title}</h3>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* PIS + Consent cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 24, marginTop: 40 }}>

            {/* PIS card */}
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.15)", borderTop: `4px solid ${b.teal}`, padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>📄</div>
                <div>
                  <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", color: b.teal, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>Step 1</p>
                  <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1rem", color: b.white }}>Participant Information Sheet</h3>
                </div>
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
                Read this first. It explains the project in full — what we're doing, why, what's involved, your rights, how your information will be stored, and who to contact if you have questions. You can also share this with your whānau.
              </p>
              <a href="/pis.pdf" download style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRadius: 8, textDecoration: "none", background: b.teal, color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", letterSpacing: 1.5, textTransform: "uppercase" }}>
                ⬇ Download PIS (PDF)
              </a>
            </div>

            {/* Consent card */}
            <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.15)", borderTop: `4px solid ${b.red}`, padding: "28px 28px 24px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>✅</div>
                <div>
                  <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", color: b.red, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>Step 2</p>
                  <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1rem", color: b.white }}>Consent Form</h3>
                </div>
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 12, flex: 1 }}>
                Once you've watched the videos and read the PIS, complete your consent online. The form confirms you understand the study, your rights, and what you're agreeing to. You can also download a copy for your records.
              </p>
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                  🔒 This consent will be stored for 6 years in line with University of Auckland ethics requirements. Reference Number pending approval.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="https://auckland.au1.qualtrics.com/jfe/form/SV_di1fNWnJlnunqxE" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRadius: 8, textDecoration: "none", background: `linear-gradient(135deg, ${b.red}, ${b.redDark})`, color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", letterSpacing: 1.5, textTransform: "uppercase", boxShadow: `0 4px 16px ${b.red}50` }}>
                  Complete Consent Form →
                </a>
                <a href="/consent.pdf" download style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 20px", borderRadius: 8, textDecoration: "none", background: "transparent", color: "rgba(255,255,255,0.7)", border: "2px solid rgba(255,255,255,0.25)", fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", letterSpacing: 1, textTransform: "uppercase" }}>
                  ⬇ Download Consent Form (PDF)
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── FIND SUPPORT CTA ── */}
      <div style={{ background: b.redPale, padding: "60px 24px", borderTop: `4px solid ${b.red}20` }}>
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🌱</div>
          <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.6rem", color: b.ink, marginBottom: 12 }}>Need Support Right Now?</h2>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#3a3040", lineHeight: 1.8, marginBottom: 28 }}>
            If you're finding things difficult, you don't have to wait. Free support is available 24/7 in Aotearoa New Zealand.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            {nzSupport.map(s => (
              <div key={s.name} style={{ background: b.white, borderRadius: 10, padding: "16px 20px", border: `1px solid ${b.border}`, textAlign: "left", minWidth: 160 }}>
                <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.85rem", color: b.red, marginBottom: 4 }}>{s.name}</p>
                <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.9rem", color: b.ink, marginBottom: 4 }}>{s.number}</p>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.stone }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <Btn onClick={() => setView("support")} variant="secondary" style={{ borderColor: b.red, color: b.red }}>
            View All Support Resources →
          </Btn>
        </div>
      </div>

      <SiteFooter setView={setView} onPortal={onPortal} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════ */
function AboutPage({ setView, onPortal = () => {} }) {
  return (
    <div style={{ paddingTop: 67 }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${b.purpleDark}, ${b.purple})`, padding: "60px 24px 70px", position: "relative", overflow: "hidden" }}>
        <RainbowBar />
        <svg style={{ position: "absolute", right: -30, bottom: -20, opacity: 0.07, pointerEvents: "none" }} width="280" height="200" viewBox="0 0 280 200" fill="none">
          <polygon points="0,80 120,20 240,80 210,80 120,36 30,80" fill="white" />
          <polygon points="40,130 160,70 280,130 250,130 160,86 70,130" fill="white" />
        </svg>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionLabel color="rgba(255,255,255,0.5)">About the Programme</SectionLabel>
          <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(2rem,5vw,3rem)", color: b.white, fontWeight: 900, marginBottom: 20, lineHeight: 1.05 }}>Ngā Piki me Ngā Heke</h1>
          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", marginBottom: 0 }}>The Rises and the Falls</p>
        </div>
      </div>
      <Wave color={b.offwhite} />

      {/* Content */}
      <div style={{ background: b.offwhite, padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {[
            {
              heading: "What is this programme?",
              body: "Ngā Piki me Ngā Heke is a research programme exploring the relationship between creative art practice and mental wellbeing. Participants engage in regular creative sessions — drawing, painting, sculpting, printmaking, or any medium that speaks to them — and track how their creative engagement connects to their overall sense of wellbeing over time.",
            },
            {
              heading: "Who is it for?",
              body: "The programme is designed for adults who are curious about the role creativity plays in their mental health. You don't need to be an experienced artist — in fact, many participants come with little or no formal art background. What matters is a willingness to show up and make something, session after session.",
            },
            {
              heading: "The research",
              body: "This programme is part of a broader research effort to understand how sustained creative practice — not just one-off workshops — affects wellbeing over weeks and months. By collecting wellbeing check-ins, written reflections, and artwork across the cohort, the research team can build a detailed and nuanced picture of what art-making does for people.",
            },
            {
              heading: "Tikanga and cultural grounding",
              body: "The name Ngā Piki me Ngā Heke — The Rises and the Falls — reflects the natural rhythm of life that te ao Māori holds at the centre of its understanding of wellbeing. Hauora, or holistic health, is not about the absence of difficulty but about navigating the rises and falls with connection, purpose, and strength. This programme is grounded in that understanding.",
            },
            {
              heading: "Participant privacy",
              body: "All data collected — wellbeing scores, journal reflections, and artwork — is stored securely and treated with full confidentiality. Participants may withdraw at any time. Research findings are reported at a cohort level only; no individual participant is identifiable in any published output without their explicit consent.",
            },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: i < 4 ? `1px solid ${b.border}` : "none" }}>
              <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.15rem", color: b.ink, marginBottom: 14 }}>{s.heading}</h2>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#3a3040", lineHeight: 1.9 }}>{s.body}</p>
            </div>
          ))}
          <Btn onClick={() => setView("contact")} variant="teal">Get in Touch →</Btn>
        </div>
      </div>
      <SiteFooter setView={setView} onPortal={onPortal} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════════════════ */
function ContactPage({ setView, onPortal = () => {} }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const inp = { width: "100%", padding: "13px 16px", fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.ink, background: b.warm, border: `2px solid ${b.border}`, borderRadius: 8, outline: "none", transition: "border-color 0.2s", marginTop: 8 };

  return (
    <div style={{ paddingTop: 67 }}>
      <div style={{ background: `linear-gradient(135deg, ${b.tealDark}, ${b.teal})`, padding: "60px 24px 70px", position: "relative", overflow: "hidden" }}>
        <RainbowBar />
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionLabel color="rgba(255,255,255,0.5)">Get in Touch</SectionLabel>
          <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(2rem,5vw,3rem)", color: b.white, fontWeight: 900, lineHeight: 1.05 }}>Contact Us</h1>
        </div>
      </div>
      <Wave color={b.offwhite} />

      <div style={{ background: b.offwhite, padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.2rem", color: b.ink, marginBottom: 16 }}>We'd love to hear from you</h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: "#3a3040", lineHeight: 1.85, marginBottom: 28 }}>
              Whether you have questions about the programme, want to find out about taking part, or need to reach your facilitator, use the form here and we'll get back to you within two business days.
            </p>
            <Divider />
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[["📧", "Email", "info@ngapiki.nz"], ["📍", "Location", "Aotearoa New Zealand"], ["⏱", "Response time", "Within 2 business days"]].map(([icon, lbl, val]) => (
                <div key={lbl} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", color: b.stone, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{lbl}</p>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: b.ink }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: b.white, borderRadius: 16, padding: "36px 32px", border: `1px solid ${b.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.1rem", color: b.ink, marginBottom: 12 }}>Message sent!</h3>
                <p style={{ fontFamily: "Georgia, serif", color: b.stone, fontSize: "0.9rem", lineHeight: 1.7 }}>We'll get back to you within two business days. Ngā mihi.</p>
              </div>
            ) : (
              <>
                {[["name","Your Name","text"],["email","Email Address","email"]].map(([key, ph, type]) => (
                  <div key={key} style={{ marginBottom: 18 }}>
                    <label style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone }}>
                      {ph}
                      <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} style={inp}
                        onFocus={e => e.target.style.borderColor = b.teal} onBlur={e => e.target.style.borderColor = b.border} />
                    </label>
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone }}>
                    Message
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="How can we help?" rows={5}
                      style={{ ...inp, resize: "vertical" }}
                      onFocus={e => e.target.style.borderColor = b.teal} onBlur={e => e.target.style.borderColor = b.border} />
                  </label>
                </div>
                <Btn onClick={() => { if (form.name && form.email && form.message) setSent(true); }} variant="teal" style={{ width: "100%", justifyContent: "center" }}>
                  Send Message
                </Btn>
              </>
            )}
          </div>
        </div>
      </div>
      <SiteFooter setView={setView} onPortal={onPortal} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SUPPORT PAGE
═══════════════════════════════════════════════════════ */
function SupportPage({ setView, onPortal = () => {} }) {
  const services = [
    {
      category: "Crisis & Immediate Support",
      color: b.red,
      items: [
        { name: "1737", contact: "Call or text 1737", desc: "Free call or text 1737 to talk with a trained counsellor, any time of the day or night.", available: "24/7" },
        { name: "Lifeline Aotearoa", contact: "0800 543 354", desc: "Provides crisis support and suicide prevention services to all New Zealanders.", available: "24/7" },
        { name: "Suicide Crisis Helpline", contact: "0508 828 865", desc: "If you or someone you know may be at risk. Staffed by trained counsellors.", available: "24/7" },
        { name: "Emergency Services", contact: "111", desc: "Call 111 if there is immediate risk to life.", available: "24/7" },
      ],
    },
    {
      category: "General Mental Health",
      color: b.purple,
      items: [
        { name: "Mental Health Foundation NZ", contact: "mentalhealth.org.nz", desc: "Resources, information, and support for mental health and wellbeing in NZ.", available: "Online" },
        { name: "Depression Helpline", contact: "0800 111 757", desc: "Free phone support for people experiencing depression or anxiety.", available: "24/7" },
        { name: "Healthline", contact: "0800 611 116", desc: "Free health advice from registered nurses. Can help direct you to the right service.", available: "24/7" },
        { name: "Anxiety NZ", contact: "0800 269 4389", desc: "Support, resources and treatment options for anxiety disorders.", available: "Mon–Fri" },
      ],
    },
    {
      category: "Rangatahi (Young People)",
      color: b.teal,
      items: [
        { name: "Youthline", contact: "0800 376 633", desc: "Free support for young people under 25. Call, text 234, or chat online.", available: "24/7" },
        { name: "What's Up", contact: "0800 942 8787", desc: "Free helpline for 5–18 year olds. Talk to a trained counsellor.", available: "Noon–11pm daily" },
        { name: "Kidsline", contact: "0800 543 754", desc: "For children up to 14 years old, staffed by trained youth workers.", available: "4pm–6pm weekdays" },
      ],
    },
    {
      category: "Māori & Pasifika Wellbeing",
      color: "#e67e22",
      items: [
        { name: "Māori Crisis Line", contact: "0800 269 4389", desc: "Te reo Māori and English support available. Culturally grounded care.", available: "24/7" },
        { name: "Le Va", contact: "leva.co.nz", desc: "Pacific mental health and wellbeing resources and services across Aotearoa.", available: "Online" },
        { name: "Whānau Ora", contact: "whanauora.nz", desc: "Whānau-centred support connecting families to health and social services.", available: "Online" },
      ],
    },
  ];

  return (
    <div style={{ paddingTop: 67 }}>
      <div style={{ background: `linear-gradient(135deg, ${b.ink}, #1a2e1a)`, padding: "60px 24px 70px", position: "relative", overflow: "hidden" }}>
        <RainbowBar />
        <svg style={{ position: "absolute", right: -30, top: 0, opacity: 0.06, pointerEvents: "none" }} width="280" height="220" viewBox="0 0 280 220" fill="none">
          <polygon points="0,80 120,20 240,80 210,80 120,36 30,80" fill={b.teal} />
          <polygon points="40,140 160,80 280,140 250,140 160,96 70,140" fill={b.teal} />
        </svg>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionLabel color="rgba(255,255,255,0.5)">Wellbeing Resources</SectionLabel>
          <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(2rem,5vw,3rem)", color: b.white, fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>Find Support</h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 540 }}>
            If you're going through a difficult time, free support is available in Aotearoa. You don't have to face it alone.
          </p>
        </div>
      </div>
      <Wave color={b.offwhite} />

      <div style={{ background: b.offwhite, padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Important notice */}
          <div style={{ background: b.redPale, border: `2px solid ${b.red}30`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>⚠️</span>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: "#3a1010", lineHeight: 1.75 }}>
              <strong>If you or someone else is in immediate danger, call 111.</strong> The services below are for support, information, and counselling — in a life-threatening emergency, always call 111 first.
            </p>
          </div>

          {services.map(cat => (
            <div key={cat.category} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 4, height: 24, background: cat.color, borderRadius: 2 }} />
                <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1rem", color: b.ink }}>{cat.category}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 16 }}>
                {cat.items.map(item => (
                  <div key={item.name} style={{ background: b.white, borderRadius: 12, padding: "22px 20px", border: `1px solid ${b.border}`, borderLeft: `4px solid ${cat.color}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.88rem", color: b.ink }}>{item.name}</p>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: "0.68rem", color: cat.color, background: cat.color + "15", padding: "2px 8px", borderRadius: 10, whiteSpace: "nowrap", marginLeft: 8 }}>{item.available}</span>
                    </div>
                    <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", color: cat.color, marginBottom: 8 }}>{item.contact}</p>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ background: b.purplePale, borderRadius: 12, padding: "28px 32px", border: `1px solid ${b.purple}20`, textAlign: "center" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.purple, lineHeight: 1.8 }}>
              Taking part in this programme and finding things difficult? Please reach out to your facilitator or use any of the services above. Your wellbeing comes first — always.
            </p>
          </div>
        </div>
      </div>
      <SiteFooter setView={setView} onPortal={onPortal} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTAL SECTION — brochure + chapters + dashboard
═══════════════════════════════════════════════════════ */

const PORTAL_PAGES = [
  { id: 0, slug: "welcome",   title: "Ngā Piki me Ngā Heke",            subtitle: "The Rises and the Falls" },
  { id: 1, slug: "chapter-1", title: "Te Tūāpae — The Context",         subtitle: "Chapter One of Three" },
  { id: 2, slug: "chapter-2", title: "Ngā Reo — The Voices",            subtitle: "Chapter Two of Three" },
  { id: 3, slug: "chapter-3", title: "Te Ara Whakamua — The Path Forward", subtitle: "Chapter Three · Final" },
];

const AgreementBox = ({ checked, onChange, accent = b.teal, label }) => (
  <div onClick={() => onChange(!checked)} style={{ padding: "20px 24px", background: b.white, borderRadius: 10, cursor: "pointer", border: `2px solid ${checked ? accent : b.border}`, boxShadow: checked ? `0 0 0 3px ${accent}18` : "none", transition: "all 0.25s" }}>
    <label style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer" }}>
      <div style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0, marginTop: 2, border: `2px solid ${checked ? accent : b.stone}`, background: checked ? accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
        {checked && <svg width="13" height="10" viewBox="0 0 13 10"><polyline points="1.5,5 5,8.5 11.5,1.5" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>}
      </div>
      <span style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.ink, lineHeight: 1.65 }}>{label}</span>
    </label>
  </div>
);

const PortalDots = ({ current, total, completedPages, onNavigate }) => (
  <div style={{ display: "flex", gap: 10, justifyContent: "center", padding: "14px 0", alignItems: "center" }}>
    {Array.from({ length: total }).map((_, i) => (
      <button key={i} onClick={() => completedPages.includes(i) && i !== current && onNavigate(i)}
        style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, border: "none", background: i === current ? b.red : completedPages.includes(i) ? b.teal : b.border, transition: "all 0.35s", cursor: completedPages.includes(i) && i !== current ? "pointer" : "default", padding: 0 }} />
    ))}
  </div>
);

const VideoBox = ({ label }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div onClick={() => setPlaying(!playing)} style={{ width: "100%", maxWidth: 720, margin: "0 auto", aspectRatio: "16/9", borderRadius: 14, background: `linear-gradient(135deg, ${b.purpleDark} 0%, ${b.purple} 55%, ${b.tealDark} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden", border: `2px solid ${b.purple}30`, boxShadow: "0 16px 56px rgba(84,48,146,0.28)" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }} viewBox="0 0 720 405" fill="none">
        <polygon points="0,135 180,45 360,135 315,135 180,68 45,135" fill="white" />
        <polygon points="0,180 180,90 360,180 315,180 180,113 45,180" fill="white" />
        <polygon points="360,225 540,135 720,225 675,225 540,158 405,225" fill="white" />
        <polygon points="360,270 540,180 720,270 675,270 540,203 405,270" fill="white" />
      </svg>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: playing ? `${b.red}ee` : `${b.red}bb`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s", boxShadow: `0 4px 28px ${b.red}55`, zIndex: 1 }}>
        {playing
          ? <div style={{ display: "flex", gap: 5 }}><div style={{ width: 5, height: 22, background: "#fff", borderRadius: 2 }} /><div style={{ width: 5, height: 22, background: "#fff", borderRadius: 2 }} /></div>
          : <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: "22px solid #fff", marginLeft: 6 }} />}
      </div>
      <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 14, fontFamily: "Georgia, serif", fontSize: 13, zIndex: 1 }}>{playing ? "Playing…" : label}</p>
    </div>
  );
};

function PortalWelcome({ onNext, onSkip }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, ${b.ink} 0%, #2a1545 50%, #0d2e2a 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "100px 24px 40px" }}>
      <svg style={{ position: "absolute", top: -40, right: -60, opacity: 0.06, pointerEvents: "none" }} width="500" height="400" viewBox="0 0 500 400" fill="none">
        <polygon points="0,150 200,30 400,150 360,150 200,60 40,150" fill={b.teal} />
        <polygon points="100,290 300,170 500,290 460,290 300,200 140,290" fill={b.purple} />
      </svg>
      <div style={{ maxWidth: 680, textAlign: "center", zIndex: 1, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(32px)", transition: "all 0.9s ease" }}>
        <div style={{ marginBottom: 32 }}><LogoFull size={110} /></div>
        <p style={{ fontFamily: "Georgia, serif", color: b.teal, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", marginBottom: 20 }}>He mihi maioha</p>
        <div style={{ width: 56, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, margin: "0 auto 28px", borderRadius: 2 }} />
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.95rem,2.2vw,1.12rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.9, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
          A guided journey through art, wellbeing, and understanding. This experience shares important context across three chapters before you begin your creative practice.
        </p>
        <button onClick={onNext} style={{ background: b.red, border: "none", color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "0.88rem", letterSpacing: 3, padding: "18px 56px", cursor: "pointer", borderRadius: 4, textTransform: "uppercase", transition: "all 0.25s", boxShadow: `0 6px 28px ${b.red}55` }}
          onMouseEnter={e => { e.currentTarget.style.background = b.redDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = b.red; e.currentTarget.style.transform = "none"; }}>
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

function ChapterPage({ chapter, title, te, body, videoLabel, onNext, onBack, completedPages, onNavigate }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, [chapter]);
  const themes = [
    { accent: b.teal,   gradient: `linear-gradient(135deg, ${b.purpleDark}, ${b.purple})`, pageBg: b.offwhite },
    { accent: b.red,    gradient: `linear-gradient(135deg, ${b.tealDark},   ${b.teal})`,   pageBg: "#f0fbf9"  },
    { accent: b.purple, gradient: `linear-gradient(135deg, ${b.redDark},    ${b.red})`,    pageBg: b.offwhite },
  ];
  const theme = themes[chapter - 1];
  return (
    <div style={{ minHeight: "100vh", background: theme.pageBg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: theme.gradient, padding: "100px 24px 60px", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", right: -40, top: -20, opacity: 0.07, pointerEvents: "none" }} width="320" height="220" viewBox="0 0 320 220" fill="none">
          <polygon points="0,90 130,22 260,90 228,90 130,40 32,90" fill="white" />
          <polygon points="0,130 130,62 260,130 228,130 130,80 32,130" fill="white" />
        </svg>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <PortalDots current={chapter - 1} total={3} completedPages={completedPages} onNavigate={onNavigate} />
          <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Georgia, serif", letterSpacing: 3, fontSize: 11, textTransform: "uppercase", marginBottom: 10 }}>Chapter {chapter} of 3</p>
          <h2 style={{ color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55em", display: "block", fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: 1, marginBottom: 6 }}>{te}</span>
            {title}
          </h2>
        </div>
      </div>
      <Wave color={theme.pageBg} />
      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", padding: "8px 24px 24px", width: "100%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all 0.6s ease 0.1s" }}>
        <div style={{ marginBottom: 36 }}><VideoBox label={videoLabel} /></div>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.12rem)", color: "#3a3040", lineHeight: 1.9, marginBottom: 32 }}>{body}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 16, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 28px", cursor: "pointer", borderRadius: 6, fontSize: "0.9rem" }}>← Back</button>
          <button onClick={onNext} style={{ background: theme.accent, border: "none", color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "0.78rem", letterSpacing: 2, padding: "14px 40px", cursor: "pointer", borderRadius: 6, textTransform: "uppercase", boxShadow: `0 4px 20px ${theme.accent}44` }}>
            {chapter < 3 ? "Continue →" : "Final Chapter →"}
          </button>
        </div>
      </div>

    </div>
  );
}

function FinalChapter({ onComplete, onBack, completedPages, onNavigate }) {
  const [agreed, setAgreed] = useState(false);
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  return (
    <div style={{ minHeight: "100vh", background: b.offwhite, display: "flex", flexDirection: "column" }}>
      <div style={{ background: `linear-gradient(135deg, ${b.ink}, #2a1545)`, padding: "100px 24px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <PortalDots current={2} total={3} completedPages={completedPages} onNavigate={onNavigate} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Georgia, serif", letterSpacing: 3, fontSize: 11, textTransform: "uppercase", marginBottom: 10 }}>Chapter 3 of 3 · Final</p>
          <h2 style={{ color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.55em", display: "block", fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic", letterSpacing: 1, marginBottom: 6 }}>Te Ara Whakamua</span>
            The Path Forward
          </h2>
        </div>
      </div>
      <Wave color={b.offwhite} />
      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", padding: "8px 24px 24px", width: "100%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(16px)", transition: "all 0.6s ease 0.1s" }}>
        <div style={{ marginBottom: 36 }}><VideoBox label="Click to play — Chapter Three: The path forward" /></div>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2vw,1.12rem)", color: "#3a3040", lineHeight: 1.9, marginBottom: 40 }}>
          We have traced the rises and the falls. This final chapter looks ahead, presenting the role that creative practice plays in mental health and wellbeing — and introduces the space where your own journey begins. Art has long been a vessel for things we cannot always say in words.
        </p>
        <div style={{ padding: "30px 32px", background: b.white, borderRadius: 14, border: `2px solid ${agreed ? b.purple : b.border}`, boxShadow: agreed ? `0 4px 28px ${b.purple}18` : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.35s", marginBottom: 32 }}>
          <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.9rem", color: b.ink, marginBottom: 6 }}>Formal Acknowledgement</h3>
          <div style={{ width: 36, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, borderRadius: 2, marginBottom: 16 }} />
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: "#3a3040", lineHeight: 1.8, marginBottom: 20 }}>By selecting the checkbox below, I confirm that I have engaged with all three chapters, reviewed the video content, and understand the nature of this art and wellbeing programme.</p>
          <AgreementBox checked={agreed} onChange={setAgreed} accent={b.purple} label="I agree — I have completed all chapters and acknowledge the content of this experience." />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 28px", cursor: "pointer", borderRadius: 6 }}>← Back</button>
          <button onClick={agreed ? onComplete : null} disabled={!agreed} style={{ background: agreed ? `linear-gradient(135deg, ${b.purple}, ${b.purpleDark})` : "#ccc", border: "none", color: b.white, fontFamily: "'Arial Black', sans-serif", fontSize: "0.78rem", letterSpacing: 2, padding: "16px 48px", cursor: agreed ? "pointer" : "not-allowed", borderRadius: 6, textTransform: "uppercase", opacity: agreed ? 1 : 0.5, boxShadow: agreed ? `0 6px 28px ${b.purple}50` : "none" }}>
            Enter the Portal ›
          </button>
        </div>
      </div>

    </div>
  );
}

function PortalSignIn({ onEnter }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  const canEnter = name.trim().length > 1;
  const inp = { width: "100%", padding: "14px 18px", fontFamily: "Georgia, serif", fontSize: "1rem", color: b.ink, background: b.warm, border: `2px solid ${b.border}`, borderRadius: 8, outline: "none", transition: "border-color 0.2s" };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, #f7f0ff, ${b.offwhite} 50%, #e8faf8)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "107px 24px 40px" }}>
      <div style={{ maxWidth: 460, width: "100%", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: "all 0.8s" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <LogoFull size={90} />
          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: b.stone, fontSize: "0.9rem", marginTop: 10 }}>Participant Portal</p>
          <div style={{ width: 40, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.teal})`, margin: "12px auto 0", borderRadius: 2 }} />
        </div>
        <div style={{ background: b.white, borderRadius: 16, padding: "40px 36px", boxShadow: `0 16px 60px ${b.purple}14`, border: `1px solid ${b.border}` }}>
          <p style={{ fontFamily: "Georgia, serif", color: b.stone, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 28, textAlign: "center" }}>Welcome to your personal creative space.</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 8 }}>Your Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="First name or preferred name" style={inp} onFocus={e => e.target.style.borderColor = b.teal} onBlur={e => e.target.style.borderColor = b.border} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 8 }}>
              Participant Code <span style={{ fontWeight: 300, fontFamily: "Georgia, serif", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
            </label>
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. NPH-2025-001" style={inp} onFocus={e => e.target.style.borderColor = b.purple} onBlur={e => e.target.style.borderColor = b.border} />
          </div>
          <button onClick={canEnter ? () => onEnter({ name: name.trim(), code: code.trim() }) : null} disabled={!canEnter} style={{ width: "100%", padding: "16px", background: canEnter ? `linear-gradient(135deg, ${b.teal}, ${b.tealDark})` : "#ccc", border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", letterSpacing: 2, textTransform: "uppercase", cursor: canEnter ? "pointer" : "not-allowed", borderRadius: 8, opacity: canEnter ? 1 : 0.5 }}>
            Enter →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════ */
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
      <p style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: b.ink, marginBottom: 12 }}>{label}</p>
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
  const handleSubmit = () => { onSave({ participant, scores, avgScore, journal, artTitle, artNote, fileCount: files.length, date: new Date().toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" }) }); setDone(true); };

  if (done) return <SubmitSuccess participant={participant} avgScore={avgScore} fileCount={files.length} entries={entries} onRestart={onRestart} />;

  const tabS = (id) => ({ flex: 1, padding: "14px 10px", fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", letterSpacing: 1, cursor: "pointer", border: "none", borderBottom: tab === id ? `3px solid ${b.purple}` : "3px solid transparent", background: "transparent", color: tab === id ? b.purple : b.stone, textTransform: "uppercase", transition: "all 0.2s", whiteSpace: "nowrap" });
  const inp = { width: "100%", padding: "12px 16px", fontFamily: "Georgia, serif", fontSize: "0.95rem", color: b.ink, background: b.warm, border: `2px solid ${b.border}`, borderRadius: 8, outline: "none", transition: "border-color 0.2s" };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, #f4f0fa 0%, ${b.offwhite} 50%, #eaf8f6 100%)` }}>
      <div style={{ background: `linear-gradient(135deg, ${b.ink}, #2a1545)`, padding: "0 24px", marginTop: 67 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "16px 0" }}>
          <p style={{ fontFamily: "Georgia, serif", color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>Kia ora, <strong style={{ color: b.white }}>{participant.name}</strong> — Session entry</p>
          <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "8px 16px", textAlign: "right" }}>
            <p style={{ fontFamily: "'Arial Black', sans-serif", color: b.teal, fontSize: "0.65rem", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Today</p>
            <p style={{ fontFamily: "Georgia, serif", color: "rgba(255,255,255,0.65)", fontSize: "0.82rem" }}>{new Date().toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 24px 60px", opacity: v ? 1 : 0, transition: "opacity 0.7s" }}>
        {entries.length > 0 && (
          <div style={{ marginBottom: 28, padding: "14px 20px", background: "rgba(255,255,255,0.7)", borderRadius: 12, border: `1px solid ${b.border}` }}>
            <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.65rem", letterSpacing: 1.5, textTransform: "uppercase", color: b.stone, marginBottom: 10 }}>Previous sessions</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {entries.map((e, i) => (
                <div key={i} style={{ padding: "5px 14px", background: b.warm, borderRadius: 20, border: `1px solid ${b.border}` }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone }}>{e.date}</span>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.teal, marginLeft: 8 }}>avg {e.avgScore}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", background: b.white, borderRadius: "12px 12px 0 0", border: `1px solid ${b.border}`, overflow: "hidden" }}>
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
            {FEELINGS.map(f => <LikertRow key={f.id} label={f.label} value={scores[f.id]} onChange={val => setScores(prev => ({ ...prev, [f.id]: val }))} />)}
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
              <button onClick={() => setTab("journal")} style={{ background: allScored ? b.teal : "#ccc", border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", padding: "12px 32px", borderRadius: 6, cursor: allScored ? "pointer" : "not-allowed", letterSpacing: 1, fontSize: "0.78rem", opacity: allScored ? 1 : 0.5, textTransform: "uppercase" }}>Next: Reflect →</button>
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
                <button key={prompt} onClick={() => setJournal(j => j ? j + "\n\n" + prompt + "\n" : prompt + "\n")} style={{ padding: "6px 14px", background: b.purplePale, border: `1px solid ${b.purple}30`, borderRadius: 20, fontFamily: "Georgia, serif", fontSize: "0.78rem", color: b.purple, cursor: "pointer" }}>+ {prompt}</button>
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
                    {f.preview ? <img src={f.preview} alt="artwork" style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} /> : <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>📄</div>}
                    <div style={{ padding: "6px 8px" }}><p style={{ fontFamily: "Georgia, serif", fontSize: "0.68rem", color: b.stone, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.file.name}</p></div>
                    <button onClick={e => { e.stopPropagation(); setFiles(prev => prev.filter(x => x.id !== f.id)); }} style={{ position: "absolute", top: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: b.red, border: "none", color: "#fff", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <button onClick={() => setTab("journal")} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "12px 24px", borderRadius: 6, cursor: "pointer" }}>← Back</button>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                {!allScored && <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.red }}>⚠ Complete wellbeing check-in first</p>}
                <button onClick={allScored ? handleSubmit : null} disabled={!allScored} style={{ background: allScored ? `linear-gradient(135deg, ${b.red}, ${b.redDark})` : "#ccc", border: "none", color: "#fff", fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", letterSpacing: 2, padding: "14px 36px", cursor: allScored ? "pointer" : "not-allowed", borderRadius: 8, textTransform: "uppercase", opacity: allScored ? 1 : 0.5, boxShadow: allScored ? `0 4px 20px ${b.red}44` : "none" }}>
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

function SubmitSuccess({ participant, avgScore, fileCount, entries, onRestart }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 80); }, []);
  const s = avgScore >= 4 ? { emoji: "✨", msg: "You seem to be in a good space today." } : avgScore >= 3 ? { emoji: "🍃", msg: "A steady day — every session matters." } : { emoji: "🌱", msg: "Thank you for showing up, even on harder days." };
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, #f4f0fa, ${b.offwhite} 60%, #e8faf8)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "107px 24px 40px" }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: "all 0.8s" }}>
        <div style={{ marginBottom: 20 }}><LogoFull size={80} /></div>
        <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>{s.emoji}</div>
        <h2 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.6rem", color: b.ink, marginBottom: 8 }}>Tēnā koe, {participant.name}</h2>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: b.stone, marginBottom: 36 }}>{s.msg}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 36 }}>
          {[[`${avgScore} / 5`,"Wellbeing score",b.teal],[entries.length,"Sessions total",b.purple],[fileCount,"Files uploaded",b.red]].map(([val,lbl,col]) => (
            <div key={lbl} style={{ background: b.white, borderRadius: 12, padding: "20px 12px", border: `2px solid ${col}20`, boxShadow: `0 4px 16px ${col}14` }}>
              <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.4rem", color: col, marginBottom: 6 }}>{val}</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: b.stone }}>{lbl}</p>
            </div>
          ))}
        </div>
        <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})`, margin: "0 auto 20px", borderRadius: 2 }} />
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: b.stone, fontSize: "0.9rem", opacity: 0.8, marginBottom: 32 }}>Ngā mihi nui</p>
        <button onClick={onRestart} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", fontSize: "0.88rem", padding: "12px 28px", borderRadius: 8, cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = b.purple; e.currentTarget.style.color = b.purple; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = b.border; e.currentTarget.style.color = b.stone; }}>
          ↺ Return to the beginning
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("home");
  const [portalPage, setPortalPage] = useState(0);
  const [completedPortalPages, setCompletedPortalPages] = useState([0]);
  const [participant, setParticipant] = useState(null);
  const [entries, setEntries] = useState([]);

  const isPortal = view.startsWith("portal");

  const goPortal = (page) => {
    setPortalPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const advancePortal = (next) => {
    setCompletedPortalPages(prev => prev.includes(next) ? prev : [...prev, next]);
    goPortal(next);
  };

  // Jump straight to sign-in, marking chapters as done
  const goPortalSignIn = () => {
    setCompletedPortalPages([0, 1, 2, 3]);
    setView("portal");
    setPortalPage(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setView2 = (v) => {
    if (v === "portal-welcome") { setView("portal"); setPortalPage(0); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chapterData = [
    { chapter: 1, title: "The Context", te: "Te Tūāpae", body: "Understanding the relationship between creative practice and mental wellbeing begins with understanding the landscape we share. This chapter introduces the foundational research — patterns of connection, expression, and healing that art-making can support across communities.", videoLabel: "Click to play — Chapter One overview" },
    { chapter: 2, title: "The Voices",  te: "Ngā Reo",   body: "Behind every piece of art is a story. This chapter brings together voices from participants and practitioners who have engaged with creative practice as part of their mental health journey. Their honesty and courage inform everything that follows.", videoLabel: "Click to play — Chapter Two: Community perspectives" },
  ];

  return (
    <div>
      {/* Site nav — hidden inside dashboard */}
      <SiteNav currentView={isPortal ? "portal" : view} setView={setView2} onPortal={goPortalSignIn} />

      {/* ── MAIN SITE PAGES ── */}
      {view === "home"    && <LandingPage setView={setView2} onPortal={goPortalSignIn} />}
      {view === "about"   && <AboutPage   setView={setView2} onPortal={goPortalSignIn} />}
      {view === "contact" && <ContactPage setView={setView2} onPortal={goPortalSignIn} />}
      {view === "support" && <SupportPage setView={setView2} onPortal={goPortalSignIn} />}

      {/* ── PORTAL FLOW ── */}
      {isPortal && (
        <>
          {portalPage === 0 && <PortalWelcome onNext={() => advancePortal(1)} onSkip={() => { setCompletedPortalPages([0,1,2,3]); goPortal(4); }} />}
          {portalPage === 1 && <ChapterPage {...chapterData[0]} onBack={() => goPortal(0)} onNext={() => advancePortal(2)} completedPages={completedPortalPages} onNavigate={goPortal} />}
          {portalPage === 2 && <ChapterPage {...chapterData[1]} onBack={() => goPortal(1)} onNext={() => advancePortal(3)} completedPages={completedPortalPages} onNavigate={goPortal} />}
          {portalPage === 3 && <FinalChapter onBack={() => goPortal(2)} onComplete={() => advancePortal(4)} completedPages={completedPortalPages} onNavigate={goPortal} />}
          {portalPage === 4 && <PortalSignIn onEnter={(p) => { setParticipant(p); advancePortal(5); }} />}
          {portalPage === 5 && <Dashboard participant={participant} entries={entries} onSave={(e) => setEntries(prev => [...prev, e])} onRestart={() => { setView2("home"); setPortalPage(0); setCompletedPortalPages([0]); setParticipant(null); setEntries([]); }} />}
        </>
      )}
    </div>
  );
}
