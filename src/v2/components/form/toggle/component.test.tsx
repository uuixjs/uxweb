import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { Toggle, ToggleComponent, ToggleProps } from "./component";

function getOptionalProps(): ToggleProps {
  return {
    autoFocus: true,
    checked: true,
    defaultValue: "Default value",
    disabled: true,
    error: true,
    id: "Test ID",
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    tabIndex: 0,
    value: "Test value",
    label: "Test label",
  };
}

const setupShallow = setupShallowTest(ToggleComponent);

describe("Toggle", () => {
  it("renders toggle area component with required props", () => {
    const { wrapper } = setupShallow({ id: "Test ID" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders toggle area component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders one data-test-selector", () => {
    const SELECTOR = { "data-test-selector": "my-test-string" };
    const wrapper = shallow(<ToggleComponent {...SELECTOR} />);
    expect(wrapper.find(SELECTOR).length).toEqual(1);
  });

  it("passes aria props to the html", () => {
    const wrapper = shallow(<Toggle aria-labelledby="some-id" />);
    expect(wrapper.html().match(/aria-labelledby="some-id"/)?.length).toBe(1);
  });
});
