import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 15.1 — Triple-check also reveals the plurality of voices
 * Duration: 405 frames (13.5s) · audioStart 232.3s · bg final_bg
 *
 * f0   triple-check is not only verification…
 * f117 …it reveals the plurality of voices around a topic
 * f228 identify disputes · tell stable knowledge from what's still open to debate
 */
const DUR = 405;

export const Shot15_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1 = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const l2 = spring({ frame: frame - 117, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const left = spring({ frame: frame - 228, fps, config: { damping: 15, stiffness: 88, mass: 0.8 } });
  const right = spring({ frame: frame - 252, fps, config: { damping: 15, stiffness: 88, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="final_bg.png" dur={DUR} maxOpacity={0.55} />
      <Particles />

      <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ opacity: l1, transform: `scale(${l1})`, fontSize: 40, fontWeight: 600, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
          בדיקה משולשת אינה רק <span style={{ color: COLORS.text }}>אימות</span>
        </div>
        {frame > 110 && (
          <div style={{ opacity: l2, transform: `scale(${l2})`, fontSize: 48, fontWeight: 800, color: COLORS.primary, direction: "rtl", textAlign: "center", maxWidth: 1250, textShadow: `0 0 ${30 + glow * 24}px ${COLORS.primary}55` }}>
            היא חושפת את ריבוי הקולות סביב הנושא
          </div>
        )}
      </div>

      {/* two outcomes */}
      {frame > 222 && (
        <div style={{ position: "absolute", top: 430, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 36, direction: "rtl" }}>
          <Outcome scale={right} color={COLORS.accent} title="לזהות מחלוקות" sub="היכן יש חילוקי דעות" />
          <Outcome scale={left} color={COLORS.primary} title="ידע יציב מול פתוח לדיון" sub="מה מבוסס — ומה עדיין נדון" />
        </div>
      )}
    </AbsoluteFill>
  );
};

const Outcome: React.FC<{ scale: number; color: string; title: string; sub: string }> = ({ scale, color, title, sub }) => (
  <div style={{ transform: `scale(${scale})`, opacity: scale, width: 480, padding: "28px 24px", borderRadius: 22, background: `linear-gradient(160deg, ${color}22 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${color}77`, boxShadow: `0 0 40px ${color}26`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
    <span style={{ fontSize: 36, fontWeight: 800, color, direction: "rtl", textAlign: "center", textShadow: `0 0 22px ${color}55` }}>{title}</span>
    <span style={{ fontSize: 28, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>{sub}</span>
  </div>
);
