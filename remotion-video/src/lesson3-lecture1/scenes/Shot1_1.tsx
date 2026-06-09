import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 1.1 — Opening (448 frames · 14.94s · audioStart 0s)
 *
 * The intro talking-head clip (added in FullVideo) covers frames 0–~166 while the
 * narrator says "ברוכים הבאים ליחידה...". This title card sits underneath and is
 * revealed as the clip fades out, while "בהרצאה זו נעסוק במושגי יסוד..." plays.
 *
 * Narration (relative):
 *   0.00s  "ברוכים הבאים ליחידה העוסקת ביושרה אקדמית בעידן של בינה מלאכותית."  (talking head)
 *   5.54s  "בהרצאה זו נעסוק במושגי יסוד שחשוב שכל סטודנט וסטודנטית יכירו..."
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title revealed as the talking-head clip fades (~f150)
  const title = spring({ frame: frame - 150, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const underline = interpolate(frame, [175, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub = spring({ frame: frame - 210, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);

  // Three concept chips appear while "מושגי יסוד" plays
  const chips = ["פלגיאט", "מקורות מומצאים", "חוסר הבנה"];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="opening_bg.png" dur={448} maxOpacity={0.75} />
      <Particles />

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            transform: `scale(${title})`,
            opacity: title,
            textShadow: `0 0 ${44 + glow * 34}px ${COLORS.primary}${Math.round(glow * 130).toString(16).padStart(2, "0")}, 0 2px 16px rgba(0,0,0,0.8)`,
            letterSpacing: "-1px",
          }}
        >
          יושרה אקדמית<br />
          <span style={{ fontSize: 58, fontWeight: 600, color: COLORS.textMuted }}>בעידן של </span>
          <span style={{ color: COLORS.primary, direction: "ltr", display: "inline-block" }}>AI</span>
        </div>

        <div style={{ marginTop: 22, height: 4, width: 540 * underline, borderRadius: 4, background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary}, ${COLORS.accent})`, boxShadow: `0 0 18px ${COLORS.primary}aa` }} />

        <div style={{ marginTop: 30, fontSize: 32, fontWeight: 600, color: COLORS.text, direction: "rtl", opacity: sub, transform: `scale(${sub})`, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          מושגי יסוד שכל סטודנט וסטודנטית צריכים להכיר
        </div>

        <div style={{ marginTop: 28, display: "flex", gap: 18, direction: "rtl" }}>
          {chips.map((c, i) => {
            const s = spring({ frame: frame - (300 + i * 28), fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
            return (
              <div key={i} style={{ transform: `scale(${s})`, opacity: s, padding: "12px 26px", borderRadius: 999, background: `${COLORS.warning}1a`, border: `1.5px solid ${COLORS.warning}55`, fontSize: 26, fontWeight: 700, color: "#fca5a5", direction: "rtl" }}>
                {c}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
