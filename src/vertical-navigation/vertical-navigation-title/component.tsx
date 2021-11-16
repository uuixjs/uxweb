import { Component, ReactNode } from "react";
import { Layout } from "../../layout/layout";
import { Title, TitleSize } from "../../title";

export interface VerticalNavigationTitleProps {
  /**
   * A top-level title for `VerticalNavigation`. Usually a string, but
   * can be any React node.
   *
   * @example Core UI
   */
  children: ReactNode;
}

export class VerticalNavigationTitle extends Component<
  VerticalNavigationTitleProps
> {
  public render() {
    return (
      <Layout borderBottom padding={1}>
        <Title size={TitleSize.Small}>{this.props.children}</Title>
      </Layout>
    );
  }
}
