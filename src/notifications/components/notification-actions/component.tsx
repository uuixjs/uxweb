import { FC, ReactNode } from "react";
import { Button, ButtonSize, ButtonType } from "../../../button/button";
import { CoreButtonSize } from "../../../button/core-button";
import { StatusButton } from "../../../button/status-button";
import { CoreInteractivePublicProps } from "../../../core-interactive";
import {
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
} from "../../../layout";
import { SVGAsset } from "../../../svg";
import { NotificationType } from "../../notification";

export interface NotificationAction extends CoreInteractivePublicProps {
  children?: ReactNode;
  icon?: SVGAsset;
  overlay?: boolean;
  dropdown?: boolean;
  type?: ButtonType;
}

export interface NotificationActionsProps {
  primaryButton: NotificationAction;
  secondaryButton?: NotificationAction;
  type?: NotificationType;
}

export const NotificationActions: FC<NotificationActionsProps> = ({
  type,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.Start}
      flexDirection={FlexDirection.RowReverse}
    >
      <div>
        {type && !primaryButton.type ? (
          <StatusButton
            size={CoreButtonSize.Small}
            {...primaryButton}
            type={type}
          />
        ) : (
          <Button
            size={ButtonSize.Small}
            variant={primaryButton.type || ButtonType.Primary}
            {...primaryButton}
            type={undefined}
          />
        )}
      </div>
      {secondaryButton && (
        <Layout margin={{ right: 1 }}>
          <Button
            size={ButtonSize.Small}
            variant={secondaryButton.type || ButtonType.Secondary}
            {...secondaryButton}
            type={undefined}
          />
        </Layout>
      )}
    </Layout>
  );
};

NotificationActions.displayName = "NotificationActions";
