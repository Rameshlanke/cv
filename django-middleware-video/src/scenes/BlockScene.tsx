import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MONO } from "../theme";
import { Bar, barX, Endpoint, Packet } from "./Pipeline";

const LAYERS = ["Security", "Session", "Common", "Csrf", "Auth", "StaffOnly", "Messages"];
const BLOCK_AT = 5; // custom "StaffOnly" middleware

export const BlockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const n = LAYERS.length;
  const stopX = barX(BLOCK_AT, n) - 150;
  const inX = interpolate(frame, [20, 75], [250, stopX], {
    ...CLAMP,
    easing: Easing.bezier(0.5, 0, 0.75, 0),
  });
  const outX = interpolate(frame, [82, 130], [stopX, 250], {
    ...CLAMP,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const bounced = frame >= 78;
  const shake = bounced
    ? Math.sin(frame * 2.2) * interpolate(frame, [78, 95], [14, 0], CLAMP)
    : 0;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background glow="#3a0d0d" />
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
        }}
      >
        Any layer can say <span style={{ color: C.red }}>NO.</span>
      </Interactive.Div>

      <div style={{ position: "absolute", inset: 0, translate: `${shake}px 0px` }}>
        <Endpoint x={170} title="Client" sub="browser" color={C.blue} />
        {LAYERS.map((m, i) => (
          <Bar
            key={m}
            x={barX(i, n)}
            label={m}
            px={bounced ? outX : inX}
            color={bounced ? C.red : C.green}
            appear={-20}
            blocked={i === BLOCK_AT && bounced}
            dim={i > BLOCK_AT && bounced}
          />
        ))}
        <Endpoint
          x={1750}
          title="View"
          sub="never runs"
          color={C.purple}
          dim={bounced}
        />
      </div>

      <Packet
        x={inX}
        label="GET /admin"
        color={C.green}
        opacity={interpolate(frame, [12, 20, 76, 80], [0, 1, 1, 0], CLAMP)}
      />
      <Packet
        x={outX}
        label="403 Forbidden"
        color={C.red}
        opacity={interpolate(frame, [78, 84], [0, 1], CLAMP)}
      />

      <Interactive.Div
        name="Code"
        style={{
          position: "absolute",
          top: 880,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 44,
          opacity: interpolate(frame, [95, 108], [0, 1], CLAMP),
          translate: interpolate(frame, [95, 115], ["0px 30px", "0px 0px"], {
            ...CLAMP,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span style={{ color: C.purple }}>return</span>{" "}
        <span style={{ color: C.amber }}>HttpResponseForbidden</span>()
        <span style={{ color: C.muted, fontFamily: FONT, fontSize: 40 }}>
          {"  "}→ the view is skipped
        </span>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
