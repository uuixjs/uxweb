import * as React from "react";

import {
  AlignItems,
  AnimatedTitle,
  Button,
  ButtonType,
  Color,
  CoreText,
  Display,
  FontSize,
  Layout,
  TextType,
} from "v2";

import { Component } from "react";

export default { title: "AnimatedTitle" };

export const examples = () => (
  <>
    <AnimatedTitleDemo>League of Legends</AnimatedTitleDemo>
    <AnimatedTitleDemo>Grand Theft Auto V</AnimatedTitleDemo>
    <AnimatedTitleDemo>Overwatch</AnimatedTitleDemo>
    <AnimatedTitleDemo>Bem-vindo à sala de chat!</AnimatedTitleDemo>
    <AnimatedTitleDemo>節奏與音樂遊戲</AnimatedTitleDemo>
    <AnimatedTitleDemo>Canales en vivo</AnimatedTitleDemo>
    <AnimatedTitleDemo>Comprar Bits</AnimatedTitleDemo>
    <AnimatedTitleDemo>หมวดหมู่ถ่ายทอดสด</AnimatedTitleDemo>
    <AnimatedTitleDemo>
      Ninja sta facendo Squad Streaming con CouRageJD, cloakzy
    </AnimatedTitleDemo>
  </>
);

interface Props {
  children: string;
}

interface State {
  show: boolean;
}

class AnimatedTitleDemo extends Component<Props, State> {
  public state: State = {
    show: true,
  };

  public render() {
    return (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        fullWidth
        margin={{ bottom: 5 }}
      >
        <Layout flexGrow={0} padding={{ right: 2 }}>
          <Button onClick={this.replay} variant={ButtonType.Secondary}>
            Replay
          </Button>
        </Layout>
        <Layout flexGrow={1}>
          {(this.state.show && (
            <CoreText
              type={TextType.H3}
              fontSize={FontSize.Size2}
              color={Color.Alt2}
            >
              <AnimatedTitle>{this.props.children}</AnimatedTitle>
            </CoreText>
          )) || (
            <div style={{ opacity: 0 }}>
              <CoreText
                type={TextType.H3}
                fontSize={FontSize.Size2}
                color={Color.Alt2}
              >
                {this.props.children}
              </CoreText>
            </div>
          )}
        </Layout>
      </Layout>
    );
  }

  private replay = () => {
    this.setState(
      {
        show: false,
      },
      () => {
        setTimeout(() => {
          this.setState({
            show: true,
          });
        }, 500);
      },
    );
  };
}
