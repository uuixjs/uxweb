import * as React from "react";

import {
  Background,
  Color,
  CoreText,
  FontSize,
  Input,
  InputType,
  Layout,
  TokenOverrideRegion,
  Typeset,
  withTokenOverrides,
} from "v2";

export default { title: TokenOverrideRegion.displayName };

const MyCustomInput = withTokenOverrides(Input, {
  tokenOverrides: {
    "font-size-6": "24px",
    "color-border-input": "orange",
  },
});

export const withTokenOverridesExample = () => (
  <>
    <Layout margin={{ bottom: 2 }}>
      <Typeset>
        <h3>Using withTokenOverrides HoC</h3>
        <p>
          "font-size-6": "24px",
          <br />
          "color-border-input": "orange"
          <br />
        </p>
      </Typeset>
      <MyCustomInput
        type={InputType.Text}
        value="twitch"
        placeholder="This uses withTokenOverrides HoC"
      />
    </Layout>
  </>
);
export const tokenOverrideRegion = () => (
  <>
    <TokenOverrideRegion
      tokenOverrides={{
        "color-text-base": "orange",
        "font-size-6": "24px",
      }}
    >
      <Typeset>
        <h3>Using TokenOverrideRegion</h3>
        <p>
          "color-text-base": "orange"
          <br />
          "font-size-6": "24px"
          <br />
        </p>
      </Typeset>
      <Input type={InputType.Text} value="twitch" />
      <CoreText color={Color.Base} fontSize={FontSize.Size6}>
        Base Text
      </CoreText>
    </TokenOverrideRegion>
  </>
);

const LayoutWithCustomColorTokens = withTokenOverrides(Layout, {
  tokenOverrides: {
    "color-background-accent": "blue",
    "color-text-alt": "orange",
  },
});

export const TokenOverridesWithNestedContent = () => (
  <>
    <Typeset>
      <h3>LayoutWithCustomColorTokens (withTokenOverrides)</h3>
      <p>"color-background-accent": "blue", "color-text-alt": "orange",</p>

      <LayoutWithCustomColorTokens>
        <Layout
          padding={1}
          margin={1}
          background={Background.Accent}
          color={Color.Alt}
        >
          1
        </Layout>
        <Layout
          padding={1}
          margin={1}
          background={Background.Accent}
          color={Color.Alt}
        >
          2
        </Layout>
        <Layout
          padding={1}
          margin={1}
          background={Background.Accent}
          color={Color.Alt}
        >
          3
        </Layout>
        <Layout
          padding={1}
          margin={1}
          background={Background.Accent}
          color={Color.Alt}
        >
          4
        </Layout>
      </LayoutWithCustomColorTokens>
    </Typeset>
  </>
);
