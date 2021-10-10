import * as React from "react";

import { Badge, BadgeProps, BadgeType, SVGAsset } from "v2";
import {
  CombinationGenerator,
  CombinationMode,
} from "../components/combination-generator";

export default { title: Badge.displayName };

export const combinations = () => {
  const requireProps: BadgeProps = {
    icon: SVGAsset.Heart,
  };

  return (
    <CombinationGenerator
      mode={CombinationMode.Exhaustive}
      fields={[
        {
          propKey: "size",
          propValues: [16, 20, 24, 40, 80, 120],
        },
        {
          propKey: "icon",
          propValues: [
            SVGAsset.Heart,
            SVGAsset.Friends,
            SVGAsset.Experiment,
            SVGAsset.Smallroman2,
            SVGAsset.Xsmallcamera,
          ],
        },
      ]}
    >
      <Badge {...requireProps} type={BadgeType.Alt} />
      <Badge {...requireProps} type={BadgeType.Alt2} />
      <Badge {...requireProps} type={BadgeType.Brand} />
      <Badge {...requireProps} type={BadgeType.Dashboard} />
      <Badge {...requireProps} type={BadgeType.Prime} />
      <Badge {...requireProps} type={BadgeType.Success} />
      <Badge {...requireProps} type={BadgeType.Alert} />
      <Badge {...requireProps} type={BadgeType.Live} />
      <Badge {...requireProps} type={BadgeType.Notification} />
    </CombinationGenerator>
  );
};
