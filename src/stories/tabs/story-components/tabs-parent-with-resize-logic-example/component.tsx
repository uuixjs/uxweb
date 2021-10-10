import * as React from "react";

import {
  Button,
  CoreText,
  Display,
  Layout,
  Tabs,
  TabsProps,
  TabsResizeHandler,
} from "v2";
import { Component, MouseEvent } from "react";

interface State {
  activeIndex: number;
}

export class TabsParentWithResizeLogicExample extends Component<
  TabsProps,
  State
> {
  public state = {
    activeIndex: 0,
  };

  private doResize: TabsResizeHandler | undefined;

  public render() {
    const props = {
      ...this.props,
      tabs: this.props.tabs.map((tab) => ({ ...tab, onClick: this.onClick })),
    };
    return (
      <Layout padding={{ y: 3 }}>
        <CoreText>
          The example below shows a custom implementation which will only
          re-measure when you click these buttons. To test, re-size the window
          and you should not see items get re-arranged. Click the buttons and
          see that they should be correctly updated.
        </CoreText>
        <Layout padding={{ y: 2 }}>
          <Tabs
            {...props}
            activeTabIndex={this.state.activeIndex}
            setupResizeHandler={this.setupResizeHandler}
          />
        </Layout>
        <Layout margin={1} display={Display.InlineBlock}>
          <Button onClick={this.doQuickResize}>Do quick resize</Button>
        </Layout>
        <Layout margin={1} display={Display.InlineBlock}>
          <Button onClick={this.doFullResize}>
            Do expensive resize with measurements
          </Button>
        </Layout>
      </Layout>
    );
  }

  private setupResizeHandler = (callback: TabsResizeHandler) => {
    this.doResize = callback;
  };

  private doQuickResize = () => {
    if (this.doResize) {
      this.doResize();
    }
  };

  private doFullResize = () => {
    if (this.doResize) {
      this.doResize(true);
    }
  };

  private onClick = (e: MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    this.setState({
      activeIndex: index,
    });
  };
}
