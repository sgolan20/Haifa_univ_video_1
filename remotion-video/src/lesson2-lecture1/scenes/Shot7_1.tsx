import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 7.1 — The limitation: hallucinations
 * Duration: 1189 frames (39.62s) · audioStart 141.2s
 *
 * Phase A (f0-470):  "נשמע אמין · מקצועי · משכנע" → "אך לא בהכרח נכון"
 * Phase B (f480):    big red word "הזיה / Hallucination"
 * Phase C (f660):    four fabricated-example cards stamped "לא קיים"
 *
 * Narration (relative):
 *   0.0s  "ומכאן נובעת המגבלה המרכזית... טקסטים שנוצרים או מסוכמים על ידי מודלי AI..."
 *  10.9s  "נוטים להישמע אמינים, מקצועיים ומשכנעים, אבל אינם בהכרח נכונים עובדתית."
 *  16.0s  "התופעה הזו מכונה בספרות המקצועית הזיה, או Hallucination."
 *  22.2s  "מחקרים אקדמיים שלא קיימים, שמות חוקרים... פסיקות מפוברקות... נתונים יש מאין."
 */
const EXAMPLES = [
  { icon: "📄", label: "מחקר אקדמי", note: "שלא קיים" },
  { icon: "👤", label: "חוקר", note: "שלא כתב את המאמר" },
  { icon: "⚖️", label: "פסיקה משפטית", note: "מפוברקת" },
  { icon: "📊", label: "נתון סטטיסטי", note: "שנוצר יש מאין" },
];

export const Shot7_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A — trust adjectives then the twist
  const b1 = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const b2 = spring({ frame: frame - 80, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const b3 = spring({ frame: frame - 120, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const twist = spring({ frame: frame - 330, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const phaseAOpacity = interpolate(frame, [450, 480], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase B — the word
  const word = spring({ frame: frame - 480, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const wordRise = spring({ frame: frame - 640, fps, config: { damping: 20, stiffness: 60, mass: 1 } });
  const wordGlow = 0.4 + 0.35 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="hallucination_bg.png" dur={1189} />
      <Particles />

      {/* Phase A */}
      {frame < 485 && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, opacity: phaseAOpacity }}>
          <div style={{ fontSize: 34, fontWeight: 500, color: COLORS.textMuted, direction: "rtl" }}>טקסט מ‑AI נוטה להישמע…</div>
          <div style={{ display: "flex", gap: 24, direction: "rtl" }}>
            <Pill scale={b1} color={COLORS.primary} label="אמין" />
            <Pill scale={b2} color={COLORS.primary} label="מקצועי" />
            <Pill scale={b3} color={COLORS.primary} label="משכנע" />
          </div>
          <div style={{ transform: `scale(${twist})`, opacity: twist, fontSize: 54, fontWeight: 800, color: COLORS.warning, direction: "rtl", textShadow: `0 0 34px ${COLORS.warning}66` }}>
            …אבל לא בהכרח נכון עובדתית
          </div>
        </div>
      )}

      {/* Phase B — the word (rises to top for phase C) */}
      {frame > 470 && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `translateY(${wordRise * -380}px) scale(${1 - wordRise * 0.4})` }}>
          <div style={{ transform: `scale(${word})`, opacity: word, fontSize: 96, fontWeight: 800, color: COLORS.warning, direction: "rtl", textShadow: `0 0 ${44 + wordGlow * 36}px ${COLORS.warning}aa, 0 2px 16px rgba(0,0,0,0.7)` }}>
            הזיה
          </div>
          <div style={{ opacity: word, fontSize: 40, fontWeight: 600, color: COLORS.textMuted, direction: "ltr", marginTop: 8, letterSpacing: 2 }}>Hallucination</div>
        </div>
      )}

      {/* Phase C — fabricated examples */}
      {frame > 655 && (
        <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22, direction: "rtl" }}>
          {EXAMPLES.map((ex, i) => <ExampleCard key={i} ex={ex} appearAt={680 + i * 60} />)}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Pill: React.FC<{ scale: number; color: string; label: string }> = ({ scale, color, label }) => (
  <div style={{ transform: `scale(${scale})`, opacity: scale, padding: "16px 40px", borderRadius: 999, background: `${color}1a`, border: `1.5px solid ${color}66`, fontSize: 38, fontWeight: 700, color, direction: "rtl", textShadow: `0 0 18px ${color}44` }}>
    {label}
  </div>
);

const ExampleCard: React.FC<{ ex: { icon: string; label: string; note: string }; appearAt: number }> = ({ ex, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt - 5) return null;
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 15, stiffness: 95, mass: 0.8 } });
  const stamp = spring({ frame: frame - appearAt - 14, fps, config: { damping: 12, stiffness: 120, mass: 0.7 } });
  return (
    <div style={{ transform: `scale(${s})`, opacity: s, position: "relative", width: 270, padding: "26px 0", borderRadius: 20, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(14px)", border: `1.5px solid ${COLORS.warning}44`, boxShadow: `0 0 30px ${COLORS.warning}12`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontSize: 46 }}>{ex.icon}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>{ex.label}</div>
      <div style={{ fontSize: 22, fontWeight: 400, color: COLORS.textMuted, direction: "rtl" }}>{ex.note}</div>
      {/* red "fake" stamp */}
      <div style={{ position: "absolute", top: 14, left: 14, transform: `scale(${stamp}) rotate(-12deg)`, opacity: stamp, padding: "4px 12px", border: `2px solid ${COLORS.warning}`, borderRadius: 6, fontSize: 18, fontWeight: 800, color: COLORS.warning, direction: "rtl" }}>
        לא קיים
      </div>
    </div>
  );
};
