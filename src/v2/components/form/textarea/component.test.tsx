import { setupShallowTest } from "../../../tests/helpers";
import { Overflow } from "../../layout";
import { InputSize } from "../form";
import { TextAreaComponent, TextAreaProps } from "./component";

function getOptionalProps(): TextAreaProps {
  return {
    autoComplete: "on",
    autoFocus: true,
    cols: 10,
    disabled: true,
    error: true,
    id: "Test ID",
    maxLength: 100,
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onKeyDown: jest.fn(),
    overflow: Overflow.Hidden,
    paddingLeft: 40,
    paddingRight: 40,
    placeholder: "Test placeholder",
    noResize: true,
    rows: 10,
    tabIndex: 0,
    value: "Test value",
    defaultValue: "Default value",
  };
}

const setupShallow = setupShallowTest(TextAreaComponent);

describe("TextArea", () => {
  it("renders text area component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders text area component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders text area component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders text area component with autoComplete prop", () => {
    const { wrapper } = setupShallow({ autoComplete: "off" });
    expect(wrapper).toMatchSnapshot();
  });
});
