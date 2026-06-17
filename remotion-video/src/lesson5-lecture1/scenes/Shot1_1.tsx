import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { AiNode, ArrowLeft, GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

const TASKS = [
  { text: "לסכם מאמר", at: 28, color: COLORS.primary },
  { text: "להתכונן למבחן", at: 50, color: COLORS.accent },
  { text: "תגובה לפורום", at: 74, color: COLORS.secondary },
  { text: "לשפר פסקה", at: 98, color: "#22c55e" },
];

const ISSUES = [
  { text: "כללית מדי", at: 468, color: COLORS.accent },
  { text: "ארוכה מדי", at: 528, color: COLORS.secondary },
  { text: "לא מדויקת", at: 572, color: COLORS.warning },
  { text: "לא בכיוון", at: 620, color: COLORS.warning },
];

export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prompt = sp(frame, fps, 278);
  const ai = sp(frame, fps, 318);
  const output = sp(frame, fps, 410);
  const question = sp(frame, fps, 690, { stiffness: 100 });

  return (
    <SceneShell accent={COLORS.primary} variant="flow">
      <TopLabel title="אותה משימה, תוצאה אחרת" kicker="אוריינות פרומפטים" at={8} />

      <div
        style={{
          position: "absolute",
          top: 204,
          right: 92,
          width: 620,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
          direction: "rtl",
        }}
      >
        {TASKS.map((task, i) => {
          const show = sp(frame, fps, task.at);
          const float = Math.sin((frame + i * 22) * 0.04) * 5;
          return (
            <GlassCard
              key={task.text}
              color={task.color}
              style={{
                padding: "26px 30px",
                minHeight: 104,
                opacity: show,
                transform: `translateY(${interpolate(show, [0, 1], [32, 0]) + float}px)`,
              }}
            >
              <div style={{ fontSize: 34, fontWeight: 850, textAlign: "center" }}>{task.text}</div>
            </GlassCard>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: 470,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
          direction: "rtl",
        }}
      >
        <GlassCard
          color={COLORS.primary}
          style={{
            width: 430,
            padding: "30px 34px",
            opacity: prompt,
            transform: `translateX(${interpolate(prompt, [0, 1], [54, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 26, color: COLORS.textMuted, fontWeight: 700, marginBottom: 12 }}>פרומפט מעורפל</div>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.15 }}>תעזור לי עם זה</div>
        </GlassCard>

        <ArrowLeft progress={sp(frame, fps, 340)} />
        <AiNode scale={ai} />
        <ArrowLeft progress={sp(frame, fps, 386)} color={COLORS.secondary} />

        <GlassCard
          color={COLORS.warning}
          style={{
            width: 430,
            padding: "28px 34px",
            opacity: output,
            transform: `translateX(${interpolate(output, [0, 1], [-54, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 26, color: COLORS.textMuted, fontWeight: 700, marginBottom: 16 }}>התוצאה</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, direction: "rtl" }}>
            {ISSUES.map((issue) => (
              <Pill key={issue.text} color={issue.color} appear={sp(frame, fps, issue.at)} style={{ fontSize: 25 }}>
                {issue.text}
              </Pill>
            ))}
          </div>
        </GlassCard>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 72,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: question,
          transform: `scale(${interpolate(question, [0, 1], [0.92, 1])})`,
        }}
      >
        <GlassCard color={COLORS.accent} style={{ padding: "22px 62px", borderRadius: 999 }}>
          <span style={{ fontSize: 48, fontWeight: 900, color: COLORS.text }}>איך מבקשים ממנו לעבוד?</span>
        </GlassCard>
      </div>
    </SceneShell>
  );
};
