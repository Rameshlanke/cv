import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MIDDLEWARE, MONO } from "../theme";

const Chip: React.FC<{ label: string; index: number }> = ({ label, index }) => {
  const frame = useCurrentFrame();
  const start = 52 + index * 6;
  const p = interpolate(frame, [start, start + 14], [0, 1], {
    ...CLAMP,
    easing: Easing.spring({ damping: 14 }),
  });
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 30,
        color: C.text,
        padding: "16px 26px",
        borderRadius: 16,
        border: `2px solid ${C.green}`,
        background: `${C.deep}cc`,
        opacity: interpolate(p, [0, 0.3], [0, 1], CLAMP),
        scale: interpolate(p, [0, 1], [0.4, 1]),
        translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
        boxShadow: `0 0 30px ${C.green}55`,
      }}
    >
      <span style={{ color: C.green, marginRight: 10 }}>{index + 1}</span>
      {label}
    </div>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.round(
    interpolate(frame, [52, 52 + 6 * 6 + 8], [0, 7], CLAMP),
  );

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <Interactive.Div
          name="Line 1"
          style={{
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -2,
            opacity: interpolate(frame, [0, 10], [0, 1], CLAMP),
            translate: interpolate(frame, [0, 18], ["0px 60px", "0px 0px"], {
              ...CLAMP,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Your Django view is
        </Interactive.Div>
        <Interactive.Div
          name="Line 2"
          style={{
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -2,
            opacity: interpolate(frame, [8, 18], [0, 1], CLAMP),
            translate: interpolate(frame, [8, 26], ["0px 60px", "0px 0px"], {
              ...CLAMP,
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          <span
            style={{
              color: C.bg,
              background: C.red,
              padding: "0 22px",
              borderRadius: 14,
              display: "inline-block",
              rotate: `${interpolate(frame, [18, 28], [-12, -3], {
                ...CLAMP,
                easing: Easing.spring({ damping: 8 }),
              })}deg`,
              scale: interpolate(frame, [18, 28], [1.8, 1], {
                ...CLAMP,
                easing: Easing.spring({ damping: 10 }),
              }),
            }}
          >
            NOT
          </span>{" "}
          the first code to run.
        </Interactive.Div>

        <div
          style={{
            display: "flex",
            gap: 18,
            marginTop: 40,
            height: 90,
            alignItems: "center",
          }}
        >
          {MIDDLEWARE.map((m, i) => (
            <Chip key={m} label={m} index={i} />
          ))}
        </div>

        <div style={{ height: 130, position: "relative", width: 1600 }}>
          <Interactive.Div
            name="Counter"
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              fontSize: 64,
              fontWeight: 500,
              color: C.muted,
              opacity: interpolate(frame, [50, 56, 96, 104], [0, 1, 1, 0], CLAMP),
            }}
          >
            <span style={{ color: C.green, fontFamily: MONO }}>{count}</span>{" "}
            {count === 1 ? "layer runs" : "layers run"} before it
          </Interactive.Div>
          <Interactive.Div
            name="Punchline"
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              fontSize: 84,
              fontWeight: 700,
              color: C.green,
              opacity: interpolate(frame, [104, 114], [0, 1], CLAMP),
              scale: interpolate(frame, [104, 120], [0.7, 1], {
                ...CLAMP,
                easing: Easing.spring({ damping: 12 }),
                output: "perceptual-scale",
              }),
            }}
          >
            Meet Middleware.
          </Interactive.Div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
