import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

export const IMG = (file: string) => staticFile(`lesson7-lecture1/images/${file}`);

export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/** Custom vector icons for the four improvement directions, drawn in the given accent color. */
export type DirKind = "accuracy" | "format" | "depth" | "argument";
export const DirIcon: React.FC<{ kind: DirKind; color: string; size?: number }> = ({ kind, color, size = 56 }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: { flexShrink: 0 } as React.CSSProperties };
  if (kind === "accuracy") {
    return (
      <svg {...common}>
        <circle cx={12} cy={12} r={9.4} stroke={color} strokeWidth={1.8} />
        <circle cx={12} cy={12} r={5.2} stroke={color} strokeWidth={1.8} />
        <circle cx={12} cy={12} r={1.8} fill={color} />
        <path d="M12 2.6 V5 M21.4 12 H19 M12 21.4 V19 M2.6 12 H5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "format") {
    return (
      <svg {...common}>
        <rect x={3} y={3.5} width={18} height={17} rx={2.4} stroke={color} strokeWidth={1.8} />
        <path d="M3 9 H21 M9 9 V20.5" stroke={color} strokeWidth={1.8} />
        <path d="M5.4 6.2 H7 M11.2 13 H18.4 M11.2 16.4 H18.4" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "depth") {
    return (
      <svg {...common}>
        <path d="M12 3 L20.5 7 L12 11 L3.5 7 Z" fill={`${color}33`} stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
        <path d="M3.5 11.5 L12 15.5 L20.5 11.5" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
        <path d="M3.5 16 L12 20 L20.5 16" stroke={color} strokeWidth={1.7} strokeLinejoin="round" />
      </svg>
    );
  }
  // argument — balance scale
  return (
    <svg {...common}>
      <path d="M12 3.4 V20.4 M7.5 20.6 H16.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M5 7 H19 M12 4.6 a1.4 1.4 0 1 0 0.01 0" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M5 7 L2.6 12.4 H7.4 Z M19 7 L16.6 12.4 H21.4 Z" fill={`${color}26`} stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  );
};

export const sp = (
  frame: number,
  fps: number,
  at: number,
  config: Partial<Parameters<typeof spring>[0]["config"]> = {}
) =>
  clamp01(
    spring({
      frame: frame - at,
      fps,
      config: { damping: 16, stiffness: 90, mass: 0.8, ...config },
    })
  );

export const SceneShell: React.FC<{
  children: React.ReactNode;
  accent?: string;
  variant?: "grid" | "rings" | "flow";
  bg?: string;
}> = ({ children, accent = COLORS.primary, variant = "grid", bg }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame * 0.01) * 18;
  const glowX = variant === "flow" ? "68%" : variant === "rings" ? "28%" : "50%";
  const glowY = variant === "flow" ? "38%" : variant === "rings" ? "44%" : "50%";
  const bgFade = interpolate(frame, [0, 24], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bgZoom = 1.06 + Math.sin(frame * 0.008) * 0.012;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY, overflow: "hidden" }}>
      {bg && (
        <>
          <Img src={IMG(bg)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: bgFade, transform: `scale(${bgZoom})` }} />
          <AbsoluteFill style={{ background: "rgba(10,14,26,0.5)" }} />
        </>
      )}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(760px 520px at ${glowX} ${glowY}, ${accent}22 0%, transparent 65%),
            radial-gradient(620px 460px at 18% 82%, ${COLORS.secondary}20 0%, transparent 64%),
            linear-gradient(135deg, ${COLORS.bgPrimary}cc 0%, ${COLORS.bgSecondary}aa 54%, #070a13cc 100%)
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: -80,
          opacity: 0.16,
          transform: `translate(${drift}px, ${drift * 0.4}px)`,
          backgroundImage: `
            linear-gradient(${accent}33 1px, transparent 1px),
            linear-gradient(90deg, ${accent}33 1px, transparent 1px)
          `,
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 72%)",
        }}
      />
      {variant === "rings" && <Rings accent={accent} />}
      <Particles accent={accent} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,26,0.42) 0%, transparent 20%, transparent 74%, rgba(10,14,26,0.72) 100%)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const Particles: React.FC<{ accent?: string }> = ({ accent = COLORS.primary }) => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 9, y: 72, s: 5, c: accent, speed: 0.7, d: 0 },
    { x: 18, y: 28, s: 3, c: COLORS.secondary, speed: 0.9, d: 80 },
    { x: 34, y: 82, s: 4, c: COLORS.accent, speed: 0.65, d: 36 },
    { x: 72, y: 23, s: 4, c: accent, speed: 1.0, d: 120 },
    { x: 86, y: 62, s: 5, c: COLORS.secondary, speed: 0.8, d: 50 },
    { x: 56, y: 45, s: 3, c: COLORS.primary, speed: 0.75, d: 170 },
  ];

  return (
    <>
      {dots.map((p, i) => {
        const y = p.y - (((frame * p.speed + p.d) % 240) / 240) * 20;
        const opacity = 0.22 + 0.45 * Math.abs(Math.sin(frame * 0.028 + i));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.s,
              height: p.s,
              borderRadius: "50%",
              background: p.c,
              opacity,
              boxShadow: `0 0 ${p.s * 4}px ${p.c}`,
            }}
          />
        );
      })}
    </>
  );
};

