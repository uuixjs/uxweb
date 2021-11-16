import { staticTokenRule, styled, themeTokenRule } from "lib";

import { ReactNode } from "react";

export interface TabWrapperProps {
  alignRight?: boolean;
  /**
   * @example <Tab active>Games</Tab>
   *   <Tab>Communities</Tab>
   *   <Tab>Popular</Tab>
   *   <Tab>Creative</Tab>
   */
  children?: ReactNode;
}

/**
 * @deprecated Deprecated in favor of the new <Tabs> component which was introduced in 4.10.0.
 * Please migrate your usage of <TabWrapper> and <Tab> to the new <Tabs> component.
 * [See New Component](https://design.xarth.tv/user-interface/patterns/tabs)
 * [Release Notes](https://git.xarth.tv/core-ui/core-ui/releases/tag/v4.10.0)
 */
export const TabWrapper = styled.ul.attrs(() => ({
  role: "tablist",
  className: "tw-tab-wrapper",
}))<TabWrapperProps>`
  width: 100%;
  display: flex;
  justify-content: ${({ alignRight }) => (alignRight ? "flex-end" : undefined)};
  box-shadow: inset 0 calc(-1 * ${staticTokenRule("border-width-default")}) 0
    ${themeTokenRule("color-border-tab")};
`;

TabWrapper.displayName = "TabWrapper";
