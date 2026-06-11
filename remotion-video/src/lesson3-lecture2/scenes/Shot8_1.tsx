import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 8.1 — So how do you know? The 3 guiding aspects (572 frames · 19.05s · audioStart 158.85s)
 *
 * Narration (relative):
 *   0.3s  "אז איך יודעים?"
 *   1.9s  "במקרים רבים הגבול אינו חד וברור."
 *   5.0s  "לכן חשוב לחשוב על שלושה היבטים."
 *   7.8s  "מהי המיומנות שהמשימה מבקשת לפתח?"
 *  11.0s  "האם השימוש ב-AI תומך בלמידה או מחליף אותה?"
 *  14.9s  "האם התוצר הסופי עדיין משקף את החשיבה וההבנה שלכם?"
 */
const ASPECTS = [
  { n: 1, text: "מהי המיומנות שהמשימה מבקשת לפתח?", icon: "🎯", color: COLORS.primary, at: 234 },
  { n: 2, text: "האם ה-AI תומך בלמידה — או מחליף אותה?", icon: "🤝", color: COLORS.accent, at: 329 },
  { n: 3, text: "האם התוצר משקף את החשיבה וההבנה שלכם?", icon: "🪞", color: COLORS.secondary, at: 445 },
];

export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 100, mass: 0.75 } });
  const sub = spring({ frame: frame - 57, fps, config: { damping: 16, stiffness: 88, mass: 0.85 } });
  const intro = spring({ frame: frame - 149, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_goals.png" dur={572} maxOpacity={0.45} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, textAlign: "center", opacity: title, transform: `scale(${interpolate(title, [0, 1], [0.9, 1])})` }}>
        <span style={{ fontSize: 56, fontWeight: 900, color: COLORS.text, direction: "rtl", textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          אז איך יודעים? <span style={{ color: COLORS.primary }}>🧭</span>
        </span>
      </div>

      {/* subtitle */}
      <div style={{ position: "absolute", top: 165, left: 0, right: 0, textAlign: "center", opacity: sub }}>
        <span style={{ fontSize: 28, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>
          במקרים רבים הגבול אינו חד וברור
        </span>
      </div>

      {/* "שלושה היבטים" chip */}
      <div style={{ position: "absolute", top: 222, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: intro, transform: `scale(${intro})` }}>
        <span style={{ padding: "8px 26px", borderRadius: 999, background: `${COLORS.accent}1f`, border: `1.5px solid ${COLORS.accent}88`, fontSize: 23, fontWeight: 800, color: COLORS.accent, direction: "rtl" }}>
          שלושה היבטים לבחינה
        </span>
      </div>

      {/* the 3 aspect cards */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 34, direction: "rtl" }}>
        {ASPECTS.map((a, i) => {
          const pop = spring({ frame: frame - a.at, fps, config: { damping: 14, stiffness: 95, mass: 0.75 } });
          const float = Math.sin((frame + i * 50) * 0.045) * 5;
          return (
            <div key={i} style={{ width: 420, minHeight: 250, padding: "30px 30px", borderRadius: 24, direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", background: `linear-gradient(165deg, ${a.color}16 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(14px)", border: `1.5px solid ${a.color}66`, boxShadow: `0 14px 44px rgba(0,0,0,0.4), 0 0 34px ${a.color}1a`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: a.color, color: "#0a0e1a", fontSize: 28, fontWeight: 900, boxShadow: `0 0 22px ${a.color}88` }}>{a.n}</span>
                <span style={{ fontSize: 40 }}>{a.icon}</span>
              </div>
              <span style={{ fontSize: 29, fontWeight: 800, color: COLORS.text, lineHeight: 1.4 }}>{a.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
