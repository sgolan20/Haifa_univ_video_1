import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 1.1 — Opening + the question (Google vs ChatGPT)
 * Duration: 819 frames (27.3s) · audioStart 0s
 *
 * Phase A (f0-240):   Lecture title over a living AI-vs-search background (Ken Burns)
 * Phase B (f240-600): Title rises; two "מתי?" questions + academic-integrity tag
 * Phase C (f600-819): The central question — Google card ⇄ ChatGPT card with "?"
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Living background: Ken Burns slow zoom + drift ── */
  const bgScale = interpolate(frame, [0, 819], [1.04, 1.16]);
  const bgX = interpolate(frame, [0, 819], [-15, 15]);
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Title ── */
  const titleScale = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const subOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);
  const underline = interpolate(frame, [25, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Title rises to top for phase B/C — one continuous motion from center to top
  const rise = spring({ frame: frame - 225, fps, config: { damping: 20, stiffness: 60, mass: 1 } });
  const titleY = rise * -390; // center (y≈540) → top (y≈150)
  const titleShrink = 1 - rise * 0.42;

  /* ── Phase B: questions ── */
  const q1 = spring({ frame: frame - 255, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const q2 = spring({ frame: frame - 320, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const integ = spring({ frame: frame - 510, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const phaseBOpacity = interpolate(frame, [575, 605], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  /* ── Phase C: Google vs ChatGPT ── */
  const introC = spring({ frame: frame - 600, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const cardL = spring({ frame: frame - 675, fps, config: { damping: 15, stiffness: 85, mass: 0.8 } });
  const cardR = spring({ frame: frame - 700, fps, config: { damping: 15, stiffness: 85, mass: 0.8 } });
  const qMark = spring({ frame: frame - 740, fps, config: { damping: 13, stiffness: 110, mass: 0.7 } });
  const qPulse = 1 + 0.05 * Math.sin(frame * 0.2);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      {/* living AI-vs-search background */}
      <Img
        src={staticFile("lesson2-lecture1/images/opening_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
          transform: `scale(${bgScale}) translateX(${bgX}px)`,
        }}
      />
      {/* readability overlay: darken edges + center */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${COLORS.bgPrimary}66 0%, ${COLORS.bgPrimary}cc 75%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${COLORS.bgPrimary}dd 0%, transparent 25%, transparent 70%, ${COLORS.bgPrimary}ee 100%)` }} />

      {/* floating particles */}
      <Particles />

      {/* ── TITLE (rises to top — continuous, no jump) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${titleY}px) scale(${titleShrink})`,
        }}
      >
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            transform: `scale(${titleScale})`,
            textShadow: `0 0 ${44 + glow * 34}px ${COLORS.primary}${Math.round(glow * 130).toString(16).padStart(2, "0")}, 0 2px 16px rgba(0,0,0,0.8)`,
            letterSpacing: "-1px",
          }}
        >
          AI <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>לעומת</span> מנועי חיפוש
        </div>
        {/* animated underline */}
        <div style={{ marginTop: 14, height: 4, width: 520 * underline, borderRadius: 4, background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`, boxShadow: `0 0 18px ${COLORS.primary}aa` }} />
        <div style={{ marginTop: 20, fontSize: 38, fontWeight: 600, color: COLORS.primary, direction: "rtl", opacity: subOpacity, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          חלק א' — מה הכלי עושה בפועל?
        </div>
      </div>

      {/* ── PHASE B: two "מתי?" questions + integrity tag ── */}
      {frame > 245 && frame < 610 && (
        <div style={{ position: "absolute", top: 340, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 28, opacity: phaseBOpacity }}>
          <div style={{ display: "flex", gap: 40, direction: "rtl" }}>
            <QuestionCard scale={q1} color={COLORS.secondary} label="מתי להשתמש ב‑AI?" />
            <QuestionCard scale={q2} color={COLORS.primary} label="מתי במנוע חיפוש?" />
          </div>
          <div
            style={{
              transform: `scale(${integ})`,
              opacity: integ,
              marginTop: 20,
              padding: "16px 40px",
              borderRadius: 999,
              background: `${COLORS.accent}1f`,
              border: `1.5px solid ${COLORS.accent}66`,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.accent,
              direction: "rtl",
              textShadow: `0 0 24px ${COLORS.accent}55`,
            }}
          >
            ⚖ קריטי ליושרה אקדמית
          </div>
        </div>
      )}

      {/* ── PHASE C: Google vs ChatGPT ── */}
      {frame > 600 && (
        <div style={{ position: "absolute", top: 270, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ transform: `scale(${introC})`, opacity: introC, fontSize: 34, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", marginBottom: 40 }}>
            נפתח בשאלה כביכול פשוטה:
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 50, direction: "rtl" }}>
            <ToolCard scale={cardR} color={COLORS.primary} name="Google" sub="מנוע חיפוש" img="search_network_nobg.png" />
            <div
              style={{
                transform: `scale(${qMark * qPulse})`,
                opacity: qMark,
                fontSize: 130,
                fontWeight: 800,
                color: COLORS.accent,
                textShadow: `0 0 50px ${COLORS.accent}88`,
              }}
            >
              ?
            </div>
            <ToolCard scale={cardL} color={COLORS.secondary} name="ChatGPT" sub="מודל AI" img="ai_brain_nobg.png" />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ── floating glowing particles ── */
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 12, y: 70, s: 5, c: COLORS.secondary, sp: 1.0, d: 0 },
    { x: 26, y: 40, s: 3, c: COLORS.secondary, sp: 0.7, d: 80 },
    { x: 78, y: 64, s: 5, c: COLORS.primary, sp: 0.9, d: 40 },
    { x: 88, y: 34, s: 4, c: COLORS.primary, sp: 1.2, d: 120 },
    { x: 50, y: 80, s: 3, c: COLORS.accent, sp: 0.8, d: 60 },
    { x: 66, y: 24, s: 3, c: COLORS.primary, sp: 1.1, d: 100 },
  ];
  return (
    <>
      {dots.map((p, i) => {
        const y = p.y - ((frame * p.sp + p.d) % 240) / 240 * 22;
        const op = 0.3 + 0.4 * Math.abs(Math.sin((frame * 0.03 + p.d) * 0.6));
        return (
          <div key={i} style={{ position: "absolute", left: `${p.x}%`, top: `${y}%`, width: p.s, height: p.s, borderRadius: "50%", background: p.c, opacity: op, boxShadow: `0 0 ${p.s * 3}px ${p.c}` }} />
        );
      })}
    </>
  );
};

const QuestionCard: React.FC<{ scale: number; color: string; label: string }> = ({ scale, color, label }) => (
  <div
    style={{
      transform: `scale(${scale})`,
      opacity: scale,
      padding: "26px 44px",
      borderRadius: 18,
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(14px)",
      border: `1.5px solid ${color}55`,
      boxShadow: `0 0 28px ${color}1f`,
      fontSize: 38,
      fontWeight: 700,
      color: COLORS.text,
      direction: "rtl",
    }}
  >
    {label}
  </div>
);

const ToolCard: React.FC<{ scale: number; color: string; name: string; sub: string; img: string }> = ({ scale, color, name, sub, img }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.06) * 7;
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity: scale,
        width: 380,
        padding: "30px 0 40px",
        borderRadius: 28,
        background: `linear-gradient(160deg, ${color}26 0%, rgba(255,255,255,0.03) 100%)`,
        backdropFilter: "blur(16px)",
        border: `2px solid ${color}88`,
        boxShadow: `0 0 60px ${color}30`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Img
        src={staticFile(`lesson2-lecture1/images/${img}`)}
        style={{ width: 180, height: 180, objectFit: "contain", transform: `translateY(${float}px)`, filter: `drop-shadow(0 0 22px ${color}aa)` }}
      />
      <div style={{ fontSize: 54, fontWeight: 800, color, direction: "ltr", textShadow: `0 0 30px ${color}88` }}>{name}</div>
      <div style={{ fontSize: 30, fontWeight: 500, color: COLORS.textMuted, direction: "rtl" }}>{sub}</div>
    </div>
  );
};
