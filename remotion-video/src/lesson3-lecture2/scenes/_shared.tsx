import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/** Living background: Ken Burns slow zoom + drift, fade-in, with readability overlays. */
export const SceneBg: React.FC<{ img: string; dur: number; maxOpacity?: number }> = ({ img, dur, maxOpacity = 0.55 }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, dur], [1.04, 1.16]);
  const x = interpolate(frame, [0, dur], [-15, 15]);
  const op = interpolate(frame, [0, 40], [0, maxOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <>
      <Img
        src={staticFile(`lesson3-lecture2/images/${img}`)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", opacity: op, transform: `scale(${scale}) translateX(${x}px)` }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, ${COLORS.bgPrimary}66 0%, ${COLORS.bgPrimary}cc 75%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${COLORS.bgPrimary}dd 0%, transparent 25%, transparent 70%, ${COLORS.bgPrimary}ee 100%)` }} />
    </>
  );
};

/** A handful of glowing particles drifting upward with sine-pulsed opacity. */
export const Particles: React.FC<{ accent?: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const dots = [
    { x: 12, y: 70, s: 5, c: accent ?? COLORS.secondary, sp: 1.0, d: 0 },
    { x: 26, y: 40, s: 3, c: COLORS.secondary, sp: 0.7, d: 80 },
    { x: 78, y: 64, s: 5, c: COLORS.primary, sp: 0.9, d: 40 },
    { x: 88, y: 34, s: 4, c: COLORS.primary, sp: 1.2, d: 120 },
    { x: 50, y: 82, s: 3, c: accent ?? COLORS.accent, sp: 0.8, d: 60 },
    { x: 66, y: 24, s: 3, c: COLORS.primary, sp: 1.1, d: 100 },
  ];
  return (
    <>
      {dots.map((p, i) => {
        const y = p.y - ((frame * p.sp + p.d) % 240) / 240 * 22;
        const op = 0.3 + 0.4 * Math.abs(Math.sin((frame * 0.03 + p.d) * 0.6));
        return <div key={i} style={{ position: "absolute", left: `${p.x}%`, top: `${y}%`, width: p.s, height: p.s, borderRadius: "50%", background: p.c, opacity: op, boxShadow: `0 0 ${p.s * 3}px ${p.c}` }} />;
      })}
    </>
  );
};

/* ============================================================
 * Shared layouts for the four discipline examples.
 * Each example = a CASE shot (scenario chips → "האם זה לגיטימי?")
 * followed by a VERDICT shot (ruling → "לעומת זאת" → legit use).
 * ============================================================ */

export interface DomainSpec {
  /** Example number 1-4 */
  n: number;
  /** Course name, e.g. "קורס בספרות" */
  course: string;
  /** Icon file in lesson3-lecture2/images (transparent png) */
  icon: string;
  /** Background file in lesson3-lecture2/images */
  bg: string;
  /** Illustrative scene image (student-at-computer) shown as a side card on the case shot */
  scene: string;
  /** Accent color for this domain */
  color: string;
}

const HEB_ORDINALS = ["", "ראשונה", "שנייה", "שלישית", "רביעית"];

/** The four discipline examples of this lecture. */
export const DOMAINS: Record<"lit" | "cs" | "stats" | "writing", DomainSpec> = {
  lit: { n: 1, course: "קורס בספרות", icon: "icon_book.png", bg: "bg_literature.png", scene: "shot4_1_literature_scene.png", color: COLORS.accent },
  cs: { n: 2, course: "קורס במדעי המחשב", icon: "icon_code.png", bg: "bg_cs.png", scene: "shot5_1_cs_scene.png", color: COLORS.primary },
  stats: { n: 3, course: "קורס בסטטיסטיקה", icon: "icon_chart.png", bg: "bg_stats.png", scene: "shot6_1_stats_scene.png", color: COLORS.secondary },
  writing: { n: 4, course: "קורס בכתיבה אקדמית באנגלית", icon: "icon_pen.png", bg: "bg_writing.png", scene: "shot7_1_writing_scene.png", color: "#f472b6" },
};

/** Domain badge: "דוגמה N · קורס ב…" with the domain icon. */
export const DomainBadge: React.FC<{ d: DomainSpec; scale: number; compact?: boolean }> = ({ d, scale, compact }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: compact ? 18 : 24, transform: `scale(${scale})`, opacity: scale, direction: "rtl" }}>
    <Img
      src={staticFile(`lesson3-lecture2/images/${d.icon}`)}
      style={{ height: compact ? 76 : 108, filter: `drop-shadow(0 0 20px ${d.color}88)` }}
    />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
      <span style={{ fontSize: compact ? 20 : 25, fontWeight: 700, color: d.color, letterSpacing: "0.5px" }}>
        דוגמה {HEB_ORDINALS[d.n]}
      </span>
      <span style={{ fontSize: compact ? 38 : 52, fontWeight: 800, color: COLORS.text, lineHeight: 1.08, textShadow: `0 0 24px ${d.color}55, 0 2px 12px rgba(0,0,0,0.7)` }}>
        {d.course}
      </span>
    </div>
  </div>
);

