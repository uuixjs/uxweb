import {
  BorderRadiusMixinProps,
  Interpolation,
  ThemeContextValue,
  ThemeProps,
  css,
  focusVisible,
  getBorderRadiusStyles,
  hoverCss,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { CoreInteractive, CoreInteractiveElement, CoreInteractivePublicProps } from "../core-interactive";
import { ForwardRefRenderFunction, ReactNode, forwardRef, useContext } from "react";

import { BorderRadiusProps } from "../layout";
import { OverlayContext } from "../overlay-region/context";

export enum InteractableType {
  Default = "default",
  Overlay = "overlay",
  Alert = "alert",
  /** @deprecated Use `Default` instead. */
  Inverted = "inverted",
  /** @deprecated Use `Default` instead. */
  Alpha = "alpha",
}

type InteractableTypeValue = "default" | "overlay" | "alert" | "inverted" | "alpha"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;

export interface InteractableProps extends CoreInteractivePublicProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: CoreInteractivePublicProps["refHandler"];
  /**
   * @deprecated This property will be removed in the future. To put a border
   * around an `Interactable`, wrap the component in a `Layout` component with
   * the `border` property enabled.
   */
  border?: boolean;
  borderRadius?: BorderRadiusProps;
  /**
   * @example Interactable Text
   */
  children?: ReactNode;
  hover?: boolean;
  selected?: boolean;
  variant?: InteractableType | InteractableTypeValue; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /**
   * Allows text within the Interactable to be selected. This functionality
   * does not work in Safari.
   */
  selectableText?: boolean;
}

interface ScInteractableProps {
  $border?: boolean;
  $disabled?: boolean;
  $hoverForced?: boolean;
  $selected?: boolean;
  $userSelectableText?: boolean;
}

type StyleValues<P> = Interpolation<P & ThemeProps<ThemeContextValue>>;

const hoverStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScInteractableProps) => css`
  ${!props.$selected && hoverCss`${styles}`}
  ${props.$hoverForced && styles}
`;

const focusStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScInteractableProps) =>
  !props.$selected && focusVisible`${styles}`;

const activeStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScInteractableProps) =>
  !props.$selected &&
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

const selectedStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScInteractableProps) =>
  props.$selected &&
  css`
    ${styles}
    ${hoverCss`${styles}`}
  `;

const disabledStyles = (props: ScInteractableProps) => {
  const styles = `
    opacity: 0.5;
    pointer-events: none;
  `;

  return css`
    ${props.$disabled && styles}
    &:disabled {
      ${styles}
    }
  `;
};

const borderStyles = (styles: StyleValues<ThemeProps<ThemeContextValue>>) => (props: ScInteractableProps) =>
  props.$border &&
  css`
    border-style: solid;
    border-width: ${staticTokenRule("border-width-default")};
    ${styles}
  `;

const ScInteractableBase = styled(CoreInteractive).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !["borderRadius"].includes(prop) || defaultValidatorFn(prop),
})<ScInteractableProps & BorderRadiusMixinProps>`
  ${getBorderRadiusStyles}
  display: block;
  width: 100%;

  /* Reset link styles from base */
  color: inherit;

  /* Link styles reset */
  &:hover {
    text-decoration: none;
  }

  /* Disabled */
  ${disabledStyles}

  /* User Selectable Text - Allows interactable text to be selected. This does not work in Safari. */
  ${(props) =>
    props.$userSelectableText && {
      userSelect: "text",
    }}
`;

export const ScInteractableDefault = styled(ScInteractableBase)<ScInteractableProps>`
  /* Reset link styles from base */
  &:hover {
    color: ${(props) => (props.$selected ? themeTokenRule("color-text-overlay") : "inherit")};
  }
  ${hoverStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-hover")};
  `)}
  ${focusStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-hover")};
  `)}
  ${activeStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-active")};
  `)}
  ${selectedStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-selected")};
    color: ${themeTokenRule("color-text-interactable-selected")};
  `)}
  ${borderStyles(css`
    border-color: ${themeTokenRule("color-border-base")};
  `)}
`;

export const ScInteractableOverlay = styled(ScInteractableBase)<ScInteractableProps>`
  /* Reset link styles from base */
  &:hover {
    color: ${(props) => (props.$selected ? themeTokenRule("color-text-base") : "inherit")};
  }
  ${hoverStyles(css`
    color: "inherit";
    background-color: ${themeTokenRule("color-background-interactable-overlay-hover")};
  `)}
  ${focusStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-overlay-hover")};
  `)}
  ${activeStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-overlay-active")};
  `)}
  ${selectedStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-overlay-selected")};
    color: ${themeTokenRule("color-text-interactable-overlay-selected")};
  `)}
  ${borderStyles(css`
    border-color: ${themeTokenRule("color-border-overlay")};
  `)}
`;

const ScInteractableAlert = styled(ScInteractableBase)<ScInteractableProps>`
  /* Reset link styles from base */
  color: ${themeTokenRule("color-text-alert")};
  &:hover {
    color: ${(props) =>
      props.$selected || props.$hoverForced
        ? themeTokenRule("color-text-interactable-inverted")
        : themeTokenRule("color-text-alert")};
  }

  ${hoverStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-destructive-hover")};
    color: ${themeTokenRule("color-text-interactable-inverted")};
  `)}
  ${focusStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-destructive-hover")};
    color: ${themeTokenRule("color-text-interactable-inverted")};
  `)}
  ${activeStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-destructive-active")};
    color: ${themeTokenRule("color-text-interactable-inverted")};
  `)}
  ${selectedStyles(css`
    background-color: ${themeTokenRule("color-background-interactable-destructive-active")};
    color: ${themeTokenRule("color-text-interactable-inverted")};
  `)}
  ${borderStyles(css`
    border-color: ${themeTokenRule("color-border-base")};
  `)}
`;

const renderInteractable = (type: InteractableTypeValue, { children, ...props }: InteractableProps) => {
  if (type === InteractableType.Overlay) {
    return <ScInteractableOverlay {...props}>{children}</ScInteractableOverlay>;
  }
  if (type === InteractableType.Alert) {
    return <ScInteractableAlert {...props}>{children}</ScInteractableAlert>;
  }
  // `Alpha` and `Inverted` are deprecated in favor of the `Default` type.
  return <ScInteractableDefault {...props}>{children}</ScInteractableDefault>;
};

const Interactable: ForwardRefRenderFunction<CoreInteractiveElement, InteractableProps> = (
  {
    border,
    borderRadius,
    children,
    disabled,
    hover,
    selected,
    selectableText,
    variant = InteractableType.Default,
    ...props
  },
  ref,
) => {
  const overlayContext = useContext(OverlayContext);

  const interactableProps = {
    borderRadius,
    children,
    className: "tw-interactable",
    $border: border,
    $disabled: disabled,
    $hoverForced: hover === true,
    $selected: selected,
    $userSelectableText: selectableText,
    ref,
    disabled,
    ...props,
  };

  return renderInteractable(overlayContext ? InteractableType.Overlay : variant, interactableProps);
};

Interactable.displayName = "Interactable";
const ComponentWithRef = forwardRef(Interactable);
export { ComponentWithRef as Interactable };
