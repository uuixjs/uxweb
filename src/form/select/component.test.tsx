import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { InputSize } from "../form";
import { Select, SelectComponent, SelectProps } from "./component";

function getOptionalProps(): SelectProps {
  return {
    autoComplete: "country",
    defaultValue: "Default value",
    disabled: true,
    error: true,
    id: "Test ID",
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

const setupShallow = setupShallowTest(SelectComponent);

describe("Select", () => {
  it("renders select component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders select component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders select component with size prop", () => {
    const { wrapper } = setupShallow({ size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("has the correct attribute value when passed in an autoComplete prop", () => {
    const { wrapper } = setupShallow({ autoComplete: "Test value" });
    expect(wrapper.find(".tw-select").prop("autoComplete")).toEqual(
      "Test value",
    );
  });

  it("passes the aria label to the html", () => {
    const wrapper = shallow(<Select aria-label="this is my aria label" />);
    expect(
      wrapper.html().match(/aria-label="this is my aria label"/)?.length,
    ).toBe(1);
  });
});
