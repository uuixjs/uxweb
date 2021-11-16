import { shallow } from "enzyme";
import { setupShallowTest } from "../../../../tests/helpers";
import { Background, InjectLayout } from "../../../layout";
import {
  BalloonSize,
  BalloonWrapper,
  BalloonWrapperComponent,
  BalloonWrapperProps,
  DEFAULT_BALLOON_ELEVATION,
} from "./component";

const BALOON_ELEVATION = 3;

function getOptionalProps(): BalloonWrapperProps {
  return {
    elevation: BALOON_ELEVATION,
    size: BalloonSize.Medium,
    background: Background.Alt2,
  };
}

const setupShallow = setupShallowTest(BalloonWrapperComponent);

describe("Balloon", () => {
  it("renders balloon component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders balloon component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("sets some elevation by default", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(
      DEFAULT_BALLOON_ELEVATION,
    );
  });

  it("uses the specified elevation", () => {
    const { wrapper } = setupShallow({ elevation: 3 });
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(3);
  });

  it("sets elevation automatically based on size for small", () => {
    const { wrapper } = setupShallow({
      size: BalloonSize.ExtraSmall,
    });
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(2);
  });

  it("sets elevation automatically based on size for large", () => {
    const { wrapper } = setupShallow({
      size: BalloonSize.ExtraLarge,
    });
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(5);
  });

  it("uses the provided elevation value when a size prop is also provided", () => {
    const { wrapper } = setupShallow({
      size: BalloonSize.ExtraLarge,
      elevation: DEFAULT_BALLOON_ELEVATION,
    });
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(
      DEFAULT_BALLOON_ELEVATION,
    );
  });

  it("uses the specified elevation when it is 0", () => {
    const { wrapper } = setupShallow({
      elevation: 0,
    });
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(0);
  });

  it("uses the specified elevation when it is 0 and size is set", () => {
    const { wrapper } = setupShallow({
      elevation: 0,
      size: BalloonSize.Medium,
    });
    expect(wrapper.find(InjectLayout).prop("elevation")).toBe(0);
  });

  it("passes the aria label to the html", () => {
    const wrapper = shallow(
      <BalloonWrapper aria-label="this is my aria label" />,
    );
    expect(
      wrapper.html().match(/aria-label="this is my aria label"/)?.length,
    ).toBe(1);
  });
});
