import * as React from "react";

import {
  Background,
  Layout,
  OverlayRegion,
  Tag,
  TagAction,
  TagProps,
} from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: Tag.displayName };

export const withOverlay = () => (
  <OverlayRegion>
    <Layout background={Background.Overlay}>{renderExamples()}</Layout>
  </OverlayRegion>
);

export const renderExamples = () => {
  const requireProps: TagProps = {
    label: "Tag label",
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "action",
          propValues: [undefined, TagAction.Add, TagAction.Remove],
        },
        {
          propKey: "disabled",
          propValues: [false, true],
        },
        {
          propKey: "linkTo",
          propValues: [undefined, "#"],
        },
      ]}
    >
      <Tag {...requireProps} />
    </CombinationGenerator>
  );
};
