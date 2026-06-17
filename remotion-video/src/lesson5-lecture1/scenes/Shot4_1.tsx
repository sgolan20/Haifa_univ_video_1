import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FloatingImageFrame, GlassCard, IMG, Pill, SceneShell, TopLabel, sp } from "./_shared";

const ROWS = [
  { label: "הקשר", at: 152, y: 18.8, h: 14.8, color: COLORS.secondary },
  { label: "מטרה", at: 356, y: 34.2, h: 14.8, color: "#22c55e" },
  { label: "הנחיות", at: 654, y: 49.7, h: 14.8, color: COLORS.accent },
  { label: "פורמט פלט", at: 894, y: 65.1, h: 14.7, color: COLORS.primary },
  { label: "כלים נוספים", at: 1190, y: 80.4, h: 14.2, color: COLORS.textMuted },
];

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const image = sp(frame, fps, 22);
  const side = sp(frame, fps, 92);

  return (
    <SceneShell accent={COLORS.primary} variant="grid">
      <TopLabel title="האנטומיה של פרומפט מלא" kicker="ארבעה רכיבים מרכזיים" at={4} />

      <div
        style={{
          position: "absolute",
          top: 190,
          left: 78,
          right: 78,
          bottom: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 34,
          direction: "rtl",
        }}
      >
        <FloatingImageFrame src={IMG("prompt_anatomy_top.png")} width={1508} appear={image} color={COLORS.primary}>
          {ROWS.map((row) => {
            const show = sp(frame, fps, row.at, { damping: 12, stiffness: 105, mass: 0.7 });
            return (
              <div
                key={row.label}
                style={{
                  position: "absolute",
                  left: "1.8%",
                  right: "1.8%",
                  top: `${row.y}%`,
                  height: `${row.h}%`,
                  borderRadius: 12,
                  border: `4px solid ${row.color}`,
                  background: `${row.color}14`,
                  boxShadow: `0 0 30px ${row.color}66`,
                  opacity: show,
                  transform: `scale(${interpolate(show, [0, 1], [0.985, 1])})`,
                }}
              />
            );
          })}
        </FloatingImageFrame>

        <GlassCard color={COLORS.secondary} style={{ width: 290, padding: "26px 24px", opacity: side }}>
          <div style={{ fontSize: 27, fontWeight: 850, color: COLORS.textMuted, marginBottom: 20 }}>הרכיבים</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {ROWS.map((row) => (
              <Pill key={row.label} color={row.color} appear={sp(frame, fps, row.at)} style={{ fontSize: 25, justifyContent: "flex-start" }}>
                {row.label}
              </Pill>
            ))}
          </div>
        </GlassCard>
      </div>
    </SceneShell>
  );
};
