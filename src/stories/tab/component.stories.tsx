import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import { Tab, TabWrapper } from "v2";

export default { title: "Tab" };

export const Examples = () => (
  <CombinationGenerator
    mode={CombinationMode.Simple}
    fields={[
      {
        propKey: "active",
        propValues: [false, true],
      },
      {
        propKey: "disabled",
        propValues: [false, true],
      },
    ]}
  >
    <Tab>Hello World</Tab>
  </CombinationGenerator>
);

export const ComposedExample = () => (
  <>
    <TabWrapper>
      <Tab active>Tab One</Tab>
      <Tab>Tab Two</Tab>
      <Tab>Tab Three</Tab>
    </TabWrapper>
    <br />
    <TabWrapper alignRight>
      <Tab active>Tab One</Tab>
      <Tab>Tab Two</Tab>
      <Tab>Tab Three</Tab>
    </TabWrapper>
  </>
);
