import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import {
  CoreText,
  FontSize,
  Layout,
  SVGAsset,
  Stat,
  StatProps,
  TextType,
} from "v2";

import { Component } from "react";

export default { title: Stat.displayName };

export const examples = () => <StatPage />;

class StatPage extends Component {
  public render() {
    return (
      <Layout margin={{ bottom: 2 }}>
        <CoreText type={TextType.H2}>Stat Examples</CoreText>

        <Layout fontSize={undefined}>{this.renderExamples()}</Layout>

        <Layout fontSize={FontSize.Size4}>{this.renderExamples()}</Layout>

        <Layout fontSize={FontSize.Size2}>{this.renderExamples()}</Layout>
      </Layout>
    );
  }

  private renderExamples = () => {
    const requireProps: StatProps = {
      icon: SVGAsset.Heart,
      label: "Followers",
      value: "3,245",
    };

    return (
      <CombinationGenerator
        mode={CombinationMode.Exhaustive}
        fields={[
          {
            propKey: "label",
            propValues: ["Views", "The best stat label ever"],
          },
          {
            propKey: "icon",
            propValues: [
              SVGAsset.Heart,
              SVGAsset.GlyphLive,
              SVGAsset.GlyphViews,
            ],
          },
        ]}
      >
        <Stat {...requireProps} value="0" />
        <Stat {...requireProps} value="234" />
        <Stat {...requireProps} value="8,534,346" />
      </CombinationGenerator>
    );
  };
}
