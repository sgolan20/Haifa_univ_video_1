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
 * Shot 4.3 — "Model" in Large Language Model (14 seconds)
 * "Model" word highlighted. Mathematical network SVG with nodes
 * and edges. Data flows through edges (animated dashes).
 * Transitions to server room illustration with LED lights.
 */

// Network nodes
const NODES = [
  // Input layer
  { x: 300, y: 280, layer: 0 },
  { x: 300, y: 440, layer: 0 },
  { x: 300, y: 600, layer: 0 },
  { x: 300, y: 760, layer: 0 },
  // Hidden layer 1
  { x: 620, y: 340, layer: 1 },
  { x: 620, y: 500, layer: 1 },
  { x: 620, y: 660, layer: 1 },
  // Hidden layer 2
  { x: 940, y: 380, layer: 2 },
  { x: 940, y: 540, layer: 2 },
  { x: 940, y: 700, layer: 2 },
  // Output layer
  { x: 1260, y: 440, layer: 3 },
  { x: 1260, y: 600, layer: 3 },
];

// Generate edges between adjacent layers
const EDGES: { from: number; to: number }[] = [];
for (let i = 0; i < NODES.length; i++) {
  for (let j = 0; j < NODES.length; j++) {
    if (NODES[j].layer === NODES[i].layer + 1) {
      EDGES.push({ from: i, to: j });
    }
  }
}

// Server rack positions
const SERVERS = Array.from({ length: 5 }, (_, i) => ({
  x: 1400 + (i % 3) * 160,
  y: 350 + Math.floor(i / 3) * 260,
  leds: Array.from({ length: 6 }, (_, j) => j),
}));

