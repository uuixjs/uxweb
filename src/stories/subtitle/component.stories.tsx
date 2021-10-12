import * as React from "react";

import {
  CoreText,
  InjectLayout,
  Layout,
  Subtitle,
  SubtitleSize,
} from "v2";

export default {
  title: Subtitle.displayName,
};

export const examples = () => (
  <Layout fullWidth>
    <Layout margin={{ bottom: 2 }}>
      <Subtitle size={SubtitleSize.Large}>Large</Subtitle>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Subtitle size={SubtitleSize.Default}>Default</Subtitle>
    </Layout>
    <Layout margin={{ bottom: 2 }}>
      <Subtitle size={SubtitleSize.Small}>Small</Subtitle>
    </Layout>
    <Layout margin={{ bottom: 4 }}>
      <Subtitle size={SubtitleSize.ExtraSmall}>Extra Small</Subtitle>
    </Layout>
  </Layout>
);

export const withEllipsis = () => (
  <InjectLayout border>
    <div style={{ maxWidth: 450 }}>
      <Subtitle ellipsis>
        A super long title that should be shortened by an ellipsis
      </Subtitle>
    </div>
  </InjectLayout>
);

export const responsiveBreakpoints = () => (
  <>
    <Subtitle
      size={SubtitleSize.ExtraSmall}
      breakpointExtraSmall={{ size: SubtitleSize.ExtraSmall }}
      breakpointSmall={{ size: SubtitleSize.Small }}
      breakpointMedium={{ size: SubtitleSize.Default }}
      breakpointLarge={{ size: SubtitleSize.Large }}
    >
      This is a page title.
    </Subtitle>
    <Layout margin={{ top: 1 }}>
      <CoreText>
        Resize the window! The text above will adjust as the viewport changes.
      </CoreText>
    </Layout>
  </>
);
