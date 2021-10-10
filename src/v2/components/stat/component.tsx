import {
  AttachedTooltip,
  TooltipAlign,
  TooltipDirection,
} from "../dialogs/tooltip/attached-tooltip";

import { FC } from "react";
import { Icon } from "../icon";
import { Layout } from "../layout";
import { SVGAsset } from "../svg";
import { styled } from "lib/ui-utils";

export interface StatProps {
  /**
   * @example Viewers
   */
  label: string;
  /**
   * @example 3,000
   */
  value: string;
  /**
   * @example GlyphViews
   */
  icon: SVGAsset;
  tooltipDirection?: TooltipDirection;
  tooltipAlign?: TooltipAlign;
}

const ScStat = styled.div`
  display: inline-flex;
  align-items: center;
  line-height: 1;
`;

const ScStatIcon = styled.div`
  display: inline-flex;
  align-items: center;
  width: calc(1em + 2px);
  height: calc(1em + 2px);
`;

export const Stat: FC<StatProps> = ({
  label,
  value,
  icon,
  tooltipDirection,
  tooltipAlign,
  ...props
}) => {
  let iconEl;

  if (icon) {
    iconEl = <Icon fill asset={icon} />;
  }

  const stat = (
    <ScStat className="tw-stat" {...props}>
      <ScStatIcon className="tw-stat__icon">{iconEl}</ScStatIcon>
      <Layout
        margin={{ left: 0.5 }}
        className="tw-stat__value"
        data-a-target="tw-stat-value"
      >
        {value}
      </Layout>
    </ScStat>
  );

  if (!label) {
    return stat;
  } else {
    return (
      <AttachedTooltip
        direction={
          tooltipDirection ? tooltipDirection : TooltipDirection.Bottom
        }
        align={tooltipAlign ? tooltipAlign : TooltipAlign.Center}
        label={label}
      >
        {stat}
      </AttachedTooltip>
    );
  }
};

Stat.displayName = "Stat";
