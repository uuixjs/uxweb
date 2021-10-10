import { CommonLayoutProps, propMap } from "../utils/layout-props";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { StyledComponent, styled } from "lib";

import { getLayoutStyles } from "../utils/common";

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface LayoutProps
  extends CommonLayoutProps,
    // Omit DivProps props which are already defined as part of CommonLayoutProps
    Omit<DivProps, "color" | "role" | "ref"> {}

export const Layout = styled.div.withConfig({
  shouldForwardProp: (propName, defaultValidatorFn) => {
    if (propName in propMap) {
      return false;
    }

    return defaultValidatorFn(propName);
  },
})<LayoutProps>((props) => getLayoutStyles(props, propMap)) as StyledComponent<
  "div",
  never, // Prevent the "theme" prop from accepting any value
  LayoutProps,
  never
>;

Layout.displayName = "Layout";
