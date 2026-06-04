import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 16.1 — The final, deepest rule + goodbye
 * Duration: 303 frames (10.1s) · audioStart 245.8s · bg final_bg
 *
 * f0   label — the last and deepest rule
 * f105 don't settle for an answer that sounds good
 * f189 seek the answer you can stand behind
 * f282 goodbye
 */
const DUR = 303;
const A = COLORS.accent;

export const Shot16_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const label = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const bad = spring({ frame: frame - 105, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const good = spring({ frame: frame - 189, fps, config: { damping: 15, stiffness: 88, mass: 0.8 } });
  const bye = spring({ frame: frame - 282, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.35 * Math.sin(frame * 0.06);
  const fadeOut = interpolate(frame, [DUR - 20, DUR], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY, opacity: fadeOut }}>
      <SceneBg img="final_bg.png" dur={DUR} maxOpacity={0.55} />
      <Particles />

      <div style={{ position: "absolute", top: 140, left: 0, right: 0, textAlign: "center", transform: `scale(${label})`, opacity: label }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: A, direction: "rtl", letterSpacing: 2 }}>הכלל האחרון — והעמוק ביותר</div>
      </div>

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ opacity: bad, transform: `translateY(${(1 - bad) * 18}px)`, fontSize: 46, fontWeight: 600, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
          אל תסתפקו בתשובה ש<span style={{ color: COLORS.text }}>נשמעת טוב</span>
        </div>
        {frame > 182 && (
          <div style={{ opacity: good, transform: `scale(${good})`, fontSize: 58, fontWeight: 800, color: A, direction: "rtl", textAlign: "center", maxWidth: 1300, textShadow: `0 0 ${40 + glow * 32}px ${A}66, 0 2px 16px rgba(0,0,0,0.8)` }}>
            חפשו את התשובה שניתן לעמוד מאחוריה
          </div>
        )}
      </div>

      {frame > 278 && (
        <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, textAlign: "center", opacity: bye, transform: `scale(${bye})` }}>
          <div style={{ fontSize: 38, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>להתראות 👋</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
