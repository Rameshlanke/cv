import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { BlockScene } from "./scenes/BlockScene";
import { CodeScene } from "./scenes/CodeScene";
import { FlowScene } from "./scenes/FlowScene";
import { HookScene } from "./scenes/HookScene";
import { HooksScene } from "./scenes/HooksScene";
import { OrderScene } from "./scenes/OrderScene";
import { OutroScene } from "./scenes/OutroScene";

export const DjangoMiddleware: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={150}>
      <HookScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-right" })}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence name="Flow" durationInFrames={300}>
      <FlowScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence name="Block" durationInFrames={180}>
      <BlockScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence name="Code" durationInFrames={300}>
      <CodeScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={slide({ direction: "from-bottom" })}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence name="Order" durationInFrames={240}>
      <OrderScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence name="Hooks" durationInFrames={210}>
      <HooksScene />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 15 })}
    />
    <TransitionSeries.Sequence name="Outro" durationInFrames={150}>
      <OutroScene />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
