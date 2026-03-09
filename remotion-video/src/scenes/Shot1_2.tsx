import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";


/**
 * Shot 1.2 — LLM Breakdown Flowchart (12 seconds)
 * Starts with small "LLM" from previous shot at top.
 * Breaks down into 3 big blocks: Large → Language → Model
 * Connected by animated arrows. Dynamic flow chart style.
 * Ends with everything sliding left to transition to chat.
 */

const FlowBlock: React.FC<{
  label: string;
  sublabel: string;
  color: string;
  delay: number;
  x: number;
  y: number;
}> = ({ label, sublabel, color, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slam = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const scaleIn = interpolate(slam, [0, 1], [0, 1]);
  const glowPulse = interpolate(
    Math.sin((frame - delay) * 0.1),
    [-1, 1],
    [0, 15]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scaleIn})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "30px 50px",
          borderRadius: 20,
          background: `${color}18`,
          border: `3px solid ${color}`,
          boxShadow: `0 0 ${glowPulse + 15}px ${color}44, inset 0 0 30px ${color}11`,
          minWidth: 280,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 800,
            color,
            direction: "ltr",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.text,
            marginTop: 8,
            direction: "rtl",
          }}
        >
          {sublabel}
        </div>
      </div>
    </div>
  );
};

// Animated arrow between blocks
const FlowArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}> = ({ x1, y1, x2, y2, delay }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentX2 = x1 + (x2 - x1) * progress;
  const currentY2 = y1 + (y2 - y1) * progress;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={currentX2}
        y2={currentY2}
        stroke={COLORS.primary}
        strokeWidth={3}
        opacity={progress}
      />
      {progress > 0.9 && (
        <polygon
          points={`${x2},${y2} ${x2 - 12},${y2 - 8} ${x2 - 12},${y2 + 8}`}
          fill={COLORS.primary}
          opacity={progress}
        />
      )}
    </g>
  );
};

export const Shot1_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "LLM" at top (continuing from shot 1.1)
  const topLlmOpacity = interpolate(frame, [0, 10], [0.6, 1], {
    extrapolateRight: "clamp",
  });
  const topLlmFadeOut = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Large Language Model" expansion text
  const expandText = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Top "LLM" continuing from previous shot */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.primary,
          letterSpacing: 15,
          opacity: topLlmOpacity * topLlmFadeOut,
          direction: "ltr",
        }}
      >
        LLM
      </div>

      {/* Full name expansion */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 400,
          color: COLORS.textMuted,
          opacity: expandText,
          direction: "ltr",
        }}
      >
        Large Language Model
      </div>

      {/* Flow chart: 3 blocks in a row with arrows */}
      <FlowBlock
        label="Large"
        sublabel="גדול — מיליארדי פרמטרים"
        color="#3b82f6"
        delay={60}
        x={120}
        y={280}
      />

      <FlowBlock
        label="Language"
        sublabel="שפה — עברית, אנגלית, ועוד"
        color={COLORS.primary}
        delay={100}
        x={780}
        y={280}
      />

      <FlowBlock
        label="Model"
        sublabel="מודל — מערכת מתמטית"
        color={COLORS.secondary}
        delay={140}
        x={1440}
        y={280}
      />

      {/* Arrows SVG */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Arrow: Large → Language */}
        <FlowArrow x1={540} y1={340} x2={780} y2={340} delay={90} />
        {/* Arrow: Language → Model */}
        <FlowArrow x1={1200} y1={340} x2={1440} y2={340} delay={130} />
      </svg>

      {/* Bottom summary text */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.text,
            opacity: interpolate(frame, [180, 220], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            direction: "rtl",
          }}
        >
          מערכת ענקית שלמדה לייצר שפה אנושית
        </div>

        {/* Animated underline */}
        <div
          style={{
            margin: "15px auto 0",
            height: 4,
            borderRadius: 2,
            background: COLORS.primary,
            width: interpolate(frame, [220, 260], [0, 700], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </div>


    </AbsoluteFill>
  );
};
