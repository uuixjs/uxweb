import { Component, ReactNode } from "react";
import { Header } from "../../header";
import { Layout } from "../../layout/layout";

export interface VerticalNavigationSubHeaderProps {
  /**
   * A second-level title for `VerticalNavigation`. Usually a string, but
   * can be any React node.
   *
   * @example Patterns
   */
  children: ReactNode;
}

export class VerticalNavigationSubHeader extends Component<
  VerticalNavigationSubHeaderProps
> {
  public render() {
    return (
      <Layout padding={{ top: 1, right: 0.5, bottom: 1, left: 1 }}>
        <Header>{this.props.children}</Header>
      </Layout>
    );
  }
}
