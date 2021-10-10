/* eslint-disable twitch-core-ui/no-styled-layout */
import { FC } from "react";
import { InjectLayout, InjectLayoutProps } from "../inject-layout";

export interface InjectStyledLayoutProps extends InjectLayoutProps {}

/**
 * @deprecated Please switch to InjectLayout, or consider refactoring to use Layout instead. The Layout component now passes through props to the child element, and also accepts all props from StyledLayout.
 */
export const InjectStyledLayout: FC<InjectStyledLayoutProps> = (props) =>
  InjectLayout(props);

InjectStyledLayout.displayName = "InjectStyledLayout";
