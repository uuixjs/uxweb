import { CoreButton, CoreButtonPublicProps, CoreButtonSize, CoreButtonType } from "../core-button";
import {
  FOCUS_VISIBLE_ATTR,
  css,
  focusVisible,
  hoverCss,
  hoverCssWithSelector,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { REVERSE_BUTTON_SIZES, ScButtonIconFigure } from "../button-icon/component";

import { CoreButtonLabel } from "../core-button/core-button-label";
import { SVGAsset } from "../../svg";

export interface StatusAlertButtonProps extends CoreButtonPublicProps {
  children?: string | ReactNode;
  icon?: SVGAsset;
  showAlert?: boolean;
  /** Icon to display when the status button is hovered. */
  statusAlertIcon?: SVGAsset;
  /**
   * Text to display when the status button is hovered. Setting this property
   * turns the button into a "status" button.
   */
  statusAlertText?: string;
}

const statusAlertActiveRules = css`
  background-color: ${themeTokenRule("color-background-button-status-active")};
  color: ${themeTokenRule("color-text-button-alert-active")};
`;

const statusAlertHoverFocusRules = css`
  background-color: ${themeTokenRule("color-background-button-status-hover")};
  color: ${themeTokenRule("color-text-button-alert")};
  &:active {
    ${statusAlertActiveRules}
  }
`;

interface ScStatusAlertButtonProps {
  $showAlert?: StatusAlertButtonProps["showAlert"];
  $iconOnly?: boolean;
}

const ScStatusAlertButton = styled(CoreButton)<Omit<StatusAlertButtonProps, "showAlert"> & ScStatusAlertButtonProps>`
  width: ${({ $iconOnly }) =>
    $iconOnly &&
    styleVariant("size", {
      [CoreButtonSize.Small]: staticTokenRule("button-size-small"),
      [CoreButtonSize.Default]: staticTokenRule("button-size-default"),
      [CoreButtonSize.Large]: staticTokenRule("button-size-large"),
    })};

  ${(props) =>
    !props.disabled &&
    css`
      transition-duration: ${staticTokenRule("timing-short")};
      transition-property: background-color, color;
      transition-timing-function: ease;
      background-color: ${themeTokenRule("color-background-button-status")};
      color: ${themeTokenRule("color-text-button-success")};
      ${props.$showAlert ? statusAlertHoverFocusRules : undefined}
      ${hoverCss`${statusAlertHoverFocusRules}`}
      ${focusVisible`${statusAlertHoverFocusRules}`}
      &:active: {${statusAlertActiveRules}}
    `}
`;

interface ScStatusAlertLabelProps {
  disabled?: boolean;
  $showAlert?: StatusAlertButtonProps["showAlert"];
  size: CoreButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  type: "primary" | "alert";
}

const buttonSizeValue = styleVariant<ScStatusAlertLabelProps, "size">("size", {
  [CoreButtonSize.Small]: staticTokenRule("button-size-small"),
  [CoreButtonSize.Default]: staticTokenRule("button-size-default"),
  [CoreButtonSize.Large]: staticTokenRule("button-size-large"),
});

const statusAlertLabelHoverFocusRules = (type: string) => {
  return `opacity: ${type === "alert" ? 1 : 0};`;
};

export const ScStatusAlertLabel = styled.div<ScStatusAlertLabelProps>`
  transition-duration: ${staticTokenRule("timing-short")};
  transition-property: opacity;
  transition-timing-function: ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${buttonSizeValue};

  ${(props) => {
    if (props.type === "alert") {
      return `
        opacity: 0;
        margin-top: calc(-1 * ${buttonSizeValue(props)});
      `;
    } else {
      return `
        opacity: 1;
        margin-top: 0;
      `;
    }
  }}

  ${(props) =>
    !props.disabled &&
    css`
      ${hoverCssWithSelector(`${ScStatusAlertButton}:hover &`)`
        ${statusAlertLabelHoverFocusRules(props.type)}
      `}

      ${props.$showAlert ? statusAlertLabelHoverFocusRules(props.type) : undefined}

      ${ScStatusAlertButton}${FOCUS_VISIBLE_ATTR} & {
        ${statusAlertLabelHoverFocusRules(props.type)}
      }
    `};
`;

const StatusAlertButton: ForwardRefRenderFunction<HTMLElement, StatusAlertButtonProps> = (
  {
    children,
    disabled,
    icon,
    showAlert,
    size = CoreButtonSize.Default,
    statusAlertIcon,
    statusAlertText,
    ...buttonProps
  },
  ref,
) => {
  return (
    <ScStatusAlertButton
      disabled={disabled}
      variant={disabled ? CoreButtonType.Primary : undefined}
      ref={ref}
      size={size}
      $showAlert={showAlert}
      $iconOnly={!buttonProps.fullWidth && !children && !!icon && !!statusAlertIcon}
      className="tw-status-alert-button"
      {...buttonProps}
    >
      <div>
        <ScStatusAlertLabel
          disabled={disabled}
          $showAlert={showAlert}
          size={size || CoreButtonSize.Default}
          type="primary"
        >
          {children ? (
            <CoreButtonLabel icon={icon} size={size} fullWidth={buttonProps.fullWidth || !!statusAlertIcon}>
              {children}
            </CoreButtonLabel>
          ) : (
            icon && <ScButtonIconFigure icon={icon} size={REVERSE_BUTTON_SIZES[size || CoreButtonSize.Default]} />
          )}
        </ScStatusAlertLabel>
        <ScStatusAlertLabel
          $showAlert={showAlert}
          disabled={disabled}
          size={size || CoreButtonSize.Default}
          type="alert"
        >
          {children || statusAlertText ? (
            <CoreButtonLabel icon={statusAlertIcon} size={size} fullWidth={buttonProps.fullWidth || !!statusAlertIcon}>
              {statusAlertText || children}
            </CoreButtonLabel>
          ) : (
            statusAlertIcon && (
              <ScButtonIconFigure icon={statusAlertIcon} size={REVERSE_BUTTON_SIZES[size || CoreButtonSize.Default]} />
            )
          )}
        </ScStatusAlertLabel>
      </div>
    </ScStatusAlertButton>
  );
};

StatusAlertButton.displayName = "StatusAlertButton";
const ComponentWithRef = forwardRef(StatusAlertButton);
export { ComponentWithRef as StatusAlertButton };
