import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Legend } from "recharts";

/* ─────────────────────────────────────────
   BRAND TOKENS
───────────────────────────────────────── */
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
  warm:       "#f5f3f0",
  border:     "#e5e0da",
  stone:      "#8a8290",
  white:      "#ffffff",
  panel:      "#ffffff",
  bg:         "#f4f2ef",
  sidebar:    "#14101e",
};

/* ─────────────────────────────────────────
   LOGO
───────────────────────────────────────── */
const LogoMark = ({ size = 36 }) => (
  <svg width={size * 1.4} height={size} viewBox="0 0 120 86" fill="none">
    <polygon points="10,28 34,10 58,28 52,28 34,16 16,28" fill={b.purple} />
    <polygon points="10,40 34,22 58,40 52,40 34,28 16,40" fill={b.purple} opacity="0.65" />
    <polygon points="62,46 86,28 110,46 104,46 86,34 68,46" fill={b.teal} />
    <polygon points="62,58 86,40 110,58 104,58 86,46 68,58" fill={b.teal} opacity="0.65" />
    <rect x="30" y="8" width="28" height="4" rx="2" fill={b.red} />
    <rect x="62" y="60" width="28" height="4" rx="2" fill={b.red} />
    <text x="60" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="rgba(255,255,255,0.4)" fontStyle="italic">me</text>
  </svg>
);

/* ─────────────────────────────────────────
   SEED DATA
───────────────────────────────────────── */
const PARTICIPANTS = [
  { id: "NPH-001", name: "Aroha W.",   code: "NPH-001", sessions: 6, lastSeen: "4 Mar 2026",  avgScore: 3.8, trend: "up",   artCount: 11 },
  { id: "NPH-002", name: "James T.",   code: "NPH-002", sessions: 4, lastSeen: "3 Mar 2026",  avgScore: 2.6, trend: "down", artCount: 7  },
  { id: "NPH-003", name: "Mere H.",    code: "NPH-003", sessions: 8, lastSeen: "5 Mar 2026",  avgScore: 4.2, trend: "up",   artCount: 15 },
  { id: "NPH-004", name: "David K.",   code: "NPH-004", sessions: 3, lastSeen: "1 Mar 2026",  avgScore: 3.1, trend: "flat", artCount: 5  },
  { id: "NPH-005", name: "Tania P.",   code: "NPH-005", sessions: 7, lastSeen: "5 Mar 2026",  avgScore: 3.9, trend: "up",   artCount: 13 },
  { id: "NPH-006", name: "Wiremu N.",  code: "NPH-006", sessions: 2, lastSeen: "28 Feb 2026", avgScore: 2.2, trend: "down", artCount: 3  },
];

