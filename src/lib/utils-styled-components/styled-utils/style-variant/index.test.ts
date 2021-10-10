import { ThemeProps } from "styled-components";
import { styleVariant } from ".";
import { ThemeContextValue } from "../../themed-styled-components";

/**
 * An example interface for test purposes
 */
interface TestProps {
  size: "big" | "small";
  variant: "primary" | "secondary";
  disabled?: boolean;
}

const themeCtx: ThemeProps<ThemeContextValue> = {
  theme: {
    name: "light",
    cssVars: false,
    disableHoverCSS: false,
  },
};

const requiredProps: TestProps & ThemeProps<ThemeContextValue> = {
  ...themeCtx,
  size: "small",
  variant: "primary",
};

describe(styleVariant, () => {
  it("handles string values", () => {
    const mixin = styleVariant<TestProps, "size">("size", {
      big: "2rem",
      small: "1rem",
    });

    expect(mixin({ ...requiredProps, size: "big" })).toEqual("2rem");
    expect(mixin({ ...requiredProps, size: "small" })).toEqual("1rem");
  });

  it("handles number values", () => {
    const mixin = styleVariant<TestProps, "size">("size", {
      big: 10,
      small: 0,
    });

    expect(mixin({ ...requiredProps, size: "big" })).toEqual(10);
    expect(mixin({ ...requiredProps, size: "small" })).toEqual(0);
  });

  it("handles callback function values", () => {
    const mixin = styleVariant<TestProps, "size">("size", {
      big: () => "2rem",
      small: () => "1rem",
    });

    expect(mixin({ ...requiredProps, size: "big" })).toEqual("2rem");
    expect(mixin({ ...requiredProps, size: "small" })).toEqual("1rem");
  });

  it("works with theme context", () => {
    const mixin = styleVariant<TestProps, "variant">("variant", {
      primary: ({ theme }) => (theme.name === "light" ? "#FFF" : "#000"),
      secondary: ({ theme }) => (theme.name === "light" ? "#AAA" : "#333"),
    });

    expect(mixin({ ...requiredProps, variant: "primary" })).toEqual("#FFF");
    expect(mixin({ ...requiredProps, variant: "secondary" })).toEqual("#AAA");
  });

  it("fails gracefully when not all variations are provided", () => {
    const mixin = styleVariant<TestProps, "variant">(
      "variant",
      // @ts-expect-error This object omits the required "secondary" key:
      {
        primary: "#FFF",
      },
    );

    expect(mixin({ ...requiredProps, variant: "primary" })).toEqual("#FFF");
    expect(mixin({ ...requiredProps, variant: "secondary" })).toEqual(
      undefined,
    );
  });
});
