import * as React from "react";

import { Background, Layout, OverlayRegion, Toggle } from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: Toggle.displayName };

export const examples = () => renderExamples();

export const withOverlay = () => (
  <OverlayRegion>
    <Layout background={Background.AccentAlt2}>{renderExamples()}</Layout>
  </OverlayRegion>
);

const renderExamples = () => {
  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "error",
          propValues: [false, true],
        },
      ]}
    >
      <Toggle />
      <Toggle label="Hidden Label for Toggle" />
      <Toggle aria-labelledby="aria-labelledby-id" />
      <Toggle checked />
      <Toggle disabled />
    </CombinationGenerator>
  );
};
