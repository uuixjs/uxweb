import { ThemeProps } from "styled-components";
import { staticTokenRule } from ".";
import { ThemeContextValue } from "../../themed-styled-components";

describe(staticTokenRule, () => {
  it("renders hard-coded value when configured via theme context", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "light",
        cssVars: false,
        disableHoverCSS: false,
      },
    };
    const result = staticTokenRule("color-black")(contextValue);

    expect(result).toMatchInlineSnapshot(`"#000000"`);
  });

  it("renders css variables when configured via theme context", () => {
    const contextValue: ThemeProps<ThemeContextValue> = {
      theme: {
        name: "light",
        cssVars: true,
        disableHoverCSS: false,
      },
    };
    const result = staticTokenRule("color-black")(contextValue);

    expect(result).toMatchInlineSnapshot(`"var(--color-black)"`);
  });
});
