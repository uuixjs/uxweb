import { AlignItems, Display, JustifyContent, Layout } from "../../../layout";
import { BorderRadius, getAriaProps, getDataProps } from "lib/ui-utils";
import { Button, ButtonProps, ButtonType } from "../../../button/button";

import { Component } from "react";

export interface PopoverFooterProps {
  primaryButtonProps: ButtonProps;
  secondaryButtonProps?: ButtonProps;
}

export class PopoverFooter extends Component<PopoverFooterProps> {
  public render() {
    return (
      <Layout
        {...getDataProps(this.props)}
        {...getAriaProps(this.props)}
        padding={1}
        display={Display.Flex}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.End}
        borderRadius={{
          bottomLeft: BorderRadius.Medium,
          bottomRight: BorderRadius.Medium,
        }}
      >
        {this.props.secondaryButtonProps && (
          <Layout padding={{ right: 1 }}>
            <Button
              variant={ButtonType.Secondary}
              {...this.props.secondaryButtonProps}
            />
          </Layout>
        )}
        <Button
          variant={ButtonType.Primary}
          {...this.props.primaryButtonProps}
        />
      </Layout>
    );
  }
}
