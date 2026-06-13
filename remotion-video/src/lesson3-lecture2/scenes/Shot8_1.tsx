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
  { n: 1, text: "מהי המיומנות שהמשימה מבקשת לפתח?", color: COLORS.primary, at: 234 },
  { n: 2, text: "האם ה-AI תומך בלמידה — או מחליף אותה?", color: COLORS.accent, at: 329 },
  { n: 3, text: "האם התוצר משקף את החשיבה וההבנה שלכם?", color: COLORS.secondary, at: 445 },
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
      <div style={{ position: "absolute", top: 62, left: 0, right: 0, textAlign: "center", opacity: title, transform: `scale(${interpolate(title, [0, 1], [0.9, 1])})` }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, direction: "rtl", unicodeBidi: "isolate", fontSize: 66, fontWeight: 900, color: COLORS.text, textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          <span>אז איך יודעים?</span>
          <span style={{ color: COLORS.primary, direction: "ltr", unicodeBidi: "isolate" }}>🧭</span>
        </div>
      </div>

      {/* subtitle */}
      <div style={{ position: "absolute", top: 160, left: 0, right: 0, textAlign: "center", opacity: sub }}>
        <span style={{ fontSize: 34, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>
          במקרים רבים הגבול אינו חד וברור
        </span>
      </div>

      {/* "שלושה היבטים" chip */}
      <div style={{ position: "absolute", top: 220, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: intro, transform: `scale(${intro})` }}>
        <span style={{ padding: "10px 32px", borderRadius: 999, background: `${COLORS.accent}1f`, border: `1.5px solid ${COLORS.accent}88`, fontSize: 28, fontWeight: 800, color: COLORS.accent, direction: "rtl" }}>
          שלושה היבטים לבחינה
        </span>
      </div>

      {/* the 3 aspect cards */}
      <div style={{ position: "absolute", top: 308, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 44, direction: "rtl" }}>
        {ASPECTS.map((a, i) => {
          const pop = spring({ frame: frame - a.at, fps, config: { damping: 14, stiffness: 95, mass: 0.75 } });
          const float = Math.sin((frame + i * 50) * 0.045) * 5;
          return (
            <div key={i} style={{ width: 500, minHeight: 310, padding: "38px 34px", borderRadius: 28, direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, textAlign: "center", background: `linear-gradient(165deg, ${a.color}18 0%, rgba(255,255,255,0.045) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${a.color}70`, boxShadow: `0 16px 48px rgba(0,0,0,0.42), 0 0 38px ${a.color}22`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 66, height: 66, borderRadius: "50%", background: a.color, color: "#0a0e1a", fontSize: 36, fontWeight: 900, boxShadow: `0 0 24px ${a.color}88` }}>{a.n}</span>
              </div>
              <span style={{ fontSize: 36, fontWeight: 850, color: COLORS.text, lineHeight: 1.28 }}>{a.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
