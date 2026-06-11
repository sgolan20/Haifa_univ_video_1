import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 9.1 — Summary (668 frames · 22.25s · audioStart 177.9s)
 *
 * Narration (relative):
 *   0.5s  "לסיכום,"
 *   1.5s  "אין רשימת מותר ואסור אחת שמתאימה לכל מצב."
 *   5.3s  "שימוש אחראי ב-AI דורש שיקול דעת,"
 *   8.2s  "להבין את מטרת המשימה,"
 *   9.8s  "את הציפיות של המרצה ואת המקום של הכלי בתוך תהליך הלמידה שלכם."
 *  15.8s  "במילים אחרות, לא כל שימוש ב-AI הוא בעייתי, אבל כל שימוש דורש מחשבה."
 *  21.5s  "להתראות."
 */
const PILLARS = [
  { text: "מטרת המשימה", icon: "🎯", color: COLORS.primary, at: 246 },
  { text: "ציפיות המרצה", icon: "🎓", color: COLORS.accent, at: 295 },
  { text: "מקום הכלי בלמידה", icon: "🧩", color: COLORS.secondary, at: 351 },
];

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 100, mass: 0.75 } });
  const headline = spring({ frame: frame - 44, fps, config: { damping: 15, stiffness: 88, mass: 0.85 } });
  const judgment = spring({ frame: frame - 159, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const closing = spring({ frame: frame - 468, fps, config: { damping: 14, stiffness: 95, mass: 0.8 } });
  const bye = interpolate(frame, [625, 645], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_summary.png" dur={668} maxOpacity={0.5} />
      <Particles accent={COLORS.accent} />

      {/* "לסיכום" badge */}
      <div style={{ position: "absolute", top: 64, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: badge, transform: `scale(${badge})` }}>
        <span style={{ padding: "9px 30px", borderRadius: 999, background: `${COLORS.primary}1f`, border: `1.5px solid ${COLORS.primary}`, fontSize: 25, fontWeight: 800, color: COLORS.primary, direction: "rtl" }}>
          לסיכום
        </span>
      </div>

      {/* headline */}
      <div style={{ position: "absolute", top: 135, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.92, 1])})` }}>
        <div style={{ maxWidth: 1100, textAlign: "center", direction: "rtl", fontSize: 46, fontWeight: 900, color: COLORS.text, lineHeight: 1.3, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
          אין רשימת <span style={{ color: "#22c55e" }}>״מותר</span> <span style={{ color: COLORS.warning }}>ואסור״</span> אחת שמתאימה לכל מצב
        </div>
      </div>

      {/* judgment line */}
      <div style={{ position: "absolute", top: 268, left: 0, right: 0, textAlign: "center", opacity: judgment }}>
        <span style={{ fontSize: 30, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>
          שימוש אחראי ב-AI דורש <span style={{ color: COLORS.accent, fontWeight: 900 }}>שיקול דעת</span> — להבין:
        </span>
      </div>

      {/* the three pillars */}
      <div style={{ position: "absolute", top: 348, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30, direction: "rtl" }}>
        {PILLARS.map((p, i) => {
          const pop = spring({ frame: frame - p.at, fps, config: { damping: 13, stiffness: 105, mass: 0.7 } });
          const float = Math.sin((frame + i * 45) * 0.05) * 4;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 32px", borderRadius: 18, direction: "rtl", background: `linear-gradient(160deg, ${p.color}16 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(12px)", border: `1.5px solid ${p.color}66`, boxShadow: `0 0 30px ${p.color}1c`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <span style={{ fontSize: 34 }}>{p.icon}</span>
              <span style={{ fontSize: 29, fontWeight: 800, color: COLORS.text }}>{p.text}</span>
            </div>
          );
        })}
      </div>

      {/* closing message */}
      <div style={{ position: "absolute", bottom: 92, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: closing, transform: `translateY(${interpolate(closing, [0, 1], [22, 0])}px)` }}>
        <div style={{ maxWidth: 1150, padding: "22px 44px", borderRadius: 20, textAlign: "center", direction: "rtl", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(14px)", border: `1.5px solid ${COLORS.accent}55`, boxShadow: `0 0 40px ${COLORS.accent}22`, fontSize: 33, fontWeight: 800, color: COLORS.text, lineHeight: 1.4 }}>
          לא כל שימוש ב-AI הוא <span style={{ color: "#fca5a5" }}>בעייתי</span> — אבל כל שימוש דורש <span style={{ color: COLORS.accent }}>מחשבה</span>
        </div>
      </div>

      {/* goodbye */}
      <div style={{ position: "absolute", bottom: 34, left: 0, right: 0, textAlign: "center", opacity: bye }}>
        <span style={{ fontSize: 24, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>להתראות 👋</span>
      </div>
    </AbsoluteFill>
  );
};
