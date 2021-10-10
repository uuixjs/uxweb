import { mount, shallow } from "enzyme";
// eslint-disable-next-line no-restricted-imports
import { ThemeContext } from "styled-components";
import { prefersDarkMode, supportsCssVars } from "../../supports";
import { ThemeProvider } from "./index";

jest.mock("../../supports", () => ({
  ...jest.requireActual<{}>("../../supports"),
  prefersDarkMode: jest.fn(),
  supportsCssVars: jest.fn(),
}));
const prefersDarkModeMock = prefersDarkMode as jest.Mock;
const supportsCssVarsMock = supportsCssVars as jest.Mock;

describe(ThemeProvider, () => {
  beforeEach(() => {
    window.matchMedia = jest.fn();
    prefersDarkModeMock.mockReset();
    supportsCssVarsMock.mockReset();
    supportsCssVarsMock.mockReturnValue(true);
  });

  it("sets some theme name value even when no theme is provided", () => {
    const wrapper = shallow(<ThemeProvider />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({ name: expect.any(String) }),
    );
  });

  it("uses system preference for dark theme as a default value", () => {
    prefersDarkModeMock.mockReturnValue(true);
    const wrapper = shallow(<ThemeProvider />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({ name: "dark" }),
    );
  });

  it("uses system preference for light theme as a default value", () => {
    prefersDarkModeMock.mockReturnValue(false);
    const wrapper = shallow(<ThemeProvider />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({ name: "light" }),
    );
  });

  it("enables css vars by default", () => {
    supportsCssVarsMock.mockReturnValue(true);

    const wrapper = shallow(<ThemeProvider />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({
        cssVars: true,
      }),
    );
  });

  it("enables hover css by default", () => {
    const wrapper = shallow(<ThemeProvider />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).not.toEqual(
      expect.objectContaining({
        disableHoverCSS: true,
      }),
    );
  });

  it("allows hover css to be disabled", () => {
    const wrapper = shallow(<ThemeProvider disableHoverCSS />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({
        disableHoverCSS: true,
      }),
    );
  });

  it("disables css vars when they are not supported", () => {
    supportsCssVarsMock.mockReturnValue(false);

    const wrapper = shallow(<ThemeProvider />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({
        cssVars: false,
      }),
    );
  });

  it("uses css vars config even if conflicting with browser support", () => {
    supportsCssVarsMock.mockReturnValue(true);

    const wrapper = shallow(<ThemeProvider cssVars={false} />);

    expect(wrapper.find(ThemeContext.Provider).prop("value")).toEqual(
      expect.objectContaining({
        cssVars: false,
      }),
    );
  });

  it("uses parent context values if not provided", () => {
    const contextFn = jest.fn();
    mount(
      <ThemeProvider theme="light" cssVars={false} data-test-selector="parent">
        <ThemeProvider
          theme="dark"
          data-test-selector="child"
          children={<ThemeContext.Consumer>{contextFn}</ThemeContext.Consumer>}
        />
      </ThemeProvider>,
    );

    expect(contextFn).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "dark",
        cssVars: false,
      }),
    );
  });

  it("merges tokenOverrides from parent context when nested", () => {
    const contextFn = jest.fn();
    mount(
      <ThemeProvider
        tokenOverrides={{
          "color-fill-button-icon": "blue",
          "color-text-base": "red",
        }}
      >
        <ThemeProvider
          tokenOverrides={{
            "color-fill-button-icon": "yellow",
          }}
          children={<ThemeContext.Consumer>{contextFn}</ThemeContext.Consumer>}
        />
      </ThemeProvider>,
    );

    expect(contextFn).toHaveBeenCalledWith(
      expect.objectContaining({
        tokenOverrides: {
          "color-fill-button-icon": "yellow",
          "color-text-base": "red",
        },
      }),
    );
  });
});
