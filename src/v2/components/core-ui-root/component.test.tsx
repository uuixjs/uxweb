import {
  CORE_UI_ROOT_DARK_THEME_SELECTOR,
  CORE_UI_ROOT_HOVER_SELECTOR,
  CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
  ThemeProvider,
  prefersDarkMode,
} from "lib";

import { CoreUIRoot } from "./component";
import { mount } from "enzyme";

jest.mock("lib", () => ({
  ...jest.requireActual<{}>("lib"),
  prefersDarkMode: jest.fn(),
}));
const prefersDarkModeMock = prefersDarkMode as jest.Mock;

describe("CoreUIRoot", () => {
  const { documentElement } = document;

  beforeEach(() => {
    prefersDarkModeMock.mockReset();
    documentElement.className = "";
  });

  it("sets hover enabled by default", () => {
    mount(<CoreUIRoot children={null} />);
    expect(documentElement.className).toContain(CORE_UI_ROOT_HOVER_SELECTOR);
  });

  it("does not set hover when disabled", () => {
    mount(<CoreUIRoot children={null} disableHoverCSS />);
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_HOVER_SELECTOR,
    );
  });

  it("sets light theme class", () => {
    mount(<CoreUIRoot theme="light" children={null} />);
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );
  });

  it("sets dark theme class", () => {
    mount(<CoreUIRoot theme="dark" children={null} />);
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
  });

  it("changes the class name when props are updated", () => {
    const wrapper = mount(<CoreUIRoot theme="dark" children={null} />);
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );

    wrapper.setProps({ theme: "light" });
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );

    wrapper.setProps({ theme: "dark" });
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );
  });

  it("adds root class names for dark theme when theme is set to `system`", () => {
    prefersDarkModeMock.mockReturnValue(true);
    mount(<CoreUIRoot theme="system" children={null} />);
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
  });

  it("adds root class names for light theme when theme is set to `system`", () => {
    prefersDarkModeMock.mockReturnValue(false);
    mount(<CoreUIRoot theme="system" children={null} />);
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
  });

  it("adds root class names for system theme (dark) when theme is undefined", () => {
    prefersDarkModeMock.mockReturnValue(true);
    mount(<CoreUIRoot children={null} />);
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
  });

  it("adds root class names for system theme (light) when theme is undefined", () => {
    prefersDarkModeMock.mockReturnValue(false);
    mount(<CoreUIRoot children={null} />);
    expect(documentElement.className).toContain(
      CORE_UI_ROOT_LIGHT_THEME_SELECTOR,
    );
    expect(documentElement.className).not.toContain(
      CORE_UI_ROOT_DARK_THEME_SELECTOR,
    );
  });

  it("passes theme and cssVars to ThemeProvider and updates them when changed", () => {
    const wrapper = mount(
      <CoreUIRoot theme="light" cssVars={false} children={null} />,
    );

    expect(wrapper.find(ThemeProvider).prop("theme")).toEqual("light");
    expect(wrapper.find(ThemeProvider).prop("cssVars")).toEqual(false);

    // Change the values
    wrapper.setProps({ theme: "dark", cssVars: true });
    wrapper.update();

    expect(wrapper.find(ThemeProvider).prop("theme")).toEqual("dark");
    expect(wrapper.find(ThemeProvider).prop("cssVars")).toEqual(true);
  });
});
