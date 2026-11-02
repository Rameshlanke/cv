import { Composition, Folder } from "remotion";
import { BlockScene } from "./scenes/BlockScene";
import { CodeScene } from "./scenes/CodeScene";
import { FlowScene } from "./scenes/FlowScene";
import { HookScene } from "./scenes/HookScene";
import { HooksScene } from "./scenes/HooksScene";
import { OrderScene } from "./scenes/OrderScene";
import { OutroScene } from "./scenes/OutroScene";
import { DjangoMiddleware } from "./Video";

const base = { width: 1920, height: 1080, fps: 30 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="DjangoMiddleware"
      component={DjangoMiddleware}
      durationInFrames={1440}
      {...base}
    />
    <Folder name="Scenes">
      <Composition id="Hook" component={HookScene} durationInFrames={150} {...base} />
      <Composition id="Flow" component={FlowScene} durationInFrames={300} {...base} />
      <Composition id="Block" component={BlockScene} durationInFrames={180} {...base} />
      <Composition id="Code" component={CodeScene} durationInFrames={300} {...base} />
      <Composition id="Order" component={OrderScene} durationInFrames={240} {...base} />
      <Composition id="Hooks" component={HooksScene} durationInFrames={210} {...base} />
      <Composition id="Outro" component={OutroScene} durationInFrames={150} {...base} />
    </Folder>
  </>
);
