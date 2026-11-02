import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, CLAMP, MONO, FONT } from "../theme";

export const BAR_TOP = 300;
export const BAR_H = 470;
export const LANE_Y = BAR_TOP + BAR_H / 2;

export const barX = (i: number, n: number, from = 470, to = 1450) =>
  n === 1 ? (from + to) / 2 : from + ((to - from) / (n - 1)) * i;

/** One middleware layer. `px` is the current x of the travelling packet. */
export const Bar: React.FC<{
  x: number;
  label: string;
  px: number;
  color: string;
  appear: number;
  blocked?: boolean;
  dim?: boolean;
}> = ({ x, label, px, color, appear, blocked, dim }) => {
  const frame = useCurrentFrame();
  const glow = Math.max(0, 1 - Math.abs(px - x) / 110);
  const p = interpolate(frame, [appear, appear + 16], [0, 1], {
    ...CLAMP,
    easing: Easing.spring({ damping: 15 }),
  });
  const edge = blocked ? C.red : glow > 0.05 ? color : C.panelEdge;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 60,
        top: BAR_TOP,
        width: 120,
        height: BAR_H,
        opacity: p * (dim ? 0.35 : 1),
        translate: `0px ${interpolate(p, [0, 1], [80, 0])}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 26,
          border: `3px solid ${edge}`,
          background: blocked
            ? `${C.red}33`
            : `linear-gradient(180deg, ${C.panel}, ${C.bg})`,
          boxShadow: `0 0 ${20 + glow * 70}px ${blocked ? C.red : color}${Math.round(
            (blocked ? 0.6 : glow * 0.8) * 255,
          )
            .toString(16)
            .padStart(2, "0")}`,
          scale: `1 ${1 + glow * 0.05}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: BAR_H + 22,
          left: -40,
          width: 200,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 26,
          color: blocked ? C.red : glow > 0.2 ? color : C.muted,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Packet: React.FC<{
  x: number;
  label: string;
  color: string;
  opacity?: number;
}> = ({ x, label, color, opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: LANE_Y,
      translate: "-50% -50%",
      padding: "18px 30px",
      borderRadius: 999,
      background: color,
      color: C.bg,
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: 32,
      whiteSpace: "nowrap",
      boxShadow: `0 0 50px ${color}`,
      opacity,
      zIndex: 10,
    }}
  >
    {label}
  </div>
);

export const Endpoint: React.FC<{
  x: number;
  title: string;
  sub: string;
  color: string;
  glow?: number;
  dim?: boolean;
}> = ({ x, title, sub, color, glow = 0, dim }) => (
  <div
    style={{
      position: "absolute",
      left: x - 110,
      top: LANE_Y - 90,
      width: 220,
      height: 180,
      borderRadius: 28,
      border: `3px solid ${color}`,
      background: C.panel,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      boxShadow: `0 0 ${30 + glow * 80}px ${color}${glow > 0 ? "aa" : "33"}`,
      opacity: dim ? 0.35 : 1,
    }}
  >
    <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color }}>
      {title}
    </div>
    <div style={{ fontFamily: MONO, fontSize: 22, color: C.muted }}>{sub}</div>
  </div>
);
