import { AnimationEvent } from "react";
import { setupShallowTest } from "../../tests/helpers";
import {
  Animation,
  AnimationDelay,
  AnimationDuration,
  AnimationFillMode,
  AnimationProps,
  AnimationTiming,
  AnimationType,
} from "./component";

function getRequiredProps(): AnimationProps {
  return {
    type: AnimationType.Bounce,
  };
}

function getOptionalProps(): AnimationProps {
  return {
    delay: AnimationDelay.Medium,
    duration: AnimationDuration.Medium,
    enabled: true,
    fillMode: AnimationFillMode.Both,
    loop: true,
    timing: AnimationTiming.EaseInOut,
    type: AnimationType.Bounce,
    onAnimationStart: jest.fn(),
    onAnimationEnd: jest.fn(),
  };
}

const setupShallow = setupShallowTest(Animation, getRequiredProps);

describe("Animation", () => {
  it("renders animation component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders animation component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("sets the onAnimationStart prop on the correct element", () => {
    const onAnimationStart = jest.fn();
    const { wrapper } = setupShallow({ onAnimationStart });

    wrapper.props().onAnimationStart!({} as AnimationEvent<HTMLDivElement>);

    expect(onAnimationStart).toBeCalled();
  });

  it("sets the onAnimationEnd prop on the correct element", () => {
    const onAnimationEnd = jest.fn();
    const { wrapper } = setupShallow({ onAnimationEnd });

    wrapper.props().onAnimationEnd!({} as AnimationEvent<HTMLDivElement>);

    expect(onAnimationEnd).toBeCalled();
  });
});
