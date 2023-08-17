import * as history from "history";

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  FocusEventHandler,
  ForwardRefRenderFunction,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
} from "react";
import {
  ensureSafeLink,
  isExternalURL,
  isMailToLink,
} from "../_utils/url-props";

import { ARIARole } from "aria-query";
import { DataTestSelectorProps } from "@uuixjs/uuixweb-lib";
import { LinkProps as RRLinkProps } from "react-router-dom";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type LinkProps = AnchorProps | RRLinkProps;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type CoreInteractiveRenderLinkBaseProps = AnchorProps &
  Pick<CoreInteractivePublicProps, "linkTo">;

export type CoreInteractiveElement = HTMLAnchorElement | HTMLButtonElement;

export type CoreMouseEventHandlers<T = CoreInteractiveElement> = {
  /** Event called when the element is clicked. */
  onClick?: MouseEventHandler<T>;
  /** Event called when the user attempts to open a context menu. */
  onContextMenu?: MouseEventHandler<T>;
  /** Event called when when a pointing device button (e.g., a mouse's primary button) is double-clicked */
  onDoubleClick?: MouseEventHandler<T>;
  /** Event called when a pointing device (usually a mouse) is moved over the element. */
  onMouseEnter?: MouseEventHandler<T>;
  /** Event called when a pointing device (usually a mouse) is moved off the element. */
  onMouseLeave?: MouseEventHandler<T>;
};

export type CoreFocusEventHandlers<T = CoreInteractiveElement> = {
  /** Event called when the element loses focus. */
  onBlur?: FocusEventHandler<T>;
  /** Event called when the element gains focus. */
  onFocus?: FocusEventHandler<T>;
};

/**
 * CoreInteractivePublicProps is what enclosing classes should extend in order
 * to have the full compliment of props for passing through to the
 * CoreInteractive component.
 */
export interface CoreInteractivePublicProps
  extends CoreMouseEventHandlers,
    CoreFocusEventHandlers,
    DataTestSelectorProps {
  /**
   * Optional label for screen readers and assistive devices.
   */
  "aria-label"?: string;
  /**
   * If the element is a button, autofocus it when it is first rendered.
   */
  autoFocus?: boolean;
  /** Sets the element as disabled, always renders as a button. */
  disabled?: boolean;
  /** Sets the element as disabled but with no visual change, always renders as a button. */
  disabledInteraction?: boolean;
  /**
   * Sets the `download` attribute on the element. If the `linkTo` prop is set,
   * the resource will be downloaded instead of being navigated to.
   */
  download?: boolean | string;
  /** Indicates the element is a link and will navigate to the passed URL. */
  linkTo?: history.LocationDescriptor;
  /** Provides a [ref callback](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) */
  refHandler?: Ref<CoreInteractiveElement>;
  /** If the element is a link, set the value of the rel attribute */
  rel?: string;
  /** Render prop to allow for using react-router alternatives @experimental */
  renderLink?: <P extends CoreInteractiveRenderLinkBaseProps>(
    props: P
  ) => ReactNode;
  /** Replace the current entry in the history stack instead of adding a new one. */
  replace?: boolean;
  role?: ARIARole;
  /** Manually set the `tabIndex` of this element. */
  tabIndex?: number;
  /** If the element is a link, open it in a new tab. */
  targetBlank?: boolean;
  /** The elements title */
  title?: string;
}

/**
 * CoreInteractiveProps extends CoreInteractiveLinkProps, and enclosing
 * components should generate the things like className, refHandler, etc
 * internally and pass them down
 */
export interface CoreInteractiveProps extends CoreInteractivePublicProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: CoreInteractivePublicProps["refHandler"];
  className?: string;
  /**
   * The content rendered within the element.
   */
  children?: ReactNode;
}

const CoreInteractive: ForwardRefRenderFunction<
  CoreInteractiveElement,
  CoreInteractiveProps
> = (
  {
    disabled,
    // This prop does actually do something different from `disabled`, but the
    // effect is in parents like CoreButton.
    disabledInteraction,
    download,
    linkTo,
    refHandler,
    rel,
    renderLink,
    targetBlank,
    ...props
  },
  ref
) => {
  const elementRef = ref || refHandler;
  const elementProps: LinkProps | ButtonProps = props;

  // Coalesce `false` to `undefined` to prevent `disabled={false}`
  const isDisabled = disabled || disabledInteraction || undefined;

  // links
  if (linkTo && !isDisabled) {
    const anchorRef = elementRef as Ref<HTMLAnchorElement>;

    // add anchor-specific props
    const anchorProps = elementProps as LinkProps;
    if (download) {
      anchorProps.download = download;
    }
    if (rel || targetBlank) {
      anchorProps.rel = targetBlank
        ? `${rel ? rel + " " : ""}noopener noreferrer`
        : rel;
    }
    if (targetBlank) {
      anchorProps.target = "_blank";
    }

    // external link
    // if (isExternalURL(linkTo) || isMailToLink(linkTo)) {
    let href: string;
    if (typeof linkTo === "string") {
      href = linkTo;
    } else {
      // Implication: typeof props.linkTo === LocationDescriptorObject. The 'state' properties of this type cannot be included in an anchor tag.
      // We render the provided 'pathname' (which is actually a fully-qualifed URL in this case) into the anchor tag as an attempt at a gracefull fallback.
      href = (linkTo && linkTo.pathname) || "";

      // eslint-disable-next-line no-console
      console.warn(
        "External links and mailto links with LocationDescriptorObjects are not supported! Pass a string instead."
      );
    }

    // internal custom link using linkTo prop
    if (renderLink) {
      return renderLink({
        ...anchorProps,
        ref: anchorRef,
        linkTo: ensureSafeLink(linkTo),
      }) as ReactElement;
    }

    return <a {...anchorProps} href={ensureSafeLink(href)} ref={anchorRef} />;
    // }

    // internal default link
    // return (
    //   <Link {...anchorProps} to={ensureSafeLink(linkTo)} innerRef={anchorRef} />
    // );
  }

  // non-link or disabled
  return (
    <button
      {...(elementProps as ButtonProps)}
      disabled={isDisabled}
      ref={elementRef as Ref<HTMLButtonElement>}
    />
  );
};

CoreInteractive.displayName = "CoreInteractive";
const ComponentWithRef = forwardRef(CoreInteractive);
export { ComponentWithRef as CoreInteractive };
