import * as React from "react";

import {
  AlignItems,
  Background,
  Color,
  Column,
  ColumnOrder,
  Columns,
  CoreText,
  Display,
  FontSize,
  Grid,
  JustifyContent,
  Layout,
  LayoutProps,
  OffsetColumns,
  Title,
} from "v2";

export default { title: "Grid / Column" };

export const Cols = () => (
  <>
    <Title>All col values</Title>

    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
      <Layout border key={i}>
        <Grid>
          <Column cols={i as Columns}>
            <PurpleBox children={`cols ${i}`} />
          </Column>
        </Grid>
      </Layout>
    ))}
  </>
);

export const ResponsiveCols = () => (
  <>
    <Layout border>
      <Grid>
        <Column
          cols={{ default: 12, xs: 11, sm: 10, md: 9, lg: 8, xl: 7, xxl: 6 }}
        >
          <PurpleBox>This column gets wider at smaller viewports</PurpleBox>
        </Column>
      </Grid>
    </Layout>
  </>
);

export const Offsets = () => (
  <>
    <Title>All offset values</Title>

    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
      <Layout border key={i}>
        <Grid>
          <Column cols={3} offset={i as OffsetColumns}>
            <PurpleBox children={`offset ${i}`} />
          </Column>
        </Grid>
      </Layout>
    ))}

    <Title>Multiple columns w/ offset 1</Title>
    <Layout border>
      <Grid>
        {Array.from({ length: 12 }, (_, i) => (
          <Column cols={1} offset={1}>
            <PurpleBox children={i + 1} />
          </Column>
        ))}
      </Grid>
    </Layout>

    <Title>Cols + Offset</Title>
    <Layout border>
      <Grid>
        <Column cols={2}>
          <PurpleBox children={`cols: 2`} />
        </Column>
        <Column cols={2} offset={8}>
          <PurpleBox children={`cols: 2 and offset: 8`} />
        </Column>
      </Grid>
    </Layout>
    <Layout border>
      <Grid>
        <Column cols={2}>
          <PurpleBox children={`cols: 2`} />
        </Column>
        <Column cols={3} offset={8}>
          <PurpleBox children={`cols: 3 and offset: 8`} />
        </Column>
      </Grid>
    </Layout>
  </>
);

export const ResponsiveOffsets = () => (
  <Layout border>
    <Grid>
      <Column cols={{ default: 8, lg: 6 }} offset={{ default: 4, lg: 0 }}>
        <Layout
          background={Background.Accent}
          color={Color.Overlay}
          padding={2}
        >
          This column has a default offset of 4, but at a large breakpoint that
          offset is 0.
        </Layout>
      </Column>
    </Grid>
  </Layout>
);

export const ordering = () => (
  <Grid>
    <Column cols={4}>
      <PurpleBox>A</PurpleBox>
    </Column>
    <Column cols={4} order={ColumnOrder.Last}>
      <PurpleBox>B</PurpleBox>
    </Column>
    <Column cols={4} order={ColumnOrder.First}>
      <PurpleBox>C</PurpleBox>
    </Column>
  </Grid>
);

export const responsiveOrdering = () => (
  <Grid>
    <Column cols={{ default: 12, md: 6 }}>
      <PurpleBox margin={{ bottom: 1 }}>A</PurpleBox>
    </Column>
    <Column cols={{ default: 12, md: 6 }} order={{ md: ColumnOrder.First }}>
      <PurpleBox margin={{ bottom: 1 }}>B</PurpleBox>
    </Column>
    <Column cols={12}>
      <PurpleBox margin={{ bottom: 1 }}>C</PurpleBox>
    </Column>
  </Grid>
);

const PurpleBox = ({ children, ...props }: LayoutProps) => (
  <Layout fullWidth fullHeight {...props}>
    <Layout
      background={Background.Accent}
      color={Color.Overlay}
      padding={2}
      display={Display.Flex}
      justifyContent={JustifyContent.Center}
      alignItems={AlignItems.Center}
    >
      <CoreText
        fontSize={
          (typeof children === "string" && children.length === 1) ||
          typeof children === "number"
            ? FontSize.Size2
            : FontSize.Size5
        }
      >
        {children}
      </CoreText>
    </Layout>
  </Layout>
);
