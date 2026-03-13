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
 * Shot 4.1 — "Large" in Large Language Model (21 seconds / 630 frames)
 * Layered scene: AI-generated digital cosmos background + animated overlays.
 *
 * Whisper timing (relative to shot start at 133s):
 *   0.28s "למה" 0.68s "נקרא" 1.06s "מודל" 1.76s "שפה" 2.26s "גדול?"
 *   3.14s "השם" 3.62s "Large" 4.12s "Language" 4.56s "Model"
 *   4.9s "מכיל" 5.8s "שלושה" 6.26s "מרכיבים"
 *   7.4s "Large" 7.9s "גדול"
 *   9.1s "המודלים" 9.9s "מכילים" 10.36s "מיליארדי" 10.92s "פרמטרים"
 *   12.3s "פרמטר" 12.88s "הוא" 13.02s "משתנה" 13.4s "מתמטי"
 *   14.02s "שנלמד" 14.52s "במהלך" 15.04s "האימון"
 *   15.98s "ככל" 16.72s "יותר" 16.94s "פרמטרים"
 *   18.04s "כך" 18.32s "המודל" 18.62s "יכול" 18.86s "ללמוד"
 *   19.28s "דפוסים" 19.86s "מורכבים" 20.32s "יותר"
 */

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image fade-in
  const bgOpacity = interpolate(frame, [0, 50], [0, 0.4], CLAMP);

  // --- Phase 1: Opening question (0-3s / frames 0-90) ---
  // "למה זה נקרא מודל שפה גדול?"
  const questionIn = spring({
    frame: frame - 8,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const questionFade = interpolate(frame, [0, 15, 80, 100], [0, 1, 1, 0], CLAMP);

  // --- Phase 2: Three words appear (3-7s / frames 90-210) ---
  // "השם Large Language Model מכיל שלושה מרכיבים"
  const titleIn = spring({
    frame: frame - 95,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // "Large" temporary highlight at 7.4s (frame 222) — grows then shrinks back
  const largeScale = interpolate(frame, [222, 240, 270, 290], [1, 1.3, 1.3, 1], CLAMP);
  const largeGlow = interpolate(frame, [222, 240, 270, 290], [0, 40, 40, 0], CLAMP);

  // Hebrew subtitle "גדול — מיליארדי פרמטרים" (after "Large, גדול" at ~7.9s)
  const subtitleIn = spring({
    frame: frame - 237,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  // --- Phase 3: Parameter counter (9-12s / frames 270-360) ---
  // "המודלים האלה מכילים מיליארדי פרמטרים"
  const counterStart = 270; // ~9s
  const counterEnd = 450; // ~15s
  const counterProgress = interpolate(frame, [counterStart, counterEnd], [0, 1], CLAMP);
  const counterValue = interpolate(
    counterProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1000, 1000000, 1000000000, 175000000000],
  );
  const counterOpacity = interpolate(frame, [counterStart, counterStart + 20], [0, 1], CLAMP);

  const formatNumber = (n: number): string => {
    if (n >= 1000000000) return `${(n / 1000000000).toFixed(0)} מיליארד`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)} מיליון`;
    if (n >= 1000) return Math.floor(n).toLocaleString();
    return Math.floor(n).toString();
  };

  // --- Phase 4: Parameter explanation (12-15.5s / frames 370-465) ---
  // "פרמטר הוא משתנה מתמטי שנלמד במהלך האימון"
  const explainIn = spring({
    frame: frame - 370,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const explainFade = interpolate(frame, [370, 390, 460, 480], [0, 1, 1, 0], CLAMP);

  // --- Phase 5: More params = more complex (16-21s / frames 480-630) ---
  // "ככל שיש יותר פרמטרים, כך המודל יכול ללמוד דפוסים מורכבים יותר"
  const moreIn = spring({
    frame: frame - 480,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Staggered row entries
  const row1In = spring({
    frame: frame - 500,
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  const row2In = spring({
    frame: frame - 540,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Layer 1: AI-generated cosmos background */}
      <Img
        src={staticFile("video1/images/shot4_1_bg.png")}
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

      {/* Phase 1: Opening question */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          width: "100%",
          textAlign: "center",
          opacity: questionFade,
          transform: `scale(${questionIn})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 30px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.8)`,
          }}
        >
          ?למה זה נקרא &quot;מודל שפה גדול&quot;
        </div>
      </div>

      {/* Phase 2: Large Language Model title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 30}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: "#3b82f6",
            transform: `scale(${largeScale})`,
            textShadow: `0 0 ${largeGlow}px #3b82f688, 0 4px 20px rgba(0,0,0,0.8)`,
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
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
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
          opacity: subtitleIn,
          transform: `translateY(${(1 - subtitleIn) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          }}
        >
          גדול — מיליארדי פרמטרים
        </span>
      </div>

      {/* Phase 3: Parameter counter */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          width: "100%",
          textAlign: "center",
          opacity: counterOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "20px 60px",
            borderRadius: 20,
            background: "rgba(10, 14, 26, 0.75)",
            backdropFilter: "blur(20px)",
            border: `2px solid ${COLORS.accent}44`,
            boxShadow: `0 0 40px ${COLORS.accent}15`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.accent,
              direction: "rtl",
              textShadow: `0 0 25px ${COLORS.accent}66`,
            }}
          >
            {formatNumber(counterValue)} פרמטרים
          </div>
        </div>
      </div>

      {/* Phase 4: Parameter explanation */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: "50%",
          transform: `translateX(-50%) translateY(${(1 - explainIn) * 20}px)`,
          opacity: explainFade,
          width: "70%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "24px 44px",
            borderRadius: 18,
            background: "rgba(10, 14, 26, 0.8)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${COLORS.primary}33`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 600,
              color: COLORS.text,
              direction: "rtl",
              lineHeight: 1.7,
            }}
          >
            <span style={{ color: COLORS.primary, fontWeight: 700 }}>
              פרמטר
            </span>
            {" = משתנה מתמטי שנלמד במהלך האימון"}
          </div>
        </div>
      </div>

      {/* Phase 5: More parameters = more complex patterns */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: "50%",
          transform: `translateX(-50%) scale(${moreIn})`,
          opacity: moreIn,
          width: "75%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "28px 50px",
            borderRadius: 20,
            background: "rgba(10, 14, 26, 0.8)",
            backdropFilter: "blur(20px)",
            border: `2px solid ${COLORS.secondary}44`,
            boxShadow: `0 0 40px ${COLORS.secondary}15`,
          }}
        >
          {/* Row 1: Few params → simple */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              direction: "rtl",
              marginBottom: 18,
              opacity: row1In,
              transform: `translateX(${(1 - row1In) * 40}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.textMuted,
              }}
            >
              1,000 פרמטרים
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                color: COLORS.textMuted,
              }}
            >
              ←
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 600,
                color: COLORS.textMuted,
              }}
            >
              דפוסים פשוטים
            </span>
          </div>

          {/* Row 2: Many params → complex (highlighted) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              direction: "rtl",
              opacity: row2In,
              transform: `translateX(${(1 - row2In) * 40}px)`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 38,
                fontWeight: 800,
                color: COLORS.accent,
                textShadow: `0 0 15px ${COLORS.accent}44`,
              }}
            >
              175,000,000,000 פרמטרים
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                color: COLORS.accent,
              }}
            >
              ←
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 38,
                fontWeight: 800,
                color: COLORS.secondary,
                textShadow: `0 0 15px ${COLORS.secondary}44`,
              }}
            >
              דפוסים מורכבים
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
