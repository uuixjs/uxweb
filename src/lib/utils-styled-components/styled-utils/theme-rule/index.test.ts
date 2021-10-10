import { ThemeProps } from "styled-components";
import { themeRule } from ".";
import { ThemeContextValue } from "../../themed-styled-components";

const themeCtx: ThemeProps<ThemeContextValue> = {
  theme: {
    name: "light",
    cssVars: false,
    disableHoverCSS: false,
  },
};

describe(themeRule, () => {
  it("formats simple values", () => {
    const result = themeRule({ dark: "hello", light: "world" })(themeCtx);
    expect(result).toEqual("world");
  });

  it("formats function values", () => {
    const lightCallback = jest.fn().mockReturnValue("test-value");
    const darkCallback = jest.fn();

    const result = themeRule({ dark: darkCallback, light: lightCallback })(
      themeCtx,
    );

    expect(lightCallback).toHaveBeenCalledTimes(1);
    expect(result).toEqual("test-value");
  });

  it("works with the context property defined as well", () => {
    const result = themeRule("name", { dark: "hello", light: "world" })(
      themeCtx,
    );
    expect(result).toEqual("world");
  });
});
