import { setupShallowTest } from "../../tests/helpers";
import {
  ProgressBarAnimationDirection,
  ProgressBarComponent,
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarStatus,
  ScProgressBarFill,
} from "./component";

function getOptionalProps(): ProgressBarProps {
  return {
    animationDuration: 10,
    animationDirection: ProgressBarAnimationDirection.Down,
    onAnimationEnd: jest.fn(),
    size: ProgressBarSize.ExtraSmall,
    status: ProgressBarStatus.Success,
    value: 100,
    inherit: true,
    mask: true,
    paused: true,
    overlay: true,
  };
}

const setupShallow = setupShallowTest(ProgressBarComponent);

describe("ProgressBar", () => {
  it("renders progress bar component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders progress bar component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("sets a default width of 100% when value is not provided", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.find(ScProgressBarFill)).toHaveStyleRule("width", "100%");
  });

  it("sets a default width of 0 when value is not provided and animation direction is up", () => {
    const { wrapper } = setupShallow({
      animationDirection: ProgressBarAnimationDirection.Up,
    });

    expect(wrapper.find(ScProgressBarFill)).toHaveStyleRule("width", "0%");
  });

  it("sets width to the provided value", () => {
    const { wrapper } = setupShallow({ value: 50 });

    expect(wrapper.find(ScProgressBarFill)).toHaveStyleRule("width", "50%");
  });
});
