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
import { Logo } from "../../design/Logo";

/**
 * Video 2, Shot 2.2 — 4 hallucination examples (44.2s, 1326 frames)
 *
 * Enhanced with narration-synced animations, whisper-aligned timing,
 * center AI orb, SVG connecting lines, typewriter reveals, floating particles,
 * and multi-layer glow effects.
 *
 * Narration timestamps (relative to shot start at 46.6s):
 *   Card 1 "ציטוטים מפוברקים": frames 0–305
 *   Card 2 "מקורות לא קיימים": frames 305–680
 *   Card 3 "עובדות שגויות": frames 680–994
 *   Card 4 "נתונים מומצאים": frames 994–1326
 */

// ─── Card data ────────────────────────────────────────────
const CARDS = [
  {
    icon: "💬",
    title: "ציטוטים מפוברקים",
    lines: [
      "\"מה אמר איינשטיין על אושר?\"",
      "ציטוט יפהפה, משכנע, מרגש —",
      "שאיינשטיין מעולם לא אמר.",
    ],
    color: COLORS.secondary,
    // Narration-synced frames (relative to shot)
    entryDelay: 20,
    activeStart: 0,
    activeEnd: 290,
    stampFrame: 275,
  },
  {
    icon: "📄",
    title: "מקורות לא קיימים",
    lines: [
      "\"Smith et al., 2019\"",
      "כותרות, שמות חוקרים, שנות פרסום —",
      "המאמרים פשוט לא קיימים.",
    ],
    color: COLORS.primary,
    entryDelay: 50,
    activeStart: 305,
    activeEnd: 660,
    stampFrame: 640,
  },
  {
    icon: "📅",
    title: "עובדות היסטוריות שגויות",
    lines: [
      "\"האירוע התרחש בשנת 1952...\"",
      "תאריכים, תפקידים, עובדות —",
      "הכל נטען בביטחון מלא, אבל שגוי.",
    ],
    color: COLORS.accent,
    entryDelay: 80,
    activeStart: 680,
    activeEnd: 975,
    stampFrame: 955,
  },
  {
    icon: "📊",
    title: "נתונים סטטיסטיים מומצאים",
    lines: [
      "\"43% מהסטודנטים דיווחו ש...\"",
      "מספרים מדויקים לכאורה —",
      "שהמודל המציא מהיסוד.",
    ],
    color: COLORS.warning,
    entryDelay: 110,
    activeStart: 994,
    activeEnd: 1290,
    stampFrame: 1260,
  },
];

// Grid positions (2×2) — RTL layout
const POSITIONS = [
  { left: 980, top: 170 },  // top-right (card 1)
  { left: 70, top: 170 },   // top-left (card 2)
  { left: 980, top: 565 },  // bottom-right (card 3)
  { left: 70, top: 565 },   // bottom-left (card 4)
];

const CARD_W = 830;
const CARD_H = 350;

// Center orb position
const ORB_X = 960;
const ORB_Y = 540;

// ─── Floating particles ──────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: ((i * 137.508) % 1920),
  y: ((i * 97.3 + 200) % 1080),
  size: 2 + (i % 4),
  speed: 0.3 + (i % 5) * 0.15,
  phase: i * 1.7,
  color: i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : COLORS.accent,
}));

