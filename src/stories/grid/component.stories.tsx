import * as React from "react";

import {
  AlignItems,
  AlignSelf,
  Background,
  Color,
  Column,
  CoreText,
  Display,
  FontSize,
  Grid,
  GridGutterSize,
  JustifyContent,
  Layout,
} from "v2";

export default { title: "Grid / Grid" };
export const basic = () => (
  <Grid>
    <Column cols={4}>
      <Layout background={Background.Accent} padding={2} />
    </Column>
    <Column cols={8}>
      <Layout background={Background.Accent} padding={2} />
    </Column>
  </Grid>
);

export const nested = () => (
  <Grid>
    <Column cols={3}>
      <Layout
        background={Background.Accent}
        padding={2}
        margin={{ bottom: 1 }}
      />
      <Grid>
        <Column cols={6}>
          <Layout background={Background.Accent} padding={2} />
        </Column>
        <Column cols={6}>
          <Layout background={Background.Accent} padding={2} />
        </Column>
      </Grid>
    </Column>
    <Column cols={9}>
      <Layout
        background={Background.Accent}
        padding={2}
        margin={{ bottom: 1 }}
      />
      <Grid>
        <Column cols={6}>
          <Layout background={Background.Accent} padding={2} />
        </Column>
        <Column cols={6}>
          <Layout background={Background.Accent} padding={2} />
        </Column>
      </Grid>
    </Column>
  </Grid>
);

export const responsive = () => (
  <Grid>
    <Column cols={{ default: 12, sm: 6, md: 4, lg: 2 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>A</CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12, sm: 6, md: 4, lg: 2 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>B</CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12, sm: 6, md: 4, lg: 2 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>C</CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12, sm: 6, md: 4, lg: 2 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>D</CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12, sm: 6, md: 4, lg: 2 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>E</CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12, sm: 6, md: 4, lg: 2 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>F</CoreText>
      </Layout>
    </Column>
  </Grid>
);

export const responsiveVariable = () => (
  <Grid>
    <Column cols={{ default: 12, xs: 6, md: 4 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>A</CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12, xs: 6, md: 8 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>B</CoreText>
      </Layout>
    </Column>
    <Column
      cols={{ default: 12, xs: 12, md: 8 }}
      offset={{ default: 0, xs: 0, md: 4 }}
    >
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </CoreText>
      </Layout>
    </Column>
    <Column cols={{ default: 12 }}>
      <Layout
        background={Background.Accent}
        color={Color.Overlay}
        padding={2}
        margin={{ bottom: 1 }}
        display={Display.Flex}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
      >
        <CoreText fontSize={FontSize.Size2}>D</CoreText>
      </Layout>
    </Column>
  </Grid>
);

export const verticallyCentered = () => (
  <Grid>
    <Column cols={6}>
      <Layout
        background={Background.AccentAlt2}
        color={Color.Overlay}
        padding={2}
      >
        <CoreText bold>This is very tall content:</CoreText>
        <br />
        <CoreText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CoreText>
      </Layout>
    </Column>

    <Column cols={6}>
      <Layout
        display={Display.Flex}
        fullHeight
        fullWidth
        background={Background.AccentAlt}
        color={Color.Overlay}
        padding={2}
      >
        <Layout alignSelf={AlignSelf.Center}>
          <CoreText bold>This is short content:</CoreText>
          <br />
          <CoreText>It is also vertically centered.</CoreText>
        </Layout>
      </Layout>
    </Column>
  </Grid>
);

const ThreeColsLayout = (
  <>
    <Column cols={4}>
      <Layout background={Background.Accent} padding={2} />
    </Column>
    <Column cols={4}>
      <Layout background={Background.Accent} padding={2} />
    </Column>
    <Column cols={4}>
      <Layout background={Background.Accent} padding={2} />
    </Column>
  </>
);
export const gutters = () => (
  <>
    <h4>{GridGutterSize.None}</h4>
    <Grid gutterSize={GridGutterSize.None}>{ThreeColsLayout}</Grid>
    <h4>{GridGutterSize.Small}</h4>
    <Grid gutterSize={GridGutterSize.Small}>{ThreeColsLayout}</Grid>
    <h4>{GridGutterSize.Default} - Default</h4>
    <Grid gutterSize={GridGutterSize.Default}>{ThreeColsLayout}</Grid>
    <h4>{GridGutterSize.Medium}</h4>
    <Grid gutterSize={GridGutterSize.Medium}>{ThreeColsLayout}</Grid>
    <h4>{GridGutterSize.Large}</h4>
    <Grid gutterSize={GridGutterSize.Large}>{ThreeColsLayout}</Grid>
  </>
);
