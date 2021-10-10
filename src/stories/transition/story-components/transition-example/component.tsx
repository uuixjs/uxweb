import * as React from "react";

import {
  Background,
  Color,
  CoreText,
  Display,
  Layout,
  Overflow,
  TextType,
  Toggle,
  Transition,
  TransitionProps,
  TransitionTypeOption,
} from "v2";

import { Component } from "react";

interface Props {
  isOpen?: boolean;
  type: TransitionTypeOption;
  duration?: TransitionProps["duration"];
  delay?: TransitionProps["delay"];
  onUserInteraction: () => void;
  showOverflow?: boolean;
  alwaysRenderChild?: boolean;
}

interface State {
  isOpen: boolean;
}

export class TransitionExample extends Component<Props, State> {
  public static getDerivedStateFromProps(props: Props, _: State) {
    if (props.isOpen !== undefined) {
      return {
        isOpen: props.isOpen,
      };
    }

    return null;
  }

  public state: State = {
    isOpen: false,
  };

  public render() {
    const overflow = this.props.showOverflow
      ? Overflow.Visible
      : Overflow.Hidden;
    return (
      <Layout
        display={Display.InlineBlock}
        padding={2}
        margin={{ right: 2, top: 2 }}
        border
        background={Background.Alt}
        overflow={overflow}
      >
        <Layout margin={{ bottom: 2 }}>
          <Toggle checked={this.state.isOpen} onChange={this.toggle} />
        </Layout>

        <div
          style={{
            display: "inline-block",
            border: "2px dashed lightgray",
            overflow: this.props.showOverflow ? "" : "hidden",
          }}
        >
          <Transition
            show={this.state.isOpen}
            type={this.props.type}
            duration={this.props.duration}
            delay={this.props.delay}
            alwaysRenderChild={this.props.alwaysRenderChild}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "220px",
                height: "220px",
                background: "green",
                color: "rgba(255,255,255,0.9)",
                fontSize: "2rem",
                border: "5px solid darkgreen",
              }}
            >
              Example
            </div>
          </Transition>
        </div>

        <Layout margin={{ top: 1 }}>
          <CoreText color={Color.Alt2} type={TextType.Span}>
            {JSON.stringify(this.props.type)}
          </CoreText>
        </Layout>
      </Layout>
    );
  }

  private toggle = () => {
    this.props.onUserInteraction();
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };
}
