import { Component } from "react";
import { AttachedBalloon, BalloonDirection } from "../../../../dialogs";
import { Layout } from "../../../../layout/layout";
import { TabItemProps } from "../tab-item";
import { TabMenuItem } from "../tab-menu-item";

export interface TabMenuProps {
  tabs: TabItemProps[];
}

export class TabMenu extends Component<TabMenuProps, {}> {
  public render() {
    return (
      <AttachedBalloon direction={BalloonDirection.BottomRight} show>
        <Layout padding={1}>
          {this.props.tabs.map((tab, index) => (
            <TabMenuItem {...tab} key={index} />
          ))}
        </Layout>
      </AttachedBalloon>
    );
  }
}
