import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Background } from "../Background";
import { C, CLAMP, FONT, MONO } from "../theme";

const ITEMS = [
  "SecurityMiddleware",
  "SessionMiddleware",
  "CommonMiddleware",
  "CsrfViewMiddleware",
  "AuthenticationMiddleware",
  "MessageMiddleware",
  "XFrameOptionsMiddleware",
];
const ROW = 74;
const TOP = 290;
const SESSION = 1;
const AUTH = 4;
const SWAP = 150;

export const OrderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const swap = interpolate(frame, [SWAP, SWAP + 24], [0, 1], {
    ...CLAMP,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const broken = frame >= SWAP + 24;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, color: C.text }}>
      <Background glow={broken ? "#3a0d0d" : undefined} />
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
        Order is <span style={{ color: C.amber }}>everything.</span>
      </Interactive.Div>

      {/* arrows */}
      <Interactive.Div
        name="Request arrow"
        style={{
          position: "absolute",
          left: 380,
          top: TOP,
          width: 8,
          height: ROW * ITEMS.length * interpolate(frame, [20, 60], [0, 1], CLAMP),
          background: `linear-gradient(${C.green}00, ${C.green})`,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          width: 240,
          textAlign: "right",
          top: TOP + 230,
          fontSize: 40,
          fontWeight: 700,
          color: C.green,
          opacity: interpolate(frame, [30, 45], [0, 1], CLAMP),
        }}
      >
        request ↓
      </div>
      <div
        style={{
          position: "absolute",
          left: 1532,
          top: TOP + ROW * ITEMS.length,
          translate: "0px -100%",
          width: 8,
          height: ROW * ITEMS.length * interpolate(frame, [60, 100], [0, 1], CLAMP),
          background: `linear-gradient(${C.amber}, ${C.amber}00)`,
          borderRadius: 4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1565,
          top: TOP + 230,
          fontSize: 40,
          fontWeight: 700,
          color: C.amber,
          opacity: interpolate(frame, [70, 85], [0, 1], CLAMP),
        }}
      >
        ↑ response
      </div>

      {ITEMS.map((name, i) => {
        let pos = i;
        if (i === SESSION) pos = interpolate(swap, [0, 1], [SESSION, AUTH]);
        if (i === AUTH) pos = interpolate(swap, [0, 1], [AUTH, SESSION]);
        const key = i === SESSION || i === AUTH;
        const hl = interpolate(frame, [110, 125], [0, 1], CLAMP);
        const appear = interpolate(frame, [10 + i * 4, 24 + i * 4], [0, 1], {
          ...CLAMP,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const lift = key ? Math.sin(swap * Math.PI) * (i === AUTH ? -60 : 60) : 0;
        const color = key ? (broken ? C.red : hl > 0.5 ? C.amber : C.text) : C.text;
        return (
          <div
            key={name}
            style={{
              position: "absolute",
              left: 440,
              top: TOP + pos * ROW,
              width: 1040,
              height: ROW - 12,
              display: "flex",
              alignItems: "center",
              paddingLeft: 30,
              borderRadius: 14,
              fontFamily: MONO,
              fontSize: 36,
              color,
              background: key ? `${color}${hl > 0 ? "22" : "00"}` : `${C.panel}cc`,
              border: `2px solid ${key && hl > 0 ? color : C.panelEdge}`,
              opacity: appear * (key || hl === 0 ? 1 : 0.5),
              translate: `${lift + interpolate(appear, [0, 1], [60, 0])}px 0px`,
              zIndex: key ? 5 : 1,
            }}
          >
            <span style={{ color: C.muted }}>"django...</span>
            {name}
            <span style={{ color: C.muted }}>",</span>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 860,
          width: "100%",
          textAlign: "center",
          height: 140,
        }}
      >
        <Interactive.Div
          name="Hint"
          style={{
            position: "absolute",
            width: "100%",
            fontSize: 48,
            fontWeight: 500,
            opacity: interpolate(frame, [115, 128, SWAP - 5, SWAP + 5], [0, 1, 1, 0], CLAMP),
          }}
        >
          Auth reads <span style={{ fontFamily: MONO, color: C.amber }}>request.session</span>{" "}
          — Session must come first
        </Interactive.Div>
        <Interactive.Div
          name="Error"
          style={{
            position: "absolute",
            width: "100%",
            fontFamily: MONO,
            fontSize: 46,
            fontWeight: 700,
            color: C.red,
            opacity: interpolate(frame, [SWAP + 24, SWAP + 32], [0, 1], CLAMP),
            scale: interpolate(frame, [SWAP + 24, SWAP + 36], [1.3, 1], {
              ...CLAMP,
              easing: Easing.spring({ damping: 10 }),
              output: "perceptual-scale",
            }),
          }}
        >
          ✖ ImproperlyConfigured
          <div style={{ fontFamily: FONT, fontSize: 36, color: C.muted, fontWeight: 500, marginTop: 10 }}>
            Swap two lines and the whole app breaks.
          </div>
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
