import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { Logo } from "../../design/Logo";

/**
 * Video 2, Shot 2.1 — "מהן Hallucinations?" definition (12.2s, 366 frames)
 *
 * Whisper-synced animation timeline (shot starts at 34.4s in narration):
 *   frame   0 — "Hallucination" (34.42s)
 *   frame  50 — "מצב שבו המערכת מייצרת" (36.30s)
 *   frame 108 — "מידע" (38.00s)
 *   frame 137 — "אמין" (38.94s) ← turquoise highlight
 *   frame 178 — "אך" (40.34s) ← turning point
 *   frame 201 — "שגוי," (41.10s) ← red highlight begins
 *   frame 246 — "לא קיים" (43.22s)
 *   frame 313 — "בואו נראה כמה דוגמאות" (44.82s)
 */

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── Scene title: appears immediately, fades when definition card enters ───
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const titleOut = interpolate(frame, [70, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─── Definition card: enters when narration says "מצב שבו" (~frame 50) ───
  const cardIn = spring({
    frame: frame - 50,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // ─── Word-by-word reveal synced to narration ───
  // "מידע שנראה" appears at frame 108
  const wordGroup1 = interpolate(frame, [105, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "אמין" highlights turquoise at frame 137, holds until turning point
  const aminAppear = interpolate(frame, [133, 143], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "אמין" color shift: turquoise → red — triggered at "אך" (frame 178)
  const colorShiftProgress = interpolate(frame, [178, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const aminR = Math.round(0 + colorShiftProgress * 239);
  const aminG = Math.round(212 + colorShiftProgress * (68 - 212));
  const aminB = Math.round(255 + colorShiftProgress * (68 - 255));
  const aminColor = `rgb(${aminR}, ${aminG}, ${aminB})`;

  // "אמין" glow pulse while turquoise (before color shift)
  const aminGlowPulse =
    aminAppear > 0 && colorShiftProgress < 0.5
      ? Math.sin(frame * 0.1) * 0.4 + 0.6
      : 0;

  // "— אך" dash appears at frame 178
  const dashAppear = interpolate(frame, [175, 185], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "שגוי, מפוברק, או לא קיים" — each word appears in sequence
  const sguyAppear = interpolate(frame, [198, 208], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mefubrakAppear = interpolate(frame, [220, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const loKayamAppear = interpolate(frame, [245, 255], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red words glow pulse after they all appear
  const redGlowPulse =
    loKayamAppear > 0.5 ? Math.sin(frame * 0.08) * 0.3 + 0.7 : 0;

  // ─── Decorative line: grows when definition content is visible ───
  const lineWidth = interpolate(frame, [110, 200], [0, 800], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─── "בואו נראה כמה דוגמאות" teaser at frame 313 ───
  const teaserIn = spring({
    frame: frame - 310,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // ─── Card border color shifts from turquoise to red with the content ───
  const borderColor = interpolate(colorShiftProgress, [0, 1], [0, 1]) > 0.5
    ? `${COLORS.warning}44`
    : `${COLORS.primary}33`;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Background image — document dissolving from teal to red */}
      <Img
        src={staticFile("video2/images/shot2_1_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 50], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Scene title — "?Hallucinations מהן" */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleIn})`,
          opacity: titleIn * titleOut,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 40px ${COLORS.primary}66, 0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          ?Hallucinations מהן
        </div>
      </div>

      {/* Glassmorphic definition card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${cardIn})`,
          opacity: cardIn,
          width: 1200,
          padding: "50px 60px",
          borderRadius: 24,
          background: `linear-gradient(135deg, ${COLORS.primary}12 0%, ${COLORS.secondary}08 100%)`,
          border: `2px solid ${borderColor}`,
          boxShadow: `0 0 60px ${COLORS.primary}10, 0 20px 60px rgba(0,0,0,0.4)`,
          backdropFilter: "blur(20px)",
          textAlign: "center",
          direction: "rtl",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.8,
            color: COLORS.text,
          }}
        >
          {/* "מידע שנראה" — appears at frame 108 */}
          <span style={{ opacity: wordGroup1 }}>
            מידע שנראה
          </span>{" "}

          {/* "אמין" — turquoise highlight at frame 137, shifts to red at frame 178 */}
          <span
            style={{
              opacity: aminAppear,
              color: aminColor,
              fontWeight: 800,
              textShadow: aminGlowPulse > 0
                ? `0 0 ${20 + aminGlowPulse * 15}px ${aminColor}66`
                : colorShiftProgress > 0.5
                  ? `0 0 20px ${COLORS.warning}44`
                  : "none",
            }}
          >
            אמין
          </span>

          {/* "— אך" at frame 178 */}
          <span style={{ opacity: dashAppear }}>
            {" "}— אך{" "}
          </span>

          {/* "שגוי" at frame 201 */}
          <span
            style={{
              opacity: sguyAppear,
              color: sguyAppear > 0.5 ? COLORS.warning : COLORS.textMuted,
              fontWeight: sguyAppear > 0.5 ? 800 : 600,
              textShadow: redGlowPulse > 0
                ? `0 0 ${15 * redGlowPulse}px ${COLORS.warning}44`
                : "none",
            }}
          >
            שגוי
          </span>

          {/* ", מפוברק" at frame 222 */}
          <span
            style={{
              opacity: mefubrakAppear,
              color: mefubrakAppear > 0.5 ? COLORS.warning : COLORS.textMuted,
              fontWeight: mefubrakAppear > 0.5 ? 800 : 600,
              textShadow: redGlowPulse > 0
                ? `0 0 ${15 * redGlowPulse}px ${COLORS.warning}44`
                : "none",
            }}
          >
            , מפוברק
          </span>

          {/* ", או לא קיים" at frame 246 */}
          <span
            style={{
              opacity: loKayamAppear,
              color: loKayamAppear > 0.5 ? COLORS.warning : COLORS.textMuted,
              fontWeight: loKayamAppear > 0.5 ? 800 : 600,
              textShadow: redGlowPulse > 0
                ? `0 0 ${15 * redGlowPulse}px ${COLORS.warning}44`
                : "none",
            }}
          >
            , או לא קיים
          </span>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${
              colorShiftProgress > 0.5 ? COLORS.warning : COLORS.primary
            }66, ${COLORS.primary}66, transparent)`,
            margin: "24px auto 0",
          }}
        />
      </div>

      {/* "בואו נראה כמה דוגמאות" — teaser at frame 313 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: teaserIn,
          transform: `scale(${teaserIn})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.primary,
            direction: "rtl",
            textShadow: `0 0 20px ${COLORS.primary}44`,
          }}
        >
          בואו נראה כמה דוגמאות...
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
