import * as React from "react";

import {
  Background,
  ButtonIconSize,
  Color,
  CoreDismissible,
  Layout,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

export default { title: "CoreDismissible" };

export const examples = () => (
  <>
    <Layout padding={2}>
      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "size",
            propValues: [
              ButtonIconSize.Small,
              ButtonIconSize.Default,
              ButtonIconSize.Large,
            ],
          },
        ]}
      >
        <CoreDismissible aria-label="Core Dismissible" />
      </CombinationGenerator>
    </Layout>
    <Layout background={Background.Accent} padding={2} color={Color.Overlay}>
      <CombinationGenerator
        mode={CombinationMode.Simple}
        fields={[
          {
            propKey: "size",
            propValues: [
              ButtonIconSize.Small,
              ButtonIconSize.Default,
              ButtonIconSize.Large,
            ],
          },
        ]}
      >
        <CoreDismissible aria-label="Core Dismissible" overlay />
      </CombinationGenerator>
    </Layout>
  </>
);
