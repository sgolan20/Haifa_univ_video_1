import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "./theme";

// Simple particle as a glowing dot
const Particle: React.FC<{
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  color: string;
}> = ({ x, y, size, speed, delay, color }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame + delay;

  const yOffset = interpolate(adjustedFrame, [0, 600], [0, -200 * speed], {
    extrapolateRight: "extend",
  });

  const opacity = interpolate(
    (adjustedFrame % 300) / 300,
    [0, 0.3, 0.7, 1],
    [0, 0.6, 0.6, 0]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${((y + yOffset) % 120 + 120) % 120}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};

export const Background: React.FC = () => {
  // Generate stable particles
  const particles = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      const seed = i * 137.508; // golden angle for distribution
      items.push({
        x: (seed * 7.3) % 100,
        y: (seed * 3.7) % 100,
        size: 2 + (i % 4),
        speed: 0.3 + (i % 5) * 0.15,
        delay: (i * 47) % 300,
        color: i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : "#1e40af",
      });
    }
    return items;
  }, []);

  return (
    <AbsoluteFill>
      {/* Gradient background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${COLORS.textDim}22 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      />
      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </AbsoluteFill>
  );
};
