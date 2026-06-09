import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../design/theme";

/** Living AI background: Ken Burns slow zoom + drift, fade-in, with readability overlays. */
export const SceneBg: React.FC<{ img: string; dur: number; maxOpacity?: number }> = ({ img, dur, maxOpacity = 0.7 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, dur], [1.04, 1.16]);
  const x = interpolate(frame, [0, dur], [-15, 15]);
  const op = interpolate(frame, [0, 40], [0, maxOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Img
        src={staticFile(`lesson3-lecture1/images/${img}`)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: op, transform: `scale(${scale}) translateX(${x}px)` }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${COLORS.bgPrimary}66 0%, ${COLORS.bgPrimary}cc 75%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${COLORS.bgPrimary}dd 0%, transparent 25%, transparent 70%, ${COLORS.bgPrimary}ee 100%)` }} />
    </>
  );
};

/** Red "סיכון N" risk badge used by the three risk scenes (5, 9, 10). */
export const RiskBadge: React.FC<{ n: number; label: string; scale: number }> = ({ n, label, scale }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 16, transform: `scale(${scale})`, opacity: scale, direction: "rtl" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 86, height: 86, borderRadius: 20, background: `${COLORS.warning}26`, border: `2px solid ${COLORS.warning}`, boxShadow: `0 0 30px ${COLORS.warning}55` }}>
      <span style={{ fontSize: 18, fontWeight: 700, color: "#fca5a5", lineHeight: 1 }}>סיכון</span>
      <span style={{ fontSize: 46, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{n}</span>
    </div>
    <div style={{ fontSize: 50, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: `0 0 24px ${COLORS.warning}55, 0 2px 12px rgba(0,0,0,0.7)` }}>{label}</div>
  </div>
);

/** A handful of glowing particles drifting upward with sine-pulsed opacity. */
export const Particles: React.FC<{ accent?: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 12, y: 70, s: 5, c: accent ?? COLORS.secondary, sp: 1.0, d: 0 },
    { x: 26, y: 40, s: 3, c: COLORS.secondary, sp: 0.7, d: 80 },
    { x: 78, y: 64, s: 5, c: COLORS.primary, sp: 0.9, d: 40 },
    { x: 88, y: 34, s: 4, c: COLORS.primary, sp: 1.2, d: 120 },
    { x: 50, y: 82, s: 3, c: accent ?? COLORS.accent, sp: 0.8, d: 60 },
    { x: 66, y: 24, s: 3, c: COLORS.primary, sp: 1.1, d: 100 },
  ];
  return (
    <>
      {dots.map((p, i) => {
        const y = p.y - ((frame * p.sp + p.d) % 240) / 240 * 22;
        const op = 0.3 + 0.4 * Math.abs(Math.sin((frame * 0.03 + p.d) * 0.6));
        return <div key={i} style={{ position: "absolute", left: `${p.x}%`, top: `${y}%`, width: p.s, height: p.s, borderRadius: "50%", background: p.c, opacity: op, boxShadow: `0 0 ${p.s * 3}px ${p.c}` }} />;
      })}
    </>
  );
};
