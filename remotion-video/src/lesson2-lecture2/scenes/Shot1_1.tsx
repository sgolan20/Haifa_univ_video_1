import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 1.1 — Opening + the practical question
 * Duration: 624 frames (20.79s) · audioStart 0s · bg opening_bg
 *
 * f0:    title rises — "AI לעומת מנועי חיפוש" / "חלק ב' — האם זה מקור אמיתי?"
 * f28:   recap pill (part A: retrieval vs generation)
 * f207:  the question — "כיצד מקבלים החלטה נכונה בזמן אמת?"
 * f470:  "מה הכלי הנכון לאותו רגע?" over the two glowing screens
 */
const DUR = 624;
const DECISION_VISUAL_START = 300;

const DecisionChoiceVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - DECISION_VISUAL_START;
  const intro = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 75, mass: 0.9 },
  });
  const opacity = interpolate(local, [-10, 18, 145, 170], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const optionReveal = spring({
    frame: local - 18,
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.75 },
  });
  const cursorProgress = interpolate(local, [34, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const click = spring({
    frame: local - 82,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.45 },
  });
  const check = spring({
    frame: local - 92,
    fps,
    config: { damping: 13, stiffness: 150, mass: 0.5 },
  });
  const pulse = 0.55 + 0.35 * Math.sin(frame * 0.16);
  const cursorX = 1095 + cursorProgress * 125;
  const cursorY = 835 - cursorProgress * 180;

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${1.03 - intro * 0.03})`,
        transformOrigin: "center center",
      }}
    >
      <Img
        src={staticFile("lesson2-lecture2/images/decision_choice_bg.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "saturate(1.08) contrast(1.03)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.bgPrimary}c9 0%, ${COLORS.bgPrimary}20 38%, ${COLORS.bgPrimary}66 100%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 733,
          top: 545,
          width: 228,
          height: 275,
          borderRadius: 18,
          border: `2px solid ${COLORS.textMuted}77`,
          background: "rgba(10,14,26,0.18)",
          opacity: optionReveal * (1 - click * 0.45),
          transform: `translateY(${(1 - optionReveal) * 16}px)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 1018,
          top: 540,
          width: 245,
          height: 285,
          borderRadius: 20,
          border: `3px solid ${COLORS.primary}`,
          background: `${COLORS.primary}18`,
          boxShadow: `0 0 ${26 + pulse * 28 + click * 35}px ${COLORS.primary}88, inset 0 0 26px ${COLORS.primary}33`,
          opacity: optionReveal,
          transform: `translateY(${(1 - optionReveal) * 16}px) scale(${1 + click * 0.025})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 760,
          top: 835,
          width: 175,
          padding: "8px 14px",
          borderRadius: 999,
          background: "rgba(10,14,26,0.7)",
          color: COLORS.textMuted,
          fontSize: 25,
          fontWeight: 700,
          textAlign: "center",
          direction: "rtl",
          opacity: optionReveal * (1 - click * 0.55),
        }}
      >
        אפשרות א׳
      </div>

      <div
        style={{
          position: "absolute",
          left: 1048,
          top: 835,
          width: 185,
          padding: "8px 14px",
          borderRadius: 999,
          background: `${COLORS.primary}2b`,
          border: `1.5px solid ${COLORS.primary}aa`,
          color: COLORS.text,
          fontSize: 25,
          fontWeight: 800,
          textAlign: "center",
          direction: "rtl",
          opacity: optionReveal,
          boxShadow: `0 0 ${18 + pulse * 14}px ${COLORS.primary}66`,
        }}
      >
        הבחירה הנכונה
      </div>

      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          width: 34,
          height: 48,
          opacity: interpolate(local, [28, 38, 120, 138], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `rotate(-18deg) scale(${1 - click * 0.16})`,
          transformOrigin: "top left",
          filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.55))",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "0 solid transparent",
            borderRight: "31px solid transparent",
            borderTop: `46px solid ${COLORS.text}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 12,
            width: 9,
            height: 28,
            background: COLORS.text,
            transform: "rotate(-24deg)",
            borderRadius: 3,
          }}
        />
      </div>

      {check > 0 && (
        <div
          style={{
            position: "absolute",
            left: 1120,
            top: 610,
            width: 104,
            height: 104,
            borderRadius: "50%",
            background: `${COLORS.accent}24`,
            border: `3px solid ${COLORS.accent}`,
            color: COLORS.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 74,
            fontWeight: 900,
            opacity: check,
            transform: `scale(${check})`,
            boxShadow: `0 0 ${30 + pulse * 24}px ${COLORS.accent}88`,
            textShadow: `0 0 16px ${COLORS.accent}88`,
          }}
        >
          ✓
        </div>
      )}
    </AbsoluteFill>
  );
};

