import * as React from "react";

import {
  AlignItems,
  AnimatedNumber,
  Button,
  ButtonType,
  Color,
  CoreText,
  Display,
  FontSize,
  InjectLayout,
  Input,
  InputType,
  Layout,
} from "v2";
import { Component, FormEvent } from "react";

interface ControlledProps {
  startValue: number;
}

interface ControlledState {
  value: number;
  deltaValue: number;
}

export class AnimatedNumberControlled extends Component<
  ControlledProps,
  ControlledState
> {
  public constructor(props: ControlledProps) {
    super(props);
    this.state = {
      value: props.startValue,
      deltaValue: 10,
    };
  }

  public render() {
    return (
      <Layout
        display={Display.Flex}
        alignItems={AlignItems.Center}
        margin={{ y: 2 }}
      >
        <Layout margin={{ right: 2 }}>
          <CoreText fontSize={FontSize.Size2} color={Color.Alt2}>
            <AnimatedNumber
              value={this.state.value}
              formatValue={(n) => n.toLocaleString()}
            />
          </CoreText>
        </Layout>

        <InjectLayout display={Display.Flex}>
          <form onSubmit={this.update}>
            <Layout margin={{ right: 0.5 }}>
              <Input
                type={InputType.Number}
                value={this.state.deltaValue.toString()}
                onChange={(e) =>
                  this.setState({ deltaValue: e.currentTarget.valueAsNumber })
                }
              />
            </Layout>
            <Button
              variant={ButtonType.Secondary}
              onClick={this.update}
              children={"Update"}
            />
          </form>
        </InjectLayout>
      </Layout>
    );
  }

  private update = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    this.setState((prevState) => ({
      value: prevState.deltaValue + prevState.value,
    }));
  };
}
