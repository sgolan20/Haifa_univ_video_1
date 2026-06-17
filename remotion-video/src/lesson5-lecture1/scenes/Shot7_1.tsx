import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

export const Shot7_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shortPrompt = sp(frame, fps, 244);
  const action = sp(frame, fps, 414);
  const constraint = sp(frame, fps, 468);

  return (
    <SceneShell accent={COLORS.primary} variant="grid">
      <TopLabel title="לא כל משימה דורשת פרומפט ארוך" kicker="כשזה פשוט" at={4} />

      <div
        style={{
          position: "absolute",
          top: 285,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: shortPrompt,
          transform: `translateY(${interpolate(shortPrompt, [0, 1], [40, 0])}px)`,
        }}
      >
        <GlassCard color={COLORS.primary} style={{ width: 1320, padding: "48px 66px", textAlign: "center" }}>
          <div style={{ fontSize: 31, color: COLORS.textMuted, fontWeight: 800, marginBottom: 18 }}>פרומפט קצר, אבל ברור</div>
          <div style={{ fontSize: 53, fontWeight: 900, lineHeight: 1.28 }}>
            נסח את המשפט הבא בעברית אקדמית יותר,
            <br />
            בלי לשנות את המשמעות
          </div>
        </GlassCard>
      </div>

      <div style={{ position: "absolute", bottom: 154, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 28, direction: "rtl" }}>
        <Pill color={COLORS.primary} appear={action} style={{ fontSize: 38, padding: "20px 54px" }}>
          פעולה: נסח
        </Pill>
        <Pill color={COLORS.accent} appear={constraint} style={{ fontSize: 38, padding: "20px 54px" }}>
          מגבלה: בלי לשנות משמעות
        </Pill>
      </div>
    </SceneShell>
  );
};
