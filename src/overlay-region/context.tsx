/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentType,
  createContext,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export type OverlayContextValue = boolean;

export const OverlayContext = createContext<OverlayContextValue>(false);

export interface OverlayContextBaseProps {
  overlay?: boolean;
}

export function withOverlayContext<P extends OverlayContextBaseProps, H>(
  WrappedComponent:
    | ComponentType<P>
    | ForwardRefExoticComponent<P & RefAttributes<H>>,
) {
  const Component = forwardRef<H, P>((props, ref) => (
    <OverlayContext.Consumer>
      {(value) => (
        <WrappedComponent
          {...props}
          overlay={props.overlay !== undefined ? props.overlay : value}
          ref={ref}
        />
      )}
    </OverlayContext.Consumer>
  ));

  Component.displayName = createDisplayName(WrappedComponent);

  return Component;
}

function createDisplayName<P>(component: ComponentType<P>): string {
  // Most components will have a name:
  if (component.displayName) {
    return component.displayName.replace(/Component$/, "");
  }
  if (component.name) {
    return component.name.replace(/Component$/, "");
  }

  // The result of React.forwardRef has the display name set further down on an object called `render`
  if ((component as any).render?.displayName) {
    return (component as any).render.displayName.replace(/Component$/, "");
  }
  if ((component as any).render?.name) {
    return (component as any).render.name.replace(/Component$/, "");
  }

  // Generic name if we couldn't find a better one:
  return "Component";
}
