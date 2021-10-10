import {
  AlignItems,
  Display,
  FlexDirection,
  JustifyContent,
  Layout,
  LayoutProps,
} from "../../layout";
import { Button, ButtonProps, ButtonType } from "../../button/button";
import { Padding, getAriaProps } from "lib/ui-utils";

import { Component } from "react";
import { ModalSize } from "../modal-wrapper";

export interface ModalFooterProps {
  primaryButtonProps: ButtonProps;
  secondaryButtonProps?: ButtonProps;
  size?: ModalSize;
  padding?: Padding;
}

export class ModalFooter extends Component<ModalFooterProps> {
  public static defaultProps: Partial<ModalFooterProps> = {
    padding: { x: 3, y: 2 },
  };
  public render() {
    const buttonStyle: LayoutProps =
      this.props.size === ModalSize.Small
        ? {
            fullWidth: true,
            flexGrow: 1,
            flexShrink: 1,
          }
        : {};
    return (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Start}
        flexDirection={FlexDirection.RowReverse}
        padding={this.props.padding}
        width="100%"
        {...getAriaProps(this.props)}
      >
        <Layout {...buttonStyle}>
          <Button
            variant={ButtonType.Primary}
            fullWidth
            {...this.props.primaryButtonProps}
          />
        </Layout>
        {this.props.secondaryButtonProps && (
          <Layout padding={{ right: 1 }} {...buttonStyle}>
            <Button
              variant={ButtonType.Secondary}
              fullWidth
              {...this.props.secondaryButtonProps}
            />
          </Layout>
        )}
      </Layout>
    );
  }
}
