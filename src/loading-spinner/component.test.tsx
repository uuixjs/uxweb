import { mount } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { LoadingSpinner, LoadingSpinnerProps, SpinnerSize } from "./component";

function getOptionalProps(): LoadingSpinnerProps {
  return {
    size: SpinnerSize.Large,
    delay: 100,
    inheritColor: true,
    fillContent: true,
  };
}

const setupShallow = setupShallowTest(LoadingSpinner);

describe("LoadingSpinner", () => {
  it("renders loading spinner component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders loading spinner component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("has a delay by default", () => {
    const wrapper = mount(<LoadingSpinner />);
    expect(wrapper).toHaveStyleRule("animation-delay", "300ms");
  });

  it("does not add a delay className with 0 delay", () => {
    const wrapper = mount(<LoadingSpinner delay={0} />);
    expect(wrapper).not.toHaveStyleRule("animation-delay");
  });
});
