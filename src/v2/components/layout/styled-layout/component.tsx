import { Layout, LayoutProps } from "../layout";

import { FC } from "react";

export interface StyledLayoutProps extends LayoutProps {}

/**
 * @deprecated Please use Layout instead; the Layout component now accepts all props from StyledLayout.
 */
export const StyledLayout: FC<StyledLayoutProps> = (props) => Layout(props);

StyledLayout.displayName = "StyledLayout";
