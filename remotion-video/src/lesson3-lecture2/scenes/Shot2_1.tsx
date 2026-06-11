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
      <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.92, 1])})` }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 52, fontWeight: 900, color: COLORS.text, textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          ההבדל נובע <span style={{ color: COLORS.accent }}>מהמטרות</span> של המשימה
        </div>
      </div>

      {/* the four goal questions */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 420px)", gap: 34, direction: "rtl" }}>
          {QUESTIONS.map((q, i) => {
            const pop = spring({ frame: frame - q.at, fps, config: { damping: 13, stiffness: 105, mass: 0.7 } });
            const float = Math.sin((frame + i * 35) * 0.05) * 4;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "24px 32px", borderRadius: 20, direction: "rtl", background: `linear-gradient(160deg, ${q.color}16 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(12px)", border: `1.5px solid ${q.color}66`, boxShadow: `0 0 32px ${q.color}1f`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
                <div style={{ minWidth: 62, height: 62, borderRadius: 18, background: `${q.color}22`, border: `1.5px solid ${q.color}77`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{q.icon}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 19, fontWeight: 600, color: COLORS.textMuted }}>האם הדגש על</span>
                  <span style={{ fontSize: 34, fontWeight: 800, color: COLORS.text }}>{q.text}<span style={{ color: q.color }}>?</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
