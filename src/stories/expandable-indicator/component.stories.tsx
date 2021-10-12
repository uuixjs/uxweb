import * as React from "react";

import {
  CoreInteractive,
  CoreText,
  ExpandableIndicator,
  ExpandableIndicatorDirection,
  Layout,
} from "v2";

import { Component } from "react";

export default { title: ExpandableIndicator.displayName };

export const examples = () => <ExpandableIndicatorPage />;

type State = {
  open: boolean;
};

class ExpandableIndicatorPage extends Component<{}, State> {
  public state = {
    open: false,
  };

  public render() {
    return (
      <Layout margin={{ bottom: 2 }} fullWidth>
        <Layout>
          <Layout>
            <CoreText>{this.state.open ? "open" : "closed"}</CoreText>

            <CoreInteractive onClick={this.toggle}>
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Down}
                closedDirection={ExpandableIndicatorDirection.Up}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Up}
                closedDirection={ExpandableIndicatorDirection.Down}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Right}
                closedDirection={ExpandableIndicatorDirection.Left}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Left}
                closedDirection={ExpandableIndicatorDirection.Right}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Up}
                closedDirection={ExpandableIndicatorDirection.Right}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Up}
                closedDirection={ExpandableIndicatorDirection.Left}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Down}
                closedDirection={ExpandableIndicatorDirection.Right}
              />
              <ExpandableIndicator
                open={this.state.open}
                openDirection={ExpandableIndicatorDirection.Down}
                closedDirection={ExpandableIndicatorDirection.Left}
              />
            </CoreInteractive>
          </Layout>

          <Layout>
            <ExpandableIndicator
              open
              openDirection={ExpandableIndicatorDirection.Down}
            />
            <ExpandableIndicator
              open
              openDirection={ExpandableIndicatorDirection.Up}
            />
            <ExpandableIndicator
              open
              openDirection={ExpandableIndicatorDirection.Left}
            />
            <ExpandableIndicator
              open
              openDirection={ExpandableIndicatorDirection.Right}
            />
            <ExpandableIndicator
              closedDirection={ExpandableIndicatorDirection.Down}
            />
            <ExpandableIndicator
              closedDirection={ExpandableIndicatorDirection.Up}
            />
            <ExpandableIndicator
              closedDirection={ExpandableIndicatorDirection.Left}
            />
            <ExpandableIndicator
              closedDirection={ExpandableIndicatorDirection.Right}
            />
          </Layout>
        </Layout>
      </Layout>
    );
  }

  private toggle = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };
}
