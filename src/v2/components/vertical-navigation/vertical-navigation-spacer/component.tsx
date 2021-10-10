import { FC } from "react";

export type VerticalNavigationSpacerProps = {
  /**
   * How many items of space this spacer occupies
   */
  items?: number;
};

export const navItemHeight = 4;

export const VerticalNavigationSpacer: FC<VerticalNavigationSpacerProps> = ({
  items = 1,
}) => <div style={{ height: `${items * navItemHeight}rem` }} />;

VerticalNavigationSpacer.defaultProps = {
  items: 1,
};
