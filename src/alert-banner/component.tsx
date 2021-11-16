import {
  AlignItems,
  Color,
  Display,
  FlexDirection,
  FontSize,
  InjectLayout,
  JustifyContent,
  Layout,
  Position,
} from "../layout";
import { Button, ButtonPublicProps, ButtonType } from "../button/button";
import { CloseButtonProps, CoreDismissible } from "../core-dismissible";
import { CoreLink, CoreLinkType } from "../core-link";
import { CoreText, TextType } from "../core-text";
import { StatusButton, StatusButtonProps } from "../button/status-button";
import { styleVariant, styled, themeTokenRule } from "@uuixjs/uuixweb-lib";

import { Column } from "../grid/column";
import { CoreInteractivePublicProps } from "../core-interactive";
import { FC } from "react";
import { Grid } from "../grid/grid";
import { Icon } from "../icon";
import { NotificationType } from "../notifications/notification";
import { ResponsiveWrapper } from "../responsive-wrapper";
import { SVGAsset } from "../svg";

export type AlertBannerActions =
  | [Omit<StatusButtonProps, "type">]
  | [Omit<StatusButtonProps, "type">, ButtonPublicProps];

export interface AlertBannerLinkProps extends CoreInteractivePublicProps {
  text: string;
}

export interface AlertBannerProps {
  /**
   * Up to two actionable buttons as part of the banner.
   */
  actions?: AlertBannerActions | JSX.Element;
  /**
   * Renders a close button target.
   */
  closeButton?: CloseButtonProps;
  /**
   * Optional link CTA for further context.
   */
  link?: AlertBannerLinkProps;
  /**
   * A brief description of state of the alert taking place.
   *
   * @example The System is Down.
   */
  status?: string;
  /**
   * Alert message text.
   *
   * @example Please stand by, we will inform you when it is back up.
   */
  message: string | JSX.Element;
  /**
   * The type of alert
   *
   * @example Error
   */
  type: AlertBannerType | "error" | "info" | "success" | "warning"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

export enum AlertBannerType {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning",
}

const ALERT_BANNER_ICON: Record<AlertBannerType, SVGAsset> = {
  [AlertBannerType.Error]: SVGAsset.NotificationError,
  [AlertBannerType.Info]: SVGAsset.NotificationInfo,
  [AlertBannerType.Success]: SVGAsset.NotificationSuccess,
  [AlertBannerType.Warning]: SVGAsset.NotificationWarning,
};

const NOTIFICATION_TYPE_MAP: Record<AlertBannerType, NotificationType> = {
  [AlertBannerType.Error]: NotificationType.Error,
  [AlertBannerType.Info]: NotificationType.Info,
  [AlertBannerType.Success]: NotificationType.Success,
  [AlertBannerType.Warning]: NotificationType.Warning,
};

const ScAlertBanner = styled(Layout)<{ $type: AlertBannerProps["type"] }>`
  background-color: ${themeTokenRule("color-background-base")};
  border-bottom-width: 5px;
  border-bottom-style: solid;
  border-bottom-color: ${styleVariant("$type", {
    [AlertBannerType.Error]: themeTokenRule("color-border-error-decorative"),
    [AlertBannerType.Info]: themeTokenRule("color-border-info-decorative"),
    [AlertBannerType.Success]: themeTokenRule(
      "color-border-success-decorative",
    ),
    [AlertBannerType.Warning]: themeTokenRule("color-border-warn-decorative"),
  })};
`;

const ScAlertBannerIcon = styled.div<{ $type: AlertBannerProps["type"] }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${styleVariant("$type", {
    [AlertBannerType.Error]: themeTokenRule("color-fill-error"),
    [AlertBannerType.Info]: themeTokenRule("color-fill-info"),
    [AlertBannerType.Success]: themeTokenRule("color-fill-success"),
    [AlertBannerType.Warning]: themeTokenRule("color-fill-warn"),
  })};
`;

export const AlertBanner: FC<AlertBannerProps> = ({
  link,
  closeButton,
  type,
  actions,
  status,
  message,
  ...props
}) => {
  let linkElement: JSX.Element | undefined;
  const actionsElements: JSX.Element[] = [];

  if (link) {
    linkElement = (
      <InjectLayout margin={{ left: 1 }}>
        <CoreLink
          className="tw-alert-banner__link"
          variant={CoreLinkType.Inherit}
          underline
          hoverColorInherit
          {...link}
        >
          {link.text}
        </CoreLink>
      </InjectLayout>
    );
  }

  if (actions && Array.isArray(actions)) {
    actions.forEach((action, i) => {
      actionsElements.push(
        <Layout key={i} margin={{ left: 1 }}>
          {i === 0 ? (
            <StatusButton {...action} type={NOTIFICATION_TYPE_MAP[type]} />
          ) : (
            <Button {...action} variant={ButtonType.Secondary} />
          )}
        </Layout>,
      );
    });
  } else if (actions) { // @ts-ignore
    actionsElements.push(actions);
  }

  return (
    <ScAlertBanner
      {...props}
      $type={type}
      role="alert"
      className="tw-alert-banner"
      fontSize={FontSize.Size6}
      alignItems={AlignItems.Center}
      position={Position.Relative}
      display={Display.Flex}
      fullWidth
      padding={{ y: 0.5, left: closeButton && 0.5 }}
    >
      <ResponsiveWrapper centered>
        <Grid justifyContent={JustifyContent.Center}>
          <Column cols={{ default: 12, lg: 9, xl: 8, xxl: 7 }}>
            <Layout
              display={Display.Flex}
              alignItems={AlignItems.Center}
              position={Position.Relative}
            >
              <ScAlertBannerIcon $type={type}>
                <Icon asset={ALERT_BANNER_ICON[type]} />
              </ScAlertBannerIcon>
              <Layout
                display={Display.Flex}
                alignItems={AlignItems.Center}
                flexGrow={1}
              >
                {status && (
                  <InjectLayout margin={{ left: 1 }}>
                    <CoreText type={TextType.H2} bold fontSize={FontSize.Size6}>
                      {status}
                    </CoreText>
                  </InjectLayout>
                )}
                {typeof message !== "string" && (
                  <>
                    {message}
                    {linkElement}
                  </>
                )}
                {message && typeof message === "string" && (
                  <Layout margin={{ left: 1 }}>
                    <CoreText
                      type={TextType.P}
                      fontSize={FontSize.Size6}
                      color={Color.Alt2}
                    >
                      {message}
                      {linkElement}
                    </CoreText>
                  </Layout>
                )}
              </Layout>
              {actionsElements && (
                <Layout
                  display={Display.Flex}
                  flexDirection={FlexDirection.RowReverse}
                  justifyContent={JustifyContent.End}
                >
                  {actionsElements}
                </Layout>
              )}
              {closeButton && (
                <Layout padding={{ left: 1 }}>
                  <CoreDismissible
                    aria-label={closeButton["aria-label"]}
                    onClick={closeButton.onClick}
                  />
                </Layout>
              )}
            </Layout>
          </Column>
        </Grid>
      </ResponsiveWrapper>
    </ScAlertBanner>
  );
};

AlertBanner.displayName = "AlertBanner";
