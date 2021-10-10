import * as React from "react";

import {
  Background,
  Color,
  CoreButtonDropdownType,
  CoreButtonSize,
  CoreButtonType,
  CoreText,
  Layout,
  SVGAsset,
  SplitButton,
  SplitButtonProps,
  TextType,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: SplitButton.displayName };

export const examples = () => renderExamples();

export const withOverlay = () => (
  <Layout padding={2} background={Background.AccentAlt} color={Color.Overlay}>
    <CoreText type={TextType.H2} color={Color.Inherit}>
      Button Overlay Examples
    </CoreText>
    {renderExamples({ overlay: true })}
  </Layout>
);

export const withCustomizedArrow = () => (
  <>
    <Layout margin={1}>
      <SplitButton dropdown={{ type: CoreButtonDropdownType.ArrowUp }}>
        This arrow points up
      </SplitButton>
    </Layout>
    <Layout margin={1}>
      <SplitButton dropdown={{ type: CoreButtonDropdownType.ArrowDown }}>
        This arrow points down
      </SplitButton>
    </Layout>
  </>
);

const renderExamples = (additionalProps: Partial<SplitButtonProps> = {}) => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "fullWidth",
        propValues: [false, true],
      },
      {
        propKey: "disabled",
        propValues: [false, true],
      },
      {
        propKey: "dropdown",
        propValues: [
          {
            disabled: false,
          },
          {
            disabled: true,
          },
        ],
      },
      {
        propKey: "icon",
        propValues: [undefined, SVGAsset.NavGames],
      },
      {
        propKey: "type",
        propEnum: CoreButtonType,
        propEnumName: "CoreButtonType",
      },
      {
        propKey: "size",
        propEnum: CoreButtonSize,
        propEnumName: "CoreButtonSize",
      },
    ]}
  >
    <SplitButton dropdown={{}} {...additionalProps}>
      Hello World
    </SplitButton>
  </CombinationGenerator>
);
