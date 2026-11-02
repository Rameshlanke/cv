import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MONO } from "../theme";

type Seg = [string, string];
const K = C.purple; // keyword
const F = C.blue; // function
const S = C.amber; // string
const T = C.text;
const M = C.muted;

const LINES: Seg[][] = [
  [["def ", K], ["timing_middleware", F], ["(get_response):", T]],
  [["    # one-time setup goes here", M]],
  [["    def ", K], ["middleware", F], ["(request):", T]],
  [["        start = time.", T], ["perf_counter", F], ["()", T]],
  [["        response = ", T], ["get_response", F], ["(request)", T]],
  [["        took = time.", T], ["perf_counter", F], ["() - start", T]],
  [["        response[", T], ['"X-Took"', S], ["] = ", T], ['f"{took:.3f}s"', S]],
  [["        return ", K], ["response", T]],
  [["    return ", K], ["middleware", T]],
];

const LINE_H = 62;
const PAD = 44;
const PANEL_TOP = 250;

const GROUPS = [
  { from: 0, to: 1, at: 105, color: C.blue, label: "Runs once, at startup" },
  { from: 3, to: 3, at: 140, color: C.green, label: "BEFORE the view" },
  { from: 4, to: 4, at: 180, color: C.purple, label: "Next layer → your view" },
  { from: 5, to: 7, at: 220, color: C.amber, label: "AFTER the view" },
];

const Annotation: React.FC<(typeof GROUPS)[number]> = ({
  from,
  to,
  at,
  color,
  label,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 16], [0, 1], {
    ...CLAMP,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const top = PANEL_TOP + PAD + from * LINE_H;
  const h = (to - from + 1) * LINE_H;
  return (
    <>
      {/* band on the code */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top,
          width: 1180 * p,
          height: h,
          background: `${color}22`,
          borderLeft: `6px solid ${color}`,
        }}
      />
      {/* label on the right */}
      <div
        style={{
          position: "absolute",
          left: 1320,
          top: top + h / 2,
          translate: `${interpolate(p, [0, 1], [-40, 0])}px -50%`,
          opacity: p,
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 42,
          color,
          width: 540,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            background: color,
            boxShadow: `0 0 20px ${color}`,
            flexShrink: 0,
          }}
        />
        {label}
      </div>
    </>
  );
};

export const CodeScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background />
      <Interactive.Div
        name="Title"
        style={{
          position: "absolute",
          top: 90,
          left: 100,
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -1,
          opacity: interpolate(frame, [0, 12], [0, 1], CLAMP),
        }}
      >
        Anatomy of a middleware
      </Interactive.Div>

      <Interactive.Div
        name="Code panel"
        style={{
          position: "absolute",
          left: 100,
          top: PANEL_TOP,
          width: 1180,
          height: LINES.length * LINE_H + PAD * 2,
          borderRadius: 28,
          background: `${C.panel}ee`,
          border: `2px solid ${C.panelEdge}`,
          boxShadow: "0 30px 80px #000a",
          opacity: interpolate(frame, [4, 16], [0, 1], CLAMP),
          scale: interpolate(frame, [4, 22], [0.95, 1], {
            ...CLAMP,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />

      {GROUPS.map((g) => (
        <Annotation key={g.label} {...g} />
      ))}

      {LINES.map((segs, i) => {
        const chars = segs.reduce((a, s) => a + s[0].length, 0);
        const start = 18 + i * 8;
        const shown = Math.floor(
          interpolate(frame, [start, start + 10], [0, chars], CLAMP),
        );
        let left = shown;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 100 + PAD,
              top: PANEL_TOP + PAD + i * LINE_H,
              height: LINE_H,
              lineHeight: `${LINE_H}px`,
              fontFamily: MONO,
              fontSize: 34,
              whiteSpace: "pre",
            }}
          >
            {segs.map(([text, color], j) => {
              const part = text.slice(0, Math.max(0, left));
              left -= text.length;
              return (
                <span key={j} style={{ color }}>
                  {part}
                </span>
              );
            })}
          </div>
        );
      })}

      <Interactive.Div
        name="Footer"
        style={{
          position: "absolute",
          top: 940,
          left: 100,
          fontFamily: MONO,
          fontSize: 34,
          color: C.muted,
          opacity: interpolate(frame, [255, 270], [0, 1], CLAMP),
        }}
      >
        settings.py → MIDDLEWARE += [
        <span style={{ color: C.amber }}>"app.timing_middleware"</span>]
      </Interactive.Div>
    </AbsoluteFill>
  );
};
