import { Component, ReactNode } from "react";
import { Layout, Overflow } from "../../layout";
import { Padding, getAriaProps } from "lib";

export interface ModalBodyProps {
  children?: ReactNode;
  padding?: Padding;
}

export class ModalBody extends Component<ModalBodyProps, {}> {
  public static defaultProps: Partial<ModalBodyProps> = {
    padding: { x: 3, y: 2 },
  };
  public render() {
    return (
      <Layout
        overflow={Overflow.Auto}
        padding={this.props.padding}
        flexGrow={1}
        {...getAriaProps(this.props)}
      >
        {this.props.children}
      </Layout>
    );
  }
}
