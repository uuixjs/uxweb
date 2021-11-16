import * as React from "react";

import {
  AlignItems,
  Aspect,
  AspectRatio,
  Background,
  Display,
  JustifyContent,
  Layout,
  OverlayRegion,
  Placeholder,
  Typeset,
} from "v2";

export default { title: "Placeholder" };
export const examples = () => (
  <>
    <Typeset>
      <h4>Fill container (default / no props)</h4>
      <Layout border style={{ width: "200px", height: "100px" }}>
        <Placeholder />
      </Layout>
      <h4>One Line</h4>
      <p>
        <Placeholder lineCount={1} />
      </p>
      <h4>Five Lines</h4>
      <p>
        <Placeholder lineCount={5} />
      </p>
      <h4>Five Lines + Width 300</h4>
      <p>
        <Placeholder lineCount={5} width={300} />
      </p>
      <h4>Five Lines + Width 300 + Height 10</h4>
      <p>
        <Placeholder lineCount={5} width={300} height={10} />
      </p>
      <h4>Height 100</h4>
      <p>
        <Placeholder height={100} />
      </p>
      <h4>Width 100</h4>
      <p>
        <Placeholder width={100} />
      </p>
      <h4>Height/Width 100</h4>
      <p>
        <Placeholder height={100} width={100} />
      </p>
      <h4>As a child of a flex-parent, with defined width/height</h4>
      <Layout
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Stretch}
        border
        style={{ width: "200px", height: "100px" }}
      >
        <Placeholder width={50} height={50} />
      </Layout>
      <h4>As a child of inline-block elements</h4>
      <Layout display={Display.InlineBlock} margin={{ right: 1 }}>
        <Placeholder width={50} height={50} />
      </Layout>
      <Layout display={Display.InlineBlock} margin={{ right: 1 }}>
        <Placeholder width={50} height={50} />
      </Layout>
      <Layout display={Display.InlineBlock} margin={{ right: 1 }}>
        <Placeholder width={50} height={50} />
      </Layout>
      <h4>As a child of a flex-parent with many placeholders</h4>
      <Layout display={Display.Flex} border>
        <Placeholder width={50} height={50} />
        <Placeholder width={50} height={50} />
        <Placeholder width={50} height={50} />
        <Placeholder width={50} height={50} />
        <Placeholder width={50} height={50} />
      </Layout>
      <h4>As a child of AspectRatio</h4>
      <Layout border style={{ width: "300px" }}>
        <Aspect ratio={AspectRatio.Aspect16x9}>
          <Placeholder />
        </Aspect>
      </Layout>
      <h4>Overlay</h4>
      <OverlayRegion>
        <Layout background={Background.Accent} padding={2}>
          <Placeholder overlay height={100} width={100} />
        </Layout>
      </OverlayRegion>
    </Typeset>
  </>
);
