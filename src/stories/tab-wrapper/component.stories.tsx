import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";

import { TabWrapper } from "v2";

export default { title: "TabWrapper" };

export const Examples = () => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "alignRight",
        propValues: [false, true],
      },
    ]}
  >
    <TabWrapper>Hello World</TabWrapper>
  </CombinationGenerator>
);
