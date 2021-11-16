import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { InputSize } from "../form";
import { RadioComponent, RadioProps } from "./component";

function getRequiredProps(): RadioProps {
  return {
    label: "Test Label",
    id: "test-id",
  };
}

function getOptionalProps(): RadioProps {
  return {
    autoFocus: true,
    checked: true,
    defaultChecked: true,
    disabled: true,
    error: true,
    id: "test-id",
    label: "Test Label",
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    overlay: true,
    required: true,
    tabIndex: 0,
    value: "Test value",
  };
}

const setupShallow = setupShallowTest(RadioComponent, getRequiredProps);

describe("Radio", () => {
  it("renders radio component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders radio component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders radio component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders one data-test-selector", () => {
    const SELECTOR = { "data-test-selector": "my-test-string" };
    const wrapper = shallow(
      <RadioComponent {...getRequiredProps()} {...SELECTOR} />,
    );
    expect(wrapper.find(SELECTOR).length).toEqual(1);
  });
});
