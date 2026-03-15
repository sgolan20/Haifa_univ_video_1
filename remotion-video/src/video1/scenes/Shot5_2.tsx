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
 * Shot 5.2 — LLM Generates Text (15 seconds, 450 frames)
 *
 * Narration: "מודל שפה, לעומת זאת, מייצר תשובה חדשה בזמן אמת.
 * על בסיס הדפוסים שלמד. הוא לא מחפש מידע ספציפי, או מצטט מקור מדויק.
 * הוא יוצר טקסט חדש שנראה הגיוני, בהתאם לנתונים שלמד."
 *
 * Visual: Central neural network that "generates" text. Data streams
 * flow between nodes. Words emerge one by one from the network output.
 * Sparkles on new words. Contrast with search engine approach.
 */

// Neural network nodes
const NODES = [
  // Input layer (left)
  { x: 260, y: 300, r: 14, layer: 0 },
  { x: 260, y: 420, r: 14, layer: 0 },
  { x: 260, y: 540, r: 14, layer: 0 },
  { x: 260, y: 660, r: 14, layer: 0 },
  // Hidden layer 1
  { x: 480, y: 340, r: 16, layer: 1 },
  { x: 480, y: 480, r: 18, layer: 1 },
  { x: 480, y: 620, r: 16, layer: 1 },
  // Hidden layer 2
  { x: 700, y: 380, r: 18, layer: 2 },
  { x: 700, y: 540, r: 20, layer: 2 },
  // Output node
  { x: 920, y: 460, r: 24, layer: 3 },
];

// Connections between layers
const CONNECTIONS: Array<[number, number]> = [
  // Input → Hidden 1
  [0, 4], [0, 5], [1, 4], [1, 5], [1, 6],
  [2, 5], [2, 6], [3, 5], [3, 6],
  // Hidden 1 → Hidden 2
  [4, 7], [4, 8], [5, 7], [5, 8], [6, 7], [6, 8],
  // Hidden 2 → Output
  [7, 9], [8, 9],
];

// Generated text words
const OUTPUT_WORDS = [
  "מודל", "שפה", "הוא", "מערכת", "שלומדת",
  "דפוסים", "ומייצרת", "טקסט", "חדש", "בזמן", "אמת.",
];

