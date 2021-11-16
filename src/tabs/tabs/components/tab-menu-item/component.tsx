import { BorderRadius, getAriaProps } from "lib";
import { Component, MouseEvent } from "react";
import { Interactable, InteractableType } from "../../../../interactable";

import { CoreText } from "../../../../core-text";
import { Layout } from "../../../../layout";
import { TabItemProps } from "../tab-item";

export interface TabMenuItemProps extends TabItemProps {}

export class TabMenuItem extends Component<TabMenuItemProps, {}> {
  public render() {
    let labelOne: string | undefined;
    let labelTwo: string | undefined;

    if (typeof this.props.label === "string") {
      labelOne = this.props.label;
    } else if (typeof this.props.label === "object") {
      labelOne = this.props.label[0];
      labelTwo = this.props.label[1];
    }

    return (
      <Interactable
        variant={InteractableType.Inverted}
        linkTo={this.props.linkTo}
        onClick={this.handleClick}
        disabled={this.props.disabled}
        renderLink={this.props.renderLink}
        tabIndex={this.props.tabIndex}
        targetBlank={this.props.targetBlank}
        borderRadius={BorderRadius.Medium}
        {...getAriaProps(this.props)}
      >
        <Layout padding={{ x: 1, y: 0.5 }}>
          <CoreText bold={!!labelTwo}>{labelOne}</CoreText>
          {labelTwo && <CoreText>{labelTwo}</CoreText>}
          {this.props.children}
        </Layout>
      </Interactable>
    );
  }

  private handleClick = (e: MouseEvent<HTMLElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e, this.props.originalIndex);
    }
  };
}
