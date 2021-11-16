import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { SVGAsset } from "../../svg";
import { InputSize } from "../form";
import { InputRounding, InputType } from "../input";
import { ComboInput, ComboInputProps } from "./component";

function getRequiredProps(): ComboInputProps {
  return {
    type: InputType.Password,
    buttonProps: {
      children: "Test Button",
    },
  };
}

function getOptionalProps(): ComboInputProps {
  return {
    autoCapitalize: true,
    autoComplete: "true",
    autoCorrect: true,
    autoFocus: true,
    buttonProps: {
      children: "Test Button",
    },
    disabled: true,
    error: true,
    icon: SVGAsset.Gear,
    iconRight: true,
    id: "test-id",
    list: "list",
    maxLength: 100,
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onClick: jest.fn(),
    onFocus: jest.fn(),
    onKeyDown: jest.fn(),
    placeholder: "Test placeholder",
    readOnly: true,
    required: true,
    rounding: InputRounding.Right,
    spellCheck: true,
    tabIndex: 0,
    min: 1,
    max: 100,
    step: 2,
    size: InputSize.Small,
    type: InputType.Password,
    value: "Test Value",
    defaultValue: "Default Value",
  };
}

const setupShallow = setupShallowTest(ComboInput, getRequiredProps);

describe("ComboInput", () => {
  it("renders ComboInput component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders ComboInput component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders ComboInput component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("passes the aria label to the html", () => {
    const wrapper = shallow(
      <ComboInput aria-label="this is my aria label" {...getRequiredProps()} />,
    );
    expect(
      wrapper.html().match(/aria-label="this is my aria label"/)?.length,
    ).toBe(1);
  });
});
