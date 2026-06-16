import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/** staticFile helper for this lesson's image folder. */
export const IMG = (f: string) => staticFile(`lesson3-lecture3/images/${f}`);

/** Living background: Ken Burns slow zoom + drift, fade-in, with readability overlays. */
export const SceneBg: React.FC<{ img: string; dur: number; maxOpacity?: number }> = ({ img, dur, maxOpacity = 0.5 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, dur], [1.04, 1.16]);
  const x = interpolate(frame, [0, dur], [-15, 15]);
  const op = interpolate(frame, [0, 40], [0, maxOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Img
        src={IMG(img)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: op, transform: `scale(${scale}) translateX(${x}px)` }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${COLORS.bgPrimary}66 0%, ${COLORS.bgPrimary}cc 75%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${COLORS.bgPrimary}dd 0%, transparent 25%, transparent 70%, ${COLORS.bgPrimary}ee 100%)` }} />
    </>
  );
};

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

/** Standard scene shell: dark fill + living background image + drifting particles. */
export const SceneShell: React.FC<{ bg: string; dur: number; accent?: string; maxOpacity?: number; children: React.ReactNode }> = ({ bg, dur, accent, maxOpacity, children }) => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
    <SceneBg img={bg} dur={dur} maxOpacity={maxOpacity} />
    <Particles accent={accent} />
    {children}
  </AbsoluteFill>
);

/** spring shorthand used across the shots. */
export const sp = (frame: number, fps: number, at: number, cfg?: { damping?: number; stiffness?: number; mass?: number }) =>
  spring({ frame: frame - at, fps, config: { damping: 15, stiffness: 90, mass: 0.8, ...cfg } });

/** Top-of-scene header: optional floating icon + small eyebrow + big highlighted title. */
export const SceneHeader: React.FC<{
  icon?: string;
  eyebrow?: string;
  title: React.ReactNode;
  color: string;
  appear: number;
  top?: number;
  titleSize?: number;
  maxWidth?: number;
}> = ({ icon, eyebrow, title, color, appear, top = 64, titleSize = 60, maxWidth = 1420 }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.04) * 5;
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [-20, 0])}px)` }}>
      {icon && (
        <Img src={IMG(icon)} style={{ height: 120, filter: `drop-shadow(0 0 26px ${color}aa)`, transform: `translateY(${float}px) scale(${interpolate(appear, [0, 1], [0.8, 1])})` }} />
      )}
      {eyebrow && (
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "1px", color, textShadow: `0 0 18px ${color}66`, direction: "rtl" }}>{eyebrow}</span>
      )}
      <div style={{ maxWidth, textAlign: "center", direction: "rtl", fontSize: titleSize, fontWeight: 900, color: COLORS.text, lineHeight: 1.18, textShadow: `0 0 36px ${color}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
        {title}
      </div>
    </div>
  );
};

/** Glassmorphic panel used as a generic content card. */
export const GlassCard: React.FC<{ color: string; appear: number; style?: React.CSSProperties; float?: number; children: React.ReactNode }> = ({ color, appear, style, float = 0, children }) => (
  <div
    style={{
      borderRadius: 26, direction: "rtl",
      background: `linear-gradient(160deg, ${color}1a 0%, rgba(255,255,255,0.045) 100%)`,
      backdropFilter: "blur(14px)",
      border: `2px solid ${color}66`,
      boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 42px ${color}24`,
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [28, 0]) + float}px) scale(${interpolate(appear, [0, 1], [0.96, 1])})`,
      ...style,
    }}
  >
    {children}
  </div>
);

/** A numbered requirement/step chip: glowing number badge + label (+ optional sublabel). */
export const NumberItem: React.FC<{ n: number; label: React.ReactNode; sub?: string; icon?: string; color: string; appear: number; idx?: number }> = ({ n, label, sub, icon, color, appear, idx = 0 }) => {
  const frame = useCurrentFrame();
  const float = Math.sin((frame + idx * 38) * 0.045) * 4;
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 24, width: "100%",
        padding: "26px 36px", borderRadius: 22, direction: "rtl",
        background: "rgba(255,255,255,0.055)", backdropFilter: "blur(12px)",
        border: `2px solid ${color}55`, boxShadow: `0 12px 38px rgba(0,0,0,0.38)`,
        opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [26, 0]) + float}px)`,
      }}
    >
      <div style={{ minWidth: 66, height: 66, borderRadius: "50%", background: color, color: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900, boxShadow: `0 0 22px ${color}aa` }}>{n}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {sub && <span style={{ fontSize: 22, fontWeight: 700, color: COLORS.textMuted }}>{sub}</span>}
        <span style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, lineHeight: 1.2 }}>{label}</span>
      </div>
      {icon && <Img src={IMG(icon)} style={{ height: 64, filter: `drop-shadow(0 0 16px ${color}88)` }} />}
    </div>
  );
};

/** A framed display of a user-provided example image (white reference card) on a dark scene. */
export const ExampleImageCard: React.FC<{ img: string; color: string; appear: number; width?: number; caption?: string }> = ({ img, color, appear, width = 880, caption }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.035) * 5;
  if (appear < 0.01) return null;
  return (
    <div
      style={{
        position: "relative", display: "inline-block",
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0]) + float}px) scale(${interpolate(appear, [0, 1], [0.94, 1])})`,
      }}
    >
      {/* caption sits ABOVE the card (outside the image), not over the text */}
      {caption && (
        <div style={{ position: "absolute", top: -46, right: 0, padding: "8px 22px", borderRadius: 14, background: color, color: "#0a0e1a", fontSize: 22, fontWeight: 900, direction: "rtl", boxShadow: `0 6px 20px rgba(0,0,0,0.45)` }}>{caption}</div>
      )}
      <div
        style={{
          borderRadius: 22, overflow: "hidden", background: "#fff",
          border: `2px solid ${color}88`,
          boxShadow: `0 24px 70px rgba(0,0,0,0.55), 0 0 56px ${color}3a`,
        }}
      >
        <Img src={IMG(img)} style={{ display: "block", width, height: "auto" }} />
      </div>
    </div>
  );
};

/** Inline highlight span. */
export const HL: React.FC<{ c: string; children: React.ReactNode }> = ({ c, children }) => (
  <span style={{ color: c }}>{children}</span>
);
