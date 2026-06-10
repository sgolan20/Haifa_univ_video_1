import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "./theme";
import { FONT_FAMILY } from "./fonts";

/**
 * Shared opening title card for all Haifa University videos.
 * 6-second branded intro: dark neural-network background, university logo,
 * the video title, and a course subtitle — with the shared opener music.
 *
 * For a course split across several videos, pass `parentTitle` (the shared
 * series name, e.g. "AI לעומת מנועי חיפוש"): it renders as a distinct accent
 * "series badge" above the specific part title, giving the parts a shared
 * identity and clear visual separation.
 *
 * Used as the first sequence of every video's FullVideo (before shot1).
 */

export const TITLE_CARD_FRAMES = 180; // 6 seconds at 30fps

type TitleCardProps = {
  /** The specific title of this video (for a series, the part: "חלק א' · …"). */
  title: string;
  /** Optional shared series/parent title shown as an accent badge above the title. */
  parentTitle?: string;
  subtitle?: string;
  /** Set false when the parent plays the music itself (e.g. with a custom fade) */
  withMusic?: boolean;
};

export const TitleCard: React.FC<TitleCardProps> = ({
  title,
  parentTitle,
  subtitle = "קורס אוריינות AI לסטודנטים — אוניברסיטת חיפה",
  withMusic = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in background
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [TITLE_CARD_FRAMES - 20, TITLE_CARD_FRAMES - 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentOpacity = bgOpacity * fadeOut;

  // Slow background zoom for a living, cinematic feel
  const bgScale = interpolate(frame, [0, TITLE_CARD_FRAMES], [1.06, 1.12]);

  // Glass panel + logo spring in first
  const panelSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.9 },
  });
  const panelScale = interpolate(panelSpring, [0, 1], [0.94, 1]);

  const logoSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const logoTranslate = interpolate(logoSpring, [0, 1], [-30, 0]);

  // Series badge springs in (only used when parentTitle is present)
  const badgeSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 90, mass: 0.8 },
  });

  // Title springs in
  const titleScale = spring({
    frame: frame - (parentTitle ? 30 : 24),
    fps,
    config: { damping: 15, stiffness: 85, mass: 0.9 },
  });

  // Subtitle fades in last
  const subtitleOpacity = interpolate(frame, [parentTitle ? 48 : 40, parentTitle ? 66 : 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Divider grows
  const lineWidth = interpolate(frame, [38, 70], [0, 460], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      {/* Opener music — fades out in the last second */}
      {withMusic && (
        <Audio
          src={staticFile("audio/title_card_music.mp3")}
          volume={(f) =>
            interpolate(f, [TITLE_CARD_FRAMES - 30, TITLE_CARD_FRAMES], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      )}

      {/* Background image with slow zoom */}
      <Img
        src={staticFile("images/title_card_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
          transform: `scale(${bgScale})`,
        }}
      />

      {/* Vignette + legibility overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10,14,26,0.35) 0%, rgba(10,14,26,0.78) 70%, rgba(10,14,26,0.92) 100%)",
          opacity: contentOpacity,
        }}
      />

      {/* Centered glow behind the text block */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 760px 420px at center, ${COLORS.primary}1f 0%, transparent 60%)`,
          opacity: contentOpacity,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: contentOpacity,
          direction: "rtl",
        }}
      >
        {/* Glass panel framing the text for depth */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "56px 80px",
            borderRadius: 28,
            background: "rgba(17, 24, 39, 0.45)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            transform: `scale(${panelScale})`,
            maxWidth: 1500,
          }}
        >
          {/* University logo */}
          <Img
            src={staticFile("images/haifa-logo-white.png")}
            style={{
              height: 64,
              marginBottom: parentTitle ? 28 : 34,
              transform: `translateY(${logoTranslate}px)`,
              opacity: logoSpring,
            }}
          />

          {/* Series badge (parent title) — distinct accent treatment */}
          {parentTitle && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "11px 30px",
                marginBottom: 26,
                borderRadius: 999,
                background: `linear-gradient(90deg, ${COLORS.primary}1a, ${COLORS.secondary}1a)`,
                border: `1px solid ${COLORS.primary}55`,
                boxShadow: `0 0 34px ${COLORS.primary}26`,
                transform: `scale(${badgeSpring})`,
                opacity: badgeSpring,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  background: COLORS.primary,
                  boxShadow: `0 0 12px ${COLORS.primary}`,
                }}
              />
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 600,
                  color: COLORS.primary,
                  letterSpacing: "0.5px",
                  direction: "rtl",
                }}
              >
                {parentTitle}
              </span>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  background: COLORS.secondary,
                  boxShadow: `0 0 12px ${COLORS.secondary}`,
                }}
              />
            </div>
          )}

          {/* Main title */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: parentTitle ? 54 : 64,
              fontWeight: 700,
              color: COLORS.text,
              textAlign: "center",
              direction: "rtl",
              transform: `scale(${titleScale})`,
              textShadow: `0 0 44px ${COLORS.primary}55`,
              letterSpacing: "-0.5px",
              maxWidth: 1320,
              lineHeight: 1.22,
            }}
          >
            {title}
          </div>

          {/* Divider */}
          <div
            style={{
              width: lineWidth,
              height: 2,
              background: `linear-gradient(to left, transparent, ${COLORS.primary}, ${COLORS.secondary}, transparent)`,
              marginTop: 30,
              marginBottom: 26,
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 27,
              fontWeight: 300,
              color: COLORS.textMuted,
              textAlign: "center",
              direction: "rtl",
              opacity: subtitleOpacity,
              letterSpacing: "0.5px",
            }}
          >
            {subtitle}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