const SESSIONS = {
  "NPH-001": [
    { date: "3 Feb",  mood: 2, energy: 2, creative: 3, connected: 2, journal: "Started with charcoal today. Felt reluctant at first — didn't know what to put on the page. Eventually drew shapes that felt like water. Calming once I got going.", art: ["charcoal_study_01.jpg"] },
    { date: "10 Feb", mood: 3, energy: 3, creative: 3, connected: 3, journal: "Tried watercolour washes. The unpredictability of the medium matched how I've been feeling. Some parts bled into each other in ways I didn't expect — that felt honest.", art: ["watercolour_01.jpg", "watercolour_detail.jpg"] },
    { date: "17 Feb", mood: 3, energy: 4, creative: 4, connected: 3, journal: "Much more energetic this session. Made something with bright oranges and reds. Surprised myself.", art: ["acrylic_bright_01.jpg"] },
    { date: "24 Feb", mood: 4, energy: 4, creative: 4, connected: 4, journal: "Started a series. Feels like I have a direction now. The work is becoming more intentional.", art: ["series_01.jpg", "series_02.jpg"] },
    { date: "3 Mar",  mood: 4, energy: 4, creative: 5, connected: 4, journal: "Deep focus today. Three hours felt like thirty minutes. I think this is what flow feels like.", art: ["series_03.jpg"] },
    { date: "4 Mar",  mood: 4, energy: 5, creative: 5, connected: 4, journal: "Finished the triptych. Showing it felt vulnerable but also right.", art: ["triptych_final.jpg", "triptych_detail.jpg"] },
  ],
  "NPH-002": [
    { date: "5 Feb",  mood: 2, energy: 1, creative: 2, connected: 2, journal: "Hard day. Couldn't really engage. Made marks but nothing felt meaningful. Showed up though.", art: ["marks_01.jpg"] },
    { date: "12 Feb", mood: 2, energy: 2, creative: 2, connected: 1, journal: "Struggled again. Tore up two pieces. Kept one fragment — there was something in the edges.", art: [] },
    { date: "19 Feb", mood: 3, energy: 2, creative: 3, connected: 2, journal: "Better than last week. Drew portraits of people I miss. Felt sad but also connected in a strange way.", art: ["portraits_01.jpg"] },
    { date: "3 Mar",  mood: 2, energy: 2, creative: 2, connected: 2, journal: "Back to feeling low. The portraits session feels distant now. Couldn't replicate that energy.", art: ["study_01.jpg"] },
  ],
  "NPH-003": [
    { date: "1 Feb",  mood: 3, energy: 3, creative: 4, connected: 4, journal: "Love working with clay. The physical resistance of the material grounds me. Made a small vessel.", art: ["clay_vessel_01.jpg"] },
    { date: "8 Feb",  mood: 4, energy: 4, creative: 4, connected: 4, journal: "Continuing the vessel series. Thinking about containment — what holds and what spills.", art: ["clay_vessel_02.jpg", "clay_vessel_03.jpg"] },
    { date: "15 Feb", mood: 4, energy: 4, creative: 5, connected: 4, journal: "Added texture with found materials. Bark, sand, a piece of fabric. Feels like landscape.", art: ["texture_01.jpg"] },
    { date: "22 Feb", mood: 5, energy: 5, creative: 5, connected: 5, journal: "Peak session. Everything flowed. The work almost made itself.", art: ["peak_01.jpg", "peak_02.jpg"] },
    { date: "1 Mar",  mood: 4, energy: 4, creative: 4, connected: 5, journal: "Photographed the full series. Seeing them together was moving.", art: ["series_full.jpg"] },
    { date: "4 Mar",  mood: 4, energy: 5, creative: 5, connected: 5, journal: "Began something new — large format. Exciting to have open space.", art: ["large_format_01.jpg", "large_format_02.jpg", "sketch_plan.jpg"] },
    { date: "5 Mar",  mood: 5, energy: 5, creative: 5, connected: 5, journal: "Incredible energy. The scale changes everything about how I think and move.", art: ["large_format_03.jpg"] },
    { date: "5 Mar b",mood: 4, energy: 4, creative: 5, connected: 4, journal: "Second session same day — unusual but the momentum was there.", art: ["large_format_04.jpg"] },
  ],
  "NPH-004": [
    { date: "10 Feb", mood: 3, energy: 3, creative: 3, connected: 2, journal: "First session. Nervous. Did some drawing exercises to warm up.", art: ["warmup_01.jpg"] },
    { date: "20 Feb", mood: 3, energy: 3, creative: 3, connected: 3, journal: "More comfortable. Tried collage. Cutting and arranging felt less exposed than drawing.", art: ["collage_01.jpg", "collage_02.jpg"] },
    { date: "1 Mar",  mood: 3, energy: 4, creative: 4, connected: 3, journal: "Found a rhythm with collage. Layering images from old magazines. Thinking about time.", art: ["collage_time_01.jpg"] },
  ],
  "NPH-005": [
    { date: "2 Feb",  mood: 3, energy: 3, creative: 3, connected: 3, journal: "Printmaking intro. The repetition is meditative.", art: ["print_01.jpg"] },
    { date: "9 Feb",  mood: 3, energy: 4, creative: 4, connected: 3, journal: "Playing with layers and colour overlaps. Each pull of the print surprises.", art: ["print_02.jpg", "print_03.jpg"] },
    { date: "16 Feb", mood: 4, energy: 4, creative: 4, connected: 4, journal: "Getting better at prediction but still leaving room for accident.", art: ["print_04.jpg"] },
    { date: "23 Feb", mood: 4, energy: 4, creative: 5, connected: 4, journal: "Best prints yet. The textures are more complex.", art: ["print_05.jpg", "print_06.jpg"] },
    { date: "2 Mar",  mood: 4, energy: 5, creative: 5, connected: 4, journal: "Edition of 12. Framed three. Gave one away — that felt significant.", art: ["edition_01.jpg"] },
    { date: "5 Mar",  mood: 4, energy: 5, creative: 5, connected: 5, journal: "Starting a new plate. The process itself has become familiar in a good way.", art: ["new_plate_01.jpg", "new_plate_02.jpg"] },
    { date: "5 Mar b",mood: 5, energy: 5, creative: 5, connected: 5, journal: "Something clicked today. The work is finally saying what I want it to say.", art: ["breakthrough_01.jpg"] },
  ],
  "NPH-006": [
    { date: "20 Feb", mood: 2, energy: 2, creative: 2, connected: 1, journal: "Very hard to be here. Did it anyway. Sat with the materials for a long time before touching them.", art: [] },
    { date: "27 Feb", mood: 2, energy: 2, creative: 3, connected: 2, journal: "Made small marks on paper. Nothing finished. But something started.", art: ["marks_small_01.jpg"] },
  ],
};

