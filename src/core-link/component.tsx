import {
  CoreInteractive,
  CoreInteractiveElement,
  CoreInteractivePublicProps,
} from "../core-interactive";
import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useContext,
} from "react";
import {
  cn,
  css,
  focusVisible,
  hoverCss,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { OverlayContext } from "../overlay-region/context";

export interface CoreLinkProps extends CoreInteractivePublicProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: CoreInteractivePublicProps["refHandler"];
  /**
   * @example Link Text
   */
  children?: ReactNode;
  className?: string;
  /**
   * Sets display variant type. Overlay for usage on images or masks; Inherit to inherit text color for default display.
   */
  variant?: CoreLinkType | "default" | "inherit" | "overlay"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  /**
   * Determines whether the link shows an underline.
   */
  underline?: boolean;
  /**
   * Determines whether the link shows an underline on hover.
   */
  hoverUnderlineNone?: boolean;
  /**
   * Text color to set on hover.
   */
  hoverColorInherit?: boolean;
}

export enum CoreLinkType {
  Default = "default",
  Inherit = "inherit",
  Overlay = "overlay",
}

interface ScCoreLinkProps {
  $button?: boolean;
  $disabled?: boolean;
  $hoverColorInherit?: boolean;
  $hoverUnderlineNone?: boolean;
  $inherit?: boolean;
  $overlay?: boolean;
  $underline?: boolean;
}

const ScCoreLink = styled(CoreInteractive)<ScCoreLinkProps>`
  text-decoration: ${(props) =>
    props.$overlay || props.$underline ? "underline" : "none"};

  color: ${({ $inherit, $overlay }) =>
    $inherit
      ? "inherit"
      : $overlay
      ? themeTokenRule("color-text-overlay-link")
      : themeTokenRule("color-text-link")};

  &:visited {
    color: ${({ $inherit, $overlay }) =>
      $inherit
        ? "inherit"
        : $overlay
        ? themeTokenRule("color-text-overlay-link-visited")
        : themeTokenRule("color-text-link-visited")};
  }

  &:active {
    outline: ${({ $button }) => ($button ? "none" : undefined)};
    color: ${({ $overlay }) =>
      $overlay
        ? themeTokenRule("color-text-overlay-link-active")
        : themeTokenRule("color-text-link-active")};
  }

  ${focusVisible`
    color: ${({ $hoverColorInherit, $inherit, $overlay }) =>
      $hoverColorInherit
        ? "inherit"
        : $inherit
        ? themeTokenRule("color-text-link-focus")
        : $overlay
        ? themeTokenRule("color-text-overlay-link-focus")
        : themeTokenRule("color-text-link-focus")};
  `}


  ${(props) =>
    !props.$disabled &&
    hoverCss`
      text-decoration: ${({ $hoverUnderlineNone }) =>
        $hoverUnderlineNone ? "none" : "underline"};
      color: ${({ $hoverColorInherit, $overlay }) =>
        $hoverColorInherit
          ? "inherit"
          : $overlay
          ? themeTokenRule("color-text-overlay-link-hover")
          : themeTokenRule("color-text-link-hover")};
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      &:hover {
        cursor: not-allowed;
      }
    `}
`;

const CoreLink: ForwardRefRenderFunction<
  CoreInteractiveElement,
  CoreLinkProps
> = (
  {
    className,
    disabled,
    underline,
    variant,
    hoverUnderlineNone,
    hoverColorInherit,
    ...props
  },
  ref,
) => {
  const overlayContext = useContext(OverlayContext);
  const styledProps = {
    $button: !props.linkTo,
    $disabled: disabled,
    $hoverColorInherit: hoverColorInherit,
    $hoverUnderlineNone: hoverUnderlineNone,
    $inherit: variant === CoreLinkType.Inherit,
    $overlay: variant === CoreLinkType.Overlay || overlayContext,
    $underline: underline,
  };

  return (
    <ScCoreLink
      {...props}
      {...styledProps}
      disabled={disabled}
      ref={ref}
      className={cn("tw-link", className)}
    >
      {props.children}
    </ScCoreLink>
  );
};

CoreLink.displayName = "CoreLink";
const ComponentWithRef = forwardRef(CoreLink);
export { ComponentWithRef as CoreLink };
