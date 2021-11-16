import { CoreButton, CoreButtonSize } from "../core-button";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import {
  cn,
  css,
  focusVisible,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { CoreButtonDropdownType } from "../core-button/core-button-dropdown";
import { CoreButtonLabel } from "../core-button/core-button-label";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { SVGAsset } from "../../svg";
import { withOverlayContext } from "../../overlay-region/context";

const errorStyles = css`
  border-color: ${themeTokenRule("color-border-input-error")};

  &:hover {
    border-color: ${themeTokenRule("color-border-input-error")};
  }

  ${focusVisible`
    border-color: ${themeTokenRule("color-border-input-error")};
  `}
`;

const disabledStyles = css`
  opacity: 0.5;
  pointer-events: none;
`;

const overlayStyles = css`
  color: ${themeTokenRule("color-text-overlay")};
  background-color: ${themeTokenRule("color-background-input-overlay")};
  border-color: ${themeTokenRule("color-border-input-overlay")};

  &:hover {
    background-color: ${themeTokenRule("color-background-input-overlay")};
    border-color: ${themeTokenRule("color-border-input-overlay-hover")};
  }

  ${focusVisible`
    background-color: ${themeTokenRule("color-background-input-overlay-focus")};
    border-color: ${themeTokenRule("color-border-input-overlay-focus")};`}
`;

interface ScCoreButtonProps {
  $error?: boolean;
  overlay?: boolean;
  disabled?: boolean;
}

const timingShort = staticTokenRule("timing-short");

const ScCoreButton = styled(CoreButton)<ScCoreButtonProps>`
  border-color: ${themeTokenRule("color-border-input")};
  border-style: solid;
  border-width: ${staticTokenRule("border-width-input")};

  background-color: ${themeTokenRule("color-background-input")};
  background-clip: padding-box;
  color: ${themeTokenRule("color-text-input")};
  transition: box-shadow ${timingShort} ease-in, border ${timingShort} ease-in,
    background-color ${timingShort} ease-in;

  &:hover {
    border-color: ${themeTokenRule("color-border-input-hover")};
  }

  ${focusVisible`
    background-color: ${themeTokenRule("color-background-input-focus")};
    border-color: ${themeTokenRule("color-border-input-focus")};
    outline: 0;`}


  ${({ disabled }) => disabled && disabledStyles}

  ${({ overlay }) => overlay && overlayStyles}

  ${({ $error }) => $error && errorStyles}
`;

export interface SelectButtonProps extends CoreInteractivePublicProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: CoreInteractivePublicProps["refHandler"];
  children?: ReactNode;
  fullWidth?: boolean;
  overlay?: boolean;
  icon?: SVGAsset;
  size?: CoreButtonSize;
  error?: boolean;
}

export const SelectButtonComponent: ForwardRefRenderFunction<
  HTMLElement,
  SelectButtonProps
> = ({ children, error, ...props }, ref) => {
  const classes: ClassValue = {
    "tw-select-button": true,
    "tw-select-button--overlay": props.overlay,
    "tw-select-button--error": error,
    "tw-select-button--disabled": props.disabled,
  };

  return (
    <ScCoreButton {...props} ref={ref} className={cn(classes)} $error={error}>
      <CoreButtonLabel
        fullWidth={props.fullWidth}
        icon={props.icon}
        size={props.size}
        dropdown={CoreButtonDropdownType.ArrowDown}
      >
        {children}
      </CoreButtonLabel>
    </ScCoreButton>
  );
};

SelectButtonComponent.displayName = "SelectButton";
const ComponentWithRef = forwardRef(SelectButtonComponent);
const ComponentWithOverlayContext = withOverlayContext<
  SelectButtonProps,
  HTMLElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as SelectButton };
