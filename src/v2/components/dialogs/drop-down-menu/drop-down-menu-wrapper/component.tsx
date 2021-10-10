import {
  Background,
  Display,
  Elevation,
  FlexDirection,
  InjectLayout,
  Layout,
  Overflow,
} from "../../../layout";
import { BalloonSize, BalloonWrapper } from "../../balloon/balloon-wrapper";
import { Component, ReactNode } from "react";
import {
  DropDownMenuInputItem,
  DropDownMenuInputItemProps,
} from "../drop-down-menu-input-item";
import {
  DropDownMenuItem,
  DropDownMenuItemProps,
} from "../drop-down-menu-item";
import { getAriaProps, getDataProps } from "lib/ui-utils";

export type DropDownMenuList = Array<
  DropDownMenuInputItemProps | DropDownMenuItemProps
>;

export interface DropDownMenuWrapperProps {
  /**
   * An optional array of `DropDownMenu` items (link, inputs, etc.) that is
   * rendered before any `children`.
   *
   * @example [ { title: 'About', linkTo: '#' } ]
   */
  items?: DropDownMenuList;
  elevation?: Elevation;
  /**
   * Sets a maximum height to the menu using CSS units (`rem` is preferred).
   * Contents will scroll if taller than the maximum height.
   *
   * @example 20rem
   */
  maxHeight?: string;
  size?: BalloonSize | "auto" | "xs" | "sm" | "md" | "lg" | "xl"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
  children?: ReactNode;
  background?: Background;
  /**
   * Adds overlay compatability to `DropDownMenu` through `Balloon`.
   */
  overlay?: boolean;
}

export class DropDownMenuWrapper extends Component<
  DropDownMenuWrapperProps,
  {}
> {
  public render() {
    const menuItems: JSX.Element[] = [];

    if (this.props.items) {
      this.props.items.map((item, index) => {
        if (isDropDownMenuInputItem(item)) {
          menuItems.push(<DropDownMenuInputItem {...item} key={index} />);
        } else {
          menuItems.push(<DropDownMenuItem key={index} {...item} />);
        }
      });
    }

    return (
      <BalloonWrapper
        elevation={this.props.elevation}
        size={this.props.size ? this.props.size : BalloonSize.Small}
        background={this.props.background}
        overlay={this.props.overlay}
      >
        <InjectLayout
          display={Display.Flex}
          flexDirection={FlexDirection.Column}
        >
          <div style={{ maxHeight: this.props.maxHeight }}>
            <Layout
              overflow={Overflow.Auto}
              padding={1}
              {...getDataProps(this.props)}
              {...getAriaProps(this.props)}
            >
              {menuItems}
              {this.props.children}
            </Layout>
          </div>
        </InjectLayout>
      </BalloonWrapper>
    );
  }
}

function isDropDownMenuInputItem(
  arg: DropDownMenuInputItemProps | DropDownMenuItemProps,
): arg is DropDownMenuInputItemProps {
  return !!(arg as DropDownMenuInputItemProps).type;
}
