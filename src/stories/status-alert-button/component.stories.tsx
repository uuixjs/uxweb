import * as React from "react";

import {
  Button,
  CoreButtonSize,
  Layout,
  SVGAsset,
  StatusAlertButton,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: "StatusAlertButton" };

export const combinations = () => (
  <>
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
      ]}
    >
      <Button>Star</Button>
      <Button icon={SVGAsset.Star} statusAlertIcon={SVGAsset.StarHollow}>
        Star
      </Button>
      <Button
        icon={SVGAsset.Star}
        statusAlertIcon={SVGAsset.StarHollow}
        statusAlertText="Unstar"
      >
        Star
      </Button>
      <Button statusAlertText="Unstar">Star</Button>
    </CombinationGenerator>
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
          propEnum: CoreButtonSize,
          propEnumName: "CoreButtonSize",
        },
      ]}
    >
      <StatusAlertButton>Star</StatusAlertButton>
      <StatusAlertButton
        icon={SVGAsset.Star}
        statusAlertIcon={SVGAsset.StarHollow}
      />
      <StatusAlertButton
        icon={SVGAsset.Star}
        statusAlertIcon={SVGAsset.StarHollow}
      >
        Star
      </StatusAlertButton>
      <StatusAlertButton
        icon={SVGAsset.Star}
        statusAlertIcon={SVGAsset.StarHollow}
        statusAlertText="Unstar"
      >
        Star
      </StatusAlertButton>
      <StatusAlertButton statusAlertText="Unstar">Star</StatusAlertButton>
    </CombinationGenerator>
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
          propValues: [
            CoreButtonSize.Small,
            CoreButtonSize.Default,
            CoreButtonSize.Large,
          ],
        },
      ]}
    >
      <StatusAlertButton showAlert>Star</StatusAlertButton>
      <StatusAlertButton
        showAlert
        icon={SVGAsset.Star}
        statusAlertIcon={SVGAsset.StarHollow}
      >
        Star
      </StatusAlertButton>
      <StatusAlertButton
        showAlert
        icon={SVGAsset.Star}
        statusAlertIcon={SVGAsset.StarHollow}
        statusAlertText="Unstar"
      >
        Star
      </StatusAlertButton>
      <StatusAlertButton showAlert statusAlertText="Unstar">
        Star
      </StatusAlertButton>
    </CombinationGenerator>
    <Layout margin={{ bottom: 2 }}>
      <StatusAlertButton
        icon={SVGAsset.Check}
        statusAlertIcon={SVGAsset.Trash}
        statusAlertText="Remove"
      >
        Added
      </StatusAlertButton>
    </Layout>
    <Layout>
      <StatusAlertButton statusAlertText="Unfriend">Friend</StatusAlertButton>
    </Layout>
  </>
);
