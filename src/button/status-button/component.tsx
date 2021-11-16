import { CoreButton, CoreButtonPublicProps, CoreButtonType } from "../core-button";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { css, focusVisible, hoverCss, styleVariant, styled, themeTokenRule } from "lib";

import { CoreButtonLabel } from "../core-button/core-button-label";
import { NotificationType } from "../../notifications/notification";
import { SVGAsset } from "../../svg";
import { withOverlayContext } from "../../overlay-region/context";

export interface StatusButtonProps extends CoreButtonPublicProps {
  children?: string | ReactNode;
  icon?: SVGAsset;
  overlay?: boolean;
  type: NotificationType | "error" | "info" | "success" | "warning"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

export const ScStatusButton = styled(CoreButton)<{
  $type: StatusButtonProps["type"];
}>`
  ${({ disabled }) =>
    !disabled &&
    styleVariant("$type", {
      [NotificationType.Info]: css`
        background-color: ${themeTokenRule("color-background-button-info")};
        color: ${themeTokenRule("color-text-button-info")};
        ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-info-hover")};
        color: ${themeTokenRule("color-text-button-info")};`}
        ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-info-hover")};
        color: ${themeTokenRule("color-text-button-info")};`}
        &:active {
          background-color: ${themeTokenRule("color-background-button-info-active")};
          color: ${themeTokenRule("color-text-button-info")};
        }
      `,
      [NotificationType.Warning]: css`
        background-color: ${themeTokenRule("color-background-button-warn")};
        color: ${themeTokenRule("color-text-button-warn")};
        ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-warn-hover")};
        color: ${themeTokenRule("color-text-button-warn")};`}
        ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-warn-hover")};
        color: ${themeTokenRule("color-text-button-warn")};`}
        &:active {
          background-color: ${themeTokenRule("color-background-button-warn-active")};
          color: ${themeTokenRule("color-text-button-warn")};
        }
      `,
      [NotificationType.Success]: css`
        background-color: ${themeTokenRule("color-background-button-success")};
        color: ${themeTokenRule("color-text-button-success")};
        ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-success-hover")};
        color: ${themeTokenRule("color-text-button-success")};`}
        ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-success-hover")};
        color: ${themeTokenRule("color-text-button-success")};`}
        &:active {
          background-color: ${themeTokenRule("color-background-button-success-active")};
          color: ${themeTokenRule("color-text-button-success")};
        }
      `,
      [NotificationType.Error]: css`
        background-color: ${themeTokenRule("color-background-button-error")};
        color: ${themeTokenRule("color-text-button-error")};
        ${hoverCss`
        background-color: ${themeTokenRule("color-background-button-error-hover")};
        color: ${themeTokenRule("color-text-button-error")};`}
        ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-error-hover")};
        color: ${themeTokenRule("color-text-button-error")};`}
        &:active {
          background-color: ${themeTokenRule("color-background-button-error-active")};
          color: ${themeTokenRule("color-text-button-error")};
        }
      `,
    })}
`;

const StatusButton: ForwardRefRenderFunction<HTMLElement, StatusButtonProps> = (
  { children, icon, type, ...buttonProps },
  ref,
) => {
  return (
    <ScStatusButton
      {...buttonProps}
      ref={ref}
      $type={type}
      variant={buttonProps.disabled ? CoreButtonType.Primary : undefined}
    >
      <CoreButtonLabel icon={icon}>{children}</CoreButtonLabel>
    </ScStatusButton>
  );
};

StatusButton.displayName = "StatusButton";
const ComponentWithRef = forwardRef(StatusButton);
const ComponentWithOverlayContext = withOverlayContext<StatusButtonProps, HTMLElement>(ComponentWithRef);
export { ComponentWithOverlayContext as StatusButton };
