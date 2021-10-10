import * as React from "react";

import {
  CombinationGenerator,
  CombinationMode,
} from "../../components/combination-generator";
import { Component, FormEvent } from "react";
import { ExampleBG, OverlayPreview } from "../../components/overlay-preview";
import { Layout, Range, RangeProps } from "v2";

export default { title: "Range" };

export const examples = () => <FormRangePage />;

type State = { offsetValue: string; value: string };

class FormRangePage extends Component<{}, State> {
  public state: State = { offsetValue: "6", value: "50" };

  public render() {
    return (
      <OverlayPreview defaultBg={ExampleBG.Off} blur>
        <Layout padding={1}>{this.renderExamples()}</Layout>
      </OverlayPreview>
    );
  }

  private renderExamples = () => {
    const requiredProps: RangeProps = {
      max: 100,
      min: 0,
      step: 1,
    };

    return (
      <>
        <CombinationGenerator
          mode={CombinationMode.Exhaustive}
          fields={[
            {
              propKey: "error",
              propValues: [false, true],
            },
          ]}
        >
          <Range {...requiredProps} />
          <Range {...requiredProps} disabled />
        </CombinationGenerator>
        <CombinationGenerator
          mode={CombinationMode.Exhaustive}
          fields={[
            {
              propKey: "error",
              propValues: [false, true],
            },
          ]}
        >
          <Range
            {...requiredProps}
            fill
            value={this.state.value}
            onChange={this.onChange}
          />
          <Range {...requiredProps} fill value={"50"} disabled />
        </CombinationGenerator>
        <CombinationGenerator
          mode={CombinationMode.Exhaustive}
          fields={[
            {
              propKey: "error",
              propValues: [false, true],
            },
          ]}
        >
          <Range
            min={3}
            max={10}
            step={1}
            fill
            value={this.state.offsetValue}
            onChange={this.onChangeOffset}
          />
          <Range min={3} max={10} step={1} fill value={"6"} disabled />
        </CombinationGenerator>
      </>
    );
  };

  private onChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  private onChangeOffset = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ offsetValue: e.currentTarget.value });
  };
}
