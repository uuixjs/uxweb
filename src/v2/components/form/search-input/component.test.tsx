import { setupShallowTest } from "../../../tests/helpers";
import { InputSize } from "../form";
import { SearchInput, SearchInputProps } from "./component";

function getOptionalProps(): SearchInputProps {
  return {
    autoCapitalize: true,
    autoComplete: "name",
    autoFocus: true,
    disabled: true,
    id: "Test ID",
    error: true,
    maxLength: 100,
    name: "Test name",
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onKeyDown: jest.fn(),
    placeholder: "Test placeholder",
    spellCheck: true,
    tabIndex: 0,
    value: "Test Value",
  };
}

const setupShallow = setupShallowTest(SearchInput);

describe("SearchInput", () => {
  it("renders search input component with required props", () => {
    const { wrapper } = setupShallow({ id: "Test ID" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders search input component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders search input component with size prop", () => {
    const { wrapper } = setupShallow({ id: "Test ID", size: InputSize.Large });
    expect(wrapper).toMatchSnapshot();
  });
});
