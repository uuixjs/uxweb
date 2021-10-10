import { Component } from "react";
import { Color, Layout, LayoutProps } from "../layout";
import { OverlayContext } from "./context";

export interface OverlayRegionProps {
  /**
   * Indicates that the foreground (text, form inputs) will always need to visible in front of any dark background
   */
  overlay?: boolean;
}

export class OverlayRegion extends Component<OverlayRegionProps> {
  public static defaultProps = {
    overlay: true,
  };

  public render() {
    const layout: LayoutProps = {};

    if (this.props.overlay) {
      layout.color = Color.Overlay;
    } else {
      layout.color = Color.Base;
    }

    return (
      <OverlayContext.Provider value={!!this.props.overlay}>
        <Layout {...layout}>{this.props.children}</Layout>
      </OverlayContext.Provider>
    );
  }
}
