import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MONO } from "../theme";

const USES = [
  { t: "Auth", x: -620, y: -250, c: C.green },
  { t: "Logging", x: 600, y: -260, c: C.blue },
  { t: "CORS", x: -720, y: 30, c: C.amber },
  { t: "Rate limits", x: 680, y: 40, c: C.red },
  { t: "Timing", x: -480, y: 290, c: C.purple },
  { t: "Security headers", x: 480, y: 300, c: C.green },
];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background />
      {USES.map((u, i) => {
        const p = interpolate(frame, [6 + i * 5, 26 + i * 5], [0, 1], {
          ...CLAMP,
          easing: Easing.spring({ damping: 12 }),
        });
        const float = Math.sin((frame + i * 20) / 18) * 8;
        return (
          <div
            key={u.t}
            style={{
              position: "absolute",
              left: 960 + u.x * p,
              top: 540 + u.y * p + float,
              translate: "-50% -50%",
              padding: "16px 30px",
              borderRadius: 999,
              border: `2px solid ${u.c}`,
              color: u.c,
              background: `${C.panel}dd`,
              fontFamily: MONO,
              fontSize: 34,
              opacity: interpolate(p, [0, 0.3], [0, 0.9], CLAMP),
              whiteSpace: "nowrap",
            }}
          >
            {u.t}
          </div>
        );
      })}
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 24 }}
      >
        <Interactive.Div
          name="Headline"
          style={{
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: -3,
            opacity: interpolate(frame, [20, 32], [0, 1], CLAMP),
            scale: interpolate(frame, [20, 40], [0.85, 1], {
              ...CLAMP,
              easing: Easing.spring({ damping: 14 }),
              output: "perceptual-scale",
            }),
          }}
        >
          Write it <span style={{ color: C.green }}>once.</span>
        </Interactive.Div>
        <Interactive.Div
          name="Subline"
          style={{
            fontSize: 56,
            fontWeight: 500,
            color: C.muted,
            opacity: interpolate(frame, [40, 55], [0, 1], CLAMP),
            translate: interpolate(frame, [40, 60], ["0px 30px", "0px 0px"], {
              ...CLAMP,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Run it on <span style={{ color: C.text }}>every</span> request.
        </Interactive.Div>
        <Interactive.Div
          name="Tag"
          style={{
            marginTop: 30,
            fontFamily: MONO,
            fontSize: 34,
            color: C.green,
            opacity: interpolate(frame, [70, 85], [0, 1], CLAMP),
          }}
        >
          #Django · Middleware 101
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
