import { staticTokenRule, styleVariant, styled } from "lib";

import { FC } from "react";
import { Icon } from "../icon";
import { SVGAsset } from "../svg";

export enum ExpandableIndicatorDirection {
  Up = "up",
  Right = "right",
  Down = "down",
  Left = "left",
}

export interface ExpandableIndicatorProps {
  open?: boolean;
  openDirection?:
    | ExpandableIndicatorDirection
    | "up"
    | "right"
    | "down"
    | "left"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  closedDirection?:
    | ExpandableIndicatorDirection
    | "up"
    | "right"
    | "down"
    | "left"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

export const ScExpandableIndicator = styled.div<{
  direction: ExpandableIndicatorDirection;
}>`
  display: inline-flex;
  align-items: center;
  transition: ${staticTokenRule("timing-short")} transform ease;
  transform: ${styleVariant("direction", {
    [ExpandableIndicatorDirection.Up]: "rotate(-90deg)",
    [ExpandableIndicatorDirection.Right]: "rotate(0deg)",
    [ExpandableIndicatorDirection.Down]: "rotate(90deg)",
    [ExpandableIndicatorDirection.Left]: "rotate(-180deg)",
  })};
`;
export const ExpandableIndicator: FC<ExpandableIndicatorProps> = ({
  open,
  openDirection = ExpandableIndicatorDirection.Down,
  closedDirection = ExpandableIndicatorDirection.Right,
  ...props
}) => {
  const closed = !open;
  const getDirection = () => {
    if (
      (open && openDirection === ExpandableIndicatorDirection.Up) ||
      (closed && closedDirection === ExpandableIndicatorDirection.Up)
    ) {
      return ExpandableIndicatorDirection.Up;
    } else if (
      (open && openDirection === ExpandableIndicatorDirection.Right) ||
      (closed && closedDirection === ExpandableIndicatorDirection.Right)
    ) {
      return ExpandableIndicatorDirection.Right;
    } else if (
      (open && openDirection === ExpandableIndicatorDirection.Down) ||
      (closed && closedDirection === ExpandableIndicatorDirection.Down)
    ) {
      return ExpandableIndicatorDirection.Down;
    } else {
      return ExpandableIndicatorDirection.Left;
    }
  };

  return (
    <ScExpandableIndicator
      direction={getDirection()}
      className="expandable-indicator__wrapper"
      {...props}
    >
      <Icon asset={SVGAsset.AngleRight} />
    </ScExpandableIndicator>
  );
};

ExpandableIndicator.displayName = "ExpandableIndicator";
