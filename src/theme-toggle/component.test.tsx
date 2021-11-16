import { setupShallowTest } from "../../tests/helpers";
import { ThemeToggle, ThemeToggleProps } from "./component";

function getOptionalProps(): ThemeToggleProps {
  return {
    checked: true,
    defaultValue: "Default value",
    disabled: true,
    id: "ThemeToggle test ID",
    name: "ThemeToggle test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    tabIndex: 0,
    value: "ThemeToggle test value",
  };
}

const setupShallow = setupShallowTest(ThemeToggle);

describe("ThemeToggle", () => {
  it("renders theme toggle component with required props", () => {
    const { wrapper } = setupShallow({ id: "ThemeToggle test ID" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders theme toggle component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
