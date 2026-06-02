import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 11.1 — The guiding rule
 * Duration: 620 frames (20.68s) · audioStart 241.14s
 *
 * f0:    "הכלל" intro
 * f135:  big gold rule card "האם יש לי מקור…" + three checks (point · read · verify)
 * f468:  if not → stamp "נקודת פתיחה בלבד — לא ראיה אקדמית"
 *
 * Narration (relative):
 *   0.0s  "ולכן הכלל שחשוב לקחת מכאן הוא פשוט אך מהותי:"
 *   4.5s  "...'האם יש לי מקור שאני יכול להצביע עליו, לקרוא אותו בעצמי, ולבדוק אותו?'"
 *  15.6s  "אם התשובה היא לא, התייחסו לטקסט כנקודת פתיחה בלבד, ולא כראיה אקדמית."
 */
const CHECKS = [
  { icon: "👉", label: "להצביע עליו" },
  { icon: "📖", label: "לקרוא בעצמי" },
  { icon: "🔍", label: "לבדוק אותו" },
];

export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const card = spring({ frame: frame - 135, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);
  const stamp = spring({ frame: frame - 468, fps, config: { damping: 13, stiffness: 110, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="opening_bg.png" dur={620} maxOpacity={0.38} />
      <Particles />

      {/* intro */}
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center", transform: `scale(${intro})`, opacity: intro }}>
        <div style={{ fontSize: 36, fontWeight: 500, color: COLORS.textMuted, direction: "rtl" }}>הכלל שחשוב לקחת מכאן — פשוט אך מהותי:</div>
      </div>

      {/* gold rule card */}
      {frame > 128 && (
        <div style={{ position: "absolute", top: 230, left: "50%", transform: `translateX(-50%) scale(${card})`, opacity: card, width: 1040, padding: "44px 50px", borderRadius: 28, textAlign: "center", direction: "rtl", background: `linear-gradient(160deg, ${COLORS.accent}1f 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(16px)", border: `2px solid ${COLORS.accent}88`, boxShadow: `0 0 ${44 + glow * 30}px ${COLORS.accent}33` }}>
          <div style={{ fontSize: 50, fontWeight: 800, color: COLORS.accent, lineHeight: 1.4, textShadow: `0 0 30px ${COLORS.accent}55` }}>
            “האם יש לי מקור שאני יכול להצביע עליו, לקרוא, ולבדוק?”
          </div>
          {/* three checks */}
          <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 24, direction: "rtl" }}>
            {CHECKS.map((c, i) => <Check key={i} c={c} appearAt={200 + i * 50} />)}
          </div>
        </div>
      )}

      {/* "if not" stamp */}
      {frame > 460 && (
        <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center", transform: `scale(${stamp})`, opacity: stamp }}>
          <span style={{ display: "inline-block", padding: "16px 44px", borderRadius: 14, background: `${COLORS.warning}14`, border: `2px solid ${COLORS.warning}88`, fontSize: 34, fontWeight: 800, color: COLORS.warning, direction: "rtl" }}>
            אם לא — נקודת פתיחה בלבד, לא ראיה אקדמית
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Check: React.FC<{ c: { icon: string; label: string }; appearAt: number }> = ({ c, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt - 5) return null;
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  return (
    <div style={{ transform: `scale(${s})`, opacity: s, display: "flex", alignItems: "center", gap: 12, padding: "14px 30px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: `1.5px solid ${COLORS.accent}55`, fontSize: 30, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>
      <span style={{ fontSize: 30 }}>{c.icon}</span> {c.label}
    </div>
  );
};
