import * as React from "react";

import {
  AlignItems,
  Background,
  Button,
  ButtonIcon,
  ButtonType,
  Display,
  Layout,
  Overflow,
  Placeholder,
  SVGAsset,
} from "v2";

import { AnimatedNumberControlled } from "./story-components/animated-number-controlled";
import { AnimatedNumberDisco } from "./story-components/animated-number-disco";
import { Component } from "react";

export default { title: "AnimatedNumber" };

export const examples = () => <AnimatedNumberPage />;

class AnimatedNumberPage extends Component {
  public render() {
    return (
      <Layout fullWidth>
        <AnimatedNumberControlled startValue={123} />

        <Layout
          display={Display.Flex}
          alignItems={AlignItems.Center}
          background={Background.Base}
          padding={1}
          elevation={1}
          margin={{ y: 5 }}
        >
          <Layout flexGrow={0} flexShrink={0} margin={{ right: 1 }}>
            <Placeholder width={40} height={60} />
          </Layout>
          <Layout flexGrow={1} flexShrink={1} overflow={Overflow.Hidden}>
            <Placeholder lineCount={2} width={180} />
          </Layout>
          <Layout flexGrow={0} flexShrink={0} margin={{ x: 1 }}>
            <AnimatedNumberDisco
              startValue={123456}
              deltaMin={-10}
              deltaMax={20}
            />
          </Layout>
          <Layout flexGrow={0} flexShrink={0}>
            <Button variant={ButtonType.Secondary}>Share</Button>
            <Layout margin={{ left: 1 }} display={Display.InlineBlock}>
              <ButtonIcon aria-label="aria label" icon={SVGAsset.More} />
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
