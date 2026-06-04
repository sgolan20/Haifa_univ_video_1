import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/** Living AI background: Ken Burns slow zoom + drift, fade-in, with readability overlays. */
export const SceneBg: React.FC<{ img: string; dur: number; maxOpacity?: number }> = ({ img, dur, maxOpacity = 0.7 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, dur], [1.04, 1.16]);
  const x = interpolate(frame, [0, dur], [-15, 15]);
  const op = interpolate(frame, [0, 40], [0, maxOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Img
        src={staticFile(`lesson2-lecture2/images/${img}`)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: op, transform: `scale(${scale}) translateX(${x}px)` }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${COLORS.bgPrimary}66 0%, ${COLORS.bgPrimary}cc 75%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${COLORS.bgPrimary}dd 0%, transparent 25%, transparent 70%, ${COLORS.bgPrimary}ee 100%)` }} />
    </>
  );
};

/** A handful of glowing particles drifting upward with sine-pulsed opacity. */
export const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 12, y: 70, s: 5, c: COLORS.secondary, sp: 1.0, d: 0 },
    { x: 26, y: 40, s: 3, c: COLORS.secondary, sp: 0.7, d: 80 },
    { x: 78, y: 64, s: 5, c: COLORS.primary, sp: 0.9, d: 40 },
    { x: 88, y: 34, s: 4, c: COLORS.primary, sp: 1.2, d: 120 },
    { x: 50, y: 82, s: 3, c: COLORS.accent, sp: 0.8, d: 60 },
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

/** Top stepper for the FACT acronym (F·A·C·T) with the active letter highlighted in gold. */
export const FactStepper: React.FC<{ active: number }> = ({ active }) => {
  const letters = ["F", "A", "C", "T"];
  return (
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "ltr", fontFamily: FONT_FAMILY }}>
      {letters.map((l, i) => {
        const on = i === active;
        const done = i < active;
        const c = on ? COLORS.accent : done ? COLORS.primary : COLORS.textMuted;
        return (
          <div key={l} style={{ width: 58, height: 58, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 800, color: c, background: on ? `${COLORS.accent}22` : "rgba(255,255,255,0.04)", border: `2px solid ${c}${on ? "" : "55"}`, boxShadow: on ? `0 0 26px ${COLORS.accent}55` : "none", opacity: on ? 1 : 0.65 }}>
            {l}
          </div>
        );
      })}
    </div>
  );
};

/** A single FACT-CHECK step: big glowing letter badge + English term + Hebrew heading + staggered points. */
export const LetterStep: React.FC<{ letter: string; term: string; color: string; heading: React.ReactNode; points: { t: string; d: number }[] }> = ({ letter, term, color, heading, points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const head = spring({ frame: frame - 22, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.06);
  return (
    <div style={{ fontFamily: FONT_FAMILY }}>
      <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, direction: "ltr" }}>
          <div style={{ transform: `scale(${badge})`, opacity: badge, width: 120, height: 120, borderRadius: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 78, fontWeight: 800, color, background: `${color}1f`, border: `3px solid ${color}`, boxShadow: `0 0 ${40 + glow * 30}px ${color}66` }}>{letter}</div>
          <div style={{ opacity: badge, fontSize: 44, fontWeight: 800, color, direction: "ltr", textShadow: `0 0 24px ${color}55` }}>{term}</div>
        </div>
        <div style={{ opacity: head, transform: `translateY(${(1 - head) * 16}px)`, fontSize: 40, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>{heading}</div>
      </div>
      <div style={{ position: "absolute", top: 480, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, direction: "rtl" }}>
        {points.map((p, i) => {
          const s = spring({ frame: frame - p.d, fps, config: { damping: 16, stiffness: 95, mass: 0.8 } });
          return (
            <div key={i} style={{ transform: `translateX(${(1 - s) * 30}px)`, opacity: s, width: 1000, padding: "16px 30px", borderRadius: 14, background: `linear-gradient(135deg, ${color}1a 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(10px)", border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontSize: 22, color }}>◆</span>
              <span style={{ fontSize: 32, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{p.t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
