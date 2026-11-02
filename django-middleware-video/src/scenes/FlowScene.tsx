import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MIDDLEWARE } from "../theme";
import { Bar, barX, Endpoint, Packet } from "./Pipeline";

const IO = Easing.bezier(0.65, 0, 0.35, 1);

export const FlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reqX = interpolate(frame, [40, 140], [250, 1680], { ...CLAMP, easing: IO });
  const resX = interpolate(frame, [170, 270], [1680, 250], { ...CLAMP, easing: IO });
  const responding = frame >= 155;
  const px = responding ? resX : reqX;
  const viewGlow = interpolate(frame, [135, 145, 160, 170], [0, 1, 1, 0], CLAMP);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background />
      <Interactive.Div
        name="Title"
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -1,
          opacity: interpolate(frame, [0, 12], [0, 1], CLAMP),
          translate: interpolate(frame, [0, 20], ["0px -40px", "0px 0px"], {
            ...CLAMP,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        Every request runs the <span style={{ color: C.green }}>gauntlet</span>
      </Interactive.Div>

      <Endpoint x={170} title="Client" sub="browser" color={C.blue} />
      {MIDDLEWARE.map((m, i) => (
        <Bar
          key={m}
          x={barX(i, MIDDLEWARE.length)}
          label={m}
          px={px}
          color={responding ? C.amber : C.green}
          appear={8 + i * 3}
        />
      ))}
      <Endpoint
        x={1750}
        title="View"
        sub="def dashboard()"
        color={C.purple}
        glow={viewGlow}
      />

      <Packet
        x={reqX}
        label="GET /dashboard"
        color={C.green}
        opacity={interpolate(frame, [30, 40, 145, 155], [0, 1, 1, 0], CLAMP)}
      />
      <Packet
        x={resX}
        label="200 OK"
        color={C.amber}
        opacity={interpolate(frame, [155, 168, 272, 285], [0, 1, 1, 0], CLAMP)}
      />

      <div
        style={{
          position: "absolute",
          top: 900,
          width: "100%",
          height: 80,
          fontSize: 50,
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Caption request"
          style={{
            position: "absolute",
            width: "100%",
            opacity: interpolate(frame, [40, 50, 145, 155], [0, 1, 1, 0], CLAMP),
          }}
        >
          <span style={{ color: C.green }}>Request →</span> top to bottom of{" "}
          <span style={{ fontFamily: "monospace" }}>MIDDLEWARE</span>
        </Interactive.Div>
        <Interactive.Div
          name="Caption response"
          style={{
            position: "absolute",
            width: "100%",
            opacity: interpolate(frame, [160, 172], [0, 1], CLAMP),
          }}
        >
          <span style={{ color: C.amber }}>← Response</span> back out, in{" "}
          <b>reverse</b> order
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
