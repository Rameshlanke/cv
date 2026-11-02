import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MONO } from "../theme";

const HOOKS = [
  {
    name: "process_view",
    args: "(request, view_func, args, kwargs)",
    when: "Just before Django calls the view",
    color: C.green,
  },
  {
    name: "process_exception",
    args: "(request, exception)",
    when: "When the view raises an exception",
    color: C.red,
  },
  {
    name: "process_template_response",
    args: "(request, response)",
    when: "Before a TemplateResponse renders",
    color: C.blue,
  },
];

const Card: React.FC<{ i: number } & (typeof HOOKS)[number]> = ({
  i,
  name,
  args,
  when,
  color,
}) => {
  const frame = useCurrentFrame();
  const at = 30 + i * 22;
  const p = interpolate(frame, [at, at + 20], [0, 1], {
    ...CLAMP,
    easing: Easing.spring({ damping: 16 }),
  });
  return (
    <div
      style={{
        width: 1500,
        padding: "34px 48px",
        borderRadius: 28,
        background: `${C.panel}ee`,
        border: `2px solid ${C.panelEdge}`,
        borderLeft: `10px solid ${color}`,
        boxShadow: `0 20px 60px #0008, 0 0 40px ${color}22`,
        opacity: interpolate(p, [0, 0.4], [0, 1], CLAMP),
        translate: `${interpolate(p, [0, 1], [200, 0])}px 0px`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: 42 }}>
        <span style={{ color: C.purple }}>def </span>
        <span style={{ color, fontWeight: 700 }}>{name}</span>
        <span style={{ color: C.muted }}>{args}</span>
      </div>
      <div style={{ fontSize: 40, fontWeight: 500, color: C.text }}>{when}</div>
    </div>
  );
};

export const HooksScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 34,
        }}
      >
        <Interactive.Div
          name="Title"
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -1,
            marginBottom: 20,
            opacity: interpolate(frame, [0, 12], [0, 1], CLAMP),
          }}
        >
          Need finer control? Class-based <span style={{ color: C.green }}>hooks</span>
        </Interactive.Div>
        {HOOKS.map((h, i) => (
          <Card key={h.name} i={i} {...h} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
