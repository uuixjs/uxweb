import * as React from "react";

import {
  Background,
  Button,
  ButtonProps,
  ButtonSize,
  ButtonType,
  Color,
  Layout,
  SVGAsset,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: "Button" };

export const combinations = () => renderExamples();

export const withOverlay = () => (
  <Layout padding={2} background={Background.Overlay} color={Color.Overlay}>
    {renderExamples({ overlay: true })}
  </Layout>
);

const renderExamples = (additionalProps: ButtonProps = { linkTo: "#" }) => (
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
        propKey: "size",
        propEnum: ButtonSize,
        propEnumName: "ButtonSize",
      },
      {
        propKey: "dropdown",
        propValues: [false, true],
      },
      {
        propKey: "purchase",
        propValues: [undefined, "$4.99"],
      },
      {
        propKey: "icon",
        propValues: [undefined, SVGAsset.NavGames],
      },
      {
        propKey: "statusAlertText",
        propValues: [undefined, "Alert"],
      },
    ]}
  >
    <Button {...additionalProps} variant={ButtonType.Primary}>
      Default
    </Button>
    <Button {...additionalProps} variant={ButtonType.Secondary}>
      Secondary
    </Button>
    <Button {...additionalProps} variant={ButtonType.Text}>
      Text
    </Button>
    <Button {...additionalProps} variant={ButtonType.Success}>
      Success
    </Button>
    <Button {...additionalProps} variant={ButtonType.Alert}>
      Alert
    </Button>
    <Button
      {...additionalProps}
      statusAlertIcon={SVGAsset.Unheart}
      icon={SVGAsset.Heart}
    >
      StatusAlert
    </Button>
  </CombinationGenerator>
);
