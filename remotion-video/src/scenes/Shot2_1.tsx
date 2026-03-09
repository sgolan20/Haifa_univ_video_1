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
 * Shot 2.1 — "What is a Language Model?" definition (14 seconds)
 * Big section title slams in, then makes room for a flow diagram:
 * [טקסטים] → [למידת דפוסים] → [ייצור טקסט חדש]
 * Each step animates in sequence with arrows.
 */

const FlowStep: React.FC<{
  title: string;
  subtitle: string;
  color: string;
  delay: number;
  x: number;
  y: number;
  width?: number;
}> = ({ title, subtitle, color, delay, x, y, width = 340 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slam = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${slam})`,
        opacity: slam,
      }}
    >
      <div
        style={{
          width,
          padding: "28px 24px",
          borderRadius: 20,
          background: `${color}15`,
          border: `3px solid ${color}`,
          boxShadow: `0 0 30px ${color}33`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 800,
            color,
            direction: "rtl",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.textMuted,
            marginTop: 8,
            direction: "rtl",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}> = ({ x1, y1, x2, y2, delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx);

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x1 + dx * progress}
        y2={y1 + dy * progress}
        stroke={COLORS.primary}
        strokeWidth={4}
        opacity={progress}
      />
      {progress > 0.8 && (
        <polygon
          points={`0,-10 20,0 0,10`}
          fill={COLORS.primary}
          opacity={progress}
          transform={`translate(${x2}, ${y2}) rotate(${(angle * 180) / Math.PI})`}
        />
      )}
    </>
  );
};

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleSlam = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.8 },
  });

  // Definition text fades in
  const defOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleSlam})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 30px ${COLORS.primary}44`,
          }}
        >
          מה זה מודל שפה?
        </div>
      </div>

      {/* Flow diagram: 3 steps */}
      <FlowStep
        title="📚 טקסטים"
        subtitle="מיליארדי משפטים מהאינטרנט, ספרים, מאמרים"
        color="#3b82f6"
        delay={100}
        x={80}
        y={430}
        width={400}
      />

      <FlowStep
        title="🧠 למידת דפוסים"
        subtitle="המודל מזהה קשרים בין מילים ומשפטים"
        color={COLORS.primary}
        delay={150}
        x={760}
        y={430}
        width={400}
      />

      <FlowStep
        title="✨ ייצור טקסט"
        subtitle="יוצר טקסט חדש על בסיס מה שלמד"
        color={COLORS.accent}
        delay={200}
        x={1440}
        y={430}
        width={400}
      />

      {/* Arrows */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <Arrow x1={490} y1={500} x2={760} y2={500} delay={140} />
        <Arrow x1={1170} y1={500} x2={1440} y2={500} delay={190} />
      </svg>

      {/* Definition text at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: defOpacity,
          direction: "rtl",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            fontWeight: 500,
            color: COLORS.textMuted,
            maxWidth: 1200,
            margin: "0 auto",
            lineHeight: 1.6,
            padding: "20px 40px",
            borderRadius: 16,
            background: `${COLORS.primary}08`,
            border: `1px solid ${COLORS.primary}22`,
          }}
        >
          מודל שפה = מערכת מחשב שלמדה דפוסים בשפה אנושית ומסוגלת לייצר טקסט חדש
        </div>
      </div>


    </AbsoluteFill>
  );
};
