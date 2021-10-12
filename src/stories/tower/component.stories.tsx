import * as React from "react";

import {
  AlignItems,
  Background,
  Color,
  CoreText,
  Display,
  FontSize,
  JustifyContent,
  Layout,
  Title,
  Tower,
  TowerChildWidth,
  TowerGutter,
} from "v2";

export default {
  title: Tower.displayName,
};

const children = (
  <>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>A</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>B</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>C</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>D</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>E</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>F</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>G</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>H</CoreText>
      </Layout>
    </div>
    <div>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>I</CoreText>
      </Layout>
    </div>
  </>
);

export const behaviors = () => (
  <>
    <Title>NoGrow</Title>
    <Tower
      childWidth={TowerChildWidth.Medium}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
      noGrow
    >
      {children}
    </Tower>
    <Title>NoWrap</Title>
    <Tower
      childWidth={TowerChildWidth.Medium}
      gutterSize={TowerGutter.Small}
      noWrap
    >
      {children}
    </Tower>
    <Title>Center (noGrow)</Title>
    <Tower
      childWidth={TowerChildWidth.Medium}
      gutterSize={TowerGutter.Small}
      noGrow
      center
    >
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>A</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>B</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>C</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>D</CoreText>
        </Layout>
      </div>
    </Tower>
  </>
);
export const sizes = () => (
  <>
    <Title>ExtraSmall {TowerChildWidth.ExtraSmall}</Title>
    <Tower
      childWidth={TowerChildWidth.ExtraSmall}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>Small {TowerChildWidth.Small}</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>Medium {TowerChildWidth.Medium}</Title>
    <Tower
      childWidth={TowerChildWidth.Medium}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>Large {TowerChildWidth.Large}</Title>
    <Tower
      childWidth={TowerChildWidth.Large}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>ExtraLarge {TowerChildWidth.ExtraLarge}</Title>
    <Tower
      childWidth={TowerChildWidth.ExtraLarge}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>600</Title>
    <Tower
      childWidth={600}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
  </>
);

export const gutters = () => (
  <>
    <Title>None</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.None}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>ExtraSmall</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.ExtraSmall}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>Small</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>Default</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.Default}
      placeholderItems={20}
    >
      {children}
    </Tower>
    <Title>Large</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.Large}
      placeholderItems={20}
    >
      {children}
    </Tower>
  </>
);

export const placeholders = () => (
  <>
    <Title>With Placeholders</Title>
    <Tower
      childWidth={TowerChildWidth.Small}
      gutterSize={TowerGutter.Small}
      placeholderItems={20}
    >
      {children}
    </Tower>

    <Title>Without Placeholders</Title>
    <Tower childWidth={TowerChildWidth.Small}>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>A</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>B</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>C</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>D</CoreText>
        </Layout>
      </div>
      <div>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
          margin={{ bottom: 1 }}
          display={Display.Flex}
          justifyContent={JustifyContent.Center}
          alignItems={AlignItems.Center}
        >
          <CoreText fontSize={FontSize.Size2}>E</CoreText>
        </Layout>
      </div>
    </Tower>
  </>
);
