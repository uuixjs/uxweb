import { mount, shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { TextAlign } from "../../layout";
import { SVGAsset } from "../../svg";
import { InputSize } from "../form";
import {
  Input,
  InputComponent,
  InputProps,
  InputRounding,
  InputType,
} from "./component";

function getRequiredProps(): InputProps {
  return {
    type: InputType.Password,
  };
}

function getOptionalProps(): InputProps {
  return {
    autoCapitalize: true,
    autoComplete: "on",
    autoCorrect: true,
    autoFocus: true,
    disabled: true,
    error: true,
    icon: SVGAsset.Gear,
    iconRight: true,
    id: "test-id",
    inputMode: "email",
    list: "list",
    maxLength: 100,
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onClick: jest.fn(),
    onFocus: jest.fn(),
    onKeyDown: jest.fn(),
    overlay: true,
    pattern: "test.?",
    placeholder: "Test placeholder",
    readOnly: true,
    required: true,
    rounding: InputRounding.Right,
    spellCheck: true,
    tabIndex: 0,
    textAlign: TextAlign.Center,
    min: 1,
    max: 100,
    step: 2,
    type: InputType.Password,
    value: "Test Value",
    defaultValue: "Default Value",
  };
}

const setupShallow = setupShallowTest(InputComponent, getRequiredProps);

describe("Input", () => {
  it("renders input component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders input component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders input component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders password type input component with correct classnames", () => {
    const wrapper = mount(<Input type={InputType.Password} />);
    expect(wrapper.find("input").hasClass("tw-input--password")).toBe(true);
  });

  it("passes the aria label to the html", () => {
    const wrapper = shallow(
      <Input aria-label="this is my aria label" {...getRequiredProps()} />,
    );
    expect(
      wrapper.html().match(/aria-label="this is my aria label"/)?.length,
    ).toBe(1);
  });
});
