import "./styles.scss";

import * as React from "react";

import {
  AlignItems,
  Background,
  CoreImage,
  Display,
  InjectLayout,
  Layout,
  Overflow,
  OverlayRegion,
  Position,
  Radio,
  TransitionGroup,
  TransitionType,
  ZIndex,
} from "v2";
import { Component, FormEvent } from "react";
import { Padding, cn, newUUIDv4 } from "@uuixjs/uuixweb-lib";

import { ExampleThumbnails } from "../../assets";

export enum ExampleBG {
  Off = "non-overlay",
  Photo1 = "photo-1",
  Photo2 = "photo-2",
  Video = "video",
  Black = "black",
  White = "white",
}

interface Props {
  defaultBg?: ExampleBG;
  blur?: boolean;
  padding?: Padding;
}

interface State {
  bg: ExampleBG;
}

export class OverlayPreview extends Component<Props, State> {
  public static defaultProps = {
    padding: 2,
    blur: true,
  };

  private uid = newUUIDv4();

  public constructor(props: Props) {
    super(props);
    this.state = {
      bg: props.defaultBg || ExampleBG.Black,
    };
  }

  public render() {
    const overlay = this.state.bg !== ExampleBG.Off;

    return (
      <Layout>
        <Layout display={Display.Flex} padding={1}>
          {Object.keys(ExampleBG).map((k, i) => (
            <Layout key={k} padding={{ left: i > 0 ? 1 : 0 }}>
              <Radio
                name={`overlay-preview-${this.uid}`}
                label={k}
                value={ExampleBG[k as keyof typeof ExampleBG]}
                onChange={this.onRadioSelected}
                checked={
                  this.state.bg === ExampleBG[k as keyof typeof ExampleBG]
                }
              />
            </Layout>
          ))}
        </Layout>

        <OverlayRegion overlay={overlay}>
          <Layout
            className="overlay-preview__container"
            position={Position.Relative}
            background={overlay ? Background.Overlay : undefined}
            padding={this.props.padding}
          >
            {this.renderBackground()}
            <Layout zIndex={ZIndex.Above} position={Position.Relative}>
              {this.props.children}
            </Layout>
          </Layout>
        </OverlayRegion>
      </Layout>
    );
  }

  private renderBackground() {
    let element;
    if (this.state.bg === ExampleBG.Photo1) {
      element = <CoreImage src={ExampleThumbnails.stream1} alt="" />;
    }

    if (this.state.bg === ExampleBG.Photo2) {
      element = <CoreImage src={ExampleThumbnails.stream2} alt="" />;
    }

    if (this.state.bg === ExampleBG.Video) {
      element = (
        <video
          src="https://d3hmvhl7ru3t12.cloudfront.net/video/pages/home/header-82b9abce067992beedde6d103b6241d616a7ee97cc0d4f3126277098c2e4b09004325f25c6a245656096bd333c880b0032e2cbdbed9d2514220e20718482e95b.mp4"
          autoPlay
          muted
          loop
        />
      );
    }

    if (this.state.bg === ExampleBG.Black) {
      element = <div style={{ background: "#000" }} />;
    }

    if (this.state.bg === ExampleBG.White) {
      element = <div style={{ background: "#FFF" }} />;
    }

    return (
      <InjectLayout
        display={Display.Flex}
        alignItems={AlignItems.Stretch}
        attachTop
        attachLeft
        attachBottom
        attachRight
        overflow={Overflow.Hidden}
      >
        <TransitionGroup
          className="overlay-preview__transition-group-container"
          transitionType={TransitionType.Fade}
        >
          {element ? (
            <InjectLayout
              className={cn({
                ["overlay-preview__bg-element"]: true,
                ["overlay-preview__bg-element--blur"]: this.props.blur,
              })}
              key={this.state.bg}
              position={Position.Absolute}
              attachTop
              attachLeft
              attachBottom
              attachRight
              fullWidth
              fullHeight
            >
              {element}
            </InjectLayout>
          ) : (
            []
          )}
        </TransitionGroup>
      </InjectLayout>
    );
  }

  private onRadioSelected = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      this.setState({
        bg: e.currentTarget.value as ExampleBG,
      });
    }
  };
}