/** One scenario step chip (what the student did). */
export const StepChip: React.FC<{ text: string; icon: string; color: string; appear: number; idx: number }> = ({ text, icon, color, appear, idx }) => {
  const frame = useCurrentFrame();
  const float = Math.sin((frame + idx * 40) * 0.045) * 4;
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "26px 38px", borderRadius: 22, direction: "rtl",
        background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
        border: `2px solid ${color}55`, boxShadow: `0 12px 38px rgba(0,0,0,0.38)`,
        opacity: appear, transform: `translateY(${interpolate(appear, [0, 1], [26, 0]) + float}px)`,
        maxWidth: 980,
      }}
    >
      <div style={{ minWidth: 64, height: 64, borderRadius: 18, background: `${color}24`, border: `2px solid ${color}70`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>{icon}</div>
      <span style={{ fontSize: 36, fontWeight: 700, color: COLORS.text, lineHeight: 1.28 }}>{text}</span>
    </div>
  );
};

/** Illustrative scene card (student-at-computer photo) shown beside the scenario chips. */
export const SceneCard: React.FC<{ img: string; color: string; appear: number; dur: number }> = ({ img, color, appear, dur }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.04) * 6;
  const kb = interpolate(frame, [0, dur], [1.05, 1.13]);
  if (appear < 0.01) return null;
  return (
    <div
      style={{
        position: "relative", flexShrink: 0,
        width: 460, height: 612, borderRadius: 30, overflow: "hidden",
        border: `2px solid ${color}66`,
        boxShadow: `0 26px 72px rgba(0,0,0,0.55), 0 0 56px ${color}3a`,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [44, 0]) + float}px) scale(${interpolate(appear, [0, 1], [0.9, 1])})`,
      }}
    >
      <Img
        src={staticFile(`lesson3-lecture2/images/${img}`)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", transform: `scale(${kb})` }}
      />
      {/* accent tint at top + soft vignette at bottom for cohesion */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${color}26 0%, transparent 28%, transparent 68%, rgba(0,0,0,0.45) 100%)` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 30, boxShadow: `inset 0 0 60px ${color}22`, pointerEvents: "none" }} />
    </div>
  );
};

