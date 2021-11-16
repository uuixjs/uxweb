import { Background, Display, Layout, Position } from "../../layout";
import { FC, ReactNode } from "react";
import { staticTokenRule, styled, themeTokenRule } from "@uuixjs/uuixweb-lib";

export interface NumberBadgeProps {
  /**
   * The value of the badge.
   *
   * @example 10
   */
  value: number;
  /**
   * Allows for the background behind the badge to specified.
   */
  mask?: Background;
  /**
   * Content passed in through this prop allow this component to be displayed
   * in the top right.
   */
  children?: ReactNode;
  /**
   * Allows for custom formatting of the value. For example, returning a
   * string "99+" if the value is greater than 99.
   */
  formatValue?: (n: number) => string | number;
}

const ScNumberBadgeMask = styled(Layout)`
  display: inline-flex;
  position: relative;
  background: inherit;
  padding: 0.2rem;
  pointer-events: none;

  border-radius: ${staticTokenRule("border-radius-rounded")};
`;

const ScNumberBadge = styled.div`
  position: relative;
  padding: 0 0.6rem;
  line-height: 1.6;
  font-size: ${staticTokenRule("font-size-7")};
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  background-color: ${themeTokenRule("color-background-pill-notification")};
  color: ${themeTokenRule("color-text-overlay")};
`;

const ScNumberBadgeWrapper = styled.div`
  position: absolute;
  transform: translateX(50%) translateY(-50%);
  top: 0.2rem;
  right: 0.2rem;
  pointer-events: none;
`;

/**
 * Badges are used to alert or notify the user of the status of items inside a
 * connected element, such as the number of unread notifications inside the
 * Notifications popover or unread messages inside the Whispers interface. In
 * some cases, they can also alert the user of actionable items inside.
 */
export const NumberBadge: FC<NumberBadgeProps> = ({
  children,
  formatValue,
  mask,
  value,
  ...props
}) => {
  const badge = (
    <ScNumberBadgeMask
      className="tw-number-badge"
      background={mask || Background.Base}
      {...props}
    >
      <ScNumberBadge className="tw-number-badge__badge">
        {formatValue ? formatValue(value) : value}
      </ScNumberBadge>
    </ScNumberBadgeMask>
  );

  if (children) {
    return (
      <Layout display={Display.InlineFlex} position={Position.Relative}>
        {children}
        <ScNumberBadgeWrapper className="tw-number-badge__container">
          {badge}
        </ScNumberBadgeWrapper>
      </Layout>
    );
  } else {
    return badge;
  }
};

NumberBadge.displayName = "NumberBadge";