export const Shot2_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image fade-in
  const bgOpacity = interpolate(frame, [0, 60], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─── Center orb ───
  const orbPulse = Math.sin(frame * 0.04) * 0.15 + 0.85;
  const orbScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Find which card is currently active
  const activeCardIndex = CARDS.findIndex(
    (c) => frame >= c.activeStart && frame <= c.activeEnd
  );

  // Title
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Summary at end
  const summaryOpacity = interpolate(frame, [1280, 1310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Background image */}
      <Img
        src={staticFile("video2/images/shot2_2_bg.png")}
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

      {/* Floating particles */}
      {PARTICLES.map((p, i) => {
        const yOffset = ((frame * p.speed + p.phase * 50) % (1080 + 40)) - 20;
        const xDrift = Math.sin(frame * 0.02 + p.phase) * 20;
        const particleOpacity = interpolate(
          yOffset,
          [0, 100, 980, 1080],
          [0, 0.6, 0.6, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + xDrift,
              top: yOffset,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: particleOpacity * 0.5,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}44`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 85,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.textMuted,
            direction: "rtl",
            textShadow: `0 2px 10px rgba(0,0,0,0.5)`,
          }}
        >
          4 סוגי הזיות נפוצים
        </div>
      </div>

      {/* SVG layer — connecting lines from orb to cards + orb glow */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Orb glow filter */}
        <defs>
          <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting lines from orb to each card */}
        {CARDS.map((card, i) => {
          const pos = POSITIONS[i];
          // Card center
          const cx = pos.left + CARD_W / 2;
          const cy = pos.top + CARD_H / 2;

          const isActive = i === activeCardIndex;
          const wasActive = frame > card.activeEnd;

          // Line draw progress
          const lineProgress = interpolate(
            frame,
            [card.activeStart, card.activeStart + 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          if (lineProgress <= 0) return null;

          const lineColor = isActive ? card.color : wasActive ? `${card.color}44` : card.color;
          const lineOpacity = isActive ? 0.7 : wasActive ? 0.3 : 0;

          // Animated dash offset for flowing effect
          const dashOffset = -frame * 2;

          return (
            <g key={i} opacity={lineOpacity}>
              {/* Glow line */}
              <line
                x1={ORB_X}
                y1={ORB_Y}
                x2={ORB_X + (cx - ORB_X) * lineProgress}
                y2={ORB_Y + (cy - ORB_Y) * lineProgress}
                stroke={lineColor}
                strokeWidth={6}
                opacity={0.15}
                filter="url(#lineGlow)"
              />
              {/* Dashed line */}
              <line
                x1={ORB_X}
                y1={ORB_Y}
                x2={ORB_X + (cx - ORB_X) * lineProgress}
                y2={ORB_Y + (cy - ORB_Y) * lineProgress}
                stroke={lineColor}
                strokeWidth={2}
                strokeDasharray="8 6"
                strokeDashoffset={dashOffset}
              />
            </g>
          );
        })}

        {/* Center orb */}
        <g
          transform={`translate(${ORB_X}, ${ORB_Y}) scale(${orbScale})`}
          filter="url(#orbGlow)"
        >
          {/* Outer ring pulse */}
          <circle
            r={38 * orbPulse}
            fill="none"
            stroke={activeCardIndex >= 0 ? CARDS[activeCardIndex].color : COLORS.primary}
            strokeWidth={2}
            opacity={0.4}
          />
          {/* Inner filled orb */}
          <circle
            r={24}
            fill={`${COLORS.bgPrimary}`}
            stroke={activeCardIndex >= 0 ? CARDS[activeCardIndex].color : COLORS.primary}
            strokeWidth={3}
          />
          {/* AI text */}
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={FONT_FAMILY}
            fontSize={18}
            fontWeight={800}
            fill={activeCardIndex >= 0 ? CARDS[activeCardIndex].color : COLORS.primary}
          >
            AI
          </text>
        </g>
      </svg>

      {/* ─── 4 Cards ─── */}
      {CARDS.map((card, i) => {
        const pos = POSITIONS[i];

        // Card entrance
        const cardIn = spring({
          frame: frame - card.entryDelay,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        });

        const isActive = i === activeCardIndex;
        const wasActive = frame > card.activeEnd;

        // Active card scales up slightly
        const activeScale = isActive
          ? interpolate(
              frame,
              [card.activeStart, card.activeStart + 20, card.activeEnd - 20, card.activeEnd],
              [1, 1.03, 1.03, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          : 1;

        // Multi-layer glow on active card
        const glowIntensity = isActive
          ? Math.sin(frame * 0.06) * 0.3 + 0.7
          : 0;

        // ❌ stamp
        const stampIn = spring({
          frame: frame - card.stampFrame,
          fps,
          config: { damping: 14, stiffness: 100, mass: 0.8 },
        });

        // Typewriter for example lines (only while active)
        const typewriterProgress = isActive
          ? interpolate(
              frame,
              [card.activeStart + 40, card.activeEnd - 60],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          : wasActive ? 1 : 0;

        // Calculate how many characters to show across all lines
        const fullText = card.lines.join("");
        const totalChars = fullText.length;
        const charsToShow = Math.floor(typewriterProgress * totalChars);

        // Progress indicator bar at bottom of card (shows during active)
        const progressBarWidth = isActive
          ? interpolate(
              frame,
              [card.activeStart, card.activeEnd],
              [0, 100],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          : wasActive ? 100 : 0;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: CARD_W,
              height: CARD_H,
              transform: `scale(${cardIn * activeScale})`,
              opacity: cardIn,
              zIndex: isActive ? 10 : 1,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 20,
                padding: "24px 32px",
                background: `linear-gradient(135deg, ${card.color}${isActive ? "22" : "10"} 0%, rgba(10,14,26,${isActive ? "0.85" : "0.9"}) 100%)`,
                border: `2px solid ${card.color}${isActive ? "bb" : wasActive ? "55" : "33"}`,
                boxShadow: isActive
                  ? `0 0 ${30 * glowIntensity}px ${card.color}33, 0 0 ${60 * glowIntensity}px ${card.color}18, 0 8px 32px rgba(0,0,0,0.5), inset 0 0 ${15 * glowIntensity}px ${card.color}08`
                  : `0 8px 32px rgba(0,0,0,0.4)`,
                backdropFilter: "blur(12px)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                direction: "rtl",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Card header — icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    fontSize: 44,
                    transform: isActive
                      ? `scale(${1 + Math.sin(frame * 0.08) * 0.05})`
                      : "none",
                  }}
                >
                  {card.icon}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 32,
                    fontWeight: 800,
                    color: card.color,
                    textShadow: isActive
                      ? `0 0 ${15 * glowIntensity}px ${card.color}66`
                      : "none",
                  }}
                >
                  {card.title}
                </div>
              </div>

              {/* Example text — typewriter reveal */}
              <div style={{ flex: 1, paddingRight: 8 }}>
                {card.lines.map((line, li) => {
                  // Calculate chars before this line
                  const charsBefore = card.lines
                    .slice(0, li)
                    .reduce((sum, l) => sum + l.length, 0);
                  const lineCharsToShow = Math.max(
                    0,
                    Math.min(line.length, charsToShow - charsBefore)
                  );
                  const visibleText = line.slice(0, lineCharsToShow);

                  if (lineCharsToShow <= 0 && !wasActive) return null;

                  return (
                    <div
                      key={li}
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 25,
                        fontWeight: 400,
                        color: "#cbd5e1",
                        lineHeight: 1.8,
                      }}
                    >
                      {wasActive ? line : visibleText}
                      {/* Blinking cursor at end of typing */}
                      {isActive &&
                        lineCharsToShow > 0 &&
                        lineCharsToShow < line.length && (
                          <span
                            style={{
                              color: card.color,
                              opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                              fontWeight: 300,
                            }}
                          >
                            |
                          </span>
                        )}
                    </div>
                  );
                })}
              </div>

              {/* Progress bar at bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: `${progressBarWidth}%`,
                  height: 3,
                  background: `linear-gradient(90deg, ${card.color}88, ${card.color})`,
                  boxShadow: isActive ? `0 0 8px ${card.color}66` : "none",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: progressBarWidth >= 99 ? 20 : 0,
                }}
              />

              {/* ❌ Stamp overlay */}
              {stampIn > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) scale(${stampIn}) rotate(-12deg)`,
                    opacity: stampIn * 0.8,
                    pointerEvents: "none",
                  }}
                >
                  {/* SVG X mark with path drawing */}
                  <svg width={120} height={120} viewBox="0 0 120 120">
                    <defs>
                      <filter id={`stampGlow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Circle border */}
                    <circle
                      cx={60}
                      cy={60}
                      r={52}
                      fill={`${COLORS.warning}11`}
                      stroke={COLORS.warning}
                      strokeWidth={5}
                      opacity={0.9}
                      filter={`url(#stampGlow${i})`}
                    />
                    {/* X lines */}
                    <line
                      x1={35}
                      y1={35}
                      x2={85}
                      y2={85}
                      stroke={COLORS.warning}
                      strokeWidth={7}
                      strokeLinecap="round"
                      filter={`url(#stampGlow${i})`}
                    />
                    <line
                      x1={85}
                      y1={35}
                      x2={35}
                      y2={85}
                      stroke={COLORS.warning}
                      strokeWidth={7}
                      strokeLinecap="round"
                      filter={`url(#stampGlow${i})`}
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Active card indicator — number badge */}
      {activeCardIndex >= 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {CARDS.map((card, i) => {
            const isCurrent = i === activeCardIndex;
            const isDone = frame > card.activeEnd;
            return (
              <div
                key={i}
                style={{
                  width: isCurrent ? 36 : 12,
                  height: 12,
                  borderRadius: 6,
                  background: isDone
                    ? `${card.color}88`
                    : isCurrent
                      ? card.color
                      : `${COLORS.textDim}44`,
                  boxShadow: isCurrent ? `0 0 12px ${card.color}66` : "none",
                  transition: "none",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Summary text at end */}
      <div
        style={{
          position: "absolute",
          bottom: 38,
          width: "100%",
          textAlign: "center",
          opacity: summaryOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.warning,
            direction: "rtl",
            textShadow: `0 0 20px ${COLORS.warning}44`,
          }}
        >
          כולם נראים אמינים — אף אחד מהם אמיתי
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