export const Shot5_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Network appears
  const networkIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Label "מודל שפה" above network
  const labelIn = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Network activation wave (pulses through layers)
  const activationPhase = interpolate(frame, [60, 200], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typewriter text starts at frame 140
  const visibleWordCount = Math.min(
    OUTPUT_WORDS.length,
    Math.max(0, Math.floor((frame - 140) / 18))
  );

  // "Creates new text" badge
  const badgeIn = spring({
    frame: frame - 300,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Bottom subtitle
  const subtitleIn = spring({
    frame: frame - 360,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Data input labels
  const inputLabelIn = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 40% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Label above network */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 100,
          width: 900,
          textAlign: "center",
          opacity: labelIn,
          transform: `translateY(${(1 - labelIn) * 15}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.secondary,
            direction: "rtl",
            textShadow: `0 0 20px ${COLORS.secondary}44`,
          }}
        >
          מודל שפה — יוצר תוכן חדש
        </span>
      </div>

      {/* Input data labels */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 280,
          opacity: inputLabelIn,
          direction: "rtl",
        }}
      >
        {["ספרים", "אינטרנט", "מאמרים", "שיחות"].map((label, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              color: COLORS.textMuted,
              marginBottom: 85,
              textAlign: "left",
              opacity: 0.7,
            }}
          >
            {label} ←
          </div>
        ))}
      </div>

      {/* Neural Network SVG */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Connections */}
        {CONNECTIONS.map(([from, to], i) => {
          const fromNode = NODES[from];
          const toNode = NODES[to];

          // Activation travels along connections
          const connActive = interpolate(
            activationPhase,
            [fromNode.layer, fromNode.layer + 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Flowing dot position
          const dotX = fromNode.x + (toNode.x - fromNode.x) * ((frame * 0.02 + i * 0.3) % 1);
          const dotY = fromNode.y + (toNode.y - fromNode.y) * ((frame * 0.02 + i * 0.3) % 1);

          return (
            <React.Fragment key={i}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={fromNode.x + (toNode.x - fromNode.x) * networkIn}
                y2={fromNode.y + (toNode.y - fromNode.y) * networkIn}
                stroke={COLORS.secondary}
                strokeWidth={1.5}
                opacity={networkIn * (0.15 + connActive * 0.35)}
              />
              {/* Data flowing dot */}
              {connActive > 0.3 && (
                <circle
                  cx={dotX}
                  cy={dotY}
                  r={3}
                  fill={COLORS.primary}
                  opacity={connActive * 0.7}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const nodeActive = interpolate(
            activationPhase,
            [node.layer - 0.3, node.layer + 0.3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const pulse = node.layer === 3
            ? 0.5 + Math.sin(frame * 0.08) * 0.5
            : 0;

          const nodeColor = node.layer === 3 ? COLORS.accent : COLORS.secondary;

          return (
            <React.Fragment key={i}>
              {/* Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 8 + pulse * 6}
                fill={nodeColor}
                opacity={networkIn * nodeActive * 0.12}
              />
              {/* Node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r * networkIn}
                fill={`${nodeColor}${Math.round(20 + nodeActive * 40).toString(16).padStart(2, "0")}`}
                stroke={nodeColor}
                strokeWidth={2}
                opacity={networkIn * (0.4 + nodeActive * 0.6)}
              />
            </React.Fragment>
          );
        })}

        {/* Output arrow from network to text area */}
        {visibleWordCount > 0 && (
          <>
            <line
              x1={944}
              y1={460}
              x2={1060}
              y2={460}
              stroke={COLORS.accent}
              strokeWidth={3}
              strokeDasharray="8,4"
              opacity={0.6}
            />
            <polygon
              points="1060,452 1080,460 1060,468"
              fill={COLORS.accent}
              opacity={0.6}
            />
          </>
        )}
      </svg>

      {/* ========== Output text area (right side) ========== */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: 200,
          width: 680,
        }}
      >
        {/* Output header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            opacity: badgeIn > 0.1 ? 1 : interpolate(frame, [130, 150], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.accent,
              boxShadow: `0 0 8px ${COLORS.accent}88`,
            }}
          />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.accent,
              letterSpacing: 2,
            }}
          >
            OUTPUT — תשובה חדשה
          </span>
        </div>

        {/* Generated text box */}
        <div
          style={{
            padding: "28px 32px",
            borderRadius: 18,
            background: `linear-gradient(135deg, ${COLORS.bgPrimary}ee, ${COLORS.bgSecondary}ee)`,
            border: `1px solid ${COLORS.accent}33`,
            boxShadow: `0 10px 40px ${COLORS.bgPrimary}88`,
            minHeight: 200,
            direction: "rtl",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              color: COLORS.text,
              lineHeight: 2,
            }}
          >
            {OUTPUT_WORDS.slice(0, visibleWordCount).map((word, i) => {
              const isLast = i === visibleWordCount - 1;
              return (
                <span
                  key={i}
                  style={{
                    color: isLast ? COLORS.accent : COLORS.text,
                    textShadow: isLast ? `0 0 12px ${COLORS.accent}66` : "none",
                    transition: "none",
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
            {visibleWordCount > 0 && visibleWordCount < OUTPUT_WORDS.length && (
              <span
                style={{
                  color: COLORS.accent,
                  opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                  fontWeight: 300,
                  fontSize: 32,
                }}
              >
                |
              </span>
            )}
          </div>
        </div>

        {/* Sparkles around text when generating */}
        {visibleWordCount > 2 && (
          <svg
            width={700}
            height={300}
            style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }}
          >
            {Array.from({ length: 8 }, (_, i) => {
              const sparkX = 100 + (Math.sin(i * 2.3 + 1) * 0.5 + 0.5) * 500;
              const sparkY = 50 + (Math.cos(i * 1.7 + 2) * 0.5 + 0.5) * 200;
              const sparkOpacity = Math.max(0, Math.sin((frame + i * 25) * 0.1) * 0.6);
              const sparkSize = 3 + Math.sin(i * 3.1) * 2;
              return (
                <circle
                  key={i}
                  cx={sparkX}
                  cy={sparkY + Math.sin(frame * 0.04 + i) * 6}
                  r={sparkSize}
                  fill={i % 2 === 0 ? COLORS.accent : COLORS.secondary}
                  opacity={sparkOpacity}
                />
              );
            })}
          </svg>
        )}

        {/* "Creates new text" badge */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            opacity: badgeIn,
            transform: `translateY(${(1 - badgeIn) * 15}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.accent,
              direction: "rtl",
              padding: "8px 24px",
              borderRadius: 30,
              background: `${COLORS.accent}15`,
              border: `2px solid ${COLORS.accent}44`,
            }}
          >
            ✨ יוצר — לא מחפש
          </span>
        </div>
      </div>

      {/* Comparison note */}
      <div
        style={{
          position: "absolute",
          left: 180,
          bottom: 160,
          opacity: inputLabelIn * 0.6,
          direction: "rtl",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            color: COLORS.textDim,
            padding: "12px 20px",
            borderRadius: 12,
            background: `${COLORS.bgPrimary}aa`,
            border: `1px solid ${COLORS.textDim}22`,
          }}
        >
          דפוסים שנלמדו מהאימון →
        </div>
      </div>

      {/* Bottom subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: subtitleIn,
          transform: `translateY(${(1 - subtitleIn) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
            padding: "10px 30px",
            borderRadius: 12,
            background: `${COLORS.bgPrimary}aa`,
            border: `1px solid ${COLORS.secondary}33`,
          }}
        >
          מייצר תשובה חדשה בזמן אמת — מילה אחרי מילה
        </span>
      </div>
    </AbsoluteFill>
  );
};
