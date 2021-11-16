import {
  AccentToken,
  accentTokenDarkThemeMap,
  accentTokenLightThemeMap,
  formatAccentTokenCssVars,
  formatTokenOverrides,
} from "./token-map";

describe("Accent token theme maps", () => {
  it("has the same tokens for light and dark themes", () => {
    expect(Object.keys(accentTokenLightThemeMap)).toEqual(
      Object.keys(accentTokenDarkThemeMap),
    );
  });
});

describe(formatAccentTokenCssVars, () => {
  it("matches expected return value", () => {
    const result = formatAccentTokenCssVars({
      [AccentToken.Primary1]: "#FFF",
      [AccentToken.Primary2]: "#AAA",
      [AccentToken.Accent]: "#000",
      [AccentToken.AccentLabel]: "#111",
    });

    expect(result).toMatchInlineSnapshot(`
      Object {
        "--color-accent": "#000",
        "--color-accent-label": "#111",
        "--color-accent-primary-1": "#FFF",
        "--color-accent-primary-2": "#AAA",
      }
    `);
  });
});

describe(formatTokenOverrides, () => {
  it("matches expected return value", () => {
    const result = formatTokenOverrides(
      {
        [AccentToken.Primary1]: "#FFF",
        [AccentToken.Primary2]: "#AAA",
        [AccentToken.Accent]: "#000",
        [AccentToken.AccentLabel]: "#111",
      },
      {
        "color-background-accent": AccentToken.Primary1,
        "color-background-accent-alt": AccentToken.Primary2,
        "color-text-base": AccentToken.Accent,
      },
    );

    expect(result).toMatchInlineSnapshot(`
      Object {
        "color-background-accent": "#FFF",
        "color-background-accent-alt": "#AAA",
        "color-text-base": "#000",
      }
    `);
  });

  it("skips entries if no matching value is provided", () => {
    const result = formatTokenOverrides(
      {
        [AccentToken.Primary1]: "#FFF",
      },
      {
        "color-background-accent": AccentToken.Primary1,
        "color-background-accent-alt": AccentToken.Primary2,
        "color-text-base": AccentToken.Accent,
      },
    );

    // Only the one token which had a matching color should be set:
    expect(result).toStrictEqual({
      "color-background-accent": "#FFF",
    });
  });
});