const artColors = [
  { bg: "#2d1f4a", label: "Mixed Media" },
  { bg: "#1a3a2e", label: "Acrylic" },
  { bg: "#3a1a1a", label: "Watercolour" },
  { bg: "#1a2a3a", label: "Printmaking" },
  { bg: "#2a3a1a", label: "Drawing" },
  { bg: "#3a2a1a", label: "Collage" },
];
const artColor = (f) => artColors[f.split("").reduce((a,c) => a + c.charCodeAt(0), 0) % artColors.length];

/* ─────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────── */
const ScoreBadge = ({ score }) => {
  const col = score >= 4 ? b.teal : score >= 3 ? "#e67e22" : b.red;
  const bg  = score >= 4 ? b.tealPale : score >= 3 ? "#fef3e2" : b.redPale;
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, background: bg, color: col, fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", fontWeight: 900 }}>{score} / 5</span>;
};

const TrendPill = ({ trend }) => {
  const map = { up: ["↑ Rising", b.teal, b.tealPale], down: ["↓ Falling", b.red, b.redPale], flat: ["→ Stable", b.stone, b.warm] };
  const [label, col, bg] = map[trend] || map.flat;
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, background: bg, color: col, fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem" }}>{label}</span>;
};

const StatCard = ({ label, value, accent = b.teal }) => (
  <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: "20px 22px", borderTop: `4px solid ${accent}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
    <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.9rem", color: b.ink, marginBottom: 4 }}>{value}</p>
    <p style={{ fontFamily: "Georgia, serif", fontSize: "0.76rem", color: b.stone, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</p>
  </div>
);

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */
const NAV = [
  { id: "overview",     label: "Overview",         icon: "◉" },
  { id: "participants", label: "Participants",      icon: "⊕" },
  { id: "scores",       label: "Wellbeing Scores", icon: "◈" },
  { id: "journals",     label: "Reflections",      icon: "◧" },
  { id: "artwork",      label: "Artwork Gallery",  icon: "◰" },
];

function Sidebar({ view, setView }) {
  return (
    <div style={{ width: 220, flexShrink: 0, background: b.sidebar, minHeight: "100vh", display: "flex", flexDirection: "column", position: "sticky", top: 0 }}>
      {/* Top accent */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${b.red}, ${b.purple}, ${b.teal})` }} />
      {/* Branding */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <LogoMark size={30} />
        <div style={{ marginTop: 10 }}>
          <p style={{ fontFamily: "'Arial Black', sans-serif", color: b.red, fontSize: "0.75rem", fontWeight: 900, letterSpacing: 0.5, lineHeight: 1.2 }}>NGĀ PIKI</p>
          <p style={{ fontFamily: "Georgia, serif", color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", fontStyle: "italic" }}>me</p>
          <p style={{ fontFamily: "'Arial Black', sans-serif", color: b.red, fontSize: "0.75rem", fontWeight: 900, letterSpacing: 0.5, lineHeight: 1.2 }}>NGĀ HEKE</p>
        </div>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "rgba(31,187,168,0.5)", fontSize: "0.68rem", letterSpacing: 0.5, marginTop: 6 }}>Researcher Portal</p>
      </div>
      {/* Nav */}
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {NAV.map(item => {
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => setView(item.id)} style={{
              width: "100%", textAlign: "left", padding: "11px 20px",
              background: active ? "rgba(31,187,168,0.12)" : "transparent",
              border: "none", borderLeft: active ? `3px solid ${b.teal}` : `3px solid transparent`,
              color: active ? b.teal : "rgba(255,255,255,0.42)",
              fontFamily: "Georgia, serif", fontSize: "0.84rem", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10, transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.42)"; }}>
              <span style={{ fontSize: "0.85rem", opacity: 0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>Research prototype · 2026<br />Data shown is mock data</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   OVERVIEW
───────────────────────────────────────── */
function Overview({ setView, setSelectedParticipant }) {
  const totalSessions = Object.values(SESSIONS).flat().length;
  const totalArt = Object.values(SESSIONS).flat().reduce((a, s) => a + s.art.length, 0);
  const avgAll = (PARTICIPANTS.reduce((a, p) => a + p.avgScore, 0) / PARTICIPANTS.length).toFixed(1);

  const cohortTrend = [
    { week: "Wk 1", avg: 2.5 },
    { week: "Wk 2", avg: 2.8 },
    { week: "Wk 3", avg: 3.1 },
    { week: "Wk 4", avg: 3.3 },
    { week: "Wk 5", avg: 3.6 },
    { week: "Wk 6", avg: 3.8 },
  ];

  const dist = [1,2,3,4,5].map(v => ({
    score: `Score ${v}`,
    count: Object.values(SESSIONS).flat().reduce((a, s) => a + [s.mood,s.energy,s.creative,s.connected].filter(x => x===v).length, 0),
    fill: [b.red, "#e67e22", "#f0c030", b.teal, b.purple][v-1],
  }));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.5rem", color: b.ink, fontWeight: 900, marginBottom: 4 }}>Research Overview</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone }}>Ngā Piki me Ngā Heke — Art & Wellbeing Programme · 2026 cohort</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: 14, marginBottom: 32 }}>
        <StatCard label="Participants" value={PARTICIPANTS.length} accent={b.teal} />
        <StatCard label="Total Sessions" value={totalSessions} accent={b.purple} />
        <StatCard label="Cohort Avg" value={avgAll} accent={b.red} />
        <StatCard label="Artworks Uploaded" value={totalArt} accent={b.teal} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", color: b.ink, marginBottom: 4 }}>Cohort Wellbeing Trend</h3>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.73rem", color: b.stone, marginBottom: 18 }}>Average score across all participants by week</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={cohortTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={b.border} />
              <XAxis dataKey="week" tick={{ fontFamily: "Georgia, serif", fontSize: 11, fill: b.stone }} />
              <YAxis domain={[1,5]} tick={{ fontFamily: "Georgia, serif", fontSize: 11, fill: b.stone }} />
              <Tooltip contentStyle={{ fontFamily: "Georgia, serif", fontSize: 11, border: `1px solid ${b.border}`, borderRadius: 6 }} />
              <Line type="monotone" dataKey="avg" stroke={b.teal} strokeWidth={2.5} dot={{ fill: b.teal, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
          <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", color: b.ink, marginBottom: 4 }}>Score Distribution</h3>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.73rem", color: b.stone, marginBottom: 18 }}>All Likert responses across the cohort</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={dist}>
              <CartesianGrid strokeDasharray="3 3" stroke={b.border} />
              <XAxis dataKey="score" tick={{ fontFamily: "Georgia, serif", fontSize: 11, fill: b.stone }} />
              <YAxis tick={{ fontFamily: "Georgia, serif", fontSize: 11, fill: b.stone }} />
              <Tooltip contentStyle={{ fontFamily: "Georgia, serif", fontSize: 11, border: `1px solid ${b.border}`, borderRadius: 6 }} />
              <Bar dataKey="count" radius={[4,4,0,0]}>
                {dist.map((entry, i) => (
                  <rect key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Flags */}
      <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, background: b.red, borderRadius: 2 }} />
          <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", color: b.ink }}>Participants to Follow Up</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PARTICIPANTS.filter(p => p.avgScore < 3 || p.trend === "down").map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: b.redPale, borderRadius: 8, border: `1px solid ${b.red}25`, flexWrap: "wrap", gap: 8 }}>
              <div>
                <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.85rem", color: b.ink }}>{p.name}</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: b.stone, marginLeft: 12 }}>{p.code}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ScoreBadge score={p.avgScore} />
                <TrendPill trend={p.trend} />
                <button onClick={() => { setSelectedParticipant(p.id); setView("participants"); }}
                  style={{ padding: "4px 14px", background: "transparent", border: `2px solid ${b.red}`, color: b.red, fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", borderRadius: 4, cursor: "pointer", letterSpacing: 0.5 }}>
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PARTICIPANTS
───────────────────────────────────────── */
function Participants({ selectedId, setSelectedId }) {
  const selected = selectedId ? PARTICIPANTS.find(p => p.id === selectedId) : null;
  const sessions = selectedId ? (SESSIONS[selectedId] || []) : [];
  const pColors = [b.teal, b.purple, b.red, "#e67e22", b.tealDark, b.purpleDark];

  if (selected) {
    const lineData = sessions.map(s => ({
      session: s.date, mood: s.mood, energy: s.energy, creative: s.creative, connected: s.connected,
      avg: +((s.mood + s.energy + s.creative + s.connected) / 4).toFixed(2),
    }));
    const radarData = ["mood","energy","creative","connected"].map(dim => ({
      dim: dim.charAt(0).toUpperCase() + dim.slice(1),
      avg: +(sessions.reduce((a,s) => a + s[dim], 0) / sessions.length).toFixed(1),
    }));
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
          <button onClick={() => setSelectedId(null)} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, fontFamily: "Georgia, serif", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem" }}>← All</button>
          <div>
            <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.3rem", color: b.ink }}>{selected.name}</h1>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone }}>{selected.code} · {selected.sessions} sessions · last seen {selected.lastSeen}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 12, marginBottom: 24 }}>
          <StatCard label="Sessions" value={selected.sessions} accent={b.teal} />
          <StatCard label="Avg Score" value={selected.avgScore} accent={b.purple} />
          <StatCard label="Artworks" value={selected.artCount} accent={b.red} />
          <StatCard label="Trend" value={selected.trend === "up" ? "↑ Rising" : selected.trend === "down" ? "↓ Falling" : "→ Stable"} accent={selected.trend === "up" ? b.teal : selected.trend === "down" ? b.red : b.stone} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, marginBottom: 20 }}>
          <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 22 }}>
            <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.8rem", color: b.ink, marginBottom: 18 }}>Session Scores Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={b.border} />
                <XAxis dataKey="session" tick={{ fontFamily: "Georgia, serif", fontSize: 10, fill: b.stone }} />
                <YAxis domain={[1,5]} tick={{ fontFamily: "Georgia, serif", fontSize: 10, fill: b.stone }} />
                <Tooltip contentStyle={{ fontFamily: "Georgia, serif", fontSize: 11, border: `1px solid ${b.border}`, borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontFamily: "Georgia, serif", fontSize: 11 }} />
                <Line type="monotone" dataKey="mood"      stroke={b.teal}   strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="energy"    stroke={b.purple} strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="creative"  stroke={b.red}    strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="connected" stroke="#e67e22"  strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 22 }}>
            <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.8rem", color: b.ink, marginBottom: 18 }}>Dimension Profile</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={b.border} />
                <PolarAngleAxis dataKey="dim" tick={{ fontFamily: "Georgia, serif", fontSize: 11, fill: b.stone }} />
                <Radar dataKey="avg" stroke={b.teal} fill={b.teal} fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 22px", borderBottom: `1px solid ${b.border}`, background: b.warm }}>
            <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.8rem", color: b.ink }}>Session Log</h3>
          </div>
          {sessions.map((s, i) => {
            const avg = ((s.mood+s.energy+s.creative+s.connected)/4).toFixed(1);
            return (
              <div key={i} style={{ padding: "14px 22px", borderBottom: i < sessions.length-1 ? `1px solid ${b.border}` : "none", display: "grid", gridTemplateColumns: "90px 1fr auto", gap: 14, alignItems: "start" }}>
                <div><p style={{ fontFamily: "Georgia, serif", fontSize: "0.76rem", color: b.stone, marginBottom: 4 }}>{s.date}</p><ScoreBadge score={parseFloat(avg)} /></div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.84rem", color: "#3a2840", lineHeight: 1.6, fontStyle: "italic" }}>"{s.journal.slice(0,110)}{s.journal.length>110?"…":""}"</p>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {s.art.length === 0
                    ? <span style={{ fontFamily: "Georgia, serif", fontSize: "0.7rem", color: b.stone, fontStyle: "italic" }}>No upload</span>
                    : s.art.map((a,j) => { const ap = artColor(a); return <div key={j} title={a} style={{ width: 30, height: 30, borderRadius: 4, background: ap.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "0.55rem" }}>🖼</span></div>; })
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.5rem", color: b.ink, fontWeight: 900, marginBottom: 4 }}>Participants</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone }}>{PARTICIPANTS.length} enrolled · click a row to view full profile</p>
      </div>
      <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr 0.7fr 0.8fr 0.7fr 0.7fr", padding: "12px 20px", background: b.warm, borderBottom: `1px solid ${b.border}` }}>
          {["Participant","Code","Sessions","Avg Score","Trend","Last Active"].map(h => (
            <span key={h} style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.65rem", color: b.stone, letterSpacing: 1, textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>
        {PARTICIPANTS.map((p, i) => (
          <div key={p.id} onClick={() => setSelectedId(p.id)}
            style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr 0.7fr 0.8fr 0.7fr 0.7fr", padding: "14px 20px", borderBottom: i<PARTICIPANTS.length-1 ? `1px solid ${b.border}` : "none", cursor: "pointer", transition: "background 0.12s", alignItems: "center" }}
            onMouseEnter={e => e.currentTarget.style.background = b.warm}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: pColors[i] + "20", border: `2px solid ${pColors[i]}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", color: pColors[i] }}>{p.name.split(" ").map(n=>n[0]).join("")}</span>
              </div>
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: b.ink }}>{p.name}</span>
            </div>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: b.stone }}>{p.code}</span>
            <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.9rem", color: b.ink }}>{p.sessions}</span>
            <ScoreBadge score={p.avgScore} />
            <TrendPill trend={p.trend} />
            <span style={{ fontFamily: "Georgia, serif", fontSize: "0.76rem", color: b.stone }}>{p.lastSeen}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCORES
───────────────────────────────────────── */
function Scores() {
  const [dim, setDim] = useState("avg");
  const dims = [{id:"avg",label:"Average"},{id:"mood",label:"Mood"},{id:"energy",label:"Energy"},{id:"creative",label:"Creative"},{id:"connected",label:"Connection"}];
  const allDates = [...new Set(Object.values(SESSIONS).flat().map(s=>s.date))].sort();
  const timelineData = allDates.map(date => {
    const row = { date };
    PARTICIPANTS.forEach(p => {
      const s = (SESSIONS[p.id]||[]).find(x=>x.date===date);
      if (s) row[p.id] = dim==="avg" ? +((s.mood+s.energy+s.creative+s.connected)/4).toFixed(2) : s[dim];
    });
    return row;
  });
  const pColors = [b.teal, b.purple, b.red, "#e67e22", b.tealDark, b.purpleDark];
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.5rem", color: b.ink, fontWeight: 900, marginBottom: 4 }}>Wellbeing Scores</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone }}>Likert scale data across all participants and sessions</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {dims.map(d => (
          <button key={d.id} onClick={() => setDim(d.id)} style={{ padding: "7px 16px", borderRadius: 20, border: `2px solid ${dim===d.id ? b.teal : b.border}`, background: dim===d.id ? b.tealPale : b.panel, color: dim===d.id ? b.tealDark : b.stone, fontFamily: "'Arial Black', sans-serif", fontSize: "0.7rem", cursor: "pointer", transition: "all 0.15s", letterSpacing: 0.5, textTransform: "uppercase" }}>{d.label}</button>
        ))}
      </div>
      <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.8rem", color: b.ink, marginBottom: 4 }}>{dims.find(d=>d.id===dim)?.label} — All Participants</h3>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.73rem", color: b.stone, marginBottom: 20 }}>Each line = one participant. Gaps = no session.</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke={b.border} />
            <XAxis dataKey="date" tick={{ fontFamily: "Georgia, serif", fontSize: 10, fill: b.stone }} />
            <YAxis domain={[1,5]} tick={{ fontFamily: "Georgia, serif", fontSize: 10, fill: b.stone }} />
            <Tooltip contentStyle={{ fontFamily: "Georgia, serif", fontSize: 11, border: `1px solid ${b.border}`, borderRadius: 6 }} />
            <Legend wrapperStyle={{ fontFamily: "Georgia, serif", fontSize: 11 }} />
            {PARTICIPANTS.map((p,i) => <Line key={p.id} type="monotone" dataKey={p.id} name={p.name} stroke={pColors[i]} strokeWidth={1.8} dot={false} connectNulls={false} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: b.panel, border: `1px solid ${b.border}`, borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <h3 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.8rem", color: b.ink, marginBottom: 20 }}>Average by Participant</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PARTICIPANTS.map((p,i) => {
            const s = SESSIONS[p.id]||[];
            const avg = s.length ? (s.reduce((a,x) => a + (dim==="avg"?(x.mood+x.energy+x.creative+x.connected)/4:x[dim]),0)/s.length).toFixed(1) : "—";
            return (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "110px 1fr 44px", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: b.stone }}>{p.name}</span>
                <div style={{ height: 8, background: b.warm, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${avg!=="—" ? (avg/5)*100 : 0}%`, background: pColors[i], borderRadius: 4, transition: "width 0.6s ease" }} />
                </div>
                <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.82rem", color: b.ink, textAlign: "right" }}>{avg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   JOURNALS
───────────────────────────────────────── */
function Journals() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const allEntries = Object.entries(SESSIONS).flatMap(([pid, sessions]) =>
    sessions.map(s => ({
      pid, name: PARTICIPANTS.find(p=>p.id===pid)?.name, date: s.date, journal: s.journal,
      avg: ((s.mood+s.energy+s.creative+s.connected)/4).toFixed(1),
      scores: {mood:s.mood,energy:s.energy,creative:s.creative,connected:s.connected},
    }))
  ).sort((a,b) => a.date > b.date ? -1 : 1);

  const filtered = allEntries.filter(e => {
    if (filter==="low" && parseFloat(e.avg)>=3) return false;
    if (filter==="high" && parseFloat(e.avg)<4) return false;
    if (search && !e.journal.toLowerCase().includes(search.toLowerCase()) && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const dimColors = { mood: b.teal, energy: b.purple, creative: b.red, connected: "#e67e22" };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.5rem", color: b.ink, fontWeight: 900, marginBottom: 4 }}>Reflections</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone }}>{allEntries.length} journal entries across all sessions</p>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reflections…"
          style={{ padding: "9px 14px", fontFamily: "Georgia, serif", fontSize: "0.85rem", border: `2px solid ${b.border}`, borderRadius: 8, outline: "none", background: b.panel, color: b.ink, minWidth: 220 }}
          onFocus={e=>e.target.style.borderColor=b.teal} onBlur={e=>e.target.style.borderColor=b.border} />
        <div style={{ display: "flex", gap: 6 }}>
          {[["all","All"],["low","Low scores"],["high","High scores"]].map(([id,lbl]) => (
            <button key={id} onClick={()=>setFilter(id)} style={{ padding: "7px 14px", borderRadius: 20, border: `2px solid ${filter===id ? b.purple : b.border}`, background: filter===id ? b.purplePale : b.panel, color: filter===id ? b.purple : b.stone, fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase" }}>{lbl}</button>
          ))}
        </div>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "0.78rem", color: b.stone }}>{filtered.length} entries</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((e,i) => {
          const key = `${e.pid}-${e.date}-${i}`;
          const open = expanded===key;
          return (
            <div key={key} style={{ background: b.panel, border: `1px solid ${open ? b.purple+"40" : b.border}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s", boxShadow: open ? `0 4px 20px ${b.purple}14` : "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div onClick={()=>setExpanded(open?null:key)} style={{ padding: "14px 20px", cursor: "pointer", display: "grid", gridTemplateColumns: "110px 1fr 80px 28px", gap: 14, alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.78rem", color: b.purple }}>{e.name}</p>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "0.7rem", color: b.stone }}>{e.date}</p>
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.84rem", color: "#3a2840", lineHeight: 1.5, fontStyle: "italic" }}>"{e.journal.slice(0,100)}{e.journal.length>100?"…":""}"</p>
                <ScoreBadge score={parseFloat(e.avg)} />
                <span style={{ color: b.stone, transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(90deg)" : "none", fontSize: "1.1rem" }}>›</span>
              </div>
              {open && (
                <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${b.border}` }}>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "0.92rem", color: "#3a2840", lineHeight: 1.85, marginTop: 16, marginBottom: 16, fontStyle: "italic" }}>"{e.journal}"</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {Object.entries(e.scores).map(([dim,val]) => (
                      <div key={dim} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: dimColors[dim]+"15", borderRadius: 20, border: `1px solid ${dimColors[dim]}30` }}>
                        <span style={{ fontFamily: "Georgia, serif", fontSize: "0.7rem", color: b.stone, textTransform: "capitalize" }}>{dim}</span>
                        <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.72rem", color: dimColors[dim] }}>{val}/5</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ARTWORK GALLERY
───────────────────────────────────────── */
function Artwork() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const allArt = Object.entries(SESSIONS).flatMap(([pid,sessions]) =>
    sessions.flatMap(s => s.art.map(a => ({
      pid, name: PARTICIPANTS.find(p=>p.id===pid)?.name,
      date: s.date, filename: a, journal: s.journal,
      avg: ((s.mood+s.energy+s.creative+s.connected)/4).toFixed(1),
      ...artColor(a),
    })))
  );

  const filtered = filter==="all" ? allArt : allArt.filter(a=>a.pid===filter);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.5rem", color: b.ink, fontWeight: 900, marginBottom: 4 }}>Artwork Gallery</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: b.stone }}>{allArt.length} uploaded works · click to view with journal context</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[["all","All Participants"],...PARTICIPANTS.map(p=>[p.id,p.name])].map(([id,lbl]) => (
          <button key={id} onClick={()=>setFilter(id)} style={{ padding: "7px 14px", borderRadius: 20, border: `2px solid ${filter===id ? b.teal : b.border}`, background: filter===id ? b.tealPale : b.panel, color: filter===id ? b.tealDark : b.stone, fontFamily: "'Arial Black', sans-serif", fontSize: "0.68rem", cursor: "pointer", letterSpacing: 0.5, textTransform: "uppercase", transition: "all 0.15s" }}>{lbl}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px,1fr))", gap: 14 }}>
        {filtered.map((a,i) => (
          <div key={i} onClick={()=>setSelected(a)}
            style={{ background: a.bg, borderRadius: 12, cursor: "pointer", overflow: "hidden", border: `2px solid transparent`, transition: "all 0.18s", boxShadow: "0 3px 12px rgba(0,0,0,0.12)" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(0,0,0,0.2)"; e.currentTarget.style.borderColor=b.teal+"60"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 3px 12px rgba(0,0,0,0.12)"; e.currentTarget.style.borderColor="transparent"; }}>
            <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {/* Mini chevron decoration in thumbnail */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 155 120" fill="none">
                <polygon points="0,50 60,20 120,50 105,50 60,30 15,50" fill="white" />
                <polygon points="35,80 95,50 155,80 140,80 95,60 50,80" fill="white" />
              </svg>
              <span style={{ fontSize: "2rem", opacity: 0.55 }}>🖼</span>
              <div style={{ position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.4)", borderRadius: 4, padding: "2px 7px" }}>
                <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.85)", letterSpacing: 0.5, textTransform: "uppercase" }}>{a.label}</span>
              </div>
            </div>
            <div style={{ padding: "9px 11px", background: "rgba(0,0,0,0.3)" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{a.filename}</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.45)" }}>{a.name} · {a.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div onClick={()=>setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(20,16,30,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background: b.panel, borderRadius: 18, overflow: "hidden", maxWidth: 540, width: "100%", boxShadow: "0 28px 90px rgba(0,0,0,0.5)" }}>
            <div style={{ background: selected.bg, height: 230, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} viewBox="0 0 540 230" fill="none">
                <polygon points="0,90 200,30 400,90 360,90 200,50 40,90" fill="white" />
                <polygon points="140,160 340,100 540,160 500,160 340,120 180,160" fill="white" />
              </svg>
              <span style={{ fontSize: "4rem", opacity: 0.45 }}>🖼</span>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <p style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.95rem", color: b.ink }}>{selected.filename}</p>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "0.76rem", color: b.stone, marginTop: 3 }}>{selected.name} · {selected.date}</p>
                  <div style={{ marginTop: 6 }}><ScoreBadge score={parseFloat(selected.avg)} /></div>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background: "transparent", border: `2px solid ${b.border}`, color: b.stone, width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>
              <div style={{ padding: "14px 16px", background: b.purplePale, borderRadius: 8, borderLeft: `4px solid ${b.purple}` }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#3a2840", lineHeight: 1.8, fontStyle: "italic" }}>"{selected.journal}"</p>
              </div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.68rem", color: b.stone, marginTop: 14, textAlign: "right", opacity: 0.6 }}>📎 In production this links to your storage backend (e.g. Google Drive)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function App() {
  const [view, setView] = useState("overview");
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [v, setV] = useState(false);
  useEffect(() => { setV(false); setTimeout(() => setV(true), 60); }, [view]);
  const handleSetView = (id) => { setView(id); if (id !== "participants") setSelectedParticipant(null); };
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: b.bg }}>

      <Sidebar view={view} setView={handleSetView} />
      <main style={{ flex: 1, padding: "36px 36px 60px", maxWidth: "calc(100vw - 220px)", opacity: v ? 1 : 0, transition: "opacity 0.35s ease" }}>
        {view === "overview"     && <Overview setView={handleSetView} setSelectedParticipant={setSelectedParticipant} />}
        {view === "participants" && <Participants selectedId={selectedParticipant} setSelectedId={setSelectedParticipant} />}
        {view === "scores"       && <Scores />}
        {view === "journals"     && <Journals />}
        {view === "artwork"      && <Artwork />}
      </main>
    </div>
  );
}
