import * as React from "react";

import {
  AlignItems,
  Background,
  Color,
  CoreText,
  Cursor,
  JustifyContent,
  Layout,
  LayoutProps,
  TextType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

import { OverlayPreview } from "../components/overlay-preview";

export default { title: "Layout" };

export const cursor = () => (
  <>
    <Layout cursor={Cursor.Default} padding={1}>
      Hovering over this element should display an arrow cursor.
    </Layout>
    <Layout cursor={Cursor.Auto} padding={1}>
      Hovering over this element should display a text cursor.
    </Layout>
    <Layout cursor={Cursor.NotAllowed} padding={1}>
      Hovering over this element should display the "not-allowed" cursor.
    </Layout>
    <Layout cursor={Cursor.Pointer} padding={1}>
      Hovering over this element should display the pointer cursor.
    </Layout>
  </>
);

const commonProps: LayoutProps = {
  padding: 5,
  justifyContent: JustifyContent.Center,
  alignItems: AlignItems.Center,
};

export const examples = () => {
  return (
    <Layout margin={{ bottom: 2 }}>
      <CoreText type={TextType.H2}>Layout Examples</CoreText>

      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "color",
            propValues: [
              Color.Base,
              Color.Alt,
              Color.Alt2,
              Color.Error,
              Color.Inherit,
              Color.Link,
              Color.Live,
              Color.Overlay,
              Color.OverlayAlt,
            ],
          },
          {
            propKey: "background",
            propValues: [
              Background.Accent,
              Background.AccentAlt,
              Background.AccentAlt2,
              Background.Alt,
              Background.Alt2,
              Background.Base,
              Background.Overlay,
            ],
          },
        ]}
      >
        <Layout {...commonProps}>Text</Layout>
      </CombinationGenerator>
    </Layout>
  );
};

export const withOverlay = () => {
  return (
    <Layout margin={{ bottom: 2 }}>
      <CoreText type={TextType.H3}>Overlay Mode:</CoreText>
      <OverlayPreview>
        <CombinationGenerator
          mode={CombinationMode.Simple}
          fields={[
            {
              propKey: "color",
              propValues: [Color.Overlay, Color.OverlayAlt],
            },
            {
              propKey: "background",
              propValues: [
                Background.Accent,
                Background.AccentAlt,
                Background.AccentAlt2,
                Background.Overlay,
              ],
            },
          ]}
        >
          <Layout {...commonProps}>Text</Layout>
        </CombinationGenerator>
      </OverlayPreview>
    </Layout>
  );
};

export const withElevation = () => {
  return (
    <Layout margin={{ bottom: 2 }}>
      <CoreText type={TextType.H2}>Layout Examples</CoreText>

      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "color",
            propValues: [Color.Base],
          },
          {
            propKey: "background",
            propValues: [Background.Alt, Background.Alt2, Background.Base],
          },
        ]}
      >
        <Layout {...commonProps} elevation={0}>
          Text
        </Layout>
        <Layout {...commonProps} elevation={1}>
          Text
        </Layout>
        <Layout {...commonProps} elevation={2}>
          Text
        </Layout>
        <Layout {...commonProps} elevation={3}>
          Text
        </Layout>
        <Layout {...commonProps} elevation={4}>
          Text
        </Layout>
        <Layout {...commonProps} elevation={5}>
          Text
        </Layout>
      </CombinationGenerator>
    </Layout>
  );
};
