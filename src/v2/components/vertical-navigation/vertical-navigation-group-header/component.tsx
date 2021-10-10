import { FC } from "react";
import { CoreInteractivePublicProps } from "../../core-interactive";
import {
  ExpandableIndicator,
  ExpandableIndicatorDirection,
} from "../../expandable-indicator";
import { SVGAsset } from "../../svg";
import { VerticalNavigationItemBase } from "../vertical-navigation-item-base";

interface VerticalNavigationGroupHeaderProps {
  /**
   * A title for this group.
   *
   * @example Buttons
   */
  children: string;
  /**
   * An left icon SVGAsset for this item.
   */
  iconAsset?: SVGAsset;
  /**
   * Is the `ExpandableIndicator` in an open state?
   */
  open?: boolean;
  selected?: boolean;
}

export type Props = VerticalNavigationGroupHeaderProps &
  CoreInteractivePublicProps;

export const VerticalNavigationGroupHeader: FC<Props> = (props) => {
  return (
    <VerticalNavigationItemBase
      rightElement={
        <ExpandableIndicator
          openDirection={ExpandableIndicatorDirection.Up}
          closedDirection={ExpandableIndicatorDirection.Down}
          open={props.open}
        />
      }
      {...props}
    />
  );
};
