import * as React from "react";

import {
  Background,
  Color,
  Column,
  CoreText,
  Grid,
  Icon,
  Layout,
  SVG,
  SVGAsset,
  TextType,
} from "v2";

import { Component } from "react";

export default { title: Icon.displayName };

export const examples = () => <IconPage />;

class IconPage extends Component {
  public render() {
    const icons = (
      <>
        <Icon asset={SVGAsset.Heart} />
        <Icon asset={SVGAsset.GlyphLive} />
        <Icon asset={SVGAsset.NavGames} />
        <Grid>
          <Column cols={6}>
            <CoreText type={TextType.H5}>Icon using Aspect Fill</CoreText>
            <Layout background={Background.Alt2}>
              <Icon asset={SVGAsset.Unheart} fill />
            </Layout>
          </Column>
          <Column cols={6}>
            <CoreText type={TextType.H5}>
              SVG using SVG width/height=100%
            </CoreText>
            <Layout background={Background.Alt2}>
              <SVG asset={SVGAsset.Heart} fill />
            </Layout>
          </Column>
        </Grid>
      </>
    );

    return (
      <Layout margin={{ bottom: 2 }}>
        <Layout
          padding={3}
          margin={{ y: 2 }}
          background={Background.Alt}
          border
        >
          <CoreText>With no color set:</CoreText>
          {icons}
        </Layout>

        <Layout
          padding={3}
          margin={{ y: 2 }}
          background={Background.Alt}
          color={Color.Link}
          border
        >
          <CoreText>With link color set:</CoreText>
          {icons}
        </Layout>
      </Layout>
    );
  }
}
