/* eslint-disable twitch-core-ui/no-styled-layout */
import { FC } from "react";
import { Layout, LayoutProps } from "../layout";

export interface StyledLayoutProps extends LayoutProps {}

/**
 * @deprecated Please use Layout instead; the Layout component now accepts all props from StyledLayout.
 */
export const StyledLayout: FC<StyledLayoutProps> = (props) => Layout(props);

StyledLayout.displayName = "StyledLayout";