/** Big punch question "האם זה לגיטימי?" at the end of a case shot. */
export const LegitQuestion: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 110, mass: 0.7 } });
  const pulse = 1 + 0.025 * Math.sin((frame - at) * 0.12);
  if (frame < at - 5) return null;
  return (
    <div style={{ position: "absolute", bottom: 64, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          transform: `scale(${pop * pulse})`, opacity: pop,
          padding: "24px 70px", borderRadius: 999, direction: "rtl",
          background: `linear-gradient(90deg, ${COLORS.accent}26, ${COLORS.accent}10)`,
          border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44`,
          fontSize: 52, fontWeight: 900, color: COLORS.text, fontFamily: FONT_FAMILY,
          textShadow: `0 0 26px ${COLORS.accent}88`,
        }}
      >
        האם זה לגיטימי? <span style={{ color: COLORS.accent }}>🤔</span>
      </div>
    </div>
  );
};

export type VerdictKind = "no" | "depends" | "yes";

const VERDICT_STYLE: Record<VerdictKind, { color: string; soft: string; icon: string }> = {
  no: { color: COLORS.warning, soft: "#fca5a5", icon: "✕" },
  depends: { color: COLORS.accent, soft: "#fde68a", icon: "⚖" },
  yes: { color: "#22c55e", soft: "#86efac", icon: "✓" },
};

/** Verdict banner — the ruling headline ("ברוב המקרים — לא" / "תלוי בהנחיות" / "במקרים רבים — כן"). */
export const VerdictBanner: React.FC<{ kind: VerdictKind; text: string; scale: number }> = ({ kind, text, scale }) => {
  const v = VERDICT_STYLE[kind];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 24, transform: `scale(${scale})`, opacity: scale, direction: "rtl", padding: "18px 52px", borderRadius: 999, background: `${v.color}1f`, border: `2px solid ${v.color}`, boxShadow: `0 0 44px ${v.color}44` }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 68, height: 68, borderRadius: "50%", background: v.color, color: "#fff", fontSize: 40, fontWeight: 900, boxShadow: `0 0 24px ${v.color}` }}>{v.icon}</span>
      <span style={{ fontSize: 52, fontWeight: 900, color: COLORS.text, textShadow: `0 0 24px ${v.color}66` }}>{text}</span>
    </div>
  );
};

/** "לעומת זאת"/"עם זאת" divider between the ruling and the alternative. */
export const ContrastDivider: React.FC<{ appear: number; label?: string }> = ({ appear, label = "לעומת זאת" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, width: 1040, opacity: appear, direction: "rtl" }}>
    <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to left, transparent, ${COLORS.primary}88)` }} />
    <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.primary, whiteSpace: "nowrap" }}>{label}</span>
    <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, transparent, ${COLORS.primary}88)` }} />
  </div>
);

/** Full layout of a CASE shot: domain badge → scenario step chips → "האם זה לגיטימי?" */
export const CaseLayout: React.FC<{
  d: DomainSpec;
  dur: number;
  steps: { text: string; icon: string; at: number }[];
  questionAt: number;
}> = ({ d, dur, steps, questionAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame: frame - 14, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const card = spring({ frame: frame - 26, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } });
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img={d.bg} dur={dur} maxOpacity={0.5} />
      <Particles accent={d.color} />

      <div style={{ position: "absolute", top: 48, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <DomainBadge d={d} scale={badge} />
      </div>

      {/* center row: scenario chips (right) + illustrative scene card (left) */}
      <div
        style={{
          position: "absolute", top: 234, left: 70, right: 70, bottom: 196,
          display: "flex", direction: "rtl", alignItems: "center", justifyContent: "center", gap: 58,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 880 }}>
          {steps.map((s, i) => {
            const appear = spring({ frame: frame - s.at, fps, config: { damping: 15, stiffness: 92, mass: 0.8 } });
            return <StepChip key={i} text={s.text} icon={s.icon} color={d.color} appear={appear} idx={i} />;
          })}
        </div>
        <SceneCard img={d.scene} color={d.color} appear={card} dur={dur} />
      </div>

      <LegitQuestion at={questionAt} />
    </AbsoluteFill>
  );
};

export interface VerdictLine {
  text: string;
  at: number;
}

/** Full layout of a VERDICT shot: compact badge → ruling banner → explanation → divider → alternative. */
export const VerdictLayout: React.FC<{
  d: DomainSpec;
  dur: number;
  banner: { kind: VerdictKind; text: string; at: number };
  first: { tone: "bad" | "good"; title?: string; lines: VerdictLine[] };
  dividerAt: number;
  dividerLabel?: string;
  second: { tone: "bad" | "good"; title?: string; lines: VerdictLine[] };
}> = ({ d, dur, banner, first, dividerAt, dividerLabel, second }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const badge = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 95, mass: 0.75 } });
  const bannerS = spring({ frame: frame - banner.at, fps, config: { damping: 13, stiffness: 105, mass: 0.7 } });
  const divider = spring({ frame: frame - dividerAt, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const mk = (lines: VerdictLine[]) =>
    lines.map((l) => ({ text: l.text, appear: spring({ frame: frame - l.at, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } }) }));
  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img={d.bg} dur={dur} maxOpacity={0.4} />
      <Particles accent={d.color} />

      {/* compact domain reminder, top-right */}
      <div style={{ position: "absolute", top: 36, right: 60 }}>
        <DomainBadge d={d} scale={badge} compact />
      </div>

      {/* ruling banner */}
      <div style={{ position: "absolute", top: 132, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <VerdictBanner kind={banner.kind} text={banner.text} scale={bannerS} />
      </div>

      {/* explanation + alternative */}
      <div style={{ position: "absolute", top: 286, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
        <VerdictPanel tone={first.tone} title={first.title} lines={mk(first.lines)} />
        <ContrastDivider appear={divider} label={dividerLabel} />
        <VerdictPanel tone={second.tone} title={second.title} lines={mk(second.lines)} />
      </div>
    </AbsoluteFill>
  );
};

/** A panel holding the explanation under a verdict (red-ish) or the legit alternative (green-ish). */
export const VerdictPanel: React.FC<{
  tone: "bad" | "good";
  title?: string;
  lines: { text: string; appear: number }[];
  width?: number;
}> = ({ tone, title, lines, width = 1120 }) => {
  const color = tone === "bad" ? COLORS.warning : "#22c55e";
  const anyVisible = lines.some((l) => l.appear > 0.01);
  if (!anyVisible) return null;
  return (
    <div style={{ width, padding: "30px 44px", borderRadius: 24, direction: "rtl", background: `linear-gradient(160deg, ${color}16 0%, rgba(255,255,255,0.04) 100%)`, backdropFilter: "blur(12px)", border: `2px solid ${color}5f`, boxShadow: `0 12px 42px rgba(0,0,0,0.38)`, opacity: Math.max(...lines.map((l) => l.appear)) }}>
      {title && (
        <div style={{ fontSize: 28, fontWeight: 800, color: tone === "bad" ? "#fca5a5" : "#86efac", marginBottom: 14 }}>{title}</div>
      )}
      {lines.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, opacity: l.appear, transform: `translateY(${interpolate(l.appear, [0, 1], [14, 0])}px)`, marginBottom: i < lines.length - 1 ? 14 : 0 }}>
          <span style={{ color, fontSize: 31, fontWeight: 900, lineHeight: 1.35 }}>{tone === "bad" ? "✕" : "✓"}</span>
          <span style={{ fontSize: 33, fontWeight: 650, color: COLORS.text, lineHeight: 1.35 }}>{l.text}</span>
        </div>
      ))}
    </div>
  );
};
