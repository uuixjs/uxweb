import * as React from "react";

import { ModalFooter, ModalSize } from "v2";

import { CombinationGenerator } from "../../components/combination-generator";

export default { title: "Modal / ModalFooter" };

export const withOneButton = () => (
  <CombinationGenerator
    mode="simple"
    fields={[
      {
        propKey: "size",
        propEnum: ModalSize,
        propEnumName: "ModalSize",
      },
    ]}
  >
    <ModalFooter
      primaryButtonProps={{
        children: "Close",
      }}
    />
  </CombinationGenerator>
);

export const withTwoButtons = () => (
  <CombinationGenerator
    mode="simple"
    fields={[
      {
        propKey: "size",
        propEnum: ModalSize,
        propEnumName: "ModalSize",
      },
    ]}
  >
    <ModalFooter
      primaryButtonProps={{
        children: "Save",
      }}
      secondaryButtonProps={{
        children: "Cancel",
      }}
    />
  </CombinationGenerator>
);
