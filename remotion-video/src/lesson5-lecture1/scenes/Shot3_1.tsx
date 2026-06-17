import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { AiNode, GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

const NEEDS = [
  { text: "מה ההקשר?", at: 318, color: COLORS.primary },
  { text: "מה המשימה?", at: 352, color: COLORS.secondary },
  { text: "מה חשוב?", at: 386, color: COLORS.accent },
  { text: "איך לקבל תשובה?", at: 430, color: "#22c55e" },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const warning = sp(frame, fps, 36);
  const ai = sp(frame, fps, 190);
  const reduce = sp(frame, fps, 520, { stiffness: 105 });

  return (
    <SceneShell accent={COLORS.accent} variant="grid">
      <TopLabel title="פרומפט טוב הוא לא מילת קסם" kicker="חשוב להבין" at={8} accent={COLORS.accent} />

      <div
        style={{
          position: "absolute",
          top: 245,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 84,
          direction: "rtl",
        }}
      >
        <GlassCard
          color={COLORS.warning}
          style={{
            width: 470,
            padding: "48px 42px",
            textAlign: "center",
            opacity: warning,
            transform: `rotate(${interpolate(warning, [0, 1], [-4, 0])}deg) scale(${interpolate(warning, [0, 1], [0.88, 1])})`,
          }}
        >
          <div style={{ fontSize: 88, fontWeight: 950, color: COLORS.warning, lineHeight: 1 }}>לא</div>
          <div style={{ fontSize: 38, fontWeight: 850, lineHeight: 1.24, marginTop: 12 }}>הבטחה לתשובה נכונה תמיד</div>
        </GlassCard>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <AiNode scale={ai} label="AI" color={COLORS.secondary} />
          <div style={{ display: "flex", flexWrap: "wrap", width: 610, justifyContent: "center", gap: 15, direction: "rtl" }}>
            {NEEDS.map((need) => (
              <Pill key={need.text} color={need.color} appear={sp(frame, fps, need.at)} style={{ fontSize: 28 }}>
                {need.text}
              </Pill>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 78,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: reduce,
          transform: `scale(${interpolate(reduce, [0, 1], [0.9, 1])})`,
        }}
      >
        <GlassCard color={COLORS.primary} style={{ padding: "25px 72px", borderRadius: 999 }}>
          <span style={{ fontSize: 50, fontWeight: 950 }}>
            מצמצם <span style={{ color: COLORS.primary }}>ניחושים</span> ואי דיוקים
          </span>
        </GlassCard>
      </div>
    </SceneShell>
  );
};
