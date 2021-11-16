import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import {
  ComboInput,
  ComboInputProps,
  CoreButtonType,
  InputSize,
  InputType,
  SVGAsset,
} from "v2";

export default { title: ComboInput.displayName };

export const examples = () => {
  const requiredProps: ComboInputProps = {
    type: InputType.Email,
    buttonProps: {
      children: "Copy",
    },
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "disabled",
          propValues: [false, true],
        },
        {
          propKey: "error",
          propValues: [false, true],
        },
        {
          propKey: "size",
          propEnum: InputSize,
          propEnumName: "InputSize",
        },
        {
          propKey: "buttonProps",
          propValues: [
            { type: CoreButtonType.Primary, children: "Copy" },
            {
              type: CoreButtonType.Primary,
              children: "Copy",
              icon: SVGAsset.Copy,
            },
            {
              type: CoreButtonType.Primary,
              children: "Copy",
              disabled: true,
            },
            { type: CoreButtonType.Secondary, children: "Copy" },
            { type: CoreButtonType.Secondary, icon: SVGAsset.Copy },
          ],
        },
      ]}
    >
      <ComboInput
        {...requiredProps}
        placeholder="Type Text"
        type={InputType.Text}
      />
    </CombinationGenerator>
  );
};
