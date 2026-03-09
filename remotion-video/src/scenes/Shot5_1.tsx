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
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 5.1 — LLM vs Search Engine: Split Screen (14 seconds)
 * Split screen comparing search engine (Google) vs LLM (ChatGPT).
 * Real photos presented on 3D perspective cards with smooth animations.
 */

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Title appears (frames 0-60)
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Phase 2: Dividing line grows (frames 30+)
  const lineGrow = interpolate(frame, [30, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Right card (search engine) rotates in (frames 50+)
  const rightCardSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 4: Left card (LLM) rotates in (frames 80+)
  const leftCardSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 5: VS badge appears (frames 140+)
  const vsSpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // Subtle 3D floating for cards
  const floatRight = Math.sin(frame * 0.03) * 3;
  const floatLeft = Math.sin(frame * 0.03 + 1.5) * 3;

  // 3D rotations for card entrance
  const rightRotateY = interpolate(rightCardSpring, [0, 1], [45, 0]);
  const leftRotateY = interpolate(leftCardSpring, [0, 1], [-45, 0]);

  // Search results stagger in (frames 160+)
  const searchResults = [
    { title: "תוצאה ראשונה - ויקיפדיה", url: "he.wikipedia.org", delay: 160 },
    { title: "תוצאה שנייה - מאמר אקדמי", url: "scholar.google.com", delay: 185 },
    { title: "תוצאה שלישית - אתר חדשות", url: "news.example.com", delay: 210 },
  ];

  // Labels appear (frames 120+)
  const labelRightSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const labelLeftSpring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Glow pulse on VS
  const vsPulse = 0.7 + Math.sin(frame * 0.08) * 0.3;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        perspective: "1200px",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          opacity: titleSpring,
          transform: `translateY(${(1 - titleSpring) * 30}px)`,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 30px ${COLORS.primary}44`,
          }}
        >
          מודל שפה{" "}
          <span style={{ color: COLORS.accent }}>vs</span>{" "}
          מנוע חיפוש
        </span>
      </div>

      {/* Center dividing line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 140,
          width: 3,
          height: `${lineGrow * 800}px`,
          background: `linear-gradient(to bottom, ${COLORS.primary}00, ${COLORS.primary}, ${COLORS.primary}00)`,
          transform: "translateX(-50%)",
          boxShadow: `0 0 15px ${COLORS.primary}66`,
          zIndex: 5,
        }}
      />

      {/* RIGHT SIDE — Search Engine (RTL = first/right) */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 160,
          width: 820,
          transformStyle: "preserve-3d",
          transform: `rotateY(${rightRotateY}deg) translateY(${floatRight}px)`,
          opacity: rightCardSpring,
          transformOrigin: "right center",
        }}
      >
        {/* Label */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            opacity: labelRightSpring,
            transform: `translateY(${(1 - labelRightSpring) * 15}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.primary,
              direction: "rtl",
            }}
          >
            מנוע חיפוש
          </span>
        </div>

        {/* Google Image Card */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `2px solid ${COLORS.primary}44`,
            boxShadow: `0 10px 40px ${COLORS.bgPrimary}cc, 0 0 20px ${COLORS.primary}22`,
            transformStyle: "preserve-3d",
          }}
        >
          <Img
            src={staticFile("images/google-search.jpg")}
            style={{
              width: "100%",
              height: 340,
              objectFit: "cover",
            }}
          />
        </div>

        {/* Search results below */}
        <div style={{ marginTop: 20, direction: "rtl" }}>
          {searchResults.map((result, i) => {
            const resultSpring = spring({
              frame: frame - result.delay,
              fps,
              config: { damping: 16, stiffness: 90, mass: 0.8 },
            });
            return (
              <div
                key={i}
                style={{
                  opacity: resultSpring,
                  transform: `translateX(${(1 - resultSpring) * 40}px)`,
                  marginBottom: 12,
                  padding: "10px 16px",
                  borderRadius: 10,
                  background: `${COLORS.bgPrimary}aa`,
                  border: `1px solid ${COLORS.primary}22`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#4a9eff",
                    marginBottom: 2,
                  }}
                >
                  {result.title}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 14,
                    color: "#4ade80",
                  }}
                >
                  {result.url}
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrow pointing to results */}
        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            opacity: interpolate(frame, [240, 270], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              color: COLORS.textMuted,
              direction: "rtl",
            }}
          >
            מציג קישורים קיימים
          </span>
        </div>
      </div>

      {/* LEFT SIDE — LLM / AI */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 160,
          width: 820,
          transformStyle: "preserve-3d",
          transform: `rotateY(${leftRotateY}deg) translateY(${floatLeft}px)`,
          opacity: leftCardSpring,
          transformOrigin: "left center",
        }}
      >
        {/* Label */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 16,
            opacity: labelLeftSpring,
            transform: `translateY(${(1 - labelLeftSpring) * 15}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.secondary,
              direction: "rtl",
            }}
          >
            מודל שפה (LLM)
          </span>
        </div>

        {/* ChatGPT Image Card */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `2px solid ${COLORS.secondary}44`,
            boxShadow: `0 10px 40px ${COLORS.bgPrimary}cc, 0 0 20px ${COLORS.secondary}22`,
            transformStyle: "preserve-3d",
          }}
        >
          <Img
            src={staticFile("images/chatgpt-interface.jpg")}
            style={{
              width: "100%",
              height: 340,
              objectFit: "cover",
            }}
          />
        </div>

        {/* AI typewriter preview */}
        <div
          style={{
            marginTop: 20,
            padding: "16px 20px",
            borderRadius: 14,
            background: `${COLORS.bgPrimary}cc`,
            border: `1px solid ${COLORS.secondary}33`,
            direction: "rtl",
            opacity: interpolate(frame, [200, 240], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              color: COLORS.textMuted,
              marginBottom: 8,
            }}
          >
            תשובת AI:
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              color: COLORS.text,
              lineHeight: 1.6,
            }}
          >
            {(() => {
              const words = "מודל שפה הוא מערכת מחשב שלמדה דפוסי שפה מכמות עצומה של טקסטים...".split(" ");
              const visibleCount = Math.min(
                words.length,
                Math.max(0, Math.floor((frame - 250) / 8))
              );
              return (
                <>
                  {words.slice(0, visibleCount).join(" ")}
                  {visibleCount < words.length && visibleCount > 0 && (
                    <span
                      style={{
                        opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                        color: COLORS.secondary,
                      }}
                    >
                      |
                    </span>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            opacity: interpolate(frame, [280, 310], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              color: COLORS.textMuted,
              direction: "rtl",
            }}
          >
            מייצר תשובה חדשה בזמן אמת
          </span>
        </div>
      </div>

      {/* VS Badge in center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${vsSpring})`,
          zIndex: 10,
          opacity: vsSpring,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent} 0%, ${COLORS.accent}88 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${30 * vsPulse}px ${COLORS.accent}88, 0 0 ${60 * vsPulse}px ${COLORS.accent}44`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 32,
              fontWeight: 800,
              color: COLORS.bgPrimary,
            }}
          >
            VS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
