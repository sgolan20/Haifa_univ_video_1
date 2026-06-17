import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { AiNode, GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

const KNOWN = [
  { text: "מי מבקש", at: 92, color: COLORS.secondary },
  { text: "מה המשימה", at: 128, color: COLORS.primary },
  { text: "מה חשוב", at: 162, color: COLORS.accent },
  { text: "האורך הרצוי", at: 202, color: "#22c55e" },
  { text: "איך לארגן", at: 238, color: "#22c55e" },
];

export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ai = sp(frame, fps, 10);
  const cross = sp(frame, fps, 58);

  return (
    <SceneShell accent="#22c55e" variant="rings">
      <TopLabel title="המודל כבר לא צריך לנחש" kicker="מה קרה כאן?" at={4} accent="#22c55e" />

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 84, direction: "rtl" }}>
        <div style={{ position: "relative", width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AiNode scale={ai} color={COLORS.secondary} />
          {["?", "?", "?"].map((q, i) => {
            const angle = -70 + i * 70 + Math.sin(frame * 0.03 + i) * 6;
            const radius = 172;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  right: 190 + Math.cos((angle * Math.PI) / 180) * radius,
                  top: 178 + Math.sin((angle * Math.PI) / 180) * radius,
                  fontSize: 70,
                  fontWeight: 950,
                  color: COLORS.warning,
                  opacity: interpolate(cross, [0, 1], [1, 0.15]),
                  textShadow: `0 0 24px ${COLORS.warning}`,
                }}
              >
                {q}
              </div>
            );
          })}
        </div>

        <GlassCard color="#22c55e" style={{ width: 800, padding: "42px 50px" }}>
          <div style={{ fontSize: 34, fontWeight: 850, color: COLORS.textMuted, marginBottom: 28 }}>עכשיו הוא יודע:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {KNOWN.map((item) => (
              <Pill key={item.text} color={item.color} appear={sp(frame, fps, item.at)} style={{ fontSize: 31, padding: "17px 30px" }}>
                {item.text}
              </Pill>
            ))}
          </div>
        </GlassCard>
      </div>
    </SceneShell>
  );
};
