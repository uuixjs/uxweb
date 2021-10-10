import {
  AccentRegion,
  AccentRegionProps,
  ScAccentRegionCssVars,
  generateAccentRegionProps,
} from "./component";
import { ThemeContextValue, ThemeProvider } from "lib/ui-utils";

import { createMountWrapperFactory } from "tachyon-test-utils";
import { mount } from "enzyme";

const themeCtx: ThemeContextValue = {
  name: "light",
  cssVars: true,
  disableHoverCSS: false,
};

const setup = createMountWrapperFactory(
  /**
   * Temporary method of wrapping these tests in a theme provider.
   * TODO: Refactor to using context mocking from tachyon-test-utils 24, see https://git.xarth.tv/core-ui/core-ui/pull/2215
   */
  (props) => (
    <ThemeProvider {...themeCtx}>
      <AccentRegion {...props} />
    </ThemeProvider>
  ),
  () => ({} as AccentRegionProps),
);

describe("AccentRegion", () => {
  it("renders a custom css property value when provided a color", () => {
    const { wrapper } = setup({
      inputColor: "#123456",
    });

    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent",
      "#123456",
    );
  });

  it("works even with hex codes not prefixed with #", () => {
    const { wrapper } = setup({
      inputColor: "ffffff",
      inputColorIsDark: false,
      primary1: "ffffff",
      primary2: "ffffff",
      primary3: "ffffff",
      primary4: "ffffff",
      primary5: "ffffff",
    });

    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent",
      "#ffffff",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-label",
      "#000000",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-background-button-purchase",
      "rgba(255,255,255,0.25)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-1",
      "#ffffff",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-2",
      "#ffffff",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-3",
      "#ffffff",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-4",
      "#ffffff",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-5",
      "#ffffff",
    );
  });

  it("works with rgb or hsl color strings", () => {
    const { wrapper } = setup({
      inputColor: "rgb(255,255,255)",
      inputColorIsDark: false,
      primary1: "rgb(255,255,255)",
      primary2: "rgb(255,255,255)",
      primary3: "rgb(255,255,255)",
      primary4: "rgb(255,255,255)",
      primary5: "hsl(100,100%,100%)",
    });

    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent",
      "rgb(255,255,255)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-label",
      "#000000",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-background-button-purchase",
      "rgba(255,255,255,0.25)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-1",
      "rgb(255,255,255)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-2",
      "rgb(255,255,255)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-3",
      "rgb(255,255,255)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-4",
      "rgb(255,255,255)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-5",
      "hsl(100,100%,100%)",
    );
  });

  it("only populates the values provided", () => {
    const { wrapper } = setup({
      inputColor: "#aabbcc",
      inputColorIsDark: false,
      primary2: "#222222",
    });

    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent",
      "#aabbcc",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-label",
      "#000000",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-background-button-purchase",
      "rgba(255,255,255,0.25)",
    );
    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-2",
      "#222222",
    );
  });

  it("accepts null and does not set that value", () => {
    const { wrapper } = setup({
      primary2: "#222222",
      primary3: null,
    });

    expect(wrapper.find(ScAccentRegionCssVars)).toHaveStyleRule(
      "--color-accent-primary-2",
      "#222222",
    );

    expect(wrapper.find(ScAccentRegionCssVars)).not.toHaveStyleRule(
      "--color-accent-primary-3",
      undefined,
    );
  });

  it("works outside of Theme Provider", () => {
    const wrapper = mount(<AccentRegion />);

    expect(wrapper).toExist();
  });
});

describe("generateAccentRegionProps", () => {
  it("works with a hex code, not prefixed with #", () => {
    const props = generateAccentRegionProps("aabbcc");

    expect(props).toMatchInlineSnapshot(`
      Object {
        "inputColor": "#aabbcc",
        "inputColorHover": "#97abc0",
        "inputColorIsDark": false,
        "primary1": "#2c3a49",
        "primary2": "#394c5f",
        "primary3": "#5b7998",
        "primary4": "#9fb2c5",
        "primary5": "#aabbcc",
      }
    `);
  });

  it("works with an rgb color string", () => {
    const props = generateAccentRegionProps("rgb(170, 187, 204)");

    expect(props).toMatchInlineSnapshot(`
      Object {
        "inputColor": "#aabbcc",
        "inputColorHover": "#97abc0",
        "inputColorIsDark": false,
        "primary1": "#2c3a49",
        "primary2": "#394c5f",
        "primary3": "#5b7998",
        "primary4": "#9fb2c5",
        "primary5": "#aabbcc",
      }
    `);
  });
});
