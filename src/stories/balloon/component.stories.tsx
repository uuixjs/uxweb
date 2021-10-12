import * as React from "react";

import {
  AlignItems,
  AttachedBalloon,
  Background,
  BalloonDirection,
  BalloonSize,
  BalloonWrapper,
  Display,
  InjectLayout,
  Interactable,
  JustifyContent,
  Layout,
  Position,
  SplitButton,
  Title,
  TitleSize,
} from "v2";

import { FC } from "react";

export default { title: "Dialogs / Balloon" };

export const Size = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title size={TitleSize.Small}>BalloonSize.Auto</Title>
      </Layout>
      <BalloonWrapper size={BalloonSize.Auto}>
        <ExampleContent />
      </BalloonWrapper>
    </Layout>

    <Layout margin={{ bottom: 2 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title size={TitleSize.Small}>BalloonSize.ExtraSmall</Title>
      </Layout>
      <BalloonWrapper size={BalloonSize.ExtraSmall}>
        <ExampleContent />
      </BalloonWrapper>
    </Layout>

    <Layout margin={{ bottom: 2 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title size={TitleSize.Small}>BalloonSize.Small</Title>
      </Layout>
      <BalloonWrapper size={BalloonSize.Small}>
        <ExampleContent />
      </BalloonWrapper>
    </Layout>

    <Layout margin={{ bottom: 2 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title size={TitleSize.Small}>BalloonSize.Medium</Title>
      </Layout>
      <BalloonWrapper size={BalloonSize.Medium}>
        <ExampleContent />
      </BalloonWrapper>
    </Layout>

    <Layout margin={{ bottom: 2 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title size={TitleSize.Small}>BalloonSize.Large</Title>
      </Layout>
      <BalloonWrapper size={BalloonSize.Large}>
        <ExampleContent />
      </BalloonWrapper>
    </Layout>

    <Layout margin={{ bottom: 2 }}>
      <Layout margin={{ bottom: 1 }}>
        <Title size={TitleSize.Small}>BalloonSize.ExtraLarge</Title>
      </Layout>
      <BalloonWrapper size={BalloonSize.ExtraLarge}>
        <ExampleContent />
      </BalloonWrapper>
    </Layout>
  </>
);

export const Overlay = () => (
  <Layout background={Background.Accent} padding={2}>
    <BalloonWrapper
      aria-label="This is a balloon"
      size={BalloonSize.Auto}
      overlay
    >
      <ExampleContent />
    </BalloonWrapper>
  </Layout>
);

function ExampleContent() {
  return (
    <Layout padding={1}>
      <Interactable>
        <Layout padding={{ x: 1, y: 0.5 }}>About</Layout>
      </Interactable>
      <Interactable>
        <Layout padding={{ x: 1, y: 0.5 }}>Blog</Layout>
      </Interactable>
      <Interactable>
        <Layout padding={{ x: 1, y: 0.5 }}>Creative</Layout>
      </Interactable>
      <Interactable>
        <Layout padding={{ x: 1, y: 0.5 }}>Long multi-word string</Layout>
      </Interactable>
    </Layout>
  );
}

export const AttachedBalloonExample = () => (
  <>
    <ExampleRelativeContainer>
      <AttachedBalloon show direction={BalloonDirection.BottomRight}>
        <ExampleContent />
      </AttachedBalloon>
    </ExampleRelativeContainer>
  </>
);

const ExampleRelativeContainer: FC = ({ children }) => (
  <InjectLayout
    background={Background.Alt}
    display={Display.Flex}
    alignItems={AlignItems.Start}
    justifyContent={JustifyContent.End}
    padding={1}
  >
    <div style={{ width: 300, height: 200 }}>
      <Layout border background={Background.Alt2} position={Position.Relative}>
        <SplitButton dropdown={{}} children="Example" />
        {children}
      </Layout>
    </div>
  </InjectLayout>
);
