import * as React from "react";

import { AnimatedNumber, Layout } from "v2";

import { Component } from "react";

interface DiscoProps {
  startValue: number;
  deltaMin?: number;
  deltaMax?: number;
}

interface DiscoState {
  value: number;
}

export class AnimatedNumberDisco extends Component<DiscoProps, DiscoState> {
  private interval: number | undefined;

  public constructor(props: DiscoProps) {
    super(props);
    this.state = {
      value: props.startValue,
    };
  }

  public componentDidMount() {
    this.interval = window.setInterval(this.tick, 2000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  public render() {
    return (
      <Layout>
        <AnimatedNumber
          value={this.state.value}
          formatValue={(n) => n.toLocaleString()}
        />
      </Layout>
    );
  }

  private tick = () => {
    const diff = generateRandomInteger(
      this.props.deltaMin || -10,
      this.props.deltaMax || 10,
    );

    this.setState((prevState) => ({
      value: prevState.value + diff,
    }));
  };
}

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
