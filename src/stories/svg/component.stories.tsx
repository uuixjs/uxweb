import * as React from "react";

import {
  AlignItems,
  Background,
  Column,
  CoreText,
  Display,
  FlexDirection,
  Grid,
  InjectLayout,
  JustifyContent,
  Layout,
  SVG,
  SVGAsset,
  SVGType,
  TextType,
  Tower,
  TowerChildWidth,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: SVG.displayName };

export const svgSizeWithinContainer = () => (
  <>
    This SVG should be centered horizontally and vertically and be half the size
    of the container:
    <InjectLayout
      background={Background.Alt2}
      border
      display={Display.Flex}
      alignItems={AlignItems.Center}
      justifyContent={JustifyContent.Center}
    >
      <div style={{ width: "200px", height: "200px" }}>
        <SVG asset={SVGAsset.LogoGlitch} width={100} height={100} />
      </div>
    </InjectLayout>
  </>
);

export const svgLayout = () => (
  <>
    <Layout margin={{ y: 2 }}>
      <Layout margin={{ y: 2 }}>
        <CoreText type={TextType.H4}>Default Size:</CoreText>
        <SVG type={SVGType.Brand} asset={SVGAsset.LogoGlitch} />
        <SVG type={SVGType.Brand} asset={SVGAsset.LogoTwitch} />
      </Layout>

      <Layout margin={{ y: 2 }}>
        <CoreText type={TextType.H4}>Custom Sizes:</CoreText>

        <Layout
          background={Background.Alt2}
          display={Display.InlineBlock}
          margin={1}
        >
          <SVG
            type={SVGType.Brand}
            asset={SVGAsset.LogoGlitch}
            width={10}
            height={10}
          />
        </Layout>
        <Layout
          background={Background.Alt2}
          display={Display.InlineBlock}
          margin={1}
        >
          <SVG
            type={SVGType.Brand}
            asset={SVGAsset.LogoGlitch}
            width={25}
            height={25}
          />
        </Layout>
        <Layout
          background={Background.Alt2}
          display={Display.InlineBlock}
          margin={1}
        >
          <SVG
            type={SVGType.Brand}
            asset={SVGAsset.LogoGlitch}
            width={80}
            height={80}
          />
        </Layout>
        <Layout
          background={Background.Alt2}
          display={Display.InlineBlock}
          margin={1}
        >
          <SVG
            type={SVGType.Brand}
            asset={SVGAsset.LogoGlitch}
            width={120}
            height={120}
          />
        </Layout>
        <Layout
          background={Background.Alt2}
          display={Display.InlineBlock}
          margin={1}
        >
          <SVG
            type={SVGType.Brand}
            asset={SVGAsset.LogoGlitch}
            width={50}
            height={100}
          />
        </Layout>
        <Layout
          background={Background.Alt2}
          display={Display.InlineBlock}
          margin={1}
        >
          <SVG
            type={SVGType.Brand}
            asset={SVGAsset.LogoGlitch}
            width={100}
            height={50}
          />
        </Layout>
      </Layout>

      <Layout margin={{ y: 2 }}>
        <CoreText type={TextType.H4}>
          Fill: The SVG paths below should fill the entire container and be
          centered horizontally + vertically:
        </CoreText>
        <Grid>
          <Column cols={6}>
            <Layout fullWidth fullHeight background={Background.Alt2}>
              <SVG type={SVGType.Brand} asset={SVGAsset.LogoGlitch} fill />
            </Layout>
          </Column>
          <Column cols={6}>
            <Layout fullWidth fullHeight background={Background.Alt2}>
              <SVG type={SVGType.Brand} asset={SVGAsset.LogoTwitch} fill />
            </Layout>
          </Column>
        </Grid>
      </Layout>
    </Layout>
  </>
);

export const svgIconList = () => (
  <Tower childWidth={TowerChildWidth.Small} placeholderItems={20}>
    {Object.keys(SVGAsset)
      .filter((svg) => svg.search(/^x?small|^display|logo$|glitch$/i) < 0)
      .map((icon, index) => {
        const asset: SVGAsset = SVGAsset[icon as keyof typeof SVGAsset];
        return (
          <Layout padding={0.5} key={`icon-${index}`}>
            <Layout
              background={Background.Alt}
              padding={1}
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
            >
              <Layout padding={{ y: 1 }}>
                <SVG asset={asset} width={20} height={20} />
              </Layout>
              <CoreText ellipsis>{icon}</CoreText>
            </Layout>
          </Layout>
        );
      })}
  </Tower>
);

export const svgSmallIconList = () => (
  <Tower childWidth={TowerChildWidth.Small} placeholderItems={20}>
    {Object.keys(SVGAsset)
      .filter((svg) => svg.search(/^x?small|^display/i) >= 0)
      .map((icon, index) => {
        const asset: SVGAsset = SVGAsset[icon as keyof typeof SVGAsset];
        return (
          <Layout padding={0.5} key={`icon-${index}`}>
            <Layout
              background={Background.Alt}
              padding={1}
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
            >
              <Layout padding={{ y: 1 }}>
                <SVG asset={asset} width={20} height={20} />
              </Layout>
              <CoreText ellipsis>{icon}</CoreText>
            </Layout>
          </Layout>
        );
      })}
  </Tower>
);

export const svgLogoList = () => (
  <Tower childWidth={TowerChildWidth.Small} placeholderItems={20}>
    {Object.keys(SVGAsset)
      .filter((svg) => svg.search(/logo|glitch/i) >= 0)
      .map((icon, index) => {
        const asset: SVGAsset = SVGAsset[icon as keyof typeof SVGAsset];
        return (
          <Layout padding={0.5} key={`icon-${index}`}>
            <Layout
              background={Background.Alt}
              padding={1}
              display={Display.Flex}
              flexDirection={FlexDirection.Column}
              alignItems={AlignItems.Center}
            >
              <Layout padding={{ y: 1 }}>
                <SVG asset={asset} width={20} height={20} />
              </Layout>
              <CoreText ellipsis>{icon}</CoreText>
            </Layout>
          </Layout>
        );
      })}
  </Tower>
);

export const svgType = () => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "type",
        propEnum: SVGType,
        propEnumName: "SVGType",
      },
    ]}
  >
    <SVG asset={SVGAsset.LogoGlitch} width={50} height={50} />
  </CombinationGenerator>
);