export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);
  const underline = interpolate(frame, [25, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // recap pill
  const recap = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  // title rises at ~f185
  const rise = spring({ frame: frame - 185, fps, config: { damping: 20, stiffness: 60, mass: 1 } });
  const titleY = rise * -400;
  const titleShrink = 1 - rise * 0.44;
  const recapFade = interpolate(frame, [185, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // the question (f207)
  const q = spring({ frame: frame - 207, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const q2 = spring({ frame: frame - 300, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const qFade = interpolate(frame, [445, 470], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // final "which tool" (f470)
  const fin = spring({ frame: frame - 470, fps, config: { damping: 15, stiffness: 95, mass: 0.8 } });
  const finPulse = 1 + 0.04 * Math.sin(frame * 0.18);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="opening_bg.png" dur={DUR} maxOpacity={0.78} />
      <Particles />
      {frame >= DECISION_VISUAL_START - 10 && frame < 472 && <DecisionChoiceVisual />}

      {/* title (rises to top) */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `translateY(${titleY}px) scale(${titleShrink})` }}>
        <div style={{ fontSize: 82, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", transform: `scale(${titleScale})`, textShadow: `0 0 ${44 + glow * 34}px ${COLORS.primary}${Math.round(glow * 130).toString(16).padStart(2, "0")}, 0 2px 16px rgba(0,0,0,0.8)`, letterSpacing: "-1px" }}>
          AI <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>לעומת</span> מנועי חיפוש
        </div>
        <div style={{ marginTop: 14, height: 4, width: 520 * underline, borderRadius: 4, background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`, boxShadow: `0 0 18px ${COLORS.primary}aa` }} />
        <div style={{ marginTop: 20, fontSize: 36, fontWeight: 600, color: COLORS.accent, direction: "rtl", opacity: subOpacity, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          חלק ב' — האם זה מקור אמיתי?
        </div>
      </div>

      {/* recap pill */}
      {frame > 28 && frame < 215 && (
        <div style={{ position: "absolute", top: 660, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: recap * recapFade }}>
          <div style={{ transform: `scale(${recap})`, padding: "16px 38px", borderRadius: 999, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: `1.5px solid ${COLORS.textMuted}44`, fontSize: 30, fontWeight: 500, color: COLORS.textMuted, direction: "rtl" }}>
            בחלק א' הבנו: <span style={{ color: COLORS.primary, fontWeight: 700 }}>שליפה</span> מול <span style={{ color: COLORS.secondary, fontWeight: 700 }}>יצירה</span>
          </div>
        </div>
      )}

      {/* the real-time question */}
      {frame > 200 && frame < 475 && (
        <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: qFade }}>
          <div style={{ transform: `scale(${q})`, opacity: q, fontSize: 50, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
            כיצד מקבלים החלטה נכונה <span style={{ color: COLORS.primary }}>בזמן אמת</span>?
          </div>
          <div style={{ transform: `scale(${q2})`, opacity: q2, fontSize: 38, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>
            מתי להשתמש — ובמה?
          </div>
        </div>
      )}

      {/* which tool, right now? */}
      {frame > 465 && (
        <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: fin, transform: `scale(${fin * finPulse})` }}>
          <div style={{ padding: "22px 56px", borderRadius: 999, background: `${COLORS.accent}1a`, border: `2px solid ${COLORS.accent}88`, fontSize: 46, fontWeight: 800, color: COLORS.accent, direction: "rtl", textShadow: `0 0 30px ${COLORS.accent}66` }}>
            מה הכלי הנכון לאותו רגע?
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
