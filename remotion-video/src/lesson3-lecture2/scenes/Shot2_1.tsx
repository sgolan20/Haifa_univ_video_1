import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 2.1 — Task goals (263 frames · 8.78s · audioStart 20.68s)
 *
 * Narration (relative):
 *   0.0s  "ההבדל נובע מהמטרות של המשימה."
 *   2.8s  "האם הדגש הוא על ידע תוכני?"
 *   5.0s  "על כתיבה?"
 *   6.0s  "על חשיבה עצמאית?"
 *   7.5s  "על תהליך?"
 */
const QUESTIONS = [
  { text: "ידע תוכני", icon: "📚", color: COLORS.primary, at: 84 },
  { text: "כתיבה", icon: "✍️", color: COLORS.accent, at: 149 },
  { text: "חשיבה עצמאית", icon: "🧠", color: COLORS.secondary, at: 180 },
  { text: "תהליך", icon: "🔄", color: "#22c55e", at: 224 },
];

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headline = spring({ frame: frame - 8, fps, config: { damping: 15, stiffness: 85, mass: 0.9 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_goals.png" dur={263} maxOpacity={0.5} />
      <Particles />

      {/* headline */}
      <div style={{ position: "absolute", top: 108, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.92, 1])})` }}>
        <div style={{ maxWidth: 1400, textAlign: "center", direction: "rtl", fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.2, textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          ההבדל נובע <span style={{ color: COLORS.accent }}>מהמטרות</span> של המשימה
        </div>
      </div>

      {/* the four goal questions */}
      <div style={{ position: "absolute", top: 292, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 560px)", gap: 42, direction: "rtl" }}>
          {QUESTIONS.map((q, i) => {
            const pop = spring({ frame: frame - q.at, fps, config: { damping: 13, stiffness: 105, mass: 0.7 } });
            const float = Math.sin((frame + i * 35) * 0.05) * 4;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 26, minHeight: 132, padding: "32px 44px", borderRadius: 24, direction: "rtl", background: `linear-gradient(160deg, ${q.color}18 0%, rgba(255,255,255,0.045) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${q.color}70`, boxShadow: `0 14px 46px rgba(0,0,0,0.35), 0 0 38px ${q.color}26`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
                <div style={{ minWidth: 82, height: 82, borderRadius: 22, background: `${q.color}24`, border: `2px solid ${q.color}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>{q.icon}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.textMuted }}>האם הדגש על</span>
                  <span style={{ fontSize: 46, fontWeight: 900, color: COLORS.text, lineHeight: 1.08 }}>{q.text}<span style={{ color: q.color }}>?</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
