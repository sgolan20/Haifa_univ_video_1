import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 5.1 — The simple rule
 * Duration: 164 frames (5.46s) · audioStart 81.28s · bg decision_bg
 * "הכלל הפשוט לזכור הוא: AI לחשיבה, מנוע חיפוש לעובדות."
 */
const DUR = 164;

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 2, fps, config: { damping: 16, stiffness: 95, mass: 0.7 } });
  const left = spring({ frame: frame - 30, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const right = spring({ frame: frame - 12, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const fadeOut = interpolate(frame, [DUR - 16, DUR], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY, opacity: fadeOut }}>
      <SceneBg img="decision_bg.png" dur={DUR} maxOpacity={0.5} />
      <Particles />

      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.accent, direction: "rtl", letterSpacing: 2 }}>הכלל הפשוט לזכור</div>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 50, direction: "rtl" }}>
        <RuleCard scale={right} color={COLORS.secondary} icon="🧠" name="AI" arrow="לחשיבה" />
        <div style={{ fontSize: 60, color: COLORS.textMuted, opacity: 0.5 }}>|</div>
        <RuleCard scale={left} color={COLORS.primary} icon="🔍" name="מנוע חיפוש" arrow="לעובדות" />
      </div>
    </AbsoluteFill>
  );
};

const RuleCard: React.FC<{ scale: number; color: string; icon: string; name: string; arrow: string }> = ({ scale, color, icon, name, arrow }) => (
  <div style={{ transform: `scale(${scale})`, opacity: scale, width: 420, padding: "40px 0", borderRadius: 26, background: `linear-gradient(160deg, ${color}26 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(16px)", border: `2px solid ${color}88`, boxShadow: `0 0 50px ${color}30`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <span style={{ fontSize: 64 }}>{icon}</span>
    <span style={{ fontSize: 46, fontWeight: 800, color, direction: "rtl", textShadow: `0 0 26px ${color}77` }}>{name}</span>
    <span style={{ fontSize: 38, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>↓ {arrow}</span>
  </div>
);
