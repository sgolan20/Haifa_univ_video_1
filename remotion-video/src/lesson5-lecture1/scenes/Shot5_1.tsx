import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FloatingImageFrame, GlassCard, IMG, Pill, SceneShell, TopLabel, sp } from "./_shared";

const MISSING = [
  { text: "אורך", at: 205 },
  { text: "קהל יעד", at: 250 },
  { text: "דגש", at: 292 },
  { text: "מטרה", at: 337 },
  { text: "פורמט", at: 382 },
];

const IMPROVED = [
  { text: "סטודנט תואר שני", at: 518 },
  { text: "150 מילה", at: 616 },
  { text: "שפה אקדמית", at: 690 },
  { text: "שיטת מחקר וממצאים", at: 748 },
  { text: "ללא מסקנות הכותב", at: 835 },
];

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const img = sp(frame, fps, 16);
  const red = sp(frame, fps, 72, { stiffness: 100 });
  const green = sp(frame, fps, 484, { stiffness: 100 });

  return (
    <SceneShell accent={COLORS.accent} variant="flow">
      <TopLabel title="בואו נראה את ההבדל בפועל" kicker="אותה משימה, שתי בקשות" at={4} accent={COLORS.accent} />

      <div style={{ position: "absolute", top: 184, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <FloatingImageFrame src={IMG("prompt_anatomy_demo.png")} width={1600} appear={img} color={COLORS.accent}>
          <div
            style={{
              position: "absolute",
              top: "22%",
              right: "1.5%",
              width: "47%",
              height: "68%",
              borderRadius: 20,
              border: `5px solid ${COLORS.warning}`,
              boxShadow: `0 0 42px ${COLORS.warning}88`,
              opacity: red,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "22%",
              left: "2.5%",
              width: "47%",
              height: "68%",
              borderRadius: 20,
              border: "5px solid #22c55e",
              boxShadow: "0 0 42px rgba(34,197,94,0.62)",
              opacity: green,
            }}
          />
        </FloatingImageFrame>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 58,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          direction: "rtl",
          gap: 26,
        }}
      >
        <GlassCard color={COLORS.warning} style={{ width: 720, padding: "22px 28px" }}>
          <div style={{ color: COLORS.warning, fontSize: 28, fontWeight: 900, marginBottom: 14 }}>מה חסר?</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {MISSING.map((item) => (
              <Pill key={item.text} color={COLORS.warning} appear={sp(frame, fps, item.at)} style={{ fontSize: 23 }}>
                {item.text}
              </Pill>
            ))}
          </div>
        </GlassCard>

        <GlassCard color="#22c55e" style={{ width: 720, padding: "22px 28px" }}>
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: 900, marginBottom: 14 }}>מה נוסף?</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {IMPROVED.map((item) => (
              <Pill key={item.text} color="#22c55e" appear={sp(frame, fps, item.at)} style={{ fontSize: 23 }}>
                {item.text}
              </Pill>
            ))}
          </div>
        </GlassCard>
      </div>
    </SceneShell>
  );
};
