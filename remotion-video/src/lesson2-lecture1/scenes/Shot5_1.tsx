import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 5.1 — Hybrid systems (the lines blur)
 * Duration: 950 frames (31.66s) · audioStart 94.52s
 *
 * f0:    title + tiny "search ⇄ AI" intro (the lines blur)
 * f285:  a Google-style AI Overview mockup — search engine shows an AI summary ABOVE the links
 * f650:  reverse note — AI models also embed source references
 * f815:  "מערכות היברידיות" emphasis
 *
 * Narration (relative):
 *   0.0s  "כאן חשוב לשים לב: גם מנועי חיפוש... וגם מודלי שפה אינם מנותקים ממקורות."
 *   9.5s  "מנועי חיפוש משלבים כיום שכבות של סיכום ופרשנות שמבוססות על מודלי שפה,"
 *  16.3s  "ולעיתים מציגים תשובה ישירה עוד לפני רשימת הקישורים."
 *  21.6s  "מודלי שפה רבים משלבים הפניות למקורות..."
 *  27.3s  "בפועל אנחנו פוגשים יותר ויותר מערכות היברידיות."
 */
export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  // intro (tiny search ⇄ AI), which shrinks up once the mockup enters
  const intro = spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const introOut = interpolate(frame, [270, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // final emphasis
  const emphasize = interpolate(frame, [815, 860], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="hybrid_bg.png" dur={950} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 60, fontWeight: 800, direction: "rtl", background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: `0 2px 16px rgba(0,0,0,0.5)`, filter: `drop-shadow(0 0 ${10 + emphasize * 24}px ${COLORS.primary}66)` }}>
          מערכות היברידיות
        </div>
        <div style={{ fontSize: 26, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", marginTop: 6 }}>הקווים בין הכלים מיטשטשים</div>
      </div>

      {/* intro: search ⇄ AI */}
      {frame < 300 && (
        <div style={{ position: "absolute", top: 360, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30, direction: "rtl", transform: `scale(${intro})`, opacity: intro * introOut }}>
          <MiniTool color={COLORS.primary} icon="🔍" label="מנוע חיפוש" />
          <div style={{ direction: "ltr", unicodeBidi: "isolate", fontSize: 50, fontWeight: 800, color: COLORS.accent, textShadow: `0 0 24px ${COLORS.accent}` }}>⇄</div>
          <MiniTool color={COLORS.secondary} icon="🧠" label="מודל AI" />
        </div>
      )}

      {/* Mockup A — Google AI Overview (search engine integrates an AI summary). Until ~f620. */}
      {frame > 278 && frame < 632 && (
        <div style={{ position: "absolute", top: 200, left: "50%", transform: `translateX(-50%)`, opacity: interpolate(frame, [600, 625], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <MockupCaption color={COLORS.primary} icon="🔍" text="מנוע חיפוש — מציג סיכום AI לפני הקישורים" />
          <AiOverviewMockup />
        </div>
      )}

      {/* Mockup B — AI answer with source references (LLMs embed sources). From ~f620. */}
      {frame > 620 && (
        <div style={{ position: "absolute", top: 200, left: "50%", transform: `translateX(-50%)`, opacity: interpolate(frame, [620, 648], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <MockupCaption color={COLORS.secondary} icon="🧠" text="מודל AI — מציג תשובה עם הפניות למקור" />
          <AiSourcesMockup />
        </div>
      )}
    </AbsoluteFill>
  );
};

const MockupCaption: React.FC<{ color: string; icon: string; text: string }> = ({ color, icon, text }) => (
  <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 24px", borderRadius: 999, background: `${color}1f`, border: `1.5px solid ${color}66`, fontSize: 26, fontWeight: 700, color, direction: "rtl" }}>
      <span style={{ fontSize: 24 }}>{icon}</span> {text}
    </span>
  </div>
);

const MiniTool: React.FC<{ color: string; icon: string; label: string }> = ({ color, icon, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px 34px", borderRadius: 18, background: `${color}18`, border: `1.5px solid ${color}66`, direction: "rtl" }}>
    <span style={{ fontSize: 44 }}>{icon}</span>
    <span style={{ fontSize: 28, fontWeight: 700, color }}>{label}</span>
  </div>
);

/** A faithful-ish Google "AI Overview" mockup: an AI summary shown ABOVE the organic links. */
const AiOverviewMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const box = spring({ frame: frame - 285, fps, config: { damping: 18, stiffness: 80, mass: 0.9 } });

  // summary text reveals progressively (AI "writing")
  const reveal = interpolate(frame, [340, 470], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sparkle = 0.6 + 0.4 * Math.sin(frame * 0.18);
  const linksGlow = interpolate(frame, [470, 520], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const summary = "בינה מלאכותית מצוינת לניסוח, הסבר וסיכום, בעוד מנוע חיפוש מפנה למקורות שניתן לאמת. לכל כלי תפקיד שונה.";

  return (
    <div style={{ width: 920, transform: `scale(${box})`, opacity: box, transformOrigin: "top center", borderRadius: 22, background: "#ffffff", boxShadow: "0 24px 70px rgba(0,0,0,0.55)", overflow: "hidden", direction: "rtl", fontFamily: FONT_FAMILY }}>
      {/* search bar */}
      <div style={{ padding: "16px 22px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #ebebeb" }}>
        <span style={{ fontSize: 22, color: "#4285F4" }}>🔍</span>
        <div style={{ flex: 1, fontSize: 24, color: "#3c4043", fontWeight: 500 }}>מתי כדאי להשתמש ב‑AI מול מנוע חיפוש?</div>
        <div style={{ display: "flex", gap: 5 }}>
          <Dot c="#4285F4" /><Dot c="#EA4335" /><Dot c="#FBBC05" /><Dot c="#34A853" />
        </div>
      </div>

      {/* AI Overview block */}
      <div style={{ padding: "18px 24px 20px", background: "linear-gradient(180deg, #f0f6ff 0%, #ffffff 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 24, filter: `drop-shadow(0 0 ${4 + sparkle * 6}px #8b5cf6)` }}>✦</span>
          <span style={{ fontSize: 23, fontWeight: 700, background: "linear-gradient(90deg,#4285F4,#9b72cb,#d96570)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>סקירה כללית של AI</span>
          <span style={{ fontSize: 18, color: "#5f6368", fontWeight: 500 }}>· סיכום אוטומטי</span>
        </div>
        <div style={{ position: "relative", fontSize: 25, lineHeight: 1.6, color: "#202124", fontWeight: 400 }}>
          <span style={{ opacity: 0.12 }}>{summary}</span>
          <span style={{ position: "absolute", inset: 0, overflow: "hidden", width: `${reveal * 100}%`, whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", whiteSpace: "normal", width: 872 }}>{summary}</span>
          </span>
        </div>
        {/* source chips */}
        <div style={{ marginTop: 14, display: "flex", gap: 10, opacity: linksGlow }}>
          {["📄 ספריית האוניברסיטה", "📄 מדריך אקדמי"].map((s, i) => (
            <span key={i} style={{ fontSize: 17, color: "#1a73e8", background: "#f1f3f4", borderRadius: 999, padding: "6px 14px", fontWeight: 500 }}>{s}</span>
          ))}
        </div>
      </div>

      {/* organic results below (dimmed — the AI summary sits ABOVE them) */}
      <div style={{ padding: "14px 24px 20px", opacity: 0.5 + linksGlow * 0.25, borderTop: "1px solid #f1f1f1" }}>
        <div style={{ fontSize: 14, color: "#5f6368", fontWeight: 600, marginBottom: 10 }}>תוצאות החיפוש הרגילות ↓</div>
        {[0, 1].map((i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#202124" }}>example.edu › article</div>
            <div style={{ fontSize: 20, color: "#1a0dab", fontWeight: 500 }}>מאמר אקדמי בנושא בינה מלאכותית בלימודים</div>
            <div style={{ height: 7, width: i === 0 ? 560 : 480, background: "#e3e6ea", borderRadius: 4, marginTop: 6 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Dot: React.FC<{ c: string }> = ({ c }) => <span style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />;

/** An AI assistant answer that cites sources you can click through to (LLM embedding references). */
const AiSourcesMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const box = spring({ frame: frame - 622, fps, config: { damping: 18, stiffness: 80, mass: 0.9 } });
  const reveal = interpolate(frame, [665, 770], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sparkle = 0.6 + 0.4 * Math.sin(frame * 0.18);

  const answer = "הבחירה תלויה בצורך: לסיכום, הסבר ורעיונות מודל AI מצוין; ולמקורות מאומתים שניתן לצטט — עדיף מנוע חיפוש.";
  const SOURCES = [
    { name: "ספריית האוניברסיטה", url: "lib.haifa.ac.il", at: 800 },
    { name: "מדריך אוריינות AI", url: "guide.edu/ai", at: 840 },
  ];

  return (
    <div style={{ width: 920, transform: `scale(${box})`, opacity: box, transformOrigin: "top center", borderRadius: 22, background: "linear-gradient(180deg, #181a2e 0%, #12131f 100%)", boxShadow: "0 24px 70px rgba(0,0,0,0.6)", overflow: "hidden", direction: "rtl", fontFamily: FONT_FAMILY, border: `1.5px solid ${COLORS.secondary}55` }}>
      {/* header */}
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: 24, filter: `drop-shadow(0 0 ${4 + sparkle * 7}px ${COLORS.secondary})` }}>✦</span>
        <span style={{ fontSize: 23, fontWeight: 700, color: COLORS.text }}>מודל AI</span>
        <span style={{ fontSize: 18, color: COLORS.textMuted, fontWeight: 500 }}>· תשובה עם מקורות</span>
      </div>

      {/* answer with inline citations */}
      <div style={{ padding: "20px 24px 8px" }}>
        <div style={{ position: "relative", fontSize: 25, lineHeight: 1.65, color: "#e6e8f0", fontWeight: 400 }}>
          <span style={{ opacity: 0.14 }}>
            {answer} <Cite n="1" /> <Cite n="2" />
          </span>
          <span style={{ position: "absolute", inset: 0, overflow: "hidden", width: `${reveal * 100}%`, whiteSpace: "nowrap" }}>
            <span style={{ display: "inline-block", whiteSpace: "normal", width: 872 }}>
              {answer} <Cite n="1" /> <Cite n="2" />
            </span>
          </span>
        </div>
      </div>

      {/* source cards (clickable → enter the site) */}
      <div style={{ padding: "8px 24px 22px" }}>
        <div style={{ fontSize: 19, color: COLORS.textMuted, fontWeight: 600, marginBottom: 12 }}>מקורות — לחיצה נכנסת לאתר:</div>
        <div style={{ display: "flex", gap: 16 }}>
          {SOURCES.map((s, i) => <SourceCard key={i} idx={i + 1} name={s.name} url={s.url} at={s.at} />)}
        </div>
      </div>
    </div>
  );
};

const Cite: React.FC<{ n: string }> = ({ n }) => (
  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, borderRadius: 7, background: `${COLORS.secondary}33`, border: `1px solid ${COLORS.secondary}88`, color: "#c4b5fd", fontSize: 17, fontWeight: 700, verticalAlign: "middle", direction: "ltr" }}>{n}</span>
);

const SourceCard: React.FC<{ idx: number; name: string; url: string; at: number }> = ({ idx, name, url, at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 16, stiffness: 95, mass: 0.8 } });
  const glow = 0.5 + 0.5 * Math.abs(Math.sin((frame - at) * 0.08));
  return (
    <div style={{ flex: 1, transform: `scale(${s})`, opacity: s, display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: `1.5px solid ${COLORS.primary}${frame - at > 0 ? "77" : "33"}`, boxShadow: `0 0 ${glow * 18}px ${COLORS.primary}22`, direction: "rtl" }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, background: `${COLORS.primary}22`, fontSize: 16 }}>🌐</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, direction: "rtl", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          <span style={{ color: COLORS.primary, marginLeft: 6 }}>[{idx}]</span>{name}
        </div>
        <div style={{ fontSize: 17, color: "#69b4ff", direction: "ltr", textAlign: "left" }}>{url}</div>
      </div>
      <span style={{ direction: "ltr", unicodeBidi: "isolate", fontSize: 22, color: COLORS.primary }}>↗</span>
    </div>
  );
};
