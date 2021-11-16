import { CoreInteractive, CoreInteractiveElement, CoreInteractivePublicProps } from "../../core-interactive";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import {
  Interpolation,
  ThemeContextValue,
  ThemeProps,
  css,
  focusVisible,
  hoverCss,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { StaticToken } from "@uuixjs/uuixweb-lib";
import { withOverlayContext } from "../../overlay-region/context";

export enum CoreButtonSize {
  Default = "default",
  Small = "small",
  Large = "large",
}

export enum CoreButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Text = "text",
  Destructive = "destructive",
  Success = "success",
}

export enum CoreButtonRounding {
  Default = "default",
  Left = "left",
  Right = "right",
}

type CoreButtonRoundingValue = "default" | "left" | "right"; // TODO: https://jira.xarth.tv/browse/COREUI-3554

export interface CoreButtonPublicProps extends CoreInteractivePublicProps {
  fullWidth?: boolean;
  size?: CoreButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

export interface CoreButtonProps extends CoreButtonPublicProps {
  children?: ReactNode;
  className?: string;
  rounding?: CoreButtonRounding | CoreButtonRoundingValue; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  overlay?: boolean;
  variant?: CoreButtonType | "primary" | "secondary" | "text" | "destructive" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

const getRoundingStyles = (rounding: CoreButtonRoundingValue, borderRadius: StaticToken) => {
  if (rounding === CoreButtonRounding.Left) {
    return css`
      border-top-left-radius: ${staticTokenRule(borderRadius)};
      border-bottom-left-radius: ${staticTokenRule(borderRadius)};
    `;
  }

  if (rounding === CoreButtonRounding.Right) {
    return css`
      border-top-right-radius: ${staticTokenRule(borderRadius)};
      border-bottom-right-radius: ${staticTokenRule(borderRadius)};
    `;
  }

  return css`
    border-radius: ${staticTokenRule(borderRadius)};
  `;
};

const getSizeStyles = ({
  $size = CoreButtonSize.Default,
  $rounding = CoreButtonRounding.Default,
}: ScCoreButtonProps) => {
  let borderRadius: StaticToken = "border-radius-medium";
  let fontSize: StaticToken = "button-text-default";
  let height: StaticToken = "button-size-default";

  if ($size === CoreButtonSize.Small) {
    borderRadius = "border-radius-small";
    fontSize = "button-text-small";
    height = "button-size-small";
  }

  if ($size === CoreButtonSize.Large) {
    borderRadius = "border-radius-large";
    fontSize = "button-text-large";
    height = "button-size-large";
  }

  return css`
    ${getRoundingStyles($rounding, borderRadius)}
    font-size: ${staticTokenRule(fontSize)};
    height: ${staticTokenRule(height)};
  `;
};

type StyleValues<P> = Interpolation<P & ThemeProps<ThemeContextValue>>;

const baseStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScCoreButtonProps) =>
  !props.$disabled && styles;

const hoverStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScCoreButtonProps) =>
  !props.$disabled && hoverCss`${styles}`;

const activeStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScCoreButtonProps) =>
  !props.$disabled &&
  css`
    &:active {
      ${styles}
    }
    ${hoverCss`
      &:active {
        ${styles}
      }
    `}
  `;

const disabledStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScCoreButtonProps) =>
  props.$disabled && styles;

