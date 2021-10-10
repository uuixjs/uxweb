import * as React from "react";

import {
  Background,
  ButtonIcon,
  ButtonIconProps,
  ButtonIconSize,
  ButtonIconType,
  Color,
  Layout,
  SVGAsset,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: ButtonIcon.displayName };

export const combinations = () => renderExamples();

export const withOverlay = () => (
  <Layout padding={2} background={Background.AccentAlt} color={Color.Overlay}>
    {renderExamples({
      "aria-label": "aria label",
      overlay: true,
      icon: SVGAsset.NavGames,
    })}
  </Layout>
);

const renderExamples = (
  additionalProps: ButtonIconProps = {
    "aria-label": "aria label",
    icon: SVGAsset.NavGames,
  },
) => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "disabled",
        propValues: [false, true],
      },
      {
        propKey: "size",
        propEnum: ButtonIconSize,
        propEnumName: "ButtonIconSize",
      },
      {
        propKey: "icon",
        propValues: [SVGAsset.NavGames],
      },
      {
        propKey: "statusAlertIcon",
        propValues: [SVGAsset.Heart],
      },
      {
        propKey: "dropdown",
        propValues: [false, true],
      },
    ]}
  >
    <ButtonIcon {...additionalProps} />
    <ButtonIcon {...additionalProps} variant={ButtonIconType.Success} />
    <ButtonIcon {...additionalProps} variant={ButtonIconType.Alert} />
    <ButtonIcon {...additionalProps} variant={ButtonIconType.Primary} />
    <ButtonIcon {...additionalProps} variant={ButtonIconType.Secondary} />
  </CombinationGenerator>
);