export const Shot4_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title appear
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Network phase (frames 0-280)
  const networkAppear = spring({
    frame: frame - 15,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Node appearance staggered by layer
  const nodeAppear = (layer: number) =>
    spring({
      frame: frame - 15 - layer * 20,
      fps,
      config: { damping: 16, stiffness: 90, mass: 0.8 },
    });

  // Edge animation (dashes flowing)
  const dashOffset = -frame * 4;

  // Pulse effect on nodes
  const nodePulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.7, 1]
  );

  // Server room transition (frames 250+)
  const serverTransition = interpolate(frame, [250, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Network shrinks and moves left
  const networkScale = interpolate(frame, [250, 310], [1, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const networkTranslateX = interpolate(frame, [250, 310], [0, -250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Server appear
  const serverAppear = spring({
    frame: frame - 280,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Bottom label
  const labelAppear = spring({
    frame: frame - 320,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

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
          top: 50,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: titleAppear,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 800,
            color: "#3b82f6",
            opacity: 0.3,
          }}
        >
          Large
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.primary,
            opacity: 0.3,
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
            textShadow: `0 0 30px ${COLORS.secondary}88`,
          }}
        >
          Model
        </span>
      </div>

      {/* Hebrew subtitle */}
      <div
        style={{
          position: "absolute",
          top: 170,
          width: "100%",
          textAlign: "center",
          opacity: titleAppear,
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
          מודל — מערכת מתמטית מורכבת
        </span>
      </div>

      {/* Neural network graph */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          transform: `scale(${networkScale}) translateX(${networkTranslateX}px)`,
          transformOrigin: "480px 540px",
        }}
      >
        {/* Edges */}
        {EDGES.map((edge, i) => {
          const fromNode = NODES[edge.from];
          const toNode = NODES[edge.to];
          const edgeOpacity =
            networkAppear *
            nodeAppear(fromNode.layer) *
            nodeAppear(toNode.layer) *
            0.3;

          return (
            <line
              key={`e${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={COLORS.primary}
              strokeWidth={1.5}
              strokeDasharray="8 6"
              strokeDashoffset={dashOffset}
              opacity={edgeOpacity}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const appear = nodeAppear(node.layer);
          const layerColors = [
            COLORS.primary,
            COLORS.secondary,
            "#3b82f6",
            COLORS.accent,
          ];
          const color = layerColors[node.layer];

          return (
            <g key={`n${i}`} opacity={appear}>
              {/* Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={18 * nodePulse}
                fill="none"
                stroke={color}
                strokeWidth={1}
                opacity={0.2}
              />
              {/* Node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={10}
                fill={color}
                opacity={0.9}
              />
              {/* Inner bright spot */}
              <circle
                cx={node.x}
                cy={node.y}
                r={4}
                fill={COLORS.text}
                opacity={0.6 * nodePulse}
              />
            </g>
          );
        })}

        {/* Layer labels */}
        {[
          { x: 300, label: "קלט" },
          { x: 620, label: "שכבה 1" },
          { x: 940, label: "שכבה 2" },
          { x: 1260, label: "פלט" },
        ].map((l, i) => (
          <text
            key={`label${i}`}
            x={l.x}
            y={870}
            textAnchor="middle"
            fontFamily={FONT_FAMILY}
            fontSize={22}
            fontWeight={600}
            fill={COLORS.textMuted}
            opacity={networkAppear * 0.7}
          >
            {l.label}
          </text>
        ))}

        {/* Floating math formulas (background decoration) */}
        {[
          { text: "f(x) = Wx + b", x: 180, y: 200, delay: 40 },
          { text: "softmax(z)", x: 1100, y: 230, delay: 60 },
          { text: "∂L/∂w", x: 750, y: 900, delay: 80 },
          { text: "σ(x) = 1/(1+e⁻ˣ)", x: 500, y: 180, delay: 100 },
        ].map((f, i) => {
          const fOpacity = interpolate(frame - f.delay, [0, 30], [0, 0.15], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fY = f.y - (frame - f.delay) * 0.05;
          return (
            <text
              key={`f${i}`}
              x={f.x}
              y={fY}
              fontFamily={FONT_FAMILY}
              fontSize={20}
              fill={COLORS.primary}
              opacity={fOpacity}
            >
              {f.text}
            </text>
          );
        })}
      </svg>

      {/* Server room (appears after transition) */}
      {serverTransition > 0 && (
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 260,
            opacity: serverAppear,
            transform: `scale(${serverAppear})`,
            transformOrigin: "center center",
          }}
        >
          {SERVERS.map((server, si) => (
            <div
              key={si}
              style={{
                position: "absolute",
                left: (si % 3) * 150,
                top: Math.floor(si / 3) * 240,
                width: 130,
                height: 210,
                borderRadius: 8,
                background: `linear-gradient(180deg, #1a2332 0%, #0f172a 100%)`,
                border: `1px solid ${COLORS.textDim}44`,
                boxShadow: `0 0 15px ${COLORS.bgPrimary}`,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* Server slots */}
              {server.leds.map((_, li) => {
                // LED blink based on frame
                const ledOn =
                  Math.sin((frame * 0.15 + si * 2 + li * 1.7)) > 0;
                return (
                  <div
                    key={li}
                    style={{
                      height: 22,
                      borderRadius: 3,
                      background: `${COLORS.bgPrimary}`,
                      border: `1px solid ${COLORS.textDim}33`,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 6px",
                      gap: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: ledOn ? "#22c55e" : "#374151",
                        boxShadow: ledOn ? "0 0 6px #22c55e88" : "none",
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: `${COLORS.textDim}33`,
                        borderRadius: 1,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: labelAppear,
          transform: `scale(${labelAppear})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 50px",
            borderRadius: 16,
            background: `${COLORS.secondary}20`,
            border: `3px solid ${COLORS.secondary}`,
            boxShadow: `0 0 30px ${COLORS.secondary}44`,
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.secondary,
            direction: "rtl",
          }}
        >
          אומנו על טריליוני מילים
        </div>
      </div>


    </AbsoluteFill>
  );
};
