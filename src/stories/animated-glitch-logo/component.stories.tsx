import * as React from "react";

import {
  AnimatedGlitchLogo,
  Background,
  CoreInteractive,
  CoreLink,
  Display,
  FontSize,
  Layout,
} from "v2";

export default { title: "AnimatedGlitchLogo" };

export const inContext = () => (
  <Layout
    background={Background.Base}
    margin={{ y: 1 }}
    elevation={1}
    fullWidth
    display={Display.Flex}
    fontSize={FontSize.Size4}
  >
    <CoreInteractive>
      <AnimatedGlitchLogo padding={0.5} />
    </CoreInteractive>
    <CoreLink>
      <Layout padding={{ x: 1 }}>Discover</Layout>
    </CoreLink>
    <CoreInteractive>
      <Layout padding={{ x: 1 }}>Browse</Layout>
    </CoreInteractive>
    <CoreInteractive>
      <Layout padding={{ x: 1 }}>Try Prime</Layout>
    </CoreInteractive>
  </Layout>
);

export const largerSize = () => (
  <Layout display={Display.InlineFlex} border>
    <AnimatedGlitchLogo width={120} height={120} />
  </Layout>
);
