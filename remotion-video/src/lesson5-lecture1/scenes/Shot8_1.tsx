import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { AiNode, GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

const TASKS = [
  { text: "עבודה אקדמית", at: 72 },
  { text: "ניתוח מאמר", at: 112 },
  { text: "הכנה למבחן", at: 158 },
  { text: "דרישות קורס", at: 202 },
];

const HIDDEN = [
  { text: "מה המרצה ביקש", at: 360 },
  { text: "מה למדתם בכיתה", at: 398 },
  { text: "מה רמת הקורס", at: 438 },
  { text: "מה נחשב טוב", at: 480 },
];

export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const context = sp(frame, fps, 270);

  return (
    <SceneShell accent={COLORS.secondary} variant="flow">
      <TopLabel title="כשמשימה מורכבת, צריך יותר הקשר" kicker="המודל לא יודע לבד" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 245, right: 106, width: 600, display: "flex", flexDirection: "column", gap: 18, direction: "rtl" }}>
        {TASKS.map((task, i) => (
          <GlassCard
            key={task.text}
            color={i % 2 === 0 ? COLORS.primary : COLORS.secondary}
            style={{
              padding: "24px 34px",
              opacity: sp(frame, fps, task.at),
              transform: `translateX(${interpolate(sp(frame, fps, task.at), [0, 1], [60, 0])}px)`,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 880 }}>{task.text}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ position: "absolute", left: 205, top: 338, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <AiNode scale={sp(frame, fps, 190)} color={COLORS.secondary} />
        <Pill color={COLORS.accent} appear={context} style={{ fontSize: 34, padding: "18px 44px" }}>
          כתבו לו את ההקשר
        </Pill>
      </div>

      <GlassCard
        color={COLORS.accent}
        style={{
          position: "absolute",
          left: 570,
          top: 292,
          width: 520,
          padding: "30px 34px",
          opacity: sp(frame, fps, 330),
        }}
      >
        <div style={{ fontSize: 29, fontWeight: 850, color: COLORS.textMuted, marginBottom: 18 }}>מה חסר למודל?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {HIDDEN.map((item) => (
            <Pill key={item.text} color={COLORS.accent} appear={sp(frame, fps, item.at)} style={{ fontSize: 27, justifyContent: "flex-start" }}>
              {item.text}
            </Pill>
          ))}
        </div>
      </GlassCard>
    </SceneShell>
  );
};
