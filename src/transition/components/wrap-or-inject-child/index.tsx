import {
  Children,
  DetailedHTMLProps,
  HTMLAttributes,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import { cn } from "@uuixjs/uuixweb-lib";

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface WrapOrInjectChildProps {
  injectChild?: boolean;
}

/**
 * Wraps children in a `<div>`, unless configured via a prop to
 * inject all props onto the child node.
 */
export const WrapOrInjectChild = forwardRef<
  HTMLDivElement,
  WrapOrInjectChildProps & DivProps
>(({ injectChild, ...props }, forwardedRef) => {
  if (injectChild && isValidElement(props.children)) {
    const child = Children.only(props.children);

    const childProps = {
      ...props,
      ...child.props,
      className: cn(props.className, child.props.className),
    };

    // Avoid overridding child props ref unless one is provided to the wrapper
    if (forwardedRef) {
      childProps.ref = forwardedRef;
    }

    return cloneElement(child, childProps);
  }

  return (
    <div ref={forwardedRef} className={props.className} {...props}>
      {props.children}
    </div>
  );
});

WrapOrInjectChild.displayName = "WrapOrInjectChild";
