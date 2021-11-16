import {
  AlignItems,
  Background,
  Display,
  Elevation,
  Layout,
} from "../../layout";
import {
  BorderRadius,
  css,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib";
import { ButtonIconSize, ButtonIconType } from "../../button/button-icon";
import { CloseButtonProps, CoreDismissible } from "../../core-dismissible";
import { FC, ReactNode } from "react";
import {
  NotificationActions,
  NotificationActionsProps,
} from "../components/notification-actions";
import {
  NotificationMessage,
  NotificationMessageProps,
} from "../components/notification-message/component";

import { AvatarProps } from "../../avatar";
import { NotificationFigure } from "../components/notification-figure";
import { NotificationType } from "../notification";
import { getElevationStyles } from "../../layout/utils/style-mixins";

export interface InFeatureNotificationProps {
  /**
   * Up to two actionable buttons as part of the banner.
   */
  actions?: NotificationActionsProps;
  /**
   * Optional avatar to replace the default SVG icon.
   */
  avatar?: AvatarProps;
  /**
   * Specify a background color for the notification.
   */
  background?: Background.Base | Background.Alt | Background.Alt2;

  children?: ReactNode;
  /**
   * Renders a close button target.
   */
  closeButton?: CloseButtonProps;
  elevation?: Elevation;
  /** The message of the notification. */
  message?: NotificationMessageProps;
  /**
   * The type of in-feature notification.
   *
   * @example Error
   */
  type: NotificationType;
}

const ScInFeatureNotificationAvatar = styled.div<{ $adjusted?: boolean }>`
  padding: ${staticTokenRule("space-1")};
  ${({ $adjusted }) => $adjusted && "margin-top: 0.1rem"};
`;

const ScInFeatureNotificationCloseButton = styled.div`
  padding: ${staticTokenRule("space-05")} ${staticTokenRule("space-1")};

  /* This ensures that the close button is centered when there is only one line
  of text in the component. Flexbox was the first option, but the design
  specified that the icon should remain in the top left as the notification
  expands vertically. */
  margin: 0.3rem 0;
`;

const ScInFeatureNotification = styled.div<{
  type: InFeatureNotificationProps["type"];
  elevation?: InFeatureNotificationProps["elevation"];
}>`
  ${({ elevation, theme }) =>
    getElevationStyles({ elevation: elevation || 3, theme })}
  position: relative;

  border-bottom-width: 5px;
  border-bottom-style: solid;

  border-radius: ${staticTokenRule("border-radius-medium")};
  color: ${themeTokenRule("color-text-base")};

  ${styleVariant("type", {
    [NotificationType.Error]: css`
      border-bottom-color: ${themeTokenRule("color-border-error-decorative")};
    `,
    [NotificationType.Info]: css`
      border-bottom-color: ${themeTokenRule("color-border-info-decorative")};
    `,
    [NotificationType.Success]: css`
      border-bottom-color: ${themeTokenRule("color-border-success-decorative")};
    `,
    [NotificationType.Warning]: css`
      border-bottom-color: ${themeTokenRule("color-border-warn-decorative")};
    `,
  })}
`;
export const InFeatureNotification: FC<InFeatureNotificationProps> = ({
  actions,
  avatar,
  background,
  children,
  closeButton,
  message,
  type,
  ...props
}) => {
  return (
    <ScInFeatureNotification
      {...props}
      className="tw-in-feature-notification"
      type={type}
    >
      <Layout borderRadius={BorderRadius.Medium} background={background}>
        <Layout display={Display.Flex}>
          <Layout display={Display.Flex} fullWidth>
            <ScInFeatureNotificationAvatar
              $adjusted={message && !message.inline}
              className="tw-in-feature-notification__avatar"
            >
              <NotificationFigure type={type} avatar={avatar} />
            </ScInFeatureNotificationAvatar>
            <Layout
              display={Display.Flex}
              alignItems={AlignItems.Center}
              fullWidth
            >
              {children}
              {message && (
                <Layout
                  padding={{ y: 1, right: 1 }}
                  /* fullWidth here fixes a bug with IE11 where this div does not correctly shrink and wrap text */
                  fullWidth
                >
                  <NotificationMessage {...message} />
                </Layout>
              )}
            </Layout>
          </Layout>
          {closeButton && (
            <ScInFeatureNotificationCloseButton className="tw-in-feature-notification__close-button">
              <CoreDismissible
                aria-label={closeButton["aria-label"]}
                onClick={closeButton.onClick}
                size={ButtonIconSize.Small}
                variant={ButtonIconType.Secondary}
              />
            </ScInFeatureNotificationCloseButton>
          )}
        </Layout>
        {actions && (
          <Layout padding={{ x: 1, bottom: 1 }}>
            <NotificationActions type={type} {...actions} />
          </Layout>
        )}
      </Layout>
    </ScInFeatureNotification>
  );
};

InFeatureNotification.defaultProps = {
  background: Background.Base,
};

InFeatureNotification.displayName = "InFeatureNotification";
