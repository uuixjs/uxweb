import { AlignItems, AlignSelf, Display, JustifyContent, Layout, Position, TextAlign } from "../../layout";
import {
  BorderRadius,
  css,
  focusVisible,
  hoverCss,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { FC, ReactNode } from "react";
import { ScButtonIcon, ScButtonIconFigure } from "../../button/button-icon/component";

import { CloseButtonProps } from "../../core-dismissible";
import { NotificationType } from "../notification";
import { SVGAsset } from "../../svg";

export interface SnackbarProps {
  /**
   * Renders a close button target.
   */
  closeButton?: CloseButtonProps;
  /**
   * The message of the Snackbar. Accomodates a SnackbarMessage component.
   */
  message?: ReactNode;
  /**
   * The way to add buttons to the Snackbar. Accomodates a SnackbarActions component.
   */
  actions?: ReactNode;
  /**
   * The way to specify which type of Snackbar you want to use: info, success, warning, or error.
   */
  type: NotificationType;
}

const ScSnackbar = styled(Layout)<{ $type: SnackbarProps["type"] }>`
  max-width: 52rem;
  min-width: 28rem;
  min-height: 5rem;

  ${styleVariant("$type", {
    [NotificationType.Error]: css`
      background-color: ${themeTokenRule("color-background-error")};
      color: ${staticTokenRule("color-black")};
    `,
    [NotificationType.Info]: css`
      background-color: ${themeTokenRule("color-background-info")};
      color: ${staticTokenRule("color-black")};
    `,
    [NotificationType.Success]: css`
      background-color: ${themeTokenRule("color-background-success")};
      color: ${staticTokenRule("color-black")};
    `,
    [NotificationType.Warning]: css`
      background-color: ${themeTokenRule("color-background-warn")};
      color: ${staticTokenRule("color-black")};
    `,
  })}
`;

export const ScSnackbarCloseButton = styled(ScButtonIcon)<{
  $type: SnackbarProps["type"];
}>`
  float: right;
  display: inline-flex;
  flex-shrink: 0;
  align-self: start;
  margin-left: ${staticTokenRule("space-05")};
  color: ${staticTokenRule("color-black")};
  ${hoverCss`color: ${staticTokenRule("color-black")};`}
  ${focusVisible`color: ${staticTokenRule("color-black")};`}
  &:active {
    color: ${staticTokenRule("color-black")};
  }

  ${styleVariant("$type", {
    [NotificationType.Info]: css`
      ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-info-hover")};`}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-info-hover")};`}
      &:active {
        background-color: ${themeTokenRule("color-background-button-info-active")};
      }
    `,
    [NotificationType.Warning]: css`
      ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-warn-hover")};`}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-warn-hover")};`}
      &:active {
        background-color: ${themeTokenRule("color-background-button-warn-active")};
      }
    `,
    [NotificationType.Success]: css`
      ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-success-hover")};`}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-success-hover")};`}
      &:active {
        background-color: ${themeTokenRule("color-background-button-success-active")};
      }
    `,
    [NotificationType.Error]: css`
      ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-error-hover")};`}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-error-hover")};`}
      &:active {
        background-color: ${themeTokenRule("color-background-button-error-active")};
      }
    `,
  })};
`;

export const Snackbar: FC<SnackbarProps> = ({ closeButton, actions, message, type, ...props }) => {
  const closeButtonElement = closeButton && (
    <ScSnackbarCloseButton
      className="tw-snackbar__close"
      aria-label={closeButton["aria-label"]}
      onClick={closeButton.onClick}
      $type={type}
    >
      <ScButtonIconFigure icon={SVGAsset.Close} />
    </ScSnackbarCloseButton>
  );

  return (
    <ScSnackbar
      className="tw-snackbar"
      {...props}
      $type={type}
      role="status"
      borderRadius={BorderRadius.Medium}
      elevation={4}
      position={Position.Relative}
      padding={1}
      display={Display.InlineBlock}
      textAlign={closeButton === undefined && actions === undefined ? TextAlign.Center : undefined}
    >
      <Layout display={Display.Flex} alignItems={AlignItems.Center}>
        <Layout fullWidth display={Display.Flex} alignItems={AlignItems.Center}>
          <Layout flexGrow={1}>{message}</Layout>
        </Layout>
        {actions && (
          <Layout display={Display.Flex} alignSelf={AlignSelf.Start} justifyContent={JustifyContent.End}>
            {actions}
          </Layout>
        )}
        {closeButtonElement}
      </Layout>
    </ScSnackbar>
  );
};
