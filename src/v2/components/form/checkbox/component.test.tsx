import { mount, shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { InputSize } from "../form";
import { CheckBox, CheckBoxComponent, CheckBoxProps } from "./component";

function getRequiredProps(): CheckBoxProps {
  return {
    label: "Test Label",
    id: "test-id",
  };
}

function getOptionalProps(): CheckBoxProps {
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

const setupShallow = setupShallowTest(CheckBoxComponent, getRequiredProps);

describe("CheckBox", () => {
  it("renders checkbox component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders checkbox component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a checkbox component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders one data-test-selector", () => {
    const SELECTOR = { "data-test-selector": "my-test-string" };
    const wrapper = shallow(
      <CheckBoxComponent {...getRequiredProps()} {...SELECTOR} />,
    );
    expect(wrapper.find(SELECTOR).length).toEqual(1);
  });

  it("renders with indeterminate attr when prop is true", () => {
    const wrapper = mount(<CheckBox {...getRequiredProps()} indeterminate />);
    expect(wrapper.find("input").getDOMNode()).toHaveProperty("indeterminate");
  });

  it("renders correctly when indeterminate prop is updated", () => {
    const wrapper = mount(<CheckBox {...getRequiredProps()} indeterminate />);
    const checkboxElement = wrapper.find("input").getDOMNode();
    expect(checkboxElement).toHaveProperty("indeterminate", true);
    wrapper.setProps({ indeterminate: false });
    expect(checkboxElement).toHaveProperty("indeterminate", false);
  });

  it("respects refDelegate when indeterminate is true", () => {
    let inputRef = null;
    mount(
      <CheckBox
        {...getRequiredProps()}
        refDelegate={(ref) => (inputRef = ref)}
        indeterminate
      />,
    );
    expect(inputRef).not.toBeNull();
    expect(inputRef).toHaveProperty("type", "checkbox");
  });

  /**
   * It is important to ensure "position: relative" is wrapped
   * around any content which has "position: absolute" applied to it.
   * Without this, there is a bug when the content is rendered inside of
   * Twilight's `<ScrollableArea>` component which causes the scroll
   * region to jump up on the page when clicking on a UI element like
   * a checkbox if there is an un-wrapped position: absolute element involved.
   */
  it("uses position relative on the wrapper and position absolute on the input", () => {
    const wrapper = mount(<CheckBox {...getRequiredProps()} />);

    expect(wrapper).toHaveStyleRule(
      "position",
      expect.stringContaining("relative"),
    );
    expect(wrapper.find("input")).toHaveStyleRule(
      "position",
      expect.stringContaining("absolute"),
    );
  });
});
