import { DarkThemeMap, LightThemeMap } from "lib/ui-tokens";

import { ThemeContextValue } from "../../themed-styled-components";
import { ThemeProps } from "styled-components";
import { themeTokenRule } from ".";

describe(themeTokenRule, () => {
  it("renders dark mode hex code when no theme context is available", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      // @ts-expect-error Intentionally test a case where theme context is simply missing
      theme: {},
    };
    const result = themeTokenRule("color-background-base")(contextValue);

    expect(result).toEqual(DarkThemeMap["color-background-base"]);
  });

  it("renders dark mode hex code fallback when configured via theme context", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "dark",
        cssVars: false,
        disableHoverCSS: false,
      },
    };
    const result = themeTokenRule("color-background-base")(contextValue);

    expect(result).toEqual(DarkThemeMap["color-background-base"]);
  });

  it("renders light mode hex code fallback when configured via theme context", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "light",
        cssVars: false,
        disableHoverCSS: false,
      },
    };
    const result = themeTokenRule("color-background-base")(contextValue);

    expect(result).toEqual(LightThemeMap["color-background-base"]);
  });

  it("renders css variables when configured via theme context", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "dark",
        cssVars: true,
        disableHoverCSS: false,
      },
    };
    const result = themeTokenRule("color-background-base")(contextValue);

    expect(result).toEqual("var(--color-background-base)");
  });

  it("returns tokenOverrides value if provided", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "light",
        cssVars: false,
        disableHoverCSS: false,
        tokenOverrides: {
          "color-background-base": "red",
        },
      },
    };
    const result = themeTokenRule("color-background-base")(contextValue);

    expect(result).toEqual("red");
  });

  it("ignores tokenOverrides value when in css vars mode", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "light",
        cssVars: true,
        disableHoverCSS: false,
        tokenOverrides: {
          "color-background-base": "red",
        },
      },
    };
    const result = themeTokenRule("color-background-base")(contextValue);

    expect(result).toEqual("var(--color-background-base)");
  });

  it("ignores tokenOverrides value if not matching current token", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "light",
        cssVars: false,
        disableHoverCSS: false,
        tokenOverrides: {
          "color-background-base": "red",
        },
      },
    };
    const result = themeTokenRule("color-background-alt")(contextValue);

    expect(result).toEqual(LightThemeMap["color-background-alt"]);
  });
});
