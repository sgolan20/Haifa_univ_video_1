import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, FactStepper } from "./_shared";

/**
 * Shot 10.1 — T · Time-Stamp
 * Duration: 429 frames (14.3s) · audioStart 144.2s · bg factcheck_bg
 *
 * Narration:
 *   0.0s  "T Time Stamp."
 *   2.1s  "ודאו שהמקור עדכני ורלוונטי."
 *   4.8s  "נתון שהיה נכון לפני חמש שנים עלול להיות מיושן לחלוטין,"
 *   9.1s  "במיוחד בתחומים כמו טכנולוגיה, כלכלה ומדיניות ציבורית."
 *
 * Design: timeline visualization — "לפני 5 שנים" (outdated) → "היום" (current)
 *         + three domain tags appearing at the end.
 */
const DUR = 429;
const color = COLORS.primary;

const DOMAINS = ["טכנולוגיה 💻", "כלכלה 📈", "מדיניות ציבורית 🏛️"];

export const Shot10_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge   = spring({ frame: frame - 4,   fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const head    = spring({ frame: frame - 22,  fps, config: { damping: 16, stiffness: 90,  mass: 0.8 } });
  const glow    = 0.4 + 0.3 * Math.sin(frame * 0.06);

  // Timeline elements
  const oldCard = spring({ frame: frame - 144, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const line    = spring({ frame: frame - 190, fps, config: { damping: 20, stiffness: 60, mass: 1.2 } });
  const newCard = spring({ frame: frame - 230, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  // Domain tags
  const d0 = spring({ frame: frame - 273, fps, config: { damping: 16, stiffness: 95, mass: 0.7 } });
  const d1 = spring({ frame: frame - 303, fps, config: { damping: 16, stiffness: 95, mass: 0.7 } });
  const d2 = spring({ frame: frame - 333, fps, config: { damping: 16, stiffness: 95, mass: 0.7 } });
  const domainSprings = [d0, d1, d2];

  const lineWidth = interpolate(line, [0, 1], [0, 340], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
      <Particles />
      <FactStepper active={3} />

      {/* Header */}
      <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, direction: "ltr" }}>
          <div style={{ transform: `scale(${badge})`, opacity: badge, width: 110, height: 110, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, fontWeight: 800, color, background: `${color}1f`, border: `3px solid ${color}`, boxShadow: `0 0 ${40 + glow * 30}px ${color}66` }}>T</div>
          <div style={{ opacity: badge, fontSize: 42, fontWeight: 800, color, direction: "ltr", textShadow: `0 0 24px ${color}55` }}>Time-Stamp</div>
        </div>
        <div style={{ opacity: head, transform: `translateY(${(1 - head) * 16}px)`, fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          ודאו שהמקור עדכני ורלוונטי
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>

        {/* Old / outdated card */}
        <div style={{ transform: `scale(${oldCard})`, opacity: oldCard, width: 260, padding: "22px 26px", borderRadius: 18, background: `${COLORS.warning}14`, border: `2px solid ${COLORS.warning}55`, textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 38, marginBottom: 8 }}>⚠️</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fca5a5", marginBottom: 4 }}>לפני 5 שנים</div>
          <div style={{ fontSize: 16, color: COLORS.textMuted }}>נכון אז —<br />עלול להיות מיושן</div>
        </div>

        {/* Animated line + arrow */}
        <div style={{ display: "flex", alignItems: "center", position: "relative", width: 340 }}>
          <div style={{ height: 3, width: lineWidth, background: `linear-gradient(90deg, ${COLORS.warning} 0%, ${color} 100%)`, borderRadius: 99, boxShadow: `0 0 10px ${color}66` }} />
          <div style={{ opacity: line, fontSize: 22, color, marginLeft: -4 }}>▶</div>
        </div>

        {/* Current / valid card */}
        <div style={{ transform: `scale(${newCard})`, opacity: newCard, width: 260, padding: "22px 26px", borderRadius: 18, background: `${color}14`, border: `2px solid ${color}55`, textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 38, marginBottom: 8 }}>✅</div>
          <div style={{ fontSize: 22, fontWeight: 700, color, marginBottom: 4 }}>היום</div>
          <div style={{ fontSize: 16, color: COLORS.textMuted }}>מקור עדכני —<br />ניתן לשימוש אקדמי</div>
        </div>
      </div>

      {/* Domain tags */}
      <div style={{ position: "absolute", bottom: 100, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20 }}>
        {DOMAINS.map((d, i) => (
          <div key={i} style={{ transform: `scale(${domainSprings[i]})`, opacity: domainSprings[i], padding: "12px 28px", borderRadius: 999, background: `${color}18`, border: `1.5px solid ${color}44`, fontSize: 24, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>
            {d}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
