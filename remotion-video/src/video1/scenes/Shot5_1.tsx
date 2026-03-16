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
 * Shot 5.1 — Search Engine Side (17 seconds, 510 frames)
 *
 * Narration: "מודל שפה לעומת מנוע חיפוש — מה ההבדל?
 * מנוע חיפוש, כמו גוגל, מחפש מידע קיים באינטרנט.
 * הוא מציג לכם קישורים למקורות. הוא מראה לכם איפה מצא מידע."
 *
 * Visual: Section title → full-screen search engine flow diagram
 * with search bar, crawling animation to source icons, result links.
 */

// Source icons for search engine
const SOURCES = [
  { label: "ויקיפדיה", icon: "W", color: "#4a9eff", delay: 140, x: 500, y: 420 },
  { label: "מאמרים", icon: "📄", color: COLORS.primary, delay: 180, x: 960, y: 520 },
  { label: "אתרי חדשות", icon: "🌐", color: "#4ade80", delay: 220, x: 1420, y: 420 },
];

// Search result items
const RESULTS = [
  { title: "מודל שפה — ויקיפדיה", url: "he.wikipedia.org/wiki/...", delay: 260 },
  { title: "מחקר: השוואת מודלים", url: "scholar.google.com/...", delay: 290 },
  { title: "מדריך למתחילים", url: "techblog.example.com/...", delay: 320 },
];

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title spring
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Title fades to top
  const titleShrink = interpolate(frame, [80, 120], [1, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleUp = interpolate(frame, [80, 120], [0, -80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Search bar appears
  const searchBarIn = spring({
    frame: frame - 100,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Magnifying glass icon animation
  const magGlassRotate = interpolate(frame, [110, 160], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crawling dots progress
  const crawlProgress = interpolate(frame, [160, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom label
  const bottomLabelIn = spring({
    frame: frame - 380,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: titleIn,
          transform: `scale(${titleIn * titleShrink}) translateY(${titleUp}px)`,
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
          <span style={{ color: COLORS.accent }}>מול</span>{" "}
          מנוע חיפוש
        </span>
      </div>

      {/* Subtitle: מנוע חיפוש */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          opacity: searchBarIn,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.primary,
            direction: "rtl",
          }}
        >
          🔍 מנוע חיפוש
        </span>
      </div>

      {/* Crawling lines from search bar to sources */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {SOURCES.map((src, i) => {
          const dotProgress = interpolate(
            crawlProgress,
            [i * 0.2, i * 0.2 + 0.5],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const startX = 960;
          const startY = 310;
          const cx = startX + (src.x - startX) * dotProgress;
          const cy = startY + (src.y - startY) * dotProgress;

          return (
            <React.Fragment key={i}>
              <line
                x1={startX}
                y1={startY}
                x2={startX + (src.x - startX) * dotProgress}
                y2={startY + (src.y - startY) * dotProgress}
                stroke={src.color}
                strokeWidth={2}
                strokeDasharray="6,4"
                opacity={dotProgress * 0.5}
              />
              {dotProgress > 0 && dotProgress < 1 && (
                <circle cx={cx} cy={cy} r={5} fill={src.color} opacity={0.9}>
                  <animate attributeName="r" values="4;7;4" dur="0.5s" repeatCount="indefinite" />
                </circle>
              )}
            </React.Fragment>
          );
        })}
      </svg>

      {/* Search bar — centered */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: `translateX(-50%) scale(${0.9 + searchBarIn * 0.1})`,
          opacity: searchBarIn,
          width: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "20px 32px",
            borderRadius: 40,
            background: `${COLORS.bgPrimary}ee`,
            border: `2px solid ${COLORS.primary}44`,
            boxShadow: `0 4px 30px ${COLORS.bgPrimary}88`,
            direction: "rtl",
          }}
        >
          <svg width={32} height={32} viewBox="0 0 28 28">
            <circle
              cx={12}
              cy={12}
              r={9}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth={2.5}
              transform={`rotate(${magGlassRotate} 12 12)`}
            />
            <line
              x1={19}
              y1={19}
              x2={26}
              y2={26}
              stroke={COLORS.primary}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              color: COLORS.textMuted,
              flex: 1,
            }}
          >
            מהו מודל שפה גדול?
          </span>
        </div>
      </div>

      {/* Source icons — spread across full width */}
      {SOURCES.map((src, i) => {
        const srcIn = spring({
          frame: frame - src.delay,
          fps,
          config: { damping: 16, stiffness: 85, mass: 0.8 },
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: src.x - 60,
              top: src.y,
              opacity: srcIn,
              transform: `scale(${srcIn})`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              direction: "rtl",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${src.color}20`,
                border: `2px solid ${src.color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                fontWeight: 800,
                color: src.color,
              }}
            >
              {src.icon}
            </div>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 600,
                color: src.color,
              }}
            >
              {src.label}
            </span>
          </div>
        );
      })}

      {/* Search result cards — centered */}
      <div
        style={{
          position: "absolute",
          top: 600,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          direction: "rtl",
        }}
      >
        {RESULTS.map((result, i) => {
          const resultIn = spring({
            frame: frame - result.delay,
            fps,
            config: { damping: 16, stiffness: 90, mass: 0.8 },
          });
          return (
            <div
              key={i}
              style={{
                opacity: resultIn,
                transform: `translateX(${(1 - resultIn) * 40}px)`,
                marginBottom: 14,
                padding: "16px 24px",
                borderRadius: 14,
                background: `${COLORS.bgPrimary}cc`,
                border: `1px solid ${COLORS.primary}22`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#4a9eff",
                  marginBottom: 4,
                  textDecoration: "underline",
                  textDecorationColor: "#4a9eff44",
                }}
              >
                {result.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 16,
                  color: "#4ade80",
                }}
              >
                {result.url}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          top: "88%",
          width: "100%",
          textAlign: "center",
          opacity: bottomLabelIn,
          transform: `translateY(${(1 - bottomLabelIn) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.primary,
            direction: "rtl",
            padding: "10px 30px",
            borderRadius: 12,
            background: `${COLORS.bgPrimary}cc`,
            border: `1px solid ${COLORS.primary}33`,
          }}
        >
          מנוע חיפוש מחפש — לא יוצר
        </span>
      </div>
    </AbsoluteFill>
  );
};
