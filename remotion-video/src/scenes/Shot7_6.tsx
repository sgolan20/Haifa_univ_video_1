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
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 7.6 — AI Can Combine, But Not Understand (7 seconds, 210 frames)
 * Split-screen concept: what AI CAN do vs what it CANNOT.
 * Narration: "הוא יכול לשלב, לערבב ולשנות,
 *            אבל לא להתבונן בעולם ולהפיק ממנו תובנה חדשה."
 *
 * Timing (relative, shot starts at 306s):
 *   f3   — "הוא יכול"
 *   f15  — "לשלב"
 *   f45  — "לערבב"
 *   f57  — "ולשנות"
 *   f93  — "אבל לא"
 *   f102 — "להתבונן בעולם"
 *   f132 — "ולהפיק ממנו תובנה חדשה"
 */

const CAN_ITEMS = [
  { text: "לשלב", frame: 10 },
  { text: "לערבב", frame: 38 },
  { text: "לשנות", frame: 52 },
];

const CANNOT_ITEMS = [
  { text: "להתבונן בעולם", frame: 96 },
  { text: "להפיק תובנה חדשה", frame: 126 },
];

export const Shot7_6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "אבל" divider
  const dividerIn = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  // Bottom conclusion
  const conclusionIn = spring({
    frame: frame - 160,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgPrimary,
      }}
    >
      {/* Split-screen background — AI vs human eye */}
      <Img
        src={staticFile("images/shot7_6_ai_vs_human_bg.png")}
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

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(10,14,26,0.6) 0%, rgba(10,14,26,0.8) 50%, rgba(10,14,26,0.6) 100%)",
        }}
      />

      {/* Two columns container */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 80,
          direction: "rtl",
          alignItems: "flex-start",
        }}
      >
        {/* Right column (RTL first) — CAN do */}
        <div style={{ width: 500 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 800,
              color: COLORS.primary,
              direction: "rtl",
              textAlign: "center",
              marginBottom: 30,
              opacity: spring({
                frame,
                fps,
                config: { damping: 16, stiffness: 90, mass: 0.8 },
              }),
            }}
          >
            מה הוא יכול ✓
          </div>

          {CAN_ITEMS.map((item, i) => {
            const itemIn = spring({
              frame: frame - item.frame,
              fps,
              config: { damping: 14, stiffness: 100, mass: 0.6 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  direction: "rtl",
                  marginBottom: 18,
                  opacity: itemIn,
                  transform: `translateX(${(1 - itemIn) * -30}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: `${COLORS.primary}25`,
                    border: `2px solid ${COLORS.primary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_FAMILY,
                    fontSize: 22,
                    fontWeight: 800,
                    color: COLORS.primary,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 38,
                    fontWeight: 700,
                    color: COLORS.text,
                    direction: "rtl",
                  }}
                >
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider — "אבל" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
            opacity: dividerIn,
            transform: `scaleY(${dividerIn})`,
            paddingTop: 80,
          }}
        >
          <div
            style={{
              width: 3,
              flex: 1,
              background: `linear-gradient(180deg, transparent, ${COLORS.textMuted}44, transparent)`,
            }}
          />
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              fontWeight: 800,
              color: COLORS.warning,
              padding: "12px 0",
            }}
          >
            אבל
          </div>
          <div
            style={{
              width: 3,
              flex: 1,
              background: `linear-gradient(180deg, transparent, ${COLORS.textMuted}44, transparent)`,
            }}
          />
        </div>

        {/* Left column (RTL second) — CANNOT do */}
        <div style={{ width: 500 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 800,
              color: COLORS.warning,
              direction: "rtl",
              textAlign: "center",
              marginBottom: 30,
              opacity: dividerIn,
            }}
          >
            מה הוא לא יכול ✗
          </div>

          {CANNOT_ITEMS.map((item, i) => {
            const itemIn = spring({
              frame: frame - item.frame,
              fps,
              config: { damping: 14, stiffness: 100, mass: 0.6 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  direction: "rtl",
                  marginBottom: 18,
                  opacity: itemIn,
                  transform: `translateX(${(1 - itemIn) * 30}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: `${COLORS.warning}25`,
                    border: `2px solid ${COLORS.warning}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_FAMILY,
                    fontSize: 22,
                    fontWeight: 800,
                    color: COLORS.warning,
                  }}
                >
                  ✗
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 38,
                    fontWeight: 700,
                    color: COLORS.text,
                    direction: "rtl",
                  }}
                >
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom conclusion */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: conclusionIn,
          transform: `scale(${conclusionIn})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            borderRadius: 16,
            background: `${COLORS.secondary}20`,
            border: `3px solid ${COLORS.secondary}`,
            boxShadow: `0 0 30px ${COLORS.secondary}33`,
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.secondary,
            direction: "rtl",
          }}
        >
          שילוב מחדש ≠ תובנה חדשה
        </div>
      </div>
    </AbsoluteFill>
  );
};
