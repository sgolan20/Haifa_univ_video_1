import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 8.1 — The danger: a convincing academic style hides the error
 * Duration: 596 frames (19.88s) · audioStart 180.82s
 *
 * f0:    a polished "AI answer" card with a confident citation
 * f185:  "trust" badges light up — מבנה לוגי · מינוח מקצועי
 * f400:  the citation is exposed as fabricated (red), wrapped by a familiar search UI
 *
 * Narration (relative):
 *   0.0s  "הסכנה הגדולה היא שהסגנון האקדמי המשכנע של התשובה מסתיר את השגיאה."
 *   6.1s  "כאשר טקסט מנוסח היטב... הנטייה הטבעית שלנו היא לסמוך עליו."
 *  13.3s  "וזה נכון במיוחד כאשר אותו טקסט מופיע בתוך ממשק מוכר ואמין כמו מנוע חיפוש."
 */
export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const card = spring({ frame: frame - 30, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const badges = spring({ frame: frame - 185, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const expose = interpolate(frame, [400, 440], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const errPulse = frame > 400 ? 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.12)) : 0;
  const wrap = spring({ frame: frame - 430, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="hallucination_bg.png" dur={596} maxOpacity={0.5} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.warning, direction: "rtl", textShadow: `0 0 30px ${COLORS.warning}55, 0 2px 12px rgba(0,0,0,0.6)` }}>
          הסגנון המשכנע מסתיר את השגיאה
        </div>
      </div>

      {/* polished answer card */}
      <div style={{ position: "absolute", top: 250, left: "50%", transform: `translateX(-50%) scale(${card})`, opacity: card, width: 940 }}>
        {/* familiar search wrapper that fades in late */}
        <div style={{ opacity: wrap, marginBottom: 12, display: "flex", alignItems: "center", gap: 10, direction: "rtl", fontSize: 24, color: COLORS.textMuted }}>
          <span style={{ fontSize: 26 }}>🔍</span> מתוך ממשק מוכר ואמין
        </div>
        <div
          style={{
            padding: "34px 40px",
            borderRadius: 18,
            textAlign: "right",
            direction: "rtl",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            border: `2px solid ${interpolate(expose, [0, 1], [0.2, 0.55]) > 0.4 ? COLORS.warning + "99" : "rgba(255,255,255,0.18)"}`,
            boxShadow: expose > 0.2 ? `0 0 50px ${COLORS.warning}22` : "0 0 30px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 400, color: COLORS.text, lineHeight: 1.7 }}>
            על פי מחקר שפורסם בכתב עת אקדמי מוביל, נמצא כי{" "}
            <span style={{ position: "relative", fontWeight: 700, color: expose > 0.3 ? COLORS.warning : COLORS.text }}>
              73% מהסטודנטים (Levin, 2023)
              {expose > 0.1 && (
                <span style={{ position: "absolute", left: 0, right: 0, top: "55%", height: 3, background: COLORS.warning, opacity: expose, boxShadow: `0 0 10px ${COLORS.warning}` }} />
              )}
            </span>{" "}
            מעדיפים את השיטה החדשה.
          </div>
        </div>

        {/* trust badges */}
        <div style={{ marginTop: 18, display: "flex", gap: 16, direction: "rtl", justifyContent: "center", transform: `scale(${badges})`, opacity: badges }}>
          <MiniBadge color={COLORS.primary} label="מנוסח היטב" />
          <MiniBadge color={COLORS.primary} label="מבנה לוגי" />
          <MiniBadge color={COLORS.primary} label="מינוח מקצועי" />
        </div>
      </div>

      {/* exposed error label */}
      {frame > 405 && (
        <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, textAlign: "center" }}>
          <span style={{ display: "inline-block", padding: "16px 44px", borderRadius: 999, background: `${COLORS.warning}1f`, border: `1.5px solid ${COLORS.warning}`, fontSize: 38, fontWeight: 800, color: COLORS.warning, direction: "rtl", opacity: 0.6 + errPulse * 0.4, textShadow: `0 0 ${18 + errPulse * 20}px ${COLORS.warning}` }}>
            ✗ הנתון והמקור — מפוברקים
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const MiniBadge: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ padding: "10px 22px", borderRadius: 999, background: `${color}18`, border: `1.5px solid ${color}66`, fontSize: 24, fontWeight: 600, color, direction: "rtl" }}>
    ✓ {label}
  </div>
);
