import { continueRender, delayRender, staticFile } from "remotion";

// Fonts are bundled in public/fonts (variable woff2, latin subset from Google Fonts)
// so rendering works offline.
const load = (family: string, file: string) => {
  if (typeof document === "undefined") return;
  const handle = delayRender(`Loading ${family}`);
  const face = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format("woff2")`, {
    weight: "100 900",
  });
  face
    .load()
    .then(() => {
      document.fonts.add(face);
      continueRender(handle);
    })
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};

load("Space Grotesk", "SpaceGrotesk.woff2");
load("JetBrains Mono", "JetBrainsMono.woff2");

export const FONT = "'Space Grotesk', sans-serif";
export const MONO = "'JetBrains Mono', monospace";
export const C = {
  bg: "#07110D",
  panel: "#0F1F18",
  panelEdge: "#1E3A2E",
  green: "#44B78B",
  deep: "#0C4B33",
  amber: "#F5B14C",
  red: "#FF5C5C",
  text: "#EAF5EF",
  muted: "#8AA89A",
  blue: "#6CB6FF",
  purple: "#C792EA",
};

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const MIDDLEWARE = [
  "Security",
  "Session",
  "Common",
  "Csrf",
  "Auth",
  "Messages",
  "XFrame",
];
