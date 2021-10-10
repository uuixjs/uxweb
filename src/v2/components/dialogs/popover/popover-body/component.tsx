import { Component, ReactNode } from "react";
import { InjectLayout, Overflow } from "../../../layout";
import { PaddingValue, getAriaProps, getDataProps } from "lib";

export interface PopoverBodyProps {
  /** This ID attribute must be the same for all elements for a given popover in order to set the correct aria attribute values. In other words, a Popover, PopoverHeader and PopoverBody should each receive the same string. */
  popoverId: string;
  children?: ReactNode;
  padding?: PaddingValue;
}

export class PopoverBody extends Component<PopoverBodyProps, {}> {
  public static defaultProps: Partial<PopoverBodyProps> = {
    padding: 1,
  };

  public render() {
    return (
      <InjectLayout
        {...getDataProps(this.props)}
        {...getAriaProps(this.props)}
        overflow={Overflow.Auto}
        padding={this.props.padding}
        flexGrow={1}
      >
        <div id={`${this.props.popoverId}-body`}>{this.props.children}</div>
      </InjectLayout>
    );
  }
}
