import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 2.1 — What is academic integrity? (488 frames · 16.26s · audioStart 14.94s)
 *
 * Narration (relative):
 *   0.0s  "אז מהי יושרה אקדמית ומה פוגע בה?"
 *   3.2s  "יושרה אקדמית היא ההתחייבות לעבוד בכנות ובשקיפות,"
 *   7.2s  "להגיש עבודה שמשקפת את החשיבה שלכם ולהעניק קרדיט ברור ומלא לכל רעיון,"
 *  13.3s  "טענה או ניסוח שאינם שלכם."
 */
export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const titleRise = spring({ frame: frame - 90, fps, config: { damping: 20, stiffness: 60, mass: 1 } });

  const pillars = [
    { icon: "⚖", at: 105, color: COLORS.primary, h: "כנות ושקיפות", d: "התחייבות לעבוד בכנות" },
    { icon: "🧠", at: 216, color: COLORS.secondary, h: "החשיבה שלכם", d: "עבודה שמשקפת את מחשבתכם" },
    { icon: "❝", at: 380, color: COLORS.accent, h: "קרדיט מלא", d: "לכל רעיון, טענה או ניסוח שאינם שלכם" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="integrity_bg.png" dur={488} maxOpacity={0.6} />
      <Particles />

      <div style={{ position: "absolute", top: interpolate(titleRise, [0, 1], [380, 70]), left: 0, right: 0, textAlign: "center", transform: `scale(${interpolate(titleRise, [0, 1], [1, 0.78])})` }}>
        <div style={{ fontSize: 64, fontWeight: 800, direction: "rtl", color: COLORS.text, opacity: title, transform: `scale(${title})`, textShadow: `0 0 30px ${COLORS.primary}55, 0 2px 14px rgba(0,0,0,0.7)` }}>
          מהי <span style={{ color: COLORS.primary }}>יושרה אקדמית</span>?
        </div>
      </div>

      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 34, direction: "rtl" }}>
        {pillars.map((p, i) => {
          const s = spring({ frame: frame - p.at, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
          const float = Math.sin((frame - p.at) * 0.05) * 6;
          return (
            <div
              key={i}
              style={{
                width: 360,
                transform: `scale(${s}) translateY(${float}px)`,
                opacity: s,
                padding: "38px 28px",
                borderRadius: 26,
                background: `linear-gradient(160deg, ${p.color}22 0%, rgba(255,255,255,0.03) 100%)`,
                backdropFilter: "blur(16px)",
                border: `2px solid ${p.color}77`,
                boxShadow: `0 0 50px ${p.color}26`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 64, filter: `drop-shadow(0 0 18px ${p.color})` }}>{p.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: p.color, direction: "rtl" }}>{p.h}</div>
              <div style={{ fontSize: 25, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", lineHeight: 1.4 }}>{p.d}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
