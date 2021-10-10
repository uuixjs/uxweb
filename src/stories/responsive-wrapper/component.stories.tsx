import * as React from "react";

import {
  Background,
  Color,
  Column,
  Grid,
  Layout,
  ResponsiveWrapper,
  ResponsiveWrapperProps,
} from "v2";

export default { title: "ResponsiveWrapper" };

export const examples = () => renderExamples();

const renderExamples = (props?: Partial<ResponsiveWrapperProps>) => (
  <>
    <ResponsiveWrapper {...props}>
      <Grid>
        <Column
          cols={{ default: 12, xs: 12, sm: 6, md: 4, lg: 3, xl: 2, xxl: 1 }}
        >
          <Layout
            padding={4}
            background={Background.Accent}
            color={Color.Overlay}
          >
            Please resize your viewport. You will see that the container width
            will snap to the breakpoint values, providing predictable max-widths
            at various screen sizes.
          </Layout>
        </Column>
      </Grid>
    </ResponsiveWrapper>
    <Layout margin={{ top: 2 }}></Layout>
    <ResponsiveWrapper centered>
      <Layout padding={4} background={Background.Accent} color={Color.Overlay}>
        This version shows a full-width layout, always centered.
      </Layout>
    </ResponsiveWrapper>
  </>
);
