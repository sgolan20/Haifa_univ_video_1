import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 7.2 — Same Prompt → Different Responses (7 seconds / 210 frames)
 * Layered scene: prism background + animated branching diagram.
 *
 * Whisper timing (relative to shot start at 270s):
 *   0.38s "זה" 0.7s "אומר" 0.92s "שאותו" 1.5s "prompt"
 *   2.06s "יכול" 2.5s "להוביל" 2.9s "לתשובות" 3.32s "שונות"
 *   3.64s "בכל" 3.98s "פעם"
 *   4.8s "חלקן" 5.16s "צפויות" 5.58s "וחלקן" 6.18s "מפתיעות" 6.64s "יותר"
 */

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const RESPONSES = [
  { text: "תשובה מדעית מפורטת", color: COLORS.primary, label: "צפויה" },
  { text: "סיפור יצירתי ומקורי", color: COLORS.secondary, label: "מפתיעה" },
  { text: "רשימת נקודות תמציתית", color: COLORS.accent, label: "צפויה" },
];

export const Shot7_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image fade-in
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.35], CLAMP);

  // --- Phase 1: Prompt box appears (~0.9s / frame 28) ---
  const promptIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // --- Branches grow out (~1.5-3.3s / frames 45-100) ---
  const branchProgress = interpolate(frame, [45, 95], [0, 1], CLAMP);

  // --- Response cards appear staggered (~2.9-3.6s / frames 87-110) ---
  const card1In = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });
  const card2In = spring({
    frame: frame - 95,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });
  const card3In = spring({
    frame: frame - 110,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });
  const cardIns = [card1In, card2In, card3In];

  // --- Phase 2: "חלקן צפויות וחלקן מפתיעות יותר" (~4.8s / frame 144) ---
  const bottomIn = spring({
    frame: frame - 144,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Card positions (3 columns spread across screen)
  const cardXPositions = [280, 960, 1640];
  const promptY = 160;
  const cardY = 520;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Layer 1: Prism background */}
      <Img
        src={staticFile("video1/images/shot7_2_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 35,
          width: "100%",
          textAlign: "center",
          opacity: promptIn,
          transform: `translateY(${(1 - promptIn) * 15}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.textMuted,
            direction: "rtl",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          }}
        >
          אותו Prompt — תשובות שונות בכל פעם
        </div>
      </div>

      {/* SVG: Prompt box + branches + cards */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Prompt box */}
        <rect
          x={810}
          y={promptY - 10}
          width={300}
          height={80}
          rx={16}
          fill="rgba(10, 14, 26, 0.8)"
          stroke={COLORS.primary}
          strokeWidth={3}
          opacity={promptIn}
          filter="url(#promptGlow)"
        />
        <text
          x={960}
          y={promptY + 42}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={34}
          fontWeight={800}
          fill={COLORS.primary}
          opacity={promptIn}
        >
          Prompt
        </text>

        {/* Glow filter */}
        <defs>
          <filter id="promptGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Branches from prompt to cards */}
        {RESPONSES.map((resp, i) => {
          const targetX = cardXPositions[i];
          const startX = 960;
          const startY = promptY + 70;

          // Curved branch path
          const midY = startY + (cardY - startY) * 0.5;
          const currentMidX = startX + (targetX - startX) * branchProgress;
          const currentEndX = startX + (targetX - startX) * branchProgress;
          const currentEndY = startY + (cardY - startY) * branchProgress;

          const path = `M ${startX} ${startY} C ${startX} ${midY}, ${currentMidX} ${midY}, ${currentEndX} ${currentEndY}`;

          return (
            <g key={`branch-${i}`}>
              {/* Glow line */}
              <path
                d={path}
                fill="none"
                stroke={resp.color}
                strokeWidth={10}
                opacity={branchProgress * 0.08}
              />
              {/* Main line */}
              <path
                d={path}
                fill="none"
                stroke={resp.color}
                strokeWidth={3}
                strokeDasharray="10 6"
                strokeDashoffset={-frame * 2}
                opacity={branchProgress * 0.7}
              />
              {/* Endpoint dot */}
              {branchProgress > 0.85 && (
                <circle
                  cx={targetX}
                  cy={cardY - 10}
                  r={6}
                  fill={resp.color}
                  opacity={branchProgress}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Response cards as HTML for better glassmorphism */}
      {RESPONSES.map((resp, i) => {
        const cardIn = cardIns[i];
        const cx = cardXPositions[i];

        return (
          <div
            key={`card-${i}`}
            style={{
              position: "absolute",
              top: cardY,
              left: cx - 175,
              width: 350,
              opacity: cardIn,
              transform: `scale(${cardIn}) translateY(${(1 - cardIn) * 20}px)`,
            }}
          >
            <div
              style={{
                padding: "24px 20px",
                borderRadius: 18,
                background: "rgba(10, 14, 26, 0.8)",
                backdropFilter: "blur(16px)",
                border: `2px solid ${resp.color}55`,
                boxShadow: `0 0 30px ${resp.color}20`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.text,
                  direction: "rtl",
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                {resp.text}
              </div>
            </div>
          </div>
        );
      })}

      {/* Phase 2: Bottom text — "חלקן צפויות וחלקן מפתיעות יותר" */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: bottomIn,
          transform: `translateY(${(1 - bottomIn) * 20}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 50px",
            borderRadius: 18,
            background: "rgba(10, 14, 26, 0.8)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${COLORS.secondary}33`,
            boxShadow: `0 0 40px ${COLORS.secondary}15`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 600,
              color: COLORS.textMuted,
              direction: "rtl",
            }}
          >
            חלקן{" "}
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.primary,
            }}
          >
            צפויות
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 600,
              color: COLORS.textMuted,
            }}
          >
            {" "}וחלקן{" "}
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.accent,
              textShadow: `0 0 15px ${COLORS.accent}44`,
            }}
          >
            מפתיעות יותר
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
