import * as React from "react";

import {
  CoreText,
  InjectLayout,
  Layout,
  Title,
  TitleSize,
} from "v2";

export default {
  title: Title.displayName,
};

export const examples = () => (
  <Layout fullWidth>
    <Layout margin={{ bottom: 2 }}>
      <Title size={TitleSize.ExtraLarge}>Extra Large</Title>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Title size={TitleSize.Large}>Large</Title>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Title size={TitleSize.Default}>Default</Title>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Title size={TitleSize.Small}>Small</Title>
    </Layout>
    <Layout margin={{ bottom: 4 }}>
      <Title size={TitleSize.ExtraSmall}>Extra Small</Title>
    </Layout>
  </Layout>
);

export const withEllipsis = () => (
  <InjectLayout border>
    <div style={{ maxWidth: 450 }}>
      <Title ellipsis>
        A super long title that should be shortened by an ellipsis
      </Title>
    </div>
  </InjectLayout>
);

export const responsiveBreakpoints = () => (
  <>
    <Title
      size={TitleSize.ExtraSmall}
      breakpointExtraSmall={{ size: TitleSize.ExtraSmall }}
      breakpointSmall={{ size: TitleSize.Small }}
      breakpointMedium={{ size: TitleSize.Default }}
      breakpointLarge={{ size: TitleSize.Large }}
      breakpointExtraLarge={{ size: TitleSize.ExtraLarge }}
    >
      This is a page title.
    </Title>
    <Layout margin={{ top: 1 }}>
      <CoreText>
        Resize the window! The text above will adjust as the viewport changes.
      </CoreText>
    </Layout>
  </>
);