export interface ScCoreButtonProps {
  $disabled?: boolean;
  $fullWidth?: boolean;
  $overlay?: boolean;
  $rounding?: CoreButtonRounding | CoreButtonRoundingValue; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  $size?: CoreButtonSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

export const ScCoreButton = styled(CoreInteractive)<ScCoreButtonProps>`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  width: ${(props) => (props.$fullWidth ? "100%" : undefined)};
  font-weight: ${staticTokenRule("font-weight-semibold")};

  ${(props) => getSizeStyles(props)}

  ${(props) =>
    focusVisible`
      box-shadow: ${themeTokenRule(props.$overlay ? "shadow-button-overlay-focus" : "shadow-button-focus")};
    `}

  /* Base styles reset */
  &:hover {
    text-decoration: none;
  }

  /* Includes disableInteraction */
  &:disabled {
    cursor: not-allowed;
  }

  opacity: ${(props) => props.$disabled && 0.5};
`;

const ScCoreButtonPrimary = styled(ScCoreButton)<ScCoreButtonProps>((props) => {
  if (props.$overlay) {
    return css`
      background-color: ${themeTokenRule("color-background-button-overlay-primary-default")};
      color: ${themeTokenRule("color-text-button-overlay-primary")};
      ${hoverStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-primary-hover")};
        color: ${themeTokenRule("color-text-button-overlay-primary")};
      `)}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-overlay-primary-hover")};
      `}
      ${activeStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-primary-active")};
        box-shadow: ${themeTokenRule("shadow-button-overlay-active")};
      `)}
    `;
  } else {
    return css`
      background-color: ${themeTokenRule("color-background-button-primary-default")};
      color: ${themeTokenRule("color-text-button-primary")};
      ${hoverStyles(css`
        background-color: ${themeTokenRule("color-background-button-primary-hover")};
        color: ${themeTokenRule("color-text-button-primary")};
      `)}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-primary-hover")};
      `}
      ${activeStyles(css`
        background-color: ${themeTokenRule("color-background-button-primary-active")};
      `)}
      ${disabledStyles(css`
        background-color: ${themeTokenRule("color-background-button-disabled")};
        color: ${themeTokenRule("color-text-button-disabled")};
      `)}
    `;
  }
});

const ScCoreButtonSecondary = styled(ScCoreButton)<ScCoreButtonProps>((props) => {
  if (props.$overlay) {
    return css`
      background-color: ${themeTokenRule("color-background-button-overlay-secondary-default")};
      color: ${themeTokenRule("color-text-button-overlay-secondary")};
      ${hoverStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-secondary-hover")};
        color: ${themeTokenRule("color-text-button-overlay-secondary")};
      `)}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-overlay-secondary-hover")};
      `}
      ${activeStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-secondary-active")};
        box-shadow: ${themeTokenRule("shadow-button-overlay-active")};
      `)}
    `;
  } else {
    return css`
        background-color: ${themeTokenRule("color-background-button-secondary-default")};
        color: ${themeTokenRule("color-text-button-secondary")};
        ${hoverStyles(css`
          background-color: ${themeTokenRule("color-background-button-secondary-hover")};
          color: ${themeTokenRule("color-text-button-secondary")};
        `)}
        ${focusVisible`
          background-color: ${themeTokenRule("color-background-button-secondary-hover")};
        `}
        ${activeStyles(css`
          background-color: ${themeTokenRule("color-background-button-secondary-active")};
        `)}
        ${disabledStyles(css`
          background-color: ${themeTokenRule("color-background-button-disabled")};
          color: ${themeTokenRule("color-text-button-disabled")};
        `)}
      `;
  }
});

const ScCoreButtonText = styled(ScCoreButton)<ScCoreButtonProps>((props) => {
  if (props.$overlay) {
    return css`
      ${baseStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-text-default")};
        color: ${themeTokenRule("color-text-button-overlay-text")};
      `)}
      ${hoverStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-text-hover")};
        color: ${themeTokenRule("color-text-button-overlay-text")};
      `)}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-overlay-text-hover")};
      `}
      ${activeStyles(css`
        background-color: ${themeTokenRule("color-background-button-overlay-text-active")};
        box-shadow: ${themeTokenRule("shadow-button-overlay-active")};
      `)}
    `;
  } else {
    return css`
      ${baseStyles(css`
        background-color: ${themeTokenRule("color-background-button-text-default")};
        color: ${themeTokenRule("color-text-button-text")};
      `)}
      ${hoverStyles(css`
        background-color: ${themeTokenRule("color-background-button-text-hover")};
      `)}
      ${focusVisible`
        background-color: ${themeTokenRule("color-background-button-text-hover")};
      `}
      ${activeStyles(css`
        background-color: ${themeTokenRule("color-background-button-text-active")};
      `)}
      ${disabledStyles(css`
        color: ${themeTokenRule("color-text-button-disabled")};
      `)}
    `;
  }
});

