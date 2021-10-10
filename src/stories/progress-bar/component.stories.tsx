import * as React from "react";

import {
  Background,
  BorderRadius,
  Button,
  Color,
  CoreText,
  Layout,
  OverlayRegion,
  Position,
  ProgressBar,
  ProgressBarAnimationDirection,
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarStatus,
  ZIndex,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import { useEffect, useState } from "react";

import { ExampleSection } from "../../components/example-section";

export default { title: ProgressBar.displayName };

export const examples = () => renderExamples();

export const withOverlay = () => (
  <Layout padding={2} background={Background.AccentAlt} color={Color.Overlay}>
    {renderExamples({ overlay: true })}
  </Layout>
);

const renderExamples = (props?: Partial<ProgressBarProps>) => {
  return (
    <>
      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "value",
            propValues: [0, 25, 50, 75, 100, undefined],
          },
          {
            propKey: "mask",
            propValues: [false, true],
          },
          {
            propKey: "size",
            propEnum: ProgressBarSize,
            propEnumName: "ProgressBarSize",
          },
          {
            propKey: "borderRadius",
            propEnum: BorderRadius,
            propEnumName: "BorderRadius",
          },
        ]}
      >
        <ProgressBar value={50} {...props} />
        <ProgressBar value={50} {...props} status={ProgressBarStatus.Caution} />
        <ProgressBar value={50} {...props} status={ProgressBarStatus.Error} />
        <ProgressBar value={50} {...props} status={ProgressBarStatus.Success} />
      </CombinationGenerator>

      <ExampleSection label="inherit">
        <Layout style={{ color: "blue" }}>
          <Layout margin={{ bottom: 1 }}>
            This progress bar will inherit the current text color, which is
            "blue":
          </Layout>
          <ProgressBar value={50} mask inherit />
        </Layout>
      </ExampleSection>
    </>
  );
};

export const WithAnimation = () => {
  const [count, setCount] = useState(0);
  return (
    <Layout padding={{ top: 5 }}>
      <Layout
        position={Position.Fixed}
        attachTop
        attachLeft
        attachRight
        border
        padding={1}
        background={Background.Overlay}
        elevation={2}
        zIndex={ZIndex.Above}
      >
        <OverlayRegion>
          <Button onClick={() => setCount((i) => i + 1)}>Reset Examples</Button>
        </OverlayRegion>
      </Layout>

      <Layout key={count}>
        <CombinationGenerator
          mode={CombinationMode.Simple}
          fields={[
            {
              propKey: "value",
              propValues: [0, 25, 50, 75, 100, undefined],
            },
            {
              propKey: "animationDuration",
              propValues: [undefined, 0, 0.5, 1, 5, 10],
            },
            {
              propKey: "animationDirection",
              propEnum: ProgressBarAnimationDirection,
              propEnumName: "ProgressBarAnimationDirection",
            },
            {
              propKey: "paused",
              propValues: [false, true],
            },
          ]}
        >
          <ProgressBar
            mask
            animationDuration={10}
            animationDirection={ProgressBarAnimationDirection.Down}
          />
        </CombinationGenerator>

        <ExampleSection label="paused, dynamic">
          <ExampleWithAnimationPausing />
        </ExampleSection>

        <ExampleSection label="onAnimationEnd">
          <ExampleWithOnAnimationEnd />
        </ExampleSection>

        <ExampleSection label="value + direction + duration">
          <CoreText bold>value=undefined, duration=10, direction=down</CoreText>
          <Layout padding={1}>
            <ProgressBar
              mask
              value={undefined}
              animationDuration={10}
              animationDirection={ProgressBarAnimationDirection.Down}
            />
          </Layout>

          <CoreText bold>value=50, duration=10, direction=down</CoreText>
          <Layout padding={1}>
            <ProgressBar
              mask
              value={50}
              animationDuration={10}
              animationDirection={ProgressBarAnimationDirection.Down}
            />
          </Layout>

          <CoreText bold>value=25, duration=10, direction=down</CoreText>
          <Layout padding={1}>
            <ProgressBar
              mask
              value={25}
              animationDuration={10}
              animationDirection={ProgressBarAnimationDirection.Down}
            />
          </Layout>

          <Layout borderBottom margin={{ y: 1 }} />

          <CoreText bold>value=50, duration=10, direction=up</CoreText>
          <Layout padding={1}>
            <ProgressBar
              mask
              value={50}
              animationDuration={10}
              animationDirection={ProgressBarAnimationDirection.Up}
            />
          </Layout>

          <CoreText bold>value=25, duration=10, direction=up</CoreText>
          <Layout padding={1}>
            <ProgressBar
              mask
              value={25}
              animationDuration={10}
              animationDirection={ProgressBarAnimationDirection.Up}
            />
          </Layout>

          <CoreText bold>value=undefined, duration=10, direction=up</CoreText>
          <Layout padding={1}>
            <ProgressBar
              mask
              value={undefined}
              animationDuration={10}
              animationDirection={ProgressBarAnimationDirection.Up}
            />
          </Layout>
        </ExampleSection>
      </Layout>
    </Layout>
  );
};

function ExampleWithAnimationPausing() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPaused((p) => !p);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [setIsPaused]);

  return (
    <Layout>
      Paused: {isPaused ? "Yes" : "No"}
      <ProgressBar
        value={50}
        mask
        animationDuration={5}
        animationDirection={ProgressBarAnimationDirection.Down}
        paused={isPaused}
      />
    </Layout>
  );
}

function ExampleWithOnAnimationEnd() {
  const [isDone, setIsDone] = useState(false);

  return (
    <Layout>
      Callback has run: {isDone ? "Yes" : "No"}
      <ProgressBar
        value={50}
        mask
        animationDuration={5}
        animationDirection={ProgressBarAnimationDirection.Down}
        onAnimationEnd={() => setIsDone(true)}
      />
    </Layout>
  );
}
