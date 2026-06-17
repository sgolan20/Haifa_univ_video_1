import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { AiNode, ArrowLeft, GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

const CLARITY = [
  { text: "ברורה יותר", at: 194, color: COLORS.primary },
  { text: "ממוקדת יותר", at: 250, color: COLORS.secondary },
  { text: "מותאמת למטרה", at: 306, color: COLORS.accent },
];

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const definition = sp(frame, fps, 16);
  const model = sp(frame, fps, 100);
  const useful = sp(frame, fps, 336);

  return (
    <SceneShell accent={COLORS.secondary} variant="rings">
      <TopLabel title="פרומפט הוא ההנחיה שאנחנו נותנים למודל השפה" kicker="מה זה פרומפט?" at={4} accent={COLORS.secondary} />

      <div
        style={{
          position: "absolute",
          top: 265,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 42,
          direction: "rtl",
        }}
      >
        <GlassCard
          color={COLORS.primary}
          style={{
            width: 500,
            padding: "40px 46px",
            opacity: definition,
            transform: `translateY(${interpolate(definition, [0, 1], [34, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 31, color: COLORS.textMuted, fontWeight: 800, marginBottom: 18 }}>בקשה כתובה</div>
          <div style={{ fontSize: 62, fontWeight: 950, color: COLORS.primary, lineHeight: 1 }}>פרומפט</div>
          <div style={{ marginTop: 20, fontSize: 30, lineHeight: 1.35, fontWeight: 650 }}>
            ההנחיה שמגדירה למודל מה לעשות ואיך לענות
          </div>
        </GlassCard>

        <ArrowLeft progress={sp(frame, fps, 88)} />
        <AiNode scale={model} />
        <ArrowLeft progress={sp(frame, fps, 162)} color={COLORS.accent} />

        <GlassCard
          color={COLORS.accent}
          style={{
            width: 462,
            padding: "40px 46px",
            opacity: useful,
            transform: `translateY(${interpolate(useful, [0, 1], [34, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 31, color: COLORS.textMuted, fontWeight: 800, marginBottom: 18 }}>התוצר</div>
          <div style={{ fontSize: 50, fontWeight: 950, color: COLORS.text, lineHeight: 1.1 }}>שימושי יותר</div>
          <div style={{ marginTop: 18, height: 10, borderRadius: 999, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
            <div style={{ width: `${interpolate(useful, [0, 1], [8, 92])}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.primary})` }} />
          </div>
        </GlassCard>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 118,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          direction: "rtl",
        }}
      >
        {CLARITY.map((item) => (
          <Pill key={item.text} color={item.color} appear={sp(frame, fps, item.at)} style={{ fontSize: 34, padding: "18px 42px" }}>
            {item.text}
          </Pill>
        ))}
      </div>
    </SceneShell>
  );
};
