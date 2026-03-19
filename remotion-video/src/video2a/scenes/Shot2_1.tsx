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
 * Shot 2.1 — What are Hallucinations? (960 frames, 32s)
 *
 * Narration sync (frames relative to shot start):
 *   f13-50:   "מהן Hallucinations" (27.44-28.66)
 *   f71-245:  "Hallucination...אמין ומדויק" (29.36-35.18)
 *   f261-367: "אך בפועל...אמיתי" (35.70-39.24)
 *   f389-416: "חשוב לציין" (39.98-40.88)
 *   f432-581: "במודלים הראשונים...בולטות" (41.40-46.38)
 *   f593-681: "למשל ציטוטים...קיימים" (46.78-49.70)
 *   f698-887: "המודלים כיום...לזיהוי" (50.28-56.56)
 *   f902-946: "בואו נראה כמה דוגמאות" (57.06-58.54)
 *
 * Animation phases:
 *   Phase 1 (0-370):   Definition with mask reveal — two overlapping rectangles
 *   Phase 2 (370-960): Two comparison glass panels (early vs current models)
 *                      Early panel starts centered, slides right when current panel enters
 */

// Example cards — early models
const EARLY_CARDS = [
  { emoji: "📄", text: "מאמר שלא קיים", delay: 510 },
  { emoji: "💬", text: "ציטוט שהומצא", delay: 560 },
];

// Example cards — current models
const CURRENT_CARDS = [
  { emoji: "📊", text: "נתון שנשמע אמין", delay: 770 },
  { emoji: "📚", text: "ייחוס שנראה סביר", delay: 840 },
];

// Ambient floating particles
const PARTICLES = [
  { x: 150, y: 800, size: 4, color: "#00d4ff", phase: 0 },
  { x: 1750, y: 650, size: 3, color: "#8b5cf6", phase: 1.5 },
  { x: 400, y: 920, size: 5, color: "#00d4ff", phase: 0.8 },
  { x: 1500, y: 780, size: 3, color: "#fbbf24", phase: 2.2 },
  { x: 800, y: 860, size: 4, color: "#8b5cf6", phase: 3.1 },
  { x: 1200, y: 720, size: 3, color: "#00d4ff", phase: 1.2 },
];

// Document mockup lines — early models
const EARLY_DOC_LINES = [
  { error: false, w: "92%" },
  { error: true, w: "78%" },
  { error: false, w: "85%" },
  { error: true, w: "65%" },
  { error: false, w: "80%" },
];

// Document mockup lines — current models
const CURRENT_DOC_LINES = [
  { warn: false, w: "90%" },
  { warn: false, w: "82%" },
  { warn: true, w: "86%" },
  { warn: false, w: "74%" },
  { warn: false, w: "88%" },
];


