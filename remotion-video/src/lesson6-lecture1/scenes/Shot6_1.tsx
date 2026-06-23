import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp, DirIcon, DirKind } from "./_shared";

/**
 * Shot 6.1 — Four improvement directions (103.8–114.62s)
 *   0.0s  "כדי לשפר תוצר בצורה מסודרת, כדאי לשאול איזה סוג שיפור נחוץ"
 *   5.1s  "אפשר לחשוב על ארבעה כיוונים מרכזיים:"
 *   7.7s  "דיוק, פורמט, עומק וטיעון"
 */
export const DIRECTIONS: { text: string; kind: DirKind; color: string; at: number }[] = [
  { text: "דיוק", kind: "accuracy", color: COLORS.primary, at: 231 },
  { text: "פורמט", kind: "format", color: COLORS.secondary, at: 250 },
  { text: "עומק", kind: "depth", color: COLORS.accent, at: 270 },
  { text: "טיעון", kind: "argument", color: "#22c55e", at: 285 },
];

export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={COLORS.primary} variant="rings" bg="shot6_bg.png">
      <TopLabel kicker="איזה סוג שיפור נחוץ?" title="ארבעה כיווני שיפור" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 34, direction: "rtl" }}>
        {DIRECTIONS.map((d, i) => {
          const a = sp(frame, fps, d.at, { damping: 13, stiffness: 110 });
          const float = Math.sin((frame + i * 40) * 0.05) * 5;
          return (
            <div key={d.text} style={{ transform: `scale(${a}) translateY(${float}px)`, opacity: a, width: 280, height: 300, borderRadius: 26, background: `linear-gradient(160deg, ${d.color}20 0%, rgba(255,255,255,0.04) 100%)`, border: `2.5px solid ${d.color}`, boxShadow: `0 14px 44px rgba(0,0,0,0.4), 0 0 40px ${d.color}33`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, direction: "rtl" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: `2px solid ${d.color}88` }}><DirIcon kind={d.kind} color={d.color} size={58} /></span>
              <span style={{ fontSize: 44, fontWeight: 900, color: COLORS.text }}>{d.text}</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: d.color }}>{`כיוון ${i + 1}`}</span>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
