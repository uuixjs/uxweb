import * as React from "react";

import { Component, FormEvent } from "react";
import {
  CoreText,
  Display,
  FormGroup,
  JustifyContent,
  Layout,
  Range,
  Select,
  TextType,
  Toggle,
  TransitionDelay,
  TransitionDuration,
  TransitionType,
} from "v2";

import { Enum } from "tachyon-utils-ts";
import { TransitionExample } from "./story-components/transition-example/component";

export default { title: "Transition" };

export const examples = () => <TransitionPage />;

interface Props {}

interface State {
  autoplay: boolean;
  autoplayTimeoutMs: number;
  isOpenValue: boolean | undefined;
  duration: TransitionDuration | "custom";
  delay: TransitionDelay | "custom";
  customDuration: number;
  customDelay: number;
}

class TransitionPage extends Component<Props, State> {
  public autoplayTimeout: number | undefined;
  public state: State = {
    autoplay: false,
    autoplayTimeoutMs: 1100,
    isOpenValue: undefined,
    duration: TransitionDuration.Long,
    delay: TransitionDelay.None,
    customDuration: 1000,
    customDelay: 1000,
  };

  public componentDidUpdate(_: Props, prevState: State) {
    if (this.state.autoplay === false && prevState.autoplay === true) {
      this.stopAutoplay();
    }

    if (this.state.autoplay === true && prevState.autoplay === false) {
      this.doAutoplay();
    }
  }

  public render() {
    const duration =
      this.state.duration !== "custom"
        ? this.state.duration
        : this.state.customDuration;

    const delay =
      this.state.delay !== "custom" ? this.state.delay : this.state.customDelay;

    return (
      <Layout margin={{ bottom: 2 }} fullWidth>
        {this.renderControls()}

        {this.renderHeading("Translate")}

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.TranslateLeft}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.TranslateLeft, TransitionType.TranslateRight]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.TranslateRight}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.TranslateTop}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.TranslateBottom, TransitionType.TranslateRight]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        {this.renderHeading("Fade")}

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.Fade}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.Fade, TransitionType.TranslateRight]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        {this.renderHeading("Scale Over")}

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.ScaleOver}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.ScaleOver, TransitionType.Fade]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        {this.renderHeading("Slide Over")}

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.SlideOverLeft}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.SlideOverRight}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.SlideOverTop}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.SlideOverBottom}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.SlideOverTop, TransitionType.SlideOverBottom]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        {this.renderHeading("None (no visual FX)")}

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.None}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.None, TransitionType.TranslateBottom]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={[TransitionType.TranslateBottom, TransitionType.None]}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          delay={delay}
          alwaysRenderChild={true}
        />

        {this.renderHeading("Unmount when not visible")}

        <TransitionExample
          isOpen={this.state.isOpenValue}
          type={TransitionType.TranslateLeft}
          onUserInteraction={this.cancelAutoPlay}
          duration={duration}
          showOverflow={true}
          delay={delay}
          alwaysRenderChild={false}
        />
      </Layout>
    );
  }

  private renderControls() {
    return (
      <Layout
        padding={2}
        fullWidth
        borderBottom
        display={Display.Flex}
        justifyContent={JustifyContent.Start}
      >
        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="Auto Play">
            <Toggle
              checked={this.state.autoplay}
              onChange={this.toggleAutoPlay}
            />
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup
            label="Auto Play Loop Duration"
            hint={this.state.autoplayTimeoutMs.toLocaleString() + " ms"}
          >
            <Range
              min={100}
              max={5000}
              value={this.state.autoplayTimeoutMs.toString()}
              onChange={this.updateTimeout}
            />
          </FormGroup>
        </Layout>

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="Duration Presets">
            <Select value={this.state.duration} onChange={this.updateDuration}>
              {Enum.entries(TransitionDuration).map(([key, value]) => (
                <option value={value} key={value}>
                  {key}
                </option>
              ))}
              <option value={"custom"} key="custom">
                Custom
              </option>
            </Select>
          </FormGroup>
        </Layout>

        {this.state.duration === "custom" && (
          <Layout flexGrow={0} margin={{ right: 2 }}>
            <FormGroup
              label="Duration in milliseconds"
              hint={this.state.customDuration.toLocaleString() + " ms"}
            >
              <Range
                min={0}
                max={10000}
                value={this.state.customDuration.toString()}
                onChange={(e) => {
                  this.setState({
                    customDuration: e.currentTarget.valueAsNumber,
                  });
                }}
              />
            </FormGroup>
          </Layout>
        )}

        <Layout flexGrow={0} margin={{ right: 2 }}>
          <FormGroup label="Delay Presets">
            <Select value={this.state.delay} onChange={this.updateDelay}>
              {Enum.entries(TransitionDelay).map(([key, value]) => (
                <option value={value} key={value}>
                  {key}
                </option>
              ))}
              <option value={"custom"} key="custom">
                Custom
              </option>
            </Select>
          </FormGroup>
        </Layout>

        {this.state.delay === "custom" && (
          <Layout flexGrow={0} margin={{ right: 2 }}>
            <FormGroup
              label="Delay in milliseconds"
              hint={this.state.customDelay.toLocaleString() + " ms"}
            >
              <Range
                min={0}
                max={10000}
                value={this.state.customDelay.toString()}
                onChange={(e) => {
                  this.setState({
                    customDelay: e.currentTarget.valueAsNumber,
                  });
                }}
              />
            </FormGroup>
          </Layout>
        )}
      </Layout>
    );
  }

  private updateTimeout = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      autoplayTimeoutMs: e.currentTarget.valueAsNumber,
    });
  };

  private updateDuration = (e: FormEvent<HTMLSelectElement>) => {
    this.setState({
      duration: e.currentTarget.value as TransitionDuration,
    });
  };

  private updateDelay = (e: FormEvent<HTMLSelectElement>) => {
    this.setState({
      delay: e.currentTarget.value as TransitionDelay,
    });
  };

  private toggleAutoPlay = () => {
    this.setState((prevState) => ({
      autoplay: !prevState.autoplay,
    }));
  };

  private cancelAutoPlay = () => {
    this.setState({
      autoplay: false,
      isOpenValue: undefined,
    });
  };

  private doAutoplay = () => {
    this.setState((prevState) => ({
      isOpenValue: !prevState.isOpenValue,
    }));
    this.autoplayTimeout = window.setTimeout(
      this.doAutoplay,
      this.state.autoplayTimeoutMs,
    );
  };

  private stopAutoplay = () => {
    clearTimeout(this.autoplayTimeout);
  };

  private renderHeading(label: string) {
    return (
      <Layout margin={{ top: 4, bottom: 2 }}>
        <CoreText type={TextType.H3}>{label}</CoreText>
      </Layout>
    );
  }
}
