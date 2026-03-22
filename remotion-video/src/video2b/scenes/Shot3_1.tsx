import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 3.1 — "למה המודל נשמע כל כך בטוח?"
 *
 * Duration: 922 frames (30.72s)
 *
 * Phase 1 (f0-258):   Big question + dramatic reformulation
 * Phase 2 (f244-482): Missing sensors dashboard — no inner compass
 * Phase 3 (f470-728): Style explanation — learned from text sources
 * Phase 4 (f716-922): Punchline — identical packaging, different accuracy
 *
 * Whisper-aligned timecodes (relative to shot start 56.34s):
 *   f0    (0.00s)  "למה המודל נשמע כל כך בטוח?" (starts before shot)
 *   f56   (1.88s)  "שאלה שמבלבלת הרבה משתמשים היא"
 *   f130  (4.34s)  "אם המודל לא בטוח, למה הוא נשמע כל כך בטוח?"
 *   f241  (8.02s)  ↑ ends — transition to Phase 2
 *   f256  (8.52s)  "התשובה היא שלמודל אין תחושת ביטחון או ספק"
 *   f360  (12.0s)  "הוא לא יודע שהוא טועה"
 *   f413  (13.78s) "והוא גם לא יודע כשהוא צודק"
 *   f475  (15.84s) "מה שאנחנו מפרשים כביטחון" — transition to Phase 3
 *   f548  (18.28s) "הוא פשוט סגנון הכתיבה שהמודל למד..."
 *   f640  (21.34s) "אקדמיים" → pillar 1
 *   f664  (22.12s) "עיתונאיים" → pillar 2
 *   f679  (22.64s) "ואנציקלופדיים" → pillar 3
 *   f712  (23.72s) ↑ ends — transition to Phase 4
 *   f726  (24.20s) "לכן גם מידע לא מדויק"
 *   f778  (25.94s) "יכול להופיע באותו ניסוח מקצועי ומשכנע"
 *   f872  (29.08s) ↑ ends
 */

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Phase transitions (Whisper-aligned) ── */
  const phase1Opacity = interpolate(frame, [242, 258], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Opacity = interpolate(
    frame,
    [244, 260, 525, 548],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const interpOpacity = interpolate(
    frame,
    [525, 548, 730, 750],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  // Animate from center (top ~400) to top (80) just before Phase 3 enters
  const interpTop = interpolate(frame, [575, 602], [400, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3Opacity = interpolate(
    frame,
    [602, 618, 748, 764],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const phase4Opacity = interpolate(frame, [750, 766], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: Big Question ── */
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const subtitleOpacity = interpolate(frame, [56, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bigQuestionScale = spring({
    frame: frame - 130,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const qPulse = 0.5 + 0.5 * Math.sin(frame * 0.08);

  /* ── Phase 2: Missing Sensors ── */
  const sensors = [
    { label: "תחושת ביטחון", icon: "🎯", startFrame: 270 },
    { label: "זיהוי טעויות", icon: "🔍", startFrame: 360 },
    { label: "תחושת ספק", icon: "⚖️", startFrame: 413 },
  ];

  /* ── Phase 3: Text Sources ── */
  const sources = [
    { label: "טקסטים אקדמיים", color: COLORS.primary, startFrame: 625 },
    { label: "טקסטים עיתונאיים", color: COLORS.secondary, startFrame: 650 },
    {
      label: "טקסטים אנציקלופדיים",
      color: COLORS.accent,
      startFrame: 665,
    },
  ];
  const outputArrowOpacity = interpolate(frame, [698, 714], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 4: Identical Packaging ── */
  const cardsScale = spring({
    frame: frame - 768,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const equalsScale = spring({
    frame: frame - 830,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });


  return (
    <AbsoluteFill>
      {/* Background image */}
      <Img
        src={staticFile("video2b/images/shot3_1_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary}bb 0%, ${COLORS.bgPrimary}f5 70%)`,
        }}
      />

      {/* ══════════════ PHASE 1: BIG QUESTION ══════════════ */}
      {frame < 276 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase1Opacity,
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.primary,
              direction: "rtl",
              textAlign: "center",
              transform: `scale(${titleScale})`,
              textShadow: `0 0 50px ${COLORS.primary}66, 0 2px 12px rgba(0,0,0,0.6)`,
              letterSpacing: "-1px",
            }}
          >
            למה המודל נשמע כל כך בטוח?
          </div>

          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              fontWeight: 400,
              color: COLORS.textMuted,
              direction: "rtl",
              opacity: subtitleOpacity,
            }}
          >
            שאלה שמבלבלת הרבה משתמשים
          </div>

          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 44,
              fontWeight: 700,
              color: COLORS.accent,
              direction: "rtl",
              textAlign: "center",
              transform: `scale(${bigQuestionScale})`,
              opacity: bigQuestionScale,
              textShadow: `0 0 40px ${COLORS.accent}55`,
              lineHeight: 1.6,
              maxWidth: 900,
            }}
          >
            אם המודל{" "}
            <span style={{ color: COLORS.warning }}>לא בטוח</span>,
            <br />
            למה הוא <span style={{ color: COLORS.primary }}>נשמע</span> כל כך
            בטוח?
          </div>

          {/* Background pulsing question mark */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 120,
              fontWeight: 800,
              color: COLORS.secondary,
              opacity: bigQuestionScale * qPulse * 0.12,
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            ?
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 2: MISSING SENSORS ══════════════ */}
      {frame >= 244 && frame < 566 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase2Opacity,
            gap: 40,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 38,
              fontWeight: 700,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            למודל <span style={{ color: COLORS.warning }}>אין</span> תחושת
            ביטחון או ספק
          </div>

          <div style={{ display: "flex", gap: 40, direction: "rtl" }}>
            {sensors.map((sensor, i) => {
              const cardProgress = spring({
                frame: frame - sensor.startFrame,
                fps,
                config: { damping: 16, stiffness: 90, mass: 0.8 },
              });
              const strikeProgress = interpolate(
                frame,
                [sensor.startFrame + 20, sensor.startFrame + 35],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={i}
                  style={{
                    transform: `scale(${cardProgress})`,
                    opacity: cardProgress,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    border: `1.5px solid ${
                      strikeProgress > 0.5
                        ? COLORS.warning + "44"
                        : "rgba(255,255,255,0.1)"
                    }`,
                    borderRadius: 20,
                    padding: "36px 32px",
                    width: 280,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ fontSize: 48 }}>{sensor.icon}</div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 28,
                      fontWeight: 600,
                      color: COLORS.text,
                      direction: "rtl",
                    }}
                  >
                    {sensor.label}
                  </div>

                  {/* Diagonal red strike line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: `${strikeProgress * 130}%`,
                      height: 3,
                      background: COLORS.warning,
                      transform: "translate(-50%, -50%) rotate(-25deg)",
                      borderRadius: 2,
                      boxShadow: `0 0 12px ${COLORS.warning}66`,
                      opacity: strikeProgress,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom summary */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 40,
              fontWeight: 600,
              color: COLORS.textMuted,
              direction: "rtl",
              textAlign: "center",
              lineHeight: 1.6,
              opacity: interpolate(frame, [440, 458], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            לא יודע שהוא{" "}
            <span style={{ color: COLORS.warning }}>טועה</span>
            {" — "}
            לא יודע שהוא{" "}
            <span style={{ color: "#22c55e" }}>צודק</span>
          </div>
        </div>
      )}

      {/* ══════════════ INTERPRETATION TEXT (center → top, fades before Phase 4) ══════════════ */}
      {frame >= 525 && frame < 760 && (
        <div
          style={{
            position: "absolute",
            top: interpTop,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpOpacity,
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 42,
              fontWeight: 600,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            מה שאנחנו מפרשים כ
            <span style={{ color: COLORS.primary }}>ביטחון</span>
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 42,
              fontWeight: 600,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            הוא פשוט{" "}
            <span style={{ color: COLORS.accent }}>סגנון כתיבה נלמד</span>
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 3: SOURCE PILLARS ══════════════ */}
      {frame >= 602 && frame < 782 && (
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase3Opacity,
            gap: 36,
          }}
        >
          {/* Source pillars */}
          <div
            style={{
              display: "flex",
              gap: 30,
              alignItems: "flex-end",
              direction: "rtl",
            }}
          >
            {sources.map((source, i) => {
              const pillarGrowth = spring({
                frame: frame - source.startFrame,
                fps,
                config: { damping: 18, stiffness: 70, mass: 0.8 },
              });
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    transform: `translateY(${(1 - pillarGrowth) * 30}px)`,
                    opacity: pillarGrowth,
                  }}
                >
                  <div
                    style={{
                      width: 200,
                      height: 130 * pillarGrowth,
                      background: `linear-gradient(to top, ${source.color}33, ${source.color}11)`,
                      border: `1.5px solid ${source.color}55`,
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(8px)",
                      boxShadow: `0 0 30px ${source.color}15, inset 0 0 20px ${source.color}08`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        width: "70%",
                      }}
                    >
                      {[0, 1, 2, 3].map((j) => {
                        const lineWidth = interpolate(
                          frame,
                          [
                            source.startFrame + 15 + j * 10,
                            source.startFrame + 30 + j * 10,
                          ],
                          [0, 60 + (j % 3) * 20],
                          {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                          }
                        );
                        return (
                          <div
                            key={j}
                            style={{
                              height: 3,
                              width: `${lineWidth}%`,
                              background: source.color,
                              opacity: 0.4,
                              borderRadius: 2,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 24,
                      fontWeight: 600,
                      color: source.color,
                      direction: "rtl",
                      textShadow: `0 0 15px ${source.color}44`,
                    }}
                  >
                    {source.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow + output */}
          <div
            style={{
              opacity: outputArrowOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 40,
                color: COLORS.textMuted,
                opacity: 0.6,
              }}
            >
              ↓
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                borderRadius: 16,
                padding: "20px 48px",
                boxShadow: "0 0 40px rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.text,
                  direction: "rtl",
                  textAlign: "center",
                }}
              >
                סגנון כתיבה{" "}
                <span style={{ color: COLORS.primary }}>מקצועי</span> ו
                <span style={{ color: COLORS.secondary }}>משכנע</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 4: PUNCHLINE ══════════════ */}
      {frame >= 750 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase4Opacity,
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 50,
              alignItems: "center",
              direction: "rtl",
            }}
          >
            {/* Card: Inaccurate info (right in RTL) */}
            <div
              style={{
                transform: `scale(${cardsScale})`,
                opacity: cardsScale,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 24,
                padding: "44px 56px",
                width: 480,
                textAlign: "center",
                boxShadow: "0 0 40px rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                {[95, 70, 85, 60].map((w, j) => (
                  <div
                    key={j}
                    style={{
                      height: 5,
                      width: `${w}%`,
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: 2,
                      marginRight: "auto",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.warning,
                  direction: "rtl",
                }}
              >
                ✗ מידע לא מדויק
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 28,
                  color: COLORS.textMuted,
                  marginTop: 10,
                  direction: "rtl",
                }}
              >
                ניסוח מקצועי ומשכנע
              </div>
            </div>

            {/* Equals sign */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.warning,
                opacity: equalsScale,
                textShadow: `0 0 30px ${COLORS.warning}66`,
                transform: `scale(${equalsScale})`,
              }}
            >
              =
            </div>

            {/* Card: Accurate info (left in RTL) */}
            <div
              style={{
                transform: `scale(${cardsScale})`,
                opacity: cardsScale,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 24,
                padding: "44px 56px",
                width: 480,
                textAlign: "center",
                boxShadow: "0 0 40px rgba(255,255,255,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                {[95, 70, 85, 60].map((w, j) => (
                  <div
                    key={j}
                    style={{
                      height: 5,
                      width: `${w}%`,
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: 2,
                      marginRight: "auto",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#22c55e",
                  direction: "rtl",
                }}
              >
                ✓ מידע מדויק
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 28,
                  color: COLORS.textMuted,
                  marginTop: 10,
                  direction: "rtl",
                }}
              >
                ניסוח מקצועי ומשכנע
              </div>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