const ScCoreButtonDestructive = styled(ScCoreButton)<ScCoreButtonProps>`
  ${baseStyles(css`
    background-color: ${themeTokenRule("color-background-button-destructive-default")};
    color: ${themeTokenRule("color-text-button-destructive")};
  `)}
  ${hoverStyles(css`
    background-color: ${themeTokenRule("color-background-button-destructive-hover")};
    color: ${themeTokenRule("color-text-button-destructive")};
  `)}
  ${focusVisible`
    background-color: ${themeTokenRule("color-background-button-destructive-hover")};
  `}
  ${activeStyles(css`
    background-color: ${themeTokenRule("color-background-button-destructive-active")};
  `)}
  ${(props) =>
    disabledStyles(
      props.$overlay
        ? css`
            background-color: ${themeTokenRule("color-background-button-overlay-primary-default")};
            color: ${themeTokenRule("color-text-button-overlay-primary")};
          `
        : css`
            background-color: ${themeTokenRule("color-background-button-disabled")};
            color: ${themeTokenRule("color-text-button-disabled")};
          `,
    )}
`;

export const ScCoreButtonSuccess = styled(ScCoreButton)<ScCoreButtonProps>`
    ${baseStyles(css`
      background-color: ${themeTokenRule("color-background-button-success")};
      color: ${themeTokenRule("color-text-button-success")};
    `)}
    ${hoverStyles(css`
      background-color: ${themeTokenRule("color-background-button-success-hover")};
      color: ${themeTokenRule("color-text-button-success")};
    `)}
    ${focusVisible`
      background-color: ${themeTokenRule("color-background-button-success-hover")}
    `}
    ${activeStyles(
      css`
        background-color: ${themeTokenRule("color-background-button-success-active")};
      `,
    )}
    ${(props) =>
      disabledStyles(
        props.$overlay
          ? css`
              background-color: ${themeTokenRule("color-background-button-overlay-primary-default")};
              color: ${themeTokenRule("color-text-button-overlay-primary")};
            `
          : css`
              background-color: ${themeTokenRule("color-background-button-disabled")};
              color: ${themeTokenRule("color-text-button-disabled")};
            `,
      )}
`;

export const CoreButtonComponent: ForwardRefRenderFunction<CoreInteractiveElement, CoreButtonProps> = (
  {
    children,
    className,
    disabled,
    fullWidth,
    overlay,
    rounding = CoreButtonRounding.Default,
    size = CoreButtonSize.Default,
    variant,
    ...props
  },
  ref,
) => {
  const componentProps = {
    $disabled: disabled,
    $fullWidth: fullWidth,
    $overlay: overlay,
    $rounding: rounding,
    $size: size,
    children,
    className,
    disabled,
    ref,
    ...props,
  };

  if (variant === CoreButtonType.Primary) {
    return <ScCoreButtonPrimary {...componentProps} />;
  }

  if (variant === CoreButtonType.Secondary) {
    return <ScCoreButtonSecondary {...componentProps} />;
  }

  if (variant === CoreButtonType.Text) {
    return <ScCoreButtonText {...componentProps} />;
  }

  if (variant === CoreButtonType.Destructive) {
    return <ScCoreButtonDestructive {...componentProps} />;
  }

  if (variant === CoreButtonType.Success) {
    return <ScCoreButtonSuccess {...componentProps} />;
  }

  return <ScCoreButton {...componentProps} />;
};

CoreButtonComponent.displayName = "CoreButton";
const ComponentWithRef = forwardRef(CoreButtonComponent);
const ComponentWithOverlayContext = withOverlayContext<CoreButtonProps, HTMLElement>(ComponentWithRef);
export { ComponentWithOverlayContext as CoreButton };
