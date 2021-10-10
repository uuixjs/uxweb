import { SVG, SVGAsset } from "../svg";
import {
  rem,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

import { FC } from "react";

export enum BadgeType {
  Default = "default",
  Notification = "notification",
  Alt = "alt",
  Alt2 = "alt-2",
  Brand = "brand",
  Live = "live",
  Alert = "alert",
  Success = "success",
  Prime = "prime",
  Dashboard = "dashboard",
}

export interface BadgeProps {
  /**
   * Sets a border around the badge that inherits the color of the
   * badges parent.
   */
  border?: boolean;
  /**
   * Icon within the badge.
   *
   * @example Roman1
   */
  icon: SVGAsset;
  /** Sets the fill color of the badge.  */
  type?:
    | BadgeType
    | "default"
    | "notification"
    | "alt"
    | "alt-2"
    | "brand"
    | "live"
    | "alert"
    | "success"
    | "prime"
    | "dashboard"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /**
   * Size of the badge.
   *
   * @example 40
   */
  size?: number;
}
interface ScBadgeProps {
  $type: BadgeProps["type"];
  $size: BadgeProps["size"];
}

const ScBadge = styled.div<ScBadgeProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${staticTokenRule("border-radius-rounded")};

  background-color: ${styleVariant("$type", {
    [BadgeType.Default]: themeTokenRule("color-background-pill"),
    [BadgeType.Alt]: themeTokenRule("color-fill-alt"),
    [BadgeType.Alt2]: themeTokenRule("color-fill-alt-2"),
    [BadgeType.Brand]: themeTokenRule("color-background-brand"),
    [BadgeType.Notification]: themeTokenRule(
      "color-background-pill-notification",
    ),
    [BadgeType.Live]: themeTokenRule("color-fill-live"),
    [BadgeType.Alert]: themeTokenRule("color-background-error"),
    [BadgeType.Success]: themeTokenRule("color-background-success"),
    [BadgeType.Prime]: themeTokenRule("color-fill-prime"),
    [BadgeType.Dashboard]: themeTokenRule("color-background-accent-alt"),
  })};

  color: ${styleVariant("$type", {
    [BadgeType.Default]: themeTokenRule("color-text-overlay"),
    [BadgeType.Alt]: themeTokenRule("color-text-badge-alt"),
    [BadgeType.Alt2]: themeTokenRule("color-text-badge-alt-2"),
    [BadgeType.Brand]: staticTokenRule("color-black"),
    [BadgeType.Notification]: themeTokenRule("color-text-overlay"),
    [BadgeType.Live]: themeTokenRule("color-text-overlay"),
    [BadgeType.Alert]: staticTokenRule("color-black"),
    [BadgeType.Success]: staticTokenRule("color-black"),
    [BadgeType.Prime]: themeTokenRule("color-text-overlay"),
    [BadgeType.Dashboard]: themeTokenRule("color-text-overlay"),
  })};

  ${({ $size }) => {
    return (
      $size && {
        width: rem($size),
        height: rem($size),
      }
    );
  }}
`;

const ScBadgeWrapper = styled.div`
  display: inline-flex;
  position: relative;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  padding: 0.2rem;
  background-color: inherit;
`;

const ScBadgeIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 60%;
`;

/**
 * Badges can accompany information to provide a more easily-recognizable cue
 * to information.
 */
export const Badge: FC<BadgeProps> = ({
  type = BadgeType.Default,
  size = 20,
  ...props
}) => {
  const badge = (
    <ScBadge className="tw-badge" {...props} $type={type} $size={size}>
      <ScBadgeIcon>
        <SVG asset={props.icon} fill />
      </ScBadgeIcon>
    </ScBadge>
  );

  if (props.border) {
    return <ScBadgeWrapper>{badge}</ScBadgeWrapper>;
  } else {
    return badge;
  }
};

Badge.displayName = "Badge";
