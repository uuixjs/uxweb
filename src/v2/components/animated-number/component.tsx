import { Component } from "react";
import CountUp from "react-countup";
import { styled } from "lib/ui-utils";

export interface AnimatedNumberProps {
  value: number;
  formatValue: (n: number) => string;
  initialValue?: number;
  duration?: number;
  children?: undefined;
  monospaced?: boolean;
}

export interface AnimatedNumberState {
  prevValue: number;
  currentValue: number;
}

export const ScAnimatedNumber = styled(CountUp)<{
  $monospaced: AnimatedNumberProps["monospaced"];
}>(({ $monospaced }) => {
  return (
    $monospaced && {
      "font-feature-settings": `"tnum"`,
    }
  );
});
export class AnimatedNumber extends Component<
  AnimatedNumberProps,
  AnimatedNumberState
> {
  public static defaultProps: Partial<AnimatedNumberProps> = {
    duration: 0.7,
    monospaced: true,
  };

  public constructor(props: AnimatedNumberProps) {
    super(props);
    this.state = {
      currentValue: props.value,
      prevValue:
        props.initialValue !== undefined ? props.initialValue : props.value,
    };
  }

  public componentDidUpdate() {
    if (this.props.value !== this.state.currentValue) {
      this.setState((s) => ({
        currentValue: this.props.value,
        prevValue: s.currentValue,
      }));
    }
  }

  public render() {
    const {
      duration,
      formatValue,
      initialValue,
      monospaced,
      value,
      ...props
    } = this.props;
    return (
      <ScAnimatedNumber
        $monospaced={monospaced}
        duration={duration}
        end={this.state.currentValue}
        start={this.state.prevValue}
        formattingFn={formatValue}
        {...props}
      />
    );
  }
}
