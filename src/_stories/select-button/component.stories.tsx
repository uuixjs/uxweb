import * as React from "react";

import {
  Background,
  Color,
  CoreButtonSize,
  CoreText,
  Layout,
  SVGAsset,
  SelectButton,
  SelectButtonProps,
  TextType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: SelectButton.displayName };

export const examples = () => renderExamples();

export const withOverlay = () => (
  <Layout padding={2} background={Background.AccentAlt} color={Color.Overlay}>
    <CoreText type={TextType.H2} color={Color.Inherit}>
      Button Overlay Examples
    </CoreText>
    {renderExamples({ overlay: true })}
  </Layout>
);

const renderExamples = (additionalProps: Partial<SelectButtonProps> = {}) => (
  <CombinationGenerator
    mode={CombinationMode.Exhaustive}
    fields={[
      {
        propKey: "icon",
        propValues: [undefined, SVGAsset.Gear],
      },
      {
        propKey: "fullWidth",
        propValues: [false, true],
      },
      {
        propKey: "disabled",
        propValues: [false, true],
      },
      {
        propKey: "error",
        propValues: [undefined, true],
      },
      {
        propKey: "size",
        propValues: [
          CoreButtonSize.Small,
          CoreButtonSize.Default,
          CoreButtonSize.Large,
        ],
      },
    ]}
  >
    <SelectButton {...additionalProps}>Hello World</SelectButton>
  </CombinationGenerator>
);
