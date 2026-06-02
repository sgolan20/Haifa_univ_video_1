import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 3.1 — Search engine = information retrieval
 * Duration: 835 frames (27.82s) · audioStart 36.8s
 *
 * f0:    title "שליפת מידע / Information Retrieval" (turquoise)
 * f117:  3-step flow appears staggered — סריקה → אינדוקס → קישורים
 * f420:  search-result card with a verifiable URL
 * f650:  three tags light up — מקור · אחריות · שרשרת לאחור
 *
 * Narration (relative):
 *   0.0s  "מנוע חיפוש כמו גוגל פועל על עיקרון של שליפת מידע."
 *   3.9s  "הוא סורק... מאנדקס אותם ומחזיר לכם קישורים למסמכים קיימים"
 *  14.0s  "מדובר בתוכן שנכתב על ידי אדם או גוף מסוים, בזמן מסוים, ומפורסם בכתובת..."
 *  21.7s  "יש מקור, יש אחריות, יש שרשרת מידע שניתן לעקוב אחריה לאחור."
 */
export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);

  const step1 = spring({ frame: frame - 117, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const step2 = spring({ frame: frame - 225, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const step3 = spring({ frame: frame - 290, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });

  const card = spring({ frame: frame - 420, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });

  const tag1 = spring({ frame: frame - 650, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const tag2 = spring({ frame: frame - 685, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const tag3 = spring({ frame: frame - 725, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, ${COLORS.primary} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      {/* faint rotating search-network behind everything (transparent, no square) */}
      <Img
        src={staticFile("lesson2-lecture1/images/search_network_nobg.png")}
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${frame * 0.05}deg) scale(${interpolate(frame, [0, 835], [1.0, 1.12])})`,
          objectFit: "contain",
          opacity: interpolate(frame, [0, 60], [0, 0.16], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />

      {/* title */}
      <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.primary, direction: "rtl", textShadow: `0 0 ${30 + glow * 26}px ${COLORS.primary}66` }}>
          מנוע חיפוש = שליפת מידע
        </div>
        <div style={{ fontSize: 28, fontWeight: 500, color: COLORS.textMuted, direction: "ltr", marginTop: 6, letterSpacing: 1 }}>Information Retrieval</div>
      </div>

      {/* 3-step flow */}
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, direction: "rtl" }}>
        <Step scale={step1} icon="🌐" label="סריקה" sub="מאות מיליארדי דפים" />
        <Chevron on={step2} />
        <Step scale={step2} icon="📑" label="אינדוקס" sub="ארגון המידע" />
        <Chevron on={step3} />
        <Step scale={step3} icon="🔗" label="קישורים" sub="למסמכים קיימים" />
      </div>

      {/* search-result card */}
      {frame > 410 && (
        <div
          style={{
            position: "absolute",
            top: 470,
            left: "50%",
            transform: `translateX(-50%) scale(${card})`,
            opacity: card,
            width: 880,
            padding: "30px 40px",
            borderRadius: 18,
            textAlign: "right",
            direction: "rtl",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            border: `1.5px solid ${COLORS.primary}44`,
            boxShadow: `0 0 36px ${COLORS.primary}14`,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, color: "#69b4ff", direction: "rtl" }}>תוצאת חיפוש — מסמך מקורי</div>
          <div style={{ fontSize: 22, fontWeight: 500, color: "#4ade80", direction: "ltr", textAlign: "left", margin: "8px 0 14px" }}>https://example.edu/research/article-2024</div>
          <div style={{ fontSize: 26, fontWeight: 400, color: COLORS.textMuted, lineHeight: 1.5 }}>
            נכתב על ידי אדם או גוף מסוים · בזמן מסוים · בכתובת שניתן <span style={{ color: COLORS.text, fontWeight: 600 }}>לְאַמֵּת</span>
          </div>
        </div>
      )}

      {/* three trust tags */}
      {frame > 645 && (
        <div style={{ position: "absolute", top: 730, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24, direction: "rtl" }}>
          <Tag scale={tag1} label="מקור" />
          <Tag scale={tag2} label="אחריות" />
          <Tag scale={tag3} label="שרשרת לאחור" />
        </div>
      )}
    </AbsoluteFill>
  );
};

const Step: React.FC<{ scale: number; icon: string; label: string; sub: string }> = ({ scale, icon, label, sub }) => (
  <div
    style={{
      transform: `scale(${scale})`,
      opacity: scale,
      width: 300,
      padding: "26px 0",
      borderRadius: 20,
      background: `linear-gradient(160deg, ${COLORS.primary}18 0%, rgba(255,255,255,0.03) 100%)`,
      backdropFilter: "blur(14px)",
      border: `1.5px solid ${COLORS.primary}55`,
      boxShadow: `0 0 30px ${COLORS.primary}12`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    }}
  >
    <div style={{ fontSize: 52 }}>{icon}</div>
    <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 400, color: COLORS.textMuted, direction: "rtl" }}>{sub}</div>
  </div>
);

// RTL flow (right → left): arrow must point LEFT. Use a geometric triangle
// (not bidi-mirrored) so it never flips, and isolate its direction to be safe.
const Chevron: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ direction: "ltr", unicodeBidi: "isolate", fontSize: 34, color: COLORS.primary, opacity: on * 0.85 }}>◀</div>
);

const Tag: React.FC<{ scale: number; label: string }> = ({ scale, label }) => (
  <div
    style={{
      transform: `scale(${scale})`,
      opacity: scale,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 34px",
      borderRadius: 999,
      background: `${COLORS.primary}1a`,
      border: `1.5px solid ${COLORS.primary}77`,
      fontSize: 32,
      fontWeight: 700,
      color: COLORS.primary,
      direction: "rtl",
      textShadow: `0 0 20px ${COLORS.primary}44`,
    }}
  >
    <span style={{ color: "#4ade80" }}>✓</span>
    {label}
  </div>
);
