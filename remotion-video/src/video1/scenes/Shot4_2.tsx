import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";


/**
 * Shot 4.2 — "Language" in Large Language Model (8 seconds)
 * "Language" word highlighted. Words in multiple languages float
 * and arrange on a rotating wireframe globe.
 */

const LANGUAGES = [
  { text: "Hello", angle: 0, lat: 0.3 },
  { text: "שלום", angle: 60, lat: -0.2 },
  { text: "Hola", angle: 120, lat: 0.5 },
  { text: "مرحبا", angle: 180, lat: -0.4 },
  { text: "你好", angle: 240, lat: 0.1 },
  { text: "Bonjour", angle: 300, lat: -0.1 },
];

export const Shot4_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title with "Language" highlighted
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // "Language" temporary highlight — scale up then back
  const langScale = interpolate(frame, [0, 15, 50, 70], [1, 1.3, 1.3, 1], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  });
  const langGlow = interpolate(frame, [0, 15, 50, 70], [0, 30, 30, 0], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  });
  // Push siblings apart when Language grows
  const sideShift = interpolate(frame, [0, 15, 50, 70], [0, 60, 60, 0], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  });

  // Globe rotation
  const globeRotation = frame * 0.8;

  // Globe appear
  const globeAppear = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Globe parameters
  const globeCx = 960;
  const globeCy = 560;
  const globeR = 220;

  // Generate wireframe globe lines
  const meridians = 8;
  const parallels = 5;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Title row */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: "#3b82f6",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            transform: `translateX(${-sideShift}px)`,
          }}
        >
          Large
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.primary,
            transform: `scale(${langScale})`,
            textShadow: `0 0 ${langGlow}px ${COLORS.primary}88, 0 4px 20px rgba(0,0,0,0.8)`,
          }}
        >
          Language
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.secondary,
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            transform: `translateX(${sideShift}px)`,
          }}
        >
          Model
        </span>
      </div>

      {/* Hebrew subtitle */}
      <div
        style={{
          position: "absolute",
          top: 210,
          width: "100%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
          שפה — עיבוד ויצירת טקסט בשפה טבעית
        </span>
      </div>

      {/* SVG Wireframe Globe */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity: globeAppear,
          transform: `scale(${globeAppear})`,
          transformOrigin: `${globeCx}px ${globeCy}px`,
        }}
      >
        {/* Outer circle */}
        <circle
          cx={globeCx}
          cy={globeCy}
          r={globeR}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={2}
          opacity={0.3}
        />

        {/* Meridians (vertical ellipses that rotate) */}
        {Array.from({ length: meridians }, (_, i) => {
          const angle = (i / meridians) * 180 + globeRotation;
          const squeeze = Math.cos((angle * Math.PI) / 180);
          return (
            <ellipse
              key={`m${i}`}
              cx={globeCx}
              cy={globeCy}
              rx={Math.abs(squeeze) * globeR}
              ry={globeR}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth={1}
              opacity={0.15 + Math.abs(squeeze) * 0.15}
            />
          );
        })}

        {/* Parallels (horizontal lines at different latitudes) */}
        {Array.from({ length: parallels }, (_, i) => {
          const y = globeCy + ((i - (parallels - 1) / 2) / ((parallels - 1) / 2)) * globeR * 0.8;
          const latR = Math.sqrt(globeR ** 2 - (y - globeCy) ** 2);
          if (isNaN(latR)) return null;
          return (
            <ellipse
              key={`p${i}`}
              cx={globeCx}
              cy={y}
              rx={latR}
              ry={latR * 0.15}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth={1}
              opacity={0.2}
            />
          );
        })}

        {/* Floating language words around globe */}
        {LANGUAGES.map((lang, i) => {
          const wordDelay = 40 + i * 15;
          const wordProgress = interpolate(frame - wordDelay, [0, 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Position words on globe surface (rotating)
          const wordAngle = ((lang.angle + globeRotation) * Math.PI) / 180;
          const latOffset = lang.lat * globeR;
          const depthFactor = Math.cos(wordAngle); // -1 to 1, for z-depth

          const wx = globeCx + Math.sin(wordAngle) * (globeR + 40);
          const wy = globeCy + latOffset;

          // Words behind globe are dimmer
          const wordOpacity = wordProgress * (0.3 + Math.max(0, depthFactor) * 0.7);
          const wordScale = 0.7 + Math.max(0, depthFactor) * 0.3;

          return (
            <text
              key={i}
              x={wx}
              y={wy}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily={FONT_FAMILY}
              fontSize={30 * wordScale}
              fontWeight={700}
              fill={i % 2 === 0 ? COLORS.primary : COLORS.accent}
              opacity={wordOpacity}
            >
              {lang.text}
            </text>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
