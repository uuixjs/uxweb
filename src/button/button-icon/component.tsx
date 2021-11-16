import { ButtonHTMLAttributes, ForwardRefRenderFunction, forwardRef } from "react";
import { CoreButton, CoreButtonSize, CoreButtonType } from "../core-button";
import { CoreInteractiveElement, CoreInteractivePublicProps } from "../../core-interactive";
import {
  css,
  focusVisible,
  hoverCss,
  rem,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { StatusAlertButton } from "../status-alert-button";
import { withOverlayContext } from "../../overlay-region/context";

export enum ButtonIconType {
  Primary = "primary",
  // @deprecated Visually identical to primary; please us primary instead.
  Secondary = "secondary",
  Alert = "alert",
  Success = "success",
}

export enum ButtonIconSize {
  Default = "default",
  Small = "small",
  Large = "large",
}

const BUTTON_TYPES: { [key: string]: CoreButtonType } = {
  [ButtonIconType.Alert]: CoreButtonType.Destructive,
  [ButtonIconType.Success]: CoreButtonType.Success,
};

const BUTTON_SIZES: { [key: string]: CoreButtonSize } = {
  [ButtonIconSize.Small]: CoreButtonSize.Small,
  [ButtonIconSize.Default]: CoreButtonSize.Default,
  [ButtonIconSize.Large]: CoreButtonSize.Large,
};

const BUTTON_ICON_SIZES = {
  [ButtonIconSize.Small]: { width: 16, height: 16 },
  [ButtonIconSize.Default]: { width: 20, height: 20 },
  [ButtonIconSize.Large]: { width: 24, height: 24 },
};

export const REVERSE_BUTTON_SIZES: { [key: string]: ButtonIconSize } = {
  [CoreButtonSize.Small]: ButtonIconSize.Small,
  [CoreButtonSize.Default]: ButtonIconSize.Default,
  [CoreButtonSize.Large]: ButtonIconSize.Large,
};

export interface ButtonIconProps
  extends CoreInteractivePublicProps,
    // Adding ButtonHTMLAttributes for "type" is a workaround for now to address a common use case; this component may actually render an <a> tag or a <button>!
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: CoreInteractivePublicProps["refHandler"];
  "aria-label": string;
  dropdown?: boolean;
  overlay?: boolean;
  icon: SVGAsset | JSX.Element;
  size?: ButtonIconSize | "default" | "small" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  statusAlertIcon?: SVGAsset;
  variant?: ButtonIconType | "primary" | "secondary" | "alert" | "success"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

export interface ScButtonIconProps {
  $dropdown?: ButtonIconProps["dropdown"];
}

interface ScButtonIconFigureProps {
  size?: ButtonIconProps["size"];
  icon: ButtonIconProps["icon"];
}
export const ScButtonIcon = styled(CoreButton).attrs((props: ScButtonIconFigureProps) => ({
  size: props.size || ButtonIconSize.Default,
}))<ScButtonIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  height: ${styleVariant("size", {
    [CoreButtonSize.Small]: staticTokenRule("button-size-small"),
    [CoreButtonSize.Default]: staticTokenRule("button-size-default"),
    [CoreButtonSize.Large]: staticTokenRule("button-size-large"),
  })};

  width: ${({ $dropdown }) =>
    !$dropdown &&
    styleVariant("size", {
      [CoreButtonSize.Small]: staticTokenRule("button-size-small"),
      [CoreButtonSize.Default]: staticTokenRule("button-size-default"),
      [CoreButtonSize.Large]: staticTokenRule("button-size-large"),
    })};

  padding: ${({ $dropdown }) =>
    $dropdown &&
    styleVariant("size", {
      [CoreButtonSize.Small]: "0.4rem",
      [CoreButtonSize.Default]: "0.5rem",
      [CoreButtonSize.Large]: "0.6rem",
    })};

  ${({ disabled, variant, overlay }) => {
    if (disabled) {
      return `
        opacity: 0.5;
        cursor: not-allowed;
      `;
    }
    if (overlay && !variant) {
      return css`
        border: ${staticTokenRule("border-width-default")} solid transparent;
        background-color: ${themeTokenRule("color-background-button-icon-overlay-default")};
        color: ${themeTokenRule("color-text-button-overlay")};

        ${hoverCss`
          background-color: ${themeTokenRule("color-background-button-icon-overlay-hover")};
          color: ${themeTokenRule("color-text-button-overlay-hover")};
        `}

        ${focusVisible`
          background-color: ${themeTokenRule("color-background-button-icon-overlay-hover")};
          color: ${themeTokenRule("color-text-button-overlay-focus")};
          box-shadow: ${themeTokenRule("shadow-button-overlay-focus")};
        `}

        &:active {
          background-color: var(--color-background-button-icon-overlay-active);
          color: var(--color-text-button-overlay-active);
          box-shadow: var(--shadow-button-overlay-active);
        }
      `;
    }
    if (!variant) {
      return css`
        border-radius: ${staticTokenRule("border-radius-medium")};
        background-color: ${themeTokenRule("color-background-button-text-default")};
        color: ${themeTokenRule("color-fill-button-icon")};

        ${hoverCss`
          background-color: ${themeTokenRule("color-background-button-text-hover")};
          color: ${themeTokenRule("color-fill-button-icon-hover")};
        `}

        ${focusVisible`
          background-color: ${themeTokenRule("color-background-button-text-hover")};
          color: ${themeTokenRule("color-fill-button-icon-hover")};
          box-shadow: ${themeTokenRule("shadow-button-focus")};
        `}

        &:active {
          background-color: ${themeTokenRule("color-background-button-text-active")};
          color: ${themeTokenRule("color-fill-button-icon-active")};
        }
      `;
    }
  }}
`;
export const ScButtonIconFigure = styled.div.attrs((props: ScButtonIconFigureProps) => ({
  size: props.size || ButtonIconSize.Default,
  children: typeof props.icon === "string" ? <Icon fill asset={props.icon} /> : props.icon,
}))<ScButtonIconFigureProps>`
  ${({ size }) => ({
    width: rem(BUTTON_ICON_SIZES[size || ButtonIconSize.Default].width),
    height: rem(BUTTON_ICON_SIZES[size || ButtonIconSize.Default].height),
  })}
`;

export const ButtonIconComponent: ForwardRefRenderFunction<CoreInteractiveElement, ButtonIconProps> = (
  { disabled, variant, statusAlertIcon, size, icon, overlay, dropdown, ...props },
  ref,
) => {
  const buttonIconFigureProps = {
    size,
    icon,
  };

  if (statusAlertIcon && typeof icon === "string") {
    return <StatusAlertButton {...props} disabled={disabled} ref={ref} icon={icon} statusAlertIcon={statusAlertIcon} />;
  }

  return (
    <ScButtonIcon
      {...props}
      ref={ref}
      variant={variant && !overlay ? BUTTON_TYPES[variant] : undefined}
      disabled={disabled}
      overlay={overlay}
      size={size ? BUTTON_SIZES[size] : CoreButtonSize.Default}
      $dropdown={dropdown}
    >
      <ScButtonIconFigure {...buttonIconFigureProps} />
      {dropdown && <ScButtonIconFigure size={size} icon={SVGAsset.GlyphArrDown} />}
    </ScButtonIcon>
  );
};

ButtonIconComponent.displayName = "ButtonIcon";
const ComponentWithRef = forwardRef(ButtonIconComponent);
const ComponentWithOverlayContext = withOverlayContext<ButtonIconProps, HTMLElement>(ComponentWithRef);
export { ComponentWithOverlayContext as ButtonIcon };
