import { styled, themeTokenRule } from "lib/ui-utils";

import { FC } from "react";
import { Layout } from "../../../layout/layout";
import { withOverlayContext } from "../../../overlay-region/context";

export interface DropDownMenuSeparatorProps {
  overlay?: boolean;
}

const ScDropDownMenuSeparator = styled(Layout)<{
  $overlay?: DropDownMenuSeparatorProps["overlay"];
}>`
  border-top: 1px solid
    ${({ $overlay }) =>
      $overlay
        ? themeTokenRule("color-border-overlay")
        : themeTokenRule("color-border-base")};
`;

export const DropDownMenuSeparatorComponent: FC<DropDownMenuSeparatorProps> = ({
  overlay,
  ...props
}) => {
  return (
    <ScDropDownMenuSeparator
      margin={{ top: 1, x: 0.5 }}
      padding={{ bottom: 1 }}
      $overlay={overlay}
      {...props}
    />
  );
};

DropDownMenuSeparatorComponent.displayName = "DropDownMenuSeparatorComponent";

export const DropDownMenuSeparator = withOverlayContext(
  DropDownMenuSeparatorComponent,
);