const Rings: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            right: 120 + i * 52,
            top: 144 + i * 42,
            width: 440 + i * 94,
            height: 440 + i * 94,
            borderRadius: "50%",
            border: `1.5px solid ${i === 1 ? COLORS.secondary : accent}${i === 0 ? "55" : "33"}`,
            transform: `rotate(${frame * (0.05 + i * 0.015)}deg) scale(${1 + Math.sin(frame * 0.018 + i) * 0.018})`,
            opacity: 0.45,
          }}
        />
      ))}
    </>
  );
};

export const TopLabel: React.FC<{ kicker?: string; title: string; at?: number; accent?: string }> = ({
  kicker,
  title,
  at = 8,
  accent = COLORS.primary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const show = sp(frame, fps, at);

  return (
    <div
      style={{
        position: "absolute",
        top: 54,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        direction: "rtl",
        opacity: show,
        transform: `translateY(${interpolate(show, [0, 1], [-20, 0])}px)`,
      }}
    >
      {kicker && (
        <div
          style={{
            padding: "9px 26px",
            borderRadius: 999,
            border: `1.5px solid ${accent}66`,
            background: `${accent}18`,
            color: accent,
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          {kicker}
        </div>
      )}
      <div
        style={{
          maxWidth: 1500,
          textAlign: "center",
          color: COLORS.text,
          fontSize: 65,
          fontWeight: 900,
          lineHeight: 1.16,
          textShadow: `0 0 34px ${accent}44, 0 2px 16px rgba(0,0,0,0.75)`,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const GlassCard: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = COLORS.primary, style }) => (
  <div
    style={{
      borderRadius: 26,
      border: `2px solid ${color}55`,
      background: "rgba(255,255,255,0.065)",
      backdropFilter: "blur(16px)",
      boxShadow: `0 22px 60px rgba(0,0,0,0.34), 0 0 42px ${color}22`,
      color: COLORS.text,
      direction: "rtl",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{
  children: React.ReactNode;
  color?: string;
  appear?: number;
  style?: React.CSSProperties;
}> = ({ children, color = COLORS.primary, appear = 1, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 26px",
      borderRadius: 999,
      background: `${color}1f`,
      border: `1.5px solid ${color}88`,
      color: COLORS.text,
      fontSize: 32,
      fontWeight: 800,
      opacity: appear,
      transform: `scale(${interpolate(appear, [0, 1], [0.9, 1])})`,
      boxShadow: `0 0 24px ${color}22`,
      whiteSpace: "nowrap",
      direction: "rtl",
      ...style,
    }}
  >
    {children}
  </div>
);

export const AiNode: React.FC<{ scale?: number; label?: string; color?: string }> = ({
  scale = 1,
  label = "AI",
  color = COLORS.secondary,
}) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.045) * 8;

  return (
    <div
      style={{
        width: 194,
        height: 194,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, #ffffff28, ${color}36 42%, rgba(10,14,26,0.82) 100%)`,
        border: `2px solid ${color}99`,
        boxShadow: `0 0 48px ${color}55, inset 0 0 44px ${color}24`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${float}px) scale(${scale})`,
        opacity: scale,
      }}
    >
      <span style={{ fontSize: 63, fontWeight: 900, color: COLORS.text, direction: "ltr" }}>{label}</span>
    </div>
  );
};

export const ArrowLeft: React.FC<{ progress?: number; color?: string; width?: number }> = ({
  progress = 1,
  color = COLORS.primary,
  width = 180,
}) => (
  <div
    style={{
      width,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: progress,
      transform: `scaleX(${progress})`,
      transformOrigin: "right center",
      direction: "ltr",
      unicodeBidi: "isolate",
    }}
  >
    <div style={{ height: 3, width: width - 44, background: `linear-gradient(90deg, ${color}, transparent)`, boxShadow: `0 0 16px ${color}` }} />
    <span style={{ color, fontSize: 40, lineHeight: 1, filter: `drop-shadow(0 0 12px ${color})` }}>◀</span>
  </div>
);

export const FloatingImageFrame: React.FC<{
  src: string;
  color?: string;
  appear: number;
  width: number;
  children?: React.ReactNode;
}> = ({ src, color = COLORS.primary, appear, width, children }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.035) * 5;
  return (
    <div
      style={{
        position: "relative",
        width,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [34, 0]) + float}px) scale(${interpolate(appear, [0, 1], [0.95, 1])})`,
        borderRadius: 24,
        overflow: "hidden",
        background: "#fff",
        border: `2px solid ${color}66`,
        boxShadow: `0 28px 80px rgba(0,0,0,0.5), 0 0 54px ${color}2f`,
      }}
    >
      <Img src={src} style={{ display: "block", width: "100%", height: "auto" }} />
      {children}
    </div>
  );
};

/** A quoted example prompt card (a follow-up instruction in quotes). */
export const PromptQuote: React.FC<{
  text: string;
  color?: string;
  appear?: number;
  width?: number;
}> = ({ text, color = COLORS.primary, appear = 1, width = 1180 }) => (
  <div
    style={{
      width,
      padding: "22px 34px",
      borderRadius: 18,
      direction: "rtl",
      textAlign: "right",
      background: `linear-gradient(150deg, ${color}1c 0%, rgba(255,255,255,0.04) 100%)`,
      backdropFilter: "blur(12px)",
      border: `2px solid ${color}66`,
      boxShadow: `0 14px 40px rgba(0,0,0,0.34), 0 0 30px ${color}1f`,
      color: COLORS.text,
      fontSize: 37,
      fontWeight: 600,
      lineHeight: 1.4,
      opacity: appear,
      transform: `translateY(${interpolate(appear, [0, 1], [20, 0])}px)`,
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
    }}
  >
    <span style={{ color, fontSize: 35, fontWeight: 900, lineHeight: 1.4, flexShrink: 0 }}>❝</span>
    <span>{text}</span>
  </div>
);

/** Shared layout for the four "improvement direction" scenes. */
export const DirectionScene: React.FC<{
  index: number;
  title: string;
  accent: string;
  icon: React.ReactNode;
  when: string;
  whenAt: number;
  quotes: { text: string; at: number }[];
  footer?: string;
  footerAt?: number;
  bg?: string;
}> = ({ index, title, accent, icon, when, whenAt, quotes, footer, footerAt, bg }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 6, { stiffness: 95 });
  const whenS = sp(frame, fps, whenAt);
  const footerS = footerAt !== undefined ? sp(frame, fps, footerAt) : 0;

  return (
    <SceneShell accent={accent} variant="flow" bg={bg}>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 26,
          direction: "rtl",
          opacity: head,
          transform: `translateY(${interpolate(head, [0, 1], [-22, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: 26,
            background: `${accent}1f`,
            border: `3px solid ${accent}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 44px ${accent}55`,
          }}
        >
          {icon}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
          <span style={{ color: accent, fontSize: 32, fontWeight: 800, direction: "rtl" }}>{`כיוון ${index}`}</span>
          <span style={{ color: COLORS.text, fontSize: 69, fontWeight: 900, textShadow: `0 0 30px ${accent}44` }}>{title}</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: whenS,
          transform: `translateY(${interpolate(whenS, [0, 1], [16, 0])}px)`,
        }}
      >
        <div style={{ maxWidth: 1300, textAlign: "center", direction: "rtl", color: COLORS.textMuted, fontSize: 42, fontWeight: 600, lineHeight: 1.4 }}>
          {when}
        </div>
      </div>

      <div style={{ position: "absolute", top: 392, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {quotes.map((q, i) => (
          <PromptQuote key={i} text={q.text} color={accent} appear={sp(frame, fps, q.at)} />
        ))}
      </div>

      {footer && (
        <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: footerS, transform: `translateY(${interpolate(footerS, [0, 1], [16, 0])}px)` }}>
          <div style={{ maxWidth: 1320, textAlign: "center", direction: "rtl", fontSize: 38, fontWeight: 800, color: COLORS.text }}>{footer}</div>
        </div>
      )}
    </SceneShell>
  );
};

export const ClosingLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = sp(frame, fps, 8, { damping: 14, stiffness: 95, mass: 0.8 });
  const fade = interpolate(frame, [55, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 0.75 + Math.sin(frame * 0.08) * 0.08;

  return (
    <SceneShell accent={COLORS.primary} variant="rings">
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", display: "flex", opacity: fade }}>
        <div
          style={{
            width: 720,
            height: 390,
            borderRadius: 30,
            border: `1.5px solid ${COLORS.primary}55`,
            background: "rgba(255,255,255,0.055)",
            boxShadow: `0 0 90px ${COLORS.primary}26`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${interpolate(pop, [0, 1], [0.86, 1])})`,
            opacity: pop,
          }}
        >
          <Img
            src={staticFile("images/haifa-logo-white.png")}
            style={{
              width: 520,
              filter: `drop-shadow(0 0 ${34 * glow}px ${COLORS.primary}99)`,
            }}
          />
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};
