import { Component, ReactNode } from "react";
import { SVGAsset } from "../../svg";

export interface VerticalNavigationGroupProps {
  /**
   * Explicitly control the open state of this group
   */
  open?: boolean;
  /**
   * `VerticalNavigationItem`s to render as a collapsible group.
   */
  children: ReactNode;
  /**
   * The label of this group's header
   */
  label: string;
  /**
   * The icon of this group's header
   */
  iconAsset?: SVGAsset;
  /**
   * Callback called when this group should open
   */
  onOpen: () => void;
  /**
   * Callback called when this group should close
   */
  onClose: () => void;
}

export class VerticalNavigationGroup extends Component<
  VerticalNavigationGroupProps
> {
  public render() {
    // `VerticalNavigationGroup`s are a marker that VerticalNavigation uses, and don't have any
    // behavior of their own
    return null;
  }
}