export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =====================
  // Background image
  // =====================
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 1 (0-370): Definition with mask reveal
  // =====================

  const sectionTitleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const sectionTitleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase1FadeOut = interpolate(frame, [340, 370], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rect1Scale = spring({
    frame: frame - 70,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const rect1Opacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rect2Scale = spring({
    frame: frame - 261,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const rect2Opacity = interpolate(frame, [261, 281], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 2 (370-960): Two comparison panels
  // =====================

  const phase2Active = frame >= 370;

  const phase2Opacity = interpolate(frame, [370, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ambient particles fade in
  const particleBaseOpacity = interpolate(frame, [370, 430], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "חשוב לציין" note title
  const noteTitleScale = spring({
    frame: frame - 389,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const noteTitleOpacity = interpolate(frame, [389, 404], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Early models panel — entrance
  const earlyPanelEntrance = spring({
    frame: frame - 432,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const earlyPanelOpacity = interpolate(frame, [432, 452], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Early panel slides from center to right
  const slideSpring = spring({
    frame: frame - 660,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });
  const earlyPanelLeft = interpolate(slideSpring, [0, 1], [700, 1020]);

  // Scan line sweeps through early document
  const earlyScanProgress = interpolate(frame, [455, 500], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const earlyScanOpacity = interpolate(frame, [455, 462, 493, 505], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Error marks revealed by scan
  const earlyErrorOpacity = interpolate(frame, [460, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow on error indicators
  const errorPulse = 0.7 + Math.sin(frame * 0.08) * 0.3;

  // "הזיות בולטות" label
  const earlyLabelOpacity = interpolate(frame, [580, 600], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Current models panel — entrance
  const currentPanelEntrance = spring({
    frame: frame - 698,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const currentPanelOpacity = interpolate(frame, [698, 718], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scan line for current document
  const currentScanProgress = interpolate(frame, [720, 765], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentScanOpacity = interpolate(frame, [720, 727, 758, 770], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Warning marks
  const currentWarningOpacity = interpolate(frame, [730, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse on warning indicators
  const warningPulse = 0.75 + Math.sin(frame * 0.06) * 0.25;

  // "הזיות עדינות" label
  const currentLabelOpacity = interpolate(frame, [855, 875], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* AI-generated background image */}
      <Img
        src={staticFile("video2a/images/shot2_1_document_cracks.png")}
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

      {/* ── Persistent title: always visible, not affected by phase transitions ── */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 104,
            fontWeight: 800,
            color: COLORS.primary,
            direction: "ltr",
            letterSpacing: 4,
            textShadow: `0 0 30px ${COLORS.primary}44`,
          }}
        >
          Hallucinations
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.text,
            marginRight: 30,
            marginLeft: 30,
          }}
        >
          /
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 88,
            fontWeight: 700,
            color: COLORS.text,
            direction: "rtl",
          }}
        >
          הזיות
        </span>
      </div>

      {/* ===== Phase 1: Definition with mask reveal ===== */}
      {frame < 390 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: phase1FadeOut,
          }}
        >

          {/* Overlapping rectangles container */}
          <div
            style={{
              position: "absolute",
              top: "52%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 740,
              height: 360,
            }}
          >
            {/* Rectangle 2 (warning/red — revealed underneath) */}
            <div
              style={{
                position: "absolute",
                top: 120,
                left: 0,
                width: "100%",
                padding: 24,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.bgPrimary}f0 0%, ${COLORS.bgPrimary}dd 100%)`,
                border: `1px solid ${COLORS.warning}55`,
                boxShadow: `
                  0 0 30px ${COLORS.warning}18,
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.04)
                `,
                opacity: rect2Opacity,
                transform: `scale(${rect2Scale})`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                direction: "rtl",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.warning,
                  flexShrink: 0,
                  textShadow: `0 0 14px ${COLORS.warning}55`,
                }}
              >
                ✗
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 32,
                  fontWeight: 500,
                  color: COLORS.warning,
                  direction: "rtl",
                  textAlign: "right",
                  lineHeight: 1.5,
                }}
              >
                שגוי או לא מבוסס על מקור אמיתי
              </div>
            </div>

            {/* Rectangle 1 (turquoise — top layer) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                padding: 24,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${COLORS.bgPrimary}f8 0%, ${COLORS.bgPrimary}ee 100%)`,
                border: `1px solid ${COLORS.primary}55`,
                boxShadow: `
                  0 0 30px ${COLORS.primary}18,
                  0 8px 32px rgba(0, 0, 0, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05)
                `,
                opacity: rect1Opacity,
                transform: `scale(${rect1Scale})`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                direction: "rtl",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.primary,
                  flexShrink: 0,
                  textShadow: `0 0 14px ${COLORS.primary}55`,
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 32,
                  fontWeight: 500,
                  color: COLORS.text,
                  direction: "rtl",
                  textAlign: "right",
                  lineHeight: 1.5,
                }}
              >
                מידע שנשמע אמין ומדויק
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Phase 2: Two comparison glass panels ===== */}
      {phase2Active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: phase2Opacity,
          }}
        >
          {/* Subtle dot grid texture */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `radial-gradient(${COLORS.primary}06 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Cinematic vignette */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Floating ambient particles */}
          {PARTICLES.map((p, i) => {
            const floatY = Math.sin((frame - 370) * 0.015 + p.phase) * 25;
            const floatX = Math.cos((frame - 370) * 0.01 + p.phase * 1.3) * 12;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: p.x + floatX,
                  top: p.y + floatY,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: p.color,
                  opacity: particleBaseOpacity * 0.35,
                  boxShadow: `0 0 ${p.size * 4}px ${p.color}88`,
                }}
              />
            );
          })}

          {/* Title is now rendered persistently outside phase blocks */}

          {/* ════════════════════════════════════════════════ */}
          {/* ── Right panel — Early models                ── */}
          {/* ════════════════════════════════════════════════ */}
          <div
            style={{
              position: "absolute",
              top: 295,
              left: earlyPanelLeft,
              width: 520,
              background: `linear-gradient(145deg, ${COLORS.bgPrimary}dd 0%, ${COLORS.bgPrimary}c4 100%)`,
              border: `1px solid ${COLORS.warning}44`,
              borderRadius: 20,
              padding: "28px 32px",
              boxShadow: `
                0 0 50px ${COLORS.warning}12,
                0 16px 48px rgba(0, 0, 0, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.04)
              `,
              opacity: earlyPanelOpacity,
              transform: `scale(${earlyPanelEntrance})`,
              direction: "rtl",
            }}
          >
            {/* Top accent bar — gradient */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 24,
                left: 24,
                height: 2.5,
                background: `linear-gradient(to left, ${COLORS.warning}cc, ${COLORS.warning}00)`,
                borderRadius: "0 0 2px 2px",
              }}
            />

            {/* Panel header */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.warning,
                textAlign: "right",
                marginBottom: 18,
                textShadow: `0 0 20px ${COLORS.warning}33`,
              }}
            >
              מודלים ראשוניים
            </div>

            {/* Document mockup with scan line */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(180deg, ${COLORS.bgSecondary}99 0%, ${COLORS.bgSecondary}66 100%)`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 6,
                display: "flex",
                flexDirection: "column",
                gap: 7,
                border: `1px solid rgba(255,255,255,0.03)`,
              }}
            >
              {/* Scan line effect */}
              <div
                style={{
                  position: "absolute",
                  top: `${earlyScanProgress}%`,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, transparent 5%, ${COLORS.warning}cc 30%, ${COLORS.warning} 50%, ${COLORS.warning}cc 70%, transparent 95%)`,
                  boxShadow: `0 0 12px ${COLORS.warning}88, 0 0 24px ${COLORS.warning}44`,
                  opacity: earlyScanOpacity,
                  zIndex: 2,
                }}
              />

              {/* Text lines with error marks */}
              {EARLY_DOC_LINES.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    direction: "rtl",
                  }}
                >
                  {line.error && (
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 16,
                        color: COLORS.warning,
                        fontWeight: 700,
                        opacity: earlyErrorOpacity,
                        textShadow: `0 0 8px ${COLORS.warning}66`,
                        flexShrink: 0,
                      }}
                    >
                      ✗
                    </span>
                  )}
                  <div
                    style={{
                      height: 7,
                      width: line.w,
                      borderRadius: 4,
                      background: line.error
                        ? `linear-gradient(to left, ${COLORS.warning}77, ${COLORS.warning}44)`
                        : `${COLORS.textMuted}25`,
                      boxShadow: line.error
                        ? `0 0 8px ${COLORS.warning}22`
                        : "none",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Decorative divider */}
            <div
              style={{
                width: "50%",
                height: 1,
                margin: "12px auto",
                background: `linear-gradient(to right, transparent, ${COLORS.warning}30, transparent)`,
              }}
            />

            {/* Error example cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {EARLY_CARDS.map((card, i) => {
                const cardScale = spring({
                  frame: frame - card.delay,
                  fps,
                  config: { damping: 16, stiffness: 90, mass: 0.8 },
                });

                const cardOpacity = interpolate(
                  frame,
                  [card.delay, card.delay + 15],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardOpacity,
                      transform: `scale(${cardScale})`,
                      padding: "10px 16px",
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${COLORS.bgPrimary}ee 0%, ${COLORS.bgPrimary}cc 100%)`,
                      border: `1px solid ${COLORS.warning}35`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      direction: "rtl",
                    }}
                  >
                    {/* Error indicator with pulsing glow — right side (RTL start) */}
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: `${COLORS.warning}18`,
                        border: `1px solid ${COLORS.warning}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 0 ${10 * errorPulse}px ${COLORS.warning}33`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT_FAMILY,
                          fontSize: 16,
                          fontWeight: 700,
                          color: COLORS.warning,
                        }}
                      >
                        ✗
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 25,
                        fontWeight: 500,
                        color: COLORS.warning,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      {card.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Label badge */}
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <div
                style={{
                  display: "inline-block",
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.warning,
                  background: `${COLORS.warning}10`,
                  border: `1px solid ${COLORS.warning}30`,
                  borderRadius: 8,
                  padding: "5px 22px",
                  opacity: earlyLabelOpacity,
                  textShadow: `0 0 16px ${COLORS.warning}33`,
                }}
              >
                הזיות בולטות
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* ── Left panel — Current models               ── */}
          {/* ════════════════════════════════════════════════ */}
          <div
            style={{
              position: "absolute",
              top: 295,
              left: 380,
              width: 520,
              background: `linear-gradient(145deg, ${COLORS.bgPrimary}dd 0%, ${COLORS.bgPrimary}c4 100%)`,
              border: `1px solid ${COLORS.accent}44`,
              borderRadius: 20,
              padding: "28px 32px",
              boxShadow: `
                0 0 50px ${COLORS.accent}12,
                0 16px 48px rgba(0, 0, 0, 0.35),
                inset 0 1px 0 rgba(255, 255, 255, 0.04)
              `,
              opacity: currentPanelOpacity,
              transform: `scale(${currentPanelEntrance})`,
              direction: "rtl",
            }}
          >
            {/* Top accent bar — gradient */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 24,
                left: 24,
                height: 2.5,
                background: `linear-gradient(to left, ${COLORS.accent}cc, ${COLORS.accent}00)`,
                borderRadius: "0 0 2px 2px",
              }}
            />

            {/* Panel header */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.accent,
                textAlign: "right",
                marginBottom: 18,
                textShadow: `0 0 20px ${COLORS.accent}33`,
              }}
            >
              מודלים מתקדמים
            </div>

            {/* Clean document mockup with scan line */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: `linear-gradient(180deg, ${COLORS.bgSecondary}99 0%, ${COLORS.bgSecondary}66 100%)`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 6,
                display: "flex",
                flexDirection: "column",
                gap: 7,
                border: `1px solid rgba(255,255,255,0.03)`,
              }}
            >
              {/* Scan line effect */}
              <div
                style={{
                  position: "absolute",
                  top: `${currentScanProgress}%`,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(to right, transparent 5%, ${COLORS.accent}aa 30%, ${COLORS.accent} 50%, ${COLORS.accent}aa 70%, transparent 95%)`,
                  boxShadow: `0 0 12px ${COLORS.accent}66, 0 0 24px ${COLORS.accent}33`,
                  opacity: currentScanOpacity,
                  zIndex: 2,
                }}
              />

              {/* Text lines — mostly clean, one subtle warning */}
              {CURRENT_DOC_LINES.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    direction: "rtl",
                  }}
                >
                  {line.warn && (
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 14,
                        color: COLORS.accent,
                        opacity: currentWarningOpacity * 0.6,
                        flexShrink: 0,
                      }}
                    >
                      ⚠
                    </span>
                  )}
                  <div
                    style={{
                      height: 7,
                      width: line.w,
                      borderRadius: 4,
                      background: line.warn
                        ? `linear-gradient(to left, ${COLORS.accent}44, ${COLORS.accent}22)`
                        : `${COLORS.textMuted}25`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Decorative divider */}
            <div
              style={{
                width: "50%",
                height: 1,
                margin: "12px auto",
                background: `linear-gradient(to right, transparent, ${COLORS.accent}25, transparent)`,
              }}
            />

            {/* Warning example cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {CURRENT_CARDS.map((card, i) => {
                const cardScale = spring({
                  frame: frame - card.delay,
                  fps,
                  config: { damping: 16, stiffness: 90, mass: 0.8 },
                });

                const cardOpacity = interpolate(
                  frame,
                  [card.delay, card.delay + 15],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardOpacity,
                      transform: `scale(${cardScale})`,
                      padding: "10px 16px",
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${COLORS.bgPrimary}ee 0%, ${COLORS.bgPrimary}cc 100%)`,
                      border: `1px solid ${COLORS.accent}30`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      direction: "rtl",
                    }}
                  >
                    {/* Warning indicator — right side (RTL start) */}
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: `${COLORS.accent}12`,
                        border: `1px solid ${COLORS.accent}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 0 ${8 * warningPulse}px ${COLORS.accent}22`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: FONT_FAMILY,
                          fontSize: 15,
                          fontWeight: 700,
                          color: COLORS.accent,
                          opacity: 0.85,
                        }}
                      >
                        ⚠
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 25,
                        fontWeight: 500,
                        color: COLORS.accent,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      {card.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Label badge */}
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <div
                style={{
                  display: "inline-block",
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.accent,
                  background: `${COLORS.accent}0c`,
                  border: `1px solid ${COLORS.accent}28`,
                  borderRadius: 8,
                  padding: "5px 22px",
                  opacity: currentLabelOpacity,
                  textShadow: `0 0 16px ${COLORS.accent}28`,
                }}
              >
                הזיות עדינות
              </div>
            </div>
          </div>
        </div>
      )}


    </AbsoluteFill>
  );
};
