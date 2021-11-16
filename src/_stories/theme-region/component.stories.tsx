import * as React from "react";

import {
  Background,
  BorderRadius,
  Button,
  ButtonType,
  CoreText,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  ThemeRegion,
  Title,
} from "v2";
import { themeRule, themeTokenRule } from "@uuixjs/uuixweb-lib";

import styled from "styled-components";

export default { title: ThemeRegion.displayName };
export const themePreview = () => (
  <Layout display={Display.Flex}>
    <ThemeRegion
      theme="light"
      border
      flexGrow={1}
      flexShrink={1}
      fullWidth
      margin={0.5}
    >
      <ExampleContents label="Always Light Theme:" />
    </ThemeRegion>

    <ThemeRegion
      theme="dark"
      border
      flexGrow={1}
      flexShrink={1}
      fullWidth
      margin={0.5}
    >
      <ExampleContents label="Always Dark Theme" />
    </ThemeRegion>

    <ThemeRegion
      theme="system"
      border
      flexGrow={1}
      flexShrink={1}
      fullWidth
      margin={0.5}
    >
      <ExampleContents label="Always System Theme:" />
    </ThemeRegion>
  </Layout>
);

const MyBox = styled.div`
  width: 100px;
  height: 100px;
  background: ${themeTokenRule("color-background-base")};
  border: 2rem solid ${themeRule({ dark: "#EEE", light: "#111" })};
`;

export const themePreviewWithStyledComponentUtils = () => (
  <Layout display={Display.Flex}>
    <ThemeRegion
      theme="light"
      border
      flexGrow={1}
      flexShrink={1}
      fullWidth
      margin={0.5}
    >
      <Title>Always Light Theme:</Title>
      The square below should be clearly visible:
      <Layout margin={1}>
        <MyBox />
      </Layout>
    </ThemeRegion>

    <ThemeRegion
      theme="dark"
      border
      flexGrow={1}
      flexShrink={1}
      fullWidth
      margin={0.5}
    >
      <Title>Always Dark Theme:</Title>
      The square below should be clearly visible:
      <MyBox />
    </ThemeRegion>
  </Layout>
);

function ExampleContents({ label }: { label: string }) {
  return (
    <Layout padding={2}>
      <Title>{label}</Title>
      <Layout
        border
        elevation={2}
        padding={1}
        margin={{ top: 2 }}
        background={Background.Alt}
        borderRadius={BorderRadius.Large}
      >
        <CoreText>
          This region will always show a preview of a fixed theme regardless of
          the what the whole-page them is set to.
        </CoreText>
        <Layout
          display={Display.Flex}
          justifyContent={JustifyContent.Start}
          flexDirection={FlexDirection.RowReverse}
        >
          <Layout>
            <Button>Primary</Button>
          </Layout>
          <Layout margin={{ right: 1 }}>
            <Button variant={ButtonType.Secondary}>Secondary</Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}
