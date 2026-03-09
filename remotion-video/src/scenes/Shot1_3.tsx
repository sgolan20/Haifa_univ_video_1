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
 * Shot 1.3 — Chat Interface (15 seconds)
 * Slides in from right (continuing flow from 1.2 exit).
 * Big bold chat mockup with typewriter.
 * Tool badges slam in. Ends with zoom into the AI response text.
 */

export const Shot1_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  // User message
  const userMsg = spring({
    frame: frame - 25,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // AI typing indicator then response
  const aiTyping = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const aiText = "מודל שפה הוא מערכת בינה מלאכותית שלמדה לזהות דפוסים בשפה אנושית, ומסוגלת לייצר טקסט חדש על בסיס מה שלמדה...";
  const charsToShow = Math.floor(
    interpolate(frame - 80, [0, 200], [0, aiText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Tool badges
  const badge1 = spring({
    frame: frame - 300,
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  const badge2 = spring({
    frame: frame - 330,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Big question text
  const questionSlam = spring({
    frame: frame - 340,
    fps,
    config: { damping: 16, stiffness: 90 },
  });


  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Chat window — big and centered */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "10%",
          width: "80%",
          height: "65%",
          borderRadius: 24,
          background: `${COLORS.bgPrimary}f0`,
          border: `2px solid ${COLORS.primary}44`,
          boxShadow: `0 0 80px ${COLORS.primary}15, 0 30px 60px rgba(0,0,0,0.6)`,
          padding: "70px 50px 50px",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 55,
            background: COLORS.bgSecondary,
            borderBottom: `2px solid ${COLORS.primary}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 20,
              fontWeight: 600,
              color: COLORS.primary,
              letterSpacing: 2,
              direction: "ltr",
            }}
          >
            AI Assistant
          </div>
        </div>

        {/* User message */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            opacity: userMsg,
            transform: `translateX(${(1 - userMsg) * 200}px)`,
          }}
        >
          <div
            style={{
              padding: "22px 36px",
              borderRadius: "24px 24px 6px 24px",
              background: "#1e3a5f",
              border: "1px solid #2563eb55",
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              fontWeight: 500,
              color: COLORS.text,
              direction: "rtl",
            }}
          >
            מה זה מודל שפה?
          </div>
        </div>

        {/* AI response */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            opacity: aiTyping,
          }}
        >
          <div
            style={{
              padding: "22px 36px",
              borderRadius: "24px 24px 24px 6px",
              background: `${COLORS.primary}18`,
              border: `1px solid ${COLORS.primary}44`,
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 400,
              color: COLORS.text,
              direction: "rtl",
              lineHeight: 1.7,
              maxWidth: "85%",
            }}
          >
            {charsToShow > 0 ? aiText.slice(0, charsToShow) : ""}
            {charsToShow < aiText.length && charsToShow > 0 && (
              <span
                style={{
                  color: COLORS.primary,
                  opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                }}
              >
                |
              </span>
            )}
            {charsToShow === 0 && (
              <span style={{ color: COLORS.textMuted }}>
                <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0.3 }}>●</span>
                <span style={{ opacity: Math.sin(frame * 0.3 + 1) > 0 ? 1 : 0.3 }}> ●</span>
                <span style={{ opacity: Math.sin(frame * 0.3 + 2) > 0 ? 1 : 0.3 }}> ●</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tool badges — big and bold */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 30,
        }}
      >
        <div
          style={{
            transform: `scale(${badge1})`,
            padding: "16px 40px",
            borderRadius: 40,
            background: "#10a37f22",
            border: "2px solid #10a37f",
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 700,
            color: "#10a37f",
            letterSpacing: 1,
          }}
        >
          ChatGPT
        </div>
        <div
          style={{
            transform: `scale(${badge2})`,
            padding: "16px 40px",
            borderRadius: 40,
            background: "#d9770622",
            border: "2px solid #d97706",
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 700,
            color: "#d97706",
            letterSpacing: 1,
          }}
        >
          Claude
        </div>
      </div>

      {/* Bottom question */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 32,
          fontWeight: 600,
          color: COLORS.textMuted,
          opacity: questionSlam,
          transform: `scale(${questionSlam})`,
          direction: "rtl",
        }}
      >
        אבל איך זה באמת עובד?
      </div>


    </AbsoluteFill>
  );
};
