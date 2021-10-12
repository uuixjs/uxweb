import * as React from "react";

import { Aspect, AspectRatio, Background, Layout } from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: Aspect.displayName };

export const usingNumericValues = () => (
  <div style={{ width: "200px" }}>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "ratio",
          propValues: [2 / 3, 16 / 9, 4 / 1, 30 / 1],
        },
      ]}
    >
      <Aspect>
        <Layout background={Background.Accent} />
      </Aspect>
    </CombinationGenerator>
  </div>
);

export const usingAspectRatioEnum = () => (
  <div style={{ width: "200px" }}>
    <CombinationGenerator
      mode={CombinationMode.Simple}
      fields={[
        {
          propKey: "ratio",
          propEnum: AspectRatio,
          propEnumName: "AspectRatio",
        },
      ]}
    >
      <Aspect>
        <Layout background={Background.Accent} />
      </Aspect>
    </CombinationGenerator>
  </div>
);
