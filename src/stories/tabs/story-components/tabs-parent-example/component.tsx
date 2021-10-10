import * as React from "react";

import { Component, MouseEvent } from "react";
import { Tabs, TabsProps } from "v2";

interface State {
  activeIndex: number;
}

/**
 * The parent component must manage the currently active tab and pass it as a prop.
 * This is an example implementation of the parent.
 */
export class TabsParentExample extends Component<TabsProps, State> {
  public state = {
    activeIndex: 0,
  };

  public render() {
    const props = {
      ...this.props,
      tabs: this.props.tabs.map((tab) => ({ ...tab, onClick: this.onClick })),
    };
    return <Tabs {...props} activeTabIndex={this.state.activeIndex} />;
  }

  private onClick = (e: MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    this.setState({
      activeIndex: index,
    });
  };
}
