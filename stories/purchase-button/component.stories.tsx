import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";
import { CoreButtonSize, PurchaseButton, SVGAsset } from "v2";

export default { title: "PurchaseButton" };

export const combinations = () => (
  <CombinationGenerator
    mode={CombinationMode.Exhaustive}
    fields={[
      {
        propKey: "icon",
        propValues: [undefined, SVGAsset.Star],
      },
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
    <PurchaseButton price="$1.00">Subscribe</PurchaseButton>
    <PurchaseButton price="$100.00">Subscribe</PurchaseButton>
    <PurchaseButton price="¥10000">こんにちは！</PurchaseButton>
  </CombinationGenerator>
);
