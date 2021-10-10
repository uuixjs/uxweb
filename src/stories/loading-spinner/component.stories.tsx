import * as React from "react";

import {
  Background,
  Color,
  CoreText,
  Display,
  Layout,
  LoadingSpinner,
  SpinnerSize,
  Title,
} from "v2";

import { Component } from "react";

export default { title: "LoadingSpinner" };

export const examples = () => <LoadingSpinnerPage />;

class LoadingSpinnerPage extends Component {
  public render() {
    return (
      <div>
        <Layout margin={{ bottom: 2 }}>
          <Title>LoadingSpinner fillContent</Title>

          <Layout display={Display.Flex}>
            <Layout margin={{ right: 1, top: 1 }} border>
              fillContent = false
              <div style={{ width: "150px", height: "150px" }}>
                <LoadingSpinner delay={0} />
              </div>
            </Layout>
            <Layout margin={{ right: 1, top: 1 }} border>
              fillContent = true
              <div style={{ width: "150px", height: "150px" }}>
                <LoadingSpinner delay={0} fillContent />
              </div>
            </Layout>
          </Layout>

          <Title>LoadingSpinner Delay</Title>
          <CoreText>
            It occupies space before it has appeared with a delay
          </CoreText>

          <Layout display={Display.Flex}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Layout key={i} margin={1} border>
                <LoadingSpinner delay={i * 1000} />
              </Layout>
            ))}
          </Layout>
        </Layout>

        <Layout margin={{ bottom: 2 }}>
          <Title>LoadingSpinner Sizes</Title>

          <Layout display={Display.Flex}>
            <Layout color={Color.Error} margin={1}>
              <LoadingSpinner delay={0} size={SpinnerSize.Small} />
            </Layout>
            <Layout color={Color.Error} margin={1}>
              <LoadingSpinner delay={0} size={SpinnerSize.Default} />
            </Layout>
            <Layout color={Color.Error} margin={1}>
              <LoadingSpinner delay={0} size={SpinnerSize.Large} />
            </Layout>
          </Layout>
        </Layout>

        <Layout margin={{ bottom: 2 }}>
          <Title>LoadingSpinner Inherit Color Examples</Title>

          <Layout display={Display.Flex}>
            <Layout color={Color.Error} margin={1} border>
              Hello World
              <LoadingSpinner delay={0} inheritColor />
            </Layout>
            <Layout color={Color.Link} margin={1} border>
              Hello World
              <LoadingSpinner delay={0} inheritColor />
            </Layout>
            <Layout
              color={Color.Overlay}
              margin={1}
              border
              background={Background.Overlay}
            >
              Hello World
              <LoadingSpinner delay={0} inheritColor />
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
