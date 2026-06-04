import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 6.1 — But how do we trust an AI answer? → FACT-CHECK-3X
 * Duration: 496 frames (16.52s) · audioStart 86.74s · bg factcheck_bg · gold
 *
 * f0   the problem — AI offered info that sounds reliable, but should we trust it?
 * f186 "the second model"
 * f270 brand reveal: FACT-CHECK-3X
 */
const DUR = 496;
const A = COLORS.accent;

export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p1 = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const p1b = spring({ frame: frame - 110, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const phase1Fade = interpolate(frame, [248, 272], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const intro = spring({ frame: frame - 186, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const introFade = interpolate(frame, [256, 276], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const brand = spring({ frame: frame - 274, fps, config: { damping: 15, stiffness: 80, mass: 0.9 } });
  const sub = spring({ frame: frame - 320, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.35 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.6} />
      <Particles />

      {/* phase 1 — the problem */}
      {frame < 272 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, opacity: phase1Fade }}>
          <div style={{ transform: `scale(${p1})`, opacity: p1, fontSize: 44, fontWeight: 600, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
            ה‑AI כבר הציע לנו מידע ש<span style={{ color: A, fontWeight: 800 }}>נשמע אמין</span>...
          </div>
          {frame > 105 && (
            <div style={{ transform: `scale(${p1b})`, opacity: p1b, fontSize: 50, fontWeight: 800, color: COLORS.warning, direction: "rtl", textAlign: "center", textShadow: `0 0 26px ${COLORS.warning}55` }}>
              אבל האם לסמוך עליו?
            </div>
          )}
        </div>
      )}

      {/* phase 2 — the second model */}
      {frame > 180 && frame < 278 && (
        <div style={{ position: "absolute", bottom: 180, left: 0, right: 0, textAlign: "center", transform: `scale(${intro})`, opacity: intro * introFade }}>
          <div style={{ fontSize: 36, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>כאן נכנס המודל השני</div>
        </div>
      )}

      {/* phase 3 — brand reveal */}
      {frame > 268 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
          <div style={{ transform: `scale(${brand})`, opacity: brand, fontSize: 92, fontWeight: 800, color: A, direction: "ltr", letterSpacing: "1px", textShadow: `0 0 ${50 + glow * 40}px ${A}${Math.round(glow * 150).toString(16).padStart(2, "0")}, 0 2px 18px rgba(0,0,0,0.8)` }}>
            FACT‑CHECK‑3X
          </div>
          <div style={{ opacity: sub, transform: `translateY(${(1 - sub) * 18}px)`, fontSize: 38, fontWeight: 600, color: COLORS.text, direction: "rtl", textAlign: "center" }}>
            מודל לאימות מהיר — לכתיבה אקדמית
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
