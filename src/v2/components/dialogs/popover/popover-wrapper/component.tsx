import {
  Background,
  Display,
  Elevation,
  FlexDirection,
  InjectLayout,
} from "../../../layout";
import { BalloonSize, BalloonWrapper } from "../../balloon/balloon-wrapper";
import { Component, ReactNode } from "react";
import { getAriaProps, getDataProps } from "lib";

export interface PopoverWrapperProps {
  /** This ID attribute must be the same for all elements for a given popover in order to set the correct aria attribute values. In other words, a Popover, PopoverHeader and PopoverBody should each receive the same string. */
  popoverId: string;
  elevation?: Elevation;
  /**
   * Sets a maximum height to the menu using CSS units (`rem` is preferred).
   * Contents will scroll if taller than the maximum height.
   *
   * @example 20rem
   */
  maxHeight?: string;
  size?: BalloonSize;
  children?: ReactNode;
  background?: Background;
  /** Render without positioning instead of absolute. This is a temporary prop to ease migration toward a future change to this component. */
  inline?: boolean;
}

export class PopoverWrapper extends Component<PopoverWrapperProps, {}> {
  public render() {
    return (
      <BalloonWrapper
        {...getDataProps(this.props)}
        {...getAriaProps(this.props)}
        elevation={this.props.elevation}
        size={this.props.size ? this.props.size : BalloonSize.Large}
        background={this.props.background}
      >
        <InjectLayout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
          role="dialog"
          aria-labelledby={`${this.props.popoverId}-header`}
          aria-describedby={`${this.props.popoverId}-body`}
        >
          <div style={{ maxHeight: this.props.maxHeight }}>
            {this.props.children}
          </div>
        </InjectLayout>
      </BalloonWrapper>
    );
  }
}
