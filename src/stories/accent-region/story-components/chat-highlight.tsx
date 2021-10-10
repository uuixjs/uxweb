import * as React from "react";

import {
  Background,
  CoreText,
  Display,
  Layout,
  TextType,
} from "v2";

import { FC } from "react";

export const ChatHiglight: FC = () => (
  <Layout margin={{ y: 3 }} display={Display.Flex} background={Background.Alt}>
    <div
      style={{
        width: "0.6rem",
        background: "var(--color-accent)",
      }}
    />
    <Layout padding={{ y: 1, left: 1, right: 2 }}>
      <CoreText bold>ChatUsername</CoreText>
      <CoreText>
        <CoreText type={TextType.Span} bold>
          Subscribed
        </CoreText>{" "}
        at Tier 1
      </CoreText>
    </Layout>
  </Layout>
);
