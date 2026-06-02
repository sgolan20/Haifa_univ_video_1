import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 6.1 — The principle: which kind of output did I get?
 * Duration: 451 frames (15.02s) · audioStart 126.18s
 *
 * f0:    question A "באיזה כלי השתמשתי?" appears
 * f150:  question A gets struck through (not the point)
 * f207:  question B "איזה סוג פלט קיבלתי?" enters in gold
 * f270:  two paths — ✔ source to check (turquoise) · ⚠ summarized text needs verifying (red)
 *
 * Narration (relative):
 *   0.0s  "אבל דווקא בגלל הטשטוש הזה... השאלה אינה 'באיזה כלי השתמשתי?',"
 *   6.9s  "אלא 'איזה סוג פלט קיבלתי?' האם הפניה למקור שניתן לבדוק, או טקסט מסוכם שדורש אימות?"
 */
export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const qA = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const strike = interpolate(frame, [150, 185], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const qAFade = interpolate(frame, [195, 225], [1, 0.35], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const qB = spring({ frame: frame - 207, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const qBGlow = 0.4 + 0.3 * Math.sin(frame * 0.08);

  const pathR = spring({ frame: frame - 270, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const pathL = spring({ frame: frame - 300, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="opening_bg.png" dur={451} maxOpacity={0.4} />
      <Particles />

      {/* question A (struck through) */}
      <div style={{ position: "absolute", top: 175, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", transform: `scale(${qA})`, opacity: qA * qAFade, direction: "rtl" }}>
          <div style={{ fontSize: 46, fontWeight: 600, color: COLORS.textMuted }}>“באיזה כלי השתמשתי?”</div>
          <div style={{ position: "absolute", top: "50%", right: 0, height: 4, width: `${strike * 100}%`, background: COLORS.warning, borderRadius: 4, boxShadow: `0 0 12px ${COLORS.warning}` }} />
        </div>
      </div>

      {/* question B (gold) */}
      {frame > 200 && (
        <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ transform: `scale(${qB})`, opacity: qB, fontSize: 72, fontWeight: 800, color: COLORS.accent, direction: "rtl", textShadow: `0 0 ${36 + qBGlow * 30}px ${COLORS.accent}88, 0 2px 14px rgba(0,0,0,0.6)` }}>
            “איזה סוג פלט קיבלתי?”
          </div>
        </div>
      )}

      {/* two paths */}
      {frame > 262 && (
        <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, direction: "rtl" }}>
          <PathCard scale={pathR} color={COLORS.primary} icon="✔" label="הפניה למקור" sub="שניתן לבדוק" good />
          <PathCard scale={pathL} color={COLORS.warning} icon="⚠" label="טקסט מסוכם" sub="דורש אימות" />
        </div>
      )}
    </AbsoluteFill>
  );
};

const PathCard: React.FC<{ scale: number; color: string; icon: string; label: string; sub: string; good?: boolean }> = ({ scale, color, icon, label, sub }) => (
  <div
    style={{
      transform: `scale(${scale})`,
      opacity: scale,
      width: 380,
      padding: "28px 0",
      borderRadius: 22,
      background: `linear-gradient(160deg, ${color}22 0%, rgba(255,255,255,0.03) 100%)`,
      backdropFilter: "blur(16px)",
      border: `2px solid ${color}88`,
      boxShadow: `0 0 44px ${color}26`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    }}
  >
    <div style={{ fontSize: 50 }}>{icon}</div>
    <div style={{ fontSize: 40, fontWeight: 800, color, direction: "rtl", textShadow: `0 0 22px ${color}55` }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 400, color: COLORS.textMuted, direction: "rtl" }}>{sub}</div>
  </div>
);
