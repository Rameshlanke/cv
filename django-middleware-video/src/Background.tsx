import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "./theme";

export const Background: React.FC<{ glow?: string }> = ({ glow = C.deep }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.panelEdge}33 1px, transparent 1px), linear-gradient(90deg, ${C.panelEdge}33 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: `0px ${interpolate(frame, [0, 300], [0, 80])}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, ${glow}aa 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 55%, #000000cc 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
