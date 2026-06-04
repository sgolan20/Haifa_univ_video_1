import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 2.1 — A simple decision model
 * Duration: 190 frames (6.35s) · audioStart 20.79s · bg decision_bg
 * "הצעתי היא לעבוד לפי מודל קבלת החלטות פשוט שאפשר לזכור ולהחיל תוך שניות."
 */
const DUR = 190;

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const sub = spring({ frame: frame - 70, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.06);
  const fadeOut = interpolate(frame, [DUR - 18, DUR], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY, opacity: fadeOut }}>
      <SceneBg img="decision_bg.png" dur={DUR} maxOpacity={0.6} />
      <Particles />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ transform: `scale(${title})`, opacity: title, fontSize: 26, fontWeight: 700, color: COLORS.accent, direction: "rtl", letterSpacing: 2 }}>
          ההצעה שלי
        </div>
        <div style={{ transform: `scale(${title})`, opacity: title, fontSize: 60, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1300, textShadow: `0 0 ${36 + glow * 26}px ${COLORS.primary}55, 0 2px 16px rgba(0,0,0,0.8)` }}>
          מודל קבלת החלטות פשוט
        </div>
        <div style={{ opacity: sub, transform: `translateY(${(1 - sub) * 18}px)`, fontSize: 36, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
          שאפשר לזכור — ולהחיל תוך שניות
        </div>
      </div>
    </AbsoluteFill>
  );
};
