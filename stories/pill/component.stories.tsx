import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import { FontSize, Layout, Pill, PillType } from "v2";

import { ExampleSection } from "../components/example-section";
import { OverlayPreview } from "../components/overlay-preview";

export default { title: Pill.displayName };

export const examples = () => (
  <Layout margin={{ bottom: 2 }}>
    <ExampleSection label="Default Props" description="(no 'type' set)">
      <Pill label="Hello World" />
    </ExampleSection>

    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "type",
          propEnum: PillType,
          propEnumName: "PillType",
        },
      ]}
    >
      <Pill label="Hello World" />
    </CombinationGenerator>
  </Layout>
);

export const overlay = () => <OverlayPreview>{examples()}</OverlayPreview>;

export const InheritFontSizeFromParent = () => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "fontSize",
        propEnum: FontSize,
        propEnumName: "FontSize",
      },
    ]}
  >
    <Layout>
      <Pill label="Hello World" />
    </Layout>
  </CombinationGenerator>
);
