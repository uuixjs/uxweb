import { Avatar, AvatarProps } from "../../../avatar";
import { styleVariant, styled, themeTokenRule } from "lib/ui-utils";

import { FC } from "react";
import { Icon } from "../../../icon";
import { NotificationType } from "../../notification";
import { SVGAsset } from "../../../svg";

export interface NotificationFigureProps {
  /** Optional avatar to replace the default SVG icon. */
  avatar?: Pick<AvatarProps, Exclude<keyof AvatarProps, "size">>;
  /**
   * The type of notification.
   *
   * @example Info
   */
  type: NotificationType;
}

const NOTIFICATION_ICON: { [key: string]: SVGAsset } = {
  [NotificationType.Error]: SVGAsset.NotificationError,
  [NotificationType.Info]: SVGAsset.NotificationInfo,
  [NotificationType.Success]: SVGAsset.NotificationSuccess,
  [NotificationType.Warning]: SVGAsset.NotificationWarning,
};

const ScNotificationFigure = styled.div<{
  type: NotificationFigureProps["type"];
}>`
  display: flex;
  align-items: center;
  color: ${styleVariant("type", {
    [NotificationType.Error]: themeTokenRule("color-fill-alert"),
    [NotificationType.Info]: themeTokenRule("color-fill-info"),
    [NotificationType.Success]: themeTokenRule("color-fill-success"),
    [NotificationType.Warning]: themeTokenRule("color-fill-warn"),
  })};
`;

export const NotificationFigure: FC<NotificationFigureProps> = ({
  avatar,
  ...props
}) => {
  return (
    <ScNotificationFigure className="tw-notification-figure" {...props}>
      {avatar ? (
        <Avatar size={30} {...avatar} />
      ) : (
        <Icon asset={NOTIFICATION_ICON[props.type]} />
      )}
    </ScNotificationFigure>
  );
};

NotificationFigure.displayName = "NotificationFigure";
